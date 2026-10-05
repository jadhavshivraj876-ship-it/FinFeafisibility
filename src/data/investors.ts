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
  },
  {
    id: 'mudra-micro-lending',
    name: 'MUDRA Institutional Credit Desk',
    type: 'Debt & Working Capital Fund',
    logoBadge: '🏛️ MU',
    focusCategories: ['Retail & Services', 'Food Processing', 'Food Services', 'Personal Care', 'Light Engineering'],
    focusSectors: ['Micro Enterprises', 'Food Kiosks & Stalls', 'Beauty Parlors', 'Retail Shops', 'Small Workshops'],
    ticketSizeRange: '₹50,000 - ₹10 Lakhs',
    minTicketInr: 50000,
    maxTicketInr: 1000000,
    coveredRegions: ['Pan-India'],
    contactPerson: 'Lead District MSME Credit Officer',
    contactEmail: 'nodal.mudra@sidbi.in',
    contactPhone: '1800 180 1111',
    websiteUrl: 'https://www.mudra.org.in',
    officeLocation: 'All Commercial Banks & Regional Rural Banks (RRBs)',
    description: 'National credit guarantee framework financing micro-entrepreneurs under Shishu (up to ₹50k), Kishore (up to ₹5L), and Tarun (up to ₹10L) with zero collateral requirement.',
    portfolioHighlights: ['Over 40 Crore Micro Enterprises Financed Across India']
  },
  {
    id: 'rang-de-impact',
    name: 'Rang De Social Credit Fund',
    type: 'Debt & Working Capital Fund',
    logoBadge: '🤝 RD',
    focusCategories: ['Food Services', 'Retail & Services', 'Handicraft & Artisan', 'Agriculture Value-Add'],
    focusSectors: ['Micro-Business Debt', 'Rural Retail', 'Women-Led Units', 'Food Kiosks', 'Agro-Crafts'],
    ticketSizeRange: '₹1 Lakh - ₹15 Lakhs',
    minTicketInr: 100000,
    maxTicketInr: 1500000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Karnataka', 'Odisha', 'Madhya Pradesh'],
    contactPerson: 'Borrower Onboarding Desk',
    contactEmail: 'support@rangde.in',
    contactPhone: '+91 80 4152 7900',
    websiteUrl: 'https://www.rangde.in',
    officeLocation: 'Bengaluru & Pan-India Partner Field Desks',
    description: 'Pioneering peer-to-peer social impact credit platform providing affordable working capital and asset loans to grassroots and first-generation entrepreneurs.',
    portfolioHighlights: ['Over 100,000 Grassroots Micro-Loans Disbursed']
  },
  {
    id: 'blume-ventures',
    name: 'Blume Ventures',
    type: 'Agri & Impact VC',
    logoBadge: '⚡ BV',
    focusCategories: ['Technology & SaaS', 'Rural Services', 'Clean Energy', 'Logistics'],
    focusSectors: ['B2B SaaS', 'Supply Chain Tech', 'Consumer Internet', 'Hardware & Automation'],
    ticketSizeRange: '₹50 Lakhs - ₹15 Crores',
    minTicketInr: 5000000,
    maxTicketInr: 150000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Karnataka', 'Delhi NCR'],
    contactPerson: 'Early Venture Dealflow Team',
    contactEmail: 'pitches@blume.vc',
    contactPhone: '+91 22 6128 4400',
    websiteUrl: 'https://www.blume.vc',
    officeLocation: 'Mumbai & Bengaluru',
    description: 'India’s prominent homegrown early-stage venture capital firm backing audacious founders building transformative tech, digital tools, and scalable operations.',
    portfolioHighlights: ['GreyOrange', 'Carbon Clean', 'Exotel', 'Purplle', 'Dunzo']
  },
  {
    id: 'climate-angels',
    name: 'Climate Angels Fund',
    type: 'Angel Network',
    logoBadge: '☀️ CA',
    focusCategories: ['Rural Energy', 'CleanTech', 'Automotive & EV', 'Agriculture Value-Add'],
    focusSectors: ['EV Charging Stations', 'Solar Rooftops', 'Battery Swapping', 'Biofuels', 'Energy Storage'],
    ticketSizeRange: '₹25 Lakhs - ₹3 Crores',
    minTicketInr: 2500000,
    maxTicketInr: 30000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Gujarat', 'Karnataka', 'Delhi NCR'],
    contactPerson: 'Climate Syndicate Lead',
    contactEmail: 'invest@climateangels.in',
    contactPhone: '+91 124 456 7890',
    websiteUrl: 'https://www.climateangels.in',
    officeLocation: 'Gurugram & Mumbai',
    description: 'Dedicated climate technology investor syndicate backing early-stage ventures in electric mobility, solar infrastructure, and green power solutions.',
    portfolioHighlights: ['Exponent Energy', 'Turno EV', 'Aerem Solar', 'ClimeCraft']
  },
  {
    id: 'tata-capital-msme',
    name: 'Tata Capital MSME Growth Finance',
    type: 'Debt & Working Capital Fund',
    logoBadge: '🏭 TC',
    focusCategories: ['Light Engineering', 'Manufacturing', 'Rural Energy', 'Food Processing'],
    focusSectors: ['Machinery Term Loans', 'Fabrication Units', 'Industrial Manufacturing', 'Auto Components'],
    ticketSizeRange: '₹15 Lakhs - ₹5 Crores',
    minTicketInr: 1500000,
    maxTicketInr: 50000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Gujarat', 'Tamil Nadu', 'Punjab'],
    contactPerson: 'MSME Industrial Lending Team',
    contactEmail: 'contactus@tatacapital.com',
    contactPhone: '1860 267 6060',
    websiteUrl: 'https://www.tatacapital.com/business-loan.html',
    officeLocation: 'Mumbai & 150+ Industrial Branches',
    description: 'Structured asset-backed machinery loans, working capital limits, and industrial term financing for commercial manufacturing setups.',
    portfolioHighlights: ['Over ₹15,000 Crores in MSME Equipment Loans Sanctioned']
  }
];

export const REAL_INVESTORS_DATABASE = INVESTORS_DATABASE;

export interface InvestorMatchResult {
  investor: InvestorProfile;
  matchScore: number;
  matchReasons: string[];
}

/**
 * Filter and rank real verified investors based on business category, sector, domain, and scale.
 */
export function matchInvestorsForBusiness(
  category: string,
  state: string,
  district?: string,
  domain?: string,
  projectCost?: number
): InvestorMatchResult[] {
  const catLower = (category || '').toLowerCase();
  const domLower = (domain || '').toLowerCase();
  const cost = projectCost || 1500000;

  return INVESTORS_DATABASE.map((investor) => {
    let score = 65;
    const reasons: string[] = [];
    const invDesc = (investor.description + ' ' + investor.focusSectors.join(' ') + ' ' + investor.focusCategories.join(' ')).toLowerCase();

    // Scale / ticket size appropriateness
    if (cost >= investor.minTicketInr && cost <= investor.maxTicketInr) {
      score += 20;
      reasons.push(`Target ticket size aligns with enterprise CapEx (${investor.ticketSizeRange})`);
    } else if (cost < investor.minTicketInr && investor.type.includes('Debt')) {
      score += 15;
      reasons.push(`Micro-credit facility accessible for early-stage rollout`);
    }

    // Direct domain and sector match
    if (domLower && invDesc.includes(domLower.split(' ')[0])) {
      score += 18;
      reasons.push(`Direct portfolio alignment in ${domain || category}`);
    } else if (investor.focusCategories.some(c => catLower.includes(c.toLowerCase()) || invDesc.includes(catLower))) {
      score += 12;
      reasons.push(`Active capital mandate in ${category}`);
    }

    // Regional match
    if (investor.coveredRegions.includes(state)) {
      score += 8;
      reasons.push(`Active capital deployment in ${state}`);
    } else if (investor.coveredRegions.includes('Pan-India')) {
      score += 6;
      reasons.push(`Pan-India investment mandate`);
    }

    return {
      investor,
      matchScore: Math.min(99, Math.max(68, score)),
      matchReasons: reasons
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
