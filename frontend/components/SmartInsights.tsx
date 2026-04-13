'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

interface SmartInsightsProps {
  insights: string[];
  mutedText: string;
  softCard: string;
  darkMode: boolean;
}

export default function SmartInsights({
  insights,
  mutedText,
  softCard,
  darkMode,
}: SmartInsightsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className={`rounded-3xl p-4 shadow-lg ${softCard}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Insights inteligentes</h3>
          <p className={`text-xs ${mutedText}`}>
            Leitura automática do seu comportamento financeiro
          </p>
        </div>

        <div
          className={`rounded-full p-2 ${
            darkMode ? 'bg-white/10' : 'bg-gray-100'
          }`}
        >
          <Brain
            size={16}
            className={darkMode ? 'text-zinc-300' : 'text-gray-500'}
          />
        </div>
      </div>

      <div className="space-y-3">
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
              whileHover={{ y: -2 }}
              className={`rounded-2xl border p-4 transition ${
                darkMode
                  ? 'border-white/10 bg-white/5 hover:bg-white/[0.07]'
                  : 'border-gray-200 bg-white/90 hover:bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 rounded-full p-2 ${
                    darkMode
                      ? 'bg-yellow-500/15 text-yellow-300'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  <Sparkles size={14} />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium leading-6">{insight}</p>
                  <p className={`mt-1 text-xs ${mutedText}`}>
                    Insight automático gerado com base nas suas transações
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div
            className={`rounded-2xl border border-dashed p-6 text-center ${
              darkMode
                ? 'border-white/10 text-zinc-400'
                : 'border-gray-300 text-gray-500'
            }`}
          >
            Adicione mais transações para gerar insights automáticos.
          </div>
        )}
      </div>
    </motion.div>
  );
}