'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
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
    { href: '/ai-assistant', label: 'AI Assistant' },
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
    { href: '/ai-assistant', label: 'עוזר AI' },
    { href: '/feedback', label: 'משוב' },
  ],
};

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { logout } = useAuth();
  
  const items = navItems[language];
  const title = language === 'en' ? 'Supportability Training' : 'אימון תמיכה מקצועית';

  return (
    <nav 
      className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        {/* Title Row */}
        <div className="flex items-center justify-center py-5 border-b border-white/10">
          <Link 
            href="/" 
            className="group transition-transform duration-300 hover:scale-105"
            aria-label={title}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_5px_10px_rgba(255,255,255,0.6)] transition-all duration-300">
                {title}
              </span>
            </h1>
          </Link>
        </div>
        
        {/* Navigation Row */}
        <div className="flex items-center justify-between py-3">
          <SearchBar />
          
          <ul className="flex space-x-1 mx-auto" role="menubar">
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
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
              className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 font-semibold hover:scale-110 shadow-lg border border-white/30"
              aria-label={language === 'en' ? 'Switch to Hebrew' : 'Switch to English'}
            >
              {language === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
            </button>
            
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold hover:scale-110 shadow-lg border border-red-400/30 flex items-center gap-2"
              aria-label={language === 'en' ? 'Logout' : 'התנתק'}
              title={language === 'en' ? 'Logout' : 'התנתק'}
            >
              <span>🚪</span>
              <span className="hidden sm:inline">{language === 'en' ? 'Logout' : 'התנתק'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
