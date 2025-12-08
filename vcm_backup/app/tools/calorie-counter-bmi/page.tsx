"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, Scale, Activity, Target, ChevronDown, ChevronUp, Info, AlertCircle, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PostResultUpsell from "@/components/PostResultUpsell";
import MonetizationBar from "@/components/MonetizationBar";

export default function CalorieCounterBMIPage() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [useImperial, setUseImperial] = useState(false);
  const [weightKg, setWeightKg] = useState("");
  const [weightLb, setWeightLb] = useState("");
  const [useLbs, setUseLbs] = useState(false);
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    bmi: number;
    bmiCategory: string;
    bmr: number;
    tdee: number;
    mildLoss: { min: number; max: number };
    aggressiveLoss: number;
    mildGain: { min: number; max: number };
    interpretation: string;
  } | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activityMultipliers: Record<string, { label: string; multiplier: number }> = {
    sedentary: { label: "Sedentary (little or no exercise)", multiplier: 1.2 },
    lightly: { label: "Lightly active (1-3 days/week)", multiplier: 1.375 },
    moderately: { label: "Moderately active (3-5 days/week)", multiplier: 1.55 },
    very: { label: "Very active (6-7 days/week)", multiplier: 1.725 },
    super: { label: "Super active (physical job + training)", multiplier: 1.9 },
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const getInterpretation = (bmi: number, category: string): string => {
    if (category === "Underweight") {
      return "Your BMI is in the 'Underweight' range. Consider consulting a healthcare provider. If weight gain is your goal, the suggested calorie surplus can help you reach a healthier weight safely.";
    }
    if (category === "Normal weight") {
      return "Your BMI is in the 'Normal weight' range. To maintain your current weight, aim for your maintenance calories. Adjust slightly based on your specific fitness goals.";
    }
    if (category === "Overweight") {
      return "Your BMI is in the 'Overweight' range. If fat loss is your goal, staying within the suggested calorie deficit may help over time. Combine with regular physical activity for best results.";
    }
    return "Your BMI is in the 'Obese' range. Working with a healthcare provider can help create a sustainable plan. The calorie ranges shown are starting points—individual needs vary.";
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 14 || ageNum > 80) {
      newErrors.age = "Age must be between 14 and 80 years";
    }

    let heightCmValue: number;
    if (useImperial) {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      heightCmValue = (feet * 30.48) + (inches * 2.54);
    } else {
      heightCmValue = parseFloat(heightCm);
    }
    
    if (isNaN(heightCmValue) || heightCmValue < 130 || heightCmValue > 220) {
      newErrors.height = "Height must be between 130 and 220 cm (4'3\" - 7'3\")";
    }

    let weightKgValue: number;
    if (useLbs) {
      weightKgValue = parseFloat(weightLb) / 2.205;
    } else {
      weightKgValue = parseFloat(weightKg);
    }

    if (isNaN(weightKgValue) || weightKgValue < 35 || weightKgValue > 200) {
      newErrors.weight = "Weight must be between 35 and 200 kg (77 - 440 lbs)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validateInputs()) return;

    let heightCmValue: number;
    if (useImperial) {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      heightCmValue = (feet * 30.48) + (inches * 2.54);
    } else {
      heightCmValue = parseFloat(heightCm);
    }

    let weightKgValue: number;
    if (useLbs) {
      weightKgValue = parseFloat(weightLb) / 2.205;
    } else {
      weightKgValue = parseFloat(weightKg);
    }

    const ageNum = parseInt(age);
    const heightM = heightCmValue / 100;

    // Calculate BMI
    const bmi = weightKgValue / (heightM * heightM);
    const bmiCategory = getBMICategory(bmi);

    // Calculate BMR (Mifflin-St Jeor)
    let bmr: number;
    if (sex === "male") {
      bmr = 10 * weightKgValue + 6.25 * heightCmValue - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKgValue + 6.25 * heightCmValue - 5 * ageNum - 161;
    }

    // Calculate TDEE
    const multiplier = activityMultipliers[activityLevel].multiplier;
    const tdee = bmr * multiplier;

    // Calculate calorie ranges
    const mildLoss = {
      min: Math.round(tdee * 0.85),
      max: Math.round(tdee * 0.90),
    };
    const aggressiveLoss = Math.round(tdee * 0.80);
    const mildGain = {
      min: Math.round(tdee * 1.10),
      max: Math.round(tdee * 1.15),
    };

    const interpretation = getInterpretation(bmi, bmiCategory);

    setResult({
      bmi,
      bmiCategory,
      bmr,
      tdee,
      mildLoss,
      aggressiveLoss,
      mildGain,
      interpretation,
    });

    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const reset = () => {
    setSex("male");
    setAge("");
    setHeightCm("");
    setHeightFeet("");
    setHeightInches("");
    setWeightKg("");
    setWeightLb("");
    setActivityLevel("sedentary");
    setErrors({});
    setResult(null);
  };

  const faqs = [
    {
      question: "Is BMI accurate for athletes?",
      answer: "BMI can be misleading for athletes and highly muscular individuals. Since muscle weighs more than fat, a fit athlete may have a 'high' BMI despite having low body fat. In these cases, body fat percentage or waist-to-hip ratio may be more useful measurements. However, BMI remains a useful screening tool for the general population.",
    },
    {
      question: "Can I rely only on BMI to judge my health?",
      answer: "No, BMI is just one of many health indicators. It doesn't account for muscle mass, bone density, body fat distribution, or other factors like blood pressure, cholesterol, and blood sugar. A complete health assessment should include multiple measurements and consultation with healthcare professionals.",
    },
    {
      question: "How many calories should I cut based on my BMI?",
      answer: "A safe starting point is a 10-20% reduction from your maintenance calories (TDEE). This typically translates to 250-500 fewer calories per day, which can lead to 0.5-1 lb of weight loss per week. Cutting more than 20% can be unsustainable and may lead to muscle loss. Always prioritize adequate protein intake when in a deficit.",
    },
    {
      question: "Do I need to change my BMI to be healthy?",
      answer: "Not necessarily. While a 'normal' BMI range (18.5-24.9) is associated with lower health risks, individual health depends on many factors. Some people are metabolically healthy at higher BMIs, while others may have health issues at 'normal' weights. Focus on sustainable habits, regular exercise, and overall well-being rather than just the number.",
    },
    {
      question: "How often should I recalculate my BMI and calories?",
      answer: "Recalculate every 4-8 weeks if you're actively trying to change your weight, or whenever your weight changes by 5+ pounds. As you lose or gain weight, your calorie needs change too. Regular recalculation helps you adjust your intake for continued progress and prevents plateaus.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href="/tools" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to All Tools
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
            <Scale className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calorie Counter BMI – Calculate Your BMI and Daily Calories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Use our free <strong>calorie counter BMI</strong> calculator to find your Body Mass Index 
            and estimated daily calorie needs. Enter your details below for personalized results 
            based on your height, weight, age, and activity level.
          </p>
        </div>

        {/* Calculator Card */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              BMI & Daily Calorie Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sex */}
              <div>
                <Label className="text-gray-700 font-medium mb-3 block">Sex</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      checked={sex === "male"}
                      onChange={() => setSex("male")}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      checked={sex === "female"}
                      onChange={() => setSex("female")}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age" className="text-gray-700 font-medium mb-2 block">
                  Age (years)
                </Label>
                <Input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g., 30"
                  className={errors.age ? "border-red-500" : ""}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              {/* Height */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-700 font-medium">Height</Label>
                  <button
                    type="button"
                    onClick={() => setUseImperial(!useImperial)}
                    className="text-sm text-orange-500 hover:text-orange-600"
                  >
                    Switch to {useImperial ? "cm" : "ft/in"}
                  </button>
                </div>
                {useImperial ? (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        placeholder="Feet"
                        className={errors.height ? "border-red-500" : ""}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        placeholder="Inches"
                        className={errors.height ? "border-red-500" : ""}
                      />
                    </div>
                  </div>
                ) : (
                  <Input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    placeholder="e.g., 175"
                    className={errors.height ? "border-red-500" : ""}
                  />
                )}
                {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
              </div>

              {/* Weight */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-gray-700 font-medium">Weight</Label>
                  <button
                    type="button"
                    onClick={() => setUseLbs(!useLbs)}
                    className="text-sm text-orange-500 hover:text-orange-600"
                  >
                    Switch to {useLbs ? "kg" : "lbs"}
                  </button>
                </div>
                {useLbs ? (
                  <Input
                    type="number"
                    value={weightLb}
                    onChange={(e) => setWeightLb(e.target.value)}
                    placeholder="e.g., 165"
                    className={errors.weight ? "border-red-500" : ""}
                  />
                ) : (
                  <Input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="e.g., 75"
                    className={errors.weight ? "border-red-500" : ""}
                  />
                )}
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
              </div>

              {/* Activity Level */}
              <div className="md:col-span-2">
                <Label className="text-gray-700 font-medium mb-2 block">Activity Level</Label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {Object.entries(activityMultipliers).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button 
                onClick={calculate}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3"
              >
                Calculate BMI & Calories
              </Button>
              <Button 
                onClick={reset}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        {result && (
          <Card id="results" className="shadow-lg border-0 mb-8 border-l-4 border-l-orange-500">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Target className="w-5 h-5 text-orange-500" />
                Your Results
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* BMI Result */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Your BMI</div>
                  <div className="text-3xl font-bold text-orange-600">{result.bmi.toFixed(1)}</div>
                  <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                    result.bmiCategory === "Normal weight" 
                      ? "bg-green-100 text-green-700"
                      : result.bmiCategory === "Underweight"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {result.bmiCategory}
                  </div>
                </div>

                {/* TDEE Result */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Daily Maintenance Calories</div>
                  <div className="text-3xl font-bold text-blue-600">{Math.round(result.tdee)} kcal</div>
                  <div className="text-sm text-gray-500 mt-2">
                    BMR: {Math.round(result.bmr)} kcal
                  </div>
                </div>
              </div>

              {/* Calorie Ranges */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">Mild Weight Loss</div>
                  <div className="text-lg font-semibold text-green-600">
                    {result.mildLoss.min} - {result.mildLoss.max} kcal
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10-15% deficit</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">Aggressive Loss</div>
                  <div className="text-lg font-semibold text-amber-600">
                    {result.aggressiveLoss} kcal
                  </div>
                  <div className="text-xs text-gray-500 mt-1">20% deficit</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">Mild Weight Gain</div>
                  <div className="text-lg font-semibold text-purple-600">
                    {result.mildGain.min} - {result.mildGain.max} kcal
                  </div>
                  <div className="text-xs text-gray-500 mt-1">10-15% surplus</div>
                </div>
              </div>

              {/* Interpretation */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{result.interpretation}</p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>BMI and calorie estimates are approximate and do not replace professional medical advice.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Post-Result CTA */}
        {result && (
          <section className="mb-8">
            <PostResultUpsell />
          </section>
        )}

        {/* More Tools Card */}
        <Card className="shadow-md border-0 mb-10">
          <CardHeader>
            <CardTitle className="text-lg">More Free Health Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              <Link 
                href="/tools/calorie-counter-maintenance"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
              >
                <Activity className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Maintenance Calorie Calculator</span>
              </Link>
              <Link 
                href="/tools/calorie-counter-best"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
              >
                <Scale className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Best Calorie Counter Comparison</span>
              </Link>
              <Link 
                href="/tools/calorie-counter-walking"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
              >
                <Target className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Walking Calorie Calculator</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* SEO Content Sections */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What Is BMI and How Is It Calculated?
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              Body Mass Index (BMI) is a simple screening measure that uses your height and weight to estimate 
              body fat. The formula divides your weight in kilograms by your height in meters squared: 
              <strong> BMI = weight (kg) ÷ height² (m²)</strong>.
            </p>
            <p className="text-gray-600 mb-4">
              For example, someone who weighs 70 kg and is 1.75 m tall would have a BMI of 70 ÷ (1.75 × 1.75) = 22.9. 
              This number falls within the "normal weight" category. While BMI doesn't directly measure body fat, 
              it correlates reasonably well with more precise methods for most people.
            </p>
            <p className="text-gray-600">
              Our <strong>calorie counter BMI</strong> calculator goes further by combining your BMI assessment with 
              personalized calorie estimates, giving you actionable guidance for your health goals.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            BMI Categories and Health Ranges
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Underweight (BMI &lt; 18.5)</h3>
              <p className="text-sm text-gray-600">
                May indicate nutritional deficiency or underlying health issues. Associated with weakened 
                immune system, osteoporosis risk, and fertility problems.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Normal Weight (BMI 18.5–24.9)</h3>
              <p className="text-sm text-gray-600">
                Generally associated with lowest health risks. Optimal range for most adults, though 
                individual factors like muscle mass and age matter.
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2">Overweight (BMI 25–29.9)</h3>
              <p className="text-sm text-gray-600">
                Increased risk of cardiovascular disease, type 2 diabetes, and joint problems. Lifestyle 
                modifications often recommended.
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-800 mb-2">Obese (BMI 30+)</h3>
              <p className="text-sm text-gray-600">
                Significantly elevated health risks across multiple conditions. Medical supervision 
                often beneficial for developing a comprehensive health plan.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How BMI Connects to Daily Calorie Needs
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              While BMI itself doesn't directly determine calorie needs, the same inputs—height, weight, age, 
              and sex—are essential for calculating your daily energy requirements. Our <strong>BMI calorie calculator</strong> uses 
              the Mifflin-St Jeor equation, widely considered the most accurate formula for estimating Basal 
              Metabolic Rate (BMR).
            </p>
            <p className="text-gray-600 mb-4">
              Your BMR represents the calories your body burns at complete rest—just to keep you alive. When 
              multiplied by an activity factor based on your exercise habits, you get your Total Daily Energy 
              Expenditure (TDEE). This is your maintenance level: the calories needed to maintain your current weight.
            </p>
            <p className="text-gray-600">
              The relationship between BMI and calories becomes practical when setting goals. If your BMI indicates 
              you're overweight, eating below your TDEE creates a calorie deficit for fat loss. If you're underweight, 
              eating above TDEE helps you gain weight safely.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Using a BMI Calorie Counter for Your Goals
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              Here's how to apply your <strong>calorie counter BMI</strong> results effectively:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>For weight loss:</strong> Start with a mild deficit (10-15% below TDEE). This typically means 
                eating 200-400 fewer calories daily, leading to 0.5-1 lb of fat loss per week. Sustainable and 
                preserves muscle mass.</li>
              <li><strong>For weight maintenance:</strong> Aim for your calculated TDEE. Track your weight weekly and 
                adjust by 100-200 calories if you're gaining or losing unintentionally.</li>
              <li><strong>For weight gain:</strong> Add 10-15% above TDEE. Combine with resistance training to ensure 
                the extra calories build muscle rather than just fat.</li>
              <li><strong>Recalculate regularly:</strong> As your weight changes, so do your calorie needs. Update 
                your numbers every 4-8 weeks or whenever your weight shifts by 5+ pounds.</li>
            </ul>
            <p className="text-gray-600">
              Remember: these are starting points. Individual metabolism varies, so monitor your progress and adjust 
              as needed. Consistency in tracking matters more than perfect precision.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            FAQ – BMI and Calories
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Content */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Reading</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              href="/mbb/what-is-bmi"
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-1">
                What Is BMI? Understanding Body Mass Index
              </h3>
              <p className="text-sm text-gray-600">
                Deep dive into the history, calculation, and limitations of BMI as a health metric.
              </p>
            </Link>
            <Link 
              href="/mbb/bmi-vs-body-fat"
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-1">
                BMI vs Body Fat: What's the Difference?
              </h3>
              <p className="text-sm text-gray-600">
                Learn when BMI falls short and why body fat percentage may be more accurate.
              </p>
            </Link>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm pt-8 pb-12 border-t border-gray-200">
          <p>© {new Date().getFullYear()} VCM Suite. Free BMI and calorie tools for everyone.</p>
        </footer>
      </div>

      <MonetizationBar />
    </div>
  );
}
