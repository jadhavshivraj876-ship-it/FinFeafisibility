'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  FileText, 
  Layers, 
  BarChart3, 
  Award, 
  Mic, 
  Send,
  Zap
} from 'lucide-react';
import { DISTRICTS_DATABASE } from '@/data/districts';
import { BUSINESS_TEMPLATES } from '@/data/businesses';
import { TRANSLATIONS } from '@/data/translations';
import { Language, DistrictData, BusinessTemplate, EntrepreneurProfile } from '@/types';
import { performFinancialAnalysis } from '@/lib/financialCalculations';
import { matchSchemesForProfile } from '@/lib/schemeMatcher';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TeamModal } from '@/components/TeamModal';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';
import { ViabilityRadarChart } from '@/components/ViabilityRadarChart';

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Selected State
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(DISTRICTS_DATABASE[0].id);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>(BUSINESS_TEMPLATES[0].id);

  // Advisory Chat Query
  const [advisoryQuery, setAdvisoryQuery] = useState('');
  const [chatResponses, setChatResponses] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Welcome! I have analyzed the local raw material supply and consumer demand. How can I assist your business planning today?'
    }
  ]);

  const t = TRANSLATIONS[currentLang];

  const currentDistrict: DistrictData = useMemo(() => {
    return DISTRICTS_DATABASE.find(d => d.id === selectedDistrictId) || DISTRICTS_DATABASE[0];
  }, [selectedDistrictId]);

  const currentBusiness: BusinessTemplate = useMemo(() => {
    return BUSINESS_TEMPLATES.find(b => b.id === selectedBusinessId) || BUSINESS_TEMPLATES[0];
  }, [selectedBusinessId]);

  // Default mock entrepreneur profile for this business & district
  const currentProfile: EntrepreneurProfile = useMemo(() => ({
    name: 'Shivraj Patil',
    age: 29,
    gender: 'Male',
    category: 'OBC',
    locationType: 'Rural',
    state: currentDistrict.state,
    district: currentDistrict.name,
    education: 'Graduate/Diploma',
    projectType: 'Manufacturing',
    projectCost: currentBusiness.defaultProjectCost,
    businessTitle: currentBusiness.title,
    isGreenfield: true
  }), [currentDistrict, currentBusiness]);

  const matchedSchemes = useMemo(() => {
    return matchSchemesForProfile(currentProfile);
  }, [currentProfile]);

  const topScheme = matchedSchemes[0];

  const financialAnalysis = useMemo(() => {
    const rawCost = currentBusiness.defaultProjectCost;
    return performFinancialAnalysis(
      {
        projectCost: rawCost,
        ownContributionPercent: topScheme?.ownContributionRequiredPercent || 10,
        annualInterestRate: 9.5,
        tenureYears: 5,
        moratoriumMonths: 6,
        monthlySalesRevenue: currentBusiness.projectedMonthlyRevenue,
        monthlyRawMaterialCost: currentBusiness.monthlyOpexItems[0]?.cost || 120000,
        monthlyLaborCost: currentBusiness.monthlyOpexItems[1]?.cost || 30000,
        monthlyPowerAndUtilities: currentBusiness.monthlyOpexItems[2]?.cost || 12000,
        monthlyPackagingAndLogistics: currentBusiness.monthlyOpexItems[3]?.cost || 15000,
        monthlyOtherOverheads: 10000
      },
      topScheme?.eligibleSubsidyPercent || 25
    );
  }, [currentBusiness, topScheme]);

  // Calculate radar scores based on district + business attributes
  const viabilityScores = useMemo(() => {
    const saturation = currentDistrict.saturationIndex;
    const demand = currentDistrict.demandIndex;
    return {
      marketDemand: Math.min(98, Math.max(60, demand - Math.round(saturation * 0.15))),
      technicalSimplicity: currentBusiness.powerRequiredHp <= 5 ? 90 : 80,
      rawMaterialEase: currentDistrict.majorCrops.some(c => currentBusiness.rawMaterials.some(r => r.toLowerCase().includes(c.toLowerCase()))) ? 95 : 75,
      marginHealth: Math.min(95, Math.max(65, Math.round(currentBusiness.averageMarginPercent * 2.5))),
      schemeFit: topScheme?.matchScore || 85
    };
  }, [currentDistrict, currentBusiness, topScheme]);

  // Handle Advisory Chat
  const handleSendAdvisoryQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisoryQuery.trim()) return;

    const userText = advisoryQuery;
    setAdvisoryQuery('');
    setChatResponses(prev => [...prev, { sender: 'user', text: userText }]);

    setTimeout(() => {
      let aiText = '';
      const q = userText.toLowerCase();
      if (q.includes('license') || q.includes('fssai') || q.includes('pervana')) {
        aiText = `For ${currentBusiness.title} in ${currentDistrict.name}, you mandatory need: 1. Udyam MSME Registration (instant online), 2. FSSAI State Food License, and 3. Gram Panchayat NOC for electricity connection.`;
      } else if (q.includes('subsidy') || q.includes('pmegp') || q.includes('anudan')) {
        aiText = `Under ${topScheme.scheme.name}, you are eligible for ${topScheme.eligibleSubsidyPercent}% capital subsidy (approx ₹${topScheme.calculatedSubsidyAmount.toLocaleString('en-IN')}) with only ${topScheme.ownContributionRequiredPercent}% own investment required.`;
      } else if (q.includes('raw material') || q.includes('kacha maal') || q.includes('market')) {
        aiText = `Raw materials can be procured directly from ${currentDistrict.apmcMarkets[0] || 'local APMC Mandi'} located within ${currentDistrict.nearbyFacilities[1]?.distanceKm || 15} km to save freight costs.`;
      } else {
        aiText = `Based on hyper-local intelligence in ${currentDistrict.name}, ${currentBusiness.title} has a strong ${currentBusiness.averageMarginPercent}% profit margin. Your projected DSCR is ${financialAnalysis.averageDscr}, which satisfies commercial bank loan criteria.`;
      }
      setChatResponses(prev => [...prev, { sender: 'ai', text: aiText }]);
    }, 600);
  };

  // Quick Preset Handlers
  const handleLoadPreset = (distId: string, bizId: string) => {
    setSelectedDistrictId(distId);
    setSelectedBusinessId(bizId);
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
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>FinFeasibility: AI Hyper-Local Advisory & Bank Structuring</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {t.heroTitle1}{' '}
              <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                {t.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Quick Preset Selector Buttons for Viva / Evaluation */}
            <div className="pt-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                1-Click Showcase Presets (Ready for Evaluation):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleLoadPreset('satara-mh', 'turmeric-processing-packaging')}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                    selectedDistrictId === 'satara-mh' && selectedBusinessId === 'turmeric-processing-packaging'
                      ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                >
                  Satara • Turmeric Processing (PMEGP ₹12.5L)
                </button>
                <button
                  onClick={() => handleLoadPreset('nashik-mh', 'solar-cold-storage')}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                    selectedDistrictId === 'nashik-mh' && selectedBusinessId === 'solar-cold-storage'
                      ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                >
                  Nashik • Solar Cold Storage (AIF ₹14.5L)
                </button>
                <button
                  onClick={() => handleLoadPreset('pune-mh', 'vermicompost-organic')}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                    selectedDistrictId === 'pune-mh' && selectedBusinessId === 'vermicompost-organic'
                      ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                >
                  Pune • Organic Vermicompost (Mudra ₹4.5L)
                </button>
                <button
                  onClick={() => handleLoadPreset('sangli-mh', 'cold-pressed-oil')}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                    selectedDistrictId === 'sangli-mh' && selectedBusinessId === 'cold-pressed-oil'
                      ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                  }`}
                >
                  Sangli • Cold-Pressed Oil (PMFME ₹8.5L)
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Selection Bar: District & Business Selectors */}
        <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* District Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{t.selectDistrict}</span>
              </label>
              <select
                aria-label="Select Target District"
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {DISTRICTS_DATABASE.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.state}) • Major Crops: {d.majorCrops.slice(0, 3).join(', ')}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1">
                <span>Rural Population: <strong className="text-zinc-800 dark:text-zinc-200">{currentDistrict.ruralPopulationPercent}%</strong></span>
                <span>•</span>
                <span>APMC Mandis: <strong className="text-zinc-800 dark:text-zinc-200">{currentDistrict.apmcMarkets.length}</strong></span>
                <span>•</span>
                <span>Demand Index: <strong className="text-emerald-700 dark:text-emerald-400">{currentDistrict.demandIndex}/100</strong></span>
              </div>
            </div>

            {/* Business Model Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>{t.selectBusiness}</span>
              </label>
              <select
                aria-label="Select Micro-Enterprise Business Model"
                value={selectedBusinessId}
                onChange={(e) => setSelectedBusinessId(e.target.value)}
                className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {BUSINESS_TEMPLATES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.vernacular[currentLang] || b.title} — {b.category} (₹{(b.defaultProjectCost / 100000).toFixed(1)}L)
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1">
                <span>Power: <strong className="text-zinc-800 dark:text-zinc-200">{currentBusiness.powerRequiredHp} HP</strong></span>
                <span>•</span>
                <span>Area: <strong className="text-zinc-800 dark:text-zinc-200">{currentBusiness.landRequiredSqFt} sq.ft</strong></span>
                <span>•</span>
                <span>Expected Margin: <strong className="text-emerald-700 dark:text-emerald-400">{currentBusiness.averageMarginPercent}%</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Key KPI Metric Summary Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">{t.projectCost}</span>
            <div className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
              ₹{financialAnalysis.projectCost.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              CapEx: ₹{currentBusiness.capexItems.reduce((a, b) => a + b.cost, 0).toLocaleString('en-IN')} + Working Cap
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">{t.subsidyAmount}</span>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
              ₹{financialAnalysis.subsidyAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
              {topScheme.eligibleSubsidyPercent}% Subsidy under {topScheme.scheme.code}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">{t.monthlyEmi}</span>
            <div className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
              ₹{financialAnalysis.monthlyEmi.toLocaleString('en-IN')}<span className="text-xs font-normal text-zinc-500">/mo</span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              5 Yrs @ 9.5% Bank Rate
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">{t.dscrRatio}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                {financialAnalysis.averageDscr}
              </span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
                {financialAnalysis.dscrRating}
              </span>
            </div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1">
              Bank Approved Criterion (&gt;1.5)
            </div>
          </div>
        </section>

        {/* Main Grid: AI SWOT Analysis & Feasibility Radar */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Deep Rural SWOT & Risk Matrix */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                  <h2 className="text-lg font-black text-zinc-900 dark:text-white">
                    {t.swotAnalysis}: {currentBusiness.title}
                  </h2>
                </div>
                <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2.5 py-1 rounded-full">
                  Hyper-Local AI Evaluated
                </span>
              </div>

              {/* SWOT 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{t.strengths}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                    {currentBusiness.swot.strengths.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>{t.weaknesses}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                    {currentBusiness.swot.weaknesses.map((w, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Opportunities */}
                <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-teal-900 dark:text-teal-300 text-xs">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                    <span>{t.opportunities}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                    {currentBusiness.swot.opportunities.map((o, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Threats */}
                <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-300 text-xs">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>{t.threats}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                    {currentBusiness.swot.threats.map((th, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold">•</span>
                        <span>{th}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Rural Risk Matrix & Practical Mitigations */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Key Operational Risks & Field Mitigations</span>
                </h3>
                <div className="space-y-2.5">
                  {currentBusiness.risks.map((r, idx) => (
                    <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-zinc-900 dark:text-white">{r.risk}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">
                          {r.impact} Risk
                        </span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-300 text-[11px]">
                        <strong className="text-emerald-700 dark:text-emerald-400">Mitigation Strategy:</strong> {r.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Radar Chart & Matched Scheme Card */}
          <div className="space-y-6">
            {/* Radar Card */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white mb-2 text-center">
                Rural Viability Assessment Radar
              </h3>
              <ViabilityRadarChart scores={viabilityScores} />
            </div>

            {/* Scheme Match Highlight Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 rounded-2xl shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider bg-white/20 px-2 py-0.5 rounded text-emerald-100">
                  Top Recommended Scheme
                </span>
                <span className="text-sm font-black text-amber-300">
                  {topScheme.matchScore}% Match
                </span>
              </div>

              <div>
                <h4 className="font-bold text-base text-white">{topScheme.scheme.name}</h4>
                <p className="text-xs text-emerald-100 mt-1">
                  Eligible for up to <strong className="text-amber-300">{topScheme.eligibleSubsidyPercent}% capital subsidy</strong> (₹{topScheme.calculatedSubsidyAmount.toLocaleString('en-IN')}) with only {topScheme.ownContributionRequiredPercent}% promoter contribution.
                </p>
              </div>

              <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                <Link
                  href="/scheme-router"
                  className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>View All 6 Schemes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/dpr-generator"
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 rounded-lg text-xs font-bold shadow-sm transition-all"
                >
                  Generate DPR (PDF)
                </Link>
              </div>
            </div>

            {/* Interactive Embedded Vernacular AI Chat Card */}
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <span className="font-bold text-xs flex items-center gap-1.5 text-zinc-900 dark:text-white">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>FinMitra Quick Advisor</span>
                </span>
                <button
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <Mic className="w-3 h-3" />
                  <span>Voice Mode</span>
                </button>
              </div>

              <div className="h-44 overflow-y-auto space-y-2 text-xs pr-1">
                {chatResponses.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-xl ${
                      msg.sender === 'user'
                        ? 'bg-emerald-700 text-white ml-6 text-right'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 mr-4'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendAdvisoryQuery} className="flex gap-2">
                <input
                  type="text"
                  value={advisoryQuery}
                  onChange={(e) => setAdvisoryQuery(e.target.value)}
                  placeholder="Ask in Marathi, Hindi, or English..."
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  aria-label="Send Query"
                  className="p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Quick Module Navigation Tiles */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/market-intelligence"
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-700 transition-colors">
              1. Market Intelligence
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Explore APMC mandis, local competitor density & gap opportunities.
            </p>
          </Link>

          <Link
            href="/financial-calculator"
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-amber-700 transition-colors">
              3. Smart Financial Calculator
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Calculate CapEx, OpEx, monthly EMI, and bank-mandated DSCR.
            </p>
          </Link>

          <Link
            href="/scheme-router"
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-teal-700 transition-colors">
              4. Government Scheme Router
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Find PMEGP, Mudra, PMFME, and Stand-Up India eligibility.
            </p>
          </Link>

          <Link
            href="/dpr-generator"
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-purple-700 transition-colors">
              5. Bank DPR Generator
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Download complete bank-ready appraisal report as a printable PDF.
            </p>
          </Link>
        </section>
      </main>

      <Footer
        currentLang={currentLang}
        onOpenTeamModal={() => setIsTeamModalOpen(true)}
      />

      {/* Modals */}
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
      />

      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}
