'use client';

import { useAuth } from '@/context/AuthContext';
import LoginPage from './LoginPage';
import Navigation from './Navigation';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <Navigation />
      <div className="relative">
        {children}
        {/* Logout Button */}
        <button
          onClick={logout}
          className="fixed bottom-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-all z-50 flex items-center gap-2"
          title="התנתק"
        >
          <span>🚪</span>
          <span className="hidden sm:inline">התנתק</span>
        </button>
      </div>
    </>
  );
}
