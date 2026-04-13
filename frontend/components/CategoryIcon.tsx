'use client';

import {
  UtensilsCrossed,
  Car,
  House,
  Clapperboard,
  Wallet,
  Tag,
} from 'lucide-react';

interface CategoryIconProps {
  category: string;
  darkMode: boolean;
}

export default function CategoryIcon({
  category,
  darkMode,
}: CategoryIconProps) {
  const iconClass = darkMode ? 'text-zinc-200' : 'text-gray-700';

  switch (category) {
    case 'Alimentação':
      return <UtensilsCrossed size={14} className={iconClass} />;
    case 'Transporte':
      return <Car size={14} className={iconClass} />;
    case 'Moradia':
      return <House size={14} className={iconClass} />;
    case 'Lazer':
      return <Clapperboard size={14} className={iconClass} />;
    case 'Salário':
      return <Wallet size={14} className={iconClass} />;
    default:
      return <Tag size={14} className={iconClass} />;
  }
}