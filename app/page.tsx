import { CompanySearchForm } from "./components/CompanySearchForm";

type HomePageProps = {
  searchParams?: {
    alert?: string;
  };
};

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-[1.1fr,1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Búsqueda de empresa
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">
            Encuentra el contexto de una empresa antes de ver el dashboard.
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Completa los datos básicos para preparar el análisis MOCK y personalizar los módulos.
          </p>
          {searchParams?.alert === "1" ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Completa los datos para continuar.
            </div>
          ) : null}
          <CompanySearchForm />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Vista previa
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Dashboard empresarial</h2>
          <p className="mt-3 text-sm text-slate-600">
            Visualiza reputación, salud del negocio y señales laborales en un solo lugar, con un
            look &amp; feel corporativo y módulos conectados.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-slate-900" />
              KPIs financieros y de estabilidad.
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-slate-900" />
              Señales de mercado local y competencia.
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-slate-900" />
              Noticias y controversias recientes.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
