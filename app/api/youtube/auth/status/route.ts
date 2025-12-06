import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const youtubeUserId = cookieStore.get("youtube_user_id")?.value;
    
    if (!youtubeUserId) {
      return NextResponse.json({ authenticated: false });
    }

    const result = await query(
      "SELECT id, email, channel_id, channel_title FROM youtube_users WHERE id = $1",
      [youtubeUserId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Auth status check error:", error);
    return NextResponse.json({ authenticated: false });
  }
}
