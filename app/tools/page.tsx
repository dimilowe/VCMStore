import { Metadata } from "next";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "Free Tools for Creators — VCM Suite",
  description: "Free online tools for creators and entrepreneurs. Compress images, generate logos, find keywords, create diagrams, and more — all 100% free.",
  keywords: "free tools, image compressor, gif compressor, word counter, logo generator, keyword finder, emoji combos, horoscope generator, affirmation generator",
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            100% Free
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Free Tools for Creators
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful online tools to help you create, optimize, and grow. No signup required.
          </p>
        </div>

        <ToolsClient />
      </div>
    </div>
  );
}
