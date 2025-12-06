import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Instagram Post Dimensions: Complete Size Guide 2025 | VCM Suite",
  description: "Complete guide to Instagram image sizes. Square, portrait, landscape dimensions for feed posts, carousels, and profile grid display.",
  keywords: "instagram post dimensions, instagram image size, instagram photo size, instagram aspect ratio, instagram feed size",
};

export default function InstagramPostDimensionsGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-sm text-pink-600 font-medium mb-2">Technical Guide</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Instagram Post Dimensions Guide</strong>: Complete Size Reference
          </h1>
          <p className="text-xl text-gray-600">
            Every Instagram image size you need to know, from feed posts to profile grids.
          </p>
        </header>

        <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 mb-10">
          <h2 className="font-semibold text-pink-800 mb-2">Quick Answer</h2>
          <p className="text-pink-700 mb-4">
            The recommended Instagram post size is <strong>1080×1080 pixels</strong> (1:1 square). For portrait posts that take up more feed space, use <strong>1080×1350 pixels</strong> (4:5 ratio).
          </p>
          <Link
            href="/tools/instagram-post-resizer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors"
          >
            Resize Your Image <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="prose prose-lg max-w-none">
          <h2>Understanding Instagram Post Dimensions</h2>
          <p>
            This <strong>Instagram post dimensions guide</strong> covers every size specification you need for creating perfectly-sized content. Whether you're posting squares, portraits, or landscapes, knowing the correct dimensions prevents unexpected cropping and ensures maximum image quality.
          </p>

          <h2>Instagram Feed Post Sizes</h2>
          
          <div className="not-prose bg-white border border-gray-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-gray-900 mb-4">Supported Aspect Ratios</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-1">Square</p>
                <p className="text-2xl font-mono font-bold text-pink-600">1080 × 1080</p>
                <p className="text-sm text-gray-500 mt-1">1:1 ratio</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-1">Portrait</p>
                <p className="text-2xl font-mono font-bold text-pink-600">1080 × 1350</p>
                <p className="text-sm text-gray-500 mt-1">4:5 ratio</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-1">Landscape</p>
                <p className="text-2xl font-mono font-bold text-pink-600">1080 × 566</p>
                <p className="text-sm text-gray-500 mt-1">1.91:1 ratio</p>
              </div>
            </div>
          </div>

          <h2>Which Size Should You Use?</h2>
          
          <h3>Square (1080×1080) - Best for Profiles</h3>
          <p>
            Square images display largest in your profile grid, making them ideal for a cohesive, organized look. They're also the safest choice since they won't be cropped unexpectedly.
          </p>

          <h3>Portrait (1080×1350) - Best for Feed Visibility</h3>
          <p>
            Portrait images take up more vertical space in the feed, giving you more real estate to capture attention. This is the preferred format for maximizing engagement.
          </p>

          <h3>Landscape (1080×566) - Use Sparingly</h3>
          <p>
            Landscape images are cropped to square in the profile grid, often cutting off important content. Use only when the content specifically requires a wide format.
          </p>

          <h2>Profile Grid Display</h2>
          <p>
            Your Instagram profile grid always displays images as squares, regardless of their original aspect ratio. This means:
          </p>
          <ul>
            <li><strong>Square posts</strong> display in full</li>
            <li><strong>Portrait posts</strong> are cropped from top and bottom</li>
            <li><strong>Landscape posts</strong> are cropped from left and right</li>
          </ul>

          <div className="not-prose bg-blue-50 border border-blue-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-blue-900 mb-3">Pro Tip: Grid Planning</h3>
            <p className="text-blue-800">
              When posting portrait or landscape images, center your main subject so it remains visible in the grid preview. Many creators design with the grid crop in mind.
            </p>
          </div>

          <h2>Carousel Post Dimensions</h2>
          <p>
            All images in a carousel must share the same aspect ratio. The first image determines the aspect ratio for the entire carousel.
          </p>
          <ul>
            <li>All slides use the same dimensions</li>
            <li>First slide sets the aspect ratio</li>
            <li>Up to 10 slides per carousel</li>
            <li>Can mix photos and videos</li>
          </ul>

          <h2>Image Quality Requirements</h2>
          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Minimum Width</p>
              <p className="text-xl font-mono font-bold text-gray-700">320 px</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Maximum Width</p>
              <p className="text-xl font-mono font-bold text-gray-700">1080 px</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Recommended Format</p>
              <p className="text-xl font-medium text-gray-700">JPG or PNG</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Max File Size</p>
              <p className="text-xl font-medium text-gray-700">30 MB</p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Resize to Perfect Instagram Dimensions</h2>
          <p className="text-gray-300 mb-6">
            Upload any image and our tool will automatically resize it to 1080×1080 pixels—the optimal square size for Instagram feed posts.
          </p>
          <Link
            href="/tools/instagram-post-resizer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg transition-colors"
          >
            Open Instagram Post Resizer <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/tools/instagram-post-resizer"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-pink-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">Instagram Post Resizer</p>
              <p className="text-sm text-gray-500">Resize to 1080×1080 instantly</p>
            </Link>
            <Link
              href="/mbb/instagram-post-design-tips"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-pink-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">Instagram Post Design Tips</p>
              <p className="text-sm text-gray-500">Create posts that get engagement</p>
            </Link>
            <Link
              href="/tools/social-media-image-sizes"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-pink-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">All Social Media Image Sizes</p>
              <p className="text-sm text-gray-500">Complete dimension reference</p>
            </Link>
            <Link
              href="/tools/instagram-story-resizer"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-pink-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">Instagram Story Resizer</p>
              <p className="text-sm text-gray-500">Resize for Stories (1080×1920)</p>
            </Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: "Instagram Post Dimensions: Complete Size Guide",
              description: "Complete guide to Instagram image sizes and aspect ratios.",
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
                  name: "What size should an Instagram post be?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The recommended Instagram post size is 1080×1080 pixels (1:1 square). For portrait posts, use 1080×1350 pixels (4:5 ratio)."
                  }
                },
                {
                  "@type": "Question",
                  name: "What aspect ratio does Instagram support?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Instagram supports 1:1 (square), 4:5 (portrait), and 1.91:1 (landscape) aspect ratios for feed posts."
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
