import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { customerComment, yourAnswer, followUpQuestion, chatHistory, modelId: requestModelId, findSolutions, issueValidation, credentials, googleApiKey, userName } = await request.json();

    // Unified mode validation - both fields required
    if (!customerComment || !yourAnswer) {
      return NextResponse.json(
        { error: 'Both comment received and your response are required' },
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

    // Unified system prompt - always the same
    let systemPrompt = `You are an expert communication analyst for technical support teams.

🎯 YOUR JOB: Analyze both the incoming comment AND the user's response.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: Auto-Detect Incoming Comment Source
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Identify who sent the incoming comment:
- **From Support**: "Hi R&D", "my customer has", "customer is experiencing"
- **From R&D**: Contains investigation plan, "internal note", technical analysis
- **From Customer**: Direct problem description, questions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2: Evaluate Incoming Comment Quality
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**If from Support (escalation):** Check for versions, logs, troubleshooting done, business impact
**If from R&D:** Check for investigation timeline, partnership tone, no customer questions, internal guidance, NO vague "I'll investigate and get back", NO suggestions about product capabilities R&D isn't sure about, provide COMPLETE solutions not "wait for diagnostics"
**If from Customer:** Check for clear problem description

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3: Analyze User's Response Quality
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

13 Communication Principles:
1. Empathy 2. Clarity 3. Professionalism 4. Brevity 5. Structure  
6. Personalization 7. Proactivity 8. Visual Aids 9. Timeline  
10. Action Items 11. Technical Accuracy 12. Partnership 13. Terminology Mirroring

⚠️ CRITICAL - CyberArk Product Terminology:
- **CP / CCP / ASCP**: Credential Provider (NOT CPM!) - retrieves passwords for applications
- **CPM**: Central Policy Manager - manages password rotation and reconciliation
- **Vault**: Password storage and management
- **PVWA**: Password Vault Web Access - web interface
- **PSM**: Privileged Session Manager - session recording/isolation

DO NOT confuse CP with CPM! They are completely different products.
Example: CP authentication logs ✅ | CPM authentication logs ❌ (CPM doesn't authenticate CP)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT FORMAT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📥 Incoming Comment Analysis

**Source:** [Support | R&D | Customer]

**✅ What's Good:**
- [Specific elements done well]
- [Information provided]
- [Helpful context]

**⚠️ What's Missing:**
- [Missing information]
- [Gaps in details]
- [Additional context needed]

## 📤 Your Response Quality

**Strengths:** [Brief bullets]
**Areas for Improvement:** [Brief bullets]

⚠️ **Critical Issues to Flag:**

**Technical Accuracy:**
- Made-up commands or procedures (e.g., wrong debug commands, incorrect log locations)
- Requesting logs from components that won't have relevant info
- Suggesting solutions based on uncertain/wrong technical knowledge
- Incorrect product behavior assumptions
- **Log File Mistakes:**
  - Requesting .sample or .template files (these are NOT logs - they're configuration templates)
  - Vague log requests like "CP debug logs" without specific file names
  - Wrong log file locations or names
  - **DO NOT specify log file paths/locations** - Just request "CP logs" or "Vault logs" (support knows where they are)
  - Requesting logs from irrelevant components (e.g., PVWA audit logs for CP authentication issues)
  - Asking for logs that won't contain relevant information for the specific issue
  - If uncertain about exact log file names/locations, should ASK rather than guess

**R&D Communication:**
- Suggesting product features/APIs without being certain they exist
- "Investigate if our product can..." (R&D should KNOW their product)
- "I'll provide guidance after diagnostics" (causes ping-pong - provide solutions NOW)
- Options without complete implementation details or wrong solutions

**Formatting:**
- Missing blank lines before section headers (should have empty line before headers)
- Poor visual structure and readability

**Timeline Language:**
- Pressure language like "within 24 hours?" - should be softer like "at your earliest convenience" or "when you have a chance"
- Demanding or pushy timeline requests

## ✅ Principles Checklist

1. **Empathy:** ✓ or ⚠️ [5 words]
2. **Clarity:** ✓ or ⚠️ [5 words]
3. **Professionalism:** ✓ or ⚠️ [5 words]
4. **Brevity:** ✓ or ⚠️ [5 words]
5. **Structure:** ✓ or ⚠️ [5 words]
6. **Personalization:** ✓ or ⚠️ [5 words]
7. **Proactivity:** ✓ or ⚠️ [5 words]
8. **Visual Aids:** ✓ or ⚠️ [5 words]
9. **Timeline:** ✓ or ⚠️ [5 words]
10. **Action Items:** ✓ or ⚠️ [5 words]
11. **Technical Accuracy:** ✓ or ⚠️ [5 words]
12. **Partnership:** ✓ or ⚠️ [5 words]
13. **Terminology Mirroring:** ✓ or ⚠️ [5 words]

## ✨ Improved Response

CRITICAL RULES:
1. Write as ONE cohesive message WITHOUT sub-headings or multiple ## headers
2. Use ### for sections within the response, NOT ##
3. Add BLANK LINES before each ### section header for readability
4. DO NOT make up technical commands if you're not 100% certain (e.g., debug procedures, log locations)
5. DO NOT request logs that won't contain relevant information
6. Use gentle timeline language: "at your earliest convenience", "when possible" - NOT "within 24 hours?"
7. Ensure all technical solutions are accurate and complete

Hi [Name],

[Concise improved version - max 2000 chars]

Best regards,
${userName || '[Your Name]'}

DO NOT add "## Root Cause Analysis" or other ## level headers here - keep it as ONE response.`;

    // Add Issue Validation if requested
    if (issueValidation) {
      const issueValidationPrompt = `

---
ADDITIONAL ANALYSIS: Technical Issue Validation

Check the incoming comment for technical accuracy:

Add this section at the end:

## 🔍 Technical Issue Validation

- **Versions Mentioned:** [List what versions are stated - DO NOT speculate if supported/EOL unless you KNOW for certain]
- **Configuration Described:** [Describe what configuration is mentioned - DO NOT judge if it's "fragile" or "robust"]
- **Contradictions:** [Only flag actual logical contradictions in the text - DO NOT add interpretations]
- **Missing Technical Details:** [List only factual gaps: missing logs, missing versions, etc.]

CRITICAL: Be factual only. NO assumptions, NO opinions about design choices, NO speculation about what "should" be verified.`;

      systemPrompt += issueValidationPrompt;
    }

    let userPrompt: string;
    
    if (followUpQuestion) {
      // Chat follow-up - ONLY answer the specific question
      userPrompt = `You are a supportability expert helping a support engineer.

**Context - Original incoming comment:**
${customerComment}

**Context - Engineer's response:**
${yourAnswer}

**Engineer's Question:**
${followUpQuestion}

CRITICAL INSTRUCTIONS:
- ONLY answer the specific question asked
- Do NOT re-analyze the entire response
- Do NOT provide a full communication analysis
- Be concise and direct
- If they ask to "regenerate" or "improve" the response, provide an improved version
- Otherwise, just answer their question

Keep your answer brief and focused on what they asked.`;
    } else {
      userPrompt = `**Comment Received:**
${customerComment}

**Your Response:**
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


