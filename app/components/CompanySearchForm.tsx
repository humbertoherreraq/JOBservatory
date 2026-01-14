"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CompanySearchForm() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedCompany = companyName.trim();
    const trimmedCountry = country.trim();
    const trimmedCity = city.trim();

    if (!trimmedCompany || !trimmedCountry || !trimmedCity) {
      router.push("/?alert=1");
      return;
    }

    const params = new URLSearchParams({
      company: trimmedCompany,
      country: trimmedCountry,
      city: trimmedCity
    });

    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-700">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Empresa (obligatorio)
          </span>
          <input
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            required
            placeholder="Ej. NovaLabs"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            País (obligatorio)
          </span>
          <input
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
            placeholder="Ej. Chile"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Ciudad (obligatorio)
          </span>
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
            placeholder="Ej. Santiago"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </label>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
      >
        Analizar
      </button>
    </form>
  );
}
