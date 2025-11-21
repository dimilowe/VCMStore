import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Priority: Custom domain > Replit dev domain > localhost
  const baseUrl = process.env.SITE_URL || 
    (process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : 'http://localhost:5000');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
