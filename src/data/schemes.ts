import { SchemeRule } from '@/types';

export const SCHEMES_DATABASE: SchemeRule[] = [
  {
    id: 'pmegp',
    code: 'PMEGP',
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    ministry: 'Ministry of MSME, Govt of India & KVIC',
    maxProjectCostManufacturing: 5000000, // ₹50 Lakhs
    maxProjectCostService: 2000000, // ₹20 Lakhs
    maxSubsidyPercentRuralSpecial: 35, // 35% Margin Money Subsidy in Rural for SC/ST/OBC/Women/Minority/Ex-servicemen
    maxSubsidyPercentRuralGeneral: 25, // 25% for Rural General
    maxSubsidyPercentUrbanSpecial: 25,
    maxSubsidyPercentUrbanGeneral: 15,
    promoterContributionSpecial: 5, // Only 5% own money needed!
    promoterContributionGeneral: 10, // 10% own money for General
    collateralFree: true, // Up to ₹10 Lakhs covered under CGTMSE
    eligibleGenders: ['Male', 'Female', 'Transgender'],
    eligibleCategories: ['General', 'OBC', 'SC', 'ST', 'Minority', 'Women', 'Ex-Servicemen', 'Specially-Abled'],
    keyHighlights: [
      'Highest capital subsidy in India: Up to 35% government subsidy for rural micro-enterprises.',
      'Promoter contribution is just 5% of project cost for special categories (Women, SC, ST, OBC, Minority).',
      'No collateral security needed up to ₹10 Lakhs; eligible for second expansion loan up to ₹1 Crore with 15-20% subsidy.',
      'Handholding support via District Industries Centre (DIC) and KVIC / KVIB.'
    ],
    requiredDocuments: [
      'Aadhaar Card & PAN Card',
      'Caste / Category Certificate (for SC/ST/OBC/Minority subsidy benefit)',
      'Rural Area Certificate issued by Gram Panchayat / Sarpanch',
      'Detailed Project Report (DPR) with Machinery Quotations',
      'Highest Educational Qualification Certificate (8th Pass mandatory if project > ₹10 Lakhs in manufacturing)',
      'EDP (Entrepreneurship Development Programme) Training Certificate (can be completed online after approval)'
    ],
    applicationPortalUrl: 'https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp',
    description: 'Credit-linked subsidy programme aimed at generating self-employment micro-enterprises in non-farm rural and urban sectors across India.'
  },
  {
    id: 'mudra-kishore',
    code: 'PMMY-KISHORE',
    name: 'Pradhan Mantri Mudra Yojana (PMMY) - Kishore Category',
    ministry: 'Ministry of Finance & Department of Financial Services (DFS)',
    maxProjectCostManufacturing: 500000, // ₹5 Lakhs
    maxProjectCostService: 500000,
    maxSubsidyPercentRuralSpecial: 0, // Direct subsidy is 0, but 0% collateral and competitive interest
    maxSubsidyPercentRuralGeneral: 0,
    maxSubsidyPercentUrbanSpecial: 0,
    maxSubsidyPercentUrbanGeneral: 0,
    promoterContributionSpecial: 10,
    promoterContributionGeneral: 15,
    collateralFree: true,
    eligibleGenders: ['Male', 'Female', 'Transgender'],
    eligibleCategories: ['General', 'OBC', 'SC', 'ST', 'Minority', 'Women', 'Ex-Servicemen', 'Specially-Abled'],
    keyHighlights: [
      'Collateral-free loan from ₹50,000 up to ₹5,00,000 for purchasing machinery, tools, and working capital.',
      'Overdraft facility and Mudra Debit Card for seamless day-to-day liquidity.',
      'No processing fee for Shishu and Kishore loans by public sector commercial banks.',
      'Covered by Credit Guarantee Fund for Micro Units (CGFMU).'
    ],
    requiredDocuments: [
      'Identity Proof (Aadhaar / Voter ID / Driving License)',
      'Proof of Residence & Rural Business Address',
      'Quotations for Machinery and raw materials to be purchased',
      'Bank Statement for past 6 months (if existing account)',
      'Udyam Registration Certificate'
    ],
    applicationPortalUrl: 'https://www.mudra.org.in/',
    description: 'Institutional credit funding for non-corporate small micro-enterprises in manufacturing, trading, and allied agri-services.'
  },
  {
    id: 'mudra-tarun',
    code: 'PMMY-TARUN',
    name: 'Pradhan Mantri Mudra Yojana (PMMY) - Tarun Category',
    ministry: 'Ministry of Finance & DFS',
    maxProjectCostManufacturing: 1000000, // ₹10 Lakhs (extendable up to ₹20L under 2024 budget announcement)
    maxProjectCostService: 1000000,
    maxSubsidyPercentRuralSpecial: 0,
    maxSubsidyPercentRuralGeneral: 0,
    maxSubsidyPercentUrbanSpecial: 0,
    maxSubsidyPercentUrbanGeneral: 0,
    promoterContributionSpecial: 10,
    promoterContributionGeneral: 15,
    collateralFree: true,
    eligibleGenders: ['Male', 'Female', 'Transgender'],
    eligibleCategories: ['General', 'OBC', 'SC', 'ST', 'Minority', 'Women', 'Ex-Servicemen', 'Specially-Abled'],
    keyHighlights: [
      'Loans from ₹5,00,000 to ₹10,00,000 for expanding manufacturing setups, buying commercial vehicles, and automated machinery.',
      'No third-party guarantee or tangible collateral required.',
      'Repayment tenure up to 5 to 7 years with initial moratorium.'
    ],
    requiredDocuments: [
      'Aadhaar, PAN & Udyam MSME Certificate',
      'Machinery Proforma Invoices & Supplier Bank Details',
      'Projected Financial Statements & Repayment Schedule',
      'Bank Statement of previous 12 months'
    ],
    applicationPortalUrl: 'https://www.udyamimitra.in/',
    description: 'Higher credit tier for growing rural micro-enterprises that need established machinery and inventory scaling.'
  },
  {
    id: 'standup-india',
    code: 'STANDUP-INDIA',
    name: 'Stand-Up India Scheme for SC/ST and Women Entrepreneurs',
    ministry: 'Ministry of Finance & SIDBI',
    maxProjectCostManufacturing: 10000000, // ₹1 Crore
    maxProjectCostService: 10000000,
    maxSubsidyPercentRuralSpecial: 15, // Convergence with state margin money schemes
    maxSubsidyPercentRuralGeneral: 0,
    maxSubsidyPercentUrbanSpecial: 15,
    maxSubsidyPercentUrbanGeneral: 0,
    promoterContributionSpecial: 10, // 10% to 15%
    promoterContributionGeneral: 25,
    collateralFree: false, // CGSSI guarantee or collateral
    eligibleGenders: ['Female', 'Transgender'], // Specifically for Women or SC/ST males
    eligibleCategories: ['SC', 'ST', 'Women'],
    keyHighlights: [
      'Bank loans between ₹10 Lakhs and ₹1 Crore for greenfield (first-time) enterprises in manufacturing, services, or agri-allied sector.',
      'At least one SC/ST borrower and at least one woman borrower per bank branch across all scheduled commercial banks.',
      'Margin money requirement reduced to 15% with convergence from state subsidies.'
    ],
    requiredDocuments: [
      'Proof of Identity & Community Certificate (SC/ST) or proof of Woman entrepreneur status',
      'Detailed Project Report (DPR) with technology process description',
      'Land ownership or registered lease agreement for business premise',
      'Machinery quotes, pollution consent, and municipal/panchayat approvals'
    ],
    applicationPortalUrl: 'https://www.standupmitra.in/',
    description: 'Promoting entrepreneurship among women and SC/ST communities to foster greenfield micro and small businesses.'
  },
  {
    id: 'pmfme',
    code: 'PMFME',
    name: 'PM Formalisation of Micro Food Processing Enterprises Scheme',
    ministry: 'Ministry of Food Processing Industries (MoFPI)',
    maxProjectCostManufacturing: 2850000, // Up to ₹10L subsidy on project
    maxProjectCostService: 1000000,
    maxSubsidyPercentRuralSpecial: 35, // 35% Credit-Linked Capital Subsidy (Max ₹10 Lakhs)
    maxSubsidyPercentRuralGeneral: 35,
    maxSubsidyPercentUrbanSpecial: 35,
    maxSubsidyPercentUrbanGeneral: 35,
    promoterContributionSpecial: 10,
    promoterContributionGeneral: 10,
    collateralFree: true,
    eligibleGenders: ['Male', 'Female', 'Transgender'],
    eligibleCategories: ['General', 'OBC', 'SC', 'ST', 'Minority', 'Women', 'Ex-Servicemen', 'Specially-Abled'],
    keyHighlights: [
      '35% credit-linked capital subsidy with a ceiling of ₹10,00,000 per enterprise for food processing units.',
      'Special priority given to One District One Product (ODOP) designated items (e.g. Turmeric in Satara/Sangli, Grapes in Nashik, Jaggery in Kolhapur).',
      'Free training, marketing, and packaging support provided by state nodal agencies.'
    ],
    requiredDocuments: [
      'Aadhaar, PAN & Bank Account details',
      'Food Processing experience certificate / self-declaration',
      'Detailed project proposal focusing on ODOP or agro-produce',
      'Machinery quotation with technical specifications & electric load certificate'
    ],
    applicationPortalUrl: 'https://pmfme.mofpi.gov.in/',
    description: 'Financial, technical and business support for upgrading existing and establishing new micro food processing enterprises.'
  },
  {
    id: 'aif',
    code: 'AIF',
    name: 'Agriculture Infrastructure Fund (AIF)',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    maxProjectCostManufacturing: 20000000, // Up to ₹2 Crore interest subvention
    maxProjectCostService: 20000000,
    maxSubsidyPercentRuralSpecial: 3, // 3% per annum Interest Subvention for up to 7 years
    maxSubsidyPercentRuralGeneral: 3,
    maxSubsidyPercentUrbanSpecial: 3,
    maxSubsidyPercentUrbanGeneral: 3,
    promoterContributionSpecial: 10,
    promoterContributionGeneral: 10,
    collateralFree: true, // Up to ₹2 Crore covered under CGTMSE
    eligibleGenders: ['Male', 'Female', 'Transgender'],
    eligibleCategories: ['General', 'OBC', 'SC', 'ST', 'Minority', 'Women', 'Ex-Servicemen', 'Specially-Abled'],
    keyHighlights: [
      '3% per annum interest subvention on bank loans up to ₹2 Crore for a maximum tenure of 7 years.',
      'Credit guarantee coverage fees paid by the Central Government under CGTMSE.',
      'Applicable for post-harvest management projects: Cold storage, sorting/grading units, drying yards, ripening chambers, and bio-fertilizers.'
    ],
    requiredDocuments: [
      'Land revenue 7/12 extract or registered lease for minimum 10 years',
      'Chartered Engineer approved DPR with civil and mechanical cost schedules',
      'Statutory green clearance or Gram Panchayat No-Objection Certificate'
    ],
    applicationPortalUrl: 'https://agriinfra.dac.gov.in/',
    description: 'Medium to long term debt financing facility for post-harvest management infrastructure and community farming assets.'
  }
];
