# AI Assistant Implementation Guide
## Complete Code & Architecture for Support Response Analysis

This document contains the complete implementation of the AI-powered support response analyzer, combining all components.

---

## System Architecture

```
User Input (Customer Comment + Support Response)
    ↓
Frontend (React/Next.js)
    ↓
API Route (/api/analyze)
    ↓
AWS Bedrock (Claude AI)
    ↓
Structured Analysis with 12 Principles
    ↓
Display with Copy Buttons & Sections
```

---

## Complete System Prompt

This is the exact prompt used to train the AI:

```
You are a communication coach. Analyze the support response and provide EXACTLY 4 sections.

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

OUTPUT FORMAT:

## What Was Done Well
- Point 1
- Point 2

## Areas Needing Improvement
- Point 1
- Point 2

## Principle Checklist

**1. Building Trust:** ✓ Brief comment

**2. Active Listening:** ⚠️ Brief comment

**3. Clear Communication:** ✓ Brief comment

**4. Taking Ownership:** ✓ Brief comment

**5. Smart Empathy:** ⚠️ Brief comment

**6. Proactive Updates:** ✓ Brief comment

**7. Ice Breaking:** ⚠️ Brief comment

**8. Early Questions:** ✓ Brief comment

**9. Sense of Urgency:** ✓ Brief comment

**10. Shared Responsibility:** ✓ Brief comment

**11. Win-Win Solutions:** ✓ Brief comment

**12. Structured Responses:** ✓ Brief comment

## Improved Response

Hi [Name],

We understand [the problem]. We want to help you resolve this quickly.

Here are the steps:
• Step 1
• Step 2
• Step 3

Example: [if needed]

**Next steps:**
[What customer should do]

**In the meantime:**
[What to expect]

**Internal:**
[Internal notes]

Let us know if you need further assistance.

Thanks,
[Name]

STOP HERE. Write nothing after the signature.
```

---

## User Prompt Templates

### For Initial Analysis:

```
**Customer Comment:**
${customerComment}

**Support Response to Analyze:**
${yourAnswer}

Please analyze this response against the 12 principles and provide detailed feedback.
```

### For Follow-up Questions:

```
**Original Customer Comment:**
${customerComment}

**Original Support Response:**
${yourAnswer}

**Follow-up Question:**
${followUpQuestion}

Please answer the follow-up question in the context of the original analysis and the 12 communication principles.
```

---

## Complete Frontend Code (src/app/ai-assistant/page.tsx)

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import ScrollToTop from '@/components/ScrollToTop';
import ReactMarkdown from 'react-markdown';

// Copy Button Component
function CopyButton({ text, language }: { text: string; language: 'en' | 'he' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors flex items-center gap-1"
      title={language === 'he' ? 'העתק' : 'Copy'}
    >
      {copied ? (
        <>
          ✓ {language === 'he' ? 'הועתק' : 'Copied'}
        </>
      ) : (
        <>
          📋 {language === 'he' ? 'העתק' : 'Copy'}
        </>
      )}
    </button>
  );
}

export default function AIAssistant() {
  const { language } = useLanguage();
  const [customerComment, setCustomerComment] = useState('');
  const [yourAnswer, setYourAnswer] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  // Parse analysis into sections
  const parseAnalysis = (text: string) => {
    let cleanedText = text;
    const thanksMatch = cleanedText.match(/Thanks,\s*\n[^\n]+/);
    if (thanksMatch) {
      const signatureEnd = cleanedText.indexOf(thanksMatch[0]) + thanksMatch[0].length;
      cleanedText = cleanedText.substring(0, signatureEnd);
    }
    
    const sections = [];
    const lines = cleanedText.split('\n');
    let currentSection = { title: '', content: '' };
    
    for (const line of lines) {
      if (line.trim().startsWith('##')) {
        if (currentSection.title) sections.push({ ...currentSection });
        currentSection = { 
          title: line.replace(/^##\s*/, '').replace(/\*/g, '').trim(), 
          content: '' 
        };
      } else if (line.trim()) {
        currentSection.content += line + '\n';
      }
    }
    
    if (currentSection.title) sections.push(currentSection);
    
    return sections.filter((section, index, self) => {
      return index === self.findIndex(s => 
        s.title.toLowerCase() === section.title.toLowerCase()
      );
    }).filter(s => s.content.trim());
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setElapsedTime(0);
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleAnalyze = async () => {
    if (!customerComment.trim() || !yourAnswer.trim()) {
      setError(language === 'he' ? 'נא למלא את שני השדות' : 'Please fill in both fields');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis('');

    try {
      const controller = new AbortController();
      setAbortController(controller);
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerComment, yourAnswer }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze');
      }

      setAnalysis(data.analysis);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError(language === 'he' ? 'הניתוח בוטל' : 'Analysis cancelled');
      } else {
        setError(err.message || 'An error occurred');
      }
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleCancel = () => {
    if (abortController) {
      abortController.abort();
      setIsLoading(false);
      setAbortController(null);
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || isLoading) return;

    const newMessage = { role: 'user' as const, content: chatInput };
    const updatedMessages = [...chatMessages, newMessage];
    setChatMessages(updatedMessages);
    setChatInput('');
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerComment,
          yourAnswer,
          followUpQuestion: chatInput,
          chatHistory: updatedMessages,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setChatMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.analysis }
      ]);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError(language === 'he' ? 'הבקשה ארכה יותר מדי' : 'Request took too long');
      } else {
        setChatMessages(prev => [
          ...prev,
          { role: 'assistant', content: `Error: ${err.message}` }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const content = {
    en: {
      title: 'AI Communication Assistant',
      subtitle: 'Analyze your customer responses against professional communication principles',
      customerLabel: 'Customer Comment',
      customerPlaceholder: 'Paste the customer\'s comment or question from Salesforce...',
      answerLabel: 'Your Proposed Answer',
      answerPlaceholder: 'Write your proposed response to the customer...',
      analyzeButton: 'Analyze Response',
      analyzing: 'Analyzing...',
      analysisTitle: 'AI Analysis',
      chatTitle: 'Continue Discussion',
      chatPlaceholder: 'Ask a follow-up question...',
      sendButton: 'Send',
      clearButton: 'Clear All',
    },
    he: {
      title: 'עוזר תקשורת AI',
      subtitle: 'נתח את התשובה שלך מול עקרונות התקשורת המקצועית',
      customerLabel: 'תגובת הלקוח',
      customerPlaceholder: 'הדבק את תגובת/שאלת הלקוח מ-Salesforce...',
      answerLabel: 'התשובה המוצעת שלך',
      answerPlaceholder: 'כתוב את התשובה המוצעת שלך ללקוח...',
      analyzeButton: 'נתח תשובה',
      analyzing: 'מנתח...',
      analysisTitle: 'ניתוח AI',
      chatTitle: 'המשך שיחה',
      chatPlaceholder: 'שאל שאלת המשך...',
      sendButton: 'שלח',
      clearButton: 'נקה הכל',
    },
  };

  const t = content[language];

  const handleClear = () => {
    setCustomerComment('');
    setYourAnswer('');
    setAnalysis('');
    setError('');
    setChatMessages([]);
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <ScrollToTop />
      <Breadcrumbs />

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-scale-in">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 animate-fade-in">
          {t.subtitle}
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 animate-slide-in-left">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              📋 {t.customerLabel}
            </label>
            <textarea
              value={customerComment}
              onChange={(e) => setCustomerComment(e.target.value)}
              placeholder={t.customerPlaceholder}
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-800"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 animate-slide-in-left">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              ✍️ {t.answerLabel}
            </label>
            <textarea
              value={yourAnswer}
              onChange={(e) => setYourAnswer(e.target.value)}
              placeholder={t.answerPlaceholder}
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-800"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
            {!isLoading ? (
              <>
                <button
                  onClick={handleAnalyze}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {t.analyzeButton}
                </button>
                <button
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  {t.clearButton}
                </button>
              </>
            ) : (
              <>
                <button
                  disabled
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold opacity-50 cursor-not-allowed"
                >
                  {`${t.analyzing} (${elapsedTime}s)`}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
                >
                  {language === 'he' ? '⏹ ביטול' : '⏹ Cancel'}
                </button>
              </>
            )}
          </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>

      {/* AI Analysis Section */}
      {analysis && (
        <div className="space-y-6">
          {parseAnalysis(analysis).map((section, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6 animate-slide-in-right">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                  {section.title}
                </h3>
                <CopyButton text={section.content.trim()} language={language} />
              </div>
              <div className="prose prose-lg max-w-none text-gray-800" dir="auto" style={{ textAlign: 'start' }}>
                <ReactMarkdown>{section.content}</ReactMarkdown>
              </div>
            </div>
          ))}

          {/* Chat Section */}
          <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              💬 {t.chatTitle}
            </h3>
            
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-50 ml-8'
                      : 'bg-gray-50 mr-8'
                  }`}
                >
                  <p className="text-sm text-gray-800" dir="auto" style={{ textAlign: 'start' }}>{msg.content}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendChat()}
                placeholder={t.chatPlaceholder}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-800"
                dir={language === 'he' ? 'rtl' : 'ltr'}
              />
              <button
                onClick={handleSendChat}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {t.sendButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
```

---

## Complete Backend Code (src/app/api/analyze/route.ts)

```typescript
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { customerComment, yourAnswer, followUpQuestion, chatHistory } = await request.json();

    if (!customerComment || !yourAnswer) {
      return NextResponse.json(
        { error: 'Customer comment and your answer are required' },
        { status: 400 }
      );
    }

    // Initialize Bedrock client
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

    // System prompt with 12 principles
    const systemPrompt = `You are a communication coach. Analyze the support response and provide EXACTLY 4 sections.

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

OUTPUT FORMAT:

## What Was Done Well
- Point 1
- Point 2

## Areas Needing Improvement
- Point 1
- Point 2

## Principle Checklist

**1. Building Trust:** ✓ Brief comment

**2. Active Listening:** ⚠️ Brief comment

**3. Clear Communication:** ✓ Brief comment

**4. Taking Ownership:** ✓ Brief comment

**5. Smart Empathy:** ⚠️ Brief comment

**6. Proactive Updates:** ✓ Brief comment

**7. Ice Breaking:** ⚠️ Brief comment

**8. Early Questions:** ✓ Brief comment

**9. Sense of Urgency:** ✓ Brief comment

**10. Shared Responsibility:** ✓ Brief comment

**11. Win-Win Solutions:** ✓ Brief comment

**12. Structured Responses:** ✓ Brief comment

## Improved Response

Hi [Name],

We understand [the problem]. We want to help you resolve this quickly.

Here are the steps:
• Step 1
• Step 2
• Step 3

Example: [if needed]

**Next steps:**
[What customer should do]

**In the meantime:**
[What to expect]

**Internal:**
[Internal notes]

Let us know if you need further assistance.

Thanks,
[Name]

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

Please analyze this response against the 12 principles and provide detailed feedback.`;
    }

    const modelId = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0';
    
    let requestBody: any;
    if (modelId.includes('anthropic.claude')) {
      requestBody = {
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 2000,
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
          maxTokenCount: 2000,
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
          maxTokens: 2000,
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
    
    // Extract text based on model type
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
```

---

## Environment Variables Required

```env
# AWS Credentials
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_SESSION_TOKEN=your_session_token (optional)

# Model Selection
BEDROCK_MODEL_ID=amazon.nova-pro-v1:0

# Supported models:
# - anthropic.claude-3-5-sonnet-20241022-v2:0
# - anthropic.claude-3-5-sonnet-20240620-v1:0
# - anthropic.claude-opus-4-5-20251101-v1:0
# - amazon.nova-pro-v1:0
# - amazon.titan-text-express-v1
```

---

## UI/UX Features

### 1. **Input Section**
- Full-width text areas
- Clear labels in both languages
- Validation for empty fields

### 2. **Analysis Section**
- Markdown rendering with ReactMarkdown
- Sections split into separate cards
- Copy button for each section
- Timer showing elapsed seconds during analysis

### 3. **Follow-up Chat**
- Maintains context from original analysis
- Chat history preserved
- Quick follow-up questions support

### 4. **Error Handling**
- Timeout after 90 seconds
- Cancel button during analysis
- Clear error messages

---

## For Claude AI Integration

To replicate this in Claude (without AWS Bedrock):

### Step 1: Copy the System Prompt
Use the complete system prompt shown above.

### Step 2: Format Your Input
```
**Customer Comment:**
[Paste actual customer comment]

**Support Response to Analyze:**
[Paste actual support response]

Please analyze this response against the 12 principles and provide detailed feedback.
```

### Step 3: Get Structured Output
Claude will return analysis in the exact format:
- What Was Done Well
- Areas Needing Improvement
- Principle Checklist (all 12)
- Improved Response

### Step 4: Ask Follow-ups
```
Based on your analysis, can you explain more about [specific principle]?
```

---

## Best Practices

### For System Prompt:
✅ Keep format examples concise  
✅ Explicitly state "STOP HERE" after signature  
✅ List all 12 principles by name  
✅ Use consistent markdown headers (##)  

### For User Input:
✅ Include full customer comment (not summary)  
✅ Include complete support response  
✅ Use exact **labels** for parsing  

### For Output Processing:
✅ Parse by ## headers  
✅ Deduplicate sections  
✅ Clean up post-signature commentary  
✅ Preserve markdown formatting  

---

## Testing Examples

### Example 1: Poor Response

**Input:**
```
Customer: Our production system is down! Database timeout errors everywhere!

Support: Can you send logs?
```

**Expected Output:**
- ⚠️ No empathy or urgency
- ⚠️ No taking ownership
- ⚠️ Missing early questions
- ✓ Clear request

### Example 2: Good Response

**Input:**
```
Customer: Our production system is down! Database timeout errors everywhere!

Support: I understand this is affecting your production environment, and I want to help resolve this quickly.

To investigate faster, could you provide:
• Database logs from the last hour
• Your database version
• Any recent changes

I'll start looking into known timeout issues in parallel. I'll update you by 2 PM with findings.
```

**Expected Output:**
- ✓ Shows empathy + action
- ✓ Takes ownership
- ✓ Clear early questions
- ✓ Sense of urgency
- ✓ Proactive update commitment

---

## Model Recommendations

Based on extensive testing:

**Best Results:**
- Claude 3.5 Sonnet v2
- Claude Opus 4.5
- GPT-4 Turbo

**Good Results:**
- Claude 3.5 Sonnet v1
- Amazon Nova Pro
- GPT-4

**Avoid:**
- Amazon Titan (formatting issues)
- GPT-3.5 (inconsistent structure)

---

## Implementation Checklist

For building your own version:

- [ ] Set up AI provider (AWS Bedrock, OpenAI, Anthropic)
- [ ] Implement system prompt with 12 principles
- [ ] Create input form (2 text areas)
- [ ] Build API route for AI calls
- [ ] Parse response into sections
- [ ] Add copy buttons per section
- [ ] Implement loading state with timer
- [ ] Add cancel/abort functionality
- [ ] Support follow-up questions
- [ ] Handle errors gracefully
- [ ] Test with real examples
- [ ] Deploy and monitor

---

## Deployment Notes

- **Next.js 14+** recommended
- **AWS Bedrock**: Requires IAM permissions for model access
- **Environment variables**: Use `.env.local` for development
- **Production**: Use secure credential management
- **Timeouts**: 90 seconds works well for most models
- **Rate limiting**: Consider implementing for production

---

## Support & Documentation

- Full training principles: See `TRAINING_PRINCIPLES_FOR_AI.md`
- Quick prompt template: See `PROMPTS.md`
- Live demo: http://localhost:3000/ai-assistant
- Repository: https://github.com/DiegoSucharczuk/supportablility-training

---

**Author:** Diego Sucharczuk  
**Role:** Escalations Manager, CyberArk  
**Purpose:** Help support engineers improve client communication through AI-powered analysis
