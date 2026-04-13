'use client';

import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  PiggyBank,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';

interface Props {
  income: number;
  expense: number;
  balance: number;
  previousBalance: number;
  creditExpensePercentage: number;
  darkMode: boolean;
  mutedText: string;
}

export default function MonthlySummaryCard({
  income,
  expense,
  balance,
  previousBalance,
  creditExpensePercentage,
  darkMode,
  mutedText,
}: Props) {
  const savingsRate = income > 0 ? (balance / income) * 100 : 0;
  const diff = balance - previousBalance;
  const isPositive = balance >= 0;

  const formatMoney = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  const diffLabel =
    diff > 0
      ? `+${formatMoney(diff)} vs mês passado`
      : diff < 0
      ? `-${formatMoney(Math.abs(diff))} vs mês passado`
      : 'Mesmo resultado do mês passado';

  const summaryText =
    balance < 0
      ? 'Seu mês fechou no negativo. Vale revisar o que puxou essa queda.'
      : savingsRate < 10
      ? 'Você fechou positivo, mas com pouca folga no fim do mês.'
      : savingsRate < 25
      ? 'Seu mês terminou com uma sobra saudável e controlada.'
      : 'Excelente fechamento. Você preservou uma boa parte da sua renda.';

  const wrapperClass = darkMode
    ? 'border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] text-white'
    : 'border border-white/70 bg-[linear-gradient(135deg,#ffffff,#f0f9ff)] text-black';

  const glassCard = darkMode
    ? 'border border-white/10 bg-white/[0.05] backdrop-blur-xl'
    : 'border border-sky-100 bg-white/85 backdrop-blur-xl';

  const chipClass = darkMode
    ? 'border border-white/10 bg-white/8 text-zinc-200'
    : 'border border-sky-100 bg-white text-sky-700';

  const heroGlowMain = darkMode ? 'bg-sky-400/15' : 'bg-sky-200/80';
  const heroGlowSecondary = darkMode ? 'bg-sky-300/10' : 'bg-sky-100/80';

  const positiveText = darkMode ? 'text-sky-300' : 'text-sky-600';
  const negativeText = darkMode ? 'text-red-400' : 'text-red-600';

  const diffChipClass =
    diff > 0
      ? darkMode
        ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
        : 'border border-sky-200 bg-sky-50 text-sky-700'
      : diff < 0
      ? darkMode
        ? 'border border-red-500/20 bg-red-500/10 text-red-300'
        : 'border border-red-200 bg-red-50 text-red-700'
      : darkMode
      ? 'border border-white/10 bg-white/10 text-zinc-300'
      : 'border border-gray-200 bg-gray-50 text-gray-700';

  const incomeBarWidth =
    income > 0 ? Math.min((income / Math.max(income, expense, 1)) * 100, 100) : 0;

  const expenseBarWidth =
    expense > 0 ? Math.min((expense / Math.max(income, expense, 1)) * 100, 100) : 0;

  const safeSavingsRate = Math.max(0, Math.min(savingsRate, 100));
  const safeCreditExpensePercentage = Math.max(
    0,
    Math.min(creditExpensePercentage, 100)
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`relative overflow-hidden rounded-[36px] p-6 shadow-xl md:p-8 xl:p-10 ${wrapperClass}`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full blur-3xl ${heroGlowMain}`}
      />
      <div
        className={`pointer-events-none absolute bottom-0 left-8 h-36 w-36 rounded-full blur-3xl ${heroGlowSecondary}`}
      />

      <div className="relative">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.9fr] xl:gap-8">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.20em] ${chipClass}`}
              >
                <Wallet size={13} />
                Fechamento do mês
              </span>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${diffChipClass}`}
              >
                {diff > 0 ? (
                  <TrendingUp size={14} />
                ) : diff < 0 ? (
                  <TrendingDown size={14} />
                ) : (
                  <PiggyBank size={14} />
                )}
                {diffLabel}
              </span>
            </div>

            <div className="mt-6">
              <p className={`text-sm ${mutedText}`}>Quanto sobrou no mês</p>

              <h2
                className={`mt-3 text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl ${
                  isPositive ? positiveText : negativeText
                }`}
              >
                {formatMoney(balance)}
              </h2>

              <p className={`mt-4 max-w-2xl text-sm leading-7 md:text-base ${mutedText}`}>
                {summaryText}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className={`rounded-[28px] p-5 shadow-sm ${glassCard}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-xs ${mutedText}`}>Entradas</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight">
                      {formatMoney(income)}
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl p-3 ${
                      darkMode ? 'bg-sky-500/10' : 'bg-sky-50'
                    }`}
                  >
                    <ArrowUpRight
                      size={18}
                      className={darkMode ? 'text-sky-300' : 'text-sky-600'}
                    />
                  </div>
                </div>

                <div
                  className={`mt-5 h-2 overflow-hidden rounded-full ${
                    darkMode ? 'bg-white/10' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`h-full rounded-full ${
                      darkMode ? 'bg-sky-400' : 'bg-sky-500'
                    }`}
                    style={{ width: `${incomeBarWidth}%` }}
                  />
                </div>
              </div>

              <div className={`rounded-[28px] p-5 shadow-sm ${glassCard}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-xs ${mutedText}`}>Gastos</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight">
                      {formatMoney(expense)}
                    </p>
                  </div>

                  <div
                    className={`rounded-2xl p-3 ${
                      darkMode ? 'bg-red-500/10' : 'bg-red-50'
                    }`}
                  >
                    <ArrowDownRight
                      size={18}
                      className={darkMode ? 'text-red-300' : 'text-red-600'}
                    />
                  </div>
                </div>

                <div
                  className={`mt-5 h-2 overflow-hidden rounded-full ${
                    darkMode ? 'bg-white/10' : 'bg-gray-200'
                  }`}
                >
                  <div
                    className={`h-full rounded-full ${
                      darkMode ? 'bg-red-400' : 'bg-red-500'
                    }`}
                    style={{ width: `${expenseBarWidth}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className={`rounded-[28px] p-5 shadow-sm ${glassCard}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-xs ${mutedText}`}>Taxa de sobra</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    {savingsRate.toFixed(0)}%
                  </p>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    darkMode ? 'bg-white/10' : 'bg-sky-50'
                  }`}
                >
                  <PiggyBank
                    size={18}
                    className={darkMode ? 'text-zinc-200' : 'text-sky-700'}
                  />
                </div>
              </div>

              <div
                className={`mt-5 h-2 overflow-hidden rounded-full ${
                  darkMode ? 'bg-white/10' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`h-full rounded-full ${
                    darkMode ? 'bg-sky-400' : 'bg-sky-500'
                  }`}
                  style={{ width: `${safeSavingsRate}%` }}
                />
              </div>
            </div>

            <div className={`rounded-[28px] p-5 shadow-sm ${glassCard}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-xs ${mutedText}`}>Peso do cartão</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    {creditExpensePercentage.toFixed(0)}%
                  </p>
                </div>

                <div
                  className={`rounded-2xl p-3 ${
                    darkMode ? 'bg-white/10' : 'bg-sky-50'
                  }`}
                >
                  <CreditCard
                    size={18}
                    className={darkMode ? 'text-zinc-200' : 'text-sky-700'}
                  />
                </div>
              </div>

              <div
                className={`mt-5 h-2 overflow-hidden rounded-full ${
                  darkMode ? 'bg-white/10' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`h-full rounded-full ${
                    darkMode ? 'bg-sky-400' : 'bg-sky-500'
                  }`}
                  style={{ width: `${safeCreditExpensePercentage}%` }}
                />
              </div>
            </div>

            <div className={`rounded-[28px] p-5 shadow-sm ${glassCard}`}>
              <p className={`text-xs ${mutedText}`}>Leitura rápida</p>

              <div className="mt-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <span className={`text-sm ${mutedText}`}>Status do mês</span>
                  <strong className="text-right text-sm">
                    {isPositive ? 'No azul' : 'No vermelho'}
                  </strong>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className={`text-sm ${mutedText}`}>Resultado vs anterior</span>
                  <strong className="text-right text-sm">
                    {diff > 0
                      ? 'Melhorou'
                      : diff < 0
                      ? 'Piorou'
                      : 'Sem mudança'}
                  </strong>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span className={`text-sm ${mutedText}`}>Dependência do crédito</span>
                  <strong className="text-right text-sm">
                    {creditExpensePercentage >= 70
                      ? 'Alta'
                      : creditExpensePercentage >= 40
                      ? 'Média'
                      : 'Baixa'}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}