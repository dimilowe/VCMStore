import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { grantAccessForOffer, storePendingPurchase } from "@/lib/offers";
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

async function checkDuplicatePayment(sessionId: string): Promise<boolean> {
  const result = await query(
    "SELECT id FROM purchases WHERE stripe_payment_intent_id = $1",
    [sessionId]
  );
  return result.rows.length > 0;
}

async function getUserByEmail(email: string): Promise<{ id: string } | null> {
  const result = await query(
    "SELECT id FROM users WHERE email = $1",
    [email.toLowerCase().trim()]
  );
  return result.rows[0] || null;
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
      const offerKey = session.metadata?.offer_key;
      const cmsSlug = session.metadata?.cms_slug;
      const checkoutType = session.metadata?.checkout_type;

      if (!customerEmail) {
        console.error("[Webhook] Missing customer email in session:", session.id);
        return NextResponse.json({ error: "Missing customer email" }, { status: 400 });
      }

      if (checkoutType !== 'cms' || !offerKey || !cmsSlug) {
        console.error("[Webhook] Invalid CMS checkout metadata:", { checkoutType, offerKey, cmsSlug });
        return NextResponse.json({ error: "Missing offer_key or cms_slug" }, { status: 400 });
      }

      const isDuplicate = await checkDuplicatePayment(session.id);
      if (isDuplicate) {
        console.log(`[Webhook] Duplicate event ignored for session: ${session.id}`);
        return NextResponse.json({ received: true });
      }

      const user = await getUserByEmail(customerEmail);

      if (user) {
        await grantAccessForOffer({
          userId: user.id,
          offerKey,
          cmsSlug,
          stripeCustomerId: session.customer as string | null,
          stripeSessionId: session.id,
          amountTotal: session.amount_total,
        });
      } else {
        await storePendingPurchase({
          email: customerEmail,
          offerKey,
          cmsSlug,
          stripeSessionId: session.id,
          amountTotal: session.amount_total,
        });
      }

      return NextResponse.json({ received: true });
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
