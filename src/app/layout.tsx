import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { BookmarksProvider } from "@/context/BookmarksContext";
import ProtectedLayout from "@/components/ProtectedLayout";
import ScrollToTop from "@/components/ScrollToTop";
import BookmarkButton from "@/components/BookmarkButton";

export const metadata: Metadata = {
  title: "Professional Communication Training | CyberArk",
  description: "Master professional client communication skills with comprehensive training on supportability principles, best practices, and effective communication techniques.",
  keywords: "professional communication, client support, supportability, customer service, technical support training",
  authors: [{ name: "CyberArk" }],
  openGraph: {
    title: "Professional Communication Training",
    description: "Master professional client communication skills",
    type: "website",
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50" suppressHydrationWarning>
        <AuthProvider>
          <LanguageProvider>
            <BookmarksProvider>
              <ProtectedLayout>
                <div className="flex-grow animate-fade-in">{children}</div>
                <Footer />
                <ScrollToTop />
                <BookmarkButton />
              </ProtectedLayout>
            </BookmarksProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
