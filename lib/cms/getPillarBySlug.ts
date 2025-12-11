import { query } from "../db";

export interface PillarInfo {
  slug: string;
  title: string;
  description: string;
  isIndexed: boolean;
}

export async function getPillarBySlug(slug: string): Promise<PillarInfo | null> {
  const result = await query(
    `SELECT slug, data->>'title' as title, data->>'description' as description, 
            COALESCE((data->>'is_indexed')::boolean, false) as is_indexed
     FROM cms_objects 
     WHERE type = 'pillar' AND slug = $1
     LIMIT 1`,
    [slug]
  );
  
  if (result.rows.length === 0) return null;
  
  return {
    slug: result.rows[0].slug,
    title: result.rows[0].title || result.rows[0].slug,
    description: result.rows[0].description || "",
    isIndexed: result.rows[0].is_indexed,
  };
}

export async function getAllIndexedPillars(): Promise<PillarInfo[]> {
  const result = await query(
    `SELECT slug, data->>'title' as title, data->>'description' as description,
            COALESCE((data->>'is_indexed')::boolean, false) as is_indexed
     FROM cms_objects 
     WHERE type = 'pillar' AND COALESCE((data->>'is_indexed')::boolean, false) = true
     ORDER BY data->>'title' ASC`
  );
  
  return result.rows.map(row => ({
    slug: row.slug,
    title: row.title || row.slug,
    description: row.description || "",
    isIndexed: row.is_indexed,
  }));
}

export async function getRelatedPillars(currentSlug: string): Promise<PillarInfo[]> {
  const result = await query(
    `SELECT slug, data->>'title' as title, data->>'description' as description,
            COALESCE((data->>'is_indexed')::boolean, false) as is_indexed
     FROM cms_objects 
     WHERE type = 'pillar' 
       AND slug != $1 
       AND COALESCE((data->>'is_indexed')::boolean, false) = true
     ORDER BY data->>'title' ASC`,
    [currentSlug]
  );
  
  return result.rows.map(row => ({
    slug: row.slug,
    title: row.title || row.slug,
    description: row.description || "",
    isIndexed: row.is_indexed,
  }));
}
