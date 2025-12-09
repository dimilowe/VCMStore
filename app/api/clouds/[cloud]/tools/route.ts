import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cloud: string }> }
) {
  const { cloud } = await params;
  
  const cloudSlug = cloud.replace(/-cloud$/, "");
  
  try {
    const result = await query(
      `SELECT 
        co.slug, 
        co.type,
        co.cloud_tags,
        COALESCE(co.data->>'title', co.slug) as title,
        COALESCE(co.data->>'description', '') as description,
        t.featured,
        t.segment
      FROM cms_objects co
      LEFT JOIN tools t ON t.slug = co.slug
      WHERE $1 = ANY(co.cloud_tags)
        AND co.type = 'tool'
      ORDER BY t.featured DESC NULLS LAST, co.slug ASC
      LIMIT 50`,
      [cloudSlug]
    );
    
    return NextResponse.json({ 
      tools: result.rows.map(row => ({
        slug: row.slug,
        title: row.title || row.slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        description: row.description,
        featured: row.featured || false,
        segment: row.segment
      }))
    });
  } catch (error) {
    console.error("Failed to fetch cloud tools:", error);
    return NextResponse.json({ tools: [], error: "Failed to fetch tools" }, { status: 500 });
  }
}
