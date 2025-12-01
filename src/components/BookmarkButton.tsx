'use client';

import { usePathname } from 'next/navigation';
import { useBookmarks } from '@/context/BookmarksContext';
import { useLanguage } from '@/context/LanguageContext';

export default function BookmarkButton() {
  const pathname = usePathname();
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { language } = useLanguage();
  const bookmarked = isBookmarked(pathname);

  const t = {
    en: {
      add: 'Add to bookmarks',
      remove: 'Remove from bookmarks',
    },
    he: {
      add: 'הוסף למועדפים',
      remove: 'הסר ממועדפים',
    },
  };

  const text = t[language];

  // Don't show on home page or login
  if (pathname === '/' || pathname === '/login') {
    return null;
  }

  return (
    <button
      onClick={() => toggleBookmark(pathname)}
      className={`fixed ${language === 'he' ? 'left-8' : 'right-8'} bottom-24 z-40 p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 ${
        bookmarked
          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
          : 'bg-white text-gray-600 border-2 border-gray-300'
      }`}
      aria-label={bookmarked ? text.remove : text.add}
      title={bookmarked ? text.remove : text.add}
    >
      <svg
        className="w-6 h-6"
        fill={bookmarked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </button>
  );
}
