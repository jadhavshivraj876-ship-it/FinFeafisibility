'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
  Building
} from 'lucide-react';
import { DISTRICTS_DATABASE } from '@/data/districts';
import { Language, DistrictData } from '@/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MarketMap } from '@/components/MarketMap';
import { TeamModal } from '@/components/TeamModal';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';

export default function MarketIntelligencePage() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(DISTRICTS_DATABASE[0].id);
  const [selectedTaluka, setSelectedTaluka] = useState<string>('');

  const currentDistrict: DistrictData = useMemo(() => {
    return DISTRICTS_DATABASE.find(d => d.id === selectedDistrictId) || DISTRICTS_DATABASE[0];
  }, [selectedDistrictId]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onOpenTeamModal={() => setIsTeamModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Page Header */}
        <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Module 1: Hyper-Local Market Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
              Rural Market Gaps & Geo-Cluster Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Analyze hyper-local agricultural raw materials, APMC mandis, cold chains, and competitor saturation to identify high-profit micro-enterprise gaps.
            </p>
          </div>

          {/* District Select Dropdown */}
          <div className="w-full md:w-72 space-y-1.5 shrink-0">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Selected District</span>
            </label>
            <select
              aria-label="Select Target District"
              value={selectedDistrictId}
              onChange={(e) => {
                setSelectedDistrictId(e.target.value);
                setSelectedTaluka('');
              }}
              className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              {DISTRICTS_DATABASE.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}, {d.state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interactive SVG Geo-Cluster Map */}
        <section>
          <MarketMap district={currentDistrict} />
        </section>

        {/* 2-Column Details: Top Underserved Gaps vs Talukas & Mandis */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Col 1: High-Potential Market Gaps */}
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  Top Underserved Opportunities in {currentDistrict.name}
                </h2>
              </div>
              <span className="text-[11px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded">
                High ROI Gaps
              </span>
            </div>

            <div className="space-y-3">
              {currentDistrict.topOpportunities.map((opp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-xs text-emerald-900 dark:text-emerald-300">
                      {opp.title}
                    </h4>
                    <span className="text-[10px] bg-emerald-700 text-white font-bold px-2 py-0.5 rounded shrink-0">
                      ROI: {opp.potentialRoi}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-snug">
                    {opp.gapReason}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-1 border-t border-emerald-100 dark:border-zinc-800">
                    <span className="text-zinc-500">
                      Estimated Outlay: <strong className="text-zinc-800 dark:text-zinc-200">{opp.investmentRange}</strong>
                    </span>
                    <Link
                      href="/"
                      className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Analyze Feasibility</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: APMC Mandis, Logistics & Competitor Density */}
          <div className="space-y-6">
            {/* Competitor Density Breakdown */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                Sector Competitor Saturation in {currentDistrict.name}
              </h3>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {Object.entries(currentDistrict.competitorDensity).map(([biz, density]) => {
                  let badgeBg = 'bg-emerald-100 text-emerald-800';
                  if (density === 'Medium') badgeBg = 'bg-amber-100 text-amber-800';
                  if (density === 'High') badgeBg = 'bg-rose-100 text-rose-800';

                  return (
                    <div key={biz} className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 truncate pr-2">{biz}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeBg} shrink-0`}>
                        {density}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* APMC Mandis & Infrastructure Access */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                Key Trading Mandis & Agri-Support Facilities
              </h3>
              <div className="space-y-2 text-xs">
                {currentDistrict.nearbyFacilities.map((fac, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                        {fac.type === 'Mandi' ? <Store className="w-3.5 h-3.5" /> : <Building className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900 dark:text-white">{fac.name}</div>
                        <div className="text-[10px] text-zinc-500">{fac.type}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-md">
                      ~{fac.distanceKm} km
                    </span>
                  </div>
                ))}
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
