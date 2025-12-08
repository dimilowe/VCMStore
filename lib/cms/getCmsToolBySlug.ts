import { query } from "../db";

export interface ToolEngineConfig {
  engine: string;
  preset?: string;
  mode?: string;
}

export interface ToolSeoConfig {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface ToolMonetization {
  type: 'free' | 'paid' | 'freemium';
  price_id?: string;
  offer_key?: string;
}

export interface CmsToolData {
  slug: string;
  type: 'tool';
  title: string;
  description: string;
  isIndexed: boolean;
  engine_config: ToolEngineConfig;
  seo?: ToolSeoConfig;
  monetization?: ToolMonetization;
  interlink_parent?: string;
  interlink_siblings?: string[];
  interlink_tools?: string[];
}

export interface CmsToolRecord {
  id: number;
  slug: string;
  type: 'tool';
  cluster_slug: string | null;
  data: CmsToolData;
  word_count: number;
  health: 'thin' | 'ok' | 'strong';
  created_at: Date;
  updated_at: Date;
}

export interface ToolForRenderer {
  slug: string;
  name: string;
  description: string;
  engine: string;
  preset?: string;
  mode?: string;
  isIndexed: boolean;
  seo?: ToolSeoConfig;
  monetization?: ToolMonetization;
  interlinkParent?: string;
  interlinkSiblings?: string[];
  interlinkTools?: string[];
}

export async function getCmsToolBySlug(
  slug: string,
  options?: { includeDrafts?: boolean }
): Promise<ToolForRenderer | null> {
  const result = await query(
    `SELECT id, slug, type, cluster_slug, data, word_count, health, created_at, updated_at
     FROM cms_objects
     WHERE type = 'tool' AND slug = $1
     LIMIT 1`,
    [slug]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  const data = row.data as CmsToolData;

  const isIndexed = data.isIndexed ?? false;
  
  if (!options?.includeDrafts && !isIndexed) {
    return null;
  }

  return {
    slug: row.slug,
    name: data.title,
    description: data.description,
    engine: data.engine_config?.engine || '',
    preset: data.engine_config?.preset,
    mode: data.engine_config?.mode,
    isIndexed,
    seo: data.seo,
    monetization: data.monetization,
    interlinkParent: data.interlink_parent,
    interlinkSiblings: data.interlink_siblings,
    interlinkTools: data.interlink_tools,
  };
}

export async function getAllCmsTools(
  options?: { includeDrafts?: boolean }
): Promise<ToolForRenderer[]> {
  let sql = `
    SELECT id, slug, type, cluster_slug, data, word_count, health, created_at, updated_at
    FROM cms_objects
    WHERE type = 'tool'
  `;
  
  if (!options?.includeDrafts) {
    sql += ` AND (data->>'isIndexed')::boolean = true`;
  }
  
  sql += ` ORDER BY slug ASC`;

  const result = await query(sql);

  return result.rows.map((row) => {
    const data = row.data as CmsToolData;
    return {
      slug: row.slug,
      name: data.title,
      description: data.description,
      engine: data.engine_config?.engine || '',
      preset: data.engine_config?.preset,
      mode: data.engine_config?.mode,
      isIndexed: data.isIndexed ?? false,
      seo: data.seo,
      monetization: data.monetization,
      interlinkParent: data.interlink_parent,
      interlinkSiblings: data.interlink_siblings,
      interlinkTools: data.interlink_tools,
    };
  });
}
