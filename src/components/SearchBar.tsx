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
    // Main Pages
    { title: language === 'he' ? 'דף הבית' : 'Home', description: language === 'he' ? 'עקרונות תקשורת מקצועית מול לקוחות' : 'Professional customer communication principles', url: '/', category: language === 'he' ? 'עמודים' : 'Pages' },
    { title: language === 'he' ? 'מבוא' : 'Introduction', description: language === 'he' ? 'למדו את היסודות של תקשורת מקצועית ולמה זה חשוב' : 'Learn the fundamentals and importance of professional communication', url: '/introduction', category: language === 'he' ? 'עמודים' : 'Pages' },
    { title: language === 'he' ? 'עקרונות יסוד' : 'Core Principles', description: language === 'he' ? '12 עקרונות תקשורת: אמון, הקשבה, בהירות, אחריות, אמפתיה ועוד' : '12 communication principles: trust, listening, clarity, ownership, empathy and more', url: '/core-principles', category: language === 'he' ? 'עקרונות' : 'Principles' },
    { title: language === 'he' ? 'משפטים' : 'Phrases', description: language === 'he' ? 'משפטי פתיחה, סגירה, התנצלות ועדכוני סטטוס מוכנים לשימוש' : 'Ready-to-use opening, closing, apology and status update phrases', url: '/examples', category: language === 'he' ? 'משפטים' : 'Phrases' },
    { title: language === 'he' ? 'טיפול באסקלציות' : 'Escalation Response', description: language === 'he' ? 'זיהוי מוקדם, דה-אסקלציה ותקשורת במצבי לחץ' : 'Early detection, de-escalation and communication under pressure', url: '/escalation-response', category: language === 'he' ? 'אסקלציות' : 'Escalations' },
    { title: language === 'he' ? 'מדריך מקוצר' : 'Quick Guide', description: language === 'he' ? 'מדריך מהיר ונגיש לתקשורת מקצועית' : 'Quick and accessible professional communication guide', url: '/communication-guide', category: language === 'he' ? 'מדריכים' : 'Guides' },
    { title: language === 'he' ? 'משאבים' : 'Resources', description: language === 'he' ? 'כלים, תבניות, צ\'קליסטים ומשאבים נוספים' : 'Tools, templates, checklists and additional resources', url: '/resources', category: language === 'he' ? 'משאבים' : 'Resources' },
    { title: language === 'he' ? 'משוב' : 'Feedback', description: language === 'he' ? 'שתף משוב, הצעות או דווח על בעיות באתר' : 'Share feedback, suggestions or report site issues', url: '/feedback', category: language === 'he' ? 'משוב' : 'Feedback' },
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
