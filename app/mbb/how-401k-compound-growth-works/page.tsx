'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp,
  Calculator,
  DollarSign,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Briefcase,
  PiggyBank,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';
import ExploreMoreTools from '@/components/ExploreMoreTools';
import PostResultUpsell from '@/components/PostResultUpsell';
import MonetizationBar from '@/components/MonetizationBar';

const faqs = [
  {
    q: "Why is compound growth so powerful for 401k savings?",
    a: "Compound growth creates a snowball effect where your earnings generate their own earnings. In year one, you earn returns on your contributions. In year two, you earn returns on your contributions PLUS returns on last year's earnings. Over 30+ years, this exponential growth can multiply your money 5-10x."
  },
  {
    q: "How much difference does starting early really make?",
    a: "Starting 10 years earlier can nearly double your retirement savings. For example, investing $6,000/year from age 25 to 65 at 7% returns yields about $1.2 million. Starting at 35 with the same contributions yields only about $566,000 - less than half. Time is the most powerful factor in compound growth."
  },
  {
    q: "What's the Rule of 72 for 401k growth?",
    a: "The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by your expected annual return. At 7% returns, 72÷7 = ~10 years to double. At 10% returns, 72÷10 = ~7 years to double. This helps visualize long-term growth potential."
  },
  {
    q: "How do employer matches boost compound growth?",
    a: "Employer matches are essentially free money that also compounds. If your employer matches 50% of your 6% contribution, that's an immediate 50% return before market growth. That matched money then grows tax-deferred for decades, significantly amplifying your final balance."
  },
  {
    q: "Does compound growth work the same in bear markets?",
    a: "Compound growth works in both directions. In down years, your balance shrinks. However, if you're still contributing, you're buying shares at lower prices. Historically, long-term investors who stayed the course through downturns have benefited when markets recovered. Time in the market beats timing the market."
  }
];

export default function How401kCompoundGrowthWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MonetizationBar />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Retirement Planning Guide
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How 401k Compound Growth Works
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how <strong>compound interest</strong> can turn modest 401k contributions into 
            substantial retirement wealth. Use our free calculator to <strong>estimate 401k at retirement</strong> 
            and see the power of compounding in action.
          </p>
        </div>

        <Link 
          href="/tools/401k-retirement-calculator"
          className="block bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 mb-10 hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500 rounded-xl">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                Try Our Free 401k Retirement Calculator
              </h3>
              <p className="text-sm text-gray-600">
                See how your contributions compound over time with a personalized projection
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-orange-500" />
          </div>
        </Link>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-orange-500" />
            What Is Compound Growth?
          </h2>
          <p className="text-gray-600">
            Compound growth means your investment returns generate their own returns. Unlike simple 
            interest where you only earn on your original deposit, compound growth lets your money 
            multiply exponentially over time.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-blue-900 text-lg mb-4">Simple Example: $10,000 at 7% Return</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-blue-100 text-center">
                <div className="text-sm text-blue-600 mb-1">Year 0</div>
                <div className="text-xl font-bold text-gray-900">$10,000</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-100 text-center">
                <div className="text-sm text-blue-600 mb-1">Year 10</div>
                <div className="text-xl font-bold text-gray-900">$19,672</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-100 text-center">
                <div className="text-sm text-blue-600 mb-1">Year 20</div>
                <div className="text-xl font-bold text-gray-900">$38,697</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-100 text-center">
                <div className="text-sm text-blue-600 mb-1">Year 30</div>
                <div className="text-xl font-bold text-green-600">$76,123</div>
              </div>
            </div>
            <p className="text-sm text-blue-700 mt-4 text-center">
              Without adding a single dollar, $10,000 grows to $76,123 through compound interest alone!
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-500" />
            Why Starting Early Matters for 401k Growth
          </h2>
          <p className="text-gray-600">
            The most important factor in 401k compound growth isn't how much you invest - it's how 
            long you stay invested. Even small contributions can grow into significant sums given 
            enough time.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-amber-900 text-lg mb-4">The Power of Starting Early: Two Investors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">A</div>
                  <span className="font-semibold text-gray-900">Early Starter</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Starts at age <strong>25</strong></li>
                  <li>Invests $500/month</li>
                  <li>Stops at age 35 (10 years)</li>
                  <li>Total invested: <strong>$60,000</strong></li>
                  <li>Balance at 65: <strong className="text-green-600">~$600,000</strong></li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-lg border border-amber-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">B</div>
                  <span className="font-semibold text-gray-900">Late Starter</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Starts at age <strong>35</strong></li>
                  <li>Invests $500/month</li>
                  <li>Continues until 65 (30 years)</li>
                  <li>Total invested: <strong>$180,000</strong></li>
                  <li>Balance at 65: <strong className="text-blue-600">~$567,000</strong></li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-amber-800 mt-4 text-center font-medium">
              Investor A invested 3x less money but ended up with MORE because of compound growth over those extra 10 years!
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-orange-500" />
            The 401k Compound Growth Formula
          </h2>
          <p className="text-gray-600">
            The basic compound interest formula is: <strong>A = P(1 + r)^t</strong>, where A is the 
            final amount, P is the principal (starting balance), r is the annual return rate, and t 
            is time in years. For 401k calculations with regular contributions, it becomes more 
            complex but follows the same principle.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-gray-900 text-lg mb-4">Key Variables That Affect Your 401k Growth</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Contribution Amount</h4>
                  <p className="text-sm text-gray-600">More contributions = larger base for compounding</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Return Rate</h4>
                  <p className="text-sm text-gray-600">Higher returns = faster doubling time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Time Invested</h4>
                  <p className="text-sm text-gray-600">Most powerful factor in compound growth</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-orange-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Employer Match</h4>
                  <p className="text-sm text-gray-600">Free money that also compounds</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-orange-500" />
            How to Maximize Your 401k Compound Growth
          </h2>
          
          <div className="space-y-4 not-prose">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">1. Start Contributing Now</h4>
              <p className="text-gray-600 text-sm">
                Every year you delay is a year of lost compound growth. Even $50/month started today 
                beats $200/month started five years from now.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">2. Always Capture Your Employer Match</h4>
              <p className="text-gray-600 text-sm">
                Employer matching is an immediate 50-100% return on your investment before market 
                gains. Never leave this free money on the table.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">3. Increase Contributions When You Get Raises</h4>
              <p className="text-gray-600 text-sm">
                Bump your contribution rate by 1% every year. You won't miss the money, and it adds 
                thousands to your retirement balance.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">4. Don't Panic During Market Downturns</h4>
              <p className="text-gray-600 text-sm">
                Selling during a downturn locks in losses and ruins compound growth. Stay invested - 
                historically, markets recover and reward patient investors.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">5. Choose Low-Fee Index Funds</h4>
              <p className="text-gray-600 text-sm">
                A 1% difference in annual fees can cost you 25% of your retirement balance over 35 
                years. Low-cost index funds maximize your compound growth.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <PostResultUpsell />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
          <Link 
            href="/tools/401k-retirement-calculator"
            className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-orange-200 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calculator className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  401k Retirement Calculator
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Estimate your 401k balance at retirement with our free tool
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 ml-auto flex-shrink-0" />
            </div>
          </Link>

          <Link 
            href="/mbb/401k-vs-ira-retirement"
            className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-orange-200 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  401k vs IRA: Which Is Better?
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Compare contribution limits, tax benefits, and flexibility
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 ml-auto flex-shrink-0" />
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-gray-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <ExploreMoreTools />
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How 401k Compound Growth Works",
            "description": "Learn how compound interest can turn modest 401k contributions into substantial retirement wealth. Understand the power of time and compounding.",
            "author": {
              "@type": "Organization",
              "name": "VCM Suite"
            },
            "publisher": {
              "@type": "Organization",
              "name": "VCM Suite"
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
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })
        }}
      />
    </div>
  );
}
