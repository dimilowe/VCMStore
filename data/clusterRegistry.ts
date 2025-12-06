import type { EngineType } from "@/engines";

export interface TopicCluster {
  id: string;
  pillarSlug: string;
  pillarTitle: string;
  pillarDescription: string;
  engineId: EngineType;
  toolSlugs: string[];
  articleSlugs: string[];
  primaryKeyword: string;
  relatedKeywords: string[];
}

export const CLUSTER_REGISTRY: Record<string, TopicCluster> = {
  "social-media-image-sizes": {
    id: "social-media-image-sizes",
    pillarSlug: "social-media-image-sizes",
    pillarTitle: "Complete Guide to Social Media Image Sizes (2024)",
    pillarDescription: "The definitive resource for every social media platform's image dimensions, aspect ratios, and best practices.",
    engineId: "platform-resizer",
    toolSlugs: [
      "instagram-post-resizer",
      "instagram-story-resizer",
      "tiktok-video-resizer",
      "youtube-thumbnail-resizer",
      "twitter-header-resizer",
      "linkedin-banner-resizer"
    ],
    articleSlugs: [
      "instagram-post-dimensions-guide",
      "instagram-story-dimensions-guide",
      "youtube-thumbnail-dimensions-guide",
      "twitter-header-dimensions-guide",
      "linkedin-banner-dimensions-guide",
      "tiktok-cover-dimensions-guide"
    ],
    primaryKeyword: "social media image sizes",
    relatedKeywords: ["image dimensions", "aspect ratio", "resize for social media", "photo dimensions"]
  },
  "health-fitness-calculators": {
    id: "health-fitness-calculators",
    pillarSlug: "health-fitness-calculators",
    pillarTitle: "Free Health & Fitness Calculators for Weight Loss",
    pillarDescription: "Calculate calories, BMI, and workout metrics to reach your health goals.",
    engineId: "calculator",
    toolSlugs: [
      "calorie-deficit-calculator",
      "calorie-counter-bmi",
      "calorie-counter-treadmill",
      "calorie-counter-walking",
      "calorie-counter-steps",
      "calorie-counter-maintenance",
      "calorie-counter-free",
      "calorie-counter-best"
    ],
    articleSlugs: [
      "steps-vs-calories-walking",
      "walking-for-fat-loss",
      "what-are-maintenance-calories",
      "maintenance-vs-deficit-vs-surplus"
    ],
    primaryKeyword: "calorie calculator",
    relatedKeywords: ["weight loss calculator", "TDEE calculator", "calorie deficit", "BMI calculator"]
  },
  "financial-calculators": {
    id: "financial-calculators",
    pillarSlug: "financial-calculators",
    pillarTitle: "Free Financial Calculators for Smart Money Decisions",
    pillarDescription: "Calculate retirement savings, mortgage payments, and investment growth projections.",
    engineId: "calculator",
    toolSlugs: [
      "401k-retirement-calculator",
      "loan-estimator-home",
      "ups-shipping-cost",
      "estimator-for-car-repair"
    ],
    articleSlugs: [
      "401k-vs-ira-retirement",
      "how-401k-compound-growth-works",
      "mortgage-types-explained",
      "home-loan-basics",
      "ups-ground-vs-air",
      "ups-shipping-rates-explained",
      "common-car-repair-costs",
      "how-car-repairs-are-priced"
    ],
    primaryKeyword: "retirement calculator",
    relatedKeywords: ["401k calculator", "mortgage calculator", "compound interest", "savings calculator"]
  },
  "ai-content-tools": {
    id: "ai-content-tools",
    pillarSlug: "ai-content-tools",
    pillarTitle: "Free AI Tools for Content Creators",
    pillarDescription: "AI-powered tools to analyze, generate, and optimize your content.",
    engineId: "ai-analysis",
    toolSlugs: [
      "ai-thumbnail-coach",
      "ad-copy-analyzer",
      "internal-link-seo-audit",
      "reach-grabber-tool",
      "summarizer",
      "ai-humanizer-free"
    ],
    articleSlugs: [
      "niche-meaning-the-modern-definition-real-examples-and-why-niche-zero-is-the-future-2026-guide",
      "niche-zero-why-the-era-of-niching-down-is-officially-over",
      "internal-link-in-seo-complete-guide"
    ],
    primaryKeyword: "ai content tools",
    relatedKeywords: ["AI writing tools", "content analyzer", "thumbnail analyzer", "SEO tools"]
  },
  "image-tools": {
    id: "image-tools",
    pillarSlug: "image-tools",
    pillarTitle: "Free Image Tools: Compress, Convert & Edit",
    pillarDescription: "Online tools to compress images, convert formats, and edit photos without software.",
    engineId: "image-compress",
    toolSlugs: [
      "image-compressor",
      "gif-compressor",
      "heic-to-jpg",
      "gif-maker"
    ],
    articleSlugs: [],
    primaryKeyword: "image compressor",
    relatedKeywords: ["compress image online", "reduce image size", "HEIC converter", "GIF maker"]
  },
  "creator-inspiration": {
    id: "creator-inspiration",
    pillarSlug: "creator-inspiration",
    pillarTitle: "Daily Inspiration for Content Creators",
    pillarDescription: "Affirmations, horoscopes, and motivational content for creative entrepreneurs.",
    engineId: "standalone",
    toolSlugs: [
      "affirmation-about-self-love",
      "horoscope-of-the-day",
      "visualization",
      "emoji-combos"
    ],
    articleSlugs: [
      "famous-quotes-for-creators",
      "how-makers-use-quotes"
    ],
    primaryKeyword: "daily affirmations",
    relatedKeywords: ["motivation for creators", "positive affirmations", "creator mindset"]
  }
};

export function getClusterById(id: string): TopicCluster | undefined {
  return CLUSTER_REGISTRY[id];
}

export function getClusterByEngine(engineId: EngineType): TopicCluster[] {
  return Object.values(CLUSTER_REGISTRY).filter(c => c.engineId === engineId);
}

export function getClusterByToolSlug(toolSlug: string): TopicCluster | undefined {
  return Object.values(CLUSTER_REGISTRY).find(c => c.toolSlugs.includes(toolSlug));
}

export function getClusterByArticleSlug(articleSlug: string): TopicCluster | undefined {
  return Object.values(CLUSTER_REGISTRY).find(c => c.articleSlugs.includes(articleSlug));
}

export function getRelatedToolsFromCluster(toolSlug: string, limit: number = 3): string[] {
  const cluster = getClusterByToolSlug(toolSlug);
  if (!cluster) return [];
  return cluster.toolSlugs.filter(s => s !== toolSlug).slice(0, limit);
}

export function getRelatedArticlesFromCluster(toolSlug: string, limit: number = 2): string[] {
  const cluster = getClusterByToolSlug(toolSlug);
  if (!cluster) return [];
  return cluster.articleSlugs.slice(0, limit);
}
