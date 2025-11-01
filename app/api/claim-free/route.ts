import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { productId, userId } = await request.json();

    if (!productId || !userId) {
      return NextResponse.json(
        { error: "Product ID and User ID are required" },
        { status: 400 }
      );
    }

    await query(
      `INSERT INTO entitlements (user_id, product_id, source) 
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id) DO NOTHING`,
      [userId, productId, "free_claim"]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Claim error:", error);
    return NextResponse.json(
      { error: "Failed to claim product" },
      { status: 500 }
    );
  }
}
