'use client';

import { useLanguage } from '@/context/LanguageContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgress from '@/components/ReadingProgress';
import ScrollToTop from '@/components/ScrollToTop';

export default function EscalationResponse() {
  const { language } = useLanguage();

  if (language === 'he') {
    return (
      <main className="container mx-auto px-4 py-12 max-w-4xl" dir="rtl">
        <ReadingProgress />
        <ScrollToTop />
        <Breadcrumbs />
        <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text animate-scale-in">
          איך לכתוב תגובה מקצועית בקייס
        </h1>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 animate-slide-in-left">
          <p className="text-lg text-gray-700">
            מדריך מפורט לכתיבת תגובות ראשונות ועדכונים באסקלציות שמגיעות מ-Support ל-R&D
          </p>
        </div>

        {/* Step 1 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            שלב 1: קריאה והבנת הבעיה
          </h2>
          
          <div className="space-y-4 mb-6">
            <p className="text-gray-700"><strong>1. קרא את התגובה האחרונה</strong></p>
            <p className="text-gray-700 pr-4">התחל עם התגובה האחרונה בקייס כדי להבין את המצב הנוכחי.</p>
            
            <p className="text-gray-700"><strong>2. אם משהו לא ברור</strong></p>
            <p className="text-gray-700 pr-4">קרא את כל ההיסטוריה של הקייס כדי להבין מה נעשה עד כה.</p>
            
            <p className="text-gray-700"><strong>3. בדוק עמידה בדרישות</strong></p>
            <p className="text-gray-700 pr-4">וודא שכל המידע הדרוש קיים לפי התבניות הרשמיות:</p>
          </div>

          <div className="bg-gradient-to-l from-purple-50 to-blue-50 p-6 rounded-lg glow-effect">
            <h3 className="font-semibold text-gray-900 mb-3">📋 קישורים חשובים</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="pr-4">🔗 <a href="https://ca-il-confluence.il.cyber-ark.com/display/GS/General+Escalation+Template" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">General Escalation Template</a></li>
              <li className="pr-4">🔗 <a href="https://ca-il-confluence.il.cyber-ark.com/pages/viewpage.action?pageId=131826411" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Credential Provider Escalation Guidelines</a></li>
              <li className="pr-4">🔗 <a href="https://ca-il-confluence.il.cyber-ark.com/pages/viewpage.action?pageId=324765722" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Elevation to R&D Procedure</a></li>
            </ul>
          </div>

          <div className="bg-red-50 border-r-4 border-red-500 p-6 rounded mt-4">
            <h3 className="font-semibold text-gray-900 mb-2">⚠️ חשוב מאוד</h3>
            <p className="text-gray-700 font-bold">אל תבקש דברים שכבר ביקשו!</p>
            <p className="text-gray-700 pr-4">בדוק את ההיסטוריה לפני שאתה שואל שאלות כדי לא לגרום לתסכול מיותר ללקוח.</p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            שלב 2: אם חסר מידע - החזרה ל-Support
          </h2>
          
          <p className="text-gray-700 mb-4">
            אם אחרי הקריאה אתה מזהה שחסרים פרטים קריטיים, יש להחזיר את הקייס ל-Support עם הסבר מפורט:
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded glow-effect">
            <h3 className="font-semibold text-gray-900 mb-3">✓ דוגמה לתגובה טובה</h3>
            <div className="text-gray-700 space-y-3 pr-4">
              <p className="font-semibold">שלום,</p>
              <p>תודה על האסקלציה. קראתי את הקייס ואני רואה שהלקוח מדווח על שגיאת timeout במהלך אותנטיקציה.</p>
              <p>כדי שנוכל להתחיל לחקור את הבעיה, אנחנו צריכים את המידע הבא:</p>
              <ul className="list-disc pr-8 space-y-1">
                <li><strong>Vault logs</strong> מהזמן המדויק של השגיאה (חשוב כדי לראות מה קורה בצד השרת)</li>
                <li><strong>CPM logs</strong> אם הבעיה קשורה לניהול סיסמאות (כדי לזהות אם יש בעיית תקשורת)</li>
                <li><strong>Network trace</strong> בין הרכיב הנ"ל לבין ה-Vault (כדי לשלול בעיות רשת)</li>
              </ul>
              <p>אתם יכולים למצוא את ההנחיות המלאות לאיסוף לוגים כאן:</p>
              <p>🔗 <a href="https://ca-il-confluence.il.cyber-ark.com/display/GS/General+Escalation+Template" className="text-blue-600 hover:underline">General Escalation Template</a></p>
              <p>נשמח לקבל את המידע ונמשיך בחקירה מיד.</p>
              <p className="font-semibold">תודה רבה,<br/>צוות R&D</p>
            </div>
          </div>

          <div className="bg-red-50 border-r-4 border-red-500 p-6 rounded mt-6">
            <h3 className="font-semibold text-gray-900 mb-3">✗ דוגמה לתגובה גרועה</h3>
            <div className="text-gray-700 space-y-2 pr-4">
              <p>"חסרים לוגים. בבקשה תשלחו."</p>
              <p className="text-sm italic mt-2">❌ למה זה לא טוב:</p>
              <ul className="list-disc pr-8 space-y-1 text-sm">
                <li>לא ברור אילו לוגים</li>
                <li>לא מסביר למה צריך אותם</li>
                <li>לא מכוון את Support איפה למצוא הנחיות</li>
                <li>נראה לא מקצועי ולא מכבד</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            שלב 3: תגובה מלאה כשיש מספיק מידע
          </h2>
          
          <p className="text-gray-700 mb-6">
            אם כל המידע הדרוש קיים, התגובה שלך צריכה לכלול את המרכיבים הבאים:
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🪞 1. שיקוף הבעיה</h3>
              <p className="text-gray-700 mb-3 pr-4">
                תאר במילים שלך מה הבנת שהבעיה היא. זה מאפשר ללקוח לוודא שהבנת נכון, או לתקן אם הבנת משהו אחר.
              </p>
              <div className="bg-blue-50 p-4 rounded">
                <p className="text-gray-700 pr-4">"אם אני מבין נכון, הבעיה היא שכל פעם שהמשתמש מנסה להתחבר דרך PSM, החיבור נכשל אחרי 30 שניות עם שגיאת timeout. זה קורה רק עם חשבונות Windows, ולא עם Unix."</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">❓ 2. שאלות ממוקדות (אם נדרש)</h3>
              <p className="text-gray-700 mb-3 pr-4">
                רק אם חסר משהו שלא נכתב. אל תשאל יותר מדי שאלות, במיוחד אם כבר היו כמה פינג-פונגים. תמיד הסבר למה אתה שואל.
              </p>
              <div className="bg-yellow-50 p-4 rounded">
                <p className="text-gray-700 pr-4">"כדי שנוכל לשחזר את הבעיה במעבדה שלנו, נשמח לדעת:"</p>
                <ul className="list-disc pr-8 mt-2 space-y-1 text-gray-700">
                  <li>האם השגיאה מופיעה עם כל המשתמשים או רק עם משתמש ספציפי?</li>
                  <li>מה גרסת ה-PSM שמותקנת אצלכם?</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">➡️ 3. צעדים הבאים</h3>
              <p className="text-gray-700 mb-3 pr-4">
                הסבר מה אתה הולך לעשות עכשיו. עד 2 צעדים - לא יותר. תהיה ספציפי.
              </p>
              <div className="bg-green-50 p-4 rounded">
                <p className="text-gray-700 pr-4"><strong>הצעדים הבאים שלנו:</strong></p>
                <ol className="list-decimal pr-8 mt-2 space-y-1 text-gray-700">
                  <li>אנחנו נבדוק את הלוגים שצורפו כדי לזהות את מקור ה-timeout</li>
                  <li>ננסה לשחזר את הבעיה במעבדה על סמך ההגדרות שתיארת</li>
                </ol>
                <p className="text-gray-700 mt-3 pr-4">אעדכן אותך תוך 24 שעות עם הממצאים.</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">🙏 4. סגירה מכבדת</h3>
              <p className="text-gray-700 mb-3 pr-4">
                תמיד תסגור בהודיה ובציון מועד לעדכון הבא.
              </p>
              <div className="bg-purple-50 p-4 rounded">
                <p className="text-gray-700 pr-4">"תודה רבה על הסבלנות ועל המידע המפורט. אני כאן אם יש שאלות."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Full Example */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-bounce-in">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            📝 דוגמה לתגובה מלאה ומקצועית
          </h2>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 p-6 rounded glow-effect">
            <div className="text-gray-700 space-y-3 pr-4">
              <p className="font-semibold">שלום,</p>
              
              <p>תודה על האסקלציה. קראתי את הקייס ואת כל ההיסטוריה.</p>
              
              <p><strong>הבנתי שהבעיה היא:</strong><br/>
              כל פעם שמשתמש מנסה להתחבר דרך PSM לחשבון Windows, החיבור נכשל אחרי 30 שניות עם שגיאת timeout. הבעיה לא מתרחשת עם חשבונות Unix, ומופיעה רק בסביבת הפרודקשן ולא בסביבת הטסט.</p>
              
              <p><strong>כדי להמשיך בחקירה, נשמח לדעת:</strong></p>
              <ul className="list-disc pr-8 space-y-1">
                <li>האם השגיאה מופיעה עם כל חשבונות Windows או רק עם חשבון ספציפי? (חשוב כדי להבין אם זה קשור להרשאות של חשבון מסוים)</li>
                <li>מה גרסת PSM המותקנת? (כדי לבדוק אם יש bug ידוע בגרסה זו)</li>
              </ul>
              
              <p><strong>הצעדים הבאים שלנו:</strong></p>
              <ol className="list-decimal pr-8 space-y-1">
                <li>נבדוק את הלוגים שצורפו כדי לזהות את מקור ה-timeout</li>
                <li>ננסה לשחזר את הבעיה במעבדה שלנו על סמך ההגדרות שתיארת</li>
              </ol>
              
              <p>אעדכן אותך תוך 24 שעות עם הממצאים הראשוניים.</p>
              
              <p className="font-semibold">תודה רבה על הסבלנות ועל המידע המפורט.<br/>צוות R&D</p>
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg p-8 animate-pulse-glow">
          <h2 className="text-2xl font-bold mb-4">💡 עקרונות מפתח</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-start">
              <span className="ml-2">✓</span>
              <span>תמיד קרא את התגובה האחרונה קודם, ורק אם צריך - את כל ההיסטוריה</span>
            </li>
            <li className="flex items-start">
              <span className="ml-2">✓</span>
              <span>אל תבקש דברים שכבר ביקשו - בדוק את ההיסטוריה</span>
            </li>
            <li className="flex items-start">
              <span className="ml-2">✓</span>
              <span>שקף את הבעיה במילים שלך - תן ללקוח לוודא שהבנת</span>
            </li>
            <li className="flex items-start">
              <span className="ml-2">✓</span>
              <span>הסבר למה אתה שואל כל שאלה</span>
            </li>
            <li className="flex items-start">
              <span className="ml-2">✓</span>
              <span>ציין צעדים הבאים ברורים (עד 2)</span>
            </li>
            <li className="flex items-start">
              <span className="ml-2">✓</span>
              <span>תמיד סגור בהודיה ו-ETA לעדכון הבא</span>
            </li>
          </ul>
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
        How to Write Professional Case Responses
      </h1>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 animate-slide-in-left">
        <p className="text-lg text-gray-700">
          A comprehensive guide for writing first responses and updates for escalations from Support to R&D
        </p>
      </div>

      {/* Step 1 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-fade-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Step 1: Reading and Understanding the Issue
        </h2>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-700"><strong>1. Read the latest comment</strong></p>
          <p className="text-gray-700 pl-4">Start with the most recent comment to understand the current situation.</p>
          
          <p className="text-gray-700"><strong>2. If something is unclear</strong></p>
          <p className="text-gray-700 pl-4">Read the entire case history to understand what has been done so far.</p>
          
          <p className="text-gray-700"><strong>3. Verify requirements compliance</strong></p>
          <p className="text-gray-700 pl-4">Ensure all necessary information is present according to official templates:</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg glow-effect">
          <h3 className="font-semibold text-gray-900 mb-3">📋 Important Links</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="pl-4">🔗 <a href="https://ca-il-confluence.il.cyber-ark.com/display/GS/General+Escalation+Template" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">General Escalation Template</a></li>
            <li className="pl-4">🔗 <a href="https://ca-il-confluence.il.cyber-ark.com/pages/viewpage.action?pageId=131826411" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Credential Provider Escalation Guidelines</a></li>
            <li className="pl-4">🔗 <a href="https://ca-il-confluence.il.cyber-ark.com/pages/viewpage.action?pageId=324765722" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Elevation to R&D Procedure</a></li>
          </ul>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mt-4">
          <h3 className="font-semibold text-gray-900 mb-2">⚠️ Critical</h3>
          <p className="text-gray-700 font-bold">Never request information that was already asked for!</p>
          <p className="text-gray-700 pl-4">Check the history before asking questions to avoid unnecessary customer frustration.</p>
        </div>
      </section>

      {/* Step 2 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-left">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Step 2: If Information is Missing - Return to Support
        </h2>
        
        <p className="text-gray-700 mb-4">
          If you identify missing critical details after reading, return the case to Support with a detailed explanation:
        </p>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded glow-effect">
          <h3 className="font-semibold text-gray-900 mb-3">✓ Good Response Example</h3>
          <div className="text-gray-700 space-y-3 pl-4">
            <p className="font-semibold">Hello,</p>
            <p>Thank you for the escalation. I've reviewed the case and see that the customer is reporting a timeout error during authentication.</p>
            <p>To begin investigating this issue, we need the following information:</p>
            <ul className="list-disc pl-8 space-y-1">
              <li><strong>Vault logs</strong> from the exact time of the error (important to see what's happening on the server side)</li>
              <li><strong>CPM logs</strong> if the issue is related to password management (to identify communication issues)</li>
              <li><strong>Network trace</strong> between the component and the Vault (to rule out network problems)</li>
            </ul>
            <p>You can find complete log collection guidelines here:</p>
            <p>🔗 <a href="https://ca-il-confluence.il.cyber-ark.com/display/GS/General+Escalation+Template" className="text-blue-600 hover:underline">General Escalation Template</a></p>
            <p>We'll continue the investigation as soon as we receive this information.</p>
            <p className="font-semibold">Thank you,<br/>R&D Team</p>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">✗ Bad Response Example</h3>
          <div className="text-gray-700 space-y-2 pl-4">
            <p>"Missing logs. Please send."</p>
            <p className="text-sm italic mt-2">❌ Why this is bad:</p>
            <ul className="list-disc pl-8 space-y-1 text-sm">
              <li>Doesn't specify which logs</li>
              <li>Doesn't explain why they're needed</li>
              <li>Doesn't guide Support to guidelines</li>
              <li>Appears unprofessional and disrespectful</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Step 3 */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-slide-in-right">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Step 3: Complete Response When Information is Sufficient
        </h2>
        
        <p className="text-gray-700 mb-6">
          When all required information is available, your response should include these components:
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">🪞 1. Reflect the Problem</h3>
            <p className="text-gray-700 mb-3 pl-4">
              Describe in your own words what you understand the problem to be. This allows the customer to verify you understood correctly or correct any misunderstanding.
            </p>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-gray-700 pl-4">"If I understand correctly, the issue is that whenever a user tries to connect through PSM, the connection fails after 30 seconds with a timeout error. This only occurs with Windows accounts, not with Unix."</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">❓ 2. Focused Questions (if needed)</h3>
            <p className="text-gray-700 mb-3 pl-4">
              Only if something wasn't mentioned. Don't ask too many questions, especially if there were already multiple back-and-forths. Always explain why you're asking.
            </p>
            <div className="bg-yellow-50 p-4 rounded">
              <p className="text-gray-700 pl-4">"To help us reproduce the issue in our lab, we'd like to know:"</p>
              <ul className="list-disc pl-8 mt-2 space-y-1 text-gray-700">
                <li>Does the error occur with all users or just a specific one?</li>
                <li>What PSM version is installed in your environment?</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">➡️ 3. Next Steps</h3>
            <p className="text-gray-700 mb-3 pl-4">
              Explain what you're going to do now. Up to 2 steps - no more. Be specific.
            </p>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-gray-700 pl-4"><strong>Our next steps:</strong></p>
              <ol className="list-decimal pl-8 mt-2 space-y-1 text-gray-700">
                <li>We'll review the attached logs to identify the source of the timeout</li>
                <li>We'll attempt to reproduce the issue in our lab based on the configuration you described</li>
              </ol>
              <p className="text-gray-700 mt-3 pl-4">I'll update you within 24 hours with our findings.</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">🙏 4. Respectful Closing</h3>
            <p className="text-gray-700 mb-3 pl-4">
              Always close with gratitude and a timeline for the next update.
            </p>
            <div className="bg-purple-50 p-4 rounded">
              <p className="text-gray-700 pl-4">"Thank you for your patience and the detailed information. I'm here if you have any questions."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Example */}
      <section className="bg-white rounded-lg shadow-md p-8 mb-8 card-hover animate-bounce-in">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          📝 Complete Professional Response Example
        </h2>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 p-6 rounded glow-effect">
          <div className="text-gray-700 space-y-3 pl-4">
            <p className="font-semibold">Hello,</p>
            
            <p>Thank you for the escalation. I've reviewed the case and all its history.</p>
            
            <p><strong>I understand the issue is:</strong><br/>
            Whenever a user tries to connect through PSM to a Windows account, the connection fails after 30 seconds with a timeout error. The issue doesn't occur with Unix accounts and only appears in the production environment, not in test.</p>
            
            <p><strong>To continue the investigation, we'd like to know:</strong></p>
            <ul className="list-disc pl-8 space-y-1">
              <li>Does the error occur with all Windows accounts or just a specific one? (Important to understand if it's related to specific account permissions)</li>
              <li>What PSM version is installed? (To check for known bugs in this version)</li>
            </ul>
            
            <p><strong>Our next steps:</strong></p>
            <ol className="list-decimal pl-8 space-y-1">
              <li>We'll review the attached logs to identify the source of the timeout</li>
              <li>We'll attempt to reproduce the issue in our lab based on the configuration you described</li>
            </ol>
            
            <p>I'll update you within 24 hours with initial findings.</p>
            
            <p className="font-semibold">Thank you for your patience and the detailed information.<br/>R&D Team</p>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-lg p-8 animate-pulse-glow">
        <h2 className="text-2xl font-bold mb-4">💡 Key Principles</h2>
        <ul className="space-y-3 text-lg">
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Always read the latest comment first, only read full history if needed</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Never request information that was already asked for - check the history</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Reflect the problem in your own words - let the customer verify your understanding</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Explain why you're asking each question</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>State clear next steps (up to 2)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Always close with gratitude and ETA for next update</span>
          </li>
        </ul>
      </section>
    </main>
  );
}
