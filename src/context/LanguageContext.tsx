'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'he')) {
      setLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  // Save language and apply RTL
  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem('language', language);
    
    // Apply RTL for Hebrew
    if (language === 'he') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'he';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [language, mounted]);

  const t = (key: string) => key; // Placeholder - translation will be in components

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
