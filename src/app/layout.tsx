import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/header';
import { AppFooter } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/auth-provider';
import { EmailVerificationBanner } from '@/components/email-verification-banner';

export const metadata: Metadata = {
  title: 'Terry1921 Store Front Connect',
  description: 'Promote your store, share your stories.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <AppHeader />
          <EmailVerificationBanner />
          <main className="flex-grow">{children}</main>
          <AppFooter />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
