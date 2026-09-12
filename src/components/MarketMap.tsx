'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Store, 
  Warehouse, 
  Building2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Compass,
  Layers
} from 'lucide-react';
import { DistrictData } from '@/types';

interface MarketMapProps {
  district: DistrictData;
}

export const MarketMap: React.FC<MarketMapProps> = ({ district }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Mandi' | 'ColdStorage' | 'DIC Office' | 'Competitor'>('All');
  const [selectedPin, setSelectedPin] = useState<{
    name: string;
    type: string;
    distanceKm?: number;
    notes?: string;
  } | null>(null);

  // Generate deterministic coordinates for mock interactive district grid
  const pinCoordinates = [
    { x: 48, y: 46, name: `${district.name} City Cluster`, type: 'DIC Office', distanceKm: 0, notes: 'Lead District Bank & DIC Nodal Office' },
    { x: 32, y: 35, name: district.apmcMarkets[0] || 'APMC Main Yard', type: 'Mandi', distanceKm: 12.4, notes: 'Highest volume seasonal crop arrivals' },
    { x: 68, y: 40, name: district.apmcMarkets[1] || 'Sub-Mandi Yard', type: 'Mandi', distanceKm: 18.2, notes: 'Grain, spice & legume wholesale trading' },
    { x: 55, y: 65, name: 'Regional Agro Cold Chain Complex', type: 'ColdStorage', distanceKm: 14.8, notes: 'Multi-chamber 2°C - 8°C perishable storage' },
    { x: 25, y: 60, name: 'Competitor Cluster (Unorganized Units)', type: 'Competitor', distanceKm: 22.0, notes: '3 traditional processing units without branding' },
    { x: 75, y: 72, name: 'High-Demand Rural Growth Corridor', type: 'DemandZone', distanceKm: 19.5, notes: 'Underserved taluka with high raw material supply' }
  ];

  const filteredPins = pinCoordinates.filter(pin => {
    if (activeFilter === 'All') return true;
    return pin.type === activeFilter;
  });

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-emerald-100 dark:border-zinc-800 shadow-sm overflow-hidden">
      {/* Map visualizer header */}
      <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-zinc-800/80 dark:to-zinc-800/40 border-b border-emerald-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
          <div>
            <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
              Hyper-Local Geo Visualizer: {district.name} District ({district.state})
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Interactive cluster density, APMC mandis, cold chains & competitor radius
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 text-xs">
          <Layers className="w-3.5 h-3.5 text-zinc-400 mr-1" />
          {(['All', 'Mandi', 'ColdStorage', 'DIC Office', 'Competitor'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                activeFilter === filter
                  ? 'bg-emerald-700 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Map Canvas */}
      <div className="relative bg-emerald-950/5 dark:bg-zinc-950/60 p-4 min-h-[340px] flex items-center justify-center overflow-hidden">
        {/* District outline / Grid effect */}
        <svg className="w-full h-[320px] rounded-xl border border-emerald-200/60 dark:border-zinc-800" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-emerald-300/40 dark:text-zinc-800" />
            </pattern>
            {/* Saturation gradient circle */}
            <radialGradient id="demandHeatmap" cx="75%" cy="70%" r="35%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="competitorHeatmap" cx="25%" cy="60%" r="25%">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid Background */}
          <rect width="100" height="100" fill="url(#grid)" />

          {/* Heatmap Overlays */}
          <circle cx="75" cy="70" r="30" fill="url(#demandHeatmap)" />
          <circle cx="25" cy="60" r="22" fill="url(#competitorHeatmap)" />

          {/* District boundary polygon abstraction */}
          <path
            d="M 15,25 Q 35,10 60,18 T 90,35 Q 95,65 80,85 T 45,92 Q 18,80 12,50 Z"
            fill="#059669"
            fillOpacity="0.06"
            stroke="#059669"
            strokeWidth="0.8"
            strokeDasharray="2,1"
          />

          {/* Major highway / corridor */}
          <path
            d="M 5,85 Q 45,55 95,20"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />
          <text x="50" y="52" fill="#d97706" fontSize="2.2" fontStyle="italic">National Highway Logistics Corridor</text>

          {/* Taluka labels */}
          {district.talukas.slice(0, 5).map((taluka, i) => {
            const positions = [
              { x: 30, y: 28 },
              { x: 65, y: 32 },
              { x: 42, y: 60 },
              { x: 70, y: 78 },
              { x: 22, y: 75 }
            ];
            const pos = positions[i] || { x: 50, y: 50 };
            return (
              <text
                key={taluka}
                x={pos.x}
                y={pos.y}
                fill="currentColor"
                className="text-zinc-600 dark:text-zinc-400 font-semibold uppercase tracking-wider"
                fontSize="2.4"
                textAnchor="middle"
              >
                {taluka}
              </text>
            );
          })}

          {/* Interactive Pins */}
          {filteredPins.map((pin, index) => {
            const isSelected = selectedPin?.name === pin.name;
            let color = '#10b981'; // Green for Mandi
            if (pin.type === 'DIC Office') color = '#3b82f6'; // Blue for DIC/Bank
            if (pin.type === 'ColdStorage') color = '#06b6d4'; // Cyan for ColdStorage
            if (pin.type === 'Competitor') color = '#f43f5e'; // Rose for Competitor
            if (pin.type === 'DemandZone') color = '#8b5cf6'; // Violet for Demand

            return (
              <g
                key={index}
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={() => setSelectedPin(pin)}
              >
                {/* Ping ring */}
                <circle cx={pin.x} cy={pin.y} r={isSelected ? 4.5 : 3.2} fill={color} fillOpacity="0.3" className="animate-pulse" />
                <circle cx={pin.x} cy={pin.y} r="1.8" fill={color} stroke="#ffffff" strokeWidth="0.5" />
                <text x={pin.x} y={pin.y - 3} fill="currentColor" className="text-zinc-900 dark:text-white font-bold" fontSize="2.0" textAnchor="middle">
                  {pin.name.split(' ')[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Pin Details Overlay Card */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-3.5 rounded-xl border border-emerald-300 dark:border-zinc-700 shadow-xl text-xs animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-zinc-900 dark:text-white text-xs">{selectedPin.name}</span>
              <button 
                onClick={() => setSelectedPin(null)} 
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white font-bold p-1"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 mb-2">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                {selectedPin.type}
              </span>
              <span>Distance: ~{selectedPin.distanceKm} km</span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-snug">
              {selectedPin.notes}
            </p>
          </div>
        )}
      </div>

      {/* Metric Indicators below map */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc-50 dark:bg-zinc-800/40 border-t border-emerald-100 dark:border-zinc-800 text-xs">
        <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <span className="text-[10px] text-zinc-500 block uppercase font-bold">Market Demand Index</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-base font-black text-emerald-700 dark:text-emerald-400">{district.demandIndex}/100</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          </div>
        </div>

        <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <span className="text-[10px] text-zinc-500 block uppercase font-bold">Market Saturation</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-base font-black text-amber-700 dark:text-amber-400">{district.saturationIndex}%</span>
            <span className="text-[10px] bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-1 rounded font-semibold">Healthy Gap</span>
          </div>
        </div>

        <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <span className="text-[10px] text-zinc-500 block uppercase font-bold">APMC Mandis & Yards</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-base font-black text-zinc-900 dark:text-white">{district.apmcMarkets.length} Mandis</span>
            <Store className="w-3.5 h-3.5 text-blue-600" />
          </div>
        </div>

        <div className="p-2.5 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
          <span className="text-[10px] text-zinc-500 block uppercase font-bold">Cold Chain Infra</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-base font-black text-zinc-900 dark:text-white">{district.coldStorageCount} Units</span>
            <Warehouse className="w-3.5 h-3.5 text-teal-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
