'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function CorePrinciples() {
  const { language } = useLanguage();

  if (language === 'he') {
    return (
      <main className="container mx-auto px-4 py-12 max-w-4xl">
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

  // English version (original content)
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-scale-in">
        Foundational Principles
      </h1>

      {/* Principle 1.1 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Build Trust Through Consistency
        </h2>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-3">Maintain transparency, reliability, and clear communication.</p>
          <p className="text-gray-700 mb-3">Do not promise outcomes or timelines you cannot meet.</p>
          <p className="text-gray-700 mb-3">Use professional, patient, respectful language.</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded glow-effect">
          <h3 className="font-semibold text-gray-900 mb-3"><span className="floating inline-block">✓</span> Examples</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">"I want to understand this fully so we can solve it together."</li>
            <li className="pl-4">"I'm with you until we close this."</li>
            <li className="pl-4">"I'm checking the logs now. I may involve another team. I'll update you as soon as I have more."</li>
          </ul>
        </div>
      </section>

      {/* Principle 1.2 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Under-Promise and Over-Deliver
        </h2>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-3">Set realistic update expectations.</p>
          <p className="text-gray-700 mb-3">Deliver faster or with more detail when possible.</p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Example</h3>
          <p className="text-gray-700 pl-4">Promise an update in two hours, deliver in one.</p>
        </div>
      </section>

      {/* Principle 1.3 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Shared Ownership
        </h2>
        
        <p className="text-gray-700 mb-6">
          Avoid framing the problem as "the client's issue". Use collaborative language.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">✗ Avoid</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pl-4">"You have a problem."</li>
              <li className="pl-4">"Your system is broken."</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded">
            <h3 className="font-semibold text-gray-900 mb-3">✓ Preferred</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pl-4">"We are seeing unusual behavior."</li>
              <li className="pl-4">"Let's review this together."</li>
              <li className="pl-4">"Something here requires a joint investigation."</li>
            </ul>
          </div>
        </div>
      </section>

      {/* More principles truncated for brevity - keeping same structure */}
      <section className="bg-white rounded-lg shadow-md p-8 card-hover animate-bounce-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Additional Core Principles
        </h2>
        <ul className="space-y-3 text-gray-700">
          <li><strong>Positive, Direct Language:</strong> Keep wording factual and concise</li>
          <li><strong>Disagree Without Being Disagreeable:</strong> Correct respectfully</li>
          <li><strong>Look for Win-Win Outcomes:</strong> Satisfy both client needs and technical realities</li>
          <li><strong>Tailor Communication:</strong> Adjust detail level based on your audience</li>
        </ul>
      </section>
    </main>
  );
}
