"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Sun, Cloud, Satellite, Radio, Cpu, BarChart3 } from "lucide-react";
import PostResultUpsell from "@/components/PostResultUpsell";
import MonetizationBar from "@/components/MonetizationBar";

export default function HowWeatherPredictionWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link 
          href="/tools/weather-prediction" 
          className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Weather Prediction Tool
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 rounded-2xl mb-4">
            <Satellite className="w-7 h-7 text-orange-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Weather Prediction Works: The Science Behind Forecasting
          </h1>
          <p className="text-lg text-gray-600">
            Discover the fascinating technology, data collection methods, and computational power 
            that goes into predicting the weather. From satellites to supercomputers, learn how 
            meteorologists forecast what's coming.
          </p>
        </div>

        {/* Quick Tool Link */}
        <Link 
          href="/tools/weather-prediction"
          className="block bg-orange-50 border-2 border-orange-200 rounded-lg p-4 mb-8 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="w-6 h-6 text-orange-500" />
              <div>
                <h3 className="font-semibold text-orange-600">Try Our Weather Prediction Tool</h3>
                <p className="text-sm text-gray-600">Get instant forecasts for any location</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-orange-500" />
          </div>
        </Link>

        {/* Article Content */}
        <article className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Radio className="w-6 h-6 text-orange-500" />
              The Data Collection Network
            </h2>
            <p className="text-gray-600 mb-4">
              <strong>Weather prediction</strong> begins with an enormous, continuous flow of atmospheric data 
              from around the world. Every hour, thousands of observations are collected from multiple sources, 
              creating a comprehensive picture of current conditions.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Weather Stations</h3>
                <p className="text-sm text-gray-600">
                  Over 10,000 land-based weather stations worldwide measure temperature, humidity, pressure, 
                  wind speed, and precipitation. Automated stations report every few minutes, while staffed 
                  stations provide hourly observations.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Weather Satellites</h3>
                <p className="text-sm text-gray-600">
                  Geostationary satellites hover 35,000 km above Earth, capturing continuous images of cloud 
                  patterns. Polar-orbiting satellites pass overhead every 90 minutes, measuring atmospheric 
                  temperature profiles.
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">Weather Balloons</h3>
                <p className="text-sm text-gray-600">
                  Twice daily, about 900 locations worldwide launch radiosondes—instrument packages attached 
                  to balloons. They ascend to 30 km, measuring temperature, humidity, and wind at different 
                  altitudes.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-semibold text-orange-800 mb-2">Ocean Buoys & Ships</h3>
                <p className="text-sm text-gray-600">
                  Thousands of buoys drift across the oceans, measuring sea surface temperature, wave height, 
                  and atmospheric pressure. Commercial ships also report weather observations from shipping lanes.
                </p>
              </div>
            </div>

            <p className="text-gray-600">
              This data network is coordinated by the World Meteorological Organization (WMO), which ensures 
              that observations from 191 countries are shared in real-time. Without this global cooperation, 
              accurate weather prediction would be impossible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-orange-500" />
              Numerical Weather Prediction: The Computer Models
            </h2>
            <p className="text-gray-600 mb-4">
              Once data is collected, it feeds into Numerical Weather Prediction (NWP) models—massive computer 
              simulations that calculate how the atmosphere will evolve. These models are the core of modern 
              weather prediction.
            </p>
            <p className="text-gray-600 mb-4">
              NWP models divide the atmosphere into a three-dimensional grid of cells, typically spanning 
              10-50 km horizontally and hundreds of meters vertically. For each cell, the model calculates 
              how temperature, pressure, humidity, and wind will change based on fundamental physics equations:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Conservation of mass:</strong> Air doesn't appear or disappear—it flows between cells</li>
              <li><strong>Conservation of energy:</strong> Heat from the sun warms the surface, which warms the air</li>
              <li><strong>Conservation of momentum:</strong> Wind patterns are influenced by pressure differences and Earth's rotation</li>
              <li><strong>Thermodynamic processes:</strong> Water evaporates, condenses into clouds, and falls as precipitation</li>
            </ul>
            <p className="text-gray-600 mb-4">
              The models step forward in time—typically 10-15 minutes per step—recalculating all variables 
              for every grid cell. To produce a 7-day forecast, billions of calculations are required, which 
              is why weather agencies use some of the world's most powerful supercomputers.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Major Global Weather Models</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Model</th>
                    <th className="text-left py-2">Agency</th>
                    <th className="text-left py-2">Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">GFS</td>
                    <td className="py-2">NOAA (USA)</td>
                    <td className="py-2">13 km</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">ECMWF</td>
                    <td className="py-2">European Centre</td>
                    <td className="py-2">9 km</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">UKMO</td>
                    <td className="py-2">UK Met Office</td>
                    <td className="py-2">10 km</td>
                  </tr>
                  <tr>
                    <td className="py-2">GEM</td>
                    <td className="py-2">Canada</td>
                    <td className="py-2">15 km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-orange-500" />
              Ensemble Forecasting: Managing Uncertainty
            </h2>
            <p className="text-gray-600 mb-4">
              Weather is inherently chaotic—tiny errors in the initial data or model limitations can lead to 
              dramatically different outcomes days later. To handle this uncertainty, meteorologists use 
              <strong> ensemble forecasting</strong>.
            </p>
            <p className="text-gray-600 mb-4">
              Instead of running one forecast, they run dozens—each with slightly different starting 
              conditions or model parameters. If most ensemble members agree, confidence is high. If they 
              diverge, the forecast is more uncertain. This is why you see probability-based forecasts like 
              "70% chance of rain" rather than simple yes/no predictions.
            </p>
            <p className="text-gray-600 mb-4">
              The ECMWF, widely considered the world's best weather prediction center, runs 51 ensemble 
              members out to 15 days. The GFS runs 21 members out to 16 days. Analyzing how these 
              ensembles behave helps forecasters understand not just what will happen, but how confident 
              we can be in that prediction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Human Element: Meteorologists at Work
            </h2>
            <p className="text-gray-600 mb-4">
              Despite all this technology, human expertise remains essential. Meteorologists don't simply 
              relay computer output—they interpret it, knowing that models have systematic biases and 
              limitations in specific situations.
            </p>
            <p className="text-gray-600 mb-4">
              A skilled forecaster might notice that a model consistently underestimates fog formation in 
              a particular valley, or that it tends to move hurricanes too fast in certain conditions. 
              They blend output from multiple models, apply local knowledge, and use pattern recognition 
              from years of experience.
            </p>
            <p className="text-gray-600">
              For high-impact events like hurricanes or severe thunderstorms, teams of specialists analyze 
              the data in real-time, issuing warnings and updates as conditions evolve. Weather prediction 
              is a 24/7 operation where the stakes can be measured in lives saved.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Weather Prediction Gets Less Accurate Over Time
            </h2>
            <p className="text-gray-600 mb-4">
              The atmosphere is what mathematicians call a "chaotic system"—extremely sensitive to initial 
              conditions. Edward Lorenz famously illustrated this with the "butterfly effect": a butterfly 
              flapping its wings in Brazil could theoretically trigger a tornado in Texas weeks later.
            </p>
            <p className="text-gray-600 mb-4">
              In practical terms, this means that even tiny measurement errors—the difference between 
              20.1°C and 20.2°C—compound over time. After about 10-14 days, these small differences grow 
              so large that specific predictions become meaningless. This isn't a limitation of our 
              computers or models; it's a fundamental property of the atmosphere.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Forecast Accuracy by Time Horizon</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium">1-3 days</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <div className="w-16 text-right text-sm">~85%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium">4-5 days</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-yellow-500 h-4 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="w-16 text-right text-sm">~70%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium">6-7 days</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-orange-500 h-4 rounded-full" style={{ width: "55%" }}></div>
                  </div>
                  <div className="w-16 text-right text-sm">~55%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium">10+ days</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div className="bg-red-500 h-4 rounded-full" style={{ width: "35%" }}></div>
                  </div>
                  <div className="w-16 text-right text-sm">~35%</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Future of Weather Prediction
            </h2>
            <p className="text-gray-600 mb-4">
              Weather prediction continues to improve by about one day per decade—meaning today's 5-day 
              forecast is as accurate as a 4-day forecast was 10 years ago. Several developments promise 
              to accelerate this progress:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Higher-resolution models:</strong> As computing power grows, models can use 
                smaller grid cells, capturing local effects like sea breezes and mountain winds better.</li>
              <li><strong>Machine learning:</strong> AI is being used to correct model biases, improve 
                radar interpretation, and generate rapid nowcasts for the next few hours.</li>
              <li><strong>More observations:</strong> New satellite constellations and expanded sensor 
                networks provide more data, especially over oceans and remote areas.</li>
              <li><strong>Better physics:</strong> Scientists continue to refine how models represent 
                clouds, precipitation, and turbulence—processes too small to simulate directly.</li>
            </ul>
            <p className="text-gray-600">
              While perfect weather prediction will always be impossible due to chaos theory, we can expect 
              continued improvement in accuracy, especially for severe weather events where early warnings 
              save lives.
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
              href="/tools/weather-prediction"
              className="group bg-orange-50 border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-orange-600 group-hover:text-orange-700 mb-1 flex items-center gap-2">
                Weather Prediction Tool
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-600">
                Get instant forecasts for any location with our free weather prediction tool.
              </p>
            </Link>
            <Link 
              href="/mbb/7-day-forecast-accuracy"
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-1 flex items-center gap-2">
                7-Day Forecast Accuracy Guide
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-gray-600">
                Learn how to interpret extended forecasts and understand their reliability.
              </p>
            </Link>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm pt-8 pb-12 border-t border-gray-200">
          <p>© {new Date().getFullYear()} VCM Suite. Understanding the science behind weather.</p>
        </footer>
      </div>

      <MonetizationBar />
    </div>
  );
}
