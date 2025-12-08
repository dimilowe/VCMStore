import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { UserSessionData, userSessionOptions } from "@/lib/user-session";

export async function POST() {
  try {
    const session = await getIronSession<UserSessionData>(await cookies(), userSessionOptions);
    
    // Destroy the session
    session.destroy();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
