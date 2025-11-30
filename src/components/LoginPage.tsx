'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { language, setLanguage } = useLanguage();

  const content = {
    en: {
      title: 'Supportability Training',
      subtitle: 'Professional Support Training',
      loginTitle: 'Login',
      username: 'Username',
      password: 'Password',
      usernamePlaceholder: 'Enter username',
      passwordPlaceholder: 'Enter password',
      loginButton: 'Sign In',
      error: 'Invalid username or password',
      info: 'Please contact system administrator for access',
      footer: 'CyberArk Internal Training Portal'
    },
    he: {
      title: 'Supportability Training',
      subtitle: 'אימון תמיכה מקצועית',
      loginTitle: 'התחברות',
      username: 'שם משתמש',
      password: 'סיסמה',
      usernamePlaceholder: 'הכנס שם משתמש',
      passwordPlaceholder: 'הכנס סיסמה',
      loginButton: 'כניסה למערכת',
      error: 'שם משתמש או סיסמה שגויים',
      info: 'נא לפנות למנהל המערכת לקבלת גישה',
      footer: 'CyberArk Internal Training Portal'
    }
  };

  const t = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(username, password);
    if (!success) {
      setError(t.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 px-4" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300 font-semibold text-white hover:scale-110 shadow-lg border border-white/30"
          >
            {language === 'en' ? '🇮🇱 עברית' : '🇺🇸 English'}
          </button>
        </div>

        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🔐 {t.title}
          </h1>
          <p className="text-white/80 text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t.loginTitle}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.username}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t.usernamePlaceholder}
                required
                dir="ltr"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.password}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder={t.passwordPlaceholder}
                required
                dir="ltr"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              {t.loginButton}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>{t.info}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/70 text-sm">
          <p>{t.footer}</p>
        </div>
      </div>
    </div>
  );
}
