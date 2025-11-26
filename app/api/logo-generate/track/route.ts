import { NextRequest, NextResponse } from 'next/server';

let generationCount = 0;
let ctaClickCount = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event } = body;

    if (event === 'generation') {
      generationCount++;
      console.log(`[Logo Generator] Total generations: ${generationCount}`);
    } else if (event === 'cta_click') {
      ctaClickCount++;
      console.log(`[Logo Generator] Total CTA clicks: ${ctaClickCount}`);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    generations: generationCount,
    ctaClicks: ctaClickCount,
  });
}
