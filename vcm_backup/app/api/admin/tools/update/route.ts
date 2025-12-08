import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";
import { canIndexTool } from "@/lib/toolInterlinking";
import fs from "fs";
import path from "path";

interface RolloutConfig {
  _comment?: string;
  tools: Record<string, {
    isIndexed?: boolean;
    isFeatured?: boolean;
    inDirectory?: boolean;
    segment?: string;
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

function saveRolloutConfig(config: RolloutConfig): void {
  const configPath = path.join(process.cwd(), "data/toolRolloutConfig.json");
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
}

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

    const allowedFields = ["isIndexed", "isFeatured", "inDirectory", "segment"];
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

    const config = loadRolloutConfig();

    if (!config.tools[slug]) {
      config.tools[slug] = {};
    }

    (config.tools[slug] as Record<string, unknown>)[field] = value;

    saveRolloutConfig(config);

    return NextResponse.json({ success: true, slug, field, value });
  } catch (error) {
    console.error("Failed to update tool config:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
