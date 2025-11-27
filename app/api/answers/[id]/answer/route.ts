import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionData {
  userId?: number;
  email?: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long",
  cookieName: "vcm_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

async function isAdmin(): Promise<boolean> {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    return session.email === "dimitrioslowe@gmail.com";
  } catch {
    return false;
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await isAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const questionId = parseInt(id);

    if (isNaN(questionId)) {
      return NextResponse.json({ error: "Invalid question ID" }, { status: 400 });
    }

    const { answer } = await request.json();

    if (!answer || answer.trim().length === 0) {
      return NextResponse.json({ error: "Answer is required" }, { status: 400 });
    }

    const result = await query(
      `UPDATE questions SET answer = $1, updated_at = NOW() WHERE id = $2 RETURNING id, slug`,
      [answer.trim(), questionId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      slug: result.rows[0].slug 
    });
  } catch (error) {
    console.error("Error saving answer:", error);
    return NextResponse.json({ error: "Failed to save answer" }, { status: 500 });
  }
}
