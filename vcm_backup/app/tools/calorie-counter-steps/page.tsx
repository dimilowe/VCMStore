'use client';

import { useState, useRef, useEffect } from 'react';
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
  Heart
} from 'lucide-react';
import ExploreMoreTools from '@/components/ExploreMoreTools';
import PostResultUpsell from '@/components/PostResultUpsell';

interface CalculationResult {
  calories: number;
  distanceKm: number;
  distanceMiles: number;
  timeMinutes: number;
  intensity: string;
  steps: number;
  weight: number;
}

const INTENSITY_DATA = {
  easy: { label: 'Easy walk', caloriesPerStep: 0.035, speedKmh: 4 },
  normal: { label: 'Normal walk', caloriesPerStep: 0.04, speedKmh: 5 },
  brisk: { label: 'Brisk walk', caloriesPerStep: 0.05, speedKmh: 6 },
  jogging: { label: 'Jogging', caloriesPerStep: 0.065, speedKmh: 8 },
};

const STEP_LENGTH_M = 0.75;
const BASELINE_WEIGHT_KG = 70;
const MAX_STEPS = 150000;

const CONVERSION_CHART = [
  { steps: 1000, easy: 35, normal: 40, brisk: 50, jogging: 65 },
  { steps: 3000, easy: 105, normal: 120, brisk: 150, jogging: 195 },
  { steps: 5000, easy: 175, normal: 200, brisk: 250, jogging: 325 },
  { steps: 8000, easy: 280, normal: 320, brisk: 400, jogging: 520 },
  { steps: 10000, easy: 350, normal: 400, brisk: 500, jogging: 650 },
];

const faqs = [
  {
    q: "Do 10,000 steps really burn 500 calories?",
    a: "It depends on your weight and walking speed. A 70kg person walking at a normal pace burns about 400 calories for 10,000 steps. If you weigh more or walk briskly, you could burn 500+ calories. Use this calorie counter steps tool to get a personalized estimate."
  },
  {
    q: "Is it better to count calories or steps?",
    a: "Both have value! Steps are easier to track and encourage daily movement. Calories give you a direct link to weight management. This calorie counter steps calculator bridges both by converting your steps into estimated calories burned."
  },
  {
    q: "Can I lose weight just by walking more steps?",
    a: "Yes! Walking is one of the most sustainable forms of exercise. If you create a calorie deficit by burning more calories through steps than you consume, you'll lose weight. Most people can burn 300-500 extra calories daily by hitting 10,000 steps."
  },
  {
    q: "How accurate is a steps to calories calculator?",
    a: "This tool provides a reasonable estimate based on scientific averages. Actual calories burned vary based on your exact weight, stride length, terrain, temperature, and individual metabolism. Use this as a guide, not a precise measurement."
  },
  {
    q: "Does walking faster burn more calories per step?",
    a: "Yes! Walking faster (brisk walking or jogging) requires more energy per step. Our calorie counter steps tool accounts for this with different intensity levels. Brisk walking can burn 25-40% more calories than a slow, easy walk."
  },
  {
    q: "How many steps should I aim for to lose weight?",
    a: "Most research suggests 7,000-10,000 steps daily for weight management. However, the exact number depends on your diet and goals. Adding 2,000-3,000 steps to your current daily average is a good starting point for gradual weight loss."
  }
];

export default function CalorieCounterStepsPage() {
  const [steps, setSteps] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [intensity, setIntensity] = useState<keyof typeof INTENSITY_DATA>('normal');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [showFaq, setShowFaq] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const calculateCalories = () => {
    setError(null);
    setWarning(null);
    setResult(null);

    const stepsNum = parseInt(steps, 10);
    
    if (!steps || isNaN(stepsNum) || stepsNum < 1) {
      setError('Please enter a valid number of steps (at least 1)');
      return;
    }

    if (stepsNum > MAX_STEPS) {
      setWarning(`${stepsNum.toLocaleString()} steps is unusually high. Results are shown, but may be unrealistic.`);
    }

    let weightKg = BASELINE_WEIGHT_KG;
    if (weight) {
      const weightNum = parseFloat(weight);
      if (!isNaN(weightNum) && weightNum > 0) {
        weightKg = weightUnit === 'lb' ? weightNum * 0.453592 : weightNum;
      }
    }

    const intensityData = INTENSITY_DATA[intensity];
    const weightMultiplier = weightKg / BASELINE_WEIGHT_KG;
    const caloriesPerStep = intensityData.caloriesPerStep * weightMultiplier;
    const calories = Math.round(stepsNum * caloriesPerStep);

    const distanceKm = (stepsNum * STEP_LENGTH_M) / 1000;
    const distanceMiles = distanceKm * 0.621371;
    const timeMinutes = Math.round((distanceKm / intensityData.speedKmh) * 60);

    setResult({
      calories,
      distanceKm: Math.round(distanceKm * 100) / 100,
      distanceMiles: Math.round(distanceMiles * 100) / 100,
      timeMinutes,
      intensity: intensityData.label,
      steps: stepsNum,
      weight: Math.round(weightKg * 10) / 10,
    });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const resetForm = () => {
    setSteps('');
    setWeight('');
    setWeightUnit('kg');
    setIntensity('normal');
    setResult(null);
    setError(null);
    setWarning(null);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Calorie Counter Steps Calculator',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Web',
        description: 'Free calorie counter steps calculator. Convert your steps walked into estimated calories burned based on your weight and walking intensity.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/clusters/health-fitness-calculators" className="hover:text-orange-600">Health & Fitness Calculators</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Calorie Counter Steps</span>
          </nav>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Footprints className="w-4 h-4" />
              Free Steps to Calories Calculator
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calorie Counter Steps – Convert Your Steps to Calories Burned
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use this free calorie counter steps tool to instantly convert your daily steps into estimated calories burned. Enter your steps, weight, and walking intensity to get personalized results.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Footprints className="w-4 h-4 text-orange-500" />
                    Number of Steps *
                  </span>
                </label>
                <input
                  type="number"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  placeholder="e.g., 10000"
                  min="1"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-orange-500" />
                    Your Weight (optional)
                  </span>
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder={weightUnit === 'kg' ? 'e.g., 70' : 'e.g., 154'}
                    min="1"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900"
                  />
                  <div className="flex rounded-xl border border-gray-300 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setWeightUnit('kg')}
                      className={`px-4 py-3 text-sm font-medium transition-all ${
                        weightUnit === 'kg'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
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
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      lb
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Leave blank to use default (70 kg / 154 lb)
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-orange-500" />
                    Walking Intensity
                  </span>
                </label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value as keyof typeof INTENSITY_DATA)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-gray-900 bg-white"
                >
                  <option value="easy">Easy walk (~4 km/h)</option>
                  <option value="normal">Normal walk (~5 km/h)</option>
                  <option value="brisk">Brisk walk (~6 km/h)</option>
                  <option value="jogging">Jogging (~8 km/h)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={calculateCalories}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Calories Burned
                </button>
                <button
                  onClick={resetForm}
                  className="px-4 py-4 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50 transition-all"
                  title="Reset"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {warning && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-amber-800 text-sm">{warning}</p>
            </div>
          )}

          {result && (
            <div ref={resultRef} className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Flame className="w-6 h-6" />
                Your Results
              </h2>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <Flame className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="text-3xl font-bold">{result.calories.toLocaleString()}</p>
                  <p className="text-white/80 text-sm">Calories Burned</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="text-3xl font-bold">{result.distanceKm}</p>
                  <p className="text-white/80 text-sm">Kilometers ({result.distanceMiles} mi)</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="text-3xl font-bold">{result.timeMinutes}</p>
                  <p className="text-white/80 text-sm">Minutes Walking</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <p className="text-sm text-white/90">
                  <strong>{result.steps.toLocaleString()} steps</strong> at <strong>{result.intensity}</strong> intensity 
                  for a <strong>{result.weight} kg</strong> person burns approximately <strong>{result.calories.toLocaleString()} kcal</strong>.
                </p>
              </div>

              <p className="text-xs text-white/70 text-center">
                * These are estimates only and not medical advice. Actual calories burned may vary.
              </p>
            </div>
          )}

          {result && <PostResultUpsell />}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-500" />
              How Many Calories Do You Burn Per Step?
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                The number of calories you burn per step depends on several factors. Using a <strong>calorie counter steps</strong> tool helps you get a personalized estimate, but understanding these factors gives you a more complete picture:
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li className="flex items-start gap-2">
                  <Scale className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Body Weight:</strong> Heavier individuals burn more calories per step because it takes more energy to move more mass.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Activity className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Walking Intensity:</strong> Brisk walking or jogging burns significantly more calories than a leisurely stroll.</span>
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Terrain:</strong> Walking uphill or on uneven surfaces requires more energy than walking on flat ground.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Individual Metabolism:</strong> Age, fitness level, and metabolism all affect calorie burn.</span>
                </li>
              </ul>
              <p className="text-gray-600">
                On average, a 70kg person burns about <strong>0.04 calories per step</strong> at a normal walking pace. This means 10,000 steps would burn approximately 400 calories. Our calorie counter steps calculator adjusts these estimates based on your specific inputs.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Steps to Calories Conversion Chart
            </h2>
            <p className="text-gray-600 mb-4">
              Use this quick reference chart to estimate calories burned for different step counts. These values are for a 70kg person—adjust up or down based on your weight.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 rounded-tl-lg">Steps</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Easy Walk</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Normal Walk</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Brisk Walk</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700 rounded-tr-lg">Jogging</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {CONVERSION_CHART.map((row, i) => (
                    <tr key={row.steps} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.steps.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.easy} kcal</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.normal} kcal</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.brisk} kcal</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.jogging} kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Steps to Calories Formula
            </h2>
            <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm">
              <p className="text-gray-800">
                Calories burned ≈ Steps × Calories_per_step × (Your_weight / 70)
              </p>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                This calorie counter steps formula uses a baseline of 70kg (154 lbs) and adjusts proportionally for your actual weight. The <code className="bg-gray-100 px-1 rounded">Calories_per_step</code> value changes based on intensity:
              </p>
              <ul className="space-y-1 text-gray-600 mb-4">
                <li>• Easy walk: 0.035 kcal/step</li>
                <li>• Normal walk: 0.04 kcal/step</li>
                <li>• Brisk walk: 0.05 kcal/step</li>
                <li>• Jogging: 0.065 kcal/step</li>
              </ul>
              <p className="text-gray-600">
                For example, if you weigh 80kg and take 10,000 steps at a normal pace: <br />
                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">10,000 × 0.04 × (80/70) = 457 calories</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How Accurate Is a Steps to Calories Calculator?
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                A calorie counter steps tool like this one provides a reasonable <strong>estimate</strong> based on scientific averages. However, several factors can affect accuracy:
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li><strong>Device accuracy:</strong> Pedometers and fitness trackers may over- or under-count steps.</li>
                <li><strong>Stride length:</strong> Taller people typically have longer strides, affecting distance calculations.</li>
                <li><strong>Individual metabolism:</strong> Two people of the same weight can burn calories at different rates.</li>
                <li><strong>Terrain variations:</strong> Walking uphill burns more calories than the flat-ground estimates suggest.</li>
                <li><strong>Arm movement:</strong> Walking with arm swing burns slightly more calories than keeping arms still.</li>
              </ul>
              <p className="text-gray-600">
                Use this calorie counter steps calculator as a helpful guide for tracking progress, not as a precise medical measurement. For weight management goals, consistency in tracking matters more than perfect accuracy.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How Many Steps Should You Walk per Day?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="prose prose-gray">
                <p className="text-gray-600 mb-4">
                  The popular "10,000 steps" goal originated from a 1960s Japanese marketing campaign, but research supports its benefits. Here's what science says about daily step goals:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li><strong>4,000-6,000 steps:</strong> Basic daily activity, reduces sedentary health risks</li>
                  <li><strong>7,000-8,000 steps:</strong> Associated with significant health benefits and lower mortality</li>
                  <li><strong>10,000+ steps:</strong> Great for weight management and cardiovascular health</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  Pro Tips for More Steps
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Take walking meetings or phone calls</li>
                  <li>• Park farther from entrances</li>
                  <li>• Use stairs instead of elevators</li>
                  <li>• Set hourly reminders to move</li>
                  <li>• Walk during lunch breaks</li>
                  <li>• Get a walking buddy for accountability</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
            <button
              onClick={() => setShowFaq(!showFaq)}
              className="flex items-center justify-between w-full text-left"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                FAQ: Steps and Calories
              </h2>
              {showFaq ? (
                <ChevronUp className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              )}
            </button>
            
            {showFaq && (
              <div className="mt-6 space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              More Free Health & Fitness Calculators
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <Link
                href="/tools/calorie-deficit-calculator"
                className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-orange-50 rounded-xl text-gray-700 hover:text-orange-600 transition-colors text-sm"
              >
                <Flame className="w-4 h-4" />
                Calorie Deficit Calculator
              </Link>
              <Link
                href="/tools"
                className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-orange-50 rounded-xl text-gray-700 hover:text-orange-600 transition-colors text-sm"
              >
                <Activity className="w-4 h-4" />
                All Free Tools
              </Link>
              <Link
                href="/tools/word-counter"
                className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-orange-50 rounded-xl text-gray-700 hover:text-orange-600 transition-colors text-sm"
              >
                <Calculator className="w-4 h-4" />
                Word Counter
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-center mb-8">
            <Sparkles className="w-10 h-10 text-orange-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Track Your Progress Over Time
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Ready to take your fitness tracking to the next level? Join VCM Suite for free tools, creator resources, and more ways to optimize your health and productivity.
            </p>
            <Link
              href="/vcm-os"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-all"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <ExploreMoreTools currentTool="/tools/calorie-counter-steps" />
        </div>
      </div>
    </>
  );
}
