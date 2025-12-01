'use client';

import Link from 'next/link';
import { useBookmarks } from '@/context/BookmarksContext';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgress from '@/components/ReadingProgress';
import ScrollToTop from '@/components/ScrollToTop';

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { language } = useLanguage();

  const pageNames: Record<string, { en: string; he: string }> = {
    '/introduction': { en: 'Introduction', he: 'מבוא' },
    '/core-principles': { en: 'Core Principles', he: 'עקרונות יסוד' },
    '/examples': { en: 'Phrases', he: 'משפטים' },
    '/escalation-response': { en: 'Escalations', he: 'טיפול באסקלציות' },
    '/communication-guide': { en: 'Quick Guide', he: 'מדריך מקוצר' },
    '/resources': { en: 'Resources', he: 'משאבים' },
    '/feedback': { en: 'Feedback', he: 'משוב' },
  };

  const content = {
    en: {
      title: 'My Bookmarks',
      subtitle: 'Quick access to your saved pages',
      empty: {
        title: 'No bookmarks yet',
        text: 'Click the bookmark button (🔖) on any page to save it here for quick access.',
      },
      remove: 'Remove',
      visitPage: 'Visit Page →',
    },
    he: {
      title: 'המועדפים שלי',
      subtitle: 'גישה מהירה לעמודים השמורים שלך',
      empty: {
        title: 'אין מועדפים עדיין',
        text: 'לחץ על כפתור המועדפים (🔖) בכל עמוד כדי לשמור אותו כאן לגישה מהירה.',
      },
      remove: 'הסר',
      visitPage: 'עבור לעמוד ←',
    },
  };

  const t = content[language];

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <ReadingProgress />
      <ScrollToTop />
      <Breadcrumbs />

      <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-scale-in">
        {t.title}
      </h1>
      <p className="text-xl text-gray-600 mb-12 animate-fade-in">
        {t.subtitle}
      </p>

      {bookmarks.length === 0 ? (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-md p-12 text-center animate-bounce-in">
          <div className="text-6xl mb-4">🔖</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.empty.title}</h2>
          <p className="text-gray-700 max-w-md mx-auto">{t.empty.text}</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookmarks.map((bookmark, index) => {
            const pageName = pageNames[bookmark];
            const name = pageName ? pageName[language] : bookmark;
            
            return (
              <div
                key={bookmark}
                className="bg-white rounded-lg shadow-md p-6 card-hover animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🔖</span>
                      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{bookmark}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link
                      href={bookmark}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      {t.visitPage}
                    </Link>
                    
                    <button
                      onClick={() => toggleBookmark(bookmark)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300"
                      aria-label={t.remove}
                    >
                      {t.remove}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
