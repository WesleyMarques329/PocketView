'use client';

import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';

interface SortSelectProps {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  mutedText: string;
  softCard: string;
  inputClass: string;
  darkMode: boolean;
}

export default function SortSelect({
  sortBy,
  setSortBy,
  mutedText,
  softCard,
  inputClass,
  darkMode,
}: SortSelectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.118, duration: 0.35 }}
      className={`rounded-[28px] p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <div
          className={`rounded-xl p-2 ${
            darkMode ? 'bg-white/10' : 'bg-sky-50'
          }`}
        >
          <ArrowUpDown
            size={15}
            className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
          />
        </div>

        <div>
          <p className="text-sm font-semibold tracking-tight">Ordenação</p>
          <p className={`text-xs ${mutedText}`}>Escolha a ordem da lista</p>
        </div>
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={`w-full rounded-2xl p-3 text-sm outline-none transition ${inputClass}`}
      >
        <option value="date-desc">Mais recente</option>
        <option value="date-asc">Mais antigo</option>
        <option value="amount-desc">Maior valor</option>
        <option value="amount-asc">Menor valor</option>
        <option value="title-asc">Nome A-Z</option>
      </select>
    </motion.div>
  );
}