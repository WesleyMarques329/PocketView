'use client';

import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Tag } from 'lucide-react';

interface TagBarChartProps {
  data: {
    name: string;
    value: number;
  }[];
  mutedText: string;
  softCard: string;
  darkMode: boolean;
}

export default function TagBarChart({
  data,
  mutedText,
  softCard,
  darkMode,
}: TagBarChartProps) {
  const chartData = data.slice(0, 8).map((item) => ({
    ...item,
    shortName: item.name.length > 12 ? `${item.name.slice(0, 12)}…` : item.name,
  }));

  const tooltipStyle = {
    backgroundColor: darkMode ? '#18181b' : '#ffffff',
    border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb',
    borderRadius: '16px',
    color: darkMode ? '#ffffff' : '#111827',
    boxShadow: darkMode
      ? '0 10px 30px rgba(0,0,0,0.35)'
      : '0 10px 30px rgba(0,0,0,0.08)',
  };

  const barColors = darkMode
    ? [
        '#a78bfa',
        '#60a5fa',
        '#34d399',
        '#f472b6',
        '#f59e0b',
        '#fb7185',
        '#22c55e',
        '#38bdf8',
      ]
    : [
        '#7c3aed',
        '#2563eb',
        '#059669',
        '#db2777',
        '#d97706',
        '#e11d48',
        '#16a34a',
        '#0284c7',
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18, duration: 0.35 }}
      className={`rounded-3xl p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Gastos por tag</h3>
          <p className={`text-xs ${mutedText}`}>
            Veja quais tags mais pesam no seu mês
          </p>
        </div>

        <div
          className={`rounded-full p-2 ${
            darkMode ? 'bg-white/10' : 'bg-gray-100'
          }`}
        >
          <Tag
            size={16}
            className={darkMode ? 'text-zinc-300' : 'text-gray-500'}
          />
        </div>
      </div>

      {chartData.length === 0 ? (
        <div
          className={`rounded-2xl border border-dashed p-6 text-center ${
            darkMode
              ? 'border-white/10 text-zinc-400'
              : 'border-gray-300 text-gray-500'
          }`}
        >
          Nenhuma tag suficiente para gerar gráfico ainda.
        </div>
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
            >
              <XAxis
                dataKey="shortName"
                tick={{
                  fill: darkMode ? '#a1a1aa' : '#6b7280',
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fill: darkMode ? '#a1a1aa' : '#6b7280',
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={tooltipStyle}
                formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Total']}
                labelFormatter={(label) => `#${label}`}
              />
              <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={barColors[index % barColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}