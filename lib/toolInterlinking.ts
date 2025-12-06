import { getClusterByToolSlug, getRelatedToolsFromCluster, TopicCluster } from "@/data/clusterRegistry";
import { toolsRegistry, CATEGORY_INFO, ToolCategory, Tool } from "@/data/toolsRegistry";
import { getToolSkinBySlug, ToolSkin } from "@/data/engineKeywordMatrix";

export interface LinkStatus {
  hasPillar: boolean;
  hasCategory: boolean;
  hasSiblings: boolean;
  hasFunnelLinks: boolean;
  isReady: boolean;
  warnings: string[];
}

export interface ToolLinkInfo {
  slug: string;
  clusterSlug: string | null;
  pillarTitle: string | null;
  pillarUrl: string | null;
  categorySlug: ToolCategory | null;
  categoryLabel: string | null;
  categoryUrl: string | null;
  siblingCount: number;
  siblings: string[];
}

const ENGINE_TO_CATEGORY: Record<string, ToolCategory> = {
  "platform-resizer": "image",
  "image-compress": "image",
  "image-convert": "image",
  "calculator": "calculators",
  "ai-analysis": "ai",
  "ai-generate": "ai",
  "text-transform": "writing",
  "text-analysis": "writing",
  "file-convert": "file",
  "file-edit": "file",
  "community": "social",
  "static": "utilities",
  "standalone": "utilities",
};

export function getToolCategory(slug: string): ToolCategory | null {
  const registryTool = toolsRegistry.find(t => t.slug === slug);
  if (registryTool) {
    return registryTool.category;
  }
  
  const skin = getToolSkinBySlug(slug);
  if (skin) {
    return ENGINE_TO_CATEGORY[skin.engineType] || "utilities";
  }
  
  return null;
}

export function getToolLinkInfo(slug: string): ToolLinkInfo {
  const cluster = getClusterByToolSlug(slug);
  const category = getToolCategory(slug);
  const siblings = cluster ? cluster.toolSlugs.filter(s => s !== slug) : [];
  
  return {
    slug,
    clusterSlug: cluster?.id || null,
    pillarTitle: cluster?.pillarTitle || null,
    pillarUrl: cluster ? `/tools/clusters/${cluster.id}` : null,
    categorySlug: category,
    categoryLabel: category ? CATEGORY_INFO[category].label : null,
    categoryUrl: category ? `/tools/categories/${category}` : null,
    siblingCount: siblings.length,
    siblings: siblings.slice(0, 5),
  };
}

export function validateToolInterlinking(slug: string): LinkStatus {
  const warnings: string[] = [];
  
  const cluster = getClusterByToolSlug(slug);
  const hasPillar = cluster !== undefined;
  if (!hasPillar) {
    warnings.push("Not assigned to any cluster (no pillar page)");
  }
  
  const category = getToolCategory(slug);
  const hasCategory = category !== null;
  if (!hasCategory) {
    warnings.push("No category assigned");
  }
  
  const siblings = cluster ? cluster.toolSlugs.filter(s => s !== slug) : [];
  const hasSiblings = siblings.length >= 2;
  if (!hasSiblings) {
    if (siblings.length === 0) {
      warnings.push("No sibling tools in cluster");
    } else if (siblings.length === 1) {
      warnings.push("Only 1 sibling tool (need at least 2)");
    }
  }
  
  const hasFunnelLinks = true;
  
  const isReady = hasPillar && hasCategory && hasSiblings && hasFunnelLinks;
  
  return {
    hasPillar,
    hasCategory,
    hasSiblings,
    hasFunnelLinks,
    isReady,
    warnings,
  };
}

export function getPreflightStatus(slug: string): {
  status: "ready" | "warning" | "error";
  label: string;
  details: string[];
} {
  const linkStatus = validateToolInterlinking(slug);
  
  if (linkStatus.isReady) {
    return {
      status: "ready",
      label: "Ready",
      details: ["All interlinking requirements met"],
    };
  }
  
  const criticalMissing = !linkStatus.hasPillar || !linkStatus.hasCategory;
  
  return {
    status: criticalMissing ? "error" : "warning",
    label: criticalMissing ? "Not Ready" : "Incomplete",
    details: linkStatus.warnings,
  };
}

export function canIndexTool(slug: string): { allowed: boolean; reason?: string } {
  const linkStatus = validateToolInterlinking(slug);
  
  if (!linkStatus.hasPillar) {
    return {
      allowed: false,
      reason: "Cannot index: Tool is not assigned to a cluster. Add it to a cluster in clusterRegistry.ts first.",
    };
  }
  
  if (!linkStatus.hasCategory) {
    return {
      allowed: false,
      reason: "Cannot index: Tool has no category. Ensure it has a category in toolsRegistry or a valid engineType.",
    };
  }
  
  if (!linkStatus.hasSiblings) {
    return {
      allowed: false,
      reason: "Cannot index: Not enough sibling tools in cluster. Add at least 2 more tools to this cluster first.",
    };
  }
  
  return { allowed: true };
}

export function getAllClusters(): TopicCluster[] {
  const { CLUSTER_REGISTRY } = require("@/data/clusterRegistry");
  return Object.values(CLUSTER_REGISTRY);
}
