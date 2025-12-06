import { CLUSTER_REGISTRY, TopicCluster } from "@/data/clusterRegistry";
import { isToolIndexed } from "@/lib/toolRollout";

export interface ClusterHealthScore {
  total: number;
  breakdown: {
    pillarScore: number;
    toolsScore: number;
    articlesScore: number;
    interlinkScore: number;
  };
  issues: string[];
  status: "ready" | "needs-work" | "incomplete";
}

export interface ClusterOverview {
  id: string;
  pillarSlug: string;
  pillarTitle: string;
  pillarDescription: string;
  engineId: string;
  primaryKeyword: string;
  toolCount: number;
  indexedToolCount: number;
  articleCount: number;
  publishedArticleCount: number;
  healthScore: ClusterHealthScore;
  toolSlugs: string[];
  articleSlugs: string[];
}

export function calculateClusterHealth(cluster: TopicCluster): ClusterHealthScore {
  const issues: string[] = [];
  
  let pillarScore = 25;
  
  const toolsInCluster = cluster.toolSlugs.length;
  const indexedTools = cluster.toolSlugs.filter(slug => isToolIndexed(slug)).length;
  
  let toolsScore = 0;
  if (toolsInCluster === 0) {
    issues.push("No tools in cluster");
    toolsScore = 0;
  } else if (toolsInCluster < 3) {
    issues.push(`Only ${toolsInCluster} tools (minimum 3 recommended)`);
    toolsScore = 10;
  } else {
    toolsScore = Math.min(25, Math.floor((indexedTools / toolsInCluster) * 25));
  }
  
  const articlesInCluster = cluster.articleSlugs.length;
  let articlesScore = 0;
  if (articlesInCluster === 0) {
    issues.push("No supporting articles");
    articlesScore = 0;
  } else if (articlesInCluster < 3) {
    issues.push(`Only ${articlesInCluster} articles (minimum 3 recommended)`);
    articlesScore = Math.floor((articlesInCluster / 3) * 25);
  } else {
    articlesScore = 25;
  }
  
  let interlinkScore = 25;
  if (toolsInCluster < 2) {
    issues.push("Insufficient tools for internal linking");
    interlinkScore = 10;
  }
  if (articlesInCluster < 1) {
    interlinkScore -= 10;
  }
  
  const total = pillarScore + toolsScore + articlesScore + interlinkScore;
  
  let status: "ready" | "needs-work" | "incomplete";
  if (total >= 80 && issues.length === 0) {
    status = "ready";
  } else if (total >= 50) {
    status = "needs-work";
  } else {
    status = "incomplete";
  }
  
  return {
    total,
    breakdown: {
      pillarScore,
      toolsScore,
      articlesScore,
      interlinkScore,
    },
    issues,
    status,
  };
}

export function getAllClustersOverview(): ClusterOverview[] {
  return Object.values(CLUSTER_REGISTRY).map(cluster => {
    const indexedToolCount = cluster.toolSlugs.filter(slug => isToolIndexed(slug)).length;
    
    return {
      id: cluster.id,
      pillarSlug: cluster.pillarSlug,
      pillarTitle: cluster.pillarTitle,
      pillarDescription: cluster.pillarDescription,
      engineId: cluster.engineId,
      primaryKeyword: cluster.primaryKeyword,
      toolCount: cluster.toolSlugs.length,
      indexedToolCount,
      articleCount: cluster.articleSlugs.length,
      publishedArticleCount: 0,
      healthScore: calculateClusterHealth(cluster),
      toolSlugs: cluster.toolSlugs,
      articleSlugs: cluster.articleSlugs,
    };
  });
}

export function getClusterOverviewById(clusterId: string): ClusterOverview | null {
  const cluster = CLUSTER_REGISTRY[clusterId];
  if (!cluster) return null;
  
  const indexedToolCount = cluster.toolSlugs.filter(slug => isToolIndexed(slug)).length;
  
  return {
    id: cluster.id,
    pillarSlug: cluster.pillarSlug,
    pillarTitle: cluster.pillarTitle,
    pillarDescription: cluster.pillarDescription,
    engineId: cluster.engineId,
    primaryKeyword: cluster.primaryKeyword,
    toolCount: cluster.toolSlugs.length,
    indexedToolCount,
    articleCount: cluster.articleSlugs.length,
    publishedArticleCount: 0,
    healthScore: calculateClusterHealth(cluster),
    toolSlugs: cluster.toolSlugs,
    articleSlugs: cluster.articleSlugs,
  };
}
