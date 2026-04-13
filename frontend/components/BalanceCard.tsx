'use client';

import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Scale,
  Wallet2,
} from 'lucide-react';
import AnimatedNumber from '@/components/AnimatedNumber';

interface BalanceCardProps {
  balance: number;
  income: number;
  expense: number;
  darkMode: boolean;
}

export default function BalanceCard({
  balance,
  income,
  expense,
  darkMode,
}: BalanceCardProps) {
  const healthLabel =
    balance > 0 ? 'Saudável' : balance === 0 ? 'Neutro' : 'Atenção';

  const totalFlow = income + expense;
  const incomePercentage = totalFlow > 0 ? (income / totalFlow) * 100 : 0;
  const expensePercentage = totalFlow > 0 ? (expense / totalFlow) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.35 }}
      className={`relative overflow-hidden rounded-[32px] p-6 shadow-2xl ${
        darkMode
          ? 'border border-white/10 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black text-white'
          : 'bg-gradient-to-br from-slate-900 via-sky-950 to-slate-700 text-white'
      }`}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-sky-300/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-24 w-24 rounded-full bg-white/5 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/80">
                <Wallet2 size={12} />
                Saldo geral
              </span>

              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  balance > 0
                    ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
                    : balance < 0
                    ? 'border border-red-500/20 bg-red-500/10 text-red-300'
                    : 'border border-white/10 bg-white/10 text-zinc-200'
                }`}
              >
                {healthLabel}
              </span>
            </div>

            <p className="text-sm text-white/65">Saldo total</p>

            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              <AnimatedNumber value={balance} prefix="R$ " />
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              {balance > 0
                ? 'Suas entradas estão acima das saídas, com folga positiva no período.'
                : balance < 0
                ? 'Seus gastos ultrapassaram as entradas neste período.'
                : 'Entradas e saídas ficaram equilibradas neste período.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-[360px]">
            <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2 text-xs text-white/75">
                <ArrowUpRight size={14} />
                <span>Receitas</span>
              </div>

              <strong className="block text-xl text-sky-300">
                <AnimatedNumber value={income} prefix="R$ " />
              </strong>

              <p className="mt-1 text-xs text-white/55">
                {incomePercentage.toFixed(0)}% do fluxo
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2 text-xs text-white/75">
                <ArrowDownRight size={14} />
                <span>Gastos</span>
              </div>

              <strong className="block text-xl text-red-300">
                <AnimatedNumber value={expense} prefix="R$ " />
              </strong>

              <p className="mt-1 text-xs text-white/55">
                {expensePercentage.toFixed(0)}% do fluxo
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.07] p-4">
          <div className="mb-2 flex items-center gap-2 text-xs text-white/70">
            <Scale size={14} />
            Leitura do equilíbrio
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-300 to-sky-500"
              style={{ width: `${Math.max(0, Math.min(incomePercentage, 100))}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4 text-xs text-white/60">
            <span>Entradas maiores = cenário mais folgado</span>
            <span>
              {incomePercentage.toFixed(0)}% / {expensePercentage.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}