'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReadingProgress from '@/components/ReadingProgress';
import ScrollToTop from '@/components/ScrollToTop';

export default function Feedback() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email body with all form data
    const emailSubject = `Feedback: ${formData.category || 'General'}`;
    const emailBody = `
Name: ${formData.name || 'Anonymous'}
Email: ${formData.email || 'Not provided'}
Category: ${formData.category}

Message:
${formData.message}
    `.trim();
    
    // Open default email client with pre-filled data
    const mailtoLink = `mailto:diego.sucharczuk@cyberark.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
    
    // Show success message
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', category: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const content = {
    en: {
      title: 'Send Us Your Feedback',
      subtitle: 'Help us improve this training resource by sharing your thoughts and suggestions.',
      name: 'Name',
      namePlaceholder: 'Your name (optional)',
      email: 'Email',
      emailPlaceholder: 'Your email (optional)',
      category: 'Category',
      categorySelect: 'Select a category',
      categories: {
        general: 'General Feedback',
        content: 'Content Suggestion',
        bug: 'Bug Report',
        feature: 'Feature Request',
        other: 'Other',
      },
      message: 'Message',
      messagePlaceholder: 'Share your feedback, suggestions, or report issues...',
      submit: 'Send Feedback',
      success: '✓ Thank you for your feedback!',
      tips: {
        title: 'Tips for Good Feedback',
        items: [
          'Be specific about what you liked or what could be improved',
          'Share examples when suggesting content changes',
          'Describe any technical issues in detail',
          'Tell us what training topics you\'d like to see added',
        ],
      },
      note: {
        title: '📧 Where does feedback go?',
        text: 'When you submit feedback, your default email client will open with a pre-filled message to diego.sucharczuk@cyberark.com. Simply click send!',
      },
    },
    he: {
      title: 'שלח לנו משוב',
      subtitle: 'עזור לנו לשפר את משאב ההדרכה הזה על ידי שיתוף המחשבות וההצעות שלך.',
      name: 'שם',
      namePlaceholder: 'השם שלך (אופציונלי)',
      email: 'אימייל',
      emailPlaceholder: 'האימייל שלך (אופציונלי)',
      category: 'קטגוריה',
      categorySelect: 'בחר קטגוריה',
      categories: {
        general: 'משוב כללי',
        content: 'הצעה לתוכן',
        bug: 'דיווח על באג',
        feature: 'בקשת פיצ\'ר',
        other: 'אחר',
      },
      message: 'הודעה',
      messagePlaceholder: 'שתף את המשוב, ההצעות או דווח על בעיות...',
      submit: 'שלח משוב',
      success: '✓ תודה על המשוב שלך!',
      tips: {
        title: 'טיפים למשוב טוב',
        items: [
          'היה ספציפי לגבי מה אהבת או מה ניתן לשפר',
          'שתף דוגמאות כשמציע שינויים בתוכן',
          'תאר כל בעיה טכנית בפירוט',
          'ספר לנו אילו נושאי הדרכה תרצה לראות',
        ],
      },
      note: {
        title: '📧 לאן הולך המשוב?',
        text: 'כשאתה שולח משוב, תוכנת המייל שלך תיפתח עם הודעה מוכנה ל-diego.sucharczuk@cyberark.com. פשוט תלחץ שלח!',
      },
    },
  };

  const t = content[language];

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <ReadingProgress />
      <ScrollToTop />
      <Breadcrumbs />

      <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text animate-scale-in">
        {t.title}
      </h1>
      <p className="text-xl text-gray-600 mb-12 animate-fade-in">
        {t.subtitle}
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8 animate-slide-in-left">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-bounce-in">✓</div>
                <p className="text-2xl text-green-600 font-semibold">{t.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.category}
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    aria-label={t.category}
                  >
                    <option value="">{t.categorySelect}</option>
                    <option value="general">{t.categories.general}</option>
                    <option value="content">{t.categories.content}</option>
                    <option value="bug">{t.categories.bug}</option>
                    <option value="feature">{t.categories.feature}</option>
                    <option value="other">{t.categories.other}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder={t.messagePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    aria-label={t.message}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  aria-label={t.submit}
                >
                  {t.submit}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-md p-6 sticky top-24 animate-slide-in-right mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{t.tips.title}</h3>
            <ul className="space-y-3">
              {t.tips.items.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">💡</span>
                  <span className="text-gray-700 text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg shadow-md p-6 border-2 border-orange-200 animate-fade-in">
            <h3 className="text-lg font-bold text-gray-900 mb-3">{t.note.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{t.note.text}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
