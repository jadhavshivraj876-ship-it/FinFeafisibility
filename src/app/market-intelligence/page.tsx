'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  MapPin, 
  Store, 
  Warehouse, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Compass,
  Building,
  Search,
  Loader2,
  PieChart,
  Layers,
  ShieldCheck,
  Percent,
  Coins,
  ArrowUpRight,
  Target,
  BarChart3,
  Building2,
  Users
} from 'lucide-react';
import { DISTRICTS_DATABASE, synthesizeDistrictData } from '@/data/districts';
import { Language, DistrictData } from '@/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MarketMap } from '@/components/MarketMap';
import { TeamModal } from '@/components/TeamModal';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';
import { MarketIntelligenceResponse } from '@/app/api/market-intelligence/route';

function MarketIntelligenceContent() {
  const searchParams = useSearchParams();
  const initialIdea = searchParams.get('idea') || 'food stall';
  const initialLoc = searchParams.get('location') || 'Satara, Maharashtra';

  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Search console inputs
  const [ideaInput, setIdeaInput] = useState<string>(initialIdea);
  const [locationInput, setLocationInput] = useState<string>(initialLoc);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(DISTRICTS_DATABASE[0].id);

  // Live dynamic market intelligence state
  const [marketData, setMarketData] = useState<MarketIntelligenceResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'part1' | 'part2' | 'part3' | 'part4' | 'part5'>('all');

  // Matched district for the SVG Map
  const currentDistrict: DistrictData = useMemo(() => {
    const match = DISTRICTS_DATABASE.find(d => 
      locationInput.toLowerCase().includes(d.name.toLowerCase()) || d.id === selectedDistrictId
    );
    if (match) return match;
    return synthesizeDistrictData(locationInput.split(',')[0].trim() || 'Selected Region', 'India');
  }, [locationInput, selectedDistrictId]);

  // Fetch Market Intelligence
  const fetchMarketIntelligence = async (idea: string, location: string) => {
    if (!idea.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/market-intelligence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: idea.trim(),
          location: location.trim() || 'Satara, Maharashtra'
        })
      });
      const json = await res.json();
      if (json.success && json.data) {
        setMarketData(json.data);
      }
    } catch (err) {
      console.warn('Market intelligence fetch notice:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketIntelligence(initialIdea, initialLoc);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMarketIntelligence(ideaInput, locationInput);
  };

  const handleAutoDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setLocationInput('Satara, Maharashtra');
          fetchMarketIntelligence(ideaInput, 'Satara, Maharashtra');
        },
        () => {
          setLocationInput('Satara, Maharashtra');
        }
      );
    }
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
        
        {/* Page Hero Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-zinc-950 text-white p-6 sm:p-8 shadow-2xl border border-emerald-500/20 card-3d-glow">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold shadow-inner">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Hyper-Local Market Intelligence Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Real-World Market Situation &amp; Competitor Gaps
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
              Synthesizes actual local consumer demand, nearby APMC trading mandis, competitor saturation levels, and high-margin product-market voids for any business concept in any Indian region.
            </p>
          </div>
        </section>

        {/* Dynamic Idea & Location Input Console */}
        <section className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-6 rounded-3xl border border-emerald-500/20 shadow-xl space-y-4 card-3d-glow">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Enterprise Idea Input (5 cols) */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>Enterprise Concept / Idea</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={ideaInput}
                  onChange={(e) => setIdeaInput(e.target.value)}
                  placeholder="e.g. food stall, petrol pump, cold pressed oil..."
                  className="w-full pl-4 pr-10 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Target Location Input (4 cols) */}
            <div className="md:col-span-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Target Area / District</span>
                </label>
                <button
                  type="button"
                  onClick={handleAutoDetect}
                  className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                >
                  Auto-Detect
                </button>
              </div>
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="e.g. Satara, Maharashtra"
                className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-sm font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Submit Action Button (3 cols) */}
            <div className="md:col-span-3 pt-5">
              <button
                type="submit"
                disabled={isLoading || !ideaInput.trim()}
                className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Analyze Market</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-emerald-500/20 shadow-md space-y-4 animate-pulse">
            <div className="h-6 bg-emerald-100 dark:bg-emerald-950/60 rounded-xl w-1/3"></div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-2/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="h-28 bg-zinc-100 dark:bg-zinc-800/60 rounded-2xl"></div>
              <div className="h-28 bg-zinc-100 dark:bg-zinc-800/60 rounded-2xl"></div>
              <div className="h-28 bg-zinc-100 dark:bg-zinc-800/60 rounded-2xl"></div>
            </div>
          </div>
        )}

        {/* Market Intelligence Detailed Parts Dashboard */}
        {!isLoading && marketData && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Overview & Action Strip */}
            <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-emerald-500/20 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                    {marketData.sector}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                    Saturation: {marketData.part3CompetitorAnalysis.saturationLevel}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                  Market Intelligence: {marketData.idea} in {marketData.location}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
                  {marketData.summary}
                </p>
              </div>

              {/* 1-Click Bridge to Bank Feasibility Analysis */}
              <Link
                href={`/?idea=${encodeURIComponent(marketData.idea)}&location=${encodeURIComponent(marketData.location)}`}
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span>Run Bank Loan Feasibility</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* PART 1: IDEA MARKET INTELLIGENCE & DEMAND DYNAMICS */}
            <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-md space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Part 1</span>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                      Idea Demand Dynamics &amp; Target Consumers
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {marketData.part1DemandDynamics.marketGrowthRate}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-3">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Market Need &amp; Problem Solved</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
                    {marketData.part1DemandDynamics.marketNeed}
                  </p>
                  
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Consumer Buying Frequency</h4>
                    <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      {marketData.part1DemandDynamics.buyingFrequency}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Target Customer Segments</h4>
                    <div className="space-y-1.5">
                      {marketData.part1DemandDynamics.targetCustomerSegments.map((seg, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/50 dark:bg-zinc-800/60 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-emerald-100 dark:border-zinc-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{seg}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Current Market Trends</h4>
                    <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                      {marketData.part1DemandDynamics.demandTrends.map((tr, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                          <span>{tr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* PART 2: CURRENT MARKET SITUATION IN DETECTED AREA */}
            <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-teal-500/20 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block">Part 2</span>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                      Current Market Situation in {marketData.location}
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-zinc-500">
                  Regional Cluster Analysis
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Raw Material Sourcing & Transport */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Raw Material Sourcing &amp; Procurement</h4>
                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {marketData.part2RegionalSituation.rawMaterialAvailability}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 space-y-2">
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Logistics &amp; Transport Connectivity</h4>
                    <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                      {marketData.part2RegionalSituation.logisticsConnectivity}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">District Economic Advantages</h4>
                    <div className="space-y-1.5">
                      {marketData.part2RegionalSituation.districtEconomicAdvantages.map((adv, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-teal-50/50 dark:bg-zinc-800/50 text-xs font-semibold text-teal-900 dark:text-teal-200 border border-teal-100 dark:border-zinc-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{adv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nearby Trading Mandis & Industrial Zones */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Key APMC Trading Mandis &amp; Market Yards</h4>
                    <div className="space-y-2.5">
                      {marketData.part2RegionalSituation.nearbyTradingMandis.map((mandi, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Store className="w-4 h-4 text-emerald-600" />
                              <span className="font-bold text-xs text-zinc-900 dark:text-white">{mandi.name}</span>
                            </div>
                            <p className="text-[11px] text-zinc-500 leading-snug">{mandi.note}</p>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded-md shrink-0">
                            ~{mandi.distanceKm} km
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Industrial Zones &amp; Production Clusters</h4>
                    <div className="flex flex-wrap gap-2">
                      {marketData.part2RegionalSituation.industrialClustersAndZones.map((zone, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                          {zone}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* PART 3: COMPETITOR SATURATION & MARKET GAP ANALYSIS */}
            <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-amber-500/20 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Part 3</span>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                      Competitor Saturation &amp; Market Gap Analysis
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-zinc-500">Unorganized vs Organized:</span>
                  <div className="text-xs font-bold text-zinc-900 dark:text-white">{marketData.part3CompetitorAnalysis.unorganizedVsOrganizedRatio}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {marketData.part3CompetitorAnalysis.competitorDensityBreakdown.map((comp, idx) => {
                  let badge = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
                  if (comp.density === 'Medium') badge = 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
                  if (comp.density === 'High') badge = 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';

                  return (
                    <div key={idx} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-zinc-900 dark:text-white">{comp.category}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge}`}>
                          {comp.density} Density
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-snug">{comp.note}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-3">
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Identified Market Voids &amp; Unmet Needs</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
                    {marketData.part3CompetitorAnalysis.identifiedMarketGaps.map((gap, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Recommended Positioning Strategy</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {marketData.part3CompetitorAnalysis.recommendedPositioningStrategy}
                  </p>
                </div>
              </div>
            </section>

            {/* PART 4: OFFTAKE CHANNELS & PRICE REALIZATION */}
            <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-purple-500/20 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Part 4</span>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                      Offtake Channels &amp; Price Realization
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  Gross Margin: {marketData.part4OfftakeAndPricing.expectedGrossMargin}
                </span>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Wholesale Benchmark</span>
                  <div className="text-sm font-bold text-zinc-900 dark:text-white mt-1">
                    {marketData.part4OfftakeAndPricing.wholesalePriceBenchmark}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Retail Benchmark</span>
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {marketData.part4OfftakeAndPricing.retailPriceBenchmark}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">Seasonal Behavior</span>
                  <div className="text-xs text-zinc-600 dark:text-zinc-300 mt-1">
                    {marketData.part4OfftakeAndPricing.seasonalSwings}
                  </div>
                </div>
              </div>

              {/* Primary Sales Channels Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Primary Sales &amp; Distribution Channels</h4>
                <div className="space-y-2.5">
                  {marketData.part4OfftakeAndPricing.primaryChannels.map((ch, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-zinc-900 dark:text-white">{ch.channel}</span>
                        <span className="font-bold text-purple-600 dark:text-purple-400">{ch.sharePercent}% Volume Share</span>
                      </div>
                      <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${ch.sharePercent}%` }}></div>
                      </div>
                      <p className="text-[11px] text-zinc-500">{ch.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PART 5: HIGH-ROI OPPORTUNITIES & LOCAL SUPPORT ECOSYSTEM */}
            <section className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Part 5</span>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">
                      Top ROI Gaps &amp; District Support Agencies
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-600">
                  Bankable Voids
                </span>
              </div>

              {/* Opportunities Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketData.part5OpportunitiesAndSupport.topOpportunities.map((opp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-teal-50/20 dark:from-zinc-800/60 dark:to-zinc-800/30 border border-emerald-200/80 dark:border-emerald-800/50 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400">{opp.category}</span>
                        <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{opp.title}</h4>
                      </div>
                      <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded shrink-0">
                        {opp.potentialRoi}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {opp.gapReason}
                    </p>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-emerald-100 dark:border-zinc-700">
                      <span className="text-zinc-500">
                        Capital: <strong className="text-zinc-800 dark:text-zinc-200">{opp.investmentRange}</strong>
                      </span>
                      <Link
                        href={`/?idea=${encodeURIComponent(opp.title)}&location=${encodeURIComponent(marketData.location)}`}
                        className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Analyze Feasibility</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Support Agencies & Key Clearances */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">District Nodal Support Agencies</h4>
                  <div className="space-y-2">
                    {marketData.part5OpportunitiesAndSupport.districtSupportAgencies.map((agency, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-xs text-zinc-900 dark:text-white">{agency.name}</div>
                          <div className="text-[10px] text-zinc-500">{agency.role}</div>
                        </div>
                        <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                          {agency.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Mandatory Statutory Clearances</h4>
                  <div className="space-y-1.5">
                    {marketData.part5OpportunitiesAndSupport.keyClearancesNeeded.map((lic, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-xs text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{lic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </section>

            {/* Interactive Geo-Cluster SVG Map */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>Geo-Cluster Infrastructure Visualizer</span>
                </h3>
                <span className="text-xs text-zinc-400">Centered on {currentDistrict.name}</span>
              </div>
              <MarketMap district={currentDistrict} />
            </section>

          </div>
        )}

      </main>

      <Footer currentLang={currentLang} onOpenTeamModal={() => setIsTeamModalOpen(true)} />
      <TeamModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} />
      <VoiceAssistantModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} currentLang={currentLang} />
    </div>
  );
}

export default function MarketIntelligencePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
      </div>
    }>
      <MarketIntelligenceContent />
    </Suspense>
  );
}
