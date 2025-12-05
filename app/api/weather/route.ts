import { NextRequest, NextResponse } from "next/server";

const OPEN_METEO_URL = "https://api.open-meteo.com/v1";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1";

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

function getWeatherCondition(weatherCode: number): { condition: string; icon: string } {
  const conditions: Record<number, { condition: string; icon: string }> = {
    0: { condition: "Clear", icon: "01d" },
    1: { condition: "Mainly Clear", icon: "01d" },
    2: { condition: "Partly Cloudy", icon: "02d" },
    3: { condition: "Overcast", icon: "04d" },
    45: { condition: "Foggy", icon: "50d" },
    48: { condition: "Rime Fog", icon: "50d" },
    51: { condition: "Light Drizzle", icon: "09d" },
    53: { condition: "Drizzle", icon: "09d" },
    55: { condition: "Heavy Drizzle", icon: "09d" },
    56: { condition: "Freezing Drizzle", icon: "09d" },
    57: { condition: "Freezing Drizzle", icon: "09d" },
    61: { condition: "Light Rain", icon: "10d" },
    63: { condition: "Rain", icon: "10d" },
    65: { condition: "Heavy Rain", icon: "10d" },
    66: { condition: "Freezing Rain", icon: "13d" },
    67: { condition: "Freezing Rain", icon: "13d" },
    71: { condition: "Light Snow", icon: "13d" },
    73: { condition: "Snow", icon: "13d" },
    75: { condition: "Heavy Snow", icon: "13d" },
    77: { condition: "Snow Grains", icon: "13d" },
    80: { condition: "Light Showers", icon: "09d" },
    81: { condition: "Showers", icon: "09d" },
    82: { condition: "Heavy Showers", icon: "09d" },
    85: { condition: "Snow Showers", icon: "13d" },
    86: { condition: "Heavy Snow Showers", icon: "13d" },
    95: { condition: "Thunderstorm", icon: "11d" },
    96: { condition: "Thunderstorm with Hail", icon: "11d" },
    99: { condition: "Thunderstorm with Hail", icon: "11d" },
  };
  
  return conditions[weatherCode] || { condition: "Unknown", icon: "01d" };
}

async function geocodeCity(query: string): Promise<{ lat: number; lon: number; name: string } | null> {
  try {
    const response = await fetch(
      `${GEOCODING_URL}/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;
    
    const location = data.results[0];
    const parts = [location.name];
    if (location.admin1) parts.push(location.admin1);
    if (location.country) parts.push(location.country);
    
    return {
      lat: location.latitude,
      lon: location.longitude,
      name: parts.join(", "),
    };
  } catch {
    return null;
  }
}

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(
      `${GEOCODING_URL}/search?name=${lat.toFixed(2)},${lon.toFixed(2)}&count=1&language=en&format=json`
    );
    
    if (!response.ok) return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
    
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
    }
    
    const location = data.results[0];
    const parts = [location.name];
    if (location.country) parts.push(location.country);
    return parts.join(", ");
  } catch {
    return `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
  }
}

async function getWeatherData(lat: number, lon: number, locationName: string): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation",
    hourly: "temperature_2m,weather_code,precipitation_probability",
    daily: "temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "7",
  });

  const response = await fetch(`${OPEN_METEO_URL}/forecast?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch weather data from Open-Meteo");
  }
  
  const data = await response.json();
  
  const currentWeather = getWeatherCondition(data.current.weather_code);
  
  const now = new Date();
  const currentHourIndex = data.hourly.time.findIndex((t: string) => 
    new Date(t) >= now
  );
  const startIndex = Math.max(0, currentHourIndex);
  
  const hourlyData = data.hourly.time.slice(startIndex, startIndex + 12).map((time: string, i: number) => {
    const idx = startIndex + i;
    const weather = getWeatherCondition(data.hourly.weather_code[idx]);
    return {
      time,
      temp: Math.round(data.hourly.temperature_2m[idx]),
      condition: weather.condition,
      icon: weather.icon,
      rainChance: (data.hourly.precipitation_probability[idx] || 0) / 100,
    };
  });

  const dailyData = data.daily.time.map((date: string, i: number) => {
    const weather = getWeatherCondition(data.daily.weather_code[i]);
    return {
      date,
      min: Math.round(data.daily.temperature_2m_min[i]),
      max: Math.round(data.daily.temperature_2m_max[i]),
      condition: weather.condition,
      icon: weather.icon,
      rainChance: (data.daily.precipitation_probability_max[i] || 0) / 100,
    };
  });

  return {
    location: locationName,
    current: {
      temp: Math.round(data.current.temperature_2m),
      feelsLike: Math.round(data.current.apparent_temperature),
      condition: currentWeather.condition,
      icon: currentWeather.icon,
      humidity: Math.round(data.current.relative_humidity_2m),
      windSpeed: Math.round(data.current.wind_speed_10m),
      rainChance: data.current.precipitation > 0 ? 1 : (hourlyData[0]?.rainChance || 0),
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
      locationName = await reverseGeocode(latitude, longitude);
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
