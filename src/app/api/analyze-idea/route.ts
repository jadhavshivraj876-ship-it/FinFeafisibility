import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { REAL_INVESTORS_DATABASE } from '@/data/investors';
import dns from 'node:dns';

try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {}

const CANDIDATE_MODELS = [
  'gemini-flash-lite-latest',
  'gemini-3.6-flash',
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash'
];

export interface AiAnalysisResponse {
  title: string;
  domain: string;
  category: string;
  description: string;
  projectCost: number;
  capexItems: Array<{ item: string; cost: number }>;
  monthlyOpexItems: Array<{ item: string; cost: number }>;
  projectedMonthlyRevenue: number;
  averageMarginPercent: number;
  powerRequiredHp: number;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  risks: Array<{ risk: string; impact: 'High' | 'Medium' | 'Low'; mitigation: string }>;
  rawMaterials: string[];
  statutoryLicenses: string[];
  eligibleSchemes: Array<{
    name: string;
    code: string;
    subsidyPercent: number;
    description: string;
  }>;
  matchedInvestors: Array<{
    id: string;
    name: string;
    type: string;
    ticketSizeRange: string;
    matchScore: number;
    thesis: string;
    websiteUrl: string;
    pitchAdvice: string;
  }>;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea, location, userApiKey } = body;

    const cleanIdea = (idea && typeof idea === 'string') ? idea.trim() : '';
    const alphaChars = cleanIdea.replace(/[^a-zA-Z]/g, '');

    if (alphaChars.length < 3) {
      return NextResponse.json({ 
        error: 'Please enter a valid enterprise idea with at least 3 letters (e.g. Cold Pressed Oil Unit, Bakery Shop, EV Charging Station, Dairy Farm).' 
      }, { status: 400 });
    }

    const targetLocation = (location && typeof location === 'string') ? location.trim() : 'India';
    const apiKey = (userApiKey && userApiKey.trim().length > 10) 
      ? userApiKey.trim() 
      : (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `You are a Senior Rural Banking, MSME Financial Appraisal AI Specialist, and Industrial Project Consultant in India.
Conduct a rigorous, authentic, real-world feasibility study and bankable Detailed Project Report (DPR) appraisal for the enterprise idea below.

CRITICAL INSTRUCTIONS FOR SCALE, COST & RESEARCH:
1. STRICT REALISTIC COST CALIBRATION:
   Determine the authentic capital scale required for this specific enterprise type:
   - Street food stalls, tea kiosks, snack carts, fast food stalls, hawker setups: ₹80,000 to ₹3,50,000 total project cost (Schemes: PM SVANidhi or MUDRA Shishu up to ₹50k/₹5L).
   - Micro service, beauty parlor, salon, mobile/laptop repair, tailoring: ₹1,50,000 to ₹6,00,000 total project cost (Scheme: MUDRA Shishu/Kishore).
   - Small grocery, retail shop, bakery, cyber cafe, coaching center: ₹3,00,000 to ₹10,00,000 total project cost (Scheme: MUDRA Kishore/Tarun, PMEGP).
   - Micro agro-processing, cold pressed oil, honey processing, dairy, spice mill: ₹8,00,000 to ₹25,00,000 total project cost (Scheme: PMFME 35% or PMEGP 35%).
   - Medium commercial manufacturing, fabrication, packaging unit: ₹25,00,000 to ₹60,00,000 total project cost (Scheme: PMEGP 35%).
   - Heavy capital ventures (petrol pump / fuel retail outlet, automated cold storage, large warehouse): ₹75,00,000 to ₹2,50,00,000 total project cost (Scheme: Commercial Bank Term Loan, AIF 3% interest subvention).

   DO NOT assign 15 or 16 Lakhs to everything! Tailor projectCost, capexItems, monthlyOpexItems, and projectedMonthlyRevenue accurately to the specific business concept!

2. CAPEX INTEGRITY:
   capexItems MUST be realistic, specific equipment names with capacities and their sum MUST equal projectCost.

3. REVENUE & UNIT ECONOMICS:
   projectedMonthlyRevenue and monthlyOpexItems must reflect genuine business operations. Ensure monthly revenue is comfortably higher than monthly opex so Debt Service Coverage Ratio (DSCR) is bank-viable (DSCR between 1.5 and 2.5).

4. HYPER-LOCAL RESEARCH FOR "${targetLocation}":
   Cite real local agricultural mandis, APMCs, industrial zones (MIDC), or transit corridors in or near ${targetLocation}.

5. LICENSES & SCHEMES:
   Detail exact statutory permits (e.g. FSSAI Basic/State for food, PESO/Explosives for petrol pumps, Trade NOC, Udyam MSME, etc.) and matching government schemes.

Business Concept: "${idea.trim()}"
Target Location/Region: "${targetLocation}"

Return ONLY a valid, raw JSON object (NO markdown fences, NO backticks, NO surrounding text) adhering strictly to this structure:
{
  "title": "A refined, professional name for this enterprise",
  "domain": "Precise sector name (e.g., Quick Service & Street Retail, Fuel & Energy Retail, Agro-Biotech, Precision Engineering, etc.)",
  "category": "High level category (Food Services | Food Processing | Rural Energy | Retail & Services | Light Engineering | Agri-Tech)",
  "description": "3-4 sentences detailing why this enterprise is feasible in ${targetLocation}, highlighting raw material / supply availability, customer footfall, and unit economics.",
  "projectCost": 200000,
  "capexItems": [
    {"item": "Specific Machine / Setup Item 1 with Capacity Spec", "cost": 100000},
    {"item": "Specific Machine / Setup Item 2 with Capacity Spec", "cost": 60000},
    {"item": "Tools, Display, Utensils or Auxiliary Rig", "cost": 40000}
  ],
  "monthlyOpexItems": [
    {"item": "Primary Raw Material Procurement (Specific Item & Volume)", "cost": 35000},
    {"item": "Labor / Operator Wages", "cost": 15000},
    {"item": "Utilities, Fuel & Energy Load", "cost": 6000},
    {"item": "Packaging & Freight Logistics", "cost": 4000}
  ],
  "projectedMonthlyRevenue": 80000,
  "averageMarginPercent": 25,
  "powerRequiredHp": 2,
  "swot": {
    "strengths": ["Hyper-local strength 1", "Strength 2", "Strength 3"],
    "weaknesses": ["Operational weakness 1", "Weakness 2", "Weakness 3"],
    "opportunities": ["Market opportunity in ${targetLocation}", "Opportunity 2", "Opportunity 3"],
    "threats": ["External threat 1", "Threat 2", "Threat 3"]
  },
  "risks": [
    {"risk": "Specific operational risk 1", "impact": "High", "mitigation": "Practical mitigation 1"},
    {"risk": "Specific operational risk 2", "impact": "Medium", "mitigation": "Practical mitigation 2"},
    {"risk": "Specific operational risk 3", "impact": "Medium", "mitigation": "Practical mitigation 3"}
  ],
  "rawMaterials": ["Specific raw material 1", "Specific packaging grade material 2", "Consumable 3"],
  "statutoryLicenses": ["Specific FSSAI / PESO / PCB / Dept License 1", "License 2", "License 3", "License 4"],
  "eligibleSchemes": [
    {
      "name": "Scheme Name",
      "code": "CODE",
      "subsidyPercent": 35,
      "description": "Eligibility and subsidy terms"
    }
  ],
  "matchedInvestors": [
    {
      "id": "slug-name",
      "name": "Exact Name of Real Verified VC / Angel Network / Institutional MSME Fund / Micro-Lender in India relevant to this domain & ticket size",
      "type": "Venture Capital | Angel Network | Debt & Working Capital Fund | Government & Institutional Fund | Seed Accelerator",
      "ticketSizeRange": "Realistic range matching this project cost (e.g., ₹50k-₹10L for stalls/shops, ₹50L-₹5Cr for manufacturing/fuel/scale)",
      "matchScore": 95,
      "thesis": "Specific reason why this fund or financing institution is an exact match for this business model in ${targetLocation}.",
      "websiteUrl": "https://...",
      "pitchAdvice": "Concrete, actionable advice on what this investor evaluates during the pitch for this specific concept."
    }
  ]
}

Make all monetary values realistic Indian Rupee numbers (integers only, no symbols). Ensure sum of capexItems equals projectCost. Include 3-4 realistic matchedInvestors.`;

        let responseText = '';
        let modelUsed = '';

        // Iterate through fast, high-availability candidate models
        for (const model of CANDIDATE_MODELS) {
          try {
            const response = await ai.models.generateContent({
              model,
              contents: prompt,
            });
            if (response && response.text && response.text.trim().length > 10) {
              responseText = response.text;
              modelUsed = model;
              break;
            }
          } catch (modelErr: any) {
            console.warn(`Model ${model} notice:`, modelErr?.message || modelErr);
          }
        }

        if (responseText) {
          const cleaned = responseText
            .replace(/```json/gi, '')
            .replace(/```/g, '')
            .trim();

          const parsed = JSON.parse(cleaned);

          // Use dynamically synthesized investors from AI if provided, or match from our verified database
          const dynamicInvestors = Array.isArray(parsed.matchedInvestors) && parsed.matchedInvestors.length >= 2
            ? parsed.matchedInvestors.map((inv: any, i: number) => ({
                id: inv.id || `inv-${i + 1}`,
                name: inv.name || 'Verified Sector Fund',
                type: inv.type || 'Angel Network',
                ticketSizeRange: inv.ticketSizeRange || `₹${Math.round(parsed.projectCost * 0.4 / 100000)}L - ₹${Math.round(parsed.projectCost * 2 / 100000)}L`,
                matchScore: Number(inv.matchScore) || (96 - i * 3),
                thesis: inv.thesis || `Active investment thesis backing viable ${parsed.domain} enterprises.`,
                websiteUrl: (inv.websiteUrl && inv.websiteUrl.startsWith('http')) ? inv.websiteUrl : 'https://www.startupindia.gov.in',
                pitchAdvice: inv.pitchAdvice || `Highlight clear DSCR and hyper-local supply chain in ${targetLocation}.`
              }))
            : matchRealInvestors(parsed.category, parsed.domain, targetLocation, parsed.projectCost);

          const result: AiAnalysisResponse = {
            ...parsed,
            matchedInvestors: dynamicInvestors,
          };

          return NextResponse.json({ success: true, data: result, engine: modelUsed });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API calls failed, using intelligent fallback generator:', geminiError?.message);
      }
    }

    // High-Fidelity Intelligent Semantic Fallback (runs if offline or temporary network issue)
    const fallbackData = generateIntelligentFallback(idea.trim(), targetLocation);
    return NextResponse.json({ 
      success: true, 
      data: fallbackData, 
      engine: 'intelligent-semantic-engine'
    });

  } catch (err: any) {
    console.error('API /api/analyze-idea error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to analyze business concept.' }, { status: 500 });
  }
}

// Helper to select and rank real verified investors based on sector and location
function matchRealInvestors(
  category: string, 
  domain: string, 
  location: string, 
  projectCost: number
) {
  const all = REAL_INVESTORS_DATABASE;
  const cost = projectCost || 1500000;
  const catLower = (category || '').toLowerCase();
  const domLower = (domain || '').toLowerCase();

  // Score investors by sector relevance and ticket scale
  const scored = all.map(inv => {
    let score = 65;
    const invText = (inv.description + ' ' + inv.focusSectors.join(' ') + ' ' + inv.focusCategories.join(' ')).toLowerCase();

    // Scale appropriateness
    if (cost >= inv.minTicketInr && cost <= inv.maxTicketInr) {
      score += 20;
    } else if (cost < inv.minTicketInr && inv.type.includes('Debt')) {
      score += 15;
    }

    // Direct domain and sector keywords
    const keywords = domLower.split(/\s+/).filter(w => w.length > 3);
    if (keywords.some(k => invText.includes(k))) {
      score += 18;
    } else if (invText.includes(catLower)) {
      score += 10;
    }

    return {
      id: inv.id,
      name: inv.name,
      type: inv.type,
      ticketSizeRange: inv.ticketSizeRange,
      matchScore: Math.min(98, Math.max(70, score)),
      thesis: inv.description,
      websiteUrl: inv.websiteUrl,
      pitchAdvice: `Highlight your hyper-local supply chain in ${location}, projected ₹${Math.round(cost / 100000)}L CapEx asset-backing, and bank DSCR viability.`
    };
  });

  return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
}

// Deep Intelligent Semantic Generator for non-API / offline requests
function generateIntelligentFallback(idea: string, location: string): AiAnalysisResponse {
  const cleanIdea = idea.charAt(0).toUpperCase() + idea.slice(1);
  const words = cleanIdea.toLowerCase().split(/\s+/);

  let domain = 'Agro & Food Processing';
  let category = 'Food Processing';
  let powerHp = 7.5;
  let machinery: Array<{ item: string; cost: number }> = [];
  let rawMaterialsList: string[] = [];
  let licensesList: string[] = [];
  let schemesList: Array<{ name: string; code: string; subsidyPercent: number; description: string }> = [];

  // 1. Food stall / street cart / kiosk / tea / fast food
  if (words.some(w => ['food', 'stall', 'cart', 'kiosk', 'tea', 'chai', 'snack', 'vada', 'pav', 'dosa', 'burger', 'sandwich', 'juice', 'tiffin'].includes(w))) {
    domain = 'Quick Service Restaurant & Street Food Retail';
    category = 'Food Services';
    powerHp = 1.5;
    machinery = [
      { item: 'Custom Stainless Steel Food Cart / Kiosk with Canopy & Wheels', cost: 75000 },
      { item: 'Commercial LPG Triple-Burner & Griddle / Tawa Setup', cost: 25000 },
      { item: 'Display Counter with Glass Sneeze Guard & Warming Lamp', cost: 20000 },
      { item: 'Deep Freezer & Insulated Ingredient Storage Box', cost: 35000 },
      { item: 'Cooking Utensils, Cutlery, POS Scanner & Initial Working Reserve', cost: 25000 }
    ];
    rawMaterialsList = [
      'Fresh local vegetables, grains, flour, and cooking oil',
      'Food-grade eco-friendly paper plates, bags, and cups',
      'Cooking gas (Commercial LPG cylinder refills) and condiments'
    ];
    licensesList = [
      'FSSAI Basic Food Business Registration (Online, Instant)',
      'Local Municipal Corporation / Nagar Palika Street Vendor Trade NOC',
      'Udyam MSME Registration (Free under Micro Retail)',
      'Fire Safety Clearance for Commercial LPG Gas Cylinder'
    ];
    schemesList = [
      {
        name: 'PM Street Vendor AtmaNirbhar Nidhi',
        code: 'PMSVANidhi',
        subsidyPercent: 7,
        description: 'Collateral-free working capital loan up to ₹50,000 with 7% interest subsidy on regular repayments.'
      },
      {
        name: 'Pradhan Mantri Mudra Yojana (Shishu Tier)',
        code: 'MUDRA-SHISHU',
        subsidyPercent: 0,
        description: 'Collateral-free institutional bank loans up to ₹50,000 with zero processing fees.'
      }
    ];
  } 
  // 2. Petrol pump / fuel station / gas station
  else if (words.some(w => ['petrol', 'pump', 'fuel', 'diesel', 'gas', 'cng', 'ev', 'charging'].includes(w))) {
    domain = 'Automotive Fuel & Petroleum Retail';
    category = 'Energy Retail';
    powerHp = 25;
    machinery = [
      { item: 'Land Development, Concrete Driveway & Steel Canopy Structure', cost: 4500000 },
      { item: 'Underground Heavy-Gauge Fuel Storage Tanks (MS/HSD 40KL)', cost: 3000000 },
      { item: 'Electronic Multi-Product Fuel Dispensing Units (2 Units x 4 Nozzles)', cost: 2400000 },
      { item: 'Submersible Fuel Pumps, Flameproof Wiring & 25 kVA Silent DG Set', cost: 1200000 },
      { item: 'Fire Hydrant System, Explosion-Proof Automation & POS Billing Kiosk', cost: 900000 }
    ];
    rawMaterialsList = [
      'Bulk Motor Spirit (Petrol) and High Speed Diesel (HSD) from Oil Marketing Company',
      'Automotive lubricants, coolants, and AdBlue urea exhaust fluid',
      'Calibration testing measures and safety foam refills'
    ];
    licensesList = [
      'Petroleum and Explosives Safety Organization (PESO) Storage & Dispensing License',
      'District Magistrate No Objection Certificate (DM NOC)',
      'National Highway Authority of India (NHAI) / PWD Access Permission',
      'State Pollution Control Board Consent (Orange Category)'
    ];
    schemesList = [
      {
        name: 'Scheduled Commercial Bank Fuel Retail Term Loan',
        code: 'BANK-TERM',
        subsidyPercent: 0,
        description: 'Long-term project finance for authorized retail fuel dealerships up to 75% of asset CapEx.'
      },
      {
        name: 'Prime Minister Employment Generation Programme',
        code: 'PMEGP',
        subsidyPercent: 25,
        description: 'Up to 25% margin money subsidy on eligible service and commercial infrastructure up to ₹20 Lakhs.'
      }
    ];
  }
  // 3. Honey Processing
  else if (words.some(w => ['honey', 'apiary', 'bee', 'beekeeping'].includes(w))) {
    domain = 'Organic Apiary & Honey Value-Addition';
    category = 'Food Processing';
    powerHp = 5;
    machinery = [
      { item: 'SS-304 Jacketed Honey Liquefier & 25-Micron Filtration Unit (200 kg/batch)', cost: 520000 },
      { item: 'Vacuum Falling-Film Moisture Reducer & Condenser System', cost: 380000 },
      { item: 'Semi-Automatic Twin-Head Piston Bottle Filler & Induction Sealer', cost: 240000 },
      { item: 'Quality Testing Lab Refractometer, HMF Analyzer & Storage Vats', cost: 160000 },
      { item: 'Food-Grade Cleanroom Partitioning & Electrical Load Line', cost: 200000 }
    ];
    rawMaterialsList = [
      `Raw comb and forest honey sourced from ${location} apiary clusters`,
      'Food-grade flint glass bottles (250g, 500g, 1kg) and induction-lined caps',
      'Tamper-evident shrink sleeves and multi-layer shipping cartons'
    ];
    licensesList = [
      'FSSAI State Manufacturing License (Category 04: Honey & Syrups)',
      'AGMARK Quality Grading & Marking Authorization',
      'State Pollution Control Board Consent (Green Category)',
      'Legal Metrology (Packaged Commodities) Registration'
    ];
    schemesList = [
      {
        name: 'PM Formalisation of Micro Food Processing Enterprises',
        code: 'PMFME',
        subsidyPercent: 35,
        description: 'Credit-linked 35% capital subsidy up to ₹10 Lakhs with special ODOP backing.'
      },
      {
        name: 'National Beekeeping & Honey Mission',
        code: 'NBHM',
        subsidyPercent: 40,
        description: 'Ministry of Agriculture grant assistance for scientific honey extraction facilities.'
      }
    ];
  }
  // 4. Cold pressed oil
  else if (words.some(w => ['oil', 'cold', 'pressed', 'wood', 'ghani', 'mustard', 'groundnut', 'sesame'].includes(w))) {
    domain = 'Cold Pressed Wood-Ghani Edible Oil Extraction';
    category = 'Food Processing';
    powerHp = 10;
    machinery = [
      { item: 'Traditional Motorized Wood-Ghani (Mara Chekku) Cold Press Units (2 Units)', cost: 480000 },
      { item: 'Plate & Frame High-Pressure Oil Filter Press (SS-304 Contact Parts)', cost: 190000 },
      { item: 'Seed Destoner, Magnetic Separator & Seed Pre-Cleaner', cost: 150000 },
      { item: 'Semi-Automatic Volumetric Liquid Filling & Tin/Bottle Capping Machine', cost: 220000 },
      { item: 'Stainless Steel Oil Settling Tanks (1000L) & Inert Nitrogen Purger', cost: 160000 },
      { item: 'Factory Shed Flooring, 3-Phase Panel & Pre-Operative Setup', cost: 250000 }
    ];
    rawMaterialsList = [
      `Certified clean groundnut, mustard, or sesame oilseeds procured from ${location} APMC`,
      'Food-grade tin cans, amber glass bottles, and stand-up pouches with spout',
      'Food-grade filter cloth and seed hygiene consumables'
    ];
    licensesList = [
      'FSSAI State Food Manufacturing License (Category 02: Fats and Oils)',
      'State PCB Consent to Operate (Green Category - Zero Liquid Discharge)',
      'Legal Metrology Packaged Commodities Registration',
      'Udyam MSME Registration'
    ];
    schemesList = [
      {
        name: 'PM Formalisation of Micro Food Processing Enterprises',
        code: 'PMFME',
        subsidyPercent: 35,
        description: 'Up to 35% subsidy on plant and machinery for cold-pressed edible oil micro units.'
      },
      {
        name: 'Prime Minister Employment Generation Programme',
        code: 'PMEGP',
        subsidyPercent: 35,
        description: '35% margin money capital subsidy for rural manufacturing enterprises up to ₹50 Lakhs.'
      }
    ];
  }
  // 5. Salons, beauty parlors, barbers
  else if (words.some(w => ['salon', 'parlor', 'barber', 'beauty', 'hair', 'spa'].includes(w))) {
    domain = 'Personal Care & Wellness Services';
    category = 'Retail & Services';
    powerHp = 3;
    machinery = [
      { item: 'Hydraulic Styling Chairs, Shampoo Wash Stations & Mirrors', cost: 120000 },
      { item: 'Professional Hair Styling, Facial & Skin Treatment Equipment', cost: 80000 },
      { item: 'Sanitization & UV Tool Sterilization Autoclave Units', cost: 30000 },
      { item: 'Interior Ambience, Split Air Conditioning & False Ceiling Lighting', cost: 80000 },
      { item: 'Initial Cosmeceutical Inventory, Reception POS & Billing Desk', cost: 40000 }
    ];
    rawMaterialsList = [
      'Professional branded skin, hair care, and hygiene cosmetics',
      'Disposable towels, aprons, and sanitary consumables',
      'Sanitizing solutions, hair serums, and treatment kits'
    ];
    licensesList = [
      'Local Municipal / Gram Panchayat Shop & Establishment Act Registration',
      'Trade License from Health Department',
      'Udyam MSME Registration'
    ];
    schemesList = [
      {
        name: 'Pradhan Mantri Mudra Yojana (Kishore Tier)',
        code: 'MUDRA-KISHORE',
        subsidyPercent: 0,
        description: 'Collateral-free term and working capital loans between ₹50,000 and ₹5,00,000.'
      },
      {
        name: 'PMEGP (Service Sector)',
        code: 'PMEGP',
        subsidyPercent: 25,
        description: 'Up to 25-35% subsidy on service ventures up to ₹20 Lakhs in rural regions.'
      }
    ];
  }
  // 6. Grocery / Kirana / Retail
  else if (words.some(w => ['kirana', 'grocery', 'supermarket', 'mart', 'store', 'shop'].includes(w))) {
    domain = 'Retail Consumer Goods & Essential Groceries';
    category = 'Retail & Services';
    powerHp = 3;
    machinery = [
      { item: 'Heavy-Duty Powder Coated Wall Racks & Center Display Gondolas', cost: 150000 },
      { item: 'Barcode Billing Counter, Thermal Printer & POS System', cost: 45000 },
      { item: 'Commercial Glass-Door Display Chiller & Deep Freezer', cost: 65000 },
      { item: 'CCTV Security Surveillance (8 Cameras) & Power Inverter Backup', cost: 40000 },
      { item: 'Signage Board, LED Ambient Track Lighting & Store Civil Works', cost: 50000 }
    ];
    rawMaterialsList = [
      'Fast Moving Consumer Goods (FMCG), grains, spices, and packaged snacks',
      'Eco-friendly carry bags and barcode sticker rolls',
      'Refrigerated dairy and beverage inventory'
    ];
    licensesList = [
      'Shop & Establishment Act Trade License (Gumastha Dhara)',
      'FSSAI Retailer Registration (Instant Online)',
      'GST Registration (for inter-state or turnover > ₹40L)',
      'Udyam MSME Certificate'
    ];
    schemesList = [
      {
        name: 'Pradhan Mantri Mudra Yojana (Kishore Tier)',
        code: 'MUDRA-KISHORE',
        subsidyPercent: 0,
        description: 'Collateral-free bank loans up to ₹5 Lakhs for retail trading businesses.'
      }
    ];
  }
  // 7. General default
  else {
    domain = 'Agro & Rural Enterprise';
    category = 'Light Engineering';
    powerHp = 6;
    machinery = [
      { item: `Commercial Grade Processing & Production Machinery for ${cleanIdea}`, cost: 450000 },
      { item: 'Secondary Packaging, Sealing & Material Handling Setup', cost: 180000 },
      { item: 'Electrical Wiring, 3-Phase Panel & Safety Equipment', cost: 120000 },
      { item: 'Factory Shed Flooring, Partitioning & Civil Works', cost: 150000 },
      { item: 'Working Capital Margin, Initial Inventory & Contingency', cost: 100000 }
    ];
    rawMaterialsList = [
      `Primary commercial inputs for ${cleanIdea}`,
      'Protective packaging, cartons, and labels',
      'Plant consumables, lubricants, and safety gear'
    ];
    licensesList = [
      'Udyam MSME Registration Certificate',
      'State Pollution Control Board Consent to Establish/Operate',
      'Local Municipal / Gram Panchayat Trade License'
    ];
    schemesList = [
      {
        name: 'Prime Minister Employment Generation Programme',
        code: 'PMEGP',
        subsidyPercent: 35,
        description: '35% capital subsidy for rural manufacturing enterprises up to ₹50 Lakhs.'
      }
    ];
  }

  const totalCost = machinery.reduce((sum, item) => sum + item.cost, 0);
  const monthlyRevenue = Math.round(totalCost * 0.28);
  const opexItems = [
    { item: `Direct Raw Material & Goods Sourcing for ${cleanIdea}`, cost: Math.round(monthlyRevenue * 0.45) },
    { item: 'Operator & Staff Labor Wages', cost: Math.round(monthlyRevenue * 0.15) },
    { item: 'Commercial Power Load, Water & Fuel Utilities', cost: Math.round(monthlyRevenue * 0.06) },
    { item: 'Protective Packaging, Transportation & Logistics', cost: Math.round(monthlyRevenue * 0.05) },
    { item: 'Maintenance, Shop Rent & Statutory Compliance', cost: Math.round(monthlyRevenue * 0.05) }
  ];

  const matchedInvestors = matchRealInvestors(category, domain, location, totalCost);

  return {
    title: `${cleanIdea} Enterprise Unit`,
    domain,
    category,
    description: `A commercial ${cleanIdea} facility strategically established in ${location} to capitalize on hyper-local raw material availability and strong regional distribution corridors. Formatted to fulfill scheduled commercial bank lending guidelines (DSCR > 1.6) and secure eligible capital grants under government MSME schemes.`,
    projectCost: totalCost,
    capexItems: machinery,
    monthlyOpexItems: opexItems,
    projectedMonthlyRevenue: monthlyRevenue,
    averageMarginPercent: 24,
    powerRequiredHp: powerHp,
    swot: {
      strengths: [
        `Direct supply chain integration within ${location} bypassing middlemen and broker fees`,
        `Favorable operating unit economics with fast break-even inside 7-9 months`,
        `Eligible for up to 35% non-refundable government capital subsidy`
      ],
      weaknesses: [
        `Initial production requires strict calibration to maintain FSSAI / quality consistency`,
        `Dependent on consistent 3-phase commercial electrical supply during peak batches`,
        `Early distributor onboarding demands active mandi and retail marketing outreach`
      ],
      opportunities: [
        `Accelerating consumer demand for traceable, regional, high-purity ${domain} goods`,
        `Direct institutional supply agreements with regional retail chains, hotels, and FPOs`,
        `Scale potential through e-commerce packaging and export certification`
      ],
      threats: [
        `Seasonal procurement price volatility of raw materials during off-harvest windows`,
        `Unorganized local players competing on cheap, unstandardized pricing`,
        `Working capital delays if institutional B2B buyers have extended payment cycles`
      ]
    },
    risks: [
      {
        risk: 'Raw Material Seasonality & Price Surges',
        impact: 'High',
        mitigation: `Execute forward contracts with local growers and FPOs in ${location} with buffer storage.`
      },
      {
        risk: 'Machinery Downtime During Peak Processing Cycles',
        impact: 'Medium',
        mitigation: 'Establish 2-year manufacturer AMC warranty, maintain critical spare parts on-site, and train staff.'
      },
      {
        risk: 'Receivables & Working Capital Cashflow Squeeze',
        impact: 'Medium',
        mitigation: 'Utilize bank Cash Credit (CC) limits backed by CGTMSE collateral-free guarantee.'
      }
    ],
    rawMaterials: rawMaterialsList,
    statutoryLicenses: licensesList,
    eligibleSchemes: schemesList,
    matchedInvestors
  };
}
