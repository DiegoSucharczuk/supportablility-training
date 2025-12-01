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
    { title: language === 'he' ? 'עקרונות יסוד' : 'Core Principles', description: language === 'he' ? '12 עקרונות יסודיים - בניית אמון, הקשבה, תקשורת ברורה' : '12 foundational principles - trust, listening, clear communication', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'משפטים' : 'Phrases', description: language === 'he' ? 'משפטי פתיחה, סגירה, התנצלות ועדכוני סטטוס' : 'Opening, closing, apology and status update phrases', url: '/examples', category: language === 'he' ? 'משפטים' : 'Phrases' },
    { title: language === 'he' ? 'טיפול באסקלציות' : 'Escalations', description: language === 'he' ? 'זיהוי מוקדם, טכניקות דה-אסקלציה ותקשורת בלחץ' : 'Early detection, de-escalation techniques and communication under pressure', url: '/escalation-response', category: language === 'he' ? 'אסקלציות' : 'Escalations' },
    { title: language === 'he' ? 'מדריך מקוצר' : 'Quick Guide', description: language === 'he' ? 'מדריך מהיר לתקשורת מקצועית' : 'Quick guide for professional communication', url: '/communication-guide', category: language === 'he' ? 'מדריכים' : 'Guides' },
    { title: language === 'he' ? 'משאבים' : 'Resources', description: language === 'he' ? 'כלים, תבניות וצ\'קליסטים לשיפור התקשורת' : 'Tools, templates and checklists for improving communication', url: '/resources', category: language === 'he' ? 'משאבים' : 'Resources' },
    { title: language === 'he' ? 'משוב' : 'Feedback', description: language === 'he' ? 'שלח משוב, הצעות או דווח על בעיות' : 'Send feedback, suggestions or report issues', url: '/feedback', category: language === 'he' ? 'משוב' : 'Feedback' },
    
    // Keywords for existing pages
    { title: language === 'he' ? 'אמון' : 'Trust', description: language === 'he' ? 'עקביות, שקיפות ואמינות בכל אינטראקציה' : 'Consistency, transparency and reliability', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'הקשבה' : 'Listening', description: language === 'he' ? 'הבנת צרכי הלקוח דרך שיקוף והבהרה' : 'Understanding client needs through reflection', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'אחריות' : 'Ownership', description: language === 'he' ? 'הפגנת מנהיגות ואחריות על הבעיה' : 'Demonstrating leadership and responsibility', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'אמפתיה' : 'Empathy', description: language === 'he' ? 'קישור השפעה על הלקוח לפעולה מיידית' : 'Linking client impact to immediate action', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'עדכונים' : 'Updates', description: language === 'he' ? 'עדכון פרואקטיבי של לקוחות לפני שהם שואלים' : 'Proactive client updates before they ask', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'שבירת קרח' : 'Ice Breaking', description: language === 'he' ? 'יצירת אווירה נעימה ושיחה קלה' : 'Creating pleasant atmosphere and easy conversation', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'דחיפות' : 'Urgency', description: language === 'he' ? 'שידור מחויבות ומהירות בטיפול' : 'Conveying commitment and speed', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'שיתוף פעולה' : 'Collaboration', description: language === 'he' ? 'שפה שיתופית ואחריות משותפת' : 'Collaborative language and shared responsibility', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'פתרונות' : 'Solutions', description: language === 'he' ? 'חיפוש Win-Win ופתרונות מועילים לשני הצדדים' : 'Win-Win solutions benefiting both parties', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    
    // Phrases keywords
    { title: language === 'he' ? 'פתיחה' : 'Opening', description: language === 'he' ? 'משפטים לפתיחת שיחה בצורה מקצועית' : 'Phrases for starting conversations professionally', url: '/examples', category: language === 'he' ? 'משפטים' : 'Phrases' },
    { title: language === 'he' ? 'סגירה' : 'Closing', description: language === 'he' ? 'משפטים לסיום שיחה בצורה חיובית' : 'Phrases for ending conversations positively', url: '/examples', category: language === 'he' ? 'משפטים' : 'Phrases' },
    { title: language === 'he' ? 'התנצלות' : 'Apology', description: language === 'he' ? 'איך להתנצל ולקחת אחריות בצורה מקצועית' : 'How to apologize and take responsibility professionally', url: '/examples', category: language === 'he' ? 'משפטים' : 'Phrases' },
    { title: language === 'he' ? 'סטטוס' : 'Status', description: language === 'he' ? 'עדכוני התקדמות ברורים ומקצועיים' : 'Clear and professional progress updates', url: '/examples', category: language === 'he' ? 'משפטים' : 'Phrases' },
    
    // Escalation keywords
    { title: language === 'he' ? 'זיהוי אסקלציה' : 'Escalation Detection', description: language === 'he' ? 'איך לזהות סימנים מוקדמים של תסכול' : 'How to identify early signs of frustration', url: '/escalation-response', category: language === 'he' ? 'אסקלציות' : 'Escalations' },
    { title: language === 'he' ? 'דה-אסקלציה' : 'De-escalation', description: language === 'he' ? 'טכניקות להרגעת לקוחות מתוסכלים' : 'Techniques for calming frustrated clients', url: '/escalation-response', category: language === 'he' ? 'אסקלציות' : 'Escalations' },
    { title: language === 'he' ? 'לחץ' : 'Pressure', description: language === 'he' ? 'תקשורת אפקטיבית במצבים מאתגרים' : 'Effective communication in challenging situations', url: '/escalation-response', category: language === 'he' ? 'אסקלציות' : 'Escalations' },
    { title: language === 'he' ? 'תסכול' : 'Frustration', description: language === 'he' ? 'טיפול בלקוחות מתוסכלים וכועסים' : 'Handling frustrated and angry clients', url: '/escalation-response', category: language === 'he' ? 'אסקלציות' : 'Escalations' },
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
