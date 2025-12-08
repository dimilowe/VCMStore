import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { query } from "@/lib/db";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const session = await getIronSession<AdminSessionData>(cookieStore, sessionOptions);

  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await query(`
      SELECT id, slug, title, excerpt, meta_description, cluster_slug, 
             is_indexed, is_published, view_count, created_at, updated_at,
             COALESCE(array_length(regexp_split_to_array(COALESCE(content, ''), '\\s+'), 1), 0) as word_count
      FROM cluster_articles
      ORDER BY created_at DESC
    `);

    return NextResponse.json({ articles: result.rows });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
