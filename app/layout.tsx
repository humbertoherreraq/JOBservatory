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
      <body className="bg-slate-950 text-slate-100">
        <div className="grid min-h-screen grid-cols-[260px_1fr]">
          <Sidebar />
          <main className="px-10 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
