'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Copy,
  CreditCard,
  Pencil,
  SearchX,
  Sparkles,
  Star,
  Trash2,
  Wallet,
} from 'lucide-react';

import { Transaction } from '@/types/transaction';
import SkeletonCard from '@/components/SkeletonCard';
import CategoryIcon from '@/components/CategoryIcon';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  deletingId: number | null;
  favoriteLoadingId?: number | null;
  mutedText: string;
  softCard: string;
  darkMode: boolean;
  getCategoryAccent: (name: string) => string;
  startEdit: (t: Transaction) => void;
  askDelete: (id: number) => void;
  duplicateTransaction: (t: Transaction) => void;
  handleToggleFavorite?: (id: number) => void;
}

export default function TransactionList({
  transactions,
  isLoading,
  deletingId,
  favoriteLoadingId,
  mutedText,
  softCard,
  darkMode,
  getCategoryAccent,
  startEdit,
  askDelete,
  duplicateTransaction,
  handleToggleFavorite,
}: TransactionListProps) {
  const subtleCard = darkMode
    ? 'border border-white/10 bg-white/[0.05]'
    : 'border border-sky-100 bg-white/95';

  const actionButton = darkMode
    ? 'bg-white/10 hover:bg-white/15'
    : 'bg-gray-100 hover:bg-sky-50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className={`rounded-[32px] p-5 shadow-lg md:p-6 ${softCard}`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p
            className={`text-[11px] font-medium uppercase tracking-[0.24em] ${mutedText}`}
          >
            Histórico
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">
            Transações
          </h3>
          <p className={`mt-2 text-sm ${mutedText}`}>
            {isLoading ? 'Carregando...' : `${transactions.length} item(ns)`}
          </p>
        </div>

        <motion.div
          whileHover={{ rotate: 6, scale: 1.04 }}
          className={`rounded-2xl p-3 ${
            darkMode ? 'bg-white/10' : 'bg-sky-50'
          }`}
        >
          <Wallet
            size={18}
            className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
          />
        </motion.div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <SkeletonCard darkMode={darkMode} />
          <SkeletonCard darkMode={darkMode} />
          <SkeletonCard darkMode={darkMode} />
        </div>
      ) : transactions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-[28px] border border-dashed p-8 text-center ${
            darkMode
              ? 'border-white/10 bg-white/5 text-zinc-400'
              : 'border-sky-200 bg-sky-50/60 text-gray-500'
          }`}
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${
              darkMode ? 'bg-white/10' : 'bg-white'
            }`}
          >
            <SearchX size={22} />
          </motion.div>

          <h4 className="text-sm font-semibold">Nenhuma transação encontrada</h4>
          <p className={`mx-auto mt-2 max-w-xs text-xs ${mutedText}`}>
            Tente mudar os filtros ou criar uma nova transação.
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {transactions.map((t, index) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 22, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  x: -40,
                  scale: 0.96,
                  height: 0,
                  marginBottom: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
                transition={{
                  layout: { duration: 0.25, type: 'spring', bounce: 0.15 },
                  default: {
                    delay: index * 0.025,
                    type: 'spring',
                    stiffness: 180,
                    damping: 18,
                  },
                }}
                whileHover={{ y: -3 }}
                className={`group relative overflow-hidden rounded-[28px] p-4 transition md:p-5 ${subtleCard}`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 ${
                    darkMode
                      ? 'bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.10),transparent_40%)]'
                      : 'bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.12),transparent_40%)]'
                  }`}
                />

                <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-base font-semibold tracking-tight">
                        {t.title}
                      </p>

                      {t.favorite && (
                        <motion.span
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                            darkMode
                              ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
                              : 'border border-sky-200 bg-sky-50 text-sky-700'
                          }`}
                        >
                          <Sparkles size={10} />
                          Favorita
                        </motion.span>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${getCategoryAccent(
                          t.category
                        )}`}
                      >
                        <CategoryIcon category={t.category} darkMode={darkMode} />
                        {t.category}
                      </span>

                      <span className={`text-xs ${mutedText}`}>
                        {t.type === 'income' ? 'Receita' : 'Gasto'}
                      </span>

                      <span className={`text-xs ${mutedText}`}>
                        {new Date(`${t.date}T00:00:00`).toLocaleDateString('pt-BR')}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          t.paymentMethod === 'credit'
                            ? darkMode
                              ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
                              : 'border border-sky-200 bg-sky-50 text-sky-700'
                            : darkMode
                            ? 'border border-white/10 bg-white/10 text-zinc-200'
                            : 'border border-gray-200 bg-gray-100 text-gray-700'
                        }`}
                      >
                        {t.paymentMethod === 'credit' ? (
                          <>
                            <CreditCard size={11} />
                            Cartão
                          </>
                        ) : (
                          <>
                            <Wallet size={11} />
                            Pix / débito / dinheiro
                          </>
                        )}
                      </span>

                      {t.paymentMethod === 'credit' && t.cardName?.trim() && (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            darkMode
                              ? 'border border-white/10 bg-white/10 text-zinc-200'
                              : 'border border-sky-100 bg-white text-sky-700'
                          }`}
                        >
                          {t.cardName}
                        </span>
                      )}
                    </div>

                    {t.tags?.length ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {t.tags.map((tag) => (
                          <span
                            key={`${t.id}-${tag}`}
                            className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                              darkMode
                                ? 'border border-white/10 bg-white/10 text-zinc-200'
                                : 'border border-sky-100 bg-sky-50 text-sky-700'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {t.notes?.trim() && (
                      <div
                        className={`mt-4 rounded-[20px] px-3 py-2.5 text-xs leading-6 ${
                          darkMode
                            ? 'border border-white/10 bg-white/[0.04] text-zinc-300'
                            : 'border border-sky-100 bg-sky-50/50 text-gray-600'
                        }`}
                      >
                        {t.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                    <motion.p
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 1 }}
                      className={`text-lg font-bold tracking-tight ${
                        t.type === 'income'
                          ? darkMode
                            ? 'text-sky-300'
                            : 'text-sky-600'
                          : darkMode
                          ? 'text-red-400'
                          : 'text-red-600'
                      }`}
                    >
                      R$ {t.amount.toFixed(2)}
                    </motion.p>

                    <div className="flex flex-wrap gap-2">
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => handleToggleFavorite?.(t.id)}
                        disabled={deletingId === t.id || favoriteLoadingId === t.id}
                        className={`rounded-full p-2 transition ${actionButton} ${
                          deletingId === t.id || favoriteLoadingId === t.id
                            ? 'opacity-50'
                            : ''
                        }`}
                        title="Favoritar"
                      >
                        <Star
                          size={14}
                          className={t.favorite ? 'fill-current text-sky-400' : ''}
                        />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => duplicateTransaction(t)}
                        disabled={deletingId === t.id}
                        className={`rounded-full p-2 transition ${actionButton} ${
                          deletingId === t.id ? 'opacity-50' : ''
                        }`}
                        title="Duplicar"
                      >
                        <Copy size={14} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => startEdit(t)}
                        disabled={deletingId === t.id}
                        className={`rounded-full p-2 transition ${actionButton} ${
                          deletingId === t.id ? 'opacity-50' : ''
                        }`}
                        title="Editar"
                      >
                        <Pencil size={14} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => askDelete(t.id)}
                        disabled={deletingId === t.id}
                        className={`rounded-full p-2 transition ${actionButton} ${
                          deletingId === t.id ? 'opacity-50' : ''
                        }`}
                        title="Deletar"
                      >
                        {deletingId === t.id ? '...' : <Trash2 size={14} />}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}