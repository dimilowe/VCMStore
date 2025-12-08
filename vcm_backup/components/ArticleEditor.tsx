'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, Eye, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { WYSIWYGEditor } from '@/components/WYSIWYGEditor';

interface ClusterArticle {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_description: string | null;
  cluster_slug: string;
  is_published: boolean;
  is_indexed: boolean;
}

interface ArticleEditorProps {
  article: ClusterArticle;
}

export function ArticleEditor({ article }: ArticleEditorProps) {
  const [title, setTitle] = useState(article.title || '');
  const [slug, setSlug] = useState(article.slug || '');
  const [content, setContent] = useState(article.content || '');
  const [excerpt, setExcerpt] = useState(article.excerpt || '');
  const [metaDescription, setMetaDescription] = useState(article.meta_description || '');
  const [isPublished, setIsPublished] = useState(article.is_published || false);
  const [isIndexed, setIsIndexed] = useState(article.is_indexed || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [seoOpen, setSeoOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [autoSaving, setAutoSaving] = useState(false);
  const router = useRouter();
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!article?.id) return;
    if (!content && !title) return;
    
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(async () => {
      if (loading || autoSaving) return;
      
      setAutoSaving(true);
      try {
        const res = await fetch(`/api/admin/articles/${article.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            slug,
            content,
            excerpt: excerpt || null,
            meta_description: metaDescription || null,
            is_published: isPublished,
            is_indexed: isIndexed,
          }),
          credentials: 'include',
        });

        const data = await res.json();
        if (data.success) {
          setLastSaved(new Date());
        }
      } catch (err) {
        console.error('Autosave failed:', err);
      } finally {
        setAutoSaving(false);
      }
    }, 3000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [title, content, excerpt, metaDescription, isPublished, isIndexed, slug]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/admin/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt: excerpt || null,
          meta_description: metaDescription || null,
          is_published: isPublished,
          is_indexed: isIndexed,
        }),
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        setSuccess('Article saved successfully!');
        setLastSaved(new Date());
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Failed to save article');
      }
    } catch (err) {
      setError('Failed to save article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/articles" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="font-semibold text-gray-900">Edit Article</h1>
                <p className="text-xs text-gray-500">
                  Cluster: {article.cluster_slug}
                  {lastSaved && (
                    <span className="ml-2">
                      {autoSaving ? 'Saving...' : `Last saved ${lastSaved.toLocaleTimeString()}`}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/articles/${slug}`}
                target="_blank"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Link>
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <Input
                placeholder="Article Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold border-0 px-0 focus-visible:ring-0 placeholder:text-gray-300"
              />
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6">
              <WYSIWYGEditor
                content={content}
                onChange={setContent}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Publishing</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Published</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Indexed (SEO)</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isIndexed}
                      onChange={(e) => setIsIndexed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <button
                onClick={() => setSeoOpen(!seoOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <h3 className="font-semibold text-gray-900">SEO Settings</h3>
                {seoOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {seoOpen && (
                <div className="p-4 pt-0 border-t space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (read-only)</label>
                    <Input
                      value={slug}
                      disabled
                      className="text-sm bg-gray-50"
                    />
                    <p className="text-xs text-gray-400 mt-1">/articles/{slug}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                    <Textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Brief summary of the article..."
                      className="text-sm"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meta Description ({metaDescription.length}/160)
                    </label>
                    <Textarea
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                      placeholder="SEO meta description..."
                      className="text-sm"
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
