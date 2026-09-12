import { FinancialInputs, FinancialAnalysis, CashFlowYear } from '@/types';

export function calculateMonthlyEmi(principal: number, annualInterestRate: number, tenureYears: number): number {
  if (principal <= 0 || tenureYears <= 0) return 0;
  const monthlyRate = annualInterestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  if (monthlyRate === 0) return principal / totalMonths;

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return Math.round(emi);
}

export function performFinancialAnalysis(
  inputs: FinancialInputs,
  subsidyPercentage: number = 25
): FinancialAnalysis {
  const {
    projectCost,
    ownContributionPercent,
    annualInterestRate,
    tenureYears,
    monthlySalesRevenue,
    monthlyRawMaterialCost,
    monthlyLaborCost,
    monthlyPowerAndUtilities,
    monthlyPackagingAndLogistics,
    monthlyOtherOverheads
  } = inputs;

  const ownContribution = Math.round((projectCost * ownContributionPercent) / 100);
  const subsidyAmount = Math.round((projectCost * subsidyPercentage) / 100);
  const loanAmount = Math.max(0, projectCost - ownContribution);
  // Net loan liability after accounting for backend credit subsidy if applicable
  const netBankLoan = Math.max(0, projectCost - ownContribution);

  const monthlyEmi = calculateMonthlyEmi(netBankLoan, annualInterestRate, tenureYears);
  const totalRepayment = monthlyEmi * (tenureYears * 12);
  const totalInterest = Math.max(0, totalRepayment - netBankLoan);

  // Annual operating projections
  // Capacity ramping: Year 1 = 75%, Year 2 = 90%, Year 3 = 100%
  const annualCapacityFactors = [0.75, 0.90, 1.0];
  const cashFlowYears: CashFlowYear[] = [];
  let runningCumulativeCash = 0;

  // Initial plant & machinery estimated at 60% of total project cost for depreciation calculation (10% SLM)
  const machineryCost = projectCost * 0.65;
  const annualDepreciation = Math.round(machineryCost * 0.10);

  let totalDscrSum = 0;

  for (let y = 1; y <= 3; y++) {
    const factor = annualCapacityFactors[y - 1];
    const revenue = Math.round(monthlySalesRevenue * 12 * factor);
    const rawMaterial = Math.round(monthlyRawMaterialCost * 12 * factor);
    const packagingAndLogistics = Math.round(monthlyPackagingAndLogistics * 12 * factor);
    const cogs = rawMaterial + packagingAndLogistics;
    const grossProfit = revenue - cogs;

    const labor = Math.round(monthlyLaborCost * 12);
    const power = Math.round(monthlyPowerAndUtilities * 12 * (0.8 + 0.2 * factor));
    const otherOverheads = Math.round(monthlyOtherOverheads * 12);
    const operatingExpenses = labor + power + otherOverheads;

    // Loan amortization approximate interest vs principal for this year
    // Remaining balance reducing
    const yearStartPrincipal = Math.max(0, netBankLoan - (y - 1) * (netBankLoan / tenureYears));
    const yearInterest = Math.round(yearStartPrincipal * (annualInterestRate / 100));
    const yearPrincipal = Math.round(Math.min(yearStartPrincipal, netBankLoan / tenureYears));
    const annualDebtService = yearInterest + yearPrincipal;

    const ebitda = grossProfit - operatingExpenses;
    const profitBeforeTax = ebitda - annualDepreciation - yearInterest;
    // Micro enterprises below 50L income tax under presumptive or 20% slab
    const tax = profitBeforeTax > 0 ? Math.round(profitBeforeTax * 0.15) : 0;
    const netProfit = profitBeforeTax - tax;

    // Bank DSCR Formula = (Net Profit + Depreciation + Interest on Term Loan) / (Interest + Principal Repayment)
    const numerator = Math.max(0, netProfit + annualDepreciation + yearInterest);
    const denominator = annualDebtService > 0 ? annualDebtService : 1;
    const dscr = Number((numerator / denominator).toFixed(2));
    totalDscrSum += dscr;

    const netCashFlow = netProfit + annualDepreciation - yearPrincipal;
    runningCumulativeCash += netCashFlow;

    cashFlowYears.push({
      year: y,
      revenue,
      cogs,
      grossProfit,
      operatingExpenses,
      interestPaid: yearInterest,
      principalPaid: yearPrincipal,
      depreciation: annualDepreciation,
      profitBeforeTax,
      tax,
      netProfit,
      netCashFlow,
      cumulativeCash: runningCumulativeCash,
      dscr
    });
  }

  const averageDscr = Number((totalDscrSum / 3).toFixed(2));

  // Break-Even Analysis at 100% capacity
  const annualTotalRevenue = monthlySalesRevenue * 12;
  const annualVariableCosts = (monthlyRawMaterialCost + monthlyPackagingAndLogistics) * 12;
  const annualFixedCosts = (monthlyLaborCost + monthlyPowerAndUtilities + monthlyOtherOverheads) * 12 + annualDepreciation + Math.round(netBankLoan * (annualInterestRate / 100));

  const variableCostRatio = annualTotalRevenue > 0 ? annualVariableCosts / annualTotalRevenue : 0.6;
  const contributionMarginRatio = 1 - variableCostRatio;
  const breakEvenAnnualRevenue = contributionMarginRatio > 0 ? annualFixedCosts / contributionMarginRatio : annualTotalRevenue * 0.7;
  const breakEvenMonthlyRevenue = Math.round(breakEvenAnnualRevenue / 12);
  const breakEvenPercentage = Math.min(100, Math.max(10, Math.round((breakEvenAnnualRevenue / annualTotalRevenue) * 100)));

  // Bank Viability check
  const isBankViable = averageDscr >= 1.4 && breakEvenPercentage <= 65;
  let dscrRating: FinancialAnalysis['dscrRating'] = 'Good';
  if (averageDscr >= 1.75) dscrRating = 'Excellent';
  else if (averageDscr >= 1.4) dscrRating = 'Good';
  else if (averageDscr >= 1.15) dscrRating = 'Borderline';
  else dscrRating = 'High Risk';

  // Payback period
  const annualNetCash = cashFlowYears[1].netCashFlow;
  const paybackPeriodYears = annualNetCash > 0 ? Number((projectCost / annualNetCash).toFixed(1)) : 4.5;

  return {
    projectCost,
    ownContribution,
    loanAmount,
    subsidyAmount,
    netBankLoan,
    monthlyEmi,
    totalInterest,
    breakEvenMonthlyRevenue,
    breakEvenPercentage,
    averageDscr,
    isBankViable,
    dscrRating,
    cashFlowYears,
    paybackPeriodYears
  };
}
