'use client';

import { useLanguage } from '@/context/LanguageContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgress from '@/components/ReadingProgress';
import ScrollToTop from '@/components/ScrollToTop';

export default function Introduction() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Professional Communication Guide for Client-Facing Technical Teams',
      subtitle: 'I\'m Diego Sucharczuk, Escalations Manager at the Tequila team at CyberArk. I wrote these principles from experience working closely with clients in high-pressure situations and complex incidents. I wanted to consolidate what really works in professional communication – how to maintain trust, ownership, and a true sense of partnership.',
      whatIs: {
        title: 'What is Supportability?',
        desc: 'Supportability encompasses the principles, practices, and communication skills that enable technical teams to effectively help clients resolve issues while maintaining trust and positive relationships.',
        goals: 'Core Goals',
        items: [
          { title: 'Trust', desc: 'Build and maintain client confidence through consistency and transparency' },
          { title: 'Ownership', desc: 'Take responsibility and demonstrate leadership in problem resolution' },
          { title: 'Clarity', desc: 'Communicate technical information in an understandable, structured way' },
          { title: 'Positive Partnership', desc: 'Foster collaborative relationships that focus on shared solutions' },
        ],
        insight: 'Key Insight',
        insightText: '"Experience matters more than the fix. Clients often remember how they were treated, not the technical steps. Consistency, tone, and clarity define the overall experience."',
      },
      why: {
        title: 'Why This Matters',
        intro: 'Technical expertise alone isn\'t enough. How we communicate during critical moments can:',
        items: [
          'Turn a frustrated client into a loyal advocate',
          'Prevent escalations and reduce stress for everyone involved',
          'Build long-term trust that transcends individual incidents',
          'Demonstrate professionalism that reflects on the entire organization',
        ],
      },
    },
    he: {
      title: 'עקרונות תקשורת ותפעול מקצועי מול לקוחות',
      subtitle: 'אני דיאגו סוצ׳רצ׳וק, מנהל הסקלציות בצוות טקילה בחברת CyberArk. כתבתי את העקרונות האלה מתוך ניסיון בעבודה צמודה עם לקוחות במצבי לחץ ותקלות מורכבות. רציתי לרכז את מה שבאמת עובד בתקשורת מקצועית – איך לשמור על אמון, אחריות ותחושת שותפות אמיתית.',
      whatIs: {
        title: 'מהי תמיכה מקצועית?',
        desc: 'תמיכה מקצועית כוללת את העקרונות, השיטות וכישורי התקשורת המאפשרים לצוותים טכניים לעזור ללקוחות בפתרון בעיות תוך שמירה על אמון ויחסים חיוביים.',
        goals: 'מטרות ליבה',
        items: [
          { title: 'אמון', desc: 'בניית ושמירת אמון הלקוח באמצעות עקביות ושקיפות' },
          { title: 'אחריות', desc: 'נטילת אחריות והפגנת מנהיגות בפתרון בעיות' },
          { title: 'בהירות', desc: 'תקשורת מידע טכני בצורה מובנת ומסודרת' },
          { title: 'שותפות חיובית', desc: 'טיפוח יחסי שיתוף פעולה הממוקדים בפתרונות משותפים' },
        ],
        insight: 'תובנה מרכזית',
        insightText: '"אנחנו לא מספקים רק תשובות – אנחנו מייצרים חוויה. הרבה פעמים הלקוח לא יזכור את פרטי הפתרון – הוא יזכור איך גרמת לו להרגיש. כל מילה, טון וגישה משפיעים על תפיסת השירות."',
      },
      why: {
        title: 'למה זה חשוב',
        intro: 'מומחיות טכנית לבדה לא מספיקה. האופן שבו אנו מתקשרים ברגעים קריטיים יכול:',
        items: [
          'להפוך לקוח מתוסכל לתומך נאמן',
          'למנוע הסלמות ולהפחית מתח עבור כל המעורבים',
          'לבנות אמון לטווח ארוך שחורג מאירועים בודדים',
          'להפגין מקצועיות המשקפת את כל הארגון',
        ],
      },
    },
  };

  const t = content[language];

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <ReadingProgress />
      <ScrollToTop />
      <Breadcrumbs />
      <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text animate-scale-in">
        {t.title}
      </h1>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 p-6 mb-8 animate-slide-in-left glow-effect">
        <p className="text-lg text-gray-700">
          {t.subtitle}
        </p>
      </div>

      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
        <h2 className="text-3xl font-bold gradient-text mb-6">{t.whatIs.title}</h2>
        
        <p className="text-gray-700 mb-4 text-lg">
          {t.whatIs.desc}
        </p>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg mb-6 animate-slide-up">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">{t.whatIs.goals}</h3>
          <ul className="space-y-3">
            {t.whatIs.items.map((item, idx) => (
              <li key={idx} className="flex items-start animate-slide-in-left" style={{ animationDelay: `${idx * 0.1}s` }}>
                <span className="text-blue-600 font-bold mr-3 floating">✓</span>
                <span className="text-gray-700"><strong>{item.title}:</strong> {item.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded glow-effect animate-bounce-in">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.whatIs.insight}</h3>
          <p className="text-gray-700 italic">
            {t.whatIs.insightText}
          </p>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-md p-8 card-hover animate-slide-in-right">
        <h2 className="text-2xl font-bold gradient-text mb-4">{t.why.title}</h2>
        
        <p className="text-gray-700 mb-4">
          {t.why.intro}
        </p>

        <ul className="space-y-3 text-gray-700 ml-6">
          {t.why.items.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-3">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
