'use client';

import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import CategoryIcon from '@/components/CategoryIcon';

interface CategoryGoalItem {
  name: string;
  spent: number;
  goal: number;
  percent: number;
}

interface CategoryGoalsProps {
  goals: Record<string, string>;
  setGoals: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  categories: CategoryGoalItem[];
  mutedText: string;
  softCard: string;
  inputClass: string;
  darkMode: boolean;
}

const categoryOptions = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Salário',
  'Outros',
];

export default function CategoryGoals({
  goals,
  setGoals,
  categories,
  mutedText,
  softCard,
  inputClass,
  darkMode,
}: CategoryGoalsProps) {
  const handleGoalChange = (category: string, value: string) => {
    setGoals((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.21, duration: 0.35 }}
      className={`rounded-3xl p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Metas por categoria</h3>
          <p className={`text-xs ${mutedText}`}>
            Defina limites por tipo de gasto
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

      <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {categoryOptions.map((category) => (
          <div key={category}>
            <label className={`mb-1 block text-xs ${mutedText}`}>
              {category}
            </label>
            <input
              type="number"
              placeholder="Ex: 500"
              value={goals[category] || ''}
              onChange={(e) => handleGoalChange(category, e.target.value)}
              className={`w-full rounded-2xl p-3 text-sm outline-none transition ${inputClass}`}
            />
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {categories.length > 0 ? (
          categories.map((item, index) => {
            const progress = Math.min(item.percent, 100);
            const exceeded = item.goal > 0 && item.spent > item.goal;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`rounded-2xl border p-4 transition ${
                  darkMode
                    ? 'border-white/10 bg-white/5 hover:bg-white/[0.07]'
                    : 'border-gray-200 bg-white/90 hover:bg-white'
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CategoryIcon category={item.name} darkMode={darkMode} />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      R$ {item.spent.toFixed(2)}
                    </p>
                    <p className={`text-xs ${mutedText}`}>
                      Meta:{' '}
                      {item.goal > 0 ? `R$ ${item.goal.toFixed(2)}` : 'não definida'}
                    </p>
                  </div>
                </div>

                {item.goal > 0 ? (
                  <>
                    <div
                      className={`mb-2 h-2.5 overflow-hidden rounded-full ${
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
                            : item.percent >= 80
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className={mutedText}>
                        {item.percent.toFixed(0)}% usado
                      </span>
                      <span
                        className={
                          exceeded
                            ? darkMode
                              ? 'text-red-400'
                              : 'text-red-600'
                            : mutedText
                        }
                      >
                        {exceeded
                          ? `Excedeu em R$ ${(item.spent - item.goal).toFixed(2)}`
                          : `Restam R$ ${(item.goal - item.spent).toFixed(2)}`}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className={`text-xs ${mutedText}`}>
                    Defina uma meta para acompanhar esta categoria.
                  </p>
                )}
              </motion.div>
            );
          })
        ) : (
          <div
            className={`rounded-2xl border border-dashed p-6 text-center ${
              darkMode
                ? 'border-white/10 text-zinc-400'
                : 'border-gray-300 text-gray-500'
            }`}
          >
            Adicione gastos para acompanhar metas por categoria.
          </div>
        )}
      </div>
    </motion.div>
  );
}