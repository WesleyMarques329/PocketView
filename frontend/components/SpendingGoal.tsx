'use client';

import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface SpendingGoalProps {
  expense: number;
  goal: string;
  setGoal: React.Dispatch<React.SetStateAction<string>>;
  mutedText: string;
  softCard: string;
  inputClass: string;
  darkMode: boolean;
}

export default function SpendingGoal({
  expense,
  goal,
  setGoal,
  mutedText,
  softCard,
  inputClass,
  darkMode,
}: SpendingGoalProps) {
  const numericGoal = Number(goal) || 0;
  const progress =
    numericGoal > 0 ? Math.min((expense / numericGoal) * 100, 100) : 0;
  const exceeded = numericGoal > 0 && expense > numericGoal;
  const remaining = numericGoal > 0 ? numericGoal - expense : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.13, duration: 0.35 }}
      className={`mb-5 rounded-3xl p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Meta de gastos</h3>
          <p className={`text-xs ${mutedText}`}>
            Defina quanto quer gastar no período
          </p>
        </div>

        <div
          className={`rounded-full p-2 ${
            darkMode ? 'bg-white/10' : 'bg-gray-100'
          }`}
        >
          <Target
            size={16}
            className={darkMode ? 'text-zinc-300' : 'text-gray-500'}
          />
        </div>
      </div>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Ex: 2000"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className={`w-full rounded-2xl p-3 text-sm outline-none transition ${inputClass}`}
        />
      </div>

      <div className="mb-2 flex items-center justify-between text-sm">
        <span className={mutedText}>Gasto atual</span>
        <strong>R$ {expense.toFixed(2)}</strong>
      </div>

      <div className="mb-2 flex items-center justify-between text-sm">
        <span className={mutedText}>Meta</span>
        <strong>
          {numericGoal > 0 ? `R$ ${numericGoal.toFixed(2)}` : 'Não definida'}
        </strong>
      </div>

      {numericGoal > 0 && (
        <>
          <div
            className={`mb-3 h-3 w-full overflow-hidden rounded-full ${
              darkMode ? 'bg-white/10' : 'bg-gray-200'
            }`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full rounded-full ${
                exceeded
                  ? 'bg-red-500'
                  : progress >= 80
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
            />
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className={mutedText}>{progress.toFixed(0)}% usado</span>

            <span
              className={
                exceeded
                  ? 'font-medium text-red-500'
                  : darkMode
                  ? 'text-zinc-300'
                  : 'text-gray-700'
              }
            >
              {exceeded
                ? `Ultrapassou em R$ ${Math.abs(remaining).toFixed(2)}`
                : `Restam R$ ${remaining.toFixed(2)}`}
            </span>
          </div>
        </>
      )}

      {numericGoal === 0 && (
        <p className={`text-xs ${mutedText}`}>
          Defina uma meta para acompanhar seu limite de gastos.
        </p>
      )}
    </motion.div>
  );
}