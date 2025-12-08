'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Calculator,
  DollarSign,
  TrendingUp,
  Calendar,
  Briefcase,
  PiggyBank,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  ArrowRight,
  Target,
  Clock,
  Award,
  Users,
  AlertCircle,
  CheckCircle,
  Percent,
  BadgeDollarSign
} from 'lucide-react';
import ExploreMoreTools from '@/components/ExploreMoreTools';
import PostResultUpsell from '@/components/PostResultUpsell';
import MonetizationBar from '@/components/MonetizationBar';

interface YearProjection {
  year: number;
  age: number;
  salary: number;
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  endBalance: number;
}

interface Results {
  finalBalance: number;
  totalContributions: number;
  totalGrowth: number;
  startingBalance: number;
  rows: YearProjection[];
}

const faqs = [
  {
    q: "How accurate is this 401k retirement estimator?",
    a: "This calculator provides a reasonable projection based on consistent annual contributions and average market returns. Real-world results vary based on market volatility, contribution timing, fees, and other factors. Use this to estimate 401k at retirement as a planning baseline, then adjust for your specific situation."
  },
  {
    q: "What annual return should I assume for my 401k?",
    a: "Historically, a diversified stock/bond portfolio has returned 6-8% annually after adjusting for inflation. The default 7% is a moderate estimate. If you're younger and more aggressive, you might use 8%. If you're more conservative or near retirement, consider 5-6%."
  },
  {
    q: "Does this include employer matching?",
    a: "Yes! You can enter your employer match percentage. Most companies match 50-100% of your contributions up to 3-6% of salary. If your employer matches 50% up to 6%, and you contribute 6%, enter 3% as your employer match."
  },
  {
    q: "Should I max out my 401k contributions?",
    a: "At minimum, contribute enough to get your full employer match (it's free money). Beyond that, maxing out depends on your other financial goals. The 2024 contribution limit is $23,000 ($30,500 if 50+). If you can afford it, maximizing your 401k provides significant tax advantages."
  },
  {
    q: "What about taxes on my 401k?",
    a: "Traditional 401k contributions are pre-tax, meaning you'll pay income tax when you withdraw in retirement. Roth 401k contributions are after-tax, but withdrawals are tax-free. This calculator shows pre-tax balances. Actual take-home will depend on your retirement tax bracket."
  },
  {
    q: "How does compound growth affect my 401k?",
    a: "Compound growth is powerful because your returns generate their own returns. Starting early matters enormously. Someone who invests $6,000/year from age 25-35 and stops can end up with more than someone who starts at 35 and invests $6,000/year until 65, because of compounding."
  },
  {
    q: "What if I change jobs before retirement?",
    a: "When you leave a job, you can usually roll your 401k into an IRA or your new employer's plan without tax penalty. This calculator assumes consistent contributions, but you can re-run it with updated numbers whenever your situation changes."
  },
  {
    q: "Does this account for 401k fees?",
    a: "No, this calculator uses the gross return rate you enter. 401k plans typically have fees of 0.5-2% annually, which reduce your effective return. If your expected return is 7% but fees are 1%, use 6% as your expected return for more accurate estimates."
  }
];

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentBalance, setCurrentBalance] = useState('10000');
  const [annualSalary, setAnnualSalary] = useState('75000');
  const [employeeContribution, setEmployeeContribution] = useState('6');
  const [employerMatch, setEmployerMatch] = useState('3');
  const [expectedReturn, setExpectedReturn] = useState('7');
  const [salaryGrowth, setSalaryGrowth] = useState('2');
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllYears, setShowAllYears] = useState(false);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const validateInputs = (): boolean => {
    const age = parseInt(currentAge);
    const retirement = parseInt(retirementAge);
    const balance = parseFloat(currentBalance);
    const salary = parseFloat(annualSalary);
    const empContrib = parseFloat(employeeContribution);
    const empMatch = parseFloat(employerMatch);
    const returnRate = parseFloat(expectedReturn);
    const salaryGrowthRate = parseFloat(salaryGrowth);

    if (isNaN(age) || age < 18 || age > 80) {
      setError('Current age must be between 18 and 80');
      return false;
    }
    if (isNaN(retirement) || retirement < 50 || retirement > 80) {
      setError('Retirement age must be between 50 and 80');
      return false;
    }
    if (age >= retirement) {
      setError('Current age must be less than retirement age');
      return false;
    }
    if (isNaN(balance) || balance < 0) {
      setError('Current balance must be 0 or greater');
      return false;
    }
    if (isNaN(salary) || salary < 0) {
      setError('Annual salary must be 0 or greater');
      return false;
    }
    if (isNaN(empContrib) || empContrib < 0 || empContrib > 100) {
      setError('Employee contribution must be between 0 and 100%');
      return false;
    }
    if (isNaN(empMatch) || empMatch < 0 || empMatch > 100) {
      setError('Employer match must be between 0 and 100%');
      return false;
    }
    if (isNaN(returnRate) || returnRate < -10 || returnRate > 20) {
      setError('Expected return must be between -10% and 20%');
      return false;
    }
    if (isNaN(salaryGrowthRate) || salaryGrowthRate < 0 || salaryGrowthRate > 20) {
      setError('Salary growth must be between 0% and 20%');
      return false;
    }

    setError('');
    return true;
  };

  const calculate401k = () => {
    if (!validateInputs()) return;

    const age = parseInt(currentAge);
    const retirement = parseInt(retirementAge);
    const startBalance = parseFloat(currentBalance);
    const startSalary = parseFloat(annualSalary);
    const empContribRate = parseFloat(employeeContribution) / 100;
    const empMatchRate = parseFloat(employerMatch) / 100;
    const annualReturnRate = parseFloat(expectedReturn) / 100;
    const salaryGrowthRate = parseFloat(salaryGrowth) / 100;

    const yearsToInvest = retirement - age;
    let balance = startBalance;
    let salary = startSalary;
    let totalContributions = 0;
    const rows: YearProjection[] = [];

    for (let i = 1; i <= yearsToInvest; i++) {
      const yearEmployeeContrib = salary * empContribRate;
      const effectiveMatchRate = Math.min(empMatchRate, empContribRate);
      const yearEmployerContrib = salary * effectiveMatchRate;
      const yearTotalContrib = yearEmployeeContrib + yearEmployerContrib;

      balance = balance * (1 + annualReturnRate);
      balance += yearTotalContrib;
      totalContributions += yearTotalContrib;

      rows.push({
        year: i,
        age: age + i,
        salary: Math.round(salary),
        employeeContribution: Math.round(yearEmployeeContrib),
        employerContribution: Math.round(yearEmployerContrib),
        totalContribution: Math.round(yearTotalContrib),
        endBalance: Math.round(balance)
      });

      salary = salary * (1 + salaryGrowthRate);
    }

    const finalBalance = balance;
    const totalGrowth = finalBalance - totalContributions - startBalance;

    setResults({
      finalBalance: Math.round(finalBalance),
      totalContributions: Math.round(totalContributions),
      totalGrowth: Math.round(totalGrowth),
      startingBalance: Math.round(startBalance),
      rows
    });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const resetCalculator = () => {
    setCurrentAge('30');
    setRetirementAge('65');
    setCurrentBalance('10000');
    setAnnualSalary('75000');
    setEmployeeContribution('6');
    setEmployerMatch('3');
    setExpectedReturn('7');
    setSalaryGrowth('2');
    setResults(null);
    setError('');
    setShowAllYears(false);
  };

  const displayedRows = results ? (showAllYears ? results.rows : results.rows.slice(0, 10)) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MonetizationBar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <PiggyBank className="w-4 h-4" />
            Free 401k Calculator
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            401k Retirement Estimator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <strong>Estimate 401k at retirement</strong> based on your current savings, contributions, 
            employer match, and expected returns. See a year-by-year projection of how your 401k 
            will grow until you retire.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              Estimate 401k at Retirement
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
                <Calendar className="w-4 h-4 inline mr-1" />
                Current Age
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="30"
                min="18"
                max="80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4 inline mr-1" />
                Retirement Age
              </label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="65"
                min="50"
                max="80"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Current 401k Balance ($)
              </label>
              <input
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="10000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Briefcase className="w-4 h-4 inline mr-1" />
                Annual Salary ($)
              </label>
              <input
                type="number"
                value={annualSalary}
                onChange={(e) => setAnnualSalary(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="75000"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Percent className="w-4 h-4 inline mr-1" />
                Your Contribution (% of Salary)
              </label>
              <input
                type="number"
                value={employeeContribution}
                onChange={(e) => setEmployeeContribution(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="6"
                min="0"
                max="100"
                step="0.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Employer Match (% of Salary)
              </label>
              <input
                type="number"
                value={employerMatch}
                onChange={(e) => setEmployerMatch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="3"
                min="0"
                max="100"
                step="0.5"
              />
              <p className="mt-1 text-xs text-gray-500">Capped at your contribution %</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="7"
                min="-10"
                max="20"
                step="0.5"
              />
              <p className="mt-1 text-xs text-gray-500">Historical average: 7-10%</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Award className="w-4 h-4 inline mr-1" />
                Annual Salary Growth (%)
              </label>
              <input
                type="number"
                value={salaryGrowth}
                onChange={(e) => setSalaryGrowth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="2"
                min="0"
                max="20"
                step="0.5"
              />
              <p className="mt-1 text-xs text-gray-500">Typical: 2-4% annually</p>
            </div>
          </div>

          <button
            onClick={calculate401k}
            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            Calculate My 401k at Retirement
          </button>
        </div>

        {results && (
          <div ref={resultsRef} id="results" className="mb-8 scroll-mt-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Your 401k Projection Summary</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <BadgeDollarSign className="w-4 h-4" />
                    <span className="text-sm">Estimated Balance at {retirementAge}</span>
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(results.finalBalance)}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <PiggyBank className="w-4 h-4" />
                    <span className="text-sm">Total Contributions</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800">
                    {formatCurrency(results.totalContributions)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    + {formatCurrency(results.startingBalance)} starting balance
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-green-100">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">Investment Growth</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.totalGrowth)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Compound interest earned
                  </p>
                </div>
              </div>
            </div>

            <PostResultUpsell />

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Year-by-Year Projection
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-600">Year</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-600">Age</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-600">Salary</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-600">Your Contrib.</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-600">Employer</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-600">Total</th>
                      <th className="text-right py-3 px-2 font-semibold text-gray-600">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedRows.map((row, index) => (
                      <tr 
                        key={row.year} 
                        className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
                      >
                        <td className="py-2 px-2">{row.year}</td>
                        <td className="py-2 px-2">{row.age}</td>
                        <td className="py-2 px-2 text-right">{formatCurrency(row.salary)}</td>
                        <td className="py-2 px-2 text-right">{formatCurrency(row.employeeContribution)}</td>
                        <td className="py-2 px-2 text-right">{formatCurrency(row.employerContribution)}</td>
                        <td className="py-2 px-2 text-right font-medium">{formatCurrency(row.totalContribution)}</td>
                        <td className="py-2 px-2 text-right font-semibold text-green-600">{formatCurrency(row.endBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {results.rows.length > 10 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowAllYears(!showAllYears)}
                    className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1 mx-auto"
                  >
                    {showAllYears ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Show All {results.rows.length} Years
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <Link 
            href="/mbb/how-401k-compound-growth-works"
            className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-orange-200 transition-all group"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How We Estimate 401k at Retirement
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              This calculator uses standard compound interest formulas to project your 401k growth over time. 
              Here's how the calculation works:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Annual Compounding:</strong> Your existing balance grows by the expected return rate each year before new contributions are added.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>End-of-Year Contributions:</strong> For simplicity, we assume contributions are made at year-end (actual 401k contributions are typically per-paycheck, which slightly improves results).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Salary Growth:</strong> Your salary increases by the growth rate you specify each year, increasing your contribution amounts proportionally.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Employer Match:</strong> Your employer's contribution is calculated as a percentage of your salary and added to your balance each year.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Your 401k Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="font-semibold text-green-800 mb-2">Final Balance</h3>
              <p className="text-sm text-green-700">
                The estimated total value of your 401k at retirement. This is your starting balance 
                plus all contributions plus all investment growth.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 mb-2">Total Contributions</h3>
              <p className="text-sm text-blue-700">
                The sum of all your contributions plus your employer's matching contributions 
                over the years. This is money actually deposited into the account.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
              <h3 className="font-semibold text-purple-800 mb-2">Investment Growth</h3>
              <p className="text-sm text-purple-700">
                The compound interest earned on your investments. This is the "free" money 
                your 401k generates through market returns over time.
              </p>
            </div>
          </div>
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

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-12">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> This calculator provides estimates for educational purposes only. 
              Actual investment returns vary based on market conditions, fees, and other factors. 
              This is not financial advice. Consult a licensed financial advisor for personalized 
              retirement planning.
            </div>
          </div>
        </div>

        <ExploreMoreTools />
      </div>

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "401k Retirement Estimator",
            "description": "Free 401k calculator to estimate your retirement savings based on contributions, employer match, and expected returns.",
            "url": "https://vcmsuite.com/tools/401k-retirement-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
