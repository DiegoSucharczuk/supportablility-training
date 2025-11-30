'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function CommunicationGuidePage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState('foundations')

  const content = {
    he: {
      title: "מדריך תקשורת מקצועית",
      subtitle: "עקרונות תקשורת ותפעול מקצועי מול לקוחות",
      tabs: {
        foundations: "יסודות התקשורת",
        techniques: "טכניקות מתקדמות", 
        language: "שפה מקצועית",
        principles: "עקרונות מנחים"
      }
    },
    en: {
      title: "Professional Communication Guide",
      subtitle: "Communication and operational principles for customer-facing teams",
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
      }
    ]
  }

  const currentContent = content[language as keyof typeof content]
  const currentFoundations = foundations[language as keyof typeof foundations]

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

          {/* Other tabs - placeholder for now */}
          {activeTab !== 'foundations' && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {language === 'he' ? 'בקרוב...' : 'Coming soon...'}
              </p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}