import { MetadataRoute } from 'next';
import { query } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Priority: Custom domain > Replit dev domain > localhost
  const baseUrl = process.env.SITE_URL || 
    (process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : 'http://localhost:5000');

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

  // Get all ideas
  const ideasResult = await query(
    `SELECT slug, updated_at FROM ideas ORDER BY created_at DESC`
  );

  // Get all questions (VCM Answers)
  const questionsResult = await query(
    `SELECT slug, updated_at FROM questions ORDER BY created_at DESC`
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
    {
      url: `${baseUrl}/tools/gif-compressor`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/image-compressor`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/word-counter`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/logo-generator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/keyword-finder`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/visualization`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/emoji-combos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/horoscope-of-the-day`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/affirmation-about-self-love`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ideas`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/answers`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/resource-box`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/ai-thumbnail-coach`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/reach-grabber-tool`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/ai-humanizer-free`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/producer-tag-generator`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/ad-copy-analyzer`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/internal-link-seo-audit`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/summarizer`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/gif-maker`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
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

  // Idea pages
  const ideaPages = ideasResult.rows.map((idea: any) => ({
    url: `${baseUrl}/ideas/${idea.slug}`,
    lastModified: new Date(idea.updated_at),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Question pages (VCM Answers)
  const questionPages = questionsResult.rows.map((question: any) => ({
    url: `${baseUrl}/answers/${question.slug}`,
    lastModified: new Date(question.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages, ...blogPages, ...ideaPages, ...questionPages];
}
