import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";

async function verifyAdmin(): Promise<boolean> {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  return session.isAdmin || false;
}

export async function GET(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "all";
    const indexed = searchParams.get("indexed") || "all";

    let sql = "SELECT * FROM global_urls WHERE 1=1";
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      sql += ` AND (url ILIKE $${paramIndex} OR title ILIKE $${paramIndex} OR notes ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (type !== "all") {
      sql += ` AND type = $${paramIndex}`;
      params.push(type);
      paramIndex++;
    }

    if (indexed === "indexed") {
      sql += " AND is_indexed = true";
    } else if (indexed === "not_indexed") {
      sql += " AND is_indexed = false";
    }

    sql += " ORDER BY url ASC";

    const result = await query(sql, params);

    const stats = await query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE is_indexed = true) as indexed,
        COUNT(*) FILTER (WHERE is_indexed = false) as not_indexed,
        COUNT(*) FILTER (WHERE type = 'tool') as tools,
        COUNT(*) FILTER (WHERE type = 'static') as static,
        COUNT(*) FILTER (WHERE type = 'product') as products,
        COUNT(*) FILTER (WHERE type = 'idea') as ideas,
        COUNT(*) FILTER (WHERE type = 'blog') as blog,
        COUNT(*) FILTER (WHERE type = 'article') as articles
      FROM global_urls
    `);

    return NextResponse.json({
      urls: result.rows,
      stats: stats.rows[0]
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch URLs" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, title, type, is_indexed, canonical, notes } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await query(
      `UPDATE global_urls 
       SET title = $1, type = $2, is_indexed = $3, canonical = $4, notes = $5, updated_at = NOW()
       WHERE id = $6`,
      [title, type, is_indexed, canonical, notes, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, ids } = body;

    if (!action || !ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    if (action === "index_on") {
      await query(
        `UPDATE global_urls SET is_indexed = true, updated_at = NOW() WHERE id = ANY($1::uuid[])`,
        [ids]
      );
    } else if (action === "index_off") {
      await query(
        `UPDATE global_urls SET is_indexed = false, updated_at = NOW() WHERE id = ANY($1::uuid[])`,
        [ids]
      );
    } else if (action === "delete") {
      await query(
        `DELETE FROM global_urls WHERE id = ANY($1::uuid[])`,
        [ids]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bulk action error:", error);
    return NextResponse.json({ error: "Bulk action failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await query("DELETE FROM global_urls WHERE id = $1", [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
