import { DistrictData } from '@/types';

export const DISTRICTS_DATABASE: DistrictData[] = [
  // --- Maharashtra ---
  {
    id: 'satara-mh',
    name: 'Satara',
    state: 'Maharashtra',
    talukas: ['Karad', 'Wai', 'Koregaon', 'Patan', 'Phaltan', 'Mahabaleshwar', 'Khandala', 'Man', 'Khatav', 'Jaoli'],
    ruralPopulationPercent: 81.2,
    majorCrops: ['Turmeric', 'Sugarcane', 'Strawberry', 'Ginger', 'Soybean', 'Groundnut', 'Jowar'],
    apmcMarkets: ['Satara APMC Yard', 'Karad Agricultural Mandi', 'Phaltan Market Yard', 'Wai Sub-Market'],
    coldStorageCount: 14,
    primaryClusters: ['Turmeric Processing & Polishing', 'Jaggery Making & Khandsari', 'Strawberry Jam & Pulping', 'Dairy & Milk Chilling'],
    competitorDensity: {
      'Jaggery Processing': 'Medium',
      'Turmeric Powder & Polishing': 'Low',
      'Cold-Pressed Edible Oil': 'Low',
      'Dairy Processing': 'High',
      'Solar Cold Storage': 'Low',
      'Organic Fertilizer': 'Medium'
    },
    saturationIndex: 42,
    demandIndex: 88,
    topOpportunities: [
      {
        title: 'Turmeric Washing, Polishing & Vacuum Packaging',
        category: 'Food Processing',
        gapReason: 'Farmers currently sell raw rhizomes to Sangli middlemen losing 35% margin. Local value addition has huge export & domestic demand.',
        investmentRange: '₹12,00,000 - ₹20,00,000',
        potentialRoi: '32% per annum'
      },
      {
        title: 'Hygienic Organic Jaggery Powder & Cubes Unit',
        category: 'Food Processing',
        gapReason: 'High demand for chemical-free, sulfur-less jaggery powder in nearby Pune & Mumbai urban markets.',
        investmentRange: '₹10,00,000 - ₹18,00,000',
        potentialRoi: '28% per annum'
      },
      {
        title: 'Farm-Gate Solar Cold Storage Room (5-10 MT)',
        category: 'Rural Energy',
        gapReason: 'Strawberry and vegetable perishability in Wai and Mahabaleshwar valleys causes 22% distress sales.',
        investmentRange: '₹14,00,000 - ₹24,00,000',
        potentialRoi: '26% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'District Industries Centre (DIC) Satara', type: 'DIC Office', distanceKm: 4.2 },
      { name: 'Karad APMC Grain & Spice Mandi', type: 'Mandi', distanceKm: 18.5 },
      { name: 'State Bank of India (Lead Bank), Satara Main', type: 'Bank', distanceKm: 3.8 },
      { name: 'Wai Cooperative Cold Storage Ltd', type: 'ColdStorage', distanceKm: 16.0 },
      { name: 'Pune-Bengaluru Highway Logistics Park', type: 'Logistics Hub', distanceKm: 12.0 }
    ]
  },
  {
    id: 'pune-mh',
    name: 'Pune (Rural)',
    state: 'Maharashtra',
    talukas: ['Baramati', 'Junnar', 'Shirur', 'Khed', 'Indapur', 'Ambegaon', 'Maval', 'Bhor', 'Purandar', 'Daund', 'Haveli', 'Mulshi', 'Velhe'],
    ruralPopulationPercent: 61.4,
    majorCrops: ['Sugarcane', 'Onion', 'Pomegranate', 'Tomato', 'Grapes', 'Exotic Vegetables', 'Flowers'],
    apmcMarkets: ['Baramati Agro Mandi', 'Junnar Tomato Market', 'Shirur Sub-Market', 'Narayangaon Vegetable Hub'],
    coldStorageCount: 38,
    primaryClusters: ['Dairy & Cheese Processing', 'IQF Pomegranate Arils', 'Onion Dehydration & Flakes', 'Floriculture Packing'],
    competitorDensity: {
      'Jaggery Processing': 'High',
      'Turmeric Powder & Polishing': 'Low',
      'Cold-Pressed Edible Oil': 'Medium',
      'Dairy Processing': 'High',
      'Solar Cold Storage': 'Medium',
      'Organic Fertilizer': 'Medium'
    },
    saturationIndex: 58,
    demandIndex: 94,
    topOpportunities: [
      {
        title: 'Pomegranate Arils & Juice Extraction Facility',
        category: 'Food Processing',
        gapReason: 'Baramati-Indapur belt is top producer; direct export-grade packaging yields 40%+ gross margins.',
        investmentRange: '₹15,00,000 - ₹25,00,000',
        potentialRoi: '35% per annum'
      },
      {
        title: 'Onion Dehydration & Solar Flake Unit',
        category: 'Agriculture Value-Add',
        gapReason: 'Severe price crash during peak harvest can be converted to shelf-stable dried flakes for restaurant chains.',
        investmentRange: '₹9,00,000 - ₹16,00,000',
        potentialRoi: '30% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'DIC Pune Agricultural Wing', type: 'DIC Office', distanceKm: 8.5 },
      { name: 'Baramati APMC Mega Mandi', type: 'Mandi', distanceKm: 6.0 },
      { name: 'Bank of Maharashtra (Rural Lead Bank)', type: 'Bank', distanceKm: 2.1 },
      { name: 'Talegaon Floriculture & Cold Chain Hub', type: 'ColdStorage', distanceKm: 24.0 },
      { name: 'Chakan Industrial Cargo Hub', type: 'Logistics Hub', distanceKm: 18.0 }
    ]
  },
  {
    id: 'nashik-mh',
    name: 'Nashik',
    state: 'Maharashtra',
    talukas: ['Niphad', 'Dindori', 'Kalwan', 'Baglan (Satana)', 'Yeola', 'Sinnar', 'Chandwad', 'Malegaon', 'Trimbak', 'Igatpuri'],
    ruralPopulationPercent: 57.8,
    majorCrops: ['Grapes', 'Onion', 'Tomato', 'Pomegranate', 'Maize', 'Soybean', 'Guava'],
    apmcMarkets: ['Lasalgaon (Asia largest Onion Mandi)', 'Pimpalgaon Baswant', 'Nashik Market Yard', 'Yeola Silk & Agro Market'],
    coldStorageCount: 72,
    primaryClusters: ['Grape Raisin & Wine Processing', 'Onion Flakes & Powder', 'Maize Starch & Cattle Feed', 'Yeola Paithani Handlooms'],
    competitorDensity: {
      'Jaggery Processing': 'Low',
      'Turmeric Powder & Polishing': 'Low',
      'Cold-Pressed Edible Oil': 'Medium',
      'Dairy Processing': 'Medium',
      'Solar Cold Storage': 'High',
      'Organic Fertilizer': 'Low'
    },
    saturationIndex: 51,
    demandIndex: 92,
    topOpportunities: [
      {
        title: 'Grape Raisin (Kishmish) Processing & Nitrogen Packing',
        category: 'Food Processing',
        gapReason: 'Niphad and Dindori produce world-class Thompson seedless grapes; processing into golden raisins triples realization.',
        investmentRange: '₹14,00,000 - ₹22,00,000',
        potentialRoi: '34% per annum'
      },
      {
        title: 'High-Density Cattle & Poultry Feed from Broken Maize',
        category: 'Agriculture Value-Add',
        gapReason: 'High poultry concentration in Sinnar & Malegaon demands 200+ tonnes of balanced feed daily.',
        investmentRange: '₹11,00,000 - ₹19,00,000',
        potentialRoi: '29% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'DIC Nashik Regional Directorate', type: 'DIC Office', distanceKm: 5.0 },
      { name: 'Lasalgaon Onion & Grain APMC', type: 'Mandi', distanceKm: 28.0 },
      { name: 'Central Bank of India (Lead Bank Nashik)', type: 'Bank', distanceKm: 3.5 },
      { name: 'Pimpalgaon Baswant CA Cold Chain', type: 'ColdStorage', distanceKm: 22.0 },
      { name: 'Samruddhi Mahamarg Cargo Interchange', type: 'Logistics Hub', distanceKm: 14.0 }
    ]
  },

  // --- Punjab (North India) ---
  {
    id: 'ludhiana-pb',
    name: 'Ludhiana',
    state: 'Punjab',
    talukas: ['Ludhiana East', 'Ludhiana West', 'Jagraon', 'Samrala', 'Khanna', 'Payal', 'Raikot'],
    ruralPopulationPercent: 40.8,
    majorCrops: ['Wheat', 'Paddy (Basmati)', 'Maize', 'Mustard', 'Potato', 'Kinnow'],
    apmcMarkets: ['Khanna Grain Market (Asia Largest Grain Mandi)', 'Jagraon Mandi', 'Ludhiana New Sabzi Mandi'],
    coldStorageCount: 45,
    primaryClusters: ['Agro Machinery & Implements', 'Basmati Rice Milling', 'Hosiery & Technical Textiles', 'Dairy & Cattle Feed'],
    competitorDensity: {
      'Jaggery Processing': 'Low',
      'Cold-Pressed Edible Oil': 'Low',
      'Dairy Processing': 'High',
      'Solar Cold Storage': 'Medium',
      'Organic Fertilizer': 'Low'
    },
    saturationIndex: 48,
    demandIndex: 91,
    topOpportunities: [
      {
        title: 'Mustard Cold Pressed Oil & Bio-Pellets Unit',
        category: 'Food Processing',
        gapReason: 'High regional consumption of pure Kachi Ghani mustard oil with local seed abundance.',
        investmentRange: '₹12,00,000 - ₹22,00,000',
        potentialRoi: '31% per annum'
      },
      {
        title: 'Paddy Straw Bio-Briquetting / Pelleting Plant',
        category: 'Rural Energy',
        gapReason: 'Stubble burning regulations create massive demand from thermal plants and brick kilns for biomass pellets.',
        investmentRange: '₹15,00,000 - ₹25,00,000',
        potentialRoi: '36% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'District Industries Centre (DIC) Ludhiana', type: 'DIC Office', distanceKm: 4.5 },
      { name: 'Khanna Asia Largest Grain Mandi', type: 'Mandi', distanceKm: 32.0 },
      { name: 'Punjab National Bank Lead Office', type: 'Bank', distanceKm: 2.8 },
      { name: 'PAU Agricultural Incubation Centre', type: 'Logistics Hub', distanceKm: 6.0 }
    ]
  },

  // --- Gujarat (West India) ---
  {
    id: 'surat-gj',
    name: 'Surat (Rural)',
    state: 'Gujarat',
    talukas: ['Bardoli', 'Olpad', 'Mahuva', 'Mandvi', 'Mangrol', 'Kamrej', 'Palsana'],
    ruralPopulationPercent: 48.6,
    majorCrops: ['Sugarcane', 'Banana', 'Mango', 'Paddy', 'Cotton', 'Tur (Pigeon Pea)'],
    apmcMarkets: ['Surat APMC Market', 'Bardoli Sugar Mandi', 'Navsari Fruit Yard'],
    coldStorageCount: 52,
    primaryClusters: ['Banana Fiber & Pulping', 'Textile Garments', 'Jaggery & Sugar Value-Add', 'Dairy (Sumul)'],
    competitorDensity: {
      'Jaggery Processing': 'Medium',
      'Cold-Pressed Edible Oil': 'Low',
      'Dairy Processing': 'High',
      'Solar Cold Storage': 'Low',
      'Organic Fertilizer': 'Medium'
    },
    saturationIndex: 45,
    demandIndex: 95,
    topOpportunities: [
      {
        title: 'Vacuum Fried Banana Chips & Puree Processing',
        category: 'Food Processing',
        gapReason: 'Surat-Navsari belt harvests massive banana volume; healthy vacuum fried snacks command 45% margin.',
        investmentRange: '₹10,00,000 - ₹18,00,000',
        potentialRoi: '33% per annum'
      },
      {
        title: 'Banana Pseudostem Fiber Extraction & Handicrafts',
        category: 'Handicraft & Artisan',
        gapReason: 'Waste banana stems discarded by farmers convert into exportable organic yarn and biodegradable packaging.',
        investmentRange: '₹8,00,000 - ₹14,00,000',
        potentialRoi: '38% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'District Industries Centre (DIC) Surat', type: 'DIC Office', distanceKm: 7.0 },
      { name: 'Bardoli Regional APMC Mandi', type: 'Mandi', distanceKm: 14.0 },
      { name: 'Bank of Baroda Regional Lead Branch', type: 'Bank', distanceKm: 4.2 },
      { name: 'Hazira Express Freight Corridor', type: 'Logistics Hub', distanceKm: 22.0 }
    ]
  },

  // --- Uttar Pradesh (North / Central India) ---
  {
    id: 'varanasi-up',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    talukas: ['Pindra', 'Raja Talab', 'Sadar', 'Kashi Vidyapeeth', 'Araziline', 'Sewapuri'],
    ruralPopulationPercent: 62.3,
    majorCrops: ['Paddy', 'Wheat', 'Green Chili', 'Mustard', 'Tomato', 'Mango (Langra)'],
    apmcMarkets: ['Varanasi New Mandi Yard', 'Raja Talab Agro Market', 'Chandauli Grain Mandi'],
    coldStorageCount: 29,
    primaryClusters: ['Perishable Cargo Air Export', 'Banarasi Silk & Handloom', 'Pickles & Spice Processing', 'Wooden Toys'],
    competitorDensity: {
      'Cold-Pressed Edible Oil': 'Low',
      'Dairy Processing': 'Medium',
      'Solar Cold Storage': 'Low',
      'Organic Fertilizer': 'Low'
    },
    saturationIndex: 39,
    demandIndex: 90,
    topOpportunities: [
      {
        title: 'Export Grade Green Chili & Tomato Paste Processing',
        category: 'Food Processing',
        gapReason: 'Varanasi Airport operates international perishable cargo flights to Gulf countries with direct farmer sourcing.',
        investmentRange: '₹12,00,000 - ₹20,00,000',
        potentialRoi: '35% per annum'
      },
      {
        title: 'Artisan Wood Craft & Eco-Friendly Toy Manufacturing',
        category: 'Handicraft & Artisan',
        gapReason: 'GI-tagged Varanasi wooden lacquerware has huge pilgrimage and global tourism demand.',
        investmentRange: '₹6,00,000 - ₹12,00,000',
        potentialRoi: '40% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'District Industries Centre (DIC) Varanasi', type: 'DIC Office', distanceKm: 5.2 },
      { name: 'Raja Talab Perishable Cargo Hub', type: 'Mandi', distanceKm: 12.0 },
      { name: 'Union Bank of India Lead Bank Office', type: 'Bank', distanceKm: 3.1 },
      { name: 'Lal Bahadur Shastri Cargo Terminal', type: 'Logistics Hub', distanceKm: 18.0 }
    ]
  },

  // --- Tamil Nadu (South India) ---
  {
    id: 'coimbatore-tn',
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    talukas: ['Pollachi', 'Sulur', 'Mettupalayam', 'Annur', 'Kinathukadavu', 'Perur'],
    ruralPopulationPercent: 38.5,
    majorCrops: ['Coconut', 'Tea', 'Arecanut', 'Banana', 'Groundnut', 'Nutmeg'],
    apmcMarkets: ['Pollachi Coconut Market (Largest in India)', 'Mettupalayam Agro Mandi', 'Coimbatore Wholesale Hub'],
    coldStorageCount: 34,
    primaryClusters: ['Coir & Coir Pith Exports', 'Desiccated Coconut Powder & Virgin Oil', 'Agro Engineering Pumps', 'Poultry'],
    competitorDensity: {
      'Cold-Pressed Edible Oil': 'Medium',
      'Dairy Processing': 'Medium',
      'Solar Cold Storage': 'Low',
      'Organic Fertilizer': 'Low'
    },
    saturationIndex: 46,
    demandIndex: 94,
    topOpportunities: [
      {
        title: 'Virgin Coconut Oil & Activated Charcoal Unit',
        category: 'Food Processing',
        gapReason: 'Pollachi produces world-renowned coconut yields; premium cosmetic and wellness VCO exports command 50%+ margins.',
        investmentRange: '₹13,00,000 - ₹22,00,000',
        potentialRoi: '37% per annum'
      },
      {
        title: 'Coir Pith Briquetting & Substrate for Hydroponics',
        category: 'Agriculture Value-Add',
        gapReason: 'Export demand across Europe & USA for soil-less growing media created from coir waste.',
        investmentRange: '₹14,00,000 - ₹24,00,000',
        potentialRoi: '34% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'District Industries Centre (DIC) Coimbatore', type: 'DIC Office', distanceKm: 4.8 },
      { name: 'Pollachi Coconut Regulatory Market', type: 'Mandi', distanceKm: 24.0 },
      { name: 'Canara Bank (Lead Bank Coimbatore)', type: 'Bank', distanceKm: 3.0 },
      { name: 'TIDEL Park & TNAU Incubation Centre', type: 'Logistics Hub', distanceKm: 8.0 }
    ]
  },

  // --- Madhya Pradesh (Central India) ---
  {
    id: 'indore-mp',
    name: 'Indore (Rural)',
    state: 'Madhya Pradesh',
    talukas: ['Sanwer', 'Depalpur', 'Mhow (Dr. Ambedkar Nagar)', 'Hatod'],
    ruralPopulationPercent: 44.2,
    majorCrops: ['Soybean', 'Wheat (Sharbati)', 'Garlic', 'Gram', 'Onion', 'Potato'],
    apmcMarkets: ['Indore Choithram Mandi', 'Sanwer Grain Mandi', 'Depalpur Market Yard'],
    coldStorageCount: 42,
    primaryClusters: ['Soy Protein & Soya Milk', 'Garlic Paste & Dehydration', 'Sharbati Wheat Flour', 'Namkeen & Snacks'],
    competitorDensity: {
      'Cold-Pressed Edible Oil': 'Low',
      'Dairy Processing': 'Medium',
      'Solar Cold Storage': 'Low',
      'Organic Fertilizer': 'Low'
    },
    saturationIndex: 41,
    demandIndex: 93,
    topOpportunities: [
      {
        title: 'Soya Tofu & High-Protein Snack Manufacturing',
        category: 'Food Processing',
        gapReason: 'MP is the Soybean bowl of India; local processing into lactose-free Tofu and chunks captures rising fitness demand.',
        investmentRange: '₹11,00,000 - ₹18,00,000',
        potentialRoi: '33% per annum'
      },
      {
        title: 'Garlic Peeling, Paste & Powder Processing',
        category: 'Agriculture Value-Add',
        gapReason: 'Nearby Malwa garlic belt creates direct supply for instant kitchen spice paste with 28% margin.',
        investmentRange: '₹8,50,000 - ₹15,00,000',
        potentialRoi: '30% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'District Industries Centre (DIC) Indore', type: 'DIC Office', distanceKm: 5.5 },
      { name: 'Choithram Mega Agro Mandi', type: 'Mandi', distanceKm: 6.8 },
      { name: 'Bank of India (Lead Bank MP Region)', type: 'Bank', distanceKm: 3.2 },
      { name: 'Pithampur Inland Container Depot', type: 'Logistics Hub', distanceKm: 26.0 }
    ]
  },

  // --- Bihar (East India) ---
  {
    id: 'patna-br',
    name: 'Patna (Rural)',
    state: 'Bihar',
    talukas: ['Danapur', 'Barh', 'Mokama', 'Masaurhi', 'Paliganj', 'Bikram', 'Fatuha'],
    ruralPopulationPercent: 68.4,
    majorCrops: ['Paddy', 'Maize', 'Pulses (Lentil, Gram)', 'Potato', 'Makhana (Foxnut)', 'Mustard'],
    apmcMarkets: ['Mithapur Bazar Samiti', 'Fatuha Grain Mandi', 'Barh Pulses Market'],
    coldStorageCount: 31,
    primaryClusters: ['Makhana Grading & Roasting', 'Mini Dal Mill', 'Cold Pressed Mustard Oil', 'Cattle Feed'],
    competitorDensity: {
      'Cold-Pressed Edible Oil': 'Low',
      'Dairy Processing': 'Low',
      'Solar Cold Storage': 'Low',
      'Organic Fertilizer': 'Low'
    },
    saturationIndex: 32,
    demandIndex: 91,
    topOpportunities: [
      {
        title: 'Flavored Roasted Makhana (Foxnut) Snacking Unit',
        category: 'Food Processing',
        gapReason: 'Bihar supplies 85% of world foxnuts; value-added roasting and gourmet seasoning commands 45%+ profit margin.',
        investmentRange: '₹9,00,000 - ₹16,00,000',
        potentialRoi: '39% per annum'
      },
      {
        title: 'Automatic Pulse Processing (Mini Dal Mill)',
        category: 'Agriculture Value-Add',
        gapReason: 'Mokama Tal region produces top quality lentils; localized dehusking avoids middleman deductions.',
        investmentRange: '₹8,00,000 - ₹15,00,000',
        potentialRoi: '31% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'District Industries Centre (DIC) Patna', type: 'DIC Office', distanceKm: 4.0 },
      { name: 'Fatuha Multi-Modal Logistics Yard', type: 'Mandi', distanceKm: 16.0 },
      { name: 'State Bank of India Main Branch Patna', type: 'Bank', distanceKm: 2.5 },
      { name: 'Patna Bihta Airport Cargo Corridor', type: 'Logistics Hub', distanceKm: 22.0 }
    ]
  },

  // --- Assam (North-East India) ---
  {
    id: 'kamrup-as',
    name: 'Kamrup / Guwahati',
    state: 'Assam',
    talukas: ['Hajo', 'Palasbari', 'Rangia', 'Boko', 'Chaygaon', 'Kamalpur'],
    ruralPopulationPercent: 71.2,
    majorCrops: ['Tea', 'Arecanut', 'Bhut Jolokia (Ghost Pepper)', 'Ginger', 'Pineapple', 'Bamboo', 'Turmeric'],
    apmcMarkets: ['Pamohi Regulated Market', 'Rangia Grain Mandi', 'Beltola Wholesale Bazaar'],
    coldStorageCount: 16,
    primaryClusters: ['Organic Ginger & Turmeric Flakes', 'Bamboo Furniture & Composite Boards', 'Black Rice Milling', 'CTC Tea Value Add'],
    competitorDensity: {
      'Cold-Pressed Edible Oil': 'Low',
      'Dairy Processing': 'Low',
      'Solar Cold Storage': 'Low',
      'Organic Fertilizer': 'Low'
    },
    saturationIndex: 28,
    demandIndex: 92,
    topOpportunities: [
      {
        title: 'Organic Ginger & Ghost Pepper Processing Unit',
        category: 'Food Processing',
        gapReason: 'High capsaicin Bhut Jolokia and organic ginger have huge domestic pharmaceutical and seasoning export market.',
        investmentRange: '₹10,00,000 - ₹18,00,000',
        potentialRoi: '38% per annum'
      },
      {
        title: 'Engineered Bamboo Board & Handicrafts Workshop',
        category: 'Handicraft & Artisan',
        gapReason: 'North-East bamboo policy provides up to 50% capital subsidy under National Bamboo Mission and PMEGP special category.',
        investmentRange: '₹8,00,000 - ₹15,00,000',
        potentialRoi: '42% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'DIC Guwahati Rural / Kamrup', type: 'DIC Office', distanceKm: 6.0 },
      { name: 'Rangia North-East Mandi Hub', type: 'Mandi', distanceKm: 24.0 },
      { name: 'UCO Bank / SBI Lead Bank Assam', type: 'Bank', distanceKm: 3.5 },
      { name: 'Guwahati Borjhar Air Cargo Complex', type: 'Logistics Hub', distanceKm: 15.0 }
    ]
  }
];

/**
 * Dynamically synthesizes a complete DistrictData profile for ANY custom location or detected GPS coordinate in India or abroad.
 */
export function synthesizeDistrictData(districtName: string, stateName: string): DistrictData {
  const safeDistrict = districtName.trim() || 'Custom District';
  const safeState = stateName.trim() || 'India';
  const id = `${safeDistrict.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${safeState.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return {
    id,
    name: safeDistrict,
    state: safeState,
    talukas: [`${safeDistrict} Central`, `${safeDistrict} North`, `${safeDistrict} South`, `${safeDistrict} Rural`],
    ruralPopulationPercent: 68.5,
    majorCrops: ['Cereals & Grains', 'Oilseeds', 'Pulses', 'Horticulture Fruits', 'Seasonal Vegetables', 'Cash Crops'],
    apmcMarkets: [`${safeDistrict} Principal APMC Yard`, `${safeDistrict} Agricultural Sub-Market`, 'Regional Krishi Mandi'],
    coldStorageCount: 18,
    primaryClusters: [
      'Agro & Food Processing Cluster',
      'Rural Micro-Manufacturing',
      'Cold Chain & Solar Storage',
      'Handicrafts & Artisans'
    ],
    competitorDensity: {
      'Food Processing': 'Low',
      'Cold Pressed Oil': 'Low',
      'Agro Storage': 'Low',
      'Organic Fertilizer': 'Low',
      'Value-Add Packaging': 'Low'
    },
    saturationIndex: 38,
    demandIndex: 91,
    topOpportunities: [
      {
        title: `Localized Agro-Value Addition & Vacuum Packaging in ${safeDistrict}`,
        category: 'Food Processing',
        gapReason: `Direct farm-gate aggregation in ${safeDistrict} avoids intermediate trading loss and unlocks 30%+ profit margins.`,
        investmentRange: '₹10,00,000 - ₹20,00,000',
        potentialRoi: '32% per annum'
      },
      {
        title: `Decentralized Solar Cold Storage Unit (5 MT) for ${safeDistrict}`,
        category: 'Rural Energy',
        gapReason: `Mitigates harvest perishability for local farmers and satisfies high commercial loan eligibility.`,
        investmentRange: '₹12,00,000 - ₹22,00,000',
        potentialRoi: '28% per annum'
      }
    ],
    nearbyFacilities: [
      { name: `District Industries Centre (DIC) ${safeDistrict}`, type: 'DIC Office', distanceKm: 4.5 },
      { name: `${safeDistrict} APMC Central Mandi`, type: 'Mandi', distanceKm: 8.0 },
      { name: `Lead Bank Office (${safeState})`, type: 'Bank', distanceKm: 3.2 },
      { name: `${safeDistrict} Multi-Commodity Cold Storage`, type: 'ColdStorage', distanceKm: 12.0 },
      { name: `Regional Freight & Highway Logistics Hub`, type: 'Logistics Hub', distanceKm: 15.0 }
    ]
  };
}
