"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, MapPin, Thermometer, Wind, Droplets, CloudRain, Sun, Cloud, CloudSun, CloudLightning, Snowflake, ChevronDown, ChevronUp, Clock, Calendar, Loader2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostResultUpsell from "@/components/PostResultUpsell";
import MonetizationBar from "@/components/MonetizationBar";

interface WeatherData {
  location: string;
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    rainChance: number;
  };
  hourly: Array<{
    time: string;
    temp: number;
    condition: string;
    icon: string;
    rainChance: number;
  }>;
  daily: Array<{
    date: string;
    min: number;
    max: number;
    condition: string;
    icon: string;
    rainChance: number;
  }>;
  isDemo?: boolean;
  message?: string;
}

export default function WeatherPredictionPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getWeatherIcon = (condition: string, size: "sm" | "lg" = "sm") => {
    const sizeClass = size === "lg" ? "w-12 h-12" : "w-6 h-6";
    const colorClass = "text-orange-500";
    
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("clear") || conditionLower.includes("sunny")) {
      return <Sun className={`${sizeClass} ${colorClass}`} />;
    }
    if (conditionLower.includes("cloud") && conditionLower.includes("part")) {
      return <CloudSun className={`${sizeClass} ${colorClass}`} />;
    }
    if (conditionLower.includes("cloud")) {
      return <Cloud className={`${sizeClass} text-gray-500`} />;
    }
    if (conditionLower.includes("rain") || conditionLower.includes("drizzle")) {
      return <CloudRain className={`${sizeClass} text-blue-500`} />;
    }
    if (conditionLower.includes("thunder") || conditionLower.includes("storm")) {
      return <CloudLightning className={`${sizeClass} text-purple-500`} />;
    }
    if (conditionLower.includes("snow")) {
      return <Snowflake className={`${sizeClass} text-blue-300`} />;
    }
    return <Sun className={`${sizeClass} ${colorClass}`} />;
  };

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString([], { weekday: "short" });
  };

  const fetchWeather = async (searchQuery?: string, lat?: number, lon?: number) => {
    setLoading(true);
    setError("");
    
    try {
      let url = "/api/weather?";
      if (lat !== undefined && lon !== undefined) {
        url += `lat=${lat}&lon=${lon}`;
      } else if (searchQuery) {
        url += `q=${encodeURIComponent(searchQuery)}`;
      } else {
        setError("Please enter a location or use your current location");
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to fetch weather data");
        setWeather(null);
      } else {
        setWeather(data);
        setTimeout(() => {
          document.getElementById("weather-results")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch {
      setError("Failed to connect. Please try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(query.trim());
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(undefined, position.coords.latitude, position.coords.longitude);
      },
      () => {
        setError("Unable to get your location. Please allow location access or enter a city manually.");
        setLoading(false);
      }
    );
  };

  const faqs = [
    {
      question: "How accurate is this weather prediction tool?",
      answer: "Weather predictions are based on real-time data from meteorological services. Short-term forecasts (1-3 days) are typically 80-90% accurate, while 7-day forecasts are around 50-70% accurate. Weather is inherently chaotic, so accuracy decreases with time.",
    },
    {
      question: "What does 'Feels Like' temperature mean?",
      answer: "The 'Feels Like' temperature (also called apparent temperature) accounts for wind chill and humidity. In cold weather with wind, it feels colder than the actual temperature. In hot, humid weather, it feels warmer because sweat evaporates more slowly.",
    },
    {
      question: "How is rain chance calculated?",
      answer: "Rain chance (probability of precipitation) represents the likelihood that rain will occur at your location during that time period. A 70% chance means there's a 7 in 10 probability of measurable precipitation. It doesn't indicate how much rain or how long it will last.",
    },
    {
      question: "Why might the forecast differ from other weather apps?",
      answer: "Different weather services use different forecasting models, data sources, and algorithms. Some emphasize certain variables over others. Local microclimates can also cause variations. For important decisions, checking multiple sources is recommended.",
    },
    {
      question: "How often is the weather data updated?",
      answer: "Weather data is typically updated every 1-3 hours for current conditions and every 6-12 hours for forecasts. Major weather events may trigger more frequent updates. Refreshing the page will fetch the latest available data.",
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
            <Sun className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Weather Prediction – Instant Forecast for Any Location
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get accurate <strong>weather prediction</strong> for any city worldwide. See current conditions, 
            hourly forecasts, and a 7-day outlook. Simply enter a location or use your current position 
            for instant results.
          </p>
        </div>

        {/* Search Card */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Get Your Weather Prediction
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter city, ZIP code, or country..."
                    className="w-full"
                    disabled={loading}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-orange-500 hover:bg-orange-600"
                  disabled={loading || !query.trim()}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Get Forecast
                    </>
                  )}
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleUseLocation}
                disabled={loading}
              >
                <MapPin className="w-4 h-4 mr-2" />
                Use My Current Location
              </Button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {loading && (
              <div className="mt-4 text-center text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                <p className="text-sm">Fetching weather prediction...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weather Results */}
        {weather && (
          <div id="weather-results" className="space-y-6 mb-8">
            {weather.isDemo && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
                <strong>Demo Mode:</strong> {weather.message || "Showing sample data. Connect a weather API for real forecasts."}
              </div>
            )}

            {/* Current Weather */}
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
                <div className="flex items-center gap-2 text-blue-100 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{weather.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-6xl font-bold">{weather.current.temp}°C</div>
                    <div className="text-blue-100 mt-1">Feels like {weather.current.feelsLike}°C</div>
                    <div className="text-lg mt-2">{weather.current.condition}</div>
                  </div>
                  <div className="text-right">
                    {getWeatherIcon(weather.current.condition, "lg")}
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Droplets className="w-5 h-5 text-blue-500 mb-1" />
                    <span className="text-sm text-gray-500">Humidity</span>
                    <span className="font-semibold">{weather.current.humidity}%</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Wind className="w-5 h-5 text-gray-500 mb-1" />
                    <span className="text-sm text-gray-500">Wind</span>
                    <span className="font-semibold">{weather.current.windSpeed} km/h</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <CloudRain className="w-5 h-5 text-blue-400 mb-1" />
                    <span className="text-sm text-gray-500">Rain Chance</span>
                    <span className="font-semibold">{Math.round(weather.current.rainChance * 100)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hourly Forecast */}
            <Card className="shadow-md border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Hourly Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 px-4">
                  <div className="flex gap-3 pb-2" style={{ minWidth: "max-content" }}>
                    {weather.hourly.map((hour, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col items-center bg-gray-50 rounded-lg p-3 min-w-[80px]"
                      >
                        <span className="text-xs text-gray-500">{formatTime(hour.time)}</span>
                        <div className="my-2">{getWeatherIcon(hour.condition)}</div>
                        <span className="font-semibold">{hour.temp}°</span>
                        <span className="text-xs text-blue-500 mt-1">
                          {Math.round(hour.rainChance * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 7-Day Forecast */}
            <Card className="shadow-md border-0">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  7-Day Weather Prediction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weather.daily.map((day, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-3 w-24">
                        <span className="font-medium text-gray-900">{getDayName(day.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getWeatherIcon(day.condition)}
                        <span className="text-sm text-gray-600 w-20">{day.condition}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-500">
                        <CloudRain className="w-4 h-4" />
                        <span className="text-sm w-10">{Math.round(day.rainChance * 100)}%</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-gray-900">{day.max}°</span>
                        <span className="text-gray-400 mx-1">/</span>
                        <span className="text-gray-500">{day.min}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA after results */}
        {weather && (
          <section className="mb-8">
            <PostResultUpsell />
          </section>
        )}

        {/* Placeholder when no data */}
        {!weather && !loading && (
          <div className="text-center py-12 bg-gray-50 rounded-lg mb-8">
            <Sun className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Enter a location above to see the weather prediction.</p>
          </div>
        )}

        {/* More Tools Card */}
        <Card className="shadow-md border-0 mb-10">
          <CardHeader>
            <CardTitle className="text-lg">More Free Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              <Link 
                href="/tools/calorie-counter-bmi"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
              >
                <Thermometer className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">BMI Calculator</span>
              </Link>
              <Link 
                href="/tools/calorie-counter-maintenance"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
              >
                <Droplets className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Calorie Calculator</span>
              </Link>
              <Link 
                href="/tools/calorie-counter-walking"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
              >
                <Wind className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Walking Calorie Counter</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* SEO Content Sections */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How Weather Prediction Works
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              Modern <strong>weather prediction</strong> relies on vast networks of satellites, weather stations, 
              ocean buoys, and weather balloons that continuously collect atmospheric data. This data is fed into 
              sophisticated computer models that simulate how the atmosphere will behave over the coming hours and days.
            </p>
            <p className="text-gray-600 mb-4">
              These numerical weather prediction (NWP) models divide the atmosphere into millions of grid cells and 
              calculate how temperature, pressure, humidity, and wind will change in each cell based on physics 
              equations. The results are then processed by meteorologists who add their expertise to create the 
              forecasts you see.
            </p>
            <p className="text-gray-600">
              Short-term forecasts (up to 3 days) are highly accurate because we have good current data and the 
              atmosphere doesn't have time to diverge much from predictions. Beyond 7 days, the chaotic nature of 
              weather makes precise forecasting essentially impossible—small measurement errors compound into large 
              prediction differences.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Understanding Your Weather Forecast
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Thermometer className="w-5 h-5" />
                Temperature
              </h3>
              <p className="text-sm text-gray-600">
                The actual air temperature at a given time. "Feels like" factors in wind and humidity to show 
                what the temperature feels like on exposed skin.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                Humidity
              </h3>
              <p className="text-sm text-gray-600">
                The percentage of water vapor in the air relative to the maximum it can hold. High humidity 
                makes hot weather feel hotter and can indicate incoming precipitation.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                <Wind className="w-5 h-5" />
                Wind Speed
              </h3>
              <p className="text-sm text-gray-600">
                How fast the air is moving, typically measured in km/h or mph. Higher wind speeds increase 
                wind chill in cold weather and can indicate storm activity.
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                <CloudRain className="w-5 h-5" />
                Rain Chance
              </h3>
              <p className="text-sm text-gray-600">
                The probability of measurable precipitation in your area during that time period. A 40% chance 
                means rain is possible but not guaranteed.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tips for Using Weather Predictions
          </h2>
          <div className="prose prose-gray max-w-none">
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Trust short-term forecasts most:</strong> 1-3 day predictions are highly reliable for planning outdoor activities.</li>
              <li><strong>Use 7-day forecasts for trends:</strong> They're useful for seeing if a warm or cold spell is coming, but specific temperatures may vary.</li>
              <li><strong>Check multiple times:</strong> Forecasts update several times daily as new data comes in. Morning forecasts may differ from evening ones.</li>
              <li><strong>Understand rain probability:</strong> 30% chance doesn't mean "light rain"—it means a 30% chance of any rain at your exact location.</li>
              <li><strong>Consider microclimates:</strong> Cities, valleys, and coastal areas can have different weather than surrounding regions.</li>
            </ul>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            FAQ – Weather Prediction
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
              href="/mbb/how-weather-prediction-works"
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-1">
                How Weather Prediction Works: The Science Behind Forecasting
              </h3>
              <p className="text-sm text-gray-600">
                Explore the technology and methods meteorologists use to predict the weather.
              </p>
            </Link>
            <Link 
              href="/mbb/7-day-forecast-accuracy"
              className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 mb-1">
                7-Day Forecast Accuracy: How Reliable Is Extended Weather Prediction?
              </h3>
              <p className="text-sm text-gray-600">
                Learn why short-term forecasts are more accurate and how to interpret long-range predictions.
              </p>
            </Link>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm pt-8 pb-12 border-t border-gray-200">
          <p>© {new Date().getFullYear()} VCM Suite. Free weather prediction tools for everyone.</p>
        </footer>
      </div>

      <MonetizationBar />
    </div>
  );
}
