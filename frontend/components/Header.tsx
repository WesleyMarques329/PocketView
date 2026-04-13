'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  Brain,
  CalendarDays,
  LayoutDashboard,
  Moon,
  MoonStar,
  Sparkles,
  Sun,
  SunMedium,
  Target,
  Wallet,
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  mutedText: string;
}

export default function Header({
  darkMode,
  setDarkMode,
  mutedText,
}: HeaderProps) {
  const pathname = usePathname();
  const now = new Date();
  const hour = now.getHours();

  const greeting =
    hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  const formattedDate = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const pageMeta = {
    '/': {
      label: 'Dashboard',
      description:
        'Acompanhe seus indicadores principais em um painel claro, premium e organizado.',
      icon: LayoutDashboard,
    },
    '/transactions': {
      label: 'Transações',
      description:
        'Gerencie receitas e gastos com uma experiência rápida e visual.',
      icon: Wallet,
    }
  } as const;

  const current = pageMeta[pathname as keyof typeof pageMeta] ?? pageMeta['/'];
  const PageIcon = current.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-[30px] border p-5 shadow-xl md:p-6 ${
        darkMode
          ? 'border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-white/[0.03]'
          : 'border-gray-200 bg-gradient-to-br from-white via-sky-50 to-gray-100'
      }`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl ${
          darkMode ? 'bg-sky-400/10' : 'bg-sky-200/80'
        }`}
      />

      <div className="relative flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${
                darkMode
                  ? 'border border-white/10 bg-white/5 text-zinc-300'
                  : 'border border-sky-200 bg-sky-50 text-sky-700'
              }`}
            >
              <Sparkles size={12} />
              Finance OS
            </span>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] ${
                darkMode
                  ? 'border border-white/10 bg-white/5 text-zinc-300'
                  : 'border border-sky-200 bg-white text-sky-700'
              }`}
            >
              <PageIcon size={12} />
              {current.label}
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {greeting}, Finance Tracker
          </h1>

          <p className={`mt-2 max-w-2xl text-sm leading-6 ${mutedText}`}>
            {current.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm ${
              darkMode
                ? 'border border-white/10 bg-white/10 text-white'
                : 'border border-sky-200 bg-white text-sky-700'
            }`}
          >
            <CalendarDays size={14} />
            <span className="capitalize">{formattedDate}</span>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm ${
              darkMode
                ? 'border border-white/10 bg-white/10 text-white'
                : 'border border-sky-200 bg-white text-sky-700'
            }`}
          >
            {darkMode ? <MoonStar size={14} /> : <SunMedium size={14} />}
            <span>{darkMode ? 'Modo escuro' : 'Modo claro'}</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setDarkMode((prev) => !prev)}
            className={`rounded-full px-3 py-2 text-sm shadow-md transition ${
              darkMode
                ? 'border border-white/10 bg-white/10 text-white hover:bg-white/15'
                : 'border border-sky-200 bg-white text-sky-700 hover:bg-sky-50'
            }`}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}