"use client";

import { useState, useEffect, type ElementType } from "react";
import type { CloudDashboardEngineConfig, CMSObject } from "@/lib/types/cms";
import { Sparkles, Palette, Video, PenTool, FolderOpen, DollarSign, Brain, Music, TrendingUp, Shirt, Megaphone } from "lucide-react";
import CloudDashboardLayout from "@/components/clouds/CloudDashboardLayout";
import CloudHero from "@/components/clouds/CloudHero";
import CloudPrimaryCards, { PrimaryCardData } from "@/components/clouds/CloudPrimaryCards";
import CloudCategoryTabs, { CategoryTab } from "@/components/clouds/CloudCategoryTabs";
import CloudFeaturedTools, { FeaturedTool } from "@/components/clouds/CloudFeaturedTools";
import CloudRecentFilesRail from "@/components/clouds/CloudRecentFilesRail";
import CloudAppRow from "@/components/clouds/CloudAppRow";
import CloudShortcuts from "@/components/clouds/CloudShortcuts";

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
  "creation-cloud": "from-pink-500 to-pink-600",
  "video-cloud": "from-orange-500 to-amber-500",
  "writing-seo-cloud": "from-blue-500 to-blue-600",
  "file-data-cloud": "from-zinc-500 to-zinc-600",
  "monetization-cloud": "from-amber-500 to-yellow-500",
  "intelligence-cloud": "from-purple-500 to-violet-600",
  "music-performance-cloud": "from-green-500 to-emerald-500",
  "growth-distribution-cloud": "from-rose-500 to-pink-500",
  "shopping-cloud": "from-pink-500 to-rose-500",
  "advertising-cloud": "from-sky-500 to-indigo-500",
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
  "shopping-cloud": Shirt,
  "advertising-cloud": Megaphone,
};

const CLOUD_TABS: Record<string, CategoryTab[]> = {
  "shopping-cloud": [
    { id: "featured", label: "Featured" },
    { id: "style", label: "Style Tools" },
    { id: "ai", label: "AI Tools" },
    { id: "boards", label: "Boards" },
  ],
  "creation-cloud": [
    { id: "featured", label: "Featured" },
    { id: "writing", label: "Writing" },
    { id: "ideas", label: "Ideas" },
    { id: "workflows", label: "Workflows" },
  ],
  "video-cloud": [
    { id: "featured", label: "Featured" },
    { id: "short-form", label: "Short-form" },
    { id: "long-form", label: "Long-form" },
    { id: "hooks", label: "Hooks" },
  ],
  "writing-seo-cloud": [
    { id: "featured", label: "Featured" },
    { id: "seo", label: "SEO" },
    { id: "content", label: "Content" },
    { id: "research", label: "Research" },
  ],
  "file-data-cloud": [
    { id: "featured", label: "Featured" },
    { id: "convert", label: "Convert" },
    { id: "compress", label: "Compress" },
    { id: "edit", label: "Edit" },
  ],
  "monetization-cloud": [
    { id: "featured", label: "Featured" },
    { id: "pricing", label: "Pricing" },
    { id: "sales", label: "Sales" },
    { id: "analytics", label: "Analytics" },
  ],
  "intelligence-cloud": [
    { id: "featured", label: "Featured" },
    { id: "ai-tools", label: "AI Tools" },
    { id: "automation", label: "Automation" },
    { id: "insights", label: "Insights" },
  ],
  "music-performance-cloud": [
    { id: "featured", label: "Featured" },
    { id: "production", label: "Production" },
    { id: "performance", label: "Performance" },
    { id: "distribution", label: "Distribution" },
  ],
  "growth-distribution-cloud": [
    { id: "featured", label: "Featured" },
    { id: "social", label: "Social" },
    { id: "analytics", label: "Analytics" },
    { id: "distribution", label: "Distribution" },
  ],
  "advertising-cloud": [
    { id: "featured", label: "Featured" },
    { id: "ad-copy", label: "Ad Copy" },
    { id: "creatives", label: "Creatives" },
    { id: "analytics", label: "Analytics" },
  ],
};

export default function CloudDashboardEngine({ cms }: CloudDashboardProps) {
  const { hero, featuredProducts, appRow, shortcuts, showRecentFiles } = cms.engine_config;

  const cloudSlug = cms.slug;
  const gradient = CLOUD_GRADIENTS[cloudSlug] || "from-purple-500 to-purple-600";
  const IconComponent = CLOUD_ICONS[cloudSlug] || Sparkles;
  const tabs = CLOUD_TABS[cloudSlug] || [{ id: "featured", label: "Featured" }];

  const [taggedTools, setTaggedTools] = useState<TaggedTool[]>([]);
  const [loadingTools, setLoadingTools] = useState(true);
  const [activeTab, setActiveTab] = useState("featured");

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

  const primaryCards: PrimaryCardData[] = featuredProducts.map((item) => ({
    title: item.title,
    description: item.description,
    primaryLabel: item.primaryCta.label,
    primaryHref: item.primaryCta.href,
    secondaryLabel: item.secondaryCta?.label,
    secondaryHref: item.secondaryCta?.href,
    badge: item.badge,
  }));

  const featuredToolsList: FeaturedTool[] = taggedTools.map((tool) => ({
    slug: tool.slug,
    title: tool.title,
    description: tool.description,
    isPro: tool.featured,
  }));

  return (
    <CloudDashboardLayout
      hero={
        <CloudHero
          title={hero.title}
          subtitle={hero.subtitle}
          badge={cms.data.title}
          proLabel={false}
          showPromptBar={true}
          mode={hero.mode || "image"}
          primaryToolSlug={hero.primaryToolSlug}
          cloudId={cloudSlug}
          primaryCta={{
            label: `Start with ${hero.mode === "image" ? "an image" : hero.mode === "video" ? "a video" : "text"}`,
            href: `/tools/${hero.primaryToolSlug}`,
          }}
          icon={IconComponent}
          gradient={gradient}
        />
      }
      primaryCards={
        primaryCards.length > 0 ? (
          <CloudPrimaryCards cards={primaryCards} />
        ) : null
      }
      tabs={
        <CloudCategoryTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      }
      featured={
        loadingTools ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-zinc-100 rounded-2xl h-48 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <CloudFeaturedTools tools={featuredToolsList} title="" />
        )
      }
      appRow={
        appRow && appRow.length > 0 ? (
          <CloudAppRow apps={appRow} />
        ) : null
      }
      shortcuts={
        shortcuts && shortcuts.length > 0 ? (
          <CloudShortcuts shortcuts={shortcuts} />
        ) : null
      }
      sidebar={
        <CloudRecentFilesRail files={[]} title="Recent files" gradient={gradient} />
      }
    />
  );
}
