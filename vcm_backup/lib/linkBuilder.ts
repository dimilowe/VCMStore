import { getGeneratedShell, getAllGeneratedShells } from "./engineExpansionGenerator";
import { GeneratedShell } from "./engineBlueprint";
import { getClusterById } from "@/data/clusterRegistry";

export interface ToolLinks {
  slug: string;
  siblings: string[];
  articles: string[];
  pillarSlug?: string;
  quickCTA?: string;
  bottomCTA?: string;
  clusterSlug?: string;
}

export interface LinkBuildResult {
  slug: string;
  success: boolean;
  links: ToolLinks | null;
  warnings: string[];
}

export function buildLinksForShell(shell: GeneratedShell): LinkBuildResult {
  const warnings: string[] = [];
  const allShells = getAllGeneratedShells();
  
  const sameClusterShells = shell.clusterSlug
    ? allShells.filter(s => s.clusterSlug === shell.clusterSlug && s.slug !== shell.slug)
    : allShells.filter(s => s.engineType === shell.engineType && s.slug !== shell.slug);
  
  const siblings = sameClusterShells
    .slice(0, shell.linkRules.siblingsPerTool)
    .map(s => s.slug);
  
  if (siblings.length < shell.linkRules.siblingsPerTool) {
    warnings.push(`Only found ${siblings.length}/${shell.linkRules.siblingsPerTool} sibling tools`);
  }
  
  let articles: string[] = [];
  if (shell.clusterSlug) {
    const cluster = getClusterById(shell.clusterSlug);
    if (cluster && cluster.articleSlugs.length > 0) {
      articles = cluster.articleSlugs.slice(0, shell.linkRules.articlesPerTool);
    }
  }
  
  if (articles.length < shell.linkRules.articlesPerTool) {
    warnings.push(`Only found ${articles.length}/${shell.linkRules.articlesPerTool} cluster articles`);
  }
  
  const links: ToolLinks = {
    slug: shell.slug,
    siblings,
    articles,
    pillarSlug: shell.linkRules.pillarSlug,
    quickCTA: shell.linkRules.defaultCTAs.quickCTA,
    bottomCTA: shell.linkRules.defaultCTAs.bottomCTA,
    clusterSlug: shell.clusterSlug,
  };
  
  return {
    slug: shell.slug,
    success: warnings.length === 0,
    links,
    warnings,
  };
}

export function buildLinksForAllShells(): LinkBuildResult[] {
  const shells = getAllGeneratedShells();
  return shells.map(shell => buildLinksForShell(shell));
}

export function buildLinksForCluster(clusterSlug: string): LinkBuildResult[] {
  const shells = getAllGeneratedShells().filter(s => s.clusterSlug === clusterSlug);
  return shells.map(shell => buildLinksForShell(shell));
}

export function buildLinksForEngine(engineType: string): LinkBuildResult[] {
  const shells = getAllGeneratedShells().filter(s => s.engineType === engineType);
  return shells.map(shell => buildLinksForShell(shell));
}

export interface LinkHealthSummary {
  totalShells: number;
  fullyLinked: number;
  partiallyLinked: number;
  unlinked: number;
  totalWarnings: number;
  warningsByType: Record<string, number>;
}

export function getLinkHealthSummary(): LinkHealthSummary {
  const results = buildLinksForAllShells();
  
  const summary: LinkHealthSummary = {
    totalShells: results.length,
    fullyLinked: 0,
    partiallyLinked: 0,
    unlinked: 0,
    totalWarnings: 0,
    warningsByType: {},
  };
  
  for (const result of results) {
    if (result.success) {
      summary.fullyLinked++;
    } else if (result.links && (result.links.siblings.length > 0 || result.links.articles.length > 0)) {
      summary.partiallyLinked++;
    } else {
      summary.unlinked++;
    }
    
    summary.totalWarnings += result.warnings.length;
    
    for (const warning of result.warnings) {
      const key = warning.split(":")[0] || warning;
      summary.warningsByType[key] = (summary.warningsByType[key] || 0) + 1;
    }
  }
  
  return summary;
}

export function getLinksForTool(slug: string): ToolLinks | null {
  const shell = getGeneratedShell(slug);
  if (!shell) return null;
  
  const result = buildLinksForShell(shell);
  return result.links;
}

export function verifyToolLinksExist(links: ToolLinks): {
  valid: boolean;
  missing: {
    siblings: string[];
    articles: string[];
    quickCTA: boolean;
    bottomCTA: boolean;
  };
} {
  const allShells = getAllGeneratedShells();
  const shellSlugs = new Set(allShells.map(s => s.slug));
  
  const missingSiblings = links.siblings.filter(s => !shellSlugs.has(s));
  
  const missing = {
    siblings: missingSiblings,
    articles: [],
    quickCTA: links.quickCTA ? !shellSlugs.has(links.quickCTA) : false,
    bottomCTA: links.bottomCTA ? !shellSlugs.has(links.bottomCTA) : false,
  };
  
  const valid = 
    missingSiblings.length === 0 && 
    !missing.quickCTA && 
    !missing.bottomCTA;
  
  return { valid, missing };
}
