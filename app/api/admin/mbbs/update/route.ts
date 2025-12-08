import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { query } from "@/lib/db";
import { AdminSessionData, sessionOptions } from "@/lib/admin-session";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const session = await getIronSession<AdminSessionData>(cookieStore, sessionOptions);

  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug, field, value } = await request.json();

    if (!slug || !field) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (field === "is_indexed") {
      await query(
        `UPDATE cms_objects 
         SET data = jsonb_set(data, '{is_indexed}', $1::jsonb), updated_at = NOW() 
         WHERE slug = $2 AND type = 'mbb'`,
        [JSON.stringify(value), slug]
      );

      await query(
        `UPDATE global_urls SET is_indexed = $1, updated_at = NOW() WHERE url = $2`,
        [value, `/mbb/${slug}`]
      );

      return NextResponse.json({ ok: true, slug, field, value });
    }

    return NextResponse.json({ error: "Unsupported field" }, { status: 400 });
  } catch (error) {
    console.error("Failed to update MBB:", error);
    return NextResponse.json({ error: "Failed to update MBB" }, { status: 500 });
  }
}
