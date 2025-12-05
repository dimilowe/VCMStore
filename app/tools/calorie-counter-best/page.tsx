"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calculator, Flame, ChevronDown, ArrowRight, Target, RotateCcw, Trophy, Star, Check, ExternalLink, Award, Zap, Shield } from "lucide-react";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

interface Results {
  totalCalories: number;
  targetCalories: number;
  difference: number;
  status: "below" | "on-target" | "above";
  interpretation: string;
}

export default function BestCalorieCounterPage() {
  const [caloriesEaten, setCaloriesEaten] = useState("");
  const [targetCalories, setTargetCalories] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const eaten = parseFloat(caloriesEaten);
    if (!caloriesEaten || isNaN(eaten)) {
      newErrors.caloriesEaten = "Please enter your total calories eaten today";
    } else if (eaten <= 0 || eaten > 10000) {
      newErrors.caloriesEaten = "Calories must be between 1 and 10,000";
    }

    const target = targetCalories ? parseFloat(targetCalories) : 2000;
    if (targetCalories && !isNaN(parseFloat(targetCalories))) {
      if (target < 500 || target > 10000) {
        newErrors.targetCalories = "Target must be between 500 and 10,000 calories";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateResults = () => {
    if (!validateInputs()) return;

    const eaten = parseFloat(caloriesEaten);
    const target = targetCalories ? parseFloat(targetCalories) : 2000;
    const difference = eaten - target;
    const percentDiff = (difference / target) * 100;

    let status: "below" | "on-target" | "above";
    let interpretation: string;

    if (percentDiff < -5) {
      status = "below";
      interpretation = `You're ${Math.abs(Math.round(difference))} calories below your target today. If you're aiming for weight loss, this deficit may help—just ensure you're still getting adequate nutrition.`;
    } else if (percentDiff <= 5) {
      status = "on-target";
      interpretation = `You're right on track with your ${target.toLocaleString()} kcal goal. Great job maintaining balance!`;
    } else {
      status = "above";
      interpretation = `You've exceeded your target by ${Math.round(difference)} calories. Don't stress—one day won't define your progress. Consider lighter choices tomorrow.`;
    }

    setResults({
      totalCalories: Math.round(eaten),
      targetCalories: Math.round(target),
      difference: Math.round(difference),
      status,
      interpretation,
    });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const resetCalculator = () => {
    setResults(null);
    setCaloriesEaten("");
    setTargetCalories("");
    setErrors({});
  };

  const comparisonData = [
    {
      name: "VCM Suite (This Tool)",
      type: "Website",
      price: "100% Free",
      bestFor: "Quick daily checks",
      features: ["No signup required", "Instant results", "100% private", "Works on any device"],
      platforms: "Any browser",
      database: "Manual entry",
      highlight: true,
    },
    {
      name: "MyFitnessPal",
      type: "App + Web",
      price: "Free / $19.99/mo Premium",
      bestFor: "Comprehensive tracking",
      features: ["14M+ food database", "Barcode scanner", "Recipe importer", "Macro tracking"],
      platforms: "iOS, Android, Web",
      database: "14+ million foods",
      highlight: false,
    },
    {
      name: "Lose It!",
      type: "App",
      price: "Free / $39.99/yr Premium",
      bestFor: "Weight loss focus",
      features: ["AI food recognition", "Goal-based plans", "Community challenges", "Snap-to-log"],
      platforms: "iOS, Android",
      database: "7+ million foods",
      highlight: false,
    },
    {
      name: "Cronometer",
      type: "App + Web",
      price: "Free / $49.99/yr Gold",
      bestFor: "Micronutrient tracking",
      features: ["82+ tracked nutrients", "Oracle AI assistant", "Data export", "Custom biometrics"],
      platforms: "iOS, Android, Web",
      database: "1.5+ million foods",
      highlight: false,
    },
    {
      name: "Samsung Health",
      type: "App",
      price: "Free",
      bestFor: "Samsung device owners",
      features: ["Galaxy Watch sync", "Activity auto-track", "Sleep analysis", "Heart rate monitor"],
      platforms: "Android (Samsung)",
      database: "Moderate",
      highlight: false,
    },
    {
      name: "DIY Spreadsheet",
      type: "Manual",
      price: "Free",
      bestFor: "Total customization",
      features: ["Full control", "Custom formulas", "No data sharing", "Offline access"],
      platforms: "Excel, Google Sheets",
      database: "Self-maintained",
      highlight: false,
    },
  ];

  const faqs = [
    {
      question: "Is a free calorie counter enough for weight loss?",
      answer: "Absolutely! The best calorie counter for weight loss is one you'll actually use consistently. Free tools like this one provide everything most people need: a way to track intake against a target. Premium features like barcode scanning are convenient but not essential—many successful dieters use simple manual tracking."
    },
    {
      question: "Do I need barcode scanning to count calories effectively?",
      answer: "No, barcode scanning is a convenience feature, not a necessity. While it speeds up logging packaged foods, you can easily look up calorie counts or estimate portions without it. The best calorie counter is one that fits your lifestyle—if you cook from scratch, barcode scanning offers little value anyway."
    },
    {
      question: "Are calorie counter apps accurate?",
      answer: "Calorie counters are as accurate as the data you input. Food databases may have slight variations, and portion estimation is always imperfect. However, consistent tracking—even with minor inaccuracies—is more valuable than perfect precision. The trend over time matters more than any single day's count."
    },
    {
      question: "What is the most important feature in a calorie counter?",
      answer: "Simplicity and ease of use. The best calorie counter is one you'll use every day. Complex apps with dozens of features often lead to burnout. Look for: quick entry, clear daily totals, and reasonable food databases. Everything else is secondary to consistent, sustainable tracking."
    },
    {
      question: "Should I pick an app or web-based calorie counter?",
      answer: "It depends on your habits. Apps work better if you eat on-the-go and want offline access. Web-based tools like ours are ideal for quick checks, desktop users, or those who don't want another app on their phone. Many people use both: an app for detailed logging, and a website for quick calculations."
    },
    {
      question: "How do I know if I'm choosing the best calorie counter for me?",
      answer: "The best calorie counter matches your tracking style. Ask yourself: Do you want detailed nutrition breakdowns or just calorie totals? Do you prefer mobile or desktop? Will you log every meal or just check daily totals? Start simple—you can always upgrade to a more complex tool later if needed."
    },
  ];

  const recommendedTools = [
    { name: "Free Calorie Counter", href: "/tools/calorie-counter-free", description: "Track individual food items" },
    { name: "Maintenance Calculator", href: "/tools/calorie-counter-maintenance", description: "Find your TDEE" },
    { name: "Walking Calories Calculator", href: "/tools/calorie-counter-walking", description: "Calories burned walking" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MonetizationBar />
      
      <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
        <Link 
          href="/tools" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 transition-colors"
        >
          ← Back to All Tools
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
            <Trophy className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calorie Counter Best Picks for 2024 – Free Tool + Complete Comparison
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Looking for the <strong>calorie counter best</strong> for your goals? We've tested and compared 
            the top options so you don't have to. Use our free daily calculator below, then browse 
            our detailed comparison to find the <strong>best calorie counter</strong> for your needs.
          </p>
        </div>

        {/* Calculator Card */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="w-5 h-5" />
              Daily Calorie Check
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Flame className="w-4 h-4 inline mr-1" />
                  Total Calories Eaten Today *
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 1800"
                  value={caloriesEaten}
                  onChange={(e) => {
                    setCaloriesEaten(e.target.value);
                    setErrors(prev => ({ ...prev, caloriesEaten: "" }));
                  }}
                  className={errors.caloriesEaten ? "border-red-500" : ""}
                />
                {errors.caloriesEaten && (
                  <p className="text-red-500 text-sm mt-1">{errors.caloriesEaten}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 inline mr-1" />
                  Target Calories (optional, default: 2,000)
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 2000"
                  value={targetCalories}
                  onChange={(e) => {
                    setTargetCalories(e.target.value);
                    setErrors(prev => ({ ...prev, targetCalories: "" }));
                  }}
                  className={errors.targetCalories ? "border-red-500" : ""}
                />
                {errors.targetCalories && (
                  <p className="text-red-500 text-sm mt-1">{errors.targetCalories}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                onClick={calculateResults}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate
              </Button>
              <Button 
                variant="outline"
                onClick={resetCalculator}
                className="border-gray-300"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        {results && (
          <div ref={resultsRef} id="results" className="scroll-mt-24">
            <Card className="shadow-lg border-0 mb-8 overflow-hidden">
              <CardHeader className={`text-white ${
                results.status === "below" ? "bg-green-500" :
                results.status === "on-target" ? "bg-blue-500" : "bg-amber-500"
              }`}>
                <CardTitle className="flex items-center gap-2">
                  {results.status === "below" && <Check className="w-5 h-5" />}
                  {results.status === "on-target" && <Star className="w-5 h-5" />}
                  {results.status === "above" && <Flame className="w-5 h-5" />}
                  {results.status === "below" ? "Below Target" :
                   results.status === "on-target" ? "On Target" : "Above Target"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Today's Intake</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.totalCalories.toLocaleString()} kcal
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Your Target</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {results.targetCalories.toLocaleString()} kcal
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Difference</p>
                    <p className={`text-2xl font-bold ${
                      results.difference < 0 ? "text-green-600" :
                      results.difference === 0 ? "text-blue-600" : "text-amber-600"
                    }`}>
                      {results.difference > 0 ? "+" : ""}{results.difference.toLocaleString()} kcal
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{results.interpretation}</p>
                </div>
              </CardContent>
            </Card>

            <PostResultUpsell />
          </div>
        )}

        {/* Why We Built This */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Free Calorie Counter (Why We Built It)
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              We created this simple calorie counter because we believe the <strong>best calorie counter</strong> is 
              one that gets out of your way. No downloads, no account creation, no premium upsells blocking basic features.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <Zap className="w-8 h-8 text-orange-500 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
                <p className="text-sm text-gray-600">Enter your calories, get immediate feedback. No waiting, no loading.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <Shield className="w-8 h-8 text-orange-500 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">100% Private</h3>
                <p className="text-sm text-gray-600">Your data never leaves your browser. No accounts, no tracking.</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <Award className="w-8 h-8 text-orange-500 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">No Strings Attached</h3>
                <p className="text-sm text-gray-600">Free forever. No premium tier required for basic functionality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Calorie Counter Best Options: Full Comparison (2024)
          </h2>
          <p className="text-gray-600 mb-6">
            Looking for the <strong>best calorie counter</strong> for your needs? Here's how the top options compare:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-900 border-b">Tool</th>
                  <th className="text-left p-4 font-semibold text-gray-900 border-b">Type</th>
                  <th className="text-left p-4 font-semibold text-gray-900 border-b">Price</th>
                  <th className="text-left p-4 font-semibold text-gray-900 border-b">Food Database</th>
                  <th className="text-left p-4 font-semibold text-gray-900 border-b">Best For</th>
                  <th className="text-left p-4 font-semibold text-gray-900 border-b">Platforms</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`${item.highlight ? "bg-orange-50" : ""} ${
                      index !== comparisonData.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {item.highlight && <Star className="w-4 h-4 text-orange-500" />}
                        <span className={item.highlight ? "font-semibold text-orange-600" : "text-gray-900"}>
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 text-sm">{item.type}</td>
                    <td className="p-4 text-gray-600 text-sm">{item.price}</td>
                    <td className="p-4 text-gray-600 text-sm">{item.database}</td>
                    <td className="p-4 text-gray-600 text-sm">{item.bestFor}</td>
                    <td className="p-4 text-gray-600 text-sm">{item.platforms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Features comparison below table */}
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonData.slice(0, 6).map((item, index) => (
              <div key={index} className={`rounded-lg p-4 ${item.highlight ? "bg-orange-50 border-2 border-orange-200" : "bg-gray-50"}`}>
                <h4 className={`font-semibold mb-2 ${item.highlight ? "text-orange-600" : "text-gray-900"}`}>{item.name}</h4>
                <div className="flex flex-wrap gap-1">
                  {item.features.map((feature, i) => (
                    <span key={i} className="text-xs bg-white text-gray-700 px-2 py-1 rounded border border-gray-200">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Quick Summary</h3>
            <ul className="text-gray-600 space-y-1 text-sm">
              <li><strong>Best for simplicity:</strong> VCM Suite (this tool) or a basic spreadsheet</li>
              <li><strong>Best for comprehensive tracking:</strong> MyFitnessPal offers the largest food database</li>
              <li><strong>Best for nutrition nerds:</strong> Cronometer provides detailed micronutrient data</li>
              <li><strong>Best for weight loss:</strong> Lose It! focuses specifically on goal-based tracking</li>
            </ul>
          </div>
        </section>

        {/* How to Pick */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How to Pick the Best Calorie Counter for You
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              Choosing the right calorie counter depends on your personal preferences and goals. Here are the key factors to consider:
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">Simplicity vs. Features</h3>
                <p className="text-gray-600 text-sm">
                  Complex apps can lead to tracking fatigue. If you're new to calorie counting, start simple. 
                  You can always upgrade later.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">Privacy Concerns</h3>
                <p className="text-gray-600 text-sm">
                  Many apps collect significant data. If privacy matters, look for tools that work offline 
                  or don't require accounts—like our calculator above.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">Cost Considerations</h3>
                <p className="text-gray-600 text-sm">
                  Premium tiers often lock useful features behind paywalls. Decide what you actually need 
                  versus what's nice-to-have before subscribing.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900">Data Export</h3>
                <p className="text-gray-600 text-sm">
                  If you want to analyze trends or share with a nutritionist, ensure your chosen tool 
                  lets you export your data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Do You Even Need the Best */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Do You Even Need the "Best" Calorie Counter?
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              Here's a truth many don't want to hear: the specific tool matters less than consistency. 
              A simple notebook, a basic spreadsheet, or a free online calculator like ours can work 
              just as well as a premium app—if you use it every day.
            </p>
            <p className="text-gray-600 mb-4">
              Research shows that the act of tracking itself creates awareness that naturally leads to 
              better choices. The "best" calorie counter is simply the one you'll stick with.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
              <p className="text-orange-800 font-medium">
                Pro tip: Start with the simplest tool possible. Only add complexity when you hit a real 
                limitation—not when you think you might need a feature someday.
              </p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Learn More About Calorie Counting
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              href="/mbb/how-to-choose-best-calorie-counter"
              className="group bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-2 flex items-center gap-2">
                How to Choose the Best Calorie Counter for Your Goals
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-600">
                A detailed guide on matching your calorie tracking tool to your specific fitness objectives.
              </p>
            </Link>
            <Link 
              href="/mbb/calorie-counter-mistakes"
              className="group bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-2 flex items-center gap-2">
                7 Common Calorie Counter Mistakes (and How to Avoid Them)
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-600">
                Learn what most people get wrong when tracking calories—and how to do it right.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            FAQ – Choosing the Best Calorie Counter
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">More Free Calorie Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {recommendedTools.map((tool, index) => (
              <Link 
                key={index}
                href={tool.href}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-orange-200 transition-all group"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Long-form SEO Content */}
        <section className="mb-12 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Calorie Counting: A Complete Guide
          </h2>
          <div className="prose prose-gray max-w-none text-gray-600">
            <p className="mb-4">
              Calorie counting remains one of the most effective methods for managing weight, whether your goal 
              is losing fat, building muscle, or simply maintaining your current physique. The principle is 
              simple: consume fewer calories than you burn for weight loss, or more for weight gain.
            </p>
            <p className="mb-4">
              The challenge lies in accuracy and consistency. Modern calorie counters—whether apps, websites, 
              or spreadsheets—make this process significantly easier than the pen-and-paper methods of decades past. 
              However, choosing from the hundreds of available options can feel overwhelming.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">What Makes a Great Calorie Counter?</h3>
            <p className="mb-4">
              The <strong>best calorie counter</strong> shares several characteristics regardless of platform. 
              First, it must be easy enough that you'll actually use it daily. Second, it should provide accurate 
              nutritional data—or at least make entering your own data simple. Third, it should offer clear 
              feedback on your progress toward goals.
            </p>
            <p className="mb-4">
              Beyond these basics, individual needs vary. Athletes might prioritize macronutrient breakdowns. 
              Those with dietary restrictions need robust filtering options. Privacy-conscious users want 
              offline functionality. There's no universal "best"—only what's best for you.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">The Calorie Counting Workflow</h3>
            <p className="mb-4">
              Effective calorie counting follows a consistent pattern: log food before or immediately after eating, 
              check your running total throughout the day, and review at day's end. Whether you're using a sophisticated 
              app or our simple calculator above, this workflow remains the same.
            </p>
            <p>
              Start with imperfect tracking rather than waiting for the perfect system. You can always refine 
              your approach—but only if you begin. The best calorie counter is the one you'll use today.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm pt-8 pb-12 border-t border-gray-200">
          <p>© {new Date().getFullYear()} VCM Suite. Free calorie counting tools for everyone.</p>
        </footer>
      </div>
    </div>
  );
}
