'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

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

interface NewsletterSearchListProps {
  posts: BlogPost[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  category?: string;
}

const POSTS_PER_PAGE = 10;

export function NewsletterSearchList({ 
  posts, 
  totalCount, 
  totalPages, 
  currentPage, 
  category 
}: NewsletterSearchListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [localPage, setLocalPage] = useState(1);

  const isSearching = searchQuery.length > 0;

  const filteredPosts = isSearching
    ? posts.filter(post => {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.slug.toLowerCase().includes(query) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(query))
        );
      })
    : posts;

  const localTotalPages = isSearching 
    ? Math.ceil(filteredPosts.length / POSTS_PER_PAGE) 
    : totalPages;
  
  const displayPosts = isSearching
    ? filteredPosts.slice((localPage - 1) * POSTS_PER_PAGE, localPage * POSTS_PER_PAGE)
    : posts;

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setLocalPage(1);
  };

  const buildPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (pageNum > 1) params.set('page', pageNum.toString());
    const queryString = params.toString();
    return `/newsletter${queryString ? `?${queryString}` : ''}`;
  };

  const displayPage = isSearching ? localPage : currentPage;
  const displayTotalPages = isSearching ? localTotalPages : totalPages;
  const displayTotalCount = isSearching ? filteredPosts.length : totalCount;

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-12 py-6 text-lg bg-white"
        />
      </div>

      {isSearching && (
        <p className="text-sm text-muted-foreground">
          Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} matching "{searchQuery}"
        </p>
      )}

      {displayPosts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              {isSearching 
                ? `No articles found matching "${searchQuery}"`
                : 'No articles yet. Check back soon!'
              }
            </p>
            {isSearching && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
              >
                Clear search
              </button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-8">
            {displayPosts.map((post) => (
              <Link key={post.id} href={`/newsletter/${post.slug}`} className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
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

          {displayTotalPages > 1 && (
            <div className="flex items-center justify-between pt-8 border-t mt-8">
              <p className="text-sm text-muted-foreground">
                Page {displayPage} of {displayTotalPages} ({displayTotalCount} articles)
              </p>
              <div className="flex items-center gap-2">
                {isSearching ? (
                  <>
                    {localPage > 1 && (
                      <button
                        onClick={() => setLocalPage(p => p - 1)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </button>
                    )}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(localTotalPages, 5) }, (_, i) => {
                        let pageNum: number;
                        if (localTotalPages <= 5) {
                          pageNum = i + 1;
                        } else if (localPage <= 3) {
                          pageNum = i + 1;
                        } else if (localPage >= localTotalPages - 2) {
                          pageNum = localTotalPages - 4 + i;
                        } else {
                          pageNum = localPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setLocalPage(pageNum)}
                            className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-md transition-colors ${
                              localPage === pageNum
                                ? 'bg-orange-500 text-white'
                                : 'border border-gray-300 bg-white hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    {localPage < localTotalPages && (
                      <button
                        onClick={() => setLocalPage(p => p + 1)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {currentPage > 1 && (
                      <Link
                        href={buildPageUrl(currentPage - 1)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </Link>
                    )}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum: number;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <Link
                            key={pageNum}
                            href={buildPageUrl(pageNum)}
                            className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-md transition-colors ${
                              currentPage === pageNum
                                ? 'bg-orange-500 text-white'
                                : 'border border-gray-300 bg-white hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </Link>
                        );
                      })}
                    </div>
                    {currentPage < totalPages && (
                      <Link
                        href={buildPageUrl(currentPage + 1)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
