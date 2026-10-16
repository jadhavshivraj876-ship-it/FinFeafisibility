import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Government Scheme Router — PMEGP, Mudra & Subsidies',
  description: 'AI-driven Indian government scheme matcher: find capital subsidy up to 35% under PMEGP, Mudra Shishu/Kishore/Tarun, PMFME, and Stand-Up India with instant eligibility scoring.',
  keywords: ['PMEGP Scheme', 'Mudra Loan Eligibility', 'PMFME Subsidy', 'Government Business Schemes India', 'Stand-Up India']
};

export default function SchemeRouterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
