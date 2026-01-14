"use client";

import Link from "next/link";
import { Card, CardHeader, KPI } from "../../components/Cards";
import { MarketShareChart, RevenueChurnChart, SentimentChart } from "../../components/Charts";
import { NewsList } from "../../components/NewsList";
import { mockData, moduleLabels } from "../../data/mock";

type DashboardClientProps = {
  companyName: string;
  country: string;
  city: string;
};

export function DashboardClient({ companyName, country, city }: DashboardClientProps) {
  const dashboardCopy = {
    headerLabel: `${companyName} — ${country}, ${city}`,
    profileDescription: `Análisis MOCK enfocado en ${companyName} para ${city}, ${country}.`,
    headquarters: `${city}, ${country}`,
    positioningSubtitle: `Market share estimado en ${city}:`,
    rumorsSubtitle: `Noticias y controversias sobre ${companyName}.`
  };

  const {
    companyProfile,
    realBusinessHealth,
    strategicDirection,
    localPositioning,
    laborStability,
    relevantEvents,
    newsGossip,
    strengthsWeaknesses,
    workEnvironmentSummary,
    perceivedStability,
    overallRating,
    topExecutives
  } = mockData;

  return (
    <div className="space-y-10">
      <header className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Empresa</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{dashboardCopy.headerLabel}</h1>
      </header>

      <section className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Dashboard</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">{companyName}</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">{dashboardCopy.profileDescription}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Overall Rating</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{overallRating.stars} ⭐</p>
          <p className="mt-2 text-xs text-slate-500">{overallRating.justification}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Company Profile" />
          <div className="mt-4 space-y-2 text-sm text-slate-600">
            <p>Industria: {companyProfile.industry}</p>
            <p>HQ: {dashboardCopy.headquarters}</p>
            <p>Fundación: {companyProfile.founded}</p>
            <p>Equipo: {companyProfile.employees} personas</p>
            <p>Revenue: {companyProfile.revenue}</p>
          </div>
          <Link
            href="/modules/perfil"
            className="mt-4 inline-flex text-sm font-semibold text-sky-600"
          >
            Ver más detalles →
          </Link>
        </Card>

        <Card>
          <CardHeader title="Real Business Health" action={<span>Score {realBusinessHealth.score}/100</span>} />
          <div className="mt-4 grid gap-3">
            {realBusinessHealth.kpis.map((kpi) => (
              <KPI key={kpi.label} label={kpi.label} value={kpi.value} trend={kpi.trend} />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Liquidez sólida y crecimiento constante.</span>
            <Link href="/modules/salud" className="text-sky-600">
              Ver más detalles
            </Link>
          </div>
        </Card>

        <Card>
          <CardHeader title="Perceived Stability" action={<span>{perceivedStability}</span>} />
          <p className="mt-4 text-sm text-slate-600">{workEnvironmentSummary}</p>
          <div className="mt-4 space-y-2 text-sm text-slate-500">
            <p>Top Executives</p>
            <ul className="list-disc pl-5">
              {topExecutives.slice(0, 3).map((exec) => (
                <li key={exec.name}>
                  {exec.name} · {exec.role}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/modules/laboral" className="mt-4 inline-flex text-sm font-semibold text-sky-600">
            Ver más detalles →
          </Link>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Ingresos y churn" />
          <p className="mt-2 text-xs text-slate-500">Evolución semestral</p>
          <div className="mt-4">
            <RevenueChurnChart data={realBusinessHealth.chart} />
          </div>
          <Link href="/modules/salud/sources" className="mt-4 inline-flex text-xs text-slate-500">
            Ver fuentes
          </Link>
        </Card>
        <Card>
          <CardHeader title="Local Positioning" />
          <p className="mt-2 text-sm text-slate-500">
            {dashboardCopy.positioningSubtitle} {localPositioning.marketShare}%
          </p>
          <MarketShareChart share={localPositioning.marketShare} />
          <p className="mt-4 text-xs text-slate-500">
            Competidores clave: {localPositioning.competitors.join(", ")}
          </p>
          <Link href="/modules/mercado" className="mt-4 inline-flex text-sm font-semibold text-sky-600">
            Ver más detalles →
          </Link>
        </Card>
        <Card>
          <CardHeader title="Labor Stability" />
          <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
            <span>Turnover</span>
            <span className="font-semibold text-slate-900">{laborStability.turnover}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
            <span>Engagement</span>
            <span className="font-semibold text-slate-900">{laborStability.engagement}/100</span>
          </div>
          <div className="mt-4">
            <SentimentChart data={laborStability.sentimentTrend} />
          </div>
          <Link href="/modules/laboral" className="mt-4 inline-flex text-sm font-semibold text-sky-600">
            Ver más detalles →
          </Link>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Strategic Direction" />
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {strategicDirection.priorities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 text-xs text-slate-500">
            {strategicDirection.roadmap.map((item) => (
              <div key={item.quarter} className="flex items-center justify-between">
                <span>{item.quarter}</span>
                <span>{item.focus}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Planning 12 meses</span>
            <Link href="/modules/estrategia" className="text-sky-600">
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
                {strengthsWeaknesses.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-rose-500">Weaknesses</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {strengthsWeaknesses.weaknesses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/modules/estrategia" className="mt-4 inline-flex text-sm font-semibold text-sky-600">
            Ver más detalles →
          </Link>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Relevant Events (12 meses)" />
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            {relevantEvents.map((event) => (
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
          <Link href="/modules/noticias" className="mt-4 inline-flex text-sm font-semibold text-sky-600">
            Ver más detalles →
          </Link>
        </Card>
        <Card>
          <CardHeader title="Noticias y controversias (3 años)" />
          <p className="mt-2 text-xs text-slate-500">{dashboardCopy.rumorsSubtitle}</p>
          <div className="mt-4">
            <NewsList items={newsGossip} />
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Últimos 36 meses</span>
            <Link href="/modules/noticias" className="text-sky-600">
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
                href={`/modules/${slug}/sources`}
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
