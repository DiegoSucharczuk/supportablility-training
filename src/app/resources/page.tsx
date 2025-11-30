'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Resources() {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'External Resources & Learning Materials',
      subtitle: 'Additional documentation, videos, and tools to enhance your professional communication skills',
      
      video: {
        title: '🎥 Training Video',
        items: [
          {
            title: 'The Art of Customer Communications',
            description: 'A comprehensive video guide covering professional communication principles and real-world examples.',
            link: 'https://cyberark365-my.sharepoint.com/personal/diego_sucharczuk_cyberark_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fdiego%5Fsucharczuk%5Fcyberark%5Fcom%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FThe%5FArt%5Fof%5FCustomer%5FComms%201%2Emp4',
            type: 'video'
          }
        ]
      },

      confluence: {
        title: '📖 Confluence Documentation',
        items: [
          {
            title: 'R&D Escalation Troubleshooting Methodology',
            description: 'Step-by-step methodology for troubleshooting and escalating complex issues to R&D teams.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/CP/pages/591627528/R+D+Escalation+Troubleshooting+Methodology',
          },
          {
            title: 'Elevation to R&D Procedure',
            description: 'Guidelines for enterprise support engineers on elevating issues to R&D following the specialization process.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/GS/pages/324765722/Elevation+to+R+D+procedure',
          },
          {
            title: 'R&D Case Handling',
            description: 'Best practices and procedures for handling cases that require R&D involvement.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/GS/pages/374906398/R+D+Case+Handling',
          },
          {
            title: 'Work Process with Support',
            description: 'Detailed workflow and collaboration guidelines between support and R&D teams.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/CP/pages/391024566/Work+process+with+the+support',
          },
          {
            title: 'Required Information for R&D Escalation',
            description: 'Complete checklist of information needed when escalating issues to R&D for faster resolution.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/GS/pages/127729995/Required+Information+for+R+D+Escalation',
          },
          {
            title: 'CP FireFighter',
            description: 'Emergency procedures and rapid response guidelines for critical customer situations.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/CP/pages/571177797/CP+FireFighter',
          },
        ]
      },

      tools: {
        title: '🛠️ Useful Tools',
        items: [
          {
            title: 'CyberArk Support Portal',
            description: 'Access customer cases, knowledge base articles, and product documentation.',
            link: '#',
            disabled: true
          },
          {
            title: 'Internal Knowledge Base',
            description: 'Search for solutions, troubleshooting guides, and technical articles.',
            link: '#',
            disabled: true
          }
        ]
      }
    },

    he: {
      title: 'משאבים חיצוניים וחומרי למידה',
      subtitle: 'תיעוד נוסף, סרטונים וכלים לשיפור כישורי התקשורת המקצועית שלך',
      
      video: {
        title: '🎥 סרטון הדרכה',
        items: [
          {
            title: 'אמנות התקשורת מול לקוחות',
            description: 'מדריך וידאו מקיף המכסה עקרונות תקשורת מקצועית ודוגמאות מהעולם האמיתי.',
            link: 'https://cyberark365-my.sharepoint.com/personal/diego_sucharczuk_cyberark_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fdiego%5Fsucharczuk%5Fcyberark%5Fcom%2FDocuments%2FMicrosoft%20Teams%20Chat%20Files%2FThe%5FArt%5Fof%5FCustomer%5FComms%201%2Emp4',
            type: 'video'
          }
        ]
      },

      confluence: {
        title: '📖 תיעוד בקונפלואנס',
        items: [
          {
            title: 'מתודולוגיית אבחון והסלמה ל-R&D',
            description: 'מתודולוגיה שלב אחר שלב לאבחון והסלמת בעיות מורכבות לצוותי המו"פ.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/CP/pages/591627528/R+D+Escalation+Troubleshooting+Methodology',
          },
          {
            title: 'נוהל העלאה ל-R&D',
            description: 'הנחיות למהנדסי תמיכה ארגונית להעלאת בעיות ל-R&D בעקבות תהליך ההתמחות.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/GS/pages/324765722/Elevation+to+R+D+procedure',
          },
          {
            title: 'טיפול בקייסים של R&D',
            description: 'שיטות עבודה מומלצות ונהלים לטיפול בקייסים הדורשים מעורבות R&D.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/GS/pages/374906398/R+D+Case+Handling',
          },
          {
            title: 'תהליך עבודה עם התמיכה',
            description: 'זרימת עבודה מפורטת והנחיות שיתוף פעולה בין צוותי התמיכה וה-R&D.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/CP/pages/391024566/Work+process+with+the+support',
          },
          {
            title: 'מידע נדרש להסלמה ל-R&D',
            description: 'רשימת בדיקה מלאה של המידע הנדרש בעת העלאת בעיות ל-R&D לפתרון מהיר יותר.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/GS/pages/127729995/Required+Information+for+R+D+Escalation',
          },
          {
            title: 'CP FireFighter',
            description: 'נהלי חירום והנחיות תגובה מהירה למצבי לקוח קריטיים.',
            link: 'https://ca-il-confluence.il.cyber-ark.com/spaces/CP/pages/571177797/CP+FireFighter',
          },
        ]
      },

      tools: {
        title: '🛠️ כלים שימושיים',
        items: [
          {
            title: 'פורטל התמיכה של CyberArk',
            description: 'גישה לקייסים של לקוחות, מאמרי בסיס ידע ותיעוד מוצר.',
            link: '#',
            disabled: true
          },
          {
            title: 'בסיס הידע הפנימי',
            description: 'חיפוש אחר פתרונות, מדריכי פתרון בעיות ומאמרים טכניים.',
            link: '#',
            disabled: true
          }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-scale-in">
        {t.title}
      </h1>
      <p className="text-xl text-gray-600 mb-12 animate-slide-up">
        {t.subtitle}
      </p>

      {/* Video Section */}
      <section className="mb-12 animate-slide-in-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="floating">{t.video.title.split(' ')[0]}</span>
          {t.video.title.substring(3)}
        </h2>
        <div className="grid gap-6">
          {t.video.items.map((item, idx) => (
            <div key={idx} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 shadow-md hover:shadow-xl transition-all card-hover border-l-4 border-red-500">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 mb-4">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all font-semibold hover:scale-105 transform"
                  >
                    <span>▶</span>
                    {language === 'he' ? 'צפה בסרטון' : 'Watch Video'}
                  </a>
                </div>
                <div className="text-6xl">🎬</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Confluence Documentation Section */}
      <section className="mb-12 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="floating">{t.confluence.title.split(' ')[0]}</span>
          {t.confluence.title.substring(3)}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {t.confluence.items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all card-hover border-l-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-600 mb-3">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-all hover:scale-105 transform"
              >
                {language === 'he' ? 'קרא עוד ←' : 'Read More →'}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Section */}
      <section className="mb-12 animate-slide-in-right">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="floating">{t.tools.title.split(' ')[0]}</span>
          {t.tools.title.substring(3)}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {t.tools.items.map((item, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 shadow-md transition-all border-l-4 border-purple-500 ${item.disabled ? 'opacity-60' : 'hover:shadow-xl card-hover'}`}>
              <h3 className="text-xl font-bold text-purple-600 mb-3">{item.title}</h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              {item.disabled && (
                <span className="inline-block text-sm text-gray-500 italic">
                  {language === 'he' ? '(יתווסף בעתיד)' : '(Coming soon)'}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-600 p-6 rounded-lg animate-bounce-in">
        <p className="text-gray-700">
          <strong>{language === 'he' ? '💡 טיפ:' : '💡 Tip:'}</strong>{' '}
          {language === 'he' 
            ? 'שמור את הקישורים האלה במועדפים שלך לגישה מהירה. המשאבים האלה מעודכנים באופן קבוע עם מידע חדש ושיטות עבודה מומלצות.'
            : 'Bookmark these links for quick access. These resources are regularly updated with new information and best practices.'
          }
        </p>
      </div>
    </main>
  );
}
