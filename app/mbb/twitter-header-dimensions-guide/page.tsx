import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Twitter/X Header Dimensions: Desktop vs Mobile Guide 2025 | VCM Suite",
  description: "Complete guide to Twitter header sizes and how they display on desktop vs mobile. Safe zones, profile overlap, and optimal dimensions.",
  keywords: "twitter header dimensions, twitter banner size, x header size, twitter image size, twitter profile banner",
};

export default function TwitterHeaderDimensionsGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-sm text-sky-600 font-medium mb-2">Technical Guide</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>Twitter/X Header Dimensions</strong>: Desktop vs Mobile
          </h1>
          <p className="text-xl text-gray-600">
            The exact specifications for Twitter headers and how they display across devices.
          </p>
        </header>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-10">
          <h2 className="font-semibold text-sky-800 mb-2">Quick Answer</h2>
          <p className="text-sky-700 mb-4">
            Twitter headers should be <strong>1500×500 pixels</strong> (3:1 aspect ratio). Keep important content centered as the edges may be cropped on mobile.
          </p>
          <Link
            href="/tools/twitter-header-resizer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors"
          >
            Resize Your Header <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="prose prose-lg max-w-none">
          <h2>Official Twitter Header Specifications</h2>
          
          <div className="not-prose bg-white border border-gray-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-gray-900 mb-4">Recommended Dimensions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Header Size</p>
                <p className="text-2xl font-mono font-bold text-sky-600">1500 × 500 px</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Aspect Ratio</p>
                <p className="text-2xl font-mono font-bold text-sky-600">3:1</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">File Formats</p>
                <p className="text-xl font-medium text-gray-700">JPG, PNG, GIF</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Max File Size</p>
                <p className="text-xl font-medium text-gray-700">5 MB</p>
              </div>
            </div>
          </div>

          <h2>Desktop vs Mobile Display</h2>
          <p>
            Twitter displays headers differently on desktop and mobile, which affects what visitors see:
          </p>

          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <Monitor className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Desktop</h4>
              <p className="text-sm text-gray-600">Full width display with profile photo overlapping bottom-left. More of the header is visible.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <Smartphone className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Mobile</h4>
              <p className="text-sm text-gray-600">Crops more aggressively from left and right edges. Center content is most visible.</p>
            </div>
          </div>

          <h2>Profile Photo Overlap Zone</h2>
          <p>
            Your profile photo is positioned in the bottom-left corner of the header. The exact overlap varies by screen size, but a safe guideline:
          </p>

          <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-amber-800 mb-4">Safe Zone Guidelines</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800"><strong>Bottom-left corner:</strong> Avoid text/important elements in the bottom ~100px and left ~200px</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800"><strong>Edge margins:</strong> Keep critical content away from all edges (~50px buffer)</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800"><strong>Center zone:</strong> The middle 60% is safest for important text and graphics</p>
              </div>
            </div>
          </div>

          <h2>Header Design Best Practices</h2>
          <ul>
            <li><strong>Center your main message</strong> - It's visible on all devices</li>
            <li><strong>Use large text</strong> - At least 48px for readability</li>
            <li><strong>Test on multiple devices</strong> - Preview on both desktop and mobile</li>
            <li><strong>Keep backgrounds simple</strong> - Complex patterns compete with text</li>
          </ul>

          <h2>Twitter/X Profile Photo Dimensions</h2>
          <p>
            While this guide focuses on headers, here are the profile photo specs for reference:
          </p>
          <div className="not-prose bg-white border border-gray-200 rounded-xl p-6 my-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Profile Photo Size</p>
                <p className="text-xl font-mono font-bold text-gray-700">400 × 400 px</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Display Shape</p>
                <p className="text-xl font-medium text-gray-700">Circle (cropped)</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Get Perfect Twitter Header Dimensions</h2>
          <p className="text-gray-300 mb-6">
            Upload any image and our tool will automatically resize it to 1500×500 pixels for Twitter/X profile headers.
          </p>
          <Link
            href="/tools/twitter-header-resizer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors"
          >
            Open Twitter Header Resizer <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tools/twitter-header-resizer" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-sky-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">Twitter Header Resizer</p>
              <p className="text-sm text-gray-500">Resize to 1500×500 instantly</p>
            </Link>
            <Link href="/mbb/twitter-header-design-tips" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-sky-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">Twitter Header Design Tips</p>
              <p className="text-sm text-gray-500">Create impactful profile headers</p>
            </Link>
            <Link href="/tools/social-media-image-sizes" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-sky-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">All Social Media Image Sizes</p>
              <p className="text-sm text-gray-500">Complete dimension reference</p>
            </Link>
            <Link href="/tools/linkedin-banner-resizer" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-sky-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">LinkedIn Banner Resizer</p>
              <p className="text-sm text-gray-500">Professional profile banners</p>
            </Link>
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "TechArticle", headline: "Twitter/X Header Dimensions: Desktop vs Mobile Guide", description: "Complete guide to Twitter header sizes and display differences.", author: { "@type": "Organization", name: "VCM Suite" } }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What size should a Twitter header be?", acceptedAnswer: { "@type": "Answer", text: "Twitter headers should be 1500×500 pixels with a 3:1 aspect ratio. Files can be JPG, PNG, or GIF up to 5MB." } }, { "@type": "Question", name: "Where does the profile photo overlap the Twitter header?", acceptedAnswer: { "@type": "Answer", text: "The profile photo overlaps the bottom-left corner of the header. Avoid placing important content in the bottom 100px and left 200px of your header image." } }] }) }} />
      </article>
    </main>
  );
}
