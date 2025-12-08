import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, AdminSessionData } from '@/lib/admin-session';
import { query } from '@/lib/db';

async function verifyAdmin(): Promise<boolean> {
  const session = await getIronSession<AdminSessionData>(await cookies(), sessionOptions);
  return session.isAdmin === true;
}

export async function GET(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';
    const search = searchParams.get('search') || '';

    let whereClause = '1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      whereClause += ` AND (s.slug ILIKE $${paramIndex} OR s.title_text ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    switch (filter) {
      case 'critical':
        whereClause += ' AND s.overall_score < 60';
        break;
      case 'broken':
        whereClause += ' AND s.status_code != 200';
        break;
      case 'thin':
        whereClause += ' AND s.is_thin_content = true';
        break;
      case 'no_h1':
        whereClause += ' AND s.has_h1 = false';
        break;
      case 'no_meta':
        whereClause += ' AND s.has_meta_description = false';
        break;
      case 'no_schema':
        whereClause += ' AND s.has_expected_schema = false';
        break;
      case 'noindex':
        whereClause += " AND s.robots_index = 'noindex'";
        break;
    }

    const latestSnapshots = await query(
      `SELECT DISTINCT ON (s.slug) s.*
       FROM seo_health_snapshots s
       WHERE ${whereClause}
       ORDER BY s.slug, s.snapshot_date DESC`,
      params
    );

    const stats = await query(`
      SELECT 
        COUNT(DISTINCT slug) as total_pages,
        AVG(overall_score) as avg_score,
        COUNT(DISTINCT CASE WHEN overall_score < 60 THEN slug END) as critical_count,
        COUNT(DISTINCT CASE WHEN is_thin_content = true THEN slug END) as thin_count,
        COUNT(DISTINCT CASE WHEN status_code != 200 THEN slug END) as broken_count,
        COUNT(DISTINCT CASE WHEN has_h1 = false THEN slug END) as no_h1_count,
        COUNT(DISTINCT CASE WHEN has_meta_description = false THEN slug END) as no_meta_count,
        COUNT(DISTINCT CASE WHEN has_expected_schema = false THEN slug END) as no_schema_count
      FROM (
        SELECT DISTINCT ON (slug) *
        FROM seo_health_snapshots
        ORDER BY slug, snapshot_date DESC
      ) latest
    `);

    const processedSnapshots = latestSnapshots.rows.map((row: any) => {
      let issues: string[] = [];
      try {
        if (typeof row.issues === 'string') {
          issues = JSON.parse(row.issues);
        } else if (Array.isArray(row.issues)) {
          issues = row.issues;
        }
      } catch {
        issues = [];
      }
      return { ...row, issues };
    });

    return NextResponse.json({
      snapshots: processedSnapshots,
      stats: stats.rows[0] || {
        total_pages: 0,
        avg_score: 0,
        critical_count: 0,
        thin_count: 0,
        broken_count: 0,
        no_h1_count: 0,
        no_meta_count: 0,
        no_schema_count: 0,
      },
    });
  } catch (error) {
    console.error('Fetch snapshots error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch snapshots' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!await verifyAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await query('DELETE FROM seo_health_snapshots');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete snapshots error:', error);
    return NextResponse.json(
      { error: 'Failed to delete snapshots' },
      { status: 500 }
    );
  }
}
