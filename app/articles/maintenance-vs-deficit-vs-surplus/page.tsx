import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator, Scale, TrendingDown, TrendingUp, Target, Flame, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

export const metadata: Metadata = {
  title: "Maintenance vs Deficit vs Surplus: Which Is Right for Your Goal? | VCM Suite",
  description: "Should you eat at maintenance, in a deficit, or in a surplus? Learn when to use each calorie approach for fat loss, muscle building, or weight maintenance.",
  keywords: ["maintenance vs deficit", "calorie surplus vs deficit", "when to cut or bulk", "maintenance calories", "calorie counter maintenance"],
  openGraph: {
    title: "Maintenance vs Deficit vs Surplus: Which Is Right for Your Goal?",
    description: "The complete guide to choosing between maintenance, cutting, and bulking based on your fitness goals.",
    type: "article",
    url: "https://vcmsuite.com/articles/maintenance-vs-deficit-vs-surplus",
  },
  alternates: {
    canonical: "https://vcmsuite.com/articles/maintenance-vs-deficit-vs-surplus",
  },
};

export default function MaintenanceVsDeficitVsSurplusPage() {
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
            <Target className="w-4 h-4" />
            Nutrition Strategy
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Maintenance vs Deficit vs Surplus: Which Is Right for Your Goal?
          </h1>
          <p className="text-xl text-gray-600">
            Once you know your maintenance calories, you need to decide: should you eat at that level, below it, or above it? Here's how to choose the right approach for your goals.
          </p>
        </header>

        <div className="prose prose-gray prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-orange-500" />
              Understanding the Three Calorie Strategies
            </h2>
            <p>
              Every successful nutrition plan starts with knowing your <Link href="/tools/calorie-counter-maintenance" className="text-orange-600 hover:text-orange-700 font-medium">maintenance calories</Link>—the amount you need to maintain your current weight. From there, you have three options:
            </p>

            <div className="grid gap-4 my-6 not-prose">
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold text-gray-900">Maintenance (TDEE)</h3>
                  </div>
                  <p className="text-gray-600">Eating exactly what you burn. Weight stays stable.</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold text-gray-900">Deficit (Cutting)</h3>
                  </div>
                  <p className="text-gray-600">Eating less than you burn. Creates weight/fat loss.</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <h3 className="font-semibold text-gray-900">Surplus (Bulking)</h3>
                  </div>
                  <p className="text-gray-600">Eating more than you burn. Supports muscle growth.</p>
                </CardContent>
              </Card>
            </div>

            <p>
              None of these approaches is inherently better than the others—each serves a different purpose. The key is choosing the right one for your current goal and situation.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6 text-orange-500" />
              When to Eat at Maintenance
            </h2>
            <p>
              Eating at maintenance means your calories in equal your calories out. Your weight stays stable (within normal daily fluctuations of 1-3 lbs from water, food volume, etc.).
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Maintenance is ideal when:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>You're happy with your current physique</strong> and want to maintain it</li>
              <li><strong>You need a diet break</strong> after extended cutting to restore hormones and mental energy</li>
              <li><strong>You're new to fitness</strong> and want to learn to eat consistently before adding the complexity of a deficit or surplus</li>
              <li><strong>Life is stressful</strong> (work, travel, illness) and you don't have the bandwidth for active dieting</li>
              <li><strong>You're an athlete in-season</strong> needing to maintain performance without the fatigue of a deficit</li>
              <li><strong>You're recovering from disordered eating</strong> and rebuilding a healthy relationship with food</li>
            </ul>

            <div className="not-prose my-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Body Recomposition at Maintenance
              </h4>
              <p className="text-sm text-gray-600">
                If you're new to strength training or returning after a break, you may be able to build muscle and lose fat simultaneously while eating at maintenance. This "recomp" effect is most pronounced in beginners and typically slows after 6-12 months of training.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingDown className="w-6 h-6 text-blue-500" />
              When to Eat in a Deficit (Cutting)
            </h2>
            <p>
              A calorie deficit means eating fewer calories than you burn. This forces your body to tap into stored energy (body fat) to make up the difference, resulting in weight loss.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">A deficit is appropriate when:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>You want to lose body fat</strong> for health, aesthetics, or performance</li>
              <li><strong>You're at a higher body fat percentage</strong> (roughly 20%+ for men, 30%+ for women) and want to get leaner before building muscle</li>
              <li><strong>You've finished a bulk</strong> and want to reveal the muscle you've built</li>
              <li><strong>You need to make weight</strong> for a sport or competition</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Types of Deficits:</h3>

            <div className="not-prose grid gap-4 my-4">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Mild Deficit (10-15% below TDEE)</h4>
                  <p className="text-sm text-gray-600 mb-2">~200-400 calories below maintenance</p>
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Sustainable, minimal muscle loss, less hunger</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-blue-200">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Moderate Deficit (15-20% below TDEE)</h4>
                  <p className="text-sm text-gray-600 mb-2">~400-600 calories below maintenance</p>
                  <div className="flex items-center gap-2 text-orange-600 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Faster results but more challenging to maintain</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-blue-200">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Aggressive Deficit (20-25% below TDEE)</h4>
                  <p className="text-sm text-gray-600 mb-2">600+ calories below maintenance</p>
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Quick results but higher muscle loss risk, significant hunger</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <p>
              A 500-calorie daily deficit theoretically produces about 1 lb of fat loss per week (3,500 calories = 1 lb of fat). However, actual results vary based on adherence, metabolic adaptation, and water retention. Use a <Link href="/tools/calorie-counter-maintenance" className="text-orange-600 hover:text-orange-700 font-medium">maintenance calorie calculator</Link> to find your baseline, then subtract your desired deficit.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Cutting Tips:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Keep protein high (0.8-1g per lb of body weight) to preserve muscle</li>
              <li>Continue strength training to signal your body to keep muscle tissue</li>
              <li>Don't cut for more than 12-16 weeks without a diet break at maintenance</li>
              <li>Expect weight loss to slow after 8-12 weeks due to metabolic adaptation</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              When to Eat in a Surplus (Bulking)
            </h2>
            <p>
              A calorie surplus means eating more than you burn. The extra energy, combined with resistance training, supports new muscle tissue growth. However, some fat gain is inevitable during a bulk.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">A surplus is appropriate when:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>You want to build muscle</strong> as your primary goal</li>
              <li><strong>You're already relatively lean</strong> (under 15% body fat for men, 25% for women)</li>
              <li><strong>You've been training consistently</strong> for at least 6-12 months and have a solid foundation</li>
              <li><strong>You're an underweight athlete</strong> needing to gain mass for performance</li>
              <li><strong>You're recovering from injury or illness</strong> and need to rebuild lost tissue</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Types of Surpluses:</h3>

            <div className="not-prose grid gap-4 my-4">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Lean Bulk (5-10% above TDEE)</h4>
                  <p className="text-sm text-gray-600 mb-2">~150-300 calories above maintenance</p>
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Minimizes fat gain, slower but cleaner muscle building</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Moderate Bulk (10-15% above TDEE)</h4>
                  <p className="text-sm text-gray-600 mb-2">~300-500 calories above maintenance</p>
                  <div className="flex items-center gap-2 text-orange-600 text-sm">
                    <Activity className="w-4 h-4" />
                    <span>Good balance of muscle gain and moderate fat accumulation</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-200">
                <CardContent className="pt-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Aggressive Bulk (15-20%+ above TDEE)</h4>
                  <p className="text-sm text-gray-600 mb-2">500+ calories above maintenance</p>
                  <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Faster gains but significantly more fat accumulation</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <p>
              Natural lifters can only build about 0.5-1 lb of muscle per month under optimal conditions. Eating 1,000+ calories above maintenance won't speed this up—the excess just gets stored as fat. First <Link href="/tools/calorie-counter-maintenance" className="text-orange-600 hover:text-orange-700 font-medium">calculate your TDEE</Link>, then add 10-15% for a controlled surplus.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Bulking Tips:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Aim to gain 0.5-1 lb per week (for men) or 0.25-0.5 lb per week (for women)</li>
              <li>Keep protein at 0.7-1g per lb of body weight</li>
              <li>Progressive overload in the gym is essential—you need to give your body a reason to build muscle</li>
              <li>Monitor waist measurements; if they increase faster than weight, you're gaining too much fat</li>
              <li>Plan to cut after 3-6 months of bulking to stay at a manageable body fat level</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Decide: A Decision Framework</h2>
            <p>
              Use this simple flowchart to determine which approach is right for you:
            </p>

            <div className="not-prose my-6 p-6 bg-gray-50 rounded-xl border">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <p className="font-medium text-gray-900">Are you over 20% body fat (men) or 30% (women)?</p>
                    <p className="text-sm text-gray-600">Yes → Start with a <strong>deficit</strong>. Get lean before building.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <p className="font-medium text-gray-900">Are you happy with your current body composition?</p>
                    <p className="text-sm text-gray-600">Yes → Eat at <strong>maintenance</strong> and focus on training.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <p className="font-medium text-gray-900">Are you relatively lean and want to build muscle?</p>
                    <p className="text-sm text-gray-600">Yes → Use a <strong>surplus</strong> with progressive strength training.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <p className="font-medium text-gray-900">Have you been dieting for 12+ weeks?</p>
                    <p className="text-sm text-gray-600">Yes → Take a 2-4 week <strong>diet break at maintenance</strong>.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  <div>
                    <p className="font-medium text-gray-900">Is life particularly stressful right now?</p>
                    <p className="text-sm text-gray-600">Yes → <strong>Maintenance</strong> is your friend. Don't add diet stress to life stress.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cycling Between Phases</h2>
            <p>
              Most people don't stay in one phase forever. Here's a typical approach:
            </p>
            <ol className="list-decimal pl-6 space-y-3 my-4">
              <li><strong>Cutting phase</strong> (8-16 weeks): Get to a comfortable body fat level</li>
              <li><strong>Maintenance phase</strong> (2-4 weeks): Let your metabolism stabilize</li>
              <li><strong>Bulking phase</strong> (3-6 months): Build muscle with a slight surplus</li>
              <li><strong>Maintenance phase</strong> (2-4 weeks): Stabilize before cutting again</li>
              <li>Repeat the cycle as needed</li>
            </ol>
            <p>
              This "cut → maintain → bulk → maintain" cycle allows you to progressively improve your body composition over time without staying in any one phase long enough to experience its downsides.
            </p>
          </section>

          <section className="mb-10 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 not-prose">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              Calculate Your Starting Point
            </h2>
            <p className="text-gray-600 mb-4">
              Before you can eat at maintenance, in a deficit, or in a surplus, you need to know your baseline. Use our free maintenance calorie calculator to find your TDEE.
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
