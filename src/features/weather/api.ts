import axios from "axios";
import type { GeoResponse, GeoResult, WeatherResponse } from "./types";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function searchCity(city: string): Promise<GeoResult | null> {
  const url = `${GEO_URL}?name=${encodeURIComponent(city)}&count=1`;
  const response = await axios.get<GeoResponse>(url);
  const results = response.data.results;
  if (!results || results.length === 0) {
    return null;
  }
  return results[0];
}

export async function getWeather(
  latitude: number,
  longitude: number
): Promise<WeatherResponse> {
  const url = `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=3`;

  const response = await axios.get<WeatherResponse>(url);
  return response.data;
}

