"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card } from "../../../../components/Cards";
import { moduleLabels } from "../../../../data/modules";
import type { CompanyApiResponse, ModuleSlug } from "../../../../data/types";

type ModuleSourcesClientProps = {
  slug: ModuleSlug;
  companyName: string;
  country: string;
  city: string;
};

export function ModuleSourcesClient({
  slug,
  companyName,
  country,
  city
}: ModuleSourcesClientProps) {
  const [companyData, setCompanyData] = useState<CompanyApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({
      name: companyName,
      country,
      city
    });
    fetch(`/api/company?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar la empresa.");
        }
        return response.json();
      })
      .then((data: CompanyApiResponse) => {
        setCompanyData(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, [companyName, country, city]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams({ company: companyName, country, city });
    return params.toString();
  }, [companyName, country, city]);

  if (loading) {
    return <p className="text-sm text-slate-500">Cargando fuentes...</p>;
  }

  if (error || !companyData) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700">
        {error ?? "No hay datos disponibles."}
      </div>
    );
  }

  const sources = companyData.sources[slug] ?? [];

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Fuentes</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">{moduleLabels[slug]}</h2>
          <p className="mt-2 text-sm text-slate-600">Enlaces usados para el módulo.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/modules/${slug}?${queryString}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300"
          >
            Ver más detalles
          </Link>
          <Link
            href={`/dashboard?${queryString}`}
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Volver al dashboard
          </Link>
        </div>
      </header>

      <Card>
        {sources.length ? (
          <ul className="space-y-3 text-sm text-slate-600">
            {sources.map((source) => (
              <li key={source.url} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{source.excerpt}</p>
                <a className="mt-1 block text-xs text-slate-600 hover:text-slate-900" href={source.url}>
                  {source.url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">Sin fuentes públicas disponibles.</p>
        )}
      </Card>
    </div>
  );
}
