'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  darkMode: boolean;
}

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  darkMode,
}: ConfirmDeleteModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-sm -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className={`relative overflow-hidden rounded-[30px] border p-5 shadow-2xl ${
                darkMode
                  ? 'border-white/10 bg-zinc-950 text-white'
                  : 'border-white/80 bg-white text-black'
              }`}
            >
              <div
                className={`pointer-events-none absolute inset-0 opacity-60 ${
                  darkMode
                    ? 'bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.14),transparent_35%)]'
                    : 'bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.10),transparent_35%)]'
                }`}
              />

              <div className="relative mb-5 flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.85, rotate: -8 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.04, duration: 0.2 }}
                  className={`rounded-2xl p-2.5 ${
                    darkMode ? 'bg-red-500/15' : 'bg-red-100'
                  }`}
                >
                  <AlertTriangle
                    size={20}
                    className={darkMode ? 'text-red-400' : 'text-red-600'}
                  />
                </motion.div>

                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    Confirmar exclusão
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? 'text-zinc-400' : 'text-gray-500'
                    }`}
                  >
                    Essa ação não pode ser desfeita.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className={`flex-1 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    darkMode
                      ? 'bg-white/10 text-white hover:bg-white/15'
                      : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                  }`}
                >
                  Cancelar
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onConfirm}
                  className="flex-1 rounded-2xl bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-md transition hover:bg-red-700"
                >
                  Deletar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}