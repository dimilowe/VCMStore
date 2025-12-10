import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      `SELECT slug, data->>'title' as title, data->'engine_config'->>'engine' as engine
       FROM cms_objects
       WHERE type = 'tool' AND featured = true
       ORDER BY created_at ASC`
    );

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
