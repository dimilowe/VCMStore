import { MetadataRoute } from 'next';
import { query } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.REPL_SLUG 
    ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    : 'http://localhost:5000';

  // Get all published products
  const productsResult = await query(
    `SELECT slug, created_at FROM products WHERE visibility = 'public' ORDER BY created_at DESC`
  );

  // Get all published blog posts
  const postsResult = await query(
    `SELECT slug, published_at, created_at 
     FROM blog_posts 
     WHERE published_at IS NOT NULL AND published_at <= NOW()
     ORDER BY published_at DESC`
  );

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-chat`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Product pages
  const productPages = productsResult.rows.map((product: any) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Blog post pages
  const blogPages = postsResult.rows.map((post: any) => ({
    url: `${baseUrl}/newsletter/${post.slug}`,
    lastModified: new Date(post.published_at || post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
