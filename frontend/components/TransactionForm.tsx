'use client';

import { motion } from 'framer-motion';
import {
  CalendarDays,
  CreditCard,
  FileText,
  Hash,
  Landmark,
  PencilLine,
  Tag,
  Wallet,
} from 'lucide-react';

interface TransactionFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  type: 'income' | 'expense';
  setType: React.Dispatch<React.SetStateAction<'income' | 'expense'>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  tagsInput: string;
  setTagsInput: React.Dispatch<React.SetStateAction<string>>;
  paymentMethod: 'cash' | 'credit';
  setPaymentMethod: React.Dispatch<React.SetStateAction<'cash' | 'credit'>>;
  cardName: string;
  setCardName: React.Dispatch<React.SetStateAction<string>>;
  editingId: number | null;
  isSubmitting: boolean;
  errors: {
    title?: string;
    amount?: string;
    date?: string;
    tags?: string;
    cardName?: string;
  };
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  cancelEdit: () => void;
  mutedText: string;
  softCard: string;
  inputClass: string;
  darkMode: boolean;
}

export default function TransactionForm({
  title,
  setTitle,
  amount,
  setAmount,
  type,
  setType,
  category,
  setCategory,
  date,
  setDate,
  notes,
  setNotes,
  tagsInput,
  setTagsInput,
  paymentMethod,
  setPaymentMethod,
  cardName,
  setCardName,
  editingId,
  isSubmitting,
  errors,
  handleSubmit,
  cancelEdit,
  mutedText,
  softCard,
  inputClass,
  darkMode,
}: TransactionFormProps) {
  const errorTextClass = darkMode ? 'text-red-400' : 'text-red-600';
  const errorBorderClass = darkMode
    ? 'border-red-400/70 ring-1 ring-red-400/20'
    : 'border-red-500 ring-1 ring-red-500/10';

  const previewTags = tagsInput
    .split(',')
    .map((tag) => tag.trim().replace(/^#+/, ''))
    .filter(Boolean)
    .slice(0, 8);

  const sectionCard = darkMode
    ? 'border border-white/10 bg-white/[0.05]'
    : 'border border-sky-100 bg-white/95';

  const chipBase = darkMode
    ? 'border border-white/10 bg-white/[0.06] text-zinc-200'
    : 'border border-sky-100 bg-white text-sky-700';

  const activeExpenseChip = darkMode
    ? 'border border-red-500/20 bg-red-500/10 text-red-300'
    : 'border border-red-200 bg-red-50 text-red-700';

  const activeIncomeChip = darkMode
    ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
    : 'border border-sky-200 bg-sky-50 text-sky-700';

  const activeCashChip = darkMode
    ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
    : 'border border-sky-200 bg-sky-50 text-sky-700';

  const activeCreditChip = darkMode
    ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
    : 'border border-sky-200 bg-sky-50 text-sky-700';

  return (
    <motion.form
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      onSubmit={handleSubmit}
      className={`rounded-[32px] p-5 shadow-lg md:p-6 ${softCard}`}
    >
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p
            className={`text-[11px] font-medium uppercase tracking-[0.24em] ${mutedText}`}
          >
            Transações
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight">
            {editingId ? 'Editar transação' : 'Nova transação'}
          </h3>
          <p className={`mt-2 text-sm ${mutedText}`}>
            Preencha só o essencial para registrar rápido.
          </p>
        </div>

        {editingId && (
          <span
            className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${
              darkMode
                ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
                : 'border border-sky-200 bg-sky-50 text-sky-700'
            }`}
          >
            <PencilLine size={13} />
            Editando
          </span>
        )}
      </div>

      <div className="space-y-5">
        <div className={`rounded-[24px] p-4 ${sectionCard}`}>
          <div className="mb-4 flex items-center gap-2">
            <Wallet
              size={15}
              className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
            />
            <p className="text-sm font-semibold tracking-tight">
              Informações principais
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`mb-2 block text-xs ${mutedText}`}>Nome</label>
              <input
                placeholder="Ex: iFood, Academia, Salário..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isSubmitting}
                className={`w-full rounded-2xl p-3 text-sm outline-none transition ${inputClass} ${
                  isSubmitting ? 'opacity-60' : ''
                } ${errors.title ? errorBorderClass : ''}`}
              />
              {errors.title && (
                <p className={`mt-1 text-xs ${errorTextClass}`}>{errors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={`mb-2 block text-xs ${mutedText}`}>Valor</label>
                <input
                  placeholder="0,00"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isSubmitting}
                  className={`w-full rounded-2xl p-3 text-sm outline-none transition ${inputClass} ${
                    isSubmitting ? 'opacity-60' : ''
                  } ${errors.amount ? errorBorderClass : ''}`}
                />
                {errors.amount && (
                  <p className={`mt-1 text-xs ${errorTextClass}`}>{errors.amount}</p>
                )}
              </div>

              <div>
                <label className={`mb-2 block text-xs ${mutedText}`}>Data</label>
                <div className="relative">
                  <CalendarDays
                    size={15}
                    className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                      darkMode ? 'text-zinc-400' : 'text-gray-400'
                    }`}
                  />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    disabled={isSubmitting}
                    className={`w-full rounded-2xl p-3 pl-10 text-sm outline-none transition ${inputClass} ${
                      isSubmitting ? 'opacity-60' : ''
                    } ${errors.date ? errorBorderClass : ''}`}
                  />
                </div>
                {errors.date && (
                  <p className={`mt-1 text-xs ${errorTextClass}`}>{errors.date}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-[24px] p-4 ${sectionCard}`}>
          <div className="mb-4 flex items-center gap-2">
            <Landmark
              size={15}
              className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
            />
            <p className="text-sm font-semibold tracking-tight">
              Classificação
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`mb-2 block text-xs ${mutedText}`}>Tipo</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setType('expense')}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    type === 'expense' ? activeExpenseChip : chipBase
                  } ${isSubmitting ? 'opacity-60' : ''}`}
                >
                  Gasto
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setType('income')}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    type === 'income' ? activeIncomeChip : chipBase
                  } ${isSubmitting ? 'opacity-60' : ''}`}
                >
                  Receita
                </button>
              </div>
            </div>

            <div>
              <label className={`mb-2 block text-xs ${mutedText}`}>
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isSubmitting}
                className={`w-full rounded-2xl p-3 text-sm outline-none transition ${inputClass} ${
                  isSubmitting ? 'opacity-60' : ''
                }`}
              >
                <option>Alimentação</option>
                <option>Transporte</option>
                <option>Moradia</option>
                <option>Lazer</option>
                <option>Salário</option>
                <option>Outros</option>
              </select>
            </div>
          </div>
        </div>

        <div className={`rounded-[24px] p-4 ${sectionCard}`}>
          <div className="mb-4 flex items-center gap-2">
            <CreditCard
              size={15}
              className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
            />
            <p className="text-sm font-semibold tracking-tight">
              Forma de pagamento
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setPaymentMethod('cash')}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  paymentMethod === 'cash' ? activeCashChip : chipBase
                } ${isSubmitting ? 'opacity-60' : ''}`}
              >
                Dinheiro / débito / pix
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setPaymentMethod('credit')}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  paymentMethod === 'credit' ? activeCreditChip : chipBase
                } ${isSubmitting ? 'opacity-60' : ''}`}
              >
                Cartão de crédito
              </button>
            </div>

            {paymentMethod === 'credit' && (
              <div>
                <label className={`mb-2 block text-xs ${mutedText}`}>
                  Nome do cartão
                </label>
                <input
                  placeholder="Ex: Itaú, Nubank, Inter..."
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  disabled={isSubmitting}
                  className={`w-full rounded-2xl p-3 text-sm outline-none transition ${inputClass} ${
                    isSubmitting ? 'opacity-60' : ''
                  } ${errors.cardName ? errorBorderClass : ''}`}
                />
                {errors.cardName && (
                  <p className={`mt-1 text-xs ${errorTextClass}`}>
                    {errors.cardName}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={`rounded-[24px] p-4 ${sectionCard}`}>
          <div className="mb-4 flex items-center gap-2">
            <Tag
              size={15}
              className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
            />
            <p className="text-sm font-semibold tracking-tight">
              Organização extra
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`mb-2 block text-xs ${mutedText}`}>Tags</label>
              <div className="relative">
                <Hash
                  size={15}
                  className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${
                    darkMode ? 'text-zinc-400' : 'text-gray-400'
                  }`}
                />
                <input
                  placeholder="fixo, essencial, mercado, assinatura..."
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  disabled={isSubmitting}
                  className={`w-full rounded-2xl p-3 pl-10 text-sm outline-none transition ${inputClass} ${
                    isSubmitting ? 'opacity-60' : ''
                  } ${errors.tags ? errorBorderClass : ''}`}
                />
              </div>

              {previewTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {previewTags.map((tag) => (
                    <span
                      key={tag}
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
              )}

              {errors.tags ? (
                <p className={`mt-1 text-xs ${errorTextClass}`}>{errors.tags}</p>
              ) : (
                <p className={`mt-2 text-xs ${mutedText}`}>
                  Use tags para facilitar filtros depois.
                </p>
              )}
            </div>

            <div>
              <label className={`mb-2 block text-xs ${mutedText}`}>Notas</label>
              <div className="relative">
                <FileText
                  size={15}
                  className={`pointer-events-none absolute left-3 top-3 ${
                    darkMode ? 'text-zinc-400' : 'text-gray-400'
                  }`}
                />
                <textarea
                  placeholder="Observações da transação..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={isSubmitting}
                  rows={4}
                  className={`w-full resize-none rounded-2xl p-3 pl-10 text-sm outline-none transition ${inputClass} ${
                    isSubmitting ? 'opacity-60' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          <motion.button
            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
            whileHover={{
              scale: isSubmitting ? 1 : 1.01,
              y: isSubmitting ? 0 : -1,
            }}
            disabled={isSubmitting}
            className={`group relative overflow-hidden rounded-2xl p-3.5 text-sm font-semibold shadow-md transition ${
              darkMode
                ? 'bg-sky-300 text-slate-950 hover:bg-sky-200 shadow-[0_0_20px_rgba(125,211,252,0.14)]'
                : 'bg-sky-400 text-white hover:bg-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.16)]'
            } ${isSubmitting ? 'cursor-not-allowed opacity-60' : ''}`}
          >
            <span
              className={`pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 ${
                darkMode
                  ? 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_35%)]'
                  : 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]'
              }`}
            />

            <span className="relative">
              {isSubmitting
                ? editingId
                  ? 'Salvando...'
                  : 'Adicionando...'
                : editingId
                ? 'Salvar alterações'
                : 'Adicionar transação'}
            </span>
          </motion.button>

          {editingId && !isSubmitting && (
            <button
              type="button"
              onClick={cancelEdit}
              className={`text-center text-sm underline ${mutedText}`}
            >
              Cancelar edição
            </button>
          )}
        </div>
      </div>
    </motion.form>
  );
}