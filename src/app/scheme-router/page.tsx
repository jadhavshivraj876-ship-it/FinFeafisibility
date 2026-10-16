'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  FileCheck,
  Building2,
  Users,
  Copy,
  Check
} from 'lucide-react';
import { Language, EntrepreneurProfile, Gender, SocialCategory, LocationType, ProjectType } from '@/types';
import { matchSchemesForProfile } from '@/lib/schemeMatcher';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TeamModal } from '@/components/TeamModal';
import { VoiceAssistantModal } from '@/components/VoiceAssistantModal';

export default function SchemeRouterPage() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile questionnaire state
  const [name, setName] = useState('Shivraj Patil');
  const [age, setAge] = useState<number>(29);
  const [gender, setGender] = useState<Gender>('Male');
  const [category, setCategory] = useState<SocialCategory>('OBC');
  const [locationType, setLocationType] = useState<LocationType>('Rural');
  const [education, setEducation] = useState<EntrepreneurProfile['education']>('Graduate/Diploma');
  const [projectType, setProjectType] = useState<ProjectType>('Manufacturing');
  const [projectCost, setProjectCost] = useState<number>(1250000);
  const [isGreenfield, setIsGreenfield] = useState(true);

  const profile: EntrepreneurProfile = useMemo(() => ({
    name,
    age,
    gender,
    category,
    locationType,
    state: 'Maharashtra',
    district: 'Satara',
    education,
    projectType,
    projectCost,
    businessTitle: 'Rural Micro Enterprise',
    isGreenfield
  }), [name, age, gender, category, locationType, education, projectType, projectCost, isGreenfield]);

  const matchedSchemes = useMemo(() => {
    return matchSchemesForProfile(profile);
  }, [profile]);

  const handleCopyScheme = (schemeName: string, subsidy: string, portal: string) => {
    const text = `Government Scheme Eligibility (FinFeasibility):
• Scheme: ${schemeName}
• Capital Subsidy: ${subsidy}
• Eligible Bank Loan: ₹${Math.round(projectCost * 0.9).toLocaleString('en-IN')}
• Official Application Portal: ${portal}`;
    navigator.clipboard.writeText(text);
    setToastMessage(`✓ Copied ${schemeName} eligibility details to clipboard!`);
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
        <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-teal-600" />
            <span>Module 4: Government Scheme Router & Eligibility Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Central & State Subsidy Matching Router
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
            Matches your demographic profile, location, and project outlay against PMEGP, Mudra, Stand-Up India, PMFME, and Agriculture Infrastructure Fund to calculate your exact capital subsidy and minimum margin money.
          </p>
        </div>

        {/* 2-Column Grid: Questionnaire vs Ranked Schemes */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Eligibility Questionnaire (4 Cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm space-y-4">
            <h2 className="font-bold text-sm text-zinc-900 dark:text-white pb-2 border-b border-zinc-100 dark:border-zinc-800">
              Entrepreneur Profile Parameters
            </h2>

            {/* Gender */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Gender</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['Male', 'Female', 'Transgender'] as Gender[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      gender === g
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Social Category */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Social Category</label>
              <select
                aria-label="Select Social Category"
                value={category}
                onChange={(e) => setCategory(e.target.value as SocialCategory)}
                className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="General">General Category</option>
                <option value="OBC">OBC (Other Backward Classes)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="Minority">Minority Community</option>
                <option value="Ex-Servicemen">Ex-Servicemen</option>
                <option value="Specially-Abled">Specially-Abled (Divyangjan)</option>
              </select>
            </div>

            {/* Location Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Location Classification</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Rural', 'Urban'] as LocationType[]).map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setLocationType(loc)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      locationType === loc
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {loc === 'Rural' ? 'Rural (Village/Panchayat)' : 'Urban (Municipality)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Educational Qualification */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Education Level</label>
              <select
                aria-label="Select Educational Qualification"
                value={education}
                onChange={(e) => setEducation(e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="Below 8th">Below 8th Standard</option>
                <option value="8th Pass">8th Standard Pass</option>
                <option value="10th Pass">10th Standard (SSC) Pass</option>
                <option value="12th Pass">12th Standard (HSC) Pass</option>
                <option value="Graduate/Diploma">Graduate / Poly Diploma</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
            </div>

            {/* Project Outlay */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Proposed Project Cost</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">₹{(projectCost / 100000).toFixed(2)} Lakhs</span>
              </label>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                value={projectCost}
                onChange={(e) => setProjectCost(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Greenfield Toggle */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Greenfield (First-Time Unit)</span>
              <button
                type="button"
                onClick={() => setIsGreenfield(!isGreenfield)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  isGreenfield ? 'bg-emerald-600' : 'bg-zinc-300 dark:bg-zinc-700'
                }`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  isGreenfield ? 'left-6' : 'left-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Right Column: Matched Government Schemes Cards (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {toastMessage && (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{toastMessage}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                Ranked Scheme Recommendations ({matchedSchemes.length} Schemes Evaluated)
              </h3>
              <span className="text-xs text-zinc-500">
                Sorted by Eligibility & Subsidy Value
              </span>
            </div>

            {matchedSchemes.length === 0 && (
              <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">No Direct Matches for Current Parameters</h4>
                <p className="text-xs text-zinc-500 max-w-md mx-auto">
                  Try adjusting the project cost or location type in the left panel to discover eligible state & central schemes.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setProjectCost(1250000);
                    setLocationType('Rural');
                    setCategory('OBC');
                  }}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors"
                >
                  Reset Parameters
                </button>
              </div>
            )}

            <div className="space-y-4">
              {matchedSchemes.map((res, index) => (
                <div
                  key={res.scheme.id}
                  className={`p-6 rounded-2xl bg-white dark:bg-zinc-900 border transition-all ${
                    index === 0
                      ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                      : 'border-zinc-200 dark:border-zinc-800 shadow-xs'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">
                          {res.scheme.code}
                        </span>
                        {index === 0 && (
                          <span className="text-[10px] bg-amber-400 text-emerald-950 font-black px-2 py-0.5 rounded uppercase tracking-wider">
                            Best Match
                          </span>
                        )}
                        <span className="text-xs text-zinc-400 font-medium">
                          {res.scheme.ministry}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-zinc-900 dark:text-white mt-1">
                        {res.scheme.name}
                      </h4>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                        {res.matchScore}%
                      </div>
                      <span className="text-[10px] uppercase font-bold text-zinc-400">Match Score</span>
                    </div>
                  </div>

                  {/* Subsidy vs Margin Breakdown Pill */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 mb-4 text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold block">Direct Capital Subsidy</span>
                      <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                        {res.eligibleSubsidyPercent > 0 ? `₹${res.calculatedSubsidyAmount.toLocaleString('en-IN')} (${res.eligibleSubsidyPercent}%)` : 'Nil / Interest Subvention'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold block">Own Margin Required</span>
                      <span className="text-sm font-bold text-zinc-900 dark:text-white">
                        ₹{res.ownContributionRequiredAmount.toLocaleString('en-IN')} ({res.ownContributionRequiredPercent}%)
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold block">Eligible Bank Debt</span>
                      <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                        ₹{res.bankLoanAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Eligibility notes */}
                  <div className="space-y-1.5 mb-4 text-xs text-zinc-600 dark:text-zinc-300">
                    {res.eligibilityNotes.map((note, nIdx) => (
                      <div key={nIdx} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions & Official Portal Link */}
                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/dpr-generator?scheme=${encodeURIComponent(res.scheme.code)}`}
                        className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <span>Prepare DPR for this Scheme</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleCopyScheme(
                          res.scheme.name,
                          res.eligibleSubsidyPercent > 0 ? `₹${res.calculatedSubsidyAmount.toLocaleString('en-IN')} (${res.eligibleSubsidyPercent}%)` : 'Nil / Interest Subvention',
                          res.scheme.applicationPortalUrl
                        )}
                        className="inline-flex items-center gap-1 text-zinc-500 hover:text-emerald-600 transition-colors cursor-pointer text-xs font-semibold"
                        title="Copy Scheme Summary"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Details</span>
                      </button>
                    </div>

                    <a
                      href={res.scheme.applicationPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold transition-colors"
                    >
                      <span>Official Online Application</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
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
