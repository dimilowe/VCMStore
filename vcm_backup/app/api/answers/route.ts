import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

export async function POST(request: NextRequest) {
  try {
    const { title, context, author_name } = await request.json();

    if (!title || title.trim().length === 0) {
      return NextResponse.json({ error: "Question title is required" }, { status: 400 });
    }

    if (title.length > 200) {
      return NextResponse.json({ error: "Question title is too long" }, { status: 400 });
    }

    let baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await query("SELECT id FROM questions WHERE slug = $1", [slug]);
      if (existing.rows.length === 0) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const result = await query(
      `INSERT INTO questions (slug, title, context, author_name, created_at, updated_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW())
       RETURNING id, slug`,
      [slug, title.trim(), context || null, author_name || "Anonymous"]
    );

    return NextResponse.json({ 
      id: result.rows[0].id,
      slug: result.rows[0].slug 
    });
  } catch (error) {
    console.error("Error creating question:", error);
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q");

    let questions;
    if (q) {
      questions = await query(
        `SELECT id, slug, title, context, answer, author_name, upvote_count, view_count, created_at
         FROM questions
         WHERE title ILIKE $1 OR context ILIKE $1
         ORDER BY upvote_count DESC, created_at DESC
         LIMIT 20`,
        [`%${q}%`]
      );
    } else {
      questions = await query(
        `SELECT id, slug, title, context, answer, author_name, upvote_count, view_count, created_at
         FROM questions
         ORDER BY created_at DESC
         LIMIT 20`
      );
    }

    return NextResponse.json(questions.rows);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
