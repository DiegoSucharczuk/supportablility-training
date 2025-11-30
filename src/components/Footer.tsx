'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  
  const text = language === 'en' 
    ? '© 2025 Diego Sucharczuk - Supportability Training. All rights reserved.'
    : '© 2025 דיאגו סוצ׳רצ׳וק - אימון תמיכה מקצועית. כל הזכויות שמורות.';
  
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white mt-auto border-t-4 border-blue-500">
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-fade-in">
          <p className="text-lg font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {text}
          </p>
        </div>
      </div>
    </footer>
  );
}
