import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, AdminSessionData } from '@/lib/admin-session';
import { getUnindexedPagesWithStatus } from '@/lib/seo/readyInspector';

export async function GET() {
  try {
    const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
    
    if (!session.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pages, stats } = await getUnindexedPagesWithStatus();

    return NextResponse.json({
      success: true,
      pages,
      stats,
    });
  } catch (error) {
    console.error('Get unindexed pages error:', error);
    return NextResponse.json(
      { error: 'Failed to get unindexed pages' },
      { status: 500 }
    );
  }
}
