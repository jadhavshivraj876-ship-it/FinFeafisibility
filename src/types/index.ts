export type Language = 'en' | 'hi' | 'mr' | 'te' | 'ta' | 'gu' | 'bn';

export interface DistrictData {
  id: string;
  name: string;
  state: string;
  talukas: string[];
  ruralPopulationPercent: number;
  majorCrops: string[];
  apmcMarkets: string[];
  coldStorageCount: number;
  primaryClusters: string[];
  competitorDensity: Record<string, 'Low' | 'Medium' | 'High'>;
  saturationIndex: number; // 0 - 100
  demandIndex: number; // 0 - 100
  topOpportunities: {
    title: string;
    category: string;
    gapReason: string;
    investmentRange: string;
    potentialRoi: string;
  }[];
  nearbyFacilities: {
    name: string;
    type: 'Mandi' | 'Bank' | 'ColdStorage' | 'DIC Office' | 'Logistics Hub';
    distanceKm: number;
  }[];
}

export interface BusinessTemplate {
  id: string;
  title: string;
  vernacular: Record<Language, string>;
  category: 'Food Processing' | 'Agriculture Value-Add' | 'Rural Energy' | 'Handicraft & Artisan' | 'Rural Services';
  description: string;
  rawMaterials: string[];
  landRequiredSqFt: number;
  powerRequiredHp: number;
  laborRequired: number;
  defaultProjectCost: number; // in INR
  capexItems: { item: string; cost: number }[];
  monthlyOpexItems: { item: string; cost: number }[];
  projectedMonthlyRevenue: number;
  averageMarginPercent: number;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  risks: {
    risk: string;
    impact: 'Low' | 'Medium' | 'High';
    mitigation: string;
  }[];
  statutoryLicenses: string[];
  recommendedSchemes: string[];
}

export interface FinancialInputs {
  projectCost: number;
  ownContributionPercent: number; // e.g. 5 or 10
  annualInterestRate: number; // e.g. 9.5
  tenureYears: number; // e.g. 5
  moratoriumMonths: number; // e.g. 6
  monthlySalesRevenue: number;
  monthlyRawMaterialCost: number;
  monthlyLaborCost: number;
  monthlyPowerAndUtilities: number;
  monthlyPackagingAndLogistics: number;
  monthlyOtherOverheads: number;
}

export interface CashFlowYear {
  year: number;
  revenue: number;
  cogs: number;
  grossProfit: number;
  operatingExpenses: number;
  interestPaid: number;
  principalPaid: number;
  depreciation: number;
  profitBeforeTax: number;
  tax: number;
  netProfit: number;
  netCashFlow: number;
  cumulativeCash: number;
  dscr: number;
}

export interface FinancialAnalysis {
  projectCost: number;
  ownContribution: number;
  loanAmount: number;
  subsidyAmount: number;
  netBankLoan: number;
  monthlyEmi: number;
  totalInterest: number;
  breakEvenMonthlyRevenue: number;
  breakEvenPercentage: number;
  averageDscr: number;
  isBankViable: boolean;
  dscrRating: 'Excellent' | 'Good' | 'Borderline' | 'High Risk';
  cashFlowYears: CashFlowYear[];
  paybackPeriodYears: number;
}

export type SocialCategory = 'General' | 'OBC' | 'SC' | 'ST' | 'Minority' | 'Women' | 'Ex-Servicemen' | 'Specially-Abled';
export type Gender = 'Male' | 'Female' | 'Transgender';
export type LocationType = 'Rural' | 'Urban';
export type ProjectType = 'Manufacturing' | 'Service' | 'Trading';

export interface EntrepreneurProfile {
  name: string;
  age: number;
  gender: Gender;
  category: SocialCategory;
  locationType: LocationType;
  state: string;
  district: string;
  taluka?: string;
  education: 'Below 8th' | '8th Pass' | '10th Pass' | '12th Pass' | 'Graduate/Diploma' | 'Post Graduate';
  projectType: ProjectType;
  projectCost: number;
  businessTitle: string;
  isGreenfield: boolean;
}

export interface SchemeRule {
  id: string;
  code: string;
  name: string;
  ministry: string;
  maxProjectCostManufacturing: number;
  maxProjectCostService: number;
  maxSubsidyPercentRuralSpecial: number;
  maxSubsidyPercentRuralGeneral: number;
  maxSubsidyPercentUrbanSpecial: number;
  maxSubsidyPercentUrbanGeneral: number;
  promoterContributionSpecial: number; // %
  promoterContributionGeneral: number; // %
  collateralFree: boolean;
  eligibleGenders: Gender[];
  eligibleCategories: SocialCategory[];
  keyHighlights: string[];
  requiredDocuments: string[];
  applicationPortalUrl: string;
  description: string;
}

export interface SchemeMatchResult {
  scheme: SchemeRule;
  matchScore: number; // 0 - 100
  isEligible: boolean;
  eligibleSubsidyPercent: number;
  calculatedSubsidyAmount: number;
  ownContributionRequiredPercent: number;
  ownContributionRequiredAmount: number;
  bankLoanAmount: number;
  eligibilityNotes: string[];
  stepsToApply: string[];
}
