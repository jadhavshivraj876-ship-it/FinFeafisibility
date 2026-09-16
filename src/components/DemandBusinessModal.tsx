'use client';

import React, { useState } from 'react';
import { X, Sparkles, Wand2, Lightbulb, ArrowRight, CheckCircle2 } from 'lucide-react';
import { generateDemandBusinessTemplate } from '@/lib/businessGenerator';
import { registerCustomBusinessTemplate } from '@/data/businesses';
import { BusinessTemplate } from '@/types';

interface DemandBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBusiness: (business: BusinessTemplate) => void;
}

const POPULAR_DEMAND_PROMPTS = [
  'Button Mushroom Cultivation, Dehydration & Canning',
  'Engineered Bamboo Boards, Furniture & Handicrafts',
  'Paddy Straw & Crop Residue Bio-Pelleting Plant',
  'Spice Grinding, Oleoresin Extraction & Vacuum Packaging',
  'Dairy Khoya, Paneer & Ghee Micro-Processing Unit',
  'High-Protein Cattle & Poultry Feed Formulation Plant',
  'Fly Ash Cement Bricks & Paver Blocks Manufacturing',
  'Fly-Ash & Clay Pottery Artisan Workshop',
  'Farm-Gate Decentralized Solar Pumping & Cold Room'
];

export const DemandBusinessModal: React.FC<DemandBusinessModalProps> = ({
  isOpen,
  onClose,
  onSelectBusiness
}) => {
  const [query, setQuery] = useState('');
  const [estimatedCost, setEstimatedCost] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (customQuery?: string) => {
    const textToUse = customQuery || query;
    if (!textToUse.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const parsedCost = estimatedCost ? parseFloat(estimatedCost) * 100000 : undefined;
      const newTemplate = generateDemandBusinessTemplate(textToUse, undefined, parsedCost);

      // Register into runtime business repository
      registerCustomBusinessTemplate(newTemplate);

      // Select it for the parent component
      onSelectBusiness(newTemplate);
      setIsGenerating(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white dark:bg-zinc-900 w-full max-w-xl rounded-3xl shadow-2xl border border-amber-200 dark:border-zinc-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <Wand2 className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Demand-Driven Business Synthesizer</h3>
              <p className="text-amber-100 text-xs">
                Describe any enterprise you wish to start anywhere in India
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs">
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            FinFeasibility isn&apos;t limited to predefined ideas. Enter any business concept you want to launch. 
            Our AI engine will instantly compute machinery Capex, monthly Opex, revenue projections, bank DSCR viability, statutory licenses, and eligible subsidies.
          </p>

          {/* Form Input */}
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Enter Your Business Idea or Product:
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Mushroom Cultivation & Processing, Bamboo Crafts, Bio-diesel..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Approximate Target Project Cost (Optional - in Lakhs ₹):
              </label>
              <input
                type="number"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(e.target.value)}
                placeholder="Leave blank to let FinFeasibility auto-estimate (e.g. 12.5)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
            </div>

            <button
              onClick={() => handleGenerate()}
              disabled={!query.trim() || isGenerating}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Capex, Opex & Bank Viability...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Feasibility & Bank Model</span>
                </>
              )}
            </button>
          </div>

          {/* Preset Suggested Demands */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
              <Lightbulb className="w-3 h-3 text-amber-500" />
              <span>Or click a high-demand emerging opportunity:</span>
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
              {POPULAR_DEMAND_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGenerate(prompt)}
                  className="text-left bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-zinc-700 dark:text-zinc-300 hover:text-amber-800 dark:hover:text-amber-300 border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors cursor-pointer"
                >
                  + {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
