'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  mutedText: string;
  softCard: string;
  inputClass: string;
  darkMode: boolean;
}

export default function SearchBar({
  search,
  setSearch,
  mutedText,
  softCard,
  inputClass,
  darkMode,
}: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className={`rounded-[28px] p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <div
          className={`rounded-xl p-2 ${
            darkMode ? 'bg-white/10' : 'bg-sky-50'
          }`}
        >
          <Search
            size={15}
            className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
          />
        </div>

        <div>
          <p className="text-sm font-semibold tracking-tight">Busca</p>
          <p className={`text-xs ${mutedText}`}>Nome, categoria, nota ou #tag</p>
        </div>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar transação..."
        className={`w-full rounded-2xl p-3 text-sm outline-none transition ${inputClass}`}
      />
    </motion.div>
  );
}