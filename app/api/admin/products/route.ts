import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";
import { query } from "@/lib/db";

export async function GET() {
  const session = await getIronSession<AdminSessionData>(cookies(), sessionOptions);

  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    return NextResponse.json({ products: result.rows });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getIronSession<AdminSessionData>(cookies(), sessionOptions);

  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const {
      slug,
      name,
      description,
      type,
      price_type,
      price,
      thumbnail_url,
      download_url,
      visibility,
    } = await request.json();

    // Validate required fields
    if (!slug || !name || !type || !price_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO products 
        (slug, name, description, type, price_type, price, thumbnail_url, download_url, visibility)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        slug,
        name,
        description || "",
        type,
        price_type,
        price || 0,
        thumbnail_url || null,
        download_url || null,
        visibility || "public",
      ]
    );

    return NextResponse.json({ product: result.rows[0] });
  } catch (error: any) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
