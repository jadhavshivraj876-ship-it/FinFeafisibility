import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bank-Ready DPR Generator (Detailed Project Report)',
  description: '1-Click bank-ready Detailed Project Report (DPR) generator formatted to SBI, Bank of Baroda, Gramin Banks, and District Industries Centre (DIC) loan appraisal standards with instant PDF export.',
  keywords: ['DPR Generator', 'Detailed Project Report PDF', 'Bank Project Report MSME', 'PMEGP DPR Format', 'Mudra DPR']
};

export default function DprGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
