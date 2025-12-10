'use client';

import Link from 'next/link';

export interface PrimaryCardData {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  badge?: 'Pro' | 'New' | 'Beta';
}

interface CloudPrimaryCardsProps {
  cards: PrimaryCardData[];
}

export default function CloudPrimaryCards({ cards }: CloudPrimaryCardsProps) {
  if (cards.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-zinc-900">
              {card.title}
            </h3>
            {card.badge && (
              <span className={`text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 font-semibold ${
                card.badge === 'Pro' ? 'bg-purple-100 text-purple-700' :
                card.badge === 'New' ? 'bg-green-100 text-green-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {card.badge}
              </span>
            )}
          </div>
          
          <p className="text-sm text-zinc-600 mb-5 leading-relaxed flex-1">
            {card.description}
          </p>
          
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={card.primaryHref}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 transition-all shadow-sm"
            >
              {card.primaryLabel}
            </Link>
            {card.secondaryLabel && card.secondaryHref && (
              <Link
                href={card.secondaryHref}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-zinc-300 text-zinc-700 bg-white hover:bg-zinc-50 transition-colors"
              >
                {card.secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
