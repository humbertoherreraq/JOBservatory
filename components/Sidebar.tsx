"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { sidebarItems } from "../data/modules";

const icons = {
  perfil: (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M10 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-6 14.5a6 6 0 0 1 12 0v.5H4v-.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
  salud: (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M3 10h4l2-4 3 8 2-4h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  estrategia: (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M4 14l4-4 3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="14" r="1.5" fill="currentColor" />
      <circle cx="8" cy="10" r="1.5" fill="currentColor" />
      <circle cx="11" cy="13" r="1.5" fill="currentColor" />
      <circle cx="16" cy="7" r="1.5" fill="currentColor" />
    </svg>
  ),
  mercado: (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M3 15h14M5 15V9m5 6V5m5 10v-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  laboral: (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M4 6h12v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M7 6V4h6v2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  noticias: (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M4 5h10a2 2 0 0 1 2 2v8H6a2 2 0 0 1-2-2V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M6 8h7M6 11h5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
};

export function Sidebar() {
  const searchParams = useSearchParams();
  const queryString = searchParams?.toString();
  return (
    <aside className="flex h-full w-64 flex-col gap-8 border-r border-slate-200 bg-white px-6 py-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold text-white">
            JS
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              JOBservatory
            </p>
            <h1 className="mt-1 text-base font-semibold text-slate-900">Análisis Empresarial</h1>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          Panorama integral de reputación, estabilidad y talento.
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-2 text-sm">
        {sidebarItems.map((item) => (
          <Link
            key={item.slug}
            href={queryString ? `/modules/${item.slug}?${queryString}` : `/modules/${item.slug}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <span className="text-slate-500">{icons[item.slug]}</span>
            {item.label}
          </Link>
        ))}
        <Link
          href={queryString ? `/dashboard?${queryString}` : "/dashboard"}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <span className="text-slate-500">
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path
                d="M3 9.5 10 4l7 5.5V16a1 1 0 0 1-1 1h-4v-4H8v4H4a1 1 0 0 1-1-1V9.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Dashboard
        </Link>
      </nav>
    </aside>
  );
}
