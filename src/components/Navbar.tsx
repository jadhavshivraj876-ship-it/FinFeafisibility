'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthModal } from '@/components/AuthModal';
import { UserProfileModal } from '@/components/UserProfileModal';
import { 
  Building2, 
  MapPin, 
  BrainCircuit, 
  Calculator, 
  Award, 
  FileText, 
  Mic, 
  Languages, 
  Users, 
  Sparkles,
  ShieldCheck,
  LogIn
} from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { useAuth } from '@/lib/useAuth';
import { UserBusinessProfile } from '@/lib/supabaseClient';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenVoice: () => void;
  onOpenTeamModal: () => void;
  onLoadSavedProject?: (project: UserBusinessProfile) => void;
}

const LANGUAGE_LABELS: Record<Language, { label: string; native: string }> = {
  en: { label: 'English', native: 'English' },
  hi: { label: 'Hindi', native: 'हिन्दी' },
  mr: { label: 'Marathi', native: 'मराठी' },
  te: { label: 'Telugu', native: 'తెలుగు' },
  ta: { label: 'Tamil', native: 'தமிழ்' },
  gu: { label: 'Gujarati', native: 'ગુજરાતી' },
  bn: { label: 'Bengali', native: 'বাংলা' }
};

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenVoice,
  onOpenTeamModal,
  onLoadSavedProject
}) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const pathname = usePathname();
  const t = TRANSLATIONS[currentLang];

  const navLinks = [
    { href: '/', label: t.navAdvisory, icon: BrainCircuit },
    { href: '/market-intelligence', label: t.navMarket, icon: MapPin },
    { href: '/financial-calculator', label: t.navCalculator, icon: Calculator },
    { href: '/scheme-router', label: t.navSchemes, icon: Award },
    { href: '/dpr-generator', label: t.navDpr, icon: FileText }
  ];

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Entrepreneur';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-emerald-500/20 transition-colors shadow-xs">
        {/* Top micro-bar showing National Alignment & B.Tech Capstone Project Tag */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-900 text-white text-xs py-1 px-4 border-b border-emerald-500/20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium tracking-wide">
                {t.heroBadge} • PMEGP & Mudra Scheme Engine
              </span>
            </div>
            <button
              onClick={onOpenTeamModal}
              className="flex items-center gap-1.5 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="font-semibold underline underline-offset-2">
                B.Tech Final Year Project (Team I4140-I4144)
              </span>
            </button>
          </div>
        </div>

        {/* Main navigation row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 group-hover:scale-105 transition-transform card-3d-interactive">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tight bg-gradient-to-r from-emerald-800 to-teal-700 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                    FinFeasibility
                  </span>
                  <span className="text-[10px] uppercase font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                    AI Rural
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 hidden sm:block truncate max-w-xs font-medium">
                  Hyper-Local Business Advisory & Bank Loan Structuring
                </p>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs'
                        : 'text-zinc-600 dark:text-zinc-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-400'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Controls: User Profile/Auth, Voice FinMitra & Language */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* User Profile / Registration Pill */}
              {user ? (
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700/60 hover:border-emerald-500 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all shadow-xs cursor-pointer group"
                  title="Open Entrepreneur Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shadow-xs group-hover:scale-105 transition-transform">
                    {initials}
                  </div>
                  <span className="hidden sm:inline max-w-[110px] truncate">{displayName}</span>
                  <span className="text-[10px] bg-emerald-200 dark:bg-emerald-800/80 text-emerald-900 dark:text-emerald-100 px-1.5 py-0.2 rounded font-bold">
                    Profile
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setAuthModalTab('signin');
                      setShowAuthModal(true);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500 text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Sign In</span>
                  </button>

                  <button
                    onClick={() => {
                      setAuthModalTab('signup');
                      setShowAuthModal(true);
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                    <span>Register</span>
                  </button>
                </div>
              )}

              {/* Voice Assistant FinMitra Trigger */}
              <button
                onClick={onOpenVoice}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium text-xs shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
                title="Voice Assistant (FinMitra)"
              >
                <Mic className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline font-semibold">Voice</span>
              </button>

              {/* Language Selector Dropdown */}
              <div className="relative flex items-center">
                <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1 border border-zinc-200 dark:border-zinc-700 text-xs">
                  <Languages className="w-3.5 h-3.5 text-zinc-500 ml-1.5" />
                  <select
                    aria-label="Select Language"
                    value={currentLang}
                    onChange={(e) => onLanguageChange(e.target.value as Language)}
                    className="bg-transparent border-0 text-zinc-800 dark:text-zinc-200 font-semibold focus:ring-0 cursor-pointer text-xs py-1 pr-1 pl-1 outline-hidden"
                  >
                    {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
                      <option key={lang} value={lang} className="text-zinc-900 bg-white dark:bg-zinc-800">
                        {LANGUAGE_LABELS[lang].native} ({LANGUAGE_LABELS[lang].label})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick DPR CTA button */}
              <Link
                href="/dpr-generator"
                className="hidden md:flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Get DPR</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal (Sign In / Register) */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab={authModalTab}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onLoadProject={onLoadSavedProject}
      />
    </>
  );
};
