import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { customerComment, yourAnswer, followUpQuestion, chatHistory, modelId: requestModelId, findSolutions, analysisType, credentials, googleApiKey, userName } = await request.json();

    if (!customerComment || !yourAnswer) {
      return NextResponse.json(
        { error: 'Customer comment and your answer are required' },
        { status: 400 }
      );
    }

    // Check for credentials from request or environment
    if (!credentials && !process.env.AWS_ACCESS_KEY_ID) {
      return NextResponse.json(
        { error: 'AWS credentials not configured. Please configure them in Settings.' },
        { status: 401 }
      );
    }

    // Use AWS Bedrock models
    const modelId = requestModelId || process.env.BEDROCK_MODEL_ID || 'global.anthropic.claude-sonnet-4-5-20250929-v1:0';
    const clientConfig: any = {
      region: credentials?.region || process.env.AWS_REGION || 'us-east-1',
    };
    
    // Priority: request credentials > environment credentials
    if (credentials?.accessKeyId) {
      const creds: any = {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      };
      if (credentials.sessionToken) {
        creds.sessionToken = credentials.sessionToken;
      }
      clientConfig.credentials = creds;
    } else if (process.env.AWS_BEARER_TOKEN_BEDROCK) {
      clientConfig.token = { token: async () => process.env.AWS_BEARER_TOKEN_BEDROCK! };
    } else if (process.env.AWS_ACCESS_KEY_ID) {
      const envCreds: any = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      };
      if (process.env.AWS_SESSION_TOKEN) {
        envCreds.sessionToken = process.env.AWS_SESSION_TOKEN;
      }
      clientConfig.credentials = envCreds;
    }

    const client = new BedrockRuntimeClient(clientConfig);

    // If findSolutions is enabled, search for technical solutions
    let technicalSolutions = '';
    if (findSolutions) {
      try {
        const apiKey = googleApiKey || process.env.GOOGLE_AI_API_KEY;
        if (apiKey) {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ 
            model: 'gemini-1.5-flash',
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2000,
            }
          });

          const searchQuery = `Based on this technical issue, find solutions from CyberArk documentation (https://docs.cyberark.com) and technical forums:

Customer Issue: ${customerComment}

Please search for:
1. CyberArk official documentation related to this issue
2. Known solutions or workarounds
3. Similar cases and their resolutions
4. Configuration recommendations

Provide sources and links where possible.`;

          const searchResult = await model.generateContent(searchQuery);
          const response = await searchResult.response;
          technicalSolutions = response.text();
        }
      } catch (searchError) {
        console.error('Search error:', searchError);
        technicalSolutions = 'Technical solution search unavailable at this time.';
      }
    }

    // System prompt based on analysis type
    let systemPrompt = '';
    
    if (analysisType === 'rnd') {
      // R&D Readiness Analysis - Check if support provided enough info for R&D investigation
      systemPrompt = `You are a technical escalation analyst reviewing support team's submission to R&D.

CRITICAL: Be respectful, constructive, and objective. Focus on completeness of information, not blame.

YOUR TASK:
Analyze if the support team's write-up contains sufficient information for R&D to investigate.

FIRST - Identify the issue type from customer's problem:
- **Question/Clarification**: Customer asking how something works
- **Active Problem**: Customer experiencing a specific error or failure
- **Behavior Report**: Customer reporting unexpected behavior

CORE REQUIREMENTS (always check these):
1. **User Story**: What is the customer trying to achieve? (Did it work before? What triggered it? Timeline of events)
2. **Exact Steps**: How did they do it? (Exact commands, exact time, username, specific actions)
3. **Outcome**: What happened? (Error messages, screenshots, log references, unexpected behavior)
4. **Business Impact**: How does this affect the customer's business?
5. **Environment**: OS/Service pack versions, product versions, component versions
6. **Recent Changes**: What changed before the problem started?
7. **Troubleshooting Done**: What has been tried so far? (Reproduced? Workaround provided?)
8. **Research Done**: Known bugs/previous cases/documentation searched and results shared
9. **Clear Request**: What specifically is being asked of R&D? (Investigation advice? Bug assignment? Documentation update?)

PRODUCT-SPECIFIC REQUIREMENTS (check based on detected product):
**For CP/CCP/ASCP Issues:**
- Product version (CP/CCP/ASCP)
- SDK version
- Relevant 3rd party versions
- APPTrace.log
- SDK logs
- System logs (if ASCP)
- Logs from failure time
- For CCP: AIMWSTrace.log and IIS logs
- For installation issues: Installation log
- Account count handled by CP

**For Vault Issues:**
- Vault version
- DBParm.ini configuration
- ITAlog/ITAlog.log
- vault.ini settings
- Trace logs if available

**For PAM/PVWA Issues:**
- PVWA version
- Browser console logs
- Network trace (HAR file)
- PVWA logs from issue time

OUTPUT FORMAT:

## Issue Type Detected
[Question/Clarification | Active Problem | Behavior Report]

## Support Team Performance Review

### ✓ What Was Done Well
- [Specific actions the support team did correctly]
- [Good decisions made]
- [Proper analysis or troubleshooting]

### ⚠️ Areas for Improvement
- [What could have been done better]
- [Information that should have been collected]
- [Steps that were missed]

Be constructive and specific. This feedback helps the support team learn and improve for future escalations.

## Information Completeness Assessment

### ✓ Information Provided
- [List what WAS included with brief note]
- [List what WAS included with brief note]

### ⚠️ Recommended Additions
[Only if truly missing for THIS type of issue]
- [What's missing and why it matters for investigation]

### 🔴 Critical Gaps
[Only if absolutely required but missing]
- [What's critically missing that blocks R&D investigation]

## Product-Specific Requirements
[Based on detected product - list relevant items]
✓ [What's provided]
⚠️ [What's recommended but not critical]
🔴 [What's critical but missing]

## R&D Readiness Summary
[2-3 sentences: Is this ready for R&D? If not, what's the priority gap to fill?]

TONE RULES:
- Be respectful and constructive
- Focus on information completeness, not criticism
- If something is missing, explain WHY it's needed
- Recognize what WAS done well
- Use "Recommended" instead of "Missing" for nice-to-haves
- Use "Critical" only for true blockers
- When reviewing support performance, be specific about what was good and what could improve`;
    } else {
      // Customer Response Analysis - Original communication quality check
      systemPrompt = `You are a communication coach analyzing technical support responses.

CRITICAL FORMATTING RULES:
- Each principle MUST be on its own line with a blank line after it
- Use EXACTLY this format for the Principle Checklist section
- Do NOT combine multiple principles on one line

The 13 principles to evaluate:
1. Building Trust
2. Active Listening
3. Clear Communication
4. Taking Ownership
5. Smart Empathy
6. Proactive Updates
7. Ice Breaking
8. Early Questions
9. Sense of Urgency
10. Shared Responsibility
11. Win-Win Solutions
12. Structured Responses
13. Terminology Mirroring - Use the same words (question/issue/problem/behavior) that the customer used. Don't escalate a "question" to a "problem" or change their framing.

OUTPUT FORMAT (follow this EXACTLY):

CRITICAL: BE CONCISE - Use short bullets, not paragraphs

## What Was Done Well

- [Brief point - max 10 words]
- [Brief point - max 10 words]
- [Brief point - max 10 words]

## Areas Needing Improvement

- [Brief point - max 10 words]
- [Brief point - max 10 words]  
- [Brief point - max 10 words]

## Principle Checklist

**1. Building Trust:** ✓ or ⚠️ [5 words max]

**2. Active Listening:** ✓ or ⚠️ [5 words max]

**3. Clear Communication:** ✓ or ⚠️ [5 words max]

**4. Taking Ownership:** ✓ or ⚠️ [5 words max]

**5. Smart Empathy:** ✓ or ⚠️ [5 words max]

**6. Proactive Updates:** ✓ or ⚠️ [5 words max]

**7. Ice Breaking:** ✓ or ⚠️ [5 words max]

**8. Early Questions:** ✓ or ⚠️ [5 words max]

**9. Sense of Urgency:** ✓ or ⚠️ [5 words max]

**10. Shared Responsibility:** ✓ or ⚠️ [5 words max]

**11. Win-Win Solutions:** ✓ or ⚠️ [5 words max]

**12. Structured Responses:** ✓ or ⚠️ [5 words max]

**13. Terminology Mirroring:** ✓ or ⚠️ [5 words max]

## Improved Response

CRITICAL REQUIREMENTS:
- Maximum 2000 characters (Salesforce comment limit)
- BE CONCISE - every word counts
- DON'T repeat the customer's full problem description
- ONE brief sentence acknowledging the issue
- SHORT explanations (2-3 sentences max)
- MINIMAL pleasantries - get to the point

Hi [Name],

I understand the [brief issue type - 5 words max].

[Root cause in 1-2 sentences - NO MORE]

### Next Steps:
• [Action 1]
• [Action 2]
• [Action 3]

I'll update you within [timeframe].

Best regards,
${userName || '[Your Name]'}

STOP HERE. No additional text after signature.

CRITICAL INSTRUCTION FOR DATA REQUESTS:
When asking the customer for information, use this EXACT format for EACH question:

**Question:**
[The actual question]

**Why this is needed:**
[Explain why you need this specific information]

Example:
**Question:**
How was the Application originally created? (Manually via PVWA / Via REST API / Via automation)

**Why this is needed:**
Applications created via REST/API or automation are more susceptible to malformed data if input validation is not enforced.

Do NOT group questions by priority. Each question must have its "Why this is needed" explanation immediately after it.
Use clear, professional, empathetic tone. Be concise but thorough in explanations.`;
    }

    let userPrompt: string;
    
    if (followUpQuestion) {
      userPrompt = `**Original Customer Comment:**
${customerComment}

**Original Support Response:**
${yourAnswer}

**Follow-up Question:**
${followUpQuestion}

Please answer the follow-up question in the context of the original analysis and the 13 communication principles.`;
    } else {
      userPrompt = `**Customer Comment:**
${customerComment}

**Support Response to Analyze:**
${yourAnswer}`;

      // Add technical solutions if found
      if (technicalSolutions) {
        userPrompt += `\n\n**📚 IMPORTANT - Technical Solutions Research Results:**
The AI has searched CyberArk documentation and the web. Below are the findings:

${technicalSolutions}

CRITICAL INSTRUCTION: You MUST include a section called "## 📚 Technical Solutions Found" in your response that:
1. Summarizes the key technical solutions discovered
2. Lists relevant CyberArk documentation links
3. Provides specific configuration recommendations
4. Cites sources from the search results above

This section should appear BEFORE the "Improved Response" section.`;
      }

      userPrompt += `\n\nPlease analyze this response against the 12 principles and provide detailed feedback.

REMEMBER: Each principle in the checklist must be on its own line with proper spacing.`;
    }
    
    let requestBody: any;
    if (modelId.includes('anthropic.claude')) {
      requestBody = {
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 4000,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      };
    } else if (modelId.includes('amazon.titan')) {
      requestBody = {
        inputText: `${systemPrompt}\n\n${userPrompt}`,
        textGenerationConfig: {
          maxTokenCount: 4000,
          temperature: 0.7,
          topP: 0.9,
        },
      };
    } else if (modelId.includes('amazon.nova')) {
      requestBody = {
        messages: [
          {
            role: 'user',
            content: [
              {
                text: `${systemPrompt}\n\n${userPrompt}`
              }
            ]
          }
        ],
        inferenceConfig: {
          maxTokens: 4000,
          temperature: 0.7,
          topP: 0.9,
        },
      };
    }
    
    const command = new InvokeModelCommand({
      modelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(requestBody),
    });

    const response = await client.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    
    let analysis: string;
    if (modelId.includes('anthropic.claude')) {
      analysis = responseBody.content[0].text;
    } else if (modelId.includes('amazon.titan')) {
      analysis = responseBody.results[0].outputText;
    } else if (modelId.includes('amazon.nova')) {
      analysis = responseBody.output.message.content[0].text;
    } else {
      analysis = 'Unsupported model format';
    }

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error('Bedrock API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze response' },
      { status: 500 }
    );
  }
}


