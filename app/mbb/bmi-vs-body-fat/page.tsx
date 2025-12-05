"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Scale, Activity, Percent, AlertTriangle, CheckCircle, Calculator } from "lucide-react";
import PostResultUpsell from "@/components/PostResultUpsell";
import MonetizationBar from "@/components/MonetizationBar";

export default function BMIvsBodyFatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link 
          href="/tools/calorie-counter-bmi" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to BMI & Calorie Calculator
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-2xl mb-4">
            <Percent className="w-7 h-7 text-orange-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            BMI vs Body Fat: What's the Difference?
          </h1>
          <p className="text-lg text-gray-600">
            BMI and body fat percentage are often confused, but they measure fundamentally different things. 
            Learn when each metric matters and why relying on just one can be misleading.
          </p>
        </div>

        {/* Quick Tool Link */}
        <Link 
          href="/tools/calorie-counter-bmi"
          className="block bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-8 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6 text-orange-500" />
              <div>
                <h3 className="font-semibold text-orange-600">Calculate Your BMI Now</h3>
                <p className="text-sm text-gray-600">Use our free calorie counter BMI tool</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-orange-500" />
          </div>
        </Link>

        {/* Article Content */}
        <article className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Fundamental Difference
            </h2>
            <p className="text-gray-600 mb-4">
              At their core, BMI and body fat percentage answer different questions about your body:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Scale className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">BMI (Body Mass Index)</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Question answered:</strong> How does your weight relate to your height?
                </p>
                <p className="text-sm text-gray-600">
                  BMI = weight (kg) ÷ height² (m²). It's a ratio that correlates with body fat at a 
                  population level but doesn't actually measure fat.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">Body Fat Percentage</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Question answered:</strong> What portion of your body weight is fat?
                </p>
                <p className="text-sm text-gray-600">
                  Body fat % = (fat mass ÷ total weight) × 100. This directly measures how much 
                  of your body is composed of adipose tissue.
                </p>
              </div>
            </div>

            <p className="text-gray-600">
              The key distinction: BMI is a proxy measurement that estimates health risk based on weight 
              and height, while body fat percentage directly measures what we're actually concerned 
              about—the amount of fat you're carrying. Think of BMI as an approximation and body fat 
              as the actual measurement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              When BMI Gets It Wrong
            </h2>
            <p className="text-gray-600 mb-4">
              BMI's simplicity is both its strength and weakness. Because it only considers weight and 
              height, it can't distinguish between different types of body mass. Here are the most 
              common scenarios where BMI misleads:
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex gap-4 bg-amber-50 rounded-lg p-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">The Muscular "Overweight" Person</h3>
                  <p className="text-sm text-gray-600">
                    Athletes, bodybuilders, and naturally muscular individuals often have BMIs in the 
                    "overweight" or even "obese" range despite having low body fat and excellent health. 
                    A professional football player might have a BMI of 30 but only 12% body fat. By BMI 
                    standards, they're obese; by body fat standards, they're lean.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-amber-50 rounded-lg p-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">The "Skinny Fat" Phenomenon</h3>
                  <p className="text-sm text-gray-600">
                    Conversely, sedentary people with little muscle mass can have "normal" BMIs while 
                    carrying unhealthy amounts of fat. Someone might weigh 140 lbs at 5'6" (BMI 22.6, 
                    "normal") but have 35% body fat—well above healthy ranges. Their lack of muscle 
                    masks the excess fat.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-amber-50 rounded-lg p-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Aging and Muscle Loss</h3>
                  <p className="text-sm text-gray-600">
                    As people age, they naturally lose muscle mass (sarcopenia) and often gain fat. 
                    A 70-year-old might have the same BMI as when they were 30, but with significantly 
                    more body fat and less muscle. BMI stays constant while actual body composition 
                    deteriorates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 bg-amber-50 rounded-lg p-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Ethnic Variations</h3>
                  <p className="text-sm text-gray-600">
                    Research shows that at the same BMI, body fat percentages differ significantly 
                    across ethnic groups. People of Asian descent tend to have higher body fat at 
                    lower BMIs, while those of African descent often have lower body fat at higher BMIs. 
                    Standard BMI cutoffs don't account for these variations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Healthy Body Fat Ranges
            </h2>
            <p className="text-gray-600 mb-4">
              While BMI categories are the same for everyone, healthy body fat percentages vary by sex 
              and age. Here are general guidelines:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Men</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b"><td className="py-2">Essential fat</td><td className="py-2 text-right">2-5%</td></tr>
                    <tr className="border-b"><td className="py-2">Athletes</td><td className="py-2 text-right">6-13%</td></tr>
                    <tr className="border-b"><td className="py-2">Fitness</td><td className="py-2 text-right">14-17%</td></tr>
                    <tr className="border-b"><td className="py-2">Average</td><td className="py-2 text-right">18-24%</td></tr>
                    <tr><td className="py-2">Obese</td><td className="py-2 text-right">25%+</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Women</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b"><td className="py-2">Essential fat</td><td className="py-2 text-right">10-13%</td></tr>
                    <tr className="border-b"><td className="py-2">Athletes</td><td className="py-2 text-right">14-20%</td></tr>
                    <tr className="border-b"><td className="py-2">Fitness</td><td className="py-2 text-right">21-24%</td></tr>
                    <tr className="border-b"><td className="py-2">Average</td><td className="py-2 text-right">25-31%</td></tr>
                    <tr><td className="py-2">Obese</td><td className="py-2 text-right">32%+</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-gray-600">
              Notice that women naturally carry more body fat than men—this is essential for hormonal 
              function and reproduction. A body fat percentage that's healthy for a man might indicate 
              dangerous under-nutrition in a woman.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How to Measure Body Fat Percentage
            </h2>
            <p className="text-gray-600 mb-4">
              Unlike BMI (which requires only a scale and tape measure), measuring body fat percentage 
              is more complex. Here are the common methods, from most to least accurate:
            </p>

            <div className="space-y-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">DEXA Scan (Gold Standard)</h3>
                <p className="text-sm text-gray-600 mb-2">
                  A low-dose X-ray that precisely measures bone, muscle, and fat mass throughout your 
                  body. Accuracy: ±1-2%. Cost: $50-150 per scan. Available at hospitals and some gyms.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Most Accurate</span>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Most Expensive</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Hydrostatic Weighing</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Underwater weighing that calculates body density. Fat floats, so the more buoyant you 
                  are, the higher your body fat. Accuracy: ±2-3%. Less common but very reliable.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Very Accurate</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Research Settings</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Bod Pod (Air Displacement)</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Similar principle to hydrostatic weighing but uses air displacement instead of water. 
                  Accuracy: ±2-3%. More comfortable and available at some universities and fitness centers.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Very Accurate</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Convenient</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Skinfold Calipers</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Pinches of skin at specific body sites are measured with calipers. Accuracy: ±3-5% 
                  when done by a trained professional. Cheap and portable, but technique-dependent.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Moderate Accuracy</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Affordable</span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Bioelectrical Impedance (BIA)</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Found in smart scales and handheld devices. Sends a small electrical current through 
                  your body. Accuracy: ±3-8%, heavily influenced by hydration, recent exercise, and meals.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Variable Accuracy</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Most Convenient</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600">
              For most people, consistency matters more than absolute accuracy. Pick a method and stick 
              with it. If you use a BIA scale, weigh yourself at the same time each day (morning, 
              after using the bathroom, before eating) for the most consistent readings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why BMI Is Still Widely Used
            </h2>
            <p className="text-gray-600 mb-4">
              Given body fat's advantages, why hasn't it replaced BMI? Several practical reasons:
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600">
                  <strong>Accessibility:</strong> BMI requires only a scale and tape measure. Anyone 
                  can calculate it instantly, anywhere, for free.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600">
                  <strong>Standardization:</strong> BMI calculations are identical worldwide. Body fat 
                  measurements vary by method, equipment, and operator skill.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600">
                  <strong>Historical data:</strong> Decades of research link BMI to health outcomes. 
                  We have less long-term data on body fat percentage.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600">
                  <strong>Population screening:</strong> For large-scale public health work, BMI's 
                  simplicity makes it practical for screening millions of people.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-600">
                  <strong>Good enough for most:</strong> For the average (non-athletic) adult, BMI 
                  correlates reasonably well with health risks.
                </p>
              </div>
            </div>

            <p className="text-gray-600">
              BMI isn't going away anytime soon. The key is understanding its limitations and 
              supplementing it with other measurements when appropriate.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Which Should You Use?
            </h2>
            <p className="text-gray-600 mb-4">
              The answer depends on your situation:
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Use BMI as your primary metric if:</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>You're not athletic or particularly muscular</li>
                <li>You want a quick, free health check</li>
                <li>You're tracking weight changes over time</li>
                <li>You're in the early stages of a health journey</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Add body fat measurement if:</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>You're athletic or do regular strength training</li>
                <li>Your BMI seems inconsistent with how you look and feel</li>
                <li>You're trying to build muscle while losing fat (body recomposition)</li>
                <li>You want the most accurate picture of your health</li>
              </ul>
            </div>

            <p className="text-gray-600">
              For most people, start with our <Link href="/tools/calorie-counter-bmi" className="text-orange-500 hover:text-orange-600">
              calorie counter BMI</Link> calculator. If you're actively training or your results seem 
              off, consider getting a more precise body fat measurement. And remember: both numbers 
              are just data points. Your energy levels, strength, sleep quality, and how you feel 
              day-to-day matter just as much.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Bottom Line
            </h2>
            <p className="text-gray-600 mb-4">
              BMI and body fat percentage serve different purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>BMI</strong> is a quick, free screening tool that works well for general 
                populations but fails for muscular individuals and can miss "skinny fat" conditions.</li>
              <li><strong>Body fat percentage</strong> directly measures what matters but requires 
                special equipment and can be expensive or inconvenient to measure accurately.</li>
            </ul>
            <p className="text-gray-600">
              The best approach combines multiple metrics. Use BMI as a starting point, add waist 
              circumference for visceral fat assessment, and consider body fat measurement if you're 
              serious about fitness. No single number tells the whole story of your health.
            </p>
          </section>
        </article>

        {/* CTA Section */}
        <section className="mb-10">
          <PostResultUpsell />
        </section>

        {/* Related Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Reading</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              href="/tools/calorie-counter-bmi"
              className="group bg-orange-50 border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-orange-600 group-hover:text-orange-700 mb-1 flex items-center gap-2">
                BMI & Calorie Calculator
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-600">
                Calculate your BMI and daily calorie needs with our free calorie counter BMI tool.
              </p>
            </Link>
            <Link 
              href="/mbb/what-is-bmi"
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-1 flex items-center gap-2">
                What Is BMI? Understanding Body Mass Index
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-600">
                Deep dive into the history, calculation, and limitations of BMI as a health metric.
              </p>
            </Link>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm pt-8 pb-12 border-t border-gray-200">
          <p>© {new Date().getFullYear()} VCM Suite. Evidence-based health information.</p>
        </footer>
      </div>

      <MonetizationBar />
    </div>
  );
}
