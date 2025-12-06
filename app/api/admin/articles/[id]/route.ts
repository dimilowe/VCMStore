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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { title, content, excerpt, meta_description, is_published, is_indexed } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const result = await query(
      `UPDATE cluster_articles 
       SET title = $1, 
           content = $2, 
           excerpt = $3, 
           meta_description = $4, 
           is_published = $5, 
           is_indexed = $6,
           updated_at = NOW()
       WHERE id = $7
       RETURNING id`,
      [title, content, excerpt, meta_description, is_published, is_indexed, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error("Failed to update article:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const result = await query(
      `SELECT id, slug, title, content, excerpt, meta_description, cluster_slug, is_indexed, is_published, view_count, created_at, updated_at
       FROM cluster_articles
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ article: result.rows[0] });
  } catch (error) {
    console.error("Failed to fetch article:", error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}
