import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Eye, Wrench } from "lucide-react";
import { getClusterById } from "@/data/clusterRegistry";

interface ClusterArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_description: string | null;
  cluster_slug: string;
  is_published: boolean;
  is_indexed: boolean;
  view_count: number;
  created_at: Date;
}

async function getArticle(slug: string): Promise<ClusterArticle | null> {
  const result = await query(
    `SELECT id, title, slug, content, excerpt, meta_description, cluster_slug, is_published, is_indexed, view_count, created_at
     FROM cluster_articles 
     WHERE slug = $1 AND is_published = true
     LIMIT 1`,
    [slug]
  );
  
  if (result.rows.length === 0) {
    return null;
  }
  
  return result.rows[0];
}

async function incrementViewCount(articleId: number): Promise<void> {
  await query(
    `UPDATE cluster_articles SET view_count = view_count + 1 WHERE id = $1`,
    [articleId]
  );
}

async function getRelatedArticles(clusterSlug: string, currentSlug: string): Promise<ClusterArticle[]> {
  const result = await query(
    `SELECT id, title, slug, excerpt, cluster_slug
     FROM cluster_articles 
     WHERE cluster_slug = $1 AND slug != $2 AND is_published = true
     ORDER BY created_at DESC
     LIMIT 3`,
    [clusterSlug, currentSlug]
  );
  return result.rows;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: `${article.title.replace(/^"|"$/g, '')} | VCM Suite`,
    description: article.meta_description || article.excerpt || article.title,
    robots: article.is_indexed 
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: article.title.replace(/^"|"$/g, ''),
      description: article.meta_description || article.excerpt || article.title,
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    notFound();
  }
  
  await incrementViewCount(article.id);
  
  const relatedArticles = await getRelatedArticles(article.cluster_slug, article.slug);
  const cluster = getClusterById(article.cluster_slug);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link 
            href={cluster ? `/tools/clusters/${cluster.pillarSlug}` : "/tools"} 
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {cluster ? `Back to ${cluster.pillarTitle}` : "Back to Tools"}
          </Link>
          
          <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {article.view_count} views
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title.replace(/^"|"$/g, '')}
              </h1>
              
              {article.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {article.excerpt}
                </p>
              )}
              
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </article>
          
          {cluster && cluster.toolSlugs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Wrench className="w-6 h-6 text-orange-500" />
                Related Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cluster.toolSlugs.slice(0, 6).map((toolSlug) => (
                  <Link key={toolSlug} href={`/tools/${toolSlug}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                      <CardContent className="p-4">
                        <p className="font-medium text-gray-900 capitalize">
                          {toolSlug.replace(/-/g, ' ')}
                        </p>
                        <p className="text-sm text-orange-600 mt-1">Try it free</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} href={`/articles/${related.slug}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {related.title.replace(/^"|"$/g, '')}
                        </h3>
                        {related.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-3">{related.excerpt}</p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
