import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { sessionOptions, AdminSessionData } from '@/lib/admin-session';
import { toggleManualReview } from '@/lib/seo/readyInspector';

export async function POST(request: Request) {
  try {
    const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
    
    if (!session.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { urlId, manualReviewPassed } = body;

    if (!urlId || typeof manualReviewPassed !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing urlId or manualReviewPassed' },
        { status: 400 }
      );
    }

    const { isReadyToIndex } = await toggleManualReview(urlId, manualReviewPassed);

    return NextResponse.json({
      success: true,
      urlId,
      manualReviewPassed,
      isReadyToIndex,
    });
  } catch (error) {
    console.error('Toggle manual review error:', error);
    return NextResponse.json(
      { error: 'Failed to update manual review status' },
      { status: 500 }
    );
  }
}
