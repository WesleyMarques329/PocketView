'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

interface ToastProps {
  show: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Toast({
  show,
  message,
  type,
  onClose,
}: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          className="fixed bottom-6 left-1/2 z-[999] w-full max-w-sm -translate-x-1/2 px-4"
        >
          <motion.div
            layout
            className={`relative overflow-hidden rounded-[24px] border p-4 shadow-2xl backdrop-blur-xl ${
              type === 'success'
                ? 'border-sky-500/30 bg-sky-500/10 text-sky-300'
                : 'border-red-500/30 bg-red-500/10 text-red-300'
            }`}
          >
            <div
              className={`pointer-events-none absolute inset-0 opacity-60 ${
                type === 'success'
                  ? 'bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.16),transparent_35%)]'
                  : 'bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.16),transparent_35%)]'
              }`}
            />

            <div className="relative flex items-center gap-3">
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.05, duration: 0.2 }}
              >
                {type === 'success' ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <XCircle size={20} />
                )}
              </motion.div>

              <p className="flex-1 text-sm font-medium leading-relaxed">
                {message}
              </p>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                className="text-xs opacity-70 transition hover:opacity-100"
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}