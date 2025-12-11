import { NextResponse } from "next/server";
import { getAllIndexedPillars } from "@/lib/cms/getPillarBySlug";

export async function GET() {
  try {
    const pillars = await getAllIndexedPillars();
    return NextResponse.json({ pillars });
  } catch (error) {
    console.error("Error fetching pillars:", error);
    return NextResponse.json({ error: "Failed to fetch pillars" }, { status: 500 });
  }
}
