export interface InvestorProfile {
  id: string;
  name: string;
  type: 'Agri & Impact VC' | 'Angel Network' | 'Government & Institutional Fund' | 'Seed Accelerator';
  logoBadge: string;
  focusCategories: string[];
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
    name: 'Omnivore Partners',
    type: 'Agri & Impact VC',
    logoBadge: '🌱 OM',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Agro-Tech'],
    ticketSizeRange: '₹50 Lakhs - ₹15 Crores',
    minTicketInr: 5000000,
    maxTicketInr: 150000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Punjab', 'Gujarat', 'Tamil Nadu', 'Karnataka', 'Madhya Pradesh'],
    contactPerson: 'Investment Team (Agri-Enterprises)',
    contactEmail: 'pitches@omnivore.vc',
    contactPhone: '+91 22 4002 8900',
    websiteUrl: 'https://www.omnivore.vc',
    officeLocation: 'Bandra Kurla Complex (BKC), Mumbai & Bengaluru',
    description: 'India’s premier agritech and rural impact venture fund backing breakthrough agro-processing and rural value-addition businesses.',
    portfolioHighlights: ['DeHaat', 'Bijak', 'Arya Collateral', 'Stellapps']
  },
  {
    id: 'nabventures',
    name: 'NABVENTURES (NABARD Fund)',
    type: 'Government & Institutional Fund',
    logoBadge: '🌾 NB',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Rural Services'],
    ticketSizeRange: '₹25 Lakhs - ₹10 Crores',
    minTicketInr: 2500000,
    maxTicketInr: 100000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Uttar Pradesh', 'Bihar', 'Assam', 'Gujarat', 'Punjab'],
    contactPerson: 'Fund Manager - Rural Entrepreneurship Desk',
    contactEmail: 'connect@nabventures.in',
    contactPhone: '+91 22 2653 9243',
    websiteUrl: 'https://www.nabventures.in',
    officeLocation: 'NABARD Head Office, BKC, Bandra East, Mumbai',
    description: 'Backed by the National Bank for Agriculture and Rural Development (NABARD) to finance high-potential rural MSMEs and food processing units.',
    portfolioHighlights: ['Unnati Agri', 'Jai Kisan', 'Krishi Tantra', 'Sattviko']
  },
  {
    id: 'ankur-capital',
    name: 'Ankur Capital',
    type: 'Agri & Impact VC',
    logoBadge: '⚡ AC',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy'],
    ticketSizeRange: '₹35 Lakhs - ₹8 Crores',
    minTicketInr: 3500000,
    maxTicketInr: 80000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Madhya Pradesh'],
    contactPerson: 'Deal Sourcing Lead',
    contactEmail: 'info@ankurcapital.com',
    contactPhone: '+91 22 6128 3500',
    websiteUrl: 'https://www.ankurcapital.com',
    officeLocation: 'Worli, Mumbai',
    description: 'Early-stage venture capital fund that invests in transformative technologies and processing infrastructure for Bharat.',
    portfolioHighlights: ['CropIn', 'String Bio', 'BigHaat', 'Captain Fresh']
  },
  {
    id: 'aavishkaar-capital',
    name: 'Aavishkaar Capital',
    type: 'Agri & Impact VC',
    logoBadge: '🌍 AV',
    focusCategories: ['Food Processing', 'Handicraft & Artisan', 'Rural Energy', 'Rural Services'],
    ticketSizeRange: '₹1 Crore - ₹25 Crores',
    minTicketInr: 10000000,
    maxTicketInr: 250000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Bihar', 'Uttar Pradesh', 'Assam', 'West Bengal', 'Odisha'],
    contactPerson: 'Regional Investment Officer (West & North)',
    contactEmail: 'investment@aavishkaarcapital.com',
    contactPhone: '+91 22 6144 8000',
    websiteUrl: 'https://www.aavishkaarcapital.com',
    officeLocation: 'Nariman Point, Mumbai & New Delhi',
    description: 'Pioneer in rural and semi-urban venture investing with dedicated allocations for Tier 2/3 manufacturing and artisan enterprises.',
    portfolioHighlights: ['Mera Kisan', 'Ergos Life', 'Chqbook', 'Kottaram Agro']
  },
  {
    id: 'indian-angel-network',
    name: 'Indian Angel Network (IAN) - Agro & Rural Chapter',
    type: 'Angel Network',
    logoBadge: '🤝 IAN',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Handicraft & Artisan', 'Rural Services'],
    ticketSizeRange: '₹15 Lakhs - ₹3 Crores',
    minTicketInr: 1500000,
    maxTicketInr: 30000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Punjab', 'Gujarat', 'Tamil Nadu', 'Delhi-NCR', 'Uttar Pradesh'],
    contactPerson: 'Lead Deal Partner - Agritech & Food',
    contactEmail: 'applications@indianangelnetwork.com',
    contactPhone: '+91 11 4075 5600',
    websiteUrl: 'https://www.indianangelnetwork.com',
    officeLocation: 'New Delhi / Regional Chapters in Pune, Mumbai, Ahmedabad & Chennai',
    description: 'India’s largest horizontal angel network with seasoned entrepreneurs actively backing regional manufacturing and agro-processing units.',
    portfolioHighlights: ['FarMart', 'Boutique Spirit Brands', 'FabAlley', 'Superbottoms']
  },
  {
    id: 'mumbai-angels',
    name: 'Mumbai Angels Network (360 ONE)',
    type: 'Angel Network',
    logoBadge: '🏙️ MA',
    focusCategories: ['Food Processing', 'Rural Energy', 'Agriculture Value-Add', 'Handicraft & Artisan'],
    ticketSizeRange: '₹20 Lakhs - ₹4 Crores',
    minTicketInr: 2000000,
    maxTicketInr: 40000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Gujarat', 'Goa', 'Karnataka'],
    contactPerson: 'Portfolio Sourcing Desk',
    contactEmail: 'deals@mumbaiangels.com',
    contactPhone: '+91 22 4246 8000',
    websiteUrl: 'https://www.mumbaiangels.com',
    officeLocation: 'One BKC, Bandra Kurla Complex, Mumbai',
    description: 'Premier angel syndicate with dedicated focus on high-margin consumer food, organic processing, and sustainable agro packaging.',
    portfolioHighlights: ['Organic Smokes', 'FreshBus', 'Zingavita', 'Green Cure']
  },
  {
    id: 'caspian-debt-equity',
    name: 'Caspian Impact Investments',
    type: 'Agri & Impact VC',
    logoBadge: '🏦 CP',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Rural Services'],
    ticketSizeRange: '₹25 Lakhs - ₹5 Crores',
    minTicketInr: 2500000,
    maxTicketInr: 50000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'Andhra Pradesh', 'Karnataka'],
    contactPerson: 'Credit & Equity Sourcing Desk',
    contactEmail: 'info@caspian.in',
    contactPhone: '+91 40 6629 7000',
    websiteUrl: 'https://www.caspian.in',
    officeLocation: 'Banjara Hills, Hyderabad & Mumbai',
    description: 'Provides tailored debt and equity financing for growing MSMEs, farmer producer clusters, and cold chain enterprises.',
    portfolioHighlights: ['Keventer Agro', 'Banyan Nation', 'Samunnati', 'GramCover']
  },
  {
    id: 'sidbi-venture-capital',
    name: 'SIDBI Venture Capital Limited (SVCL)',
    type: 'Government & Institutional Fund',
    logoBadge: '🏛️ SV',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Rural Energy', 'Handicraft & Artisan', 'Rural Services'],
    ticketSizeRange: '₹50 Lakhs - ₹12 Crores',
    minTicketInr: 5000000,
    maxTicketInr: 120000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Uttar Pradesh', 'Gujarat', 'Punjab', 'Tamil Nadu', 'Bihar'],
    contactPerson: 'Nodal Officer - MSME Growth Fund',
    contactEmail: 'contact@sidbiventure.co.in',
    contactPhone: '+91 22 6753 1100',
    websiteUrl: 'https://www.sidbiventure.co.in',
    officeLocation: 'Nariman Point, Mumbai / Regional Branch Offices',
    description: 'Wholly-owned subsidiary of SIDBI managing national risk capital funds dedicated to MSME growth and industrial competitiveness.',
    portfolioHighlights: ['Regional Cold Storages', 'Spice Processors', 'Biomass Pelleting Units']
  },
  {
    id: 'native-angels-tier23',
    name: 'Native Angels Network (Tier 2/3 Rural Focus)',
    type: 'Angel Network',
    logoBadge: '🏡 NA',
    focusCategories: ['Food Processing', 'Agriculture Value-Add', 'Handicraft & Artisan', 'Rural Services'],
    ticketSizeRange: '₹5 Lakhs - ₹50 Lakhs',
    minTicketInr: 500000,
    maxTicketInr: 5000000,
    coveredRegions: ['Pan-India', 'Tamil Nadu', 'Maharashtra', 'Karnataka', 'Kerala', 'Telangana'],
    contactPerson: 'Regional Chapter Coordinator',
    contactEmail: 'connect@nativelead.org',
    contactPhone: '+91 452 439 1234',
    websiteUrl: 'https://www.nativelead.org',
    officeLocation: 'Madurai & Coimbatore, with West India desk in Pune',
    description: 'Specialized angel platform enabling local native leaders, doctors, and industrialists to invest directly into rural & Tier 2/3 founders.',
    portfolioHighlights: ['Traditional Millet Snacking', 'Jaggery Processing', 'Banana Bark Crafts', 'Cold Chain Micro-Vans']
  },
  {
    id: 'social-alpha',
    name: 'Social Alpha (Tata Trusts & Govt of India)',
    type: 'Seed Accelerator',
    logoBadge: '🔬 SA',
    focusCategories: ['Agriculture Value-Add', 'Rural Energy', 'Food Processing', 'Rural Services'],
    ticketSizeRange: '₹15 Lakhs - ₹1.5 Crores',
    minTicketInr: 1500000,
    maxTicketInr: 15000000,
    coveredRegions: ['Pan-India', 'Maharashtra', 'Assam', 'Bihar', 'Uttar Pradesh', 'Odisha'],
    contactPerson: 'Head of Agritech & Livelihoods Architecture',
    contactEmail: 'grants@socialalpha.org',
    contactPhone: '+91 80 4123 9876',
    websiteUrl: 'https://www.socialalpha.org',
    officeLocation: 'Bengaluru & New Delhi',
    description: 'Foundation backed by Tata Trusts and the Department of Biotechnology supporting high-impact rural and farmer livelihood enterprises with capital and lab grants.',
    portfolioHighlights: ['Tan90 Thermal Cold Storage', 'CoolCrop Solar Refrigeration', 'Promethean Power']
  }
];

export interface InvestorMatchResult {
  investor: InvestorProfile;
  matchScore: number;
  matchReasons: string[];
}

/**
 * Filter and rank investors based on business category and location.
 */
export function matchInvestorsForBusiness(
  category: string,
  state: string,
  district?: string
): InvestorMatchResult[] {
  return INVESTORS_DATABASE.map((investor) => {
    let score = 65;
    const reasons: string[] = [];

    // Category match
    if (investor.focusCategories.includes(category)) {
      score += 20;
      reasons.push(`Direct focus on ${category} investments`);
    } else {
      score += 5;
    }

    // Regional match
    if (investor.coveredRegions.includes(state)) {
      score += 15;
      reasons.push(`Active investment track record in ${state}`);
    } else if (investor.coveredRegions.includes('Pan-India')) {
      score += 10;
      reasons.push(`Pan-India investment mandate`);
    }

    // Special bonuses
    if (category === 'Food Processing' && investor.id === 'omnivore-partners') {
      score = Math.min(98, score + 5);
      reasons.push('Category leading agrifood venture capital partner');
    }
    if (investor.id === 'nabventures') {
      score = Math.min(97, score + 4);
      reasons.push('Institutional priority for rural bank-linked projects');
    }

    return {
      investor,
      matchScore: Math.min(99, score),
      matchReasons: reasons
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
