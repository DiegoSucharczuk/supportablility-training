'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const translations = {
    en: {
      home: 'Home',
      introduction: 'Introduction',
      'core-principles': 'Core Principles',
      examples: 'Phrases',
      'escalation-response': 'Escalations',
      'communication-guide': 'Quick Guide',
      resources: 'Resources',
      feedback: 'Feedback',
    },
    he: {
      home: 'בית',
      introduction: 'מבוא',
      'core-principles': 'עקרונות יסוד',
      examples: 'משפטים',
      'escalation-response': 'טיפול באסקלציות',
      'communication-guide': 'מדריך מקוצר',
      resources: 'משאבים',
      feedback: 'משוב',
    },
  };

  const t = translations[language];

  const pathSegments = pathname.split('/').filter(segment => segment);
  
  if (pathSegments.length === 0) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="mb-6 text-sm"
      dir={language === 'he' ? 'rtl' : 'ltr'}
    >
      <ol className="flex items-center space-x-2 text-gray-600">
        <li>
          <Link 
            href="/" 
            className="hover:text-blue-600 transition-colors"
            aria-label={t.home}
          >
            {t.home}
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          const label = t[segment as keyof typeof t] || segment;

          return (
            <li key={segment} className="flex items-center">
              <span className={language === 'he' ? 'ml-2' : 'mr-2'}>
                {language === 'he' ? '←' : '→'}
              </span>
              {isLast ? (
                <span className="text-gray-900 font-semibold" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link 
                  href={href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
