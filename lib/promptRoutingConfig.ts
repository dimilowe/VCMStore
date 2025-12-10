export type Mode = "image" | "video" | "text";

type KeywordRule = {
  keywords: string[];
  toolSlug: string;
  modes?: Mode[];
};

type CloudRoutingConfig = {
  cloudId: string;
  primaryTool: string;
  modeDefaults: Partial<Record<Mode, string>>;
  keywordRules: KeywordRule[];
};

export const PROMPT_ROUTING_CONFIG: CloudRoutingConfig[] = [
  {
    cloudId: "creation-cloud",
    primaryTool: "instagram-post-resizer",
    modeDefaults: {
      image: "instagram-post-resizer",
      video: "tiktok-video-resizer",
      text: "instagram-post-resizer",
    },
    keywordRules: [
      {
        keywords: ["thumbnail", "youtube thumbnail", "yt thumb"],
        toolSlug: "youtube-thumbnail-resizer",
        modes: ["image"],
      },
      {
        keywords: ["instagram post", "ig post", "square post"],
        toolSlug: "instagram-post-resizer",
        modes: ["image"],
      },
      {
        keywords: ["instagram story", "ig story", "story size"],
        toolSlug: "instagram-story-resizer",
        modes: ["image"],
      },
      {
        keywords: ["tiktok", "tik tok", "vertical video"],
        toolSlug: "tiktok-video-resizer",
        modes: ["video", "image"],
      },
      {
        keywords: ["linkedin", "linkedin banner"],
        toolSlug: "linkedin-banner-resizer",
        modes: ["image"],
      },
      {
        keywords: ["twitter", "x header", "twitter header"],
        toolSlug: "twitter-header-resizer",
        modes: ["image"],
      },
    ],
  },
  {
    cloudId: "video-cloud",
    primaryTool: "tiktok-video-resizer",
    modeDefaults: {
      image: "youtube-thumbnail-resizer",
      video: "tiktok-video-resizer",
      text: "tiktok-video-resizer",
    },
    keywordRules: [
      {
        keywords: ["tiktok", "tik tok", "vertical video", "short"],
        toolSlug: "tiktok-video-resizer",
        modes: ["video", "image"],
      },
      {
        keywords: ["thumbnail", "youtube thumbnail"],
        toolSlug: "youtube-thumbnail-resizer",
        modes: ["image"],
      },
    ],
  },
  {
    cloudId: "writing-seo-cloud",
    primaryTool: "reach-grabber-tool",
    modeDefaults: {
      image: "reach-grabber-tool",
      video: "reach-grabber-tool",
      text: "reach-grabber-tool",
    },
    keywordRules: [
      {
        keywords: ["reach", "grabber", "hook", "headline", "title"],
        toolSlug: "reach-grabber-tool",
        modes: ["text", "image"],
      },
    ],
  },
  {
    cloudId: "file-data-cloud",
    primaryTool: "zip-file-compression",
    modeDefaults: {
      image: "zip-file-compression",
      video: "zip-file-compression",
      text: "zip-file-compression",
    },
    keywordRules: [
      {
        keywords: ["zip", "compress", "archive", "folder"],
        toolSlug: "zip-file-compression",
        modes: ["image", "video", "text"],
      },
      {
        keywords: ["password", "protect", "encrypted"],
        toolSlug: "zip-file-password-protection",
        modes: ["image", "video", "text"],
      },
    ],
  },
  {
    cloudId: "music-performance-cloud",
    primaryTool: "reach-grabber-tool",
    modeDefaults: {
      image: "reach-grabber-tool",
      video: "reach-grabber-tool",
      text: "reach-grabber-tool",
    },
    keywordRules: [],
  },
  {
    cloudId: "growth-distribution-cloud",
    primaryTool: "reach-grabber-tool",
    modeDefaults: {
      image: "reach-grabber-tool",
      video: "reach-grabber-tool",
      text: "reach-grabber-tool",
    },
    keywordRules: [
      {
        keywords: ["reach", "grabber", "hook", "headline"],
        toolSlug: "reach-grabber-tool",
        modes: ["text", "image"],
      },
    ],
  },
  {
    cloudId: "monetization-cloud",
    primaryTool: "reach-grabber-tool",
    modeDefaults: {
      image: "reach-grabber-tool",
      video: "reach-grabber-tool",
      text: "reach-grabber-tool",
    },
    keywordRules: [],
  },
  {
    cloudId: "intelligence-cloud",
    primaryTool: "reach-grabber-tool",
    modeDefaults: {
      image: "reach-grabber-tool",
      video: "reach-grabber-tool",
      text: "reach-grabber-tool",
    },
    keywordRules: [],
  },
  {
    cloudId: "shopping-cloud",
    primaryTool: "outfit-ideas-ai",
    modeDefaults: {
      image: "outfit-ideas-ai",
      video: "outfit-ideas-ai",
      text: "outfit-ideas-ai",
    },
    keywordRules: [
      {
        keywords: ["outfit", "look", "fit", "style", "what to wear"],
        toolSlug: "outfit-ideas-ai",
        modes: ["image", "text"],
      },
      {
        keywords: ["capsule", "wardrobe", "closet", "minimal"],
        toolSlug: "capsule-wardrobe-outfit-finder",
        modes: ["image"],
      },
      {
        keywords: ["date", "date night", "romantic", "dinner"],
        toolSlug: "date-night-outfit-generator",
        modes: ["image"],
      },
      {
        keywords: ["gym", "workout", "fitness", "athletic", "exercise"],
        toolSlug: "gym-outfit-generator",
        modes: ["image"],
      },
      {
        keywords: ["office", "work", "professional", "business", "meeting"],
        toolSlug: "office-outfit-generator",
        modes: ["image"],
      },
      {
        keywords: ["party", "club", "night out", "celebration"],
        toolSlug: "party-outfit-generator",
        modes: ["image"],
      },
      {
        keywords: ["streetwear", "street style", "urban", "casual"],
        toolSlug: "streetwear-outfit-finder",
        modes: ["image"],
      },
      {
        keywords: ["summer", "beach", "vacation", "hot", "warm"],
        toolSlug: "summer-outfit-generator",
        modes: ["image"],
      },
      {
        keywords: ["winter", "cold", "snow", "cozy", "layered"],
        toolSlug: "winter-outfit-generator",
        modes: ["image"],
      },
      {
        keywords: ["wedding", "guest", "formal", "ceremony"],
        toolSlug: "wedding-guest-outfit-generator",
        modes: ["image"],
      },
      {
        keywords: ["aesthetic", "vibe", "aesthetic outfit"],
        toolSlug: "aesthetic-outfit-generator",
        modes: ["image"],
      },
      {
        keywords: ["vacation", "travel", "trip", "holiday"],
        toolSlug: "vacation-outfit-generator",
        modes: ["image"],
      },
      {
        keywords: ["price", "track price", "deal", "sale", "amazon"],
        toolSlug: "track-price",
        modes: ["text"],
      },
    ],
  },
  {
    cloudId: "advertising-cloud",
    primaryTool: "reach-grabber-tool",
    modeDefaults: {
      image: "youtube-thumbnail-resizer",
      video: "tiktok-video-resizer",
      text: "reach-grabber-tool",
    },
    keywordRules: [
      {
        keywords: ["youtube", "thumbnail", "video title"],
        toolSlug: "youtube-thumbnail-resizer",
        modes: ["image"],
      },
      {
        keywords: ["reach", "grabber", "hook", "headline", "ad copy"],
        toolSlug: "reach-grabber-tool",
        modes: ["text"],
      },
    ],
  },
];
