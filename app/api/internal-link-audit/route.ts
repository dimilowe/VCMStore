import { NextRequest, NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';
import * as cheerio from 'cheerio';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

interface PageData {
  url: string;
  title: string | null;
  outboundInternalLinks: number;
  inboundInternalLinks: number;
  outboundUrls: string[];
}

interface AuditResult {
  pagesScanned: number;
  pagesSkipped: number;
  orphanPages: PageData[];
  weakPages: PageData[];
  topLinkedPages: PageData[];
  averageLinksPerPage: number;
  allPages: PageData[];
}

async function fetchWithTimeout(url: string, timeout = 8000): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VCMSuiteBot/1.0; +https://vcmsuite.com)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });
    
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function detectSitemap(domain: string): Promise<string | null> {
  const possibleSitemaps = [
    `${domain}/sitemap.xml`,
    `${domain}/sitemap_index.xml`,
    `${domain}/sitemap-index.xml`,
    `${domain}/wp-sitemap.xml`,
    `${domain}/sitemap/sitemap.xml`
  ];
  
  for (const sitemapUrl of possibleSitemaps) {
    const content = await fetchWithTimeout(sitemapUrl, 5000);
    if (content && (content.includes('<urlset') || content.includes('<sitemapindex'))) {
      return sitemapUrl;
    }
  }
  
  return null;
}

function extractUrlsFromSitemap(xml: string, maxUrls: number): string[] {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_'
  });
  
  try {
    const parsed = parser.parse(xml);
    const urls: string[] = [];
    
    if (parsed.urlset?.url) {
      const urlNodes = Array.isArray(parsed.urlset.url) 
        ? parsed.urlset.url 
        : [parsed.urlset.url];
      
      for (const urlNode of urlNodes) {
        if (urlNode.loc && urls.length < maxUrls) {
          urls.push(urlNode.loc);
        }
      }
    }
    
    if (parsed.sitemapindex?.sitemap) {
      const sitemapNodes = Array.isArray(parsed.sitemapindex.sitemap)
        ? parsed.sitemapindex.sitemap
        : [parsed.sitemapindex.sitemap];
      
      for (const sitemapNode of sitemapNodes) {
        if (sitemapNode.loc) {
          urls.push(sitemapNode.loc);
        }
      }
    }
    
    return urls.slice(0, maxUrls);
  } catch {
    return [];
  }
}

async function fetchChildSitemaps(sitemapUrls: string[], maxUrls: number): Promise<string[]> {
  const allUrls: string[] = [];
  
  for (const sitemapUrl of sitemapUrls.slice(0, 5)) {
    if (allUrls.length >= maxUrls) break;
    
    const content = await fetchWithTimeout(sitemapUrl, 8000);
    if (!content) continue;
    
    const urls = extractUrlsFromSitemap(content, maxUrls - allUrls.length);
    
    for (const url of urls) {
      if (!url.endsWith('.xml') && allUrls.length < maxUrls) {
        allUrls.push(url);
      }
    }
  }
  
  return allUrls;
}

function normalizeUrl(href: string, baseUrl: string, hostname: string): string | null {
  if (!href) return null;
  
  const lower = href.toLowerCase();
  if (lower.startsWith('mailto:') || 
      lower.startsWith('tel:') || 
      lower.startsWith('javascript:') ||
      lower.startsWith('#')) {
    return null;
  }
  
  try {
    let absoluteUrl: URL;
    
    if (href.startsWith('http://') || href.startsWith('https://')) {
      absoluteUrl = new URL(href);
    } else if (href.startsWith('//')) {
      absoluteUrl = new URL('https:' + href);
    } else {
      absoluteUrl = new URL(href, baseUrl);
    }
    
    if (absoluteUrl.hostname !== hostname) {
      return null;
    }
    
    absoluteUrl.hash = '';
    
    let pathname = absoluteUrl.pathname;
    if (pathname.length > 1 && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }
    
    return `${absoluteUrl.protocol}//${absoluteUrl.hostname}${pathname}${absoluteUrl.search}`;
  } catch {
    return null;
  }
}

function extractInternalLinks(html: string, pageUrl: string, hostname: string): string[] {
  const $ = cheerio.load(html);
  const links: Set<string> = new Set();
  
  $('a[href]').each((_, element) => {
    const href = $(element).attr('href');
    if (href) {
      const normalizedUrl = normalizeUrl(href, pageUrl, hostname);
      if (normalizedUrl && normalizedUrl !== pageUrl) {
        links.add(normalizedUrl);
      }
    }
  });
  
  return Array.from(links);
}

function extractTitle(html: string): string | null {
  const $ = cheerio.load(html);
  const title = $('title').first().text().trim();
  return title || null;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. This tool allows 5 audits per hour. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    let inputUrl = body.url?.trim();
    
    if (!inputUrl) {
      return NextResponse.json(
        { error: 'Please provide a domain or sitemap URL.' },
        { status: 400 }
      );
    }

    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      inputUrl = 'https://' + inputUrl;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(inputUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format. Please enter a valid domain or sitemap URL.' },
        { status: 400 }
      );
    }

    const hostname = parsedUrl.hostname;
    const domain = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    
    let sitemapContent: string | null = null;
    
    if (inputUrl.endsWith('.xml')) {
      sitemapContent = await fetchWithTimeout(inputUrl, 10000);
    } else {
      const detectedSitemap = await detectSitemap(domain);
      if (detectedSitemap) {
        sitemapContent = await fetchWithTimeout(detectedSitemap, 10000);
      }
    }
    
    if (!sitemapContent) {
      return NextResponse.json(
        { error: `Could not find or fetch sitemap for ${domain}. Please provide a direct sitemap URL (e.g., ${domain}/sitemap.xml).` },
        { status: 400 }
      );
    }

    const MAX_URLS = 150;
    let urlsToScan: string[] = [];
    
    const initialUrls = extractUrlsFromSitemap(sitemapContent, MAX_URLS);
    
    const sitemapIndexUrls = initialUrls.filter(u => u.endsWith('.xml'));
    const pageUrls = initialUrls.filter(u => !u.endsWith('.xml'));
    
    urlsToScan = [...pageUrls];
    
    if (sitemapIndexUrls.length > 0 && urlsToScan.length < MAX_URLS) {
      const childUrls = await fetchChildSitemaps(sitemapIndexUrls, MAX_URLS - urlsToScan.length);
      urlsToScan = [...urlsToScan, ...childUrls];
    }
    
    urlsToScan = urlsToScan.slice(0, MAX_URLS);
    
    if (urlsToScan.length === 0) {
      return NextResponse.json(
        { error: 'No URLs found in the sitemap. The sitemap might be empty or in an unsupported format.' },
        { status: 400 }
      );
    }

    const pageMap = new Map<string, PageData>();
    
    for (const url of urlsToScan) {
      pageMap.set(url, {
        url,
        title: null,
        outboundInternalLinks: 0,
        inboundInternalLinks: 0,
        outboundUrls: []
      });
    }

    let pagesScanned = 0;
    let pagesSkipped = 0;
    
    const BATCH_SIZE = 10;
    for (let i = 0; i < urlsToScan.length; i += BATCH_SIZE) {
      const batch = urlsToScan.slice(i, i + BATCH_SIZE);
      
      const results = await Promise.all(
        batch.map(async (url) => {
          const html = await fetchWithTimeout(url, 8000);
          return { url, html };
        })
      );
      
      for (const { url, html } of results) {
        if (!html) {
          pagesSkipped++;
          continue;
        }
        
        pagesScanned++;
        
        const pageData = pageMap.get(url);
        if (!pageData) continue;
        
        pageData.title = extractTitle(html);
        
        const internalLinks = extractInternalLinks(html, url, hostname);
        pageData.outboundUrls = internalLinks;
        pageData.outboundInternalLinks = internalLinks.length;
        
        for (const linkedUrl of internalLinks) {
          const linkedPage = pageMap.get(linkedUrl);
          if (linkedPage) {
            linkedPage.inboundInternalLinks++;
          }
        }
      }
    }

    const allPages = Array.from(pageMap.values());
    
    const orphanPages = allPages
      .filter(p => p.inboundInternalLinks === 0)
      .sort((a, b) => b.outboundInternalLinks - a.outboundInternalLinks);
    
    const weakPages = allPages
      .filter(p => p.inboundInternalLinks >= 1 && p.inboundInternalLinks <= 2)
      .sort((a, b) => a.inboundInternalLinks - b.inboundInternalLinks);
    
    const topLinkedPages = [...allPages]
      .sort((a, b) => b.inboundInternalLinks - a.inboundInternalLinks)
      .slice(0, 10);
    
    const totalOutbound = allPages.reduce((sum, p) => sum + p.outboundInternalLinks, 0);
    const averageLinksPerPage = pagesScanned > 0 
      ? Math.round((totalOutbound / pagesScanned) * 10) / 10 
      : 0;

    const result: AuditResult = {
      pagesScanned,
      pagesSkipped,
      orphanPages: orphanPages.slice(0, 50),
      weakPages: weakPages.slice(0, 50),
      topLinkedPages,
      averageLinksPerPage,
      allPages: allPages.slice(0, 200)
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Internal link audit error:', error);
    return NextResponse.json(
      { error: 'An error occurred while auditing your site. Please try again.' },
      { status: 500 }
    );
  }
}
