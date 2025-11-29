"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Send, Shield } from "lucide-react";

interface AdminAnswerFormProps {
  questionId: number;
  existingAnswer: string | null;
}

export function AdminAnswerForm({ questionId, existingAnswer }: AdminAnswerFormProps) {
  const [answer, setAnswer] = useState(existingAnswer || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!answer.trim()) {
      setError("Please enter an answer.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/answers/${questionId}/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: answer.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save answer");
      }

      setSuccess(true);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 border border-gray-200 rounded-xl p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-orange-600" />
        <h3 className="font-bold text-gray-900">Admin: Add/Edit Answer</h3>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg text-sm mb-4">
          Answer saved successfully!
        </div>
      )}

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here... (HTML allowed)"
        rows={6}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none mb-4"
      />

      <Button
        type="submit"
        disabled={isSubmitting || !answer.trim()}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-semibold rounded-lg flex items-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {existingAnswer ? "Update Answer" : "Post Answer"}
          </>
        )}
      </Button>
    </form>
  );
}
