import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { UserSessionData, userSessionOptions } from "@/lib/user-session";
import { createUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const user = await createUser(email, password);

    const session = await getIronSession<UserSessionData>(await cookies(), userSessionOptions);
    session.userId = user.id;
    session.email = user.email;
    session.isLoggedIn = true;
    session.isAdmin = false;
    await session.save();

    return NextResponse.json({ success: true, userId: user.id, email: user.email });
  } catch (error: any) {
    console.error("Signup error:", error);
    
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
