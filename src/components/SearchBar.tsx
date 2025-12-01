'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
}

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const { language } = useLanguage();

  // Comprehensive search data with actual page content
  const getSearchData = (): SearchResult[] => {
    if (language === 'he') {
      return [
        // דף הבית
        { title: 'דף הבית', description: 'עקרונות תקשורת מקצועית מול לקוחות - בניית אמון, הקשבה פעילה, תקשורת ברורה, אחריות, אמפתיה', url: '/', category: 'עמודים' },
        
        // מבוא
        { title: 'מבוא', description: 'מהי תמיכה מקצועית - אמון, אחריות, בהירות, שותפות חיובית עם לקוחות', url: '/introduction', category: 'מבוא' },
        { title: 'למה זה חשוב', description: 'החוויה חשובה יותר מהתיקון - איך לקוחות זוכרים את האופן שבו התייחסו אליהם', url: '/introduction', category: 'מבוא' },
        
        // עקרונות יסוד
        { title: 'עקרונות תקשורת', description: '12 עקרונות יסודיים לתקשורת אפקטיבית מול לקוחות', url: '/core-principles', category: 'עקרונות' },
        { title: 'בניית אמון', description: 'עקביות, שקיפות ואמינות בכל אינטראקציה עם לקוח', url: '/core-principles', category: 'עקרונות' },
        { title: 'הקשבה פעילה', description: 'הבנת צרכי הלקוח דרך שיקוף, הבהרה ושאלות מבהירות', url: '/core-principles', category: 'עקרונות' },
        { title: 'תקשורת ברורה', description: 'שפה חיובית, ישירה ונגישה שנמנעת מז\'רגון ועמימות', url: '/core-principles', category: 'עקרונות' },
        { title: 'לקיחת אחריות', description: 'הפגנת מנהיגות, אחריות אישית ומחויבות לפתרון הבעיה', url: '/core-principles', category: 'עקרונות' },
        { title: 'אמפתיה חכמה', description: 'קישור השפעת הבעיה על הלקוח לפעולות מיידיות שאנחנו נוקטים', url: '/core-principles', category: 'עקרונות' },
        { title: 'עדכונים פרואקטיביים', description: 'עדכון לקוחות לפני שהם שואלים, תקשורת יזומה ושקיפות מלאה', url: '/core-principles', category: 'עקרונות' },
        { title: 'שבירת קרח', description: 'יצירת אווירה נעימה, בניית קשר אישי וחיבור עם הלקוח', url: '/core-principles', category: 'עקרונות' },
        { title: 'שאלות מוקדמות', description: 'איסוף מידע קריטי בתחילת השיחה להבנת ההקשר המלא', url: '/core-principles', category: 'עקרונות' },
        { title: 'תחושת דחיפות', description: 'שידור מחויבות, מהירות וחשיבות בטיפול בבעיית הלקוח', url: '/core-principles', category: 'עקרונות' },
        { title: 'אחריות משותפת', description: 'שימוש בשפה שיתופית - אנחנו במקום אתם, פתרון משותף', url: '/core-principles', category: 'עקרונות' },
        { title: 'פתרונות Win-Win', description: 'חיפוש אחר פתרונות שמועילים לשני הצדדים, לא רק לצד אחד', url: '/core-principles', category: 'עקרונות' },
        { title: 'תגובות מבניות', description: 'כתיבה מסודרת, ברורה ועם מבנה לוגי של עדכונים ופתרונות', url: '/core-principles', category: 'עקרונות' },
        
        // משפטים
        { title: 'משפטים מוכנים', description: 'משפטים מקצועיים לשימוש יומיומי בתקשורת עם לקוחות', url: '/examples', category: 'משפטים' },
        { title: 'משפטי פתיחה', description: 'איך להתחיל שיחה, לברך לקוח ולהציג את עצמך בצורה מקצועית', url: '/examples', category: 'משפטים' },
        { title: 'משפטי סגירה', description: 'איך לסיים שיחה בצורה חיובית, מקצועית ונעימה', url: '/examples', category: 'משפטים' },
        { title: 'התנצלות', description: 'איך להתנצל, לקחת אחריות ולהפגין אמפתיה כלפי הלקוח', url: '/examples', category: 'משפטים' },
        { title: 'עדכוני סטטוס', description: 'איך לעדכן על התקדמות, סטטוס ושלבים הבאים בצורה ברורה', url: '/examples', category: 'משפטים' },
        
        // אסקלציות
        { title: 'טיפול באסקלציות', description: 'איך להתמודד עם לקוחות כועסים, מתוסכלים ומצבי לחץ', url: '/escalation-response', category: 'אסקלציות' },
        { title: 'זיהוי מוקדם', description: 'איך לזהות סימני אזהרה ולמנוע הסלמה של המצב', url: '/escalation-response', category: 'אסקלציות' },
        { title: 'דה-אסקלציה', description: 'טכניקות להרגעת לקוח כועס והורדת המתח', url: '/escalation-response', category: 'אסקלציות' },
        { title: 'תקשורת בלחץ', description: 'איך לתקשר אפקטיבית כשהלחץ גבוה והמצב מאתגר', url: '/escalation-response', category: 'אסקלציות' },
        { title: 'לקוח כועס', description: 'איך להגיב ללקוח מתוסכל, כועס או לא שבע רצון', url: '/escalation-response', category: 'אסקלציות' },
        
        // מדריך מקוצר
        { title: 'מדריך מקוצר', description: 'מדריך מהיר לתקשורת מקצועית - טיפים וכלים מעשיים', url: '/communication-guide', category: 'מדריכים' },
        { title: 'טיפים מהירים', description: 'עצות מהירות לשיפור התקשורת היומיומית עם לקוחות', url: '/communication-guide', category: 'מדריכים' },
        
        // משאבים
        { title: 'משאבים', description: 'כלים, תבניות, צ\'קליסטים ומשאבים נוספים לשיפור התקשורת', url: '/resources', category: 'משאבים' },
        { title: 'תבניות', description: 'תבניות מוכנות למיילים, עדכונים ותקשורת עם לקוחות', url: '/resources', category: 'משאבים' },
        { title: 'צ\'קליסט', description: 'רשימות בדיקה לתקשורת אפקטיבית במצבים שונים', url: '/resources', category: 'משאבים' },
        
        // משוב
        { title: 'משוב', description: 'שלח משוב, הצעות לשיפור או דווח על בעיות באתר', url: '/feedback', category: 'משוב' },
      ];
    } else {
      return [
        // Home
        { title: 'Home', description: 'Professional customer communication principles - trust, active listening, clear communication, ownership, empathy', url: '/', category: 'Pages' },
        
        // Introduction
        { title: 'Introduction', description: 'What is professional support - trust, ownership, clarity, positive partnership with clients', url: '/introduction', category: 'Introduction' },
        { title: 'Why This Matters', description: 'Experience matters more than the fix - how clients remember the way they were treated', url: '/introduction', category: 'Introduction' },
        
        // Core Principles
        { title: 'Communication Principles', description: '12 foundational principles for effective client communication', url: '/core-principles', category: 'Principles' },
        { title: 'Building Trust', description: 'Consistency, transparency and reliability in every client interaction', url: '/core-principles', category: 'Principles' },
        { title: 'Active Listening', description: 'Understanding client needs through reflection, clarification and probing questions', url: '/core-principles', category: 'Principles' },
        { title: 'Clear Communication', description: 'Positive, direct and accessible language that avoids jargon and ambiguity', url: '/core-principles', category: 'Principles' },
        { title: 'Taking Ownership', description: 'Demonstrating leadership, personal responsibility and commitment to solving the problem', url: '/core-principles', category: 'Principles' },
        { title: 'Smart Empathy', description: 'Linking the problem\'s impact on the client to immediate actions we\'re taking', url: '/core-principles', category: 'Principles' },
        { title: 'Proactive Updates', description: 'Updating clients before they ask, proactive communication and full transparency', url: '/core-principles', category: 'Principles' },
        { title: 'Ice Breaking', description: 'Creating a pleasant atmosphere, building personal rapport and connecting with the client', url: '/core-principles', category: 'Principles' },
        { title: 'Early Questions', description: 'Gathering critical information early in the conversation to understand the full context', url: '/core-principles', category: 'Principles' },
        { title: 'Sense of Urgency', description: 'Conveying commitment, speed and importance in handling the client\'s issue', url: '/core-principles', category: 'Principles' },
        { title: 'Shared Responsibility', description: 'Using collaborative language - we instead of you, shared solution', url: '/core-principles', category: 'Principles' },
        { title: 'Win-Win Solutions', description: 'Seeking solutions that benefit both parties, not just one side', url: '/core-principles', category: 'Principles' },
        { title: 'Structured Responses', description: 'Organized, clear writing with logical structure for updates and solutions', url: '/core-principles', category: 'Principles' },
        
        // Phrases
        { title: 'Ready-to-Use Phrases', description: 'Professional phrases for daily client communication', url: '/examples', category: 'Phrases' },
        { title: 'Opening Phrases', description: 'How to start a conversation, greet clients and introduce yourself professionally', url: '/examples', category: 'Phrases' },
        { title: 'Closing Phrases', description: 'How to end a conversation positively, professionally and pleasantly', url: '/examples', category: 'Phrases' },
        { title: 'Apology', description: 'How to apologize, take responsibility and show empathy to the client', url: '/examples', category: 'Phrases' },
        { title: 'Status Updates', description: 'How to update on progress, status and next steps clearly', url: '/examples', category: 'Phrases' },
        
        // Escalations
        { title: 'Handling Escalations', description: 'How to deal with angry, frustrated clients and pressure situations', url: '/escalation-response', category: 'Escalations' },
        { title: 'Early Detection', description: 'How to identify warning signs and prevent situation escalation', url: '/escalation-response', category: 'Escalations' },
        { title: 'De-escalation', description: 'Techniques for calming angry clients and reducing tension', url: '/escalation-response', category: 'Escalations' },
        { title: 'Communication Under Pressure', description: 'How to communicate effectively when pressure is high and situation is challenging', url: '/escalation-response', category: 'Escalations' },
        { title: 'Angry Client', description: 'How to respond to frustrated, angry or dissatisfied clients', url: '/escalation-response', category: 'Escalations' },
        
        // Quick Guide
        { title: 'Quick Guide', description: 'Fast guide for professional communication - practical tips and tools', url: '/communication-guide', category: 'Guides' },
        { title: 'Quick Tips', description: 'Fast advice for improving daily communication with clients', url: '/communication-guide', category: 'Guides' },
        
        // Resources
        { title: 'Resources', description: 'Tools, templates, checklists and additional resources for improving communication', url: '/resources', category: 'Resources' },
        { title: 'Templates', description: 'Ready-made templates for emails, updates and client communication', url: '/resources', category: 'Resources' },
        { title: 'Checklist', description: 'Checklists for effective communication in various situations', url: '/resources', category: 'Resources' },
        
        // Feedback
        { title: 'Feedback', description: 'Send feedback, improvement suggestions or report site issues', url: '/feedback', category: 'Feedback' },
      ];
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const searchData = getSearchData();
    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query, language]);

  const handleSelect = (url: string) => {
    // Add search query as URL parameter to highlight in page
    const urlWithQuery = query.trim() ? `${url}?highlight=${encodeURIComponent(query.trim())}` : url;
    router.push(urlWithQuery);
    setIsOpen(false);
    setQuery('');
  };

  const t = {
    en: {
      placeholder: 'Search... (⌘K)',
      noResults: 'No results found',
      search: 'Search',
    },
    he: {
      placeholder: 'חיפוש... (⌘K)',
      noResults: 'לא נמצאו תוצאות',
      search: 'חיפוש',
    },
  };

  const text = t[language];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        aria-label={text.search}
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-gray-600 text-sm">{text.placeholder}</span>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={text.search}
          >
            <div className="p-4 border-b">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={text.placeholder}
                className="w-full px-4 py-3 text-lg border-none outline-none text-gray-900"
                autoFocus
                aria-label={text.search}
              />
            </div>
            
            <div className="max-h-96 overflow-y-auto p-2">
              {results.length === 0 && query.trim() !== '' && (
                <div className="p-4 text-center text-gray-500">
                  {text.noResults}
                </div>
              )}
              
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(result.url)}
                  className="w-full text-left p-4 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="font-semibold text-gray-900">{result.title}</div>
                  <div className="text-sm text-gray-600">{result.description}</div>
                  <div className="text-xs text-blue-600 mt-1">{result.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
