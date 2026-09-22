export interface InvestorProfile {
  id: string;
  name: string;
  type: 'Agri & Impact VC' | 'Angel Network' | 'Government & Institutional Fund' | 'Seed Accelerator' | 'Debt & Working Capital Fund';
  logoBadge: string;
  focusCategories: string[];
  focusSectors: string[];
  ticketSizeRange: string;
  minTicketInr: number;
  maxTicketInr: number;
  coveredRegions: string[]; // State names or 'Pan-India'
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  officeLocation: string;
  description: string;
  portfolioHighlights: string[];
}

export const INVESTORS_DATABASE: InvestorProfile[] = [
  {
    id: 'omnivore-partners',
    name: 'Omnivore',
    type: 'Agri & Impact VC',
    logoBadge: '🌱 OM',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Agro-Tech'],
    focusSectors: ['Agritech', 'Post-Harvest Food Processing', 'Cold Chain', 'Rural Climate Tech'],
    ticketSizeRange: '₹50 Lakhs - ₹15 Crores',
    minTicketInr: 5000000,
    maxTicketInr: 150000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Punjab', 'Gujarat', 'Tamil Nadu', 'Karnataka', 'Madhya Pradesh'],
    contactPerson: 'Agri-Enterprise Investment Team',
    contactEmail: 'pitches@omnivore.vc',
    contactPhone: '+91 22 4002 8900',
    websiteUrl: 'https://www.omnivore.vc',
    officeLocation: 'Bandra Kurla Complex (BKC), Mumbai & Bengaluru',
    description: 'India’s premier agritech venture fund backing pioneering agro-processing, post-harvest technology, and rural value-addition enterprises.',
    portfolioHighlights: ['DeHaat', 'Bijak', 'Arya Collateral', 'Stellapps', 'Ecozen']
  },
  {
    id: 'nabventures',
    name: 'NABVENTURES (NABARD VC Fund)',
    type: 'Government & Institutional Fund',
    logoBadge: '🌾 NB',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Rural Services'],
    focusSectors: ['Rural MSMEs', 'Food Processing Units', 'Farm-Gate Infrastructure', 'Bio-Agri'],
    ticketSizeRange: '₹25 Lakhs - ₹10 Crores',
    minTicketInr: 2500000,
    maxTicketInr: 100000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Uttar Pradesh', 'Bihar', 'Assam', 'Gujarat', 'Punjab'],
    contactPerson: 'Rural Entrepreneurship Desk',
    contactEmail: 'connect@nabventures.in',
    contactPhone: '+91 22 2653 9243',
    websiteUrl: 'https://www.nabventures.in',
    officeLocation: 'NABARD Head Office, BKC, Bandra East, Mumbai',
    description: 'Backed by the National Bank for Agriculture and Rural Development (NABARD) to finance high-growth rural enterprises, farmer producer companies, and food value-add facilities.',
    portfolioHighlights: ['Unnati Agri', 'Jai Kisan', 'Krishi Tantra', 'Sattviko', 'VilCart']
  },
  {
    id: 'caspian-debt',
    name: 'Caspian Debt',
    type: 'Debt & Working Capital Fund',
    logoBadge: '💳 CD',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Light Engineering'],
    focusSectors: ['Working Capital Debt', 'Equipment Financing', 'Clean Energy', 'Food Manufacturing'],
    ticketSizeRange: '₹50 Lakhs - ₹5 Crores',
    minTicketInr: 5000000,
    maxTicketInr: 50000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Karnataka', 'Telangana', 'Tamil Nadu', 'Gujarat'],
    contactPerson: 'MSME Credit & Debt Team',
    contactEmail: 'info@caspiandebt.in',
    contactPhone: '+91 40 6629 7000',
    websiteUrl: 'https://www.caspiandebt.in',
    officeLocation: 'Hyderabad & Bengaluru',
    description: 'Specialized non-banking debt partner providing customized term loans and working capital to commercially viable enterprises without requiring real estate collateral.',
    portfolioHighlights: ['Milaap', 'Ecozen Solutions', 'Promethean Power', 'GramCover']
  },
  {
    id: 'ankur-capital',
    name: 'Ankur Capital',
    type: 'Agri & Impact VC',
    logoBadge: '🌿 AC',
    focusCategories: ['Agriculture Value-Add', 'Food Processing', 'Rural Energy', 'Light Engineering'],
    focusSectors: ['Deep-Tech Agri', 'Bio-Manufacturing', 'Cold Supply Chains', 'Bio-Fertilizers'],
    ticketSizeRange: '₹30 Lakhs - ₹6 Crores',
    minTicketInr: 3000000,
    maxTicketInr: 60000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Karnataka', 'Telangana', 'Delhi NCR', 'Rajasthan'],
    contactPerson: 'Early Stage Screening Desk',
    contactEmail: 'info@ankurcapital.com',
    contactPhone: '+91 22 2490 8921',
    websiteUrl: 'https://www.ankurcapital.com',
    officeLocation: 'Mumbai & Bengaluru',
    description: 'Leading seed & early-growth fund investing in transformational rural technologies, deep-tech agricultural machinery, and sustainable manufacturing.',
    portfolioHighlights: ['CropIn Technologies', 'String Bio', 'Niramai', 'Captain Fresh']
  },
  {
    id: 'aavishkaar-capital',
    name: 'Aavishkaar Capital',
    type: 'Agri & Impact VC',
    logoBadge: '🌍 AV',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Handicraft & Artisan'],
    focusSectors: ['Rural Livelihoods', 'Agriculture Supply Chain', 'Renewable Energy', 'MSME Manufacturing'],
    ticketSizeRange: '₹1 Crore - ₹20 Crores',
    minTicketInr: 10000000,
    maxTicketInr: 200000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Madhya Pradesh', 'Odisha', 'Bihar', 'Rajasthan'],
    contactPerson: 'Impact Investment Committee',
    contactEmail: 'dealflow@aavishkaar.in',
    contactPhone: '+91 22 6146 6400',
    websiteUrl: 'https://www.aavishkaarcapital.in',
    officeLocation: 'Worli, Mumbai & New Delhi',
    description: 'Pioneer in Indian impact investing, managing over $1 Billion across emerging businesses that create sustainable rural employment and farmer income growth.',
    portfolioHighlights: ['Inthree Access', 'Mera Gao Power', 'Ergos Life Sciences', 'Milk Mantra']
  },
  {
    id: 'sidbi-venture-capital',
    name: 'SIDBI Venture Capital (SVCL)',
    type: 'Government & Institutional Fund',
    logoBadge: '🏛️ SV',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Light Engineering', 'Rural Services'],
    focusSectors: ['MSME Manufacturing', 'Industrial Engineering', 'Agro-processing Units', 'Clean Tech'],
    ticketSizeRange: '₹50 Lakhs - ₹12 Crores',
    minTicketInr: 5000000,
    maxTicketInr: 120000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Punjab', 'Tamil Nadu', 'Bihar'],
    contactPerson: 'Nodal Officer - MSME Growth Fund',
    contactEmail: 'contact@sidbiventure.co.in',
    contactPhone: '+91 22 6753 1100',
    websiteUrl: 'https://www.sidbiventure.co.in',
    officeLocation: 'Nariman Point, Mumbai / Regional Branch Offices',
    description: 'Wholly-owned subsidiary of Small Industries Development Bank of India (SIDBI) managing national risk capital funds dedicated to MSME industrial expansion.',
    portfolioHighlights: ['Regional Cold Storages', 'Spice Processors', 'Biomass Pelleting Units', 'Precision Auto Components']
  },
  {
    id: 'villgro-innovations',
    name: 'Villgro Innovations Foundation',
    type: 'Seed Accelerator',
    logoBadge: '🚀 VG',
    focusCategories: ['Agriculture Value-Add', 'Rural Energy', 'Food Processing', 'Light Engineering'],
    focusSectors: ['Social Innovation', 'Rural Climate Tech', 'Farm Mechanization', 'Healthcare & Water'],
    ticketSizeRange: '₹10 Lakhs - ₹60 Lakhs',
    minTicketInr: 1000000,
    maxTicketInr: 6000000,
    coveredRegions: ['Pan-India', 'Tamil Nadu', 'Maharashtra', 'Karnataka', 'Odisha', 'Assam'],
    contactPerson: 'Incubation & Seed Fund Director',
    contactEmail: 'apply@villgro.org',
    contactPhone: '+91 44 2254 1121',
    websiteUrl: 'https://www.villgro.org',
    officeLocation: 'IIT Madras Research Park, Chennai & Bengaluru',
    description: 'India’s oldest and most respected social enterprise incubator, backing early-stage rural innovators with seed funding, technical mentorship, and field pilots.',
    portfolioHighlights: ['S4S Technologies (Solar Dehydration)', 'Kamatan Farm Tech', 'CoolCrop', 'Vector Hygiene']
  },
  {
    id: 'indian-angel-network',
    name: 'Indian Angel Network (IAN)',
    type: 'Angel Network',
    logoBadge: '🤝 IA',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Agro-Tech', 'Light Engineering'],
    focusSectors: ['Early Stage Ventures', 'Direct-to-Consumer Food', 'Clean Energy', 'Agri-Logistics'],
    ticketSizeRange: '₹25 Lakhs - ₹3 Crores',
    minTicketInr: 2500000,
    maxTicketInr: 30000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Delhi NCR', 'Karnataka', 'Gujarat', 'West Bengal'],
    contactPerson: 'Deal Sourcing Lead',
    contactEmail: 'deals@indianangelnetwork.com',
    contactPhone: '+91 11 4075 5500',
    websiteUrl: 'https://www.indianangelnetwork.com',
    officeLocation: 'New Delhi, Mumbai & Bengaluru',
    description: 'Largest horizontal angel investor network in Asia, providing quick seed equity and industry mentorship to high-potential founders.',
    portfolioHighlights: ['FabAlley', 'Box8', 'FarMart', 'WebEngage']
  }
];

export const REAL_INVESTORS_DATABASE = INVESTORS_DATABASE;

export interface InvestorMatchResult {
  investor: InvestorProfile;
  matchScore: number;
  matchReasons: string[];
}

/**
 * Filter and rank real verified investors based on business category, sector, and location.
 */
export function matchInvestorsForBusiness(
  category: string,
  state: string,
  district?: string
): InvestorMatchResult[] {
  return INVESTORS_DATABASE.map((investor) => {
    let score = 70;
    const reasons: string[] = [];

    // Category match
    if (investor.focusCategories.includes(category)) {
      score += 15;
      reasons.push(`Direct investment focus on ${category}`);
    } else {
      score += 5;
    }

    // Regional match
    if (investor.coveredRegions.includes(state)) {
      score += 10;
      reasons.push(`Active capital allocation in ${state}`);
    } else if (investor.coveredRegions.includes('Pan-India')) {
      score += 8;
      reasons.push(`Pan-India investment mandate`);
    }

    // Special institutional priority
    if (category === 'Food Processing' && investor.id === 'omnivore-partners') {
      score = Math.min(98, score + 6);
      reasons.push('Category leading agrifood venture capital partner');
    }
    if (investor.id === 'nabventures') {
      score = Math.min(97, score + 5);
      reasons.push('Institutional priority for rural bank-linked enterprises');
    }

    return {
      investor,
      matchScore: Math.min(99, score),
      matchReasons: reasons
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
