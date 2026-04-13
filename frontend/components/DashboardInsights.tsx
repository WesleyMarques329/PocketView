'use client';

import { motion } from 'framer-motion';
import {
  AlertTriangle,
  BarChart3,
  Flame,
  Receipt,
  Tag,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

interface DashboardInsightsProps {
  totalTransactions: number;
  biggestExpense: number;
  averageExpense: number;
  topExpenseCategory: string;
  mutedText: string;
  softCard: string;
  darkMode: boolean;
}

export default function DashboardInsights({
  totalTransactions,
  biggestExpense,
  averageExpense,
  topExpenseCategory,
  mutedText,
  softCard,
  darkMode,
}: DashboardInsightsProps) {
  const items = [
    {
      label: 'Transações',
      value: totalTransactions.toString(),
      icon: Receipt,
      accent: darkMode
        ? 'bg-white/10 text-white'
        : 'bg-black text-white',
    },
    {
      label: 'Maior gasto',
      value: `R$ ${biggestExpense.toFixed(2)}`,
      icon: TrendingDown,
      accent: darkMode
        ? 'bg-red-500/15 text-red-300'
        : 'bg-red-100 text-red-700',
    },
    {
      label: 'Gasto médio',
      value: `R$ ${averageExpense.toFixed(2)}`,
      icon: BarChart3,
      accent: darkMode
        ? 'bg-blue-500/15 text-blue-300'
        : 'bg-blue-100 text-blue-700',
    },
    {
      label: 'Top categoria',
      value: topExpenseCategory,
      icon: Flame,
      accent: darkMode
        ? 'bg-orange-500/15 text-orange-300'
        : 'bg-orange-100 text-orange-700',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 13 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14, duration: 0.35 }}
      className={`rounded-3xl p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-medium">Insights do dashboard</h3>
        <p className={`text-xs ${mutedText}`}>
          Um retrato rápido do seu comportamento financeiro
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.22 }}
              whileHover={{ y: -2 }}
              className={`rounded-2xl border p-4 transition ${
                darkMode
                  ? 'border-white/10 bg-white/5 hover:bg-white/[0.07]'
                  : 'border-gray-200 bg-white/90 hover:bg-white'
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className={`text-xs ${mutedText}`}>{item.label}</span>

                <div className={`rounded-full p-2 ${item.accent}`}>
                  <Icon size={14} />
                </div>
              </div>

              <p className="truncate text-lg font-semibold tracking-tight">
                {item.value}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}