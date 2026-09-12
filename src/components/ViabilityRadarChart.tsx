'use client';

import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts';

interface ViabilityRadarChartProps {
  scores: {
    marketDemand: number; // 0 - 100
    technicalSimplicity: number;
    rawMaterialEase: number;
    marginHealth: number;
    schemeFit: number;
  };
}

export const ViabilityRadarChart: React.FC<ViabilityRadarChartProps> = ({ scores }) => {
  const radarData = [
    { subject: 'Local Demand', score: scores.marketDemand, fullMark: 100 },
    { subject: 'Tech Simplicity', score: scores.technicalSimplicity, fullMark: 100 },
    { subject: 'Raw Materials', score: scores.rawMaterialEase, fullMark: 100 },
    { subject: 'Margin Health', score: scores.marginHealth, fullMark: 100 },
    { subject: 'Govt Scheme Fit', score: scores.schemeFit, fullMark: 100 }
  ];

  const compositeScore = Math.round(
    (scores.marketDemand + scores.technicalSimplicity + scores.rawMaterialEase + scores.marginHealth + scores.schemeFit) / 5
  );

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} outerRadius="75%">
            <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="subject" stroke="#475569" fontSize={10} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={9} />
            <Radar
              name="Viability Score"
              dataKey="score"
              stroke="#059669"
              fill="#10b981"
              fillOpacity={0.45}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
          Composite Rural Viability:
        </span>
        <span className="text-base font-black text-emerald-700 dark:text-emerald-400">
          {compositeScore}/100
        </span>
        <span className="text-[10px] uppercase font-bold bg-emerald-600 text-white px-1.5 py-0.5 rounded">
          {compositeScore >= 80 ? 'Highly Viable' : compositeScore >= 65 ? 'Viable' : 'Moderate'}
        </span>
      </div>
    </div>
  );
};
