import { query } from "../db";
import { ArticleForRenderer, RelatedToolItem, RelatedArticleItem } from "../types/article";

interface CmsArticleData {
  slug: string;
  type: 'article';
  title: string;
  description: string | null;
  body: string | null;
  isIndexed: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: string;
  };
  monetization?: {
    offerKey?: string;
    ctaLabel?: string;
    ctaUrl?: string;
  };
  interlink_parent?: string;
  interlink_siblings?: string[];
  interlink_tools?: string[];
}

interface CmsArticleRow {
  id: number;
  slug: string;
  type: string;
  cluster_slug: string | null;
  data: CmsArticleData;
  word_count: number;
  health: string;
  created_at: Date;
  updated_at: Date;
}

function cmsToArticleRenderer(row: CmsArticleRow): ArticleForRenderer {
  const data = row.data;
  const seo = data.seo ?? {};

  return {
    id: String(row.id),
    slug: row.slug,
    title: data.title,
    description: data.description,
    body: data.body,
    seo: {
      metaTitle: seo.metaTitle ?? data.title ?? null,
      metaDescription: seo.metaDescription ?? data.description ?? null,
      ogImage: seo.ogImage ?? null,
    },
    interlinkParent: data.interlink_parent ?? null,
    interlinkSiblings: data.interlink_siblings ?? [],
    interlinkTools: data.interlink_tools ?? [],
    monetization: data.monetization,
    clusterSlug: row.cluster_slug,
    isIndexed: data.isIndexed ?? false,
  };
}

export async function getCmsArticleBySlug(
  slug: string,
  options?: { includeDrafts?: boolean }
): Promise<ArticleForRenderer | null> {
  const result = await query(
    `SELECT id, slug, type, cluster_slug, data, word_count, health, created_at, updated_at
     FROM cms_objects
     WHERE type = 'article' AND slug = $1
     LIMIT 1`,
    [slug]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0] as CmsArticleRow;
  const article = cmsToArticleRenderer(row);

  if (!options?.includeDrafts && !article.isIndexed) {
    return null;
  }

  return article;
}

export async function getRelatedTools(slugs: string[]): Promise<RelatedToolItem[]> {
  if (slugs.length === 0) return [];

  const placeholders = slugs.map((_, i) => `$${i + 1}`).join(', ');
  const result = await query(
    `SELECT slug, data->>'title' as title, data->>'description' as description
     FROM cms_objects
     WHERE type = 'tool' AND slug IN (${placeholders})`,
    slugs
  );

  const toolMap = new Map(result.rows.map((row: any) => [row.slug, row]));
  
  return slugs
    .filter(slug => toolMap.has(slug))
    .map(slug => {
      const row = toolMap.get(slug)!;
      return {
        slug: row.slug,
        name: row.title || row.slug,
        description: row.description || '',
        path: `/tools/${row.slug}`,
      };
    });
}

export async function getRelatedArticles(slugs: string[]): Promise<RelatedArticleItem[]> {
  if (slugs.length === 0) return [];

  const placeholders = slugs.map((_, i) => `$${i + 1}`).join(', ');
  const result = await query(
    `SELECT slug, data->>'title' as title, data->>'description' as description
     FROM cms_objects
     WHERE type = 'article' AND slug IN (${placeholders})`,
    slugs
  );

  const articleMap = new Map(result.rows.map((row: any) => [row.slug, row]));
  
  return slugs
    .filter(slug => articleMap.has(slug))
    .map(slug => {
      const row = articleMap.get(slug)!;
      return {
        slug: row.slug,
        title: row.title || row.slug,
        description: row.description || null,
        path: `/articles/${row.slug}`,
      };
    });
}

export async function getAllCmsArticles(
  options?: { includeDrafts?: boolean }
): Promise<ArticleForRenderer[]> {
  let sql = `
    SELECT id, slug, type, cluster_slug, data, word_count, health, created_at, updated_at
    FROM cms_objects
    WHERE type = 'article'
  `;

  if (!options?.includeDrafts) {
    sql += ` AND (data->>'isIndexed')::boolean = true`;
  }

  sql += ` ORDER BY updated_at DESC`;

  const result = await query(sql);

  return result.rows.map((row: any) => cmsToArticleRenderer(row as CmsArticleRow));
}
