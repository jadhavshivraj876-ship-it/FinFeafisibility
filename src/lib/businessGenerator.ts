import { BusinessTemplate, Language } from '@/types';

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
  const qLower = query.toLowerCase();

  // Determine category
  let category: BusinessTemplate['category'] = 'Food Processing';
  if (
    qLower.includes('bamboo') ||
    qLower.includes('textile') ||
    qLower.includes('handicraft') ||
    qLower.includes('garment') ||
    qLower.includes('weaving') ||
    qLower.includes('pottery') ||
    qLower.includes('toy') ||
    qLower.includes('artisan')
  ) {
    category = 'Handicraft & Artisan';
  } else if (
    qLower.includes('solar') ||
    qLower.includes('biomass') ||
    qLower.includes('briquette') ||
    qLower.includes('bio') ||
    qLower.includes('energy') ||
    qLower.includes('cold storage') ||
    qLower.includes('charging')
  ) {
    category = 'Rural Energy';
  } else if (
    qLower.includes('fertilizer') ||
    qLower.includes('feed') ||
    qLower.includes('seed') ||
    qLower.includes('coir') ||
    qLower.includes('pith') ||
    qLower.includes('compost') ||
    qLower.includes('straw') ||
    qLower.includes('waste')
  ) {
    category = 'Agriculture Value-Add';
  } else if (
    qLower.includes('service') ||
    qLower.includes('custom hiring') ||
    qLower.includes('drone') ||
    qLower.includes('repair') ||
    qLower.includes('logistics') ||
    qLower.includes('transport')
  ) {
    category = 'Rural Services';
  } else if (categoryHint) {
    category = categoryHint;
  }

  // Generate ID and clean title
  const id = `custom-${query.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30)}-${Date.now().toString().slice(-4)}`;
  const title = query.charAt(0).toUpperCase() + query.slice(1);

  // Determine realistic base project cost (between ₹7.5L to ₹20L depending on category)
  let projectCost = customCost || 1150000;
  if (!customCost) {
    if (category === 'Rural Energy') projectCost = 1650000;
    else if (category === 'Handicraft & Artisan') projectCost = 780000;
    else if (category === 'Food Processing') projectCost = 1250000;
    else if (category === 'Rural Services') projectCost = 900000;
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
    { item: 'Civil Works, Processing Shed Renovation & Flooring', cost: civilShedCost },
    { item: 'Three-Phase Electrification, Transformer/Wiring & Water Supply', cost: electrificationCost },
    { item: 'Semi-Automatic Packaging, Weighing Scales & Quality Testing Kits', cost: testingEquipCost },
    { item: 'Pre-operative Expenses, FSSAI/MSME Licensing & Contingency', cost: workingCapitalMargin }
  ];

  // Synthesize Monthly Opex items
  const monthlyRevenue = Math.round(projectCost * 0.38);
  const rawMaterialCost = Math.round(monthlyRevenue * 0.55);
  const laborCost = Math.round(monthlyRevenue * 0.14);
  const powerCost = Math.round(monthlyRevenue * 0.05);
  const packagingCost = Math.round(monthlyRevenue * 0.06);
  const transportCost = Math.round(monthlyRevenue * 0.04);

  const monthlyOpexItems = [
    { item: `Primary Raw Materials & Bulk Agro Consumables for ${title}`, cost: rawMaterialCost },
    { item: 'Plant Supervisor (1) + Semi-Skilled Operators (2) + Labor (2)', cost: laborCost },
    { item: 'Industrial Electricity Tariff & Commercial Water', cost: powerCost },
    { item: 'Branded Food-grade Packaging, Bottles/Pouches & Corrugated Boxes', cost: packagingCost },
    { item: 'Local Logistics, APMC Mandi Inward Freight & Delivery Fuel', cost: transportCost }
  ];

  const averageMargin = Math.min(36, Math.max(22, Math.round(((monthlyRevenue - (rawMaterialCost + laborCost + powerCost + packagingCost + transportCost)) / monthlyRevenue) * 100)));

  // Vernacular translations map
  const vernacular: Record<Language, string> = {
    en: title,
    hi: `${title} इकाई (मांग आधारित व्यापार)`,
    mr: `${title} प्रक्रिया उद्योग (मागणीनुसार निर्मित)`,
    te: `${title} యూనిట్`,
    ta: `${title} ஆலை`,
    gu: `${title} પ્રોજેક્ટ`,
    bn: `${title} ইউনিট`
  };

  // Synthesis of SWOT
  const swot = {
    strengths: [
      `High local demand alignment for ${title} with immediate regional consumer absorption.`,
      'Low entry barriers with favorable MSME capital subsidy eligibility under PMEGP & Mudra.',
      'Flexible production line capable of scaling output with incremental working capital.'
    ],
    weaknesses: [
      'Need for strict raw material inventory control during peak market price volatility.',
      'Initial operator skill training required to maintain consistent quality benchmarks.'
    ],
    opportunities: [
      'Direct B2B supply contracts with modern retail chains, regional Mandis, and online D2C buyers.',
      'Expansion into specialized export or value-added byproduct monetization.',
      'Brand differentiation with organic or GI tag storytelling ("Proudly Made in Rural India").'
    ],
    threats: [
      'Price competition from unorganized informal local players.',
      'Fluctuations in commercial electricity and transportation fuel tariffs.'
    ]
  };

  // Statutory Licenses
  const statutoryLicenses = [
    'Udyam MSME Online Registration (Instant & Zero Cost)',
    category === 'Food Processing' ? 'FSSAI State Manufacturing License' : 'Pollution Control Board (PCB) Consent to Establish (Green Category)',
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
    description: `Demand-driven enterprise profile for ${title}. Tailored to utilize regional raw material supply chains, maximize bank DSCR debt serviceability, and capture rural capital subsidies up to 35%.`,
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
        mitigation: 'Establish forward contracting with local APMC farmer producer organizations (FPOs).'
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
