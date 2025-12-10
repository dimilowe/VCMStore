'use client';

import { ElementType, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CloudHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  proLabel?: boolean;
  primaryCta?: {
    label: string;
    href: string;
  };
  icon?: ElementType;
  gradient?: string;
  optionalAccent?: ReactNode;
}

export default function CloudHero({
  title,
  subtitle,
  badge,
  proLabel,
  primaryCta,
  icon: IconComponent = Sparkles,
  gradient = 'from-pink-500 to-orange-400',
}: CloudHeroProps) {
  return (
    <div className="rounded-2xl overflow-hidden">
      <div 
        className={`bg-gradient-to-r ${gradient} px-8 py-12 text-white relative`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <IconComponent className="w-5 h-5" />
          </div>
          {badge && (
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-white/90 text-lg max-w-xl leading-relaxed mb-6">
            {subtitle}
          </p>
        )}

        {primaryCta && (
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-white text-zinc-900 hover:bg-zinc-100 transition-colors shadow-sm"
          >
            {primaryCta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        {proLabel && (
          <span className="absolute top-6 right-6 inline-flex items-center rounded-full bg-amber-400/90 text-amber-900 text-xs font-bold px-3 py-1 uppercase tracking-wide shadow-sm">
            Pro
          </span>
        )}
      </div>
    </div>
  );
}
