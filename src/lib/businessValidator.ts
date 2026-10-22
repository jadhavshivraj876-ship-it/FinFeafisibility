/**
 * Enterprise Idea Validator for FinFeasibility
 * Detects gibberish, keyboard spam, nonsense words, and validates meaningful business concepts.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  suggestions?: string[];
  detectedKeyword?: string;
}

// Common keyboard row and mash patterns
const KEYBOARD_MASH_PATTERNS = [
  /^[asdfghjkl]+$/i,
  /^[qwertyuiop]+$/i,
  /^[zxcvbnm]+$/i,
  /^[1234567890]+$/,
  /(.)\1{3,}/, // 4+ repeated characters like aaaa, xxxx
];

// Curated list of micro-enterprise seed keywords and stems
const BUSINESS_STEMS = [
  // Agro, Food & Beverages
  'oil', 'cold press', 'ghani', 'flour', 'atta', 'mill', 'spice', 'masala', 'grind', 'turmeric', 
  'chilli', 'coriander', 'bakery', 'biscuit', 'bread', 'cake', 'sweet', 'mithai', 'namkeen', 
  'snack', 'pickle', 'achar', 'papad', 'sauce', 'jam', 'jelly', 'juice', 'beverage', 'tea', 
  'chai', 'coffee', 'cafe', 'kiosk', 'stall', 'food', 'restaurant', 'dhaba', 'canteen', 'tiffin', 
  'catering', 'honey', 'apiary', 'bee', 'mushroom', 'jaggery', 'gur', 'sugar', 'rice', 'paddy', 
  'dal', 'pulse', 'grain', 'cereal', 'noodle', 'pasta', 'soya', 'tofu', 'paneer', 'dairy', 
  'milk', 'ghee', 'curd', 'butter', 'cheese', 'ice cream', 'dry fruit', 'cashew', 'almond',
  'dehydration', 'solar dry', 'cold storage', 'packhouse', 'sorting', 'grading',
  
  // Animal Husbandry & Fisheries
  'poultry', 'chicken', 'egg', 'broiler', 'layer', 'goat', 'sheep', 'cattle', 'cow', 'buffalo', 
  'fodder', 'silage', 'animal feed', 'cattle feed', 'fish', 'fishery', 'aquaculture', 'prawn', 
  'shrimp', 'biofloc', 'hatchery', 'pig', 'piggery', 'quail', 'duck',

  // Textiles, Handloom & Apparel
  'tailor', 'stitching', 'garment', 'cloth', 'apparel', 'dress', 'boutique', 'embroidery', 
  'handloom', 'weaving', 'loom', 'textile', 'cotton', 'silk', 'jute', 'wool', 'uniform', 
  't-shirt', 'hosiery', 'printing', 'screen print', 'block print', 'dyeing', 'bag', 'tote',

  // Small Manufacturing & Crafts
  'paper', 'cardboard', 'carton', 'corrugat', 'packaging', 'box', 'soap', 'detergent', 
  'cleaning', 'sanitizer', 'candle', 'incense', 'agarbatti', 'dhoop', 'pottery', 'clay', 
  'ceramic', 'brick', 'paver', 'cement', 'concrete', 'tile', 'wood', 'carpentry', 'furniture', 
  'bamboo', 'cane', 'handicraft', 'artisan', 'leather', 'shoe', 'footwear', 'sandal', 'plastic', 
  'recycl', 'waste', 'metal', 'welding', 'fabricat', 'iron', 'steel', 'grill', 'sheet metal', 
  'hardware', 'nut', 'bolt', 'fastener', 'wire', 'nail', 'rope', 'coir', 'mat',

  // Services & Repair
  'repair', 'service', 'garage', 'workshop', 'mechanic', 'auto', 'puncture', 'tyre', 'tire', 
  'battery', 'electric', 'plumb', 'paint', 'salon', 'parlor', 'barber', 'hair', 'beauty', 
  'spa', 'laundry', 'dry clean', 'wash', 'mobile', 'smartphone', 'laptop', 'computer', 
  'cyber', 'xerox', 'print', 'photocopy', 'stationery', 'studio', 'photography', 'videography', 
  'event', 'tent', 'decoration', 'coaching', 'tuition', 'training', 'fitness', 'gym', 'yoga', 
  'diagnostic', 'clinic', 'pharmacy', 'chemist', 'medical', 'ambulance',

  // Retail, Trading & Kirana
  'shop', 'store', 'kirana', 'grocery', 'supermarket', 'mart', 'retail', 'wholesale', 
  'distribut', 'dealership', 'depot', 'hardware store', 'fertilizer shop', 'seed store', 
  'pesticide', 'nursery', 'plant', 'flower', 'florist',

  // Green Energy, Agri-Tech & Transport
  'solar', 'rooftop', 'pump', 'biomass', 'pellet', 'briquette', 'biogas', 'vermicompost', 
  'compost', 'organic', 'fertilizer', 'manure', 'drone', 'sprayer', 'custom hiring', 
  'tractor', 'harvester', 'implement', 'ev', 'charging', 'station', 'electric vehicle', 
  'rickshaw', 'e-rickshaw', 'delivery', 'logistics', 'transport', 'cargo', 'tempo'
];

const DEFAULT_POPULAR_SUGGESTIONS = [
  'Cold Pressed Oil Extraction Unit',
  'Organic Honey Processing & Packaging',
  'Commercial Bakery & Confectionery Unit',
  'Handloom Garments & Tailoring Enterprise',
  'Automated Spice Grinding & Packaging Plant',
  'Solar Cold Storage & Agro Dryer'
];

/**
 * Validates an enterprise idea for linguistic sanity, length, and business plausibility.
 */
export function validateEnterpriseIdea(rawInput: string): ValidationResult {
  const clean = (rawInput || '').trim();
  const alphaChars = clean.replace(/[^a-zA-Z]/g, '');

  // 1. Minimum character requirement
  if (alphaChars.length < 3) {
    return {
      isValid: false,
      error: 'Please enter a valid enterprise concept with at least 3 letters (e.g. Cold Pressed Oil, Dairy Processing, Bakery Shop).',
      suggestions: DEFAULT_POPULAR_SUGGESTIONS
    };
  }

  const lower = clean.toLowerCase();
  const words = lower.split(/[\s,./\\-_+&]+/).filter(w => w.length > 0);

  // 2. Pure keyboard mash detection
  for (const pattern of KEYBOARD_MASH_PATTERNS) {
    if (pattern.test(lower.replace(/\s+/g, ''))) {
      return {
        isValid: false,
        error: `"${clean}" appears to be random keyboard letters. Please enter a genuine business or trade concept.`,
        suggestions: DEFAULT_POPULAR_SUGGESTIONS
      };
    }
  }

  // 3. Vowel / Phonetic check for single or short input words
  // Words like 'fyyt', 'qwrty', 'bcdf' have no standard vowels or bizarre vowel structure
  const standardVowels = /[aeiou]/i;
  const hasAnyVowelOrY = /[aeiouy]/i;

  let phoneticSuspicious = false;
  for (const word of words) {
    const letters = word.replace(/[^a-z]/gi, '');
    if (letters.length >= 3) {
      // If 3+ letters and zero vowels
      if (!hasAnyVowelOrY.test(letters)) {
        phoneticSuspicious = true;
        break;
      }
      // If no standard a,e,i,o,u and weird double-y like 'fyyt'
      if (!standardVowels.test(letters) && /yy/i.test(letters)) {
        phoneticSuspicious = true;
        break;
      }
      // Long consonant clusters (4+ consecutive consonants like 'sdfgh')
      if (/[bcdfghjklmnpqrstvwxz]{4,}/i.test(letters)) {
        phoneticSuspicious = true;
        break;
      }
    }
  }

  if (phoneticSuspicious) {
    return {
      isValid: false,
      error: `"${clean}" does not match any recognized word or business concept. Please specify a genuine business activity.`,
      suggestions: DEFAULT_POPULAR_SUGGESTIONS
    };
  }

  // 4. Keyword / Semantic match
  const matchedStem = BUSINESS_STEMS.find(stem => lower.includes(stem));
  if (matchedStem) {
    return {
      isValid: true,
      detectedKeyword: matchedStem
    };
  }

  // 5. If words are recognizable English/Indian words with valid phonetic structure and >= 2 words
  // e.g. "rural water distribution", "bamboo modern lamp"
  if (words.length >= 2) {
    const allWordsHaveVowels = words.every(w => standardVowels.test(w) || w.length < 3);
    if (allWordsHaveVowels) {
      return {
        isValid: true
      };
    }
  }

  // Single word that didn't match any known business stem and is not a common business word
  // e.g. "fyyt", "asdfgh", "blarp", "qwop"
  if (words.length === 1 && !matchedStem) {
    // If it's a known common root like 'farm', 'food', 'tech', etc. it would have matched.
    // Otherwise, single unknown words like 'fyyt' are rejected.
    return {
      isValid: false,
      error: `"${clean}" does not appear to be a recognized commercial business, trade, or craft. Please enter a genuine concept (e.g. Spice Grinding, Pottery Workshop, Poultry Farm).`,
      suggestions: DEFAULT_POPULAR_SUGGESTIONS
    };
  }

  return {
    isValid: true
  };
}
