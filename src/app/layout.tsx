import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bildtools.online'),
  title: {
    default: 'BildTools - Kostenlose Online Bildwerkzeuge',
    template: '%s | BildTools'
  },
  description: 'Kostenlose Online-Bildwerkzeuge. Konvertieren, komprimieren und bearbeiten Sie Ihre Bilder direkt im Browser. Über 40 Werkzeuge - schnell, sicher, ohne Registrierung.',
  keywords: ['Bild konvertieren', 'Bild komprimieren', 'Online Bildbearbeitung', 'WebP zu PNG', 'JPG komprimieren', 'Bildgröße ändern', 'kostenlos', 'online', 'deutsch'],
  authors: [{ name: 'BildTools Team' }],
  creator: 'BildTools',
  publisher: 'BildTools',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://bildtools.online',
    siteName: 'BildTools',
    title: 'BildTools - Kostenlose Online Bildwerkzeuge',
    description: 'Kostenlose Online-Bildwerkzeuge. Konvertieren, komprimieren und bearbeiten Sie Ihre Bilder direkt im Browser.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BildTools - Online Bildwerkzeuge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BildTools - Kostenlose Online Bildwerkzeuge',
    description: 'Kostenlose Online-Bildwerkzeuge. Konvertieren, komprimieren und bearbeiten Sie Ihre Bilder direkt im Browser.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://bildtools.online',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}