'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/context/SettingsContext';
import { useLanguage } from '@/context/LanguageContext';

export default function SettingsPage() {
  const { settings, updateSettings, clearSettings, connectionStatus, testConnection } = useSettings();
  const { language } = useLanguage();
  const router = useRouter();

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
  const [authMethod, setAuthMethod] = useState<'manual' | 'sso' | 'local-sso'>('manual');
  const [ssoConfig, setSsoConfig] = useState({
    startUrl: '',
    region: 'us-east-1',
  });
  const [ssoFlow, setSsoFlow] = useState<{
    step: 'idle' | 'authorizing' | 'selecting' | 'complete';
    userCode?: string;
    verificationUri?: string;
    clientId?: string;
    clientSecret?: string;
    deviceCode?: string;
    accessToken?: string;
    accounts?: any[];
    roles?: any[];
    selectedAccount?: string;
    selectedRole?: string;
  }>({ step: 'idle' });
  const [localSsoProfiles, setLocalSsoProfiles] = useState<any[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>('');

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

  const handleSave = async () => {
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
    
    // Auto-test connection after saving
    if (formData.accessKeyId && formData.secretAccessKey) {
      setTestResult({ 
        success: true, 
        message: language === 'en' ? 'Settings saved. Testing connection...' : 'ההגדרות נשמרו. בודק חיבור...'
      });
      
      // Wait a bit for settings to be updated
      setTimeout(async () => {
        const success = await testConnection();
        setTestResult({
          success,
          message: success
            ? language === 'en' 
              ? '✅ Settings saved and connection verified!' 
              : '✅ ההגדרות נשמרו והחיבור אומת!'
            : language === 'en'
              ? '❌ Settings saved but connection failed. Please check your credentials.'
              : '❌ ההגדרות נשמרו אך החיבור נכשל. אנא בדוק את פרטי החיבור.',
        });
      }, 500);
    } else {
      setTestResult({ success: true, message: language === 'en' ? 'Settings saved' : 'ההגדרות נשמרו' });
      setTimeout(() => setTestResult(null), 3000);
    }
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
      setSsoFlow({ step: 'idle' });
      setTestResult({ success: true, message: language === 'en' ? 'Settings cleared' : 'ההגדרות נמחקו' });
    }
  };

  const handleSSOStart = async () => {
    if (!ssoConfig.startUrl) {
      setTestResult({ 
        success: false, 
        message: language === 'en' ? 'Please enter your AWS SSO start URL' : 'אנא הזן את כתובת ההתחלה של AWS SSO' 
      });
      return;
    }

    try {
      setSsoFlow({ step: 'authorizing' });
      
      const response = await fetch('/api/auth/sso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          startUrl: ssoConfig.startUrl,
          region: ssoConfig.region,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setSsoFlow({
        step: 'authorizing',
        userCode: data.userCode,
        verificationUri: data.verificationUriComplete || data.verificationUri,
        clientId: data.clientId,
        clientSecret: data.clientSecret,
        deviceCode: data.deviceCode,
      });

      // Open authorization URL in new tab
      window.open(data.verificationUriComplete || data.verificationUri, '_blank');

      // Start polling for token
      pollForToken(data.clientId, data.clientSecret, data.deviceCode, ssoConfig.region);

    } catch (error: any) {
      setSsoFlow({ step: 'idle' });
      setTestResult({ 
        success: false, 
        message: language === 'en' ? `SSO failed: ${error.message}` : `SSO נכשל: ${error.message}` 
      });
    }
  };

  const pollForToken = async (clientId: string, clientSecret: string, deviceCode: string, region: string) => {
    const maxAttempts = 60; // 5 minutes (every 5 seconds)
    let attempts = 0;

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setSsoFlow({ step: 'idle' });
        setTestResult({ 
          success: false, 
          message: language === 'en' ? 'Authorization timeout. Please try again.' : 'פג זמן האישור. נסה שוב.' 
        });
        return;
      }

      try {
        const response = await fetch('/api/auth/sso', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'token',
            clientId,
            clientSecret,
            deviceCode,
            region,
          }),
        });

        const data = await response.json();

        if (data.success && data.accessToken) {
          // Get accounts
          await fetchAccounts(data.accessToken, region);
        } else {
          // Continue polling
          attempts++;
          setTimeout(poll, 5000);
        }
      } catch (error) {
        // Continue polling on error (user might not have authorized yet)
        attempts++;
        setTimeout(poll, 5000);
      }
    };

    poll();
  };

  const fetchAccounts = async (accessToken: string, region: string) => {
    try {
      const response = await fetch('/api/auth/sso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'accounts',
          accessToken,
          region,
        }),
      });

      const data = await response.json();

      if (data.success && data.accounts) {
        setSsoFlow(prev => ({
          ...prev,
          step: 'selecting',
          accessToken,
          accounts: data.accounts,
        }));
      }
    } catch (error: any) {
      setSsoFlow({ step: 'idle' });
      setTestResult({ 
        success: false, 
        message: language === 'en' ? `Failed to fetch accounts: ${error.message}` : `נכשל לטעון חשבונות: ${error.message}` 
      });
    }
  };

  const handleAccountSelect = async (accountId: string) => {
    if (!ssoFlow.accessToken) return;

    try {
      const response = await fetch('/api/auth/sso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'roles',
          accessToken: ssoFlow.accessToken,
          accountId,
          region: ssoConfig.region,
        }),
      });

      const data = await response.json();

      if (data.success && data.roles) {
        setSsoFlow(prev => ({
          ...prev,
          roles: data.roles,
          selectedAccount: accountId,
        }));
      }
    } catch (error: any) {
      setTestResult({ 
        success: false, 
        message: language === 'en' ? `Failed to fetch roles: ${error.message}` : `נכשל לטעון תפקידים: ${error.message}` 
      });
    }
  };

  const handleRoleSelect = async (roleName: string) => {
    if (!ssoFlow.accessToken || !ssoFlow.selectedAccount) return;

    try {
      const response = await fetch('/api/auth/sso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'credentials',
          accessToken: ssoFlow.accessToken,
          accountId: ssoFlow.selectedAccount,
          roleName,
          region: ssoConfig.region,
        }),
      });

      const data = await response.json();

      if (data.success && data.credentials) {
        // Update form with SSO credentials
        setFormData(prev => ({
          ...prev,
          accessKeyId: data.credentials.accessKeyId,
          secretAccessKey: data.credentials.secretAccessKey,
          sessionToken: data.credentials.sessionToken,
          region: ssoConfig.region,
        }));

        setSsoFlow({ step: 'complete', selectedRole: roleName });
        
        // Auto-save the credentials
        updateSettings({
          userName: formData.userName,
          awsCredentials: {
            accessKeyId: data.credentials.accessKeyId,
            secretAccessKey: data.credentials.secretAccessKey,
            sessionToken: data.credentials.sessionToken,
            region: ssoConfig.region,
          },
          googleApiKey: formData.googleApiKey,
        });

        setTestResult({ 
          success: true, 
          message: language === 'en' ? '✅ SSO authentication successful! Credentials saved.' : '✅ אימות SSO הצליח! האישורים נשמרו.' 
        });

        // Test connection
        setTimeout(async () => {
          const success = await testConnection();
          if (success) {
            setTestResult({ 
              success: true, 
              message: language === 'en' ? '✅ SSO complete and connection verified!' : '✅ SSO הושלם והחיבור אומת!' 
            });
          }
        }, 500);
      }
    } catch (error: any) {
      setTestResult({ 
        success: false, 
        message: language === 'en' ? `Failed to get credentials: ${error.message}` : `נכשל לקבל אישורים: ${error.message}` 
      });
    }
  };

  const handleLoadLocalSSO = async () => {
    try {
      setTestResult({ success: true, message: language === 'en' ? 'Loading AWS profiles...' : 'טוען פרופילי AWS...' });
      
      const response = await fetch('/api/auth/local-sso');
      const data = await response.json();

      if (!data.success) {
        if (data.needsSetup) {
          setTestResult({ 
            success: false, 
            message: language === 'en' 
              ? 'AWS SSO not configured. Run "aws configure sso" in your terminal first.' 
              : 'AWS SSO לא מוגדר. הרץ "aws configure sso" בטרמינל תחילה.'
          });
        } else if (data.needsLogin) {
          setTestResult({ 
            success: false, 
            message: language === 'en' 
              ? `SSO token expired. Run "aws sso login --profile <profile>" first.\n\nAvailable profiles: ${data.profiles?.join(', ')}` 
              : `אסימון SSO פג. הרץ "aws sso login --profile <profile>" תחילה.\n\nפרופילים זמינים: ${data.profiles?.join(', ')}`
          });
        } else {
          setTestResult({ success: false, message: data.error });
        }
        return;
      }

      setLocalSsoProfiles(data.profiles);
      setTestResult({ 
        success: true, 
        message: language === 'en' 
          ? `Found ${data.profiles.length} AWS SSO profile(s). Select one to continue.` 
          : `נמצאו ${data.profiles.length} פרופילי AWS SSO. בחר אחד להמשך.`
      });

    } catch (error: any) {
      setTestResult({ 
        success: false, 
        message: language === 'en' ? `Error loading profiles: ${error.message}` : `שגיאה בטעינת פרופילים: ${error.message}` 
      });
    }
  };

  const handleUseLocalProfile = async () => {
    if (!selectedProfile) {
      setTestResult({ 
        success: false, 
        message: language === 'en' ? 'Please select a profile first' : 'אנא בחר פרופיל תחילה'
      });
      return;
    }

    try {
      setTestResult({ success: true, message: language === 'en' ? 'Getting credentials...' : 'מקבל אישורים...' });

      const response = await fetch('/api/auth/local-sso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileName: selectedProfile }),
      });

      const data = await response.json();

      if (!data.success) {
        if (data.needsLogin) {
          setTestResult({ 
            success: false, 
            message: data.error 
          });
        } else {
          setTestResult({ success: false, message: data.error });
        }
        return;
      }

      // Update form with credentials
      setFormData(prev => ({
        ...prev,
        accessKeyId: data.credentials.accessKeyId,
        secretAccessKey: data.credentials.secretAccessKey,
        sessionToken: data.credentials.sessionToken,
        region: data.credentials.region,
      }));

      // Auto-save
      updateSettings({
        userName: formData.userName,
        awsCredentials: {
          accessKeyId: data.credentials.accessKeyId,
          secretAccessKey: data.credentials.secretAccessKey,
          sessionToken: data.credentials.sessionToken,
          region: data.credentials.region,
        },
        googleApiKey: formData.googleApiKey,
      });

      setTestResult({ 
        success: true, 
        message: language === 'en' 
          ? `✅ Loaded credentials from profile "${data.profile.name}"` 
          : `✅ אישורים נטענו מפרופיל "${data.profile.name}"`
      });

      // Test connection
      setTimeout(async () => {
        const success = await testConnection();
        if (success) {
          setTestResult({ 
            success: true, 
            message: language === 'en' 
              ? `✅ Profile "${data.profile.name}" connected successfully!` 
              : `✅ פרופיל "${data.profile.name}" התחבר בהצלחה!`
          });
        }
      }, 500);

    } catch (error: any) {
      setTestResult({ 
        success: false, 
        message: language === 'en' ? `Error: ${error.message}` : `שגיאה: ${error.message}`
      });
    }
  };

  const content = {
    en: {
      title: 'Settings',
      subtitle: 'Configure your AWS and Google AI credentials',
      userSection: 'User Information',
      userName: 'Your Name',
      userNamePlaceholder: 'Enter your name (optional)',
      authMethodTitle: 'Authentication Method',
      manualAuth: 'Manual Credentials',
      ssoAuth: 'AWS SSO Login',
      localSsoAuth: 'Use Local AWS SSO',
      awsSection: 'AWS Bedrock Configuration',
      localSsoInfo: 'Use AWS SSO credentials already configured on your machine',
      loadProfilesButton: 'Load AWS Profiles',
      selectProfile: 'Select AWS Profile',
      useProfileButton: 'Use This Profile',
      ssoStartUrl: 'AWS SSO Start URL',
      ssoStartUrlPlaceholder: 'https://your-org.awsapps.com/start',
      ssoRegion: 'SSO Region',
      startSSOButton: 'Sign in with AWS SSO',
      ssoAuthorizing: 'Authorizing... Please complete the login in the opened browser tab',
      ssoUserCode: 'User Code',
      ssoSelectAccount: 'Select AWS Account',
      ssoSelectRole: 'Select IAM Role',
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
      authMethodTitle: 'שיטת אימות',
      manualAuth: 'אישורים ידניים',
      ssoAuth: 'כניסה עם AWS SSO',
      localSsoAuth: 'השתמש ב-AWS SSO מקומי',
      awsSection: 'הגדרות AWS Bedrock',
      localSsoInfo: 'השתמש באישורי AWS SSO שכבר מוגדרים במחשב שלך',
      loadProfilesButton: 'טען פרופילי AWS',
      selectProfile: 'בחר פרופיל AWS',
      useProfileButton: 'השתמש בפרופיל זה',
      ssoStartUrl: 'כתובת התחלה של AWS SSO',
      ssoStartUrlPlaceholder: 'https://your-org.awsapps.com/start',
      ssoRegion: 'אזור SSO',
      startSSOButton: 'היכנס עם AWS SSO',
      ssoAuthorizing: 'מאמת... אנא השלם את הכניסה בכרטיסיית הדפדפן שנפתחה',
      ssoUserCode: 'קוד משתמש',
      ssoSelectAccount: 'בחר חשבון AWS',
      ssoSelectRole: 'בחר תפקיד IAM',
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
        
        {/* Authentication Method Selector */}
        <div className="mb-6 border-b pb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t.authMethodTitle}
          </label>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setAuthMethod('manual')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                authMethod === 'manual'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🔑 {t.manualAuth}
            </button>
            <button
              onClick={() => setAuthMethod('local-sso')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                authMethod === 'local-sso'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              💻 {t.localSsoAuth}
            </button>
            <button
              onClick={() => setAuthMethod('sso')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                authMethod === 'sso'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🔐 {t.ssoAuth}
            </button>
          </div>
        </div>

        {/* Local SSO (Use existing AWS CLI SSO) */}
        {authMethod === 'local-sso' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 {t.localSsoInfo}
              </p>
              <p className="text-xs text-blue-600 mt-2">
                {language === 'en' 
                  ? 'Requirements: AWS CLI installed and "aws sso login" completed' 
                  : 'דרישות: AWS CLI מותקן ו-"aws sso login" הושלם'}
              </p>
            </div>

            {localSsoProfiles.length === 0 ? (
              <button
                onClick={handleLoadLocalSSO}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                🔍 {t.loadProfilesButton}
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.selectProfile}
                  </label>
                  <select
                    value={selectedProfile}
                    onChange={(e) => setSelectedProfile(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">-- Select Profile --</option>
                    {localSsoProfiles.map((profile) => (
                      <option key={profile.name} value={profile.name}>
                        {profile.name} ({profile.ssoAccountId || 'Account'} - {profile.ssoRoleName || 'Role'})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleUseLocalProfile}
                  disabled={!selectedProfile}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
                >
                  ✅ {t.useProfileButton}
                </button>

                <button
                  onClick={() => {
                    setLocalSsoProfiles([]);
                    setSelectedProfile('');
                  }}
                  className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  {language === 'en' ? 'Reload Profiles' : 'טען פרופילים מחדש'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* SSO Authentication */}
        {authMethod === 'sso' && (
          <div className="space-y-4">
            {ssoFlow.step === 'idle' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.ssoStartUrl} *
                  </label>
                  <input
                    type="text"
                    value={ssoConfig.startUrl}
                    onChange={(e) => setSsoConfig({ ...ssoConfig, startUrl: e.target.value })}
                    placeholder={t.ssoStartUrlPlaceholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.ssoRegion} *
                  </label>
                  <select
                    value={ssoConfig.region}
                    onChange={(e) => setSsoConfig({ ...ssoConfig, region: e.target.value })}
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
                  onClick={handleSSOStart}
                  disabled={!ssoConfig.startUrl}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
                >
                  🚀 {t.startSSOButton}
                </button>
              </>
            )}

            {ssoFlow.step === 'authorizing' && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6 text-center">
                <div className="animate-pulse text-4xl mb-4">🔐</div>
                <p className="text-lg font-semibold text-yellow-800 mb-2">{t.ssoAuthorizing}</p>
                {ssoFlow.userCode && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">{t.ssoUserCode}:</p>
                    <p className="text-3xl font-mono font-bold text-blue-600">{ssoFlow.userCode}</p>
                  </div>
                )}
                {ssoFlow.verificationUri && (
                  <a
                    href={ssoFlow.verificationUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800 underline"
                  >
                    Open authorization page again
                  </a>
                )}
              </div>
            )}

            {ssoFlow.step === 'selecting' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.ssoSelectAccount}
                  </label>
                  <select
                    onChange={(e) => handleAccountSelect(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">-- Select Account --</option>
                    {ssoFlow.accounts?.map((account: any) => (
                      <option key={account.accountId} value={account.accountId}>
                        {account.accountName} ({account.accountId})
                      </option>
                    ))}
                  </select>
                </div>

                {ssoFlow.roles && ssoFlow.roles.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.ssoSelectRole}
                    </label>
                    <select
                      onChange={(e) => handleRoleSelect(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">-- Select Role --</option>
                      {ssoFlow.roles.map((role: any) => (
                        <option key={role.roleName} value={role.roleName}>
                          {role.roleName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {ssoFlow.step === 'complete' && (
              <div className="bg-green-50 border border-green-300 rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-lg font-semibold text-green-800">
                  {language === 'en' ? 'SSO Authentication Complete!' : 'אימות SSO הושלם!'}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'en' ? 'Credentials have been saved and are ready to use.' : 'האישורים נשמרו ומוכנים לשימוש.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Manual Credentials */}
        {authMethod === 'manual' && (
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
        )}
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

        <button
          onClick={() => router.back()}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
        >
          ← {language === 'en' ? 'Back' : 'חזרה'}
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
