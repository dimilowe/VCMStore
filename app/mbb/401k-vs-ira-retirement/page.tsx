'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Briefcase,
  Calculator,
  DollarSign,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  PiggyBank,
  Shield,
  Scale,
  Percent,
  CheckCircle,
  XCircle,
  Users,
  Building
} from 'lucide-react';
import ExploreMoreTools from '@/components/ExploreMoreTools';
import PostResultUpsell from '@/components/PostResultUpsell';
import MonetizationBar from '@/components/MonetizationBar';

const faqs = [
  {
    q: "Can I have both a 401k and an IRA?",
    a: "Yes! Many people contribute to both. You can max out your 401k ($23,000 in 2024) AND contribute to an IRA ($7,000 in 2024). If you have a 401k at work, your IRA deduction may be limited based on your income, but you can still contribute to a Roth IRA or make non-deductible traditional IRA contributions."
  },
  {
    q: "Which should I prioritize: 401k or IRA?",
    a: "Start with your 401k up to the employer match (it's free money). Then consider funding a Roth IRA for tax diversification. If you still have money to invest, go back and max out your 401k. If your 401k has high fees, you might prioritize the IRA more heavily."
  },
  {
    q: "What's the difference between Traditional and Roth versions?",
    a: "Traditional 401k/IRA contributions are pre-tax (you pay taxes when you withdraw in retirement). Roth contributions are after-tax (you pay now, but withdrawals are tax-free). Choose Traditional if you expect a lower tax bracket in retirement; choose Roth if you expect higher taxes later."
  },
  {
    q: "Can I roll my 401k into an IRA?",
    a: "Yes, when you leave a job, you can roll your 401k into an IRA without tax penalties. This gives you more investment options and potentially lower fees. It's called a 'rollover IRA' and is a common strategy for consolidating retirement accounts."
  },
  {
    q: "What happens if I need to withdraw early?",
    a: "Both accounts have a 10% early withdrawal penalty before age 59½ (with some exceptions). However, Roth IRA contributions (not earnings) can be withdrawn anytime tax and penalty-free since you already paid taxes on them. 401ks may allow loans against your balance."
  },
  {
    q: "Which has better investment options?",
    a: "IRAs typically offer more investment choices since you can open them at any brokerage. 401ks are limited to the funds your employer selects, though many now offer self-directed brokerage windows. If your 401k has poor options, prioritize maxing your IRA first."
  }
];

export default function RetirementAccountComparisonPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MonetizationBar />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Scale className="w-4 h-4" />
            Retirement Account Comparison
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            401k vs IRA: Which Is Better for Retirement?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comparing <strong>401k and IRA</strong> retirement accounts? Learn the key differences in 
            contribution limits, tax benefits, and employer matching. Use our calculator to 
            <strong> estimate 401k at retirement</strong> and plan your savings strategy.
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
                Calculate Your 401k Retirement Balance
              </h3>
              <p className="text-sm text-gray-600">
                See how your contributions will grow with our free 401k estimator
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-orange-500" />
          </div>
        </Link>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Scale className="w-6 h-6 text-orange-500" />
            Quick Comparison: 401k vs IRA
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden my-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-left py-4 px-4 font-semibold text-blue-600">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      401(k)
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-semibold text-green-600">
                    <div className="flex items-center gap-2">
                      <PiggyBank className="w-4 h-4" />
                      IRA
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700">2024 Contribution Limit</td>
                  <td className="py-3 px-4 text-gray-600">$23,000 ($30,500 if 50+)</td>
                  <td className="py-3 px-4 text-gray-600">$7,000 ($8,000 if 50+)</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">Employer Match</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" /> Yes, common
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-red-500">
                      <XCircle className="w-4 h-4" /> No
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700">Who Can Open</td>
                  <td className="py-3 px-4 text-gray-600">Employees with employer plan</td>
                  <td className="py-3 px-4 text-gray-600">Anyone with earned income</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">Investment Options</td>
                  <td className="py-3 px-4 text-gray-600">Limited to plan's options</td>
                  <td className="py-3 px-4 text-gray-600">Wide variety at any broker</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700">Roth Option</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" /> If offered
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" /> Yes (income limits)
                    </span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-700">Loan Option</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" /> Usually allowed
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-red-500">
                      <XCircle className="w-4 h-4" /> No
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-700">Fees</td>
                  <td className="py-3 px-4 text-gray-600">Varies by employer plan</td>
                  <td className="py-3 px-4 text-gray-600">You control (can be very low)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building className="w-6 h-6 text-blue-500" />
            401k Advantages
          </h2>
          
          <div className="space-y-4 not-prose my-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Higher Contribution Limits
              </h4>
              <p className="text-blue-800 text-sm">
                You can contribute over 3x more to a 401k ($23,000) compared to an IRA ($7,000). 
                This makes 401ks essential for high earners who want to maximize tax-advantaged savings.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Employer Matching
              </h4>
              <p className="text-blue-800 text-sm">
                Many employers match 50-100% of your contributions up to a certain percentage. 
                This is essentially free money - always contribute at least enough to get the full match.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Automatic Payroll Deductions
              </h4>
              <p className="text-blue-800 text-sm">
                Contributions are automatically deducted from your paycheck before you see the money. 
                This "set it and forget it" approach makes consistent saving effortless.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <PiggyBank className="w-6 h-6 text-green-500" />
            IRA Advantages
          </h2>
          
          <div className="space-y-4 not-prose my-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                More Investment Choices
              </h4>
              <p className="text-green-800 text-sm">
                With an IRA at a major brokerage, you can invest in thousands of stocks, ETFs, bonds, 
                and mutual funds. 401k plans typically offer 10-30 options selected by your employer.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Lower Fees (Often)
              </h4>
              <p className="text-green-800 text-sm">
                You can choose low-cost index funds with expense ratios under 0.10%. Some 401k plans 
                have high-fee options that eat into your returns over time.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Available to Everyone
              </h4>
              <p className="text-green-800 text-sm">
                Anyone with earned income can open an IRA, regardless of whether their employer offers 
                a retirement plan. Self-employed? Freelancer? You can still save for retirement.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-orange-500" />
            The Smart Strategy: Use Both
          </h2>
          <p className="text-gray-600">
            Most financial advisors recommend a combined approach. Here's the typical priority order:
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 my-8">
          <h3 className="font-bold text-amber-900 text-lg mb-4">Recommended Contribution Order</h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
              <div>
                <strong className="text-amber-900">401k up to employer match</strong>
                <p className="text-sm text-amber-700">Capture the free money first - it's an instant 50-100% return!</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
              <div>
                <strong className="text-amber-900">Max out Roth IRA ($7,000)</strong>
                <p className="text-sm text-amber-700">Tax-free growth and withdrawals provide valuable tax diversification.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
              <div>
                <strong className="text-amber-900">Max out 401k ($23,000)</strong>
                <p className="text-sm text-amber-700">If you still have money to invest, fill up that 401k space.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
              <div>
                <strong className="text-amber-900">Taxable brokerage account</strong>
                <p className="text-sm text-amber-700">After maxing tax-advantaged accounts, invest in a regular brokerage.</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Percent className="w-6 h-6 text-orange-500" />
            Traditional vs Roth: Tax Considerations
          </h2>
          <p className="text-gray-600">
            Both 401ks and IRAs come in Traditional (pre-tax) and Roth (after-tax) versions. 
            The right choice depends on your current vs. expected future tax rates:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h3 className="font-bold text-blue-900 mb-3">Choose Traditional If...</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>You're in a high tax bracket now</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>You expect lower income in retirement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>You want to reduce current taxable income</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>You're close to retirement</span>
              </li>
            </ul>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="font-bold text-green-900 mb-3">Choose Roth If...</h3>
            <ul className="space-y-2 text-sm text-green-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>You're in a lower tax bracket now</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>You expect higher taxes in the future</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>You want tax-free income in retirement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>You're young with decades of tax-free growth</span>
              </li>
            </ul>
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
            href="/mbb/how-401k-compound-growth-works"
            className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-orange-200 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  How 401k Compound Growth Works
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Learn why starting early can double your retirement savings
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
            "headline": "401k vs IRA: Which Is Better for Retirement?",
            "description": "Compare 401k and IRA retirement accounts. Learn the key differences in contribution limits, tax benefits, employer matching, and which to prioritize.",
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
