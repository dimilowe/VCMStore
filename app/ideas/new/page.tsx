'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lightbulb, ArrowLeft, Loader2, Send } from 'lucide-react';

export default function SubmitIdeaPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    one_liner: '',
    problem: '',
    who_it_serves: '',
    solution: '',
    monetization: '',
    why_now: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit idea');
      }

      router.push(`/ideas/${data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsSubmitting(false);
    }
  };

  const requiredFields = ['title', 'one_liner', 'problem', 'who_it_serves', 'solution'];
  const isValid = requiredFields.every(field => formData[field as keyof typeof formData].trim());

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ideas
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Lightbulb className="w-4 h-4" />
            Share Your Idea
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Submit a New Idea
          </h1>
          <p className="text-stone-600 max-w-xl mx-auto">
            Share an idea you think should exist. The more detail you provide, the more valuable it is for others.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-6 md:p-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-stone-700 mb-2">
                  Idea Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., AI-Powered Resume Analyzer"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="one_liner" className="block text-sm font-semibold text-stone-700 mb-2">
                  One-Liner <span className="text-red-500">*</span>
                  <span className="font-normal text-stone-500 ml-2">({formData.one_liner.length}/160)</span>
                </label>
                <input
                  type="text"
                  id="one_liner"
                  name="one_liner"
                  value={formData.one_liner}
                  onChange={handleChange}
                  maxLength={160}
                  placeholder="A short, punchy description of the idea"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="problem" className="block text-sm font-semibold text-stone-700 mb-2">
                  The Problem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="problem"
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  rows={3}
                  placeholder="What problem does this solve? Why is it painful?"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="who_it_serves" className="block text-sm font-semibold text-stone-700 mb-2">
                  Who It Serves <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="who_it_serves"
                  name="who_it_serves"
                  value={formData.who_it_serves}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Who would use this? Be specific about the target audience."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="solution" className="block text-sm font-semibold text-stone-700 mb-2">
                  The Solution <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="solution"
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  rows={3}
                  placeholder="How would this work? What would it look like?"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="monetization" className="block text-sm font-semibold text-stone-700 mb-2">
                  Monetization <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="monetization"
                  name="monetization"
                  value={formData.monetization}
                  onChange={handleChange}
                  rows={2}
                  placeholder="How could this make money? Subscription, freemium, ads, etc."
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label htmlFor="why_now" className="block text-sm font-semibold text-stone-700 mb-2">
                  Why Now? <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="why_now"
                  name="why_now"
                  value={formData.why_now}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Why is this the right time for this idea? New technology, trend, regulation?"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-semibold text-stone-700 mb-2">
                  Tags <span className="text-stone-400 font-normal">(optional, comma-separated)</span>
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., AI, SaaS, Productivity, B2B"
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
              isValid && !isSubmitting
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Idea
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-8 text-stone-500 text-sm">
          Your idea will be publicly visible and can be upvoted by others.
        </div>
      </div>
    </div>
  );
}
