import type { CurrentWeather } from "./types";
import { getWeatherDescription } from "./types";

interface CurrentWeatherProps {
  weather: CurrentWeather;
  cityName: string;
}

export function CurrentWeatherCard({ weather, cityName }: CurrentWeatherProps) {
  const description = getWeatherDescription(weather.weather_code);

  const [emoji, ...rest] = description.split(" ");
  const text = rest.join(" ");

  return (
    <div className="w-full max-w-md rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur">
      <h2 className="mb-4 text-center text-2xl font-bold text-slate-800">
        {cityName}
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-5xl font-semibold text-slate-900">
            {Math.round(weather.temperature_2m)}°C
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Vējš: {Math.round(weather.wind_speed_10m)} km/h
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl">{emoji}</p>
          <p className="text-sm text-slate-600">{text}</p>
        </div>
      </div>
    </div>
  );
}

