"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const STORAGE_KEY = "companySearch";

export function CompanySearchForm() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      companyName: companyName.trim(),
      country: country.trim(),
      city: city.trim()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-200">
          <span className="text-xs uppercase tracking-wide text-slate-400">Nombre de la empresa</span>
          <input
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            required
            placeholder="Ej. NovaLabs"
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white shadow-inner focus:border-sky-500 focus:outline-none"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          <span className="text-xs uppercase tracking-wide text-slate-400">País</span>
          <input
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
            placeholder="Ej. Chile"
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white shadow-inner focus:border-sky-500 focus:outline-none"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-200">
          <span className="text-xs uppercase tracking-wide text-slate-400">Ciudad</span>
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
            placeholder="Ej. Santiago"
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-white shadow-inner focus:border-sky-500 focus:outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-sky-400"
      >
        Analizar
      </button>
    </form>
  );
}
