'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Award, ExternalLink, Heart, ShieldCheck, FileCheck } from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/data/translations';

interface FooterProps {
  currentLang: Language;
  onOpenTeamModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenTeamModal }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="bg-zinc-900 text-zinc-300 border-t border-zinc-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Synopsis Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">FinFeasibility</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenTeamModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 hover:text-white font-semibold transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>B.Tech Final Year Capstone Project</span>
              </button>
            </div>
          </div>

          {/* Col 2: Five Core Modules */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 text-emerald-400">
              Core Platform Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/market-intelligence" className="hover:text-white transition-colors">
                  1. Hyper-Local Market Intelligence
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  2. AI Business Advisory & SWOT
                </Link>
              </li>
              <li>
                <Link href="/financial-calculator" className="hover:text-white transition-colors">
                  3. Smart Financial Calculator & DSCR
                </Link>
              </li>
              <li>
                <Link href="/scheme-router" className="hover:text-white transition-colors">
                  4. Government Scheme Router
                </Link>
              </li>
              <li>
                <Link href="/dpr-generator" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>5. Bank DPR Report Generator</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1 rounded font-bold">New</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Government Scheme Portals */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3 text-emerald-400">
              Official Government Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>PMEGP e-Portal (KVIC)</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.mudra.org.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Pradhan Mantri Mudra Yojana</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.standupmitra.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Stand-Up India (SIDBI)</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://pmfme.mofpi.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>PMFME Food Processing</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://udyamregistration.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Udyam MSME Registration</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Team & Academic Credentials */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-emerald-400">
              Submitted By (Students)
            </h4>
            <div className="bg-zinc-800/80 p-3 rounded-lg border border-zinc-700/60 space-y-1 text-zinc-300">
              <p className="font-semibold text-white">Shivraj (I4140)</p>
              <p className="font-semibold text-white">Om (I4141)</p>
              <p className="font-semibold text-white">Prem (I4144)</p>
              <p className="font-semibold text-white">Rohan (I4142)</p>
              <p className="text-[11px] text-emerald-400 pt-1 border-t border-zinc-700 mt-2">
                Degree: Bachelor of Technology / Engineering
              </p>
              <p className="text-[10px] text-zinc-400">
                Theme: Agriculture, Foodtech and Rural Development
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              FinFeasibility • Final Year Capstone Project • Designed for Rural Micro-Enterprise Inclusion
            </span>
          </div>
          <div className="text-right">
            <span>Powered by Next.js, Tailwind CSS, Supabase & Web Speech API</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
