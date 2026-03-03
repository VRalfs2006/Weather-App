import { useEffect, useState } from "react";
import "./index.css";
import { CitySearch } from "./features/weather/CitySearch";
import { CurrentWeatherCard } from "./features/weather/CurrentWeather";
import { Forecast } from "./features/weather/Forecast";
import type { GeoResult, WeatherResponse } from "./features/weather/types";
import { getWeather } from "./features/weather/api";

function App() {
  const [city, setCity] = useState<GeoResult | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("lastCity");
    if (saved) {
      try {
        const parsed: GeoResult = JSON.parse(saved);
        void handleCityFound(parsed, false);
      } catch {
        // ignore parse errors
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCityFound(foundCity: GeoResult, save = true) {
    setCity(foundCity);
    setWeather(null);
    setError(null);

    if (save) {
      localStorage.setItem("lastCity", JSON.stringify(foundCity));
    }

    try {
      setLoadingWeather(true);
      const data = await getWeather(foundCity.latitude, foundCity.longitude);
      setWeather(data);
    } catch {
      setError("Neizdevās ielādēt laika datus");
    } finally {
      setLoadingWeather(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl rounded-3xl bg-sky-50/80 p-6 shadow-2xl backdrop-blur">
        <h1 className="mb-4 text-center text-3xl font-extrabold tracking-tight text-slate-900">
          Weather App
        </h1>
        <p className="mb-6 text-center text-sm text-slate-600">
          Ievadiet pilsētu, lai redzētu pašreizējos laika apstākļus un 3 dienu
          prognozi.
        </p>

        <CitySearch onCityFound={(c) => void handleCityFound(c)} />

        {loadingWeather && (
          <p className="mt-4 text-center text-slate-700">
            Ielādē laika datus...
          </p>
        )}

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}

        {weather && city && (
          <div className="mt-6 flex flex-col items-center">
            <CurrentWeatherCard weather={weather.current} cityName={city.name} />
            <Forecast daily={weather.daily} />
          </div>
        )}

        {!weather && !loadingWeather && !error && (
          <p className="mt-4 text-center text-slate-600">
            Meklējiet pilsētu, lai sāktu.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;

