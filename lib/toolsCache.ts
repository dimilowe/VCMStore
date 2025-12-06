import { listTools, ToolRecord } from "./toolsRepo";

let cachedTools: ToolRecord[] = [];
let cacheTime: number = 0;
let initPromise: Promise<void> | null = null;
const CACHE_TTL = 30000;

async function doRefresh(): Promise<void> {
  try {
    cachedTools = await listTools();
    cacheTime = Date.now();
  } catch (error) {
    console.error("[toolsCache] Refresh failed:", error);
  }
}

initPromise = doRefresh();

export async function refreshToolsCache(): Promise<ToolRecord[]> {
  try {
    cachedTools = await listTools();
    cacheTime = Date.now();
    console.log(`Tools cache refreshed: ${cachedTools.length} tools loaded`);
    return cachedTools;
  } catch (error) {
    console.error("Failed to refresh tools cache:", error);
    return cachedTools;
  }
}

export function getCachedTools(): ToolRecord[] {
  if (cachedTools.length === 0 && initPromise) {
    initPromise.then(() => {});
  }
  return cachedTools;
}

export function isCacheStale(): boolean {
  return (Date.now() - cacheTime) > CACHE_TTL;
}

export async function ensureCacheLoaded(): Promise<ToolRecord[]> {
  if (cachedTools.length === 0 || isCacheStale()) {
    return refreshToolsCache();
  }
  return cachedTools;
}

export function getCachedToolBySlug(slug: string): ToolRecord | undefined {
  return cachedTools.find(t => t.slug === slug);
}

export function getCachedIndexedTools(): ToolRecord[] {
  return cachedTools.filter(t => t.isIndexed);
}

export function getCachedDirectoryTools(): ToolRecord[] {
  return cachedTools.filter(t => t.inDirectory);
}

export function getCachedFeaturedTools(): ToolRecord[] {
  return cachedTools.filter(t => t.featured);
}

export function getCachedPublishedTools(): ToolRecord[] {
  return cachedTools.filter(t => t.status === 'published');
}
