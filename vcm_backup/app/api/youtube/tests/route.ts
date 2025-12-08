import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("youtube_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const testsResult = await query(
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
       WHERE t.user_id = $1
       GROUP BY t.id
       ORDER BY t.created_at DESC`,
      [userId]
    );

    return NextResponse.json({ tests: testsResult.rows });
  } catch (error) {
    console.error("Fetch tests error:", error);
    return NextResponse.json({ error: "Failed to fetch tests" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("youtube_user_id")?.value;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await request.json();
    const { video_id, video_title_original, video_thumbnail, rotate_every_minutes, variants } = body;

    if (!video_id || !variants || variants.length < 2 || variants.length > 5) {
      return NextResponse.json({ error: "Invalid request. Need 2-5 variants." }, { status: 400 });
    }

    if (rotate_every_minutes < 30) {
      return NextResponse.json({ error: "Rotation interval must be at least 30 minutes." }, { status: 400 });
    }

    const testResult = await query(
      `INSERT INTO youtube_title_tests (user_id, video_id, video_title_original, video_thumbnail, rotate_every_minutes, status)
       VALUES ($1, $2, $3, $4, $5, 'running')
       RETURNING *`,
      [userId, video_id, video_title_original, video_thumbnail, rotate_every_minutes]
    );

    const test = testResult.rows[0];

    const variantPromises = variants.map((title: string, index: number) =>
      query(
        `INSERT INTO youtube_title_variants (test_id, variant_index, title, is_current)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [test.id, index, title, index === 0]
      )
    );

    const variantResults = await Promise.all(variantPromises);
    const insertedVariants = variantResults.map(r => r.rows[0]);

    const firstVariant = insertedVariants[0];
    await query(
      `INSERT INTO youtube_rotation_log (test_id, variant_id, activated_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)`,
      [test.id, firstVariant.id]
    );

    return NextResponse.json({
      test: {
        ...test,
        variants: insertedVariants,
      },
    });
  } catch (error) {
    console.error("Create test error:", error);
    return NextResponse.json({ error: "Failed to create test" }, { status: 500 });
  }
}
