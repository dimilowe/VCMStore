"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Scale, BookOpen, History, Calculator } from "lucide-react";
import PostResultUpsell from "@/components/PostResultUpsell";
import MonetizationBar from "@/components/MonetizationBar";

export default function WhatIsBMIPage() {
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
            <BookOpen className="w-7 h-7 text-orange-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Is BMI? Understanding Body Mass Index
          </h1>
          <p className="text-lg text-gray-600">
            A complete guide to Body Mass Index: what it measures, how it's calculated, 
            its clinical applications, and important limitations you should know about.
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <History className="w-6 h-6 text-orange-500" />
              The History and Origin of BMI
            </h2>
            <p className="text-gray-600 mb-4">
              Body Mass Index wasn't always called BMI. The concept was developed in the 1830s by Belgian 
              mathematician and statistician Adolphe Quetelet. He created what he called the "Quetelet Index" 
              as part of his work on "social physics"—an attempt to apply statistical methods to understand 
              human populations.
            </p>
            <p className="text-gray-600 mb-4">
              Quetelet observed that among adults of normal build, weight seemed to scale with the square of 
              height. This observation led to the simple formula we still use today: weight divided by 
              height squared. However, Quetelet never intended this formula for individual health assessment—he 
              was interested in population-level statistics.
            </p>
            <p className="text-gray-600 mb-4">
              The term "Body Mass Index" wasn't coined until 1972, when researcher Ancel Keys published a paper 
              comparing various weight-height formulas. Keys found that Quetelet's formula correlated well with 
              body fat percentage in large population studies, though he acknowledged its limitations for individuals. 
              The name "Body Mass Index" stuck, and BMI became the standard screening tool it is today.
            </p>
            <p className="text-gray-600">
              By the 1980s and 1990s, health organizations worldwide adopted BMI as a primary screening metric 
              for weight-related health risks. The World Health Organization established the category thresholds 
              (underweight, normal, overweight, obese) that remain in use, though these cutoffs have faced 
              criticism for not accounting for variations across ethnicities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-orange-500" />
              How BMI Is Calculated
            </h2>
            <p className="text-gray-600 mb-4">
              The BMI formula is remarkably simple, which is both its strength and its limitation:
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <p className="text-center text-lg font-mono text-gray-800">
                <strong>BMI = weight (kg) ÷ height² (m²)</strong>
              </p>
              <p className="text-center text-sm text-gray-500 mt-2">
                Or in imperial units: BMI = weight (lbs) ÷ height² (inches²) × 703
              </p>
            </div>

            <p className="text-gray-600 mb-4">
              Let's work through an example. Consider someone who weighs 75 kg (165 lbs) and is 1.78 m 
              (5'10") tall:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Height in meters squared: 1.78 × 1.78 = 3.17 m²</li>
              <li>BMI calculation: 75 ÷ 3.17 = 23.7</li>
            </ul>
            <p className="text-gray-600 mb-4">
              A BMI of 23.7 falls within the "normal weight" category (18.5–24.9). But what do these 
              categories actually mean?
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                <div className="font-semibold text-yellow-800">&lt; 18.5</div>
                <div className="text-sm text-gray-600">Underweight</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="font-semibold text-green-800">18.5–24.9</div>
                <div className="text-sm text-gray-600">Normal</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                <div className="font-semibold text-orange-800">25–29.9</div>
                <div className="text-sm text-gray-600">Overweight</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                <div className="font-semibold text-red-800">30+</div>
                <div className="text-sm text-gray-600">Obese</div>
              </div>
            </div>

            <p className="text-gray-600">
              These thresholds are based on statistical associations between BMI and health outcomes in 
              large population studies. They represent ranges where certain health risks tend to increase, 
              not absolute boundaries of healthy vs. unhealthy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What BMI Actually Measures (And What It Doesn't)
            </h2>
            <p className="text-gray-600 mb-4">
              Despite its name, BMI doesn't actually measure body mass in a meaningful physiological sense. 
              It's a ratio that correlates with body fat at a population level but doesn't distinguish 
              between different types of body mass:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Muscle mass:</strong> BMI treats muscle the same as fat. A bodybuilder and an 
                obese person of the same height and weight will have identical BMIs.</li>
              <li><strong>Fat distribution:</strong> BMI doesn't know where fat is stored. Visceral fat 
                (around organs) is more dangerous than subcutaneous fat (under the skin), but BMI can't 
                tell the difference.</li>
              <li><strong>Bone density:</strong> People with denser bones will have higher BMIs without 
                having more fat.</li>
              <li><strong>Age-related changes:</strong> As people age, they typically lose muscle and gain 
                fat, but their BMI might stay the same.</li>
            </ul>
            <p className="text-gray-600">
              This is why BMI is best used as a screening tool, not a diagnostic one. It can flag potential 
              concerns, but a complete health assessment requires additional measurements and clinical evaluation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Strengths of BMI
            </h2>
            <p className="text-gray-600 mb-4">
              Despite its limitations, BMI remains widely used for good reasons:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Simplicity:</strong> Only requires a scale and measuring tape. No specialized 
                equipment, training, or lab work needed.</li>
              <li><strong>Reproducibility:</strong> Different people measuring the same individual will 
                get consistent results, unlike some other assessments.</li>
              <li><strong>Population validity:</strong> For the general population (not athletes or 
                extreme cases), BMI correlates reasonably well with health outcomes.</li>
              <li><strong>Tracking changes:</strong> BMI is useful for monitoring weight changes over 
                time in the same individual.</li>
              <li><strong>Research utility:</strong> Its long history means researchers can compare data 
                across decades and populations.</li>
            </ul>
            <p className="text-gray-600">
              For most adults, BMI provides a reasonable starting point for health conversations. Combined 
              with other measures like waist circumference, it offers valuable insights into weight-related 
              health risks.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Limitations and Criticisms of BMI
            </h2>
            <p className="text-gray-600 mb-4">
              BMI has faced increasing criticism in recent years, and many of these criticisms are valid:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Ethnic and Racial Variations</h3>
            <p className="text-gray-600 mb-4">
              The standard BMI categories were developed primarily using data from European populations. 
              Research shows that health risks associated with different BMI levels vary significantly 
              across ethnic groups. For example, people of Asian descent may experience health complications 
              at lower BMIs, leading some health organizations to recommend lower cutoffs for Asian populations.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Athletes and Muscular Individuals</h3>
            <p className="text-gray-600 mb-4">
              Perhaps the most commonly cited limitation: athletes, bodybuilders, and naturally muscular 
              individuals often have "overweight" or even "obese" BMIs despite low body fat and excellent 
              metabolic health. Their extra weight comes from muscle, not fat.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">The "Normal Weight Obese" Phenomenon</h3>
            <p className="text-gray-600 mb-4">
              Conversely, some people with normal BMIs have metabolically unhealthy amounts of body fat, 
              particularly if they're sedentary and have little muscle mass. This "skinny fat" condition 
              can carry significant health risks that BMI misses entirely.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">Age and Gender Differences</h3>
            <p className="text-gray-600 mb-4">
              BMI doesn't account for normal changes in body composition with aging, nor does it reflect 
              the natural differences in body fat percentage between men and women. A woman with a BMI of 
              24 and a man with a BMI of 24 may have very different body fat percentages.
            </p>

            <p className="text-gray-600">
              Despite these limitations, no alternative measure has successfully replaced BMI for initial 
              health screening. The key is understanding what BMI can and cannot tell you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              BMI in Clinical Practice
            </h2>
            <p className="text-gray-600 mb-4">
              Healthcare providers use BMI as one data point among many. A doctor evaluating a patient's 
              weight-related health will typically also consider:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Waist circumference (for visceral fat estimation)</li>
              <li>Blood pressure, cholesterol, and blood sugar levels</li>
              <li>Family history of weight-related conditions</li>
              <li>Physical activity levels and eating patterns</li>
              <li>Patient-reported symptoms and quality of life</li>
            </ul>
            <p className="text-gray-600">
              BMI serves as an initial filter that can prompt deeper investigation, not as a final verdict 
              on someone's health. A high BMI might lead to additional testing; a normal BMI doesn't 
              guarantee metabolic health.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Beyond BMI: Complementary Measurements
            </h2>
            <p className="text-gray-600 mb-4">
              If BMI has limitations, what else should you consider? Several complementary measures provide 
              additional perspective:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Waist circumference:</strong> A better predictor of visceral fat. For most adults, 
                waist measurements above 40 inches (men) or 35 inches (women) indicate increased health risk.</li>
              <li><strong>Waist-to-height ratio:</strong> Your waist should ideally be less than half your height.</li>
              <li><strong>Body fat percentage:</strong> Measured via calipers, bioelectrical impedance, or 
                DEXA scans. Provides a direct measure of fat vs. lean mass.</li>
              <li><strong>Metabolic markers:</strong> Blood pressure, fasting glucose, triglycerides, and 
                HDL cholesterol reveal metabolic health regardless of weight.</li>
            </ul>
            <p className="text-gray-600">
              Using BMI alongside these measures gives a more complete picture than any single metric alone. 
              Our <Link href="/tools/calorie-counter-bmi" className="text-orange-500 hover:text-orange-600">
              calorie counter BMI</Link> calculator is a great starting point, but it's just the first step 
              in understanding your health.
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
              href="/mbb/bmi-vs-body-fat"
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-1 flex items-center gap-2">
                BMI vs Body Fat: What's the Difference?
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-600">
                Learn when BMI falls short and why body fat percentage may be more accurate.
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
