import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://datewise-app.vercel.app'),
  title: 'DateWise — AI Dating Coach | Prepare Smarter, Date Better',
  description: 'AI-powered dating preparation app. Get compatibility analysis, personalized date plans, conversation guides, and post-date coaching. Make every date count.',
  keywords: ['dating coach', 'AI dating', 'dating app', 'date planner', 'compatibility test', 'dating advice', 'conversation starter', 'date preparation'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://datewise-app.vercel.app',
    siteName: 'DateWise',
    title: 'DateWise — AI Dating Coach | Prepare Smarter, Date Better',
    description: 'Walk in prepared. Walk out with a connection. AI-powered dating preparation for meaningful dates.',
    images: [{ url: '/og-image.png', width: 1344, height: 768, alt: 'DateWise AI Dating Coach' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DateWise — AI Dating Coach',
    description: 'AI-powered dating preparation. Compatibility. Date Plans. Conversation Guides.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#f43f5e",
            colorBackground: "#ffffff",
            colorInputBackground: "#f9fafb",
            borderRadius: "0.75rem",
            colorText: "#111827",
            colorTextSecondary: "#6b7280",
          },
          elements: {
            formButtonPrimary: "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white",
            card: "border-0 shadow-xl",
          },
        }}
      >
      <head>
        <meta name="application-name" content="DateWise" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DateWise" />
        <meta name="theme-color" content="#f43f5e" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'DateWise',
              applicationCategory: 'LifestyleApplication',
              operatingSystem: 'Web',
              description: 'AI-powered dating preparation app',
              offers: [
                { price: '0', priceCurrency: 'USD', name: 'Free' },
                { price: '9.99', priceCurrency: 'USD', name: 'Pro' },
                { price: '19.99', priceCurrency: 'USD', name: 'VIP' },
              ],
              aggregateRating: { ratingValue: '4.8', reviewCount: '2400' },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        {/* Razorpay Script */}
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        />
      </body>
      </ClerkProvider>
    </html>
  );
}
