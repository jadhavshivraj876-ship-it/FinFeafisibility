import { DistrictData } from '@/types';

export const DISTRICTS_DATABASE: DistrictData[] = [
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
    majorCrops: ['Pomegranate', 'Custard Apple', 'Onion', 'Tomato', 'Flowers', 'Sugarcane', 'Millets'],
    apmcMarkets: ['Baramati APMC', 'Junnar Narayangaon Tomato Market', 'Manchar APMC', 'Indapur Yard'],
    coldStorageCount: 38,
    primaryClusters: ['Floriculture & Polyhouse', 'Dairy byproducts (Paneer, Curd)', 'Bio-Fertilizers & Vermicompost', 'Food Dehydration'],
    competitorDensity: {
      'Dairy Processing': 'High',
      'Vermicompost & Bio-Fertilizer': 'Low',
      'Cold-Pressed Edible Oil': 'Medium',
      'Tomato & Vegetable Puree': 'Low',
      'Agro-Tourism Services': 'Medium'
    },
    saturationIndex: 56,
    demandIndex: 94,
    topOpportunities: [
      {
        title: 'Organic Vermicompost & Trichoderma Bio-Fertilizer Unit',
        category: 'Agriculture Value-Add',
        gapReason: 'Massive shift among Junnar and Shirur horticulturists toward residue-free farming; severe shortage of certified bio-inputs.',
        investmentRange: '₹4,00,000 - ₹8,00,000',
        potentialRoi: '40% per annum'
      },
      {
        title: 'Solar Dehydrated Vegetables & Powder (Onion/Garlic)',
        category: 'Food Processing',
        gapReason: 'Price crashes during peak harvest in Narayangaon leave tons of unsold vegetables ready for shelf-stable dehydration.',
        investmentRange: '₹8,00,000 - ₹15,00,000',
        potentialRoi: '34% per annum'
      },
      {
        title: 'Purandar Fig & Custard Apple Pulp Processing',
        category: 'Food Processing',
        gapReason: 'Purandar Fig holds GI tag; value-added pulp and dried figs fetch 3x price in metros.',
        investmentRange: '₹12,00,000 - ₹22,00,000',
        potentialRoi: '36% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'Baramati Krishi Vigyan Kendra (KVK)', type: 'Logistics Hub', distanceKm: 6.0 },
      { name: 'DIC Pune Agricultural Cell, Shivajinagar', type: 'DIC Office', distanceKm: 28.0 },
      { name: 'Narayangaon Tomato Sub-Mandi', type: 'Mandi', distanceKm: 14.5 },
      { name: 'Bank of Maharashtra Agri Branch, Manchar', type: 'Bank', distanceKm: 7.2 }
    ]
  },
  {
    id: 'nashik-mh',
    name: 'Nashik',
    state: 'Maharashtra',
    talukas: ['Niphad', 'Dindori', 'Sinnar', 'Yeola', 'Kalwan', 'Baglan', 'Malegaon', 'Trimbak', 'Chandwad', 'Deola', 'Igatpuri', 'Surgana', 'Peint'],
    ruralPopulationPercent: 68.3,
    majorCrops: ['Grapes', 'Onion', 'Tomato', 'Maize', 'Pomegranate', 'Paddy', 'Soybean'],
    apmcMarkets: ['Lasalgaon Onion Mandi (Asia Largest)', 'Pimpalgaon Baswant APMC', 'Nashik Market Yard', 'Yeola Yard'],
    coldStorageCount: 46,
    primaryClusters: ['Onion Storage & Flakes', 'Grape Raisin (Kishmish) Processing', 'Yeola Paithani Silk Weaving', 'Agro-Solar Microgrids'],
    competitorDensity: {
      'Grape Raisin Processing': 'Medium',
      'Onion Dehydration & Flakes': 'Low',
      'Silk & Handloom': 'High',
      'Bio-Pesticides': 'Low',
      'Fruit Ripening Chambers': 'Medium'
    },
    saturationIndex: 51,
    demandIndex: 92,
    topOpportunities: [
      {
        title: 'Modern Onion Flakes & Powder Manufacturing Unit',
        category: 'Food Processing',
        gapReason: 'Lasalgaon is Asia’s onion hub. Export-grade dehydrated flakes cushion against 40% post-harvest rotting losses.',
        investmentRange: '₹15,00,000 - ₹30,00,000',
        potentialRoi: '38% per annum'
      },
      {
        title: 'Grape Raisin Processing, Grading & Washing Plant',
        category: 'Agriculture Value-Add',
        gapReason: 'Niphad and Dindori produce world-class Thomson grapes; local grading and sulfur-safe drying fetches premium export contracts.',
        investmentRange: '₹10,00,000 - ₹20,00,000',
        potentialRoi: '35% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'Lasalgaon APMC Onion Market', type: 'Mandi', distanceKm: 11.0 },
      { name: 'DIC Nashik Industrial Zone, Ambad', type: 'DIC Office', distanceKm: 18.0 },
      { name: 'Pimpalgaon Agro Cold Chain Ltd', type: 'ColdStorage', distanceKm: 9.5 },
      { name: 'Central Bank of India Regional Hub', type: 'Bank', distanceKm: 8.0 }
    ]
  },
  {
    id: 'kolhapur-mh',
    name: 'Kolhapur',
    state: 'Maharashtra',
    talukas: ['Karveer', 'Hatkanangle', 'Shirol', 'Kagal', 'Panhala', 'Bhudargad', 'Radhanagari', 'Shahuwadi', 'Chandgad', 'Gadhinglaj', 'Ajara'],
    ruralPopulationPercent: 72.8,
    majorCrops: ['Sugarcane', 'Soybean', 'Ajara Ghansal Rice', 'Cashew', 'Groundnut', 'Chilli'],
    apmcMarkets: ['Kolhapur Jaggery Market', 'Gadhinglaj Chilli Mandi', 'Shirol APMC', 'Jaysingpur Yard'],
    coldStorageCount: 22,
    primaryClusters: ['GI-Tagged Kolhapuri Jaggery', 'Kolhapuri Chappals & Leatherwork', 'Dairy (Buffalo Milk Products)', 'Foundry & Agri-Machinery Repair'],
    competitorDensity: {
      'Traditional Jaggery': 'High',
      'Organic Powdered Jaggery with Herbs': 'Low',
      'Ajara Rice Milling & Packaging': 'Low',
      'Artisan Leather Goods': 'Medium',
      'Dairy Byproducts': 'Medium'
    },
    saturationIndex: 58,
    demandIndex: 89,
    topOpportunities: [
      {
        title: 'Ajara Ghansal Scented Rice Milling & Vacuum Pack',
        category: 'Food Processing',
        gapReason: 'Ajara Ghansal has GI status. Retail packaging at source captures 45% more margin than selling paddy bags.',
        investmentRange: '₹8,00,000 - ₹16,00,000',
        potentialRoi: '31% per annum'
      },
      {
        title: 'Value-Added Buffalo Milk Dairy (Shrikhand & Paneer)',
        category: 'Food Processing',
        gapReason: 'Highest buffalo milk yield in Maharashtra; local processing into shelf-stable sweets and paneer boosts farm incomes.',
        investmentRange: '₹14,00,000 - ₹25,00,000',
        potentialRoi: '33% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'Shahupuri Jaggery Market, Kolhapur', type: 'Mandi', distanceKm: 5.0 },
      { name: 'DIC Kolhapur, Tarabai Park', type: 'DIC Office', distanceKm: 4.5 },
      { name: 'Kolhapur District Central Cooperative Bank', type: 'Bank', distanceKm: 3.2 }
    ]
  },
  {
    id: 'ahmednagar-mh',
    name: 'Ahmednagar',
    state: 'Maharashtra',
    talukas: ['Sangamner', 'Rahuri', 'Kopargaon', 'Shrirampur', 'Nevasa', 'Parner', 'Pathardi', 'Shevgaon', 'Karjat', 'Jamkhed', 'Akole'],
    ruralPopulationPercent: 82.5,
    majorCrops: ['Sugarcane', 'Pomegranate', 'Bajra', 'Cotton', 'Guava', 'Onion', 'Dairy Fodder'],
    apmcMarkets: ['Ahmednagar APMC', 'Sangamner Cattle & Dairy Mandi', 'Rahata Yard', 'Shrirampur Market'],
    coldStorageCount: 19,
    primaryClusters: ['Cooperative Dairy Hub', 'Pomegranate Aril & Juice Extraction', 'Biomass Briquettes from Cotton Stalk', 'Poultry Equipment'],
    competitorDensity: {
      'Raw Milk Aggregation': 'High',
      'Biomass Stalk Briquetting': 'Low',
      'Pomegranate Packaging & Waxing': 'Low',
      'Poultry Hatchery & Feed Mill': 'Medium'
    },
    saturationIndex: 44,
    demandIndex: 86,
    topOpportunities: [
      {
        title: 'Cotton Stalk & Agri-Waste Biomass Briquetting',
        category: 'Rural Energy',
        gapReason: 'Thousands of tons of cotton and bagasse stalks burned in fields; high industrial fuel demand in MIDC.',
        investmentRange: '₹12,00,000 - ₹22,00,000',
        potentialRoi: '35% per annum'
      },
      {
        title: 'Pomegranate Aril Extraction & Blast Freezing',
        category: 'Food Processing',
        gapReason: 'Sangamner and Rahuri produce high-grade Bhagwa pomegranates; frozen arils have huge domestic juice bar demand.',
        investmentRange: '₹16,00,000 - ₹28,00,000',
        potentialRoi: '30% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'MPKV Rahuri Agricultural University Extension', type: 'Logistics Hub', distanceKm: 14.0 },
      { name: 'Sangamner Milk Union (Rajhans) Centre', type: 'ColdStorage', distanceKm: 8.5 },
      { name: 'DIC Ahmednagar Office', type: 'DIC Office', distanceKm: 6.0 }
    ]
  },
  {
    id: 'sangli-mh',
    name: 'Sangli',
    state: 'Maharashtra',
    talukas: ['Miraj', 'Walwa', 'Tasgaon', 'Khanapur', 'Atpadi', 'Kavathe Mahankal', 'Jat', 'Kadegaon', 'Palus', 'Shirala'],
    ruralPopulationPercent: 74.5,
    majorCrops: ['Turmeric', 'Grapes (Tasgaon)', 'Soybean', 'Sugarcane', 'Groundnut', 'Pomegranate'],
    apmcMarkets: ['Sangli Turmeric Exchange (National Hub)', 'Tasgaon Raisin Yard', 'Miraj APMC'],
    coldStorageCount: 31,
    primaryClusters: ['National Turmeric Trading', 'Tasgaon Green Raisins', 'Cold Pressed Groundnut Oil', 'Leather & Footwear'],
    competitorDensity: {
      'Turmeric Trading': 'High',
      'Curcumin Extraction & Nano-Turmeric': 'Low',
      'Cold Pressed Groundnut/Sesame Oil': 'Low',
      'Raisin Sorting & Grade Color Sorting': 'Medium'
    },
    saturationIndex: 49,
    demandIndex: 91,
    topOpportunities: [
      {
        title: 'Cold-Pressed Wooden Ghani (Lakdi Ghana) Groundnut Oil',
        category: 'Food Processing',
        gapReason: 'Strong local groundnut harvests; urban health-conscious buyers pay 2.5x for zero-chemical cold-pressed oils.',
        investmentRange: '₹6,00,000 - ₹12,00,000',
        potentialRoi: '37% per annum'
      },
      {
        title: 'Optoelectronic Color Sorter for Tasgaon Raisins',
        category: 'Agriculture Value-Add',
        gapReason: 'Manual raisin grading loses 15% value; automated grading provides immediate access to export premiums.',
        investmentRange: '₹15,00,000 - ₹26,00,000',
        potentialRoi: '34% per annum'
      }
    ],
    nearbyFacilities: [
      { name: 'Sangli Turmeric Market Yard', type: 'Mandi', distanceKm: 3.5 },
      { name: 'Spices Board Regional Centre Sangli', type: 'DIC Office', distanceKm: 5.0 },
      { name: 'Tasgaon Raisin Cold Storage Complex', type: 'ColdStorage', distanceKm: 22.0 }
    ]
  }
];
