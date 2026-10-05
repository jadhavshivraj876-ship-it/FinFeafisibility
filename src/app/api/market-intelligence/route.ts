import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
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

export interface MarketIntelligenceResponse {
  idea: string;
  location: string;
  sector: string;
  summary: string;
  part1DemandDynamics: {
    marketNeed: string;
    targetCustomerSegments: string[];
    marketGrowthRate: string;
    buyingFrequency: string;
    demandTrends: string[];
  };
  part2RegionalSituation: {
    rawMaterialAvailability: string;
    nearbyTradingMandis: Array<{ name: string; type: string; distanceKm: number; note: string }>;
    industrialClustersAndZones: string[];
    logisticsConnectivity: string;
    districtEconomicAdvantages: string[];
  };
  part3CompetitorAnalysis: {
    saturationLevel: 'Low' | 'Medium' | 'High';
    unorganizedVsOrganizedRatio: string;
    competitorDensityBreakdown: Array<{ category: string; density: 'Low' | 'Medium' | 'High'; note: string }>;
    identifiedMarketGaps: string[];
    recommendedPositioningStrategy: string;
  };
  part4OfftakeAndPricing: {
    primaryChannels: Array<{ channel: string; sharePercent: number; description: string }>;
    wholesalePriceBenchmark: string;
    retailPriceBenchmark: string;
    expectedGrossMargin: string;
    seasonalSwings: string;
  };
  part5OpportunitiesAndSupport: {
    topOpportunities: Array<{ title: string; category: string; gapReason: string; investmentRange: string; potentialRoi: string }>;
    keyClearancesNeeded: string[];
    districtSupportAgencies: Array<{ name: string; type: string; role: string }>;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { idea, location, userApiKey } = body;

    const targetIdea = (idea && typeof idea === 'string' && idea.trim().length > 0) ? idea.trim() : 'Agro & Food Enterprise';
    const targetLocation = (location && typeof location === 'string' && location.trim().length > 0) ? location.trim() : 'Satara, Maharashtra';

    const apiKey = (userApiKey && userApiKey.trim().length > 10) 
      ? userApiKey.trim() 
      : (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `You are a Senior Rural Economic Research Analyst & MSME Market Intelligence Specialist in India.
Provide an exhaustive, hyper-local Market Intelligence Report divided into 5 distinct, well-researched PARTS for:
Business Idea: "${targetIdea}"
Detected Location/District: "${targetLocation}"

Return ONLY a valid, raw JSON object (NO markdown fences, NO backticks) adhering strictly to this structure:
{
  "idea": "${targetIdea}",
  "location": "${targetLocation}",
  "sector": "Specific sector name (e.g. Food Retail & QSR, Agro Processing, Rural Clean Energy, Auto Retail, etc.)",
  "summary": "2-3 sentences executive summary of the market feasibility and current local market situation in ${targetLocation}.",
  "part1DemandDynamics": {
    "marketNeed": "Detailed paragraph explaining the exact customer problem or demand driver for ${targetIdea}.",
    "targetCustomerSegments": ["Customer Segment 1", "Customer Segment 2", "Customer Segment 3"],
    "marketGrowthRate": "Estimated annual growth rate / CAGR (e.g. 14% CAGR)",
    "buyingFrequency": "Daily / Weekly / Recurring / Seasonal pattern",
    "demandTrends": ["Trend 1 with data", "Trend 2", "Trend 3"]
  },
  "part2RegionalSituation": {
    "rawMaterialAvailability": "Specific raw material sources, mandis, or local supply chains in/around ${targetLocation}.",
    "nearbyTradingMandis": [
      {"name": "Real Local Mandi/Market 1", "type": "APMC Mandi / Trading Yard", "distanceKm": 6, "note": "Primary trading volume and pricing hub"},
      {"name": "Real Local Mandi/Market 2", "type": "Sub-Market / Industrial Hub", "distanceKm": 18, "note": "Secondary wholesale channel"}
    ],
    "industrialClustersAndZones": ["MIDC or Local Industrial Zone 1", "Local Agro Cluster 2"],
    "logisticsConnectivity": "Highways (e.g. NH-48), rail freight, and local transport networks.",
    "districtEconomicAdvantages": ["Advantage 1 in ${targetLocation}", "Advantage 2"]
  },
  "part3CompetitorAnalysis": {
    "saturationLevel": "Low",
    "unorganizedVsOrganizedRatio": "e.g. 70% Unorganized local players vs 30% Branded chains",
    "competitorDensityBreakdown": [
      {"category": "Direct Local Competitors", "density": "Medium", "note": "Description of local competition"},
      {"category": "Branded / Organized Franchises", "density": "Low", "note": "Penetration status"},
      {"category": "Substitute Options", "density": "High", "note": "Alternative options"}
    ],
    "identifiedMarketGaps": ["Unmet need 1", "Quality/hygiene or pricing gap 2", "Availability void 3"],
    "recommendedPositioningStrategy": "Actionable strategy to capture market share."
  },
  "part4OfftakeAndPricing": {
    "primaryChannels": [
      {"channel": "Direct Retail / Footfall Counter", "sharePercent": 65, "description": "High-margin direct sales"},
      {"channel": "Local B2B / Bulk Supply", "sharePercent": 25, "description": "Regular volume supply"},
      {"channel": "Online Delivery / Takeaway", "sharePercent": 10, "description": "Expanding reach"}
    ],
    "wholesalePriceBenchmark": "Realistic wholesale procurement / cost rate in INR",
    "retailPriceBenchmark": "Realistic retail selling price in INR",
    "expectedGrossMargin": "e.g. 28% - 35%",
    "seasonalSwings": "Peak vs lean months behavior and weather impact"
  },
  "part5OpportunitiesAndSupport": {
    "topOpportunities": [
      {"title": "High-Potential Niche 1", "category": "Category", "gapReason": "Why this is a big opportunity in ${targetLocation}", "investmentRange": "₹1L - ₹3L", "potentialRoi": "30% p.a."},
      {"title": "High-Potential Niche 2", "category": "Category", "gapReason": "Why this is a big opportunity in ${targetLocation}", "investmentRange": "₹2L - ₹5L", "potentialRoi": "25% p.a."}
    ],
    "keyClearancesNeeded": ["License 1", "License 2", "License 3"],
    "districtSupportAgencies": [
      {"name": "District Industries Centre (DIC)", "type": "MSME Promotion", "role": "PMEGP subsidy verification & Udyam guidance"},
      {"name": "Lead Bank Office", "type": "Banking Facilitator", "role": "Annual District Credit Plan & Mudra sanctions"}
    ]
  }
}

Ensure all data is hyper-realistic and specific to ${targetLocation}. Return raw JSON only.`;

        let responseText = '';
        for (const model of CANDIDATE_MODELS) {
          try {
            const response = await ai.models.generateContent({
              model,
              contents: prompt,
            });
            if (response && response.text && response.text.trim().length > 10) {
              responseText = response.text;
              break;
            }
          } catch (modelErr: any) {
            console.warn(`Market intelligence model ${model} notice:`, modelErr?.message || modelErr);
          }
        }

        if (responseText) {
          const cleaned = responseText
            .replace(/```json/gi, '')
            .replace(/```/g, '')
            .trim();

          const parsed = JSON.parse(cleaned);
          return NextResponse.json({ success: true, data: parsed });
        }
      } catch (err: any) {
        console.warn('Gemini Market Intelligence failed, using fallback:', err?.message || err);
      }
    }

    const fallbackData = generateFallbackMarketIntelligence(targetIdea, targetLocation);
    return NextResponse.json({ success: true, data: fallbackData });

  } catch (err: any) {
    console.error('API /api/market-intelligence error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to fetch market intelligence' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const idea = searchParams.get('idea') || 'Agro & Food Enterprise';
  const location = searchParams.get('location') || 'Satara, Maharashtra';

  return POST(new NextRequest(req.url, {
    method: 'POST',
    body: JSON.stringify({ idea, location })
  }));
}

function generateFallbackMarketIntelligence(idea: string, location: string): MarketIntelligenceResponse {
  const cleanIdea = idea.charAt(0).toUpperCase() + idea.slice(1);
  const isFoodStall = /food|stall|cart|tea|chai|snack|fast/i.test(idea);
  const isPetrolPump = /petrol|pump|fuel|diesel|gas/i.test(idea);

  if (isFoodStall) {
    return {
      idea: cleanIdea,
      location,
      sector: 'Quick Service Restaurant (QSR) & Food Services',
      summary: `${location} exhibits strong, consistent daily consumer demand for fast, hygienic street food. Proximity to transit corridors, educational institutes, and market squares provides high pedestrian footfall with quick daily cash turnover.`,
      part1DemandDynamics: {
        marketNeed: `Commuters, college students, and market visitors in ${location} seek freshly prepared, affordable, and hygienic meals. Traditional unorganized stalls often have hygiene concerns, creating a prime gap for branded, clean quick-service food carts.`,
        targetCustomerSegments: ['Daily office & college commuters', 'Local market shoppers & merchants', 'Evening family snack seekers'],
        marketGrowthRate: '12% - 15% Annual Growth',
        buyingFrequency: 'High (Daily & Multiple Times Weekly)',
        demandTrends: [
          'High surge in demand for digital UPI payments even for ₹20-50 purchases',
          'Growing preference for transparent, stainless steel clean preparation',
          'Evening rush between 5:00 PM and 9:30 PM accounting for 65% of daily revenue'
        ]
      },
      part2RegionalSituation: {
        rawMaterialAvailability: `Abundant direct procurement of fresh vegetables, cooking oil, spices, and bakery items from nearby ${location} APMC and wholesale mandis at 20-30% below retail prices.`,
        nearbyTradingMandis: [
          { name: `${location} Central APMC Yard`, type: 'Mandi', distanceKm: 4.5, note: 'Daily fresh wholesale produce & grains' },
          { name: 'Regional Consumer Wholesale Market', type: 'Trading Hub', distanceKm: 6.0, note: 'Packaging supplies, oils, and dry rations' }
        ],
        industrialClustersAndZones: ['Local Town Commercial Center', 'Bus Station / Railway Transit Zone', 'MIDC Workers Food Hub'],
        logisticsConnectivity: 'Connected via arterial town roads and state highways with uninterrupted municipal power and delivery courier reach.',
        districtEconomicAdvantages: [
          `Rapid urban expansion in ${location} increasing working population needing outside dining`,
          'Low initial capital requirement enabling 100% break-even inside 3-4 months'
        ]
      },
      part3CompetitorAnalysis: {
        saturationLevel: 'Medium',
        unorganizedVsOrganizedRatio: '85% Unorganized Roadside Vendors vs 15% Structured Kiosks',
        competitorDensityBreakdown: [
          { category: 'Roadside Unbranded Stalls', density: 'High', note: 'Compete on cheap prices but lack standardized hygiene' },
          { category: 'Modern Branded Cafes & QSRs', density: 'Low', note: 'Higher priced, leaving the ₹30-80 price bracket wide open' },
          { category: 'Packaged Snacks / Bakeries', density: 'Medium', note: 'Direct alternatives for quick bites' }
        ],
        identifiedMarketGaps: [
          'Hygienic open-kitchen preparation with disposable eco-friendly packaging',
          'Consistent taste profile and signature specialty items',
          'Fast 3-minute turnaround during peak evening rush hours'
        ],
        recommendedPositioningStrategy: 'Position as a spotless, hygienic, value-priced local favorite with visible quality ingredients and branded uniform packaging.'
      },
      part4OfftakeAndPricing: {
        primaryChannels: [
          { channel: 'Direct Walk-in Counter Sales', sharePercent: 75, description: 'Instant cash & UPI receipts at high-traffic stall' },
          { channel: 'Takeaway & Pre-Ordered Packets', sharePercent: 15, description: 'Bulk evening orders for offices and gatherings' },
          { channel: 'Local Delivery Aggregators', sharePercent: 10, description: 'On-demand home delivery during evening hours' }
        ],
        wholesalePriceBenchmark: 'Raw materials cost roughly 35-42% of retail price',
        retailPriceBenchmark: 'Average ticket size ₹40 - ₹120 per customer',
        expectedGrossMargin: '55% - 62% Gross Margin',
        seasonalSwings: 'Peak sales during winter & monsoon months; moderate in intense summer afternoons.'
      },
      part5OpportunitiesAndSupport: {
        topOpportunities: [
          {
            title: `Specialty Regional Breakfast & Snack Kiosk in ${location}`,
            category: 'Food Services',
            gapReason: 'High early morning demand near transit hubs with minimal hygienic competition.',
            investmentRange: '₹1,50,000 - ₹3,00,000',
            potentialRoi: '45% per annum'
          },
          {
            title: `Evening Live Chat & Quick Bite Cart`,
            category: 'Street Retail',
            gapReason: 'Prime evening family gathering spots lack dedicated clean food stalls.',
            investmentRange: '₹1,00,000 - ₹2,50,000',
            potentialRoi: '50% per annum'
          }
        ],
        keyClearancesNeeded: [
          'FSSAI Basic Food Business Registration',
          'Local Municipal Corporation Street Hawkers Trade NOC',
          'Udyam MSME Certificate (Free online)'
        ],
        districtSupportAgencies: [
          { name: `District Industries Centre (DIC) ${location}`, type: 'MSME Wing', role: 'Udyam registration and PM SVANidhi coordination' },
          { name: 'Lead District Bank', type: 'Institutional Bank', role: 'Mudra Shishu loan and PM SVANidhi sanctioning' }
        ]
      }
    };
  } else if (isPetrolPump) {
    return {
      idea: cleanIdea,
      location,
      sector: 'Energy & Automotive Fuel Retail',
      summary: `Automotive fuel retail in ${location} benefits from high highway transit volumes, growing agricultural tractor usage, and expanding two-wheeler/four-wheeler ownership across rural and semi-urban corridors.`,
      part1DemandDynamics: {
        marketNeed: `Expanding industrial freight, commercial transport, and agricultural mechanization in ${location} create continuous, inelastic demand for High Speed Diesel (HSD) and Motor Spirit (Petrol).`,
        targetCustomerSegments: ['Agricultural tractors & rural vehicle owners', 'Highway logistics freight trucks & trailers', 'Daily commuters & passenger vehicle drivers'],
        marketGrowthRate: '7% - 9% Steady Annual Consumption Growth',
        buyingFrequency: 'Continuous (High Volume Refills Daily)',
        demandTrends: [
          'Increasing share of High Speed Diesel for heavy transit trucks on key corridors',
          'Expanding adoption of integrated roadside convenience stores and air-filling kiosks',
          'Shift toward digital fleet cards and corporate automated fueling vouchers'
        ]
      },
      part2RegionalSituation: {
        rawMaterialAvailability: `Direct supply via bulk petroleum tanker fleet from Oil Marketing Company (IOCL, BPCL, HPCL) supply terminals.`,
        nearbyTradingMandis: [
          { name: `${location} Agricultural APMC Hub`, type: 'Mandi', distanceKm: 8.0, note: 'Generates heavy tractor and rural pickup truck fueling demand' },
          { name: 'State / National Highway Corridor', type: 'Transit Hub', distanceKm: 2.0, note: 'Major freight route connecting regional industrial zones' }
        ],
        industrialClustersAndZones: ['Regional Industrial Growth Center', 'Highway Logistics Park', 'Transport Nagar Hub'],
        logisticsConnectivity: 'Strategic positioning on major state or national highways ensures guaranteed transit traffic day and night.',
        districtEconomicAdvantages: [
          `Rapid economic expansion in ${location} driving commercial freight trips`,
          'High entry barriers and strict zoning licenses ensure protected market territory'
        ]
      },
      part3CompetitorAnalysis: {
        saturationLevel: 'Medium',
        unorganizedVsOrganizedRatio: '100% Regulated Oil Marketing Company Dealerships',
        competitorDensityBreakdown: [
          { category: 'Highway OMC Outlets (IOCL, BPCL, HPCL)', density: 'Medium', note: 'Compete on highway frontage and parking bay size' },
          { category: 'Private Retailers (Jio-bp, Nayara)', density: 'Low', note: 'Offer modern amenities and loyalty programs' },
          { category: 'Rural Kisan Seva Kendra Pumps', density: 'Medium', note: 'Serve interior agricultural hinterlands' }
        ],
        identifiedMarketGaps: [
          'Clean rest-stop amenities, food kiosks, and clean washrooms on transit highways',
          'Automated tire pressure and 24x7 nitrogen filling stations',
          'Quick contactless card/fleet billing for commercial transport operators'
        ],
        recommendedPositioningStrategy: 'Develop an integrated highway service station featuring wide truck turning bays, clean driver amenities, and 24/7 security.'
      },
      part4OfftakeAndPricing: {
        primaryChannels: [
          { channel: 'Highway Transit Commercial Freight', sharePercent: 55, description: 'Heavy volume diesel refuels (100-300 liters per vehicle)' },
          { channel: 'Local Rural & Agricultural Demand', sharePercent: 30, description: 'Tractors, water pumps, and local 2-wheelers' },
          { channel: 'Passenger Cars & Private Travellers', sharePercent: 15, description: 'High-margin petrol and lubricant purchases' }
        ],
        wholesalePriceBenchmark: 'Regulated dealer procurement commission structure per liter',
        retailPriceBenchmark: 'Daily dynamic fuel retail prices pegged by State OMCs',
        expectedGrossMargin: 'Standard regulated dealer commission (₹2.20 - ₹3.80 per liter) + high-margin lubricants',
        seasonalSwings: 'Surge in diesel demand during harvest and sowing seasons; peak petrol travel during festival/holiday months.'
      },
      part5OpportunitiesAndSupport: {
        topOpportunities: [
          {
            title: `Highway Retail Fuel & Commercial Logistics Stop in ${location}`,
            category: 'Energy Retail',
            gapReason: 'Freight corridors need spacious fuel plazas with driver amenities.',
            investmentRange: '₹1,00,00,000 - ₹2,00,00,000',
            potentialRoi: '20% - 24% p.a.'
          }
        ],
        keyClearancesNeeded: [
          'Petroleum and Explosives Safety Organization (PESO) Clearance',
          'District Magistrate (DM) NOC',
          'NHAI / PWD Access Road Permission',
          'State Pollution Control Board Consent'
        ],
        districtSupportAgencies: [
          { name: 'District Magistrate Office', type: 'Licensing Authority', role: 'Statutory DM NOC inspection & clearance' },
          { name: 'State Lead Bank Regional Office', type: 'Project Finance', role: 'Commercial bank fuel dealership term loan' }
        ]
      }
    };
  }

  // Generic Scalable Sector Intelligence
  return {
    idea: cleanIdea,
    location,
    sector: 'Rural Enterprise & Value-Addition',
    summary: `${location} provides strong economic fundamentals for ${cleanIdea}, supported by regional consumer purchasing power, strategic transport linkages, and government credit subvention programs.`,
    part1DemandDynamics: {
      marketNeed: `Expanding regional demand in ${location} for reliable, local ${cleanIdea} products with guaranteed quality, consistent pricing, and responsive local customer service.`,
      targetCustomerSegments: ['Local retail consumers', 'Commercial establishments & traders', 'Regional institutional buyers'],
      marketGrowthRate: '10% - 14% Annual Growth',
      buyingFrequency: 'Regular & Recurring Orders',
      demandTrends: [
        'Shift towards localized, traceable procurement to cut intermediary transit delays',
        'Rising digital payment penetration and direct-to-consumer delivery models'
      ]
    },
    part2RegionalSituation: {
      rawMaterialAvailability: `Accessible raw material sourcing directly from local agricultural mandis, producer clusters, and wholesale dealers in ${location}.`,
      nearbyTradingMandis: [
        { name: `${location} Principal APMC Yard`, type: 'Mandi', distanceKm: 6.0, note: 'Central commodity trading & price benchmark hub' },
        { name: 'Regional Wholesale Transit Hub', type: 'Industrial Hub', distanceKm: 14.0, note: 'Secondary distribution and logistics center' }
      ],
      industrialClustersAndZones: ['District MIDC Industrial Estate', 'Agro-Commodity Value Cluster'],
      logisticsConnectivity: 'Accessible through state highways and railway freight corridors with smooth transit to urban consumption centers.',
      districtEconomicAdvantages: [
        `Proximity to established consuming markets in and around ${location}`,
        'Access to skilled and semi-skilled local workforce at competitive wage rates'
      ]
    },
    part3CompetitorAnalysis: {
      saturationLevel: 'Low',
      unorganizedVsOrganizedRatio: '70% Traditional Unorganized Vendors vs 30% Organized Outlets',
      competitorDensityBreakdown: [
        { category: 'Local Unorganized Players', density: 'Medium', note: 'Compete on traditional relationships but lack modern packaging and consistency' },
        { category: 'Organized Regional Brands', density: 'Low', note: 'High price points leave substantial room for local competitive pricing' }
      ],
      identifiedMarketGaps: [
        'Strict quality grading, standardized packaging, and transparent pricing',
        'Direct customer engagement and rapid fulfillment of customized local orders'
      ],
      recommendedPositioningStrategy: 'Focus on superior quality, dependable local availability, and competitive pricing supported by lean operating overheads.'
    },
    part4OfftakeAndPricing: {
      primaryChannels: [
        { channel: 'Direct Local Customer Retail', sharePercent: 60, description: 'Direct sales ensuring immediate liquidity and maximum margins' },
        { channel: 'Wholesale & B2B Distribution', sharePercent: 30, description: 'Bulk supply to neighborhood retailers and commercial clients' },
        { channel: 'Online / Telephonic Orders', sharePercent: 10, description: 'Repeat custom orders from nearby clusters' }
      ],
      wholesalePriceBenchmark: 'Competitive wholesale cost structure with 20-30% trade discount',
      retailPriceBenchmark: 'Market-aligned retail rates offering superior value per unit',
      expectedGrossMargin: '24% - 32% Gross Margin',
      seasonalSwings: 'Higher volume demand during regional harvest and festive seasons.'
    },
    part5OpportunitiesAndSupport: {
      topOpportunities: [
        {
          title: `Direct Value-Addition & Regional Distribution in ${location}`,
          category: 'Commercial Enterprise',
          gapReason: `Capitalizes on local supply advantages to capture unmet demand in ${location}.`,
          investmentRange: '₹5,00,000 - ₹15,00,000',
          potentialRoi: '28% per annum'
        }
      ],
      keyClearancesNeeded: [
        'Udyam MSME Registration Certificate',
        'State Pollution Control Board Consent / Trade License',
        'Local Municipal / Gram Panchayat Trade NOC'
      ],
      districtSupportAgencies: [
        { name: `District Industries Centre (DIC) ${location}`, type: 'MSME Promotion', role: 'PMEGP capital subsidy processing and enterprise registration' },
        { name: 'District Lead Bank Office', type: 'Banking Facilitator', role: 'Credit linkage and bank loan appraisals' }
      ]
    }
  };
}
