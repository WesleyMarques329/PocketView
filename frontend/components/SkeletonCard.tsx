'use client';

interface SkeletonCardProps {
  darkMode: boolean;
  lines?: number;
}

export default function SkeletonCard({
  darkMode,
  lines = 3,
}: SkeletonCardProps) {
  return (
    <div
      className={`animate-pulse rounded-[24px] border p-4 ${
        darkMode
          ? 'border-white/10 bg-white/5'
          : 'border-gray-200 bg-white'
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`h-4 w-1/3 rounded-full ${
            darkMode ? 'bg-white/10' : 'bg-gray-200'
          }`}
        />
        <div
          className={`h-8 w-8 rounded-full ${
            darkMode ? 'bg-white/10' : 'bg-gray-200'
          }`}
        />
      </div>

      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-3 rounded-full ${
              darkMode ? 'bg-white/10' : 'bg-gray-200'
            } ${index === lines - 1 ? 'w-2/3' : 'w-full'}`}
          />
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <div
          className={`h-6 w-20 rounded-full ${
            darkMode ? 'bg-white/10' : 'bg-gray-200'
          }`}
        />
        <div
          className={`h-6 w-16 rounded-full ${
            darkMode ? 'bg-white/10' : 'bg-gray-200'
          }`}
        />
      </div>
    </div>
  );
}