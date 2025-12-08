import { query } from '@/lib/db';

const MIN_SCORE_THRESHOLD = 75;
const MIN_WORD_COUNT_ARTICLE = 300;
const MIN_WORD_COUNT_OTHER = 150;
const MIN_INTERNAL_LINKS_OUT = 3;

export interface ReadinessResult {
  urlId: string;
  slug: string;
  pageType: string;
  healthScore: number | null;
  isReady: boolean;
  needsManualReview: boolean;
  issues: string[];
}

export interface InspectorSummary {
  evaluated: number;
  readyCount: number;
  needsReviewCount: number;
  notReadyCount: number;
  noSnapshotCount: number;
  errors: number;
}

interface UrlRecord {
  id: string;
  url: string;
  type: string;
  is_indexed: boolean;
  manual_review_passed: boolean;
}

interface SnapshotRecord {
  overall_score: number;
  status_code: number;
  word_count: number;
  has_title: boolean;
  has_h1: boolean;
  has_meta_description: boolean;
  has_expected_schema: boolean;
  robots_index: string;
  internal_links_out_count: number;
}

export function evaluateReadiness(
  url: UrlRecord,
  snapshot: SnapshotRecord | null,
  manualReviewPassed: boolean
): ReadinessResult {
  const issues: string[] = [];
  const slug = url.url;
  const pageType = url.type || 'static';

  if (!snapshot) {
    return {
      urlId: url.id,
      slug,
      pageType,
      healthScore: null,
      isReady: false,
      needsManualReview: false,
      issues: ['No SEO health snapshot available - run a scan first'],
    };
  }

  if (snapshot.status_code !== 200) {
    issues.push(`Page returns HTTP ${snapshot.status_code} (must be 200)`);
  }

  if (snapshot.robots_index === 'noindex') {
    issues.push('Robots meta is set to noindex');
  }

  if (snapshot.overall_score < MIN_SCORE_THRESHOLD) {
    issues.push(`Health score ${snapshot.overall_score} is below minimum ${MIN_SCORE_THRESHOLD}`);
  }

  if (!snapshot.has_title) {
    issues.push('Missing page title');
  }

  if (!snapshot.has_h1) {
    issues.push('Missing H1 heading');
  }

  if (!snapshot.has_meta_description) {
    issues.push('Missing meta description');
  }

  const requiresSchema = ['tool', 'article', 'blog'].includes(pageType);
  if (requiresSchema && !snapshot.has_expected_schema) {
    issues.push(`Missing structured schema for ${pageType} page`);
  }

  const minWords = pageType === 'article' 
    ? MIN_WORD_COUNT_ARTICLE 
    : MIN_WORD_COUNT_OTHER;
  
  if (snapshot.word_count < minWords) {
    issues.push(`Word count ${snapshot.word_count} is below minimum ${minWords} for ${pageType}`);
  }

  if (snapshot.internal_links_out_count < MIN_INTERNAL_LINKS_OUT) {
    issues.push(`Only ${snapshot.internal_links_out_count} internal links (minimum ${MIN_INTERNAL_LINKS_OUT})`);
  }

  const technicallyReady = issues.length === 0;

  if (!manualReviewPassed && technicallyReady) {
    return {
      urlId: url.id,
      slug,
      pageType,
      healthScore: snapshot.overall_score,
      isReady: false,
      needsManualReview: true,
      issues: ['Awaiting manual visual review'],
    };
  }

  if (!manualReviewPassed) {
    issues.push('Manual visual review not yet passed');
  }

  return {
    urlId: url.id,
    slug,
    pageType,
    healthScore: snapshot.overall_score,
    isReady: technicallyReady && manualReviewPassed,
    needsManualReview: technicallyReady && !manualReviewPassed,
    issues,
  };
}

export async function runReadyInspector(): Promise<{
  summary: InspectorSummary;
  results: ReadinessResult[];
}> {
  const unindexedUrls = await query(
    `SELECT id, url, type, is_indexed, manual_review_passed 
     FROM global_urls 
     WHERE is_indexed = false 
       AND url NOT LIKE '/admin%'
       AND url NOT LIKE '/api%'
       AND url NOT LIKE '/login%'
       AND url NOT LIKE '/dashboard%'
     ORDER BY url ASC`
  );

  const results: ReadinessResult[] = [];
  let readyCount = 0;
  let needsReviewCount = 0;
  let notReadyCount = 0;
  let noSnapshotCount = 0;
  let errors = 0;

  for (const url of unindexedUrls.rows as UrlRecord[]) {
    try {
      const snapshotResult = await query(
        `SELECT overall_score, status_code, word_count, has_title, has_h1, 
                has_meta_description, has_expected_schema, robots_index, internal_links_out_count
         FROM seo_health_snapshots 
         WHERE slug = $1 
         ORDER BY snapshot_date DESC 
         LIMIT 1`,
        [url.url]
      );

      const snapshot = snapshotResult.rows[0] as SnapshotRecord | undefined;
      const result = evaluateReadiness(url, snapshot || null, url.manual_review_passed);
      results.push(result);

      if (!snapshot) {
        noSnapshotCount++;
        notReadyCount++;
      } else if (result.isReady) {
        readyCount++;
      } else if (result.needsManualReview) {
        needsReviewCount++;
      } else {
        notReadyCount++;
      }

      await query(
        `UPDATE global_urls 
         SET last_health_score = $1, is_ready_to_index = $2 
         WHERE id = $3`,
        [result.healthScore, result.isReady, url.id]
      );
    } catch (error) {
      console.error(`Error evaluating ${url.url}:`, error);
      errors++;
      results.push({
        urlId: url.id,
        slug: url.url,
        pageType: url.type || 'unknown',
        healthScore: null,
        isReady: false,
        needsManualReview: false,
        issues: ['Error during evaluation'],
      });
    }
  }

  return {
    summary: {
      evaluated: unindexedUrls.rows.length,
      readyCount,
      needsReviewCount,
      notReadyCount,
      noSnapshotCount,
      errors,
    },
    results,
  };
}

export async function indexReadyPages(): Promise<{
  indexedCount: number;
  indexedSlugs: string[];
}> {
  const readyPages = await query(
    `SELECT id, url FROM global_urls 
     WHERE is_indexed = false AND is_ready_to_index = true
       AND url NOT LIKE '/admin%'
       AND url NOT LIKE '/api%'
       AND url NOT LIKE '/login%'
       AND url NOT LIKE '/dashboard%'`
  );

  const indexedSlugs: string[] = [];

  for (const page of readyPages.rows as { id: string; url: string }[]) {
    await query(
      `UPDATE global_urls 
       SET is_indexed = true, indexed_at = NOW(), is_ready_to_index = false 
       WHERE id = $1`,
      [page.id]
    );
    indexedSlugs.push(page.url);
  }

  return {
    indexedCount: indexedSlugs.length,
    indexedSlugs,
  };
}

export async function toggleManualReview(
  urlId: string,
  passed: boolean
): Promise<{ isReadyToIndex: boolean }> {
  await query(
    `UPDATE global_urls SET manual_review_passed = $1 WHERE id = $2`,
    [passed, urlId]
  );

  const urlResult = await query(
    `SELECT id, url, type, is_indexed, manual_review_passed FROM global_urls WHERE id = $1`,
    [urlId]
  );
  
  if (urlResult.rows.length === 0) {
    return { isReadyToIndex: false };
  }

  const url = urlResult.rows[0] as UrlRecord;
  
  const snapshotResult = await query(
    `SELECT overall_score, status_code, word_count, has_title, has_h1, 
            has_meta_description, has_expected_schema, robots_index, internal_links_out_count
     FROM seo_health_snapshots 
     WHERE slug = $1 
     ORDER BY snapshot_date DESC 
     LIMIT 1`,
    [url.url]
  );

  const snapshot = snapshotResult.rows[0] as SnapshotRecord | undefined;
  const result = evaluateReadiness(url, snapshot || null, passed);

  await query(
    `UPDATE global_urls SET is_ready_to_index = $1 WHERE id = $2`,
    [result.isReady, urlId]
  );

  return { isReadyToIndex: result.isReady };
}

export async function getUnindexedPagesWithStatus(): Promise<{
  pages: Array<{
    id: string;
    url: string;
    type: string;
    last_health_score: number | null;
    is_ready_to_index: boolean;
    manual_review_passed: boolean;
    word_count: number | null;
    internal_links: number;
    issues: string[];
    needsManualReview?: boolean;
  }>;
  stats: {
    total: number;
    ready: number;
    needsReview: number;
    notReady: number;
  };
}> {
  const urlsResult = await query(
    `SELECT g.id, g.url, g.type, g.last_health_score, g.is_ready_to_index, g.manual_review_passed,
            s.word_count, s.internal_links_out_count, s.has_title, s.has_h1, s.has_meta_description,
            s.has_expected_schema, s.status_code, s.robots_index, s.overall_score
     FROM global_urls g
     LEFT JOIN LATERAL (
       SELECT * FROM seo_health_snapshots 
       WHERE slug = g.url 
       ORDER BY snapshot_date DESC 
       LIMIT 1
     ) s ON true
     WHERE g.is_indexed = false
       AND g.url NOT LIKE '/admin%'
       AND g.url NOT LIKE '/api%'
       AND g.url NOT LIKE '/login%'
       AND g.url NOT LIKE '/dashboard%'
     ORDER BY g.url ASC`
  );

  const pages = urlsResult.rows.map((row: any) => {
    const snapshot = row.overall_score !== null ? {
      overall_score: row.overall_score,
      status_code: row.status_code,
      word_count: row.word_count,
      has_title: row.has_title,
      has_h1: row.has_h1,
      has_meta_description: row.has_meta_description,
      has_expected_schema: row.has_expected_schema,
      robots_index: row.robots_index,
      internal_links_out_count: row.internal_links_out_count,
    } : null;

    const result = evaluateReadiness(
      {
        id: row.id,
        url: row.url,
        type: row.type,
        is_indexed: false,
        manual_review_passed: row.manual_review_passed,
      },
      snapshot,
      row.manual_review_passed
    );

    return {
      id: row.id,
      url: row.url,
      type: row.type || 'static',
      last_health_score: snapshot?.overall_score ?? row.last_health_score,
      is_ready_to_index: result.isReady,
      manual_review_passed: row.manual_review_passed,
      word_count: row.word_count,
      internal_links: row.internal_links_out_count ?? 0,
      issues: result.issues,
      needsManualReview: result.needsManualReview,
    };
  });

  const stats = {
    total: pages.length,
    ready: pages.filter((p: any) => p.is_ready_to_index).length,
    needsReview: pages.filter((p: any) => p.needsManualReview).length,
    notReady: pages.filter((p: any) => !p.is_ready_to_index && !p.needsManualReview).length,
  };

  return { pages, stats };
}
