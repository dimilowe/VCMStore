import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, Tv, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "YouTube Thumbnail Dimensions: Shorts vs Long-Form Guide | VCM Suite",
  description: "Complete guide to YouTube thumbnail sizes. Learn the exact dimensions for standard videos, Shorts, and how thumbnails display across devices.",
  keywords: "youtube thumbnail dimensions, youtube thumbnail size, youtube shorts thumbnail, thumbnail resolution, youtube image size",
};

export default function YouTubeThumbnailDimensionsGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-sm text-orange-600 font-medium mb-2">Technical Guide</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>YouTube Thumbnail Dimensions</strong>: Shorts vs Long-Form
          </h1>
          <p className="text-xl text-gray-600">
            The complete technical reference for YouTube thumbnail sizes and how they display.
          </p>
        </header>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-10">
          <h2 className="font-semibold text-orange-800 mb-2">Quick Answer</h2>
          <p className="text-orange-700 mb-4">
            YouTube thumbnails should be <strong>1280×720 pixels</strong> (16:9 aspect ratio) with a minimum width of 640 pixels and under 2MB file size.
          </p>
          <Link
            href="/tools/youtube-thumbnail-resizer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            Resize Your Thumbnail <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="prose prose-lg max-w-none">
          <h2>Standard YouTube Video Thumbnails</h2>
          
          <div className="not-prose bg-white border border-gray-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-gray-900 mb-4">Official Specifications</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Recommended Size</p>
                <p className="text-2xl font-mono font-bold text-orange-600">1280 × 720 px</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Aspect Ratio</p>
                <p className="text-2xl font-mono font-bold text-orange-600">16:9</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Minimum Width</p>
                <p className="text-2xl font-mono font-bold text-gray-700">640 px</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Max File Size</p>
                <p className="text-2xl font-mono font-bold text-gray-700">2 MB</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Accepted Formats</p>
                <p className="text-lg font-medium text-gray-700">JPG, PNG, GIF, BMP</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Recommended Format</p>
                <p className="text-lg font-medium text-gray-700">JPG (smaller file size)</p>
              </div>
            </div>
          </div>

          <h2>YouTube Shorts Thumbnails</h2>
          <p>
            YouTube Shorts work differently than standard videos. Shorts don't have traditional custom thumbnails—instead, YouTube automatically uses a frame from your video.
          </p>
          
          <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-blue-900 mb-3">Shorts Thumbnail Behavior</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-blue-800">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Shorts use a vertical 9:16 frame from your video</span>
              </li>
              <li className="flex items-start gap-2 text-blue-800">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>You can select which frame becomes the thumbnail</span>
              </li>
              <li className="flex items-start gap-2 text-blue-800">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Custom image uploads are not supported for Shorts</span>
              </li>
              <li className="flex items-start gap-2 text-blue-800">
                <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Design your opening frame with the thumbnail in mind</span>
              </li>
            </ul>
          </div>

          <h2>How Thumbnails Display Across Devices</h2>
          
          <div className="not-prose grid md:grid-cols-3 gap-4 my-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <Monitor className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Desktop</h4>
              <p className="text-sm text-gray-600">Displays at ~320×180px in search results and recommendations</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <Smartphone className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Mobile</h4>
              <p className="text-sm text-gray-600">Displays at ~120×68px or smaller in the feed</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <Tv className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">TV App</h4>
              <p className="text-sm text-gray-600">Displays larger, up to 560×315px on big screens</p>
            </div>
          </div>

          <h2>Why 1280×720 is the Sweet Spot</h2>
          <p>
            While you could upload a 1920×1080 thumbnail, it's unnecessary and creates larger file sizes. Here's why 1280×720 is optimal:
          </p>
          <ul>
            <li><strong>Matches the 16:9 aspect ratio exactly</strong> - No cropping or letterboxing</li>
            <li><strong>Large enough for all display contexts</strong> - Won't pixelate even on TV</li>
            <li><strong>Small enough for fast uploads</strong> - Stays under the 2MB limit easily</li>
            <li><strong>Industry standard</strong> - All thumbnail tools and templates use this size</li>
          </ul>

          <h2>Safe Zones: Where NOT to Put Important Content</h2>
          <p>
            YouTube overlays UI elements on thumbnails in certain contexts. Keep critical content away from these areas:
          </p>
          
          <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-amber-800 mb-3">Watch Out For:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-amber-800">
                <span className="w-5 h-5 bg-amber-400 rounded flex items-center justify-center text-xs font-bold text-amber-900 flex-shrink-0">!</span>
                <span><strong>Bottom right corner</strong> - Video duration badge covers this area</span>
              </li>
              <li className="flex items-start gap-2 text-amber-800">
                <span className="w-5 h-5 bg-amber-400 rounded flex items-center justify-center text-xs font-bold text-amber-900 flex-shrink-0">!</span>
                <span><strong>Bottom left corner</strong> - "Watch later" and "Add to queue" buttons appear here on hover</span>
              </li>
              <li className="flex items-start gap-2 text-amber-800">
                <span className="w-5 h-5 bg-amber-400 rounded flex items-center justify-center text-xs font-bold text-amber-900 flex-shrink-0">!</span>
                <span><strong>Very edges</strong> - Some display contexts crop a few pixels from all sides</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Get the Perfect Size Instantly</h2>
          <p className="text-gray-300 mb-6">
            Upload any image and our tool will automatically resize it to exactly 1280×720 pixels with the correct aspect ratio. No Photoshop needed.
          </p>
          <Link
            href="/tools/youtube-thumbnail-resizer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            Open YouTube Thumbnail Resizer <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/tools/youtube-thumbnail-resizer"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">YouTube Thumbnail Resizer</p>
              <p className="text-sm text-gray-500">Resize to 1280×720 instantly</p>
            </Link>
            <Link
              href="/mbb/youtube-thumbnail-design-tips"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">Thumbnail Design Tips</p>
              <p className="text-sm text-gray-500">How to make click-worthy thumbnails</p>
            </Link>
            <Link
              href="/tools/social-media-image-sizes"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">All Social Media Image Sizes</p>
              <p className="text-sm text-gray-500">Complete dimension reference</p>
            </Link>
            <Link
              href="/tools/ai-thumbnail-coach"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">AI Thumbnail Coach</p>
              <p className="text-sm text-gray-500">Get AI feedback on your thumbnail</p>
            </Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: "YouTube Thumbnail Dimensions: Shorts vs Long-Form Guide",
              description: "Complete guide to YouTube thumbnail sizes and specifications.",
              author: {
                "@type": "Organization",
                name: "VCM Suite"
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What size should a YouTube thumbnail be?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "YouTube thumbnails should be 1280×720 pixels with a 16:9 aspect ratio. Minimum width is 640 pixels, and files should be under 2MB."
                  }
                },
                {
                  "@type": "Question",
                  name: "Can I upload custom thumbnails for YouTube Shorts?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No, YouTube Shorts don't support custom thumbnail uploads. Instead, you select a frame from your video to use as the thumbnail."
                  }
                },
                {
                  "@type": "Question",
                  name: "What file format is best for YouTube thumbnails?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "JPG is recommended because it creates smaller file sizes while maintaining quality. YouTube also accepts PNG, GIF, and BMP."
                  }
                }
              ]
            })
          }}
        />
      </article>
    </main>
  );
}
