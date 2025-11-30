'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Resources() {
  const { language } = useLanguage();

  if (language === 'he') {
    return (
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-scale-in">
          משאבים ומדריכים מהירים
        </h1>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            מדריך מהיר לתקשורת
          </h2>

          <div className="space-y-6">
            <div className="border-r-4 border-green-500 bg-green-50 p-4 rounded">
              <h3 className="font-bold text-gray-900 mb-2">כשאין לך תשובה:</h3>
              <p className="text-gray-700">"שאלה מצוינת – אני בודק וחוזר עם תשובה מדויקת."</p>
            </div>

            <div className="border-r-4 border-blue-500 bg-blue-50 p-4 rounded">
              <h3 className="font-bold text-gray-900 mb-2">כשמראים התקדמות:</h3>
              <p className="text-gray-700">"בודק את לוגי האותנטיקציה לאיתור דפוסי כשל" (לא רק "בודק")</p>
            </div>

            <div className="border-r-4 border-purple-500 bg-purple-50 p-4 rounded">
              <h3 className="font-bold text-gray-900 mb-2">כשמפגינים אחריות:</h3>
              <p className="text-gray-700">"אנחנו רואים התנהגות חריגה. בוא נבדוק את זה יחד."</p>
            </div>

            <div className="border-r-4 border-yellow-500 bg-yellow-50 p-4 rounded">
              <h3 className="font-bold text-gray-900 mb-2">כשמראים אמפתיה:</h3>
              <p className="text-gray-700">"אני מבין שזה חוסם את הדפלוי שלך. אנחנו מתייחסים לזה כעדיפות..."</p>
            </div>

            <div className="border-r-4 border-red-500 bg-red-50 p-4 rounded">
              <h3 className="font-bold text-gray-900 mb-2">בסגירה:</h3>
              <p className="text-gray-700">"הכל עובד כמצופה עכשיו? תודה על הסבלנות."</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            עשה ואל תעשה
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
                <span className="text-2xl ml-2">✓</span> עשה
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>השתמש בשפת "אנחנו" ו"שלנו"</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>הסבר את תהליך החשיבה שלך</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>ספק עדכונים פרואקטיביים</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>הבטח פחות וספק יותר</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>אשר הבנה על ידי ניסוח מחדש</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>קשר אמפתיה לפעולה</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>התאם לסגנון התקשורת של הלקוח</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                <span className="text-2xl ml-2">✗</span> אל תעשה
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>תגיד "יש לך בעיה"</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>תשתמש בביטויים מעורפלים כמו "בודק"</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>תבטיח הבטחות שאינך יכול לקיים</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>תגיד "אני לא יודע" בלי תוכנית</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>תפריע במהלך תיאור הבעיה</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>תשתמש בהצהרות אמפתיה גנריות</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="ml-2">•</span>
                  <span>תשתמש בשפה חלשה כמו "מקווה" או "אולי"</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8 card-hover animate-slide-in-right">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            תרחישי תרגול
          </h2>

          <p className="text-gray-700 mb-6">
            השתמש בתרחישים אלה כדי לתרגל את העקרונות:
          </p>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">תרחיש 1: בעיה לא מוכרת</h3>
              <p className="text-gray-700 mb-3">
                לקוח מדווח על שגיאה שמעולם לא ראית. אין לך תשובה מיידית.
              </p>
              <p className="text-sm text-blue-600 font-semibold">
                תרגול: איך תגיב תוך שימוש בעקרונות?
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">תרחיש 2: החקירה נמשכת זמן רב</h3>
              <p className="text-gray-700 mb-3">
                הבטחת עדכון תוך שעה, אך החקירה לוקחת יותר זמן מהצפוי.
              </p>
              <p className="text-sm text-blue-600 font-semibold">
                תרגול: איזה עדכון פרואקטיבי תספק?
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">תרחיש 3: הלקוח לא מבין נכון</h3>
              <p className="text-gray-700 mb-3">
                לקוח מתעקש שהבעיה אצלכם, אך הראיות מצביעות על בעיית תצורה בצד שלו.
              </p>
              <p className="text-sm text-blue-600 font-semibold">
                תרגול: איך תחלוק בדעה בצורה מכבדת?
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // English version
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-scale-in">
        Quick Reference Resources
      </h1>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Communication Quick Reference
        </h2>

        <div className="space-y-6">
          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
            <h3 className="font-bold text-gray-900 mb-2">When you don't know the answer:</h3>
            <p className="text-gray-700">"Good question, I'm checking and will return with an accurate answer."</p>
          </div>

          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
            <h3 className="font-bold text-gray-900 mb-2">When showing progress:</h3>
            <p className="text-gray-700">"Reviewing the authentication logs for failure patterns" (not just "Checking")</p>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
            <h3 className="font-bold text-gray-900 mb-2">When demonstrating ownership:</h3>
            <p className="text-gray-700">"We are seeing unusual behavior. Let's review this together."</p>
          </div>

          <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
            <h3 className="font-bold text-gray-900 mb-2">When showing empathy:</h3>
            <p className="text-gray-700">"I understand this is blocking your deployment. We are treating it as a priority..."</p>
          </div>

          <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
            <h3 className="font-bold text-gray-900 mb-2">When closing:</h3>
            <p className="text-gray-700">"Is everything working as expected now? Thank you for your patience."</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Communication Do's and Don'ts
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">✓</span> DO
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-700">
                <span className="mr-2">•</span>
                <span>Use "we" and "our" language</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="mr-2">•</span>
                <span>Explain your thought process</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="mr-2">•</span>
                <span>Provide proactive updates</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="mr-2">•</span>
                <span>Under-promise and over-deliver</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">✗</span> DON'T
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start text-gray-700">
                <span className="mr-2">•</span>
                <span>Say "you have a problem"</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="mr-2">•</span>
                <span>Use vague phrases like "checking"</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="mr-2">•</span>
                <span>Make promises you can't keep</span>
              </li>
              <li className="flex items-start text-gray-700">
                <span className="mr-2">•</span>
                <span>Say "I don't know" without a plan</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
