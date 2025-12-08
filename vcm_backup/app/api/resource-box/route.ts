import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

function generateSlug(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let slug = "box-";
  for (let i = 0; i < 8; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

interface BoxItemInput {
  label: string;
  description: string | null;
  itemType: "external" | "internal_tool" | "internal_freebie";
  externalUrl: string | null;
  internalResourceId: number | null;
  position: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, accentColor, items } = body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "At least one item is required" }, { status: 400 });
    }

    if (items.length > 4) {
      return NextResponse.json({ error: "Maximum 4 items allowed" }, { status: 400 });
    }

    for (const item of items as BoxItemInput[]) {
      if (!item.label || item.label.trim().length === 0) {
        return NextResponse.json({ error: "Each item must have a label" }, { status: 400 });
      }

      if (item.itemType === "external") {
        if (!item.externalUrl || !item.externalUrl.trim()) {
          return NextResponse.json({ error: `External URL required for "${item.label}"` }, { status: 400 });
        }
        try {
          new URL(item.externalUrl);
        } catch {
          return NextResponse.json({ error: `Invalid URL for "${item.label}"` }, { status: 400 });
        }
      }

      if (item.itemType === "internal_tool" || item.itemType === "internal_freebie") {
        if (!item.internalResourceId) {
          return NextResponse.json({ error: `Resource selection required for "${item.label}"` }, { status: 400 });
        }
        
        const resourceResult = await query(
          "SELECT id, category FROM internal_resources WHERE id = $1",
          [item.internalResourceId]
        );
        
        if (resourceResult.rows.length === 0) {
          return NextResponse.json({ error: `Invalid resource for "${item.label}"` }, { status: 400 });
        }
      }
    }

    let slug = generateSlug();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await query("SELECT id FROM resource_boxes WHERE slug = $1", [slug]);
      if (existing.rows.length === 0) break;
      slug = generateSlug();
      attempts++;
    }

    const boxResult = await query(
      `INSERT INTO resource_boxes (slug, title, subtitle, accent_color)
       VALUES ($1, $2, $3, $4)
       RETURNING id, slug`,
      [slug, title.trim(), subtitle?.trim() || null, accentColor || "#eab308"]
    );

    const boxId = boxResult.rows[0].id;
    const boxSlug = boxResult.rows[0].slug;

    for (const item of items as BoxItemInput[]) {
      await query(
        `INSERT INTO box_items (box_id, label, description, item_type, external_url, internal_resource_id, position)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          boxId,
          item.label.trim(),
          item.description?.trim() || null,
          item.itemType,
          item.externalUrl?.trim() || null,
          item.internalResourceId || null,
          item.position,
        ]
      );
    }

    return NextResponse.json({ success: true, slug: boxSlug });
  } catch (error) {
    console.error("Error creating resource box:", error);
    return NextResponse.json({ error: "Failed to create resource box" }, { status: 500 });
  }
}
