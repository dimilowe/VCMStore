import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";
import { 
  getAllToolSkinsForEngine, 
  ToolSkin as MatrixToolSkin,
  ToolSegment,
  ToolPriority,
  ENGINE_KEYWORD_MATRICES
} from "@/data/engineKeywordMatrix";
import type { EngineType } from "@/engines";
import { toolsRegistry } from "@/data/toolsRegistry";
import { getPreflightStatus } from "@/lib/toolInterlinking";
import { query } from "@/lib/db";
import fs from "fs";
import path from "path";

interface RolloutConfig {
  tools: Record<string, {
    isIndexed?: boolean;
    isFeatured?: boolean;
    inDirectory?: boolean;
    segment?: ToolSegment;
  }>;
}

function loadRolloutConfig(): RolloutConfig {
  try {
    const configPath = path.join(process.cwd(), "data/toolRolloutConfig.json");
    const data = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(data);
  } catch {
    return { tools: {} };
  }
}

export async function GET() {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rolloutConfig = loadRolloutConfig();

  const allTools: Array<{
    slug: string;
    name: string;
    engineType: string;
    segment: string;
    clusterSlug: string;
    isIndexed: boolean;
    isFeatured: boolean;
    inDirectory: boolean;
    priority: string;
    dimensions?: { width: number; height: number };
    h1: string;
    primaryKeyword: string;
    linkStatus: {
      status: "ready" | "warning" | "error";
      label: string;
      details: string[];
    };
    status?: string;
  }> = [];

  const legacySlugs = new Set<string>();
  for (const tool of toolsRegistry) {
    legacySlugs.add(tool.slug);
    const override = rolloutConfig.tools[tool.slug] || {};
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
    allTools.push({
      slug: tool.slug,
      name: tool.name,
      engineType: tool.engineType || "legacy",
      segment: override.segment || categoryToSegment[tool.category] || "utility",
      clusterSlug: tool.clusterSlug || "",
      isIndexed: override.isIndexed ?? true,
      isFeatured: override.isFeatured ?? false,
      inDirectory: override.inDirectory ?? true,
      priority: String(tool.priority) || "primary",
      h1: tool.name,
      primaryKeyword: tool.primaryKeyword || "",
      linkStatus: getPreflightStatus(tool.slug),
    });
  }

  const engineTypes = Object.keys(ENGINE_KEYWORD_MATRICES) as EngineType[];
  for (const engineType of engineTypes) {
    const skins = getAllToolSkinsForEngine(engineType);
    for (const skin of skins) {
      if (legacySlugs.has(skin.slug)) continue;
      
      const override = rolloutConfig.tools[skin.slug] || {};
      allTools.push({
        slug: skin.slug,
        name: skin.name,
        engineType: skin.engineType,
        segment: override.segment || skin.segment,
        clusterSlug: skin.clusterSlug || "",
        isIndexed: override.isIndexed ?? skin.isIndexed ?? false,
        isFeatured: override.isFeatured ?? false,
        inDirectory: override.inDirectory ?? false,
        priority: skin.priority,
        dimensions: skin.dimensions,
        h1: skin.h1,
        primaryKeyword: skin.primaryKeyword,
        linkStatus: getPreflightStatus(skin.slug),
      });
    }
  }

  const existingSlugs = new Set(allTools.map(t => t.slug));
  try {
    const dbResult = await query(`SELECT * FROM tools ORDER BY created_at DESC`);
    for (const row of dbResult.rows) {
      if (existingSlugs.has(row.slug)) continue;
      
      allTools.push({
        slug: row.slug,
        name: row.name,
        engineType: row.engine || "generated",
        segment: row.segment || "secondary",
        clusterSlug: row.cluster || "",
        isIndexed: row.is_indexed === true,
        isFeatured: row.featured === true,
        inDirectory: row.in_directory === true,
        priority: "secondary",
        h1: row.name,
        primaryKeyword: row.name.toLowerCase().replace(/\s+/g, " "),
        linkStatus: {
          status: row.link_status === "Ready" ? "ready" : row.link_status === "Warning" ? "warning" : "error",
          label: row.link_status || "Not Ready",
          details: [],
        },
        status: row.status,
      });
    }
  } catch (error) {
    console.error("Error fetching tools from database:", error);
  }

  allTools.sort((a, b) => {
    const segmentOrder: Record<string, number> = {
      creator: 0,
      social: 1,
      utility: 2,
      finance: 3,
      health: 4,
      mbb: 5,
    };
    const aOrder = segmentOrder[a.segment] ?? 6;
    const bOrder = segmentOrder[b.segment] ?? 6;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.name.localeCompare(b.name);
  });

  return NextResponse.json({ tools: allTools });
}
