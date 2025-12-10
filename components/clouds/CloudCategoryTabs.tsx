'use client';

import { ElementType } from 'react';
import { Sparkles, Wand2, ImageIcon, Video, Palette, FileText, Box } from 'lucide-react';

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
  imaging: ImageIcon,
  video: Video,
  design: Palette,
  document: FileText,
  '3d': Box,
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
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded-full whitespace-nowrap transition-all ${
              isActive
                ? 'bg-zinc-900 text-white font-medium shadow-sm'
                : 'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300'
            }`}
          >
            <IconComponent className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
