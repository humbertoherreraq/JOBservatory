import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "../../../components/Cards";
import { NewsList } from "../../../components/NewsList";
import { MarketShareChart, RevenueChurnChart, SentimentChart } from "../../../components/Charts";
import { mockData, moduleLabels, type ModuleSlug, type NewsItem } from "../../../data/mock";

const moduleDescriptions: Record<ModuleSlug, string> = {
  perfil: "Información corporativa, estructura y variables clave.",
  salud: "KPIs financieros y señales operativas de salud real.",
  estrategia: "Prioridades estratégicas y roadmap de crecimiento.",
  mercado: "Posicionamiento local y presión competitiva.",
  laboral: "Estabilidad laboral, condiciones y clima interno.",
  noticias: "Eventos relevantes, noticias y rumores del mercado." 
};

export default function ModulePage({ params }: { params: { slug: ModuleSlug } }) {
  const slug = params.slug;
  if (!(slug in moduleLabels)) {
    notFound();
  }

  const {
    companyProfile,
    realBusinessHealth,
    strategicDirection,
    localPositioning,
    laborStability,
    relevantEvents,
    newsGossip,
    strengthsWeaknesses
  } = mockData;
  const normalizedNewsGossip: NewsItem[] = newsGossip.map((item, index) => ({
    id: item.id ?? `news-gossip-${index + 1}`,
    title: item.title,
    date: item.date,
    category: item.category,
    source: item.source
  }));

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Módulo</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{moduleLabels[slug]}</h2>
          <p className="mt-2 text-sm text-slate-400">{moduleDescriptions[slug]}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/modules/${slug}/sources`}
            className="rounded-full border border-slate-700/60 px-4 py-2 text-xs font-semibold text-slate-300 hover:border-slate-500"
          >
            Ver fuentes
          </Link>
          <Link
            href="/"
            className="rounded-full bg-sky-500/20 px-4 py-2 text-xs font-semibold text-sky-200"
          >
            Volver al dashboard
          </Link>
        </div>
      </header>

      {slug === "perfil" && (
        <Card>
          <h3 className="text-lg font-semibold text-white">Company Profile</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2 text-sm text-slate-300">
              <p>Industria: {companyProfile.industry}</p>
              <p>HQ: {companyProfile.headquarters}</p>
              <p>Fundación: {companyProfile.founded}</p>
              <p>Equipo: {companyProfile.employees} personas</p>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-950/50 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Resumen ejecutivo</p>
              <p className="mt-2 text-slate-400">{companyProfile.description}</p>
            </div>
          </div>
        </Card>
      )}

      {slug === "salud" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-white">KPIs principales</h3>
            <div className="mt-4 grid gap-3">
              {realBusinessHealth.kpis.map((kpi) => (
                <div
                  key={kpi.label}
                  className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-950/50 p-4 text-sm"
                >
                  <span>{kpi.label}</span>
                  <span className="font-semibold text-white">{kpi.value}</span>
                  <span className="text-emerald-300">{kpi.trend}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Ingresos y churn</h3>
            <p className="mt-2 text-xs text-slate-400">Evolución semestral</p>
            <div className="mt-4">
              <RevenueChurnChart data={realBusinessHealth.chart} />
            </div>
          </Card>
        </div>
      )}

      {slug === "estrategia" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-white">Prioridades estratégicas</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
              {strategicDirection.priorities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Strengths & Weaknesses</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-emerald-300">Strengths</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                  {strengthsWeaknesses.strengths.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-rose-300">Weaknesses</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                  {strengthsWeaknesses.weaknesses.map((item) => (
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
            <h3 className="text-lg font-semibold text-white">Local Positioning</h3>
            <p className="mt-2 text-sm text-slate-400">{localPositioning.positioning}</p>
            <p className="mt-4 text-xs text-slate-400">
              Competidores clave: {localPositioning.competitors.join(", ")}
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Market Share</h3>
            <MarketShareChart share={localPositioning.marketShare} />
          </Card>
        </div>
      )}

      {slug === "laboral" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-white">Labor Stability & Conditions</h3>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>Turnover: {laborStability.turnover}</p>
              <p>Engagement: {laborStability.engagement}/100</p>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
              {laborStability.conditions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">Work Environment Summary</h3>
            <p className="mt-4 text-sm text-slate-300">{mockData.workEnvironmentSummary}</p>
            <div className="mt-4">
              <SentimentChart data={laborStability.sentimentTrend} />
            </div>
          </Card>
        </div>
      )}

      {slug === "noticias" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-white">Relevant Events (12 meses)</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {relevantEvents.map((event) => (
                <div
                  key={event.title}
                  className="rounded-xl border border-slate-800/60 bg-slate-950/50 p-4"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{event.date}</span>
                    <span className="uppercase">{event.tag}</span>
                  </div>
                  <p className="mt-2 font-semibold text-white">{event.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{event.impact}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-white">News & Gossip (3 años)</h3>
            <p className="mt-2 text-xs text-slate-400">Rumors claramente etiquetado.</p>
            <div className="mt-4">
              <NewsList items={normalizedNewsGossip} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
