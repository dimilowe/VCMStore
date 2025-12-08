import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";
import { listTools, updateTool, ToolRecord } from "@/lib/toolsRepo";
import { getPreflightStatus } from "@/lib/toolInterlinking";
import { query } from "@/lib/db";

export async function GET() {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dbTools = await listTools();
    
    const toolSlugs = dbTools.map((t: ToolRecord) => `/tools/${t.slug}`);
    const indexStatusResult = await query(
      `SELECT url, is_indexed FROM global_urls WHERE url = ANY($1)`,
      [toolSlugs]
    );
    const indexStatusMap = new Map<string, boolean>();
    for (const row of indexStatusResult.rows) {
      indexStatusMap.set(row.url, row.is_indexed);
    }
    
    const tools = dbTools.map((tool: ToolRecord) => {
      const categoryToSegment: Record<string, string> = {
        creator: "creator",
        social: "social",
        image: "utility",
        video: "utility",
        writing: "utility",
        business: "mbb",
        file: "utility",
        calculators: "mbb",
        utilities: "utility",
        ai: "creator",
      };
      
      const segment = tool.segment || (tool.category ? categoryToSegment[tool.category] : null) || "utility";
      const toolUrl = `/tools/${tool.slug}`;
      const isIndexed = indexStatusMap.get(toolUrl) ?? false;
      
      return {
        slug: tool.slug,
        name: tool.name,
        engineType: tool.engine || "legacy",
        segment,
        clusterSlug: tool.cluster || "",
        isIndexed,
        isFeatured: tool.featured,
        inDirectory: tool.inDirectory,
        priority: tool.priority?.toString() || "50",
        h1: tool.name,
        primaryKeyword: tool.primaryKeyword || "",
        linkStatus: getPreflightStatus(tool.slug),
        status: tool.status,
        source: tool.source,
        category: tool.category,
      };
    });

    tools.sort((a, b) => {
      const segmentOrder: Record<string, number> = {
        creator: 0,
        social: 1,
        utility: 2,
        finance: 3,
        health: 4,
        mbb: 5,
        secondary: 6,
      };
      const aOrder = segmentOrder[a.segment] ?? 7;
      const bOrder = segmentOrder[b.segment] ?? 7;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({ tools });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch tools" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, isIndexed, isFeatured, inDirectory, status } = body;

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    if (isIndexed !== undefined) {
      const toolUrl = `/tools/${slug}`;
      const result = await query(
        `INSERT INTO global_urls (url, type, is_indexed, indexed_at)
         VALUES ($1, 'tool', $2, CASE WHEN $2 = true THEN NOW() ELSE NULL END)
         ON CONFLICT (url) DO UPDATE SET 
           is_indexed = $2, 
           indexed_at = CASE WHEN $2 = true THEN NOW() ELSE NULL END`,
        [toolUrl, isIndexed]
      );
      if (result.rowCount === 0) {
        return NextResponse.json({ error: "Failed to update indexing status" }, { status: 500 });
      }
    }

    const updates: Record<string, any> = {};
    if (isFeatured !== undefined) updates.featured = isFeatured;
    if (inDirectory !== undefined) updates.inDirectory = inDirectory;
    if (status !== undefined) updates.status = status;

    if (Object.keys(updates).length > 0) {
      const updated = await updateTool(slug, updates);
      if (!updated) {
        return NextResponse.json({ error: "Tool not found" }, { status: 404 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating tool:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update tool" },
      { status: 500 }
    );
  }
}
