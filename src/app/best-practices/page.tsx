'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function BestPractices() {
  const { language } = useLanguage();

  if (language === 'he') {
    return (
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-scale-in">
          שיטות עבודה מומלצות וטכניקות
        </h1>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Small Talk - ושבירת קרח</h2>
          <p className="text-gray-700 mb-4">מתאים בעיקר בשיחה ראשונית או במצבים נינוחים.</p>
          <div className="bg-gradient-to-l from-green-50 to-emerald-50 border-r-4 border-green-500 p-6 rounded glow-effect">
            <h3 className="font-semibold text-gray-900 mb-3">דוגמאות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"איך עובר היום שלך?"</li>
              <li className="pr-4">"עובד מהבית או מהמשרד?"</li>
              <li className="pr-4">"מקווה שהשאר עובד חלק – חוץ מהעניין הזה :)"</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">הקשבה פעילה</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-700 mb-2"><strong>• תנו ללקוח לדבר</strong> – אל תקטעו.</p>
              <p className="text-gray-700 mb-2"><strong>• חזרו על דבריו</strong> במילים שלכם.</p>
              <p className="text-gray-700 mb-2"><strong>• שאלו שאלות</strong> שמחדדות.</p>
            </div>
            <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
              <h3 className="font-semibold text-gray-900 mb-3">דוגמאות</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="pr-4">"אם אני מבין נכון, אתה אומר ש..."</li>
                <li className="pr-4">"אז בעצם כל פעם שאתה לוחץ על X – קורה Y?"</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">לשאול שאלות בשלבים מוקדמים</h2>
          <p className="text-gray-700 mb-4">חסכו זמן ע"י איסוף מידע בהתחלה.</p>
          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">שאלות שימושיות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"מתי התחילה הבעיה?"</li>
              <li className="pr-4">"האם נעשו שינויים לאחרונה?"</li>
              <li className="pr-4">"האם זה קרה בעבר?"</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">להראות הבנה ולקחת אחריות</h2>
          <p className="text-gray-700 mb-4">אשרו את הבעיה והסבירו על תוכנית הפעולה.</p>
          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">דוגמאות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"זה נראה כמו XYZ, אני בודק את זה כעת."</li>
              <li className="pr-4">"השלבים הבאים: קודם כל X, אח"כ Y..."</li>
              <li className="pr-4">"אעדכן גם אם לא תהיה התקדמות – עד שנסגור."</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-bounce-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">תחושת דחיפות (Sense of Urgency)</h2>
          <p className="text-gray-700 mb-4">חשוב לשדר מחויבות גם אם התקלה לא קריטית.</p>
          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">דוגמאות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"מבין שזה משפיע עליך – זה בתעדוף."</li>
              <li className="pr-4">"אני בודק את זה עכשיו."</li>
              <li className="pr-4">"ברגע שיהיה חדש – תדע מזה."</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">עדכונים פרואקטיביים</h2>
          <p className="text-gray-700 mb-4">אל תתנו ללקוח לרדוף אחריכם.</p>
          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">דוגמאות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"עדכון ביניים – עדיין בבדיקה. נעדכן שוב תוך שעה."</li>
              <li className="pr-4">"כרגע מול Tier 3, אעדכן ברגע שנקבל תשובה."</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">כבוד והכרת תודה</h2>
          <p className="text-gray-700 mb-4">תמיד לשמור על כבוד הדדי:</p>
          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">משפטים חשובים</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"תודה על הסבלנות."</li>
              <li className="pr-4">"ההסבר שלך עזר לי להבין."</li>
              <li className="pr-4">"אני מעריך את שיתוף הפעולה שלך."</li>
            </ul>
          </div>
        </section>
      </main>
    );
  }

  // English version
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-scale-in">
        Best Practices & Techniques
      </h1>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          When You Don't Have an Answer
        </h2>
        <p className="text-gray-700 mb-6 font-semibold">
          Never answer "I don't know" without a follow-up plan.
        </p>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded glow-effect">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Preferred Responses</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="pl-4">"Good question, I'm checking and will return with an accurate answer."</li>
            <li className="pl-4">"This depends on a few parameters. I want to verify before responding."</li>
            <li className="pl-4">"There are several possibilities. I'm reviewing what fits your case."</li>
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Active Listening</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Let the Client Speak</h3>
            <p className="text-gray-700">Do not interrupt during the problem description.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Reflect and Confirm</h3>
            <p className="text-gray-700 mb-3">Repeat or rephrase to confirm understanding.</p>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="font-semibold text-gray-900 mb-2">Examples:</p>
              <ul className="space-y-2 text-gray-700">
                <li className="pl-4">"If I understand correctly, you're saying that…"</li>
                <li className="pl-4">"So every time you click X, Y happens?"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 card-hover animate-slide-in-right">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">More Techniques</h2>
        <ul className="space-y-3 text-gray-700">
          <li><strong>Small Talk:</strong> Build rapport in first calls or relaxed moments</li>
          <li><strong>Taking Ownership:</strong> State the plan and show urgency</li>
          <li><strong>Proactive Updates:</strong> Update before the client asks</li>
          <li><strong>Smart Empathy:</strong> Link client impact to immediate action</li>
          <li><strong>Closing Well:</strong> Confirm resolution and express appreciation</li>
        </ul>
      </section>
    </main>
  );
}
