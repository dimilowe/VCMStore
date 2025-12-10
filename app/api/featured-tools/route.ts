import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      `SELECT slug, name, engine
       FROM tools
       WHERE featured = true
       ORDER BY priority ASC, name ASC`
    );

    const tools = result.rows.map((row: { slug: string; name: string; engine: string }) => ({
      slug: row.slug,
      title: row.name || row.slug,
      engine: row.engine || "unknown",
    }));

    return NextResponse.json({ tools });
  } catch (error) {
    console.error("Error fetching featured tools:", error);
    return NextResponse.json({ tools: [] });
  }
}
