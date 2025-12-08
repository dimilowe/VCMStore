import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { AdminSessionData, sessionOptions } from '@/lib/admin-session';
import { createMissingDraftsWithContent } from '@/lib/articleGenerator';
import { getClusterById } from '@/data/clusterRegistry';

export async function POST(request: NextRequest) {
  try {
    const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
    if (!session.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { clusterId } = body;

    if (!clusterId || typeof clusterId !== 'string') {
      return NextResponse.json(
        { error: 'clusterId is required' },
        { status: 400 }
      );
    }

    const cluster = getClusterById(clusterId);
    if (!cluster) {
      return NextResponse.json(
        { error: `Cluster not found: ${clusterId}` },
        { status: 404 }
      );
    }

    if (cluster.articleSlugs.length === 0) {
      return NextResponse.json(
        { error: 'This cluster has no planned articles' },
        { status: 400 }
      );
    }

    const results = await createMissingDraftsWithContent(clusterId);

    return NextResponse.json({
      success: true,
      clusterId,
      created: results.created,
      skipped: results.skipped,
      errors: results.errors,
      total: cluster.articleSlugs.length,
    });

  } catch (error) {
    console.error('Draft creation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create drafts' },
      { status: 500 }
    );
  }
}
