import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const keywords = message.toLowerCase();
    const result = await query(
      `SELECT id, slug, name, type 
       FROM products 
       WHERE visibility = 'public' 
       AND (
         LOWER(name) LIKE $1 
         OR LOWER(description) LIKE $1
         OR type LIKE $2
       )
       LIMIT 3`,
      [`%${keywords}%`, `%${keywords}%`]
    );

    const products = result.rows;

    let aiResponse = `Based on what you've shared, here are some insights:\n\n`;

    if (keywords.includes("dance") || keywords.includes("creator")) {
      aiResponse += "For content creators, consider building a strong funnel to convert your audience. ";
    }
    if (keywords.includes("paywall") || keywords.includes("subscription")) {
      aiResponse += "Implementing a paywall can help you monetize your premium content effectively. ";
    }
    if (keywords.includes("newsletter") || keywords.includes("email")) {
      aiResponse += "Email marketing is one of the highest ROI channels for creators. Start building your list today. ";
    }
    if (keywords.includes("app") || keywords.includes("software")) {
      aiResponse += "Software products can provide recurring revenue and scale better than services. ";
    }

    if (products.length > 0) {
      aiResponse += `\n\nI found some products that might help you achieve your goals.`;
    } else {
      aiResponse += `\n\nBrowse our store to find tools and resources tailored for creators like you!`;
    }

    return NextResponse.json({
      message: aiResponse,
      products: products,
    });
  } catch (error) {
    console.error("AI strategy error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
