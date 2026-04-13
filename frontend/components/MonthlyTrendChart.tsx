'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface MonthlyTrendItem {
  month: string;
  income: number;
  expense: number;
}

interface MonthlyTrendChartProps {
  data: MonthlyTrendItem[];
  mutedText: string;
  softCard: string;
  darkMode: boolean;
}

export default function MonthlyTrendChart({
  data,
  mutedText,
  softCard,
  darkMode,
}: MonthlyTrendChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.19, duration: 0.35 }}
      className={`rounded-3xl p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Tendência mensal</h3>
          <p className={`text-xs ${mutedText}`}>
            Evolução de receitas e gastos ao longo do tempo
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-[11px] ${
            darkMode
              ? 'border border-white/10 bg-white/10 text-zinc-300'
              : 'border border-gray-200 bg-white text-gray-600'
          }`}
        >
          Trend
        </span>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="month"
              stroke={darkMode ? '#a1a1aa' : '#6b7280'}
              fontSize={11}
            />
            <YAxis
              stroke={darkMode ? '#a1a1aa' : '#6b7280'}
              fontSize={11}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#18181b' : '#ffffff',
                border: darkMode
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid #e5e7eb',
                borderRadius: '12px',
                color: darkMode ? '#ffffff' : '#111827',
              }}
              formatter={(value: any) => `R$ ${Number(value).toFixed(2)}`}
            />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className={mutedText}>Receitas</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className={mutedText}>Gastos</span>
        </div>
      </div>
    </motion.div>
  );
}