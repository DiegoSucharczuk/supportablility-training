'use client';

import Link from 'next/link';
import Card from '@/components/Card';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { language } = useLanguage();

  const content = {
    en: {
      hero: {
        title: 'Professional Communication for Client Support',
        subtitle: 'Master the communication principles and practices that build trust, demonstrate ownership, and create positive client experiences.',
      },
      cards: [
        {
          title: 'Introduction',
          description: 'Learn the fundamentals of professional client communication and why it matters.',
          link: 'Learn More →',
          href: '/introduction',
          icon: '📚',
        },
        {
          title: 'Core Principles',
          description: 'Master the 12 foundational principles for effective client communication (8 communication + 4 general principles).',
          link: 'Explore →',
          href: '/core-principles',
          icon: '⚙️',
        },
        {
          title: 'Phrases',
          description: 'Ready-to-use professional phrases and examples for various client situations.',
          link: 'Browse →',
          href: '/examples',
          icon: '💬',
        },
        {
          title: 'Escalations',
          description: 'Professional strategies for handling escalated situations and writing effective case responses.',
          link: 'Learn →',
          href: '/escalation-response',
          icon: '🔥',
        },
        {
          title: 'Quick Guide',
          description: 'Fast reference with key communication principles, techniques, and language tips.',
          link: 'View →',
          href: '/communication-guide',
          icon: '⚡',
        },
        {
          title: 'Resources',
          description: 'Additional tools, templates, and reference materials for professional communication.',
          link: 'Access →',
          href: '/resources',
          icon: '📖',
        },
        {
          title: 'Feedback',
          description: 'Share your thoughts and help us improve this training resource.',
          link: 'Send →',
          href: '/feedback',
          icon: '💭',
        },
      ],
      skills: {
        title: 'Key Communication Skills Covered',
        items: [
          { icon: '🤝', title: 'Building Trust', desc: 'Consistency, transparency, and reliability in every interaction' },
          { icon: '👂', title: 'Active Listening', desc: 'Understanding client needs through reflection and clarification' },
          { icon: '💬', title: 'Clear Communication', desc: 'Positive, direct language that avoids ambiguity' },
          { icon: '🎯', title: 'Taking Ownership', desc: 'Demonstrating leadership and accountability' },
          { icon: '❤️', title: 'Smart Empathy', desc: 'Linking client impact to immediate action' },
          { icon: '🔄', title: 'Proactive Updates', desc: 'Keeping clients informed before they ask' },
          { icon: '🧊', title: 'Breaking the Ice', desc: 'Creating comfortable atmosphere with small talk' },
          { icon: '❓', title: 'Early Questions', desc: 'Gathering important information at conversation start' },
          { icon: '⚡', title: 'Sense of Urgency', desc: 'Conveying commitment and speed in problem resolution' },
          { icon: '🤲', title: 'Shared Responsibility', desc: 'Using collaborative language instead of blaming' },
          { icon: '🏆', title: 'Win-Win Solutions', desc: 'Finding solutions that benefit both parties' },
          { icon: '📝', title: 'Structured Responses', desc: 'Clear and organized writing of updates and solutions' },
        ],
      },
      cta: {
        title: 'Ready to Get Started?',
        subtitle: 'Master the communication skills that turn client interactions into positive partnerships.',
        button: 'Start Learning',
      },
    },
    he: {
      hero: {
        title: 'עקרונות תקשורת מקצועית מול לקוחות',
        subtitle: 'שלטו בעקרונות ושיטות התקשורת שבונים אמון, מפגינים אחריות ויוצרים חוויות חיוביות ללקוחות.',
      },
      cards: [
        {
          title: 'מבוא',
          description: 'למדו את היסודות של תקשורת מקצועית מול לקוחות ומדוע זה חשוב.',
          link: 'למד עוד ←',
          href: '/introduction',
          icon: '📚',
        },
        {
          title: 'עקרונות יסוד',
          description: 'שלטו ב-12 העקרונות היסודיים לתקשורת יעילה מול לקוחות (8 עקרונות תקשורת + 4 עקרונות כלליים).',
          link: 'גלה ←',
          href: '/core-principles',
          icon: '⚙️',
        },
        {
          title: 'משפטים',
          description: 'משפטים ודוגמאות מקצועיות מוכנות לשימוש למצבי לקוח שונים.',
          link: 'עיין ←',
          href: '/examples',
          icon: '💬',
        },
        {
          title: 'טיפול באסקלציות',
          description: 'אסטרטגיות מקצועיות לטיפול במצבי הסלמה וכתיבת תגובות יעילות.',
          link: 'למד ←',
          href: '/escalation-response',
          icon: '🔥',
        },
        {
          title: 'מדריך מקוצר',
          description: 'עזר מהיר עם עקרונות תקשורת מרכזיים, טכניקות וטיפים לשוניים.',
          link: 'צפה ←',
          href: '/communication-guide',
          icon: '⚡',
        },
        {
          title: 'משאבים',
          description: 'כלים נוספים, תבניות וחומרי עזר לתקשורת מקצועית.',
          link: 'גש ←',
          href: '/resources',
          icon: '📖',
        },
        {
          title: 'משוב',
          description: 'שתף את המחשבות שלך ועזור לנו לשפר את משאב ההדרכה.',
          link: 'שלח ←',
          href: '/feedback',
          icon: '💭',
        },
      ],
      skills: {
        title: 'כישורי תקשורת מרכזיים',
        items: [
          { icon: '🤝', title: 'בניית אמון', desc: 'עקביות, שקיפות ואמינות בכל אינטראקציה' },
          { icon: '👂', title: 'הקשבה פעילה', desc: 'הבנת צרכי הלקוח דרך שיקוף והבהרה' },
          { icon: '💬', title: 'תקשורת ברורה', desc: 'שפה חיובית וישירה שנמנעת מעמימות' },
          { icon: '🎯', title: 'לקיחת אחריות', desc: 'הפגנת מנהיגות ואחריות' },
          { icon: '❤️', title: 'אמפתיה חכמה', desc: 'קישור השפעה על הלקוח לפעולה מיידית' },
          { icon: '🔄', title: 'עדכונים פרואקטיביים', desc: 'עדכון לקוחות לפני שהם שואלים' },
          { icon: '🧊', title: 'שבירת קרח', desc: 'יצירת אווירה נעימה ושיחה קלה עם לקוחות' },
          { icon: '❓', title: 'שאילת שאלות מוקדמות', desc: 'איסוף מידע חשוב בתחילת השיחה' },
          { icon: '⚡', title: 'תחושת דחיפות', desc: 'שידור מחויבות ומהירות בטיפול בבעיה' },
          { icon: '🤲', title: 'אחריות משותפת', desc: 'שימוש בשפה שיתופית ולא מאשימה' },
          { icon: '🏆', title: 'פתרונות Win-Win', desc: 'חיפוש אחר פתרונות טובים לשני הצדדים' },
          { icon: '📝', title: 'תגובות מבניות', desc: 'כתיבה ברורה ומסודרת של עדכונים ופתרונות' },
        ],
      },
      cta: {
        title: 'מוכנים להתחיל?',
        subtitle: 'שלטו בכישורי התקשורת שהופכים אינטראקציות עם לקוחות לשותפויות חיוביות.',
        button: 'התחל ללמוד',
      },
    },
  };

  const t = content[language];

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text animate-scale-in">
          {t.hero.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
          {t.hero.subtitle}
        </p>
      </section>

      {/* Main Content Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {t.cards.map((card, idx) => {
          const animations = [
            'animate-slide-in-left',
            'animate-bounce-in',
            'animate-slide-in-right',
            'animate-fade-in',
            'animate-slide-up',
            'animate-scale-in',
            'animate-slide-in-left',
          ];
          
          return (
            <div key={idx} className={animations[idx % animations.length]}>
              <Card
                title={card.title}
                description={card.description}
                icon={card.icon}
              >
                <Link 
                  href={card.href}
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-all hover:scale-105"
                >
                  {card.link}
                </Link>
              </Card>
            </div>
          );
        })}
      </section>

      {/* Key Topics */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-16 glow-effect animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 gradient-text">{t.skills.title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {t.skills.items.map((item, idx) => (
            <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                <span className="floating inline-block">{item.icon}</span> {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg p-12 animate-scale-in">
        <h2 className="text-3xl font-bold text-white mb-4">
          {t.cta.title}
        </h2>
        <p className="text-lg text-white mb-6">
          {t.cta.subtitle}
        </p>
        <Link
          href="/introduction"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-110 pulse-glow"
        >
          {t.cta.button}
        </Link>
      </section>
    </main>
  );
}

