import Link from 'next/link';
import { ArrowLeft, FileText, Home, DollarSign, Percent, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';

export const metadata = {
  title: 'Home Loan Basics – How Home Loans Really Work | VCM Suite',
  description: 'Learn the fundamentals of home loans including principal vs interest, what lenders look for, why APR matters, and closing costs explained. Essential knowledge before using a home loan estimator.',
};

export default function HomeLoanBasicsPage() {
  const faqs = [
    {
      question: "What's the difference between pre-qualification and pre-approval?",
      answer: "Pre-qualification is an informal estimate based on self-reported information. Pre-approval involves a full credit check and income verification, providing a more accurate loan amount you can actually borrow. Sellers prefer pre-approved buyers."
    },
    {
      question: "How long does the home loan process take?",
      answer: "From application to closing typically takes 30-45 days. This includes appraisal, underwriting, and document verification. Having all documents ready and responding quickly to lender requests can speed up the process."
    },
    {
      question: "Can I get a home loan with bad credit?",
      answer: "Yes, but options are limited. FHA loans accept credit scores as low as 500 (with 10% down) or 580 (with 3.5% down). Conventional loans typically require 620+. Lower credit means higher interest rates and potentially PMI requirements."
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
            Home Buying Guide
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Home Loan Basics – How Home Loans Really Work
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Before using a <strong>loan estimator home</strong> calculator, understanding the fundamentals 
            of mortgages helps you make smarter financial decisions and negotiate better terms.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-orange-500" />
              What a Mortgage Actually Is
            </h2>
            <p className="text-gray-700 mb-4">
              A mortgage is a secured loan where your home serves as collateral. Unlike personal loans 
              or credit cards, if you default on your mortgage, the lender can foreclose and take 
              possession of your property. This security allows lenders to offer lower interest rates 
              and longer repayment terms than unsecured loans.
            </p>
            <p className="text-gray-700 mb-4">
              Most mortgages are &quot;amortizing loans,&quot; meaning each payment includes both principal 
              (the amount you borrowed) and interest (the cost of borrowing). Early in your loan, 
              most of your payment goes toward interest. Over time, this ratio shifts, with more 
              going toward principal.
            </p>
            <p className="text-gray-700">
              The lender holds the deed until you pay off the mortgage. Once you make your final 
              payment, you own the home outright. Use our <Link href="/tools/loan-estimator-home" className="text-orange-600 hover:underline">loan estimator home calculator</Link> to 
              see how payments break down over your loan term.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-orange-500" />
              Principal vs Interest: Understanding Your Payment
            </h2>
            <p className="text-gray-700 mb-4">
              Every mortgage payment has two main components:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Principal</h3>
                <p className="text-sm text-gray-700">
                  The original amount you borrowed. Each payment reduces your outstanding balance, 
                  building equity in your home. On a $300,000 loan, you must eventually pay back 
                  exactly $300,000 in principal.
                </p>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h3 className="font-semibold text-red-800 mb-2">Interest</h3>
                <p className="text-sm text-gray-700">
                  The cost of borrowing money, expressed as APR (Annual Percentage Rate). On a 
                  30-year $300,000 loan at 6.5%, you&apos;ll pay over $380,000 in interest alone—more 
                  than the original loan!
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Amortization in action:</strong> On a $300,000, 30-year loan at 6.5%:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Your monthly payment is about $1,896</li>
              <li>First month: ~$1,625 goes to interest, only ~$271 to principal</li>
              <li>After 15 years: payments split roughly 50/50</li>
              <li>Final year: most of your payment goes to principal</li>
            </ul>
            <p className="text-gray-700">
              Making extra principal payments early in your loan saves the most interest because 
              you reduce the balance that accrues interest for decades.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-orange-500" />
              What Lenders Look For
            </h2>
            <p className="text-gray-700 mb-4">
              Mortgage lenders evaluate your application based on several key factors, often 
              called the &quot;Four C&apos;s&quot; of credit:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">1. Credit Score (620-850)</h3>
                <p className="text-sm text-gray-700">
                  Your credit score is the most critical factor. Scores above 740 get the best rates. 
                  620-740 may qualify but at higher rates. Below 620 limits options to FHA or specialty programs.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">2. Capacity (Debt-to-Income Ratio)</h3>
                <p className="text-sm text-gray-700">
                  Your DTI compares monthly debt payments to gross income. Most lenders want total 
                  DTI under 43%, with housing costs under 28%. Lower DTI means better approval odds 
                  and rates.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">3. Capital (Down Payment & Reserves)</h3>
                <p className="text-sm text-gray-700">
                  Larger down payments reduce lender risk. 20% down avoids PMI. Lenders also want 
                  to see 2-6 months of reserves (savings to cover payments if income is interrupted).
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">4. Collateral (Property Value)</h3>
                <p className="text-sm text-gray-700">
                  The home must appraise at or above your purchase price. Lenders use LTV (Loan-to-Value) 
                  ratio. Higher LTV means more risk and potentially higher rates or PMI requirements.
                </p>
              </div>
            </div>

            <p className="text-gray-700">
              Employment history matters too—lenders prefer 2+ years of stable employment, especially 
              in the same field. Self-employed borrowers need 2 years of tax returns showing consistent income.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Percent className="w-6 h-6 text-orange-500" />
              Why APR Matters More Than Interest Rate
            </h2>
            <p className="text-gray-700 mb-4">
              You&apos;ll see two rates when shopping for mortgages: the interest rate and the APR. 
              Here&apos;s the crucial difference:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Interest Rate</h3>
                <p className="text-sm text-gray-700">
                  The cost of borrowing the principal only. A 6.5% interest rate means you pay 
                  6.5% of your loan balance annually in interest charges.
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <h3 className="font-semibold text-orange-800 mb-2">APR (Annual Percentage Rate)</h3>
                <p className="text-sm text-gray-700">
                  The true annual cost including fees, points, and other charges. APR is always 
                  higher than the interest rate and is the better comparison tool.
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Example:</strong> Loan A offers 6.25% interest with $8,000 in fees. Loan B 
              offers 6.5% interest with $2,000 in fees. Despite the lower interest rate, Loan A 
              might have a higher APR and cost more over time.
            </p>
            <p className="text-gray-700">
              When using our <Link href="/tools/loan-estimator-home" className="text-orange-600 hover:underline">home loan estimator</Link>, 
              enter the APR rather than just the interest rate for more accurate total cost estimates.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              Closing Costs Overview
            </h2>
            <p className="text-gray-700 mb-4">
              Closing costs are fees paid when finalizing your mortgage, typically 2-5% of the 
              loan amount. On a $300,000 loan, expect $6,000-$15,000 in closing costs.
            </p>
            
            <h3 className="font-semibold text-gray-900 mb-3">Common Closing Costs:</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold text-gray-900">Fee Type</th>
                    <th className="text-left py-2 font-semibold text-gray-900">Typical Cost</th>
                    <th className="text-left py-2 font-semibold text-gray-900">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Origination Fee</td>
                    <td className="py-2">0.5-1% of loan</td>
                    <td className="py-2">Lender processing fee</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Appraisal</td>
                    <td className="py-2">$300-$600</td>
                    <td className="py-2">Professional home valuation</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Title Insurance</td>
                    <td className="py-2">$500-$3,000</td>
                    <td className="py-2">Protects against ownership disputes</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Home Inspection</td>
                    <td className="py-2">$300-$500</td>
                    <td className="py-2">Identifies property issues</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Recording Fees</td>
                    <td className="py-2">$50-$250</td>
                    <td className="py-2">Government filing fees</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Attorney Fees</td>
                    <td className="py-2">$500-$1,500</td>
                    <td className="py-2">Required in some states</td>
                  </tr>
                  <tr>
                    <td className="py-2">Prepaid Items</td>
                    <td className="py-2">Varies</td>
                    <td className="py-2">Initial escrow for taxes/insurance</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-gray-700 mb-4">
              <strong>Negotiation tip:</strong> Many closing costs are negotiable. Ask sellers 
              to contribute toward closing costs, or request lender credits in exchange for a 
              slightly higher interest rate.
            </p>
            <p className="text-gray-700">
              Learn about different loan types that may have lower closing costs in our 
              <Link href="/mbb/mortgage-types-explained" className="text-orange-600 hover:underline ml-1">mortgage types explained</Link> guide.
            </p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6 mb-8 border border-orange-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ready to Estimate Your Home Loan?</h2>
            <p className="text-gray-700 mb-4">
              Now that you understand the basics, use our free calculator to estimate your 
              monthly payments, total interest, and overall home buying costs.
            </p>
            <Link 
              href="/tools/loan-estimator-home"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
            >
              <Home className="w-5 h-5" />
              Use the Home Loan Estimator
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
              href="/mbb/mortgage-types-explained"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <FileText className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Mortgage Types Explained</p>
                <p className="text-sm text-gray-500">Fixed, ARM, FHA, VA compared</p>
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
