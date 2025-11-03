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

export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();
    
    const stripe = getStripeClient();

    const result = await query(
      "SELECT * FROM products WHERE id = $1",
      [productId]
    );

    const product = result.rows[0];

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

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
      success_url: `${baseUrl}/dashboard?success=true`,
      cancel_url: `${baseUrl}/product/${product.slug}?canceled=true`,
      metadata: {
        productId: product.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
