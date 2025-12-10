import { query } from "./db";

export type CmsToolSummary = {
  slug: string;
  title: string;
};

export async function getAllCmsTools(): Promise<CmsToolSummary[]> {
  const result = await query(
    `SELECT slug, data->>'title' as title
     FROM cms_objects
     WHERE type = 'tool'
     ORDER BY created_at ASC`
  );

  return result.rows.map((row) => ({
    slug: row.slug,
    title: row.title || row.slug,
  }));
}
