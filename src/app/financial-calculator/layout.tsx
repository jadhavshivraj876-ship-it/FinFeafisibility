import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Financial Calculator, EMI & DSCR Structuring',
  description: 'Interactive banking financial calculator for micro-enterprises: CapEx, promoter margin (5-10%), bank term loan EMIs, subsidy deductions, and 3-year DSCR viability statements.',
  keywords: ['Financial Calculator', 'DSCR Calculator', 'Bank Loan EMI', 'PMEGP Subsidy Calculation', 'Rural Loan Structuring']
};

export default function FinancialCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
