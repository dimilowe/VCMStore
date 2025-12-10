import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // Try to query with featured column, return empty array if column doesn't exist
    let result;
    try {
      result = await query(
        `SELECT slug, data->>'title' as title, data->'engine_config'->>'engine' as engine
         FROM cms_objects
         WHERE type = 'tool' AND featured = true
         ORDER BY created_at ASC`
      );
    } catch (err) {
      // Featured column doesn't exist yet - return empty array
      // The homepage carousel will use the default tool list as fallback
      return NextResponse.json({ tools: [] });
    }

    const tools = result.rows.map((row: { slug: string; title: string; engine: string }) => ({
      slug: row.slug,
      title: row.title || row.slug,
      engine: row.engine || "unknown",
    }));

    return NextResponse.json({ tools });
  } catch (error) {
    console.error("Error fetching featured tools:", error);
    return NextResponse.json({ error: "Failed to fetch featured tools" }, { status: 500 });
  }
}
