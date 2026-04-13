'use client';

import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface OverviewChartProps {
  income: number;
  expense: number;
  mutedText: string;
  softCard: string;
  darkMode: boolean;
}

export default function OverviewChart({
  income,
  expense,
  mutedText,
  softCard,
  darkMode,
}: OverviewChartProps) {
  const balance = income - expense;
  const isPositive = balance >= 0;

  const data = [
    { name: 'Receitas', value: income },
    { name: 'Gastos', value: expense },
  ];

  const colors = darkMode ? ['#4ade80', '#f87171'] : ['#16a34a', '#dc2626'];

  const totalFlow = income + expense;
  const incomePercentage = totalFlow > 0 ? (income / totalFlow) * 100 : 0;
  const expensePercentage = totalFlow > 0 ? (expense / totalFlow) * 100 : 0;

  const formatMoney = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.35 }}
      className={`rounded-[32px] p-6 shadow-lg ${softCard}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p
            className={`text-[11px] font-medium uppercase tracking-[0.24em] ${mutedText}`}
          >
            Visão geral
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">
            Entradas x gastos
          </h3>
        </div>

        <div
          className={`rounded-2xl px-3 py-2 text-sm font-medium ${
            isPositive
              ? darkMode
                ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
              : darkMode
              ? 'border border-red-500/20 bg-red-500/10 text-red-300'
              : 'border border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {isPositive ? 'Saldo positivo' : 'Saldo negativo'}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div
          className={`rounded-[28px] p-5 ${
            darkMode
              ? 'border border-white/10 bg-white/[0.05]'
              : 'border border-gray-200 bg-white/95'
          }`}
        >
          <div className="mb-3 flex items-center gap-2">
            <CircleDollarSign
              size={16}
              className={darkMode ? 'text-zinc-300' : 'text-gray-600'}
            />
            <p className={`text-xs ${mutedText}`}>Leitura do período</p>
          </div>

          <p className="text-base font-semibold leading-7">
            {isPositive
              ? `As entradas ficaram acima dos gastos, com ${formatMoney(
                  balance
                )} de folga no período.`
              : `Os gastos superaram as entradas, com ${formatMoney(
                  Math.abs(balance)
                )} de diferença no período.`}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div
              className={`rounded-[22px] p-4 ${
                darkMode ? 'bg-white/[0.05]' : 'bg-gray-50'
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <ArrowUpRight
                  size={15}
                  className={darkMode ? 'text-emerald-300' : 'text-emerald-600'}
                />
                <span className={`text-xs ${mutedText}`}>Receitas</span>
              </div>

              <p className="text-lg font-bold tracking-tight">
                {formatMoney(income)}
              </p>
              <p className={`mt-1 text-xs ${mutedText}`}>
                {incomePercentage.toFixed(0)}% do fluxo
              </p>
            </div>

            <div
              className={`rounded-[22px] p-4 ${
                darkMode ? 'bg-white/[0.05]' : 'bg-gray-50'
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <ArrowDownRight
                  size={15}
                  className={darkMode ? 'text-red-300' : 'text-red-600'}
                />
                <span className={`text-xs ${mutedText}`}>Gastos</span>
              </div>

              <p className="text-lg font-bold tracking-tight">
                {formatMoney(expense)}
              </p>
              <p className={`mt-1 text-xs ${mutedText}`}>
                {expensePercentage.toFixed(0)}% do fluxo
              </p>
            </div>
          </div>
        </div>

        <div
          className={`rounded-[28px] p-5 ${
            darkMode
              ? 'border border-white/10 bg-white/[0.05]'
              : 'border border-gray-200 bg-white/95'
          }`}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className={`text-xs ${mutedText}`}>Distribuição visual</p>

            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] ${
                darkMode
                  ? 'border border-white/10 bg-white/10 text-zinc-300'
                  : 'border border-gray-200 bg-white text-gray-600'
              }`}
            >
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {isPositive ? 'Entrou mais' : 'Saiu mais'}
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  outerRadius={88}
                  innerRadius={60}
                  paddingAngle={4}
                  stroke="none"
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={colors[i]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#18181b' : '#ffffff',
                    border: darkMode
                      ? '1px solid rgba(255,255,255,0.1)'
                      : '1px solid #e5e7eb',
                    borderRadius: '14px',
                    color: darkMode ? '#ffffff' : '#111827',
                  }}
                  formatter={(value) => {
                    const numericValue =
                      typeof value === 'number' ? value : Number(value || 0);
                    return [formatMoney(numericValue), 'Total'];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3">
            <div
              className={`rounded-[20px] p-3 ${
                darkMode ? 'bg-white/[0.05]' : 'bg-gray-50'
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className={`text-xs ${mutedText}`}>Receitas</span>
              </div>
              <strong className="text-sm">{formatMoney(income)}</strong>
            </div>

            <div
              className={`rounded-[20px] p-3 ${
                darkMode ? 'bg-white/[0.05]' : 'bg-gray-50'
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className={`text-xs ${mutedText}`}>Gastos</span>
              </div>
              <strong className="text-sm">{formatMoney(expense)}</strong>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}