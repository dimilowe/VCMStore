import Link from "next/link";
import { Metadata } from "next";
import { Car, Wrench, DollarSign, FileText, ArrowLeft, Clock, Settings, AlertCircle } from "lucide-react";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

export const metadata: Metadata = {
  title: "How Car Repairs Are Priced – Parts, Labor & Diagnostics",
  description: "Learn how auto repair shops calculate their estimates. Understand parts markup, labor billing, diagnostic fees, and why specialty vehicles cost more to repair.",
};

export default function HowCarRepairsArePricedPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do mechanics determine labor time for repairs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mechanics use industry-standard labor time guides (like Mitchell or AllData) that specify how many hours each repair should take. They multiply these book hours by their shop's hourly rate to calculate labor charges."
        }
      },
      {
        "@type": "Question",
        "name": "What is a typical parts markup at auto repair shops?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Auto repair shops typically mark up parts by 30-50% above their wholesale cost. Dealerships may mark up OEM parts even higher. This markup covers ordering, handling, and warranty on the parts."
        }
      },
      {
        "@type": "Question",
        "name": "Why do shops charge a diagnostic fee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Diagnostic fees ($75-150) cover the technician's time to identify the problem using specialized equipment and expertise. This fee is often waived or applied toward repairs if you proceed with the work."
        }
      },
      {
        "@type": "Question",
        "name": "Why are European and luxury cars more expensive to repair?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "European and luxury vehicles cost more due to specialized parts (often OEM-only), proprietary diagnostic tools, advanced technology requiring specialized training, and lower parts availability compared to domestic vehicles."
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
              Industry Guide
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How Car Repairs Are Priced – Parts, Labor & Diagnostics
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding how repair shops calculate estimates helps you use an <strong>estimator for car repair</strong> costs 
              more effectively and negotiate fair prices. Here's an inside look at industry pricing practices.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-orange-500" />
                Industry-Standard Labor Billing
              </h2>
              <p className="text-gray-600 mb-4">
                Auto repair shops don't guess at how long a job takes. They use standardized labor time 
                guides published by companies like Mitchell, AllData, and MOTOR. These guides specify 
                "book time" for virtually every repair on every vehicle.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">How Book Time Works</h3>
                <p className="text-sm text-gray-600 mb-3">
                  If the labor guide says a brake job takes 1.5 hours and the shop charges $100/hour:
                </p>
                <div className="bg-white rounded p-3 border border-gray-200">
                  <p className="text-center text-lg font-medium text-gray-900">
                    1.5 hours × $100/hour = <span className="text-orange-600">$150 labor charge</span>
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Experienced technicians may finish faster than book time, but you're still charged the 
                standard rate. Conversely, if complications arise, shops may charge additional time.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Flat Rate System</h4>
                  <p className="text-sm text-gray-600">
                    Most shops use flat-rate billing based on book time. You pay the same whether the 
                    job takes 30 minutes or 2 hours.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Time & Materials</h4>
                  <p className="text-sm text-gray-600">
                    Some specialty shops bill actual time. This can be cheaper or more expensive 
                    depending on complications encountered.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-orange-500" />
                Parts Markup Explained
              </h2>
              <p className="text-gray-600 mb-4">
                When you pay for parts at a repair shop, you're not paying wholesale prices. Shops 
                add markup to cover ordering, inventory costs, handling, and profit margin.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Shop Type</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Typical Parts Markup</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Parts Used</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Independent Shop</td>
                      <td className="py-3 px-2">30-50%</td>
                      <td className="py-3 px-2">Mix of OEM & Aftermarket</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Dealership</td>
                      <td className="py-3 px-2">40-75%</td>
                      <td className="py-3 px-2">OEM Only</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Chain Shops</td>
                      <td className="py-3 px-2">25-40%</td>
                      <td className="py-3 px-2">Primarily Aftermarket</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Specialty/Performance</td>
                      <td className="py-3 px-2">40-60%</td>
                      <td className="py-3 px-2">Premium/Performance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Can You Supply Your Own Parts?</h4>
                <p className="text-sm text-amber-800">
                  Some shops allow customer-supplied parts but may charge higher labor rates or void 
                  the parts warranty. Always ask about policies before purchasing parts yourself.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Settings className="w-6 h-6 text-orange-500" />
                Diagnostic Labor Fees
              </h2>
              <p className="text-gray-600 mb-4">
                Before a shop can fix your car, they often need to diagnose what's wrong. This 
                involves technician time, specialized scan tools, and expertise.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-1">$75-100</p>
                  <p className="text-sm text-gray-600">Basic Diagnostic</p>
                  <p className="text-xs text-gray-500 mt-1">Code read + visual inspection</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-1">$100-150</p>
                  <p className="text-sm text-gray-600">Standard Diagnostic</p>
                  <p className="text-xs text-gray-500 mt-1">1 hour comprehensive testing</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-3xl font-bold text-gray-900 mb-1">$150-300</p>
                  <p className="text-sm text-gray-600">Complex Diagnostic</p>
                  <p className="text-xs text-gray-500 mt-1">Electrical/drivetrain issues</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Diagnostic Fee Policies</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Many shops waive the fee if you proceed with repairs</li>
                  <li>• Some apply the diagnostic fee toward the final bill</li>
                  <li>• Chain stores often offer free basic code readings</li>
                  <li>• Complex issues may require additional diagnostic time</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Car className="w-6 h-6 text-orange-500" />
                Why Specialty Vehicles Cost More
              </h2>
              <p className="text-gray-600 mb-4">
                European, luxury, and specialty vehicles consistently cost more to repair than 
                domestic and economy cars. Here's why:
              </p>
              <div className="space-y-4 mb-4">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Specialized Parts</h4>
                  <p className="text-sm text-gray-600">
                    BMW, Mercedes, Audi, and similar brands often require OEM parts that cost 
                    2-3x more than equivalent domestic parts. Aftermarket options may be limited.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Proprietary Diagnostic Tools</h4>
                  <p className="text-sm text-gray-600">
                    Many European manufacturers require brand-specific diagnostic equipment costing 
                    $5,000-20,000. Shops pass these costs on through higher rates.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Advanced Training Required</h4>
                  <p className="text-sm text-gray-600">
                    Working on high-tech vehicles requires specialized training and certifications. 
                    Technicians with these skills command higher wages.
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Longer Labor Times</h4>
                  <p className="text-sm text-gray-600">
                    Luxury vehicles often have more complex designs requiring additional disassembly. 
                    A simple repair may take 2x longer than on a comparable domestic vehicle.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Vehicle Type</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Labor Rate</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Parts Cost Premium</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Economy (Honda, Toyota, Ford)</td>
                      <td className="py-3 px-2">$80-120/hr</td>
                      <td className="py-3 px-2">Baseline</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">European (BMW, Audi, VW)</td>
                      <td className="py-3 px-2">$120-180/hr</td>
                      <td className="py-3 px-2">+40-80%</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Luxury (Mercedes, Lexus)</td>
                      <td className="py-3 px-2">$150-200/hr</td>
                      <td className="py-3 px-2">+50-100%</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Exotic (Ferrari, Porsche)</td>
                      <td className="py-3 px-2">$200-350/hr</td>
                      <td className="py-3 px-2">+100-300%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Shop Supplies & Miscellaneous Fees</h2>
              <p className="text-gray-600 mb-4">
                Many repair invoices include additional line items beyond parts and labor:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Shop Supplies (3-10%)</h4>
                  <p className="text-sm text-gray-600">
                    Covers rags, solvents, lubricants, and consumables. Usually capped at a maximum amount.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Environmental Fees ($5-25)</h4>
                  <p className="text-sm text-gray-600">
                    Covers proper disposal of oil, coolant, refrigerant, and other hazardous materials.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Storage Fees</h4>
                  <p className="text-sm text-gray-600">
                    Some shops charge daily storage if you don't pick up your car promptly after repair.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Sublet Fees</h4>
                  <p className="text-sm text-gray-600">
                    If work is sent to a specialist (machine shop, glass shop), expect markup on that service.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Repair Estimate</h2>
              <p className="text-gray-600 mb-4">
                A proper repair estimate should itemize all charges. Here's what to look for:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm mb-4">
                <p className="border-b border-gray-300 pb-2 mb-2 font-semibold">SAMPLE REPAIR ESTIMATE</p>
                <div className="space-y-1 text-gray-700">
                  <p>Brake Pad Replacement - Front Axle</p>
                  <p className="pl-4">Parts: Brake Pads (OEM) .......... $145.00</p>
                  <p className="pl-4">Labor: 1.5 hrs @ $100/hr ........ $150.00</p>
                  <p className="border-t border-gray-300 pt-2 mt-2">Shop Supplies .................... $12.00</p>
                  <p>Environmental Fee ................. $8.00</p>
                  <p className="border-t border-gray-300 pt-2 mt-2 font-semibold">TOTAL ........................... $315.00</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  <strong>Always ask for written estimates</strong> before authorizing work. Many states 
                  require shops to get approval before exceeding estimates by more than 10%.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How do mechanics determine labor time for repairs?</h3>
                  <p className="text-gray-600 text-sm">
                    Mechanics use industry-standard labor time guides (like Mitchell or AllData) that 
                    specify how many hours each repair should take. They multiply these book hours by 
                    their shop's hourly rate to calculate labor charges.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What is a typical parts markup at auto repair shops?</h3>
                  <p className="text-gray-600 text-sm">
                    Auto repair shops typically mark up parts by 30-50% above their wholesale cost. 
                    Dealerships may mark up OEM parts even higher. This markup covers ordering, 
                    handling, and warranty on the parts.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Why do shops charge a diagnostic fee?</h3>
                  <p className="text-gray-600 text-sm">
                    Diagnostic fees ($75-150) cover the technician's time to identify the problem using 
                    specialized equipment and expertise. This fee is often waived or applied toward 
                    repairs if you proceed with the work.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Why are European and luxury cars more expensive to repair?</h3>
                  <p className="text-gray-600 text-sm">
                    European and luxury vehicles cost more due to specialized parts (often OEM-only), 
                    proprietary diagnostic tools, advanced technology requiring specialized training, 
                    and lower parts availability compared to domestic vehicles.
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
                href="/mbb/common-car-repair-costs"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
              >
                <FileText className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Common Car Repair Costs</p>
                  <p className="text-sm text-gray-500">Full breakdown of typical prices</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
