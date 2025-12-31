'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
  region: string;
}

interface UserSettings {
  userName: string;
  awsCredentials: AWSCredentials | null;
  googleApiKey: string;
}

interface SettingsContextType {
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  clearSettings: () => void;
  isConfigured: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'testing';
  testConnection: () => Promise<boolean>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const defaultSettings: UserSettings = {
  userName: '',
  awsCredentials: null,
  googleApiKey: '',
};

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('supportability-settings');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSettings(parsed);
          if (parsed.awsCredentials?.accessKeyId) {
            setConnectionStatus('connected');
          }
        } catch (e) {
          console.error('Failed to load settings:', e);
        }
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('supportability-settings', JSON.stringify(updated));
    }
    
    // Update connection status if AWS credentials changed
    if (newSettings.awsCredentials && updated.awsCredentials?.accessKeyId) {
      setConnectionStatus('connected');
    }
  };

  const clearSettings = () => {
    setSettings(defaultSettings);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('supportability-settings');
    }
    setConnectionStatus('disconnected');
  };

  const testConnection = async (): Promise<boolean> => {
    if (!settings.awsCredentials?.accessKeyId || !settings.awsCredentials?.secretAccessKey) {
      return false;
    }

    setConnectionStatus('testing');
    
    try {
      const response = await fetch('/api/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credentials: settings.awsCredentials,
        }),
      });

      const result = await response.json();
      const success = response.ok && result.success;
      
      setConnectionStatus(success ? 'connected' : 'disconnected');
      return success;
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionStatus('disconnected');
      return false;
    }
  };

  const isConfigured = !!(
    settings.awsCredentials?.accessKeyId &&
    settings.awsCredentials?.secretAccessKey &&
    settings.awsCredentials?.region
  );

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        clearSettings,
        isConfigured,
        connectionStatus,
        testConnection,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
