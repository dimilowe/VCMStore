import { Metadata } from "next";
import Link from "next/link";
import { FileText, Star, Lightbulb, Rocket, Target, Zap, Heart, Sparkles } from "lucide-react";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

export const metadata: Metadata = {
  title: "Maker Quotes Generator – Famous Quotes for Creators & Builders",
  description: "Discover 50+ famous quotes for creators, builders, and entrepreneurs. From Steve Jobs to Thomas Edison, explore timeless wisdom that inspires makers worldwide.",
};

export default function FamousQuotesForCreatorsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the best quotes for creators?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Some of the best quotes for creators include 'Stay hungry, stay foolish' by Steve Jobs, 'Done is better than perfect' by Sheryl Sandberg, and 'The best way to predict the future is to invent it' by Alan Kay. These quotes capture the maker mindset of shipping, iterating, and continuous improvement."
        }
      },
      {
        "@type": "Question",
        "name": "Who said 'fail fast, fail often'?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The phrase 'fail fast, fail often' is a Silicon Valley proverb that emerged from startup culture. It's often attributed to various entrepreneurs and was popularized by John Krumboltz's book. The concept emphasizes learning through rapid experimentation rather than over-planning."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use famous quotes in my content?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, short quotes (typically under 25 words) from famous figures are generally acceptable for inspirational and educational content under fair use. Always provide proper attribution to the original speaker. Avoid using long passages or entire works."
        }
      },
      {
        "@type": "Question",
        "name": "What makes a quote inspiring for makers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Inspiring maker quotes typically address themes of persistence through failure, the value of shipping imperfect work, creative courage, innovation mindset, and the importance of execution over ideas. They resonate because they acknowledge the messy reality of building things."
        }
      }
    ]
  };

  const quoteCategories = [
    {
      title: "On Shipping & Execution",
      icon: Rocket,
      quotes: [
        { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
        { text: "If you're not embarrassed by the first version of your product, you've launched too late.", author: "Reid Hoffman" },
        { text: "Real artists ship.", author: "Steve Jobs" },
        { text: "Ideas are worthless. Execution is everything.", author: "Scott Adams" },
        { text: "Make something people want.", author: "Y Combinator" },
        { text: "The secret to getting ahead is getting started.", author: "Mark Twain" },
        { text: "A good plan violently executed now is better than a perfect plan executed next week.", author: "George S. Patton" },
      ]
    },
    {
      title: "On Failure & Learning",
      icon: Lightbulb,
      quotes: [
        { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
        { text: "Fail fast, fail often.", author: "Silicon Valley Proverb" },
        { text: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Only those who dare to fail greatly can ever achieve greatly.", author: "Robert F. Kennedy" },
        { text: "Mistakes are the portals of discovery.", author: "James Joyce" },
        { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
      ]
    },
    {
      title: "On Innovation & Vision",
      icon: Target,
      quotes: [
        { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { text: "Move fast and break things.", author: "Mark Zuckerberg" },
        { text: "The people who are crazy enough to think they can change the world are the ones who do.", author: "Apple" },
        { text: "If I had asked people what they wanted, they would have said faster horses.", author: "Henry Ford (attributed)" },
        { text: "The reasonable man adapts himself to the world; the unreasonable one persists in adapting the world to himself.", author: "George Bernard Shaw" },
        { text: "Vision without execution is hallucination.", author: "Thomas Edison" },
      ]
    },
    {
      title: "On Persistence & Grit",
      icon: Zap,
      quotes: [
        { text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison" },
        { text: "Whether you think you can or you can't, you're right.", author: "Henry Ford" },
        { text: "It's not that I'm so smart, it's just that I stay with problems longer.", author: "Albert Einstein" },
        { text: "I'm convinced that about half of what separates successful entrepreneurs from non-successful ones is pure perseverance.", author: "Steve Jobs" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
      ]
    },
    {
      title: "On Creativity & Art",
      icon: Heart,
      quotes: [
        { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
        { text: "Creativity is intelligence having fun.", author: "Albert Einstein (attributed)" },
        { text: "Every child is an artist. The problem is how to remain an artist once we grow up.", author: "Pablo Picasso" },
        { text: "You can't use up creativity. The more you use, the more you have.", author: "Maya Angelou" },
        { text: "The chief enemy of creativity is good sense.", author: "Pablo Picasso" },
        { text: "Creativity takes courage.", author: "Henri Matisse" },
        { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
      ]
    },
    {
      title: "On Starting & Courage",
      icon: Sparkles,
      quotes: [
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Do the thing you fear and the death of fear is certain.", author: "Ralph Waldo Emerson" },
        { text: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.", author: "Mark Twain (attributed)" },
        { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
        { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { text: "What would you attempt to do if you knew you could not fail?", author: "Robert H. Schuller" },
        { text: "Begin anywhere.", author: "John Cage" },
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <MonetizationBar />
        
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link
            href="/tools/maker-quotes-generator"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8 text-sm font-medium"
          >
            ← Back to Maker Quotes Generator
          </Link>

          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Curated Collection
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Maker Quotes Generator – Famous Quotes for Creators & Builders
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our <strong>maker quotes generator</strong> draws inspiration from these timeless words. Explore 50+ famous quotes that have inspired generations of creators, innovators, and entrepreneurs.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Why These Quotes Matter</h2>
            <p className="text-gray-600 mb-4">
              Throughout history, the world's greatest makers have shared their wisdom about creation, innovation, and perseverance. These quotes have been passed down because they capture universal truths about the creative process.
            </p>
            <p className="text-gray-600">
              Whether you're building a startup, creating content, designing products, or pursuing any creative endeavor, these words from legends like Steve Jobs, Thomas Edison, and Pablo Picasso offer guidance for the journey ahead.
            </p>
          </div>

          {quoteCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <category.icon className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
              </div>
              
              <div className="space-y-4">
                {category.quotes.map((quote, quoteIndex) => (
                  <div key={quoteIndex} className="bg-gray-50 rounded-xl p-5 border-l-4 border-orange-400">
                    <p className="text-gray-800 text-lg leading-relaxed mb-2">
                      "{quote.text}"
                    </p>
                    <p className="text-gray-500 text-sm">
                      — {quote.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use These Quotes</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">For Social Media</h4>
                <p className="text-gray-600 text-sm">
                  Pair quotes with your own story or experience. Add relevant hashtags and tag the original author when possible. Quote graphics consistently perform well on Instagram and LinkedIn.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">For Videos</h4>
                <p className="text-gray-600 text-sm">
                  Use quotes as video openers, thumbnail text, or end-screen inspiration. Keep them short enough to read in 2-3 seconds for TikTok and Reels.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">For Writing</h4>
                <p className="text-gray-600 text-sm">
                  Open blog posts or newsletters with a relevant quote. Use them to reinforce your main point or provide a memorable conclusion.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">For Personal Motivation</h4>
                <p className="text-gray-600 text-sm">
                  Save your favorites and review them when you need inspiration. Many creators keep a "motivation wall" of quotes that resonate with their journey.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">The Makers Behind the Quotes</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold shrink-0">SJ</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Steve Jobs</h4>
                  <p className="text-gray-600 text-sm">Co-founder of Apple, Pixar, and NeXT. His quotes about innovation, design, and "staying hungry" have inspired millions of creators worldwide.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold shrink-0">TE</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Thomas Edison</h4>
                  <p className="text-gray-600 text-sm">Inventor of the phonograph, motion picture camera, and practical light bulb. His words on persistence and learning from failure remain timeless.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold shrink-0">HF</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Henry Ford</h4>
                  <p className="text-gray-600 text-sm">Pioneer of the automobile industry and assembly line manufacturing. His quotes on belief, persistence, and innovation shaped modern business thinking.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold shrink-0">WD</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Walt Disney</h4>
                  <p className="text-gray-600 text-sm">Creator of Mickey Mouse and Disneyland. His emphasis on action over planning ("quit talking and begin doing") inspires creators to ship their work.</p>
                </div>
              </div>
            </div>
          </div>

          <PostResultUpsell />

          <div className="mt-12 bg-orange-50 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/tools/maker-quotes-generator"
                className="bg-white rounded-xl p-5 border border-orange-200 hover:border-orange-400 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Maker Quotes Generator</h3>
                <p className="text-sm text-gray-600">Generate custom quotes for your content with our free tool.</p>
              </Link>
              <Link
                href="/mbb/how-makers-use-quotes"
                className="bg-white rounded-xl p-5 border border-orange-200 hover:border-orange-400 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 mb-2">How Makers Use Quotes</h3>
                <p className="text-sm text-gray-600">Learn strategies for incorporating quotes into your content.</p>
              </Link>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            
            <details className="bg-white rounded-xl border border-gray-200 p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What are the best quotes for creators?
                <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600">
                Some of the best quotes include "Stay hungry, stay foolish" by Steve Jobs, "Done is better than perfect" by Sheryl Sandberg, and "The best way to predict the future is to invent it" by Alan Kay. These capture the maker mindset of shipping and iterating.
              </p>
            </details>

            <details className="bg-white rounded-xl border border-gray-200 p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Who said "fail fast, fail often"?
                <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600">
                "Fail fast, fail often" is a Silicon Valley proverb that emerged from startup culture. It's often attributed to various entrepreneurs and was popularized by John Krumboltz's book. The concept emphasizes learning through rapid experimentation.
              </p>
            </details>

            <details className="bg-white rounded-xl border border-gray-200 p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                Can I use famous quotes in my content?
                <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600">
                Yes, short quotes (typically under 25 words) from famous figures are generally acceptable for inspirational and educational content under fair use. Always provide proper attribution to the original speaker.
              </p>
            </details>

            <details className="bg-white rounded-xl border border-gray-200 p-5 group">
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                What makes a quote inspiring for makers?
                <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600">
                Inspiring maker quotes typically address themes of persistence through failure, the value of shipping imperfect work, creative courage, innovation mindset, and the importance of execution over ideas. They resonate because they acknowledge the messy reality of building things.
              </p>
            </details>
          </div>
        </div>
      </main>
    </>
  );
}
