import type { EngineType } from "@/engines";
import type { SearchIntent } from "./toolsRegistry";

export interface KeywordModifier {
  id: string;
  label: string;
  variations: string[];
}

export interface EngineKeywordMatrix {
  engineId: EngineType;
  baseKeywords: string[];
  platformModifiers: KeywordModifier[];
  dimensionModifiers: KeywordModifier[];
  intentModifiers: KeywordModifier[];
  formatModifiers: KeywordModifier[];
  generateCombinations: () => ToolSkin[];
}

export interface ToolSkin {
  slug: string;
  name: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  h1: string;
  metaDescription: string;
  introCopy: string;
  dimensions?: { width: number; height: number };
  aspectRatio?: string;
}

export const PLATFORM_RESIZER_MATRIX: EngineKeywordMatrix = {
  engineId: "platform-resizer",
  baseKeywords: ["resize image", "image resizer", "photo resizer", "crop image", "resize photo"],
  
  platformModifiers: [
    { id: "instagram", label: "Instagram", variations: ["instagram", "ig", "insta"] },
    { id: "instagram-story", label: "Instagram Story", variations: ["instagram story", "ig story", "insta story"] },
    { id: "instagram-reel", label: "Instagram Reel", variations: ["instagram reel", "ig reel", "reels"] },
    { id: "tiktok", label: "TikTok", variations: ["tiktok", "tik tok"] },
    { id: "youtube", label: "YouTube", variations: ["youtube", "yt"] },
    { id: "youtube-shorts", label: "YouTube Shorts", variations: ["youtube shorts", "yt shorts"] },
    { id: "twitter", label: "Twitter/X", variations: ["twitter", "x", "twitter header"] },
    { id: "linkedin", label: "LinkedIn", variations: ["linkedin", "li"] },
    { id: "linkedin-company", label: "LinkedIn Company", variations: ["linkedin company", "linkedin business"] },
    { id: "facebook", label: "Facebook", variations: ["facebook", "fb"] },
    { id: "facebook-cover", label: "Facebook Cover", variations: ["facebook cover", "fb cover"] },
    { id: "pinterest", label: "Pinterest", variations: ["pinterest", "pin"] },
    { id: "snapchat", label: "Snapchat", variations: ["snapchat", "snap"] },
    { id: "discord", label: "Discord", variations: ["discord"] },
    { id: "twitch", label: "Twitch", variations: ["twitch"] },
    { id: "blog", label: "Blog", variations: ["blog", "wordpress", "medium"] },
    { id: "email", label: "Email", variations: ["email", "newsletter", "mailchimp"] },
  ],
  
  dimensionModifiers: [
    { id: "1080x1080", label: "1080×1080", variations: ["1080x1080", "1080 x 1080", "square"] },
    { id: "1080x1920", label: "1080×1920", variations: ["1080x1920", "1080 x 1920", "vertical", "portrait"] },
    { id: "1920x1080", label: "1920×1080", variations: ["1920x1080", "1920 x 1080", "horizontal", "landscape", "hd"] },
    { id: "1280x720", label: "1280×720", variations: ["1280x720", "1280 x 720", "720p", "hd thumbnail"] },
    { id: "1500x500", label: "1500×500", variations: ["1500x500", "1500 x 500", "twitter banner"] },
    { id: "1584x396", label: "1584×396", variations: ["1584x396", "1584 x 396", "linkedin banner"] },
    { id: "1000x1500", label: "1000×1500", variations: ["1000x1500", "1000 x 1500", "pinterest pin"] },
    { id: "820x312", label: "820×312", variations: ["820x312", "820 x 312", "facebook cover"] },
    { id: "2560x1440", label: "2560×1440", variations: ["2560x1440", "2560 x 1440", "youtube banner", "channel art"] },
  ],
  
  intentModifiers: [
    { id: "resize", label: "Resize", variations: ["resize", "resizer", "resize for"] },
    { id: "crop", label: "Crop", variations: ["crop", "cropper", "crop for"] },
    { id: "convert", label: "Convert", variations: ["convert", "converter", "change size"] },
    { id: "optimize", label: "Optimize", variations: ["optimize", "best size", "perfect size"] },
    { id: "free", label: "Free", variations: ["free", "free online", "online free"] },
  ],
  
  formatModifiers: [
    { id: "1:1", label: "Square", variations: ["1:1", "square", "1 to 1"] },
    { id: "4:5", label: "Portrait", variations: ["4:5", "4 to 5", "portrait"] },
    { id: "9:16", label: "Vertical", variations: ["9:16", "9 to 16", "vertical", "story"] },
    { id: "16:9", label: "Landscape", variations: ["16:9", "16 to 9", "widescreen", "landscape"] },
    { id: "4:3", label: "Standard", variations: ["4:3", "4 to 3", "standard"] },
    { id: "2:3", label: "Pinterest", variations: ["2:3", "2 to 3", "pinterest ratio"] },
  ],
  
  generateCombinations(): ToolSkin[] {
    const skins: ToolSkin[] = [];
    
    const platformConfigs: Record<string, { width: number; height: number; aspectRatio: string }> = {
      "instagram": { width: 1080, height: 1080, aspectRatio: "1:1" },
      "instagram-story": { width: 1080, height: 1920, aspectRatio: "9:16" },
      "instagram-reel": { width: 1080, height: 1920, aspectRatio: "9:16" },
      "tiktok": { width: 1080, height: 1920, aspectRatio: "9:16" },
      "youtube": { width: 1280, height: 720, aspectRatio: "16:9" },
      "youtube-shorts": { width: 1080, height: 1920, aspectRatio: "9:16" },
      "twitter": { width: 1500, height: 500, aspectRatio: "3:1" },
      "linkedin": { width: 1584, height: 396, aspectRatio: "4:1" },
      "linkedin-company": { width: 1128, height: 191, aspectRatio: "6:1" },
      "facebook": { width: 1200, height: 630, aspectRatio: "1.91:1" },
      "facebook-cover": { width: 820, height: 312, aspectRatio: "2.63:1" },
      "pinterest": { width: 1000, height: 1500, aspectRatio: "2:3" },
      "snapchat": { width: 1080, height: 1920, aspectRatio: "9:16" },
      "discord": { width: 680, height: 240, aspectRatio: "17:6" },
      "twitch": { width: 1200, height: 480, aspectRatio: "2.5:1" },
      "blog": { width: 1200, height: 630, aspectRatio: "1.91:1" },
      "email": { width: 600, height: 400, aspectRatio: "3:2" },
    };
    
    for (const platform of this.platformModifiers) {
      const config = platformConfigs[platform.id];
      if (!config) continue;
      
      const slug = `${platform.id}-resizer`;
      const name = `${platform.label} Image Resizer`;
      const primaryKeyword = `${platform.variations[0]} image size`;
      
      const secondaryKeywords = [
        `resize image for ${platform.variations[0]}`,
        `${platform.variations[0]} photo size`,
        `${platform.variations[0]} dimensions`,
        `${config.width}x${config.height} resizer`,
        `${platform.label.toLowerCase()} image resizer free`,
      ];
      
      skins.push({
        slug,
        name,
        primaryKeyword,
        secondaryKeywords,
        searchIntent: "action",
        h1: `${platform.label} Image Resizer`,
        metaDescription: `Resize images to ${config.width}×${config.height} pixels for ${platform.label}. Free online tool, no signup required.`,
        introCopy: `Upload any image and resize it to the perfect ${platform.label} dimensions (${config.width}×${config.height}) instantly.`,
        dimensions: { width: config.width, height: config.height },
        aspectRatio: config.aspectRatio,
      });
    }
    
    return skins;
  }
};

export const CALCULATOR_MATRIX: EngineKeywordMatrix = {
  engineId: "calculator",
  baseKeywords: ["calculator", "estimator", "calculate", "estimate"],
  
  platformModifiers: [],
  
  dimensionModifiers: [],
  
  intentModifiers: [
    { id: "free", label: "Free", variations: ["free", "free online", "online"] },
    { id: "accurate", label: "Accurate", variations: ["accurate", "precise", "exact"] },
  ],
  
  formatModifiers: [],
  
  generateCombinations(): ToolSkin[] {
    const calculatorTypes = [
      { id: "calorie-deficit", name: "Calorie Deficit", keyword: "calorie deficit calculator", desc: "Calculate your daily calorie deficit for weight loss" },
      { id: "401k-retirement", name: "401k Retirement", keyword: "401k calculator", desc: "Project your 401k growth until retirement" },
      { id: "mortgage", name: "Mortgage", keyword: "mortgage calculator", desc: "Calculate monthly mortgage payments" },
      { id: "bmi", name: "BMI", keyword: "bmi calculator", desc: "Calculate your body mass index" },
      { id: "tdee", name: "TDEE", keyword: "tdee calculator", desc: "Calculate total daily energy expenditure" },
      { id: "macro", name: "Macro", keyword: "macro calculator", desc: "Calculate daily macronutrient targets" },
      { id: "compound-interest", name: "Compound Interest", keyword: "compound interest calculator", desc: "Calculate compound interest growth" },
      { id: "loan", name: "Loan", keyword: "loan calculator", desc: "Calculate loan payments and total interest" },
      { id: "tip", name: "Tip", keyword: "tip calculator", desc: "Calculate tip amounts and split bills" },
      { id: "percentage", name: "Percentage", keyword: "percentage calculator", desc: "Calculate percentages and percent changes" },
      { id: "age", name: "Age", keyword: "age calculator", desc: "Calculate age from birthdate" },
      { id: "gpa", name: "GPA", keyword: "gpa calculator", desc: "Calculate grade point average" },
      { id: "pregnancy", name: "Pregnancy Due Date", keyword: "pregnancy calculator", desc: "Calculate due date and pregnancy milestones" },
      { id: "ovulation", name: "Ovulation", keyword: "ovulation calculator", desc: "Calculate ovulation and fertility windows" },
      { id: "sleep", name: "Sleep", keyword: "sleep calculator", desc: "Calculate optimal bedtime and wake time" },
      { id: "car-payment", name: "Car Payment", keyword: "car payment calculator", desc: "Calculate monthly car loan payments" },
      { id: "rent-vs-buy", name: "Rent vs Buy", keyword: "rent vs buy calculator", desc: "Compare renting vs buying a home" },
      { id: "paycheck", name: "Paycheck", keyword: "paycheck calculator", desc: "Calculate net pay after taxes" },
      { id: "inflation", name: "Inflation", keyword: "inflation calculator", desc: "Calculate purchasing power over time" },
      { id: "retirement", name: "Retirement", keyword: "retirement calculator", desc: "Calculate retirement savings needs" },
    ];
    
    return calculatorTypes.map(calc => ({
      slug: `${calc.id}-calculator`,
      name: `${calc.name} Calculator`,
      primaryKeyword: calc.keyword,
      secondaryKeywords: [
        `${calc.keyword} free`,
        `${calc.keyword} online`,
        `best ${calc.keyword}`,
        `accurate ${calc.keyword}`,
      ],
      searchIntent: "action" as SearchIntent,
      h1: `${calc.name} Calculator`,
      metaDescription: `${calc.desc}. Free online ${calc.name.toLowerCase()} calculator, no signup required.`,
      introCopy: `${calc.desc} with our free, easy-to-use calculator.`,
    }));
  }
};

export const AI_ANALYSIS_MATRIX: EngineKeywordMatrix = {
  engineId: "ai-analysis",
  baseKeywords: ["analyzer", "analysis", "check", "audit", "review"],
  
  platformModifiers: [],
  dimensionModifiers: [],
  formatModifiers: [],
  
  intentModifiers: [
    { id: "ai", label: "AI", variations: ["ai", "ai-powered", "artificial intelligence"] },
    { id: "free", label: "Free", variations: ["free", "free online"] },
  ],
  
  generateCombinations(): ToolSkin[] {
    const analyzerTypes = [
      { id: "thumbnail", name: "YouTube Thumbnail", keyword: "youtube thumbnail analyzer", desc: "Analyze YouTube thumbnails for CTR optimization" },
      { id: "ad-copy", name: "Ad Copy", keyword: "ad copy analyzer", desc: "Analyze advertising copy effectiveness" },
      { id: "headline", name: "Headline", keyword: "headline analyzer", desc: "Analyze headline strength and emotional impact" },
      { id: "seo", name: "SEO", keyword: "seo analyzer", desc: "Analyze on-page SEO factors" },
      { id: "readability", name: "Readability", keyword: "readability analyzer", desc: "Analyze text readability and grade level" },
      { id: "sentiment", name: "Sentiment", keyword: "sentiment analyzer", desc: "Analyze text sentiment and emotion" },
      { id: "grammar", name: "Grammar", keyword: "grammar checker", desc: "Check grammar and spelling errors" },
      { id: "plagiarism", name: "Plagiarism", keyword: "plagiarism checker", desc: "Check content for plagiarism" },
      { id: "email", name: "Email", keyword: "email analyzer", desc: "Analyze email subject lines and content" },
      { id: "resume", name: "Resume", keyword: "resume analyzer", desc: "Analyze resume strength and ATS compatibility" },
    ];
    
    return analyzerTypes.map(analyzer => ({
      slug: `${analyzer.id}-analyzer`,
      name: `${analyzer.name} Analyzer`,
      primaryKeyword: analyzer.keyword,
      secondaryKeywords: [
        `${analyzer.keyword} free`,
        `ai ${analyzer.keyword}`,
        `best ${analyzer.keyword}`,
      ],
      searchIntent: "action" as SearchIntent,
      h1: `${analyzer.name} Analyzer`,
      metaDescription: `${analyzer.desc}. Free AI-powered ${analyzer.name.toLowerCase()} analyzer.`,
      introCopy: `${analyzer.desc} with our AI-powered analysis tool.`,
    }));
  }
};

export const ENGINE_KEYWORD_MATRICES: Record<EngineType, EngineKeywordMatrix | null> = {
  "platform-resizer": PLATFORM_RESIZER_MATRIX,
  "calculator": CALCULATOR_MATRIX,
  "ai-analysis": AI_ANALYSIS_MATRIX,
  "image-compress": null,
  "image-convert": null,
  "text-transform": null,
  "text-analysis": null,
  "ai-generate": null,
  "file-convert": null,
  "file-edit": null,
  "community": null,
  "static": null,
  "standalone": null,
};

export function getAllToolSkinsForEngine(engineId: EngineType): ToolSkin[] {
  const matrix = ENGINE_KEYWORD_MATRICES[engineId];
  if (!matrix) return [];
  return matrix.generateCombinations();
}

export function getTotalPotentialTools(): number {
  return Object.values(ENGINE_KEYWORD_MATRICES)
    .filter(m => m !== null)
    .reduce((total, matrix) => total + matrix!.generateCombinations().length, 0);
}
