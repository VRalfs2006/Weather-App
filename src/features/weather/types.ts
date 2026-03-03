export interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface GeoResponse {
  results?: GeoResult[];
}

export interface CurrentWeather {
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface DailyForecast {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  daily: DailyForecast;
}

export function getWeatherDescription(code: number): string {
  if (code === 0) return "☀️ Skaidrs";
  if ([1, 2, 3].includes(code)) return "⛅ Daļēji mākoņains";
  if ([45, 48].includes(code)) return "🌫️ Migla";
  if ([51, 53, 55].includes(code)) return "🌦️ Smidzināšana";
  if ([61, 63, 65].includes(code)) return "🌧️ Lietus";
  if ([71, 73, 75].includes(code)) return "🌨️ Sniegs";
  if ([80, 81, 82].includes(code)) return "🌧️ Lietusgāzes";
  if ([95, 96, 99].includes(code)) return "⛈️ Pērkona negaiss";
  return "❓ Nezināmi apstākļi";
}

