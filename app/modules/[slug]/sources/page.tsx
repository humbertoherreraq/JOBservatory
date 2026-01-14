import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "../../../../components/Cards";
import { mockData, moduleLabels, type ModuleSlug } from "../../../../data/mock";

export default function ModuleSourcesPage({ params }: { params: { slug: ModuleSlug } }) {
  const slug = params.slug;
  if (!(slug in moduleLabels)) {
    notFound();
  }

  const sources = mockData.sources[slug];

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
            href={`/modules/${slug}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:border-slate-300"
          >
            Ver más detalles
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-sky-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-sky-400"
          >
            Volver al dashboard
          </Link>
        </div>
      </header>

      <Card>
        <ul className="space-y-3 text-sm text-slate-600">
          {sources.map((source) => (
            <li key={source.url} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-semibold text-slate-900">{source.label}</p>
              <a className="mt-1 block text-xs text-sky-600" href={source.url}>
                {source.url}
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
