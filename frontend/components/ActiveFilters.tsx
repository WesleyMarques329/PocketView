'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ActiveFiltersProps {
  selectedMonth: string;
  search: string;
  selectedType: 'all' | 'income' | 'expense';
  selectedCategory: string;
  selectedPeriod: 'all' | 'today' | '7d' | '30d';
  minAmount: string;
  maxAmount: string;
  selectedTags: string[];
  selectedPaymentMethod?: 'all' | 'cash' | 'credit';
  selectedCardName?: string;
  hasActiveFilters: boolean;
  darkMode: boolean;
  mutedText: string;
  onClearAll: () => void;
  onRemoveFilter: (
    filter:
      | 'month'
      | 'search'
      | 'type'
      | 'category'
      | 'period'
      | 'minAmount'
      | 'maxAmount'
      | 'tag'
      | 'paymentMethod'
      | 'cardName',
    value?: string
  ) => void;
}

function formatPeriodLabel(period: 'all' | 'today' | '7d' | '30d') {
  switch (period) {
    case 'today':
      return 'Hoje';
    case '7d':
      return '7 dias';
    case '30d':
      return '30 dias';
    default:
      return 'Tudo';
  }
}

function formatTypeLabel(type: 'all' | 'income' | 'expense') {
  switch (type) {
    case 'income':
      return 'Receitas';
    case 'expense':
      return 'Gastos';
    default:
      return 'Todos';
  }
}

function formatPaymentMethodLabel(method: 'all' | 'cash' | 'credit') {
  switch (method) {
    case 'cash':
      return 'Dinheiro / PIX / débito';
    case 'credit':
      return 'Cartão';
    default:
      return 'Todos';
  }
}

export default function ActiveFilters({
  selectedMonth,
  search,
  selectedType,
  selectedCategory,
  selectedPeriod,
  minAmount,
  maxAmount,
  selectedTags,
  selectedPaymentMethod = 'all',
  selectedCardName = 'all',
  hasActiveFilters,
  darkMode,
  mutedText,
  onClearAll,
  onRemoveFilter,
}: ActiveFiltersProps) {
  const chipClass = darkMode
    ? 'border border-white/10 bg-white/10 text-white hover:bg-white/15'
    : 'border border-sky-100 bg-white text-sky-700 hover:bg-sky-50';

  const closeButtonClass = darkMode
    ? 'bg-white/10 text-zinc-300 hover:bg-white/15'
    : 'bg-sky-50 text-sky-600 hover:bg-sky-100';

  return (
    <AnimatePresence>
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          className={`rounded-[28px] p-4 shadow-lg ${
            darkMode
              ? 'border border-white/10 bg-white/[0.04] backdrop-blur-xl'
              : 'border border-white/70 bg-white/90 backdrop-blur-xl'
          }`}
        >
          <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-tight">Filtros ativos</p>
              <p className={`text-xs ${mutedText}`}>
                Remova individualmente ou limpe tudo
              </p>
            </div>

            <button
              onClick={onClearAll}
              className={`rounded-2xl px-3 py-2 text-xs font-medium transition ${chipClass}`}
            >
              Limpar tudo
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedMonth && (
              <motion.div
                layout
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${chipClass}`}
              >
                <span>Mês: {selectedMonth}</span>
                <button
                  onClick={() => onRemoveFilter('month')}
                  className={`rounded-full p-1 transition ${closeButtonClass}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}

            {search.trim() && (
              <motion.div
                layout
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${chipClass}`}
              >
                <span>Busca: {search}</span>
                <button
                  onClick={() => onRemoveFilter('search')}
                  className={`rounded-full p-1 transition ${closeButtonClass}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}

            {selectedType !== 'all' && (
              <motion.div
                layout
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${chipClass}`}
              >
                <span>{formatTypeLabel(selectedType)}</span>
                <button
                  onClick={() => onRemoveFilter('type')}
                  className={`rounded-full p-1 transition ${closeButtonClass}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}

            {selectedCategory !== 'all' && (
              <motion.div
                layout
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${chipClass}`}
              >
                <span>{selectedCategory}</span>
                <button
                  onClick={() => onRemoveFilter('category')}
                  className={`rounded-full p-1 transition ${closeButtonClass}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}

            {selectedPeriod !== 'all' && (
              <motion.div
                layout
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${chipClass}`}
              >
                <span>{formatPeriodLabel(selectedPeriod)}</span>
                <button
                  onClick={() => onRemoveFilter('period')}
                  className={`rounded-full p-1 transition ${closeButtonClass}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}

            {selectedPaymentMethod !== 'all' && (
              <motion.div
                layout
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${chipClass}`}
              >
                <span>{formatPaymentMethodLabel(selectedPaymentMethod)}</span>
                <button
                  onClick={() => onRemoveFilter('paymentMethod')}
                  className={`rounded-full p-1 transition ${closeButtonClass}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}

            {selectedCardName !== 'all' && (
              <motion.div
                layout
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${chipClass}`}
              >
                <span>Cartão: {selectedCardName}</span>
                <button
                  onClick={() => onRemoveFilter('cardName')}
                  className={`rounded-full p-1 transition ${closeButtonClass}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}

            {minAmount && (
              <motion.div
                layout
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${chipClass}`}
              >
                <span>Min: R$ {minAmount}</span>
                <button
                  onClick={() => onRemoveFilter('minAmount')}
                  className={`rounded-full p-1 transition ${closeButtonClass}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}

            {maxAmount && (
              <motion.div
                layout
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${chipClass}`}
              >
                <span>Máx: R$ {maxAmount}</span>
                <button
                  onClick={() => onRemoveFilter('maxAmount')}
                  className={`rounded-full p-1 transition ${closeButtonClass}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            )}

            {selectedTags.map((tag) => (
              <motion.div
                key={tag}
                layout
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition ${chipClass}`}
              >
                <span>#{tag}</span>
                <button
                  onClick={() => onRemoveFilter('tag', tag)}
                  className={`rounded-full p-1 transition ${closeButtonClass}`}
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}