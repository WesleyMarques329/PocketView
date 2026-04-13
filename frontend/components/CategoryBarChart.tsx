'use client';

import { motion } from 'framer-motion';

interface CategoryItem {
  name: string;
  value: number;
}

interface CategoryBarChartProps {
  data: CategoryItem[];
  mutedText: string;
  softCard: string;
  darkMode: boolean;
}

export default function CategoryBarChart({
  data,
  mutedText,
  softCard,
  darkMode,
}: CategoryBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`rounded-3xl p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-4">
        <h3 className="text-sm font-medium">Gastos por categoria</h3>
        <p className={`text-xs ${mutedText}`}>
          Distribuição dos seus gastos
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {data.length === 0 ? (
          <p className={`text-sm ${mutedText}`}>
            Nenhum dado disponível
          </p>
        ) : (
          data.map((item, index) => {
            const percent = (item.value / max) * 100;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col gap-1"
              >
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{item.name}</span>
                  <span className={mutedText}>
                    R$ {item.value.toFixed(2)}
                  </span>
                </div>

                <div
                  className={`h-2 w-full rounded-full ${
                    darkMode ? 'bg-white/10' : 'bg-gray-200'
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`h-2 rounded-full ${
                      darkMode
                        ? 'bg-gradient-to-r from-blue-400 to-purple-400'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}