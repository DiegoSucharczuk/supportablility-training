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
        },
        {
          title: 'Core Principles',
          description: 'Master the 7 foundational principles for effective client communication.',
          link: 'Explore →',
        },
        {
          title: 'Best Practices',
          description: 'Practical techniques for active listening, empathy, and professional client interactions.',
          link: 'Discover →',
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
        },
        {
          title: 'עקרונות יסוד',
          description: 'שלטו ב-7 העקרונות היסודיים לתקשורת יעילה מול לקוחות.',
          link: 'גלה ←',
        },
        {
          title: 'שיטות עבודה מומלצות',
          description: 'טכניקות מעשיות להקשבה פעילה, אמפתיה ואינטראקציה מקצועית עם לקוחות.',
          link: 'למד ←',
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
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="animate-slide-in-left">
          <Card
            title={t.cards[0].title}
            description={t.cards[0].description}
            icon="📚"
          >
            <Link 
              href="/introduction" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-all hover:scale-105"
            >
              {t.cards[0].link}
            </Link>
          </Card>
        </div>

        <div className="animate-bounce-in">
          <Card
            title={t.cards[1].title}
            description={t.cards[1].description}
            icon="⚙️"
          >
            <Link 
              href="/core-principles" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-all hover:scale-105"
            >
              {t.cards[1].link}
            </Link>
          </Card>
        </div>

        <div className="animate-slide-in-right">
          <Card
            title={t.cards[2].title}
            description={t.cards[2].description}
            icon="✅"
          >
            <Link 
              href="/best-practices" 
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-all hover:scale-105"
            >
              {t.cards[2].link}
            </Link>
          </Card>
        </div>
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

