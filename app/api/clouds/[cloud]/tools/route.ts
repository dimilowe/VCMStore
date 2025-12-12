import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ENGINE_REGISTRY, type EngineConfig, type HeavyMode } from "@/engines";

function getEngineMetaBySlug(slug: string): { heavyMode: HeavyMode; hasAi: boolean } {
  const toolRow = Object.values(ENGINE_REGISTRY).find(
    (engine) => engine.apiRoutes?.some((route) => route.includes(slug))
  );
  
  if (toolRow) {
    return {
      heavyMode: toolRow.heavyMode ?? 'none',
      hasAi: toolRow.id === 'ai-analysis' || toolRow.id === 'ai-generate',
    };
  }
  
  return { heavyMode: 'none', hasAi: false };
}

function getEngineMetaByEngineType(engine: string | null): { heavyMode: HeavyMode; hasAi: boolean } {
  if (!engine) return { heavyMode: 'none', hasAi: false };
  
  const engineConfig = ENGINE_REGISTRY[engine as keyof typeof ENGINE_REGISTRY];
  if (engineConfig) {
    return {
      heavyMode: engineConfig.heavyMode ?? 'none',
      hasAi: engineConfig.id === 'ai-analysis' || engineConfig.id === 'ai-generate',
    };
  }
  
  return { heavyMode: 'none', hasAi: false };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cloud: string }> }
) {
  const { cloud } = await params;
  
  const cloudSlug = cloud.replace(/-cloud$/, "").replace(/-/g, "_");
  
  try {
    const result = await query(
      `SELECT 
        co.slug, 
        co.type,
        co.cloud_tags,
        COALESCE(co.data->>'title', co.slug) as title,
        COALESCE(co.data->>'description', '') as description,
        t.featured,
        t.segment,
        t.engine
      FROM cms_objects co
      LEFT JOIN tools t ON t.slug = co.slug
      WHERE $1 = ANY(co.cloud_tags)
        AND co.type = 'tool'
      ORDER BY t.featured DESC NULLS LAST, co.slug ASC
      LIMIT 50`,
      [cloudSlug]
    );
    
    return NextResponse.json({ 
      tools: result.rows.map(row => {
        const engineMeta = getEngineMetaByEngineType(row.engine);
        return {
          slug: row.slug,
          title: row.title || row.slug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          description: row.description,
          featured: row.featured || false,
          segment: row.segment,
          heavyMode: engineMeta.heavyMode,
          hasAi: engineMeta.hasAi,
        };
      })
    });
  } catch (error) {
    console.error("Failed to fetch cloud tools:", error);
    return NextResponse.json({ tools: [], error: "Failed to fetch tools" }, { status: 500 });
  }
}
