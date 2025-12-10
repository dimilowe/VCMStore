'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

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
              className="group relative rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`h-40 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                {tool.thumbnailUrl ? (
                  <img 
                    src={tool.thumbnailUrl} 
                    alt={tool.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white/80" />
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {tool.isPro && (
                  <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide shadow-sm">
                    PRO
                  </span>
                )}
                
                {tool.appLabel && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-md bg-white/90 backdrop-blur-sm text-zinc-800 text-[10px] font-semibold px-2 py-1 uppercase tracking-wide shadow-sm">
                    <div className="w-3 h-3 rounded bg-gradient-to-br from-pink-500 to-orange-400" />
                    {tool.appLabel}
                  </span>
                )}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-sm font-semibold text-white group-hover:underline decoration-2 underline-offset-2 flex items-center gap-1">
                  {tool.title}
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                {tool.description && (
                  <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
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
