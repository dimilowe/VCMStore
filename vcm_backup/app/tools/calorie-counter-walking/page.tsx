'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { 
  Footprints,
  Flame,
  Calculator,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RotateCcw,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Scale,
  Zap,
  Activity,
  TrendingUp,
  Heart,
  Target,
  BookOpen
} from 'lucide-react';
import ExploreMoreTools from '@/components/ExploreMoreTools';
import PostResultUpsell from '@/components/PostResultUpsell';
import MonetizationBar from '@/components/MonetizationBar';

interface CalculationResult {
  calories: number;
  distanceKm: number;
  distanceMiles: number;
  paceKmh: number;
  duration: number;
  intensity: string;
  weight: number;
}

const MET_VALUES = {
  easy: { label: 'Easy walk (~3 km/h)', met: 2.5, speedKmh: 3 },
  normal: { label: 'Normal walk (~4.5 km/h)', met: 3.3, speedKmh: 4.5 },
  brisk: { label: 'Brisk walk (~6 km/h)', met: 4.3, speedKmh: 6 },
  power: { label: 'Power walk (~7 km/h)', met: 5.0, speedKmh: 7 },
};

const BASELINE_WEIGHT_KG = 70;

const CALORIE_TABLE = [
  { minutes: 15, easy: 33, normal: 43, brisk: 56, power: 66 },
  { minutes: 30, easy: 66, normal: 87, brisk: 113, power: 131 },
  { minutes: 45, easy: 98, normal: 130, brisk: 169, power: 197 },
  { minutes: 60, easy: 131, normal: 173, brisk: 225, power: 263 },
];

const faqs = [
  {
    q: "Is walking 10,000 steps enough to lose weight?",
    a: "Walking 10,000 steps burns approximately 400-500 calories for an average person. Combined with a slight calorie deficit in your diet, this can definitely contribute to weight loss. However, weight loss depends on your overall calorie balance—if you're eating more than you burn, even 10,000 steps won't help. Use our calorie counter walking tool to track your burn."
  },
  {
    q: "Do hills and inclines increase calories burned?",
    a: "Yes, significantly! Walking uphill can increase calorie burn by 50% or more compared to flat terrain. Inclines engage more muscle groups (glutes, hamstrings, calves) and require more effort. Our calculator provides estimates for flat walking—add 30-50% for hilly terrain."
  },
  {
    q: "Is brisk walking as good as running for weight loss?",
    a: "Brisk walking is excellent for weight loss and has advantages over running: lower injury risk, easier to sustain long-term, and still burns substantial calories. A 60-minute brisk walk burns about 225 calories (70kg person), while running burns more per minute but is harder to maintain. Consistency matters most."
  },
  {
    q: "Do I need a fitness tracker to estimate calories?",
    a: "No! While fitness trackers are convenient, you can accurately estimate calories using time, speed, and weight—exactly what this calorie counter walking tool does. Trackers often overestimate calories anyway. Knowing your walking duration and intensity gives you reliable estimates."
  },
  {
    q: "How accurate is this calorie counter walking tool?",
    a: "This calculator uses the scientifically-validated MET (Metabolic Equivalent of Task) formula used by researchers and health organizations. While individual variations exist (metabolism, fitness level, terrain), our estimates are within 10-15% of actual burn for most people."
  }
];

export default function CalorieCounterWalkingPage() {
  const [duration, setDuration] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [intensity, setIntensity] = useState<keyof typeof MET_VALUES>('normal');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [durationError, setDurationError] = useState<string | null>(null);
  const [weightError, setWeightError] = useState<string | null>(null);
  const [showFaq, setShowFaq] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculateCalories = () => {
    setDurationError(null);
    setWeightError(null);
    setResult(null);

    const durationNum = parseInt(duration, 10);
    
    if (!duration || isNaN(durationNum) || durationNum < 1) {
      setDurationError('Please enter walking duration (at least 1 minute)');
      return;
    }

    if (durationNum > 600) {
      setDurationError('Duration must be less than 600 minutes');
      return;
    }

    let weightKg = BASELINE_WEIGHT_KG;
    if (weight) {
      const weightNum = parseFloat(weight);
      if (isNaN(weightNum) || weightNum <= 0) {
        setWeightError('Please enter a valid weight');
        return;
      }
      if (weightNum > 300) {
        setWeightError('Weight must be less than 300 kg');
        return;
      }
      weightKg = weightUnit === 'lb' ? weightNum * 0.453592 : weightNum;
    }

    const metData = MET_VALUES[intensity];
    const calories = Math.round((metData.met * 3.5 * weightKg / 200) * durationNum);
    const distanceKm = (metData.speedKmh * durationNum) / 60;
    const distanceMiles = distanceKm * 0.621371;

    setResult({
      calories,
      distanceKm: Math.round(distanceKm * 100) / 100,
      distanceMiles: Math.round(distanceMiles * 100) / 100,
      paceKmh: metData.speedKmh,
      duration: durationNum,
      intensity: metData.label,
      weight: weightKg,
    });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const resetForm = () => {
    setDuration('');
    setWeight('');
    setWeightUnit('kg');
    setIntensity('normal');
    setResult(null);
    setDurationError(null);
    setWeightError(null);
  };

  const faqSchema = {
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
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/clusters/health-fitness-calculators" className="hover:text-orange-600">Health & Fitness Calculators</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Calorie Counter Walking</span>
          </nav>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
              <Footprints className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Calorie Counter Walking – Calculate Calories Burned Walking
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use this free <strong>calorie counter walking</strong> tool to estimate how many calories you burn during your walks. Enter your walking time, weight, and pace to get instant results.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calculator className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Walking Calorie Calculator</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Walking Duration (minutes) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 30"
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                      durationError ? 'border-red-300 bg-red-50' : 'border-gray-200'
                    }`}
                    min="1"
                    max="600"
                  />
                </div>
                {durationError && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {durationError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Weight (optional, defaults to 70 kg)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g., 70"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all ${
                        weightError ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                      min="1"
                      max="300"
                    />
                  </div>
                  <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setWeightUnit('kg')}
                      className={`px-4 py-3 text-sm font-medium transition-all ${
                        weightUnit === 'kg'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      kg
                    </button>
                    <button
                      type="button"
                      onClick={() => setWeightUnit('lb')}
                      className={`px-4 py-3 text-sm font-medium transition-all ${
                        weightUnit === 'lb'
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      lb
                    </button>
                  </div>
                </div>
                {weightError && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {weightError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Walking Speed / Intensity
                </label>
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value as keyof typeof MET_VALUES)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white cursor-pointer"
                  >
                    {Object.entries(MET_VALUES).map(([key, data]) => (
                      <option key={key} value={key}>
                        {data.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={calculateCalories}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Flame className="w-5 h-5" />
                  Calculate Calories
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {result && (
            <div ref={resultRef} className="mb-8">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 sm:p-8 text-white mb-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Flame className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">Your Walking Results</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl sm:text-4xl font-bold mb-1">{result.calories}</div>
                    <div className="text-white/80 text-sm">Calories Burned</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl sm:text-4xl font-bold mb-1">{result.distanceKm}</div>
                    <div className="text-white/80 text-sm">km ({result.distanceMiles} miles)</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl sm:text-4xl font-bold mb-1">{result.paceKmh}</div>
                    <div className="text-white/80 text-sm">km/h pace</div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 text-sm">
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <span><strong>Duration:</strong> {result.duration} min</span>
                    <span><strong>Intensity:</strong> {result.intensity}</span>
                    <span><strong>Weight:</strong> {Math.round(result.weight)} kg</span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-white/60 text-center">
                  These are estimated values based on MET calculations. Actual calories may vary based on individual factors.
                </p>
              </div>

              <PostResultUpsell />
            </div>
          )}

          <div className="prose prose-gray max-w-none">
            
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                How Many Calories Do You Burn Walking?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The number of calories you burn while walking depends on several key factors: your body weight, walking speed, duration, and terrain. A heavier person burns more calories than a lighter person covering the same distance because more energy is required to move a larger body mass.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Walking speed dramatically affects calorie burn. A leisurely stroll at 3 km/h might burn around 130 calories per hour for a 70kg person, while a brisk 6 km/h walk burns approximately 225 calories—nearly double! This is why our <strong>calorie counter walking</strong> calculator includes intensity settings.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Inclines and terrain also matter. Walking uphill engages more muscle groups (particularly your glutes and hamstrings) and can increase calorie burn by 50% or more. Even slight inclines add up over a long walk.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                Calories Burned Walking by Time and Speed
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The table below shows estimated calories burned for a 70kg (154 lb) person at different walking durations and intensities. Use our walking calorie calculator above for personalized results based on your weight.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Duration</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Easy (3 km/h)</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Normal (4.5 km/h)</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Brisk (6 km/h)</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Power (7 km/h)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {CALORIE_TABLE.map((row) => (
                      <tr key={row.minutes} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.minutes} min</td>
                        <td className="px-4 py-3 text-sm text-center text-gray-700">{row.easy} kcal</td>
                        <td className="px-4 py-3 text-sm text-center text-gray-700">{row.normal} kcal</td>
                        <td className="px-4 py-3 text-sm text-center text-gray-700">{row.brisk} kcal</td>
                        <td className="px-4 py-3 text-sm text-center text-gray-700">{row.power} kcal</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-orange-500" />
                Walking Calories Formula (Step-by-Step)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our calorie counter walking tool uses the MET (Metabolic Equivalent of Task) formula, which is the same method used by researchers and fitness professionals worldwide:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 mb-4 border border-gray-200">
                <code className="text-lg font-mono text-gray-800">
                  Calories = MET × 3.5 × Weight (kg) / 200 × Minutes
                </code>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>MET values for walking:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
                <li>Easy walk (~3 km/h): MET = 2.5</li>
                <li>Normal walk (~4.5 km/h): MET = 3.3</li>
                <li>Brisk walk (~6 km/h): MET = 4.3</li>
                <li>Power walk (~7 km/h): MET = 5.0</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Example calculation:</strong> A 70kg person brisk walking for 30 minutes:
              </p>
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                <p className="text-gray-800">
                  Calories = 4.3 × 3.5 × 70 / 200 × 30 = <strong>158 kcal</strong>
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Footprints className="w-6 h-6 text-orange-500" />
                Steps vs Minutes vs Distance
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Many people track their walking by steps using fitness trackers or smartphones. While step counting is convenient and motivating, time-based tracking with known speed is actually more accurate for calorie estimation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Here's why: step counts don't account for walking intensity. Someone taking 5,000 slow steps burns far fewer calories than someone taking 5,000 brisk steps. Our calorie counter walking tool uses duration and speed, which directly correlate to energy expenditure.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>General conversions (assuming average stride length):</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>1,000 steps ≈ 0.7-0.8 km (depending on stride)</li>
                <li>10,000 steps ≈ 7-8 km ≈ 60-90 minutes of walking</li>
                <li>30 minutes of brisk walking ≈ 3,000-4,000 steps</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                For step-based calorie tracking, try our <Link href="/tools/calorie-counter-steps" className="text-orange-600 hover:text-orange-700 underline">Calorie Counter Steps</Link> calculator.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-orange-500" />
                How Often Should You Use a Walking Calorie Counter?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Consistency is key when tracking calories burned from walking. We recommend using this calorie counter walking tool:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li><strong>Daily:</strong> If you're actively trying to lose weight, tracking each walk helps ensure you're hitting your calorie burn goals.</li>
                <li><strong>Weekly:</strong> Check in once a week to ensure your walking routine is on track. Aim for 150-300 minutes of moderate walking per week (WHO recommendation).</li>
                <li><strong>After changes:</strong> Whenever you increase duration, speed, or change routes, recalculate to see your new calorie burn.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Over time, you'll develop an intuition for how many calories different walks burn. But the calculator is always here when you need precise numbers for meal planning or weight loss tracking.
              </p>
            </section>

            <section className="mb-10">
              <div 
                className="flex items-center justify-between cursor-pointer bg-gray-50 rounded-xl p-4 border border-gray-200"
                onClick={() => setShowFaq(!showFaq)}
              >
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 m-0">
                  <BookOpen className="w-6 h-6 text-orange-500" />
                  FAQ – Walking and Calorie Burn
                </h2>
                {showFaq ? (
                  <ChevronUp className="w-6 h-6 text-gray-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                )}
              </div>
              
              {showFaq && (
                <div className="mt-4 space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="bg-white rounded-2xl p-6 border border-gray-200 mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                Related Articles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  href="/articles/steps-vs-calories-walking"
                  className="group p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-2">Steps vs Calories: How Walking Translates Into Calorie Burn</h4>
                  <p className="text-sm text-gray-600">Learn the science behind converting your step count into actual calories burned.</p>
                </Link>
                <Link 
                  href="/articles/walking-for-fat-loss"
                  className="group p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-2">Walking for Fat Loss: How Many Calories Do You Really Burn?</h4>
                  <p className="text-sm text-gray-600">Discover the optimal walking strategy for sustainable fat loss and weight management.</p>
                </Link>
              </div>
            </section>

            <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                More Free Fitness Tools
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link 
                  href="/tools/calorie-counter-steps"
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all group"
                >
                  <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <Footprints className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Calorie Counter Steps</span>
                </Link>
                <Link 
                  href="/tools/calorie-deficit-calculator"
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all group"
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <Flame className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Calorie Deficit Calculator</span>
                </Link>
                <Link 
                  href="/tools"
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all group"
                >
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Explore All Tools</span>
                </Link>
              </div>
            </section>

          </div>

          <ExploreMoreTools currentTool="Calorie Counter Walking" />

        </div>
        
        <MonetizationBar />
      </div>
    </>
  );
}
