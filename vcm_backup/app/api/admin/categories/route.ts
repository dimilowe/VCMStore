import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { UserSessionData, userSessionOptions } from "@/lib/user-session";
import { query } from "@/lib/db";

// Get all categories
export async function GET() {
  try {
    const result = await query(
      "SELECT * FROM categories ORDER BY name ASC",
      []
    );
    
    return NextResponse.json({ categories: result.rows });
  } catch (error) {
    console.error("Get categories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// Create new category (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getIronSession<UserSessionData>(await cookies(), userSessionOptions);
    
    if (!session.isLoggedIn || !session.isAdmin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const result = await query(
      "INSERT INTO categories (name, slug, description) VALUES ($1, $2, $3) RETURNING *",
      [name, slug, description || null]
    );

    return NextResponse.json({ success: true, category: result.rows[0] });
  } catch (error: any) {
    console.error("Create category error:", error);
    
    if (error.code === '23505') {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
