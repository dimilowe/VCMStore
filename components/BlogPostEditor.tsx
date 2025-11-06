'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Eye, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [excerptOpen, setExcerptOpen] = useState(false);
  const [seoOpen, setSeoOpen] = useState(false);
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
    <div className="flex h-screen bg-white">
      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="border-b px-6 py-3 flex items-center justify-between bg-white">
          <Link href="/admin/blog" className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSaveDraft}
              variant="outline"
              size="sm"
              disabled={loading || !title || !content}
            >
              Save Draft
            </Button>
            <Button
              onClick={handlePublish}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
              disabled={loading || !title || !content}
            >
              {publishedAt && new Date(publishedAt) > new Date() ? 'Schedule' : 'Publish'}
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Title */}
          <div className="mb-6">
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Add title"
              disabled={loading}
              className="w-full text-4xl font-bold border-none outline-none placeholder:text-stone-300"
            />
          </div>

          {/* Content Editor */}
          <div className="prose max-w-none">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your post... You can use HTML tags like <h2>, <p>, <strong>, <ul>, etc."
              disabled={loading}
              className="w-full min-h-[500px] border-none outline-none resize-none text-base leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l bg-white overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Publish Section */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Publish</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-600">Status:</span>
                <span className="font-medium">
                  {post?.published_at ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="pt-2">
                <label className="text-xs text-stone-600 block mb-1">Schedule for:</label>
                <Input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  disabled={loading}
                  className="text-sm"
                />
                <p className="text-xs text-stone-500 mt-1">
                  Leave empty to publish immediately
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            {/* Slug */}
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-sm">Slug</h3>
              <Input
                value={slug}
                onChange={(e) => setSlug(generateSlug(e.target.value))}
                placeholder="post-url-slug"
                disabled={loading}
                className="text-sm"
              />
              <p className="text-xs text-stone-500">
                /newsletter/{slug || 'your-slug'}
              </p>
            </div>

            {/* Featured Image */}
            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-sm">Featured Image</h3>
              <Input
                value={featuredImageUrl}
                onChange={(e) => setFeaturedImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                disabled={loading}
                className="text-sm"
              />
              <p className="text-xs text-stone-500">
                Image URL for social sharing
              </p>
              {featuredImageUrl && (
                <div className="mt-2 rounded border overflow-hidden">
                  <img src={featuredImageUrl} alt="Featured" className="w-full h-32 object-cover" />
                </div>
              )}
            </div>

            {/* Excerpt - Collapsible */}
            <div className="border-t pt-6 mb-6">
              <button
                onClick={() => setExcerptOpen(!excerptOpen)}
                className="w-full flex items-center justify-between text-sm font-semibold mb-3"
              >
                <span>Excerpt</span>
                {excerptOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {excerptOpen && (
                <div className="space-y-2">
                  <Textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief summary for post listings..."
                    rows={3}
                    disabled={loading}
                    className="text-sm"
                  />
                  <p className="text-xs text-stone-500">
                    Optional summary shown in post listings
                  </p>
                </div>
              )}
            </div>

            {/* SEO - Collapsible */}
            <div className="border-t pt-6">
              <button
                onClick={() => setSeoOpen(!seoOpen)}
                className="w-full flex items-center justify-between text-sm font-semibold mb-3"
              >
                <span>SEO Settings</span>
                {seoOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {seoOpen && (
                <div className="space-y-2">
                  <label className="text-xs text-stone-600 block">Meta Description</label>
                  <Textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="SEO description for Google (150-160 chars)"
                    rows={3}
                    maxLength={160}
                    disabled={loading}
                    className="text-sm"
                  />
                  <p className="text-xs text-stone-500">
                    {metaDescription.length}/160 characters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
