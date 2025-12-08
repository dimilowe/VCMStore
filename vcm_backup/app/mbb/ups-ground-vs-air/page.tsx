'use client';

import Link from 'next/link';
import { 
  Package,
  Truck,
  Plane,
  Calculator,
  ArrowRight,
  Clock,
  DollarSign,
  MapPin,
  CheckCircle,
  XCircle,
  Scale,
  AlertCircle,
  Zap
} from 'lucide-react';
import PostResultUpsell from '@/components/PostResultUpsell';

export default function UPSGroundVsAirPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/ups-shipping-cost" className="hover:text-orange-600">UPS Shipping Estimator</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Ground vs Air</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mb-4 shadow-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                UPS Ground vs Air: Which Is Cheaper?
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choosing between UPS Ground and Air services can save you significant money. Learn when to use each 
                and how to <strong>estimate UPS shipping cost</strong> for both options.
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 mb-10">
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="w-6 h-6 text-amber-600" />
                <span className="font-semibold text-gray-900">Compare Costs Instantly</span>
              </div>
              <p className="text-gray-700 mb-4">
                Use our free UPS shipping calculator to compare Ground vs Air prices for your specific package.
              </p>
              <Link 
                href="/tools/ups-shipping-cost"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
              >
                Estimate UPS Shipping Cost
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-amber-500" />
                Quick Answer: UPS Ground Is Usually Cheaper
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>UPS Ground is typically 50-70% cheaper than Air services</strong> for the same package. 
                The trade-off is delivery time: Ground takes 5-7 business days compared to 1-3 days for Air.
              </p>
              <div className="bg-white rounded-xl p-5 border border-gray-200 mb-4">
                <h3 className="font-semibold text-gray-900 mb-3">Example: 10 lb Package, NYC to Los Angeles</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">UPS Ground</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700">~$18-25</p>
                    <p className="text-sm text-gray-600">5-7 business days</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Plane className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">UPS Next Day Air</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">~$85-120</p>
                    <p className="text-sm text-gray-600">1 business day</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                That's roughly a 4-5x price difference. For non-urgent shipments, Ground shipping is almost always 
                the smarter financial choice.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Truck className="w-6 h-6 text-amber-500" />
                When to Choose UPS Ground
              </h2>
              <p className="text-gray-700 mb-4">
                UPS Ground is the right choice in most scenarios. It's economical, reliable, and covers the entire 
                continental United States.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">E-commerce Orders</p>
                    <p className="text-sm text-gray-600">Standard online orders where customers expect 5-7 day delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Heavy or Large Items</p>
                    <p className="text-sm text-gray-600">Air rates for heavy packages are prohibitively expensive</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Non-Urgent Shipments</p>
                    <p className="text-sm text-gray-600">Restocking inventory, sending samples, personal packages</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Budget-Conscious Shipping</p>
                    <p className="text-sm text-gray-600">When keeping shipping costs low is a priority</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">UPS Ground Benefits:</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Lowest cost option for domestic shipping</li>
                  <li>• Guaranteed delivery dates</li>
                  <li>• Full tracking and insurance available</li>
                  <li>• Delivers Monday-Friday (Saturday for additional fee)</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plane className="w-6 h-6 text-amber-500" />
                When to Choose UPS Air Services
              </h2>
              <p className="text-gray-700 mb-4">
                Air services cost more, but they're worth it when speed matters more than cost. UPS offers three 
                Air service levels:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                  <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">3 Day Select</h3>
                  <p className="text-sm text-gray-600">3 business days</p>
                  <p className="text-xs text-gray-500 mt-1">~30-40% more than Ground</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                  <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">2nd Day Air</h3>
                  <p className="text-sm text-gray-600">2 business days</p>
                  <p className="text-xs text-gray-500 mt-1">~60-80% more than Ground</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                  <Zap className="w-8 h-8 text-blue-700 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900">Next Day Air</h3>
                  <p className="text-sm text-gray-600">1 business day</p>
                  <p className="text-xs text-gray-500 mt-1">~200-400% more than Ground</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Time-Critical Documents</p>
                    <p className="text-sm text-gray-600">Legal papers, contracts, passports that can't wait</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Perishable Items</p>
                    <p className="text-sm text-gray-600">Food, flowers, medical supplies that need quick delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Emergency Replacements</p>
                    <p className="text-sm text-gray-600">Broken parts, equipment failures, urgent business needs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">High-Value Time-Sensitive Items</p>
                    <p className="text-sm text-gray-600">When delay costs more than expedited shipping</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-amber-500" />
                Side-by-Side Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">Feature</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">UPS Ground</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">UPS Air</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-4 py-3 font-medium">Delivery Time</td>
                      <td className="px-4 py-3">5-7 business days</td>
                      <td className="px-4 py-3">1-3 business days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Cost (10 lb, Zone 8)</td>
                      <td className="px-4 py-3 text-green-600 font-semibold">~$20-30</td>
                      <td className="px-4 py-3 text-blue-600 font-semibold">~$60-120</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Best For</td>
                      <td className="px-4 py-3">Non-urgent, budget-conscious</td>
                      <td className="px-4 py-3">Time-critical, perishable</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Tracking</td>
                      <td className="px-4 py-3">Full tracking included</td>
                      <td className="px-4 py-3">Full tracking included</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Guarantee</td>
                      <td className="px-4 py-3">Delivery date guarantee</td>
                      <td className="px-4 py-3">Delivery time guarantee</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Saturday Delivery</td>
                      <td className="px-4 py-3">Extra fee</td>
                      <td className="px-4 py-3">Available (extra fee)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                Hidden Factors That Affect Your Choice
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Distance Matters More Than You Think</h3>
                  <p className="text-gray-700">
                    UPS Ground within the same region (e.g., NYC to Boston) often arrives in just 2-3 days — 
                    nearly as fast as 3 Day Select but at Ground prices. Check delivery estimates before choosing Air.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Weight Amplifies the Difference</h3>
                  <p className="text-gray-700">
                    The cost difference between Ground and Air grows dramatically with weight. A 50 lb package might 
                    cost $40 Ground vs $300+ Next Day Air — a 7x difference!
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Consider Hybrid Strategies</h3>
                  <p className="text-gray-700">
                    Some businesses use Ground for regular orders but upgrade to Air when customers pay for expedited 
                    shipping. This optimizes cost without sacrificing service when needed.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Bottom Line</h2>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Choose Ground</strong> for 90% of shipments — it's reliable and saves 50-70%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Choose Air</strong> only when the cost of delay exceeds the cost of shipping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Always compare</strong> before deciding — use our calculator to see exact prices</span>
                  </li>
                </ul>
              </div>
            </section>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 mb-10">
              <h3 className="font-bold text-gray-900 mb-3">Compare Ground vs Air Costs Now</h3>
              <p className="text-gray-700 mb-4">
                Enter your package details in our free calculator and see exact price estimates for all UPS 
                service levels side by side.
              </p>
              <Link 
                href="/tools/ups-shipping-cost"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
              >
                Estimate UPS Shipping Cost
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-10">
              <h3 className="font-semibold text-gray-900 mb-3">Related Articles</h3>
              <Link 
                href="/mbb/ups-shipping-rates-explained"
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-sm transition-all group"
              >
                <DollarSign className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-gray-900 group-hover:text-amber-700">UPS Shipping Rates Explained: Complete Breakdown</span>
                <ArrowRight className="w-4 h-4 text-gray-400 ml-auto group-hover:text-amber-600" />
              </Link>
            </div>

            <PostResultUpsell />

          </article>
        </div>
      </div>
    </>
  );
}
