import { query } from './db';
import { getClusterById } from '@/data/clusterRegistry';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY
});

export interface ArticleStatus {
  slug: string;
  title: string;
  exists: boolean;
  isDraft: boolean;
  isPublished: boolean;
  isIndexed: boolean;
  contentLength: number;
}

export interface GeneratedArticle {
  title: string;
  content: string;
  excerpt: string;
  metaDescription: string;
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateArticleContent(
  articleSlug: string,
  clusterSlug: string
): Promise<GeneratedArticle> {
  const cluster = getClusterById(clusterSlug);
  if (!cluster) {
    throw new Error(`Cluster not found: ${clusterSlug}`);
  }

  const toolLinks = cluster.toolSlugs
    .slice(0, 3)
    .map(slug => `- [${slugToTitle(slug)}](/tools/${slug})`)
    .join('\n');

  const prompt = `You are an SEO content writer for VCM Suite, a creator tools platform. Write a comprehensive, actionable blog article.

ARTICLE TOPIC: "${slugToTitle(articleSlug)}"
CLUSTER THEME: "${cluster.pillarTitle}"
PRIMARY KEYWORD: "${cluster.primaryKeyword}"
RELATED KEYWORDS: ${cluster.relatedKeywords.join(', ')}

REQUIREMENTS:
1. Write 800-1200 words of high-quality, actionable content
2. Use proper HTML formatting with <h2>, <h3>, <p>, <ul>, <li>, <strong> tags
3. Include the primary keyword naturally in the first paragraph
4. Structure with 3-4 main sections using <h2> headings
5. Include practical tips, examples, or step-by-step guidance
6. End with a call-to-action mentioning our free tools
7. Write in a friendly, expert tone - not salesy
8. Include internal links to these related tools:
${toolLinks}

FORMAT YOUR RESPONSE AS HTML (no markdown). Start directly with the content, no title tag (title is separate).

Example structure:
<p>Opening paragraph with keyword...</p>
<h2>First Main Section</h2>
<p>Content...</p>
<h2>Second Section</h2>
<p>Content with <a href="/tools/tool-slug">Tool Name</a> link...</p>
<h2>Third Section</h2>
<ul><li>Tip 1</li><li>Tip 2</li></ul>
<h2>Start Taking Action</h2>
<p>CTA paragraph mentioning our free calculators/tools...</p>`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are an expert SEO content writer. Output clean HTML only, no markdown.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 2500
  });

  const content = response.choices[0]?.message?.content || '';

  const titlePrompt = `Create an SEO-optimized title for a blog post about "${slugToTitle(articleSlug)}" in the context of "${cluster.pillarTitle}".
The title should:
- Be 50-60 characters max
- Include the main keyword naturally
- Be compelling and click-worthy
- Not use clickbait tactics

Return ONLY the title, nothing else.`;

  const titleResponse = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: titlePrompt }],
    temperature: 0.7,
    max_tokens: 100
  });

  const title = titleResponse.choices[0]?.message?.content?.trim() || slugToTitle(articleSlug);

  const metaPrompt = `Write a meta description (150-160 chars) for an article titled "${title}" about ${slugToTitle(articleSlug)}. Make it compelling with a clear value proposition. Return ONLY the meta description.`;

  const metaResponse = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: metaPrompt }],
    temperature: 0.7,
    max_tokens: 100
  });

  let metaDescription = metaResponse.choices[0]?.message?.content?.trim() || '';
  // Ensure meta description fits database column (max 160 chars)
  if (metaDescription.length > 155) {
    metaDescription = metaDescription.slice(0, 152) + '...';
  }

  const excerptPrompt = `Write a 1-2 sentence excerpt (under 200 chars) summarizing an article about "${slugToTitle(articleSlug)}". Return ONLY the excerpt.`;

  const excerptResponse = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: excerptPrompt }],
    temperature: 0.7,
    max_tokens: 100
  });

  let excerpt = excerptResponse.choices[0]?.message?.content?.trim() || '';
  // Ensure excerpt fits reasonable length
  if (excerpt.length > 250) {
    excerpt = excerpt.slice(0, 247) + '...';
  }

  return {
    title: title.slice(0, 255), // Ensure title fits
    content,
    excerpt,
    metaDescription
  };
}

export async function getArticleStatusesForCluster(clusterSlug: string): Promise<ArticleStatus[]> {
  const cluster = getClusterById(clusterSlug);
  if (!cluster) {
    return [];
  }

  const existingPosts = await query(
    `SELECT slug, title, content, published_at, is_indexed 
     FROM blog_posts 
     WHERE slug = ANY($1)`,
    [cluster.articleSlugs]
  );

  const postMap = new Map<string, typeof existingPosts.rows[0]>();
  for (const row of existingPosts.rows) {
    postMap.set(row.slug, row);
  }

  return cluster.articleSlugs.map(slug => {
    const post = postMap.get(slug);
    if (!post) {
      return {
        slug,
        title: slugToTitle(slug),
        exists: false,
        isDraft: false,
        isPublished: false,
        isIndexed: false,
        contentLength: 0,
      };
    }

    const isPublished = post.published_at !== null && new Date(post.published_at) <= new Date();

    return {
      slug,
      title: post.title || slugToTitle(slug),
      exists: true,
      isDraft: !isPublished,
      isPublished,
      isIndexed: post.is_indexed === true,
      contentLength: post.content?.length || 0,
    };
  });
}

export async function createMissingDraftsWithContent(clusterSlug: string): Promise<{
  created: string[];
  skipped: string[];
  errors: { slug: string; error: string }[];
}> {
  const cluster = getClusterById(clusterSlug);
  if (!cluster) {
    throw new Error(`Cluster not found: ${clusterSlug}`);
  }

  const existingPosts = await query(
    `SELECT slug FROM blog_posts WHERE slug = ANY($1)`,
    [cluster.articleSlugs]
  );

  const existingSlugs = new Set(existingPosts.rows.map(r => r.slug));

  const created: string[] = [];
  const skipped: string[] = [];
  const errors: { slug: string; error: string }[] = [];

  for (const articleSlug of cluster.articleSlugs) {
    if (existingSlugs.has(articleSlug)) {
      skipped.push(articleSlug);
      continue;
    }

    try {
      console.log(`Generating content for: ${articleSlug}`);
      const generated = await generateArticleContent(articleSlug, clusterSlug);
      
      await query(`
        INSERT INTO blog_posts (slug, title, content, excerpt, meta_description, cluster_slug, is_indexed, published_at, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NULL, NOW(), NOW())
      `, [articleSlug, generated.title, generated.content, generated.excerpt, generated.metaDescription, clusterSlug, false]);

      created.push(articleSlug);
      console.log(`Created article: ${articleSlug}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Error generating ${articleSlug}:`, errorMessage);
      errors.push({ slug: articleSlug, error: errorMessage });
    }
  }

  return { created, skipped, errors };
}

export async function createMissingDrafts(clusterSlug: string): Promise<{
  created: string[];
  skipped: string[];
}> {
  const result = await createMissingDraftsWithContent(clusterSlug);
  return { created: result.created, skipped: result.skipped };
}

export async function publishArticle(slug: string): Promise<boolean> {
  const result = await query(
    `UPDATE blog_posts 
     SET published_at = NOW(), updated_at = NOW() 
     WHERE slug = $1 AND published_at IS NULL
     RETURNING id`,
    [slug]
  );
  return (result.rowCount ?? 0) > 0;
}

export async function unpublishArticle(slug: string): Promise<boolean> {
  const result = await query(
    `UPDATE blog_posts 
     SET published_at = NULL, updated_at = NOW() 
     WHERE slug = $1
     RETURNING id`,
    [slug]
  );
  return (result.rowCount ?? 0) > 0;
}

export async function setArticleIndexed(slug: string, indexed: boolean): Promise<boolean> {
  const result = await query(
    `UPDATE blog_posts 
     SET is_indexed = $1, updated_at = NOW() 
     WHERE slug = $2
     RETURNING id`,
    [indexed, slug]
  );
  return (result.rowCount ?? 0) > 0;
}
