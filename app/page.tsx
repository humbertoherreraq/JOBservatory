import { CompanySearchForm } from "./components/CompanySearchForm";

type HomePageProps = {
  searchParams?: {
    alert?: string;
  };
};

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
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
    </div>
  );
}
