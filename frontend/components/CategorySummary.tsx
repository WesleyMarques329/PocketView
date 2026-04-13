'use client';

import { motion } from 'framer-motion';
import { Crown, LayoutGrid } from 'lucide-react';
import CategoryIcon from '@/components/CategoryIcon';

interface CategoryItem {
  name: string;
  value: number;
}

interface CategorySummaryProps {
  categorySummary: CategoryItem[];
  maxCategoryValue: number;
  mutedText: string;
  softCard: string;
  darkMode: boolean;
  getCategoryAccent: (name: string) => string;
}

export default function CategorySummary({
  categorySummary,
  maxCategoryValue,
  mutedText,
  softCard,
  darkMode,
  getCategoryAccent,
}: CategorySummaryProps) {
  const total = categorySummary.reduce((acc, item) => acc + item.value, 0);
  const topCategory = categorySummary[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.35 }}
      className={`rounded-[32px] p-6 shadow-lg ${softCard}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p
            className={`text-[11px] font-medium uppercase tracking-[0.24em] ${mutedText}`}
          >
            Para onde foi o dinheiro
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">
            Gastos por categoria
          </h3>
        </div>

        <div
          className={`rounded-2xl p-3 ${
            darkMode ? 'bg-white/10' : 'bg-sky-50'
          }`}
        >
          <LayoutGrid
            size={18}
            className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
          />
        </div>
      </div>

      {categorySummary.length === 0 ? (
        <div
          className={`rounded-[24px] border border-dashed p-8 text-center ${
            darkMode
              ? 'border-white/10 text-zinc-400'
              : 'border-gray-300 text-gray-500'
          }`}
        >
          Nenhum dado de categoria ainda.
        </div>
      ) : (
        <div className="space-y-5">
          {topCategory && (
            <div
              className={`rounded-[28px] p-5 ${
                darkMode
                  ? 'border border-white/10 bg-white/[0.05]'
                  : 'border border-sky-100 bg-white/95'
              }`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] ${
                        darkMode
                          ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
                          : 'border border-sky-200 bg-sky-50 text-sky-700'
                      }`}
                    >
                      <Crown size={12} />
                      Categoria campeã
                    </span>

                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${getCategoryAccent(
                        topCategory.name
                      )}`}
                    >
                      <CategoryIcon
                        category={topCategory.name}
                        darkMode={darkMode}
                      />
                      {topCategory.name}
                    </span>
                  </div>

                  <p className={`text-sm leading-7 ${mutedText}`}>
                    {topCategory.name} representa a maior fatia dos seus gastos no
                    período.
                  </p>
                </div>

                <div className="shrink-0">
                  <p className={`text-xs text-right ${mutedText}`}>Valor</p>
                  <p className="mt-1 text-2xl font-bold tracking-tight text-right">
                    R$ {topCategory.value.toFixed(2)}
                  </p>
                  <p className={`mt-1 text-sm text-right ${mutedText}`}>
                    {total > 0 ? ((topCategory.value / total) * 100).toFixed(0) : 0}% do
                    total
                  </p>
                </div>
              </div>
            </div>
          )}

          <div
            className={`rounded-[28px] p-5 ${
              darkMode
                ? 'border border-white/10 bg-white/[0.05]'
                : 'border border-sky-100 bg-white/95'
            }`}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold tracking-tight">Ranking</p>
              <span className={`text-xs ${mutedText}`}>
                {categorySummary.length} categorias
              </span>
            </div>

            <div className="space-y-4">
              {categorySummary.map((item, index) => {
                const percentOfTotal = total > 0 ? (item.value / total) * 100 : 0;
                const percentOfMax =
                  maxCategoryValue > 0 ? (item.value / maxCategoryValue) * 100 : 0;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className={`rounded-[22px] p-4 transition ${
                      darkMode
                        ? 'border border-white/10 bg-white/[0.04]'
                        : 'border border-sky-100 bg-white'
                    }`}
                  >
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                            darkMode
                              ? 'bg-white/10 text-zinc-200'
                              : 'bg-sky-50 text-sky-700'
                          }`}
                        >
                          {index + 1}
                        </div>

                        <div className="flex min-w-0 items-center gap-2">
                          <CategoryIcon
                            category={item.name}
                            darkMode={darkMode}
                          />
                          <span className="truncate text-sm font-medium">
                            {item.name}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold tracking-tight">
                          R$ {item.value.toFixed(2)}
                        </p>
                        <p className={`text-xs ${mutedText}`}>
                          {percentOfTotal.toFixed(0)}%
                        </p>
                      </div>
                    </div>

                    <div
                      className={`h-2.5 overflow-hidden rounded-full ${
                        darkMode ? 'bg-white/10' : 'bg-gray-200'
                      }`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentOfMax}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${
                          index === 0
                            ? 'bg-gradient-to-r from-sky-300 to-sky-500'
                            : darkMode
                            ? 'bg-gradient-to-r from-white to-zinc-400'
                            : 'bg-gradient-to-r from-sky-200 to-sky-400'
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}