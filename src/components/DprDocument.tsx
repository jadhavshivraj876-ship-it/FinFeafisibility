'use client';

import React from 'react';
import { 
  Building2, 
  Printer, 
  Download, 
  CheckCircle2, 
  FileSpreadsheet, 
  Calendar, 
  MapPin, 
  User, 
  Briefcase,
  ShieldCheck
} from 'lucide-react';
import { BusinessTemplate, DistrictData, EntrepreneurProfile, FinancialAnalysis, SchemeMatchResult } from '@/types';

interface DprDocumentProps {
  business: BusinessTemplate;
  district: DistrictData;
  profile: EntrepreneurProfile;
  financials: FinancialAnalysis;
  matchedScheme?: SchemeMatchResult;
}

export const DprDocument: React.FC<DprDocumentProps> = ({
  business,
  district,
  profile,
  financials,
  matchedScheme
}) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const refNumber = `DPR/FINFEAS/${district.id.slice(0, 3).toUpperCase()}/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden print:shadow-none print:border-none print:m-0">
      {/* Action Banner (Hidden when printing) */}
      <div className="p-4 bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-5 h-5 text-amber-300" />
          <div>
            <h3 className="font-bold text-sm">Official Bank-Ready Detailed Project Report (DPR)</h3>
            <p className="text-[11px] text-emerald-100">
              Compliant with PMEGP, Mudra & RBI Priority Sector Lending Guidelines
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-emerald-900 font-bold text-xs shadow-sm hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-emerald-700" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Body */}
      <div className="p-8 sm:p-12 text-zinc-800 dark:text-zinc-200 text-xs leading-normal font-sans max-w-4xl mx-auto print:p-0 print:max-w-full">
        {/* Official Header */}
        <div className="border-b-2 border-emerald-800 pb-4 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-xl">
                FF
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-emerald-900 dark:text-emerald-300 uppercase">
                  Detailed Project Appraisal Report (DPR)
                </h1>
                <p className="text-[11px] text-zinc-500 font-medium">
                  Prepared under FinFeasibility AI Hyper-Local Advisory Platform
                </p>
                <p className="text-[10px] text-emerald-800 dark:text-emerald-400 font-semibold mt-0.5">
                  Target Scheme: {matchedScheme?.scheme.name || "Prime Minister's Employment Generation Programme (PMEGP)"}
                </p>
              </div>
            </div>

            <div className="text-right text-[10px] text-zinc-500 space-y-0.5">
              <p className="font-mono font-bold text-zinc-800 dark:text-zinc-200">{refNumber}</p>
              <p>Date: {currentDate}</p>
              <p className="text-emerald-700 font-semibold">Classification: Micro Enterprise</p>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="mb-6">
          <div className="bg-emerald-800 text-white px-3 py-1 font-bold uppercase tracking-wider text-[11px] rounded-sm mb-3">
            Section 1: Executive Project Summary
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Proposed Enterprise</span>
              <span className="font-bold text-zinc-900 dark:text-white text-xs">{business.title}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Total Project Cost</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs">₹{financials.projectCost.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Promoter Margin (Own)</span>
              <span className="font-bold text-zinc-900 dark:text-white text-xs">₹{financials.ownContribution.toLocaleString('en-IN')} ({Math.round(financials.ownContribution * 100 / financials.projectCost)}%)</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Govt Capital Subsidy</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 text-xs">₹{financials.subsidyAmount.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Bank Term Loan</span>
              <span className="font-bold text-zinc-900 dark:text-white text-xs">₹{financials.netBankLoan.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Estimated Monthly EMI</span>
              <span className="font-bold text-zinc-900 dark:text-white text-xs">₹{financials.monthlyEmi.toLocaleString('en-IN')}/mo</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Average DSCR</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs">{financials.averageDscr} (Bank Viable)</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Break-Even Point (BEP)</span>
              <span className="font-bold text-zinc-900 dark:text-white text-xs">{financials.breakEvenPercentage}% Capacity</span>
            </div>
          </div>
        </div>

        {/* Section 2: Promoter & Enterprise Profile */}
        <div className="mb-6">
          <div className="bg-emerald-800 text-white px-3 py-1 font-bold uppercase tracking-wider text-[11px] rounded-sm mb-3">
            Section 2: Promoter Profile & Location Demographics
          </div>
          <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700 text-[11px]">
            <tbody>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <td className="p-2 font-bold bg-zinc-50 dark:bg-zinc-800/60 w-1/4">Name of Entrepreneur</td>
                <td className="p-2 w-1/4 font-semibold">{profile.name || 'Shri / Smt. Rural Micro-Entrepreneur'}</td>
                <td className="p-2 font-bold bg-zinc-50 dark:bg-zinc-800/60 w-1/4">Age / Gender</td>
                <td className="p-2 w-1/4">{profile.age || 28} Years / {profile.gender}</td>
              </tr>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <td className="p-2 font-bold bg-zinc-50 dark:bg-zinc-800/60">Social Category</td>
                <td className="p-2 font-semibold text-emerald-700 dark:text-emerald-400">{profile.category} (Eligible for Special Rural Subsidy)</td>
                <td className="p-2 font-bold bg-zinc-50 dark:bg-zinc-800/60">Educational Qualification</td>
                <td className="p-2">{profile.education}</td>
              </tr>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <td className="p-2 font-bold bg-zinc-50 dark:bg-zinc-800/60">Unit Location / Area</td>
                <td className="p-2">{profile.locationType} Area, Taluka: {district.talukas[0]}, District: {district.name}</td>
                <td className="p-2 font-bold bg-zinc-50 dark:bg-zinc-800/60">State / Jurisdiction</td>
                <td className="p-2">{district.state}, India</td>
              </tr>
              <tr>
                <td className="p-2 font-bold bg-zinc-50 dark:bg-zinc-800/60">Enterprise Classification</td>
                <td className="p-2">Greenfield Micro Enterprise</td>
                <td className="p-2 font-bold bg-zinc-50 dark:bg-zinc-800/60">Local Gram Panchayat NOC</td>
                <td className="p-2 text-emerald-700 dark:text-emerald-400 font-semibold">Enclosed & Verified</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Project Cost & Means of Finance */}
        <div className="mb-6">
          <div className="bg-emerald-800 text-white px-3 py-1 font-bold uppercase tracking-wider text-[11px] rounded-sm mb-3">
            Section 3: Project Cost Schedule & Means of Finance
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cost Schedule Table */}
            <div>
              <h4 className="font-bold text-[11px] text-zinc-900 dark:text-white mb-1.5 flex items-center gap-1">
                <span>(A) Capital Expenditure Schedule</span>
              </h4>
              <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700 text-[10px]">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="p-1.5 text-left border border-zinc-200 dark:border-zinc-700">Item Description</th>
                    <th className="p-1.5 text-right border border-zinc-200 dark:border-zinc-700">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {business.capexItems.map((item, idx) => (
                    <tr key={idx} className="border-b border-zinc-200 dark:border-zinc-700">
                      <td className="p-1.5">{item.item}</td>
                      <td className="p-1.5 text-right font-mono">₹{item.cost.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  <tr className="bg-zinc-50 dark:bg-zinc-800 font-bold">
                    <td className="p-1.5">Total CapEx (Plant, Machinery & Works)</td>
                    <td className="p-1.5 text-right font-mono text-emerald-700">
                      ₹{business.capexItems.reduce((acc, c) => acc + c.cost, 0).toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Means of Finance Table */}
            <div>
              <h4 className="font-bold text-[11px] text-zinc-900 dark:text-white mb-1.5 flex items-center gap-1">
                <span>(B) Means of Financing</span>
              </h4>
              <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700 text-[10px]">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="p-1.5 text-left border border-zinc-200 dark:border-zinc-700">Source of Finance</th>
                    <th className="p-1.5 text-center border border-zinc-200 dark:border-zinc-700">% Share</th>
                    <th className="p-1.5 text-right border border-zinc-200 dark:border-zinc-700">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="p-1.5 font-semibold">Promoter Own Contribution (Margin Money)</td>
                    <td className="p-1.5 text-center">{Math.round(financials.ownContribution * 100 / financials.projectCost)}%</td>
                    <td className="p-1.5 text-right font-mono">₹{financials.ownContribution.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="p-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
                      Government Margin Money Subsidy ({matchedScheme?.eligibleSubsidyPercent || 35}%)
                    </td>
                    <td className="p-1.5 text-center font-bold">{matchedScheme?.eligibleSubsidyPercent || 35}%</td>
                    <td className="p-1.5 text-right font-mono font-bold text-amber-700 dark:text-amber-400">
                      ₹{financials.subsidyAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-200 dark:border-zinc-700">
                    <td className="p-1.5 font-semibold">Bank Term Loan (Senior Debt)</td>
                    <td className="p-1.5 text-center">{100 - Math.round(financials.ownContribution * 100 / financials.projectCost)}%</td>
                    <td className="p-1.5 text-right font-mono">₹{financials.netBankLoan.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-zinc-50 dark:bg-zinc-800 font-bold">
                    <td className="p-1.5">Total Financing Mobilized</td>
                    <td className="p-1.5 text-center">100%</td>
                    <td className="p-1.5 text-right font-mono text-emerald-700">
                      ₹{financials.projectCost.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-2 text-[10px] text-zinc-500 italic bg-amber-50 dark:bg-zinc-800 p-2 rounded border border-amber-200 dark:border-zinc-700">
                * Note for Credit Officer: Subsidy will be deposited into a Term Deposit Receipt (TDR) in the entrepreneur&apos;s name for a lock-in period of 3 years under PMEGP nodal guidelines.
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: 3-Year Profitability & DSCR */}
        <div className="mb-6">
          <div className="bg-emerald-800 text-white px-3 py-1 font-bold uppercase tracking-wider text-[11px] rounded-sm mb-3">
            Section 4: 3-Year Projected Profitability & Debt Service Coverage (DSCR)
          </div>
          <table className="w-full border-collapse border border-zinc-200 dark:border-zinc-700 text-[10px]">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="p-1.5 text-left border border-zinc-200 dark:border-zinc-700">Financial Parameter (₹)</th>
                <th className="p-1.5 text-right border border-zinc-200 dark:border-zinc-700">Year 1 (75% Cap)</th>
                <th className="p-1.5 text-right border border-zinc-200 dark:border-zinc-700">Year 2 (90% Cap)</th>
                <th className="p-1.5 text-right border border-zinc-200 dark:border-zinc-700">Year 3 (100% Cap)</th>
              </tr>
            </thead>
            <tbody>
              {financials.cashFlowYears.map((cf) => (
                <React.Fragment key={cf.year}>
                  {/* Single table rows */}
                </React.Fragment>
              ))}
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <td className="p-1.5 font-semibold">Gross Annual Sales Revenue</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[0].revenue.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[1].revenue.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[2].revenue.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                <td className="p-1.5">Less: Cost of Raw Materials & Consumables</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[0].cogs.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[1].cogs.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[2].cogs.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                <td className="p-1.5">Less: Wages, Power, Fuel & Administration</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[0].operatingExpenses.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[1].operatingExpenses.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[2].operatingExpenses.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                <td className="p-1.5">Less: Depreciation (10% on Plant & Machinery)</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[0].depreciation.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[1].depreciation.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[2].depreciation.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400">
                <td className="p-1.5">Less: Bank Loan Interest</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[0].interestPaid.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[1].interestPaid.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono">₹{financials.cashFlowYears[2].interestPaid.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="border-b border-zinc-200 dark:border-zinc-700 font-bold bg-emerald-50/50 dark:bg-emerald-950/20">
                <td className="p-1.5 text-emerald-900 dark:text-emerald-300">Net Profit After Tax (PAT)</td>
                <td className="p-1.5 text-right font-mono text-emerald-800 dark:text-emerald-400">₹{financials.cashFlowYears[0].netProfit.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono text-emerald-800 dark:text-emerald-400">₹{financials.cashFlowYears[1].netProfit.toLocaleString('en-IN')}</td>
                <td className="p-1.5 text-right font-mono text-emerald-800 dark:text-emerald-400">₹{financials.cashFlowYears[2].netProfit.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="bg-zinc-100 dark:bg-zinc-800 font-bold">
                <td className="p-1.5 text-emerald-800 dark:text-emerald-300">Debt Service Coverage Ratio (DSCR)</td>
                <td className="p-1.5 text-right font-mono">{financials.cashFlowYears[0].dscr}</td>
                <td className="p-1.5 text-right font-mono">{financials.cashFlowYears[1].dscr}</td>
                <td className="p-1.5 text-right font-mono">{financials.cashFlowYears[2].dscr}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[10px] text-zinc-500 mt-1.5">
            * Banking Criterion: Commercial banks mandate minimum DSCR &ge; 1.40 for priority-sector micro loans. This project achieves an average DSCR of <strong className="text-emerald-700 dark:text-emerald-400">{financials.averageDscr}</strong>, confirming high debt servicing resilience.
          </p>
        </div>

        {/* Section 5: Statutory Checklist & Declarations */}
        <div className="mb-8">
          <div className="bg-emerald-800 text-white px-3 py-1 font-bold uppercase tracking-wider text-[11px] rounded-sm mb-3">
            Section 5: Statutory Compliance & Formal Sign-off
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] mb-6">
            <div className="p-2 border border-emerald-200 dark:border-emerald-800 rounded bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Udyam Aadhaar Ready</span>
            </div>
            <div className="p-2 border border-emerald-200 dark:border-emerald-800 rounded bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>FSSAI Norms Formatted</span>
            </div>
            <div className="p-2 border border-emerald-200 dark:border-emerald-800 rounded bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pollution Consent Green</span>
            </div>
            <div className="p-2 border border-emerald-200 dark:border-emerald-800 rounded bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Gram Panchayat NOC</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 pt-12 text-center text-[11px]">
            <div>
              <div className="w-44 border-b border-zinc-400 mx-auto mb-1"></div>
              <p className="font-bold text-zinc-900 dark:text-white">Signature of Entrepreneur</p>
              <p className="text-[10px] text-zinc-500">Promoter / Applicant</p>
            </div>
            <div>
              <div className="w-44 border-b border-zinc-400 mx-auto mb-1"></div>
              <p className="font-bold text-zinc-900 dark:text-white">Verified by Branch Credit Officer</p>
              <p className="text-[10px] text-zinc-500">Lead District Bank / DIC Officer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
