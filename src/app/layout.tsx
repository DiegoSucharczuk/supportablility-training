import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedLayout from "@/components/ProtectedLayout";

export const metadata: Metadata = {
  title: "Supportability Training",
  description: "Comprehensive training on supportability principles and best practices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50" suppressHydrationWarning>
        <AuthProvider>
          <LanguageProvider>
            <ProtectedLayout>
              <div className="flex-grow animate-fade-in">{children}</div>
              <Footer />
            </ProtectedLayout>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
