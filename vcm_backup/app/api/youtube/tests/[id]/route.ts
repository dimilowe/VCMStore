import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const userId = cookieStore.get("youtube_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const testResult = await query(
      `SELECT t.*, 
              json_agg(json_build_object(
                'id', v.id,
                'variant_index', v.variant_index,
                'title', v.title,
                'is_current', v.is_current,
                'impressions', v.impressions,
                'views', v.views,
                'clicks', v.clicks
              ) ORDER BY v.variant_index) as variants
       FROM youtube_title_tests t
       LEFT JOIN youtube_title_variants v ON v.test_id = t.id
       WHERE t.id = $1 AND t.user_id = $2
       GROUP BY t.id`,
      [id, userId]
    );

    if (testResult.rows.length === 0) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    return NextResponse.json({ test: testResult.rows[0] });
  } catch (error) {
    console.error("Fetch test error:", error);
    return NextResponse.json({ error: "Failed to fetch test" }, { status: 500 });
  }
}
