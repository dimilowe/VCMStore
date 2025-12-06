import fs from "fs";
import path from "path";
import { toolsRegistry } from "@/data/toolsRegistry";
import { 
  getToolSkinBySlug, 
  getAllToolSkinsForEngine,
  ENGINE_KEYWORD_MATRICES,
  ToolSkin 
} from "@/data/engineKeywordMatrix";
import type { EngineType } from "@/engines";

interface ToolOverride {
  isIndexed?: boolean;
  isFeatured?: boolean;
  inDirectory?: boolean;
  segment?: string;
}

interface RolloutConfig {
  tools: Record<string, ToolOverride>;
}

let cachedConfig: RolloutConfig | null = null;
let cacheTime: number = 0;
const CACHE_TTL = 5000;

function loadRolloutConfig(): RolloutConfig {
  const now = Date.now();
  if (cachedConfig && (now - cacheTime) < CACHE_TTL) {
    return cachedConfig;
  }
  
  try {
    const configPath = path.join(process.cwd(), "data/toolRolloutConfig.json");
    const data = fs.readFileSync(configPath, "utf-8");
    cachedConfig = JSON.parse(data);
    cacheTime = now;
    return cachedConfig!;
  } catch {
    cachedConfig = { tools: {} };
    cacheTime = now;
    return cachedConfig;
  }
}

export function isToolIndexed(slug: string): boolean {
  const config = loadRolloutConfig();
  const override = config.tools[slug];
  
  if (override?.isIndexed !== undefined) {
    return override.isIndexed;
  }
  
  const legacyTool = toolsRegistry.find(t => t.slug === slug);
  if (legacyTool) {
    return true;
  }
  
  const skin = getToolSkinBySlug(slug);
  if (skin) {
    return skin.isIndexed ?? false;
  }
  
  return false;
}

export function isToolFeatured(slug: string): boolean {
  const config = loadRolloutConfig();
  return config.tools[slug]?.isFeatured ?? false;
}

export function isToolInDirectory(slug: string): boolean {
  const config = loadRolloutConfig();
  const override = config.tools[slug];
  
  if (override?.inDirectory !== undefined) {
    return override.inDirectory;
  }
  
  const legacyTool = toolsRegistry.find(t => t.slug === slug);
  if (legacyTool) {
    return true;
  }
  
  return false;
}

export interface IndexedToolInfo {
  slug: string;
  name: string;
  engineType: string;
  priority: number;
}

export function getAllIndexedTools(): IndexedToolInfo[] {
  const config = loadRolloutConfig();
  const indexedTools: IndexedToolInfo[] = [];
  const seenSlugs = new Set<string>();
  
  for (const tool of toolsRegistry) {
    const override = config.tools[tool.slug];
    const isIndexed = override?.isIndexed ?? true;
    
    if (isIndexed && !seenSlugs.has(tool.slug)) {
      seenSlugs.add(tool.slug);
      indexedTools.push({
        slug: tool.slug,
        name: tool.name,
        engineType: tool.engineType || "legacy",
        priority: 0.8,
      });
    }
  }
  
  const engineTypes = Object.keys(ENGINE_KEYWORD_MATRICES) as EngineType[];
  for (const engineType of engineTypes) {
    const skins = getAllToolSkinsForEngine(engineType);
    for (const skin of skins) {
      if (seenSlugs.has(skin.slug)) continue;
      
      const override = config.tools[skin.slug];
      const isIndexed = override?.isIndexed ?? skin.isIndexed ?? false;
      
      if (isIndexed) {
        seenSlugs.add(skin.slug);
        indexedTools.push({
          slug: skin.slug,
          name: skin.name,
          engineType: skin.engineType,
          priority: skin.priority === "primary" ? 0.9 : 0.7,
        });
      }
    }
  }
  
  return indexedTools;
}

export function clearRolloutCache(): void {
  cachedConfig = null;
  cacheTime = 0;
}
