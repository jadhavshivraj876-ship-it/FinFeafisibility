import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#059669',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://finfeasibility.in'),
  title: {
    default: 'FinFeasibility — AI Rural Business Advisory & Loan Feasibility Platform',
    template: '%s | FinFeasibility'
  },
  description: 'AI-driven hyper-local market intelligence, rural business feasibility appraisal, smart bank loan structuring, government scheme routing (PMEGP, Mudra, PMFME), and 1-click Bank DPR generation for micro-entrepreneurs.',
  keywords: [
    'FinFeasibility',
    'Rural Micro-Enterprises',
    'PMEGP Subsidy',
    'Mudra Loan',
    'Business Feasibility India',
    'Detailed Project Report',
    'Bank DPR Generator',
    'MSME Advisory',
    'APMC Mandi Intelligence'
  ],
  authors: [{ name: 'Shivraj, Om, Prem, Rohan (B.Tech Final Year Capstone Team)' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'FinFeasibility — AI Rural Business Advisory Platform',
    description: 'Empowering rural micro-entrepreneurs with hyper-local intelligence, loan structuring, and bank DPR generation.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'FinFeasibility'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinFeasibility — AI Rural Business Advisory & DPR Generator',
    description: 'Hyper-local business viability, government scheme routing & bank loan structuring for rural micro-entrepreneurs.'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
