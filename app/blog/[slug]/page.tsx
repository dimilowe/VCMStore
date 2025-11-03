import { notFound } from "next/navigation";
import { query } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { EmailCapture } from "@/components/email-capture";
import { ProductCard } from "@/components/product-card";
import ReactMarkdown from "react-markdown";

export const dynamic = 'force-dynamic';

interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  cover_image_url: string;
  tags: string[];
  published_at: Date;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  thumbnail_url: string;
  type: string;
  price_type: string;
  price: number;
}

async function getPost(slug: string): Promise<Post | null> {
  const result = await query(
    "SELECT * FROM posts WHERE slug = $1 AND status = 'published'",
    [slug]
  );
  return result.rows[0] || null;
}

async function getRelatedProducts(tags: string[]): Promise<Product[]> {
  if (!tags || tags.length === 0) {
    return [];
  }

  const result = await query(
    `SELECT id, slug, name, description, thumbnail_url, type, price_type, price 
     FROM products 
     WHERE visibility = 'public' 
     LIMIT 3`
  );
  return result.rows;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(post.tags || []);

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        {post.cover_image_url && (
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <time className="text-muted-foreground">
            {new Date(post.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>

        <div className="mb-12">
          <EmailCapture source="blog-post" />
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
