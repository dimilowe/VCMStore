'use client';

import Link from 'next/link';
import { 
  Footprints,
  Flame,
  Calculator,
  ArrowRight,
  TrendingDown,
  Scale,
  Clock,
  Target,
  Activity,
  Heart,
  Zap,
  CheckCircle
} from 'lucide-react';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';

export default function WalkingForFatLossPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/calorie-counter-walking" className="hover:text-orange-600">Walking Calculator</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Walking for Fat Loss</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4 shadow-lg">
                <TrendingDown className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Walking for Fat Loss: How Many Calories Do You Really Burn?
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Walking is one of the most effective and sustainable forms of exercise for fat loss. Learn exactly how many calories walking burns and how to optimize your walking routine for maximum results.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-200 mb-10">
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-gray-900">Calculate Your Burn</span>
              </div>
              <p className="text-gray-700 mb-4">
                Get personalized calorie estimates for your walks based on your weight and walking intensity.
              </p>
              <Link 
                href="/tools/calorie-counter-walking"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
              >
                Try the Walking Calorie Calculator
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                Why Walking Works for Fat Loss
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Walking is often underestimated as a fat-loss tool, but the science strongly supports its effectiveness. Unlike high-intensity workouts that can spike cortisol and increase appetite, walking promotes steady calorie burn without triggering excessive hunger signals.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Here's why walking is uniquely effective for sustainable fat loss:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-gray-900">Low Injury Risk</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Walking is gentle on joints, making it sustainable long-term. You can walk daily without the recovery time required by running or HIIT.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-gray-900">Fat-Burning Zone</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    At walking pace, your body preferentially burns fat for fuel. Higher intensities shift toward carbohydrate burning.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-gray-900">Doesn't Increase Appetite</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Intense exercise often triggers compensatory eating. Walking burns calories without making you ravenous afterward.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-gray-900">Stress Reduction</h4>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Walking lowers cortisol levels. Chronic stress promotes fat storage, especially around the midsection. Walking counteracts this.
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The cumulative effect is powerful: a 30-minute daily walk burns 150-225 calories. Over a month, that's 4,500-6,750 extra calories—equivalent to 0.5-1 kg of body fat, without changing your diet.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-orange-500" />
                How Many Calories Does Walking Actually Burn?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The calories you burn walking depend on three main factors: your body weight, walking speed, and duration. Here's what the research shows for different scenarios:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-4">
                <h4 className="font-semibold text-gray-900 mb-4">Calories Burned Per Hour of Walking (by weight and speed):</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-4 font-semibold text-gray-700">Body Weight</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-700">Slow (3 km/h)</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-700">Normal (4.5 km/h)</th>
                        <th className="text-center py-2 px-4 font-semibold text-gray-700">Brisk (6 km/h)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-2 pr-4 text-gray-700">60 kg (132 lb)</td>
                        <td className="text-center py-2 px-4 text-gray-700">112 kcal</td>
                        <td className="text-center py-2 px-4 text-gray-700">148 kcal</td>
                        <td className="text-center py-2 px-4 text-gray-700">193 kcal</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-gray-700">70 kg (154 lb)</td>
                        <td className="text-center py-2 px-4 text-gray-700">131 kcal</td>
                        <td className="text-center py-2 px-4 text-gray-700">173 kcal</td>
                        <td className="text-center py-2 px-4 text-gray-700">225 kcal</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-gray-700">80 kg (176 lb)</td>
                        <td className="text-center py-2 px-4 text-gray-700">150 kcal</td>
                        <td className="text-center py-2 px-4 text-gray-700">198 kcal</td>
                        <td className="text-center py-2 px-4 text-gray-700">257 kcal</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-gray-700">90 kg (198 lb)</td>
                        <td className="text-center py-2 px-4 text-gray-700">169 kcal</td>
                        <td className="text-center py-2 px-4 text-gray-700">223 kcal</td>
                        <td className="text-center py-2 px-4 text-gray-700">289 kcal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                These figures are calculated using MET (Metabolic Equivalent of Task) values, the same method used in scientific research and by health professionals. For personalized estimates, use a <Link href="/tools/calorie-counter-walking" className="text-orange-600 hover:text-orange-700 underline">calorie counter walking</Link> tool.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Key takeaway:</strong> A heavier person walking at the same pace burns significantly more calories. This is actually encouraging for those starting their weight loss journey—you burn more calories per walk initially, creating a larger calorie deficit.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-orange-500" />
                The Optimal Walking Strategy for Fat Loss
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Not all walking routines are created equal for fat loss. Research suggests specific strategies can maximize your results:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Walk Fasted in the Morning
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Walking before breakfast (in a fasted state) may increase fat oxidation by 20-30%. Your glycogen stores are depleted overnight, so your body preferentially burns fat for fuel. Even a 20-minute morning walk can make a difference.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Aim for 45-60 Minute Sessions
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Longer walks (45-60 minutes) at a moderate pace burn more total fat than short, intense sessions. Your body shifts increasingly toward fat-burning the longer you walk. This is the sweet spot for fat loss without excessive fatigue.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Include Incline Walking
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Walking uphill increases calorie burn by 50-100% compared to flat terrain. If you don't have hills nearby, use a treadmill at 5-10% incline. Incline walking also builds glute and hamstring strength.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    Walk After Meals
                  </h4>
                  <p className="text-gray-700 text-sm">
                    A 15-20 minute walk after meals (especially dinner) helps regulate blood sugar and prevents the post-meal glucose spike that promotes fat storage. This is particularly effective for reducing belly fat.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">
                Combining these strategies—morning fasted walks plus post-dinner walks, with occasional incline sessions—creates a powerful fat-burning routine that's sustainable for years.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-orange-500" />
                Walking vs. Running: Which Burns More Fat?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                This is one of the most common questions about walking for fat loss. The answer might surprise you.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Per minute:</strong> Running burns more calories. A 70kg person running at 8 km/h burns about 470 calories per hour, compared to 225 calories per hour of brisk walking at 6 km/h.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>But here's what matters for fat loss:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Running often increases appetite more than walking, leading to compensatory eating</li>
                <li>Running has higher injury risk, leading to forced breaks from exercise</li>
                <li>Walking is more sustainable—you can walk daily without burnout</li>
                <li>At walking pace, a higher percentage of calories come from fat stores</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                For most people seeking fat loss, walking 5-7 days per week beats running 2-3 days per week with rest days between. Consistency trumps intensity.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>The hybrid approach:</strong> Walk 4-5 days per week, run or do higher intensity once or twice. This gives you the consistency of walking plus the cardiovascular benefits of occasional intense exercise.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-orange-500" />
                Setting Realistic Fat Loss Expectations
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Let's be realistic about what walking can achieve for fat loss. Here's what the math looks like:
              </p>
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200 mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Fat Loss Calculator Example:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>Daily 45-minute brisk walk = ~170 calories burned</li>
                  <li>Weekly total = 170 × 7 = <strong>1,190 calories</strong></li>
                  <li>Monthly total = ~5,000 calories</li>
                  <li>1 kg of body fat ≈ 7,700 calories</li>
                  <li>Monthly fat loss from walking alone = <strong>~0.65 kg (1.4 lb)</strong></li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Half a kilogram per month might sound modest, but consider: that's 6+ kg (13+ lb) per year, just from walking, without changing your diet. Combine walking with a moderate calorie deficit (250-500 calories daily), and you could lose 1-2 kg per month sustainably.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The key advantage of walking is sustainability. Crash diets and intense exercise programs often lead to yo-yo weight cycling. Walking creates lasting change because it's something you can do forever.
              </p>
            </section>

            <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-orange-500" />
                Track Your Progress
              </h3>
              <p className="text-gray-700 mb-4">
                Use our free calculators to track your walking calorie burn and create a realistic fat loss plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/tools/calorie-counter-walking"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
                >
                  <Clock className="w-4 h-4" />
                  Walking Calorie Calculator
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link 
                  href="/tools/calorie-deficit-calculator"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  <Flame className="w-4 h-4" />
                  Calorie Deficit Calculator
                </Link>
              </div>
            </section>

            <PostResultUpsell />

          </article>

        </div>
        
        <MonetizationBar />
      </div>
    </>
  );
}
