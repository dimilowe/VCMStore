import { query } from "@/lib/db";
import { notFound } from "next/navigation";
import { BlogPostEditor } from "@/components/BlogPostEditor";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  published_at: Date | null;
}

async function getBlogPost(id: number): Promise<BlogPost | null> {
  const result = await query(
    `SELECT id, title, slug, content, excerpt, meta_description, featured_image_url, published_at
     FROM blog_posts 
     WHERE id = $1`,
    [id]
  );
  
  if (result.rows.length === 0) {
    return null;
  }
  
  return result.rows[0];
}

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPost(parseInt(id));
  
  if (!post) {
    notFound();
  }
  
  return <BlogPostEditor post={post} />;
}
