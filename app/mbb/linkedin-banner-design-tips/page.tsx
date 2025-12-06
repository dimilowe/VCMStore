import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Design a Professional LinkedIn Banner | VCM Suite",
  description: "Learn to create LinkedIn banners that establish credibility. Layout tips, professional imagery, and personal branding strategies for your profile.",
  keywords: "linkedin banner design, linkedin header, linkedin profile banner, linkedin branding, professional banner",
};

export default function LinkedInBannerDesignTipsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <p className="text-sm text-blue-700 font-medium mb-2">LinkedIn Growth</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <strong>LinkedIn Banner Design Tips</strong>: Create Professional Profile Headers
          </h1>
          <p className="text-xl text-gray-600">
            Create a banner that establishes credibility and tells your professional story.
          </p>
        </header>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
          <h2 className="font-semibold text-blue-800 mb-2">Ready to resize your banner?</h2>
          <p className="text-blue-700 mb-4">
            Use our free tool to resize any image to LinkedIn's banner dimensions (1584×396).
          </p>
          <Link
            href="/tools/linkedin-banner-resizer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
          >
            Open LinkedIn Banner Resizer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <section className="prose prose-lg max-w-none">
          <h2>Why Your LinkedIn Banner Matters</h2>
          <p>
            These <strong>LinkedIn banner design tips</strong> will help you maximize your profile's most prominent visual element. Your banner is the first thing recruiters, clients, and connections see—and it sets the tone for your professional brand. The default gray banner signals that you haven't invested in your profile, while a thoughtful banner shows intentionality.
          </p>

          <h2>5 Strategies for Effective LinkedIn Banners</h2>

          <h3>1. Communicate Your Value Proposition</h3>
          <p>
            Your banner should answer: "What do you do and who do you help?"
          </p>
          <ul>
            <li><strong>Tagline or specialty</strong> - "Helping SaaS companies scale to $10M ARR"</li>
            <li><strong>Your role at a glance</strong> - "Product Designer | User Researcher"</li>
            <li><strong>Key differentiator</strong> - What makes you unique</li>
          </ul>

          <h3>2. Show Social Proof</h3>
          <p>
            Credibility signals help viewers trust you faster:
          </p>
          <ul>
            <li><strong>Company logos</strong> you've worked with</li>
            <li><strong>Press mentions</strong> or "Featured in" logos</li>
            <li><strong>Awards or certifications</strong> you've earned</li>
            <li><strong>Speaking engagements</strong> or event photos</li>
          </ul>

          <h3>3. Stay On-Brand</h3>
          <p>
            Your banner should feel connected to your overall personal brand:
          </p>
          <ul>
            <li><strong>Consistent colors</strong> with your website or portfolio</li>
            <li><strong>Professional photography</strong> or clean graphics</li>
            <li><strong>Same fonts</strong> as your other materials</li>
          </ul>

          <h3>4. Account for the Profile Photo Overlap</h3>
          <p>
            LinkedIn places your profile photo over the bottom-left of the banner:
          </p>
          <ul>
            <li><strong>Keep the left side clean</strong> or use abstract backgrounds</li>
            <li><strong>Put text center or right</strong> where it's fully visible</li>
            <li><strong>Test the final result</strong> after uploading</li>
          </ul>

          <h3>5. Keep It Professional</h3>
          <p>
            LinkedIn is a professional network—your banner should reflect that:
          </p>
          <ul>
            <li><strong>Clean, uncluttered design</strong></li>
            <li><strong>Readable fonts</strong> and appropriate sizing</li>
            <li><strong>High-resolution images</strong> that look sharp</li>
          </ul>
        </section>

        <section className="mt-12 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Common LinkedIn Banner Mistakes
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Text in bottom-left</p>
              <p className="text-sm text-red-600">Gets covered by your profile photo</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Using the default banner</p>
              <p className="text-sm text-red-600">Signals low effort on your profile</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Too casual or personal</p>
              <p className="text-sm text-red-600">Vacation photos don't build credibility</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="font-medium text-red-800">Low resolution images</p>
              <p className="text-sm text-red-600">Looks unprofessional and pixelated</p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-gray-900 text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Get Perfect LinkedIn Banner Dimensions</h2>
          <p className="text-gray-300 mb-6">
            Our free LinkedIn Banner Resizer automatically crops and resizes any image to 1584×396 pixels—the optimal size for personal profile banners.
          </p>
          <Link
            href="/tools/linkedin-banner-resizer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Resize Your Banner Now <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/tools/linkedin-banner-resizer" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">LinkedIn Banner Resizer</p>
              <p className="text-sm text-gray-500">Resize to 1584×396 instantly</p>
            </Link>
            <Link href="/mbb/linkedin-banner-dimensions-guide" className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all">
              <p className="font-medium text-gray-900">LinkedIn Banner Dimensions Guide</p>
              <p className="text-sm text-gray-500">Personal vs Company page sizes</p>
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

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: "How to Design a Professional LinkedIn Banner", description: "Create a banner that establishes credibility and tells your professional story.", author: { "@type": "Organization", name: "VCM Suite" } }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What makes a good LinkedIn banner?", acceptedAnswer: { "@type": "Answer", text: "Effective LinkedIn banners communicate your value proposition, show social proof, maintain brand consistency, and avoid placing content where the profile photo overlaps." } }, { "@type": "Question", name: "What should I put on my LinkedIn banner?", acceptedAnswer: { "@type": "Answer", text: "Include your specialty or tagline, logos of companies you've worked with, awards or certifications, or a professional photo that represents your work." } }] }) }} />
      </article>
    </main>
  );
}
