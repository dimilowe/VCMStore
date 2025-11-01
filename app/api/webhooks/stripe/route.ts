import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
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

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
  }
  return secret;
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripeClient();
    const webhookSecret = getWebhookSecret();
    
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") || "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const customerEmail = session.customer_email || session.customer_details?.email;
      const productId = session.metadata?.productId;

      if (!customerEmail || !productId) {
        console.error("Missing email or productId in webhook");
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
      }

      const user = await findOrCreateUserByEmail(customerEmail);

      await query(
        `INSERT INTO purchases (user_id, product_id, stripe_payment_id, amount, status) 
         VALUES ($1, $2, $3, $4, $5)`,
        [user.id, productId, session.payment_intent, session.amount_total, "completed"]
      );

      await query(
        `INSERT INTO entitlements (user_id, product_id, source) 
         VALUES ($1, $2, $3)
         ON CONFLICT (user_id, product_id) DO NOTHING`,
        [user.id, productId, "purchase"]
      );
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
