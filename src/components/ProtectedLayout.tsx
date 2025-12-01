'use client';

import { useAuth } from '@/context/AuthContext';
import LoginPage from './LoginPage';
import Navigation from './Navigation';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
