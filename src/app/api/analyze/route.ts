import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { customerComment, yourAnswer, followUpQuestion, chatHistory, modelId: requestModelId } = await request.json();

    if (!customerComment || !yourAnswer) {
      return NextResponse.json(
        { error: 'Customer comment and your answer are required' },
        { status: 400 }
      );
    }

    // Use AWS Bedrock models
    const modelId = requestModelId || process.env.BEDROCK_MODEL_ID || 'us.anthropic.claude-3-5-sonnet-20241022-v2:0';
    const clientConfig: any = {
      region: process.env.AWS_REGION || 'us-east-1',
    };
    
    if (process.env.AWS_BEARER_TOKEN_BEDROCK) {
      clientConfig.token = { token: async () => process.env.AWS_BEARER_TOKEN_BEDROCK! };
    } else if (process.env.AWS_ACCESS_KEY_ID) {
      const credentials: any = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      };
      if (process.env.AWS_SESSION_TOKEN) {
        credentials.sessionToken = process.env.AWS_SESSION_TOKEN;
      }
      clientConfig.credentials = credentials;
    }

    const client = new BedrockRuntimeClient(clientConfig);

    // Enhanced system prompt with better formatting instructions
    const systemPrompt = `You are a communication coach analyzing technical support responses.

CRITICAL FORMATTING RULES:
- Each principle MUST be on its own line with a blank line after it
- Use EXACTLY this format for the Principle Checklist section
- Do NOT combine multiple principles on one line

The 12 principles to evaluate:
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

OUTPUT FORMAT (follow this EXACTLY):

## What Was Done Well

- Point 1
- Point 2
- Point 3

## Areas Needing Improvement

- Point 1
- Point 2
- Point 3

## Principle Checklist

**1. Building Trust:** ✓ or ⚠️ Brief comment

**2. Active Listening:** ✓ or ⚠️ Brief comment

**3. Clear Communication:** ✓ or ⚠️ Brief comment

**4. Taking Ownership:** ✓ or ⚠️ Brief comment

**5. Smart Empathy:** ✓ or ⚠️ Brief comment

**6. Proactive Updates:** ✓ or ⚠️ Brief comment

**7. Ice Breaking:** ✓ or ⚠️ Brief comment

**8. Early Questions:** ✓ or ⚠️ Brief comment

**9. Sense of Urgency:** ✓ or ⚠️ Brief comment

**10. Shared Responsibility:** ✓ or ⚠️ Brief comment

**11. Win-Win Solutions:** ✓ or ⚠️ Brief comment

**12. Structured Responses:** ✓ or ⚠️ Brief comment

## Improved Response

Hi [Name],

I understand that [restate the problem showing you listened].

[Explain what happened - 2-3 sentences about root cause]

[Explain what this means - why it's causing the problem]

### Next Steps:
• [Action 1 - what we're doing]
• [Action 2 - what we're doing]
• [Action 3 - what we're doing]

I'll update you within [timeframe] with findings.

### In the meantime:
If the customer cannot proceed until we present a full solution, please ask them to:
• [Customer action 1]
• [Customer action 2]
• [Customer action 3]

### Internal note to support:
[Guidance for support team]

Thank you for your collaboration. Please let me know if you require any additional clarification.

Best regards,
[Your Name]

STOP HERE. Write nothing after the signature.`;

    let userPrompt: string;
    
    if (followUpQuestion) {
      userPrompt = `**Original Customer Comment:**
${customerComment}

**Original Support Response:**
${yourAnswer}

**Follow-up Question:**
${followUpQuestion}

Please answer the follow-up question in the context of the original analysis and the 12 communication principles.`;
    } else {
      userPrompt = `**Customer Comment:**
${customerComment}

**Support Response to Analyze:**
${yourAnswer}

Please analyze this response against the 12 principles and provide detailed feedback.

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


