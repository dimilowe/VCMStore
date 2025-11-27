"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThumbsUp, ArrowRight } from "lucide-react";

interface Question {
  id: number;
  slug: string;
  title: string;
  upvote_count: number;
}

interface RelatedQuestionsProps {
  currentSlug: string;
  title: string;
}

export function RelatedQuestions({ currentSlug, title }: RelatedQuestionsProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const words = title.split(" ").filter(w => w.length > 3).slice(0, 3);
        const searchQuery = words.join(" ");
        
        const res = await fetch(`/api/answers?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        
        const filtered = data
          .filter((q: Question) => q.slug !== currentSlug)
          .slice(0, 5);
        
        setQuestions(filtered);
      } catch (error) {
        console.error("Failed to load related questions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelated();
  }, [currentSlug, title]);

  if (loading || questions.length === 0) return null;

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-6">
      <h2 className="text-lg font-bold text-stone-900 mb-4">Related Questions</h2>
      <div className="space-y-3">
        {questions.map((q) => (
          <Link
            key={q.id}
            href={`/answers/${q.slug}`}
            className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-stone-50 transition-colors group"
          >
            <span className="text-stone-700 group-hover:text-yellow-600 transition-colors line-clamp-1 flex-1">
              {q.title}
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <span className="flex items-center gap-1 text-sm text-stone-500">
                <ThumbsUp className="w-3 h-3" />
                {q.upvote_count}
              </span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-yellow-600 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
