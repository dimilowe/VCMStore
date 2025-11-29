import { query } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Metadata } from "next";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CategoryFilter } from "@/components/CategoryFilter";

export const metadata: Metadata = {
  title: "Blog & Newsletter | VCM Store",
  description: "Read the latest insights, tutorials, and tips for modern creators. Get exclusive tools, early access, and insider tips delivered weekly.",
  openGraph: {
    title: "Blog & Newsletter | VCM Store",
    description: "Read the latest insights, tutorials, and tips for modern creators.",
    type: "website",
  },
};

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url: string | null;
  published_at: Date;
  view_count: number;
  categories: { id: number; name: string; slug: string }[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  post_count: number;
}

async function getBlogPosts(categorySlug?: string): Promise<BlogPost[]> {
  let sql = `
    SELECT 
      bp.id, 
      bp.title, 
      bp.slug, 
      bp.excerpt, 
      bp.featured_image_url, 
      bp.published_at, 
      bp.view_count,
      COALESCE(
        json_agg(
          json_build_object('id', c.id, 'name', c.name, 'slug', c.slug)
        ) FILTER (WHERE c.id IS NOT NULL),
        '[]'
      ) as categories
    FROM blog_posts bp
    LEFT JOIN blog_post_categories bpc ON bp.id = bpc.blog_post_id
    LEFT JOIN categories c ON bpc.category_id = c.id
    WHERE bp.published_at IS NOT NULL AND bp.published_at <= NOW()
  `;

  if (categorySlug) {
    sql += ` AND bp.id IN (
      SELECT blog_post_id FROM blog_post_categories 
      WHERE category_id = (SELECT id FROM categories WHERE slug = $1)
    )`;
  }

  sql += `
    GROUP BY bp.id
    ORDER BY bp.published_at DESC
    LIMIT 50
  `;

  const result = await query(sql, categorySlug ? [categorySlug] : []);
  return result.rows;
}

async function getCategories(): Promise<Category[]> {
  const result = await query(
    `SELECT 
      c.id, 
      c.name, 
      c.slug,
      COUNT(bpc.blog_post_id) as post_count
     FROM categories c
     LEFT JOIN blog_post_categories bpc ON c.id = bpc.category_id
     LEFT JOIN blog_posts bp ON bpc.blog_post_id = bp.id 
       AND bp.published_at IS NOT NULL 
       AND bp.published_at <= NOW()
     GROUP BY c.id
     HAVING COUNT(bpc.blog_post_id) > 0
     ORDER BY c.name ASC`,
    []
  );
  return result.rows;
}

export default async function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = await getBlogPosts(category);
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">NEWSLETTER</h1>
          <p className="text-xl md:text-2xl">Join thousands of creators building their empire</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Blog Posts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Category Filter */}
            {categories.length > 0 && (
              <CategoryFilter categories={categories} selectedCategory={category} />
            )}

            <div>
              <h2 className="text-3xl font-bold mb-6">
                {category 
                  ? `${categories.find(c => c.slug === category)?.name || 'Category'} Articles`
                  : 'Latest Articles'
                }
              </h2>
              
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-lg text-muted-foreground mb-4">
                      {category 
                        ? 'No articles in this category yet.'
                        : 'No blog posts yet. Check back soon for valuable insights!'
                      }
                    </p>
                    {category ? (
                      <Link href="/newsletter" className="text-orange-600 hover:text-orange-700 font-medium">
                        ← View All Articles
                      </Link>
                    ) : (
                      <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
                        Browse Products →
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {posts.map((post) => (
                    <Link key={post.id} href={`/newsletter/${post.slug}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="md:flex">
                          {post.featured_image_url && (
                            <div 
                              className="md:w-72 h-48 bg-cover bg-center"
                              style={{ backgroundImage: `url('${post.featured_image_url}')` }}
                            />
                          )}
                          <div className="flex-1">
                            <CardHeader>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <time dateTime={new Date(post.published_at).toISOString()}>
                                  {new Date(post.published_at).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </time>
                                {post.view_count > 0 && (
                                  <>
                                    <span>•</span>
                                    <span>{post.view_count} views</span>
                                  </>
                                )}
                              </div>
                              <CardTitle className="text-2xl hover:text-orange-600 transition-colors">
                                {post.title}
                              </CardTitle>
                              {post.excerpt && (
                                <CardDescription className="text-base mt-2">
                                  {post.excerpt}
                                </CardDescription>
                              )}
                              {post.categories && post.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {post.categories.map((cat) => (
                                    <Badge 
                                      key={cat.id} 
                                      variant="secondary"
                                      className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                                    >
                                      {cat.name}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </CardHeader>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card className="border-2 border-orange-500">
                <CardHeader>
                  <CardTitle className="text-2xl">STAY IN THE LOOP</CardTitle>
                  <CardDescription>
                    Get exclusive tools, early access, and insider tips delivered weekly.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <NewsletterSignup />
                </CardContent>
              </Card>

              {/* Categories Sidebar */}
              {categories.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <Link 
                          key={cat.id} 
                          href={`/newsletter?category=${cat.slug}`}
                          className={`block px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                            category === cat.slug ? 'bg-orange-100 text-orange-800 font-medium' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{cat.name}</span>
                            <Badge variant="outline">{cat.post_count}</Badge>
                          </div>
                        </Link>
                      ))}
                      {category && (
                        <Link 
                          href="/newsletter"
                          className="block px-3 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
                        >
                          ← View All
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Popular Posts */}
              {posts.length > 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {posts
                        .sort((a, b) => b.view_count - a.view_count)
                        .slice(0, 5)
                        .map((post) => (
                          <Link 
                            key={post.id} 
                            href={`/newsletter/${post.slug}`}
                            className="block hover:text-orange-600 transition-colors"
                          >
                            <div className="text-sm font-medium line-clamp-2">
                              {post.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {post.view_count} views
                            </div>
                          </Link>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
