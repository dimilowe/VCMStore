import * as cheerio from 'cheerio';
import { query } from '@/lib/db';
import type { ScanResult, GlobalUrl, ScanSummary } from './types';

function getSiteDomain(): string {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:5000';
  }
  return process.env.REPLIT_DEPLOYMENT_URL 
    ? `https://${process.env.REPLIT_DEPLOYMENT_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://vcmsuite.com';
}

export async function getIndexedUrls(): Promise<GlobalUrl[]> {
  const result = await query(
    `SELECT id, url, title, type, is_indexed, canonical 
     FROM global_urls 
     WHERE is_indexed = true 
     ORDER BY url ASC`
  );
  return result.rows;
}

export async function getAllPublicUrls(): Promise<GlobalUrl[]> {
  const result = await query(
    `SELECT id, url, title, type, is_indexed, canonical 
     FROM global_urls 
     WHERE url NOT LIKE '/admin%'
       AND url NOT LIKE '/api%'
       AND url NOT LIKE '/login%'
       AND url NOT LIKE '/dashboard%'
     ORDER BY url ASC`
  );
  return result.rows;
}

export async function scanPage(urlData: GlobalUrl): Promise<ScanResult> {
  const siteDomain = getSiteDomain();
  const fullUrl = `${siteDomain}${urlData.url}`;
  const issues: string[] = [];
  
  const startTime = performance.now();
  let html = '';
  let statusCode = 0;
  
  try {
    const response = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'VCMSuite-SEO-Scanner/1.0',
      },
      redirect: 'follow',
    });
    statusCode = response.status;
    html = await response.text();
  } catch (error) {
    return {
      slug: urlData.url,
      url: fullUrl,
      status_code: 0,
      load_time_ms: Math.round(performance.now() - startTime),
      has_title: false,
      has_h1: false,
      has_meta_description: false,
      word_count: 0,
      robots_index: 'missing',
      canonical_target: null,
      internal_links_out_count: 0,
      is_thin_content: true,
      has_expected_schema: false,
      page_type: urlData.type || 'other',
      overall_score: 0,
      title_text: null,
      meta_description_text: null,
      h1_text: null,
      issues: [`Fetch failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
    };
  }
  
  const loadTimeMs = Math.round(performance.now() - startTime);
  const $ = cheerio.load(html);
  
  const titleText = $('title').first().text().trim() || null;
  const hasTitle = !!titleText && titleText.length > 0;
  if (!hasTitle) issues.push('No title tag found');
  
  const h1Text = $('h1').first().text().trim() || null;
  const hasH1 = !!h1Text && h1Text.length > 0;
  if (!hasH1) issues.push('No H1 found');
  
  const metaDescText = $('meta[name="description"]').attr('content')?.trim() || null;
  const hasMetaDesc = !!metaDescText && metaDescText.length > 0;
  if (!hasMetaDesc) issues.push('No meta description found');
  
  const robotsMeta = $('meta[name="robots"]').attr('content')?.toLowerCase() || '';
  let robotsIndex: 'index' | 'noindex' | 'missing' = 'missing';
  if (robotsMeta) {
    robotsIndex = robotsMeta.includes('noindex') ? 'noindex' : 'index';
  }
  if (robotsIndex === 'noindex' && urlData.is_indexed) {
    issues.push('Page has noindex but is marked for indexing in CMS');
  }
  
  const canonical = $('link[rel="canonical"]').attr('href') || null;
  
  const mainContent = $('main').length > 0 ? $('main').text() : $('body').text();
  const cleanText = mainContent.replace(/\s+/g, ' ').trim();
  const wordCount = cleanText.split(/\s+/).filter(w => w.length > 0).length;
  
  const internalLinks = $('a[href]').filter((_, el) => {
    const href = $(el).attr('href') || '';
    return href.startsWith('/') || href.includes(siteDomain.replace(/^https?:\/\//, ''));
  });
  const internalLinksOutCount = internalLinks.length;
  if (internalLinksOutCount < 3) {
    issues.push(`Low internal linking (${internalLinksOutCount} links)`);
  }
  
  const hasSchema = $('script[type="application/ld+json"]').length > 0;
  const needsSchema = ['tool', 'article', 'blog'].includes(urlData.type);
  const hasExpectedSchema = needsSchema ? hasSchema : true;
  if (needsSchema && !hasSchema) {
    issues.push(`No structured data (JSON-LD) found for ${urlData.type} page`);
  }
  
  const isThinContent = (urlData.type === 'article' || urlData.type === 'blog') 
    ? wordCount < 300 
    : wordCount < 150;
  if (isThinContent) {
    issues.push(`Thin content (${wordCount} words)`);
  }
  
  let score = 100;
  if (statusCode !== 200) score -= 20;
  if (robotsIndex === 'noindex' && urlData.is_indexed) score -= 15;
  if (!hasTitle) score -= 10;
  if (!hasH1) score -= 10;
  if (!hasMetaDesc) score -= 10;
  if (isThinContent) score -= 10;
  if (!hasExpectedSchema && needsSchema) score -= 10;
  if (internalLinksOutCount < 3) score -= 5;
  
  score = Math.max(0, Math.min(100, score));
  
  if (statusCode !== 200) {
    issues.unshift(`HTTP ${statusCode} response`);
  }
  
  return {
    slug: urlData.url,
    url: fullUrl,
    status_code: statusCode,
    load_time_ms: loadTimeMs,
    has_title: hasTitle,
    has_h1: hasH1,
    has_meta_description: hasMetaDesc,
    word_count: wordCount,
    robots_index: robotsIndex,
    canonical_target: canonical,
    internal_links_out_count: internalLinksOutCount,
    is_thin_content: isThinContent,
    has_expected_schema: hasExpectedSchema,
    page_type: urlData.type || 'other',
    overall_score: score,
    title_text: titleText,
    meta_description_text: metaDescText,
    h1_text: h1Text,
    issues,
  };
}

export async function saveSnapshot(result: ScanResult): Promise<void> {
  await query(
    `INSERT INTO seo_health_snapshots (
      slug, url, status_code, load_time_ms, has_title, has_h1,
      has_meta_description, word_count, robots_index, canonical_target,
      internal_links_out_count, internal_links_in_count, is_thin_content,
      has_expected_schema, page_type, overall_score, title_text,
      meta_description_text, h1_text, issues, snapshot_date
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, NOW())`,
    [
      result.slug,
      result.url,
      result.status_code,
      result.load_time_ms,
      result.has_title,
      result.has_h1,
      result.has_meta_description,
      result.word_count,
      result.robots_index,
      result.canonical_target,
      result.internal_links_out_count,
      0,
      result.is_thin_content,
      result.has_expected_schema,
      result.page_type,
      result.overall_score,
      result.title_text,
      result.meta_description_text,
      result.h1_text,
      JSON.stringify(result.issues),
    ]
  );
}

export async function runFullScan(batchSize: number = 10): Promise<ScanSummary> {
  const urls = await getAllPublicUrls();
  const summary: ScanSummary = {
    total_scanned: 0,
    successful: 0,
    failed: 0,
    errors: [],
  };

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(async (urlData) => {
        try {
          const result = await scanPage(urlData);
          await saveSnapshot(result);
          return { success: result.status_code === 200, error: null };
        } catch (error) {
          const errorMsg = `Error scanning ${urlData.url}: ${error instanceof Error ? error.message : 'Unknown'}`;
          summary.errors.push(errorMsg);
          return { success: false, error: errorMsg };
        }
      })
    );

    for (const r of results) {
      summary.total_scanned++;
      if (r.success) {
        summary.successful++;
      } else {
        summary.failed++;
      }
    }
  }

  return summary;
}
