'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { PencilLine, Plus, X } from 'lucide-react';
import TransactionForm from '@/components/TransactionForm';

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  darkMode: boolean;
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
}

export default function TransactionModal({
  open,
  onClose,
  darkMode,
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
}: TransactionModalProps) {
  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const modalShell = darkMode
    ? 'border-white/10 bg-zinc-950 text-white'
    : 'border-white/80 bg-white text-black';

  const topChip = darkMode
    ? 'border border-sky-500/20 bg-sky-500/10 text-sky-300'
    : 'border border-sky-200 bg-sky-50 text-sky-700';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-3xl p-3 md:inset-0 md:flex md:items-center md:justify-center"
          >
            <div
              className={`relative w-full overflow-hidden rounded-[34px] border shadow-2xl ${modalShell}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-70 ${
                  darkMode
                    ? 'bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.10),transparent_35%)]'
                    : 'bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.14),transparent_35%)]'
                }`}
              />

              <div className="relative border-b border-black/5 px-5 pb-4 pt-5 dark:border-white/5 md:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${topChip}`}
                      >
                        {editingId ? <PencilLine size={12} /> : <Plus size={12} />}
                        {editingId ? 'Editar' : 'Nova'}
                      </span>

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${
                          darkMode
                            ? 'border border-white/10 bg-white/5 text-zinc-300'
                            : 'border border-sky-100 bg-white text-sky-700'
                        }`}
                      >
                        Transação
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                      {editingId ? 'Editar transação' : 'Nova transação'}
                    </h3>

                    <p className={`mt-2 text-sm ${mutedText}`}>
                      {editingId
                        ? 'Atualize os dados da movimentação.'
                        : 'Preencha os dados para registrar rapidamente.'}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.06, rotate: 6 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className={`rounded-full p-2 transition ${
                      darkMode
                        ? 'bg-white/10 hover:bg-white/15'
                        : 'bg-sky-50 hover:bg-sky-100'
                    } ${isSubmitting ? 'opacity-50' : ''}`}
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              </div>

              <div className="relative max-h-[85vh] overflow-y-auto px-3 pb-3 pt-3 md:px-4">
                <TransactionForm
                  title={title}
                  setTitle={setTitle}
                  amount={amount}
                  setAmount={setAmount}
                  type={type}
                  setType={setType}
                  category={category}
                  setCategory={setCategory}
                  date={date}
                  setDate={setDate}
                  notes={notes}
                  setNotes={setNotes}
                  tagsInput={tagsInput}
                  setTagsInput={setTagsInput}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  cardName={cardName}
                  setCardName={setCardName}
                  editingId={editingId}
                  isSubmitting={isSubmitting}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  cancelEdit={cancelEdit}
                  mutedText={mutedText}
                  softCard={softCard}
                  inputClass={inputClass}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}