"use client";

import { useState } from "react";
import Link from "next/link";
import { Car, Wrench, DollarSign, MapPin, Gauge, Calculator, RotateCcw, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import MonetizationBar from "@/components/MonetizationBar";
import PostResultUpsell from "@/components/PostResultUpsell";

const currentYear = new Date().getFullYear();

const repairTypes = [
  { value: "brake-pads", label: "Brake Pad Replacement", baseCost: 150, minorHours: 1, modHours: 2, majorHours: 4 },
  { value: "check-engine", label: "Check Engine Diagnosis", baseCost: 100, minorHours: 0.5, modHours: 1.5, majorHours: 3 },
  { value: "alternator", label: "Alternator Replacement", baseCost: 350, minorHours: 1.5, modHours: 3, majorHours: 5 },
  { value: "battery", label: "Battery Replacement", baseCost: 120, minorHours: 0.5, modHours: 1, majorHours: 2 },
  { value: "ac-repair", label: "AC Repair", baseCost: 300, minorHours: 1, modHours: 3, majorHours: 6 },
  { value: "oil-leak", label: "Oil Leak Repair", baseCost: 250, minorHours: 1, modHours: 2.5, majorHours: 5 },
  { value: "transmission", label: "Transmission Repair", baseCost: 1800, minorHours: 3, modHours: 6, majorHours: 10 },
  { value: "engine-misfire", label: "Engine Misfire Repair", baseCost: 200, minorHours: 1, modHours: 2.5, majorHours: 5 },
  { value: "wheel-alignment", label: "Wheel Alignment", baseCost: 100, minorHours: 0.5, modHours: 1, majorHours: 2 },
  { value: "custom", label: "Custom/Other Repair", baseCost: 150, minorHours: 1, modHours: 3, majorHours: 6 },
];

const severityLevels = [
  { value: "minor", label: "Minor", description: "Simple fix, minimal parts" },
  { value: "moderate", label: "Moderate", description: "Standard repair job" },
  { value: "major", label: "Major", description: "Extensive work required" },
];

interface EstimateResult {
  lowEstimate: number;
  highEstimate: number;
  partsCost: number;
  laborCost: number;
  laborHours: number;
  regionalAdjustment: number;
  repairType: string;
  severity: string;
}

export default function EstimatorForCarRepairPage() {
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState(currentYear.toString());
  const [repairType, setRepairType] = useState("brake-pads");
  const [severity, setSeverity] = useState("moderate");
  const [laborRate, setLaborRate] = useState(100);
  const [zipCode, setZipCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<EstimateResult | null>(null);

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!carMake.trim()) {
      newErrors.carMake = "Car make is required";
    }
    if (!carModel.trim()) {
      newErrors.carModel = "Car model is required";
    }
    
    const year = parseInt(carYear);
    if (isNaN(year) || year < 1980 || year > currentYear) {
      newErrors.carYear = `Year must be between 1980 and ${currentYear}`;
    }

    if (laborRate < 50 || laborRate > 200) {
      newErrors.laborRate = "Labor rate must be between $50 and $200/hr";
    }

    if (zipCode && !/^\d{5}$/.test(zipCode)) {
      newErrors.zipCode = "ZIP code must be 5 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateEstimate = () => {
    if (!validateInputs()) return;

    const repair = repairTypes.find(r => r.value === repairType)!;
    
    let laborHours: number;
    switch (severity) {
      case "minor":
        laborHours = repair.minorHours;
        break;
      case "major":
        laborHours = repair.majorHours;
        break;
      default:
        laborHours = repair.modHours;
    }

    const partsCost = repair.baseCost;
    const laborCost = laborHours * laborRate;

    let regionalMultiplier = 1.0;
    if (zipCode) {
      const firstDigit = parseInt(zipCode[0]);
      if (firstDigit >= 0 && firstDigit <= 2) {
        regionalMultiplier = 1.05;
      } else if (firstDigit >= 8 && firstDigit <= 9) {
        regionalMultiplier = 1.10;
      }
    }

    const baseCost = (partsCost + laborCost) * regionalMultiplier;
    const lowEstimate = Math.round(baseCost * 0.9);
    const highEstimate = Math.round(baseCost * 1.1);

    setResult({
      lowEstimate,
      highEstimate,
      partsCost: Math.round(partsCost * regionalMultiplier),
      laborCost: Math.round(laborCost * regionalMultiplier),
      laborHours,
      regionalAdjustment: Math.round((regionalMultiplier - 1) * 100),
      repairType: repair.label,
      severity: severityLevels.find(s => s.value === severity)?.label || "Moderate",
    });

    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const resetCalculator = () => {
    setCarMake("");
    setCarModel("");
    setCarYear(currentYear.toString());
    setRepairType("brake-pads");
    setSeverity("moderate");
    setLaborRate(100);
    setZipCode("");
    setErrors({});
    setResult(null);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why are car repair costs different by state?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Car repair costs vary by state due to differences in labor rates, cost of living, state regulations, and local competition. Coastal cities typically have higher labor rates ($120-150/hr) compared to rural areas ($50-80/hr)."
        }
      },
      {
        "@type": "Question",
        "name": "Why is auto repair labor so expensive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Auto repair labor is expensive because technicians require specialized training, certifications, and expensive diagnostic equipment. Shops also have overhead costs including rent, insurance, and tool maintenance that factor into hourly rates."
        }
      },
      {
        "@type": "Question",
        "name": "How can I avoid being overcharged for car repairs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Get multiple estimates from different shops, ask for itemized breakdowns of parts and labor, research average costs online, and don't authorize additional work without written estimates. Building a relationship with a trusted mechanic also helps."
        }
      },
      {
        "@type": "Question",
        "name": "Is dealership repair more expensive than independent shops?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dealerships typically charge 20-50% more than independent shops due to higher overhead and using OEM parts exclusively. However, they have specialized training for your vehicle brand and access to manufacturer technical bulletins."
        }
      },
      {
        "@type": "Question",
        "name": "Should I choose OEM or aftermarket parts for car repairs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "OEM parts are made by the original manufacturer and guarantee fit and quality but cost more. Aftermarket parts are often 20-50% cheaper and can be equally reliable from reputable brands. For safety-critical repairs, OEM is often recommended."
        }
      },
      {
        "@type": "Question",
        "name": "How do repair shops calculate their estimates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Shops use labor time guides that estimate hours for each repair, multiply by their hourly rate, then add parts costs (often with 30-50% markup). Diagnostic fees, shop supplies, and regional factors may also be included."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <MonetizationBar />

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Car className="w-4 h-4" />
              Free Auto Repair Calculator
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Estimator for Car Repair – Free Auto Repair Cost Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use this <strong>estimator for car repair</strong> costs to calculate how much your next 
              repair might cost. Get instant estimates based on repair type, labor rates, and your location.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Wrench className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-semibold text-gray-900">Car Repair Cost Estimator</h2>
              </div>
              <button
                onClick={resetCalculator}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Car className="w-4 h-4 text-gray-400" />
                  Car Make *
                </label>
                <input
                  type="text"
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                  placeholder="e.g., Toyota"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.carMake ? "border-red-300" : "border-gray-300"}`}
                />
                {errors.carMake && <p className="text-red-500 text-sm mt-1">{errors.carMake}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Car className="w-4 h-4 text-gray-400" />
                  Car Model *
                </label>
                <input
                  type="text"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  placeholder="e.g., Camry"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.carModel ? "border-red-300" : "border-gray-300"}`}
                />
                {errors.carModel && <p className="text-red-500 text-sm mt-1">{errors.carModel}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Calculator className="w-4 h-4 text-gray-400" />
                  Year *
                </label>
                <select
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.carYear ? "border-red-300" : "border-gray-300"}`}
                >
                  {Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.carYear && <p className="text-red-500 text-sm mt-1">{errors.carYear}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Wrench className="w-4 h-4 text-gray-400" />
                  Repair Type *
                </label>
                <select
                  value={repairType}
                  onChange={(e) => setRepairType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {repairTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Gauge className="w-4 h-4 text-gray-400" />
                  Severity Level *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {severityLevels.map(level => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => setSeverity(level.value)}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        severity === level.value
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-700 border-gray-300 hover:border-orange-300"
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  Labor Rate ($/hr): ${laborRate}
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={laborRate}
                  onChange={(e) => setLaborRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$50/hr</span>
                  <span>$200/hr</span>
                </div>
                {errors.laborRate && <p className="text-red-500 text-sm mt-1">{errors.laborRate}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  ZIP Code (optional - for regional pricing)
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  placeholder="e.g., 90210"
                  maxLength={5}
                  className={`w-full md:w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${errors.zipCode ? "border-red-300" : "border-gray-300"}`}
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
            </div>

            <button
              onClick={calculateEstimate}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Calculate Repair Estimate
            </button>
          </div>

          {result && (
            <div id="results" className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Estimated Car Repair Cost</h2>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 mb-6">
                <p className="text-sm text-orange-700 font-medium mb-2">Estimated Price Range</p>
                <p className="text-4xl font-bold text-gray-900">
                  ${result.lowEstimate.toLocaleString()} – ${result.highEstimate.toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Parts Estimated</p>
                  <p className="text-xl font-semibold text-gray-900">${result.partsCost.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Labor Estimated</p>
                  <p className="text-xl font-semibold text-gray-900">${result.laborCost.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Labor Hours</p>
                  <p className="text-xl font-semibold text-gray-900">{result.laborHours} hrs</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">Regional Adjustment</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {result.regionalAdjustment > 0 ? `+${result.regionalAdjustment}%` : "None"}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Repair Summary:</strong> {result.repairType} ({result.severity} severity) for your {carYear} {carMake} {carModel}
                </p>
              </div>

              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  These are approximate estimates based on industry averages. Actual shop pricing may vary 
                  depending on parts availability, shop overhead, and diagnostic findings. Always get 2-3 
                  quotes from local shops before committing.
                </p>
              </div>
            </div>
          )}

          {result && <PostResultUpsell />}

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-orange-500" />
                How to Estimate Car Repair Costs
              </h2>
              <p className="text-gray-600 mb-4">
                Estimating car repair costs involves understanding several key factors that mechanics consider 
                when pricing a job. The main components are parts cost, labor time, shop hourly rates, and 
                your geographic location.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Parts:</strong> The cost of replacement parts varies widely between OEM and aftermarket options</li>
                <li><strong>Labor Hours:</strong> Repair shops use industry-standard labor guides to estimate time</li>
                <li><strong>Hourly Rate:</strong> Ranges from $50/hr in rural areas to $200/hr at dealerships</li>
                <li><strong>Severity:</strong> Minor fixes require less time than major overhauls</li>
                <li><strong>Vehicle Age:</strong> Older cars may need additional work or have harder-to-find parts</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-orange-500" />
                What Impacts Car Repair Pricing the Most?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Make & Model</h3>
                  <p className="text-gray-600 text-sm">
                    Luxury and European vehicles (BMW, Mercedes, Audi) typically cost 30-50% more to repair 
                    than domestic brands due to specialized parts and training requirements.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Labor Rates</h3>
                  <p className="text-gray-600 text-sm">
                    Shop rates vary dramatically by location. Major metro areas charge $120-180/hr while 
                    small town shops may charge $60-80/hr for the same work.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">OEM vs Aftermarket Parts</h3>
                  <p className="text-gray-600 text-sm">
                    Original Equipment Manufacturer (OEM) parts can cost 20-50% more than quality aftermarket 
                    alternatives, significantly impacting total repair cost.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Diagnostic Fees</h3>
                  <p className="text-gray-600 text-sm">
                    Many shops charge $75-150 for diagnostics before quoting repairs. This fee is often 
                    waived if you proceed with the repair at that shop.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Wrench className="w-6 h-6 text-orange-500" />
                Car Repair Cost Examples
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Repair Type</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Parts Range</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Labor Hours</th>
                      <th className="text-left py-3 px-2 font-semibold text-gray-900">Total Estimate</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Brake Pad Replacement</td>
                      <td className="py-3 px-2">$100-200</td>
                      <td className="py-3 px-2">1-2 hrs</td>
                      <td className="py-3 px-2">$200-400</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Alternator Replacement</td>
                      <td className="py-3 px-2">$250-500</td>
                      <td className="py-3 px-2">1.5-3 hrs</td>
                      <td className="py-3 px-2">$400-800</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">AC Repair</td>
                      <td className="py-3 px-2">$200-500</td>
                      <td className="py-3 px-2">2-4 hrs</td>
                      <td className="py-3 px-2">$400-900</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-2">Transmission Repair</td>
                      <td className="py-3 px-2">$1,500-3,000</td>
                      <td className="py-3 px-2">6-12 hrs</td>
                      <td className="py-3 px-2">$2,500-5,000+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a Fair Price for Car Repair?</h2>
              <p className="text-gray-600 mb-4">
                A fair repair price covers reasonable parts costs, industry-standard labor time at local 
                market rates, and a modest shop supply fee. To determine if a quote is fair:
              </p>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li>Compare the quoted labor time against standard repair guides</li>
                <li>Research parts prices online (add 30-40% for shop markup)</li>
                <li>Get 2-3 quotes from different shops for comparison</li>
                <li>Ask if diagnostics are included or separate</li>
                <li>Verify if the warranty is included on parts and labor</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Why are repair costs different by state?</h3>
                  <p className="text-gray-600 text-sm">
                    Car repair costs vary by state due to differences in labor rates, cost of living, state 
                    regulations, and local competition. Coastal cities typically have higher labor rates 
                    ($120-150/hr) compared to rural areas ($50-80/hr).
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Why is auto repair labor so expensive?</h3>
                  <p className="text-gray-600 text-sm">
                    Auto repair labor is expensive because technicians require specialized training, 
                    certifications, and expensive diagnostic equipment. Shops also have overhead costs 
                    including rent, insurance, and tool maintenance that factor into hourly rates.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How can I avoid being overcharged for car repairs?</h3>
                  <p className="text-gray-600 text-sm">
                    Get multiple estimates from different shops, ask for itemized breakdowns of parts and 
                    labor, research average costs online, and don't authorize additional work without 
                    written estimates. Building a relationship with a trusted mechanic also helps.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Is dealership repair more expensive than independent shops?</h3>
                  <p className="text-gray-600 text-sm">
                    Dealerships typically charge 20-50% more than independent shops due to higher overhead 
                    and using OEM parts exclusively. However, they have specialized training for your 
                    vehicle brand and access to manufacturer technical bulletins.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Should I choose OEM or aftermarket parts?</h3>
                  <p className="text-gray-600 text-sm">
                    OEM parts are made by the original manufacturer and guarantee fit and quality but cost 
                    more. Aftermarket parts are often 20-50% cheaper and can be equally reliable from 
                    reputable brands. For safety-critical repairs, OEM is often recommended.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How do repair shops calculate their estimates?</h3>
                  <p className="text-gray-600 text-sm">
                    Shops use labor time guides that estimate hours for each repair, multiply by their hourly 
                    rate, then add parts costs (often with 30-50% markup). Diagnostic fees, shop supplies, 
                    and regional factors may also be included.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/mbb/common-car-repair-costs"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
              >
                <FileText className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Common Car Repair Costs</p>
                  <p className="text-sm text-gray-500">Full breakdown of typical repair prices</p>
                </div>
              </Link>
              <Link 
                href="/mbb/how-car-repairs-are-priced"
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
              >
                <FileText className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">How Car Repairs Are Priced</p>
                  <p className="text-sm text-gray-500">Parts, labor & diagnostics explained</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
