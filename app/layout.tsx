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
      <body className="bg-slate-100 text-slate-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-10 py-4 shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Portal</p>
                <p className="text-lg font-semibold text-slate-900">JOBservatory Workspace</p>
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">
                Última actualización: 26 Jun 2024
              </div>
            </header>
            <main className="flex-1 px-10 py-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
