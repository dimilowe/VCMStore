import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PlatformImageToolClient from "@/components/PlatformImageToolClient";
import RelatedResizers from "@/components/RelatedResizers";
import { getPresetBySlug } from "@/data/platformImagePresets";

const preset = getPresetBySlug("tiktok-video-resizer")!;

export const metadata: Metadata = {
  title: preset.seo.title,
  description: preset.seo.description,
};

export default function TikTokVideoResizerPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <nav className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools/clusters/social-media-image-sizes" className="hover:text-orange-600">Social Media Image Sizes</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">TikTok Cover Resizer</span>
        </nav>

        <PlatformImageToolClient preset={preset} />

        <RelatedResizers currentPresetId={preset.id} />

        <section className="mt-12 bg-gray-100 border border-gray-300 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">TikTok Cover Guides</h2>
          <p className="text-gray-600 mb-4">
            Learn how to create covers that get more taps on your profile.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/mbb/tiktok-cover-design-tips"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all group"
            >
              <p className="font-medium text-gray-900 group-hover:text-gray-700 flex items-center gap-2">
                Cover Design Tips <ArrowRight className="w-4 h-4" />
              </p>
              <p className="text-sm text-gray-500 mt-1">Text, centering, and grid optimization</p>
            </Link>
            <Link
              href="/mbb/tiktok-cover-dimensions-guide"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all group"
            >
              <p className="font-medium text-gray-900 group-hover:text-gray-700 flex items-center gap-2">
                Dimensions Guide <ArrowRight className="w-4 h-4" />
              </p>
              <p className="text-sm text-gray-500 mt-1">Profile grid cropping explained</p>
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {preset.seo.faq.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-5"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: preset.seo.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </main>
  );
}
