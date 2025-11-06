import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { feedback_type, subject, message, email, priority } = await req.json();

    if (!feedback_type || !subject || !message) {
      return NextResponse.json(
        { error: 'Feedback type, subject, and message are required' },
        { status: 400 }
      );
    }

    await query(
      `INSERT INTO feedback (feedback_type, subject, message, email, priority)
       VALUES ($1, $2, $3, $4, $5)`,
      [feedback_type, subject, message, email || null, priority || 'medium']
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
