"use client";

import type { CloudDashboardEngineConfig, CMSObject } from "@/lib/types/cms";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock, Zap } from "lucide-react";

type CloudDashboardProps = {
  cms: CMSObject & { engine_config: CloudDashboardEngineConfig };
};

export default function CloudDashboardEngine({ cms }: CloudDashboardProps) {
  const { hero, featuredProducts, appRow, shortcuts, showRecentFiles } =
    cms.engine_config;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
        <section className="rounded-2xl border border-gray-200 p-8 bg-gradient-to-br from-white via-white to-purple-50 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">
              {cms.data.title}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{hero.title}</h1>
          {hero.subtitle && (
            <p className="text-gray-600 mb-6 max-w-xl">
              {hero.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/tools/${hero.primaryToolSlug}`}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Start with {hero.mode === "image" ? "an image" : hero.mode === "video" ? "a video" : "text"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {hero.showModeSwitcher && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <button className={`px-3 py-1.5 rounded-full border ${hero.mode === "image" ? "bg-gray-100 border-gray-300" : "border-transparent hover:bg-gray-50"}`}>
                  Image
                </button>
                <button className={`px-3 py-1.5 rounded-full border ${hero.mode === "video" ? "bg-gray-100 border-gray-300" : "border-transparent hover:bg-gray-50"}`}>
                  Video
                </button>
                <button className={`px-3 py-1.5 rounded-full border ${hero.mode === "text" ? "bg-gray-100 border-gray-300" : "border-transparent hover:bg-gray-50"}`}>
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
