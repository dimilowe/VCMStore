"use client";

import { useState, useEffect, type ElementType } from "react";
import type { CloudDashboardEngineConfig, CMSObject } from "@/lib/types/cms";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock, Zap, Palette, Video, PenTool, FolderOpen, DollarSign, Brain, Music, TrendingUp, Wrench } from "lucide-react";

type CloudDashboardProps = {
  cms: CMSObject & { engine_config: CloudDashboardEngineConfig };
};

type TaggedTool = {
  slug: string;
  title: string;
  description: string;
  featured: boolean;
  segment?: string;
};

const CLOUD_GRADIENTS: Record<string, string> = {
  "creation-cloud": "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
  "video-cloud": "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
  "writing-seo-cloud": "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
  "file-data-cloud": "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)",
  "monetization-cloud": "linear-gradient(135deg, #eab308 0%, #f59e0b 100%)",
  "intelligence-cloud": "linear-gradient(135deg, #a855f7 0%, #c084fc 100%)",
  "music-performance-cloud": "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
  "growth-distribution-cloud": "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)",
};

const CLOUD_ICONS: Record<string, ElementType> = {
  "creation-cloud": Palette,
  "video-cloud": Video,
  "writing-seo-cloud": PenTool,
  "file-data-cloud": FolderOpen,
  "monetization-cloud": DollarSign,
  "intelligence-cloud": Brain,
  "music-performance-cloud": Music,
  "growth-distribution-cloud": TrendingUp,
};

export default function CloudDashboardEngine({ cms }: CloudDashboardProps) {
  const { hero, featuredProducts, appRow, shortcuts, showRecentFiles } =
    cms.engine_config;

  const cloudSlug = cms.slug;
  const gradient = CLOUD_GRADIENTS[cloudSlug] || "from-purple-500 to-purple-600";
  const IconComponent = CLOUD_ICONS[cloudSlug] || Sparkles;

  const [taggedTools, setTaggedTools] = useState<TaggedTool[]>([]);
  const [loadingTools, setLoadingTools] = useState(true);

  useEffect(() => {
    async function fetchTaggedTools() {
      try {
        const res = await fetch(`/api/clouds/${cloudSlug}/tools`);
        if (res.ok) {
          const data = await res.json();
          setTaggedTools(data.tools || []);
        }
      } catch (error) {
        console.error("Failed to fetch tagged tools:", error);
      } finally {
        setLoadingTools(false);
      }
    }
    fetchTaggedTools();
  }, [cloudSlug]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <section className="rounded-2xl p-8 text-white shadow-lg" style={{ background: gradient }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <IconComponent className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium uppercase tracking-wide">
              {cms.data.title}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{hero.title}</h1>
          {hero.subtitle && (
            <p className="text-white/90 mb-6 max-w-xl text-lg">
              {hero.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/tools/${hero.primaryToolSlug}`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow-sm"
            >
              Start with {hero.mode === "image" ? "an image" : hero.mode === "video" ? "a video" : "text"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {hero.showModeSwitcher && (
              <div className="flex items-center gap-2 text-xs">
                <button className={`px-3 py-1.5 rounded-full ${hero.mode === "image" ? "bg-white/30" : "bg-white/10 hover:bg-white/20"}`}>
                  Image
                </button>
                <button className={`px-3 py-1.5 rounded-full ${hero.mode === "video" ? "bg-white/30" : "bg-white/10 hover:bg-white/20"}`}>
                  Video
                </button>
                <button className={`px-3 py-1.5 rounded-full ${hero.mode === "text" ? "bg-white/30" : "bg-white/10 hover:bg-white/20"}`}>
                  Text
                </button>
              </div>
            )}
          </div>
        </section>

        {featuredProducts.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Featured
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {featuredProducts.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-200 p-5 bg-white flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base font-semibold text-gray-900">{item.title}</span>
                      {item.badge && (
                        <span className={`text-[10px] uppercase tracking-wide rounded-full px-2 py-0.5 font-medium ${
                          item.badge === "Pro" ? "bg-purple-100 text-purple-700" :
                          item.badge === "New" ? "bg-green-100 text-green-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={item.primaryCta.href}
                      className="inline-flex items-center rounded-full px-4 py-2 text-xs font-medium bg-gray-900 text-white hover:bg-gray-800 transition-colors"
                    >
                      {item.primaryCta.label}
                    </Link>
                    {item.secondaryCta && (
                      <Link
                        href={item.secondaryCta.href}
                        className="inline-flex items-center rounded-full px-4 py-2 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        {item.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {appRow.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Apps in this cloud</h2>
            <div className="flex flex-wrap gap-2">
              {appRow.map((app) => (
                <Link
                  key={app.tool_slug}
                  href={`/tools/${app.tool_slug}`}
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                  {app.tool_slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </section>
        )}

        {!loadingTools && taggedTools.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-gray-500" />
              Tools in this cloud
            </h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {taggedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="rounded-xl border border-gray-200 p-4 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all group"
                >
                  <div className="text-sm font-medium text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                    {tool.title}
                  </div>
                  {tool.description && (
                    <div className="text-xs text-gray-500 line-clamp-2">
                      {tool.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {shortcuts.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick shortcuts</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {shortcuts.map((shortcut, idx) => (
                <Link
                  key={idx}
                  href={`/tools/${shortcut.target_tool_slug}${
                    shortcut.preset_key
                      ? `?preset=${encodeURIComponent(shortcut.preset_key)}`
                      : ""
                  }`}
                  className="rounded-xl border border-gray-200 p-4 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all group"
                >
                  <div className="text-sm font-medium text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                    {shortcut.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {shortcut.description}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {showRecentFiles && (
          <section>
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              Recent files
            </h2>
            <div className="rounded-xl border border-dashed border-gray-300 p-8 bg-gray-50 text-center">
              <p className="text-sm text-gray-500">
                Your recent creations will appear here once you start using the tools.
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
