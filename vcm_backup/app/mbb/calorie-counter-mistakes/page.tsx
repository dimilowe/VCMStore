"use client";

import Link from "next/link";
import { AlertTriangle, XCircle, CheckCircle2, ArrowRight, Scale, Clock, Utensils, Brain, TrendingUp, Target, Coffee } from "lucide-react";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

export default function CalorieCounterMistakesPage() {
  const mistakes = [
    {
      number: 1,
      icon: Scale,
      title: "Eyeballing Portion Sizes",
      problem: "Most people dramatically underestimate portions. Research shows we typically underreport food intake by 30-50%. A \"medium\" bowl of pasta might actually be 2-3 servings, and a \"splash\" of oil can add 200+ calories.",
      solution: "Use a food scale for at least one week to calibrate your visual estimates. You don't need to weigh everything forever—but understanding what a true serving looks like transforms your accuracy.",
      tip: "Weigh cooked pasta once. You'll never overestimate it again."
    },
    {
      number: 2,
      icon: Coffee,
      title: "Forgetting Drinks and \"BLTs\" (Bites, Licks, Tastes)",
      problem: "That cream in your coffee, the handful of chips while cooking, the kids' leftover fries—these invisible calories add up fast. Studies show BLTs can account for 200-500 untracked calories daily.",
      solution: "Track beverages like any other food. For BLTs, either log them immediately or institute a personal \"no BLT\" rule while actively tracking.",
      tip: "Set a phone reminder to log that afternoon coffee or tea within 5 minutes of having it."
    },
    {
      number: 3,
      icon: Clock,
      title: "Saving Tracking for Later",
      problem: "\"I'll log everything tonight\" leads to forgotten meals, estimated portions, and guessed ingredients. By evening, that lunch salad becomes a vague memory—and accuracy drops dramatically.",
      solution: "Log food within 60 seconds of eating. Most calorie counter apps are designed for quick entry—use that. If you can't log immediately, snap a quick photo as a reminder.",
      tip: "Turn logging into a pre-meal ritual rather than a post-meal chore."
    },
    {
      number: 4,
      icon: Utensils,
      title: "Ignoring Cooking Oils and Condiments",
      problem: "A tablespoon of olive oil is 120 calories. Ranch dressing, mayo, butter—these cooking and topping additions are calorie-dense and easy to ignore. Two tablespoons of salad dressing can exceed 150 calories.",
      solution: "Measure cooking oils with an actual tablespoon. Log condiments separately, not as part of the main dish. Be especially careful with \"healthy\" oils—they're just as caloric.",
      tip: "Keep oil in a measuring spoon bottle or use spray oils to control portions automatically."
    },
    {
      number: 5,
      icon: Brain,
      title: "Trusting Restaurant Calorie Counts Completely",
      problem: "Restaurant calorie listings are estimates, often 20-30% lower than reality. Portion sizes vary by cook, and listed calories rarely include sides, beverages, or that extra bread basket.",
      solution: "Add a 20% buffer when logging restaurant meals. Focus on what you can control: skip the bread, ask for sauces on the side, choose simpler dishes with fewer hidden ingredients.",
      tip: "If a restaurant meal \"seems low\" for what you ate, it probably is. Trust your instincts and adjust upward."
    },
    {
      number: 6,
      icon: TrendingUp,
      title: "Obsessing Over Daily Numbers Instead of Weekly Trends",
      problem: "One high day won't ruin your progress, and one low day won't create it. But obsessing over daily precision leads to anxiety, burnout, and often abandoning tracking entirely.",
      solution: "Focus on weekly averages rather than daily totals. A 500-calorie surplus Monday can be balanced by slightly lower intake the rest of the week—no stress required.",
      tip: "Review your weekly average every Sunday. This is the number that actually matters for your goals."
    },
    {
      number: 7,
      icon: Target,
      title: "Using the Wrong Calorie Target",
      problem: "Online calculators give you an estimate, but your actual needs depend on metabolism, activity level, and body composition. Eating at a generic \"1500 calories\" when your maintenance is 1400 means no progress.",
      solution: "Treat calculator results as starting points. Track accurately for 2-3 weeks, monitor weight trends, and adjust your target based on real-world results.",
      tip: "If you're not losing weight at your calculated deficit, your maintenance is lower than estimated. Adjust accordingly."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MonetizationBar />
      
      <article className="max-w-3xl mx-auto px-4 py-8 pt-20">
        <Link 
          href="/tools/calorie-counter-best" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 transition-colors"
        >
          ← Back to Best Calorie Counter
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            7 Common Calorie Counter Mistakes (and How to Avoid Them)
          </h1>
          <p className="text-lg text-gray-600">
            Even the <Link href="/tools/calorie-counter-best" className="text-orange-500 hover:text-orange-600">best calorie counter</Link> can't 
            help if you're making these common tracking errors. Here's what goes wrong—and how to fix it.
          </p>
        </header>

        <div className="prose prose-gray max-w-none">
          {/* Introduction */}
          <section className="mb-10">
            <p className="text-gray-600 mb-4">
              Calorie counting works—when done correctly. But most people unknowingly make mistakes 
              that sabotage their results. They track diligently, hit their numbers, and still don't 
              see progress. Sound familiar?
            </p>
            <p className="text-gray-600 mb-4">
              The problem usually isn't the calorie counter app or tool. It's the tracking habits. 
              After analyzing thousands of food logs, researchers have identified consistent patterns 
              in where people go wrong.
            </p>
            <p className="text-gray-600">
              Here are the seven most common calorie counting mistakes—and practical fixes for each one.
            </p>
          </section>

          {/* Mistakes List */}
          <section className="mb-10">
            {mistakes.map((mistake, index) => {
              const Icon = mistake.icon;
              return (
                <div key={index} className="mb-8 last:mb-0">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Mistake #{mistake.number}: {mistake.title}
                      </h2>
                      
                      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-800 mb-1">The Problem</p>
                            <p className="text-red-700">{mistake.problem}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-800 mb-1">The Solution</p>
                            <p className="text-green-700">{mistake.solution}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-orange-800 text-sm">
                          <strong>Quick Tip:</strong> {mistake.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Bonus Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bonus: The #1 Mistake That Beats All Others
            </h2>
            <div className="bg-gray-900 text-white rounded-lg p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-amber-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Quitting When Accuracy Isn't Perfect</h3>
                  <p className="text-gray-300 mb-4">
                    The biggest mistake isn't inaccurate tracking—it's stopping altogether because you 
                    can't track perfectly. Imperfect tracking beats no tracking every single time.
                  </p>
                  <p className="text-gray-300">
                    If you miss a meal, estimate it and move on. If you forget a day, start fresh tomorrow. 
                    The goal is progress, not perfection. A rough log is infinitely more valuable than an 
                    abandoned one.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Making It Work */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Putting It All Together
            </h2>
            <p className="text-gray-600 mb-4">
              You don't need to fix all seven mistakes at once. Start with the one that resonates 
              most—probably portion sizes or forgetting drinks—and focus on that for a week.
            </p>
            <p className="text-gray-600 mb-4">
              Once that becomes automatic, tackle the next issue. Sustainable change comes from 
              small, consistent improvements, not dramatic overhauls.
            </p>
            <p className="text-gray-600">
              And remember: the <Link href="/tools/calorie-counter-best" className="text-orange-500 hover:text-orange-600">best calorie counter</Link> is 
              simply the one you'll use consistently. Choose a tool that fits your lifestyle, apply 
              these fixes to your tracking habits, and you'll see results.
            </p>
          </section>

          {/* Quick Fixes Summary */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Quick Fixes Checklist
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg p-5">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-semibold">1</div>
                  <span className="text-gray-700">Use a food scale for one week to calibrate portion estimates</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-semibold">2</div>
                  <span className="text-gray-700">Track drinks and snacks immediately (within 60 seconds)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-semibold">3</div>
                  <span className="text-gray-700">Measure cooking oils with actual tablespoons</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-semibold">4</div>
                  <span className="text-gray-700">Add 20% to restaurant meal estimates</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-semibold">5</div>
                  <span className="text-gray-700">Review weekly averages, not daily totals</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-semibold">6</div>
                  <span className="text-gray-700">Adjust your target based on real results after 2-3 weeks</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-semibold">7</div>
                  <span className="text-gray-700">Never quit—imperfect tracking beats none</span>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-10">
            <PostResultUpsell />
          </section>

          {/* Related Content */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Keep Learning</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/tools/calorie-counter-best"
                className="group bg-orange-50 border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-orange-600 group-hover:text-orange-700 mb-1 flex items-center gap-2">
                  Best Calorie Counter Comparison
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-600">
                  Compare the top calorie counters and use our free daily calculator.
                </p>
              </Link>
              <Link 
                href="/mbb/how-to-choose-best-calorie-counter"
                className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-1 flex items-center gap-2">
                  How to Choose the Best Calorie Counter
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-gray-600">
                  Match your goals to the right tracking tool with our decision guide.
                </p>
              </Link>
            </div>
          </section>

          {/* Long-form SEO Content */}
          <section className="mb-10 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Why These Mistakes Matter
            </h2>
            <div className="text-gray-600 space-y-4">
              <p>
                Calorie counting is based on energy balance: consume fewer calories than you burn for 
                weight loss, more for gain. The math is simple. But accurate implementation is where 
                most people struggle.
              </p>
              <p>
                These seven mistakes create what researchers call the "calorie gap"—the difference between 
                what people think they're eating and what they actually consume. Studies consistently 
                show this gap ranges from 500-1,000 calories daily for the average person.
              </p>
              <p>
                That's enough to completely eliminate a moderate calorie deficit and explain why so 
                many dieters feel stuck despite "doing everything right."
              </p>
              <p>
                The good news: once you're aware of these pitfalls, avoiding them becomes much easier. 
                Most require only minor habit changes—not dramatic lifestyle overhauls. A few weeks of 
                focused attention on accurate tracking builds habits that persist long-term.
              </p>
              <p>
                Start with the fundamentals: use a food scale for a week, track beverages, and log 
                immediately. These three changes alone typically improve accuracy by 30-40%—often enough 
                to start seeing results even without changing what you eat.
              </p>
            </div>
          </section>
        </div>

        <footer className="text-center text-gray-500 text-sm pt-8 pb-12 border-t border-gray-200">
          <p>© {new Date().getFullYear()} VCM Suite. Accurate calorie counting starts with good habits.</p>
        </footer>
      </article>
    </div>
  );
}
