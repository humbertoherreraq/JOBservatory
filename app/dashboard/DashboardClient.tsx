"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, KPI } from "../../components/Cards";
import { MarketShareChart, RevenueChurnChart, SentimentChart } from "../../components/Charts";
import { NewsList } from "../../components/NewsList";
import { moduleLabels } from "../../data/modules";
import type { CompanyApiResponse } from "../../data/types";

type DashboardClientProps = {
  companyName: string;
  country: string;
  city: string;
};

type RecentCompany = {
  name: string;
  country: string;
  city: string;
};

const recentKey = "jobservatory.recentCompanies";

export function DashboardClient({ companyName, country, city }: DashboardClientProps) {
  const router = useRouter();
  const [companyData, setCompanyData] = useState<CompanyApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentCompanies, setRecentCompanies] = useState<RecentCompany[]>([]);
  const [formState, setFormState] = useState({
    name: companyName,
    country,
    city
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
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

  useEffect(() => {
    const stored = localStorage.getItem(recentKey);
    const parsed: RecentCompany[] = stored ? JSON.parse(stored) : [];
    const updated = [
      { name: companyName, country, city },
      ...parsed.filter(
        (item) =>
          item.name !== companyName || item.country !== country || item.city !== city
      )
    ].slice(0, 6);
    localStorage.setItem(recentKey, JSON.stringify(updated));
    setRecentCompanies(updated);
  }, [companyName, country, city]);

  const dashboardCopy = {
    headerLabel: `${companyName} — ${country}, ${city}`,
    profileDescription: `Análisis dinámico enfocado en ${companyName} para ${city}, ${country}.`,
    headquarters: `${city}, ${country}`,
    positioningSubtitle: `Market share estimado en ${city}:`,
    rumorsSubtitle: `Noticias y controversias sobre ${companyName}.`
  };

  const queryString = useMemo(() => {
    const params = new URLSearchParams({ company: companyName, country, city });
    return params.toString();
  }, [companyName, country, city]);

  const moduleLinks = useMemo(() => {
    return Object.fromEntries(
      Object.keys(moduleLabels).map((slug) => [slug, `/modules/${slug}?${queryString}`])
    ) as Record<keyof typeof moduleLabels, string>;
  }, [queryString]);

  if (loading) {
    return <p className="text-sm text-slate-500">Cargando perfil dinámico...</p>;
  }

  if (error || !companyData) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700">
        {error ?? "No se encontró información dinámica."}
      </div>
    );
  }

const {
  modules: { perfil, salud, estrategia, mercado, laboral, noticias },
  rating: rawRating,
  updatedAt
} = companyData;

const rating = {
  score: rawRating?.score ?? 0,
  summary: rawRating?.summary ?? "N/D",
  positives: rawRating?.positives ?? [],
  risks: rawRating?.risks ?? [],
  // Estos 3 son los que te están rompiendo:
  stars: (rawRating as any)?.stars ?? "N/D",
  explanation: (rawRating as any)?.explanation ?? "",
  sources: (rawRating as any)?.sources ?? []
};


  const handleChangeCompany = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = formState.name.trim();
    const trimmedCountry = formState.country.trim();
    const trimmedCity = formState.city.trim();
    if (!trimmedName || !trimmedCountry || !trimmedCity) {
      return;
    }
    const params = new URLSearchParams({
      company: trimmedName,
      country: trimmedCountry,
      city: trimmedCity
    });
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <div className="space-y-10">
      <header className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Empresa</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{dashboardCopy.headerLabel}</h1>
        <p className="mt-2 text-xs text-slate-500">
          Actualizado: {new Date(updatedAt).toLocaleString("es")}
        </p>
      </header>

      <section className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">{companyName}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">{dashboardCopy.profileDescription}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Overall Rating</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{rating.stars} ⭐</p>
          <p className="mt-1 text-sm text-slate-700">Score {rating.score}/100</p>
          <p className="mt-2 text-xs text-slate-500">{rating.explanation}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Cambiar empresa" />
          <form onSubmit={handleChangeCompany} className="mt-4 grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Empresa
              </span>
              <input
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                País
              </span>
              <input
                value={formState.country}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, country: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ciudad
              </span>
              <input
                value={formState.city}
                onChange={(event) => setFormState((prev) => ({ ...prev, city: event.target.value }))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900"
              />
            </label>
            <div className="md:col-span-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Actualizar
              </button>
            </div>
          </form>
          {recentCompanies.length > 1 ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Recientes
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {recentCompanies
                  .filter(
                    (item) =>
                      item.name !== companyName || item.country !== country || item.city !== city
                  )
                  .map((item) => {
                    const params = new URLSearchParams({
                      company: item.name,
                      country: item.country,
                      city: item.city
                    });
                    return (
                      <button
                        key={`${item.name}-${item.city}`}
                        onClick={() => router.push(`/dashboard?${params.toString()}`)}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600 hover:border-slate-300"
                      >
                        {item.name} · {item.city}
                      </button>
                    );
                  })}
              </div>
            </div>
          ) : null}
        </Card>
        <Card>
          <CardHeader title="Explicación del rating" />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-600">Positivos</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {rating.positives.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-rose-500">Riesgos</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {rating.risks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          {rating.sources?.length ? (
            <div className="mt-4 text-xs text-slate-500">
              Fuentes:
              <ul className="mt-2 list-disc space-y-1 pl-4">
                {rating.sources.map((source) => (
                  <li key={source.url}>
                    <a className="text-slate-600 hover:text-slate-900" href={source.url}>
                      {source.excerpt}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Company Profile" />
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>Industria: {perfil.industry ?? "N/D"}</p>
            <p>HQ: {perfil.headquarters ?? dashboardCopy.headquarters}</p>
            <p>Fundación: {perfil.founded ?? "N/D"}</p>
            <p>Equipo: {perfil.employees ?? "N/D"}</p>
            <p>Revenue (USD): {perfil.revenueUSD ?? "N/D"}</p>
          </div>
          <Link
            href={moduleLinks.perfil}
            className="mt-4 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Ver más detalles →
          </Link>
        </Card>

        <Card>
          <CardHeader title="Real Business Health" action={<span>Score {salud.score}/100</span>} />
          <div className="mt-4 grid gap-3">
            {salud.kpis.map((kpi) => (
              <KPI key={kpi.label} label={kpi.label} value={kpi.value} trend={kpi.trend} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>{salud.notes[0]}</span>
            <Link href={moduleLinks.salud} className="text-slate-700 hover:text-slate-900">
              Ver más detalles
            </Link>
          </div>
        </Card>

        <Card>
          <CardHeader title="Perceived Stability" action={<span>{laboral.perceivedStability}</span>} />
          <p className="mt-4 text-sm text-slate-600">{laboral.workEnvironmentSummary}</p>
          <div className="mt-4 space-y-2 text-sm text-slate-500">
            <p>Condiciones reportadas</p>
            <ul className="list-disc pl-5">
              {laboral.conditions.slice(0, 2).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <Link
            href={moduleLinks.laboral}
            className="mt-4 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Ver más detalles →
          </Link>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Ingresos y churn" />
          <p className="mt-2 text-xs text-slate-500">Evolución semestral</p>
          {salud.chart.length ? (
            <div className="mt-4">
              <RevenueChurnChart data={salud.chart} />
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Sin datos financieros públicos en USD.</p>
          )}
          <Link
            href={`/modules/salud/sources?${queryString}`}
            className="mt-4 inline-flex text-xs text-slate-500"
          >
            Ver fuentes
          </Link>
        </Card>
        <Card>
          <CardHeader title="Local Positioning" />
          <p className="mt-2 text-sm text-slate-500">
            {dashboardCopy.positioningSubtitle} {mercado.marketShare ?? "N/D"}%
          </p>
          {mercado.marketShare !== null ? (
            <MarketShareChart share={mercado.marketShare} label={companyName} />
          ) : (
            <p className="mt-6 text-sm text-slate-500">Sin estimación pública de share.</p>
          )}
          <p className="mt-4 text-xs text-slate-500">
            Competidores clave: {mercado.competitors.length ? mercado.competitors.join(", ") : "N/D"}
          </p>
          <Link
            href={moduleLinks.mercado}
            className="mt-4 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Ver más detalles →
          </Link>
        </Card>
        <Card>
          <CardHeader title="Labor Stability" />
          <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
            <span>Turnover</span>
            <span className="font-semibold text-slate-900">{laboral.turnover}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
            <span>Engagement</span>
            <span className="font-semibold text-slate-900">
              {laboral.engagement !== null ? `${laboral.engagement}/100` : "N/D"}
            </span>
          </div>
          {laboral.sentimentTrend.length ? (
            <div className="mt-4">
              <SentimentChart data={laboral.sentimentTrend} />
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">Sin tendencia de sentimiento pública.</p>
          )}
          <Link
            href={moduleLinks.laboral}
            className="mt-4 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Ver más detalles →
          </Link>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Strategic Direction" />
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {estrategia.priorities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 text-xs text-slate-500">
            {estrategia.roadmap.map((item) => (
              <div key={item.quarter} className="flex items-center justify-between">
                <span>{item.quarter}</span>
                <span>{item.focus}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Planning 12 meses</span>
            <Link href={moduleLinks.estrategia} className="text-slate-700 hover:text-slate-900">
              Ver más detalles
            </Link>
          </div>
        </Card>
        <Card>
          <CardHeader title="Strengths & Weaknesses" />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-emerald-600">Strengths</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {estrategia.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-rose-500">Weaknesses</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {estrategia.weaknesses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link
            href={moduleLinks.estrategia}
            className="mt-4 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Ver más detalles →
          </Link>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Relevant Events (12 meses)" />
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            {noticias.relevantEvents.map((event) => (
              <div key={event.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{event.date}</span>
                  <span className="uppercase">{event.tag}</span>
                </div>
                <p className="mt-2 font-semibold text-slate-900">{event.title}</p>
                <p className="mt-1 text-xs text-slate-500">{event.impact}</p>
              </div>
            ))}
          </div>
          <Link
            href={moduleLinks.noticias}
            className="mt-4 inline-flex text-sm font-semibold text-slate-700 hover:text-slate-900"
          >
            Ver más detalles →
          </Link>
        </Card>
        <Card>
          <CardHeader title="Noticias y controversias (3 años)" />
          <p className="mt-2 text-xs text-slate-500">{dashboardCopy.rumorsSubtitle}</p>
          <div className="mt-4">
            <NewsList items={noticias.newsGossip} />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Últimos 36 meses</span>
            <Link href={moduleLinks.noticias} className="text-slate-700 hover:text-slate-900">
              Ver más detalles
            </Link>
          </div>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader title="Sources" />
          <p className="mt-2 text-sm text-slate-500">
            Accede a las fuentes por módulo para revisar los links base del análisis.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(moduleLabels).map(([slug, label]) => (
              <Link
                key={slug}
                href={`/modules/${slug}/sources?${queryString}`}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
