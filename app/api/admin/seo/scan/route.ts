import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, AdminSessionData } from '@/lib/admin-session';
import { runFullScan } from '@/lib/seo/seoScanner';

async function verifyAdmin(): Promise<boolean> {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  return session.isAdmin === true;
}

export async function POST() {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const summary = await runFullScan(5);
    
    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error('SEO scan error:', error);
    return NextResponse.json(
      { error: 'Scan failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
