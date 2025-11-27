import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageCircleQuestion } from "lucide-react";
import { QuestionForm } from "./QuestionForm";

export const metadata: Metadata = {
  title: "Ask a Question - VCM Answers",
  description: "Ask your question about creative business, marketing, monetization, and get expert answers from the VCM community.",
};

export default function NewQuestionPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link 
          href="/answers" 
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Answers
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <MessageCircleQuestion className="w-4 h-4" />
            Ask a Question
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
            What would you like to know?
          </h1>
          <p className="text-stone-600">
            Ask about creative business, marketing, monetization, tools, or anything else.
          </p>
        </div>

        {/* Form */}
        <QuestionForm />
      </div>
    </div>
  );
}
