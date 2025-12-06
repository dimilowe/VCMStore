import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Story Dimensions & Safe Zones Guide 2025 | VCM Suite",
  description: "Complete guide to Instagram Story sizes, safe zones, and Reels cover dimensions. Learn exactly where to place text and key elements.",
  keywords: "instagram story dimensions, instagram story size, story safe zones, reels cover size, instagram story specs",
};

export default function InstagramStoryDimensionsGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-sm text-purple-600 font-medium mb-2">Technical Guide</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Instagram Story Dimensions</strong> & Safe Zones Guide
          </h1>
          <p className="text-xl text-gray-600">
            The exact specifications for Stories, Reels covers, and where to place your content.
          </p>
        </header>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-10">
          <h2 className="font-semibold text-purple-800 mb-2">Quick Answer</h2>
          <p className="text-purple-700 mb-4">
            Instagram Stories should be <strong>1080×1920 pixels</strong> (9:16 aspect ratio). This is the same size used for Reels covers.
          </p>
          <Link
            href="/tools/instagram-story-resizer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
          >
            Resize Your Story <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="prose prose-lg max-w-none">
          <h2>Instagram Story Specifications</h2>
          
          <div className="not-prose bg-white border border-gray-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-gray-900 mb-4">Official Dimensions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Recommended Size</p>
                <p className="text-2xl font-mono font-bold text-purple-600">1080 × 1920 px</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Aspect Ratio</p>
                <p className="text-2xl font-mono font-bold text-purple-600">9:16</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Maximum Length</p>
                <p className="text-xl font-medium text-gray-700">60 seconds (video)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Image Display Time</p>
                <p className="text-xl font-medium text-gray-700">5 seconds</p>
              </div>
            </div>
          </div>

          <h2>Understanding Safe Zones</h2>
          <p>
            Instagram overlays interface elements on top of Stories. To ensure your important content is visible, respect these safe zones:
          </p>

          <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-amber-800 mb-4">Safe Zone Measurements</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center text-amber-900 font-bold flex-shrink-0">1</div>
                <div>
                  <p className="font-medium text-amber-900">Top Zone (14% / ~270px)</p>
                  <p className="text-amber-800">Your profile photo, username, and close button appear here. Avoid placing critical text or faces in this area.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center text-amber-900 font-bold flex-shrink-0">2</div>
                <div>
                  <p className="font-medium text-amber-900">Bottom Zone (20% / ~384px)</p>
                  <p className="text-amber-800">Reply bar, sticker tray, and swipe-up/link area. Text here will be covered or hard to tap.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center text-amber-900 font-bold flex-shrink-0">3</div>
                <div>
                  <p className="font-medium text-amber-900">Side Margins (~5% / ~54px each)</p>
                  <p className="text-amber-800">Some phone screens crop edges. Keep a small margin on left and right.</p>
                </div>
              </div>
            </div>
          </div>

          <h2>Instagram Reels Cover Dimensions</h2>
          <p>
            Reels use the same 9:16 format as Stories, but the cover image appears in multiple contexts with different cropping:
          </p>

          <div className="not-prose bg-white border border-gray-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-gray-900 mb-4">Reels Cover Display</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 mb-2">Reels Tab (Full)</p>
                <p className="text-sm text-gray-600">Displays full 9:16 cover image</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900 mb-2">Profile Grid (Cropped)</p>
                <p className="text-sm text-gray-600">Center portion cropped to 1:1 square</p>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              <strong>Pro tip:</strong> Center your main subject so it appears in both the full cover and the grid preview.
            </p>
          </div>

          <h2>Stories vs. Reels Covers</h2>
          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-white border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Stories</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Disappear after 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Full 9:16 display always
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Interactive stickers available
                </li>
              </ul>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-lg">
              <h4 className="font-bold text-gray-900 mb-2">Reels Covers</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Permanent on your profile
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Cropped in profile grid
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Custom cover upload option
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Get Perfect Story Dimensions</h2>
          <p className="text-gray-300 mb-6">
            Upload any image and our tool will automatically resize it to 1080×1920 pixels with proper cropping for Instagram Stories and Reels covers.
          </p>
          <Link
            href="/tools/instagram-story-resizer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
          >
            Open Instagram Story Resizer <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/tools/instagram-story-resizer"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">Instagram Story Resizer</p>
              <p className="text-sm text-gray-500">Resize to 1080×1920 instantly</p>
            </Link>
            <Link
              href="/mbb/instagram-story-design-tips"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">Story Design Tips</p>
              <p className="text-sm text-gray-500">Create engaging Stories that get views</p>
            </Link>
            <Link
              href="/tools/social-media-image-sizes"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">All Social Media Image Sizes</p>
              <p className="text-sm text-gray-500">Complete dimension reference</p>
            </Link>
            <Link
              href="/tools/instagram-post-resizer"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">Instagram Post Resizer</p>
              <p className="text-sm text-gray-500">Resize for feed posts (1080×1080)</p>
            </Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: "Instagram Story Dimensions & Safe Zones Guide",
              description: "Complete guide to Instagram Story sizes, safe zones, and Reels cover dimensions.",
              author: { "@type": "Organization", name: "VCM Suite" }
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
                  name: "What size should Instagram Stories be?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Instagram Stories should be 1080×1920 pixels with a 9:16 aspect ratio. This is the same size used for Reels covers."
                  }
                },
                {
                  "@type": "Question",
                  name: "What are safe zones in Instagram Stories?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Safe zones are the top 14% (~270px) and bottom 20% (~384px) of the Story where Instagram overlays UI elements like your profile and the reply bar."
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
