import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { AdminSessionData, sessionOptions } from '@/lib/admin-session';
import { publishArticle, unpublishArticle, setArticleIndexed } from '@/lib/articleGenerator';

export async function POST(request: NextRequest) {
  try {
    const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
    if (!session.isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { slug, action, value } = body;

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'slug is required' },
        { status: 400 }
      );
    }

    if (!['publish', 'unpublish', 'index', 'unindex'].includes(action)) {
      return NextResponse.json(
        { error: 'action must be "publish", "unpublish", "index", or "unindex"' },
        { status: 400 }
      );
    }

    let success: boolean;
    
    switch (action) {
      case 'publish':
        success = await publishArticle(slug);
        break;
      case 'unpublish':
        success = await unpublishArticle(slug);
        break;
      case 'index':
        success = await setArticleIndexed(slug, true);
        break;
      case 'unindex':
        success = await setArticleIndexed(slug, false);
        break;
      default:
        success = false;
    }

    if (!success) {
      return NextResponse.json(
        { error: `Article not found: ${slug}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      slug,
      action,
    });

  } catch (error) {
    console.error('Article toggle error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update article' },
      { status: 500 }
    );
  }
}
