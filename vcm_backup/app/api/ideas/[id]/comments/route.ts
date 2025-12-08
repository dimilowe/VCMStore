import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

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

    const body = await request.json();
    const { name, body: commentBody } = body;

    if (!commentBody?.trim()) {
      return NextResponse.json({ error: 'Comment body is required' }, { status: 400 });
    }

    const ideaExists = await query('SELECT 1 FROM ideas WHERE id = $1', [ideaId]);
    if (ideaExists.rows.length === 0) {
      return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
    }

    const result = await query(
      `INSERT INTO idea_comments (idea_id, author_name, body)
       VALUES ($1, $2, $3)
       RETURNING id, author_name, body, created_at`,
      [ideaId, name?.trim() || 'Anonymous', commentBody.trim()]
    );

    await query(
      'UPDATE ideas SET comment_count = comment_count + 1 WHERE id = $1',
      [ideaId]
    );

    return NextResponse.json({
      success: true,
      comment: result.rows[0],
    });
  } catch (error) {
    console.error('Comment failed:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}
