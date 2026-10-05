'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign, 
  FileText, 
  ArrowRight, 
  BarChart3, 
  Award, 
  Mic, 
  Send, 
  Briefcase,
  Layers,
  Handshake,
  RefreshCw,
  Navigation,
  BookmarkPlus,
  ArrowUpRight,
  Calculator,
  Building2,
  FolderKanban,
  Cpu,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { DistrictData, Language, EntrepreneurProfile } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { performFinancialAnalysis } from '@/lib/financialCalculations';
import { matchSchemesForProfile } from '@/lib/schemeMatcher';
import { detectUserLocation } from '@/lib/geolocation';
import { extractBusinessDomain } from '@/lib/businessGenerator';
import { synthesizeDistrictData, DISTRICTS_DATABASE } from '@/data/districts';
import { saveUserBusiness, getUserBusinesses } from '@/lib/userStorage';
import { UserBusinessProfile } from '@/lib/supabaseClient';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ViabilityRadarChart } from '@/components/ViabilityRadarChart';
import { TeamModal } from '@/components/TeamModal';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';
import { InvestorMatcherModal } from '@/components/InvestorMatcherModal';
import { AiAnalysisResponse } from '@/app/api/analyze-idea/route';

export default function HomePage() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);

  // Flexible User Location State (No hardcoded city locks or popular businesses)
  const [locationInput, setLocationInput] = useState<string>('Satara, Maharashtra');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [detectedLocationBadge, setDetectedLocationBadge] = useState<string | null>(null);

  // Enterprise Model Idea State (Empty by default)
  const [ideaInputValue, setIdeaInputValue] = useState<string>('');
  const [inputError, setInputError] = useState<string | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);

  // Live AI Generated Feasibility State
  const [aiReport, setAiReport] = useState<AiAnalysisResponse | null>(null);

  // Profile Save Feedback
  const [isSavingToProfile, setIsSavingToProfile] = useState(false);
  const [savedSuccessMessage, setSavedSuccessMessage] = useState<string | null>(null);
  const [recentSavedProjects, setRecentSavedProjects] = useState<UserBusinessProfile[]>([]);

  // Advisory Chat Query
  const [advisoryQuery, setAdvisoryQuery] = useState('');
  const [isChatThinking, setIsChatThinking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [chatResponses, setChatResponses] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Welcome! Enter your business concept and location. I will analyze bank DSCR, machinery CapEx, government subsidies, and matching institutional investors.'
    }
  ]);

  // Auto-scroll chat container when messages or thinking state changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatResponses, isChatThinking]);

  const t = TRANSLATIONS[currentLang];

  // Load any recent projects on mount
  useEffect(() => {
    getUserBusinesses().then((list) => {
      setRecentSavedProjects(list.slice(0, 3));
    });

    const handleStorageUpdate = () => {
      getUserBusinesses().then((list) => {
        setRecentSavedProjects(list.slice(0, 3));
      });
    };
    window.addEventListener('finfeasibility_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('finfeasibility_storage_updated', handleStorageUpdate);
  }, []);

  // Auto-detect user's actual location using GPS & IP API
  const handleAutoDetectLocation = () => {
    setIsDetectingLocation(true);
    detectUserLocation()
      .then((res) => {
        if (res) {
          const locString = res.city 
            ? `${res.city}, ${res.state || 'India'}`
            : res.district 
              ? `${res.district}, ${res.state || 'India'}`
              : res.matchedDistrict?.name || 'India';

          setLocationInput(locString);
          setDetectedLocationBadge(
            `${locString} (${res.source.toUpperCase()})`
          );
        }
      })
      .catch((err) => {
        console.warn('Location detection fallback:', err);
      })
      .finally(() => {
        setIsDetectingLocation(false);
      });
  };

  // Synthesize DistrictData dynamically for whatever location user entered
  const currentDistrict: DistrictData = useMemo(() => {
    const raw = locationInput.trim() || 'Regional Hub';
    const parts = raw.split(',');
    const distName = parts[0]?.trim() || 'Regional Hub';
    const stateName = parts[1]?.trim() || 'India';

    // Match if in DB, otherwise adaptively synthesize
    const match = DISTRICTS_DATABASE.find(
      d => d.name.toLowerCase() === distName.toLowerCase() ||
           d.id.toLowerCase().includes(distName.toLowerCase())
    );
    return match || synthesizeDistrictData(distName, stateName);
  }, [locationInput]);

  // Real-time domain classification preview as user types
  const liveDomainClassification = useMemo(() => {
    const textToClassify = ideaInputValue.trim() || 'Micro-Enterprise';
    return extractBusinessDomain(textToClassify);
  }, [ideaInputValue]);

  // Financial Analysis computed from the active AI report (or default template)
  const financialAnalysis = useMemo(() => {
    const totalCost = aiReport?.projectCost || 1500000;
    const monthlyRev = aiReport?.projectedMonthlyRevenue || Math.round(totalCost * 0.22);
    const opexItems = aiReport?.monthlyOpexItems || [];

    const rawMaterial = opexItems[0]?.cost || Math.round(monthlyRev * 0.45);
    const labor = opexItems[1]?.cost || 45000;
    const power = opexItems[2]?.cost || 15000;
    const packaging = opexItems[3]?.cost || 20000;
    const overheads = opexItems[4]?.cost || 10000;

    const topSubsidyPercent = aiReport?.eligibleSchemes?.[0]?.subsidyPercent ?? 35;

    return performFinancialAnalysis(
      {
        projectCost: totalCost,
        ownContributionPercent: 10,
        annualInterestRate: 9.5,
        tenureYears: 5,
        moratoriumMonths: 6,
        monthlySalesRevenue: monthlyRev,
        monthlyRawMaterialCost: rawMaterial,
        monthlyLaborCost: labor,
        monthlyPowerAndUtilities: power,
        monthlyPackagingAndLogistics: packaging,
        monthlyOtherOverheads: overheads
      },
      topSubsidyPercent
    );
  }, [aiReport]);

  // Entrepreneur profile for scheme matching
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
    projectCost: aiReport?.projectCost || 1500000,
    businessTitle: aiReport?.title || 'Micro-Enterprise Unit',
    isGreenfield: true
  }), [currentDistrict, aiReport]);

  const matchedSchemes = useMemo(() => {
    return matchSchemesForProfile(currentProfile);
  }, [currentProfile]);

  const topScheme = matchedSchemes[0];

  // Trigger Real AI Analysis via /api/analyze-idea
  const handleRunAiAnalysis = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = ideaInputValue.trim();
    const alphaChars = cleanQuery.replace(/[^a-zA-Z]/g, '');

    if (alphaChars.length < 3) {
      setInputError('Please enter a valid enterprise idea with at least 3 letters (e.g. Cold Pressed Oil Unit, Bakery Shop, EV Charging Station, Dairy Farm).');
      return;
    }

    setInputError(null);
    const query = cleanQuery;

    setIsAnalyzing(true);
    setAnalysisStep(1);

    // Animate progress indicators
    const t1 = setTimeout(() => setAnalysisStep(2), 600);
    const t2 = setTimeout(() => setAnalysisStep(3), 1300);
    const t3 = setTimeout(() => setAnalysisStep(4), 2100);

    try {
      const res = await fetch('/api/analyze-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: query,
          location: locationInput.trim() || 'India'
        })
      });

      const json = await res.json();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);

      if (json.success && json.data) {
        setAiReport(json.data);
        setHasAnalyzed(true);

        setChatResponses([
          {
            sender: 'ai',
            text: `AI Feasibility report generated for "${json.data.title}" in ${locationInput}. Projected margin is ${json.data.averageMarginPercent}% with a healthy bank DSCR of ${financialAnalysis.averageDscr}. Ask me about machinery suppliers, PMEGP subsidies, or pitch strategies!`
          }
        ]);
      } else {
        throw new Error(json.error || 'AI analysis response failed');
      }
    } catch (err: any) {
      console.warn('AI analysis call note:', err);
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }
  };

  // Load a saved project directly into engine
  const handleLoadSavedProject = (project: UserBusinessProfile) => {
    setIdeaInputValue(project.businessTitle);
    setLocationInput(`${project.district}, ${project.state}`);
    setHasAnalyzed(true);
    handleRunAiAnalysis();
  };

  // Save Current Analysis to User Profile in Supabase
  const handleSaveToProfile = async () => {
    if (!aiReport) return;
    setIsSavingToProfile(true);
    setSavedSuccessMessage(null);

    const result = await saveUserBusiness({
      businessTitle: aiReport.title,
      category: aiReport.category,
      district: currentDistrict.name,
      state: currentDistrict.state,
      projectCost: financialAnalysis.projectCost,
      subsidyAmount: financialAnalysis.subsidyAmount,
      subsidyPercent: aiReport.eligibleSchemes[0]?.subsidyPercent || 35,
      dscr: financialAnalysis.averageDscr,
      monthlyRevenue: aiReport.projectedMonthlyRevenue
    });

    setIsSavingToProfile(false);
    if (result.success) {
      setSavedSuccessMessage(`"${aiReport.title}" saved to your profile!`);
      setTimeout(() => setSavedSuccessMessage(null), 3000);
    }
  };

  // Handle Advisory Chat with real AI
  const handleSendAdvisoryQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisoryQuery.trim() || isChatThinking) return;

    const userText = advisoryQuery.trim();
    setAdvisoryQuery('');
    setChatResponses(prev => [...prev, { sender: 'user', text: userText }]);
    setIsChatThinking(true);

    try {
      const res = await fetch('/api/advisory-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: chatResponses,
          context: {
            businessTitle: aiReport?.title || 'Micro-Enterprise Unit',
            domain: aiReport?.domain || liveDomainClassification.domain,
            category: aiReport?.category || 'Agro & Food Processing',
            location: locationInput.trim() || `${currentDistrict.name}, ${currentDistrict.state}`,
            projectCost: financialAnalysis.projectCost,
            subsidyAmount: financialAnalysis.subsidyAmount,
            subsidyPercent: aiReport?.eligibleSchemes?.[0]?.subsidyPercent || 35,
            dscr: financialAnalysis.averageDscr,
            marginPercent: aiReport?.averageMarginPercent || 24,
            rawMaterials: aiReport?.rawMaterials || [],
            statutoryLicenses: aiReport?.statutoryLicenses || [],
            eligibleSchemes: aiReport?.eligibleSchemes || [],
            matchedInvestors: aiReport?.matchedInvestors || []
          },
          language: currentLang
        })
      });

      const data = await res.json();
      if (data.success && data.reply) {
        setChatResponses(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        throw new Error(data.error || 'Failed to receive response');
      }
    } catch (err) {
      console.warn('Chat query error:', err);
      setChatResponses(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `For "${aiReport?.title || 'your business'}" in ${locationInput}, you can apply for up to 35% PMEGP subsidy with a projected bank DSCR of ${financialAnalysis.averageDscr}. Please ask any specific questions about licenses, machines, or bank loan documents!`
        }
      ]);
    } finally {
      setIsChatThinking(false);
    }
  };

  // Viability radar scores
  const viabilityScores = useMemo(() => {
    return {
      marketDemand: Math.min(98, Math.max(65, currentDistrict.demandIndex)),
      technicalSimplicity: (aiReport?.powerRequiredHp || 7.5) <= 10 ? 92 : 80,
      rawMaterialEase: 88,
      marginHealth: Math.min(96, Math.max(65, (aiReport?.averageMarginPercent || 24) * 3)),
      schemeFit: topScheme?.matchScore || 88
    };
  }, [currentDistrict, aiReport, topScheme]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] bg-cyber-grid text-zinc-900 dark:text-zinc-100">
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenVoice={() => setIsVoiceModalOpen(true)}
        onOpenTeamModal={() => setIsTeamModalOpen(true)}
        onLoadSavedProject={handleLoadSavedProject}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Digital 3D Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-950 to-zinc-950 text-white p-8 sm:p-12 shadow-2xl border border-emerald-500/20 card-3d-glow">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold shadow-inner">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>FinFeasibility: AI Enterprise Modeling & Investor Network</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Turn Any Business Idea Into a{' '}
              <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                Bank-Grade Enterprise
              </span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
              Powered by Google Gemini AI. Enter your unique enterprise concept and any target location to synthesize machinery CapEx, bank DSCR criteria, government subsidies, and verified institutional investors.
            </p>
          </div>
        </section>

        {/* AI Launch Console: Freeform Location & Unique Idea Input */}
        <section className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-emerald-500/20 shadow-xl space-y-6 card-3d-glow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Freeform Target Location Input (5 cols) */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Target Region / City / District</span>
                </label>
                <button
                  type="button"
                  onClick={handleAutoDetectLocation}
                  disabled={isDetectingLocation}
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-semibold cursor-pointer disabled:opacity-50"
                  title="Detect GPS location from your browser"
                >
                  <RefreshCw className={`w-3 h-3 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                  <span>{isDetectingLocation ? 'Detecting GPS...' : 'Auto-Detect Location'}</span>
                </button>
              </div>

              {detectedLocationBadge && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-[11px] text-emerald-800 dark:text-emerald-300">
                  <Navigation className="w-3 h-3 text-emerald-600 animate-pulse" />
                  <span>Detected: <strong>{detectedLocationBadge}</strong></span>
                </div>
              )}

              <div className="relative">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter any city, town, or district (e.g. Pune, Indore, Solapur, Varanasi...)"
                  className="w-full p-3.5 pl-4 pr-10 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-bold text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
                <MapPin className="w-4 h-4 text-zinc-400 absolute right-3.5 top-4" />
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1">
                <span>Free-form Indian or Global Location</span>
                <span>•</span>
                <span>No hardcoded restrictions</span>
              </div>
            </div>

            {/* Enterprise Concept Input (7 cols) */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Enter Your Enterprise Idea</span>
                </label>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-emerald-500" />
                  <span>AI Powered</span>
                </span>
              </div>

              <form onSubmit={handleRunAiAnalysis} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={ideaInputValue}
                    onChange={(e) => {
                      setIdeaInputValue(e.target.value);
                      if (inputError) setInputError(null);
                    }}
                    placeholder="e.g. Organic Honey Processing, Cold Pressed Oil, Bamboo Products, Solar Cold Storage..."
                    className={`w-full p-3.5 pl-4 pr-10 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border text-zinc-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500 outline-hidden transition-colors ${
                      inputError ? 'border-rose-400 dark:border-rose-500/60 ring-1 ring-rose-400' : 'border-zinc-200 dark:border-zinc-700'
                    }`}
                    disabled={isAnalyzing}
                  />
                  {ideaInputValue.trim() && (
                    <button
                      type="button"
                      onClick={() => {
                        setIdeaInputValue('');
                        if (inputError) setInputError(null);
                      }}
                      className="absolute right-3 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer shrink-0 card-3d-interactive disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 text-amber-300 ${isAnalyzing ? 'animate-spin' : 'animate-pulse'}`} />
                  <span>{isAnalyzing ? 'Analyzing with AI...' : 'Analyze Feasibility'}</span>
                </button>
              </form>

              {/* Inline Validation Alert */}
              {inputError && (
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{inputError}</span>
                </div>
              )}

              {/* Real-time Sector & Domain Classifier Preview */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-zinc-500 font-medium">Detected Sector:</span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border ${liveDomainClassification.badgeColor}`}>
                  <Briefcase className="w-3 h-3" />
                  {liveDomainClassification.domain}
                </span>
                <div className="hidden sm:flex items-center gap-1">
                  {liveDomainClassification.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Animated AI Scanning Sequence Overlay */}
        {isAnalyzing && (
          <section className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-emerald-950 to-zinc-950 text-white border border-emerald-500/40 shadow-2xl space-y-6 card-3d-glow animate-in fade-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold animate-pulse">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Gemini AI Financial Appraisal Engine Running
                </h3>
                <p className="text-xs text-emerald-200/80">
                  Synthesizing custom feasibility for &quot;{ideaInputValue || 'Enterprise'}&quot; in {locationInput}...
                </p>
              </div>
            </div>

            {/* Progress Step Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className={`p-3 rounded-2xl border transition-all ${analysisStep >= 1 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/5 border-white/10 text-zinc-400'}`}>
                <span className="block font-bold">1. Concept Analysis</span>
                <span className="text-[10px]">Parsing idea & sector taxonomy</span>
              </div>
              <div className={`p-3 rounded-2xl border transition-all ${analysisStep >= 2 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/5 border-white/10 text-zinc-400'}`}>
                <span className="block font-bold">2. CapEx & OpEx</span>
                <span className="text-[10px]">Estimating specialized machinery</span>
              </div>
              <div className={`p-3 rounded-2xl border transition-all ${analysisStep >= 3 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/5 border-white/10 text-zinc-400'}`}>
                <span className="block font-bold">3. DSCR Viability</span>
                <span className="text-[10px]">Computing bank loan metrics</span>
              </div>
              <div className={`p-3 rounded-2xl border transition-all ${analysisStep >= 4 ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/5 border-white/10 text-zinc-400'}`}>
                <span className="block font-bold">4. Real Investors</span>
                <span className="text-[10px]">Matching verified venture funds</span>
              </div>
            </div>
          </section>
        )}

        {/* Clean State: Displayed when no analysis has been run yet */}
        {!hasAnalyzed && !isAnalyzing ? (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Recent Saved Projects for Returning Users */}
            {recentSavedProjects.length > 0 && (
              <section className="bg-white/80 dark:bg-zinc-900/80 p-6 rounded-3xl border border-emerald-500/20 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                    <FolderKanban className="w-4 h-4 text-emerald-600" />
                    <span>Your Recent Saved Feasibilities</span>
                  </h3>
                  <span className="text-[11px] text-zinc-400">Synced with Supabase</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentSavedProjects.map((p, idx) => (
                    <div
                      key={p.id || idx}
                      onClick={() => handleLoadSavedProject(p)}
                      className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer space-y-2 card-3d-interactive"
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                          {p.category}
                        </span>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">
                          ₹{(p.projectCost / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-zinc-900 dark:text-white truncate">
                        {p.businessTitle}
                      </h4>
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1 border-t border-zinc-200/60 dark:border-zinc-700/60">
                        <span>{p.district}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                          Open <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4 Pillars of Rural Enterprise Viability */}
            <div className="text-center space-y-2 pt-4">
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                Enterprise Feasibility Pillars
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-xl mx-auto">
                Our AI model evaluates four core dimensions required by scheduled commercial banks before sanctioning loans.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-emerald-500/20 shadow-md space-y-3 card-3d-glow">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  1. Local Supply & Raw Materials
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Evaluates raw material procurement, agricultural mandis, and supply chain logistics in your specified target region.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-amber-500/20 shadow-md space-y-3 card-3d-glow">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  2. Bank DSCR Financials
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Synthesizes custom machinery CapEx, monthly OpEx, bank loan EMI, and calculates Debt Service Coverage Ratio (&ge;1.50).
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-teal-500/20 shadow-md space-y-3 card-3d-glow">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  3. Capital Subsidies
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Matches central and state schemes (PMEGP, PMFME, Mudra, AIF) to claim up to 35% non-refundable capital subsidies.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900/90 border border-purple-500/20 shadow-md space-y-3 card-3d-glow">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Handshake className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  4. Real Investors & Bank DPR
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Pairs your venture with verified institutional investors (Omnivore, Ankur, NABVENTURES) and prepares a bankable DPR.
                </p>
              </div>
            </div>
          </div>
        ) : hasAnalyzed && aiReport ? (
          /* Analyzed State: Detailed Feasibility Dashboard */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Bar for Analyzed Enterprise: Save to Profile & Engine Info */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-emerald-500/20 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Active AI Appraisal
                    </span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                      Bank-Grade Appraisal
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {aiReport.title} • {locationInput}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {savedSuccessMessage ? (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-bold border border-emerald-300 dark:border-emerald-700 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{savedSuccessMessage}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSaveToProfile}
                    disabled={isSavingToProfile}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                  >
                    <BookmarkPlus className="w-4 h-4 text-emerald-600" />
                    <span>{isSavingToProfile ? 'Saving...' : 'Save to My Profile'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setHasAnalyzed(false);
                    setIdeaInputValue('');
                    setAiReport(null);
                  }}
                  className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                >
                  New Analysis
                </button>
              </div>
            </div>

            {/* 4 Key KPI Metric Summary Cards */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-white/90 dark:bg-zinc-900/90 border border-emerald-500/20 shadow-md card-3d-glow">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">{t.projectCost}</span>
                <div className="text-2xl font-black text-zinc-900 dark:text-white mt-1">
                  ₹{financialAnalysis.projectCost.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  CapEx: ₹{aiReport.capexItems.reduce((a, b) => a + b.cost, 0).toLocaleString('en-IN')} + Working Capital
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white/90 dark:bg-zinc-900/90 border border-amber-500/20 shadow-md card-3d-glow">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">{t.subsidyAmount}</span>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
                  ₹{financialAnalysis.subsidyAmount.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                  {aiReport.eligibleSchemes[0]?.subsidyPercent || 35}% Subsidy under {aiReport.eligibleSchemes[0]?.code || 'PMEGP'}
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white/90 dark:bg-zinc-900/90 border border-teal-500/20 shadow-md card-3d-glow">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">{t.monthlyEmi}</span>
                <div className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-1">
                  ₹{financialAnalysis.monthlyEmi.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  5 Yrs @ 9.5% on Bank Term Loan
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white/90 dark:bg-zinc-900/90 border border-emerald-500/20 shadow-md card-3d-glow">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block">{t.dscrRatio}</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {financialAnalysis.averageDscr}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {t.bankViable}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500 mt-1">
                  Commercial Bank Benchmark: &ge; 1.50
                </div>
              </div>
            </section>

            {/* REAL VERIFIED INVESTOR MATCHING SECTION */}
            <section className="bg-gradient-to-r from-emerald-950 via-teal-950 to-zinc-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-emerald-500/20 card-3d-glow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                    <Handshake className="w-3.5 h-3.5" />
                    <span>Active Investor & Co-Financing Network</span>
                  </div>
                  <h2 className="text-2xl font-black text-white">
                    Verified Institutional Investors for {aiReport.domain}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                    Matched {aiReport.matchedInvestors.length} verified funds actively investing in <strong>{aiReport.domain}</strong> enterprises.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsInvestorModalOpen(true)}
                    className="px-5 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-400/20 transition-all cursor-pointer card-3d-interactive"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>View Direct Pitch Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Verified Real Investors Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                {aiReport.matchedInvestors.map((inv) => (
                  <div 
                    key={inv.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-amber-300">{inv.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                          {inv.matchScore}% Match
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-300 block mb-1 font-medium">{inv.type}</span>
                      <p className="text-[11px] text-emerald-100/70 line-clamp-3 leading-snug">
                        {inv.thesis}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-amber-200">
                      <span>Ticket: {inv.ticketSizeRange}</span>
                      <a 
                        href={inv.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:underline font-semibold flex items-center gap-0.5"
                      >
                        <span>Official Website</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Viability & SWOT Analysis Grid */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left 2 Cols: Enterprise Profile, SWOT & Risk Matrix */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/90 dark:bg-zinc-900/90 p-6 rounded-3xl border border-emerald-500/20 shadow-md space-y-4 card-3d-glow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        Enterprise Blueprint • {aiReport.domain}
                      </span>
                      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-0.5">
                        {aiReport.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                        {aiReport.averageMarginPercent}% Net Margin
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                        {aiReport.powerRequiredHp} HP Power
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {aiReport.description}
                  </p>

                  {/* AI Estimated Machinery & Capex Breakdown */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Tailored Machinery & Infrastructure CapEx
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {aiReport.capexItems.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs flex justify-between items-center">
                          <span className="text-zinc-700 dark:text-zinc-300 truncate pr-2">{item.item}</span>
                          <strong className="text-zinc-900 dark:text-white shrink-0">₹{(item.cost / 100000).toFixed(2)}L</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Estimated OpEx Breakdown */}
                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Estimated Monthly Operating Expenditure (OpEx)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {aiReport.monthlyOpexItems.map((item, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs flex justify-between items-center">
                          <span className="text-zinc-700 dark:text-zinc-300 truncate pr-2">{item.item}</span>
                          <strong className="text-zinc-900 dark:text-white shrink-0">₹{item.cost.toLocaleString('en-IN')}</strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SWOT 2x2 Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{t.strengths}</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {aiReport.swot.strengths.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300 text-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span>{t.weaknesses}</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {aiReport.swot.weaknesses.map((w, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-teal-900 dark:text-teal-300 text-xs">
                        <TrendingUp className="w-4 h-4 text-teal-600" />
                        <span>{t.opportunities}</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {aiReport.swot.opportunities.map((o, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold">•</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-2">
                      <div className="flex items-center gap-2 font-bold text-rose-900 dark:text-rose-300 text-xs">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>{t.threats}</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                        {aiReport.swot.threats.map((th, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{th}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Operational Risk Matrix & Practical Mitigations */}
                  <div className="pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Key Operational Risks & Field Mitigations</span>
                    </h3>
                    <div className="space-y-2.5">
                      {aiReport.risks.map((r, idx) => (
                        <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-zinc-900 dark:text-white">{r.risk}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200">
                              {r.impact} Risk
                            </span>
                          </div>
                          <p className="text-zinc-600 dark:text-zinc-300 text-[11px]">
                            <strong className="text-emerald-600 dark:text-emerald-400">Mitigation:</strong> {r.mitigation}
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
                <div className="bg-white/90 dark:bg-zinc-900/90 p-6 rounded-3xl border border-emerald-500/20 shadow-md card-3d-glow">
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white mb-2 text-center">
                    Viability Assessment Radar
                  </h3>
                  <p className="text-[11px] text-zinc-500 text-center mb-4">
                    Computed for {aiReport.title} in {locationInput}
                  </p>
                  <div className="h-[280px] w-full flex items-center justify-center">
                    <ViabilityRadarChart scores={viabilityScores} />
                  </div>
                </div>

                {/* Scheme Match Card */}
                <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 p-6 rounded-3xl border border-emerald-500/20 shadow-md space-y-4 card-3d-glow">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">
                      Top Matched Scheme
                    </span>
                    <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">
                      {aiReport.eligibleSchemes[0]?.code || 'PMEGP'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                      {aiReport.eligibleSchemes[0]?.name || 'Prime Minister Employment Generation Programme'}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                      {aiReport.eligibleSchemes[0]?.description || 'Credit linked capital subsidy program.'}
                    </p>
                  </div>

                  <div className="p-3 bg-white/80 dark:bg-zinc-800/80 rounded-2xl space-y-1.5 text-xs border border-emerald-100 dark:border-zinc-700">
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400">Eligible Capital Subsidy:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">{aiReport.eligibleSchemes[0]?.subsidyPercent || 35}% (₹{(financialAnalysis.subsidyAmount / 100000).toFixed(2)}L)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400">Promoter Contribution:</span>
                      <strong className="text-zinc-800 dark:text-zinc-200">10% (₹{(financialAnalysis.ownContribution / 100000).toFixed(2)}L)</strong>
                    </div>
                  </div>

                  <Link
                    href="/dpr-generator"
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all card-3d-interactive"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Generate Official Bank DPR Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Hyper-Local Advisory Chat */}
            <section className="bg-white/90 dark:bg-zinc-900/90 p-6 rounded-3xl border border-emerald-500/20 shadow-md space-y-4 card-3d-glow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xs">
                    AI
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                      FinFeasibility AI Advisory Chat
                    </h3>
                    <span className="text-[11px] text-zinc-500">
                      Grounded on {locationInput} Regulations & {aiReport.domain}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Voice Mode</span>
                </button>
              </div>

              <div 
                ref={chatContainerRef}
                className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 max-h-72 overflow-y-auto space-y-3 text-xs"
              >
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
                      className={`p-3 rounded-2xl max-w-lg whitespace-pre-line leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-xs'
                          : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 rounded-tl-xs shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isChatThinking && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                      AI
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-zinc-800 border border-emerald-200 dark:border-zinc-700 shadow-xs flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                      <span className="text-xs italic">FinMitra is formulating an expert answer...</span>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendAdvisoryQuery} className="flex gap-2">
                <input
                  type="text"
                  value={advisoryQuery}
                  onChange={(e) => setAdvisoryQuery(e.target.value)}
                  disabled={isChatThinking}
                  placeholder={`Ask about ${aiReport.title} subsidies, licenses, APMC raw materials, or bank DSCR...`}
                  className="flex-1 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-hidden disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!advisoryQuery.trim() || isChatThinking}
                  className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                >
                  {isChatThinking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>{isChatThinking ? 'Thinking...' : 'Ask'}</span>
                </button>
              </form>
            </section>
          </div>
        ) : null}

        {/* Feature Navigation Links */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <Link
            href={`/market-intelligence?idea=${encodeURIComponent(ideaInputValue || aiReport?.title || 'food stall')}&location=${encodeURIComponent(locationInput)}`}
            className="group p-5 rounded-3xl bg-white/90 dark:bg-zinc-900/90 border border-emerald-500/20 shadow-sm hover:border-emerald-500/50 hover:shadow-lg transition-all card-3d-glow"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors">
              1. Market Intelligence
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Explore agricultural mandis, local competitor density & gap opportunities.
            </p>
          </Link>

          <Link
            href="/financial-calculator"
            className="group p-5 rounded-3xl bg-white/90 dark:bg-zinc-900/90 border border-amber-500/20 shadow-sm hover:border-amber-500/50 hover:shadow-lg transition-all card-3d-glow"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-amber-600 transition-colors">
              2. Smart Financial Calculator
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Calculate CapEx, OpEx, monthly EMI, and bank-mandated DSCR.
            </p>
          </Link>

          <Link
            href="/scheme-router"
            className="group p-5 rounded-3xl bg-white/90 dark:bg-zinc-900/90 border border-teal-500/20 shadow-sm hover:border-teal-500/50 hover:shadow-lg transition-all card-3d-glow"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-teal-600 transition-colors">
              3. Government Scheme Router
            </h3>
            <p className="text-xs text-zinc-500 mt-1">
              Find PMEGP, Mudra, PMFME, and Stand-Up India eligibility.
            </p>
          </Link>

          <Link
            href="/dpr-generator"
            className="group p-5 rounded-3xl bg-white/90 dark:bg-zinc-900/90 border border-purple-500/20 shadow-sm hover:border-purple-500/50 hover:shadow-lg transition-all card-3d-glow"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-purple-600 transition-colors">
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
        activeContext={{
          businessTitle: aiReport?.title || 'Rural MSME Enterprise',
          location: locationInput.trim() || `${currentDistrict.name}, ${currentDistrict.state}`,
          domain: aiReport?.domain || liveDomainClassification.domain,
          category: aiReport?.category || 'Agro & Food Processing',
          projectCost: financialAnalysis.projectCost,
          subsidyAmount: financialAnalysis.subsidyAmount,
          dscr: financialAnalysis.averageDscr,
          marginPercent: aiReport?.averageMarginPercent || 24,
          rawMaterials: aiReport?.rawMaterials,
          statutoryLicenses: aiReport?.statutoryLicenses,
          eligibleSchemes: aiReport?.eligibleSchemes,
          matchedInvestors: aiReport?.matchedInvestors
        }}
      />

      {/* Investor Pitch Modal */}
      {aiReport && (
        <InvestorMatcherModal
          isOpen={isInvestorModalOpen}
          onClose={() => setIsInvestorModalOpen(false)}
          business={{
            id: 'ai-synthesized-biz',
            title: aiReport.title,
            vernacular: {
              en: aiReport.title,
              hi: aiReport.title,
              mr: aiReport.title,
              te: aiReport.title,
              ta: aiReport.title,
              gu: aiReport.title,
              bn: aiReport.title
            },
            category: aiReport.category as any,
            description: aiReport.description,
            rawMaterials: aiReport.rawMaterials,
            defaultProjectCost: aiReport.projectCost,
            capexItems: aiReport.capexItems,
            monthlyOpexItems: aiReport.monthlyOpexItems,
            projectedMonthlyRevenue: aiReport.projectedMonthlyRevenue,
            averageMarginPercent: aiReport.averageMarginPercent,
            powerRequiredHp: aiReport.powerRequiredHp,
            swot: aiReport.swot,
            risks: aiReport.risks,
            statutoryLicenses: aiReport.statutoryLicenses,
            landRequiredSqFt: 1500,
            laborRequired: 6,
            recommendedSchemes: ['PMEGP', 'PMFME', 'MUDRA']
          }}
          district={currentDistrict}
          projectCost={financialAnalysis.projectCost}
          dscr={financialAnalysis.averageDscr}
          subsidyPercent={aiReport.eligibleSchemes[0]?.subsidyPercent || 35}
          matchedInvestors={aiReport.matchedInvestors}
          domain={aiReport.domain}
        />
      )}
    </div>
  );
}
