import Link from "next/link";
import { Metadata } from "next";
import { Car, Wrench, DollarSign, FileText, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

export const metadata: Metadata = {
  title: "Common Car Repair Costs – Full Breakdown",
  description: "Learn the average costs for common car repairs including brakes, alternator, AC, engine, and transmission. Understand why prices vary and when to get multiple quotes.",
};

export default function CommonCarRepairCostsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the average cost for brake pad replacement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Brake pad replacement typically costs $150-350 per axle, including parts and labor. Premium brake pads and rotors can push costs to $300-600 per axle."
        }
      },
      {
        "@type": "Question",
        "name": "How much does AC repair cost on average?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AC repair costs range from $100 for a simple recharge to $1,000-2,500 for compressor replacement. Leak repairs typically fall in the $300-800 range."
        }
      },
      {
        "@type": "Question",
        "name": "Why do transmission repairs cost so much?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Transmission repairs are expensive due to the complexity of the component, specialized labor required, and high parts costs. A full rebuild can cost $2,500-5,000 while replacement runs $3,500-8,000."
        }
      },
      {
        "@type": "Question",
        "name": "Should I always get multiple repair quotes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, getting 2-3 quotes for major repairs ($500+) is recommended. This helps ensure fair pricing and lets you compare shop reputation, warranty terms, and parts quality."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <MonetizationBar />

        <div className="max-w-4xl mx-auto px-4 py-12">
          <Link 
            href="/tools/estimator-for-car-repair"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Car Repair Estimator
          </Link>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Auto Repair Guide
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Common Car Repair Costs – Full Breakdown
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding <strong>estimator for car repair</strong> costs helps you budget for maintenance 
              and avoid overpaying. Here's a comprehensive breakdown of what typical repairs actually cost.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Wrench className="w-6 h-6 text-orange-500" />
                Brake System Repairs
              </h2>
              <p className="text-gray-600 mb-4">
                Brake repairs are among the most common services. Costs vary significantly based on whether 
                you need just pads, rotors, or complete brake system work.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Repair</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Parts</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Labor</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Brake Pad Replacement (per axle)</td>
                      <td className="py-3 px-2">$50-150</td>
                      <td className="py-3 px-2">$75-150</td>
                      <td className="py-3 px-2 font-medium">$150-350</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Brake Pads + Rotors (per axle)</td>
                      <td className="py-3 px-2">$150-400</td>
                      <td className="py-3 px-2">$100-200</td>
                      <td className="py-3 px-2 font-medium">$300-600</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Brake Caliper Replacement</td>
                      <td className="py-3 px-2">$100-300</td>
                      <td className="py-3 px-2">$100-200</td>
                      <td className="py-3 px-2 font-medium">$200-500</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Brake Line Repair</td>
                      <td className="py-3 px-2">$50-150</td>
                      <td className="py-3 px-2">$100-250</td>
                      <td className="py-3 px-2 font-medium">$150-400</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Replace front and rear brakes separately to spread out costs. 
                  Front brakes typically wear faster due to weight transfer during braking.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Car className="w-6 h-6 text-orange-500" />
                Engine & Electrical Repairs
              </h2>
              <p className="text-gray-600 mb-4">
                Engine and electrical repairs range from simple fixes to major overhauls. Diagnostic fees 
                ($75-150) are often charged separately.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Repair</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Parts</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Labor</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Battery Replacement</td>
                      <td className="py-3 px-2">$100-200</td>
                      <td className="py-3 px-2">$25-75</td>
                      <td className="py-3 px-2 font-medium">$125-275</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Alternator Replacement</td>
                      <td className="py-3 px-2">$200-500</td>
                      <td className="py-3 px-2">$100-250</td>
                      <td className="py-3 px-2 font-medium">$400-750</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Starter Motor Replacement</td>
                      <td className="py-3 px-2">$150-400</td>
                      <td className="py-3 px-2">$150-300</td>
                      <td className="py-3 px-2 font-medium">$350-700</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Spark Plug Replacement</td>
                      <td className="py-3 px-2">$40-150</td>
                      <td className="py-3 px-2">$50-200</td>
                      <td className="py-3 px-2 font-medium">$100-350</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Check Engine Diagnosis</td>
                      <td className="py-3 px-2">$0</td>
                      <td className="py-3 px-2">$75-150</td>
                      <td className="py-3 px-2 font-medium">$75-150</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-orange-500" />
                AC & Cooling System
              </h2>
              <p className="text-gray-600 mb-4">
                Air conditioning and cooling system repairs vary widely. Simple refrigerant recharges 
                are affordable, but compressor replacement is one of the more expensive AC repairs.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Repair</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Parts</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Labor</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">AC Recharge</td>
                      <td className="py-3 px-2">$30-80</td>
                      <td className="py-3 px-2">$50-100</td>
                      <td className="py-3 px-2 font-medium">$100-200</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">AC Leak Repair</td>
                      <td className="py-3 px-2">$100-300</td>
                      <td className="py-3 px-2">$150-400</td>
                      <td className="py-3 px-2 font-medium">$300-800</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">AC Compressor Replacement</td>
                      <td className="py-3 px-2">$500-1,200</td>
                      <td className="py-3 px-2">$400-800</td>
                      <td className="py-3 px-2 font-medium">$1,000-2,500</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Radiator Replacement</td>
                      <td className="py-3 px-2">$200-600</td>
                      <td className="py-3 px-2">$200-400</td>
                      <td className="py-3 px-2 font-medium">$500-1,200</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Water Pump Replacement</td>
                      <td className="py-3 px-2">$100-350</td>
                      <td className="py-3 px-2">$200-500</td>
                      <td className="py-3 px-2 font-medium">$400-900</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Wrench className="w-6 h-6 text-orange-500" />
                Transmission & Drivetrain
              </h2>
              <p className="text-gray-600 mb-4">
                Transmission work is typically the most expensive car repair category. The complexity 
                of modern transmissions and the labor hours required drive up costs significantly.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Repair</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Parts</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Labor</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Transmission Fluid Change</td>
                      <td className="py-3 px-2">$75-150</td>
                      <td className="py-3 px-2">$50-100</td>
                      <td className="py-3 px-2 font-medium">$150-300</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Clutch Replacement (Manual)</td>
                      <td className="py-3 px-2">$400-800</td>
                      <td className="py-3 px-2">$500-1,200</td>
                      <td className="py-3 px-2 font-medium">$1,000-2,200</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Transmission Rebuild</td>
                      <td className="py-3 px-2">$1,500-3,000</td>
                      <td className="py-3 px-2">$1,000-2,000</td>
                      <td className="py-3 px-2 font-medium">$2,500-5,000</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Transmission Replacement</td>
                      <td className="py-3 px-2">$2,000-4,500</td>
                      <td className="py-3 px-2">$1,000-2,500</td>
                      <td className="py-3 px-2 font-medium">$3,500-8,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  <strong>Warning:</strong> Transmission repairs over $2,500 often warrant getting a 
                  second opinion. Some shops may recommend replacement when a rebuild would suffice.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Car Repair Prices Vary</h2>
              <p className="text-gray-600 mb-4">
                Understanding why repair costs differ between shops helps you make informed decisions:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Geographic Location</h3>
                  <p className="text-sm text-gray-600">
                    Labor rates in major cities ($100-180/hr) are significantly higher than rural 
                    areas ($50-80/hr) due to rent, wages, and cost of living differences.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Shop Type</h3>
                  <p className="text-sm text-gray-600">
                    Dealerships charge premium rates for brand-specific expertise. Independent shops 
                    are often 20-40% cheaper for the same work.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Parts Quality</h3>
                  <p className="text-sm text-gray-600">
                    OEM parts cost more than aftermarket alternatives. Quality aftermarket parts 
                    often perform equally well at 20-50% lower cost.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Vehicle Make</h3>
                  <p className="text-sm text-gray-600">
                    Luxury and European vehicles have higher parts costs and require specialized 
                    tools and training, increasing overall repair expenses.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Get Multiple Quotes</h2>
              <p className="text-gray-600 mb-4">
                Always seek multiple opinions for:
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Repairs over $500</strong> – The savings potential justifies the time</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Transmission or engine work</strong> – High-cost repairs with significant pricing variance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>When recommended repairs seem excessive</strong> – Second opinions catch unnecessary work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Unfamiliar shop</strong> – Verify pricing if you haven't used the shop before</span>
                </li>
              </ul>
              <p className="text-gray-600">
                Use our <Link href="/tools/estimator-for-car-repair" className="text-orange-600 hover:underline font-medium">car repair estimator</Link> to 
                get a baseline estimate before visiting shops.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What is the average cost for brake pad replacement?</h3>
                  <p className="text-gray-600 text-sm">
                    Brake pad replacement typically costs $150-350 per axle, including parts and labor. 
                    Premium brake pads and rotors can push costs to $300-600 per axle.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How much does AC repair cost on average?</h3>
                  <p className="text-gray-600 text-sm">
                    AC repair costs range from $100 for a simple recharge to $1,000-2,500 for compressor 
                    replacement. Leak repairs typically fall in the $300-800 range.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Why do transmission repairs cost so much?</h3>
                  <p className="text-gray-600 text-sm">
                    Transmission repairs are expensive due to the complexity of the component, specialized 
                    labor required, and high parts costs. A full rebuild can cost $2,500-5,000 while 
                    replacement runs $3,500-8,000.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Should I always get multiple repair quotes?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, getting 2-3 quotes for major repairs ($500+) is recommended. This helps ensure 
                    fair pricing and lets you compare shop reputation, warranty terms, and parts quality.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <PostResultUpsell />

          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/tools/estimator-for-car-repair"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
              >
                <Car className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Car Repair Estimator</p>
                  <p className="text-sm text-gray-500">Calculate your repair costs</p>
                </div>
              </Link>
              <Link 
                href="/mbb/how-car-repairs-are-priced"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
              >
                <FileText className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">How Car Repairs Are Priced</p>
                  <p className="text-sm text-gray-500">Parts, labor & diagnostics explained</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
