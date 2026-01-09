import Link from "next/link";
import { sidebarItems } from "../data/mock";

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col gap-8 border-r border-slate-800/60 bg-slate-950/70 px-6 py-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          JOBservatory
        </p>
        <h1 className="mt-3 text-xl font-semibold text-white">Análisis Empresarial</h1>
        <p className="mt-2 text-sm text-slate-400">
          Panorama integral de reputación, estabilidad y talento.
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-2 text-sm">
        {sidebarItems.map((item) => (
          <Link
            key={item.slug}
            href={`/modules/${item.slug}`}
            className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800/60 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/"
          className="rounded-lg px-3 py-2 text-slate-300 transition hover:bg-slate-800/60 hover:text-white"
        >
          Dashboard
        </Link>
      </nav>
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/70 p-4 text-xs text-slate-400">
        Última actualización: 26 Jun 2024
      </div>
    </aside>
  );
}
