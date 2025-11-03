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

    const user = await findOrCreateUserByEmail(customerEmail);
    
    const session = await getIronSession<UserSessionData>(await cookies(), userSessionOptions);
    session.userId = user.id;
    session.email = user.email;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error("Session creation error:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
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
