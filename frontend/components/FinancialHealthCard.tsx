'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';

interface FinancialHealthCardProps {
  income: number;
  expense: number;
  balance: number;
  goal: string;
  mutedText: string;
  softCard: string;
  darkMode: boolean;
}

export default function FinancialHealthCard({
  income,
  expense,
  balance,
  goal,
  mutedText,
  softCard,
  darkMode,
}: FinancialHealthCardProps) {
  const numericGoal = Number(goal) || 0;

  let score = 100;

  if (income > 0) {
    const ratio = expense / income;

    if (ratio > 1) score -= 40;
    else if (ratio > 0.8) score -= 20;
    else if (ratio > 0.6) score -= 10;
  } else if (expense > 0) {
    score -= 35;
  }

  if (balance < 0) score -= 35;

  if (numericGoal > 0) {
    const goalRatio = expense / numericGoal;

    if (goalRatio > 1) score -= 20;
    else if (goalRatio > 0.8) score -= 10;
  }

  score = Math.max(0, Math.min(100, score));

  let label = 'Saudável';
  let description = 'Seu ritmo financeiro parece equilibrado.';
  let color = 'bg-green-500';
  let Icon = ShieldCheck;

  if (score < 75) {
    label = 'Atenção';
    description = 'Vale revisar seus gastos e acompanhar a meta.';
    color = 'bg-yellow-500';
    Icon = ShieldAlert;
  }

  if (score < 45) {
    label = 'Crítico';
    description = 'Seu cenário pede ajustes mais urgentes.';
    color = 'bg-red-500';
    Icon = ShieldX;
  }

  const badgeClass =
    label === 'Saudável'
      ? darkMode
        ? 'bg-green-500/15 text-green-300'
        : 'bg-green-100 text-green-700'
      : label === 'Atenção'
      ? darkMode
        ? 'bg-yellow-500/15 text-yellow-300'
        : 'bg-yellow-100 text-yellow-700'
      : darkMode
      ? 'bg-red-500/15 text-red-300'
      : 'bg-red-100 text-red-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.17, duration: 0.35 }}
      className={`rounded-3xl p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Saúde financeira</h3>
          <p className={`text-xs ${mutedText}`}>
            Um indicador rápido da sua situação atual
          </p>
        </div>

        <div
          className={`rounded-full p-2 ${
            darkMode ? 'bg-white/10' : 'bg-gray-100'
          }`}
        >
          <Icon
            size={16}
            className={
              label === 'Saudável'
                ? darkMode
                  ? 'text-green-400'
                  : 'text-green-600'
                : label === 'Atenção'
                ? darkMode
                  ? 'text-yellow-400'
                  : 'text-yellow-600'
                : darkMode
                ? 'text-red-400'
                : 'text-red-600'
            }
          />
        </div>
      </div>

      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className={`text-xs ${mutedText}`}>Score</p>
          <h4 className="text-4xl font-bold tracking-tight">{score}</h4>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}>
          {label}
        </span>
      </div>

      <div
        className={`mb-3 h-3 overflow-hidden rounded-full ${
          darkMode ? 'bg-white/10' : 'bg-gray-200'
        }`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>

      <p className={`text-sm leading-6 ${mutedText}`}>{description}</p>
    </motion.div>
  );
}