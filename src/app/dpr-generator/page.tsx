'use client';

import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  Sparkles, 
  Building2, 
  User, 
  MapPin, 
  Layers, 
  ShieldCheck, 
  Award, 
  Download 
} from 'lucide-react';
import { DISTRICTS_DATABASE } from '@/data/districts';
import { BUSINESS_TEMPLATES } from '@/data/businesses';
import { Language, EntrepreneurProfile, DistrictData, BusinessTemplate, SocialCategory, Gender } from '@/types';
import { performFinancialAnalysis } from '@/lib/financialCalculations';
import { matchSchemesForProfile } from '@/lib/schemeMatcher';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DprDocument } from '@/components/DprDocument';
import { TeamModal } from '@/components/TeamModal';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';

export default function DprGeneratorPage() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Form parameters
  const [applicantName, setApplicantName] = useState('Shivraj Patil');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(DISTRICTS_DATABASE[0].id);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>(BUSINESS_TEMPLATES[0].id);
  const [category, setCategory] = useState<SocialCategory>('OBC');
  const [gender, setGender] = useState<Gender>('Male');
  const [education, setEducation] = useState<EntrepreneurProfile['education']>('Graduate/Diploma');

  const currentDistrict: DistrictData = useMemo(() => {
    return DISTRICTS_DATABASE.find(d => d.id === selectedDistrictId) || DISTRICTS_DATABASE[0];
  }, [selectedDistrictId]);

  const currentBusiness: BusinessTemplate = useMemo(() => {
    return BUSINESS_TEMPLATES.find(b => b.id === selectedBusinessId) || BUSINESS_TEMPLATES[0];
  }, [selectedBusinessId]);

  const profile: EntrepreneurProfile = useMemo(() => ({
    name: applicantName,
    age: 29,
    gender,
    category,
    locationType: 'Rural',
    state: currentDistrict.state,
    district: currentDistrict.name,
    education,
    projectType: 'Manufacturing',
    projectCost: currentBusiness.defaultProjectCost,
    businessTitle: currentBusiness.title,
    isGreenfield: true
  }), [applicantName, gender, category, currentDistrict, education, currentBusiness]);

  const matchedSchemes = useMemo(() => {
    return matchSchemesForProfile(profile);
  }, [profile]);

  const topScheme = matchedSchemes[0];

  const financials = useMemo(() => {
    return performFinancialAnalysis(
      {
        projectCost: currentBusiness.defaultProjectCost,
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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onOpenTeamModal={() => setIsTeamModalOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Header - Hidden when printing */}
        <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-2 print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300 text-xs font-semibold">
            <FileSpreadsheet className="w-3.5 h-3.5 text-purple-600" />
            <span>Module 6: 1-Click Bank-Ready Detailed Project Report (DPR)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Automated Bank DPR Appraisal Generator
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Eliminate expensive consultant fees (₹5,000 - ₹15,000). Generate an authentic, official 5-page Detailed Project Report compliant with State Bank of India, Bank of Maharashtra, Gramin Banks, and District Industries Centre (DIC) standards.
          </p>
        </div>

        {/* Customization Bar - Hidden when printing */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-4 print:hidden">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-500">
            Customize DPR Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Applicant Name */}
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Entrepreneur Name</label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-semibold text-zinc-900 dark:text-white"
              />
            </div>

            {/* Target Business */}
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Target Business</label>
              <select
                aria-label="Select Target Business"
                value={selectedBusinessId}
                onChange={(e) => setSelectedBusinessId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-semibold cursor-pointer"
              >
                {BUSINESS_TEMPLATES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title} (₹{(b.defaultProjectCost / 100000).toFixed(1)}L)
                  </option>
                ))}
              </select>
            </div>

            {/* Target District */}
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">District & State</label>
              <select
                aria-label="Select Target District and State"
                value={selectedDistrictId}
                onChange={(e) => setSelectedDistrictId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-semibold cursor-pointer"
              >
                {DISTRICTS_DATABASE.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.state}
                  </option>
                ))}
              </select>
            </div>

            {/* Social Category */}
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">Social Category</label>
              <select
                aria-label="Select Social Category"
                value={category}
                onChange={(e) => setCategory(e.target.value as SocialCategory)}
                className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-semibold cursor-pointer"
              >
                <option value="General">General</option>
                <option value="OBC">OBC (35% Rural Subsidy)</option>
                <option value="SC">SC (35% Rural Subsidy)</option>
                <option value="ST">ST (35% Rural Subsidy)</option>
                <option value="Women">Women Entrepreneur (35%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* The Live Document Component */}
        <section>
          <DprDocument
            business={currentBusiness}
            district={currentDistrict}
            profile={profile}
            financials={financials}
            matchedScheme={topScheme}
          />
        </section>
      </main>

      <Footer currentLang={currentLang} onOpenTeamModal={() => setIsTeamModalOpen(true)} />
      <TeamModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} />
      <VoiceAssistantModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} currentLang={currentLang} />
    </div>
  );
}
