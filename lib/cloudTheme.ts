import { Sparkles, Palette, Video, PenTool, FolderOpen, DollarSign, Brain, Music, TrendingUp, Shirt, Megaphone, type LucideIcon } from "lucide-react";

export type CloudId =
  | "creation"
  | "video"
  | "writing-seo"
  | "file-data"
  | "monetization"
  | "intelligence"
  | "music-performance"
  | "growth-distribution"
  | "shopping"
  | "advertising";

export type CloudTheme = {
  heroBg: string;
  recentFilesBg: string;
  promptBarBg: string;
  icon: LucideIcon;
  tabs: { id: string; label: string }[];
};

export function resolveCloudId(cmsSlug: string): CloudId | null {
  const normalized = cmsSlug
    .replace(/_/g, "-")
    .replace(/-cloud$/, "");
  
  const validIds: CloudId[] = [
    "creation",
    "video",
    "writing-seo",
    "file-data",
    "monetization",
    "intelligence",
    "music-performance",
    "growth-distribution",
    "shopping",
    "advertising",
  ];
  
  return validIds.includes(normalized as CloudId) ? (normalized as CloudId) : null;
}

export const CLOUD_THEMES: Record<CloudId, CloudTheme> = {
  "creation": {
    heroBg: "from-pink-500 to-pink-600",
    recentFilesBg: "from-pink-500 to-pink-600",
    promptBarBg: "bg-white/10 border-white/20",
    icon: Palette,
    tabs: [
      { id: "featured", label: "Featured" },
      { id: "writing", label: "Writing" },
      { id: "ideas", label: "Ideas" },
      { id: "workflows", label: "Workflows" },
    ],
  },
  "video": {
    heroBg: "from-orange-500 to-amber-500",
    recentFilesBg: "from-orange-500 to-amber-500",
    promptBarBg: "bg-white/10 border-white/20",
    icon: Video,
    tabs: [
      { id: "featured", label: "Featured" },
      { id: "short-form", label: "Short-form" },
      { id: "long-form", label: "Long-form" },
      { id: "hooks", label: "Hooks" },
    ],
  },
  "writing-seo": {
    heroBg: "from-blue-500 to-blue-600",
    recentFilesBg: "from-blue-500 to-blue-600",
    promptBarBg: "bg-white/10 border-white/20",
    icon: PenTool,
    tabs: [
      { id: "featured", label: "Featured" },
      { id: "seo", label: "SEO" },
      { id: "content", label: "Content" },
      { id: "research", label: "Research" },
    ],
  },
  "file-data": {
    heroBg: "from-zinc-500 to-zinc-600",
    recentFilesBg: "from-zinc-500 to-zinc-600",
    promptBarBg: "bg-white/10 border-white/20",
    icon: FolderOpen,
    tabs: [
      { id: "featured", label: "Featured" },
      { id: "convert", label: "Convert" },
      { id: "compress", label: "Compress" },
      { id: "edit", label: "Edit" },
    ],
  },
  "monetization": {
    heroBg: "from-amber-500 to-yellow-500",
    recentFilesBg: "from-amber-500 to-yellow-500",
    promptBarBg: "bg-white/10 border-white/20",
    icon: DollarSign,
    tabs: [
      { id: "featured", label: "Featured" },
      { id: "pricing", label: "Pricing" },
      { id: "sales", label: "Sales" },
      { id: "analytics", label: "Analytics" },
    ],
  },
  "intelligence": {
    heroBg: "from-purple-500 to-violet-600",
    recentFilesBg: "from-purple-500 to-violet-600",
    promptBarBg: "bg-white/10 border-white/20",
    icon: Brain,
    tabs: [
      { id: "featured", label: "Featured" },
      { id: "ai-tools", label: "AI Tools" },
      { id: "automation", label: "Automation" },
      { id: "insights", label: "Insights" },
    ],
  },
  "music-performance": {
    heroBg: "from-green-500 to-emerald-500",
    recentFilesBg: "from-green-500 to-emerald-500",
    promptBarBg: "bg-white/10 border-white/20",
    icon: Music,
    tabs: [
      { id: "featured", label: "Featured" },
      { id: "production", label: "Production" },
      { id: "performance", label: "Performance" },
      { id: "distribution", label: "Distribution" },
    ],
  },
  "growth-distribution": {
    heroBg: "from-rose-500 to-pink-500",
    recentFilesBg: "from-rose-500 to-pink-500",
    promptBarBg: "bg-white/10 border-white/20",
    icon: TrendingUp,
    tabs: [
      { id: "featured", label: "Featured" },
      { id: "social", label: "Social" },
      { id: "analytics", label: "Analytics" },
      { id: "distribution", label: "Distribution" },
    ],
  },
  "shopping": {
    heroBg: "from-pink-500 to-rose-500",
    recentFilesBg: "from-pink-500 to-rose-500",
    promptBarBg: "bg-white/10 border-white/20",
    icon: Shirt,
    tabs: [
      { id: "featured", label: "Featured" },
      { id: "style", label: "Style Tools" },
      { id: "ai", label: "AI Tools" },
      { id: "boards", label: "Boards" },
    ],
  },
  "advertising": {
    heroBg: "from-sky-500 to-indigo-500",
    recentFilesBg: "from-sky-500 to-indigo-500",
    promptBarBg: "bg-white/10 border-white/20",
    icon: Megaphone,
    tabs: [
      { id: "featured", label: "Featured" },
      { id: "ad-copy", label: "Ad Copy" },
      { id: "creatives", label: "Creatives" },
      { id: "analytics", label: "Analytics" },
    ],
  },
};

export const DEFAULT_THEME: CloudTheme = {
  heroBg: "from-purple-500 to-purple-600",
  recentFilesBg: "from-purple-500 to-purple-600",
  promptBarBg: "bg-white/10 border-white/20",
  icon: Sparkles,
  tabs: [{ id: "featured", label: "Featured" }],
};

export function getCloudTheme(cmsSlug: string): CloudTheme {
  const cloudId = resolveCloudId(cmsSlug);
  return cloudId ? CLOUD_THEMES[cloudId] : DEFAULT_THEME;
}

export function getAllGradientClasses(): string[] {
  const classes = new Set<string>();
  
  Object.values(CLOUD_THEMES).forEach((theme) => {
    theme.heroBg.split(" ").forEach((c) => classes.add(c));
    theme.recentFilesBg.split(" ").forEach((c) => classes.add(c));
    theme.promptBarBg.split(" ").forEach((c) => classes.add(c));
  });
  
  DEFAULT_THEME.heroBg.split(" ").forEach((c) => classes.add(c));
  DEFAULT_THEME.recentFilesBg.split(" ").forEach((c) => classes.add(c));
  DEFAULT_THEME.promptBarBg.split(" ").forEach((c) => classes.add(c));
  
  return Array.from(classes);
}
