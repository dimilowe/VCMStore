import { Metadata } from "next";
import ThumbnailCoachClient from "./ThumbnailCoachClient";

export const metadata: Metadata = {
  title: "AI YouTube Thumbnail Coach (Free) | VCM Hub",
  description: "Upload your YouTube thumbnail and get instant AI analysis with scores for clarity, intrigue, emotion, contrast, text readability, and composition. Plus chat with an AI coach for deeper help.",
  keywords: ["youtube thumbnail", "thumbnail analyzer", "thumbnail coach", "ctr optimization", "youtube tips", "thumbnail feedback"],
};

export default function AIThumbnailCoachPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-600 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Free AI-Powered Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI YouTube Thumbnail Coach
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your thumbnail and get instant AI analysis with actionable feedback. 
            Then chat with your AI coach for deeper optimization help.
          </p>
        </div>

        <ThumbnailCoachClient />

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Powered by advanced AI vision analysis. Your thumbnails are not stored.
          </p>
        </div>
      </div>
    </div>
  );
}
