'use client';

import Link from 'next/link';
import { ElementType } from 'react';
import { Sparkles, Palette, Video, Shirt, Image, Wand2 } from 'lucide-react';

export interface PrimaryCardData {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  badge?: 'Pro' | 'New' | 'Beta';
  icon?: ElementType;
  gradientBorder?: string;
}

interface CloudPrimaryCardsProps {
  cards: PrimaryCardData[];
}

const CARD_ICONS: Record<string, ElementType> = {
  default: Sparkles,
  shopping: Shirt,
  video: Video,
  creation: Palette,
  image: Image,
  ai: Wand2,
};

const GRADIENT_BORDERS = [
  'from-pink-500 via-purple-500 to-blue-500',
  'from-orange-500 via-pink-500 to-purple-500',
  'from-cyan-400 via-blue-500 to-purple-600',
];

export default function CloudPrimaryCards({ cards }: CloudPrimaryCardsProps) {
  if (cards.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon || CARD_ICONS.default;
        const borderGradient = card.gradientBorder || GRADIENT_BORDERS[idx % GRADIENT_BORDERS.length];
        
        return (
          <div
            key={idx}
            className="relative group"
          >
            <div className={`absolute -inset-[1px] bg-gradient-to-r ${borderGradient} rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity`} />
            
            <div className="relative bg-white rounded-2xl p-5 h-full flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${borderGradient} flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-zinc-900 truncate">
                      {card.title}
                    </h3>
                    {card.badge && (
                      <span className={`text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 font-semibold flex-shrink-0 ${
                        card.badge === 'Pro' ? 'bg-purple-100 text-purple-700' :
                        card.badge === 'New' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {card.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-zinc-600 mb-4 leading-relaxed flex-1 line-clamp-3">
                {card.description}
              </p>
              
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-100">
                {card.secondaryLabel && card.secondaryHref && (
                  <Link
                    href={card.secondaryHref}
                    className="flex-1 px-3 py-2 rounded-lg text-sm font-medium border border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-colors text-center"
                  >
                    {card.secondaryLabel}
                  </Link>
                )}
                <Link
                  href={card.primaryHref}
                  className="flex-1 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm text-center"
                >
                  {card.primaryLabel}
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
