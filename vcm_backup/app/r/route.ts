import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_SHOPPING_DOMAINS = [
  'google.com',
  'www.google.com',
  'shopping.google.com',
  'amazon.com',
  'www.amazon.com',
  'ebay.com',
  'www.ebay.com',
  'etsy.com',
  'www.etsy.com',
  'walmart.com',
  'www.walmart.com',
  'target.com',
  'www.target.com',
  'nordstrom.com',
  'www.nordstrom.com',
  'asos.com',
  'www.asos.com',
  'zara.com',
  'www.zara.com',
  'hm.com',
  'www2.hm.com',
  'shein.com',
  'www.shein.com',
  'macys.com',
  'www.macys.com',
  'shopify.com',
];

function isAllowedDomain(hostname: string): boolean {
  const normalizedHost = hostname.toLowerCase();
  
  if (ALLOWED_SHOPPING_DOMAINS.includes(normalizedHost)) {
    return true;
  }
  
  for (const domain of ALLOWED_SHOPPING_DOMAINS) {
    if (normalizedHost.endsWith('.' + domain)) {
      return true;
    }
  }
  
  return false;
}

function containsNonAscii(str: string): boolean {
  return /[^\x00-\x7F]/.test(str);
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const targetUrl = searchParams.get('u');
  
  if (!targetUrl) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  try {
    const decodedUrl = decodeURIComponent(targetUrl);
    
    if (!decodedUrl.startsWith('https://')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    if (decodedUrl.toLowerCase().includes('javascript:') || 
        decodedUrl.toLowerCase().includes('data:') ||
        decodedUrl.toLowerCase().includes('vbscript:')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    const url = new URL(decodedUrl);
    
    if (containsNonAscii(url.hostname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    const blockedHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1', '[::1]'];
    if (blockedHosts.some(h => url.hostname.toLowerCase().includes(h))) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    if (!isAllowedDomain(url.hostname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.redirect(decodedUrl, { status: 302 });
    
  } catch {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
