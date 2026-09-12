import { EntrepreneurProfile, SchemeMatchResult, SchemeRule } from '@/types';
import { SCHEMES_DATABASE } from '@/data/schemes';

export function matchSchemesForProfile(profile: EntrepreneurProfile): SchemeMatchResult[] {
  const isSpecialCategory =
    profile.gender === 'Female' ||
    profile.gender === 'Transgender' ||
    profile.category === 'SC' ||
    profile.category === 'ST' ||
    profile.category === 'OBC' ||
    profile.category === 'Minority' ||
    profile.category === 'Ex-Servicemen' ||
    profile.category === 'Specially-Abled';

  const isRural = profile.locationType === 'Rural';

  const results: SchemeMatchResult[] = SCHEMES_DATABASE.map((scheme: SchemeRule) => {
    let score = 50;
    const notes: string[] = [];
    let isEligible = true;

    // 1. Project Cost limit checks
    const maxCost =
      profile.projectType === 'Manufacturing'
        ? scheme.maxProjectCostManufacturing
        : scheme.maxProjectCostService;

    if (profile.projectCost > maxCost) {
      isEligible = false;
      score -= 40;
      notes.push(`Project cost (₹${(profile.projectCost / 100000).toFixed(1)} Lakhs) exceeds scheme ceiling of ₹${(maxCost / 100000).toFixed(1)} Lakhs.`);
    } else {
      score += 20;
    }

    // 2. Scheme specific checks
    if (scheme.id === 'standup-india') {
      const isWomanOrScSt = profile.gender === 'Female' || profile.category === 'SC' || profile.category === 'ST';
      if (!isWomanOrScSt) {
        isEligible = false;
        score -= 50;
        notes.push('Stand-Up India is strictly reserved for SC, ST, or Women entrepreneurs.');
      } else if (!profile.isGreenfield) {
        isEligible = false;
        score -= 30;
        notes.push('Stand-Up India requires the venture to be a first-time (greenfield) enterprise.');
      } else {
        score += 35;
        notes.push('Eligible for priority greenfield sanction under Scheduled Bank mandate.');
      }
    }

    if (scheme.id === 'pmegp') {
      if (profile.projectCost > 1000000 && profile.education === 'Below 8th') {
        notes.push('Under PMEGP, 8th standard pass certificate is mandatory for projects above ₹10 Lakhs.');
      }
      if (isRural) {
        score += 20;
        notes.push('High subsidy bonus: Rural micro-enterprises receive higher margin money subsidy.');
      }
    }

    // Determine applicable subsidy percentage
    let eligibleSubsidyPercent = 0;
    let ownContributionRequiredPercent = scheme.promoterContributionGeneral;

    if (isRural) {
      if (isSpecialCategory) {
        eligibleSubsidyPercent = scheme.maxSubsidyPercentRuralSpecial;
        ownContributionRequiredPercent = scheme.promoterContributionSpecial;
      } else {
        eligibleSubsidyPercent = scheme.maxSubsidyPercentRuralGeneral;
        ownContributionRequiredPercent = scheme.promoterContributionGeneral;
      }
    } else {
      if (isSpecialCategory) {
        eligibleSubsidyPercent = scheme.maxSubsidyPercentUrbanSpecial;
        ownContributionRequiredPercent = scheme.promoterContributionSpecial;
      } else {
        eligibleSubsidyPercent = scheme.maxSubsidyPercentUrbanGeneral;
        ownContributionRequiredPercent = scheme.promoterContributionGeneral;
      }
    }

    // Calculate monetary figures
    const calculatedSubsidyAmount = Math.round((profile.projectCost * eligibleSubsidyPercent) / 100);
    const ownContributionRequiredAmount = Math.round((profile.projectCost * ownContributionRequiredPercent) / 100);
    const bankLoanAmount = Math.max(0, profile.projectCost - ownContributionRequiredAmount);

    if (eligibleSubsidyPercent > 0) {
      score += 15;
      notes.push(`Eligible for ${eligibleSubsidyPercent}% capital subsidy worth ₹${calculatedSubsidyAmount.toLocaleString('en-IN')}.`);
    }

    if (scheme.collateralFree && profile.projectCost <= 1000000) {
      score += 10;
      notes.push('100% Collateral-free loan coverage under CGTMSE / CGFMU.');
    }

    const finalScore = Math.min(99, Math.max(15, isEligible ? score : 20));

    const stepsToApply = [
      `1. Register your enterprise on the official Udyam MSME portal (udyamregistration.gov.in) using Aadhaar.`,
      `2. Prepare your 10-page Detailed Project Report (DPR) downloaded directly from FinFeasibility.`,
      `3. Collect machinery proforma invoices / quotations from verified industrial suppliers.`,
      `4. Apply online at ${scheme.code} portal (${scheme.applicationPortalUrl}) selecting your Lead District Bank.`,
      `5. Submit physical DPR copy and rural certificate to District Industries Centre (DIC) or local bank branch.`
    ];

    return {
      scheme,
      matchScore: finalScore,
      isEligible,
      eligibleSubsidyPercent,
      calculatedSubsidyAmount,
      ownContributionRequiredPercent,
      ownContributionRequiredAmount,
      bankLoanAmount,
      eligibilityNotes: notes,
      stepsToApply
    };
  });

  // Sort by matchScore descending
  return results.sort((a, b) => b.matchScore - a.matchScore);
}
