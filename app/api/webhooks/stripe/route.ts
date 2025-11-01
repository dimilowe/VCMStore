import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { findOrCreateUserByEmail } from "@/lib/auth";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-10-29.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
  try {
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
