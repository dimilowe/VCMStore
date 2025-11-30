import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { UserSessionData, userSessionOptions } from "@/lib/user-session";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getIronSession<UserSessionData>(await cookies(), userSessionOptions);
    
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { title, slug, content, excerpt, meta_description, featured_image_url, published_at, category_ids, unlisted } = await request.json();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await query(
      "SELECT id FROM blog_posts WHERE slug = $1",
      [slug]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 409 }
      );
    }

    const result = await query(
      `INSERT INTO blog_posts (title, slug, content, excerpt, meta_description, featured_image_url, author_id, published_at, unlisted) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [title, slug, content, excerpt, meta_description, featured_image_url, session.userId, published_at, unlisted || false]
    );

    const postId = result.rows[0].id;

    // Add categories
    if (category_ids && category_ids.length > 0) {
      for (const categoryId of category_ids) {
        await query(
          "INSERT INTO blog_post_categories (blog_post_id, category_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
          [postId, categoryId]
        );
      }
    }

    return NextResponse.json({ success: true, postId });
  } catch (error) {
    console.error("Create blog post error:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
