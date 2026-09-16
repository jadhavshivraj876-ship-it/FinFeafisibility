import { BusinessTemplate, Language } from '@/types';

export interface DomainClassification {
  domain: string;
  category: BusinessTemplate['category'];
  badgeColor: string;
  description: string;
  tags: string[];
}

/**
 * Extract the business domain/industry sector dynamically from any user-provided concept.
 */
export function extractBusinessDomain(userQuery: string): DomainClassification {
  const q = userQuery.toLowerCase().trim();

  if (
    q.includes('solar') ||
    q.includes('energy') ||
    q.includes('biomass') ||
    q.includes('biogas') ||
    q.includes('briquette') ||
    q.includes('pellet') ||
    q.includes('cold storage') ||
    q.includes('cold room') ||
    q.includes('charging') ||
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
      tags: ['Artisan', 'Handloom', 'PM Vishwakarma', 'PMEGP']
    };
  }

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
      badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400',
      description: 'Shared mechanization, precision farming services, and rural logistics networks.',
      tags: ['Agri-Tech', 'Kisan Drone', 'SMAM Subsidy', 'Mudra']
    };
  }

  if (
    q.includes('compost') ||
    q.includes('vermicompost') ||
    q.includes('fertilizer') ||
    q.includes('feed') ||
    q.includes('poultry') ||
    q.includes('cattle') ||
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

  // Default to Food Processing
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
    description: `Dynamic enterprise model for ${title}. Tailored to utilize regional supply chains, satisfy bank DSCR criteria (>1.5), and secure government capital subsidies up to 35%.`,
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
