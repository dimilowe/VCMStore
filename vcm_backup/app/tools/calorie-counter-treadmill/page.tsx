"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calculator, Flame, ChevronDown, ArrowRight, Zap, RotateCcw, Timer, Gauge, TrendingUp, Activity, Footprints } from "lucide-react";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

interface Results {
  calories: number;
  distanceKm: number;
  distanceMiles: number;
  paceMinPerKm: number;
  paceMinPerMile: number;
  intensity: "light" | "moderate" | "vigorous";
  met: number;
}

export default function TreadmillCalorieCounterPage() {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [duration, setDuration] = useState("");
  const [speed, setSpeed] = useState("");
  const [speedUnit, setSpeedUnit] = useState<"kmh" | "mph">("kmh");
  const [incline, setIncline] = useState("");
  const [activityMode, setActivityMode] = useState<"walk" | "jog" | "run" | "intervals">("jog");
  const [results, setResults] = useState<Results | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getBaseMET = (speedKmh: number): number => {
    if (speedKmh < 4) return 2.5;
    if (speedKmh < 5) return 3.0;
    if (speedKmh < 6) return 3.8;
    if (speedKmh < 7) return 4.3;
    if (speedKmh < 8) return 6.0;
    if (speedKmh < 9) return 8.3;
    if (speedKmh < 10) return 9.0;
    if (speedKmh < 12) return 10.0;
    return 11.0;
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    const weightVal = parseFloat(weight);
    const weightKg = weightUnit === "lb" ? weightVal * 0.453592 : weightVal;
    if (!weight || isNaN(weightVal)) {
      newErrors.weight = "Please enter your weight";
    } else if (weightKg < 30 || weightKg > 200) {
      newErrors.weight = "Weight must be between 30-200 kg (66-440 lb)";
    }

    const durationVal = parseFloat(duration);
    if (!duration || isNaN(durationVal)) {
      newErrors.duration = "Please enter workout duration";
    } else if (durationVal < 1 || durationVal > 240) {
      newErrors.duration = "Duration must be between 1-240 minutes";
    }

    const speedVal = parseFloat(speed);
    const speedKmh = speedUnit === "mph" ? speedVal * 1.60934 : speedVal;
    if (!speed || isNaN(speedVal)) {
      newErrors.speed = "Please enter treadmill speed";
    } else if (speedKmh < 1 || speedKmh > 25) {
      newErrors.speed = "Speed must be between 1-25 km/h (0.6-15.5 mph)";
    }

    const inclineVal = parseFloat(incline || "0");
    if (incline && (isNaN(inclineVal) || inclineVal < 0 || inclineVal > 15)) {
      newErrors.incline = "Incline must be between 0-15%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCalories = () => {
    if (!validateInputs()) return;

    const weightVal = parseFloat(weight);
    const weightKg = weightUnit === "lb" ? weightVal * 0.453592 : weightVal;
    const durationMin = parseFloat(duration);
    const speedVal = parseFloat(speed);
    const speedKmh = speedUnit === "mph" ? speedVal * 1.60934 : speedVal;
    const inclineVal = parseFloat(incline || "0");

    let baseMET = getBaseMET(speedKmh);
    
    if (activityMode === "intervals") {
      baseMET += 1.0;
    }

    const inclineBonus = Math.min(inclineVal / 5, 3) * 0.5;
    const finalMET = baseMET + inclineBonus;

    const calories = Math.round(finalMET * 3.5 * weightKg / 200 * durationMin);

    const distanceKm = speedKmh * (durationMin / 60);
    const distanceMiles = distanceKm * 0.621371;

    const paceMinPerKm = durationMin / distanceKm;
    const paceMinPerMile = durationMin / distanceMiles;

    let intensity: "light" | "moderate" | "vigorous";
    if (finalMET < 4) {
      intensity = "light";
    } else if (finalMET < 7) {
      intensity = "moderate";
    } else {
      intensity = "vigorous";
    }

    setResults({
      calories,
      distanceKm: Math.round(distanceKm * 100) / 100,
      distanceMiles: Math.round(distanceMiles * 100) / 100,
      paceMinPerKm: Math.round(paceMinPerKm * 100) / 100,
      paceMinPerMile: Math.round(paceMinPerMile * 100) / 100,
      intensity,
      met: Math.round(finalMET * 10) / 10,
    });

    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const resetCalculator = () => {
    setResults(null);
    setWeight("");
    setDuration("");
    setSpeed("");
    setIncline("");
    setErrors({});
  };

  const formatPace = (totalMinutes: number) => {
    const mins = Math.floor(totalMinutes);
    const secs = Math.round((totalMinutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const calorieTable = [
    { time: 20, speeds: [80, 120, 160, 200] },
    { time: 30, speeds: [120, 180, 240, 300] },
    { time: 45, speeds: [180, 270, 360, 450] },
    { time: 60, speeds: [240, 360, 480, 600] },
  ];

  const faqs = [
    {
      question: "Is the treadmill calorie display accurate?",
      answer: "Treadmill displays often overestimate calories by 15-20% because they use generic formulas that don't account for your specific body composition, fitness level, or running efficiency. Our calorie counter for treadmill uses MET-based calculations with your actual weight for more accurate estimates."
    },
    {
      question: "Does holding the handrails reduce calorie burn?",
      answer: "Yes, significantly! Holding onto the handrails can reduce your calorie burn by 20-40% because it transfers some of your body weight to the machine and reduces the effort required. For accurate calorie tracking and better workouts, try to use the treadmill without holding the rails."
    },
    {
      question: "Is running outside and running on a treadmill the same?",
      answer: "Not exactly. Running outdoors typically burns 3-5% more calories due to wind resistance and varying terrain. To simulate outdoor conditions on a treadmill, set a 1% incline. This is why our treadmill calorie calculator includes an incline adjustment."
    },
    {
      question: "How many treadmill calories equal 1 pound of fat?",
      answer: "Approximately 3,500 calories equals one pound of body fat. So if you burn 300 extra calories per treadmill session, it would take about 12 sessions to burn one pound—assuming your diet stays consistent. Use this calorie counter for treadmill to track your progress."
    },
    {
      question: "How often should I use a treadmill calorie counter?",
      answer: "Use it for every workout initially to build awareness of how different speeds, inclines, and durations affect your calorie burn. Once you understand the patterns, you can estimate based on experience and use the calculator periodically to verify your estimates."
    },
    {
      question: "Does incline really burn that many more calories?",
      answer: "Yes! Walking at a 10% incline can burn roughly 50-100% more calories than walking on a flat surface at the same speed. The incline forces your muscles to work harder against gravity, significantly increasing energy expenditure."
    },
  ];

  const recommendedTools = [
    { name: "Free Calorie Counter", href: "/tools/calorie-counter-free", description: "Track your daily food intake" },
    { name: "Walking Calories Calculator", href: "/tools/calorie-counter-walking", description: "Calculate calories burned walking" },
    { name: "Maintenance Calories Calculator", href: "/tools/calorie-counter-maintenance", description: "Find your daily calorie needs" },
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
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calorie Counter for Treadmill – Calculate Calories Burned on the Treadmill
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use this free <strong>calorie counter for treadmill</strong> workouts to calculate exactly how many calories you're burning. Enter your weight, speed, incline, and duration to get accurate MET-based calorie estimates.
          </p>
        </div>

        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="w-5 h-5" />
              Treadmill Calorie Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Weight
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={weightUnit === "kg" ? "e.g., 70" : "e.g., 154"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className={errors.weight ? "border-red-500 flex-1" : "flex-1"}
                  />
                  <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                    <button
                      onClick={() => setWeightUnit("kg")}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        weightUnit === "kg" ? "bg-white shadow text-orange-600" : "text-gray-600"
                      }`}
                    >
                      kg
                    </button>
                    <button
                      onClick={() => setWeightUnit("lb")}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        weightUnit === "lb" ? "bg-white shadow text-orange-600" : "text-gray-600"
                      }`}
                    >
                      lb
                    </button>
                  </div>
                </div>
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Timer className="w-4 h-4 inline mr-1" />
                  Workout Duration (minutes)
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={errors.duration ? "border-red-500" : ""}
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Gauge className="w-4 h-4 inline mr-1" />
                  Treadmill Speed
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder={speedUnit === "kmh" ? "e.g., 8" : "e.g., 5"}
                    value={speed}
                    onChange={(e) => setSpeed(e.target.value)}
                    className={errors.speed ? "border-red-500 flex-1" : "flex-1"}
                  />
                  <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                    <button
                      onClick={() => setSpeedUnit("kmh")}
                      className={`px-2 py-1 rounded text-sm font-medium transition-all ${
                        speedUnit === "kmh" ? "bg-white shadow text-orange-600" : "text-gray-600"
                      }`}
                    >
                      km/h
                    </button>
                    <button
                      onClick={() => setSpeedUnit("mph")}
                      className={`px-2 py-1 rounded text-sm font-medium transition-all ${
                        speedUnit === "mph" ? "bg-white shadow text-orange-600" : "text-gray-600"
                      }`}
                    >
                      mph
                    </button>
                  </div>
                </div>
                {errors.speed && <p className="text-red-500 text-sm mt-1">{errors.speed}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Incline (%)
                </label>
                <Input
                  type="number"
                  step="0.5"
                  placeholder="e.g., 2 (optional)"
                  value={incline}
                  onChange={(e) => setIncline(e.target.value)}
                  className={errors.incline ? "border-red-500" : ""}
                />
                {errors.incline && <p className="text-red-500 text-sm mt-1">{errors.incline}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Mode
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "walk", label: "Walk", icon: Footprints },
                  { value: "jog", label: "Jog", icon: Activity },
                  { value: "run", label: "Run", icon: Flame },
                  { value: "intervals", label: "Intervals", icon: Zap },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setActivityMode(value as typeof activityMode)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                      activityMode === value
                        ? "bg-orange-50 border-orange-400 text-orange-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button 
                onClick={calculateCalories}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate Calories
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
              results.intensity === "light" ? "bg-blue-500" :
              results.intensity === "moderate" ? "bg-green-500" : "bg-orange-500"
            }`}>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Flame className="w-5 h-5" />
                Treadmill Workout Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {results.calories.toLocaleString()}
                  <span className="text-2xl font-normal text-gray-500 ml-2">kcal</span>
                </div>
                <p className="text-lg text-gray-600">Estimated Calories Burned on the Treadmill</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Distance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {results.distanceKm} km
                    <span className="text-lg font-normal text-gray-500 ml-2">({results.distanceMiles} mi)</span>
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-1">Average Pace</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatPace(results.paceMinPerKm)} /km
                    <span className="text-lg font-normal text-gray-500 ml-2">({formatPace(results.paceMinPerMile)} /mi)</span>
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-xl mb-6 ${
                results.intensity === "light" ? "bg-blue-50 border border-blue-200" :
                results.intensity === "moderate" ? "bg-green-50 border border-green-200" : "bg-orange-50 border border-orange-200"
              }`}>
                <p className={`text-center font-medium ${
                  results.intensity === "light" ? "text-blue-700" :
                  results.intensity === "moderate" ? "text-green-700" : "text-orange-700"
                }`}>
                  This workout is in the <strong>{results.intensity} intensity</strong> range (MET: {results.met})
                </p>
              </div>

              <p className="text-sm text-gray-500 text-center italic">
                These are estimates based on standard MET formulas and don't replace professional advice. Actual calorie burn varies based on fitness level and body composition.
              </p>
            </CardContent>
          </Card>
        )}

        {results && <PostResultUpsell />}

        <Card className="mb-8 shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-orange-500" />
              More Free Fitness Calculators
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Many Calories Does the Treadmill Burn?</h2>
            <p className="text-gray-600 mb-4">
              The number of calories you burn on a treadmill depends on four main factors: your <strong>body weight</strong>, <strong>speed</strong>, <strong>incline</strong>, and <strong>workout duration</strong>. A heavier person burns more calories at the same pace because they're moving more mass. Similarly, running faster or at a steeper incline requires more energy, increasing your calorie expenditure.
            </p>
            <p className="text-gray-600 mb-4">
              Our <strong>calorie counter for treadmill</strong> uses the Metabolic Equivalent of Task (MET) system to estimate your burn. METs measure the energy cost of physical activities as a multiple of your resting metabolic rate. Walking slowly (about 3 km/h) has a MET of around 2.5, while running at 10 km/h jumps to about 10 METs.
            </p>
            <p className="text-gray-600">
              Use this treadmill calorie calculator before and after workouts to understand how different settings affect your calorie burn, helping you optimize your training for weight loss or fitness goals.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Treadmill Calories by Speed and Time</h2>
            <p className="text-gray-600 mb-4">
              This table shows estimated calories burned for a 70kg (154 lb) person at different speeds and durations on a flat treadmill:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-200 px-4 py-3 text-left">Duration</th>
                    <th className="border border-gray-200 px-4 py-3 text-center">4 km/h<br/><span className="text-sm text-gray-500">(2.5 mph)</span></th>
                    <th className="border border-gray-200 px-4 py-3 text-center">6 km/h<br/><span className="text-sm text-gray-500">(3.7 mph)</span></th>
                    <th className="border border-gray-200 px-4 py-3 text-center">8 km/h<br/><span className="text-sm text-gray-500">(5 mph)</span></th>
                    <th className="border border-gray-200 px-4 py-3 text-center">10 km/h<br/><span className="text-sm text-gray-500">(6.2 mph)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {calorieTable.map((row) => (
                    <tr key={row.time}>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{row.time} minutes</td>
                      {row.speeds.map((cal, i) => (
                        <td key={i} className="border border-gray-200 px-4 py-3 text-center">{cal} kcal</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500">
              Note: Actual values depend on your weight. Use our <strong>treadmill calories burned calculator</strong> above for personalized results.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Does Incline Burn More Calories on the Treadmill?</h2>
            <p className="text-gray-600 mb-4">
              Absolutely! Walking or running at an incline significantly increases your calorie burn because you're working against gravity. For every 1% increase in incline, you can expect roughly a 5-10% increase in energy expenditure at the same speed.
            </p>
            <p className="text-gray-600 mb-4">
              For example, a 30-minute walk at 5 km/h on a flat treadmill might burn around 120 calories for a 70kg person. Add a 10% incline, and that same walk could burn 180-200 calories—a 50-65% increase!
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
              <p className="text-orange-800 font-medium mb-2">Incline Benefits:</p>
              <ul className="list-disc list-inside text-orange-700 space-y-1">
                <li>Burns significantly more calories at the same speed</li>
                <li>Builds leg and glute strength</li>
                <li>Reduces impact compared to running flat</li>
                <li>Simulates outdoor hill training</li>
              </ul>
            </div>
            <p className="text-gray-600">
              Try our <strong>calorie counter for treadmill</strong> above with different incline settings to see how much more you can burn by adding just a few percent grade.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Walking vs Running on a Treadmill</h2>
            <p className="text-gray-600 mb-4">
              Running burns more calories per minute than walking, but the difference might be smaller than you think when comparing total workout calories. Here's a practical comparison:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-bold text-blue-800 mb-3">Walking (5 km/h for 60 min)</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>~240 calories burned</li>
                  <li>Lower impact on joints</li>
                  <li>Sustainable for longer durations</li>
                  <li>Easier to recover from</li>
                  <li>Great for beginners</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <h3 className="font-bold text-green-800 mb-3">Running (10 km/h for 30 min)</h3>
                <ul className="text-green-700 space-y-2 text-sm">
                  <li>~300 calories burned</li>
                  <li>Higher intensity, faster results</li>
                  <li>Improves cardiovascular fitness</li>
                  <li>Time-efficient workouts</li>
                  <li>Burns more calories per minute</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-600">
              The best choice depends on your fitness level and goals. Many experts recommend a mix of both for optimal health benefits.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ – Treadmill Calories and Weight Loss</h2>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Tracking Your Treadmill Calories Today</h2>
            <p className="text-gray-600 mb-4">
              Ready to get accurate calorie estimates for your treadmill workouts? Our <strong>treadmill calorie calculator</strong> is waiting for you at the top of this page. Enter your weight, set your speed and incline, and discover exactly how many calories your workout will burn.
            </p>
            <p className="text-gray-600">
              Whether you're training for weight loss, building endurance, or just curious about your calorie burn, this free <strong>calorie counter for treadmill</strong> gives you the data you need to optimize your workouts.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-100 rounded-2xl text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Learn More About Treadmill Training</h3>
          <p className="text-gray-600 mb-4">Explore our guides to maximize your treadmill workouts</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/mbb/treadmill-calories-guide"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all font-medium text-gray-700 hover:text-orange-600"
            >
              Treadmill Calories Guide <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/mbb/incline-vs-speed-treadmill"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all font-medium text-gray-700 hover:text-orange-600"
            >
              Incline vs Speed: What Burns More? <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
