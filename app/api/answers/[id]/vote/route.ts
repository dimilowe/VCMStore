import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { cookies } from "next/headers";

function getOrCreateSessionId(): string {
  const cookieStore = cookies();
  let sessionId = cookieStore.get("vcm_answers_session")?.value;

  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  return sessionId;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const questionId = parseInt(id);

    if (isNaN(questionId)) {
      return NextResponse.json({ error: "Invalid question ID" }, { status: 400 });
    }

    const sessionId = getOrCreateSessionId();

    const existingVote = await query(
      `SELECT id FROM question_votes WHERE question_id = $1 AND session_id = $2`,
      [questionId, sessionId]
    );

    if (existingVote.rows.length > 0) {
      return NextResponse.json({ error: "Already voted" }, { status: 409 });
    }

    await query(
      `INSERT INTO question_votes (question_id, session_id, created_at) VALUES ($1, $2, NOW())`,
      [questionId, sessionId]
    );

    const result = await query(
      `UPDATE questions SET upvote_count = upvote_count + 1, updated_at = NOW() WHERE id = $1 RETURNING upvote_count`,
      [questionId]
    );

    const response = NextResponse.json({ upvote_count: result.rows[0].upvote_count });
    
    response.cookies.set("vcm_answers_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  } catch (error) {
    console.error("Error voting:", error);
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}
