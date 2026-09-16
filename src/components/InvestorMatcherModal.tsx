'use client';

import React, { useState, useMemo } from 'react';
import { 
  X, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Award, 
  Sparkles, 
  Copy, 
  Check, 
  Send,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Filter
} from 'lucide-react';
import { matchInvestorsForBusiness, InvestorMatchResult } from '@/data/investors';
import { BusinessTemplate, DistrictData } from '@/types';

interface InvestorMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: BusinessTemplate;
  district: DistrictData;
  projectCost: number;
  dscr: number;
  subsidyPercent: number;
}

export const InvestorMatcherModal: React.FC<InvestorMatcherModalProps> = ({
  isOpen,
  onClose,
  business,
  district,
  projectCost,
  dscr,
  subsidyPercent,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [pitchModalInvestor, setPitchModalInvestor] = useState<InvestorMatchResult | null>(null);
  const [copied, setCopied] = useState(false);

  const matchedResults = useMemo(() => {
    return matchInvestorsForBusiness(business.category, district.state, district.name);
  }, [business.category, district.state, district.name]);

  const filteredResults = useMemo(() => {
    if (selectedType === 'all') return matchedResults;
    return matchedResults.filter(r => r.investor.type === selectedType);
  }, [matchedResults, selectedType]);

  if (!isOpen) return null;

  const handleCopyPitch = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePitchText = (investorResult: InvestorMatchResult) => {
    const inv = investorResult.investor;
    return `Subject: Investment Proposal: ${business.title} in ${district.name} (${district.state}) - FinFeasibility DPR Attached

Dear ${inv.contactPerson} & the ${inv.name} Investment Committee,

I hope this email finds you well. 

I am establishing an enterprise in the ${business.category} sector titled "${business.title}" based out of ${district.name}, ${district.state}. We have conducted hyper-local raw material and financial viability modeling on the FinFeasibility AI engine:

Key Financial & Project Metrics:
• Total Project Cost: ₹${(projectCost / 100000).toFixed(2)} Lakhs
• Projected Monthly Revenue: ₹${(business.projectedMonthlyRevenue / 100000).toFixed(2)} Lakhs
• Average Net Profit Margin: ${business.averageMarginPercent}%
• Average Debt Service Coverage Ratio (DSCR): ${dscr} (Bank Viable)
• Government Capital Subsidy Identified: ${subsidyPercent}% (approx ₹${((projectCost * subsidyPercent) / 10000000).toFixed(2)} Lakhs under PMEGP / PMFME)
• Local Proximity: Direct farm-gate procurement from ${district.apmcMarkets[0] || 'local Mandi'}

Given ${inv.name}'s expertise and active portfolio in ${business.category}, we would be honored to share our Detailed Project Report (DPR) and explore equity/debt co-financing opportunities.

Looking forward to connecting with your team.

Warm regards,
Promoter / Founder
FinFeasibility Entrepreneur Network
Location: ${district.name}, ${district.state}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-emerald-200 dark:border-zinc-700 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-emerald-950 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white text-xl">
              🤝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black tracking-tight">Regional Investor Network</h3>
                <span className="text-[10px] uppercase font-bold bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full">
                  Verified Contact Directory
                </span>
              </div>
              <p className="text-emerald-200 text-xs mt-0.5">
                Matched for <span className="font-semibold text-white">{business.title}</span> in <span className="font-semibold text-white">{district.name}, {district.state}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-zinc-500" />
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Filter By Investor Type:</span>
            <div className="flex flex-wrap gap-1.5">
              {['all', 'Agri & Impact VC', 'Angel Network', 'Government & Institutional Fund', 'Seed Accelerator'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                    selectedType === type
                      ? 'bg-emerald-700 text-white'
                      : 'bg-white dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {type === 'all' ? 'All Investors' : type}
                </button>
              ))}
            </div>
          </div>

          <div className="text-zinc-500 dark:text-zinc-400">
            Showing <strong className="text-emerald-700 dark:text-emerald-400">{filteredResults.length}</strong> matched funds
          </div>
        </div>

        {/* Investor Cards List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredResults.map((item) => {
            const inv = item.investor;
            return (
              <div
                key={inv.id}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                      {inv.logoBadge}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                          {inv.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {inv.type}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        <span>{inv.officeLocation}</span>
                      </p>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0">
                    <div className="flex items-center gap-1 text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{item.matchScore}% Match</span>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-semibold sm:mt-1">
                      Check: {inv.ticketSizeRange}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {inv.description}
                </p>

                {/* Match Reasons */}
                <div className="flex flex-wrap gap-1.5">
                  {item.matchReasons.map((r, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[10px] font-medium bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded"
                    >
                      <Check className="w-2.5 h-2.5 text-emerald-600" />
                      {r}
                    </span>
                  ))}
                </div>

                {/* Contact and Action Row */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-4 text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-600" />
                      <a href={`mailto:${inv.contactEmail}`} className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
                        {inv.contactEmail}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{inv.contactPhone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-zinc-400" />
                      <a
                        href={inv.websiteUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:underline text-zinc-500 inline-flex items-center gap-0.5"
                      >
                        <span>Portal</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => setPitchModalInvestor(item)}
                    className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer text-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                    <span>Generate Pitch Note</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pitch Note Generator Drawer / Sub-modal */}
        {pitchModalInvestor && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div 
              className="bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-zinc-700 rounded-2xl shadow-2xl p-6 max-w-2xl w-full space-y-4 max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                    Ready-to-Send Pitch to {pitchModalInvestor.investor.name}
                  </h4>
                </div>
                <button
                  onClick={() => setPitchModalInvestor(null)}
                  className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-zinc-500">
                This pitch note includes your exact project cost, DSCR loan viability, and local mandi sourcing metrics generated for this investor.
              </p>

              <textarea
                readOnly
                value={generatePitchText(pitchModalInvestor)}
                rows={12}
                className="w-full p-3 text-xs font-mono bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-xl leading-relaxed text-zinc-800 dark:text-zinc-200 resize-none outline-hidden"
              />

              <div className="flex items-center justify-between gap-3 pt-2">
                <a
                  href={`mailto:${pitchModalInvestor.investor.contactEmail}?subject=${encodeURIComponent(`Investment Proposal: ${business.title} in ${district.name} (${district.state})`)}&body=${encodeURIComponent(generatePitchText(pitchModalInvestor))}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open in Email App</span>
                </a>

                <button
                  onClick={() => handleCopyPitch(generatePitchText(pitchModalInvestor))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Pitch Text'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
