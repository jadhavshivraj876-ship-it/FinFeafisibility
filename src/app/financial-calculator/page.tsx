'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Percent, 
  Calendar,
  FileSpreadsheet,
  Copy,
  Check,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { Language } from '@/types';
import { performFinancialAnalysis } from '@/lib/financialCalculations';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CashFlowChart } from '@/components/CashFlowChart';
import { TeamModal } from '@/components/TeamModal';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';

export default function FinancialCalculatorPage() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Custom Financial Form Inputs
  const [projectCost, setProjectCost] = useState<number>(1250000);
  const [ownContributionPercent, setOwnContributionPercent] = useState<number>(10);
  const [subsidyPercent, setSubsidyPercent] = useState<number>(35); // Default PMEGP rural special
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureYears, setTenureYears] = useState<number>(5);
  const [monthlySales, setMonthlySales] = useState<number>(450000);
  const [monthlyRawMaterial, setMonthlyRawMaterial] = useState<number>(250000);
  const [monthlyLabor, setMonthlyLabor] = useState<number>(45000);
  const [monthlyPower, setMonthlyPower] = useState<number>(18000);
  const [monthlyPackaging, setMonthlyPackaging] = useState<number>(22000);
  const [monthlyOverheads, setMonthlyOverheads] = useState<number>(10000);

  const analysis = useMemo(() => {
    return performFinancialAnalysis(
      {
        projectCost,
        ownContributionPercent,
        annualInterestRate: interestRate,
        tenureYears,
        moratoriumMonths: 6,
        monthlySalesRevenue: monthlySales,
        monthlyRawMaterialCost: monthlyRawMaterial,
        monthlyLaborCost: monthlyLabor,
        monthlyPowerAndUtilities: monthlyPower,
        monthlyPackagingAndLogistics: monthlyPackaging,
        monthlyOtherOverheads: monthlyOverheads
      },
      subsidyPercent
    );
  }, [
    projectCost,
    ownContributionPercent,
    subsidyPercent,
    interestRate,
    tenureYears,
    monthlySales,
    monthlyRawMaterial,
    monthlyLabor,
    monthlyPower,
    monthlyPackaging,
    monthlyOverheads
  ]);

  const handleApplyPreset = (preset: {
    name: string;
    cost: number;
    margin: number;
    subsidy: number;
    rate: number;
    tenure: number;
    sales: number;
    rawMaterial: number;
  }) => {
    setProjectCost(preset.cost);
    setOwnContributionPercent(preset.margin);
    setSubsidyPercent(preset.subsidy);
    setInterestRate(preset.rate);
    setTenureYears(preset.tenure);
    setMonthlySales(preset.sales);
    setMonthlyRawMaterial(preset.rawMaterial);
    setToastMessage({ text: `✓ Applied "${preset.name}" preset configuration!`, type: 'success' });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopySummary = () => {
    const text = `FinFeasibility Financial Appraisal Summary:
• Total Project Cost: ₹${projectCost.toLocaleString('en-IN')}
• Promoter Margin (${ownContributionPercent}%): ₹${analysis.ownContribution.toLocaleString('en-IN')}
• Capital Subsidy (${subsidyPercent}%): ₹${analysis.subsidyAmount.toLocaleString('en-IN')}
• Net Bank Loan: ₹${analysis.netBankLoan.toLocaleString('en-IN')}
• Monthly EMI: ₹${analysis.monthlyEmi.toLocaleString('en-IN')}/mo (Tenure: ${tenureYears} yrs @ ${interestRate}%)
• Average DSCR: ${analysis.averageDscr} (${analysis.dscrRating})
• Break-Even Point: ${analysis.breakEvenPercentage}% Capacity
• Bank Viability: ${analysis.isBankViable ? 'Approved / Bank Viable' : 'Caution / High Debt'}`;
    navigator.clipboard.writeText(text);
    setToastMessage({ text: '✓ Financial appraisal summary copied to clipboard!', type: 'success' });
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onOpenTeamModal={() => setIsTeamModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Header */}
        <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold w-fit">
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>Module 3: Smart Financial Calculator & Bank Loan Structuring</span>
            </div>

            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-all cursor-pointer w-fit"
            >
              <Copy className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copy Financial Summary</span>
            </button>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              Bank Loan, EMI, Subsidy & DSCR Amortization
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed mt-1">
              Configure capital expenditure, calculate your 5%-10% promoter margin, evaluate government capital subsidy savings, and check bank Debt Service Coverage Ratio (DSCR) eligibility.
            </p>
          </div>

          {/* Quick Presets Bar */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Quick Presets:</span>
            </span>
            <button
              type="button"
              onClick={() => handleApplyPreset({
                name: 'PMEGP Agro Processing',
                cost: 1000000,
                margin: 10,
                subsidy: 35,
                rate: 9.5,
                tenure: 5,
                sales: 380000,
                rawMaterial: 210000
              })}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              PMEGP Agro (₹10L)
            </button>

            <button
              type="button"
              onClick={() => handleApplyPreset({
                name: 'Mudra Kishore Enterprise',
                cost: 500000,
                margin: 10,
                subsidy: 0,
                rate: 9.5,
                tenure: 5,
                sales: 220000,
                rawMaterial: 110000
              })}
              className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
            >
              Mudra Kishore (₹5L)
            </button>

            <button
              type="button"
              onClick={() => handleApplyPreset({
                name: 'PMFME Food Processing Unit',
                cost: 1500000,
                margin: 10,
                subsidy: 35,
                rate: 9.5,
                tenure: 5,
                sales: 550000,
                rawMaterial: 300000
              })}
              className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold hover:bg-teal-100 transition-colors cursor-pointer"
            >
              PMFME Processing (₹15L)
            </button>

            <button
              type="button"
              onClick={() => handleApplyPreset({
                name: 'Rural Cold Chain Project',
                cost: 2500000,
                margin: 10,
                subsidy: 35,
                rate: 9.5,
                tenure: 5,
                sales: 800000,
                rawMaterial: 420000
              })}
              className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300 text-xs font-semibold hover:bg-purple-100 transition-colors cursor-pointer"
            >
              Solar Cold Storage (₹25L)
            </button>
          </div>

          {/* Feedback Toast Message */}
          {toastMessage && (
            <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200 ${
              toastMessage.type === 'success' 
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700'
                : 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-700'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMessage.text}</span>
            </div>
          )}

          {/* Live DSCR Bank Viability Status Alert */}
          <div className={`p-3.5 rounded-2xl border flex items-start gap-2.5 text-xs ${
            analysis.isBankViable
              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
              : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200'
          }`}>
            {analysis.isBankViable ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold">
                {analysis.isBankViable 
                  ? `Bank Credit Viable (Average DSCR: ${analysis.averageDscr})`
                  : `Caution: Borderline DSCR (${analysis.averageDscr})`}
              </div>
              <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">
                {analysis.isBankViable 
                  ? `Your Debt Service Coverage Ratio meets commercial bank standards (minimum 1.40). Net monthly loan EMI is ₹${analysis.monthlyEmi.toLocaleString('en-IN')}.`
                  : `Commercial banks typically require DSCR ≥ 1.40 for micro-enterprise loan approval. Consider increasing promoter margin or adjusting revenue projections.`}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Key Output Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Net Bank Term Loan</span>
            <div className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
              ₹{analysis.netBankLoan.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Promoter Margin: ₹{analysis.ownContribution.toLocaleString('en-IN')} ({ownContributionPercent}%)
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Govt Capital Subsidy</span>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
              ₹{analysis.subsidyAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
              {subsidyPercent}% Under Rural PMEGP / PMFME
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Monthly Loan EMI</span>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-1">
              ₹{analysis.monthlyEmi.toLocaleString('en-IN')}<span className="text-xs font-normal text-zinc-500">/mo</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Total Interest: ₹{analysis.totalInterest.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">Average DSCR</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                {analysis.averageDscr}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                analysis.isBankViable ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {analysis.dscrRating}
              </span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Bank Benchmark: &gt; 1.40
            </div>
          </div>
        </section>

        {/* Sliders Form & Cash Flow Chart Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Loan Sliders (5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-5">
            <h2 className="font-bold text-sm text-zinc-900 dark:text-white pb-2 border-b border-zinc-100 dark:border-zinc-800">
              Loan & Project Parameter Controls
            </h2>

            {/* Project Cost Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Total Project Cost</label>
                <span className="font-black text-emerald-700 dark:text-emerald-400">₹{(projectCost / 100000).toFixed(2)} Lakhs</span>
              </div>
              <input
                type="range"
                min="200000"
                max="5000000"
                step="50000"
                value={projectCost}
                onChange={(e) => setProjectCost(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>₹2 Lakhs</span>
                <span>₹25 Lakhs</span>
                <span>₹50 Lakhs</span>
              </div>
            </div>

            {/* Promoter Own Contribution Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Own Contribution (Margin Money)</label>
                <span className="font-black text-zinc-900 dark:text-white">{ownContributionPercent}% (₹{((projectCost * ownContributionPercent) / 100).toLocaleString('en-IN')})</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="5"
                value={ownContributionPercent}
                onChange={(e) => setOwnContributionPercent(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>5% (Special Category)</span>
                <span>10% (General)</span>
                <span>25%</span>
              </div>
            </div>

            {/* Subsidy Percentage Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Govt Capital Subsidy Rate</label>
                <span className="font-black text-amber-600 dark:text-amber-400">{subsidyPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="35"
                step="5"
                value={subsidyPercent}
                onChange={(e) => setSubsidyPercent(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>0% (Mudra)</span>
                <span>25% (PMEGP General)</span>
                <span>35% (PMEGP Special)</span>
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Bank Interest Rate (p.a.)</label>
                <span className="font-black text-zinc-900 dark:text-white">{interestRate}%</span>
              </div>
              <input
                type="range"
                min="7.0"
                max="13.5"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Loan Tenure Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Repayment Tenure</label>
                <span className="font-black text-zinc-900 dark:text-white">{tenureYears} Years ({tenureYears * 12} Months)</span>
              </div>
              <input
                type="range"
                min="2"
                max="7"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Monthly Expected Revenue Slider */}
            <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex justify-between text-xs">
                <label className="font-semibold text-zinc-700 dark:text-zinc-300">Projected Monthly Sales Revenue</label>
                <span className="font-black text-emerald-700 dark:text-emerald-400">₹{monthlySales.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="100000"
                max="1200000"
                step="25000"
                value={monthlySales}
                onChange={(e) => setMonthlySales(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: 3-Year Cash Flow Chart & Financial Viability (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                  3-Year Projected Cash Flow & Profitability
                </h3>
                <span className="text-[11px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
                  BEP: {analysis.breakEvenPercentage}% Capacity
                </span>
              </div>

              <CashFlowChart cashFlowYears={analysis.cashFlowYears} />
            </div>

            {/* Year-by-Year Amortization Breakdown Table */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                  3-Year Financial Appraisal Statement
                </h3>
                <Link
                  href="/dpr-generator"
                  className="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Export to Bank DPR</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-500 text-[10px] uppercase font-bold">
                      <th className="py-2">Year</th>
                      <th className="py-2">Gross Revenue</th>
                      <th className="py-2">Total Costs</th>
                      <th className="py-2">Net Profit</th>
                      <th className="py-2">Debt Service</th>
                      <th className="py-2 text-right">DSCR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {analysis.cashFlowYears.map((cf) => (
                      <tr key={cf.year} className="font-medium text-zinc-700 dark:text-zinc-300">
                        <td className="py-2 font-bold text-zinc-900 dark:text-white">Year {cf.year}</td>
                        <td className="py-2 font-mono">₹{cf.revenue.toLocaleString('en-IN')}</td>
                        <td className="py-2 font-mono">₹{(cf.cogs + cf.operatingExpenses).toLocaleString('en-IN')}</td>
                        <td className="py-2 font-mono text-emerald-700 dark:text-emerald-400 font-bold">₹{cf.netProfit.toLocaleString('en-IN')}</td>
                        <td className="py-2 font-mono">₹{(cf.interestPaid + cf.principalPaid).toLocaleString('en-IN')}</td>
                        <td className="py-2 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">{cf.dscr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer currentLang={currentLang} onOpenTeamModal={() => setIsTeamModalOpen(true)} />
      <TeamModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} />
      <VoiceAssistantModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} currentLang={currentLang} />
    </div>
  );
}
