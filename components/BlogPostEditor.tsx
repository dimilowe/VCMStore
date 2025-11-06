'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_description: string | null;
  featured_image_url: string | null;
  published_at: Date | null;
}

interface BlogPostEditorProps {
  post?: BlogPost;
}

export function BlogPostEditor({ post }: BlogPostEditorProps) {
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [metaDescription, setMetaDescription] = useState(post?.meta_description || '');
  const [featuredImageUrl, setFeaturedImageUrl] = useState(post?.featured_image_url || '');
  const [publishedAt, setPublishedAt] = useState(
    post?.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!post) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    setError('');

    try {
      const endpoint = post ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
      const method = post ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt: excerpt || null,
          meta_description: metaDescription || null,
          featured_image_url: featuredImageUrl || null,
          published_at: null,
        }),
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/blog');
        router.refresh();
      } else {
        setError(data.error || 'Failed to save draft');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    setError('');

    try {
      const endpoint = post ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
      const method = post ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt: excerpt || null,
          meta_description: metaDescription || null,
          featured_image_url: featuredImageUrl || null,
          published_at: publishedAt || new Date().toISOString(),
        }),
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/blog');
        router.refresh();
      } else {
        setError(data.error || 'Failed to publish');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin/blog" className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 mb-6 font-medium">
        <ArrowLeft className="w-4 h-4" />
        Back to Blog Management
      </Link>

      <Card>
        <CardContent className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Title *</label>
            <Input
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter post title"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Slug *</label>
            <Input
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              placeholder="post-url-slug"
              required
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              URL: /newsletter/{slug || 'your-slug'}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Featured Image URL</label>
            <Input
              value={featuredImageUrl}
              onChange={(e) => setFeaturedImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Use Unsplash or upload to object storage
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Excerpt</label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary of the post (optional)"
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Meta Description (SEO)</label>
            <Textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="SEO description for search engines (recommended: 150-160 characters)"
              rows={2}
              maxLength={160}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              {metaDescription.length}/160 characters
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content (HTML) *</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content in HTML..."
              rows={20}
              required
              disabled={loading}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Supports HTML. Use headings (&lt;h2&gt;, &lt;h3&gt;), paragraphs (&lt;p&gt;), lists (&lt;ul&gt;, &lt;ol&gt;), etc.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Publish Date/Time</label>
            <Input
              type="datetime-local"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              disabled={loading}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to publish immediately, or schedule for future
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSaveDraft}
              variant="outline"
              disabled={loading || !title || !slug || !content}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button
              onClick={handlePublish}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
              disabled={loading || !title || !slug || !content}
            >
              <Eye className="w-4 h-4 mr-2" />
              {publishedAt && new Date(publishedAt) > new Date() ? 'Schedule' : 'Publish Now'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
