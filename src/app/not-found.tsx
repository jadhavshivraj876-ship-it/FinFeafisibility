'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Home, 
  MapPin, 
  Calculator, 
  Award, 
  FileText, 
  ArrowRight, 
  Phone,
  Compass
} from 'lucide-react';

export default function NotFound() {
  const quickLinks = [
    {
      title: 'AI Business Advisory',
      desc: 'Evaluate feasibility, SWOT, risks & viability',
      href: '/',
      icon: Building2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60'
    },
    {
      title: 'Market Intelligence',
      desc: 'APMC mandis, local demand & competitor gap',
      href: '/market-intelligence',
      icon: MapPin,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/60'
    },
    {
      title: 'Financial Calculator',
      desc: 'Loan EMIs, promoter margin & bank DSCR',
      href: '/financial-calculator',
      icon: Calculator,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/60'
    },
    {
      title: 'Government Scheme Router',
      desc: 'PMEGP, Mudra & PMFME subsidies up to 35%',
      href: '/scheme-router',
      icon: Award,
      color: 'text-emerald-700 dark:text-emerald-300',
      bg: 'bg-emerald-50 dark:bg-emerald-950/60'
    },
    {
      title: 'Bank DPR Generator',
      desc: '1-Click official 5-page bank project report',
      href: '/dpr-generator',
      icon: FileText,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/60'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Top Brand Strip */}
      <header className="border-b border-emerald-500/20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-emerald-700 to-teal-600 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                FinFeasibility
              </span>
              <span className="text-[10px] ml-1.5 uppercase font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                AI Rural
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Hero Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 flex flex-col items-center text-center justify-center space-y-8">
        {/* Visual Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-xs">
          <Compass className="w-4 h-4 animate-spin text-emerald-600 dark:text-emerald-400" />
          <span>Error 404 • Advisory Path Not Located</span>
        </div>

        {/* Big 404 Title */}
        <div className="space-y-3">
          <h1 className="text-6xl sm:text-7xl font-black tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
            Looking for a Rural Enterprise or Scheme Report?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            The page or report link you requested is unavailable or has moved. Choose from our verified advisory modules below to get back on track:
          </p>
        </div>

        {/* Quick Directory Grid of Core Modules */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/60 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-8 h-8 rounded-lg ${link.bg} ${link.color} flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-xs text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                    {link.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span>Open Module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Primary CTA and Support Helpline */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to FinFeasibility Dashboard</span>
          </Link>
          <a
            href="tel:18001801111"
            className="px-5 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-emerald-500 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>National MSME Helpline: 1800 180 1111</span>
          </a>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-4 px-6 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} FinFeasibility • AI Rural Business Advisory & DPR Generator</p>
      </footer>
    </div>
  );
}
