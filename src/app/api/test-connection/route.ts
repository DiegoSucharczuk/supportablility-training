import { NextRequest, NextResponse } from 'next/server';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

export async function POST(request: NextRequest) {
  try {
    const { credentials } = await request.json();

    if (!credentials?.accessKeyId || !credentials?.secretAccessKey || !credentials?.region) {
      return NextResponse.json(
        { success: false, error: 'Missing credentials' },
        { status: 400 }
      );
    }

    // Create Bedrock client with provided credentials
    const bedrockClient = new BedrockRuntimeClient({
      region: credentials.region,
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
        ...(credentials.sessionToken && { sessionToken: credentials.sessionToken }),
      },
    });

    // Simple test prompt
    const testPrompt = 'Hello, please respond with OK if you can read this.';
    
    const command = new InvokeModelCommand({
      modelId: 'global.anthropic.claude-sonnet-4-5-20250929-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: testPrompt,
          },
        ],
      }),
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));

    return NextResponse.json({
      success: true,
      message: 'Connection successful',
      response: responseBody.content[0]?.text || 'Connected',
    });

  } catch (error: any) {
    console.error('Connection test error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Connection failed',
        details: error.name,
      },
      { status: 500 }
    );
  }
}
