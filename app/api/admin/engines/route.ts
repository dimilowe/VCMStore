import { NextRequest, NextResponse } from "next/server";
import { ALL_BLUEPRINTS, initializeBlueprints } from "@/data/engineBlueprints";
import {
  runExpansion,
  previewExpansion,
  getExpansionStats,
  getAllGeneratedShells,
} from "@/lib/engineExpansionGenerator";
import { generateAllShells } from "@/lib/engineBlueprint";

initializeBlueprints();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const blueprintId = searchParams.get("blueprintId");
  
  if (action === "stats") {
    const stats = getExpansionStats();
    return NextResponse.json(stats);
  }
  
  if (action === "shells") {
    const shells = getAllGeneratedShells();
    return NextResponse.json({ shells, count: shells.length });
  }
  
  if (action === "preview" && blueprintId) {
    const preview = previewExpansion(blueprintId);
    return NextResponse.json(preview);
  }
  
  const blueprints = ALL_BLUEPRINTS.map(bp => {
    const potentialShells = generateAllShells(bp);
    return {
      id: bp.id,
      name: bp.name,
      description: bp.description,
      engineId: bp.engineId,
      segment: bp.segment,
      dimensionCount: bp.dimensions.length,
      dimensions: bp.dimensions.map(d => ({
        id: d.id,
        label: d.label,
        valueCount: d.values.length,
      })),
      potentialShells: potentialShells.length,
      linkRules: bp.linkRules,
      defaults: bp.defaults,
    };
  });
  
  const stats = getExpansionStats();
  
  return NextResponse.json({
    blueprints,
    stats,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, blueprintId, blueprintIds } = body;
    
    if (action === "expand" && blueprintId) {
      initializeBlueprints();
      const result = runExpansion(blueprintId);
      return NextResponse.json(result);
    }
    
    if (action === "expandAll") {
      initializeBlueprints();
      const results = (blueprintIds || ALL_BLUEPRINTS.map(b => b.id)).map((id: string) => 
        runExpansion(id)
      );
      
      const summary = {
        totalCreated: results.reduce((sum: number, r: { createdCount: number }) => sum + r.createdCount, 0),
        totalSkipped: results.reduce((sum: number, r: { skippedCount: number }) => sum + r.skippedCount, 0),
        results,
      };
      
      return NextResponse.json(summary);
    }
    
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Engine expansion error:", error);
    return NextResponse.json(
      { error: "Failed to run expansion" },
      { status: 500 }
    );
  }
}
