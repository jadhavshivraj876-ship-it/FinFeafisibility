import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FinFeasibility — AI Rural Business Advisory & Financial Structuring Platform',
  description: 'AI-driven hyper-local market intelligence, business feasibility analysis, smart loan structuring, government scheme routing, and bank DPR generation for rural micro-entrepreneurs.',
  keywords: ['PMEGP', 'Mudra Loan', 'Rural Micro-Enterprises', 'Business Feasibility', 'Detailed Project Report', 'DPR Generator', 'MSME India'],
  authors: [{ name: 'Shivraj, Om, Prem, Rohan (B.Tech Capstone Team)' }]
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
