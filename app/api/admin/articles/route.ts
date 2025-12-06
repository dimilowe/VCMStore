import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("vcm_admin_session");
  if (!sessionCookie?.value) return false;
  try {
    const session = JSON.parse(sessionCookie.value);
    return session.isAdmin === true;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await query(`
      SELECT id, slug, title, excerpt, meta_description, cluster_slug, 
             is_indexed, is_published, view_count, created_at, updated_at
      FROM cluster_articles
      ORDER BY created_at DESC
    `);

    return NextResponse.json({ articles: result.rows });
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
