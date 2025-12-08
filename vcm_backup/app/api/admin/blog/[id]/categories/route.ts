import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const result = await query(
      "SELECT category_id FROM blog_post_categories WHERE blog_post_id = $1",
      [id]
    );
    
    const categoryIds = result.rows.map(row => row.category_id);
    
    return NextResponse.json({ categoryIds });
  } catch (error) {
    console.error("Get post categories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post categories" },
      { status: 500 }
    );
  }
}
