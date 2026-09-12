'use client';

import React from 'react';
import { X, Award, Users, BookOpen, Target, Cpu, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white dark:bg-zinc-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-emerald-200 dark:border-zinc-700 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Project Title */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs tracking-wider uppercase mb-1">
            <Award className="w-4 h-4" />
            <span>Bachelor of Technology / Engineering — Capstone Project</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">FinFeasibility</h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 leading-snug">
            AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
            <span className="bg-emerald-950/60 text-emerald-200 px-2.5 py-1 rounded-md border border-emerald-700/50">
              Theme: Agriculture, Foodtech & Rural Development
            </span>
            <span className="bg-emerald-950/60 text-emerald-200 px-2.5 py-1 rounded-md border border-emerald-700/50">
              Category: Software
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs text-zinc-700 dark:text-zinc-300">
          {/* Team Members Card */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
            <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 text-sm mb-3">
              <Users className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>Project Team Members</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white dark:bg-zinc-800 p-2.5 rounded-lg border border-emerald-100 dark:border-zinc-700 shadow-xs text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold mx-auto flex items-center justify-center text-xs mb-1">
                  S
                </div>
                <div className="font-bold text-zinc-900 dark:text-white text-xs">Shivraj</div>
                <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">I4140</div>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-2.5 rounded-lg border border-emerald-100 dark:border-zinc-700 shadow-xs text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold mx-auto flex items-center justify-center text-xs mb-1">
                  O
                </div>
                <div className="font-bold text-zinc-900 dark:text-white text-xs">Om</div>
                <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">I4141</div>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-2.5 rounded-lg border border-emerald-100 dark:border-zinc-700 shadow-xs text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold mx-auto flex items-center justify-center text-xs mb-1">
                  P
                </div>
                <div className="font-bold text-zinc-900 dark:text-white text-xs">Prem</div>
                <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">I4144</div>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-2.5 rounded-lg border border-emerald-100 dark:border-zinc-700 shadow-xs text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold mx-auto flex items-center justify-center text-xs mb-1">
                  R
                </div>
                <div className="font-bold text-zinc-900 dark:text-white text-xs">Rohan</div>
                <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">I4142</div>
              </div>
            </div>
          </div>

          {/* Problem Statement */}
          <div>
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-sm mb-2">
              <Target className="w-4 h-4 text-emerald-600" />
              <span>Problem Statement</span>
            </div>
            <p className="leading-relaxed bg-zinc-50 dark:bg-zinc-800/60 p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-700">
              Rural micro-entrepreneurs lack reliable local market insights and financial guidance, making it difficult for them to choose viable businesses, select suitable government schemes, and plan loans responsibly. Existing advisory channels are fragmented, require financial literacy that most first-time entrepreneurs do not have, and are rarely available in regional languages, leading to poor business selection, avoidable loan rejections, and underutilised government support schemes.
            </p>
          </div>

          {/* 5 Core Modules in Scope */}
          <div>
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-sm mb-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Project Scope & 5 Core Modules</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  1. Hyper-Local Market Intelligence
                </span>
                Analyses demand, competition, and underserved business opportunities across districts, talukas, and mandis.
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  2. AI Business Advisory
                </span>
                Generates rural-contextualized SWOT analysis, risk matrix, viability scoring, and operational recommendations.
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  3. Smart Financial Calculator
                </span>
                Structures project cost, promoter margin (5-10%), bank loan, interest, EMI, DSCR, and 3-year cash flow.
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  4. Government Scheme Router
                </span>
                Matches ideas with PMEGP (up to 35% subsidy), Mudra (Shishu, Kishore, Tarun), Stand-Up India, and PMFME.
              </div>

              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 sm:col-span-2">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  5. Multilingual Rural Assistant (FinMitra Voice) + Bank DPR
                </span>
                Voice-based Speech-to-Text & Text-to-Speech in 7 languages (Marathi, Hindi, English, etc.) + 1-Click Bank-Ready Detailed Project Report (PDF) generation.
              </div>
            </div>
          </div>

          {/* Technical Stack */}
          <div>
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-sm mb-2">
              <Cpu className="w-4 h-4 text-emerald-600" />
              <span>Technology Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 rounded font-medium">
                Next.js 15 (App Router)
              </span>
              <span className="px-2.5 py-1 bg-teal-100 dark:bg-teal-900/60 text-teal-900 dark:text-teal-200 rounded font-medium">
                Tailwind CSS
              </span>
              <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200 rounded font-medium">
                TypeScript
              </span>
              <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 rounded font-medium">
                Web Speech API (STT & TTS)
              </span>
              <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 rounded font-medium">
                Recharts & Geo Engine
              </span>
              <span className="px-2.5 py-1 bg-rose-100 dark:bg-rose-900/60 text-rose-900 dark:text-rose-200 rounded font-medium">
                Supabase & Banking Math Engine
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-100 dark:bg-zinc-800/80 px-6 py-3 border-t border-zinc-200 dark:border-zinc-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            Close Synopsis
          </button>
        </div>
      </div>
    </div>
  );
};
