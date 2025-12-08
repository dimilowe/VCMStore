import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
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

function getPaymentReference(session: Stripe.Checkout.Session): string {
  return (session.payment_intent as string) || 
         (session.subscription as string) || 
         session.id;
}

async function handleCMSPurchase(
  email: string, 
  offerKey: string, 
  cmsSlug: string, 
  session: Stripe.Checkout.Session
) {
  const customerEmail = email.toLowerCase().trim();
  const paymentRef = getPaymentReference(session);
  
  const existingPurchase = await query(
    "SELECT id FROM purchases WHERE stripe_payment_intent_id = $1",
    [paymentRef]
  );
  
  if (existingPurchase.rows.length > 0) {
    console.log(`[Webhook] Duplicate event ignored for payment: ${paymentRef}`);
    return;
  }

  const userResult = await query(
    "SELECT id FROM users WHERE email = $1",
    [customerEmail]
  );

  const userId = userResult.rows.length > 0 ? userResult.rows[0].id : null;

  await query(
    `INSERT INTO purchases (user_id, product_slug, stripe_payment_intent_id, amount, status, metadata)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      userId,
      cmsSlug,
      paymentRef,
      session.amount_total,
      userId ? "completed" : "pending",
      JSON.stringify({ offerKey, cmsSlug })
    ]
  );

  if (userId) {
    await query(
      `INSERT INTO entitlements (user_id, product_slug, source, metadata, updated_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT DO NOTHING`,
      [userId, cmsSlug, "purchase", JSON.stringify({ offerKey, cmsSlug })]
    );
  }

  console.log(`[Webhook] CMS purchase: email=${customerEmail}, offerKey=${offerKey}, cmsSlug=${cmsSlug}, userId=${userId || 'pending'}`);
}

async function handleLegacyPurchase(
  email: string, 
  productId: string, 
  session: Stripe.Checkout.Session
) {
  const customerEmail = email.toLowerCase().trim();
  const paymentRef = getPaymentReference(session);
  
  const existingPurchase = await query(
    "SELECT id FROM purchases WHERE stripe_payment_intent_id = $1",
    [paymentRef]
  );
  
  if (existingPurchase.rows.length > 0) {
    console.log(`[Webhook] Duplicate event ignored for payment: ${paymentRef}`);
    return;
  }

  const userResult = await query(
    "SELECT id FROM users WHERE email = $1",
    [customerEmail]
  );

  if (userResult.rows.length > 0) {
    const userId = userResult.rows[0].id;

    await query(
      `INSERT INTO purchases (user_id, product_id, stripe_payment_intent_id, amount, status) 
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, productId, paymentRef, session.amount_total, "completed"]
    );

    await query(
      `INSERT INTO entitlements (user_id, product_id, source) 
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id) DO NOTHING`,
      [userId, productId, "purchase"]
    );
  } else {
    await query(
      `INSERT INTO purchases (user_id, product_id, stripe_payment_intent_id, amount, status) 
       VALUES ($1, $2, $3, $4, $5)`,
      [null, productId, paymentRef, session.amount_total, "pending"]
    );
  }

  console.log(`[Webhook] Legacy purchase: email=${customerEmail}, productId=${productId}`);
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
      const checkoutType = session.metadata?.checkoutType;
      const offerKey = session.metadata?.offerKey;
      const cmsSlug = session.metadata?.cmsSlug;
      const productId = session.metadata?.productId;

      if (!customerEmail) {
        console.error("[Webhook] Missing customer email");
        return NextResponse.json({ error: "Missing customer email" }, { status: 400 });
      }

      if (checkoutType === 'cms' && cmsSlug) {
        await handleCMSPurchase(
          customerEmail, 
          offerKey || cmsSlug.toUpperCase(), 
          cmsSlug, 
          session
        );
        return NextResponse.json({ received: true });
      }

      if (checkoutType === 'legacy' && productId) {
        await handleLegacyPurchase(customerEmail, productId, session);
        return NextResponse.json({ received: true });
      }

      if (productId) {
        await handleLegacyPurchase(customerEmail, productId, session);
        return NextResponse.json({ received: true });
      }

      console.error("[Webhook] Unrecognized checkout type:", { checkoutType, cmsSlug, productId });
      return NextResponse.json({ error: "Unrecognized checkout type" }, { status: 400 });
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
