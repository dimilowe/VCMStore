import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 100);
}

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'hot';
    
    const sessionId = await getOrCreateSessionId();
    
    let orderBy: string;
    switch (sort) {
      case 'new':
        orderBy = 'created_at DESC';
        break;
      case 'top':
        orderBy = 'upvote_count DESC, created_at DESC';
        break;
      case 'hot':
      default:
        orderBy = `(upvote_count::float / POWER(EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600 + 2, 1.5)) DESC`;
        break;
    }

    const result = await query(
      `SELECT i.*, 
        EXISTS(SELECT 1 FROM idea_votes v WHERE v.idea_id = i.id AND v.session_id = $1) as has_voted
       FROM ideas i 
       ORDER BY ${orderBy}
       LIMIT 50`,
      [sessionId]
    );

    return NextResponse.json({ ideas: result.rows });
  } catch (error) {
    console.error('Failed to fetch ideas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, one_liner, problem, who_it_serves, solution, monetization, why_now, tags } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    if (!one_liner?.trim()) {
      return NextResponse.json({ error: 'One-liner is required' }, { status: 400 });
    }
    if (!problem?.trim()) {
      return NextResponse.json({ error: 'Problem description is required' }, { status: 400 });
    }
    if (!who_it_serves?.trim()) {
      return NextResponse.json({ error: 'Target audience is required' }, { status: 400 });
    }
    if (!solution?.trim()) {
      return NextResponse.json({ error: 'Solution is required' }, { status: 400 });
    }

    let baseSlug = generateSlug(title.trim());
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existing = await query('SELECT 1 FROM ideas WHERE slug = $1', [slug]);
      if (existing.rows.length === 0) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const result = await query(
      `INSERT INTO ideas (slug, title, one_liner, problem, who_it_serves, solution, monetization, why_now, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, slug`,
      [
        slug,
        title.trim(),
        one_liner.trim().slice(0, 160),
        problem.trim(),
        who_it_serves.trim(),
        solution.trim(),
        monetization?.trim() || null,
        why_now?.trim() || null,
        tags?.trim() || null,
      ]
    );

    return NextResponse.json({
      success: true,
      id: result.rows[0].id,
      slug: result.rows[0].slug,
    });
  } catch (error) {
    console.error('Failed to create idea:', error);
    return NextResponse.json(
      { error: 'Failed to create idea' },
      { status: 500 }
    );
  }
}
