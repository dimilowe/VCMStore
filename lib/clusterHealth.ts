import { CLUSTER_REGISTRY, TopicCluster } from "@/data/clusterRegistry";
import { isToolIndexed } from "@/lib/toolRollout";
import { query } from "@/lib/db";

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

export interface ArticleStatus {
  slug: string;
  isPublished: boolean;
  title?: string;
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
  articleStatuses: ArticleStatus[];
}

export function calculateClusterHealth(
  cluster: TopicCluster, 
  publishedArticleCount: number
): ClusterHealthScore {
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
  
  let articlesScore = 0;
  const plannedArticles = cluster.articleSlugs.length;
  
  if (plannedArticles === 0) {
    issues.push("No supporting articles planned");
    articlesScore = 0;
  } else if (publishedArticleCount === 0) {
    issues.push(`0/${plannedArticles} articles published`);
    articlesScore = 0;
  } else if (publishedArticleCount < 3) {
    issues.push(`Only ${publishedArticleCount}/${plannedArticles} articles published (minimum 3 recommended)`);
    articlesScore = Math.floor((publishedArticleCount / 3) * 25);
  } else {
    articlesScore = 25;
  }
  
  let interlinkScore = 25;
  if (toolsInCluster < 2) {
    issues.push("Insufficient tools for internal linking");
    interlinkScore = 10;
  }
  if (publishedArticleCount < 1) {
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

async function getPublishedArticles(articleSlugs: string[]): Promise<ArticleStatus[]> {
  if (articleSlugs.length === 0) {
    return [];
  }
  
  try {
    const placeholders = articleSlugs.map((_, i) => `$${i + 1}`).join(", ");
    const result = await query(
      `SELECT slug, title, published_at 
       FROM blog_posts 
       WHERE slug IN (${placeholders})`,
      articleSlugs
    );
    
    const publishedSlugs = new Map<string, { title: string; isPublished: boolean }>();
    for (const row of result.rows) {
      const isPublished = row.published_at && new Date(row.published_at) <= new Date();
      publishedSlugs.set(row.slug, { 
        title: row.title, 
        isPublished 
      });
    }
    
    return articleSlugs.map(slug => {
      const found = publishedSlugs.get(slug);
      return {
        slug,
        isPublished: found?.isPublished ?? false,
        title: found?.title
      };
    });
  } catch (error) {
    console.error("Error fetching published articles:", error);
    return articleSlugs.map(slug => ({ slug, isPublished: false }));
  }
}

export async function getAllClustersOverview(): Promise<ClusterOverview[]> {
  const clusters = Object.values(CLUSTER_REGISTRY);
  
  const allArticleSlugs = clusters.flatMap(c => c.articleSlugs);
  const uniqueSlugs = [...new Set(allArticleSlugs)];
  
  let articleStatusMap = new Map<string, ArticleStatus>();
  
  if (uniqueSlugs.length > 0) {
    try {
      const placeholders = uniqueSlugs.map((_, i) => `$${i + 1}`).join(", ");
      const result = await query(
        `SELECT slug, title, published_at 
         FROM blog_posts 
         WHERE slug IN (${placeholders})`,
        uniqueSlugs
      );
      
      for (const row of result.rows) {
        const isPublished = row.published_at && new Date(row.published_at) <= new Date();
        articleStatusMap.set(row.slug, {
          slug: row.slug,
          title: row.title,
          isPublished
        });
      }
    } catch (error) {
      console.error("Error fetching articles for clusters:", error);
    }
  }
  
  return clusters.map(cluster => {
    const indexedToolCount = cluster.toolSlugs.filter(slug => isToolIndexed(slug)).length;
    
    const articleStatuses = cluster.articleSlugs.map(slug => 
      articleStatusMap.get(slug) || { slug, isPublished: false }
    );
    const publishedArticleCount = articleStatuses.filter(a => a.isPublished).length;
    
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
      publishedArticleCount,
      healthScore: calculateClusterHealth(cluster, publishedArticleCount),
      toolSlugs: cluster.toolSlugs,
      articleSlugs: cluster.articleSlugs,
      articleStatuses,
    };
  });
}

export async function getClusterOverviewById(clusterId: string): Promise<ClusterOverview | null> {
  const cluster = CLUSTER_REGISTRY[clusterId];
  if (!cluster) return null;
  
  const indexedToolCount = cluster.toolSlugs.filter(slug => isToolIndexed(slug)).length;
  const articleStatuses = await getPublishedArticles(cluster.articleSlugs);
  const publishedArticleCount = articleStatuses.filter(a => a.isPublished).length;
  
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
    publishedArticleCount,
    healthScore: calculateClusterHealth(cluster, publishedArticleCount),
    toolSlugs: cluster.toolSlugs,
    articleSlugs: cluster.articleSlugs,
    articleStatuses,
  };
}
