export interface MicroSectorOption {
  id: string;
  name: string;
  category: string;
  iconName: string;
  badgeColor: string;
  typicalCostRange: string;
  minCost: number;
  maxCost: number;
  primaryScheme: string;
  subsidyRate: number;
  popularIdeas: string[];
  description: string;
}

export const CURATED_MICRO_SECTORS: MicroSectorOption[] = [
  {
    id: 'agro-food-processing',
    name: 'Agro & Food Processing',
    category: 'Food Processing',
    iconName: 'Utensils',
    badgeColor: 'bg-teal-500/10 text-teal-600 border-teal-500/30 dark:text-teal-400',
    typicalCostRange: '₹5L - ₹25L',
    minCost: 500000,
    maxCost: 2500000,
    primaryScheme: 'PMFME / PMEGP (Up to 35% Subsidy)',
    subsidyRate: 35,
    popularIdeas: ['Cold Pressed Mustard Oil Expeller', 'Spice Grinding & Packaging Unit', 'Mini Rice & Pulse Mill', 'Commercial Bakery & Toast Unit', 'Fruit Pulp & Pickle Processing'],
    description: 'Post-harvest value addition, packaging regional foods, and primary agro-processing.'
  },
  {
    id: 'dairy-livestock',
    name: 'Dairy, Livestock & Fisheries',
    category: 'Agriculture Value-Add',
    iconName: 'Milk',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
    typicalCostRange: '₹3L - ₹15L',
    minCost: 300000,
    maxCost: 1500000,
    primaryScheme: 'PMEGP / AHIDF (Up to 35% Subsidy)',
    subsidyRate: 35,
    popularIdeas: ['Organic Dairy & Chilling Center', 'Commercial Layer Poultry Farm', 'Goat Breeding & Fattening Unit', 'Cattle Feed & Silage Manufacturing', 'Biofloc Fish Farming'],
    description: 'Milk collection, pasteurization, livestock breeding, and feed compounding.'
  },
  {
    id: 'textiles-handloom',
    name: 'Textiles, Handloom & Tailoring',
    category: 'Handicraft & Artisan',
    iconName: 'Scissors',
    badgeColor: 'bg-pink-500/10 text-pink-600 border-pink-500/30 dark:text-pink-400',
    typicalCostRange: '₹2L - ₹10L',
    minCost: 200000,
    maxCost: 1000000,
    primaryScheme: 'PMEGP / PM Vishwakarma (Up to 35% Subsidy)',
    subsidyRate: 35,
    popularIdeas: ['Ready-made Garment Tailoring Unit', 'School & Hospital Uniform Stitching', 'Handloom Saree & Fabric Weaving', 'Eco-friendly Cotton/Jute Bag Making', 'Computerized Embroidery Unit'],
    description: 'Apparel manufacturing, home furnishing fabrics, and embroidery workshops.'
  },
  {
    id: 'small-manufacturing',
    name: 'Small Manufacturing & Fabrication',
    category: 'Light Engineering',
    iconName: 'Wrench',
    badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400',
    typicalCostRange: '₹4L - ₹20L',
    minCost: 400000,
    maxCost: 2000000,
    primaryScheme: 'PMEGP Manufacturing (Up to 35% Subsidy)',
    subsidyRate: 35,
    popularIdeas: ['Metal & Steel Grill Fabrication Workshop', 'Biodegradable Paper Cup & Plate Unit', 'Washing Powder & Liquid Soap Making', 'Corrugated Box & Packaging Unit', 'Concrete Paver Block & Brick Yard'],
    description: 'Essential utility manufacturing, hardware fabrication, and biodegradable goods.'
  },
  {
    id: 'retail-kirana-food',
    name: 'Retail, Kirana & Food Services',
    category: 'Retail & Services',
    iconName: 'ShoppingBag',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400',
    typicalCostRange: '₹1L - ₹6L',
    minCost: 100000,
    maxCost: 600000,
    primaryScheme: 'PM SVANidhi / Mudra Shishu-Kishore',
    subsidyRate: 15,
    popularIdeas: ['Village Grocery / Kirana Superette', 'Hygienic Tea & Snack Kiosk', 'Fast Food & Street Cart Setup', 'Dry Fruit & Organic Grocery Shop', 'Dairy & Sweets Retail Outlet'],
    description: 'Daily cashflow retail, street-food kiosks, and neighborhood convenience stores.'
  },
  {
    id: 'services-repair',
    name: 'Rural & Urban Services / Repair',
    category: 'Rural Services',
    iconName: 'Settings',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-500/30 dark:text-purple-400',
    typicalCostRange: '₹1.5L - ₹6L',
    minCost: 150000,
    maxCost: 600000,
    primaryScheme: 'Mudra Kishore / PMEGP Service (Up to 35% Subsidy)',
    subsidyRate: 35,
    popularIdeas: ['Two-Wheeler Service & Repair Garage', 'Smartphone & Laptop Repair Center', 'Beauty Salon & Grooming Parlor', 'Electrical & Solar Inverter Repair', 'Digital Printing & Cyber Hub'],
    description: 'Technical repair workshops, grooming parlors, and digital customer services.'
  },
  {
    id: 'green-energy',
    name: 'Green Energy & Bio-Economy',
    category: 'Rural Energy',
    iconName: 'Sun',
    badgeColor: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30 dark:text-yellow-400',
    typicalCostRange: '₹3L - ₹18L',
    minCost: 300000,
    maxCost: 1800000,
    primaryScheme: 'PM Surya Ghar / AIF / PMEGP',
    subsidyRate: 35,
    popularIdeas: ['Solar Agricultural Pump & Rooftop Unit', 'Biomass Briquette & Pellet Manufacturing', 'Vermicompost & Organic Bio-Fertilizer Unit', 'EV Battery Swapping & E-Rickshaw Hub', 'Solar Flour Mill & Spice Grinder'],
    description: 'Decentralized clean energy, bio-waste monetization, and rural solar applications.'
  },
  {
    id: 'handicrafts-forest',
    name: 'Handicrafts, Pottery & Forest Produce',
    category: 'Handicraft & Artisan',
    iconName: 'Palette',
    badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-500/30 dark:text-rose-400',
    typicalCostRange: '₹1L - ₹8L',
    minCost: 100000,
    maxCost: 800000,
    primaryScheme: 'PM Vishwakarma / PMEGP (Up to 35% Subsidy)',
    subsidyRate: 35,
    popularIdeas: ['Bamboo Furniture & Craft Workshop', 'Traditional Clay Pottery & Terracotta Unit', 'Natural Incense Sticks (Agarbatti) Making', 'Woodcarving & Handcrafted Wooden Toys', 'Medicinal Herb & Forest Produce Sourcing'],
    description: 'Indigenous artisan crafts, pottery, bamboo utilities, and forest value-addition.'
  }
];
