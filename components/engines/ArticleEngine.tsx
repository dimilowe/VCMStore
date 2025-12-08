'use client';

import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Wrench, FileText, ExternalLink } from 'lucide-react';
import { ArticleForRenderer, RelatedToolItem, RelatedArticleItem } from '@/lib/types/article';

interface ArticleEngineProps {
  article: ArticleForRenderer;
  relatedArticles: RelatedArticleItem[];
  relatedTools: RelatedToolItem[];
}

export default function ArticleEngine({
  article,
  relatedArticles,
  relatedTools,
}: ArticleEngineProps) {
  const { title, description, body, monetization, interlinkParent } = article;

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-4 py-10">
        {interlinkParent && (
          <div className="mb-6">
            <Link
              href={`/articles/${interlinkParent}`}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to cluster
            </Link>
          </div>
        )}

        {!interlinkParent && (
          <div className="mb-6">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Articles
            </Link>
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
          )}
        </header>

        {monetization?.ctaUrl && monetization?.ctaLabel && (
          <div className="mb-8 rounded-xl border border-orange-200 bg-orange-50 p-4 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              {monetization.offerKey ? (
                <span className="font-medium text-orange-700">
                  Powered by {monetization.offerKey}
                </span>
              ) : (
                <span className="font-medium">Recommended resource</span>
              )}
            </div>
            <a
              href={monetization.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
            >
              {monetization.ctaLabel}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        <article className="prose prose-gray max-w-none mb-12 prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-700">
          {body ? (
            <ReactMarkdown>{body}</ReactMarkdown>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Article content coming soon.</p>
            </div>
          )}
        </article>

        {relatedTools.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-orange-500" />
              Recommended Tools
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.path}
                  className="group block rounded-xl border border-gray-200 p-4 hover:border-orange-300 hover:bg-orange-50 transition-all"
                >
                  <div className="font-medium text-gray-900 group-hover:text-orange-600 mb-1">
                    {tool.name}
                  </div>
                  {tool.description && (
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {tool.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {relatedArticles.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              Related Articles
            </h2>
            <div className="space-y-2">
              {relatedArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={a.path}
                  className="group block rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                >
                  <div className="font-medium text-gray-900 group-hover:text-orange-600">
                    {a.title}
                  </div>
                  {a.description && (
                    <div className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                      {a.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium"
          >
            <Wrench className="w-4 h-4" />
            Browse All Tools
          </Link>
        </div>
      </div>
    </main>
  );
}
