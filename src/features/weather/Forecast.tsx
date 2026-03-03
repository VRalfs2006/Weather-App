import type { DailyForecast } from "./types";
import { getWeatherDescription } from "./types";

interface ForecastProps {
  daily: DailyForecast;
}

export function Forecast({ daily }: ForecastProps) {
  return (
    <div className="mt-8 w-full max-w-3xl">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        3 dienu prognoze
      </h3>
      <div className="flex flex-col gap-4 md:flex-row">
        {daily.time.map((date, index) => {
          const code = daily.weather_code[index];
          const description = getWeatherDescription(code);
          const [emoji, ...rest] = description.split(" ");
          const text = rest.join(" ");

          return (
            <div
              key={date}
              className="flex-1 rounded-2xl bg-white/80 p-4 shadow-md backdrop-blur"
            >
              <p className="text-sm font-medium text-slate-600">{date}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {Math.round(daily.temperature_2m_max[index])}° /{" "}
                {Math.round(daily.temperature_2m_min[index])}°C
              </p>
              <p className="mt-2 text-xl">{emoji}</p>
              <p className="text-sm text-slate-600">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

