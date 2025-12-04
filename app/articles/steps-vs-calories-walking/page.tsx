'use client';

import Link from 'next/link';
import { 
  Footprints,
  Flame,
  Calculator,
  ArrowRight,
  TrendingUp,
  Scale,
  Clock,
  Target,
  Activity,
  Heart
} from 'lucide-react';
import MonetizationBar from '@/components/MonetizationBar';
import PostResultUpsell from '@/components/PostResultUpsell';

export default function StepsVsCaloriesWalkingPage() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
          
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tools/calorie-counter-walking" className="hover:text-orange-600">Walking Calculator</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Steps vs Calories</span>
          </nav>

          <article className="prose prose-gray max-w-none">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
                <Footprints className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Steps vs Calories: How Walking Translates Into Calorie Burn
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Understanding the relationship between your step count and calories burned is essential for effective weight management. Here's everything you need to know about converting steps to energy expenditure.
              </p>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200 mb-10">
              <div className="flex items-center gap-3 mb-3">
                <Calculator className="w-6 h-6 text-orange-600" />
                <span className="font-semibold text-gray-900">Quick Calculator</span>
              </div>
              <p className="text-gray-700 mb-4">
                Want instant calorie estimates for your walks? Try our free walking calorie calculator.
              </p>
              <Link 
                href="/tools/calorie-counter-walking"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
              >
                Try the Calorie Counter Walking Tool
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-orange-500" />
                The Science Behind Steps and Calories
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you walk, your body converts stored energy (calories) into movement. Each step requires your leg muscles to contract, your heart to pump blood, and your lungs to process oxygen. All of these processes burn calories, but the exact amount varies significantly from person to person.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The primary factors that determine how many calories you burn per step include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li><strong>Body weight:</strong> Heavier individuals burn more calories per step because moving more mass requires more energy. A 200-pound person might burn 40% more calories than a 150-pound person walking the same distance.</li>
                <li><strong>Walking speed:</strong> Faster walking increases your heart rate and muscle engagement, burning more calories per minute and per step.</li>
                <li><strong>Terrain:</strong> Walking uphill or on uneven surfaces engages more muscle groups and increases calorie expenditure significantly.</li>
                <li><strong>Stride length:</strong> Longer strides cover more distance per step but may require more energy output.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                On average, a person burns approximately 0.04 to 0.06 calories per step during a normal-paced walk. For a 70kg (154 lb) person, 10,000 steps translates to roughly 400-500 calories burned—but this can vary by 20% or more based on the factors above.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-orange-500" />
                Steps vs. Time-Based Tracking: Which Is More Accurate?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Many fitness enthusiasts debate whether tracking steps or tracking walking time provides more accurate calorie estimates. The truth is that both methods have their place, but time-based tracking combined with intensity is generally more reliable.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>The problem with step counting:</strong> Two people can take 5,000 steps in very different ways. One might be strolling through a grocery store over three hours, while another completes a focused 45-minute power walk. Despite the same step count, the power walker burns significantly more calories due to higher intensity and continuous exertion.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>The advantage of time + speed:</strong> When you track walking duration and know your approximate pace, you can apply MET (Metabolic Equivalent of Task) values to calculate calories with greater precision. This is why our <Link href="/tools/calorie-counter-walking" className="text-orange-600 hover:text-orange-700 underline">calorie counter walking</Link> tool uses time and intensity rather than raw step counts.
              </p>
              <p className="text-gray-700 leading-relaxed">
                That said, step counting remains valuable for motivation and setting daily activity goals. The key is understanding that 10,000 steps taken briskly burn far more calories than 10,000 steps taken leisurely throughout the day.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-orange-500" />
                Converting Steps to Distance and Calories
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To convert steps to meaningful calorie data, you need to consider the relationship between steps, distance, and energy expenditure. Here's a practical framework:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Average Conversions (70kg person, normal pace):</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>1,000 steps ≈ 0.75 km ≈ 40 calories</li>
                  <li>5,000 steps ≈ 3.75 km ≈ 200 calories</li>
                  <li>10,000 steps ≈ 7.5 km ≈ 400 calories</li>
                  <li>15,000 steps ≈ 11.25 km ≈ 600 calories</li>
                </ul>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                These numbers assume an average stride length of 0.75 meters and a normal walking pace of about 4.5 km/h. Your actual results will vary based on your height (which affects stride length), weight, and walking intensity.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For personalized calculations, use a <Link href="/tools/calorie-counter-walking" className="text-orange-600 hover:text-orange-700 underline">walking calorie calculator</Link> that accounts for your specific metrics. Generic step-to-calorie conversions can be off by 30% or more for individuals who don't match the "average" profile.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6 text-orange-500" />
                Maximizing Calorie Burn From Your Steps
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If your goal is weight management, simply hitting a step target isn't enough—you want those steps to count. Here are evidence-based strategies to maximize calorie burn from your walking routine:
              </p>
              <div className="space-y-4 mb-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">1. Increase Your Pace</h4>
                  <p className="text-gray-700 text-sm">
                    Walking at 6 km/h burns about 30% more calories than walking at 4 km/h. Try interval walking: alternate 3 minutes of brisk walking with 2 minutes of normal pace.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">2. Add Inclines</h4>
                  <p className="text-gray-700 text-sm">
                    Walking uphill engages your glutes and hamstrings more intensely. A 5% incline can increase calorie burn by 50% compared to flat terrain.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">3. Consolidate Your Steps</h4>
                  <p className="text-gray-700 text-sm">
                    A focused 60-minute walk burns more than 10,000 steps spread throughout the day. Continuous walking keeps your heart rate elevated longer.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">4. Add Light Weights</h4>
                  <p className="text-gray-700 text-sm">
                    Walking with 1-2 kg hand weights or a weighted vest increases energy expenditure by 5-10%. Start light to avoid joint strain.
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Remember: consistency beats intensity. It's better to walk 30 minutes daily than to do one exhausting 2-hour walk per week. Build sustainable habits first, then increase intensity gradually.
              </p>
            </section>

            <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 mb-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-500" />
                Calculate Your Walking Calories Now
              </h3>
              <p className="text-gray-700 mb-4">
                Stop guessing how many calories you're burning. Use our free tools to get personalized estimates based on your weight, duration, and walking intensity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/tools/calorie-counter-walking"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-xl transition-all group shadow-md hover:shadow-lg"
                >
                  <Clock className="w-4 h-4" />
                  Calorie Counter Walking
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link 
                  href="/tools/calorie-counter-steps"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  <Footprints className="w-4 h-4" />
                  Calorie Counter Steps
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
