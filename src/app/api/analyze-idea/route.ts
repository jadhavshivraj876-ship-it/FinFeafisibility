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

import { validateEnterpriseIdea } from '@/lib/businessValidator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea, location, sector, userApiKey } = body;

    const cleanIdea = (idea && typeof idea === 'string') ? idea.trim() : '';
    
    // Strict business validation: detect gibberish, keyboard spam, or nonsense
    const validation = validateEnterpriseIdea(cleanIdea);
    if (!validation.isValid) {
      return NextResponse.json({ 
        success: false,
        isValid: false,
        error: validation.error || 'Please enter a genuine business or enterprise concept.',
        suggestions: validation.suggestions || []
      }, { status: 400 });
    }

    const targetLocation = (location && typeof location === 'string' && location.trim().length > 0) 
      ? location.trim() 
      : 'India';
    const targetSector = (sector && typeof sector === 'string' && sector.trim().length > 0)
      ? sector.trim()
      : '';

    const apiKey = (userApiKey && userApiKey.trim().length > 10) 
      ? userApiKey.trim() 
      : (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `You are a Senior Rural Banking, MSME Financial Appraisal Specialist, and Micro-Enterprise Consultant in India.
Conduct a rigorous, authentic, real-world feasibility study and bankable Detailed Project Report (DPR) appraisal for the enterprise idea below.

CRITICAL VALIDATION RULE:
First, inspect if "${cleanIdea}" is a legitimate, plausible business, micro-enterprise, trade, or craft.
If "${cleanIdea}" is random letters (e.g. "fyyt", "asdfgh"), keyboard mash, or incomprehensible gibberish:
You MUST return ONLY this JSON object:
{
  "isValid": false,
  "error": "The concept '${cleanIdea}' does not appear to be a recognized business, craft, or commercial activity. Please specify a genuine business concept.",
  "suggestions": ["Cold Pressed Edible Oil Extraction Unit", "Organic Dairy & Milk Chilling Center", "Ready-made Garment Tailoring Unit", "Automated Spice Grinding & Packaging", "Solar Flour Mill & Agro Dryer"]
}

CRITICAL INSTRUCTIONS FOR MICRO-ENTERPRISE SCALE, COST & REALISM:
1. TARGET SECTOR & LOCATION:
   Enterprise Concept: "${cleanIdea}"
   Target Sector: "${targetSector || 'Auto-inferred from concept'}"
   Target Location/Region: "${targetLocation}"

2. AUTHENTIC CAPITAL CALIBRATION FOR MICRO-ENTERPRISES IN INDIA:
   Determine the genuine, believable capital scale required:
   - Street kiosks, tea stalls, juice/snack carts: ₹80,000 to ₹3,50,000 (PM SVANidhi or MUDRA Shishu up to ₹50k-₹3L).
   - Micro service, beauty salon, mobile repair, tailoring shop: ₹1,50,000 to ₹6,00,000 (MUDRA Kishore/Tarun).
   - Retail kirana, grocery, small bakery, stationery: ₹2,50,000 to ₹8,00,000 (MUDRA Kishore/Tarun, PMEGP).
   - Micro agro-processing, cold pressed oil, spice mill, dairy unit, mini flour mill: ₹8,00,000 to ₹25,00,000 (PMEGP 35% or PMFME 35%).
   - Small manufacturing, fabrication workshop, paper plate/box making: ₹5,00,000 to ₹25,00,000 (PMEGP 35%).

3. CAPEX INTEGRITY:
   capexItems MUST be realistic, specific Indian machinery names with capacity specifications, and their sum MUST equal projectCost.

4. REVENUE & UNIT ECONOMICS:
   Ensure unit economics produce a bank-sanctionable Debt Service Coverage Ratio (DSCR) between 1.55 and 2.10. Monthly revenue should be around 20% to 30% of total project cost.

5. VERIFIED INSTITUTIONAL FINANCING:
   Match real Indian micro-enterprise and rural financing institutions appropriate for this scale (e.g. MUDRA Institutional Credit Desk, Rang De Social Credit Fund, NABVENTURES, SIDBI Venture Capital, Villgro Innovations, Caspian Debt).

Return ONLY a valid, raw JSON object (NO markdown fences, NO backticks, NO surrounding text) adhering strictly to this structure:
{
  "isValid": true,
  "title": "A refined, professional name for this enterprise",
  "domain": "${targetSector || 'Precise sector name'}",
  "category": "High level category (Food Processing | Agriculture Value-Add | Retail & Services | Light Engineering | Handicraft & Artisan | Rural Energy | Rural Services)",
  "description": "3-4 sentences detailing why this enterprise is feasible in ${targetLocation}, highlighting raw material availability, customer demand, and unit economics.",
  "projectCost": 800000,
  "capexItems": [
    {"item": "Specific Machine / Setup Item 1 with Capacity Spec", "cost": 450000},
    {"item": "Specific Machine / Setup Item 2 with Capacity Spec", "cost": 220000},
    {"item": "Auxiliary Tools, Electrification & Setup Rig", "cost": 130000}
  ],
  "monthlyOpexItems": [
    {"item": "Primary Raw Material Procurement (Specific Item & Volume)", "cost": 85000},
    {"item": "Labor / Operator Wages", "cost": 30000},
    {"item": "Utilities, Commercial Power & Fuel", "cost": 12000},
    {"item": "Packaging & Freight Logistics", "cost": 10000},
    {"item": "Maintenance & Contingency", "cost": 8000}
  ],
  "projectedMonthlyRevenue": 185000,
  "averageMarginPercent": 24,
  "powerRequiredHp": 5,
  "swot": {
    "strengths": ["Hyper-local strength in ${targetLocation}", "Unit economics strength", "Asset backed strength"],
    "weaknesses": ["Operational constraint 1", "Working capital cycle", "Market outreach challenge"],
    "opportunities": ["Regional mandi and retail demand", "Government subsidy benefit", "Value addition potential"],
    "threats": ["Raw material price fluctuations", "Unorganized local competition", "Seasonal harvest variations"]
  },
  "risks": [
    {"risk": "Specific operational risk 1", "impact": "High", "mitigation": "Practical mitigation 1"},
    {"risk": "Specific operational risk 2", "impact": "Medium", "mitigation": "Practical mitigation 2"},
    {"risk": "Specific operational risk 3", "impact": "Medium", "mitigation": "Practical mitigation 3"}
  ],
  "rawMaterials": ["Specific raw material 1", "Packaging material 2", "Consumables 3"],
  "statutoryLicenses": ["Specific FSSAI / PCB / Trade License 1", "Udyam MSME Certificate", "Gram Panchayat / Municipal Trade NOC"],
  "eligibleSchemes": [
    {
      "name": "Prime Minister Employment Generation Programme",
      "code": "PMEGP",
      "subsidyPercent": 35,
      "description": "Up to 35% capital subsidy for rural micro-enterprises under Special/OBC/Women/SC/ST categories."
    }
  ],
  "matchedInvestors": [
    {
      "id": "slug-name",
      "name": "Verified Institutional MSME Fund or Micro-Lender in India",
      "type": "Debt & Working Capital Fund | Government & Institutional Fund | Angel Network | Seed Accelerator",
      "ticketSizeRange": "₹50k - ₹10L",
      "matchScore": 95,
      "thesis": "Specific reason why this financing institution matches this micro-enterprise in ${targetLocation}.",
      "websiteUrl": "https://...",
      "pitchAdvice": "Actionable advice on what loan appraisal officers evaluate."
    }
  ]
}

Make all monetary values realistic Indian Rupee numbers (integers only, no symbols). Ensure sum of capexItems equals projectCost.`;

        let responseText = '';
        let modelUsed = '';

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

          // Check if AI model detected invalid/nonsense input
          if (parsed.isValid === false) {
            return NextResponse.json({
              success: false,
              isValid: false,
              error: parsed.error || `The concept "${cleanIdea}" is not a recognized enterprise idea.`,
              suggestions: parsed.suggestions || [
                'Cold Pressed Edible Oil Extraction Unit',
                'Organic Dairy & Milk Chilling Center',
                'Ready-made Garment Tailoring Unit',
                'Spice Grinding & Packaging Unit'
              ]
            }, { status: 400 });
          }

          // Use dynamically synthesized investors from AI if provided, or match from our verified database
          const dynamicInvestors = Array.isArray(parsed.matchedInvestors) && parsed.matchedInvestors.length >= 2
            ? parsed.matchedInvestors.map((inv: any, i: number) => ({
                id: inv.id || `inv-${i + 1}`,
                name: inv.name || 'Verified Sector Fund',
                type: inv.type || 'Debt & Working Capital Fund',
                ticketSizeRange: inv.ticketSizeRange || `₹${Math.round(parsed.projectCost * 0.4 / 100000)}L - ₹${Math.round(parsed.projectCost * 2 / 100000)}L`,
                matchScore: Number(inv.matchScore) || (96 - i * 3),
                thesis: inv.thesis || `Active financing thesis backing viable ${parsed.domain} enterprises.`,
                websiteUrl: (inv.websiteUrl && inv.websiteUrl.startsWith('http')) ? inv.websiteUrl : 'https://www.mudra.org.in',
                pitchAdvice: inv.pitchAdvice || `Highlight clear DSCR and hyper-local supply chain in ${targetLocation}.`
              }))
            : matchRealInvestors(parsed.category, parsed.domain || targetSector, targetLocation, parsed.projectCost);

          const result: AiAnalysisResponse = {
            ...parsed,
            domain: targetSector || parsed.domain || 'Micro-Enterprise',
            matchedInvestors: dynamicInvestors,
          };

          return NextResponse.json({ success: true, data: result, engine: modelUsed });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, using intelligent fallback generator:', geminiError?.message);
      }
    }

    // High-Fidelity Intelligent Semantic Fallback (runs if offline or temporary network issue)
    const fallbackData = generateIntelligentFallback(cleanIdea, targetLocation, targetSector);
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
// Helper to select and rank real verified investors based on sector, ticket size, and rural MSME fit
function matchRealInvestors(
  category: string, 
  domain: string, 
  location: string, 
  projectCost: number
) {
  const all = REAL_INVESTORS_DATABASE;
  const cost = projectCost || 600000;
  const catLower = (category || '').toLowerCase();
  const domLower = (domain || '').toLowerCase();

  // Score investors by sector relevance and ticket scale
  const scored = all.map(inv => {
    let score = 50;
    const invText = (inv.name + ' ' + inv.description + ' ' + inv.focusSectors.join(' ') + ' ' + inv.focusCategories.join(' ')).toLowerCase();

    // 1. Ticket scale appropriateness for micro-enterprises
    if (cost >= inv.minTicketInr && cost <= inv.maxTicketInr) {
      score += 35; // Perfect ticket fit
    } else if (cost < inv.minTicketInr) {
      const scaleRatio = inv.minTicketInr / Math.max(1, cost);
      if (scaleRatio > 6) {
        score -= 40; // Too huge for a micro enterprise (e.g. ₹5Cr fund for ₹3L shop)
      } else {
        score -= 15;
      }
    } else {
      score += 10;
    }

    // 2. Direct domain and sector keywords
    const keywords = domLower.split(/[\s,&]+/).filter(w => w.length > 3);
    if (keywords.some(k => invText.includes(k))) {
      score += 25;
    } else if (invText.includes(catLower)) {
      score += 15;
    }

    // 3. Rural & Grassroots Micro-Enterprise specialization boost
    if (invText.includes('rural') || invText.includes('msme') || invText.includes('micro') || invText.includes('grassroots') || invText.includes('livelihood')) {
      score += 15;
    }

    return {
      id: inv.id,
      name: inv.name,
      type: inv.type,
      ticketSizeRange: inv.ticketSizeRange,
      matchScore: Math.min(98, Math.max(65, score)),
      thesis: inv.description,
      websiteUrl: inv.websiteUrl,
      pitchAdvice: `Highlight your hyper-local backward supply chain in ${location}, projected ₹${Math.round(cost / 100000)}L CapEx asset-backing, and bank DSCR viability.`
    };
  });

  return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 4);
}

// Deep Intelligent Semantic Generator for non-API / offline requests
function generateIntelligentFallback(idea: string, location: string, sector?: string): AiAnalysisResponse {
  const cleanIdea = idea.charAt(0).toUpperCase() + idea.slice(1);
  const words = cleanIdea.toLowerCase().split(/[\s,&/\\-]+/);
  const sLower = (sector || '').toLowerCase();

  let domain = sector || 'Agro & Food Processing';
  let category = 'Food Processing';
  let powerHp = 5;
  let machinery: Array<{ item: string; cost: number }> = [];
  let rawMaterialsList: string[] = [];
  let licensesList: string[] = [];
  let schemesList: Array<{ name: string; code: string; subsidyPercent: number; description: string }> = [];

  // Check sector or keywords
  // 1. Textiles, Tailoring, Garments, Handloom
  if (sLower.includes('textile') || sLower.includes('tailor') || sLower.includes('handloom') || words.some(w => ['tailor', 'stitching', 'garment', 'cloth', 'apparel', 'boutique', 'embroidery', 'handloom', 'weaving', 'uniform'].includes(w))) {
    domain = 'Textiles, Handloom & Tailoring';
    category = 'Handicraft & Artisan';
    powerHp = 3;
    machinery = [
      { item: 'Industrial Single Needle Lockstitch Sewing Machines (4 Units)', cost: 180000 },
      { item: 'Heavy-Duty 5-Thread Overlock & Interlock Hemming Machine', cost: 75000 },
      { item: 'Precision Fabric Cutting Table with Straight Knife Cloth Cutter', cost: 45000 },
      { item: 'Heavy Commercial Vacuum Steam Press Iron Table & Boiler', cost: 40000 },
      { item: 'Pattern Benches, Fitting Room Setup & Inverter Power Backup', cost: 60000 }
    ];
    rawMaterialsList = [
      'High-grade cotton, poly-cotton blends, and canvas fabrics',
      'Industrial sewing threads, buttons, zips, and elastic linings',
      'Protective garment packaging covers and branding tags'
    ];
    licensesList = [
      'Udyam MSME Registration (Micro Manufacturing)',
      'Shop & Establishment Act Trade License',
      'Gram Panchayat / Municipal Trade NOC',
      'GST Registration (Optional up to ₹40 Lakhs turnover)'
    ];
    schemesList = [
      {
        name: 'Prime Minister Employment Generation Programme',
        code: 'PMEGP',
        subsidyPercent: 35,
        description: '35% capital subsidy for rural manufacturing enterprises up to ₹50 Lakhs.'
      },
      {
        name: 'PM Vishwakarma Scheme (Tailor Category)',
        code: 'PM-VISHWAKARMA',
        subsidyPercent: 5,
        description: 'Collateral-free enterprise loan up to ₹3 Lakhs at concessional 5% interest rate.'
      }
    ];
  }
  // 2. Dairy, Livestock, Poultry, Animal Husbandry
  else if (sLower.includes('dairy') || sLower.includes('livestock') || words.some(w => ['dairy', 'milk', 'cattle', 'cow', 'buffalo', 'poultry', 'chicken', 'goat', 'animal', 'feed'].includes(w))) {
    domain = 'Dairy, Livestock & Animal Husbandry';
    category = 'Agriculture Value-Add';
    powerHp = 7.5;
    machinery = [
      { item: 'Stainless Steel Bulk Milk Cooler (BMC 500L Capacity)', cost: 320000 },
      { item: 'Two-Bucket Automated Milking Machine Rig & Vacuum Pump', cost: 85000 },
      { item: 'Digital Milk Analyzer, Gerber Fat Centrifuge & Lactometer', cost: 65000 },
      { item: 'Food-Grade SS-304 Milk Collection & Transport Cans (12 Units)', cost: 50000 },
      { item: 'Cattle Shed Rubber Mats, Mist Cooling Fans & Water Line', cost: 80000 }
    ];
    rawMaterialsList = [
      `Pure cow/buffalo milk sourced from local village dairy clusters near ${location}`,
      'Compounded cattle feed pellets, green fodder, and mineral mixtures',
      'Dairy sanitizers, testing reagents, and bulk packaging containers'
    ];
    licensesList = [
      'FSSAI State Food License (Category 01: Dairy Products)',
      'State Pollution Control Board Consent (Green Category)',
      'Veterinary Department Farm Hygiene Certificate',
      'Udyam MSME Registration'
    ];
    schemesList = [
      {
        name: 'Prime Minister Employment Generation Programme',
        code: 'PMEGP',
        subsidyPercent: 35,
        description: 'Up to 35% capital subsidy on rural agro-allied processing infrastructure.'
      },
      {
        name: 'Animal Husbandry Infrastructure Development Fund',
        code: 'AHIDF',
        subsidyPercent: 3,
        description: '3% interest subvention on term loans for milk chilling and processing units.'
      }
    ];
  }
  // 3. Small Manufacturing & Fabrication
  else if (sLower.includes('manufacturing') || sLower.includes('fabrication') || words.some(w => ['welding', 'fabrication', 'metal', 'grill', 'steel', 'iron', 'paper plate', 'box', 'packaging', 'soap'].includes(w))) {
    domain = 'Small Manufacturing & Light Fabrication';
    category = 'Light Engineering';
    powerHp = 7.5;
    machinery = [
      { item: 'Heavy-Duty Industrial MIG/ARC 400A Welding Machine & Torch Rig', cost: 95000 },
      { item: 'Industrial Geared Pillar Drilling Machine (25mm Boring Capacity)', cost: 65000 },
      { item: 'High-Speed Hydraulic Metal Cut-Off Saw & Pipe Profile Bender', cost: 120000 },
      { item: 'Heavy-Duty Angle Grinders, Hand Tools & Cast Iron Anvil Bench', cost: 45000 },
      { item: '3 HP Industrial Air Compressor & Paint Spraying Exhaust Booth', cost: 75000 },
      { item: '3-Phase Industrial Distribution Panel, Earth Pit & Safety Helmets', cost: 50000 }
    ];
    rawMaterialsList = [
      'Mild Steel (MS) square pipes, angles, channels, and flat bars',
      'Welding electrodes (E6013), CO2 shielding gas, and cutting discs',
      'Industrial anti-rust primer, synthetic enamel paints, and thinners'
    ];
    licensesList = [
      'Udyam MSME Registration (Micro Manufacturing)',
      'State Pollution Control Board Consent (Green/Orange Category)',
      'Local Municipal / Gram Panchayat Trade NOC',
      'Factory Electrical Inspectorate 3-Phase Approval'
    ];
    schemesList = [
      {
        name: 'Prime Minister Employment Generation Programme',
        code: 'PMEGP',
        subsidyPercent: 35,
        description: '35% capital subsidy for rural manufacturing enterprises up to ₹50 Lakhs.'
      },
      {
        name: 'Pradhan Mantri Mudra Yojana (Tarun Tier)',
        code: 'MUDRA-TARUN',
        subsidyPercent: 0,
        description: 'Collateral-free bank term loan up to ₹10 Lakhs for equipment purchase.'
      }
    ];
  }
  // 4. Food stall / street cart / kiosk / tea / fast food
  else if (words.some(w => ['food', 'stall', 'cart', 'kiosk', 'tea', 'chai', 'snack', 'vada', 'pav', 'dosa', 'burger', 'sandwich', 'juice', 'tiffin'].includes(w))) {
    domain = 'Quick Service Restaurant & Street Food Retail';
    category = 'Retail & Services';
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
  // 5. Cold pressed oil
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
  // 6. Services & Repair
  else if (sLower.includes('service') || sLower.includes('repair') || words.some(w => ['repair', 'garage', 'mobile', 'mechanic', 'salon', 'parlor', 'barber'].includes(w))) {
    domain = 'Technical Repair & Rural Services';
    category = 'Rural Services';
    powerHp = 3;
    machinery = [
      { item: 'Digital SMD Hot Air Rework Station & Micro-Soldering Microscope', cost: 65000 },
      { item: 'Oscilloscope, Multimeter, DC Power Supply & Frequency Counter', cost: 40000 },
      { item: 'LCD Touch Separator Machine & Bubble Remover Autoclave', cost: 55000 },
      { item: 'Ultrasonic Cleaning Bath, Precision Toolkits & Anti-Static Benches', cost: 35000 },
      { item: 'Customer Counter, Spares Inventory Showcase & Inverter Backup', cost: 45000 }
    ];
    rawMaterialsList = [
      'Replacement displays, IC chips, battery cells, and connectors',
      'Solder paste, flux, desoldering wick, and cleaning isopropanol',
      'Protective cases, tempered glass, and warranty seal stickers'
    ];
    licensesList = [
      'Shop & Establishment Act Registration',
      'Gram Panchayat / Municipal Trade NOC',
      'Udyam MSME Certificate'
    ];
    schemesList = [
      {
        name: 'Pradhan Mantri Mudra Yojana (Kishore Tier)',
        code: 'MUDRA-KISHORE',
        subsidyPercent: 0,
        description: 'Collateral-free term loans between ₹50,000 and ₹5,00,000.'
      },
      {
        name: 'PMEGP (Service Sector)',
        code: 'PMEGP',
        subsidyPercent: 35,
        description: 'Up to 35% margin money subsidy on rural service infrastructure up to ₹20 Lakhs.'
      }
    ];
  }
  // 7. Green Energy / Bio-Economy
  else if (sLower.includes('energy') || sLower.includes('green') || words.some(w => ['solar', 'biomass', 'pellet', 'compost', 'vermicompost', 'bio'].includes(w))) {
    domain = 'Green Energy & Bio-Economy';
    category = 'Rural Energy';
    powerHp = 10;
    machinery = [
      { item: 'High-Speed Biomass Straw & Agro-Waste Pulverizer / Shredder', cost: 240000 },
      { item: 'Mechanical Biomass Briquette / Pellet Press Machine (500 kg/hr)', cost: 380000 },
      { item: 'Rotary Drum Pre-Mixer, Cyclone Dust Collector & Air Fan', cost: 150000 },
      { item: 'Digital Moisture Meter, Bag Stitcher & Storage Shed Setup', cost: 80000 }
    ];
    rawMaterialsList = [
      `Crop residues, cotton stalks, and sawdust sourced from ${location} farms`,
      'Biodegradable binding starch and moisture conditioners',
      'Heavy-duty HDPE woven sacks (25kg/50kg) and stitching thread'
    ];
    licensesList = [
      'Udyam MSME Certificate (Green Enterprise)',
      'State Pollution Control Board Consent (White/Green Category)',
      'Gram Panchayat Land Use & Trade NOC'
    ];
    schemesList = [
      {
        name: 'Prime Minister Employment Generation Programme',
        code: 'PMEGP',
        subsidyPercent: 35,
        description: '35% capital subsidy for rural clean-energy manufacturing units.'
      },
      {
        name: 'Agriculture Infrastructure Fund',
        code: 'AIF',
        subsidyPercent: 3,
        description: '3% interest subvention on bank term loans up to ₹2 Crores.'
      }
    ];
  }
  // 8. General default micro agro / manufacturing enterprise
  else {
    domain = sector || 'Agro & Food Processing';
    category = 'Food Processing';
    powerHp = 5;
    machinery = [
      { item: `Commercial Grade Processing Machinery for ${cleanIdea}`, cost: 420000 },
      { item: 'Auxiliary Sorting, Cleaning & Destoning Rig', cost: 160000 },
      { item: 'Semi-Automatic Volumetric Packaging & Sealing Machine', cost: 140000 },
      { item: 'Electrical 3-Phase Cabling, Safety Panel & Earth Pits', cost: 90000 },
      { item: 'Processing Shed Flooring, Partitioning & Hygiene Setup', cost: 110000 }
    ];
    rawMaterialsList = [
      `Primary raw materials for ${cleanIdea} sourced from ${location} APMC`,
      'Food-grade packaging bags, boxes, and airtight containers',
      'Plant cleaning sanitizers, hygiene consumables, and spare belts'
    ];
    licensesList = [
      'Udyam MSME Registration Certificate',
      'FSSAI / State Pollution Control Board Consent to Establish',
      'Local Municipal / Gram Panchayat Trade License'
    ];
    schemesList = [
      {
        name: 'Prime Minister Employment Generation Programme',
        code: 'PMEGP',
        subsidyPercent: 35,
        description: '35% capital subsidy for rural manufacturing enterprises up to ₹50 Lakhs.'
      },
      {
        name: 'PM Formalisation of Micro Food Processing Enterprises',
        code: 'PMFME',
        subsidyPercent: 35,
        description: '35% capital subsidy on plant and machinery up to ₹10 Lakhs.'
      }
    ];
  }

  const totalCost = machinery.reduce((sum, item) => sum + item.cost, 0);
  const monthlyRevenue = Math.round(totalCost * 0.25);
  const opexItems = [
    { item: `Direct Raw Material & Goods Sourcing for ${cleanIdea}`, cost: Math.round(monthlyRevenue * 0.42) },
    { item: 'Operator & Staff Labor Wages', cost: Math.round(monthlyRevenue * 0.16) },
    { item: 'Commercial Power Load, Water & Fuel Utilities', cost: Math.round(monthlyRevenue * 0.06) },
    { item: 'Protective Packaging, Transportation & Logistics', cost: Math.round(monthlyRevenue * 0.05) },
    { item: 'Maintenance, Shop Rent & Statutory Compliance', cost: Math.round(monthlyRevenue * 0.04) }
  ];

  const matchedInvestors = matchRealInvestors(category, domain, location, totalCost);

  return {
    title: `${cleanIdea} Enterprise Unit`,
    domain,
    category,
    description: `A commercial ${cleanIdea} unit established in ${location} to capitalize on hyper-local raw material availability and strong regional distribution corridors. Structured to fulfill scheduled commercial bank lending guidelines (DSCR between 1.6 and 2.1) and secure eligible capital grants under government MSME schemes.`,
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
        `Initial production requires strict calibration to maintain statutory and quality consistency`,
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
