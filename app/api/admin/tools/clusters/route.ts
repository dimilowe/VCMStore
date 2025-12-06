import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";
import { CLUSTER_REGISTRY } from "@/data/clusterRegistry";
import { getAllToolSkinsForEngine, ENGINE_KEYWORD_MATRICES } from "@/data/engineKeywordMatrix";
import type { EngineType } from "@/engines";
import { toolsRegistry } from "@/data/toolsRegistry";
import fs from "fs";
import path from "path";

interface RolloutConfig {
  tools: Record<string, {
    isIndexed?: boolean;
    isFeatured?: boolean;
    inDirectory?: boolean;
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

  const legacyBySlug = new Map<string, typeof toolsRegistry[0]>();
  for (const tool of toolsRegistry) {
    legacyBySlug.set(tool.slug, tool);
  }

  const allMatrixSkins = new Map<string, { isIndexed: boolean }>();
  const engineTypes = Object.keys(ENGINE_KEYWORD_MATRICES) as EngineType[];
  for (const engineType of engineTypes) {
    const skins = getAllToolSkinsForEngine(engineType);
    for (const skin of skins) {
      const override = rolloutConfig.tools[skin.slug];
      allMatrixSkins.set(skin.slug, {
        isIndexed: override?.isIndexed ?? skin.isIndexed ?? false,
      });
    }
  }

  const clusters = Object.values(CLUSTER_REGISTRY).map((cluster) => {
    let toolCount = 0;
    let indexedCount = 0;

    for (const slug of cluster.toolSlugs) {
      const legacy = legacyBySlug.get(slug);
      const matrix = allMatrixSkins.get(slug);
      const override = rolloutConfig.tools[slug];

      if (legacy || matrix) {
        toolCount++;
        const isIndexed = override?.isIndexed ?? matrix?.isIndexed ?? (legacy ? true : false);
        if (isIndexed) indexedCount++;
      }
    }

    return {
      id: cluster.id,
      pillarSlug: cluster.pillarSlug,
      pillarTitle: cluster.pillarTitle,
      engineId: cluster.engineId,
      toolCount,
      indexedCount,
      articleCount: cluster.articleSlugs.length,
    };
  });

  clusters.sort((a, b) => b.toolCount - a.toolCount);

  return NextResponse.json({ clusters });
}
