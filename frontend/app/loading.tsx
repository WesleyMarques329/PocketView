'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#27272a,_#09090b_55%)] px-4 py-6 text-white md:px-6 xl:px-8">
      <div className="mx-auto flex w-full max-w-[1680px] gap-6">
        <div className="hidden xl:flex xl:w-72 xl:flex-col xl:justify-between xl:rounded-[32px] xl:border xl:border-white/10 xl:bg-white/5 xl:p-5 xl:shadow-xl">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-12 w-12 animate-pulse rounded-2xl bg-white/10" />
              <div className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded-full bg-white/10" />
                <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
              </div>
            </div>

            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-12 animate-pulse rounded-2xl bg-white/10"
                />
              ))}
            </div>
          </div>

          <div className="h-28 animate-pulse rounded-3xl bg-white/10" />
        </div>

        <div className="flex-1 overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-4 shadow-xl backdrop-blur-2xl md:p-6 xl:p-8">
          <div className="mb-6 flex items-start justify-between border-b border-white/5 pb-4">
            <div className="space-y-3">
              <div className="h-6 w-32 animate-pulse rounded-full bg-white/10" />
              <div className="h-8 w-56 animate-pulse rounded-full bg-white/10" />
              <div className="h-4 w-80 animate-pulse rounded-full bg-white/10" />
            </div>

            <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />
          </div>

          <div className="mb-6 h-40 animate-pulse rounded-[30px] bg-white/10" />

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-3xl bg-white/10"
              />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6">
            <div className="h-64 animate-pulse rounded-[32px] bg-white/10" />

            <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
              <div className="h-80 animate-pulse rounded-3xl bg-white/10" />
              <div className="h-80 animate-pulse rounded-3xl bg-white/10" />
            </div>

            <div className="h-80 animate-pulse rounded-3xl bg-white/10" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: 'easeInOut',
        }}
        className="fixed left-0 top-0 z-[9999] h-[2px] w-full origin-left bg-gradient-to-r from-transparent via-white to-transparent"
      />
    </main>
  );
}