import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Eye } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  published_at: Date;
  view_count: number;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const result = await query(
    `SELECT id, title, slug, content, excerpt, meta_description, featured_image_url, published_at, view_count
     FROM blog_posts 
     WHERE slug = $1 AND published_at IS NOT NULL AND published_at <= NOW()
     LIMIT 1`,
    [slug]
  );
  
  if (result.rows.length === 0) {
    return null;
  }
  
  return result.rows[0];
}

async function incrementViewCount(postId: number): Promise<void> {
  await query(
    `UPDATE blog_posts SET view_count = view_count + 1 WHERE id = $1`,
    [postId]
  );
}

async function getRelatedPosts(currentPostId: number): Promise<BlogPost[]> {
  const result = await query(
    `SELECT id, title, slug, excerpt, featured_image_url, published_at
     FROM blog_posts 
     WHERE id != $1 AND published_at IS NOT NULL AND published_at <= NOW()
     ORDER BY published_at DESC
     LIMIT 3`,
    [currentPostId]
  );
  return result.rows;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: `${post.title} | VCM Store Blog`,
    description: post.meta_description || post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.meta_description || post.excerpt || post.title,
      type: 'article',
      publishedTime: post.published_at.toISOString(),
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    notFound();
  }
  
  // Increment view count only once during page render
  await incrementViewCount(post.id);
  
  const relatedPosts = await getRelatedPosts(post.id);
  
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Featured Image */}
      {post.featured_image_url && (
        <div 
          className="h-[400px] bg-cover bg-center relative"
          style={{ backgroundImage: `url('${post.featured_image_url}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        </div>
      )}
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/newsletter" 
            className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-2 bg-white rounded-lg shadow-sm p-8 md:p-12">
              <header className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-stone-900">
                  {post.title}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={new Date(post.published_at).toISOString()}>
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.view_count} views</span>
                  </div>
                </div>
              </header>
              
              <div 
                className="prose prose-lg max-w-none prose-headings:text-stone-900 prose-p:text-stone-700 prose-a:text-yellow-600 hover:prose-a:text-yellow-700 prose-strong:text-stone-900"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Newsletter CTA */}
              <div className="mt-12 pt-8 border-t">
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold mb-2">Want more content like this?</h3>
                    <p className="text-muted-foreground mb-4">
                      Join our newsletter for weekly insights delivered to your inbox.
                    </p>
                    <NewsletterSignup />
                  </CardContent>
                </Card>
              </div>
            </article>
            
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Newsletter Signup */}
              <Card className="sticky top-8 border-2 border-yellow-500">
                <CardHeader>
                  <CardTitle className="text-xl">Never Miss a Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get our latest articles and resources delivered weekly.
                  </p>
                  <NewsletterSignup />
                </CardContent>
              </Card>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Related Articles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link 
                          key={relatedPost.id} 
                          href={`/newsletter/${relatedPost.slug}`}
                          className="block group"
                        >
                          {relatedPost.featured_image_url && (
                            <div 
                              className="w-full h-32 bg-cover bg-center rounded-md mb-2"
                              style={{ backgroundImage: `url('${relatedPost.featured_image_url}')` }}
                            />
                          )}
                          <h4 className="font-semibold group-hover:text-yellow-600 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(relatedPost.published_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
