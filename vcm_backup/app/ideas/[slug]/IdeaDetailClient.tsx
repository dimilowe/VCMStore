'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUp, MessageSquare, Clock, Send, Loader2, User } from 'lucide-react';

interface Idea {
  id: number;
  slug: string;
  title: string;
  one_liner: string;
  problem: string;
  who_it_serves: string;
  solution: string;
  monetization: string | null;
  why_now: string | null;
  tags: string | null;
  upvote_count: number;
  comment_count: number;
  created_at: string;
}

interface Comment {
  id: number;
  author_name: string;
  body: string;
  created_at: string;
}

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

export default function IdeaDetailClient({
  idea,
  comments: initialComments,
  initialHasVoted,
}: {
  idea: Idea;
  comments: Comment[];
  initialHasVoted: boolean;
}) {
  const [upvoteCount, setUpvoteCount] = useState(idea.upvote_count);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);
  const [isVoting, setIsVoting] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [commentForm, setCommentForm] = useState({ name: '', body: '' });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const handleVote = async () => {
    if (isVoting) return;
    setIsVoting(true);
    
    try {
      const response = await fetch(`/api/ideas/${idea.id}/vote`, {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        setUpvoteCount(data.upvote_count);
        setHasVoted(data.has_voted);
      }
    } catch (error) {
      console.error('Vote failed:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentForm.body.trim() || isSubmittingComment) return;
    
    setIsSubmittingComment(true);
    
    try {
      const response = await fetch(`/api/ideas/${idea.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentForm),
      });
      
      const data = await response.json();
      
      if (data.comment) {
        setComments([data.comment, ...comments]);
        setCommentForm({ name: '', body: '' });
      }
    } catch (error) {
      console.error('Comment failed:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const sections = [
    { title: 'The Problem', content: idea.problem },
    { title: 'Who It Serves', content: idea.who_it_serves },
    { title: 'The Solution', content: idea.solution },
    { title: 'Monetization', content: idea.monetization },
    { title: 'Why Now', content: idea.why_now },
  ].filter(s => s.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: idea.title,
    description: idea.one_liner,
    datePublished: idea.created_at,
    dateModified: idea.created_at,
    author: {
      '@type': 'Organization',
      name: 'VCM Ideas Hub',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VCM Suite',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `/ideas/${idea.slug}`,
    },
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: upvoteCount,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/CommentAction',
        userInteractionCount: comments.length,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Ideas
          </Link>

          <article className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
            <div className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <button
                  onClick={handleVote}
                  disabled={isVoting}
                  className={`flex flex-col items-center justify-center w-16 h-20 rounded-xl transition-all shrink-0 ${
                    hasVoted
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-amber-100 hover:text-amber-600'
                  } ${isVoting ? 'opacity-50' : ''}`}
                >
                  <ArrowUp className="w-6 h-6" />
                  <span className="text-lg font-bold">{upvoteCount}</span>
                </button>

                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {idea.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
                    {idea.one_liner}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                    {idea.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {idea.tags.split(',').map((tag, i) => (
                          <span
                            key={i}
                            className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {comments.length} comments
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTimeAgo(idea.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {sections.map((section, i) => (
                  <div key={i}>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Comments ({comments.length})
              </h2>

              <form onSubmit={handleSubmitComment} className="mb-8">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={commentForm.name}
                    onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                    placeholder="Your name (optional)"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  />
                  <textarea
                    value={commentForm.body}
                    onChange={(e) => setCommentForm({ ...commentForm, body: e.target.value })}
                    placeholder="Share your thoughts on this idea..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={!commentForm.body.trim() || isSubmittingComment}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      commentForm.body.trim() && !isSubmittingComment
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmittingComment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Post Comment
                      </>
                    )}
                  </button>
                </div>
              </form>

              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <User className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="font-medium text-gray-800">
                          {comment.author_name || 'Anonymous'}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {formatTimeAgo(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-600 pl-10 whitespace-pre-wrap">
                        {comment.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Part of{' '}
              <Link href="/ideas" className="text-amber-600 hover:text-amber-700 font-medium">
                VCM Ideas Hub
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
