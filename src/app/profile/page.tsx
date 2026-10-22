'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { 
  Building2, 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Layers, 
  Award, 
  Calculator, 
  FileText, 
  Save, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  LogOut, 
  TrendingUp, 
  DollarSign, 
  FolderKanban, 
  RefreshCw,
  ExternalLink,
  PlusCircle,
  HelpCircle,
  BadgeCheck,
  Briefcase
} from 'lucide-react';
import { useAuth } from '@/lib/useAuth';
import { getUserBusinesses, deleteUserBusiness } from '@/lib/userStorage';
import { UserBusinessProfile } from '@/lib/supabaseClient';
import { Language } from '@/types';

export default function UserProfilePage() {
  const router = useRouter();
  const { user, updateUserProfile, signOut, signInInstantDemo, loading } = useAuth();
  const [currentLang, setCurrentLang] = useState<Language>('en');

  // Active section tab
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'schemes' | 'settings'>('profile');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [preferredSector, setPreferredSector] = useState('Renewable Energy & Solar Cold Chain');
  const [enterpriseStage, setEnterpriseStage] = useState('DPR & Bank Loan Phase');
  const [udyamReg, setUdyamReg] = useState('UDYAM-MH-26-0048192');

  const [savedProjects, setSavedProjects] = useState<UserBusinessProfile[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  // Sync profile details from current user
  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      setFullName(meta.full_name || user.email?.split('@')[0] || 'Entrepreneur');
      setEmail(user.email || '');
      setPhone(meta.phone || '+91 93224 10441');
      setDistrict(meta.district || 'Sangli');
      setState(meta.state || 'Maharashtra');
      setPreferredSector(meta.preferred_sector || 'Renewable Energy & Solar Cold Chain');
      loadSavedProjects();
    } else if (!loading) {
      // Check local storage directly
      try {
        const cached = localStorage.getItem('finfeasibility_active_user');
        if (cached) {
          const parsed = JSON.parse(cached);
          setFullName(parsed.fullName || 'Shivraj Jadhav');
          setEmail(parsed.email || 'jadhavshivraj876@gmail.com');
          setPhone(parsed.phone || '+91 93224 10441');
          setDistrict(parsed.district || 'Sangli');
          setState(parsed.state || 'Maharashtra');
          setPreferredSector(parsed.preferredSector || 'Renewable Energy & Solar Cold Chain');
          loadSavedProjects();
        }
      } catch (e) {
        console.warn('Profile page cache read error:', e);
      }
    }
  }, [user, loading]);

  const loadSavedProjects = async () => {
    try {
      const list = await getUserBusinesses();
      setSavedProjects(list);
    } catch (err) {
      console.warn('Could not load saved projects:', err);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveToast(false);
    setErrorToast(null);

    try {
      const res = await updateUserProfile({
        fullName,
        phone,
        district,
        state,
        preferredSector
      });

      if (res.success) {
        setSaveToast(true);
        setTimeout(() => setSaveToast(false), 3000);
      } else {
        setErrorToast(res.error || 'Failed to update profile.');
      }
    } catch (err: any) {
      setErrorToast(err?.message || 'Error saving changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id: string | undefined, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;
    if (confirm('Are you sure you want to remove this saved feasibility report?')) {
      await deleteUserBusiness(id);
      loadSavedProjects();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleInstantSignIn = async () => {
    await signInInstantDemo({
      fullName: 'Shivraj Jadhav',
      email: 'jadhavshivraj876@gmail.com',
      phone: '+91 93224 10441',
      district: 'Sangli',
      state: 'Maharashtra',
      preferredSector: 'Renewable Energy & Solar Cold Chain'
    });
  };

  const initials = fullName
    ? fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'MS';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors">
      <Navbar 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang}
        onOpenVoice={() => {}}
        onOpenTeamModal={() => {}}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* If user is not logged in, show instant activation prompt */}
        {!user && !loading && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg animate-in fade-in">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-zinc-950 flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Entrepreneur Profile Portal
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl">
                  Sign in or activate your MSME Entrepreneur profile instantly to manage your saved business feasibility reports, DPRs, and PMEGP subsidy records.
                </p>
              </div>
            </div>
            <button
              onClick={handleInstantSignIn}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all cursor-pointer whitespace-nowrap"
            >
              ⚡ Activate Entrepreneur Profile (Shivraj Jadhav)
            </button>
          </div>
        )}

        {/* Profile Hero Header Card */}
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-teal-900 to-zinc-900 text-white p-6 sm:p-8 shadow-2xl border border-emerald-500/30 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 sm:gap-6">
              {/* Profile Avatar */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 text-zinc-950 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-xl shadow-emerald-500/40 border-2 border-white/20">
                  {initials}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-zinc-950 p-1.5 rounded-xl shadow-md border border-zinc-900" title="Verified MSME Entrepreneur">
                  <BadgeCheck className="w-4 h-4 fill-amber-400 text-zinc-950" />
                </div>
              </div>

              {/* Identity & Badges */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {fullName || 'Shivraj Jadhav'}
                  </h1>
                  <span className="text-[11px] uppercase font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                    MSME Verified
                  </span>
                  <span className="text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                    Rural Tier-1
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-emerald-200/90 font-medium">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{email || 'jadhavshivraj876@gmail.com'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{phone || '+91 93224 10441'}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{district || 'Sangli'}, {state || 'Maharashtra'}</span>
                  </span>
                </div>

                <div className="pt-1 flex items-center gap-2 text-xs text-zinc-300">
                  <span className="text-zinc-400 font-normal">Preferred Enterprise Focus:</span>
                  <span className="font-semibold text-emerald-300">{preferredSector}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap md:flex-col items-stretch gap-2.5 shrink-0">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Feasibility Study</span>
              </Link>
              <Link
                href="/dpr-generator"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Open DPR Generator</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 text-xs font-semibold border border-rose-500/30 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Saved Feasibilities</p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white">
                {savedProjects.length || 1} <span className="text-xs font-normal text-zinc-500">Projects</span>
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">PMEGP Subsidy Rate</p>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">
                35% <span className="text-xs font-normal text-zinc-500">Rural Special</span>
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/70 text-teal-700 dark:text-teal-400 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Loan Cap Qualification</p>
              <p className="text-2xl font-black text-teal-600 dark:text-teal-400">
                ₹50 Lakhs <span className="text-xs font-normal text-zinc-500">Mudra / PMEGP</span>
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Bank DSCR Benchmark</p>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                1.85x <span className="text-xs font-normal text-emerald-600 dark:text-emerald-400">Low Risk</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'profile'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <UserIcon className="w-4 h-4" />
            <span>Profile Details & Demographics</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'projects'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            <span>Saved Feasibility Reports ({savedProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schemes')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'schemes'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Bank & Scheme Eligibility</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Cloud Sync</span>
          </button>
        </div>

        {/* Tab 1: Profile Details & Demographics */}
        {activeTab === 'profile' && (
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-emerald-600" />
                  <span>Personal & Enterprise Information</span>
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  These parameters calibrate AI financial models, bank eligibility, and capital subsidy computations for your location.
                </p>
              </div>

              {saveToast && (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300 text-xs font-bold animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </div>
              )}
              {errorToast && (
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300 text-xs font-bold">
                  <span>{errorToast}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Entrepreneur Full Name *</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Shivraj Jadhav"
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    required
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Registered Email Address</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.2 rounded font-bold">
                      Verified
                    </span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500 dark:text-zinc-400 font-medium cursor-not-allowed outline-hidden"
                  />
                </div>

                {/* Mobile Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mobile Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 93224 10441"
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>

                {/* Target District */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Target District (Operational Base)</span>
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    placeholder="Sangli, Satara, Pune, Kolhapur..."
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    required
                  />
                </div>

                {/* Target State */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>State</span>
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Maharashtra"
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    required
                  />
                </div>

                {/* Target Industry Sector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Target Industry Sector</span>
                  </label>
                  <select
                    value={preferredSector}
                    onChange={(e) => setPreferredSector(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden cursor-pointer"
                  >
                    <option value="Renewable Energy & Solar Cold Chain">Renewable Energy & Solar Cold Chain</option>
                    <option value="Agro & Food Processing">Agro & Food Processing (Oil, Jaggery, Spices)</option>
                    <option value="Dairy & Livestock Tech">Dairy & Livestock Modernization</option>
                    <option value="Light Manufacturing & Engineering">Light Manufacturing & Engineering</option>
                    <option value="Bio-Fertilizers & Organic Inputs">Bio-Fertilizers & Organic Inputs</option>
                    <option value="Rural Artisans & Handicrafts">Rural Artisans & Handloom</option>
                    <option value="Agri-Tech & Custom Hiring">Agri-Tech & Farm Machinery Services</option>
                  </select>
                </div>

                {/* Enterprise Development Stage */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Enterprise Lifecycle Stage</span>
                  </label>
                  <select
                    value={enterpriseStage}
                    onChange={(e) => setEnterpriseStage(e.target.value)}
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden cursor-pointer"
                  >
                    <option value="Concept / Feasibility Evaluation">Concept / Feasibility Evaluation</option>
                    <option value="DPR & Bank Loan Phase">DPR & Bank Loan Phase (PMEGP / Mudra)</option>
                    <option value="Under Implementation / Construction">Under Implementation / Equipment Procurement</option>
                    <option value="Operational & Scaling">Operational & Seeking Expansion Working Capital</option>
                  </select>
                </div>

                {/* Udyam Registration (Simulated / Verified) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Udyam Registration Number (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={udyamReg}
                    onChange={(e) => setUdyamReg(e.target.value)}
                    placeholder="UDYAM-MH-26-0048192"
                    className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving Profile...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Saved Feasibility Reports */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-emerald-600" />
                  <span>Your Saved Business Feasibilities</span>
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Comprehensive feasibility studies, capital costs, bank subsidies, and financial metrics.
                </p>
              </div>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create New Feasibility</span>
              </Link>
            </div>

            {savedProjects.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center">
                  <FolderKanban className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">No Saved Feasibilities Yet</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                    Evaluate any enterprise idea on the home page to automatically calculate capital cost, subsidies, and save it to your profile.
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-md"
                >
                  <span>Evaluate Your First Enterprise Idea</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedProjects.map((project) => (
                  <div
                    key={project.id || `${project.businessTitle}-${project.district}`}
                    className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/50 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">
                            {project.category || 'MSME Enterprise'}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-medium">
                            {project.district}, {project.state}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-1">
                          {project.businessTitle}
                        </h3>
                      </div>

                      <button
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        className="p-2 rounded-xl text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Delete this feasibility"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/60 text-xs">
                      <div>
                        <span className="text-[10px] text-zinc-500 font-medium block">Project Cost</span>
                        <span className="font-bold text-zinc-900 dark:text-white">
                          ₹{project.projectCost ? project.projectCost.toLocaleString('en-IN') : '25,00,000'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-medium block">Govt Subsidy</span>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          ₹{project.subsidyAmount ? project.subsidyAmount.toLocaleString('en-IN') : '8,75,000'} ({project.subsidyPercent || 35}%)
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 font-medium block">DSCR Ratio</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {project.dscr || '1.82'}x (High)
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-zinc-400">
                        Saved on {new Date(project.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                      <div className="flex items-center gap-2">
                        <Link
                          href="/dpr-generator"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-semibold transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Generate DPR</span>
                        </Link>
                        <Link
                          href="/financial-calculator"
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 text-xs font-semibold transition-colors"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Check EMI</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Bank & Scheme Eligibility */}
        {activeTab === 'schemes' && (
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span>Central & State Scheme Entitlements for {district || 'Sangli'}, {state || 'Maharashtra'}</span>
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Based on your enterprise sector ({preferredSector}), your profile qualifies for these major subsidized schemes:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PMEGP Card */}
              <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded">
                    Primary Match • 98%
                  </span>
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">35% Subsidy</span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Prime Minister Employment Generation Programme (PMEGP)
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Maximum project cost up to ₹50 Lakhs for manufacturing units and ₹20 Lakhs for service sector. 25% to 35% margin money capital subsidy credited directly to your bank loan account.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-emerald-500/20 text-xs">
                  <span className="text-zinc-500">Nodal Agency: KVIC / DIC</span>
                  <Link href="/scheme-router" className="text-emerald-600 font-bold hover:underline flex items-center gap-1">
                    <span>View Guidelines</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Pradhan Mantri Mudra Yojana */}
              <div className="p-5 rounded-2xl border border-teal-500/30 bg-teal-50/30 dark:bg-teal-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-300 px-2 py-0.5 rounded">
                    Collateral-Free
                  </span>
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-400">Tarun Tier (₹10L - ₹20L)</span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Pradhan Mantri Mudra Yojana (PMMY)
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Collateral-free institutional working capital and term loans up to ₹10 Lakhs (extended up to ₹20 Lakhs for established borrowers) under Tarun category for micro-units.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-teal-500/20 text-xs">
                  <span className="text-zinc-500">Lenders: SBI, Bank of Maharashtra, RRBs</span>
                  <Link href="/financial-calculator" className="text-teal-600 font-bold hover:underline flex items-center gap-1">
                    <span>Calculate EMI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* NABARD Agri-Infra Fund */}
              <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded">
                    Interest Subvention
                  </span>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400">3% Annual Rebate</span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Agriculture Infrastructure Fund (AIF)
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Financing facility for post-harvest management infrastructure such as solar cold rooms, pack houses, and sorting units. 3% interest subvention per annum up to ₹2 Crore for 7 years.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-amber-500/20 text-xs">
                  <span className="text-zinc-500">Eligible: FPOs, Individual Entrepreneurs</span>
                  <Link href="/scheme-router" className="text-amber-600 font-bold hover:underline flex items-center gap-1">
                    <span>Scheme Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Stand-Up India */}
              <div className="p-5 rounded-2xl border border-indigo-500/30 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded">
                    Greenfield Credit
                  </span>
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">₹10 Lakh - ₹1 Crore</span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Stand-Up India Scheme
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Bank loans between ₹10 Lakhs and ₹1 Crore to at least one SC or ST borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-indigo-500/20 text-xs">
                  <span className="text-zinc-500">Administered via SIDBI</span>
                  <Link href="/scheme-router" className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
                    <span>Check Eligibility</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Cloud Sync */}
        {activeTab === 'settings' && (
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Security & Supabase Cloud Synchronization</span>
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Your data is synchronized between Supabase Cloud and localized browser cache for maximum reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Supabase Cloud Database Status</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Endpoint: <code className="text-emerald-600 dark:text-emerald-400">uszegwhlwhzprltymzet.supabase.co</code>
                </p>
                <p className="text-[11px] text-zinc-400">
                  Tables linked: <code>user_businesses</code>, <code>auth.users</code>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 dark:text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <span>Local Resilient Storage</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Active User: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{email || 'jadhavshivraj876@gmail.com'}</span>
                </p>
                <p className="text-[11px] text-zinc-400">
                  Zero blocking guarantee: Never locked out by OTP delays or expired links.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={handleInstantSignIn}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
              >
                Reset Demo Data (Shivraj Jadhav)
              </button>

              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Account</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
