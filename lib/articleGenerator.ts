import { query } from './db';
import { getClusterById } from '@/data/clusterRegistry';

export interface ArticleStatus {
  slug: string;
  title: string;
  exists: boolean;
  isDraft: boolean;
  isPublished: boolean;
  isIndexed: boolean;
  contentLength: number;
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function getArticleStatusesForCluster(clusterSlug: string): Promise<ArticleStatus[]> {
  const cluster = getClusterById(clusterSlug);
  if (!cluster) {
    return [];
  }

  const existingPosts = await query(
    `SELECT slug, title, content, published_at, is_indexed 
     FROM blog_posts 
     WHERE slug = ANY($1)`,
    [cluster.articleSlugs]
  );

  const postMap = new Map<string, typeof existingPosts.rows[0]>();
  for (const row of existingPosts.rows) {
    postMap.set(row.slug, row);
  }

  return cluster.articleSlugs.map(slug => {
    const post = postMap.get(slug);
    if (!post) {
      return {
        slug,
        title: slugToTitle(slug),
        exists: false,
        isDraft: false,
        isPublished: false,
        isIndexed: false,
        contentLength: 0,
      };
    }

    const isPublished = post.published_at !== null && new Date(post.published_at) <= new Date();

    return {
      slug,
      title: post.title || slugToTitle(slug),
      exists: true,
      isDraft: !isPublished,
      isPublished,
      isIndexed: post.is_indexed === true,
      contentLength: post.content?.length || 0,
    };
  });
}

export async function createMissingDrafts(clusterSlug: string): Promise<{
  created: string[];
  skipped: string[];
}> {
  const cluster = getClusterById(clusterSlug);
  if (!cluster) {
    throw new Error(`Cluster not found: ${clusterSlug}`);
  }

  const existingPosts = await query(
    `SELECT slug FROM blog_posts WHERE slug = ANY($1)`,
    [cluster.articleSlugs]
  );

  const existingSlugs = new Set(existingPosts.rows.map(r => r.slug));

  const created: string[] = [];
  const skipped: string[] = [];

  for (const articleSlug of cluster.articleSlugs) {
    if (existingSlugs.has(articleSlug)) {
      skipped.push(articleSlug);
      continue;
    }

    const title = slugToTitle(articleSlug);
    
    await query(`
      INSERT INTO blog_posts (slug, title, content, cluster_slug, is_indexed, published_at, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, NULL, NOW(), NOW())
    `, [articleSlug, title, '', clusterSlug, false]);

    created.push(articleSlug);
  }

  return { created, skipped };
}

export async function publishArticle(slug: string): Promise<boolean> {
  const result = await query(
    `UPDATE blog_posts 
     SET published_at = NOW(), updated_at = NOW() 
     WHERE slug = $1 AND published_at IS NULL
     RETURNING id`,
    [slug]
  );
  return (result.rowCount ?? 0) > 0;
}

export async function unpublishArticle(slug: string): Promise<boolean> {
  const result = await query(
    `UPDATE blog_posts 
     SET published_at = NULL, updated_at = NOW() 
     WHERE slug = $1
     RETURNING id`,
    [slug]
  );
  return (result.rowCount ?? 0) > 0;
}

export async function setArticleIndexed(slug: string, indexed: boolean): Promise<boolean> {
  const result = await query(
    `UPDATE blog_posts 
     SET is_indexed = $1, updated_at = NOW() 
     WHERE slug = $2
     RETURNING id`,
    [indexed, slug]
  );
  return (result.rowCount ?? 0) > 0;
}
