'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function CommunicationGuidePage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('foundations')

  const content = {
    he: {
      title: "מדריך מקוצר לתקשורת מקצועית",
      subtitle: "תמצית מהירה של עקרונות ודוגמאות לתקשורת יומיומית",
      tabs: {
        foundations: "יסודות התקשורת",
        techniques: "טכניקות מתקדמות", 
        language: "שפה מקצועית",
        principles: "עקרונות מנחים"
      }
    },
    en: {
      title: "Quick Communication Guide",
      subtitle: "Fast reference for daily communication principles and examples",
      tabs: {
        foundations: "Communication Foundations",
        techniques: "Advanced Techniques",
        language: "Professional Language", 
        principles: "Guiding Principles"
      }
    }
  }

  const foundations = {
    he: [
      {
        id: 1,
        title: "בניית אמון עם הלקוח",
        points: [
          "היו עקביים, שקופים ואמינים",
          "אל תבטיחו מה שלא תוכלו לקיים",
          "השתמשו בשפה מקצועית, סבלנית ומכבדת -- גם כשיש לחץ",
          "שתפו בתהליך, גם אם אין תשובות עדיין"
        ],
        examples: [
          "אני רוצה להבין את הבעיה לעומק כדי שנוכל לפתור אותה יחד",
          "אני כאן איתך עד שנסיים לטפל בזה",
          "כרגע אני בודק את הלוגים, ייתכן שאצטרך עזרה מצוות נוסף -- אעדכן אותך כשיהיה חדש"
        ]
      },
      {
        id: 2,
        title: "כשאין תשובה -- איך מגיבים?",
        subtitle: "לעולם לא לומר \"אני לא יודע\" בלי המשך ברור",
        examples: [
          "שאלה מצוינת -- אני בודק וחוזר עם תשובה מדויקת",
          "זה תלוי בכמה פרמטרים, חשוב לי לוודא לפני שאשיב",
          "יש כמה אפשרויות -- אני בודק מה רלוונטי כאן"
        ]
      },
      {
        id: 3,
        title: "אחריות משותפת לבעיה",
        subtitle: "הימנע ממשפטים מאשימים כמו \"יש לכם תקלה\"",
        examples: [
          "אנחנו רואים התנהגות חריגה...",
          "בוא נבדוק את זה יחד...",
          "נראה שיש משהו שדורש בדיקה משותפת"
        ]
      },
      {
        id: 4,
        title: "Small Talk - ושבירת קרח",
        subtitle: "מתאים בעיקר בשיחה ראשונית או במצבים נינוחים",
        examples: [
          "איך עובר היום שלך?",
          "עובד מהבית או מהמשרד?",
          "מקווה שהשאר עובד חלק -- חוץ מהעניין הזה :)"
        ]
      },
      {
        id: 5,
        title: "הקשבה פעילה",
        points: [
          "תנו ללקוח לדבר -- אל תקטעו",
          "חזרו על דבריו במילים שלכם",
          "שאלו שאלות שמחדדות"
        ],
        examples: [
          "אם אני מבין נכון, אתה אומר ש...",
          "אז בעצם כל פעם שאתה לוחץ על X -- קורה Y?"
        ]
      },
      {
        id: 6,
        title: "לשאול שאלות בשלבים מוקדמים",
        subtitle: "חסכו זמן ע\"י איסוף מידע בהתחלה",
        examples: [
          "מתי התחילה הבעיה?",
          "האם נעשו שינויים לאחרונה?",
          "האם זה קרה בעבר?"
        ]
      },
      {
        id: 7,
        title: "להראות הבנה ולקחת אחריות",
        subtitle: "אשרו את הבעיה והסבירו על תוכנית הפעולה",
        examples: [
          "זה נראה כמו XYZ, אני בודק את זה כעת",
          "השלבים הבאים: קודם כל X, אח\"כ Y...",
          "אעדכן גם אם לא תהיה התקדמות -- עד שנסגור"
        ]
      },
      {
        id: 8,
        title: "תחושת דחיפות (Sense of Urgency)",
        subtitle: "חשוב לשדר מחויבות גם אם התקלה לא קריטית",
        examples: [
          "מבין שזה משפיע עליך -- זה בתעדוף",
          "אני בודק את זה עכשיו",
          "ברגע שיהיה חדש -- תדע מזה"
        ]
      }
    ],
    en: [
      {
        id: 1,
        title: "Building Trust with Customers",
        points: [
          "Be consistent, transparent, and reliable",
          "Don't promise what you can't deliver",
          "Use professional, patient, and respectful language -- even under pressure",
          "Share the process, even if there are no answers yet"
        ],
        examples: [
          "I want to understand the issue thoroughly so we can solve it together",
          "I'm here with you until we finish handling this",
          "Currently checking the logs, might need help from additional team -- will update you when there's news"
        ]
      },
      {
        id: 2,
        title: "When You Don't Have an Answer -- How to Respond?",
        subtitle: "Never say \"I don't know\" without a clear follow-up",
        examples: [
          "Great question -- let me check and get back with an accurate answer",
          "It depends on several parameters, important for me to verify before responding",
          "There are several possibilities -- let me check what's relevant here"
        ]
      },
      {
        id: 3,
        title: "Shared Responsibility for the Problem",
        subtitle: "Avoid accusatory statements like \"you have an issue\"",
        examples: [
          "We're seeing unusual behavior...",
          "Let's check this together...",
          "Seems like there's something that requires joint investigation"
        ]
      },
      {
        id: 4,
        title: "Small Talk - Breaking the Ice",
        subtitle: "Mainly appropriate in initial conversations or relaxed situations",
        examples: [
          "How's your day going?",
          "Working from home or the office?",
          "Hope everything else is running smoothly -- except this issue :)"
        ]
      },
      {
        id: 5,
        title: "Active Listening",
        points: [
          "Let the customer speak -- don't interrupt",
          "Repeat their words back in your own words",
          "Ask clarifying questions"
        ],
        examples: [
          "If I understand correctly, you're saying that...",
          "So basically every time you click X -- Y happens?"
        ]
      },
      {
        id: 6,
        title: "Ask Questions Early",
        subtitle: "Save time by gathering information at the beginning",
        examples: [
          "When did the problem start?",
          "Were any changes made recently?",
          "Has this happened before?"
        ]
      },
      {
        id: 7,
        title: "Show Understanding and Take Ownership",
        subtitle: "Acknowledge the problem and explain the action plan",
        examples: [
          "This looks like XYZ, I'm checking it now",
          "Next steps: first X, then Y...",
          "I'll update even if there's no progress -- until we close this"
        ]
      },
      {
        id: 8,
        title: "Sense of Urgency",
        subtitle: "Important to convey commitment even if the issue isn't critical",
        examples: [
          "I understand this is affecting you -- it's prioritized",
          "I'm checking this right now",
          "The moment there's news -- you'll know"
        ]
      }
    ]
  }

  const techniques = {
    he: [
      {
        id: 9,
        title: "עדכונים פרואקטיביים",
        subtitle: "אל תתנו ללקוח לרדוף אחריכם",
        examples: [
          "עדכון ביניים -- עדיין בבדיקה. נעדכן שוב תוך שעה",
          "כרגע מול Tier 3, אעדכן ברגע שנקבל תשובה"
        ]
      },
      {
        id: 10,
        title: "כבוד והכרת תודה",
        subtitle: "תמיד לשמור על כבוד הדדי",
        examples: [
          "תודה על הסבלנות",
          "ההסבר שלך עזר לי להבין",
          "אני מעריך את שיתוף הפעולה שלך"
        ]
      },
      {
        id: 11,
        title: "סגירת השיחה",
        subtitle: "ודאו שהכל סגור וברור ללקוח",
        examples: [
          "האם הכל עובד כמו שצריך עכשיו?",
          "יש משהו נוסף שאוכל לעזור בו?",
          "תודה שהקדשת זמן -- מעריך את זה"
        ]
      },
      {
        id: 12,
        title: "גמישות מחשבתית והתאמה ללקוח",
        subtitle: "כל לקוח הוא עולם בפני עצמו",
        examples: [
          "לקוח תכני - יותר פורמלי",
          "לקוח צעיר - יותר נוח ופתוח",
          "לקוח לחוץ - ישירות ומהירות"
        ]
      }
    ],
    en: [
      {
        id: 9,
        title: "Proactive Updates",
        subtitle: "Don't let the customer chase you",
        examples: [
          "Interim update -- still investigating. Will update again within an hour",
          "Currently with Tier 3, will update the moment we get a response"
        ]
      },
      {
        id: 10,
        title: "Respect and Gratitude",
        subtitle: "Always maintain mutual respect",
        examples: [
          "Thank you for your patience",
          "Your explanation helped me understand",
          "I appreciate your cooperation"
        ]
      },
      {
        id: 11,
        title: "Closing the Conversation",
        subtitle: "Ensure everything is closed and clear to the customer",
        examples: [
          "Is everything working as it should now?",
          "Is there anything else I can help with?",
          "Thank you for taking the time -- I appreciate it"
        ]
      },
      {
        id: 12,
        title: "Mental Flexibility and Customer Adaptation",
        subtitle: "Every customer is a world of their own",
        examples: [
          "Enterprise client - more formal",
          "Young client - more casual and open",
          "Stressed client - direct and fast"
        ]
      }
    ]
  }

  const languageGuide = {
    he: {
      principles: [
        { title: "פשטות", description: "השתמש במילים פשוטות וברורות" },
        { title: "חיוביות", description: "התמקד בפתרונות, לא בבעיות" },
        { title: "בהירות", description: "אל תשאיר מקום לפרשנויות" }
      ],
      do: [
        "אני בודק את זה כעת",
        "בוא נפתור את זה יחד",
        "אני כאן לעזור",
        "תן לי רגע לבדוק",
        "אני מבין את הקושי"
      ],
      dont: [
        "אני לא יודע",
        "זה לא באחריותי",
        "יש לכם בעיה",
        "זה לא אמור לקרות",
        "זה מסובך"
      ]
    },
    en: {
      principles: [
        { title: "Simplicity", description: "Use simple and clear words" },
        { title: "Positivity", description: "Focus on solutions, not problems" },
        { title: "Clarity", description: "Don't leave room for interpretation" }
      ],
      do: [
        "I'm checking this now",
        "Let's solve this together",
        "I'm here to help",
        "Give me a moment to check",
        "I understand the difficulty"
      ],
      dont: [
        "I don't know",
        "That's not my responsibility",
        "You have a problem",
        "This shouldn't happen",
        "It's complicated"
      ]
    }
  }

  const guidingPrinciples = {
    he: [
      {
        icon: "★",
        title: "האדם קודם לטכנולוגיה",
        description: "זכור שמאחורי כל כרטיס יש אדם עם יום עבודה, לחצים ותחושות."
      },
      {
        icon: "★",
        title: "אמפתיה אמיתית",
        description: "תמיד נסה לראות את המצב מנקודת המבט של הלקוח."
      },
      {
        icon: "★",
        title: "תקשורת שקופה",
        description: "עדיף להגיד \"אני לא יודע אבל אברר\" מאשר להמציא תשובות."
      },
      {
        icon: "★",
        title: "מחויבות מלאה",
        description: "אל תעזוב אף לקוח באמצע. עד שהבעיה נפתרת - אתה שותף."
      }
    ],
    en: [
      {
        icon: "★",
        title: "People Before Technology",
        description: "Remember that behind every ticket is a person with a workday, pressures, and feelings."
      },
      {
        icon: "★",
        title: "Genuine Empathy",
        description: "Always try to see the situation from the customer's perspective."
      },
      {
        icon: "★",
        title: "Transparent Communication",
        description: "Better to say \"I don't know but I'll find out\" than to make up answers."
      },
      {
        icon: "★",
        title: "Complete Commitment",
        description: "Never leave a customer hanging. Until the problem is solved - you're a partner."
      }
    ]
  }

  const currentContent = content[language as keyof typeof content]
  const currentFoundations = foundations[language as keyof typeof foundations]
  const currentTechniques = techniques[language as keyof typeof techniques]
  const currentLanguageGuide = languageGuide[language as keyof typeof languageGuide]
  const currentPrinciples = guidingPrinciples[language as keyof typeof guidingPrinciples]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 p-4" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-2xl p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            {currentContent.title}
          </h1>
          <p className="text-xl opacity-90">
            {currentContent.subtitle}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b">
            {Object.entries(currentContent.tabs).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-4 text-lg font-semibold transition-all ${
                  activeTab === key
                    ? 'bg-white text-slate-700 border-b-3 border-blue-500'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Foundations Tab */}
          {activeTab === 'foundations' && (
            <div>
              <div className="grid gap-6 md:grid-cols-2">
                {currentFoundations.map((principle) => (
                  <div key={principle.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-r-4 border-r-blue-500">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        {principle.id}
                      </div>
                      <h3 className="text-xl font-bold text-slate-700">{principle.title}</h3>
                    </div>
                    
                    {principle.subtitle && (
                      <p className="text-slate-600 mb-3 font-semibold">{principle.subtitle}</p>
                    )}
                    
                    {principle.points && (
                      <ul className="space-y-2 mb-4">
                        {principle.points.map((point, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="text-slate-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">💬</span>
                        <span className="font-bold text-green-700">
                          {language === 'he' ? 'דוגמאות' : 'Examples'}
                        </span>
                      </div>
                      {principle.examples.map((example, index) => (
                        <p key={index} className="text-slate-700 mb-1">"{example}"</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <strong className="text-yellow-700">💡 {language === 'he' ? 'זכור' : 'Remember'}:</strong>
                <span className="text-slate-700">
                  {language === 'he' 
                    ? ' אנחנו לא מספקים רק תשובות -- אנחנו מייצרים חוויה. הרבה פעמים הלקוח לא יזכור את פרטי הפתרון -- הוא יזכור איך גרמת לו להרגיש.'
                    : ' We don\'t just provide answers -- we create experiences. Often the customer won\'t remember the solution details -- they\'ll remember how you made them feel.'
                  }
                </span>
              </div>
            </div>
          )}

          {/* Techniques Tab */}
          {activeTab === 'techniques' && (
            <div className="grid gap-6 md:grid-cols-2">
              {currentTechniques.map((technique) => (
                <div key={technique.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-r-4 border-r-purple-500">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                      {technique.id}
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">{technique.title}</h3>
                  </div>
                  
                  {technique.subtitle && (
                    <p className="text-slate-600 mb-3 font-semibold">{technique.subtitle}</p>
                  )}
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">💬</span>
                      <span className="font-bold text-blue-700">
                        {language === 'he' ? 'דוגמאות' : 'Examples'}
                      </span>
                    </div>
                    {technique.examples.map((example, index) => (
                      <p key={index} className="text-slate-700 mb-1">"{example}"</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Language Tab */}
          {activeTab === 'language' && (
            <div>
              <div className="bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-2xl p-6 mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  🎯 {language === 'he' ? 'עקרונות שפה מקצועית' : 'Professional Language Principles'}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {currentLanguageGuide.principles.map((principle, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <strong className="block mb-2">{principle.title}</strong>
                      <p className="text-sm opacity-90">{principle.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-green-700 mb-4">
                    ✅ {language === 'he' ? 'כדאי לומר' : 'Good to say'}
                  </h4>
                  {currentLanguageGuide.do.map((phrase, index) => (
                    <p key={index} className="text-slate-700 mb-2">"{phrase}"</p>
                  ))}
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-red-700 mb-4">
                    ❌ {language === 'he' ? 'עדיף להימנע' : 'Better to avoid'}
                  </h4>
                  {currentLanguageGuide.dont.map((phrase, index) => (
                    <p key={index} className="text-slate-700 mb-2">"{phrase}"</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Principles Tab */}
          {activeTab === 'principles' && (
            <div className="grid gap-6 md:grid-cols-2">
              {currentPrinciples.map((principle, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-xl">
                      {principle.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">{principle.title}</h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}