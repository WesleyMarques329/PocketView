'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  LayoutDashboard,
  Sparkles,
  Target,
  Wallet,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarDesktopProps {
  darkMode: boolean;
}

export default function SidebarDesktop({ darkMode }: SidebarDesktopProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { label: 'Transações', icon: Wallet, href: '/transactions' },
  ];

  return (
    <aside
      className={`hidden xl:flex xl:w-72 xl:flex-col xl:justify-between xl:rounded-[32px] xl:border xl:p-5 xl:shadow-xl ${
        darkMode
          ? 'border-white/10 bg-white/5'
          : 'border-gray-200 bg-white/80'
      }`}
    >
      <div>
        <div className="mb-8 flex items-center gap-3">
          <div
            className={`rounded-2xl p-3 ${
              darkMode ? 'bg-white/10 text-white' : 'bg-black text-white'
            }`}
          >
            <Sparkles size={18} />
          </div>

          <div>
            <p
              className={`text-xs uppercase tracking-[0.22em] ${
                darkMode ? 'text-zinc-400' : 'text-gray-500'
              }`}
            >
              Premium
            </p>
            <h2 className="text-lg font-semibold">Finance OS</h2>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.label}
                whileHover={{ x: 2 }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.25 }}
              >
                <Link
                  href={item.href}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    isActive
                      ? darkMode
                        ? 'bg-white/10 text-white'
                        : 'bg-black text-white'
                      : darkMode
                      ? 'text-zinc-300 hover:bg-white/5'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      <div
        className={`rounded-3xl p-4 ${
          darkMode ? 'bg-white/5' : 'bg-gray-50'
        }`}
      >
        <p
          className={`mb-1 text-xs uppercase tracking-[0.18em] ${
            darkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}
        >
          Workspace
        </p>
        <h3 className="text-base font-semibold">Painel financeiro</h3>
        <p
          className={`mt-1 text-sm ${
            darkMode ? 'text-zinc-400' : 'text-gray-500'
          }`}
        >
          Uma visão mais premium, visual e organizada do seu controle
          financeiro.
        </p>
      </div>
    </aside>
  );
}