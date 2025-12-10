'use client';

import { ElementType } from 'react';
import { Sparkles, Wand2, ImageIcon, Video, Palette, FileText, Box, Shirt, TrendingUp, DollarSign, Music, ShoppingBag, Scissors, Layers } from 'lucide-react';

export interface CategoryTab {
  id: string;
  label: string;
  icon?: ElementType;
}

interface CloudCategoryTabsProps {
  tabs: CategoryTab[];
  activeTab: string;
  onTabChange?: (tabId: string) => void;
}

const DEFAULT_ICONS: Record<string, ElementType> = {
  featured: Sparkles,
  'generative-ai': Wand2,
  'ai-tools': Wand2,
  imaging: ImageIcon,
  image: ImageIcon,
  video: Video,
  'short-form': Video,
  'long-form': Video,
  hooks: TrendingUp,
  design: Palette,
  document: FileText,
  '3d': Box,
  outfits: Shirt,
  'style-tools': Scissors,
  boards: Layers,
  pricing: DollarSign,
  sales: TrendingUp,
  analytics: TrendingUp,
  production: Music,
  performance: Music,
  distribution: TrendingUp,
  social: TrendingUp,
  'ad-copy': FileText,
  creatives: Palette,
  convert: FileText,
  compress: Layers,
  edit: Palette,
  automation: Wand2,
  insights: TrendingUp,
  content: FileText,
  research: FileText,
};

export default function CloudCategoryTabs({ 
  tabs, 
  activeTab, 
  onTabChange 
}: CloudCategoryTabsProps) {
  if (tabs.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const IconComponent = tab.icon || DEFAULT_ICONS[tab.id] || Sparkles;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm rounded-full whitespace-nowrap transition-all ${
              isActive
                ? 'bg-zinc-900 text-white font-medium shadow-md'
                : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
