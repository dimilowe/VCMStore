import { query } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Eye, Trash2 } from "lucide-react";
import { DeleteBlogPostButton } from "@/components/DeleteBlogPostButton";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  published_at: Date | null;
  created_at: Date;
  view_count: number;
}

async function getAllBlogPosts(): Promise<BlogPost[]> {
  const result = await query(
    `SELECT id, title, slug, published_at, created_at, view_count
     FROM blog_posts 
     ORDER BY created_at DESC`,
    []
  );
  return result.rows;
}

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage your blog posts</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              No blog posts yet. Create your first post!
            </p>
            <Link href="/admin/blog/new">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="py-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      {post.published_at ? (
                        post.published_at <= new Date() ? (
                          <Badge className="bg-green-100 text-green-800">Published</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                        )
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Slug: /{post.slug}</span>
                      {post.published_at && (
                        <span>
                          Published: {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.view_count} views
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {post.published_at && post.published_at <= new Date() && (
                      <Link href={`/newsletter/${post.slug}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    )}
                    <Link href={`/admin/blog/edit/${post.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <DeleteBlogPostButton postId={post.id} postTitle={post.title} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
