'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { CashFlowYear } from '@/types';

interface CashFlowChartProps {
  cashFlowYears: CashFlowYear[];
}

export const CashFlowChart: React.FC<CashFlowChartProps> = ({ cashFlowYears }) => {
  const chartData = cashFlowYears.map(item => ({
    name: `Year ${item.year}`,
    Revenue: Math.round(item.revenue / 1000), // in ₹ Thousands
    Costs: Math.round((item.cogs + item.operatingExpenses) / 1000),
    NetProfit: Math.round(item.netProfit / 1000),
    DSCR: item.dscr
  }));

  const formatLakhs = (val: number) => `₹${(val / 100).toFixed(1)}L`;

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
          <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={10} tickFormatter={(v) => `₹${v}k`} />
          <Tooltip 
            formatter={(value: any, name: any) => {
              const numVal = Number(value);
              return [`₹${(numVal * 1000).toLocaleString('en-IN')}`, name];
            }}
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
          <Bar dataKey="Revenue" fill="#059669" name="Annual Sales Revenue" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Costs" fill="#64748b" name="Total Operating Costs" radius={[4, 4, 0, 0]} />
          <Bar dataKey="NetProfit" fill="#f59e0b" name="Net Profit (After Tax)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
