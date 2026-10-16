import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hyper-Local Market Intelligence & Demand Analysis',
  description: 'AI-powered local market intelligence across 700+ Indian districts: real-time agricultural APMC mandi trends, competitor saturation, and underserved rural demand opportunities.',
  keywords: ['Market Intelligence', 'APMC Mandi Prices', 'Rural Business Opportunities', 'Competition Density', 'District Intelligence India']
};

export default function MarketIntelligenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
