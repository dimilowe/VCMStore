import type { EngineType } from "@/engines";

export type SearchIntent = "informational" | "action" | "transactional";

export interface Keyword {
  id: string;
  keyword: string;
  engineId: EngineType;
  searchIntent: SearchIntent;
  volumeEstimate?: "low" | "medium" | "high" | "very-high";
  difficultyEstimate?: "easy" | "medium" | "hard";
  serpFeatures?: string[];
  modifiers?: string[];
  contentBrief?: string;
}

export const KEYWORDS_REGISTRY: Record<string, Keyword> = {
  "instagram-post-resize": {
    id: "instagram-post-resize",
    keyword: "instagram post size",
    engineId: "platform-resizer",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "medium",
    serpFeatures: ["featured-snippet", "people-also-ask"],
    modifiers: ["2024", "dimensions", "pixels", "resizer", "free"],
    contentBrief: "Users want to resize images to exact Instagram post dimensions (1080x1080)"
  },
  "instagram-story-resize": {
    id: "instagram-story-resize",
    keyword: "instagram story dimensions",
    engineId: "platform-resizer",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "medium",
    serpFeatures: ["featured-snippet", "people-also-ask"],
    modifiers: ["2024", "size", "pixels", "resizer", "vertical"],
    contentBrief: "Users want to resize images to Instagram story format (1080x1920)"
  },
  "tiktok-cover-resize": {
    id: "tiktok-cover-resize",
    keyword: "tiktok video cover size",
    engineId: "platform-resizer",
    searchIntent: "transactional",
    volumeEstimate: "high",
    difficultyEstimate: "easy",
    serpFeatures: ["people-also-ask"],
    modifiers: ["dimensions", "pixels", "thumbnail", "resizer"],
    contentBrief: "Users want to create TikTok video cover images (1080x1920)"
  },
  "youtube-thumbnail-resize": {
    id: "youtube-thumbnail-resize",
    keyword: "youtube thumbnail size",
    engineId: "platform-resizer",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "hard",
    serpFeatures: ["featured-snippet", "image-pack", "people-also-ask"],
    modifiers: ["2024", "dimensions", "1280x720", "resizer", "maker"],
    contentBrief: "Users want to create YouTube thumbnails at 1280x720 pixels"
  },
  "twitter-header-resize": {
    id: "twitter-header-resize",
    keyword: "twitter header size",
    engineId: "platform-resizer",
    searchIntent: "transactional",
    volumeEstimate: "high",
    difficultyEstimate: "medium",
    serpFeatures: ["featured-snippet"],
    modifiers: ["x header", "banner", "dimensions", "2024"],
    contentBrief: "Users want to create Twitter/X header banners (1500x500)"
  },
  "linkedin-banner-resize": {
    id: "linkedin-banner-resize",
    keyword: "linkedin banner size",
    engineId: "platform-resizer",
    searchIntent: "transactional",
    volumeEstimate: "high",
    difficultyEstimate: "medium",
    serpFeatures: ["featured-snippet", "people-also-ask"],
    modifiers: ["profile", "company", "dimensions", "2024"],
    contentBrief: "Users want to create LinkedIn profile banners (1584x396)"
  },
  "calorie-deficit-calculator": {
    id: "calorie-deficit-calculator",
    keyword: "calorie deficit calculator",
    engineId: "calculator",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "hard",
    serpFeatures: ["featured-snippet", "calculator-widget", "people-also-ask"],
    modifiers: ["free", "weight loss", "how many calories", "TDEE"],
    contentBrief: "Users want to calculate daily calorie deficit for weight loss goals"
  },
  "401k-calculator": {
    id: "401k-calculator",
    keyword: "401k calculator",
    engineId: "calculator",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "hard",
    serpFeatures: ["calculator-widget", "people-also-ask"],
    modifiers: ["retirement", "compound interest", "employer match", "free"],
    contentBrief: "Users want to project 401k growth with contributions and employer matching"
  },
  "mortgage-calculator": {
    id: "mortgage-calculator",
    keyword: "mortgage calculator",
    engineId: "calculator",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "hard",
    serpFeatures: ["calculator-widget", "people-also-ask"],
    modifiers: ["monthly payment", "home loan", "interest rate", "free"],
    contentBrief: "Users want to calculate monthly mortgage payments with interest"
  },
  "bmi-calculator": {
    id: "bmi-calculator",
    keyword: "bmi calculator",
    engineId: "calculator",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "hard",
    serpFeatures: ["calculator-widget", "featured-snippet"],
    modifiers: ["body mass index", "healthy weight", "free"],
    contentBrief: "Users want to calculate BMI from height and weight"
  },
  "treadmill-calorie-calculator": {
    id: "treadmill-calorie-calculator",
    keyword: "treadmill calorie calculator",
    engineId: "calculator",
    searchIntent: "transactional",
    volumeEstimate: "high",
    difficultyEstimate: "medium",
    serpFeatures: ["people-also-ask"],
    modifiers: ["walking", "running", "incline", "speed"],
    contentBrief: "Users want to calculate calories burned on treadmill workouts"
  },
  "walking-calorie-calculator": {
    id: "walking-calorie-calculator",
    keyword: "calories burned walking calculator",
    engineId: "calculator",
    searchIntent: "transactional",
    volumeEstimate: "high",
    difficultyEstimate: "medium",
    serpFeatures: ["featured-snippet", "people-also-ask"],
    modifiers: ["per mile", "steps", "distance", "free"],
    contentBrief: "Users want to calculate calories burned from walking distance or steps"
  },
  "ups-shipping-calculator": {
    id: "ups-shipping-calculator",
    keyword: "ups shipping calculator",
    engineId: "calculator",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "hard",
    serpFeatures: ["people-also-ask"],
    modifiers: ["cost", "estimate", "ground", "overnight"],
    contentBrief: "Users want to estimate UPS shipping costs by weight and destination"
  },
  "car-repair-cost-estimator": {
    id: "car-repair-cost-estimator",
    keyword: "car repair cost estimator",
    engineId: "calculator",
    searchIntent: "transactional",
    volumeEstimate: "high",
    difficultyEstimate: "medium",
    serpFeatures: ["people-also-ask"],
    modifiers: ["labor", "parts", "mechanic", "free"],
    contentBrief: "Users want to estimate auto repair costs before visiting a shop"
  },
  "ai-thumbnail-analyzer": {
    id: "ai-thumbnail-analyzer",
    keyword: "youtube thumbnail analyzer",
    engineId: "ai-analysis",
    searchIntent: "transactional",
    volumeEstimate: "medium",
    difficultyEstimate: "easy",
    serpFeatures: ["people-also-ask"],
    modifiers: ["AI", "CTR", "test", "free"],
    contentBrief: "Users want AI feedback on their YouTube thumbnail effectiveness"
  },
  "ai-ad-copy-analyzer": {
    id: "ai-ad-copy-analyzer",
    keyword: "ad copy analyzer",
    engineId: "ai-analysis",
    searchIntent: "transactional",
    volumeEstimate: "medium",
    difficultyEstimate: "easy",
    serpFeatures: ["people-also-ask"],
    modifiers: ["AI", "facebook ads", "google ads", "free"],
    contentBrief: "Users want AI analysis of their advertising copy effectiveness"
  },
  "internal-link-audit": {
    id: "internal-link-audit",
    keyword: "internal link checker",
    engineId: "ai-analysis",
    searchIntent: "transactional",
    volumeEstimate: "medium",
    difficultyEstimate: "easy",
    serpFeatures: ["people-also-ask"],
    modifiers: ["SEO", "audit", "free", "tool"],
    contentBrief: "Users want to audit internal linking structure for SEO"
  },
  "image-compressor": {
    id: "image-compressor",
    keyword: "compress image",
    engineId: "image-compress",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "hard",
    serpFeatures: ["tool-widget"],
    modifiers: ["online", "free", "reduce size", "kb"],
    contentBrief: "Users want to reduce image file size while maintaining quality"
  },
  "heic-to-jpg": {
    id: "heic-to-jpg",
    keyword: "heic to jpg",
    engineId: "image-convert",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "medium",
    serpFeatures: ["tool-widget"],
    modifiers: ["converter", "online", "free", "iphone"],
    contentBrief: "Users want to convert iPhone HEIC photos to JPG format"
  },
  "gif-maker": {
    id: "gif-maker",
    keyword: "gif maker",
    engineId: "image-convert",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "hard",
    serpFeatures: ["tool-widget", "image-pack"],
    modifiers: ["from video", "online", "free", "animated"],
    contentBrief: "Users want to create animated GIFs from images or video"
  },
  "word-counter": {
    id: "word-counter",
    keyword: "word counter",
    engineId: "text-analysis",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "hard",
    serpFeatures: ["tool-widget"],
    modifiers: ["character count", "online", "free"],
    contentBrief: "Users want to count words and characters in text"
  },
  "ai-summarizer": {
    id: "ai-summarizer",
    keyword: "summarize text",
    engineId: "ai-generate",
    searchIntent: "transactional",
    volumeEstimate: "high",
    difficultyEstimate: "medium",
    serpFeatures: ["people-also-ask"],
    modifiers: ["AI", "online", "free", "article"],
    contentBrief: "Users want AI to summarize long text or articles"
  },
  "ai-humanizer": {
    id: "ai-humanizer",
    keyword: "ai humanizer",
    engineId: "ai-generate",
    searchIntent: "transactional",
    volumeEstimate: "high",
    difficultyEstimate: "medium",
    serpFeatures: ["people-also-ask"],
    modifiers: ["free", "undetectable", "rewrite", "bypass"],
    contentBrief: "Users want to make AI-generated text sound more human"
  },
  "logo-generator": {
    id: "logo-generator",
    keyword: "ai logo generator",
    engineId: "ai-generate",
    searchIntent: "transactional",
    volumeEstimate: "very-high",
    difficultyEstimate: "hard",
    serpFeatures: ["image-pack", "people-also-ask"],
    modifiers: ["free", "online", "business", "brand"],
    contentBrief: "Users want AI to generate logo designs for their business"
  }
};

export function getKeywordById(id: string): Keyword | undefined {
  return KEYWORDS_REGISTRY[id];
}

export function getKeywordsByEngine(engineId: EngineType): Keyword[] {
  return Object.values(KEYWORDS_REGISTRY).filter(k => k.engineId === engineId);
}

export function getKeywordsByIntent(intent: SearchIntent): Keyword[] {
  return Object.values(KEYWORDS_REGISTRY).filter(k => k.searchIntent === intent);
}
