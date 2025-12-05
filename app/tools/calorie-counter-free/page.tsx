"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calculator, Flame, Plus, Trash2, ChevronDown, ArrowRight, Zap, Target, RotateCcw, Utensils, Apple, ListPlus } from "lucide-react";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

interface FoodItem {
  id: number;
  name: string;
  calories: string;
  error?: string;
}

interface Results {
  totalCalories: number;
  interpretation: string;
  status: "below" | "around" | "above";
}

export default function FreeCalorieCounterPage() {
  const [mode, setMode] = useState<"multiple" | "total">("multiple");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([{ id: 1, name: "", calories: "" }]);
  const [totalCaloriesInput, setTotalCaloriesInput] = useState("");
  const [dailyGoal] = useState(2000);
  const [results, setResults] = useState<Results | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const addFoodItem = () => {
    const newId = Math.max(...foodItems.map(f => f.id), 0) + 1;
    setFoodItems([...foodItems, { id: newId, name: "", calories: "" }]);
  };

  const removeFoodItem = (id: number) => {
    if (foodItems.length > 1) {
      setFoodItems(foodItems.filter(f => f.id !== id));
    }
  };

  const updateFoodItem = (id: number, field: "name" | "calories", value: string) => {
    setFoodItems(foodItems.map(f => 
      f.id === id ? { ...f, [field]: value, error: undefined } : f
    ));
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (mode === "multiple") {
      let hasValidItem = false;
      const updatedItems = foodItems.map(item => {
        const cal = parseFloat(item.calories);
        if (item.calories && !isNaN(cal)) {
          if (cal <= 0 || cal > 5000) {
            return { ...item, error: "Calories must be between 1 and 5,000" };
          }
          hasValidItem = true;
          return { ...item, error: undefined };
        } else if (item.calories) {
          return { ...item, error: "Please enter a valid number" };
        }
        return { ...item, error: undefined };
      });
      
      setFoodItems(updatedItems);
      
      if (!hasValidItem) {
        newErrors.general = "Please add at least one food item with calories";
      }
      
      if (updatedItems.some(item => item.error)) {
        setErrors(newErrors);
        return false;
      }
    } else {
      const total = parseFloat(totalCaloriesInput);
      if (!totalCaloriesInput || isNaN(total)) {
        newErrors.totalCalories = "Please enter your total calories";
      } else if (total <= 0 || total > 10000) {
        newErrors.totalCalories = "Total must be between 1 and 10,000 calories";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCalories = () => {
    if (!validateInputs()) return;

    let totalCalories: number;
    
    if (mode === "multiple") {
      totalCalories = foodItems.reduce((sum, item) => {
        const cal = parseFloat(item.calories);
        return sum + (isNaN(cal) ? 0 : cal);
      }, 0);
    } else {
      totalCalories = parseFloat(totalCaloriesInput);
    }

    const difference = totalCalories - dailyGoal;
    const percentDiff = (difference / dailyGoal) * 100;
    
    let interpretation: string;
    let status: "below" | "around" | "above";
    
    if (percentDiff < -15) {
      interpretation = `You've consumed ${Math.abs(Math.round(difference))} fewer calories than a typical ${dailyGoal.toLocaleString()} kcal day. This is a significant deficit.`;
      status = "below";
    } else if (percentDiff < -5) {
      interpretation = `You're slightly below a typical ${dailyGoal.toLocaleString()} kcal daily intake—a mild deficit.`;
      status = "below";
    } else if (percentDiff <= 5) {
      interpretation = `You're right around a typical ${dailyGoal.toLocaleString()} kcal daily intake—well balanced!`;
      status = "around";
    } else if (percentDiff <= 15) {
      interpretation = `You're slightly above a typical ${dailyGoal.toLocaleString()} kcal daily intake.`;
      status = "above";
    } else {
      interpretation = `You've consumed ${Math.round(difference)} more calories than a typical ${dailyGoal.toLocaleString()} kcal day.`;
      status = "above";
    }

    setResults({
      totalCalories: Math.round(totalCalories),
      interpretation,
      status,
    });

    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const resetCalculator = () => {
    setResults(null);
    setFoodItems([{ id: 1, name: "", calories: "" }]);
    setTotalCaloriesInput("");
    setErrors({});
  };

  const faqs = [
    {
      question: "Is this free calorie counter really free forever?",
      answer: "Yes, absolutely! This calorie counter for free is 100% free with no hidden costs, no premium upgrades required, and no subscription. We believe everyone should have access to basic health tools without paying."
    },
    {
      question: "Do I need an account to use this calorie counter?",
      answer: "No account or signup is needed. Just start adding your food items and get instant results. Your data stays in your browser and isn't stored on any server—complete privacy."
    },
    {
      question: "How accurate are free calorie calculators?",
      answer: "This free calorie counter accurately adds up the calories you enter. The accuracy depends on how precisely you know the calorie content of your foods. For best results, check food labels or use a calorie database for estimates."
    },
    {
      question: "Can I use a free calorie counter for weight loss?",
      answer: "Absolutely! Tracking calories is one of the most effective ways to create a calorie deficit for weight loss. This free calorie counter helps you see your total daily intake at a glance, making it easier to stay on track."
    },
    {
      question: "What if I only know my total calories and not each food?",
      answer: "No problem! Use the 'Total calories only' mode to enter your estimated total directly. This is perfect if you've already calculated elsewhere or are doing a quick daily check-in."
    },
    {
      question: "Why use a free online calorie counter instead of an app?",
      answer: "A web-based calorie counter for free means no app downloads, no storage used on your phone, and instant access from any device. It's perfect for quick tracking without commitment to another app."
    },
  ];

  const recommendedTools = [
    { name: "Maintenance Calorie Calculator", href: "/tools/calorie-counter-maintenance", description: "Find your daily calorie needs" },
    { name: "Walking Calories Calculator", href: "/tools/walking-calories-burned", description: "Calculate calories burned walking" },
    { name: "Steps to Calories Converter", href: "/tools/steps-to-calories", description: "Convert your daily steps to calories" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MonetizationBar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <Link href="/tools" className="text-orange-500 hover:text-orange-600 text-sm mb-4 inline-flex items-center gap-1">
            ← Back to All Tools
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-2xl">
              <Utensils className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Free Calorie Counter – 100% Free Online Calorie Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Looking for a <strong>calorie counter for free</strong>? Track your daily food intake instantly with our simple, no-signup tool. Add your meals, see your total, and compare to a typical daily intake—all at zero cost.
          </p>
        </div>

        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Apple className="w-5 h-5" />
              Free Calorie Counter
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                <button
                  onClick={() => setMode("multiple")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    mode === "multiple" 
                      ? "bg-white shadow text-orange-600" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ListPlus className="w-4 h-4 inline mr-1" />
                  Add Food Items
                </button>
                <button
                  onClick={() => setMode("total")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    mode === "total" 
                      ? "bg-white shadow text-orange-600" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Calculator className="w-4 h-4 inline mr-1" />
                  Total Only
                </button>
              </div>
            </div>

            {mode === "multiple" ? (
              <div className="space-y-4">
                <div className="space-y-3">
                  {foodItems.map((item, index) => (
                    <div key={item.id} className="flex gap-3 items-start">
                      <div className="flex-1">
                        <Input
                          placeholder={`Food item ${index + 1} (e.g., Chicken salad)`}
                          value={item.name}
                          onChange={(e) => updateFoodItem(item.id, "name", e.target.value)}
                          className="mb-1"
                        />
                      </div>
                      <div className="w-32">
                        <Input
                          type="number"
                          placeholder="Calories"
                          value={item.calories}
                          onChange={(e) => updateFoodItem(item.id, "calories", e.target.value)}
                          className={item.error ? "border-red-500" : ""}
                        />
                        {item.error && (
                          <p className="text-red-500 text-xs mt-1">{item.error}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFoodItem(item.id)}
                        disabled={foodItems.length === 1}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={addFoodItem}
                  className="w-full border-dashed border-2 text-gray-600 hover:text-orange-600 hover:border-orange-400"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Food Item
                </Button>

                {errors.general && (
                  <p className="text-red-500 text-sm text-center">{errors.general}</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Calories Eaten Today
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 1850"
                    value={totalCaloriesInput}
                    onChange={(e) => setTotalCaloriesInput(e.target.value)}
                    className={`text-lg ${errors.totalCalories ? "border-red-500" : ""}`}
                  />
                  {errors.totalCalories && (
                    <p className="text-red-500 text-sm mt-1">{errors.totalCalories}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your total if you've already calculated it elsewhere
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button 
                onClick={calculateCalories}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Total
              </Button>
              <Button 
                variant="outline" 
                onClick={resetCalculator}
                className="px-6"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <Card id="results" className="mb-8 shadow-lg border-0 overflow-hidden">
            <CardHeader className={`text-white ${
              results.status === "below" ? "bg-blue-500" :
              results.status === "around" ? "bg-green-500" : "bg-orange-500"
            }`}>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Flame className="w-5 h-5" />
                Your Calorie Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {results.totalCalories.toLocaleString()}
                  <span className="text-2xl font-normal text-gray-500 ml-2">kcal</span>
                </div>
                <p className="text-lg text-gray-600">Total Calories Consumed</p>
              </div>

              <div className={`p-4 rounded-xl mb-6 ${
                results.status === "below" ? "bg-blue-50 border border-blue-200" :
                results.status === "around" ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"
              }`}>
                <p className={`text-center font-medium ${
                  results.status === "below" ? "text-blue-700" :
                  results.status === "around" ? "text-green-700" : "text-orange-700"
                }`}>
                  {results.interpretation}
                </p>
              </div>

              {mode === "multiple" && foodItems.filter(f => f.calories).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Your Food Items:</h4>
                  <div className="space-y-2">
                    {foodItems.filter(f => f.calories).map((item, index) => (
                      <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700">{item.name || `Item ${index + 1}`}</span>
                        <span className="font-medium text-gray-900">{parseFloat(item.calories).toLocaleString()} kcal</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-500 text-center italic">
                This free calorie counter is for rough tracking only and is not medical advice. Consult a healthcare professional for personalized nutrition guidance.
              </p>
            </CardContent>
          </Card>
        )}

        {results && <PostResultUpsell />}

        <Card className="mb-8 shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-orange-500" />
              More Free Health & Fitness Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {recommendedTools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="p-4 border border-gray-200 rounded-xl hover:border-orange-400 hover:shadow-md transition-all group"
                >
                  <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 mb-1">
                    {tool.name}
                  </h4>
                  <p className="text-sm text-gray-500">{tool.description}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use a Free Calorie Counter?</h2>
            <p className="text-gray-600 mb-4">
              Whether you're trying to lose weight, maintain your current physique, or simply become more aware of what you eat, a <strong>calorie counter for free</strong> is an invaluable tool. Unlike paid apps that require monthly subscriptions, our free calorie counter gives you instant access to track your daily food intake without any financial commitment.
            </p>
            <p className="text-gray-600 mb-4">
              Many people are surprised to learn how many calories they actually consume. That "small" snack or "light" lunch can add up quickly. By using a free online calorie counter, you can see exactly where your calories are coming from and make informed decisions about your diet.
            </p>
            <p className="text-gray-600">
              The best part? You don't need to download anything, create an account, or remember another password. Just open this page, add your foods, and get your total instantly.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How This Free Calorie Counter Works</h2>
            <p className="text-gray-600 mb-4">
              Our <strong>free calorie calculator</strong> is designed for simplicity and speed. Here's how to use it:
            </p>
            <ol className="list-decimal list-inside text-gray-600 space-y-2 mb-4">
              <li><strong>Add your food items:</strong> Enter each meal, snack, or beverage along with its calorie count. You can add as many items as you need.</li>
              <li><strong>Or enter a total:</strong> If you've already calculated your calories elsewhere, simply switch to "Total Only" mode and enter the number directly.</li>
              <li><strong>Click Calculate:</strong> Instantly see your total calorie consumption and how it compares to a typical 2,000 kcal daily intake.</li>
            </ol>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
              <p className="text-orange-800 font-medium">Key Benefits:</p>
              <ul className="list-disc list-inside text-orange-700 mt-2 space-y-1">
                <li>No login required</li>
                <li>No app to install</li>
                <li>No cost—ever</li>
                <li>Works on any device</li>
                <li>Your data stays private</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Free vs Paid Calorie Counters</h2>
            <p className="text-gray-600 mb-4">
              Wondering whether you need a premium calorie tracking app? Here's an honest comparison:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-bold text-green-800 mb-3">Free Calorie Counters</h3>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>✓ Quick and simple to use</li>
                  <li>✓ No signup or account needed</li>
                  <li>✓ Complete privacy (no data stored)</li>
                  <li>✓ Perfect for occasional tracking</li>
                  <li>✓ Access from any device instantly</li>
                </ul>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-bold text-blue-800 mb-3">Paid Calorie Apps</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Food database with barcode scanning</li>
                  <li>• Tracking history over time</li>
                  <li>• Macro and micronutrient breakdown</li>
                  <li>• Meal planning features</li>
                  <li>• Typically $10-20/month</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-600">
              For most people who want a quick daily check or are just starting their calorie awareness journey, a <strong>free online calorie counter</strong> is more than sufficient. Save your money for healthy food instead!
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Tracking Calories Without Burning Out</h2>
            <p className="text-gray-600 mb-4">
              Calorie counting doesn't have to be obsessive or stressful. Here are some practical tips to make it sustainable:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-3 mb-4">
              <li><strong>Don't aim for perfection:</strong> Being within 100-200 calories is close enough. Obsessing over exact numbers leads to burnout.</li>
              <li><strong>Track typical days first:</strong> Start by tracking a few normal days to understand your baseline before making changes.</li>
              <li><strong>Focus on patterns, not individual days:</strong> One high-calorie day won't ruin your progress. Look at weekly averages instead.</li>
              <li><strong>Use round numbers:</strong> Estimating "about 300 calories" for lunch is fine—you don't need decimal precision.</li>
              <li><strong>Take breaks:</strong> Once you've learned what a 500-calorie meal looks like, you can track less frequently.</li>
            </ul>
            <p className="text-gray-600">
              Remember, the goal of using a <strong>calorie counter for free</strong> is to build awareness, not to create anxiety around food.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions About Free Calorie Counters</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Counting Calories for Free Today</h2>
            <p className="text-gray-600 mb-4">
              Ready to take control of your nutrition? Our <strong>free calorie counter</strong> is waiting for you at the top of this page. No excuses about cost, no app store downloads, no account creation—just pure, simple calorie tracking.
            </p>
            <p className="text-gray-600">
              Scroll back up, add your foods, and see exactly how many calories you're consuming. It takes less than a minute, and the awareness you gain could be life-changing.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-100 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Learn More About Calorie Counting</h3>
          <p className="text-gray-600 mb-4">Explore our guides to get the most out of free calorie tracking</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/mbb/best-free-calorie-counters"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all font-medium text-gray-700 hover:text-orange-600"
            >
              Best Free Calorie Counters <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/mbb/how-to-count-calories-for-free"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all font-medium text-gray-700 hover:text-orange-600"
            >
              How to Count Calories for Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
