"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface BoxData {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  accent_color: string;
}

interface BoxItem {
  id: number;
  label: string;
  description: string | null;
  item_type: string;
  external_url: string | null;
  internal_resource_id: number | null;
  position: number;
  resource_name: string | null;
  resource_url: string | null;
  resource_short_tag: string | null;
}

interface ResourceBoxCardProps {
  box: BoxData;
  items: BoxItem[];
  compact?: boolean;
}

export function ResourceBoxCard({ box, items, compact = false }: ResourceBoxCardProps) {
  const getItemUrl = (item: BoxItem): string => {
    if (item.item_type === "external" && item.external_url) {
      return item.external_url;
    }
    if (item.resource_url) {
      return item.resource_url;
    }
    return "#";
  };

  const isExternal = (item: BoxItem): boolean => {
    if (item.item_type === "external") return true;
    if (item.resource_url?.startsWith("http")) return true;
    return false;
  };

  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-md ${compact ? '' : ''}`}
      style={{ borderTop: `4px solid ${box.accent_color}` }}
    >
      <div className={`${compact ? 'p-4' : 'p-6'}`}>
        <div className={`text-center ${compact ? 'mb-3' : 'mb-4'}`}>
          <p className={`text-stone-400 ${compact ? 'text-xs' : 'text-xs'} uppercase tracking-wider mb-1`}>
            Creator Resource Box
          </p>
          <h1 className={`font-bold text-stone-900 ${compact ? 'text-lg' : 'text-xl'}`}>
            {box.title}
          </h1>
          {box.subtitle && (
            <p className={`text-stone-500 ${compact ? 'text-xs mt-1' : 'text-sm mt-2'}`}>
              {box.subtitle}
            </p>
          )}
        </div>

        <div className={`space-y-${compact ? '2' : '3'}`}>
          {items.map((item) => {
            const url = getItemUrl(item);
            const external = isExternal(item);
            
            const LinkComponent = external ? 'a' : Link;
            const linkProps = external 
              ? { href: url, target: "_blank", rel: "noopener noreferrer" }
              : { href: url };

            return (
              <LinkComponent
                key={item.id}
                {...linkProps}
                className={`block bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-xl ${compact ? 'p-3' : 'p-4'} transition-all hover:shadow-sm group`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-semibold text-stone-900 ${compact ? 'text-sm' : ''}`}>
                        {item.label}
                      </span>
                      {item.resource_short_tag && (
                        <span 
                          className={`px-2 py-0.5 rounded-full text-white ${compact ? 'text-[10px]' : 'text-xs'}`}
                          style={{ backgroundColor: box.accent_color }}
                        >
                          {item.resource_short_tag}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className={`text-stone-500 ${compact ? 'text-xs' : 'text-sm'} mt-0.5 line-clamp-1`}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  {external && (
                    <ExternalLink className={`${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-stone-400 group-hover:text-stone-600 flex-shrink-0 mt-0.5`} />
                  )}
                </div>
              </LinkComponent>
            );
          })}
        </div>

        <div className={`${compact ? 'mt-3 pt-3' : 'mt-5 pt-4'} border-t border-stone-100 text-center`}>
          <p className={`${compact ? 'text-[10px]' : 'text-xs'} text-stone-400`}>
            Powered by{" "}
            <a 
              href="https://vcmsuite.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-700"
            >
              VCM Suite
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
