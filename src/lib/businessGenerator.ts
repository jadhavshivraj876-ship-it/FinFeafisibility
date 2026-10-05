import { BusinessTemplate, Language } from '@/types';

export interface DomainClassification {
  domain: string;
  category: BusinessTemplate['category'];
  badgeColor: string;
  description: string;
  tags: string[];
}

/**
 * Extract the business domain/industry sector adaptively from any user-provided concept.
 */
export function extractBusinessDomain(userQuery: string): DomainClassification {
  const clean = (userQuery || '').trim();
  const alphaChars = clean.replace(/[^a-zA-Z]/g, '');

  // If query is empty, only punctuation (like ','), or less than 3 alphabetic letters
  if (alphaChars.length < 3) {
    return {
      domain: 'Enter an Enterprise Concept',
      category: 'Food Processing',
      badgeColor: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700',
      description: 'Type at least 3 letters of your business idea (e.g. Cold Pressed Oil, EV Charging, Dairy Processing).',
      tags: ['Awaiting Input', 'Type Your Idea']
    };
  }

  const q = clean.toLowerCase();

  // 1. Food Stall, QSR, Restaurant, Bakery, Street Food
  if (
    q.includes('stall') ||
    q.includes('kiosk') ||
    q.includes('tea') ||
    q.includes('chai') ||
    q.includes('coffee') ||
    q.includes('cafe') ||
    q.includes('restaurant') ||
    q.includes('bakery') ||
    q.includes('snack') ||
    q.includes('fast food') ||
    q.includes('cart') ||
    q.includes('dhaba') ||
    q.includes('canteen') ||
    q.includes('catering')
  ) {
    return {
      domain: 'Quick Service Retail & Food Services',
      category: 'Food Processing',
      badgeColor: 'bg-orange-500/10 text-orange-600 border-orange-500/30 dark:text-orange-400',
      description: 'High-footfall food and beverage retail, daily cash turnaround, and micro-kiosk operations.',
      tags: ['QSR Food', 'PM SVANidhi', 'Mudra Shishu', 'Daily Cashflow']
    };
  }

  // 2. Fuel, Petrol Pump, Automotive, EV, Transport
  if (
    q.includes('petrol') ||
    q.includes('fuel') ||
    q.includes('diesel') ||
    q.includes('cng') ||
    q.includes('pump') ||
    q.includes('ev') ||
    q.includes('charging') ||
    q.includes('automobile') ||
    q.includes('garage') ||
    q.includes('workshop') ||
    q.includes('auto') ||
    q.includes('service station')
  ) {
    return {
      domain: 'Automotive Retail, Fuel & EV Infrastructure',
      category: 'Rural Services',
      badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400',
      description: 'Transit commercial hubs, automotive services, green fuel and charging infrastructure.',
      tags: ['Energy Retail', 'PESO Regulated', 'Commercial Term Loan', 'High Asset Value']
    };
  }

  // 3. Tech, Software, SaaS, IT, Digital, Web
  if (
    q.includes('software') ||
    q.includes('saas') ||
    q.includes('app') ||
    q.includes('tech') ||
    q.includes('digital') ||
    q.includes('ai') ||
    q.includes('cyber') ||
    q.includes('coding') ||
    q.includes('web') ||
    q.includes('it services')
  ) {
    return {
      domain: 'Technology, SaaS & Digital Services',
      category: 'Rural Services',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/30 dark:text-indigo-400',
      description: 'Digital solutions, software platforms, and tech-enabled enterprise automation.',
      tags: ['SaaS', 'Startup India', 'Angel/VC Eligible', 'High Scalability']
    };
  }

  // 4. Healthcare, Medical, Clinic, Pharmacy
  if (
    q.includes('clinic') ||
    q.includes('hospital') ||
    q.includes('pharma') ||
    q.includes('medical') ||
    q.includes('health') ||
    q.includes('doctor') ||
    q.includes('diagnostic') ||
    q.includes('ayurved')
  ) {
    return {
      domain: 'Healthcare, Diagnostics & Wellness',
      category: 'Rural Services',
      badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-500/30 dark:text-rose-400',
      description: 'Primary healthcare centers, diagnostic clinics, generic pharmacies, and wellness centers.',
      tags: ['Healthcare', 'Drug License', 'CGTMSE Backed', 'Essential Service']
    };
  }

  // 5. Personal Care, Salon, Beauty, Spa
  if (
    q.includes('salon') ||
    q.includes('parlor') ||
    q.includes('barber') ||
    q.includes('beauty') ||
    q.includes('hair') ||
    q.includes('spa')
  ) {
    return {
      domain: 'Personal Care & Wellness Services',
      category: 'Rural Services',
      badgeColor: 'bg-pink-500/10 text-pink-600 border-pink-500/30 dark:text-pink-400',
      description: 'Modern grooming, beauty care, cosmetology, and community wellness services.',
      tags: ['Wellness', 'Mudra Kishore', 'Fast Payback', 'Service MSME']
    };
  }

  // 6. Solar & Renewable Energy
  if (
    q.includes('solar') ||
    q.includes('energy') ||
    q.includes('biomass') ||
    q.includes('biogas') ||
    q.includes('briquette') ||
    q.includes('pellet') ||
    q.includes('cold storage') ||
    q.includes('cold room') ||
    q.includes('battery') ||
    q.includes('renewable')
  ) {
    return {
      domain: 'Rural CleanTech & Renewable Energy',
      category: 'Rural Energy',
      badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400',
      description: 'Decentralized green energy, cold chains, and renewable agro-power solutions.',
      tags: ['Solar', 'Clean Energy', 'Subsidy 35%', 'AIF Eligible']
    };
  }

  // 7. Handicrafts, Textiles & Artisanal
  if (
    q.includes('bamboo') ||
    q.includes('jute') ||
    q.includes('textile') ||
    q.includes('handicraft') ||
    q.includes('garment') ||
    q.includes('weaving') ||
    q.includes('pottery') ||
    q.includes('clay') ||
    q.includes('terracotta') ||
    q.includes('toy') ||
    q.includes('artisan') ||
    q.includes('leather') ||
    q.includes('embroidery') ||
    q.includes('wood')
  ) {
    return {
      domain: 'Handicrafts, Textiles & Artisanal',
      category: 'Handicraft & Artisan',
      badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/30 dark:text-purple-400',
      description: 'GI-tagged rural artisan crafts, handlooms, and sustainable bio-fiber value addition.',
      tags: ['Artisan', 'Handloom', 'PM Vishwakarma', 'PMEGP 35%']
    };
  }

  // 8. Custom Hiring, Drones & Logistics
  if (
    q.includes('drone') ||
    q.includes('service') ||
    q.includes('custom hiring') ||
    q.includes('rental') ||
    q.includes('repair') ||
    q.includes('logistics') ||
    q.includes('transport') ||
    q.includes('aggregation') ||
    q.includes('soil test') ||
    q.includes('warehouse')
  ) {
    return {
      domain: 'Agri-Tech, Custom Hiring & Farm Services',
      category: 'Rural Services',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/30 dark:text-cyan-400',
      description: 'Shared mechanization, precision farming services, and rural logistics networks.',
      tags: ['Agri-Tech', 'Kisan Drone', 'SMAM Subsidy', 'Mudra']
    };
  }

  // 9. Bio-Inputs, Compost, Poultry, Animal Husbandry
  if (
    q.includes('compost') ||
    q.includes('vermicompost') ||
    q.includes('fertilizer') ||
    q.includes('feed') ||
    q.includes('poultry') ||
    q.includes('cattle') ||
    q.includes('dairy') ||
    q.includes('milk') ||
    q.includes('seed') ||
    q.includes('coir') ||
    q.includes('pith') ||
    q.includes('straw') ||
    q.includes('waste') ||
    q.includes('nursery') ||
    q.includes('hydroponic') ||
    q.includes('aquaponics')
  ) {
    return {
      domain: 'Agriculture Value-Add & Bio-Inputs',
      category: 'Agriculture Value-Add',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
      description: 'Circular bio-economy, organic soil inputs, and agro-residue monetization.',
      tags: ['Agro Value-Add', 'Organic', 'PKVY', 'AIF']
    };
  }

  // Default to Commercial Manufacturing & Value Addition
  return {
    domain: 'Agro-Food Processing & Value Addition',
    category: 'Food Processing',
    badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-500/30 dark:text-teal-400',
    description: 'Post-harvest value addition, primary processing, and packaged regional specialty foods.',
    tags: ['Food Processing', 'PMFME 35%', 'FSSAI Mandated', 'High Margin']
  };
}

/**
 * Intelligent generator that turns ANY user demand or custom business query into a full,
 * bank-grade BusinessTemplate with complete capex, opex, swot, licenses, and scheme mapping.
 */
export function generateDemandBusinessTemplate(
  userQuery: string,
  categoryHint?: BusinessTemplate['category'],
  customCost?: number
): BusinessTemplate {
  const query = userQuery.trim();
  const domainInfo = extractBusinessDomain(query);
  const category = categoryHint || domainInfo.category;

  // Generate clean ID and title
  const id = `custom-${query.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}-${Date.now().toString().slice(-4)}`;
  const title = query.charAt(0).toUpperCase() + query.slice(1);

  // Determine realistic base project cost
  let projectCost = customCost || 1150000;
  if (!customCost) {
    if (category === 'Rural Energy') projectCost = 1650000;
    else if (category === 'Handicraft & Artisan') projectCost = 780000;
    else if (category === 'Food Processing') projectCost = 1250000;
    else if (category === 'Rural Services') projectCost = 950000;
    else projectCost = 1050000;
  }

  // Synthesize Capex items
  const machineryCost = Math.round(projectCost * 0.52);
  const civilShedCost = Math.round(projectCost * 0.22);
  const electrificationCost = Math.round(projectCost * 0.08);
  const testingEquipCost = Math.round(projectCost * 0.08);
  const workingCapitalMargin = Math.round(projectCost * 0.10);

  const capexItems = [
    { item: `Core Production Machinery & Processing Equipment for ${title}`, cost: machineryCost },
    { item: 'Civil Works, Processing Shed Renovation & Sanitary Flooring', cost: civilShedCost },
    { item: 'Three-Phase Industrial Electrification & Transformer Setup', cost: electrificationCost },
    { item: 'Semi-Automatic Packaging, Weighing Scales & Quality Testing Kits', cost: testingEquipCost },
    { item: 'Pre-operative Expenses, Regulatory Licensing & Contingency', cost: workingCapitalMargin }
  ];

  // Synthesize Monthly Opex items
  const monthlyRevenue = Math.round(projectCost * 0.38);
  const rawMaterialCost = Math.round(monthlyRevenue * 0.52);
  const laborCost = Math.round(monthlyRevenue * 0.15);
  const powerCost = Math.round(monthlyRevenue * 0.05);
  const packagingCost = Math.round(monthlyRevenue * 0.06);
  const transportCost = Math.round(monthlyRevenue * 0.04);

  const monthlyOpexItems = [
    { item: `Primary Raw Materials & Consumables for ${title}`, cost: rawMaterialCost },
    { item: 'Plant Supervisor (1) + Machine Operators (2) + Semi-skilled Helpers (2)', cost: laborCost },
    { item: 'Industrial Electricity Tariff & Utilities', cost: powerCost },
    { item: 'Standard Branded Packaging, Barcode Labels & Corrugated Boxes', cost: packagingCost },
    { item: 'Local Inward Freight, Mandi Transport & Fuel', cost: transportCost }
  ];

  const averageMargin = Math.min(36, Math.max(22, Math.round(((monthlyRevenue - (rawMaterialCost + laborCost + powerCost + packagingCost + transportCost)) / monthlyRevenue) * 100)));

  // Vernacular translations map
  const vernacular: Record<Language, string> = {
    en: title,
    hi: `${title} इकाई (मांग आधारित उद्योग)`,
    mr: `${title} प्रक्रिया उद्योग (मागणीनुसार निर्मित)`,
    te: `${title} పరిశ్రమ`,
    ta: `${title} ஆலை`,
    gu: `${title} પ્રોજેક્ટ`,
    bn: `${title} ইউনিট`
  };

  // Synthesis of SWOT
  const swot = {
    strengths: [
      `High local demand alignment for ${title} with immediate regional consumer & B2B absorption.`,
      'Low entry barriers with favorable capital subsidy eligibility under PMEGP, PMFME, and Mudra.',
      'Modular production line capable of scaling output with incremental working capital.'
    ],
    weaknesses: [
      'Need for strict raw material inventory control during market price volatility.',
      'Initial operator training required to maintain consistent quality benchmarks.'
    ],
    opportunities: [
      'Direct B2B supply contracts with modern retail chains, regional Mandis, and D2C online buyers.',
      'Expansion into specialized regional branding ("Proudly Produced in Rural India").',
      'Value-added byproduct monetization to boost net margins.'
    ],
    threats: [
      'Price competition from unorganized informal local vendors.',
      'Fluctuations in commercial electricity tariffs and freight costs.'
    ]
  };

  // Statutory Licenses
  const statutoryLicenses = [
    'Udyam MSME Online Registration (Instant & Zero Cost)',
    category === 'Food Processing' ? 'FSSAI State Manufacturing License' : 'State Pollution Control Board (PCB) Consent to Establish (Green Category)',
    'Gram Panchayat / Municipal Trade NOC',
    'GST Registration for Inter-State Supply',
    'Commercial Three-Phase Power Connection (DISCOM)'
  ];

  // Recommended Schemes
  const recommendedSchemes = [
    'pmegp-rural',
    category === 'Food Processing' ? 'pmfme-food' : 'mudra-tarun',
    'stand-up-india'
  ];

  return {
    id,
    title,
    vernacular,
    category,
    description: `Enterprise model for ${title}. Tailored to utilize regional supply chains, satisfy bank DSCR criteria (>1.5), and secure government capital subsidies up to 35%.`,
    rawMaterials: [
      `Primary Raw Materials for ${title}`,
      'Packaging materials & food-grade containers',
      'Protective consumables & sanitization supplies'
    ],
    landRequiredSqFt: category === 'Rural Energy' ? 1200 : 800,
    powerRequiredHp: category === 'Rural Energy' ? 15 : 7.5,
    laborRequired: 4,
    defaultProjectCost: projectCost,
    capexItems,
    monthlyOpexItems,
    projectedMonthlyRevenue: monthlyRevenue,
    averageMarginPercent: averageMargin,
    swot,
    risks: [
      {
        risk: 'Raw material price inflation during non-harvest seasons',
        impact: 'Medium',
        mitigation: 'Establish forward procurement contracts with local APMC farmer producer organizations (FPOs).'
      },
      {
        risk: 'Working capital delay during customer credit terms',
        impact: 'Low',
        mitigation: 'Utilize Mudra / PMEGP working capital cash credit limit with 60-day turnover.'
      }
    ],
    statutoryLicenses,
    recommendedSchemes
  };
}
