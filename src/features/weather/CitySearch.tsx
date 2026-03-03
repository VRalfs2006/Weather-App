import { FormEvent, useState } from "react";
import { searchCity } from "./api";
import type { GeoResult } from "./types";

interface CitySearchProps {
  onCityFound: (city: GeoResult) => void;
}

export function CitySearch({ onCityFound }: CitySearchProps) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!query.trim()) {
      setError("Lūdzu ievadiet pilsētas nosaukumu");
      return;
    }

    try {
      setLoading(true);
      const city = await searchCity(query.trim());
      if (!city) {
        setError("Pilsēta nav atrasta");
        return;
      }
      onCityFound(city);
    } catch {
      setError("Radās kļūda meklējot pilsētu");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-3 mb-6"
    >
      <div className="flex w-full max-w-md gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ievadiet pilsētu (piem., Riga)"
          className="flex-1 rounded-lg border border-blue-200 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold shadow-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Meklē..." : "Meklēt"}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}

