'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
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
  Navigation,
  RefreshCw,
  Handshake,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { DISTRICTS_DATABASE } from '@/data/districts';
import { TRANSLATIONS } from '@/data/translations';
import { Language, DistrictData, BusinessTemplate, EntrepreneurProfile } from '@/types';
import { performFinancialAnalysis } from '@/lib/financialCalculations';
import { matchSchemesForProfile } from '@/lib/schemeMatcher';
import { detectUserLocation } from '@/lib/geolocation';
import { extractBusinessDomain, generateDemandBusinessTemplate } from '@/lib/businessGenerator';
import { registerCustomBusinessTemplate } from '@/data/businesses';
import { matchInvestorsForBusiness } from '@/data/investors';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TeamModal } from '@/components/TeamModal';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';
import { InvestorMatcherModal } from '@/components/InvestorMatcherModal';
import { ViabilityRadarChart } from '@/components/ViabilityRadarChart';

const POPULAR_IDEAS = [
  'Cold Pressed Wooden Ghani Oil Unit',
  'Solar Powered Decentralized Cold Storage',
  'Turmeric Processing, Polishing & Packaging',
  'Organic Vermicompost & Bio-Fertilizer Plant',
  'Button Mushroom Cultivation & Dehydration',
  'Engineered Bamboo Boards & Handicrafts',
  'Kisan Drone Spraying & Custom Hiring Centre'
];

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);

  // Auto-Location State
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(DISTRICTS_DATABASE[0].id);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [detectedLocationBadge, setDetectedLocationBadge] = useState<string | null>(null);

  // Dynamic Micro-Enterprise Model Idea
  const [businessIdeaInput, setBusinessIdeaInput] = useState<string>('Cold Pressed Wooden Ghani Oil Unit');
  const [ideaInputValue, setIdeaInputValue] = useState<string>('Cold Pressed Wooden Ghani Oil Unit');

  // Advisory Chat Query
  const [advisoryQuery, setAdvisoryQuery] = useState('');
  const [chatResponses, setChatResponses] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Welcome! I have analyzed the local raw material supply, consumer demand, and bankability. Enter your enterprise idea or ask me anything!'
    }
  ]);

  const t = TRANSLATIONS[currentLang];

  // Auto-detect user location on initial mount
  useEffect(() => {
    handleAutoDetectLocation();
  }, []);

  const handleAutoDetectLocation = () => {
    setIsDetectingLocation(true);
    detectUserLocation()
      .then((res) => {
        if (res && res.matchedDistrict) {
          setSelectedDistrictId(res.matchedDistrict.id);
          setDetectedLocationBadge(
            `${res.district || res.matchedDistrict.name}, ${res.state || res.matchedDistrict.state} (${res.source.toUpperCase()})`
          );
        }
      })
      .catch((err) => {
        console.warn('Geolocation auto-detection fallback:', err);
      })
      .finally(() => {
        setIsDetectingLocation(false);
      });
  };

  const currentDistrict: DistrictData = useMemo(() => {
    return DISTRICTS_DATABASE.find(d => d.id === selectedDistrictId) || DISTRICTS_DATABASE[0];
  }, [selectedDistrictId]);

  // Extract domain/sector dynamically from user's business idea
  const domainClassification = useMemo(() => {
    return extractBusinessDomain(businessIdeaInput);
  }, [businessIdeaInput]);

  // Dynamically synthesize full BusinessTemplate from user's idea
  const currentBusiness: BusinessTemplate = useMemo(() => {
    const template = generateDemandBusinessTemplate(
      businessIdeaInput.trim() || 'Micro-Enterprise Unit',
      domainClassification.category
    );
    registerCustomBusinessTemplate(template);
    return template;
  }, [businessIdeaInput, domainClassification.category]);

  // Match investors based on extracted domain, region, and project metrics
  const matchedInvestors = useMemo(() => {
    return matchInvestorsForBusiness(currentBusiness.category, currentDistrict.state, currentDistrict.name);
  }, [currentBusiness.category, currentDistrict.state, currentDistrict.name]);

  // Dynamic entrepreneur profile for this business & district
  const currentProfile: EntrepreneurProfile = useMemo(() => ({
    name: 'Entrepreneur',
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
        monthlyRawMaterialCost: currentBusiness.monthlyOpexItems[0]?.cost || Math.round(rawCost * 0.18),
        monthlyLaborCost: currentBusiness.monthlyOpexItems[1]?.cost || 35000,
        monthlyPowerAndUtilities: currentBusiness.monthlyOpexItems[2]?.cost || 12000,
        monthlyPackagingAndLogistics: currentBusiness.monthlyOpexItems[3]?.cost || 15000,
        monthlyOtherOverheads: 10000
      },
      topScheme?.eligibleSubsidyPercent || 25
    );
  }, [currentBusiness, topScheme]);

  // Radar scores calculated dynamically based on district + synthesized business
  const viabilityScores = useMemo(() => {
    const saturation = currentDistrict.saturationIndex;
    const demand = currentDistrict.demandIndex;
    return {
      marketDemand: Math.min(98, Math.max(60, demand - Math.round(saturation * 0.15))),
      technicalSimplicity: currentBusiness.powerRequiredHp <= 7.5 ? 90 : 80,
      rawMaterialEase: currentDistrict.majorCrops.some(c => currentBusiness.rawMaterials.some(r => r.toLowerCase().includes(c.toLowerCase()))) ? 95 : 78,
      marginHealth: Math.min(95, Math.max(65, Math.round(currentBusiness.averageMarginPercent * 2.5))),
      schemeFit: topScheme?.matchScore || 85
    };
  }, [currentDistrict, currentBusiness, topScheme]);

  // Handle Idea Submission
  const handleApplyIdea = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (ideaInputValue.trim()) {
      setBusinessIdeaInput(ideaInputValue.trim());
    }
  };

  const handleSelectPresetIdea = (idea: string) => {
    setIdeaInputValue(idea);
    setBusinessIdeaInput(idea);
  };

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
      if (q.includes('license') || q.includes('fssai') || q.includes('permit') || q.includes('pervana')) {
        aiText = `For "${currentBusiness.title}" in ${currentDistrict.name}, mandatory registrations are: 1. Udyam MSME (Online, Instant), 2. ${currentBusiness.statutoryLicenses[1] || 'State Pollution / Trade License'}, and 3. Commercial Power Connection with DISCOM.`;
      } else if (q.includes('investor') || q.includes('funding') || q.includes('vc') || q.includes('capital')) {
        aiText = `We found ${matchedInvestors.length} investors actively funding the ${domainClassification.domain} sector in ${currentDistrict.state}. Top match: ${matchedInvestors[0]?.investor.name} (${matchedInvestors[0]?.matchScore}% score). Click "Connect with Investors" below to generate a direct pitch!`;
      } else if (q.includes('subsidy') || q.includes('pmegp') || q.includes('anudan')) {
        aiText = `Under ${topScheme.scheme.name}, you are eligible for ${topScheme.eligibleSubsidyPercent}% capital subsidy (approx ₹${topScheme.calculatedSubsidyAmount.toLocaleString('en-IN')}) with only ${topScheme.ownContributionRequiredPercent}% promoter contribution.`;
      } else {
        aiText = `Based on hyper-local intelligence in ${currentDistrict.name}, "${currentBusiness.title}" operates in the ${domainClassification.domain} sector with a projected ${currentBusiness.averageMarginPercent}% profit margin and a healthy bank DSCR of ${financialAnalysis.averageDscr}.`;
      }
      setChatResponses(prev => [...prev, { sender: 'ai', text: aiText }]);
    }, 600);
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
              <span>FinFeasibility: Dynamic Enterprise Modeling & Investor Matcher</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {t.heroTitle1}{' '}
              <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                {t.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
              Turn any enterprise idea into an instant, bank-grade Detailed Project Report (DPR). 
              Our AI automatically detects your location, extracts your business domain, estimates machinery CapEx and OpEx, and connects you directly with matching investors.
            </p>

            {/* Quick Preset Ideas */}
            <div className="pt-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                Popular Model Ideas (Click to Test Dynamic Engine):
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_IDEAS.map((idea) => (
                  <button
                    key={idea}
                    onClick={() => handleSelectPresetIdea(idea)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                      businessIdeaInput === idea
                        ? 'bg-amber-400 text-emerald-950 border-amber-300 shadow-md font-bold'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                    }`}
                  >
                    {idea}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Primary Selection Bar: Auto-Location & Dynamic Enterprise Idea */}
        <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Auto-Detected District Section (5 cols) */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Target Region / District</span>
                </label>
                <button
                  onClick={handleAutoDetectLocation}
                  disabled={isDetectingLocation}
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer disabled:opacity-50"
                  title="Re-run browser GPS location detection"
                >
                  <RefreshCw className={`w-3 h-3 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                  <span>{isDetectingLocation ? 'Detecting GPS...' : 'Auto-Detect Location'}</span>
                </button>
              </div>

              {detectedLocationBadge && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300">
                  <Navigation className="w-3 h-3 text-emerald-600 animate-pulse" />
                  <span>Detected: <strong>{detectedLocationBadge}</strong></span>
                </div>
              )}

              <select
                aria-label="Target District"
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {DISTRICTS_DATABASE.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.state}) • Crops: {d.majorCrops.slice(0, 3).join(', ')}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1">
                <span>Rural Pop: <strong className="text-zinc-800 dark:text-zinc-200">{currentDistrict.ruralPopulationPercent}%</strong></span>
                <span>•</span>
                <span>APMC Mandis: <strong className="text-zinc-800 dark:text-zinc-200">{currentDistrict.apmcMarkets.length}</strong></span>
                <span>•</span>
                <span>Demand Index: <strong className="text-emerald-700 dark:text-emerald-400">{currentDistrict.demandIndex}/100</strong></span>
              </div>
            </div>

            {/* Dynamic Enterprise Model Idea Input (7 cols) */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Enter Your Micro-Enterprise Model Idea</span>
                </label>
                <span className="text-[11px] text-zinc-400">100% Dynamic Engine</span>
              </div>

              <form onSubmit={handleApplyIdea} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={ideaInputValue}
                    onChange={(e) => setIdeaInputValue(e.target.value)}
                    placeholder="e.g., Organic Honey Processing, Cold Pressed Oil, Solar Cold Room, Bamboo Toothbrush..."
                    className="w-full p-3 pl-4 pr-10 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                  {ideaInputValue !== businessIdeaInput && (
                    <span className="absolute right-3 top-3 text-[10px] bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-1.5 py-0.5 rounded font-bold">
                      Press Enter
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Model Idea</span>
                </button>
              </form>

              {/* Real-time Extracted Domain Badge */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-zinc-500 font-medium">Extracted Domain:</span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${domainClassification.badgeColor}`}>
                  <Briefcase className="w-3 h-3" />
                  {domainClassification.domain}
                </span>
                <div className="hidden sm:flex items-center gap-1">
                  {domainClassification.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
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
            <div className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">
              ₹{financialAnalysis.monthlyEmi.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              5 Yrs @ 9.5% on Bank Term Loan
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">{t.dscrRatio}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                {financialAnalysis.averageDscr}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                {t.bankViable}
              </span>
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Commercial Bank Benchmark: &ge; 1.50
            </div>
          </div>
        </section>

        {/* Dedicated Investor Matching Section */}
        <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-zinc-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-emerald-500/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Handshake className="w-3.5 h-3.5" />
                <span>Active Investor & Co-Financing Network</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                Connect Your {domainClassification.domain} Project with Investors
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                We have identified <strong>{matchedInvestors.length} institutional funds, venture capital firms, and impact angels</strong> with active investment mandates in <strong>{domainClassification.domain}</strong> across <strong>{currentDistrict.state}</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setIsInvestorModalOpen(true)}
                className="px-5 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-400/20 transition-all cursor-pointer"
              >
                <DollarSign className="w-4 h-4" />
                <span>Connect with Investors ({matchedInvestors.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Preview of Top 3 Matched Investors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
            {matchedInvestors.slice(0, 3).map((match) => (
              <div 
                key={match.investor.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-300">{match.investor.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {match.matchScore}% Match
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-300 block mb-2">{match.investor.type}</span>
                  <p className="text-[11px] text-emerald-100/70 line-clamp-2">
                    {match.investor.description}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-amber-200">
                  <span>Ticket: {match.investor.ticketSizeRange}</span>
                  <button 
                    onClick={() => setIsInvestorModalOpen(true)}
                    className="text-white hover:underline font-semibold cursor-pointer"
                  >
                    View Pitch &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Viability & SWOT Analysis Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Cols: Enterprise Profile, SWOT & Risk Matrix */}
          <div className="lg:col-span-2 space-y-6">
            {/* Dynamic Enterprise Summary Card */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Enterprise Model Profile • {domainClassification.domain}
                  </span>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-0.5">
                    {currentBusiness.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                    {currentBusiness.averageMarginPercent}% Net Margin
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                    {currentBusiness.powerRequiredHp} HP Power
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {currentBusiness.description}
              </p>

              {/* Machinery & Capex Quick Breakdown */}
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Synthesized Machinery & Infrastructure CapEx
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentBusiness.capexItems.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs flex justify-between items-center">
                      <span className="text-zinc-700 dark:text-zinc-300 truncate pr-2">{item.item}</span>
                      <strong className="text-zinc-900 dark:text-white shrink-0">₹{(item.cost / 100000).toFixed(2)}L</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* SWOT 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
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
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Key Operational Risks & Field Mitigations</span>
                </h3>
                <div className="space-y-2.5">
                  {currentBusiness.risks.map((r, idx) => (
                    <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-zinc-900 dark:text-white">{r.risk}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200">
                          {r.impact} Risk
                        </span>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-300 text-[11px]">
                        <strong className="text-emerald-700 dark:text-emerald-400">Mitigation:</strong> {r.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Radar Chart & Scheme Match */}
          <div className="space-y-6">
            {/* Radar Card */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white mb-2 text-center">
                Rural Viability Assessment Radar
              </h3>
              <p className="text-[11px] text-zinc-500 text-center mb-4">
                Computed using raw material density, local power, and margin health in {currentDistrict.name}
              </p>
              <div className="h-[280px] w-full flex items-center justify-center">
                <ViabilityRadarChart scores={viabilityScores} />
              </div>
            </div>

            {/* Scheme Match Card */}
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 p-6 rounded-2xl border border-emerald-200 dark:border-zinc-700 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                  {topScheme.matchScore}% Match Score
                </span>
                <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
                  {topScheme.scheme.code}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                  {topScheme.scheme.name}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                  {topScheme.scheme.description}
                </p>
              </div>

              <div className="p-3 bg-white/80 dark:bg-zinc-800/80 rounded-xl space-y-1.5 text-xs border border-emerald-100 dark:border-zinc-700">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Eligible Capital Subsidy:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400">{topScheme.eligibleSubsidyPercent}% (₹{(topScheme.calculatedSubsidyAmount / 100000).toFixed(2)}L)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Promoter Contribution:</span>
                  <strong className="text-zinc-800 dark:text-zinc-200">{topScheme.ownContributionRequiredPercent}%</strong>
                </div>
              </div>

              <Link
                href="/dpr-generator"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Bank DPR for {currentBusiness.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Hyper-Local Advisory Chat */}
        <section className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                  FinFeasibility Hyper-Local AI Advisory
                </h3>
                <span className="text-[11px] text-zinc-500">
                  Grounded on {currentDistrict.name} Mandi Prices & {domainClassification.domain} Regulations
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice Mode</span>
            </button>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 max-h-64 overflow-y-auto space-y-3 text-xs">
            {chatResponses.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                    AI
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-lg ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-xs'
                      : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-tl-xs shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendAdvisoryQuery} className="flex gap-2">
            <input
              type="text"
              value={advisoryQuery}
              onChange={(e) => setAdvisoryQuery(e.target.value)}
              placeholder={`Ask about ${currentBusiness.title} subsidies, licenses, APMC raw materials, or bank DSCR...`}
              className="flex-1 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </section>

        {/* Feature Navigation Links */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <Link
            href="/market-intelligence"
            className="group p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-100 dark:border-zinc-800 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-700 transition-colors">
              1. Market Intelligence
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Explore APMC mandis, local competitor density & gap opportunities in {currentDistrict.name}.
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
              2. Smart Financial Calculator
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Calculate CapEx, OpEx, monthly EMI, and bank-mandated DSCR for {currentBusiness.title}.
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
              3. Government Scheme Router
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Find PMEGP, Mudra, PMFME, and Stand-Up India eligibility for {domainClassification.domain}.
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
              4. Bank DPR Generator
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

      <InvestorMatcherModal
        isOpen={isInvestorModalOpen}
        onClose={() => setIsInvestorModalOpen(false)}
        business={currentBusiness}
        district={currentDistrict}
        projectCost={financialAnalysis.projectCost}
        dscr={financialAnalysis.averageDscr}
        subsidyPercent={topScheme.eligibleSubsidyPercent}
      />
    </div>
  );
}
