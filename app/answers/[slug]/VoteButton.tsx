"use client";

import { useState } from "react";
import { ThumbsUp } from "lucide-react";

interface VoteButtonProps {
  questionId: number;
  initialCount: number;
}

export function VoteButton({ questionId, initialCount }: VoteButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (hasVoted || isVoting) return;

    setIsVoting(true);

    try {
      const res = await fetch(`/api/answers/${questionId}/vote`, {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        setCount(data.upvote_count);
        setHasVoted(true);
      } else if (res.status === 409) {
        setHasVoted(true);
      }
    } catch (error) {
      console.error("Vote failed:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <button
      onClick={handleVote}
      disabled={hasVoted || isVoting}
      className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${
        hasVoted
          ? "bg-yellow-100 text-yellow-600"
          : "bg-stone-100 text-stone-600 hover:bg-yellow-50 hover:text-yellow-600"
      }`}
    >
      <ThumbsUp className={`w-5 h-5 ${hasVoted ? "fill-current" : ""}`} />
      <span className="text-sm font-bold">{count}</span>
    </button>
  );
}
