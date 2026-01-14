import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "../components/Sidebar";

export const metadata: Metadata = {
  title: "JOBservatory | Análisis Empresarial",
  description: "Dashboard de reputación, estabilidad y clima laboral." 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-10 py-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold text-white">
                  JS
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Portal</p>
                  <p className="text-lg font-semibold text-slate-900">JOBservatory Workspace</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">
                  Última actualización: 26 Jun 2024
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500">
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                    <path
                      d="M10 2.5a3.5 3.5 0 0 1 3.5 3.5v2.2l1.2 2.2a1 1 0 0 1-.9 1.5H6.2a1 1 0 0 1-.9-1.5l1.2-2.2V6A3.5 3.5 0 0 1 10 2.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M8.5 16a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </header>
            <main className="flex-1 px-10 py-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
