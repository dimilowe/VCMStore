import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";
import { canIndexTool } from "@/lib/toolInterlinking";
import { query } from "@/lib/db";
import { updateTool } from "@/lib/toolsRepo";

export async function POST(request: NextRequest) {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, field, value } = body;

    if (!slug || !field) {
      return NextResponse.json({ error: "Missing slug or field" }, { status: 400 });
    }

    const allowedFields = ["isIndexed", "isFeatured", "inDirectory", "segment", "clusterSlug"];
    if (!allowedFields.includes(field)) {
      return NextResponse.json({ error: "Invalid field" }, { status: 400 });
    }

    if (field === "isIndexed" && value === true) {
      const canIndex = canIndexTool(slug);
      if (!canIndex.allowed) {
        return NextResponse.json({ 
          error: canIndex.reason || "Cannot index this tool yet",
          blocked: true 
        }, { status: 400 });
      }
    }

    if (field === "isIndexed") {
      const toolUrl = `/tools/${slug}`;
      const result = await query(
        `INSERT INTO global_urls (url, type, is_indexed, indexed_at)
         VALUES ($1, 'tool', $2, CASE WHEN $2 = true THEN NOW() ELSE NULL END)
         ON CONFLICT (url) DO UPDATE SET 
           is_indexed = $2, 
           indexed_at = CASE WHEN $2 = true THEN NOW() ELSE NULL END`,
        [toolUrl, value]
      );
      if (result.rowCount === 0) {
        return NextResponse.json({ error: "Failed to update indexing status" }, { status: 500 });
      }
    } else {
      const fieldMap: Record<string, string> = {
        isFeatured: "featured",
        inDirectory: "inDirectory",
        segment: "segment",
        clusterSlug: "cluster_slug",
      };
      const dbField = fieldMap[field] || field;
      await updateTool(slug, { [dbField]: value });
    }

    return NextResponse.json({ success: true, slug, field, value });
  } catch (error) {
    console.error("Failed to update tool config:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
