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

  const searchData: SearchResult[] = [
    // Pages
    { title: language === 'he' ? 'מבוא' : 'Introduction', description: language === 'he' ? 'למדו את היסודות של תקשורת מקצועית' : 'Learn the fundamentals of professional communication', url: '/introduction', category: language === 'he' ? 'עמודים' : 'Pages' },
    { title: language === 'he' ? 'עקרונות יסוד' : 'Core Principles', description: language === 'he' ? '12 עקרונות יסודיים לתקשורת יעילה' : '12 foundational principles for effective communication', url: '/core-principles', category: language === 'he' ? 'עמודים' : 'Pages' },
    { title: language === 'he' ? 'משפטים' : 'Phrases', description: language === 'he' ? 'משפטים מוכנים לשימוש במצבי לקוח שונים' : 'Ready-to-use phrases for various client situations', url: '/examples', category: language === 'he' ? 'עמודים' : 'Pages' },
    { title: language === 'he' ? 'טיפול באסקלציות' : 'Escalations', description: language === 'he' ? 'אסטרטגיות לטיפול בהסלמות ומצבים מאתגרים' : 'Strategies for handling escalations and challenging situations', url: '/escalation-response', category: language === 'he' ? 'עמודים' : 'Pages' },
    { title: language === 'he' ? 'מדריך מקוצר' : 'Quick Guide', description: language === 'he' ? 'מדריך מהיר לתקשורת מקצועית' : 'Quick guide for professional communication', url: '/communication-guide', category: language === 'he' ? 'עמודים' : 'Pages' },
    { title: language === 'he' ? 'משאבים' : 'Resources', description: language === 'he' ? 'כלים ומשאבים נוספים לשיפור התקשורת' : 'Additional tools and resources for improving communication', url: '/resources', category: language === 'he' ? 'עמודים' : 'Pages' },
    { title: language === 'he' ? 'משוב' : 'Feedback', description: language === 'he' ? 'שלח משוב על האתר' : 'Send feedback about the site', url: '/feedback', category: language === 'he' ? 'עמודים' : 'Pages' },
    
    // Core Principles - Communication
    { title: language === 'he' ? 'בניית אמון' : 'Building Trust', description: language === 'he' ? 'עקביות, שקיפות ואמינות בכל אינטראקציה' : 'Consistency, transparency and reliability in every interaction', url: '/core-principles#trust', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'הקשבה פעילה' : 'Active Listening', description: language === 'he' ? 'הבנת צרכי הלקוח דרך שיקוף והבהרה' : 'Understanding client needs through reflection and clarification', url: '/core-principles#listening', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'תקשורת ברורה' : 'Clear Communication', description: language === 'he' ? 'שפה חיובית וישירה שנמנעת מעמימות' : 'Positive, direct language that avoids ambiguity', url: '/core-principles#clarity', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'לקיחת אחריות' : 'Taking Ownership', description: language === 'he' ? 'הפגנת מנהיגות ואחריות על הבעיה' : 'Demonstrating leadership and responsibility for the issue', url: '/core-principles#ownership', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'אמפתיה חכמה' : 'Smart Empathy', description: language === 'he' ? 'קישור השפעה על הלקוח לפעולה מיידית' : 'Linking client impact to immediate action', url: '/core-principles#empathy', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'עדכונים פרואקטיביים' : 'Proactive Updates', description: language === 'he' ? 'עדכון לקוחות לפני שהם שואלים' : 'Updating clients before they ask', url: '/core-principles#proactive', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'שבירת קרח' : 'Ice Breaking', description: language === 'he' ? 'יצירת אווירה נעימה ושיחה קלה עם לקוחות' : 'Creating a pleasant atmosphere and easy conversation', url: '/core-principles#icebreaking', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'שאילת שאלות מוקדמות' : 'Early Questions', description: language === 'he' ? 'איסוף מידע חשוב בתחילת השיחה' : 'Gathering important information early in the conversation', url: '/core-principles#questions', category: language === 'he' ? 'עקרונות' : 'Principles' },
    
    // Core Principles - General
    { title: language === 'he' ? 'תחושת דחיפות' : 'Sense of Urgency', description: language === 'he' ? 'שידור מחויבות ומהירות בטיפול בבעיה' : 'Conveying commitment and speed in handling the issue', url: '/core-principles#urgency', category: language === 'he' ? 'עקרונות כלליים' : 'General Principles' },
    { title: language === 'he' ? 'אחריות משותפת' : 'Shared Responsibility', description: language === 'he' ? 'שימוש בשפה שיתופית ולא מאשימה' : 'Using collaborative rather than blaming language', url: '/core-principles#shared', category: language === 'he' ? 'עקרונות כלליים' : 'General Principles' },
    { title: language === 'he' ? 'פתרונות Win-Win' : 'Win-Win Solutions', description: language === 'he' ? 'חיפוש אחר פתרונות טובים לשני הצדדים' : 'Seeking solutions that benefit both parties', url: '/core-principles#winwin', category: language === 'he' ? 'עקרונות כלליים' : 'General Principles' },
    { title: language === 'he' ? 'תגובות מבניות' : 'Structured Responses', description: language === 'he' ? 'כתיבה ברורה ומסודרת של עדכונים ופתרונות' : 'Clear, organized writing of updates and solutions', url: '/core-principles#structured', category: language === 'he' ? 'עקרונות כלליים' : 'General Principles' },
    
    // Phrases categories
    { title: language === 'he' ? 'משפטי פתיחה' : 'Opening Phrases', description: language === 'he' ? 'איך להתחיל שיחה בצורה מקצועית' : 'How to start a conversation professionally', url: '/examples#opening', category: language === 'he' ? 'משפטים' : 'Phrases' },
    { title: language === 'he' ? 'משפטי סגירה' : 'Closing Phrases', description: language === 'he' ? 'איך לסיים שיחה בצורה חיובית' : 'How to end a conversation positively', url: '/examples#closing', category: language === 'he' ? 'משפטים' : 'Phrases' },
    { title: language === 'he' ? 'התנצלות ואחריות' : 'Apology and Responsibility', description: language === 'he' ? 'איך להתנצל ולקחת אחריות' : 'How to apologize and take responsibility', url: '/examples#apology', category: language === 'he' ? 'משפטים' : 'Phrases' },
    { title: language === 'he' ? 'עדכוני סטטוס' : 'Status Updates', description: language === 'he' ? 'איך לעדכן על התקדמות בצורה ברורה' : 'How to update on progress clearly', url: '/examples#status', category: language === 'he' ? 'משפטים' : 'Phrases' },
    
    // Escalation topics
    { title: language === 'he' ? 'זיהוי אסקלציה מוקדמת' : 'Early Escalation Detection', description: language === 'he' ? 'איך לזהות סימנים מוקדמים של תסכול' : 'How to identify early signs of frustration', url: '/escalation-response#detection', category: language === 'he' ? 'אסקלציות' : 'Escalations' },
    { title: language === 'he' ? 'טכניקות דה-אסקלציה' : 'De-escalation Techniques', description: language === 'he' ? 'שיטות להרגעת לקוחות מתוסכלים' : 'Methods for calming frustrated clients', url: '/escalation-response#techniques', category: language === 'he' ? 'אסקלציות' : 'Escalations' },
    { title: language === 'he' ? 'תקשורת במצבי לחץ' : 'Communication Under Pressure', description: language === 'he' ? 'איך לתקשר אפקטיבית במצבים מאתגרים' : 'How to communicate effectively in challenging situations', url: '/escalation-response#pressure', category: language === 'he' ? 'אסקלציות' : 'Escalations' },
  ];

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

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query, language]);

  const handleSelect = (url: string) => {
    router.push(url);
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
