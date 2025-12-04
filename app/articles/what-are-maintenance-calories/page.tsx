import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator, Activity, Flame, Scale, Clock, Target, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

export const metadata: Metadata = {
  title: "What Are Maintenance Calories and Why Do They Matter? | VCM Suite",
  description: "Learn what maintenance calories (TDEE) are, how they're calculated, and why knowing your maintenance calories is essential for weight management, muscle building, and fat loss.",
  keywords: ["maintenance calories", "what are maintenance calories", "TDEE explained", "total daily energy expenditure", "calorie counter maintenance"],
  openGraph: {
    title: "What Are Maintenance Calories and Why Do They Matter?",
    description: "A complete guide to understanding maintenance calories (TDEE) and how they affect your fitness goals.",
    type: "article",
    url: "https://vcmsuite.com/articles/what-are-maintenance-calories",
  },
  alternates: {
    canonical: "https://vcmsuite.com/articles/what-are-maintenance-calories",
  },
};

export default function WhatAreMaintenanceCaloriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MonetizationBar />

      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link 
          href="/tools/calorie-counter-maintenance"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Maintenance Calorie Calculator
        </Link>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Flame className="w-4 h-4" />
            Nutrition Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            What Are Maintenance Calories and Why Do They Matter?
          </h1>
          <p className="text-xl text-gray-600">
            Understanding your maintenance calories is the foundation of any successful nutrition strategy. Here's everything you need to know about TDEE and how it affects your body.
          </p>
        </header>

        <div className="prose prose-gray prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-orange-500" />
              Defining Maintenance Calories
            </h2>
            <p>
              Maintenance calories—also called Total Daily Energy Expenditure (TDEE)—represent the total number of calories your body needs each day to maintain your current weight. This includes every calorie your body burns, whether you're sleeping, working, exercising, or simply sitting and thinking.
            </p>
            <p>
              Think of your body like a bank account. Calories are the currency. Your maintenance calories are the exact amount you need to deposit (eat) to keep your balance (weight) the same. Deposit less and your balance decreases (weight loss). Deposit more and it increases (weight gain).
            </p>
            <p>
              Unlike your BMR (Basal Metabolic Rate), which only measures calories burned at complete rest, your TDEE accounts for all daily activities. For most people, TDEE is 20-100% higher than BMR, depending on how active they are.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-6 h-6 text-orange-500" />
              The Four Components of TDEE
            </h2>
            <p>
              Your maintenance calories are made up of four distinct components:
            </p>

            <div className="grid gap-4 my-6 not-prose">
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-gray-900 mb-1">1. Basal Metabolic Rate (BMR) – 60-70%</h3>
                  <p className="text-gray-600 text-sm">The calories your body burns at complete rest to maintain vital functions: breathing, circulation, cell production, brain function, and organ maintenance. This is your body's "idle" energy consumption.</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-gray-900 mb-1">2. Thermic Effect of Food (TEF) – 10%</h3>
                  <p className="text-gray-600 text-sm">The energy required to digest, absorb, and process the food you eat. Protein has the highest thermic effect (~25%), followed by carbs (~8%), then fats (~3%).</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-gray-900 mb-1">3. Non-Exercise Activity Thermogenesis (NEAT) – 15-30%</h3>
                  <p className="text-gray-600 text-sm">All the calories burned through daily movement that isn't formal exercise: walking, fidgeting, typing, cooking, cleaning. This varies enormously between individuals.</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-gray-900 mb-1">4. Exercise Activity Thermogenesis (EAT) – 5-10%</h3>
                  <p className="text-gray-600 text-sm">Calories burned during intentional exercise: gym workouts, running, sports, swimming. For most people, this is actually a smaller component than NEAT.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-orange-500" />
              How Maintenance Calories Are Calculated
            </h2>
            <p>
              Most <Link href="/tools/calorie-counter-maintenance" className="text-orange-600 hover:text-orange-700 font-medium">maintenance calorie calculators</Link> use a two-step process:
            </p>
            <ol className="list-decimal pl-6 space-y-3 my-4">
              <li>
                <strong>Calculate your BMR</strong> using a validated formula. The most accurate modern formula is Mifflin-St Jeor, developed in 1990:
                <div className="bg-gray-50 rounded-lg p-4 my-3 font-mono text-sm">
                  <p>Men: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5</p>
                  <p className="mt-2">Women: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161</p>
                </div>
              </li>
              <li>
                <strong>Multiply BMR by an activity factor</strong> to estimate total daily expenditure:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Sedentary (desk job, no exercise): BMR × 1.2</li>
                  <li>Lightly active (light exercise 1-3 days/week): BMR × 1.375</li>
                  <li>Moderately active (moderate exercise 3-5 days/week): BMR × 1.55</li>
                  <li>Very active (hard exercise 6-7 days/week): BMR × 1.725</li>
                  <li>Extremely active (physical job + hard training): BMR × 1.9</li>
                </ul>
              </li>
            </ol>
            <p>
              These activity multipliers are estimates based on population averages. Your actual TDEE may differ by 10-15% in either direction, which is why tracking your weight over time is important for calibration.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-500" />
              Why Knowing Your Maintenance Calories Matters
            </h2>
            <p>
              Whether you want to lose fat, build muscle, or simply maintain your current physique, knowing your maintenance calories is the essential starting point. Learn more about <Link href="/articles/maintenance-vs-deficit-vs-surplus" className="text-orange-600 hover:text-orange-700 font-medium">when to use each calorie strategy</Link>:
            </p>

            <div className="not-prose my-6 grid md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  <TrendingDown className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">For Fat Loss</h3>
                  <p className="text-sm text-gray-600">Create a 300-500 calorie deficit below maintenance. A 500 cal/day deficit equals roughly 1 lb of fat loss per week.</p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-4">
                  <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">For Muscle Gain</h3>
                  <p className="text-sm text-gray-600">Create a 200-400 calorie surplus above maintenance. Combined with strength training, this supports muscle growth.</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="pt-4">
                  <Scale className="w-8 h-8 text-orange-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-2">For Maintenance</h3>
                  <p className="text-sm text-gray-600">Eat at your TDEE to maintain weight. Perfect for diet breaks or when you're happy with your current physique.</p>
                </CardContent>
              </Card>
            </div>

            <p>
              Without knowing your maintenance calories, you're essentially guessing. You might eat too little and feel exhausted, or eat too much and wonder why you're not making progress. Having a target number—even an estimated one—gives you a baseline to adjust from.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-500" />
              Factors That Affect Your Maintenance Calories
            </h2>
            <p>
              Your TDEE isn't a fixed number—it changes based on many factors:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Body weight:</strong> Heavier people burn more calories, even at rest</li>
              <li><strong>Muscle mass:</strong> Muscle tissue burns more calories than fat tissue</li>
              <li><strong>Age:</strong> Metabolism typically decreases ~2% per decade after age 20</li>
              <li><strong>Gender:</strong> Men generally have higher BMRs than women of the same size</li>
              <li><strong>Activity level:</strong> Both structured exercise and daily movement (NEAT) impact TDEE significantly</li>
              <li><strong>Hormones:</strong> Thyroid function, testosterone, estrogen, and cortisol all influence metabolism</li>
              <li><strong>Sleep:</strong> Poor sleep can reduce metabolism and increase hunger hormones</li>
              <li><strong>Stress:</strong> Chronic stress affects cortisol levels and can impact both metabolism and eating behavior</li>
              <li><strong>Dieting history:</strong> Extended calorie restriction can cause metabolic adaptation</li>
            </ul>
            <p>
              This is why calculator estimates should be treated as starting points. Track your weight over 2-4 weeks to see how your body actually responds, then adjust accordingly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes When Estimating Maintenance Calories</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Overestimating activity level:</strong> Most people are more sedentary than they think. A 3x/week gym habit is "lightly active," not "very active."
              </li>
              <li>
                <strong>Not adjusting for weight changes:</strong> Your TDEE decreases as you lose weight. Recalculate after every 10-15 lbs lost.
              </li>
              <li>
                <strong>Ignoring NEAT:</strong> Changes in daily movement (walking, fidgeting) can significantly impact total calorie burn without you realizing it.
              </li>
              <li>
                <strong>Expecting perfection:</strong> All formulas are estimates with 10-15% margins of error. Real-world tracking is essential for accuracy.
              </li>
              <li>
                <strong>Not accounting for metabolic adaptation:</strong> Extended dieting can lower your metabolism. Plan regular diet breaks at maintenance calories.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Find Your True Maintenance Calories</h2>
            <p>
              While calculators give you a starting estimate, here's how to find your actual maintenance calories:
            </p>
            <ol className="list-decimal pl-6 space-y-3 my-4">
              <li>Use a <Link href="/tools/calorie-counter-maintenance" className="text-orange-600 hover:text-orange-700 font-medium">calorie counter maintenance calculator</Link> to get an estimate</li>
              <li>Eat at that calorie level consistently for 2-3 weeks</li>
              <li>Track your weight daily and calculate weekly averages (to smooth out water fluctuations)</li>
              <li>If weight is stable (±1 lb), you've found maintenance</li>
              <li>If weight is increasing, subtract 100-200 calories</li>
              <li>If weight is decreasing, add 100-200 calories</li>
              <li>Repeat until weight stabilizes</li>
            </ol>
            <p>
              This process, called "reverse dieting" or "maintenance calibration," typically takes 4-8 weeks but gives you much more accurate data than any formula alone.
            </p>
          </section>

          <section className="mb-10 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 not-prose">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              Ready to Calculate Your Maintenance Calories?
            </h2>
            <p className="text-gray-600 mb-4">
              Use our free maintenance calorie calculator to get your personalized TDEE estimate based on the Mifflin-St Jeor equation.
            </p>
            <Link 
              href="/tools/calorie-counter-maintenance"
              className="inline-flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              Calculate My Maintenance Calories
            </Link>
          </section>
        </div>

        <PostResultUpsell />
      </article>
    </div>
  );
}
