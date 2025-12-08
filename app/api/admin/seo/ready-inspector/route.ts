import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, AdminSessionData } from '@/lib/admin-session';
import { runReadyInspector } from '@/lib/seo/readyInspector';

export async function POST() {
  try {
    const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
    
    if (!session.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { summary, results } = await runReadyInspector();

    return NextResponse.json({
      success: true,
      summary,
      results,
    });
  } catch (error) {
    console.error('Ready inspector error:', error);
    return NextResponse.json(
      { error: 'Failed to run inspector' },
      { status: 500 }
    );
  }
}
