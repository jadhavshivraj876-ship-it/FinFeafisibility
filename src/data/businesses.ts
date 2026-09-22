import { BusinessTemplate } from '@/types';

export const BUSINESS_TEMPLATES: BusinessTemplate[] = [
  {
    id: 'cold-pressed-oil',
    title: 'Cold Pressed Wooden Ghani (Lakdi Ghana) Oil Unit',
    vernacular: {
      en: 'Cold Pressed Wooden Ghani Edible Oil Unit',
      hi: 'लकड़ी घानी कोल्ड प्रेस्ड खाद्य तेल इकाई',
      mr: 'लाकडी घाणा शुद्ध खाद्यतेल प्रक्रिया उद्योग',
      te: 'కోల్డ్ ప్రెస్డ్ చెక్క గానుగ నూనె యూనిట్',
      ta: 'மரச்செக்கு நல்லெண்ணெய் & கடலை எண்ணெய் ஆலை',
      gu: 'લાકડાના ઘાણાથી કોલ્ડ પ્રેસ્ડ તેલ એકમ',
      bn: 'ঘানি ভাঙা সরিষা ও চিনাবাদাম তেল ইউনিট'
    },
    category: 'Food Processing',
    description: 'Extraction of unrefined, chemical-free cold-pressed groundnut, mustard, sunflower, and sesame oils using slow-rotating wooden ghanis to retain natural antioxidants and aromas.',
    rawMaterials: ['Raw unshelled Groundnut', 'Mustard seeds', 'Sesame seeds', 'Glass / Food-grade PET bottles', 'Tin cans', 'Labels'],
    landRequiredSqFt: 600,
    powerRequiredHp: 7.5,
    laborRequired: 3,
    defaultProjectCost: 850000,
    capexItems: [
      { item: 'Rotary Wooden Ghani Machines (2 Units with Motor & Gearbox)', cost: 380000 },
      { item: 'Oil Filter Press (Plate & Frame, 12 plates)', cost: 110000 },
      { item: 'Semi-Automatic Bottle Filling & Sealing Machine', cost: 75000 },
      { item: 'Stainless Steel Storage Tanks (500L x 2)', cost: 65000 },
      { item: 'Electrical Installation, Three Phase Wiring & Earthing', cost: 45000 },
      { item: 'Shed Renovation, Flooring & Cleanroom Setup', cost: 95000 },
      { item: 'Weighing Scale, Testing Kits & Initial Packaging Consumables', cost: 40000 },
      { item: 'Pre-operative Expenses & FSSAI Registration', cost: 40000 }
    ],
    monthlyOpexItems: [
      { item: 'Raw Groundnut / Sesame Seeds (3,000 kg)', cost: 240000 },
      { item: 'Skilled Machine Operator + 2 Helpers', cost: 38000 },
      { item: 'Commercial Electricity & Water', cost: 12000 },
      { item: 'Bottles, Caps, Corrugated Boxes & Printed Labels', cost: 22000 },
      { item: 'Local Transport & Delivery Fuel', cost: 8000 },
      { item: 'Machine Lubrication & Maintenance Reserve', cost: 5000 }
    ],
    projectedMonthlyRevenue: 395000,
    averageMarginPercent: 28.5,
    swot: {
      strengths: [
        'Surging consumer demand for cholesterol-safe, unrefined cooking oils in urban & semi-urban clusters.',
        'High byproduct value: De-oiled oilcake (pend) fetches ₹32-₹38/kg as premium cattle feed.',
        'Compact footprint easily established on ancestral rural land without high commercial rent.'
      ],
      weaknesses: [
        'Seasonal price fluctuations of raw groundnut seeds right before harvest season.',
        'Lower oil yield per quintal (42-45%) compared to industrial chemical solvent extraction (50%+).'
      ],
      opportunities: [
        'D2C online subscription delivery to health-conscious urban households within 100km radius.',
        'Tie-up with local Kirana stores, organic shops, and residential societies.',
        'Branding with GI tag or local heritage storytelling ("100% Shuddh Desi").'
      ],
      threats: [
        'Price dumping by large solvent-refined industrial palm/soybean oil conglomerates.',
        'Adulterated duplicate products sold in informal local haats eroding consumer trust.'
      ]
    },
    risks: [
      {
        risk: 'Groundnut procurement price spikes in off-season (July - September).',
        impact: 'High',
        mitigation: 'Establish forward procurement contracts with 5-10 local farmers right after harvest and store in aerated moisture-proof bins.'
      },
      {
        risk: 'Rancidity or sedimentation if stored under direct sunlight.',
        impact: 'Medium',
        mitigation: 'Use amber/tinted UV-resistant bottles and add batch nitrogen purging or fast rotation inventory (15-day stock).'
      }
    ],
    statutoryLicenses: ['Udyam Registration', 'FSSAI State License', 'Gram Panchayat NOC', 'Pollution Control Board Green Category Consent'],
    recommendedSchemes: ['pmegp', 'pmfme', 'mudra']
  },
  {
    id: 'vermicompost-organic',
    title: 'Commercial Vermicompost & Bio-Enriched Organic Fertilizer Plant',
    vernacular: {
      en: 'Commercial Vermicompost & Bio-Enriched Fertilizer Plant',
      hi: 'व्यावसायिक वर्मीकम्पोस्ट एवं जैविक खाद उत्पादन संयंत्र',
      mr: 'व्यावसायिक गांडूळखत व सेंद्रिय खत निर्मिती प्रकल्प',
      te: 'వాణిజ్య వర్మీకంపోస్ట్ & సేంద్రీయ ఎరువుల ప్లాంట్',
      ta: 'மண்புழு உரம் மற்றும் இயற்கை உர உற்பத்தி நிலையம்',
      gu: 'વાણિજ્યિક વર્મીકમ્પોસ્ટ અને સેન્દ્રિય ખાતર એકમ',
      bn: 'বাণিজ্যিক ভার্মিকম্পোস্ট এবং জৈব সার প্ল্যান্ট'
    },
    category: 'Agriculture Value-Add',
    description: 'Conversion of cow dung, crop stubble, and agro-residues into nutrient-rich vermicast and bio-fertilizer enriched with Azotobacter and Trichoderma beneficial microbes.',
    rawMaterials: ['Fresh & semi-dry Cow Dung', 'Agricultural biomass / Sugarcane trash', 'Eisenia Fetida Earthworm culture', 'HDPE Vermi beds', 'Packaging bags'],
    landRequiredSqFt: 3500,
    powerRequiredHp: 3.0,
    laborRequired: 2,
    defaultProjectCost: 450000,
    capexItems: [
      { item: 'UV-stabilized Reinforced HDPE Vermi Beds (25 units 12x4x2 ft)', cost: 85000 },
      { item: 'Pure Eisenia Fetida Earthworm Stock (150 kg)', cost: 55000 },
      { item: 'Shade Netting Structure & GI Pipe Framework', cost: 90000 },
      { item: 'Rotary Trommel Sieving / Grading Machine with 2HP Motor', cost: 65000 },
      { item: 'Micro-Sprinkler Fogger Irrigation System for bed cooling', cost: 35000 },
      { item: 'Manual Weighing & Bag Stitching Machine', cost: 25000 },
      { item: 'Tricycle Cart / Wheelbarrows for internal haulage', cost: 20000 },
      { item: 'Pre-operative, Certification & Soil Health Testing Kit', cost: 75000 }
    ],
    monthlyOpexItems: [
      { item: 'Cow Dung procurement from local dairy farms (30 Trolleys)', cost: 45000 },
      { item: '2 Rural Field Workers / Handlers', cost: 26000 },
      { item: 'Bio-Culture inoculants (Trichoderma viride, Phosphate solubilizer)', cost: 8000 },
      { item: 'Heavy-duty 40kg printed woven polypropylene bags', cost: 14000 },
      { item: 'Borewell water pump electricity & miscellaneous', cost: 5000 },
      { item: 'Tractor trolley transport for raw material collection', cost: 12000 }
    ],
    projectedMonthlyRevenue: 175000,
    averageMarginPercent: 44.0,
    swot: {
      strengths: [
        'Extremely low technology complexity; highly resilient to power cuts.',
        'High profit margins (40%+) as cow dung is acquired at minimal cost from neighboring dairies.',
        'Generates dual revenue streams: Packed Vermicompost (₹8-₹12/kg) and Vermiwash liquid foliar spray (₹40/L).'
      ],
      weaknesses: [
        'Vermin beds require constant temperature (20-30°C) and moisture management during hot summer months.',
        'Initial gestation cycle of 60 days before the first harvesting cycle begins.'
      ],
      opportunities: [
        'Government push under Paramparagat Krishi Vikas Yojana (PKVY) and subsidies for organic village clusters.',
        'Direct supply to local sugarcane, pomegranate, grape, and greenhouse vegetable growers.',
        'Nursery and landscaping supply to expanding peri-urban residential societies.'
      ],
      threats: [
        'Subsidized chemical urea availability tempting farmers back to inorganic inputs.',
        'Heatwave mortality of earthworm colonies if shade nets and misting fail.'
      ]
    },
    risks: [
      {
        risk: 'Colony dying due to summer peak heat above 42°C.',
        impact: 'High',
        mitigation: 'Install automatic mist foggers on timer and thatch shade net roofs with dry sugarcane leaves for double insulation.'
      }
    ],
    statutoryLicenses: ['Udyam Registration', 'Fertilizer Control Order (FCO) Manufacturing License', 'Gram Panchayat Trade License'],
    recommendedSchemes: ['mudra', 'pmegp', 'pmfme']
  },
  {
    id: 'jaggery-powdering-cubes',
    title: 'Hygienic Organic Jaggery (Gur) Powder & Cubes Processing',
    vernacular: {
      en: 'Hygienic Organic Jaggery Powder & Cubes Plant',
      hi: 'स्वच्छ जैविक गुड़ पाउडर एवं क्यूब्स निर्माण इकाई',
      mr: 'सेंद्रिय गूळ पावडर व क्यूब्स आधुनिक प्रक्रिया केंद्र',
      te: 'పరిశుభ్రమైన సేంద్రీయ బెల్లం పొడి మరియు క్యూబ్స్ ప్లాంట్',
      ta: 'சுத்தமான இயற்கை வெல்லத்தூள் & கட்டிகள் தயாரிப்பு ஆலை',
      gu: 'ઓર્ગેનિક ગોળ પાવડર અને ક્યુબ્સ પ્રોસેસિંગ યુનિટ',
      bn: 'স্বাস্থ্যকর জৈব গুড় পাউডার এবং কিউব প্রক্রিয়াকরণ'
    },
    category: 'Food Processing',
    description: 'Modern, semi-mechanized sugarcane juice clarification using herbal de-foamers (Okra/Soybean extract) to produce chemical-free, free-flowing jaggery powder and uniform mini-cubes.',
    rawMaterials: ['Fresh Sugarcane stalks', 'Natural herbal clarificant (Bhendi mucilage)', 'Hydrated lime (minimal)', 'Moisture-barrier foil pouches', 'Master cartons'],
    landRequiredSqFt: 1800,
    powerRequiredHp: 15.0,
    laborRequired: 5,
    defaultProjectCost: 1500000,
    capexItems: [
      { item: 'High-Efficiency 3-Roller Sugarcane Crusher with Motor', cost: 280000 },
      { item: 'Multi-Pan Stainless Steel Clarification & Boiling System with Bagasse Furnace', cost: 420000 },
      { item: 'Mechanical Jaggery Cooling & Aerating Trough with SS Scraper', cost: 160000 },
      { item: 'Jaggery Granulator & Pulverizer with Sieve Vibrator', cost: 180000 },
      { item: 'Cube Moulding Machine (Hydraulic)', cost: 130000 },
      { item: 'Nitrogen-Flushed Automatic Nitrogen Band Sealer & Pouch Packer', cost: 120000 },
      { item: 'Shed civil work, chimney ducting and sanitary tiled floor', cost: 140000 },
      { item: 'Pre-operative, lab balance, Brix refractometer & FSSAI', cost: 70000 }
    ],
    monthlyOpexItems: [
      { item: 'Fresh Sugarcane (60 MT from surrounding farm fields)', cost: 180000 },
      { item: '5 Workers (Boiling Master + 4 Semi-skilled packing staff)', cost: 72000 },
      { item: 'Three-phase electricity & backup generator diesel', cost: 18000 },
      { item: 'Food grade zip-lock pouches & corrugated boxes', cost: 32000 },
      { item: 'Transport & farm-gate pickup freight', cost: 16000 },
      { item: 'Consumables, cleaning chemicals & maintenance reserve', cost: 9000 }
    ],
    projectedMonthlyRevenue: 480000,
    averageMarginPercent: 31.8,
    swot: {
      strengths: [
        'Sugarcane is abundantly available in Maharashtra, UP, and Karnataka river belts at regulated FRP rates.',
        'Tremendous substitution of white refined sugar by health-conscious consumers adopting jaggery tea/coffee.',
        'Long shelf life of powdered and cube jaggery (12 months) vs traditional sticky blocks.'
      ],
      weaknesses: [
        'Requires rigorous cleanliness to maintain sulfur-free golden color without sodium hydrosulfite.',
        'Crushing season is concentrated over 7-8 months (October to May).'
      ],
      opportunities: [
        'Export to Middle East, UK, and European diaspora seeking authentic Indian raw unrefined sugar.',
        'Infused value additions: Ginger-cardamom jaggery powder, Ashwagandha herbal jaggery.'
      ],
      threats: [
        'Competition from local unorganized traditional kolhus producing low-cost chemical-bleached jaggery.',
        'Heavy unseasonal rains hampering cane harvest logistics.'
      ]
    },
    risks: [
      {
        risk: 'High moisture absorption during monsoon leading to clumping.',
        impact: 'High',
        mitigation: 'Implement dehumidified packaging room with 3-layer metalized polyester airtight ziplock pouches.'
      }
    ],
    statutoryLicenses: ['Udyam Registration', 'FSSAI Manufacturing License', 'Boiler / Factory Inspector Consent', 'Pollution Board Clearance'],
    recommendedSchemes: ['pmegp', 'pmfme', 'standup-india']
  },
  {
    id: 'solar-cold-storage',
    title: 'Micro Farm-Gate Solar Cold Storage Room (5 - 10 MT Capacity)',
    vernacular: {
      en: 'Farm-Gate Solar Cold Storage Room (5-10 MT)',
      hi: 'खेत-स्तरीय सौर शीतगृह (5-10 मीट्रिक टन)',
      mr: 'शेतकऱ्यांसाठी सौर ऊर्जेवरील मिनी कोल्ड स्टोरेज (५-१० टन)',
      te: 'పొలం వద్ద సౌర శీతల గిడ్డంగి (5-10 MT)',
      ta: 'பண்ணை சூரிய சக்தி குளிர்பதன கிடங்கு (5-10 டன்)',
      gu: 'ખેતર કક્ષાનું સોલાર કોલ્ડ સ્ટોરેજ (૫-૧૦ મે. ટન)',
      bn: 'খামার-স্তরের সৌর কোল্ড স্টোরেজ (৫-১০ মেট্রিক টন)'
    },
    category: 'Rural Energy',
    description: 'Standalone solar thermal/photovoltaic powered micro cold room with thermal phase change material (PCM) battery, maintaining 2°C to 8°C for fruits, vegetables, flowers, and milk without grid power.',
    rawMaterials: ['Pre-fabricated PUF insulated panels', 'Solar PV panels (5 kWp)', 'DC inverter compressor', 'Thermal energy storage tanks', 'Plastic crates'],
    landRequiredSqFt: 500,
    powerRequiredHp: 5.0,
    laborRequired: 1,
    defaultProjectCost: 1450000,
    capexItems: [
      { item: 'PIR/PUF Cold Room Wall & Ceiling Panels (100mm, High Density)', cost: 340000 },
      { item: '5.5 kW Rooftop Solar PV Monocrystalline Array with Mounting Structure', cost: 290000 },
      { item: 'Hybrid Solar Inverter + PCM (Phase Change Material) Thermal Battery (30 hrs backup)', cost: 380000 },
      { item: 'Hermetic Scroll Refrigeration Condensing Unit & Evaporator', cost: 240000 },
      { item: 'Heavy-Duty Insulated Sliding Door & Air Curtain', cost: 55000 },
      { item: 'IoT Remote Temperature & Humidity Sensor Telemetry Gateway', cost: 35000 },
      { item: 'Plinth Foundation, Shed Canopy & Lightning Arrester', cost: 75000 },
      { item: 'Plastic Perforated Harvest Crates (200 Units) & Trolley', cost: 35000 }
    ],
    monthlyOpexItems: [
      { item: 'Facility Operator / Attendant & Billing Handler', cost: 18000 },
      { item: 'Refrigerant topping & annual maintenance reserve', cost: 6000 },
      { item: 'Solar panel cleaning & minor electrical upkeep', cost: 3000 },
      { item: 'Marketing & Farmer outreach mobilization', cost: 5000 },
      { item: 'Insurance coverage on stored agri-commodities', cost: 4000 }
    ],
    projectedMonthlyRevenue: 95000,
    averageMarginPercent: 62.0,
    swot: {
      strengths: [
        'Near-zero monthly electricity bills; operates completely off-grid in remote farmland.',
        'Cuts distress sales by 85%: farmers can store tomatoes, strawberries, or flowers for 15-25 days until market prices recover.',
        'Strong dual income model: Rental storage fee per crate/month (₹40-₹60) + trading arbitrage.'
      ],
      weaknesses: [
        'Higher upfront capital expenditure compared to conventional grid-tied chillers.',
        'Requires continuous solar access without tree or mountain hill shadow.'
      ],
      opportunities: [
        'Eligible for 3% interest subvention under Central Agriculture Infrastructure Fund (AIF) up to ₹2 Crore.',
        'Mission for Integrated Development of Horticulture (MIDH) provides 35% to 50% capital subsidy.'
      ],
      threats: [
        'Prolonged consecutive cloudy monsoon days (though mitigated by 30-hour PCM battery storage).'
      ]
    },
    risks: [
      {
        risk: 'Compressor breakdown during peak summer strawberry/grape storage.',
        impact: 'High',
        mitigation: 'Implement IoT GSM alarm system that alerts the operator on phone if temperature crosses 10°C, and maintain local technician AMC.'
      }
    ],
    statutoryLicenses: ['Udyam Registration', 'AIF Portal Project ID', 'Gram Panchayat Building Permission'],
    recommendedSchemes: ['aif', 'pmegp', 'nabard']
  },
  {
    id: 'mini-dal-mill',
    title: 'Automatic Mini Dal Mill & Pulse Polishing Plant',
    vernacular: {
      en: 'Automatic Mini Dal Mill & Pulse Polishing Plant',
      hi: 'ऑटोमैटिक मिनी दाल मिल एवं पॉलिशिंग प्लांट',
      mr: 'स्वयंचलित मिनी डाळ मिल व पॉलिशिंग प्रक्रिया केंद्र',
      te: 'ఆటోమేటిక్ మినీ పప్పు మిల్లు మరియు పాలిషింగ్ ప్లాంట్',
      ta: 'தானியங்கி பருப்பு ஆலை மற்றும் பாலிஷ் செய்யும் அலகு',
      gu: 'ઓટોમેટિક મિની દાળ મિલ અને પોલિશિંગ પ્લાન્ટ',
      bn: 'স্বয়ংক্রিয় মিনি ডাল মিল এবং পলিশিং প্ল্যান্ট'
    },
    category: 'Food Processing',
    description: 'Dehusking, splitting, conditioning, and grading of Pigeon Pea (Tur), Bengal Gram (Chana), Moong, and Urad dal with zero chemical coloring or adulteration.',
    rawMaterials: ['Raw whole Pigeon Pea (Tur)', 'Chana', 'Edible water/mustard oil for conditioning', 'Biaxially Oriented PP Packaging bags'],
    landRequiredSqFt: 1000,
    powerRequiredHp: 10.0,
    laborRequired: 3,
    defaultProjectCost: 950000,
    capexItems: [
      { item: 'CFTRI Designed Mini Dal Mill Unit (Dehusker & Splitter)', cost: 360000 },
      { item: 'Bucket Elevators & Pre-Cleaner Destoner with Cyclone Dust Collector', cost: 190000 },
      { item: 'Dal Polisher / Water Roller Unit', cost: 110000 },
      { item: 'Vibratory Multi-Deck Dal Grading Screen', cost: 95000 },
      { item: 'Continuous Nitrogen Pouch Sealer with Batch Coder', cost: 65000 },
      { item: 'Electrical Panel, Wiring, Meter & Earthing', cost: 45000 },
      { item: 'Shed Modifications, Concrete Foundation & Dust Proofing', cost: 85000 }
    ],
    monthlyOpexItems: [
      { item: 'Raw Tur / Chana grains (6,000 kg from local farmers)', cost: 380000 },
      { item: 'Miller Technician + 2 Laborers', cost: 42000 },
      { item: 'Industrial Electricity Tariff', cost: 16000 },
      { item: '1kg & 5kg Branded Pouches and Master Gunny Sacks', cost: 24000 },
      { item: 'Transport & Handling', cost: 14000 },
      { item: 'Wear-and-tear screen replacement & grease reserve', cost: 6000 }
    ],
    projectedMonthlyRevenue: 540000,
    averageMarginPercent: 21.0,
    swot: {
      strengths: [
        'Pulses are non-perishable staple food consumed daily in every household across India.',
        'High value recovery: Broken dal (Khanda) and husk (Chuni) sold as high-value protein feed for cattle at ₹24/kg.',
        'Local milling saves farmers 12% transport cost to city APMCs.'
      ],
      weaknesses: [
        'Requires proper grain moisture conditioning (soaking and drying) to avoid high breakage percentage.'
      ],
      opportunities: [
        'Tie-up with local schools under PM POSHAN (Mid Day Meal scheme) and Anganwadi centers.',
        'Retail packaging for grocery retail chains looking for chemical-free, unpolished dal.'
      ],
      threats: [
        'Government pulse import tariff adjustments affecting domestic market spot prices.'
      ]
    },
    risks: [
      {
        risk: 'High grain breakage during dry dehusking causing loss of grade-A dal yield.',
        impact: 'Medium',
        mitigation: 'Use modern emery carborundum roll with controlled moisture tempering chamber based on CFTRI Mysore standards.'
      }
    ],
    statutoryLicenses: ['Udyam Registration', 'FSSAI License', 'Weights & Measures Registration', 'Pollution Board Green Category'],
    recommendedSchemes: ['pmegp', 'pmfme', 'mudra']
  },
  {
    id: 'turmeric-processing-packaging',
    title: 'High-Curcumin Turmeric Washing, Polishing & Powdering Unit',
    vernacular: {
      en: 'Turmeric Washing, Polishing & Packaging Unit',
      hi: 'हल्दी धुलाई, पॉलिशिंग एवं पैकेजिंग इकाई',
      mr: 'हळद धुलाई, पॉलिशिंग व पॅकेजिंग प्रक्रिया उद्योग',
      te: 'పసుపు వాషింగ్, పాలిషింగ్ & ప్యాకేజింగ్ యూనిట్',
      ta: 'மஞ்சள் கழுவுதல், பாலிஷ் செய்தல் மற்றும் அரைக்கும் ஆலை',
      gu: 'હળદર ધોવા, પોલિશિંગ અને પેકેજિંગ એકમ',
      bn: 'হলুদ ধোয়া, পলিশিং এবং প্যাকেজিং ইউনিট'
    },
    category: 'Food Processing',
    description: 'End-to-end processing of harvested raw turmeric fingers: rotary barrel washing, steam boiling, solar tunnel drying, abrasive polishing, and ultra-fine pulverizing into bright curcumin-dense spice powder.',
    rawMaterials: ['Raw Turmeric Rhizomes', 'Stand-up foil pouches', 'Nitrogen flush gases', 'Cartons'],
    landRequiredSqFt: 1200,
    powerRequiredHp: 12.5,
    laborRequired: 4,
    defaultProjectCost: 1250000,
    capexItems: [
      { item: 'Rotary Turmeric Finger Washing Machine (Continuous Drum)', cost: 160000 },
      { item: 'Boiler / Steam Boiler Turmeric Cooking Pan (SS-304)', cost: 240000 },
      { item: 'Solar Hybrid Polyhouse Drying Tunnel Setup', cost: 220000 },
      { item: 'Abrasive Turmeric Polishing Drum (Hexagonal Perforated)', cost: 130000 },
      { item: 'Water-Cooled Micro Pulverizer with Cyclone Separator (zero heat loss)', cost: 260000 },
      { item: 'Automatic Auger Powder Filling & Sealing Unit', cost: 110000 },
      { item: 'Factory wiring, civil plinth & FSSAI sanitized partition', cost: 130000 }
    ],
    monthlyOpexItems: [
      { item: 'Raw Turmeric Fingers (4,000 kg)', cost: 280000 },
      { item: 'Boiler attendant, miller & 2 helpers', cost: 52000 },
      { item: 'Electricity & Biomass briquettes for steam cooking', cost: 22000 },
      { item: '250g & 500g printed airtight foil pouches', cost: 28000 },
      { item: 'Transport & Mandi dispatch', cost: 14000 },
      { item: 'Maintenance, grease, blades & lab tests', cost: 8000 }
    ],
    projectedMonthlyRevenue: 490000,
    averageMarginPercent: 32.5,
    swot: {
      strengths: [
        'Maharashtra (Satara, Sangli, Hingoli) produces world-renowned Salem and Rajapore turmeric varieties.',
        'Water-cooled pulverizer prevents burning of Curcumin content, allowing certification as medical-grade 4%+ curcumin.',
        'Tremendous export and Ayurveda cosmetic demand.'
      ],
      weaknesses: [
        'High dust generation during polishing requires effective cyclonic dust aspiration systems.'
      ],
      opportunities: [
        'Direct supply to Ayurvedic medicine firms (Patanjali, Dabur, Baidyanath) and wellness tea brands.',
        'Spices Board of India export promotion subsidies.'
      ],
      threats: [
        'Local price volatility at Sangli and Nizamabad turmeric exchanges.'
      ]
    },
    risks: [
      {
        risk: 'Lead chromate adulteration suspicions in market demanding high lab credibility.',
        impact: 'High',
        mitigation: 'Obtain NABL accredited lab certificate for each batch confirming zero artificial colors and minimum 3.8% natural curcumin.'
      }
    ],
    statutoryLicenses: ['Udyam Registration', 'FSSAI Manufacturing License', 'Spices Board Registration (CRES)', 'Pollution Control Consent'],
    recommendedSchemes: ['pmegp', 'pmfme', 'standup-india']
  }
];

// Runtime business registry for user demand-driven ideas
const CUSTOM_BUSINESS_REGISTRY: BusinessTemplate[] = [];

export function registerCustomBusinessTemplate(template: BusinessTemplate): void {
  const existingIdx = CUSTOM_BUSINESS_REGISTRY.findIndex(b => b.id === template.id);
  if (existingIdx >= 0) {
    CUSTOM_BUSINESS_REGISTRY[existingIdx] = template;
  } else {
    CUSTOM_BUSINESS_REGISTRY.unshift(template);
  }
}

export function getAllBusinessTemplates(): BusinessTemplate[] {
  return [...CUSTOM_BUSINESS_REGISTRY, ...BUSINESS_TEMPLATES];
}
