import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Create TikTok Covers That Get More Views | VCM Suite",
  description: "Learn to design TikTok video covers that make people tap. Text placement, visual hooks, and profile grid optimization for maximum views.",
  keywords: "tiktok cover design, tiktok thumbnail, tiktok video cover, tiktok tips, tiktok profile grid",
};

export default function TikTokCoverDesignTipsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-sm text-gray-900 font-medium mb-2">TikTok Growth</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Create <strong>TikTok Covers</strong> That Get More Views
          </h1>
          <p className="text-xl text-gray-600">
            Design video covers that make viewers tap and boost your profile grid appeal.
          </p>
        </header>

        <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 mb-10">
          <h2 className="font-semibold text-gray-800 mb-2">Ready to resize your cover?</h2>
          <p className="text-gray-700 mb-4">
            Use our free tool to resize any image to TikTok's cover dimensions (1080×1920).
          </p>
          <Link
            href="/tools/tiktok-video-resizer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
          >
            Open TikTok Cover Resizer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="prose prose-lg max-w-none">
          <h2>Why TikTok Covers Matter</h2>
          <p>
            <strong>TikTok covers</strong> are the first thing users see when browsing your profile. A compelling cover image can mean the difference between someone scrolling past or tapping to watch. While the For You Page auto-plays videos, your profile grid relies entirely on covers to attract views.
          </p>

          <h2>5 Rules for High-Performing TikTok Covers</h2>

          <h3>1. Center Your Subject</h3>
          <p>
            TikTok's profile grid crops covers to show only the center portion. Always place your main subject (face, product, text) in the middle of the frame.
          </p>
          <ul>
            <li><strong>Middle third is safest</strong> for important elements</li>
            <li><strong>Test the crop</strong> by zooming out on your image</li>
            <li><strong>Avoid edge content</strong> that gets cut off</li>
          </ul>

          <h3>2. Bold, Readable Text</h3>
          <p>
            Text on covers tells viewers what the video is about. Make it impossible to miss:
          </p>
          <ul>
            <li><strong>3-5 words maximum</strong> for quick scanning</li>
            <li><strong>Large, bold fonts</strong> that work at small sizes</li>
            <li><strong>High contrast</strong> against the background</li>
          </ul>

          <h3>3. Create Curiosity</h3>
          <p>
            The best covers make viewers ask "what happens?" and tap to find out.
          </p>
          <ul>
            <li><strong>Tease the transformation</strong> without revealing it</li>
            <li><strong>Use questions</strong> that your video answers</li>
            <li><strong>Show emotion</strong> that creates intrigue</li>
          </ul>

          <h3>4. Consistent Grid Aesthetic</h3>
          <p>
            When someone visits your profile, they see all your covers at once. Consistency makes your profile look professional.
          </p>
          <ul>
            <li><strong>Same font style</strong> across all covers</li>
            <li><strong>Recurring colors</strong> that match your brand</li>
            <li><strong>Similar layouts</strong> for visual cohesion</li>
          </ul>

          <h3>5. Match Content to Cover</h3>
          <p>
            Misleading covers hurt your metrics. When viewers click expecting one thing and get another, they leave immediately—damaging your watch time.
          </p>
          <ul>
            <li><strong>Cover promises what video delivers</strong></li>
            <li><strong>Use frames from the actual video</strong> when possible</li>
            <li><strong>Build trust</strong> for long-term growth</li>
          </ul>
        </section>

        <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Common TikTok Cover Mistakes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Text at edges</p>
              <p className="text-sm text-red-600">Gets cropped in the profile grid view</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Tiny text</p>
              <p className="text-sm text-red-600">Unreadable at profile grid size</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Blurry images</p>
              <p className="text-sm text-red-600">Looks unprofessional, reduces taps</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Random frame selection</p>
              <p className="text-sm text-red-600">Missing opportunity to hook viewers</p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Get Perfect TikTok Cover Dimensions</h2>
          <p className="text-gray-300 mb-6">
            Our free TikTok Cover Resizer automatically crops and resizes any image to 1080×1920 pixels—the optimal size for TikTok video covers.
          </p>
          <Link
            href="/tools/tiktok-video-resizer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 font-medium rounded-lg transition-colors"
          >
            Resize Your Cover Now <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tools/tiktok-video-resizer" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">TikTok Cover Resizer</p>
              <p className="text-sm text-gray-500">Resize to 1080×1920 instantly</p>
            </Link>
            <Link href="/mbb/tiktok-cover-dimensions-guide" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">TikTok Cover Dimensions Guide</p>
              <p className="text-sm text-gray-500">Profile grid cropping explained</p>
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

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "How to Create TikTok Covers That Get More Views", description: "Design video covers that make viewers tap and boost your profile grid appeal.", author: { "@type": "Organization", name: "VCM Suite" } }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "How do I make a good TikTok cover?", acceptedAnswer: { "@type": "Answer", text: "Center your subject, use bold readable text, create curiosity, maintain consistency, and match your cover to your content." } }, { "@type": "Question", name: "Why is my TikTok cover getting cropped?", acceptedAnswer: { "@type": "Answer", text: "TikTok's profile grid crops covers to show only the center portion. Always place important elements in the middle third of your cover image." } }] }) }} />
      </article>
    </main>
  );
}
