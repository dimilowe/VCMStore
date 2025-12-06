import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "TikTok Cover Dimensions & Profile Grid Guide 2025 | VCM Suite",
  description: "Complete guide to TikTok video cover sizes, profile grid cropping, and safe zones. Learn the exact dimensions for maximum impact.",
  keywords: "tiktok cover dimensions, tiktok thumbnail size, tiktok video size, tiktok profile grid, tiktok specs",
};

export default function TikTokCoverDimensionsGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-sm text-gray-900 font-medium mb-2">Technical Guide</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>TikTok Cover Dimensions</strong> & Profile Grid Guide
          </h1>
          <p className="text-xl text-gray-600">
            The exact specifications for TikTok covers and how they display across the app.
          </p>
        </header>

        <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 mb-10">
          <h2 className="font-semibold text-gray-800 mb-2">Quick Answer</h2>
          <p className="text-gray-700 mb-4">
            TikTok video covers should be <strong>1080×1920 pixels</strong> (9:16 aspect ratio). The profile grid displays a cropped square from the center.
          </p>
          <Link
            href="/tools/tiktok-video-resizer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
          >
            Resize Your Cover <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="prose prose-lg max-w-none">
          <h2>TikTok Video & Cover Specifications</h2>
          
          <div className="not-prose bg-white border border-gray-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-gray-900 mb-4">Official Dimensions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Cover Size</p>
                <p className="text-2xl font-mono font-bold text-gray-900">1080 × 1920 px</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Aspect Ratio</p>
                <p className="text-2xl font-mono font-bold text-gray-900">9:16</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Video Length</p>
                <p className="text-xl font-medium text-gray-700">Up to 10 minutes</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">File Formats</p>
                <p className="text-xl font-medium text-gray-700">MP4, MOV, WebM</p>
              </div>
            </div>
          </div>

          <h2>Profile Grid Cropping</h2>
          <p>
            When viewers visit your TikTok profile, they see your videos in a grid. TikTok crops your 9:16 covers to display as squares:
          </p>

          <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-amber-800 mb-4">Grid Display Behavior</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800"><strong>Center crop:</strong> Only the middle ~1080×1080 portion shows in the grid</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800"><strong>Top/bottom hidden:</strong> ~420 pixels cut from top and bottom edges</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800"><strong>Full cover on tap:</strong> Users see complete 9:16 cover when they tap</p>
              </div>
            </div>
          </div>

          <h2>Safe Zone for Grid Visibility</h2>
          <p>
            To ensure your key content appears in both the full cover and the profile grid preview:
          </p>
          <ul>
            <li><strong>Keep text in the center 60%</strong> of vertical space</li>
            <li><strong>Center faces and subjects</strong> vertically</li>
            <li><strong>Test your cover</strong> by cropping it to a square preview</li>
          </ul>

          <h2>Cover Selection Options</h2>
          <p>
            TikTok gives you two ways to set your video cover:
          </p>
          
          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-white border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Select a Frame</h4>
              <p className="text-gray-600 text-sm">Choose any moment from your video as the cover. Best for authentic previews.</p>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Upload Custom Image</h4>
              <p className="text-gray-600 text-sm">Design a custom cover with text overlays. Best for searchability and branding.</p>
            </div>
          </div>

          <h2>TikTok vs Instagram Story Dimensions</h2>
          <p>
            Both platforms use the same 9:16 aspect ratio, making it easy to repurpose content:
          </p>
          
          <div className="not-prose bg-white border border-gray-200 rounded-xl p-6 my-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="font-bold text-gray-900 mb-2">TikTok Covers</p>
                <p className="text-2xl font-mono text-gray-700">1080 × 1920 px</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="font-bold text-gray-900 mb-2">Instagram Stories</p>
                <p className="text-2xl font-mono text-gray-700">1080 × 1920 px</p>
              </div>
            </div>
            <p className="mt-4 text-center text-gray-600">Same dimensions = easy cross-posting</p>
          </div>
        </section>

        <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Get Perfect TikTok Cover Dimensions</h2>
          <p className="text-gray-300 mb-6">
            Upload any image and our tool will automatically resize it to 1080×1920 pixels for TikTok video covers.
          </p>
          <Link
            href="/tools/tiktok-video-resizer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 font-medium rounded-lg transition-colors"
          >
            Open TikTok Cover Resizer <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tools/tiktok-video-resizer" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">TikTok Cover Resizer</p>
              <p className="text-sm text-gray-500">Resize to 1080×1920 instantly</p>
            </Link>
            <Link href="/mbb/tiktok-cover-design-tips" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">TikTok Cover Design Tips</p>
              <p className="text-sm text-gray-500">Create covers that get more taps</p>
            </Link>
            <Link href="/tools/social-media-image-sizes" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">All Social Media Image Sizes</p>
              <p className="text-sm text-gray-500">Complete dimension reference</p>
            </Link>
            <Link href="/tools/instagram-story-resizer" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">Instagram Story Resizer</p>
              <p className="text-sm text-gray-500">Same 9:16 format for Stories</p>
            </Link>
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "TechArticle", headline: "TikTok Cover Dimensions & Profile Grid Guide", description: "Complete guide to TikTok video cover sizes and profile grid cropping.", author: { "@type": "Organization", name: "VCM Suite" } }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What size should a TikTok cover be?", acceptedAnswer: { "@type": "Answer", text: "TikTok covers should be 1080×1920 pixels with a 9:16 aspect ratio. The profile grid will crop this to a square showing the center portion." } }, { "@type": "Question", name: "Why is my TikTok cover cropped in my profile?", acceptedAnswer: { "@type": "Answer", text: "TikTok's profile grid displays covers as squares, cropping about 420 pixels from the top and bottom. Center important content to ensure visibility." } }] }) }} />
      </article>
    </main>
  );
}
