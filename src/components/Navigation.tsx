'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import SearchBar from './SearchBar';

const navItems = {
  en: [
    { href: '/', label: 'Home' },
    { href: '/introduction', label: 'Introduction' },
    { href: '/core-principles', label: 'Core Principles' },
    { href: '/examples', label: 'Phrases' },
    { href: '/escalation-response', label: 'Escalations' },
    { href: '/communication-guide', label: 'Quick Guide' },
    { href: '/resources', label: 'Resources' },
    { href: '/feedback', label: 'Feedback' },
  ],
  he: [
    { href: '/', label: 'דף הבית' },
    { href: '/introduction', label: 'מבוא' },
    { href: '/core-principles', label: 'עקרונות יסוד' },
    { href: '/examples', label: 'משפטים' },
    { href: '/escalation-response', label: 'טיפול באסקלציות' },
    { href: '/communication-guide', label: 'מדריך מקוצר' },
    { href: '/resources', label: 'משאבים' },
    { href: '/feedback', label: 'משוב' },
  ],
};

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  
  const items = navItems[language];
  const title = language === 'en' ? 'Supportability Training' : 'אימון תמיכה מקצועית';

  return (
    <nav 
      className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-xl font-bold hover:scale-110 transition-transform duration-300"
            aria-label={title}
          >
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {title}
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <SearchBar />
            
            <ul className="flex space-x-1" role="menubar">
              {items.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      pathname === item.href
                        ? 'bg-white/20 font-semibold shadow-lg scale-105'
                        : 'hover:bg-white/10 hover:scale-105'
                    }`}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
              className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 font-semibold hover:scale-110 shadow-lg border border-white/30"
              aria-label={language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
            >
              {language === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
