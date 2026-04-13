'use client';

import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';

interface MonthFilterProps {
  selectedMonth: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  mutedText: string;
  softCard: string;
  inputClass: string;
  darkMode: boolean;
}

export default function MonthFilter({
  selectedMonth,
  setSelectedMonth,
  mutedText,
  softCard,
  inputClass,
  darkMode,
}: MonthFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.11, duration: 0.35 }}
      className={`rounded-[28px] p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <div
          className={`rounded-xl p-2 ${
            darkMode ? 'bg-white/10' : 'bg-sky-50'
          }`}
        >
          <CalendarDays
            size={15}
            className={darkMode ? 'text-zinc-300' : 'text-sky-600'}
          />
        </div>

        <div>
          <p className="text-sm font-semibold tracking-tight">Mês</p>
          <p className={`text-xs ${mutedText}`}>Filtre por período</p>
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={`w-full rounded-2xl p-3 text-sm outline-none transition ${inputClass}`}
        />

        {selectedMonth && (
          <button
            type="button"
            onClick={() => setSelectedMonth('')}
            className={`w-full rounded-2xl px-4 py-2 text-sm transition ${
              darkMode
                ? 'bg-white/10 text-white hover:bg-white/15'
                : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
            }`}
          >
            Limpar mês
          </button>
        )}
      </div>
    </motion.div>
  );
}