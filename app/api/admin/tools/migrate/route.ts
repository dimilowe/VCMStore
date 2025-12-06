import { NextResponse } from "next/server";
import { migrateToolsToDatabase, getMigrationStats } from "@/scripts/migrateToolsToDb";

export async function POST() {
  try {
    const result = await migrateToolsToDatabase();
    const stats = await getMigrationStats();
    
    return NextResponse.json({
      success: true,
      ...result,
      stats,
    });
  } catch (error) {
    console.error("Migration error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Migration failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stats = await getMigrationStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to get stats" },
      { status: 500 }
    );
  }
}
