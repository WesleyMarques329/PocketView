'use client';

import { motion } from 'framer-motion';

import Header from '@/components/Header';
import SidebarDesktop from '@/components/SidebarDesktop';
import BalanceCard from '@/components/BalanceCard';
import OverviewChart from '@/components/OverviewChart';
import CategorySummary from '@/components/CategorySummary';
import MonthlySummaryCard from '@/components/MonthlySummaryCard';

import { useDarkMode } from '@/hooks/useDarkMode';
import { useTransactions } from '@/hooks/useTransactions';
import { useFinanceSummary } from '@/hooks/useFinanceSummary';

export default function Home() {
  const { darkMode, setDarkMode } = useDarkMode();
  const { transactions } = useTransactions();

  const {
    income,
    expense,
    balance,
    previousBalance,
    categorySummary,
    maxCategoryValue,
    topExpenseCategory,
    topCard,
    totalCreditExpense,
    creditExpensePercentage,
    projectedCreditExpense,
  } = useFinanceSummary(transactions, '', '', 'date-desc', {});

  const pageBg = darkMode
    ? 'bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_60%)] text-white'
    : 'bg-[radial-gradient(circle_at_top,_#ffffff,_#e0f2fe_40%,_#e5e7eb_80%)] text-black';

  const shellBg = darkMode
    ? 'border border-white/10 bg-white/[0.04] backdrop-blur-2xl'
    : 'border border-white/70 bg-white/75 backdrop-blur-2xl';

  const mutedText = darkMode ? 'text-zinc-400' : 'text-gray-500';

  const softCard = darkMode
    ? 'border border-white/10 bg-white/[0.04] backdrop-blur-xl'
    : 'border border-white/70 bg-white/90 backdrop-blur-xl';

  const getCategoryAccent = (name: string) => {
    const map: Record<string, string> = {
      Alimentação: darkMode
        ? 'bg-sky-500/15 text-sky-300'
        : 'bg-sky-100 text-sky-700',
      Transporte: darkMode
        ? 'bg-sky-500/15 text-sky-300'
        : 'bg-sky-100 text-sky-700',
      Moradia: darkMode
        ? 'bg-sky-500/15 text-sky-300'
        : 'bg-sky-100 text-sky-700',
      Lazer: darkMode
        ? 'bg-sky-500/15 text-sky-300'
        : 'bg-sky-100 text-sky-700',
      Salário: darkMode
        ? 'bg-sky-500/15 text-sky-300'
        : 'bg-sky-100 text-sky-700',
      Outros: darkMode
        ? 'bg-zinc-500/15 text-zinc-300'
        : 'bg-gray-100 text-gray-700',
    };

    return map[name] || map['Outros'];
  };

  return (
    <main className={`min-h-screen ${pageBg} px-4 py-6 md:px-6 xl:px-8`}>
      <div className="mx-auto flex w-full max-w-[1680px] gap-6">
        <SidebarDesktop darkMode={darkMode} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className={`relative flex-1 overflow-hidden rounded-[36px] ${shellBg}`}
        >
          <div
            className={`pointer-events-none absolute -right-16 top-10 h-52 w-52 rounded-full blur-3xl ${
              darkMode ? 'bg-sky-400/10' : 'bg-sky-200/70'
            }`}
          />

          <div className="relative p-4 md:p-6 xl:p-8">
            <Header
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              mutedText={mutedText}
            />

            <section className="mt-6 space-y-6">
              <MonthlySummaryCard
                income={income}
                expense={expense}
                balance={balance}
                previousBalance={previousBalance}
                creditExpensePercentage={creditExpensePercentage}
                darkMode={darkMode}
                mutedText={mutedText}
              />

              <div className={`rounded-[32px] p-6 shadow-lg ${softCard}`}>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <p
                      className={`text-[11px] font-medium uppercase tracking-[0.24em] ${mutedText}`}
                    >
                      Resumo em 10 segundos
                    </p>

                    <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">
                      Seu mês em uma leitura rápida
                    </h3>

                    <p className={`mt-3 text-sm leading-7 ${mutedText}`}>
                      {balance >= 0
                        ? `Você terminou o período com ${balance.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })} de sobra.`
                        : `Você fechou o período com ${balance.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}.`}
                    </p>
                  </div>

                  <div
                    className={`inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-medium ${
                      balance >= 0
                        ? darkMode
                          ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
                          : 'border border-sky-200 bg-sky-50 text-sky-700'
                        : darkMode
                        ? 'border border-red-500/20 bg-red-500/10 text-red-300'
                        : 'border border-red-200 bg-red-50 text-red-700'
                    }`}
                  >
                    {balance >= 0 ? 'Mês no azul' : 'Mês no vermelho'}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                  <div
                    className={`rounded-[24px] p-5 ${
                      darkMode
                        ? 'border border-white/10 bg-white/[0.05]'
                        : 'border border-sky-100 bg-white/95'
                    }`}
                  >
                    <p className={`text-xs ${mutedText}`}>Leitura principal</p>
                    <p className="mt-3 text-base font-semibold leading-7">
                      {topExpenseCategory === 'Nenhuma'
                        ? 'Ainda não existe uma categoria dominante nos seus gastos.'
                        : `${topExpenseCategory} é a categoria que mais pesa no seu mês.`}
                    </p>

                    <p className={`mt-4 text-sm leading-7 ${mutedText}`}>
                      {topCard === 'Nenhum'
                        ? 'Até agora, o crédito não concentra destaque relevante.'
                        : `${topCard} é o cartão com maior peso entre seus lançamentos.`}
                    </p>
                  </div>

                  <div
                    className={`rounded-[24px] p-5 ${
                      darkMode
                        ? 'border border-white/10 bg-white/[0.05]'
                        : 'border border-sky-100 bg-white/95'
                    }`}
                  >
                    <p className={`text-xs ${mutedText}`}>Pontos rápidos</p>

                    <div className="mt-3 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <span className={`text-sm ${mutedText}`}>Resultado</span>
                        <strong className="text-right text-sm">
                          {balance.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </strong>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <span className={`text-sm ${mutedText}`}>Crédito</span>
                        <strong className="text-right text-sm">
                          {creditExpensePercentage.toFixed(0)}% dos gastos
                        </strong>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <span className={`text-sm ${mutedText}`}>Cartão principal</span>
                        <strong className="text-right text-sm">
                          {topCard === 'Nenhum' ? 'Sem destaque' : topCard}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1.45fr)_340px]">
                <div className="min-w-0">
                  <BalanceCard
                    balance={balance}
                    income={income}
                    expense={expense}
                    darkMode={darkMode}
                  />
                </div>

                <div
                  className={`self-start h-fit rounded-[28px] p-4 shadow-lg ${softCard}`}
                >
                  <div className="mb-4">
                    <p
                      className={`text-[11px] font-medium uppercase tracking-[0.24em] ${mutedText}`}
                    >
                      Cartão
                    </p>
                    <h3 className="mt-1.5 text-base font-semibold tracking-tight">
                      Resumo do crédito
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div
                      className={`rounded-2xl p-3 ${
                        darkMode
                          ? 'border border-white/10 bg-white/[0.05]'
                          : 'border border-sky-100 bg-white/95'
                      }`}
                    >
                      <p className={`text-[11px] ${mutedText}`}>Total no cartão</p>
                      <p className="mt-1 text-lg font-bold tracking-tight">
                        R$ {totalCreditExpense.toFixed(2)}
                      </p>
                    </div>

                    <div
                      className={`rounded-2xl p-3 ${
                        darkMode
                          ? 'border border-white/10 bg-white/[0.05]'
                          : 'border border-sky-100 bg-white/95'
                      }`}
                    >
                      <p className={`text-[11px] ${mutedText}`}>Projeção da fatura</p>
                      <p className="mt-1 text-lg font-bold tracking-tight">
                        R$ {projectedCreditExpense.toFixed(2)}
                      </p>
                    </div>

                    <div
                      className={`rounded-2xl p-3 ${
                        darkMode
                          ? 'border border-white/10 bg-white/[0.05]'
                          : 'border border-sky-100 bg-white/95'
                      }`}
                    >
                      <p className={`text-[11px] ${mutedText}`}>Cartão principal</p>
                      <p className="mt-1 truncate text-lg font-bold tracking-tight">
                        {topCard === 'Nenhum' ? 'Sem cartão' : topCard}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[0.95fr_1.05fr]">
                <OverviewChart
                  income={income}
                  expense={expense}
                  mutedText={mutedText}
                  softCard={softCard}
                  darkMode={darkMode}
                />

                <CategorySummary
                  categorySummary={categorySummary}
                  maxCategoryValue={maxCategoryValue}
                  mutedText={mutedText}
                  softCard={softCard}
                  darkMode={darkMode}
                  getCategoryAccent={getCategoryAccent}
                />
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}