"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Card } from "../../../components/Cards";
import { NewsList } from "../../../components/NewsList";
import { MarketShareChart, RevenueChurnChart, SentimentChart } from "../../../components/Charts";
import { moduleLabels } from "../../../data/modules";
import type { CompanyApiResponse, ModuleSlug, NewsItem } from "../../../data/types";

const moduleDescriptions: Record<ModuleSlug, string> = {
  perfil: "Información corporativa, estructura y variables clave.",
  salud: "KPIs financieros y señales operativas de salud real.",
  estrategia: "Prioridades estratégicas y roadmap de crecimiento.",
  mercado: "Posicionamiento local y presión competitiva.",
  laboral: "Estabilidad laboral, condiciones y clima interno.",
  noticias: "Eventos relevantes, noticias y controversias del mercado."
};

type ModuleClientProps = {
  slug: ModuleSlug;
  companyName: string;
  country: string;
  city: string;
};

export function ModuleClient({ slug, companyName, country, city }: ModuleClientProps) {
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
    return <p className="text-sm text-slate-500">Cargando módulo...</p>;
  }

  if (error || !companyData) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-700">
        {error ?? "No hay datos disponibles."}
      </div>
    );
  }

  const { modules } = companyData;
  const normalizedNews: NewsItem[] = modules.noticias.newsGossip;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Módulo</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">{moduleLabels[slug]}</h2>
          <p className="mt-2 text-sm text-slate-600">{moduleDescriptions[slug]}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/modules/${slug}/sources?${queryString}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300"
          >
            Ver fuentes
          </Link>
          <Link
            href={`/dashboard?${queryString}`}
            className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Volver al dashboard
          </Link>
        </div>
      </header>

      {slug === "perfil" && (
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">Company Profile</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2 text-sm text-slate-600">
              <p>Industria: {modules.perfil.industry ?? "N/D"}</p>
              <p>HQ: {modules.perfil.headquarters ?? "N/D"}</p>
              <p>Fundación: {modules.perfil.founded ?? "N/D"}</p>
              <p>Equipo: {modules.perfil.employees ?? "N/D"}</p>
              <p>Revenue (USD): {modules.perfil.revenueUSD ?? "N/D"}</p>
              {modules.perfil.website ? (
                <p>
                  Sitio web:{" "}
                  <a className="text-slate-700 hover:text-slate-900" href={modules.perfil.website}>
                    {modules.perfil.website}
                  </a>
                </p>
              ) : null}
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Resumen ejecutivo</p>
              <p className="mt-2 text-slate-500">{modules.perfil.description ?? "N/D"}</p>
            </div>
          </div>
        </Card>
      )}

      {slug === "salud" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">KPIs principales</h3>
            <div className="mt-4 grid gap-3">
              {modules.salud.kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600"
                >
                  <span>{kpi.label}</span>
                  <span className="font-semibold text-slate-900">{kpi.value}</span>
                  <span className="text-emerald-600">{kpi.trend ?? "N/D"}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-slate-500">
              {modules.salud.notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Ingresos y churn</h3>
            <p className="mt-2 text-xs text-slate-500">Evolución semestral</p>
            {modules.salud.chart.length ? (
              <div className="mt-4">
                <RevenueChurnChart data={modules.salud.chart} />
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">Sin datos públicos en USD.</p>
            )}
          </Card>
        </div>
      )}

      {slug === "estrategia" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Prioridades estratégicas</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {modules.estrategia.priorities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Strengths & Weaknesses</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-600">Strengths</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {modules.estrategia.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-rose-500">Weaknesses</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {modules.estrategia.weaknesses.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {slug === "mercado" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Local Positioning</h3>
            <p className="mt-2 text-sm text-slate-600">{modules.mercado.positioning}</p>
            <p className="mt-4 text-xs text-slate-500">
              Competidores clave: {modules.mercado.competitors.join(", ") || "N/D"}
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Market Share</h3>
            {modules.mercado.marketShare !== null ? (
              <MarketShareChart share={modules.mercado.marketShare} label={companyName} />
            ) : (
              <p className="mt-4 text-sm text-slate-500">Sin estimación pública de share.</p>
            )}
          </Card>
        </div>
      )}

      {slug === "laboral" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Labor Stability & Conditions</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>Turnover: {modules.laboral.turnover}</p>
              <p>Engagement: {modules.laboral.engagement ?? "N/D"}</p>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
              {modules.laboral.conditions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Work Environment Summary</h3>
            <p className="mt-4 text-sm text-slate-600">{modules.laboral.workEnvironmentSummary}</p>
            {modules.laboral.sentimentTrend.length ? (
              <div className="mt-4">
                <SentimentChart data={modules.laboral.sentimentTrend} />
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">Sin señales públicas suficientes.</p>
            )}
          </Card>
        </div>
      )}

      {slug === "noticias" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Relevant Events (12 meses)</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {modules.noticias.relevantEvents.map((event) => (
                <div
                  key={event.title}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{event.date}</span>
                    <span className="uppercase">{event.tag}</span>
                  </div>
                  <p className="mt-2 font-semibold text-slate-900">{event.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{event.impact}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Noticias y controversias (3 años)</h3>
            <p className="mt-2 text-xs text-slate-500">Controversias claramente etiquetadas.</p>
            <div className="mt-4">
              <NewsList items={normalizedNews} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
