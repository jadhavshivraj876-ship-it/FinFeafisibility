'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Award, ExternalLink, ShieldCheck, Phone, Mail, HelpCircle } from 'lucide-react';
import { Language } from '@/types';
import { TRANSLATIONS } from '@/data/translations';

interface FooterProps {
  currentLang: Language;
  onOpenTeamModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenTeamModal }) => {
  const t = TRANSLATIONS[currentLang];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-zinc-300 border-t border-zinc-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Synopsis Info */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 group focus:outline-hidden focus:ring-2 focus:ring-emerald-500 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold group-hover:bg-emerald-500 transition-colors">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base tracking-tight group-hover:text-emerald-400 transition-colors">
                FinFeasibility
              </span>
            </Link>
            <p className="text-zinc-400 leading-relaxed text-[11px]">
              AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs in India.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenTeamModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 hover:text-white font-semibold transition-colors cursor-pointer text-[11px]"
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
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
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
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Udyam MSME Registration</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Support & Clickable Helpline Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] text-emerald-400">
              Helplines & Direct Support
            </h4>
            <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700/60 space-y-2.5 text-zinc-300">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">National Mudra / MSME Helpline</span>
                <a 
                  href="tel:18001801111" 
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>1800 180 1111 (Toll Free)</span>
                </a>
              </div>

              <div>
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">KVIC / PMEGP Helpdesk</span>
                <a 
                  href="tel:1800223003" 
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>1800 22 3003</span>
                </a>
              </div>

              <div className="pt-1.5 border-t border-zinc-700/60">
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">Platform Support Email</span>
                <a 
                  href="mailto:support@finfeasibility.in" 
                  className="flex items-center gap-1.5 text-zinc-200 hover:text-white font-medium hover:underline transition-colors mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>support@finfeasibility.in</span>
                </a>
              </div>

              <div>
                <span className="text-[10px] text-zinc-400 block uppercase font-bold">Capstone Team Lead</span>
                <a 
                  href="mailto:shivraj.capstone@finfeasibility.in" 
                  className="flex items-center gap-1.5 text-zinc-200 hover:text-white font-medium hover:underline transition-colors mt-0.5"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>shivraj.capstone@finfeasibility.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 text-[11px]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              © {currentYear} FinFeasibility • B.Tech Capstone Team (I4140, I4141, I4144, I4142) • Built for Rural Micro-Enterprise Inclusion
            </span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/market-intelligence" className="hover:text-white transition-colors">Market</Link>
            <Link href="/financial-calculator" className="hover:text-white transition-colors">Calculator</Link>
            <Link href="/scheme-router" className="hover:text-white transition-colors">Schemes</Link>
            <Link href="/dpr-generator" className="hover:text-white transition-colors">DPR</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
