'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lightbulb, ArrowUp, MessageSquare, Clock, Plus, Flame, TrendingUp, Sparkles } from 'lucide-react';

interface Idea {
  id: number;
  slug: string;
  title: string;
  one_liner: string;
  tags: string | null;
  upvote_count: number;
  comment_count: number;
  created_at: string;
  has_voted: boolean;
}

type SortType = 'hot' | 'new' | 'top';

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return 'just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export default function IdeasFeedPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [sort, setSort] = useState<SortType>('hot');
  const [isLoading, setIsLoading] = useState(true);
  const [votingId, setVotingId] = useState<number | null>(null);

  useEffect(() => {
    fetchIdeas();
  }, [sort]);

  const fetchIdeas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/ideas?sort=${sort}`);
      const data = await response.json();
      setIdeas(data.ideas || []);
    } catch (error) {
      console.error('Failed to fetch ideas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (ideaId: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (votingId) return;
    
    setVotingId(ideaId);
    try {
      const response = await fetch(`/api/ideas/${ideaId}/vote`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        setIdeas(ideas.map(idea => 
          idea.id === ideaId 
            ? { ...idea, upvote_count: data.upvote_count, has_voted: data.has_voted }
            : idea
        ));
      }
    } catch (error) {
      console.error('Vote failed:', error);
    } finally {
      setVotingId(null);
    }
  };

  const sortButtons: { key: SortType; label: string; icon: React.ReactNode }[] = [
    { key: 'hot', label: 'Hot', icon: <Flame className="w-4 h-4" /> },
    { key: 'new', label: 'New', icon: <Sparkles className="w-4 h-4" /> },
    { key: 'top', label: 'Top', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'VCM Ideas Hub',
    description: 'Browse and share startup ideas that should exist. A community-driven feed of unbuilt opportunities.',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Startup Ideas',
      numberOfItems: ideas.length,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Lightbulb className="w-4 h-4" />
              Community Ideas Feed
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              VCM Ideas Hub
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Unbuilt opportunities waiting for someone to build them. Share ideas you won't build, discover ones you might.
            </p>
            <Link
              href="/ideas/new"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Submit an Idea
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            {sortButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setSort(btn.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  sort === btn.key
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-12 h-16 bg-gray-200 rounded-lg" />
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-gray-100 rounded w-full mb-3" />
                      <div className="h-3 bg-gray-100 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : ideas.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
              <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No ideas yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share an idea!</p>
              <Link
                href="/ideas/new"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all"
              >
                <Plus className="w-5 h-5" />
                Submit the First Idea
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="bg-white rounded-xl border border-gray-200 hover:border-amber-200 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-4 p-4">
                    <button
                      onClick={(e) => handleVote(idea.id, e)}
                      disabled={votingId === idea.id}
                      className={`flex flex-col items-center justify-center w-14 h-16 rounded-lg transition-all shrink-0 ${
                        idea.has_voted
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-500 hover:bg-amber-100 hover:text-amber-600'
                      } ${votingId === idea.id ? 'opacity-50' : ''}`}
                    >
                      <ArrowUp className="w-5 h-5" />
                      <span className="text-sm font-bold">{idea.upvote_count}</span>
                    </button>

                    <Link href={`/ideas/${idea.slug}`} className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors mb-1 line-clamp-1">
                        {idea.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {idea.one_liner}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                        {idea.tags && (
                          <div className="flex gap-1.5">
                            {idea.tags.split(',').slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {idea.comment_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {formatTimeAgo(idea.created_at)}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What is the VCM Ideas Hub?
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The VCM Ideas Hub is a community-driven feed for sharing startup ideas, app concepts, and business opportunities that should exist but haven't been built yet. Think of it as a place to share the ideas you don't have time to build yourself.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a developer looking for your next project, an entrepreneur seeking inspiration, or someone who just had a brilliant shower thought — this is your place to share and discover unbuilt opportunities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="text-3xl mb-3">💡</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Share Your Ideas</h3>
                  <p className="text-gray-600 text-sm">Have an idea you won't build? Share it with the community. Maybe someone else will make it happen.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="text-3xl mb-3">⬆️</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Upvote the Best</h3>
                  <p className="text-gray-600 text-sm">Vote for ideas you'd use or build. The best ideas rise to the top of the Hot feed.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="text-3xl mb-3">💬</div>
                  <h3 className="font-semibold text-gray-800 mb-2">Discuss & Refine</h3>
                  <p className="text-gray-600 text-sm">Leave comments to help refine ideas, suggest improvements, or connect with others.</p>
                </div>
              </div>
            </section>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Free community tool by{' '}
              <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">
                VCM Store
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
