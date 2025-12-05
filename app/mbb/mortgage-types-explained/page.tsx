import Link from 'next/link';
import { ArrowLeft, FileText, Home, TrendingUp, Shield, Users, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';

export const metadata = {
  title: 'Mortgage Types Explained – Fixed, ARM, FHA, VA | VCM Suite',
  description: 'Compare mortgage types including fixed-rate, adjustable-rate (ARM), FHA, and VA loans. Learn which loan type suits your situation before using a loan estimator home tool.',
};

export default function MortgageTypesExplainedPage() {
  const faqs = [
    {
      question: "Which mortgage type has the lowest interest rate?",
      answer: "VA loans typically offer the lowest rates, followed by conventional loans for excellent credit borrowers. ARMs often start lower than fixed-rate mortgages but can increase. FHA rates are competitive but include mortgage insurance that increases overall cost."
    },
    {
      question: "Can I switch from an ARM to a fixed-rate mortgage?",
      answer: "Yes, through refinancing. Many homeowners start with an ARM for lower initial payments, then refinance to a fixed-rate before the adjustment period begins. This works best when you've built equity and interest rates remain favorable."
    },
    {
      question: "What credit score do I need for each loan type?",
      answer: "Conventional loans typically require 620+, with best rates at 740+. FHA loans accept 500 (10% down) or 580 (3.5% down). VA loans have no official minimum but most lenders want 620+. USDA loans typically require 640+."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MonetizationBar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link 
          href="/tools/loan-estimator-home"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home Loan Estimator
        </Link>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            Mortgage Comparison Guide
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mortgage Types Explained – Fixed, ARM, FHA, VA
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understanding different mortgage types helps you choose the right loan. Use our 
            <strong> loan estimator home</strong> calculator alongside this guide to compare 
            monthly payments for each mortgage option.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-orange-500" />
              Fixed-Rate Mortgages
            </h2>
            <p className="text-gray-700 mb-4">
              A fixed-rate mortgage keeps the same interest rate for the entire loan term—typically 
              15, 20, or 30 years. Your principal and interest payment never changes, making budgeting 
              predictable.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Advantages
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Payment stability—never increases</li>
                  <li>• Easy to budget long-term</li>
                  <li>• Protection from rising rates</li>
                  <li>• Simple to understand</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Disadvantages
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Higher initial rate than ARMs</li>
                  <li>• Won&apos;t benefit if rates drop</li>
                  <li>• Refinancing costs if you want lower rate</li>
                  <li>• May pay more over time if rates decline</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Best for:</strong> Homeowners planning to stay 7+ years, those who value 
                payment predictability, and buyers during low-rate environments. Most first-time 
                buyers choose 30-year fixed mortgages.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-orange-500" />
              Adjustable-Rate Mortgages (ARMs)
            </h2>
            <p className="text-gray-700 mb-4">
              ARMs start with a fixed rate for an initial period, then adjust periodically based 
              on market conditions. Common types include 5/1 ARM (fixed for 5 years, adjusts 
              annually after) and 7/1 ARM.
            </p>
            
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mb-4">
              <h3 className="font-semibold text-yellow-800 mb-2">How ARM Rates Work</h3>
              <p className="text-sm text-gray-700">
                After the fixed period, your rate = Index (like SOFR) + Margin (lender&apos;s profit, 
                typically 2-3%). ARMs have caps limiting how much rates can increase per adjustment 
                and over the loan&apos;s lifetime.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Advantages
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Lower initial rate than fixed</li>
                  <li>• Lower payments during fixed period</li>
                  <li>• May save money if you move/refinance early</li>
                  <li>• Rate can decrease if market rates fall</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Disadvantages
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Payment uncertainty after fixed period</li>
                  <li>• Rates can increase significantly</li>
                  <li>• Harder to budget long-term</li>
                  <li>• More complex to understand</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Best for:</strong> Buyers who plan to move or refinance within 5-7 years, 
                those expecting income increases, or buyers in high-rate environments expecting 
                rates to fall.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-orange-500" />
              FHA Loans (Federal Housing Administration)
            </h2>
            <p className="text-gray-700 mb-4">
              FHA loans are government-backed mortgages designed to help first-time buyers and 
              those with lower credit scores achieve homeownership. They&apos;re offered through 
              FHA-approved lenders with insurance from the federal government.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">FHA Requirements</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Down Payment:</strong> 3.5% with 580+ credit score, 10% with 500-579</li>
                <li>• <strong>Credit Score:</strong> Minimum 500-580 depending on down payment</li>
                <li>• <strong>Debt-to-Income:</strong> Generally under 43%, up to 50% with compensating factors</li>
                <li>• <strong>Property:</strong> Must be primary residence, meet FHA property standards</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Advantages
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Low down payment (3.5%)</li>
                  <li>• Lower credit score requirements</li>
                  <li>• Competitive interest rates</li>
                  <li>• Higher DTI limits than conventional</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Disadvantages
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Mortgage Insurance Premium (MIP) required</li>
                  <li>• MIP lasts for loan life (with &lt;10% down)</li>
                  <li>• Loan limits by county</li>
                  <li>• Property must meet FHA standards</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> About FHA Mortgage Insurance
              </h3>
              <p className="text-sm text-gray-700">
                FHA loans require an upfront MIP (1.75% of loan, can be rolled in) plus annual 
                MIP (0.45-1.05% depending on loan details). Unlike conventional PMI, FHA MIP 
                cannot be removed if you put less than 10% down—it lasts the loan&apos;s lifetime.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-orange-500" />
              VA Loans (Veterans Affairs)
            </h2>
            <p className="text-gray-700 mb-4">
              VA loans are government-backed mortgages exclusively for eligible veterans, 
              active-duty service members, and surviving spouses. They offer exceptional terms 
              as a benefit of military service.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">VA Eligibility</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Active duty: 90 continuous days during wartime, 181 days peacetime</li>
                <li>• Veterans: Met active duty requirements and honorably discharged</li>
                <li>• National Guard/Reserves: 6 years of service or 90 days activated</li>
                <li>• Surviving spouses of service members who died in service/from disability</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Advantages
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• No down payment required</li>
                  <li>• No PMI or monthly mortgage insurance</li>
                  <li>• Lowest average interest rates</li>
                  <li>• No prepayment penalties</li>
                  <li>• Limits on closing costs</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> Disadvantages
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Limited to eligible military members</li>
                  <li>• VA funding fee (1.25-3.3%)</li>
                  <li>• Primary residence only</li>
                  <li>• Property must meet VA standards</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-700">
                <strong>VA Funding Fee:</strong> A one-time fee (1.25-3.3% depending on down 
                payment and prior VA loan usage) can be rolled into the loan. Exemptions exist 
                for disabled veterans and Purple Heart recipients.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Quick Comparison: Which Loan Type Is Right for You?
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-semibold text-gray-900">Factor</th>
                    <th className="text-left py-3 font-semibold text-gray-900">Fixed-Rate</th>
                    <th className="text-left py-3 font-semibold text-gray-900">ARM</th>
                    <th className="text-left py-3 font-semibold text-gray-900">FHA</th>
                    <th className="text-left py-3 font-semibold text-gray-900">VA</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium">Min Down Payment</td>
                    <td className="py-3">3-20%</td>
                    <td className="py-3">3-20%</td>
                    <td className="py-3">3.5%</td>
                    <td className="py-3">0%</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium">Credit Score</td>
                    <td className="py-3">620+</td>
                    <td className="py-3">620+</td>
                    <td className="py-3">500+</td>
                    <td className="py-3">None*</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium">PMI/MIP</td>
                    <td className="py-3">&lt;20% down</td>
                    <td className="py-3">&lt;20% down</td>
                    <td className="py-3">Always</td>
                    <td className="py-3">Never</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 font-medium">Rate Stability</td>
                    <td className="py-3">Fixed</td>
                    <td className="py-3">Variable</td>
                    <td className="py-3">Fixed/ARM</td>
                    <td className="py-3">Fixed/ARM</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Best For</td>
                    <td className="py-3">Long-term</td>
                    <td className="py-3">Short-term</td>
                    <td className="py-3">Low credit</td>
                    <td className="py-3">Veterans</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">*VA has no minimum but lenders typically require 620+</p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6 mb-8 border border-orange-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Calculate Your Home Loan Payment</h2>
            <p className="text-gray-700 mb-4">
              Now that you understand the different mortgage types, use our free calculator to 
              estimate payments for your situation. Try different scenarios to compare costs.
            </p>
            <Link 
              href="/tools/loan-estimator-home"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              <Home className="w-5 h-5" />
              Use the Loan Estimator Home Tool
            </Link>
          </div>
        </div>

        <PostResultUpsell />

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/tools/loan-estimator-home"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <Home className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Home Loan Estimator</p>
                <p className="text-sm text-gray-500">Calculate your monthly payment</p>
              </div>
            </Link>
            <Link 
              href="/mbb/home-loan-basics"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <FileText className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Home Loan Basics</p>
                <p className="text-sm text-gray-500">How mortgages really work</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </div>
  );
}
