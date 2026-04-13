'use client';

import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

interface MonthlyComparisonProps {
  currentExpense: number;
  previousExpense: number;
  currentIncome: number;
  previousIncome: number;
  mutedText: string;
  softCard: string;
  darkMode: boolean;
}

function getChange(current: number, previous: number) {
  if (previous === 0 && current === 0) {
    return { percent: 0, direction: 'neutral' as const };
  }

  if (previous === 0) {
    return { percent: 100, direction: 'up' as const };
  }

  const raw = ((current - previous) / previous) * 100;

  if (raw > 0) return { percent: raw, direction: 'up' as const };
  if (raw < 0) return { percent: Math.abs(raw), direction: 'down' as const };
  return { percent: 0, direction: 'neutral' as const };
}

export default function MonthlyComparison({
  currentExpense,
  previousExpense,
  currentIncome,
  previousIncome,
  mutedText,
  softCard,
  darkMode,
}: MonthlyComparisonProps) {
  const expenseChange = getChange(currentExpense, previousExpense);
  const incomeChange = getChange(currentIncome, previousIncome);

  const renderChange = (
    change: ReturnType<typeof getChange>,
    inverseGood: boolean
  ) => {
    if (change.direction === 'neutral') {
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
            darkMode ? 'bg-white/10 text-zinc-300' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <Minus size={12} />
          Sem variação
        </span>
      );
    }

    const positiveForUser =
      inverseGood ? change.direction === 'down' : change.direction === 'up';

    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
          positiveForUser
            ? darkMode
              ? 'bg-green-500/15 text-green-300'
              : 'bg-green-100 text-green-700'
            : darkMode
            ? 'bg-red-500/15 text-red-300'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {change.direction === 'up' ? (
          <ArrowUpRight size={12} />
        ) : (
          <ArrowDownRight size={12} />
        )}
        {change.percent.toFixed(0)}%
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.18, duration: 0.35 }}
      className={`rounded-3xl p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Comparação mensal</h3>
          <p className={`text-xs ${mutedText}`}>
            Compare seu mês atual com o anterior
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-[11px] ${
            darkMode
              ? 'border border-white/10 bg-white/10 text-zinc-300'
              : 'border border-gray-200 bg-white text-gray-600'
          }`}
        >
          Monthly
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div
          className={`rounded-2xl border p-4 ${
            darkMode
              ? 'border-white/10 bg-white/5'
              : 'border-gray-200 bg-white/90'
          }`}
        >
          <p className={`mb-1 text-xs ${mutedText}`}>Gastos do período</p>
          <strong className="text-lg tracking-tight">
            R$ {currentExpense.toFixed(2)}
          </strong>
          <div className="mt-2">{renderChange(expenseChange, true)}</div>
        </div>

        <div
          className={`rounded-2xl border p-4 ${
            darkMode
              ? 'border-white/10 bg-white/5'
              : 'border-gray-200 bg-white/90'
          }`}
        >
          <p className={`mb-1 text-xs ${mutedText}`}>Receitas do período</p>
          <strong className="text-lg tracking-tight">
            R$ {currentIncome.toFixed(2)}
          </strong>
          <div className="mt-2">{renderChange(incomeChange, false)}</div>
        </div>
      </div>
    </motion.div>
  );
}