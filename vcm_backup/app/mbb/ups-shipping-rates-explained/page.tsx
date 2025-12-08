'use client';

import Link from 'next/link';
import { 
  Package,
  DollarSign,
  Scale,
  MapPin,
  Calculator,
  ArrowRight,
  Shield,
  Truck,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import PostResultUpsell from '@/components/PostResultUpsell';

export default function UPSShippingRatesExplainedPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/ups-shipping-cost" className="hover:text-orange-600">UPS Shipping Estimator</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Rates Explained</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mb-4 shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                UPS Shipping Rates Explained: Complete Breakdown
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Understanding how UPS calculates shipping rates helps you <strong>estimate UPS shipping cost</strong> accurately 
                and find ways to save money on every package you send.
              </p>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 mb-10">
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="w-6 h-6 text-amber-600" />
                <span className="font-semibold text-gray-900">Quick Calculator</span>
              </div>
              <p className="text-gray-700 mb-4">
                Want to see real numbers? Use our free UPS shipping calculator to estimate your shipping costs instantly.
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
                The Four Factors That Determine UPS Rates
              </h2>
              <p className="text-gray-700 mb-4">
                UPS shipping rates are calculated using a combination of four primary factors. Understanding each one 
                helps you make smarter shipping decisions and potentially reduce your costs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-gray-900">1. Package Weight</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Heavier packages cost more to ship. UPS uses either actual weight or dimensional weight — 
                    whichever is greater.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-gray-900">2. Package Size</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Large packages take up truck space. Dimensional weight pricing ensures you pay for 
                    the space your package occupies.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-gray-900">3. Distance (Zones)</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    The farther your package travels, the more it costs. UPS divides the US into 8 shipping zones.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-gray-900">4. Service Level</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Faster delivery = higher cost. Next Day Air costs significantly more than Ground shipping.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-amber-500" />
                Weight vs Volume: Billable Weight Explained
              </h2>
              <p className="text-gray-700 mb-4">
                One of the most confusing aspects of UPS shipping rates is billable weight. UPS charges based on 
                whichever is greater: your package's actual weight or its dimensional weight.
              </p>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Dimensional Weight Formula:</h3>
                <p className="font-mono text-sm text-gray-800 bg-white p-3 rounded-lg border border-gray-200">
                  DIM Weight = (Length × Width × Height) ÷ 139
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  The divisor (139) is called the DIM factor. It converts cubic inches to an equivalent weight in pounds.
                </p>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Example:</strong> You're shipping a box that measures 20" × 16" × 14" and weighs 8 lbs.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Actual Weight: 8 lbs</li>
                <li>Dimensional Weight: (20 × 16 × 14) ÷ 139 = 32.2 lbs (rounded to 33 lbs)</li>
                <li>Billable Weight: 33 lbs (the higher of the two)</li>
              </ul>
              <p className="text-gray-700">
                In this case, you'd pay shipping rates for a 33 lb package, even though it only weighs 8 lbs. 
                This is why proper box sizing is crucial for managing shipping costs.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-amber-500" />
                Zone-Based Pricing: How Distance Affects Cost
              </h2>
              <p className="text-gray-700 mb-4">
                UPS shipping zones range from Zone 2 (local) to Zone 8 (cross-country). Each zone represents 
                a different distance range from the origin ZIP code.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">Zone</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">Typical Distance</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr><td className="px-4 py-3">Zone 2</td><td className="px-4 py-3">0-150 miles</td><td className="px-4 py-3">NYC to Philadelphia</td></tr>
                    <tr><td className="px-4 py-3">Zone 3</td><td className="px-4 py-3">150-300 miles</td><td className="px-4 py-3">NYC to Boston</td></tr>
                    <tr><td className="px-4 py-3">Zone 4</td><td className="px-4 py-3">300-600 miles</td><td className="px-4 py-3">NYC to Cleveland</td></tr>
                    <tr><td className="px-4 py-3">Zone 5</td><td className="px-4 py-3">600-1000 miles</td><td className="px-4 py-3">NYC to Chicago</td></tr>
                    <tr><td className="px-4 py-3">Zone 6</td><td className="px-4 py-3">1000-1400 miles</td><td className="px-4 py-3">NYC to Denver</td></tr>
                    <tr><td className="px-4 py-3">Zone 7</td><td className="px-4 py-3">1400-1800 miles</td><td className="px-4 py-3">NYC to Phoenix</td></tr>
                    <tr><td className="px-4 py-3">Zone 8</td><td className="px-4 py-3">1800+ miles</td><td className="px-4 py-3">NYC to Los Angeles</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700">
                Shipping from NYC to LA (Zone 8) typically costs about twice as much as shipping the same 
                package from NYC to Philadelphia (Zone 2). This is why businesses often use regional fulfillment 
                centers to reduce shipping zones and costs.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-amber-500" />
                Additional Fees and Surcharges
              </h2>
              <p className="text-gray-700 mb-4">
                Beyond the base rate, UPS applies various surcharges that can significantly impact your final cost:
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Residential Delivery Surcharge</p>
                    <p className="text-sm text-gray-600">$4-6 extra for home deliveries vs commercial addresses</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Fuel Surcharge</p>
                    <p className="text-sm text-gray-600">Variable percentage based on current fuel prices (typically 5-15%)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Declared Value (Insurance)</p>
                    <p className="text-sm text-gray-600">~1% of declared value for loss/damage protection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Signature Required</p>
                    <p className="text-sm text-gray-600">$5-7 for requiring a signature at delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Large Package Surcharge</p>
                    <p className="text-sm text-gray-600">$110+ for packages exceeding size thresholds</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-amber-500" />
                Tips to Reduce Your UPS Shipping Costs
              </h2>
              <div className="bg-amber-50 rounded-xl p-5 border border-amber-200 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-amber-500 text-white rounded-full text-sm font-bold flex-shrink-0">1</span>
                  <div>
                    <p className="font-medium text-gray-900">Use the Right Size Box</p>
                    <p className="text-sm text-gray-600">Avoid oversized boxes that increase dimensional weight unnecessarily.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-amber-500 text-white rounded-full text-sm font-bold flex-shrink-0">2</span>
                  <div>
                    <p className="font-medium text-gray-900">Ship from Multiple Locations</p>
                    <p className="text-sm text-gray-600">Use regional warehouses to reduce shipping zones.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-amber-500 text-white rounded-full text-sm font-bold flex-shrink-0">3</span>
                  <div>
                    <p className="font-medium text-gray-900">Negotiate Volume Discounts</p>
                    <p className="text-sm text-gray-600">High-volume shippers can get 30-50% off published rates.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-amber-500 text-white rounded-full text-sm font-bold flex-shrink-0">4</span>
                  <div>
                    <p className="font-medium text-gray-900">Compare Service Levels</p>
                    <p className="text-sm text-gray-600">Ground is often 50-70% cheaper than Air for non-urgent shipments.</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 mb-10">
              <h3 className="font-bold text-gray-900 mb-3">Ready to Estimate Your UPS Shipping Cost?</h3>
              <p className="text-gray-700 mb-4">
                Now that you understand how UPS rates work, use our free calculator to get instant estimates 
                for your packages.
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
                href="/mbb/ups-ground-vs-air"
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-sm transition-all group"
              >
                <Truck className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-gray-900 group-hover:text-amber-700">UPS Ground vs Air: Which Is Cheaper?</span>
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
