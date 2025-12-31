'use client';

import { useLanguage } from '@/context/LanguageContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgress from '@/components/ReadingProgress';
import ScrollToTop from '@/components/ScrollToTop';

export default function CorePrinciples() {
  const { language } = useLanguage();

  if (language === 'he') {
    return (
      <main className="container mx-auto px-4 py-12 max-w-4xl" dir="rtl">
        <ReadingProgress />
        <ScrollToTop />
        <Breadcrumbs />
        <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-scale-in">
          עקרונות יסוד
        </h1>

        {/* Principle 1 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            בניית אמון עם הלקוח
          </h2>
          
          <div className="mb-6 space-y-2">
            <p className="text-gray-700">• היו עקביים, שקופים ואמינים.</p>
            <p className="text-gray-700">• אל תבטיחו מה שלא תוכלו לקיים.</p>
            <p className="text-gray-700">• השתמשו בשפה מקצועית, סבלנית ומכבדת – גם כשיש לחץ.</p>
            <p className="text-gray-700">• שתפו בתהליך, גם אם אין תשובות עדיין.</p>
          </div>

          <div className="bg-gradient-to-l from-green-50 to-emerald-50 border-r-4 border-green-500 p-6 rounded glow-effect">
            <h3 className="font-semibold text-gray-900 mb-3"><span className="floating inline-block">✓</span> דוגמאות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"אני רוצה להבין את הבעיה לעומק כדי שנוכל לפתור אותה יחד."</li>
              <li className="pr-4">"אני כאן איתך עד שנסיים לטפל בזה."</li>
              <li className="pr-4">"כרגע אני בודק את הלוגים, ייתכן שאצטרך עזרה מצוות נוסף – אעדכן אותך כשיהיה חדש."</li>
            </ul>
          </div>
        </section>

        {/* Principle 2 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            כשאין תשובה – איך מגיבים?
          </h2>
          
          <p className="text-gray-700 mb-6 font-semibold">
            לעולם לא לומר "אני לא יודע" בלי המשך ברור.
          </p>

          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">✓ במקום זה תגיד</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"שאלה מצוינת – אני בודק וחוזר עם תשובה מדויקת."</li>
              <li className="pr-4">"זה תלוי בכמה פרמטרים, חשוב לי לוודא לפני שאשיב."</li>
              <li className="pr-4">"יש כמה אפשרויות – אני בודק מה רלוונטי כאן."</li>
            </ul>
          </div>
        </section>

        {/* Principle 3 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            אחריות משותפת לבעיה
          </h2>
          
          <p className="text-gray-700 mb-6">
            הימנעו ממשפטים מאשימים כמו "יש לכם תקלה".
          </p>

          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">✓ עדיף לומר</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"אנחנו רואים התנהגות חריגה..."</li>
              <li className="pr-4">"בוא נבדוק את זה יחד..."</li>
              <li className="pr-4">"נראה שיש משהו שדורש בדיקה משותפת."</li>
            </ul>
          </div>
        </section>

        {/* Principle 4 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Small Talk - ושבירת קרח
          </h2>
          
          <p className="text-gray-700 mb-6">
            מתאים בעיקר בשיחה ראשונית או במצבים נינוחים.
          </p>

          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">✓ דוגמאות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"איך עובר היום שלך?"</li>
              <li className="pr-4">"עובד מהבית או מהמשרד?"</li>
              <li className="pr-4">"מקווה שהשאר עובד חלק – חוץ מהעניין הזה :)"</li>
            </ul>
          </div>
        </section>

        {/* Principle 5 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            הקשבה פעילה
          </h2>
          
          <div className="mb-6 space-y-2">
            <p className="text-gray-700">• תנו ללקוח לדבר – אל תקטעו.</p>
            <p className="text-gray-700">• חזרו על דבריו במילים שלכם.</p>
            <p className="text-gray-700">• שאלו שאלות שמחדדות.</p>
          </div>

          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">✓ דוגמאות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"אם אני מבין נכון, אתה אומר ש..."</li>
              <li className="pr-4">"אז בעצם כל פעם שאתה לוחץ על X – קורה Y?"</li>
            </ul>
          </div>
        </section>

        {/* Principle 6 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            לשאול שאלות בשלבים מוקדמים
          </h2>
          
          <p className="text-gray-700 mb-6">
            חסכו זמן ע"י איסוף מידע בהתחלה.
          </p>

          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">✓ שאלות שימושיות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"מתי התחילה הבעיה?"</li>
              <li className="pr-4">"האם נעשו שינויים לאחרונה?"</li>
              <li className="pr-4">"האם זה קרה בעבר?"</li>
            </ul>
          </div>
        </section>

        {/* Principle 7 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            להראות הבנה ולקחת אחריות
          </h2>
          
          <p className="text-gray-700 mb-6">
            אשרו את הבעיה והסבירו על תוכנית הפעולה.
          </p>

          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">✓ דוגמאות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"זה נראה כמו XYZ, אני בודק את זה כעת."</li>
              <li className="pr-4">"השלבים הבאים: קודם כל X, אח"כ Y..."</li>
              <li className="pr-4">"אעדכן גם אם לא תהיה התקדמות – עד שנסגור."</li>
            </ul>
          </div>
        </section>

        {/* Principle 8 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            תחושת דחיפות (Sense of Urgency)
          </h2>
          
          <p className="text-gray-700 mb-6">
            חשוב לשדר מחויבות גם אם התקלה לא קריטית.
          </p>

          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">✓ דוגמאות</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">"מבין שזה משפיע עליך – זה בתעדוף."</li>
              <li className="pr-4">"אני בודק את זה עכשיו."</li>
              <li className="pr-4">"ברגע שיהיה חדש – תדע מזה."</li>
            </ul>
          </div>
        </section>

        {/* Principle 9 - Terminology Mirroring */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            שיקוף טרמינולוגיה (Terminology Mirroring)
          </h2>
          
          <p className="text-gray-700 mb-6 font-semibold">
            השתמש באותן מילים שהלקוח השתמש בהן – אל תשנה את רמת החומרה או המסגרת.
          </p>

          <div className="bg-yellow-50 border-r-4 border-yellow-500 p-6 rounded mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">❌ הבעיה</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">הלקוח: "יש לי <strong>שאלה</strong> לגבי..."</li>
              <li className="pr-4">אתה: "זיהיתי את ה<strong>בעיה</strong>..."</li>
              <li className="pr-4">💥 הסלמת שאלה רגילה לבעיה!</li>
            </ul>
          </div>

          <div className="bg-green-50 border-r-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">✓ טבלת שיקוף</h3>
            <div className="space-y-3 text-gray-700">
              <div className="grid grid-cols-3 gap-2 font-semibold border-b pb-2">
                <div>הלקוח אמר</div>
                <div>✓ שקף</div>
                <div>❌ אל תגיד</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>"יש לי <strong>שאלה</strong>..."</div>
                <div>"לגבי השאלה שלך..."</div>
                <div>"פתרתי את הבעיה"</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>"התנהגות <strong>לא צפויה</strong>..."</div>
                <div>"לגבי ההתנהגות הזו..."</div>
                <div>"תיקנתי את הבאג"</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>"יש <strong>issue</strong> עם..."</div>
                <div>"לגבי ה-issue הזה..."</div>
                <div>"מצאנו את הבעיה"</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>"משהו <strong>מוזר</strong> קורה..."</div>
                <div>"לגבי המצב הזה..."</div>
                <div>"ניפיתי את השגיאה"</div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-blue-50 border-r-4 border-blue-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">💡 למה זה חשוב?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">✓ מכבד את הפריימינג של הלקוח – הוא בחר את המילים שלו בקפידה</li>
              <li className="pr-4">✓ מונע הסלמה – אל תגרום לזה להישמע יותר רציני ממה שהוא</li>
              <li className="pr-4">✓ מראה הקשבה אקטיבית – שימוש בשפה שלו מוכיח שהבנת</li>
              <li className="pr-4">✓ פוליטי נכון – מילים מסוימות מרמזות על האשמה/חומרה</li>
            </ul>
          </div>
        </section>

        {/* General Principles */}
        <section className="bg-white rounded-lg shadow-md p-8 card-hover animate-bounce-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            💡 עקרונות כלליים
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Under-promise / Over-deliver</h3>
              <p className="text-gray-700 mb-2"><strong>הפירוש:</strong> תן הבטחות זהירות – ונסה להפתיע לטובה.</p>
              <p className="text-gray-700"><strong>למה:</strong> כשאתה מבטיח פחות ומספק יותר, אתה מייצר תחושת אמינות ומקצועיות.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Disagree without being disagreeable</h3>
              <p className="text-gray-700 mb-2"><strong>הפירוש:</strong> מותר לחלוק – אבל בצורה מכבדת ולא תוקפנית.</p>
              <p className="text-gray-700"><strong>למה:</strong> לקוח לא תמיד צודק, אבל כן תמיד ראוי לכבוד.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Look for Win-Win</h3>
              <p className="text-gray-700 mb-2"><strong>הפירוש:</strong> חפש פתרונות שטובים גם ללקוח וגם לך/לצוות.</p>
              <p className="text-gray-700"><strong>למה:</strong> פתרון חד-צדדי יוצר תסכול. פתרון שבו שני הצדדים מרוויחים – מחזק את מערכת היחסים.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">שפה חיובית, כנה, ישירה וקצרה</h3>
              <p className="text-gray-700">חיובית – לא לשדר שליליות או ייאוש | כנה – לא להמציא תשובות | ישירה – בלי לעטוף דברים יותר מדי | קצרה – לא לבלבל, לא לחפור</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // English version
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <ReadingProgress />
      <ScrollToTop />
      <Breadcrumbs />
      <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-scale-in">
        Core Principles
      </h1>

      {/* Principle 1 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Building Trust with Customers
        </h2>
        
        <div className="mb-6 space-y-2">
          <p className="text-gray-700">• Be consistent, transparent, and reliable.</p>
          <p className="text-gray-700">• Don't promise what you can't deliver.</p>
          <p className="text-gray-700">• Use professional, patient, respectful language – even under pressure.</p>
          <p className="text-gray-700">• Share the process, even if there are no answers yet.</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded glow-effect">
          <h3 className="font-semibold text-gray-900 mb-3"><span className="floating inline-block">✓</span> Examples</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">"I want to understand the issue thoroughly so we can solve it together."</li>
            <li className="pl-4">"I'm here with you until we finish handling this."</li>
            <li className="pl-4">"Currently checking the logs, might need help from additional team – will update you when there's news."</li>
          </ul>
        </div>
      </section>

      {/* Principle 2 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          When You Don't Have an Answer – How to Respond?
        </h2>
        
        <p className="text-gray-700 mb-6 font-semibold">
          Never say "I don't know" without a clear follow-up.
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Say This Instead</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">"Great question – let me check and get back with an accurate answer."</li>
            <li className="pl-4">"It depends on several parameters, important for me to verify before responding."</li>
            <li className="pl-4">"There are several possibilities – let me check what's relevant here."</li>
          </ul>
        </div>
      </section>

      {/* Principle 3 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Shared Responsibility for the Problem
        </h2>
        
        <p className="text-gray-700 mb-6">
          Avoid accusatory statements like "you have an issue".
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Better to Say</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">"We're seeing unusual behavior..."</li>
            <li className="pl-4">"Let's check this together..."</li>
            <li className="pl-4">"Seems like there's something that requires joint investigation."</li>
          </ul>
        </div>
      </section>

      {/* Principle 4 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Small Talk - Breaking the Ice
        </h2>
        
        <p className="text-gray-700 mb-6">
          Mainly appropriate in initial conversations or relaxed situations.
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Examples</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">"How's your day going?"</li>
            <li className="pl-4">"Working from home or the office?"</li>
            <li className="pl-4">"Hope everything else is running smoothly – except this issue :)"</li>
          </ul>
        </div>
      </section>

      {/* Principle 5 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Active Listening
        </h2>
        
        <div className="mb-6 space-y-2">
          <p className="text-gray-700">• Let the customer speak – don't interrupt.</p>
          <p className="text-gray-700">• Repeat their words back in your own words.</p>
          <p className="text-gray-700">• Ask clarifying questions.</p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Examples</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">"If I understand correctly, you're saying that..."</li>
            <li className="pl-4">"So basically every time you click X – Y happens?"</li>
          </ul>
        </div>
      </section>

      {/* Principle 6 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Ask Questions Early
        </h2>
        
        <p className="text-gray-700 mb-6">
          Save time by gathering information at the beginning.
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Useful Questions</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">"When did the problem start?"</li>
            <li className="pl-4">"Were any changes made recently?"</li>
            <li className="pl-4">"Has this happened before?"</li>
          </ul>
        </div>
      </section>

      {/* Principle 7 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Show Understanding and Take Ownership
        </h2>
        
        <p className="text-gray-700 mb-6">
          Acknowledge the problem and explain the action plan.
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Examples</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">"This looks like XYZ, I'm checking it now."</li>
            <li className="pl-4">"Next steps: first X, then Y..."</li>
            <li className="pl-4">"I'll update even if there's no progress – until we close this."</li>
          </ul>
        </div>
      </section>

      {/* Principle 8 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Sense of Urgency
        </h2>
        
        <p className="text-gray-700 mb-6">
          Important to convey commitment even if the issue isn't critical.
        </p>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Examples</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">"I understand this is affecting you – it's prioritized."</li>
            <li className="pl-4">"I'm checking this right now."</li>
            <li className="pl-4">"The moment there's news – you'll know."</li>
          </ul>
        </div>
      </section>

      {/* Principle 9 - Terminology Mirroring */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Terminology Mirroring
        </h2>
        
        <p className="text-gray-700 mb-6 font-semibold">
          Use the same words the customer used – don't change the severity level or framing.
        </p>

        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded mb-4">
          <h3 className="font-semibold text-gray-900 mb-3">❌ The Problem</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">Customer: "I have a <strong>question</strong> about..."</li>
            <li className="pl-4">You: "I've identified the <strong>problem</strong>..."</li>
            <li className="pl-4">💥 You just escalated a simple question into a problem!</li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Mirroring Table</h3>
          <div className="space-y-3 text-gray-700">
            <div className="grid grid-cols-3 gap-2 font-semibold border-b pb-2">
              <div>Customer Said</div>
              <div>✓ Mirror Back</div>
              <div>❌ Don't Say</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>"I have a <strong>question</strong>..."</div>
              <div>"Regarding your question..."</div>
              <div>"I've solved your problem"</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>"Unexpected <strong>behavior</strong>..."</div>
              <div>"About the behavior..."</div>
              <div>"I've fixed the bug"</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>"There's an <strong>issue</strong> with..."</div>
              <div>"Regarding this issue..."</div>
              <div>"We found the problem"</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>"Something <strong>strange</strong> happens..."</div>
              <div>"About this situation..."</div>
              <div>"I've debugged the error"</div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">💡 Why This Matters</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">✓ Respects customer's framing – they chose their words carefully</li>
            <li className="pl-4">✓ Avoids escalation – don't make it sound worse than they said</li>
            <li className="pl-4">✓ Shows active listening – using their language proves you understood</li>
            <li className="pl-4">✓ Political correctness – some words imply blame/severity</li>
          </ul>
        </div>
      </section>

      {/* General Principles */}
      <section className="bg-white rounded-lg shadow-md p-8 card-hover animate-bounce-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          💡 General Principles
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Under-promise / Over-deliver</h3>
            <p className="text-gray-700 mb-2"><strong>Meaning:</strong> Make careful promises – and try to surprise positively.</p>
            <p className="text-gray-700"><strong>Why:</strong> When you promise less and deliver more, you create a sense of reliability and professionalism.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Disagree without being disagreeable</h3>
            <p className="text-gray-700 mb-2"><strong>Meaning:</strong> It's okay to disagree – but in a respectful and non-confrontational way.</p>
            <p className="text-gray-700"><strong>Why:</strong> The customer isn't always right, but they always deserve respect.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Look for Win-Win</h3>
            <p className="text-gray-700 mb-2"><strong>Meaning:</strong> Look for solutions that are good for both the customer and you/your team.</p>
            <p className="text-gray-700"><strong>Why:</strong> One-sided solutions create frustration. Solutions where both parties benefit strengthen the relationship.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Positive, Honest, Direct, and Concise Language</h3>
            <p className="text-gray-700">Positive – don't convey negativity or despair | Honest – don't make up answers | Direct – don't wrap things up too much | Concise – don't confuse, don't dig too deep</p>
          </div>
        </div>
      </section>
    </main>
  );
}
