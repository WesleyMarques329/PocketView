'use client';

import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  CalendarDays,
  MoonStar,
  Sparkles,
  SunMedium,
  Wallet,
  Target,
  Brain,
  LayoutDashboard,
} from 'lucide-react';

interface TopbarPremiumProps {
  darkMode: boolean;
}

export default function TopbarPremium({ darkMode }: TopbarPremiumProps) {
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
      title: 'Visão geral do sistema',
      description:
        'Acompanhe seus indicadores principais em um painel mais premium e organizado.',
      icon: LayoutDashboard,
    },
    '/transactions': {
      label: 'Transações',
      title: 'Gestão completa das movimentações',
      description:
        'Busque, filtre e organize receitas e gastos com uma experiência mais focada.',
      icon: Wallet,
    },
    '/goals': {
      label: 'Metas',
      title: 'Controle de metas e limites',
      description:
        'Defina objetivos por período e acompanhe cada categoria com clareza.',
      icon: Target,
    },
    '/insights': {
      label: 'Insights',
      title: 'Leituras inteligentes do seu financeiro',
      description:
        'Visualize comportamento, tendência e saúde financeira com mais contexto.',
      icon: Brain,
    },
  } as const;

  const current = pageMeta[pathname as keyof typeof pageMeta] ?? pageMeta['/'];
  const PageIcon = current.icon;

  return (
    <div
      className={`relative mb-6 mt-6 overflow-hidden rounded-[30px] border p-5 shadow-xl ${
        darkMode
          ? 'border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-white/[0.03]'
          : 'border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100'
      }`}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${
          darkMode ? 'bg-white/10' : 'bg-indigo-200/80'
        }`}
      />

      <div className="relative flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <PageIcon
              size={16}
              className={darkMode ? 'text-yellow-300' : 'text-indigo-500'}
            />
            <span
              className={`text-xs font-medium uppercase tracking-[0.25em] ${
                darkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}
            >
              {current.label}
            </span>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {greeting}
          </h2>

          <p
            className={`mt-2 max-w-2xl text-sm ${
              darkMode ? 'text-zinc-400' : 'text-gray-500'
            }`}
          >
            {current.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs ${
                darkMode
                  ? 'border border-white/10 bg-white/10 text-white'
                  : 'border border-gray-200 bg-white text-gray-700'
              }`}
            >
              <ArrowUpRight size={13} />
              {current.title}
            </span>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs ${
                darkMode
                  ? 'border border-white/10 bg-white/10 text-white'
                  : 'border border-gray-200 bg-white text-gray-700'
              }`}
            >
              <Sparkles size={13} />
              Startup-grade UI
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 xl:items-end">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm ${
              darkMode
                ? 'border border-white/10 bg-white/10 text-white'
                : 'border border-gray-200 bg-white text-gray-700'
            }`}
          >
            <CalendarDays size={14} />
            <span className="capitalize">{formattedDate}</span>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm ${
              darkMode
                ? 'border border-white/10 bg-white/10 text-white'
                : 'border border-gray-200 bg-white text-gray-700'
            }`}
          >
            {darkMode ? <MoonStar size={14} /> : <SunMedium size={14} />}
            <span>{darkMode ? 'Modo escuro' : 'Modo claro'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}