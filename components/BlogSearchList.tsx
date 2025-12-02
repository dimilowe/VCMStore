'use client';

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Edit, Eye, Search, Copy, Check } from "lucide-react";
import { DeleteBlogPostButton } from "@/components/DeleteBlogPostButton";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  published_at: Date | null;
  created_at: Date;
  view_count: number;
}

interface BlogSearchListProps {
  posts: BlogPost[];
}

export function BlogSearchList({ posts }: BlogSearchListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const filteredPosts = posts.filter(post => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.slug.toLowerCase().includes(query)
    );
  });

  const copySlugToClipboard = async (slug: string) => {
    const fullUrl = `/newsletter/${slug}`;
    await navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search blog posts by title or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 py-6 text-lg"
        />
      </div>

      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching "{searchQuery}"
        </p>
      )}

      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              {searchQuery 
                ? `No posts found matching "${searchQuery}"`
                : 'No blog posts yet.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="py-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      {post.published_at ? (
                        new Date(post.published_at) <= new Date() ? (
                          <Badge className="bg-green-100 text-green-800">Published</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                        )
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      <button 
                        onClick={() => copySlugToClipboard(post.slug)}
                        className="flex items-center gap-1 hover:text-orange-500 transition-colors cursor-pointer"
                        title="Click to copy link"
                      >
                        {copiedSlug === post.slug ? (
                          <>
                            <Check className="w-3 h-3 text-green-500" />
                            <span className="text-green-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>/newsletter/{post.slug}</span>
                          </>
                        )}
                      </button>
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
                    {post.published_at && new Date(post.published_at) <= new Date() && (
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
