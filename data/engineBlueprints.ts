import {
  EngineBlueprint,
  registerBlueprint,
  CartesianCombo,
} from "@/lib/engineBlueprint";

export const THUMBNAIL_ANALYZER_BLUEPRINT: EngineBlueprint = {
  id: "thumbnail-analyzer-expansion",
  engineId: "ai-analysis",
  name: "Thumbnail Analyzer Expansion",
  description: "Platform-specific thumbnail analyzers using AI",
  segment: "creator",
  
  slugPattern: {
    template: "{platform}-thumbnail-analyzer",
    transform: (parts) => `${parts.platform}-thumbnail-analyzer`,
  },
  titlePattern: "{platform_label} Thumbnail Analyzer",
  keywordPattern: "{platform} thumbnail analyzer",
  descriptionPattern: "Analyze your {platform_label} thumbnails for better CTR with AI",
  
  dimensions: [
    {
      id: "platform",
      label: "Platform",
      values: [
        { id: "youtube", label: "YouTube", variations: ["youtube", "yt"] },
        { id: "instagram", label: "Instagram", variations: ["instagram", "ig", "insta"] },
        { id: "tiktok", label: "TikTok", variations: ["tiktok"] },
        { id: "linkedin", label: "LinkedIn", variations: ["linkedin"] },
        { id: "twitter", label: "Twitter/X", variations: ["twitter", "x"] },
        { id: "facebook", label: "Facebook", variations: ["facebook", "fb"] },
        { id: "pinterest", label: "Pinterest", variations: ["pinterest"] },
      ],
    },
  ],
  
  clusterResolver: (combo: CartesianCombo) => {
    const platform = combo.dimensions.platform?.id;
    const platformClusters: Record<string, string> = {
      youtube: "youtube-thumbnails",
      instagram: "instagram-content",
      tiktok: "tiktok-content",
      linkedin: "linkedin-content",
      twitter: "twitter-content",
      facebook: "facebook-content",
      pinterest: "pinterest-content",
    };
    return platformClusters[platform] || "ai-content-tools";
  },
  
  linkRules: {
    siblingsPerTool: 3,
    articlesPerTool: 2,
    pillarSlug: "ai-thumbnail-analysis",
    defaultCTAs: {
      quickCTA: "ai-thumbnail-coach",
      bottomCTA: "ad-copy-analyzer",
    },
  },
  
  defaults: {
    priority: "secondary",
    isIndexed: false,
    inDirectory: false,
    searchIntent: "action",
  },
  
  inputType: "image",
  outputType: "analysis",
};

export const CONTENT_ANALYZER_BLUEPRINT: EngineBlueprint = {
  id: "content-analyzer-expansion",
  engineId: "ai-analysis",
  name: "Content Analyzer Expansion",
  description: "Platform × Content Type analyzers",
  segment: "creator",
  
  slugPattern: {
    template: "{platform}-{contentType}-analyzer",
  },
  titlePattern: "{platform_label} {contentType_label} Analyzer",
  keywordPattern: "{platform} {contentType} analyzer",
  descriptionPattern: "Analyze your {platform_label} {contentType_label} for better engagement",
  
  dimensions: [
    {
      id: "platform",
      label: "Platform",
      values: [
        { id: "youtube", label: "YouTube" },
        { id: "instagram", label: "Instagram" },
        { id: "tiktok", label: "TikTok" },
        { id: "linkedin", label: "LinkedIn" },
        { id: "twitter", label: "Twitter/X" },
      ],
    },
    {
      id: "contentType",
      label: "Content Type",
      values: [
        { id: "caption", label: "Caption" },
        { id: "bio", label: "Bio" },
        { id: "hashtags", label: "Hashtags" },
        { id: "hook", label: "Hook" },
        { id: "cta", label: "CTA" },
      ],
    },
  ],
  
  clusterResolver: (combo: CartesianCombo) => {
    return "ai-content-tools";
  },
  
  linkRules: {
    siblingsPerTool: 3,
    articlesPerTool: 2,
    defaultCTAs: {
      quickCTA: "ad-copy-analyzer",
      bottomCTA: "ai-humanizer-free",
    },
  },
  
  defaults: {
    priority: "experimental",
    isIndexed: false,
    inDirectory: false,
    searchIntent: "action",
  },
  
  inputType: "text",
  outputType: "analysis",
};

export const IMAGE_RESIZER_NICHE_BLUEPRINT: EngineBlueprint = {
  id: "image-resizer-niche-expansion",
  engineId: "platform-resizer",
  name: "Image Resizer Niche Expansion",
  description: "Platform × Niche image resizers for specific creator audiences",
  segment: "social",
  
  slugPattern: {
    template: "{platform}-{niche}-image-resizer",
  },
  titlePattern: "{platform_label} {niche_label} Image Resizer",
  keywordPattern: "{platform} {niche} image size",
  descriptionPattern: "Resize images for {niche_label} content on {platform_label}",
  
  dimensions: [
    {
      id: "platform",
      label: "Platform",
      values: [
        { id: "instagram", label: "Instagram" },
        { id: "youtube", label: "YouTube" },
        { id: "tiktok", label: "TikTok" },
        { id: "pinterest", label: "Pinterest" },
      ],
    },
    {
      id: "niche",
      label: "Niche",
      values: [
        { id: "fitness", label: "Fitness" },
        { id: "food", label: "Food" },
        { id: "fashion", label: "Fashion" },
        { id: "travel", label: "Travel" },
        { id: "beauty", label: "Beauty" },
        { id: "gaming", label: "Gaming" },
        { id: "tech", label: "Tech" },
        { id: "lifestyle", label: "Lifestyle" },
      ],
    },
  ],
  
  clusterResolver: (combo: CartesianCombo) => {
    return "social-media-image-sizes";
  },
  
  linkRules: {
    siblingsPerTool: 3,
    articlesPerTool: 2,
    pillarSlug: "social-media-image-sizes",
    defaultCTAs: {
      quickCTA: "instagram-resizer",
      bottomCTA: "image-compressor",
    },
  },
  
  defaults: {
    priority: "experimental",
    isIndexed: false,
    inDirectory: false,
    searchIntent: "action",
  },
  
  inputType: "image",
  outputType: "image",
};

export const YOUTUBE_METRICS_BLUEPRINT: EngineBlueprint = {
  id: "youtube-metrics-engine",
  engineId: "calculator",
  name: "YouTube Metrics Engine",
  description: "Generates YouTube metric calculators for CTR, CPM, retention, and more across longform and Shorts.",
  segment: "creator",

  slugPattern: {
    template: "youtube-{metric}-{content_type}-calculator",
  },
  titlePattern: "YouTube {metric_label} {content_type_label} Calculator",
  keywordPattern: "youtube {metric} {content_type} calculator",
  descriptionPattern: "Calculate your YouTube {metric_label} for {content_type_label} videos and understand how your channel is performing.",

  dimensions: [
    {
      id: "metric",
      label: "Metric",
      values: [
        { id: "ctr", label: "CTR" },
        { id: "cpm", label: "CPM" },
        { id: "retention", label: "Retention" },
        { id: "avg-view-duration", label: "Average View Duration" },
        { id: "clicks-per-impression", label: "Clicks per Impression" },
      ],
    },
    {
      id: "content_type",
      label: "Content Type",
      values: [
        { id: "longform", label: "Longform" },
        { id: "shorts", label: "Shorts" },
      ],
    },
  ],

  clusterResolver: (combo: CartesianCombo) => {
    return "youtube-metrics";
  },

  linkRules: {
    siblingsPerTool: 3,
    articlesPerTool: 2,
    pillarSlug: "youtube-metrics",
    defaultCTAs: {
      quickCTA: "youtube-ctr-calculator",
      bottomCTA: "youtube-analytics-guide",
    },
  },

  defaults: {
    priority: "experimental",
    isIndexed: false,
    inDirectory: false,
    searchIntent: "action",
  },

  inputType: "number",
  outputType: "display",
};

export const CALCULATOR_NICHE_BLUEPRINT: EngineBlueprint = {
  id: "calculator-niche-expansion",
  engineId: "calculator",
  name: "Calculator Niche Expansion",
  description: "Niche-specific calculator variations",
  segment: "mbb",
  
  slugPattern: {
    template: "{calcType}-calculator-{variant}",
    transform: (parts) => `${parts.calcType}-calculator-${parts.variant}`,
  },
  titlePattern: "{calcType_label} Calculator for {variant_label}",
  keywordPattern: "{calcType} calculator for {variant}",
  descriptionPattern: "Calculate {calcType_label} specifically for {variant_label}",
  
  dimensions: [
    {
      id: "calcType",
      label: "Calculator Type",
      values: [
        { id: "calorie", label: "Calorie" },
        { id: "macro", label: "Macro" },
        { id: "protein", label: "Protein" },
      ],
    },
    {
      id: "variant",
      label: "Variant",
      values: [
        { id: "weight-loss", label: "Weight Loss" },
        { id: "muscle-gain", label: "Muscle Gain" },
        { id: "maintenance", label: "Maintenance" },
        { id: "athletes", label: "Athletes" },
        { id: "beginners", label: "Beginners" },
        { id: "women", label: "Women" },
        { id: "men", label: "Men" },
        { id: "seniors", label: "Seniors" },
      ],
    },
  ],
  
  clusterResolver: (combo: CartesianCombo) => {
    return "health-fitness-calculators";
  },
  
  linkRules: {
    siblingsPerTool: 3,
    articlesPerTool: 2,
    pillarSlug: "health-fitness-calculators",
    defaultCTAs: {
      quickCTA: "calorie-deficit-calculator",
      bottomCTA: "tdee-calculator",
    },
  },
  
  defaults: {
    priority: "experimental",
    isIndexed: false,
    inDirectory: false,
    searchIntent: "action",
  },
  
  inputType: "number",
  outputType: "display",
};

export function initializeBlueprints(): void {
  registerBlueprint(THUMBNAIL_ANALYZER_BLUEPRINT);
  registerBlueprint(CONTENT_ANALYZER_BLUEPRINT);
  registerBlueprint(IMAGE_RESIZER_NICHE_BLUEPRINT);
  registerBlueprint(CALCULATOR_NICHE_BLUEPRINT);
  registerBlueprint(YOUTUBE_METRICS_BLUEPRINT);
}

export const ALL_BLUEPRINTS = [
  THUMBNAIL_ANALYZER_BLUEPRINT,
  CONTENT_ANALYZER_BLUEPRINT,
  IMAGE_RESIZER_NICHE_BLUEPRINT,
  CALCULATOR_NICHE_BLUEPRINT,
  YOUTUBE_METRICS_BLUEPRINT,
];
