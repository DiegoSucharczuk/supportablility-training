'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useLanguage } from '@/context/LanguageContext';

export default function SettingsPage() {
  const { settings, updateSettings, clearSettings, connectionStatus, testConnection } = useSettings();
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    userName: '',
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
    region: 'us-east-1',
    googleApiKey: '',
  });

  const [showSecrets, setShowSecrets] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (settings) {
      setFormData({
        userName: settings.userName || '',
        accessKeyId: settings.awsCredentials?.accessKeyId || '',
        secretAccessKey: settings.awsCredentials?.secretAccessKey || '',
        sessionToken: settings.awsCredentials?.sessionToken || '',
        region: settings.awsCredentials?.region || 'us-east-1',
        googleApiKey: settings.googleApiKey || '',
      });
    }
  }, [settings]);

  const handleSave = () => {
    updateSettings({
      userName: formData.userName,
      awsCredentials: {
        accessKeyId: formData.accessKeyId,
        secretAccessKey: formData.secretAccessKey,
        sessionToken: formData.sessionToken || undefined,
        region: formData.region,
      },
      googleApiKey: formData.googleApiKey,
    });
    setTestResult({ success: true, message: language === 'en' ? 'Settings saved successfully!' : 'ההגדרות נשמרו בהצלחה!' });
    setTimeout(() => setTestResult(null), 3000);
  };

  const handleTest = async () => {
    const success = await testConnection();
    setTestResult({
      success,
      message: success
        ? language === 'en' 
          ? '✅ Connection successful!' 
          : '✅ החיבור הצליח!'
        : language === 'en'
          ? '❌ Connection failed. Please check your credentials.'
          : '❌ החיבור נכשל. אנא בדוק את פרטי החיבור.',
    });
  };

  const handleClear = () => {
    if (confirm(language === 'en' ? 'Clear all settings?' : 'למחוק את כל ההגדרות?')) {
      clearSettings();
      setFormData({
        userName: '',
        accessKeyId: '',
        secretAccessKey: '',
        sessionToken: '',
        region: 'us-east-1',
        googleApiKey: '',
      });
      setTestResult({ success: true, message: language === 'en' ? 'Settings cleared' : 'ההגדרות נמחקו' });
    }
  };

  const content = {
    en: {
      title: 'Settings',
      subtitle: 'Configure your AWS and Google AI credentials',
      userSection: 'User Information',
      userName: 'Your Name',
      userNamePlaceholder: 'Enter your name (optional)',
      awsSection: 'AWS Bedrock Configuration',
      awsAccessKey: 'AWS Access Key ID',
      awsSecret: 'AWS Secret Access Key',
      awsSession: 'AWS Session Token (Optional)',
      awsRegion: 'AWS Region',
      googleSection: 'Google AI Configuration',
      googleKey: 'Google AI API Key',
      googlePlaceholder: 'Enter your Google AI API key for technical search',
      showHide: 'Show/Hide',
      saveButton: 'Save Settings',
      testButton: 'Test Connection',
      clearButton: 'Clear All Settings',
      status: 'Connection Status',
      connected: 'Connected',
      disconnected: 'Not Connected',
      testing: 'Testing...',
      note: 'Note: All credentials are stored locally in your browser and never sent to any server except AWS/Google APIs.',
      security: '🔒 Your credentials are stored securely in your browser\'s localStorage.',
    },
    he: {
      title: 'הגדרות',
      subtitle: 'הגדר את פרטי החיבור ל-AWS ו-Google AI',
      userSection: 'מידע משתמש',
      userName: 'שמך',
      userNamePlaceholder: 'הכנס את שמך (אופציונלי)',
      awsSection: 'הגדרות AWS Bedrock',
      awsAccessKey: 'AWS Access Key ID',
      awsSecret: 'AWS Secret Access Key',
      awsSession: 'AWS Session Token (אופציונלי)',
      awsRegion: 'אזור AWS',
      googleSection: 'הגדרות Google AI',
      googleKey: 'Google AI API Key',
      googlePlaceholder: 'הכנס את מפתח Google AI לחיפוש טכני',
      showHide: 'הצג/הסתר',
      saveButton: 'שמור הגדרות',
      testButton: 'בדוק חיבור',
      clearButton: 'מחק את כל ההגדרות',
      status: 'סטטוס חיבור',
      connected: 'מחובר',
      disconnected: 'לא מחובר',
      testing: 'בודק...',
      note: 'שים לב: כל פרטי החיבור נשמרים מקומית בדפדפן שלך ולא נשלחים לשום שרת מלבד APIs של AWS/Google.',
      security: '🔒 פרטי החיבור שלך מאוחסנים בצורה מאובטחת ב-localStorage של הדפדפן.',
    },
  };

  const t = content[language];

  const statusColor = {
    connected: 'text-green-600',
    disconnected: 'text-red-600',
    testing: 'text-yellow-600',
  }[connectionStatus];

  const statusText = {
    connected: t.connected,
    disconnected: t.disconnected,
    testing: t.testing,
  }[connectionStatus];

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 gradient-text">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Connection Status */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">{t.status}</h3>
            <p className={`text-xl font-bold ${statusColor}`}>
              {connectionStatus === 'connected' && '🟢 '}
              {connectionStatus === 'disconnected' && '🔴 '}
              {connectionStatus === 'testing' && '🟡 '}
              {statusText}
            </p>
          </div>
        </div>
      </div>

      {/* User Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">{t.userSection}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.userName}
            </label>
            <input
              type="text"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              placeholder={t.userNamePlaceholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* AWS Configuration */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">{t.awsSection}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.awsAccessKey} *
            </label>
            <input
              type={showSecrets ? 'text' : 'password'}
              value={formData.accessKeyId}
              onChange={(e) => setFormData({ ...formData, accessKeyId: e.target.value })}
              placeholder="AKIAIOSFODNN7EXAMPLE"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.awsSecret} *
            </label>
            <input
              type={showSecrets ? 'text' : 'password'}
              value={formData.secretAccessKey}
              onChange={(e) => setFormData({ ...formData, secretAccessKey: e.target.value })}
              placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.awsSession}
            </label>
            <input
              type={showSecrets ? 'text' : 'password'}
              value={formData.sessionToken}
              onChange={(e) => setFormData({ ...formData, sessionToken: e.target.value })}
              placeholder="Temporary session token"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.awsRegion} *
            </label>
            <select
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="us-east-1">US East (N. Virginia) - us-east-1</option>
              <option value="us-west-2">US West (Oregon) - us-west-2</option>
              <option value="eu-west-1">Europe (Ireland) - eu-west-1</option>
              <option value="eu-central-1">Europe (Frankfurt) - eu-central-1</option>
              <option value="ap-southeast-1">Asia Pacific (Singapore) - ap-southeast-1</option>
              <option value="ap-northeast-1">Asia Pacific (Tokyo) - ap-northeast-1</option>
            </select>
          </div>

          <button
            onClick={() => setShowSecrets(!showSecrets)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showSecrets ? '🙈 ' : '👁️ '} {t.showHide}
          </button>
        </div>
      </div>

      {/* Google AI Configuration */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-purple-600">{t.googleSection}</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.googleKey}
            </label>
            <input
              type={showSecrets ? 'text' : 'password'}
              value={formData.googleApiKey}
              onChange={(e) => setFormData({ ...formData, googleApiKey: e.target.value })}
              placeholder={t.googlePlaceholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
            />
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          {t.security}
        </p>
        <p className="text-sm text-blue-600 mt-2">
          {t.note}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
        >
          💾 {t.saveButton}
        </button>

        <button
          onClick={handleTest}
          disabled={!formData.accessKeyId || !formData.secretAccessKey}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          🔌 {t.testButton}
        </button>

        <button
          onClick={handleClear}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
        >
          🗑️ {t.clearButton}
        </button>
      </div>

      {/* Test Result */}
      {testResult && (
        <div className={`mt-6 p-4 rounded-lg ${testResult.success ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
          <p className={`font-semibold ${testResult.success ? 'text-green-800' : 'text-red-800'}`}>
            {testResult.message}
          </p>
        </div>
      )}
    </main>
  );
}
