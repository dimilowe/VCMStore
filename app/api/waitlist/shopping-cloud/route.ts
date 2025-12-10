import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { query } from '@/lib/db';

interface SessionData {
  userId?: number;
  email?: string;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long',
  cookieName: 'vcm_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  },
};

export async function POST(request: NextRequest) {
  try {
    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
    
    if (!session.userId) {
      return NextResponse.json(
        { error: 'Please sign in to join the waitlist', requiresAuth: true },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { sourceToolSlug, sourceCTAId } = body;

    await query(
      `INSERT INTO waitlist_signups (user_id, waitlist_key, source_tool, source_cta, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (user_id, waitlist_key) DO UPDATE SET
         source_tool = EXCLUDED.source_tool,
         source_cta = EXCLUDED.source_cta,
         updated_at = NOW()`,
      [session.userId, 'shopping-cloud-pro', sourceToolSlug || null, sourceCTAId || null]
    );

    console.log(`[Waitlist] User ${session.userId} joined shopping-cloud-pro waitlist from ${sourceToolSlug}/${sourceCTAId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Waitlist] Error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}
