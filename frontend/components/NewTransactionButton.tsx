'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface NewTransactionButtonProps {
  onClick: () => void;
  darkMode: boolean;
}

export default function NewTransactionButton({
  onClick,
  darkMode,
}: NewTransactionButtonProps) {
  return (
    <>
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02, y: -1 }}
        onClick={onClick}
        className={`group relative hidden overflow-hidden rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg transition md:inline-flex md:items-center md:gap-2 ${
          darkMode
            ? 'bg-sky-300 text-slate-950 hover:bg-sky-200 shadow-[0_0_20px_rgba(125,211,252,0.14)]'
            : 'bg-sky-400 text-white hover:bg-sky-500 shadow-[0_0_20px_rgba(56,189,248,0.16)]'
        }`}
      >
        <span
          className={`pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 ${
            darkMode
              ? 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_35%)]'
              : 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]'
          }`}
        />

        <motion.span
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <Plus size={16} />
        </motion.span>

        <span className="relative">Nova transação</span>
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.03, y: -1 }}
        onClick={onClick}
        className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full shadow-2xl md:hidden ${
          darkMode
            ? 'bg-sky-300 text-slate-950 shadow-[0_0_20px_rgba(125,211,252,0.14)]'
            : 'bg-sky-400 text-white shadow-[0_0_20px_rgba(56,189,248,0.16)]'
        }`}
        aria-label="Nova transação"
      >
        <span
          className={`pointer-events-none absolute inset-0 opacity-0 transition duration-300 hover:opacity-100 ${
            darkMode
              ? 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_35%)]'
              : 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%)]'
          }`}
        />
        <Plus size={20} className="relative" />
      </motion.button>
    </>
  );
}