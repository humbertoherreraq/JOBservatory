import type { ModuleSlug } from "./types";

export const moduleLabels: Record<ModuleSlug, string> = {
  perfil: "Company Profile",
  salud: "Real Business Health",
  estrategia: "Strategic Direction",
  mercado: "Local Positioning",
  laboral: "Labor Stability & Conditions",
  noticias: "Noticias y controversias"
};

export const sidebarItems = [
  { slug: "perfil", label: "Perfil" },
  { slug: "salud", label: "Salud del Negocio" },
  { slug: "estrategia", label: "Estrategia" },
  { slug: "mercado", label: "Mercado" },
  { slug: "laboral", label: "Condiciones Laborales" },
  { slug: "noticias", label: "Noticias y controversias" }
] as const;
