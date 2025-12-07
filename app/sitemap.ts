import { MetadataRoute } from 'next';
import { query } from '@/lib/db';
import { getAllIndexedTools } from '@/lib/toolRollout';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 
    (process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS}` : 'http://localhost:5000');

  const productsResult = await query(
    `SELECT slug, created_at FROM products WHERE visibility = 'public' ORDER BY created_at DESC`
  );

  const postsResult = await query(
    `SELECT slug, published_at, created_at 
     FROM blog_posts 
     WHERE published_at IS NOT NULL AND published_at <= NOW() AND is_indexed = true
     ORDER BY published_at DESC`
  );

  const articlesResult = await query(
    `SELECT slug, created_at, updated_at 
     FROM cluster_articles 
     WHERE is_published = true AND is_indexed = true
     ORDER BY created_at DESC`
  );

  const ideasResult = await query(
    `SELECT slug, updated_at FROM ideas ORDER BY created_at DESC`
  );

  const questionsResult = await query(
    `SELECT slug, updated_at FROM questions ORDER BY created_at DESC`
  );

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
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const indexedTools = getAllIndexedTools();
  const toolPages = indexedTools.map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: tool.priority,
  }));

  const productPages = productsResult.rows.map((product: any) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogPages = postsResult.rows.map((post: any) => ({
    url: `${baseUrl}/newsletter/${post.slug}`,
    lastModified: new Date(post.published_at || post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const articlePages = articlesResult.rows.map((article: any) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.updated_at || article.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const ideaPages = ideasResult.rows.map((idea: any) => ({
    url: `${baseUrl}/ideas/${idea.slug}`,
    lastModified: new Date(idea.updated_at),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const questionPages = questionsResult.rows.map((question: any) => ({
    url: `${baseUrl}/answers/${question.slug}`,
    lastModified: new Date(question.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...toolPages, ...productPages, ...blogPages, ...articlePages, ...ideaPages, ...questionPages];
}
