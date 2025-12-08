"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

export function QuestionForm() {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter your question.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          context: context.trim() || null,
          author_name: authorName.trim() || "Anonymous",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit question");
      }

      router.push(`/answers/${data.slug}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Your Question <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., How do I monetize my newsletter?"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          maxLength={200}
        />
        <p className="text-xs text-gray-500 mt-1">{title.length}/200 characters</p>
      </div>

      <div>
        <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
          More Details / Context <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          id="context"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Add any relevant details that might help get a better answer..."
          rows={5}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
          maxLength={2000}
        />
        <p className="text-xs text-gray-500 mt-1">{context.length}/2000 characters</p>
      </div>

      <div>
        <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-2">
          Your Name <span className="text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Anonymous"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          maxLength={50}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-base font-semibold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Submit Question
          </>
        )}
      </Button>
    </form>
  );
}
