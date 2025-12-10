'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export interface FeaturedTool {
  slug: string;
  title: string;
  description?: string;
  isPro?: boolean;
  thumbnailUrl?: string;
  appLabel?: string;
  gradient?: string;
}

interface CloudFeaturedToolsProps {
  tools: FeaturedTool[];
  title?: string;
}

const PLACEHOLDER_GRADIENTS = [
  'from-pink-400 via-purple-400 to-blue-400',
  'from-orange-400 via-pink-400 to-purple-400',
  'from-cyan-400 via-blue-400 to-purple-400',
  'from-green-400 via-cyan-400 to-blue-400',
  'from-yellow-400 via-orange-400 to-pink-400',
  'from-indigo-400 via-purple-400 to-pink-400',
];

export default function CloudFeaturedTools({ 
  tools, 
  title = 'Featured Tools' 
}: CloudFeaturedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <div>
      {title && (
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-4">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool, idx) => {
          const gradient = tool.gradient || PLACEHOLDER_GRADIENTS[idx % PLACEHOLDER_GRADIENTS.length];
          
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-2xl overflow-hidden border border-zinc-200 bg-white hover:shadow-lg hover:border-zinc-300 transition-all hover:-translate-y-0.5"
            >
              <div className={`h-28 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                {tool.thumbnailUrl ? (
                  <img 
                    src={tool.thumbnailUrl} 
                    alt={tool.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
                
                {tool.isPro && (
                  <span className="absolute top-2 right-2 inline-flex items-center rounded-full bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide shadow-sm">
                    PRO
                  </span>
                )}
                
                {tool.appLabel && (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-white/90 backdrop-blur-sm text-zinc-800 text-[10px] font-semibold px-2 py-1 uppercase tracking-wide shadow-sm">
                    <div className="w-3 h-3 rounded bg-gradient-to-br from-pink-500 to-orange-400" />
                    {tool.appLabel}
                  </span>
                )}
              </div>
              
              <div className="p-4 bg-white">
                <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-pink-600 transition-colors line-clamp-1">
                  {tool.title}
                </h3>
                {tool.description && (
                  <p className="text-xs text-zinc-500 line-clamp-2 mt-1">
                    {tool.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
