"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Flame, TrendingDown, TrendingUp, Scale, Activity, Clock, HelpCircle, ChevronDown, ArrowRight, Zap, Target, RotateCcw } from "lucide-react";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

interface Results {
  bmr: number;
  maintenance: number;
  mildDeficit: number;
  aggressiveDeficit: number;
  mildSurplus: number;
  bulkSurplus: number;
}

export default function CalorieCounterMaintenancePage() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [useMetric, setUseMetric] = useState(true);
  const [results, setResults] = useState<Results | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activityMultipliers: Record<string, { multiplier: number; label: string }> = {
    sedentary: { multiplier: 1.2, label: "Sedentary (little/no exercise)" },
    light: { multiplier: 1.375, label: "Lightly active (1-3 days/week)" },
    moderate: { multiplier: 1.55, label: "Moderately active (3-5 days/week)" },
    very: { multiplier: 1.725, label: "Very active (6-7 days/week)" },
    super: { multiplier: 1.9, label: "Super active (hard training/physical job)" },
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 14 || ageNum > 80) {
      newErrors.age = "Age must be between 14 and 80";
    }

    let height = 0;
    if (useMetric) {
      height = parseFloat(heightCm);
      if (!heightCm || isNaN(height) || height < 130 || height > 220) {
        newErrors.height = "Height must be between 130 and 220 cm";
      }
    } else {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      height = (feet * 30.48) + (inches * 2.54);
      if (height < 130 || height > 220) {
        newErrors.height = "Height must be between 4'3\" and 7'3\"";
      }
    }

    let weight = 0;
    if (useMetric) {
      weight = parseFloat(weightKg);
      if (!weightKg || isNaN(weight) || weight < 40 || weight > 200) {
        newErrors.weight = "Weight must be between 40 and 200 kg";
      }
    } else {
      weight = parseFloat(weightLb) * 0.453592;
      if (!weightLb || isNaN(weight) || weight < 40 || weight > 200) {
        newErrors.weight = "Weight must be between 88 and 440 lbs";
      }
    }

    if (!activityLevel) {
      newErrors.activity = "Please select your activity level";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTDEE = () => {
    if (!validateInputs()) return;

    const ageNum = parseInt(age);
    let heightInCm = useMetric 
      ? parseFloat(heightCm) 
      : (parseFloat(heightFeet) * 30.48) + (parseFloat(heightInches) * 2.54);
    let weightInKg = useMetric 
      ? parseFloat(weightKg) 
      : parseFloat(weightLb) * 0.453592;

    let bmr: number;
    if (sex === "male") {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageNum) + 5;
    } else {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageNum) - 161;
    }

    const multiplier = activityMultipliers[activityLevel].multiplier;
    const maintenance = bmr * multiplier;

    setResults({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      mildDeficit: Math.round(maintenance * 0.85),
      aggressiveDeficit: Math.round(maintenance * 0.80),
      mildSurplus: Math.round(maintenance * 1.10),
      bulkSurplus: Math.round(maintenance * 1.17),
    });

    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const resetCalculator = () => {
    setResults(null);
    setSex("male");
    setAge("");
    setHeightCm("");
    setHeightFeet("");
    setHeightInches("");
    setWeightKg("");
    setWeightLb("");
    setActivityLevel("");
    setErrors({});
  };

  const faqs = [
    {
      question: "Is this maintenance calorie estimate accurate?",
      answer: "This calculator uses the Mifflin-St Jeor equation, which is considered the most accurate formula for estimating BMR. However, individual metabolism varies based on genetics, muscle mass, hormones, and other factors. Use this as a starting point and adjust based on your real-world results over 2-4 weeks."
    },
    {
      question: "Can I lose weight eating at maintenance calories?",
      answer: "Generally no. Maintenance calories are designed to keep your weight stable. To lose weight, you need to create a calorie deficit by eating below your maintenance level. However, if you're new to strength training, you might experience body recomposition (losing fat while gaining muscle) even at maintenance."
    },
    {
      question: "How much of a calorie deficit is safe?",
      answer: "A moderate deficit of 300-500 calories (about 10-20% below maintenance) is safe and sustainable for most people. Very aggressive deficits (more than 25%) can lead to muscle loss, nutrient deficiencies, hormonal issues, and increased hunger that makes compliance difficult."
    },
    {
      question: "Do I need to count calories forever?",
      answer: "No. Counting calories is a learning tool that helps you understand portion sizes and the caloric density of foods. Most people count for 3-6 months to develop intuition, then can maintain their goals through mindful eating. You can always return to tracking if needed."
    },
    {
      question: "What if my actual weight change doesn't match the calculator?",
      answer: "The calculator provides an estimate. If you're not seeing expected results after 2-3 weeks of consistent tracking, adjust your intake by 100-200 calories. Factors like water retention, sodium intake, stress, sleep, and menstrual cycles can also temporarily mask fat loss."
    },
    {
      question: "How is TDEE different from BMR?",
      answer: "BMR (Basal Metabolic Rate) is the calories your body burns at complete rest just to maintain basic functions like breathing and circulation. TDEE (Total Daily Energy Expenditure) includes your BMR plus all the calories burned through daily activities, exercise, and digestion."
    },
  ];

  const calorieTable = [
    { weight: 60, sedentary: 1584, light: 1815, moderate: 2046, very: 2277 },
    { weight: 70, sedentary: 1704, light: 1952, moderate: 2201, very: 2449 },
    { weight: 80, sedentary: 1824, light: 2090, moderate: 2356, very: 2621 },
    { weight: 90, sedentary: 1944, light: 2227, moderate: 2511, very: 2794 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <MonetizationBar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Free TDEE Calculator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Calorie Counter Maintenance
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your daily maintenance calories using the Mifflin-St Jeor equation. This <strong>calorie counter maintenance</strong> calculator helps you determine exactly how many calories you need to maintain your current weight.
          </p>
        </div>

        <Card className="mb-8 border-2 border-orange-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Flame className="w-5 h-5 text-orange-500" />
              Maintenance Calorie Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6">
              <div>
                <label className="text-base font-medium mb-3 block text-gray-900">Sex</label>
                <div className="flex gap-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="sex" 
                      value="male" 
                      checked={sex === "male"}
                      onChange={() => setSex("male")}
                      className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="sex" 
                      value="female" 
                      checked={sex === "female"}
                      onChange={() => setSex("female")}
                      className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                    />
                    <span>Female</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setUseMetric(!useMetric)}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Switch to {useMetric ? "Imperial (lb/ft)" : "Metric (kg/cm)"}
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="age" className="text-sm font-medium text-gray-900 block mb-1.5">Age (years)</label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="e.g., 30"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                </div>

                {useMetric ? (
                  <div>
                    <label htmlFor="height" className="text-sm font-medium text-gray-900 block mb-1.5">Height (cm)</label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 175"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      className={errors.height ? "border-red-500" : ""}
                    />
                    {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
                  </div>
                ) : (
                  <div>
                    <label className="text-sm font-medium text-gray-900 block mb-1.5">Height (ft/in)</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="ft"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        className={errors.height ? "border-red-500" : ""}
                      />
                      <Input
                        type="number"
                        placeholder="in"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        className={errors.height ? "border-red-500" : ""}
                      />
                    </div>
                    {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
                  </div>
                )}

                {useMetric ? (
                  <div>
                    <label htmlFor="weight" className="text-sm font-medium text-gray-900 block mb-1.5">Weight (kg)</label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 70"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className={errors.weight ? "border-red-500" : ""}
                    />
                    {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                  </div>
                ) : (
                  <div>
                    <label htmlFor="weight" className="text-sm font-medium text-gray-900 block mb-1.5">Weight (lbs)</label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 154"
                      value={weightLb}
                      onChange={(e) => setWeightLb(e.target.value)}
                      className={errors.weight ? "border-red-500" : ""}
                    />
                    {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-900 block mb-1.5">Activity Level</label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger className={errors.activity ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(activityMultipliers).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.activity && <p className="text-red-500 text-sm mt-1">{errors.activity}</p>}
              </div>

              <Button 
                onClick={calculateTDEE}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Calculate My Maintenance Calories
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <div id="results" className="mb-10 scroll-mt-4">
            <Card className="border-2 border-green-200 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    Your Results
                  </span>
                  <button 
                    onClick={resetCalculator}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <Activity className="w-4 h-4" />
                      <span className="text-sm font-medium">Basal Metabolic Rate (BMR)</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{results.bmr.toLocaleString()} <span className="text-lg font-normal text-gray-500">kcal/day</span></p>
                    <p className="text-sm text-gray-500 mt-1">Calories burned at complete rest</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200">
                    <div className="flex items-center gap-2 text-orange-700 mb-2">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm font-medium">Maintenance Calories (TDEE)</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-600">{results.maintenance.toLocaleString()} <span className="text-lg font-normal text-orange-400">kcal/day</span></p>
                    <p className="text-sm text-orange-600/70 mt-1">Calories to maintain current weight</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-700 mb-3">
                      <TrendingDown className="w-4 h-4" />
                      <span className="font-medium">For Fat Loss</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Mild deficit (-15%)</span>
                        <span className="font-semibold text-blue-700">{results.mildDeficit.toLocaleString()} kcal</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Aggressive (-20%)</span>
                        <span className="font-semibold text-blue-700">{results.aggressiveDeficit.toLocaleString()} kcal</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-center gap-2 text-green-700 mb-3">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">For Muscle Gain</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Lean bulk (+10%)</span>
                        <span className="font-semibold text-green-700">{results.mildSurplus.toLocaleString()} kcal</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Bulk (+17%)</span>
                        <span className="font-semibold text-green-700">{results.bulkSurplus.toLocaleString()} kcal</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  * These are estimates based on the Mifflin-St Jeor equation. Individual results may vary. Not medical or nutrition advice.
                </p>
              </CardContent>
            </Card>

            <PostResultUpsell />
          </div>
        )}

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Scale className="w-6 h-6 text-orange-500" />
            What Are Maintenance Calories?
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              Maintenance calories, also known as Total Daily Energy Expenditure (TDEE), represent the total number of calories your body needs each day to maintain your current weight. This includes all the energy your body uses for basic functions (breathing, circulation, cell production), daily activities (walking, working, cooking), and any exercise you perform.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Understanding your maintenance calories is the foundation of any nutrition strategy. Whether you want to lose fat, build muscle, or maintain your current physique, you need to know this number first. Eat fewer calories than your maintenance level to lose weight, eat more to gain weight, or eat at maintenance to stay the same.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our <strong>calorie counter maintenance</strong> calculator uses the scientifically-validated Mifflin-St Jeor equation to estimate your BMR, then adjusts for your activity level to give you an accurate TDEE estimate.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-orange-500" />
            How This Maintenance Calorie Calculator Works
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              This calculator uses a two-step process to determine your daily calorie needs:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Step 1: Calculate BMR (Mifflin-St Jeor Formula)</h3>
              <p className="text-gray-600 text-sm mb-2">For men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</p>
              <p className="text-gray-600 text-sm">For women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Step 2: Apply Activity Multiplier</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Sedentary (little/no exercise): BMR × 1.2</li>
                <li>• Lightly active (1-3 days/week): BMR × 1.375</li>
                <li>• Moderately active (3-5 days/week): BMR × 1.55</li>
                <li>• Very active (6-7 days/week): BMR × 1.725</li>
                <li>• Super active (hard training/physical job): BMR × 1.9</li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              The Mifflin-St Jeor equation was developed in 1990 and has been shown in studies to be more accurate than older formulas like Harris-Benedict, especially for modern populations.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Maintenance Calories by Activity Level</h2>
          <p className="text-gray-600 mb-4">
            Here's a reference table showing estimated maintenance calories for different weights and activity levels (based on a 30-year-old, 170cm tall individual):
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
              <thead>
                <tr className="bg-orange-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Weight</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">Sedentary</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">Light</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">Moderate</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">Very Active</th>
                </tr>
              </thead>
              <tbody>
                {calorieTable.map((row, i) => (
                  <tr key={row.weight} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-200 px-4 py-3 font-medium">{row.weight} kg ({Math.round(row.weight * 2.205)} lbs)</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{row.sedentary.toLocaleString()} kcal</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{row.light.toLocaleString()} kcal</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{row.moderate.toLocaleString()} kcal</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{row.very.toLocaleString()} kcal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-blue-500" />
            Maintenance vs Deficit vs Surplus
          </h2>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <Card className="border-orange-200">
              <CardContent className="pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Maintenance</h3>
                <p className="text-sm text-gray-600">Eat at TDEE to maintain your current weight. Ideal for those who are happy with their physique or during diet breaks.</p>
              </CardContent>
            </Card>
            <Card className="border-blue-200">
              <CardContent className="pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Calorie Deficit</h3>
                <p className="text-sm text-gray-600">Eat 10-20% below TDEE to lose fat. A 500 calorie daily deficit equals roughly 1 lb of fat loss per week.</p>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardContent className="pt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Calorie Surplus</h3>
                <p className="text-sm text-gray-600">Eat 10-20% above TDEE to build muscle. Pair with resistance training for optimal muscle growth.</p>
              </CardContent>
            </Card>
          </div>
          <p className="text-gray-600">
            For a deeper dive into when to use each approach, check out our guide on <Link href="/articles/maintenance-vs-deficit-vs-surplus" className="text-orange-600 hover:text-orange-700 font-medium">Maintenance vs Deficit vs Surplus: Which Is Right for Your Goal?</Link>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-orange-500" />
            How Often Should You Recalculate Your Maintenance Calories?
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              Your maintenance calories aren't static—they change as your body and lifestyle change. Here's when you should recalculate:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span><strong>Every 10 lbs (4-5 kg) of weight change</strong> – Your TDEE decreases as you lose weight and increases as you gain.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span><strong>When your activity level changes significantly</strong> – Starting a new job, gym routine, or becoming more sedentary.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span><strong>Every 3-4 months during a diet</strong> – Even without major weight changes, metabolic adaptation can occur.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span><strong>If weight loss or gain stalls for 2+ weeks</strong> – Your actual TDEE may differ from the calculated estimate.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <Card className="bg-gradient-to-br from-gray-50 to-white border-gray-200">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">More Free Health & Fitness Tools</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/tools/calorie-counter-walking" className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-orange-600">Calorie Counter Walking</p>
                    <p className="text-sm text-gray-500">Calculate calories burned walking</p>
                  </div>
                </Link>
                <Link href="/tools/calorie-counter-steps" className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-orange-600">Calorie Counter Steps</p>
                    <p className="text-sm text-gray-500">Steps to calories calculator</p>
                  </div>
                </Link>
                <Link href="/tools/calorie-deficit-calculator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors group">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-orange-600">Calorie Deficit Calculator</p>
                    <p className="text-sm text-gray-500">Track your daily deficit</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-orange-500" />
            FAQ – Maintenance Calories and TDEE
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Learn More About Maintenance Calories</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/articles/what-are-maintenance-calories" className="block">
              <Card className="h-full hover:border-orange-300 transition-colors">
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    What Are Maintenance Calories?
                    <ArrowRight className="w-4 h-4 text-orange-500" />
                  </h3>
                  <p className="text-sm text-gray-600">A complete guide to understanding TDEE, how it's calculated, and why it matters for your fitness goals.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/articles/maintenance-vs-deficit-vs-surplus" className="block">
              <Card className="h-full hover:border-orange-300 transition-colors">
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    Maintenance vs Deficit vs Surplus
                    <ArrowRight className="w-4 h-4 text-orange-500" />
                  </h3>
                  <p className="text-sm text-gray-600">Which calorie approach is right for your goals? Learn when to cut, maintain, or bulk.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
                },
              })),
            }),
          }}
        />
      </div>
    </div>
  );
}
