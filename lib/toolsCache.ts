import { listTools, ToolRecord } from "./toolsRepo";

let cachedTools: ToolRecord[] = [];
let cacheTime: number = 0;
let initPromise: Promise<void> | null = null;
let initialized = false;
const CACHE_TTL = 30000;

async function doRefresh(): Promise<void> {
  try {
    cachedTools = await listTools();
    cacheTime = Date.now();
    initialized = true;
  } catch (error) {
    console.error("[toolsCache] Refresh failed:", error);
  }
}

function lazyInit(): void {
  if (!initPromise && !initialized) {
    initPromise = doRefresh();
  }
}

export async function refreshToolsCache(): Promise<ToolRecord[]> {
  try {
    cachedTools = await listTools();
    cacheTime = Date.now();
    initialized = true;
    initPromise = null;
    return cachedTools;
  } catch (error) {
    console.error("Failed to refresh tools cache:", error);
    return cachedTools;
  }
}

export function getCachedTools(): ToolRecord[] {
  lazyInit();
  return cachedTools;
}

export function isCacheStale(): boolean {
  return (Date.now() - cacheTime) > CACHE_TTL;
}

export async function ensureCacheLoaded(): Promise<ToolRecord[]> {
  if (!initialized) {
    lazyInit();
    if (initPromise) await initPromise;
  }
  if (isCacheStale()) {
    return refreshToolsCache();
  }
  return cachedTools;
}

export function getCachedToolBySlug(slug: string): ToolRecord | undefined {
  lazyInit();
  return cachedTools.find(t => t.slug === slug);
}

export function getCachedIndexedTools(): ToolRecord[] {
  lazyInit();
  return cachedTools.filter(t => t.isIndexed);
}

export function getCachedDirectoryTools(): ToolRecord[] {
  lazyInit();
  return cachedTools.filter(t => t.inDirectory);
}

export function getCachedFeaturedTools(): ToolRecord[] {
  lazyInit();
  return cachedTools.filter(t => t.featured);
}

export function getCachedPublishedTools(): ToolRecord[] {
  lazyInit();
  return cachedTools.filter(t => t.status === 'published');
}
