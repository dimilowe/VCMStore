import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await query(
      "SELECT id FROM subscribers WHERE email = $1",
      [email.toLowerCase().trim()]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "You're already subscribed!" },
        { status: 409 }
      );
    }

    // Add subscriber
    await query(
      "INSERT INTO subscribers (email, source) VALUES ($1, $2)",
      [email.toLowerCase().trim(), source || 'blog']
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
