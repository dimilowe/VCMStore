import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, properties } = body;

    if (!event) {
      return NextResponse.json({ error: 'Event name required' }, { status: 400 });
    }

    console.log(`[Analytics] ${event}:`, JSON.stringify(properties || {}));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics] Error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}
