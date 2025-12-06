import { getToolBySlug, listTools, ToolRecord } from "@/lib/toolsRepo";
import { 
  getCachedToolBySlug, 
  getCachedIndexedTools, 
  getCachedDirectoryTools,
  getCachedFeaturedTools,
  ensureCacheLoaded 
} from "@/lib/toolsCache";

export async function isToolIndexedAsync(slug: string): Promise<boolean> {
  const dbTool = await getToolBySlug(slug);
  if (dbTool) {
    return dbTool.isIndexed;
  }
  return false;
}

export function isToolIndexed(slug: string): boolean {
  const cached = getCachedToolBySlug(slug);
  if (cached) {
    return cached.isIndexed;
  }
  return false;
}

export async function isToolFeaturedAsync(slug: string): Promise<boolean> {
  const dbTool = await getToolBySlug(slug);
  if (dbTool) {
    return dbTool.featured;
  }
  return false;
}

export function isToolFeatured(slug: string): boolean {
  const cached = getCachedToolBySlug(slug);
  if (cached) {
    return cached.featured;
  }
  return false;
}

export async function isToolInDirectoryAsync(slug: string): Promise<boolean> {
  const dbTool = await getToolBySlug(slug);
  if (dbTool) {
    return dbTool.inDirectory;
  }
  return false;
}

export function isToolInDirectory(slug: string): boolean {
  const cached = getCachedToolBySlug(slug);
  if (cached) {
    return cached.inDirectory;
  }
  return false;
}

export interface IndexedToolInfo {
  slug: string;
  name: string;
  engineType: string;
  priority: number;
}

export async function getAllIndexedToolsAsync(): Promise<IndexedToolInfo[]> {
  const dbTools = await listTools({ isIndexed: true });
  return dbTools.map(tool => ({
    slug: tool.slug,
    name: tool.name,
    engineType: tool.engine || "legacy",
    priority: tool.priority,
  }));
}

export function getAllIndexedTools(): IndexedToolInfo[] {
  const cached = getCachedIndexedTools();
  return cached.map(tool => ({
    slug: tool.slug,
    name: tool.name,
    engineType: tool.engine || "legacy",
    priority: tool.priority,
  }));
}

export async function getAllDirectoryToolsAsync(): Promise<IndexedToolInfo[]> {
  const dbTools = await listTools({ inDirectory: true });
  return dbTools.map(tool => ({
    slug: tool.slug,
    name: tool.name,
    engineType: tool.engine || "legacy",
    priority: tool.priority,
  }));
}

export function getAllDirectoryTools(): IndexedToolInfo[] {
  const cached = getCachedDirectoryTools();
  return cached.map(tool => ({
    slug: tool.slug,
    name: tool.name,
    engineType: tool.engine || "legacy",
    priority: tool.priority,
  }));
}

export function getAllFeaturedTools(): IndexedToolInfo[] {
  const cached = getCachedFeaturedTools();
  return cached.map(tool => ({
    slug: tool.slug,
    name: tool.name,
    engineType: tool.engine || "legacy",
    priority: tool.priority,
  }));
}

export async function getToolFromDbOrRegistry(slug: string): Promise<ToolRecord | null> {
  const dbTool = await getToolBySlug(slug);
  return dbTool;
}

export async function initToolsCache(): Promise<void> {
  await ensureCacheLoaded();
}
