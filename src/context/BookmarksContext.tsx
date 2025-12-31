'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface BookmarksContextType {
  bookmarks: string[];
  toggleBookmark: (pageUrl: string) => void;
  isBookmarked: (pageUrl: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bookmarks');
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  }, [bookmarks, isLoaded]);

  const toggleBookmark = (pageUrl: string) => {
    setBookmarks(prev => {
      if (prev.includes(pageUrl)) {
        return prev.filter(url => url !== pageUrl);
      }
      return [...prev, pageUrl];
    });
  };

  const isBookmarked = (pageUrl: string) => {
    return bookmarks.includes(pageUrl);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
}
