'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <motion.div
          key={`progress-${pathname}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-0 top-0 z-[9999] h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-sky-300 to-transparent"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}