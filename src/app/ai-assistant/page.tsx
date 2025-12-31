'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import ScrollToTop from '@/components/ScrollToTop';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

// Animated Spinner Component
function LoadingSpinner() {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-pulse"></div>
      <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-purple-600 animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-4 border-t-purple-500 border-r-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
    </div>
  );
}

// Sanitization function
function sanitizeText(text: string): { sanitized: string; stats: { domains: number; ips: number; emails: number; servers: number }; replacements: Map<string, string> } {
  let sanitized = text;
  const stats = { domains: 0, ips: 0, emails: 0, servers: 0 };
  const replacements = new Map<string, string>();

  // Replace email addresses
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emails = text.match(emailRegex) || [];
  stats.emails = emails.length;
  let emailCounter = 0;
  sanitized = sanitized.replace(emailRegex, (match) => {
    const replacement = emailCounter === 0 ? 'user@company.com' : `user${emailCounter}@company.com`;
    replacements.set(replacement, match);
    emailCounter++;
    return replacement;
  });

  // Replace IP addresses
  const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
  const ips = text.match(ipRegex) || [];
  stats.ips = ips.length;
  let ipCounter = 0;
  sanitized = sanitized.replace(ipRegex, (match) => {
    const replacement = `10.0.0.${ipCounter + 1}`;
    replacements.set(replacement, match);
    ipCounter++;
    return replacement;
  });

  // Replace domain names (after @ and standalone FQDNs)
  const domainRegex = /\b(?:[a-zA-Z0-9-]+\.)+(?:com|net|org|int|local|corp|io|co|uk|us|de|fr|il)\b/gi;
  const domains = [...new Set((text.match(domainRegex) || []).map(d => d.toLowerCase()))];
  stats.domains = domains.length;
  
  // Create consistent replacements for each unique domain
  const domainReplacements: { [key: string]: string } = {};
  domains.forEach((domain, index) => {
    const parts = domain.split('.');
    const replacement = `server${index > 0 ? index : ''}.company.${parts[parts.length - 1]}`;
    domainReplacements[domain.toLowerCase()] = replacement;
  });
  
  sanitized = sanitized.replace(domainRegex, (match) => {
    const replacement = domainReplacements[match.toLowerCase()];
    if (replacement) {
      replacements.set(replacement, match);
      return replacement;
    }
    return match;
  });

  // Replace server/hostname patterns (uppercase alphanumeric combinations)
  const serverRegex = /\b[A-Z]{2,}[A-Z0-9]{3,}\b/g;
  const servers = [...new Set(text.match(serverRegex) || [])];
  stats.servers = servers.length;
  servers.forEach((server, index) => {
    const replacement = `SERVER${String(index + 1).padStart(2, '0')}`;
    const regex = new RegExp(`\\b${server}\\b`, 'g');
    sanitized = sanitized.replace(regex, replacement);
    replacements.set(replacement, server);
  });

  // Replace common customer/people names (case-insensitive but preserve in map)
  const namePatterns = [
    { pattern: /\bbarclays\b/gi, replacement: 'CompanyABC' },
    { pattern: /\bdaniel\b/gi, replacement: 'ContactPerson' },
    { pattern: /\bmanuel\b/gi, replacement: 'EngineerName' },
  ];
  
  namePatterns.forEach(({ pattern, replacement }) => {
    const matches = text.match(pattern) || [];
    if (matches.length > 0 && matches[0]) {
      // Store original with exact case from first match
      console.log(`Sanitizing: "${matches[0]}" -> "${replacement}"`);
      replacements.set(replacement, matches[0]);
      sanitized = sanitized.replace(pattern, replacement);
    }
  });

  console.log('Sanitization complete. Replacements:', Array.from(replacements.entries()));
  return { sanitized, stats, replacements };
}

// De-sanitization function - restore original data
function restoreOriginalData(text: string, replacementMap: Map<string, string>): string {
  let restored = text;
  
  console.log('De-sanitizing with map:', Array.from(replacementMap.entries()));
  
  // Sort by length descending to replace longer strings first (avoid partial replacements)
  const sortedEntries = Array.from(replacementMap.entries()).sort((a, b) => b[0].length - a[0].length);
  
  sortedEntries.forEach(([sanitized, original]) => {
    // Replace all occurrences regardless of case
    // Use a function to preserve context but replace with original
    const escapedSanitized = sanitized.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSanitized, 'gi');
    const matches = restored.match(regex);
    if (matches) {
      console.log(`Replacing "${sanitized}" with "${original}" (found ${matches.length} occurrences)`);
      restored = restored.replace(regex, original);
    } else {
      console.log(`No matches found for "${sanitized}"`);
    }
  });
  
  console.log('De-sanitization complete');
  return restored;
}

// Highlight differences component
function HighlightedText({ text, highlights }: { text: string; highlights: string[] }) {
  if (highlights.length === 0) return <span>{text}</span>;
  
  let result = text;
  highlights.forEach(highlight => {
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
  });
  
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

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
  const { settings, isConfigured } = useSettings();
  const [customerQuestion, setCustomerQuestion] = useState('');
  const [engineerAnswer, setEngineerAnswer] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [chatInput, setChatInput] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [selectedModel, setSelectedModel] = useState('global.anthropic.claude-sonnet-4-5-20250929-v1:0');
  const [loadingStage, setLoadingStage] = useState(0);
  const [demoTimeout, setDemoTimeout] = useState<NodeJS.Timeout | null>(null);
  const [findSolutions, setFindSolutions] = useState(false);
  const [analysisType, setAnalysisType] = useState<'customer' | 'rnd'>('customer');
  const [showSanitizationModal, setShowSanitizationModal] = useState(false);
  const [sanitizedQuestion, setSanitizedQuestion] = useState('');
  const [sanitizedAnswer, setSanitizedAnswer] = useState('');
  const [sanitizationStats, setSanitizationStats] = useState({ domains: 0, ips: 0, emails: 0, servers: 0 });
  const [replacementMap, setReplacementMap] = useState<Map<string, string>>(new Map());
  const [collapsedSections, setCollapsedSections] = useState<Set<number>>(new Set([100])); // 100 = Principle Checklist index
  const [isEditingMaskedData, setIsEditingMaskedData] = useState(false);

  // Available models (only those with IAM permissions)
  const models = [
    {
      id: 'global.anthropic.claude-sonnet-4-5-20250929-v1:0',
      name: 'Claude Sonnet 4.5',
      description: 'Latest Sonnet model with enhanced capabilities',
      badge: '🏆 Recommended',
      color: 'purple'
    }
  ];

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
      // Only split on ## headers, not ### headers
      if (line.trim().match(/^##\s+/) && !line.trim().startsWith('###')) {
        if (currentSection.title) sections.push({ ...currentSection });
        currentSection = { 
          title: line.replace(/^##\s*/, '').replace(/\*/g, '').trim(), 
          content: '' 
        };
      } else {
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
      setLoadingStage(0);
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Separate effect for updating loading stages based on elapsed time
  useEffect(() => {
    if (!isLoading) return;
    
    const maxStage = findSolutions ? 5 : 4;
    
    if (elapsedTime === 2 && loadingStage < 1) setLoadingStage(1);
    else if (elapsedTime === 5 && loadingStage < 2) setLoadingStage(2);
    else if (elapsedTime === 10 && loadingStage < 3) setLoadingStage(3);
    else if (elapsedTime === 15 && loadingStage < 4) setLoadingStage(4);
    else if (elapsedTime === 20 && loadingStage < maxStage) setLoadingStage(maxStage);
  }, [isLoading, elapsedTime, findSolutions, loadingStage]);

  // Auto-collapse Principle Checklist section when analysis is received
  useEffect(() => {
    if (analysis) {
      const sections = parseAnalysis(analysis);
      const principleIdx = sections.findIndex(s => 
        s.title.toLowerCase().includes('principle checklist') || 
        s.title.toLowerCase().includes('עקרונות')
      );
      if (principleIdx >= 0) {
        setCollapsedSections(new Set([principleIdx]));
      }
    }
  }, [analysis]);

  const handleAnalyze = async () => {
    if (!customerQuestion.trim() || !engineerAnswer.trim()) {
      setError(language === 'he' ? 'נא למלא את שני השדות' : 'Please fill in both fields');
      return;
    }

    // Sanitize the inputs
    const questionResult = sanitizeText(customerQuestion);
    const answerResult = sanitizeText(engineerAnswer);
    
    setSanitizedQuestion(questionResult.sanitized);
    setSanitizedAnswer(answerResult.sanitized);
    setSanitizationStats({
      domains: questionResult.stats.domains + answerResult.stats.domains,
      ips: questionResult.stats.ips + answerResult.stats.ips,
      emails: questionResult.stats.emails + answerResult.stats.emails,
      servers: questionResult.stats.servers + answerResult.stats.servers,
    });
    
    // Merge replacement maps from both question and answer
    const mergedReplacements = new Map<string, string>();
    questionResult.replacements.forEach((value, key) => mergedReplacements.set(key, value));
    answerResult.replacements.forEach((value, key) => mergedReplacements.set(key, value));
    setReplacementMap(mergedReplacements);
    
    // Show sanitization modal
    setShowSanitizationModal(true);
  };

  const handleApproveAndAnalyze = async () => {
    setShowSanitizationModal(false);
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
        body: JSON.stringify({ 
          customerComment: sanitizedQuestion, 
          yourAnswer: sanitizedAnswer,
          modelId: selectedModel,
          findSolutions: findSolutions,
          analysisType: analysisType,
          credentials: settings.awsCredentials,
          googleApiKey: settings.googleApiKey,
          userName: settings.userName || 'Support Engineer'
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze');
      }

      // Restore original customer data in the AI response
      console.log('About to restore data. Replacement map has', replacementMap.size, 'entries');
      console.log('Replacement map entries:', Array.from(replacementMap.entries()));
      console.log('AI response before restoration (first 200 chars):', data.analysis.substring(0, 200));
      
      const restoredAnalysis = restoreOriginalData(data.analysis, replacementMap);
      
      console.log('AI response after restoration (first 200 chars):', restoredAnalysis.substring(0, 200));
      setAnalysis(restoredAnalysis);
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
    // Also cancel demo if running
    if (demoTimeout) {
      clearTimeout(demoTimeout);
      setDemoTimeout(null);
      setIsLoading(false);
    }
  };

  const handleDemoLoading = () => {
    // First, paste the customer question and engineer answer
    setCustomerQuestion(`Hi AIM R&D,

My customer has opened a case with us in regards to their Linux providers Unix servers
• CP v14.00
• CLIPasswordsdk

After a recent OS Patch which I'm still trying to have the customer confirm which one. The customers Linux Providers have started to fail Allowed Machine Authentication.

The Providers were whitelisted in the Application's authentication list with their short hostname name.

After the patch the customer is needing to add the IP/FQDN under allowed machines of Application created in CyberArk. The issue here is that the customer has 100's of applications.

They has found that the patch removed an entry from the host file.

Customer would like to confirm if aimagent is depending on etc\\hostfile for shortname? If not, what could be the reason for sudden break in the configuration.

[sysabc @SGDPSR00002][PROD]: sysabc > hostname -f
SGDP.int.bar.com
[sysabc @ SGDPSR00002][PROD]: sysabc > hostname -s
SGDPSR00002

I have found the following Article https://community.cyberark.com/s/article/How-does-the-Application-Password-Provider-determine-server-s-IP-address however speaking with Diego, there was mention of an API call.

If we can confirm how we obtain the and attach the hostname to the call, I think this would greatly help Barclays with a plan on how they can reverse/amend the settings which has trigger the change in behaviour for them rather than mass updates to the Application information.

Please do let me know if there is further information you would like to see.

Best regards,
Manuel Ortega`);
    
    setEngineerAnswer(`Hi Daniel

The FQDN apparently changed from the Linux upgrade

In Linux, the FQDN is determined from the "hostname -f" command.

What Diego talks about with the api call is relevant for Windows.

CP blocks every communication and password request from unknown hostname, hence if host name was changed it will block all of the requests (from this unauthorized end point)

The client should update his application's authentication list with the new hostnames`);

    // Wait a moment for user to see the pasted content, then start loading animation
    setTimeout(() => {
      setIsLoading(true);
      setError('');
      
      // Simulate loading for 20 seconds to show all stages, then show demo analysis
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setDemoTimeout(null);
        
        // Set demo analysis in the appropriate language
        const demoAnalysis = language === 'he' ? `
## 📊 ניתוח כללי

התשובה שלך מציגה גישה מקצועית טובה עם מספר נקודות חזקות. עם זאת, ישנם מספר תחומים שניתן לשפר כדי להפוך את התקשורת ליעילה וברורה יותר.

**נקודות חזקות:**
- טון מכבד ומקצועי
- מבנה לוגי של המידע
- פירוט טכני ברור

**תחומים לשיפור:**
- הוספת הקדמה אישית
- שימוש בעזרים ויזואליים (קבצים מצורפים, צילומי מסך)
- סיכום ברור בסוף

## ✅ עקרונות שהופעלו בהצלחה

1. **בהירות** - ההסברים הטכניים ברורים ומפורטים
2. **מקצועיות** - השפה והטון שומרים על רמה מקצועית גבוהה
3. **מבנה** - המידע מסודר באופן הגיוני

## ⚠️ עקרונות שדורשים שיפור

1. **אמפתיה** - חסר הכרה בתסכול הלקוח
2. **התאמה אישית** - אין פנייה בשם או התייחסות להיסטוריה משותפת
3. **עזרים ויזואליים** - לא הוצעו צילומי מסך או דיאגרמות

## 💡 המלצות לשיפור

**הוסף פתיחה אישית:**
\`\`\`
שלום [שם הלקוח],

תודה על פנייתך. 
אני מבין שהנושא הזה גורם לאתגרים במערכת שלך, ואני כאן כדי לעזור לך לפתור את זה.
\`\`\`

**הוסף עזרים ויזואליים:**
- צרף צילומי מסך של התצורה הנכונה
- הוסף קישורים למסמכי תיעוד רלוונטיים
- הצע להגדיר שיחת Zoom למעקב אם נדרש

**שפר את הסיכום:**
\`\`\`
לסיכום:
1. [צעד ראשון]
2. [צעד שני]
3. [צעד שלישי]

אני זמין לכל שאלה נוספת. אנא עדכן אותי לגבי התוצאות.
\`\`\`

## ✨ תשובה מומלצת

שלום [שם הלקוח],

תודה על פנייתך לגבי [בעיה]. אני מבין שזה משפיע על [השפעה על העסק], ואני כאן כדי לעזור.

**הבנתי את הבעיה:**
[תיאור קצר של הבעיה במילים שלך]

**הפתרון:**
1. [צעד ראשון עם הסבר]
2. [צעד שני עם הסבר]
3. [צעד שלישי עם הסבר]

אני מצרף:
- צילום מסך של התצורה הנכונה
- קישור למדריך מפורט: [קישור]

**הצעדים הבאים:**
אנא בדוק את השינויים ועדכן אותי תוך 24 שעות. אם תיתקל בבעיות, אני זמין לשיחת Zoom לתמיכה ישירה.

בברכה,
[שמך]
CyberArk Technical Support
\`\`\`
` : `
## 📊 Overall Analysis

Your response demonstrates a good professional approach with several strong points. However, there are multiple areas where improvements can enhance communication effectiveness and clarity.

**Strengths:**
- Respectful and professional tone
- Logical information structure
- Clear technical details

**Areas for Improvement:**
- Add personal greeting
- Use visual aids (attachments, screenshots)
- Include clear summary at the end

## ✅ Successfully Applied Principles

1. **Clarity** - Technical explanations are clear and detailed
2. **Professionalism** - Language and tone maintain high professional standards
3. **Structure** - Information is organized logically

## ⚠️ Principles Requiring Improvement

1. **Empathy** - Missing acknowledgment of customer frustration
2. **Personalization** - No greeting by name or reference to shared history
3. **Visual Aids** - No screenshots or diagrams offered

## 💡 Improvement Recommendations

**Add Personal Opening:**
\`\`\`
Hi [Customer Name],

Thank you for reaching out. 
I understand this issue is causing challenges in your environment, and I'm here to help you resolve it.
\`\`\`

**Include Visual Aids:**
- Attach screenshots of the correct configuration
- Add links to relevant documentation
- Offer to schedule a Zoom call for follow-up if needed

**Enhance Summary:**
\`\`\`
To summarize:
1. [First step]
2. [Second step]
3. [Third step]

I'm available for any questions. Please update me on the results.
\`\`\`

## ✨ Recommended Response

Hi Daniel,
Thank you for reaching out about the Linux hostname authentication failures after your recent OS patch.
I understand this is impacting your environment significantly since you have 100's of applications that may need authentication list updates, and I'm here to help.

### What I understand:
After a recent OS patch on your Linux servers (CP v14.00, CLIPasswordsdk), the Application Password Providers started failing Allowed Machine Authentication.
The providers were originally whitelisted using their short hostname (SGDPSR00002), but after the patch, the FQDN (SGDP.int.bar.com) is being used instead.
A host file entry was also removed during the patch.

### The Solution:
1. **Verify the hostname change**: Run \`hostname -f\` on affected servers to confirm the FQDN is now being reported instead of the short name. This is what CyberArk's Application Password Provider uses to identify the machine.

2. **Update authentication lists**: For immediate resolution, add the new FQDN (SGDP.int.bar.com) to your Application's authentication list in CyberArk. This will allow the providers to authenticate with the new hostname.

3. **Long-term solution**: Work with your Linux team to either restore the host file entries or standardize on FQDN-based authentication across all your applications to prevent this issue in future patches.

### I'm attaching:
Screenshot showing how to update the authentication list in PVWA.
Link to detailed guide: https://community.cyberark.com/s/article/How-does-the-Application-Password-Provider-determine-server-s-IP-address.

### Next Steps:
Please test these changes on a few test applications first and update me within 24 hours.
If you encounter any issues or need help with bulk updates across your 100's of applications, I'm available for a Zoom call to discuss automation options or scripting solutions.

Best regards,
Diego
CyberArk Technical Support
`;

        setAnalysis(demoAnalysis);
      }, 20000);
      
      setDemoTimeout(timeout);
    }, 800); // Small delay to let user see content being pasted
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
          customerComment: customerQuestion,
          yourAnswer: engineerAnswer,
          followUpQuestion: chatInput,
          chatHistory: updatedMessages,
          modelId: selectedModel
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
      title: '🤖 AI Communication Assistant',
      subtitle: 'Analyze your customer responses against 12 professional communication principles',
      customerLabel: 'Customer Question',
      customerPlaceholder: 'Paste the customer\'s question or issue from Salesforce...',
      answerLabel: 'Engineer\'s Proposed Answer',
      answerPlaceholder: 'Paste the engineer\'s response to analyze...',
      analysisTypeLabel: '📋 Analysis Type',
      analysisTypeCustomer: 'Customer Response (Communication Quality)',
      analysisTypeRnD: 'R&D Escalation (Technical Readiness)',
      analyzeButton: '🔍 Analyze Response',
      analyzing: 'Analyzing',
      analysisTitle: '📊 AI Analysis',
      chatTitle: '💬 Ask Follow-up Questions',
      chatPlaceholder: 'Ask about specific principles or improvements...',
      sendButton: 'Send',
      clearButton: '🗑️ Clear All',
      cancelButton: '⏹ Cancel',
      modelLabel: '🤖 AI Model',
      demoButton: '🎬 Show Full Demo',
      loadingStages: [
        '🔍 Reading your message...',
        '🔍 Searching CyberArk docs & web...',
        '🤔 Analyzing communication style...',
        '📋 Checking against 12 principles...',
        '✨ Generating improvements...',
        '📝 Finalizing analysis...'
      ],
      loadingStagesNoSearch: [
        '🔍 Reading your message...',
        '🤔 Analyzing communication style...',
        '📋 Checking against 12 principles...',
        '✨ Generating improvements...',
        '📝 Finalizing analysis...'
      ],
    },
    he: {
      title: '🤖 עוזר תקשורת AI',
      subtitle: 'נתח את התשובה מול 12 עקרונות התקשורת המקצועית',
      customerLabel: 'שאלת הלקוח',
      customerPlaceholder: 'הדבק את שאלת/בעיית הלקוח מ-Salesforce...',
      answerLabel: 'תשובת המהנדס המוצעת',
      answerPlaceholder: 'הדבק את תשובת המהנדס לניתוח...',
      analysisTypeLabel: '📋 סוג ניתוח',
      analysisTypeCustomer: 'תגובה ללקוח (איכות תקשורת)',
      analysisTypeRnD: 'העלאה לפיתוח (מוכנות טכנית)',
      modelLabel: 'מודל AI',
      analyzeButton: '🔍 נתח תשובה',
      analyzing: 'מנתח',
      analysisTitle: '📊 ניתוח AI',
      chatTitle: '💬 שאל שאלות המשך',
      chatPlaceholder: 'שאל על עקרונות ספציפיים או שיפורים...',
      sendButton: 'שלח',
      clearButton: '🗑️ נקה הכל',
      demoButton: '🎬 הצג דוגמה מלאה',
      cancelButton: '⏹ ביטול',
      loadingStages: [
        '🔍 קורא את ההודעה שלך...',
        '🔍 מחפש בתיעוד CyberArk ובאינטרנט...',
        '🤔 מנתח סגנון תקשורת...',
        '📋 בודק מול 12 עקרונות...',
        '✨ יוצר שיפורים...',
        '📝 מסיים ניתוח...'
      ],
      loadingStagesNoSearch: [
        '🔍 קורא את ההודעה שלך...',
        '🤔 מנתח סגנון תקשורת...',
        '📋 בודק מול 12 עקרונות...',
        '✨ יוצר שיפורים...',
        '📝 מסיים ניתוח...'
      ],
    },
  };

  const t = content[language];

  const handleClear = () => {
    setCustomerQuestion('');
    setEngineerAnswer('');
    setAnalysis('');
    setError('');
    setChatMessages([]);
  };

  const getModelColor = (color: string) => {
    const colors: any = {
      purple: 'from-purple-500 to-purple-700',
      indigo: 'from-indigo-500 to-indigo-700',
      blue: 'from-blue-500 to-blue-700',
      orange: 'from-orange-500 to-orange-700',
      green: 'from-green-500 to-green-700'
    };
    return colors[color] || colors.blue;
  };

  const selectedModelInfo = models.find(m => m.id === selectedModel);

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

      {/* Credentials Warning Banner */}
      {!isConfigured && (
        <div className="mb-8 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 animate-bounce-in">
          <div className="flex items-start gap-4">
            <span className="text-3xl">⚠️</span>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-yellow-900 mb-2">
                {language === 'en' ? 'AWS Credentials Not Configured' : 'פרטי חיבור AWS לא מוגדרים'}
              </h3>
              <p className="text-yellow-800 mb-4">
                {language === 'en' 
                  ? 'To use the AI Assistant, you need to configure your AWS Bedrock credentials in Settings.' 
                  : 'כדי להשתמש בעוזר ה-AI, עליך להגדיר את פרטי החיבור ל-AWS Bedrock בהגדרות.'}
              </p>
              <a
                href="/settings"
                className="inline-block px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all font-semibold"
              >
                {language === 'en' ? '⚙️ Go to Settings' : '⚙️ עבור להגדרות'}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Model Selector */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-6 animate-fade-in">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            {t.modelLabel}
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-800 font-medium"
            disabled={isLoading}
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.badge ? `${model.badge} ` : ''}{model.name} - {model.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-left">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              📋 {t.customerLabel}
            </label>
            <textarea
              value={customerQuestion}
              onChange={(e) => setCustomerQuestion(e.target.value)}
              placeholder={t.customerPlaceholder}
              className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none text-gray-800"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-right">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              ✍️ {t.answerLabel}
            </label>
            <textarea
              value={engineerAnswer}
              onChange={(e) => setEngineerAnswer(e.target.value)}
              placeholder={t.answerPlaceholder}
              className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none text-gray-800"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        {/* Options Checkboxes */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl shadow-lg p-6 animate-fade-in">
          {/* Analysis Type Selection */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              {t.analysisTypeLabel}
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="customer"
                  checked={analysisType === 'customer'}
                  onChange={(e) => setAnalysisType(e.target.value as 'customer' | 'rnd')}
                  className="w-5 h-5 text-blue-600"
                  disabled={isLoading}
                />
                <span className="text-gray-800 font-medium">{t.analysisTypeCustomer}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="rnd"
                  checked={analysisType === 'rnd'}
                  onChange={(e) => setAnalysisType(e.target.value as 'customer' | 'rnd')}
                  className="w-5 h-5 text-purple-600"
                  disabled={isLoading}
                />
                <span className="text-gray-800 font-medium">{t.analysisTypeRnD}</span>
              </label>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="findSolutions"
              checked={findSolutions}
              onChange={(e) => setFindSolutions(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <label htmlFor="findSolutions" className="flex-1 cursor-pointer">
              <div className="text-lg font-semibold text-gray-800 mb-1">
                🔍 {language === 'he' ? 'חפש פתרונות טכניים' : 'Find Technical Solutions'}
              </div>
              <p className="text-sm text-gray-600">
                {language === 'he'
                  ? 'AI יחפש באינטרנט ובתיעוד CyberArk למצוא פתרונות טכניים לבעיה. התוצאות יוצגו יחד עם ניתוח התקשורת.'
                  : 'AI will search the internet and CyberArk documentation to find technical solutions. Results will be shown along with communication analysis.'
                }
              </p>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 animate-fade-in">
          {!isLoading ? (
            <>
              <button
                onClick={handleAnalyze}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                {t.analyzeButton}
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                {t.clearButton}
              </button>
              <button
                onClick={handleDemoLoading}
                className="px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                title={language === 'he' ? 'הצג דוגמה מלאה של הניתוח' : 'Show full demo analysis'}
              >
                {t.demoButton}
              </button>
            </>
          ) : (
            <>
              <div className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-6 rounded-xl shadow-lg shimmer">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <LoadingSpinner />
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-semibold animate-pulse">
                      {(findSolutions ? t.loadingStages : t.loadingStagesNoSearch)[loadingStage]}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm opacity-90">
                        {language === 'he' ? 'זמן חלף:' : 'Elapsed:'} {elapsedTime}s
                      </div>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map((stage) => (
                          <div
                            key={stage}
                            className={`w-2 h-2 rounded-full transition-all duration-500 ${
                              stage <= loadingStage 
                                ? 'bg-white scale-110 dot-pulse' 
                                : 'bg-white/30 scale-75'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="progress-bar w-full"></div>
              </div>
              <button
                onClick={handleCancel}
                className="px-6 py-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                {t.cancelButton}
              </button>
            </>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg animate-bounce-in">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}
      </div>

      {/* AI Analysis Section */}
      {analysis && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 animate-scale-in">
              {t.analysisTitle}
            </h2>
            <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
              {language === 'he' ? 'מודל:' : 'Model:'} <strong>{selectedModelInfo?.name}</strong>
            </div>
          </div>
          
          {parseAnalysis(analysis).map((section, idx) => {
            const isPrincipleChecklist = section.title.toLowerCase().includes('principle checklist') || section.title.toLowerCase().includes('עקרונות');
            const isCollapsed = collapsedSections.has(idx);
            const shouldShowCopy = !section.title.toLowerCase().includes('what was done well') && 
                                   !section.title.toLowerCase().includes('areas needing improvement') &&
                                   !section.title.toLowerCase().includes('מה נעשה טוב') &&
                                   !section.title.toLowerCase().includes('תחומים');
            
            const toggleCollapse = () => {
              setCollapsedSections(prev => {
                const newSet = new Set(prev);
                if (newSet.has(idx)) {
                  newSet.delete(idx);
                } else {
                  newSet.add(idx);
                }
                return newSet;
              });
            };
            
            return (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 animate-slide-in-left border-l-4 border-blue-500">
              <div className="flex items-start justify-between mb-4">
                <h3 
                  className={`text-2xl font-bold text-blue-600 flex items-center gap-2 ${isPrincipleChecklist ? 'cursor-pointer hover:text-blue-700' : ''}`}
                  onClick={() => isPrincipleChecklist && toggleCollapse()}
                >
                  {isPrincipleChecklist && (
                    <span className="text-lg">{isCollapsed ? '▶' : '▼'}</span>
                  )}
                  {section.title}
                </h3>
                {shouldShowCopy && <CopyButton text={section.content.trim()} language={language} />}
              </div>
              {(!isPrincipleChecklist || !isCollapsed) && (
              <div className="prose prose-lg max-w-none text-gray-800" dir="auto" style={{ textAlign: 'start', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  components={{
                    strong: ({node, ...props}) => {
                      return <strong {...props} />;
                    },
                    p: ({node, ...props}) => {
                      return <p {...props} style={{ marginBottom: '1em' }} />;
                    }
                  }}
                >
                  {section.content.replace(/([^\n])\n(###)/g, '$1\n\n$2')}
                </ReactMarkdown>
              </div>
              )}
            </div>
            );
          })}

          {/* Chat Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 animate-fade-in border-2 border-indigo-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t.chatTitle}
            </h3>
            
            {chatMessages.length > 0 && (
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-100 border-l-4 border-blue-500'
                        : 'bg-white border-l-4 border-purple-500'
                    }`}
                  >
                    <p className="text-sm text-gray-800 whitespace-pre-wrap" dir="auto">
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendChat()}
                placeholder={t.chatPlaceholder}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-800"
                dir={language === 'he' ? 'rtl' : 'ltr'}
                disabled={isLoading}
              />
              <button
                onClick={handleSendChat}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.sendButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Footer */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-600 p-6 rounded-lg animate-bounce-in">
        <p className="text-gray-700 mb-3">
          <strong>💡 {language === 'he' ? 'איך זה עובד:' : 'How it works:'}</strong>{' '}
          {language === 'he' 
            ? 'הכלי מנתח את התשובה מול 12 עקרונות התקשורת המקצועית. מקבל משוב מפורט על מה טוב, מה צריך שיפור, וקבלת תשובה אידיאלית מעוצבת.'
            : 'This tool analyzes responses against 12 professional communication principles. Get detailed feedback on what\'s good, what needs work, and receive an ideal formatted response.'
          }
        </p>
        <p className="text-sm text-gray-600">
          <strong>🔄 {language === 'he' ? 'השוואת מודלים:' : 'Model Comparison:'}</strong>{' '}
          {language === 'he'
            ? 'נסה מודלים שונים כדי לראות הבדלים באיכות הניתוח ובעלות. Claude 3.5 Sonnet מומלץ לאיכות הטובה ביותר.'
            : 'Try different models to see differences in analysis quality and cost. Claude 3.5 Sonnet is recommended for best quality.'
          }
        </p>
      </div>

      {/* Sanitization Preview Modal */}
      {showSanitizationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl sticky top-0 z-10">
              <h2 className="text-2xl font-bold mb-2">
                🔒 {language === 'he' ? 'תצוגה מקדימה של נתונים לשליחה' : 'Data Sanitization Preview'}
              </h2>
              <p className="text-blue-100">
                {language === 'he' 
                  ? 'סקור את הנתונים שיישלחו ל-AI. מידע רגיש הוסר/הוחלף כדי להגן על פרטיות הלקוח.'
                  : 'Review the data that will be sent to AI. Sensitive information has been removed/replaced to protect customer privacy.'
                }
              </p>
            </div>

            {/* Stats Summary */}
            <div className="p-6 bg-gray-50 border-b">
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="bg-white px-4 py-2 rounded-lg shadow">
                  <span className="text-2xl">🌐</span>
                  <span className="ml-2 font-semibold">{sanitizationStats.domains}</span>
                  <span className="ml-1 text-sm text-gray-600">
                    {language === 'he' ? 'דומיינים' : 'Domains'}
                  </span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow">
                  <span className="text-2xl">📧</span>
                  <span className="ml-2 font-semibold">{sanitizationStats.emails}</span>
                  <span className="ml-1 text-sm text-gray-600">
                    {language === 'he' ? 'אימיילים' : 'Emails'}
                  </span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow">
                  <span className="text-2xl">🖥️</span>
                  <span className="ml-2 font-semibold">{sanitizationStats.servers}</span>
                  <span className="ml-1 text-sm text-gray-600">
                    {language === 'he' ? 'שרתים' : 'Servers'}
                  </span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow">
                  <span className="text-2xl">📍</span>
                  <span className="ml-2 font-semibold">{sanitizationStats.ips}</span>
                  <span className="ml-1 text-sm text-gray-600">
                    {language === 'he' ? 'כתובות IP' : 'IP Addresses'}
                  </span>
                </div>
              </div>
            </div>

            {/* Comparison View */}
            <div className="p-6">
              {/* Customer Question Comparison */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  📋 {language === 'he' ? 'שאלת הלקוח' : 'Customer Question'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                        {language === 'he' ? 'מקורי' : 'Original'}
                      </span>
                      {language === 'he' ? 'טקסט מקורי' : 'Original Text'}
                    </div>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 h-64 overflow-y-auto whitespace-pre-wrap text-sm">
                      {customerQuestion}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {language === 'he' ? 'מנוקה' : 'Sanitized'}
                      </span>
                      {language === 'he' ? 'נשלח ל-AI' : 'Sent to AI'}
                    </div>
                    {isEditingMaskedData ? (
                      <textarea
                        value={sanitizedQuestion}
                        onChange={(e) => setSanitizedQuestion(e.target.value)}
                        className="w-full bg-green-50 border-2 border-green-400 rounded-lg p-4 h-64 overflow-y-auto text-sm focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    ) : (
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 h-64 overflow-y-auto whitespace-pre-wrap text-sm">
                        {sanitizedQuestion}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Engineer Answer Comparison */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  ✍️ {language === 'he' ? 'תשובת המהנדס' : 'Engineer Answer'}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                        {language === 'he' ? 'מקורי' : 'Original'}
                      </span>
                      {language === 'he' ? 'טקסט מקורי' : 'Original Text'}
                    </div>
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 h-64 overflow-y-auto whitespace-pre-wrap text-sm">
                      {engineerAnswer}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {language === 'he' ? 'מנוקה' : 'Sanitized'}
                      </span>
                      {language === 'he' ? 'נשלח ל-AI' : 'Sent to AI'}
                    </div>
                    {isEditingMaskedData ? (
                      <textarea
                        value={sanitizedAnswer}
                        onChange={(e) => setSanitizedAnswer(e.target.value)}
                        className="w-full bg-green-50 border-2 border-green-400 rounded-lg p-4 h-64 overflow-y-auto text-sm focus:ring-2 focus:ring-green-500 outline-none"
                      />
                    ) : (
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 h-64 overflow-y-auto whitespace-pre-wrap text-sm">
                        {sanitizedAnswer}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 justify-end">
                <button
                  onClick={() => setShowSanitizationModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  ❌ {language === 'he' ? 'ביטול' : 'Cancel'}
                </button>
                <button
                  onClick={() => setIsEditingMaskedData(!isEditingMaskedData)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    isEditingMaskedData 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {isEditingMaskedData ? '✓' : '✏️'} {language === 'he' ? (isEditingMaskedData ? 'סיימתי עריכה' : 'ערוך נתונים מנוקים') : (isEditingMaskedData ? 'Done Editing' : 'Edit Sanitized')}
                </button>
                <button
                  onClick={handleApproveAndAnalyze}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  ✅ {language === 'he' ? 'אשר ונתח' : 'Approve & Analyze'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
