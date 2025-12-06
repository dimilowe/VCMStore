import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function POST(
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

    const testCheck = await query(
      "SELECT id FROM youtube_title_tests WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (testCheck.rows.length === 0) {
      return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    await query(
      "UPDATE youtube_title_tests SET status = 'stopped', updated_at = CURRENT_TIMESTAMP WHERE id = $1",
      [id]
    );

    await query(
      "UPDATE youtube_rotation_log SET deactivated_at = CURRENT_TIMESTAMP WHERE test_id = $1 AND deactivated_at IS NULL",
      [id]
    );

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
       WHERE t.id = $1
       GROUP BY t.id`,
      [id]
    );

    return NextResponse.json({ test: testResult.rows[0] });
  } catch (error) {
    console.error("Stop test error:", error);
    return NextResponse.json({ error: "Failed to stop test" }, { status: 500 });
  }
}
