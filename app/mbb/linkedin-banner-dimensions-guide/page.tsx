import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "LinkedIn Banner Dimensions: Personal vs Company Page Guide 2025 | VCM Suite",
  description: "Complete guide to LinkedIn banner sizes for personal profiles and company pages. Safe zones, profile overlap, and optimal dimensions explained.",
  keywords: "linkedin banner dimensions, linkedin header size, linkedin cover photo size, linkedin image size, linkedin profile banner",
};

export default function LinkedInBannerDimensionsGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-sm text-blue-700 font-medium mb-2">Technical Guide</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>LinkedIn Banner Dimensions</strong>: Personal vs Company Page
          </h1>
          <p className="text-xl text-gray-600">
            The exact specifications for LinkedIn banners across different page types.
          </p>
        </header>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
          <h2 className="font-semibold text-blue-800 mb-2">Quick Answer</h2>
          <p className="text-blue-700 mb-4">
            Personal LinkedIn banners should be <strong>1584×396 pixels</strong> (4:1 aspect ratio). Company page covers use <strong>1128×191 pixels</strong>.
          </p>
          <Link
            href="/tools/linkedin-banner-resizer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
          >
            Resize Your Banner <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="prose prose-lg max-w-none">
          <h2>LinkedIn Banner Size Comparison</h2>
          
          <div className="not-prose bg-white border border-gray-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-gray-900 mb-4">Official Dimensions</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Personal Profile Banner</p>
                    <p className="text-sm text-gray-500">Used on individual LinkedIn profiles</p>
                  </div>
                  <p className="text-xl font-mono font-bold text-blue-700">1584 × 396 px</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Company Page Cover</p>
                    <p className="text-sm text-gray-500">Used on LinkedIn company pages</p>
                  </div>
                  <p className="text-xl font-mono font-bold text-blue-700">1128 × 191 px</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Event Cover Image</p>
                    <p className="text-sm text-gray-500">Used for LinkedIn events</p>
                  </div>
                  <p className="text-xl font-mono font-bold text-gray-600">1776 × 444 px</p>
                </div>
              </div>
            </div>
          </div>

          <h2>Desktop vs Mobile Display</h2>
          <p>
            LinkedIn banners display differently on desktop and mobile, with mobile cropping more aggressively from the sides:
          </p>

          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <Monitor className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Desktop</h4>
              <p className="text-sm text-gray-600">Full width display. Profile photo overlaps bottom-left corner.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
              <Smartphone className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 mb-2">Mobile</h4>
              <p className="text-sm text-gray-600">Significant side cropping. Center content is most reliable.</p>
            </div>
          </div>

          <h2>Profile Photo Overlap Zone</h2>
          <p>
            Your profile photo is positioned in the bottom-left of the banner. Keep important content away from this area:
          </p>

          <div className="not-prose bg-amber-50 border border-amber-200 rounded-xl p-6 my-6">
            <h3 className="font-bold text-amber-800 mb-4">Safe Zone Guidelines</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800"><strong>Bottom-left corner:</strong> Avoid text in the left ~300px and bottom ~100px</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800"><strong>Edge margins:</strong> Keep a ~50px buffer from all edges for mobile</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800"><strong>Center-right zone:</strong> Safest area for text and key graphics</p>
              </div>
            </div>
          </div>

          <h2>File Format Recommendations</h2>
          <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Accepted Formats</p>
              <p className="font-medium text-gray-900">PNG, JPG, GIF</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Max File Size</p>
              <p className="font-medium text-gray-900">8 MB</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Recommended Format</p>
              <p className="font-medium text-gray-900">PNG (for text) or JPG (for photos)</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Aspect Ratio</p>
              <p className="font-medium text-gray-900">4:1</p>
            </div>
          </div>

          <h2>Company Page Cover vs Personal Banner</h2>
          <p>
            Company pages use different dimensions than personal profiles. The company cover is shorter and wider proportionally:
          </p>
          <ul>
            <li><strong>Personal:</strong> 1584×396 (4:1) - Taller, shows more content</li>
            <li><strong>Company:</strong> 1128×191 (~6:1) - Shorter, more compressed</li>
            <li><strong>Different safe zones</strong> due to logo placement on company pages</li>
          </ul>
        </section>

        <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Get Perfect LinkedIn Banner Dimensions</h2>
          <p className="text-gray-300 mb-6">
            Upload any image and our tool will automatically resize it to 1584×396 pixels for personal LinkedIn profile banners.
          </p>
          <Link
            href="/tools/linkedin-banner-resizer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Open LinkedIn Banner Resizer <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tools/linkedin-banner-resizer" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">LinkedIn Banner Resizer</p>
              <p className="text-sm text-gray-500">Resize to 1584×396 instantly</p>
            </Link>
            <Link href="/mbb/linkedin-banner-design-tips" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">LinkedIn Banner Design Tips</p>
              <p className="text-sm text-gray-500">Create professional profile banners</p>
            </Link>
            <Link href="/tools/social-media-image-sizes" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">All Social Media Image Sizes</p>
              <p className="text-sm text-gray-500">Complete dimension reference</p>
            </Link>
            <Link href="/tools/twitter-header-resizer" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">Twitter Header Resizer</p>
              <p className="text-sm text-gray-500">Create matching social headers</p>
            </Link>
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "TechArticle", headline: "LinkedIn Banner Dimensions: Personal vs Company Page Guide", description: "Complete guide to LinkedIn banner sizes for personal profiles and company pages.", author: { "@type": "Organization", name: "VCM Suite" } }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What size should a LinkedIn banner be?", acceptedAnswer: { "@type": "Answer", text: "Personal LinkedIn banners should be 1584×396 pixels with a 4:1 aspect ratio. Company page covers use 1128×191 pixels." } }, { "@type": "Question", name: "Where does the profile photo overlap on LinkedIn?", acceptedAnswer: { "@type": "Answer", text: "The profile photo overlaps the bottom-left corner of the banner. Keep important content away from the left 300px and bottom 100px of your banner." } }] }) }} />
      </article>
    </main>
  );
}
