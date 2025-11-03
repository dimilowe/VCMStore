import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { UserSessionData, userSessionOptions } from "@/lib/user-session";
import { findOrCreateUserByEmail } from "@/lib/auth";
import Stripe from "stripe";

function getStripeClient() {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(apiKey, {
    apiVersion: "2025-10-29.clover",
  });
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    
    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    const stripe = getStripeClient();
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);
    
    const customerEmail = checkoutSession.customer_email || checkoutSession.customer_details?.email;
    
    if (!customerEmail) {
      return NextResponse.json({ error: "No email found" }, { status: 400 });
    }

    // Check if user exists
    const { query } = await import("@/lib/db");
    const result = await query(
      "SELECT id, email FROM users WHERE email = $1",
      [customerEmail.toLowerCase().trim()]
    );

    if (result.rows.length > 0) {
      // User exists - return their info so they can login
      return NextResponse.json({ 
        userExists: true, 
        email: customerEmail 
      });
    } else {
      // User doesn't exist - return email so they can sign up
      return NextResponse.json({ 
        userExists: false, 
        email: customerEmail 
      });
    }
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json(
      { error: "Failed to check session" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getIronSession<UserSessionData>(await cookies(), userSessionOptions);
    
    if (session.isLoggedIn && session.userId) {
      return NextResponse.json({
        isLoggedIn: true,
        userId: session.userId,
        email: session.email,
      });
    }
    
    return NextResponse.json({ isLoggedIn: false });
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ isLoggedIn: false });
  }
}
