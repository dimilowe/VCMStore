import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, Heart, Baby, Briefcase, Zap, Shield, CheckCircle2 } from 'lucide-react';
import NameCombinerClient from './NameCombinerClient';
import ExploreMoreTools from '@/components/ExploreMoreTools';

export const metadata: Metadata = {
  title: 'Name Combiner - Combine Names into Unique Mashups | Free Tool',
  description: 'Free name combiner tool. Merge two or three names into unique combinations for couples, baby names, brand ideas, usernames, and more. Instant results with 5 styles.',
  keywords: 'combiner name, name combiner, combine names, couple name combiner, baby name combiner, brand name combiner, username combiner, name mashup, blend names',
  openGraph: {
    title: 'Name Combiner - Combine Names into Unique Mashups',
    description: 'Free name combiner tool. Merge two or three names into unique combinations for couples, baby names, brand ideas, usernames, and more.',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a name combiner?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A name combiner is a tool that merges two or more names into unique blended names. It uses various algorithms to create natural-sounding combinations by mixing letters, syllables, and sounds from the original names. Common uses include creating couple names (ship names), baby names that honor both parents, brand names, usernames, and team names.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I combine two names into one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To combine two names, enter both names into our name combiner tool and click "Combine Names." The tool will automatically generate up to 20 unique blended names using various techniques like half-and-half blends, overlap detection, and vowel-based merging. You can also select a style (balanced, cute, edgy, fantasy, or brandable) to customize the results.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use the combined names for brands or business names?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, absolutely! Our name combiner is perfect for generating brand and business name ideas. Use the "Brandable" style for shorter, punchier results that work well as company names. However, we recommend checking trademark availability and domain name availability before using any generated name for commercial purposes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Name Combiner tool free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, our Name Combiner is completely free to use with no limits. You can generate as many name combinations as you want without signing up or paying. All combinations are generated instantly in your browser, and you can easily copy any name to your clipboard with one click.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the different combination styles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer 5 combination styles: Balanced (clean, natural blends), Cute (sweet endings like -y, -ie, -kins), Edgy (sharp endings like -x, -zor, -vex), Fantasy (mystical endings like -riel, -wyn, -thos), and Brandable (short, punchy names ideal for businesses). Each style produces different variations of the combined names.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I combine three names together?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Our tool supports combining up to three names. Simply enter all three names and the algorithm will blend elements from each to create unique three-way combinations. This is great for incorporating multiple family names or creating team names that represent all members.',
      },
    },
  ],
};

export default function NameCombinerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free Name Combiner Tool
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Name Combiner
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combine two or three names into unique mashups. Perfect for couple names, 
              baby names, brand ideas, usernames, and more.
            </p>
          </div>
          
          <NameCombinerClient />
          
          <section className="mt-16 bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              What Is a Name Combiner?
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                A name combiner is a creative tool that merges two or more names into unique, 
                blended names. Whether you're looking to create a romantic couple name (often 
                called a "ship name"), find a meaningful baby name that honors both parents, 
                generate a catchy brand name, or come up with a unique username, our name 
                combiner makes it easy.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                The tool uses sophisticated algorithms to blend names naturally, considering 
                factors like letter patterns, syllable structures, vowel positions, and phonetic 
                flow. Instead of randomly smashing letters together, it creates combinations 
                that actually sound like real names you'd want to use.
              </p>
            </div>
          </section>
          
          <section className="mt-12 bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              How the Name Combiner Works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Enter Your Names</h3>
                <p className="text-sm text-gray-600">
                  Type in 2-3 names you want to combine. These can be first names, last names, 
                  or even words you want to blend together.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Choose a Style</h3>
                <p className="text-sm text-gray-600">
                  Select from 5 styles: Balanced for natural blends, Cute for sweet names, 
                  Edgy for sharp names, Fantasy for mystical vibes, or Brandable for business.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get 20 Ideas</h3>
                <p className="text-sm text-gray-600">
                  Instantly receive up to 20 unique name combinations. Click any name to copy 
                  it to your clipboard and use it anywhere.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mt-12 bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Use Our Name Combiner?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
                  <p className="text-sm text-gray-600">
                    No waiting or processing time. Get 20 unique name combinations in under a second.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">100% Free</h3>
                  <p className="text-sm text-gray-600">
                    No signup, no payment, no limits. Use the name combiner as much as you want.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Smart Algorithm</h3>
                  <p className="text-sm text-gray-600">
                    Uses multiple blending techniques including half-and-half, overlap, and vowel-based merging.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">5 Style Options</h3>
                  <p className="text-sm text-gray-600">
                    Customize results with Balanced, Cute, Edgy, Fantasy, or Brandable styles.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <section className="mt-12 bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Name Combiner Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl p-6 border border-pink-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-pink-200 rounded-lg flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Couple & Ship Names</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Create romantic mashup names for you and your partner, or ship names for 
                  your favorite fictional couples. Examples: "Brad + Angelina = Brangelina"
                </p>
                <p className="text-xs text-gray-500">
                  Popular styles: Cute, Balanced
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                    <Baby className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Baby Names</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Honor both parents or grandparents by blending their names to create a 
                  unique baby name. Add a third name to incorporate more family members.
                </p>
                <p className="text-xs text-gray-500">
                  Popular styles: Balanced, Cute, Fantasy
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl p-6 border border-orange-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Brand & Business Names</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Generate unique brand names by combining founder names, company values, 
                  or industry keywords. Perfect for startups and new ventures.
                </p>
                <p className="text-xs text-gray-500">
                  Popular styles: Brandable, Balanced
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Gaming & Social Usernames</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Create unique usernames for gaming, social media, or online platforms by 
                  combining your name with interests, words, or aliases.
                </p>
                <p className="text-xs text-gray-500">
                  Popular styles: Edgy, Fantasy, Brandable
                </p>
              </div>
            </div>
          </section>
          
          <section className="mt-12 bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What is a name combiner?
                </h3>
                <p className="text-gray-600">
                  A name combiner is a tool that merges two or more names into unique blended names. 
                  It uses various algorithms to create natural-sounding combinations by mixing letters, 
                  syllables, and sounds from the original names. Common uses include creating couple 
                  names, baby names, brand names, and usernames.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How do I combine two names into one?
                </h3>
                <p className="text-gray-600">
                  Simply enter both names into our name combiner tool above and click "Combine Names." 
                  The tool will automatically generate up to 20 unique blended names using various 
                  techniques. You can also select a style to customize the results to your preference.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I use the combined names for brands or business names?
                </h3>
                <p className="text-gray-600">
                  Yes! Our name combiner is perfect for generating brand and business name ideas. 
                  Use the "Brandable" style for shorter, punchier results. However, we recommend 
                  checking trademark availability and domain name availability before using any 
                  generated name for commercial purposes.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is the Name Combiner tool free to use?
                </h3>
                <p className="text-gray-600">
                  Yes, our Name Combiner is completely free to use with no limits. You can generate 
                  as many name combinations as you want without signing up or paying anything.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What are the different combination styles?
                </h3>
                <p className="text-gray-600">
                  We offer 5 styles: <strong>Balanced</strong> (clean, natural blends), 
                  <strong>Cute</strong> (sweet endings like -y, -ie), <strong>Edgy</strong> (sharp 
                  endings like -x, -zor), <strong>Fantasy</strong> (mystical endings like -riel, -wyn), 
                  and <strong>Brandable</strong> (short, punchy names for businesses).
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I combine three names together?
                </h3>
                <p className="text-gray-600">
                  Yes! Our tool supports combining up to three names. Simply enter all three names 
                  and the algorithm will blend elements from each to create unique three-way 
                  combinations. This is great for incorporating multiple family names.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mt-12 bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl border border-orange-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create More?
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Found the perfect name? Explore our other free tools to continue building your brand, 
              content, or creative project.
            </p>
            <Link 
              href="/tools"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
            >
              Explore All Tools
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
          
          <ExploreMoreTools currentTool="name-combiner" />
        </div>
      </main>
    </>
  );
}
