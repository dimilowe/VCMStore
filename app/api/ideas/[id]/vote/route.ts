import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';

function generateSessionId(): string {
  return 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies();
  let sessionId = cookieStore.get('vcm_session')?.value;
  
  if (!sessionId) {
    sessionId = generateSessionId();
    cookieStore.set('vcm_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  
  return sessionId;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ideaId = parseInt(id, 10);

    if (isNaN(ideaId)) {
      return NextResponse.json({ error: 'Invalid idea ID' }, { status: 400 });
    }

    const sessionId = await getOrCreateSessionId();

    const existingVote = await query(
      'SELECT id FROM idea_votes WHERE idea_id = $1 AND session_id = $2',
      [ideaId, sessionId]
    );

    let hasVoted: boolean;

    if (existingVote.rows.length > 0) {
      await query(
        'DELETE FROM idea_votes WHERE idea_id = $1 AND session_id = $2',
        [ideaId, sessionId]
      );
      await query(
        'UPDATE ideas SET upvote_count = GREATEST(upvote_count - 1, 0) WHERE id = $1',
        [ideaId]
      );
      hasVoted = false;
    } else {
      await query(
        'INSERT INTO idea_votes (idea_id, session_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [ideaId, sessionId]
      );
      await query(
        'UPDATE ideas SET upvote_count = upvote_count + 1 WHERE id = $1',
        [ideaId]
      );
      hasVoted = true;
    }

    const result = await query(
      'SELECT upvote_count FROM ideas WHERE id = $1',
      [ideaId]
    );

    return NextResponse.json({
      success: true,
      upvote_count: result.rows[0]?.upvote_count || 0,
      has_voted: hasVoted,
    });
  } catch (error) {
    console.error('Vote failed:', error);
    return NextResponse.json(
      { error: 'Failed to vote' },
      { status: 500 }
    );
  }
}
