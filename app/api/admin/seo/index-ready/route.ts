import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, AdminSessionData } from '@/lib/admin-session';
import { indexReadyPages } from '@/lib/seo/readyInspector';

export async function POST() {
  try {
    const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
    
    if (!session.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { indexedCount, indexedSlugs } = await indexReadyPages();

    return NextResponse.json({
      success: true,
      indexedCount,
      indexedSlugs,
    });
  } catch (error) {
    console.error('Index ready pages error:', error);
    return NextResponse.json(
      { error: 'Failed to index pages' },
      { status: 500 }
    );
  }
}
