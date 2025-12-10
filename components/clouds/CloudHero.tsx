'use client';

import { ElementType, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, Image, Video, Type, ChevronDown } from 'lucide-react';
import { getToolForPrompt } from '@/lib/getToolForPrompt';
import type { Mode } from '@/lib/promptRoutingConfig';

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
  mode?: Mode;
  showPromptBar?: boolean;
  primaryToolSlug?: string;
  cloudId?: string;
}

const MODE_OPTIONS = [
  { id: 'image' as Mode, label: 'Image', icon: Image },
  { id: 'video' as Mode, label: 'Video', icon: Video },
  { id: 'text' as Mode, label: 'Text', icon: Type },
] as const;

export default function CloudHero({
  title,
  subtitle,
  badge,
  proLabel,
  primaryCta,
  icon: IconComponent = Sparkles,
  gradient = 'from-pink-500 to-orange-400',
  mode = 'image',
  showPromptBar = true,
  primaryToolSlug,
  cloudId,
}: CloudHeroProps) {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<Mode>(mode);
  const [promptValue, setPromptValue] = useState('');
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);

  const currentMode = MODE_OPTIONS.find(m => m.id === selectedMode) || MODE_OPTIONS[0];
  const ModeIcon = currentMode.icon;

  function handleGenerate() {
    if (!promptValue.trim()) {
      if (primaryToolSlug) {
        router.push(`/tools/${primaryToolSlug}`);
      } else if (primaryCta?.href) {
        router.push(primaryCta.href);
      }
      return;
    }

    let toolSlug = primaryToolSlug || '';

    if (cloudId) {
      toolSlug = getToolForPrompt(promptValue, selectedMode, cloudId);
    }

    if (toolSlug) {
      router.push(`/tools/${toolSlug}?prompt=${encodeURIComponent(promptValue)}`);
    } else if (primaryCta?.href) {
      router.push(primaryCta.href);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-600/20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30 pointer-events-none" />
      
      <div 
        className={`bg-gradient-to-br ${gradient} px-8 py-10 text-white relative`}
      >
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-white/90 text-base max-w-xl mx-auto leading-relaxed mb-6">
              {subtitle}
            </p>
          )}

          {showPromptBar && (
            <div className="bg-white/10 backdrop-blur-md rounded-full p-1.5 flex items-center gap-2 shadow-lg border border-white/20 mb-6">
              <div className="relative">
                <button 
                  onClick={() => setModeDropdownOpen(!modeDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
                >
                  <ModeIcon className="w-4 h-4" />
                  {currentMode.label}
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>
                
                {modeDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-zinc-200 py-1 min-w-[140px] z-20">
                    {MODE_OPTIONS.map((option) => {
                      const OptionIcon = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSelectedMode(option.id);
                            setModeDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-zinc-50 transition-colors ${
                            option.id === selectedMode ? 'text-pink-600 font-medium' : 'text-zinc-700'
                          }`}
                        >
                          <OptionIcon className="w-4 h-4" />
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <input
                type="text"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe what you want to create..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/60 text-sm px-2"
              />
              
              <button
                onClick={handleGenerate}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 transition-all shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Generate
              </button>
            </div>
          )}

          {!showPromptBar && primaryCta && (
            <Link
              href={primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-white text-zinc-900 hover:bg-zinc-100 transition-colors shadow-sm"
            >
              {primaryCta.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="absolute top-4 left-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-sm">
            <IconComponent className="w-4 h-4" />
          </div>
          {badge && (
            <span className="px-3 py-1.5 bg-zinc-800/80 rounded-lg text-xs font-semibold uppercase tracking-wide backdrop-blur-md shadow-md border border-white/10">
              {badge}
            </span>
          )}
        </div>

        {proLabel && (
          <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-amber-400/90 text-amber-900 text-xs font-bold px-3 py-1 uppercase tracking-wide shadow-sm">
            Pro
          </span>
        )}
      </div>
    </div>
  );
}
