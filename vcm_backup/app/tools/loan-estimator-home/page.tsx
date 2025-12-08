'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Calculator, 
  DollarSign, 
  Percent, 
  Calendar,
  Shield,
  Building,
  RotateCcw,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  PiggyBank,
  HelpCircle,
  FileText
} from 'lucide-react';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';

interface LoanResults {
  loanAmount: number;
  monthlyMortgage: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  totalMonthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  numberOfPayments: number;
}

export default function LoanEstimatorHomePage() {
  const [homePrice, setHomePrice] = useState('350000');
  const [downPayment, setDownPayment] = useState('70000');
  const [downPaymentType, setDownPaymentType] = useState<'dollar' | 'percent'>('dollar');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestRate, setInterestRate] = useState('6.5');
  const [propertyTax, setPropertyTax] = useState('4200');
  const [homeInsurance, setHomeInsurance] = useState('1800');
  const [hoaFees, setHoaFees] = useState('0');
  
  const [results, setResults] = useState<LoanResults | null>(null);
  const [error, setError] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatCurrencyDetailed = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const validateInputs = (): boolean => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const term = parseInt(loanTerm);
    const rate = parseFloat(interestRate);
    const tax = parseFloat(propertyTax) || 0;
    const insurance = parseFloat(homeInsurance) || 0;
    const hoa = parseFloat(hoaFees) || 0;

    if (isNaN(price) || price < 10000) {
      setError('Home price must be at least $10,000');
      return false;
    }
    if (isNaN(down) || down < 0) {
      setError('Down payment must be 0 or greater');
      return false;
    }
    
    const actualDownPayment = downPaymentType === 'percent' 
      ? (price * down / 100) 
      : down;
    
    if (actualDownPayment >= price) {
      setError('Down payment must be less than home price');
      return false;
    }
    if (![15, 20, 30].includes(term)) {
      setError('Loan term must be 15, 20, or 30 years');
      return false;
    }
    if (isNaN(rate) || rate < 0.5 || rate > 20) {
      setError('Interest rate must be between 0.5% and 20%');
      return false;
    }
    if (tax < 0 || insurance < 0 || hoa < 0) {
      setError('Taxes, insurance, and HOA cannot be negative');
      return false;
    }

    setError('');
    return true;
  };

  const calculateLoan = () => {
    if (!validateInputs()) return;

    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const term = parseInt(loanTerm);
    const rate = parseFloat(interestRate);
    const tax = parseFloat(propertyTax) || 0;
    const insurance = parseFloat(homeInsurance) || 0;
    const hoa = parseFloat(hoaFees) || 0;

    const actualDownPayment = downPaymentType === 'percent' 
      ? (price * down / 100) 
      : down;

    const loanAmount = price - actualDownPayment;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;

    let monthlyMortgage: number;
    if (monthlyRate === 0) {
      monthlyMortgage = loanAmount / numberOfPayments;
    } else {
      const compoundFactor = Math.pow(1 + monthlyRate, numberOfPayments);
      monthlyMortgage = (loanAmount * monthlyRate * compoundFactor) / (compoundFactor - 1);
    }

    const monthlyTaxes = tax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyHOA = hoa;

    const totalMonthlyPayment = monthlyMortgage + monthlyTaxes + monthlyInsurance + monthlyHOA;
    const totalMortgagePayments = monthlyMortgage * numberOfPayments;
    const totalInterest = totalMortgagePayments - loanAmount;
    
    const totalTaxes = tax * term;
    const totalInsurance = insurance * term;
    const totalHOA = hoa * 12 * term;
    const totalCost = totalMortgagePayments + totalTaxes + totalInsurance + totalHOA;

    setResults({
      loanAmount,
      monthlyMortgage,
      monthlyTaxes,
      monthlyInsurance,
      monthlyHOA,
      totalMonthlyPayment,
      totalInterest,
      totalCost,
      numberOfPayments
    });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const resetCalculator = () => {
    setHomePrice('350000');
    setDownPayment('70000');
    setDownPaymentType('dollar');
    setLoanTerm('30');
    setInterestRate('6.5');
    setPropertyTax('4200');
    setHomeInsurance('1800');
    setHoaFees('0');
    setResults(null);
    setError('');
  };

  const faqs = [
    {
      question: "How accurate is this loan estimator home tool?",
      answer: "This loan estimator home calculator provides close estimates based on standard mortgage formulas. Actual payments may vary based on your credit score, lender fees, PMI requirements, and local tax rates. Use this as a starting point for budgeting."
    },
    {
      question: "What is included in a monthly mortgage payment?",
      answer: "A typical monthly mortgage payment includes principal (the loan amount you're paying back), interest (cost of borrowing), property taxes, homeowner's insurance, and sometimes HOA fees. This is often called PITI - Principal, Interest, Taxes, and Insurance."
    },
    {
      question: "How much down payment do I need for a home loan?",
      answer: "Down payment requirements vary. Conventional loans typically require 3-20%, FHA loans require 3.5%, and VA loans may require 0%. A larger down payment reduces your monthly payment and may help you avoid PMI (Private Mortgage Insurance)."
    },
    {
      question: "What is a good interest rate for a home loan?",
      answer: "Interest rates fluctuate with market conditions. As of recent years, rates between 6-7% are common. Your personal rate depends on credit score, down payment, loan type, and market conditions. Even a 0.5% difference significantly impacts total cost."
    },
    {
      question: "Should I choose a 15-year or 30-year mortgage?",
      answer: "A 15-year mortgage has higher monthly payments but saves substantial interest over time. A 30-year mortgage has lower monthly payments but costs more in total interest. Choose based on your budget and financial goals."
    },
    {
      question: "What is PMI and when do I need it?",
      answer: "PMI (Private Mortgage Insurance) is typically required when your down payment is less than 20% of the home's value. It protects the lender if you default. PMI usually costs 0.5-1% of the loan amount annually and can be removed once you reach 20% equity."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MonetizationBar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Home className="w-4 h-4" />
            Free Mortgage Calculator
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Loan Estimator Home – Free Home Loan Payment Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use this <strong>loan estimator home</strong> tool to calculate your monthly mortgage payment, 
            total interest, and overall cost. Get accurate estimates for your home buying budget 
            including taxes, insurance, and HOA fees.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              Loan Estimator Home Calculator
            </h2>
            <button
              onClick={resetCalculator}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Home className="w-4 h-4 inline mr-1" />
                Home Price ($)
              </label>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="350000"
                min="10000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Down Payment
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="70000"
                  min="0"
                />
                <select
                  value={downPaymentType}
                  onChange={(e) => setDownPaymentType(e.target.value as 'dollar' | 'percent')}
                  className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                >
                  <option value="dollar">$</option>
                  <option value="percent">%</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Loan Term (Years)
              </label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
              >
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
                <option value="30">30 Years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Percent className="w-4 h-4 inline mr-1" />
                Interest Rate (APR %)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="6.5"
                min="0.5"
                max="20"
                step="0.125"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-1" />
                Property Tax ($/Year)
              </label>
              <input
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="4200"
                min="0"
              />
              <p className="mt-1 text-xs text-gray-500">Optional - leave 0 if unknown</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Shield className="w-4 h-4 inline mr-1" />
                Home Insurance ($/Year)
              </label>
              <input
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="1800"
                min="0"
              />
              <p className="mt-1 text-xs text-gray-500">Optional - leave 0 if unknown</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building className="w-4 h-4 inline mr-1" />
                HOA Fees ($/Month)
              </label>
              <input
                type="number"
                value={hoaFees}
                onChange={(e) => setHoaFees(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="0"
                min="0"
              />
              <p className="mt-1 text-xs text-gray-500">Optional - enter 0 if no HOA</p>
            </div>
          </div>

          <button
            onClick={calculateLoan}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate Home Loan Payment
          </button>
        </div>

        {results && (
          <div ref={resultsRef} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Estimated Monthly Home Loan Payment
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <p className="text-sm text-gray-600 mb-1">Total Monthly Payment</p>
                <p className="text-3xl font-bold text-orange-600">{formatCurrencyDetailed(results.totalMonthlyPayment)}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Loan Amount</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(results.loanAmount)}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Principal & Interest</span>
                <span className="font-semibold text-gray-900">{formatCurrencyDetailed(results.monthlyMortgage)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Property Taxes</span>
                <span className="font-semibold text-gray-900">{formatCurrencyDetailed(results.monthlyTaxes)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Home Insurance</span>
                <span className="font-semibold text-gray-900">{formatCurrencyDetailed(results.monthlyInsurance)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">HOA Fees</span>
                <span className="font-semibold text-gray-900">{formatCurrencyDetailed(results.monthlyHOA)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <p className="text-sm text-gray-600 mb-1">Total Interest Paid</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(results.totalInterest)}</p>
                <p className="text-xs text-gray-500 mt-1">Over {results.numberOfPayments} payments</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Total Cost of Ownership</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.totalCost)}</p>
                <p className="text-xs text-gray-500 mt-1">Including taxes, insurance, HOA</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
              <strong>Note:</strong> These are estimates only and may vary based on lender, credit score, 
              PMI requirements, and location. Consult with a mortgage professional for personalized rates.
            </div>
          </div>
        )}

        {results && <PostResultUpsell />}

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <PiggyBank className="w-5 h-5 text-orange-500" />
            More Free Finance Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/tools/401k-retirement-calculator" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
              <TrendingUp className="w-8 h-8 text-orange-500" />
              <div>
                <p className="font-medium text-gray-900">401k Retirement Calculator</p>
                <p className="text-sm text-gray-500">Estimate retirement savings</p>
              </div>
            </Link>
            <Link href="/tools/calorie-counter-maintenance" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
              <Calculator className="w-8 h-8 text-orange-500" />
              <div>
                <p className="font-medium text-gray-900">TDEE Calculator</p>
                <p className="text-sm text-gray-500">Daily calorie needs</p>
              </div>
            </Link>
            <Link href="/tools/ups-shipping-cost" className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
              <DollarSign className="w-8 h-8 text-orange-500" />
              <div>
                <p className="font-medium text-gray-900">UPS Shipping Cost</p>
                <p className="text-sm text-gray-500">Estimate shipping rates</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-orange-500" />
            How to Estimate Your Home Loan Payment
          </h2>
          <p>
            Using a <strong>loan estimator home</strong> calculator helps you understand what you can afford 
            before shopping for homes. Here&apos;s what affects your monthly payment:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Down Payment:</strong> The more you put down, the lower your monthly payment and potentially your interest rate. A 20% down payment also eliminates PMI.</li>
            <li><strong>Interest Rate (APR):</strong> Even small rate differences compound significantly over a 30-year loan. A 0.5% lower rate on a $280,000 loan saves over $30,000 in interest.</li>
            <li><strong>Loan Term:</strong> Shorter terms mean higher monthly payments but substantial interest savings. A 15-year loan typically has lower rates than a 30-year.</li>
            <li><strong>Property Taxes:</strong> These vary significantly by location and are typically 0.5-2.5% of home value annually.</li>
            <li><strong>Insurance:</strong> Homeowner&apos;s insurance protects your investment and is required by lenders. Costs vary by location, home age, and coverage level.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            What Affects Your Home Loan Cost?
          </h2>
          <p>
            Beyond the basic loan terms, several factors determine your total mortgage cost:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Credit Score:</strong> Higher scores qualify for better rates. A score above 740 typically gets the best rates, while scores below 620 may struggle to qualify.</li>
            <li><strong>Debt-to-Income Ratio:</strong> Lenders prefer your total monthly debts (including the new mortgage) to be under 43% of gross income.</li>
            <li><strong>Loan Type:</strong> Conventional, FHA, VA, and USDA loans each have different requirements and rates. Learn more in our <Link href="/mbb/mortgage-types-explained" className="text-orange-600 hover:underline">mortgage types guide</Link>.</li>
            <li><strong>Closing Costs:</strong> Expect to pay 2-5% of the loan amount in closing costs. Read our <Link href="/mbb/home-loan-basics" className="text-orange-600 hover:underline">home loan basics article</Link> for details.</li>
            <li><strong>Private Mortgage Insurance (PMI):</strong> Required if your down payment is less than 20%, typically adding 0.5-1% of loan value annually.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Monthly Mortgage Formula (Simplified)
          </h2>
          <p>
            This loan estimator uses the standard amortization formula:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg my-4 font-mono text-sm">
            <p>M = P × [r(1+r)^n] / [(1+r)^n – 1]</p>
            <p className="mt-2 text-gray-600">Where:</p>
            <ul className="text-gray-600 mt-1">
              <li>M = Monthly mortgage payment</li>
              <li>P = Principal (loan amount)</li>
              <li>r = Monthly interest rate (annual rate ÷ 12)</li>
              <li>n = Number of payments (years × 12)</li>
            </ul>
          </div>
          <p>
            Your total monthly payment adds property taxes, insurance, HOA fees, and any PMI to this base mortgage payment.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">
            Home Loan Estimator Example
          </h2>
          <p>
            Let&apos;s calculate a sample home loan:
          </p>
          <div className="bg-blue-50 p-4 rounded-lg my-4">
            <ul className="text-gray-700 space-y-1">
              <li><strong>Home Price:</strong> $400,000</li>
              <li><strong>Down Payment:</strong> $80,000 (20%)</li>
              <li><strong>Loan Amount:</strong> $320,000</li>
              <li><strong>Interest Rate:</strong> 6.5% APR</li>
              <li><strong>Loan Term:</strong> 30 years</li>
              <li><strong>Property Tax:</strong> $5,000/year</li>
              <li><strong>Insurance:</strong> $2,000/year</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <p><strong>Monthly Principal & Interest:</strong> $2,022.63</p>
              <p><strong>Monthly Taxes:</strong> $416.67</p>
              <p><strong>Monthly Insurance:</strong> $166.67</p>
              <p className="text-lg font-bold text-blue-800 mt-2"><strong>Total Monthly Payment:</strong> $2,605.97</p>
              <p className="mt-2"><strong>Total Interest Over 30 Years:</strong> $408,146</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-500" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/mbb/home-loan-basics"
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <FileText className="w-6 h-6 text-orange-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Home Loan Basics</p>
                <p className="text-sm text-gray-500">How home loans really work</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
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
              <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            This loan estimator home tool is for educational purposes only. 
            Consult with a licensed mortgage professional for personalized advice.
          </p>
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
