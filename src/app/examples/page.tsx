'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Examples() {
  const { language } = useLanguage();

  if (language === 'he') {
    return (
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-scale-in">
          טכניקות מתקדמות
        </h1>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Communicate Effort - שיקוף מלא
          </h2>
          <p className="text-gray-700 mb-4">אל תגיד רק "בודקים".</p>
          <div className="bg-gradient-to-l from-yellow-50 to-amber-50 border-r-4 border-yellow-500 p-6 rounded glow-effect">
            <h3 className="font-semibold text-gray-900 mb-3">דוגמה</h3>
            <p className="text-gray-700 pr-4">
              "בדקנו את הלוגים, לא מצאנו שגיאות חריגות אך זיהינו pattern חוזר. 
              הפעלנו בדיקות A ו-B כדי לשלול בעיה ברמת הרשת."
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Thought Progress - שתף את המחשבה שלך
          </h2>
          <p className="text-gray-700 mb-4">שתף את מה שאתה רואה, מבין או מנסה לאמת.</p>
          <ul className="space-y-2 text-gray-700 mb-4 mr-6">
            <li>• We saw...</li>
            <li>• We know...</li>
            <li>• We understand...</li>
            <li>• We're trying to confirm...</li>
          </ul>
          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">דוגמה</h3>
            <p className="text-gray-700 pr-4">
              "מהבדיקות שלנו עד כה, אנחנו מבינים שהבעיה מתרחשת לאחר X. 
              אנחנו מנסים לאמת אם Y הוא הסיבה."
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            אמפתיה חכמה ויעילה – בלי קלישאות
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-red-50 border-r-4 border-red-500 p-6 rounded">
              <h3 className="font-semibold text-gray-900 mb-3">✗ אל תגיד</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="pr-4">"אנחנו יודעים איך אתה מרגיש"</li>
                <li className="pr-4">"אנחנו מבינים את התסכול שלך"</li>
              </ul>
            </div>

            <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
              <h3 className="font-semibold text-gray-900 mb-3">✓ במקום זה</h3>
              <p className="text-gray-700 pr-4">
                "אני מבין ש[מה שהוא אמר] משפיע על הצוות שלך. אנחנו מתעדפים את זה בהתאם."
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            שיקוף והקשר לבקשה
          </h2>
          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">דוגמה</h3>
            <p className="text-gray-700 pr-4">
              "כפי שהסברת שהמערכת קורסת ברגע שיש יותר מ-100 חיבורים, זו בדיוק הסיבה 
              שביקשנו ממך לבצע בדיקה תחת עומס."
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Executive Summary - סיכום בתחילת הודעה
          </h2>
          <p className="text-gray-700 mb-4">בכל תקשורת ארוכה – להתחיל ב-2 שורות סיכום.</p>
          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">דוגמה</h3>
            <p className="text-gray-700 pr-4">
              "We completed the log analysis and saw an auth failure pattern repeated every hour. 
              Next, we will test X."
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg p-8 animate-bounce-in pulse-glow">
          <h2 className="text-2xl font-bold mb-4">לא רק תשובות – חוויה שלמה</h2>
          <p className="text-lg">
            הלקוח לא תמיד יזכור את הפתרון, אבל תמיד יזכור איך גרמת לו להרגיש.
          </p>
        </section>
      </main>
    );
  }

  // English version
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-scale-in">
        Additional Notes from Team Workshops
      </h1>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Experience Matters More Than the Fix
        </h2>
        <div className="space-y-4">
          <p className="text-gray-700 text-lg">
            Clients often remember how they were treated, not the technical steps.
          </p>
          <p className="text-gray-700 text-lg font-semibold">
            Consistency, tone, and clarity define the overall experience.
          </p>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Mental Flexibility
        </h2>
        <p className="text-gray-700 mb-6">
          Adapt communication to the caller. Different clients have different needs.
        </p>
      </section>

      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg p-8 animate-bounce-in pulse-glow">
        <h2 className="text-2xl font-bold mb-4">Remember</h2>
        <p className="text-lg mb-4">
          Technical problems are temporary, but relationships are long-term.
        </p>
        <p className="text-lg">
          How you make clients feel during challenging moments defines the strength of your 
          professional partnerships.
        </p>
      </section>
    </main>
  );
}
