import { NextRequest, NextResponse } from "next/server";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

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
}

function generateDemoData(location: string): WeatherData {
  const now = new Date();
  const conditions = ["Clear", "Clouds", "Rain", "Sunny", "Partly Cloudy"];
  const icons = ["01d", "02d", "03d", "04d", "09d", "10d"];
  
  const baseTemp = 15 + Math.random() * 15;
  
  const hourly = [];
  for (let i = 0; i < 12; i++) {
    const hourTime = new Date(now.getTime() + i * 60 * 60 * 1000);
    hourly.push({
      time: hourTime.toISOString(),
      temp: Math.round(baseTemp + Math.sin(i / 3) * 5),
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      icon: icons[Math.floor(Math.random() * icons.length)],
      rainChance: Math.round(Math.random() * 30) / 100,
    });
  }

  const daily = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const dayBaseTemp = baseTemp + (Math.random() - 0.5) * 10;
    daily.push({
      date: dayDate.toISOString().split("T")[0],
      min: Math.round(dayBaseTemp - 5),
      max: Math.round(dayBaseTemp + 8),
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      icon: icons[Math.floor(Math.random() * icons.length)],
      rainChance: Math.round(Math.random() * 40) / 100,
    });
  }

  return {
    location: location || "Demo Location",
    current: {
      temp: Math.round(baseTemp),
      feelsLike: Math.round(baseTemp - 2),
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      icon: "01d",
      humidity: Math.round(50 + Math.random() * 30),
      windSpeed: Math.round(5 + Math.random() * 15),
      rainChance: Math.round(Math.random() * 20) / 100,
    },
    hourly,
    daily,
  };
}

async function geocodeCity(query: string): Promise<{ lat: number; lon: number; name: string } | null> {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=1&appid=${WEATHER_API_KEY}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    if (!data || data.length === 0) return null;
    
    const location = data[0];
    return {
      lat: location.lat,
      lon: location.lon,
      name: `${location.name}${location.state ? `, ${location.state}` : ""}${location.country ? `, ${location.country}` : ""}`,
    };
  } catch {
    return null;
  }
}

async function getWeatherData(lat: number, lon: number, locationName: string): Promise<WeatherData> {
  const currentResponse = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
  );
  
  const forecastResponse = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
  );
  
  if (!currentResponse.ok || !forecastResponse.ok) {
    throw new Error("Failed to fetch weather data");
  }
  
  const current = await currentResponse.json();
  const forecast = await forecastResponse.json();

  const hourlyData = forecast.list.slice(0, 12).map((item: any) => ({
    time: item.dt_txt,
    temp: Math.round(item.main.temp),
    condition: item.weather[0].main,
    icon: item.weather[0].icon,
    rainChance: item.pop || 0,
  }));

  const dailyMap = new Map<string, any>();
  forecast.list.forEach((item: any) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        date,
        temps: [],
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        pops: [],
      });
    }
    const day = dailyMap.get(date);
    day.temps.push(item.main.temp);
    day.pops.push(item.pop || 0);
  });

  const dailyData = Array.from(dailyMap.values())
    .slice(0, 7)
    .map((day) => ({
      date: day.date,
      min: Math.round(Math.min(...day.temps)),
      max: Math.round(Math.max(...day.temps)),
      condition: day.condition,
      icon: day.icon,
      rainChance: Math.max(...day.pops),
    }));

  return {
    location: locationName || `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
    current: {
      temp: Math.round(current.main.temp),
      feelsLike: Math.round(current.main.feels_like),
      condition: current.weather[0].main,
      icon: current.weather[0].icon,
      humidity: current.main.humidity,
      windSpeed: Math.round(current.wind.speed * 3.6),
      rainChance: current.rain?.["1h"] ? 1 : 0,
    },
    hourly: hourlyData,
    daily: dailyData,
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!query && (!lat || !lon)) {
    return NextResponse.json(
      { error: "Please provide a city name or coordinates" },
      { status: 400 }
    );
  }

  if (!WEATHER_API_KEY) {
    const demoLocation = query || (lat && lon ? `${lat}, ${lon}` : "Demo City");
    return NextResponse.json({
      ...generateDemoData(demoLocation),
      isDemo: true,
      message: "Demo mode: Add WEATHER_API_KEY for real forecasts",
    });
  }

  try {
    let latitude: number;
    let longitude: number;
    let locationName: string;

    if (query) {
      const geoResult = await geocodeCity(query);
      if (!geoResult) {
        return NextResponse.json(
          { error: `Location "${query}" not found. Try a different city name.` },
          { status: 404 }
        );
      }
      latitude = geoResult.lat;
      longitude = geoResult.lon;
      locationName = geoResult.name;
    } else {
      latitude = parseFloat(lat!);
      longitude = parseFloat(lon!);
      
      const reverseGeo = await fetch(
        `${GEO_URL}/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${WEATHER_API_KEY}`
      );
      const reverseData = await reverseGeo.json();
      locationName = reverseData[0] 
        ? `${reverseData[0].name}, ${reverseData[0].country}` 
        : `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`;
    }

    const weatherData = await getWeatherData(latitude, longitude, locationName);
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data. Please try again." },
      { status: 500 }
    );
  }
}
