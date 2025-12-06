import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Design a Twitter/X Header That Makes an Impact | VCM Suite",
  description: "Learn to create Twitter header images that showcase your brand. Layout, safe zones, profile overlap, and design tips for the perfect banner.",
  keywords: "twitter header design, x header image, twitter banner, profile header, twitter branding",
};

export default function TwitterHeaderDesignTipsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-sm text-sky-600 font-medium mb-2">Twitter/X Growth</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Design a <strong>Twitter/X Header</strong> That Makes an Impact
          </h1>
          <p className="text-xl text-gray-600">
            Create a profile header that showcases your brand and makes the right first impression.
          </p>
        </header>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-10">
          <h2 className="font-semibold text-sky-800 mb-2">Ready to resize your header?</h2>
          <p className="text-sky-700 mb-4">
            Use our free tool to resize any image to Twitter's header dimensions (1500×500).
          </p>
          <Link
            href="/tools/twitter-header-resizer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors"
          >
            Open Twitter Header Resizer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="prose prose-lg max-w-none">
          <h2>Why Your Twitter Header Matters</h2>
          <p>
            Your <strong>Twitter/X header</strong> is prime real estate. It's one of the first things visitors see when they land on your profile, and it sets the tone for your entire presence. A well-designed header can communicate your expertise, showcase your work, or highlight a key message.
          </p>

          <h2>5 Principles of Effective Twitter Headers</h2>

          <h3>1. Know the Layout Constraints</h3>
          <p>
            Twitter overlays your profile photo and bio on the header. Design around these elements:
          </p>
          <ul>
            <li><strong>Profile photo</strong> overlaps the bottom-left corner</li>
            <li><strong>Name and bio</strong> appear below the header</li>
            <li><strong>Mobile crops differently</strong> than desktop—test both</li>
          </ul>

          <h3>2. Keep It Simple</h3>
          <p>
            Headers display at various sizes across devices. Complex designs become muddy and unreadable.
          </p>
          <ul>
            <li><strong>One focal point</strong> rather than multiple elements</li>
            <li><strong>Large, bold text</strong> if you include text at all</li>
            <li><strong>Clean backgrounds</strong> that don't compete for attention</li>
          </ul>

          <h3>3. Communicate Value</h3>
          <p>
            Use your header to tell visitors what you do or what they'll get by following you.
          </p>
          <ul>
            <li><strong>Tagline or specialty</strong> - "Helping founders scale"</li>
            <li><strong>Social proof</strong> - Featured in, working with, achievements</li>
            <li><strong>Call to action</strong> - Arrow pointing to link in bio</li>
          </ul>

          <h3>4. Brand Consistency</h3>
          <p>
            Your header should feel connected to your overall brand and other social profiles.
          </p>
          <ul>
            <li><strong>Use your brand colors</strong> for recognition</li>
            <li><strong>Same fonts</strong> as your website or other materials</li>
            <li><strong>Consistent photography style</strong> if using images</li>
          </ul>

          <h3>5. Update Regularly</h3>
          <p>
            Unlike evergreen content, headers can be seasonal or promotional:
          </p>
          <ul>
            <li><strong>Product launches</strong> and new releases</li>
            <li><strong>Events</strong> you're speaking at or attending</li>
            <li><strong>Seasonal updates</strong> to stay fresh</li>
          </ul>
        </section>

        <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Common Twitter Header Mistakes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Text in bottom-left</p>
              <p className="text-sm text-red-600">Gets covered by your profile photo</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Small or thin text</p>
              <p className="text-sm text-red-600">Unreadable on mobile devices</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Outdated information</p>
              <p className="text-sm text-red-600">Old events or stats hurt credibility</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Wrong dimensions</p>
              <p className="text-sm text-red-600">Results in awkward cropping or stretching</p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Get Perfect Twitter Header Dimensions</h2>
          <p className="text-gray-300 mb-6">
            Our free Twitter Header Resizer automatically crops and resizes any image to 1500×500 pixels—the optimal size for Twitter/X profile banners.
          </p>
          <Link
            href="/tools/twitter-header-resizer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition-colors"
          >
            Resize Your Header Now <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tools/twitter-header-resizer" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-sky-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">Twitter Header Resizer</p>
              <p className="text-sm text-gray-500">Resize to 1500×500 instantly</p>
            </Link>
            <Link href="/mbb/twitter-header-dimensions-guide" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-sky-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">Twitter Header Dimensions Guide</p>
              <p className="text-sm text-gray-500">Desktop vs mobile display differences</p>
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

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "How to Design a Twitter/X Header That Makes an Impact", description: "Create a profile header that showcases your brand.", author: { "@type": "Organization", name: "VCM Suite" } }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What makes a good Twitter header?", acceptedAnswer: { "@type": "Answer", text: "Effective Twitter headers are simple, communicate value, use brand-consistent design, and avoid placing important content where the profile photo overlaps." } }, { "@type": "Question", name: "Where should I put text on my Twitter header?", acceptedAnswer: { "@type": "Answer", text: "Place text in the center or right side of the header. Avoid the bottom-left corner where your profile photo overlaps." } }] }) }} />
      </article>
    </main>
  );
}
