import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const pillarResult = await query(
      `SELECT id, slug, data FROM cms_objects WHERE type = 'pillar' AND slug = $1`,
      [slug]
    );

    if (pillarResult.rows.length === 0) {
      return NextResponse.json({ error: "Pillar not found" }, { status: 404 });
    }

    const pillarRow = pillarResult.rows[0];
    const pillarData = pillarRow.data || {};

    const toolsResult = await query(
      `SELECT slug, name, description 
       FROM tools 
       WHERE pillar_slug = $1
       ORDER BY priority ASC, name ASC`,
      [slug]
    );

    const tools = toolsResult.rows.map((row: { slug: string; name: string; description: string | null }) => ({
      slug: row.slug,
      name: row.name,
      description: row.description || "",
    }));

    return NextResponse.json({
      pillar: {
        id: pillarRow.id,
        slug: pillarRow.slug,
        title: pillarData.title || slug,
        description: pillarData.description || "",
        content: pillarData.content || "",
      },
      tools,
    });
  } catch (error) {
    console.error("Error fetching pillar:", error);
    return NextResponse.json({ error: "Failed to fetch pillar" }, { status: 500 });
  }
}
