'use client';

import Link from 'next/link';

export interface FeaturedTool {
  slug: string;
  title: string;
  description?: string;
  isPro?: boolean;
  thumbnailUrl?: string;
  appLabel?: string;
}

interface CloudFeaturedToolsProps {
  tools: FeaturedTool[];
  title?: string;
}

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group bg-zinc-50 border border-zinc-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-zinc-300 transition-all"
          >
            <div className="h-32 bg-gradient-to-br from-zinc-100 to-zinc-200 relative overflow-hidden">
              {tool.thumbnailUrl ? (
                <img 
                  src={tool.thumbnailUrl} 
                  alt={tool.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-400/30 to-orange-400/30" />
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-base font-semibold text-zinc-900 group-hover:text-pink-600 transition-colors line-clamp-1">
                  {tool.title}
                </h3>
                {tool.isPro && (
                  <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5 flex-shrink-0">
                    PRO
                  </span>
                )}
              </div>
              {tool.description && (
                <p className="text-sm text-zinc-600 line-clamp-2">
                  {tool.description}
                </p>
              )}
              {tool.appLabel && (
                <p className="text-xs text-pink-600 font-medium mt-2">
                  {tool.appLabel}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
