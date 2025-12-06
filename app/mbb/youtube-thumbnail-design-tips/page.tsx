import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertTriangle, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Design Click-Worthy YouTube Thumbnails | VCM Suite",
  description: "Learn the proven design principles that make YouTube thumbnails irresistible. Faces, contrast, text placement, and psychological triggers that boost CTR.",
  keywords: "youtube thumbnail design, clickworthy thumbnails, thumbnail tips, youtube ctr, thumbnail best practices",
};

export default function YouTubeThumbnailDesignTipsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-sm text-orange-600 font-medium mb-2">YouTube Growth</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Design <strong>Click-Worthy YouTube Thumbnails</strong>
          </h1>
          <p className="text-xl text-gray-600">
            The complete guide to thumbnail design that stops the scroll and drives clicks.
          </p>
        </header>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-10">
          <h2 className="font-semibold text-orange-800 mb-2">Ready to resize your thumbnail?</h2>
          <p className="text-orange-700 mb-4">
            Once you've designed your thumbnail, use our free tool to resize it to YouTube's exact specifications (1280×720).
          </p>
          <Link
            href="/tools/youtube-thumbnail-resizer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            Open YouTube Thumbnail Resizer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="prose prose-lg max-w-none">
          <h2>Why Thumbnails Matter More Than Titles</h2>
          <p>
            Your <strong>YouTube thumbnail</strong> is your video's first impression. Studies show that viewers decide whether to click within 0.05 seconds of seeing a thumbnail. That's faster than conscious thought—it's pure instinct.
          </p>
          <p>
            A great thumbnail can increase your click-through rate (CTR) by 2-3x, which directly impacts how YouTube's algorithm promotes your video. Higher CTR = more impressions = more views = more subscribers.
          </p>

          <h2>The 5 Elements of Click-Worthy Thumbnails</h2>

          <h3>1. Expressive Faces</h3>
          <p>
            Human faces with strong emotions are the single most effective thumbnail element. Our brains are hardwired to notice faces and read emotional expressions instantly.
          </p>
          <ul>
            <li><strong>Use extreme expressions</strong> - Surprise, shock, excitement, confusion</li>
            <li><strong>Make eye contact</strong> - Looking at the camera creates connection</li>
            <li><strong>Fill the frame</strong> - Faces should take up 40-60% of the thumbnail</li>
          </ul>

          <h3>2. High Contrast Colors</h3>
          <p>
            YouTube is a sea of content. Your thumbnail needs to pop against both the white YouTube interface and competing videos.
          </p>
          <ul>
            <li><strong>Use complementary colors</strong> - Blue/orange, purple/yellow work great</li>
            <li><strong>Avoid YouTube red</strong> - Your thumbnail will blend into the interface</li>
            <li><strong>Add a colored border or glow</strong> - Creates separation from the background</li>
          </ul>

          <h3>3. Minimal, Large Text</h3>
          <p>
            Text on thumbnails should be readable at all sizes, including the tiny mobile view.
          </p>
          <ul>
            <li><strong>3-5 words maximum</strong> - Any more becomes unreadable</li>
            <li><strong>Use bold, sans-serif fonts</strong> - Thin fonts disappear at small sizes</li>
            <li><strong>Add text shadows or outlines</strong> - Ensures readability over any background</li>
          </ul>

          <h3>4. Visual Curiosity Gap</h3>
          <p>
            The best thumbnails create a question in the viewer's mind that only the video can answer.
          </p>
          <ul>
            <li><strong>Show a result without context</strong> - "How did this happen?"</li>
            <li><strong>Use before/after hints</strong> - Transformation thumbnails work</li>
            <li><strong>Add mystery elements</strong> - Blurred sections, question marks, arrows pointing to something</li>
          </ul>

          <h3>5. Consistent Branding</h3>
          <p>
            Regular viewers should recognize your thumbnails instantly. Consistency builds trust and increases clicks from your existing audience.
          </p>
          <ul>
            <li><strong>Use consistent colors</strong> - Pick 2-3 brand colors</li>
            <li><strong>Same font family</strong> - Don't switch fonts between videos</li>
            <li><strong>Recurring visual elements</strong> - Borders, logos, or style treatments</li>
          </ul>
        </section>

        <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Common Thumbnail Mistakes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Too much text</p>
              <p className="text-sm text-red-600">Viewers can't read paragraphs on a 120px thumbnail</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Low contrast</p>
              <p className="text-sm text-red-600">Gray on gray or dark on dark won't stand out</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Clickbait without delivery</p>
              <p className="text-sm text-red-600">Misleading thumbnails hurt watch time and trust</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Wrong dimensions</p>
              <p className="text-sm text-red-600">Non-16:9 images get cropped unexpectedly</p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Resize Your Thumbnail to Perfection</h2>
          <p className="text-gray-300 mb-6">
            After designing your thumbnail, make sure it's the exact right size. Our free YouTube Thumbnail Resizer automatically crops and resizes any image to 1280×720 pixels.
          </p>
          <Link
            href="/tools/youtube-thumbnail-resizer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
          >
            Resize Your Thumbnail Now <ArrowRight className="w-5 h-5" />
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
              href="/mbb/youtube-thumbnail-dimensions-guide"
              className="p-4 bg-white border border-gray-200 rounded-lg hover:border-orange-300 hover:shadow-md transition-all"
            >
              <p className="font-medium text-gray-900">YouTube Thumbnail Dimensions Guide</p>
              <p className="text-sm text-gray-500">Shorts vs. long-form thumbnail specs</p>
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
              "@type": "Article",
              headline: "How to Design Click-Worthy YouTube Thumbnails",
              description: "Learn the proven design principles that make YouTube thumbnails irresistible.",
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
                  name: "What makes a YouTube thumbnail clickable?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Expressive faces, high contrast colors, minimal large text, a curiosity gap, and consistent branding are the key elements."
                  }
                },
                {
                  "@type": "Question",
                  name: "How many words should be on a YouTube thumbnail?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "3-5 words maximum. Any more becomes unreadable at small sizes, especially on mobile devices."
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
