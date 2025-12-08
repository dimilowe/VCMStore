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

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:5000';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const forwardedProto = request.headers.get('x-forwarded-proto');
  return `${forwardedProto || protocol}://${host}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, mode, offerKey, cmsSlug, productId } = body;

    if (!priceId && !productId) {
      return NextResponse.json(
        { error: "Missing priceId or productId" },
        { status: 400 }
      );
    }

    const stripe = getStripeClient();
    const baseUrl = getBaseUrl(request);

    if (priceId) {
      if (!cmsSlug) {
        return NextResponse.json(
          { error: "Missing cmsSlug for CMS product checkout" },
          { status: 400 }
        );
      }

      const checkoutMode = mode === 'subscription' ? 'subscription' : 'payment';
      const effectiveOfferKey = offerKey || cmsSlug.toUpperCase().replace(/-/g, '_');
      
      const successUrl = `${baseUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}&product=${cmsSlug}`;
      const cancelUrl = `${baseUrl}/products/${cmsSlug}?canceled=true`;

      const session = await stripe.checkout.sessions.create({
        mode: checkoutMode,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          offerKey: effectiveOfferKey,
          cmsSlug: cmsSlug,
          checkoutType: 'cms',
        },
      });

      return NextResponse.json({ url: session.url });
    }

    if (productId) {
      const result = await query(
        "SELECT * FROM products WHERE id = $1",
        [productId]
      );

      const product = result.rows[0];

      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      const imageUrl = product.thumbnail_url?.startsWith('http') ? product.thumbnail_url : undefined;
      
      const session = await stripe.checkout.sessions.create({
        mode: product.price_type === "subscription" ? "subscription" : "payment",
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                description: product.description,
                ...(imageUrl && { images: [imageUrl] }),
              },
              unit_amount: Math.round(product.price),
              ...(product.price_type === "subscription" && {
                recurring: {
                  interval: "month",
                },
              }),
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/product/${product.slug}?canceled=true`,
        metadata: {
          productId: product.id.toString(),
          checkoutType: 'legacy',
        },
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json(
      { error: "Invalid checkout request" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
