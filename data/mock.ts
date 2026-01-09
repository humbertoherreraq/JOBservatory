export type NewsCategory = "logros" | "rumores" | "cambios" | "escandalos";

export type NewsItem = {
  title: string;
  date: string;
  category: NewsCategory;
  source: string;
};

export type ModuleSlug =
  | "perfil"
  | "salud"
  | "estrategia"
  | "mercado"
  | "laboral"
  | "noticias";

export const moduleLabels: Record<ModuleSlug, string> = {
  perfil: "Company Profile",
  salud: "Real Business Health",
  estrategia: "Strategic Direction",
  mercado: "Local Positioning",
  laboral: "Labor Stability & Conditions",
  noticias: "News & Gossip"
};

export const sidebarItems = [
  { slug: "perfil", label: "Perfil" },
  { slug: "salud", label: "Salud del Negocio" },
  { slug: "estrategia", label: "Estrategia" },
  { slug: "mercado", label: "Mercado" },
  { slug: "laboral", label: "Condiciones Laborales" },
  { slug: "noticias", label: "Noticias y Chismes" }
] as const;

export const mockData = {
  companyProfile: {
    name: "JOBservatory Labs",
    industry: "Analítica de talento y reputación empresarial",
    headquarters: "Madrid, España",
    founded: 2014,
    employees: 480,
    revenue: "€92M",
    description:
      "Plataforma de inteligencia laboral que combina datos públicos y señales internas para mapear el clima de empresas y mercados." 
  },
  realBusinessHealth: {
    score: 82,
    kpis: [
      { label: "Ingresos 12M", value: "€92M", trend: "+8%" },
      { label: "Margen EBITDA", value: "21%", trend: "+2.1pp" },
      { label: "Liquidez", value: "1.9x", trend: "Estable" }
    ],
    chart: [
      { month: "Ene", revenue: 6.2, churn: 2.1 },
      { month: "Feb", revenue: 6.8, churn: 1.9 },
      { month: "Mar", revenue: 7.1, churn: 2.3 },
      { month: "Abr", revenue: 7.4, churn: 2.0 },
      { month: "May", revenue: 7.9, churn: 1.8 },
      { month: "Jun", revenue: 8.1, churn: 1.6 }
    ]
  },
  strategicDirection: {
    priorities: [
      "Expandir cobertura LATAM con foco en México y Colombia.",
      "Automatizar scoring de estabilidad con IA explicable.",
      "Acelerar alianzas con consultoras de talento." 
    ],
    roadmap: [
      { quarter: "Q3", focus: "Lanzamiento módulo de reputación local" },
      { quarter: "Q4", focus: "Integración con ATS y HRIS" },
      { quarter: "Q1", focus: "Dashboard de riesgo sectorial" }
    ]
  },
  localPositioning: {
    marketShare: 18,
    competitors: ["TalentPulse", "WorkScope", "HR Lens"],
    positioning:
      "Segundo jugador en Europa en analítica laboral, con crecimiento sostenido en mercados mid-market." 
  },
  laborStability: {
    turnover: "11.4%",
    engagement: 74,
    sentimentTrend: [
      { month: "Ene", score: 68 },
      { month: "Feb", score: 70 },
      { month: "Mar", score: 72 },
      { month: "Abr", score: 73 },
      { month: "May", score: 75 },
      { month: "Jun", score: 74 }
    ],
    conditions: [
      "Flexibilidad híbrida consolidada (3 días remoto).",
      "Plan de bienestar renovado con cobertura psicológica.",
      "Brecha salarial en revisión interna." 
    ]
  },
  relevantEvents: [
    {
      title: "Ronda Serie C cerrada",
      date: "Abr 2024",
      impact: "Fortalece inversión en producto",
      tag: "logros"
    },
    {
      title: "Reestructuración del equipo de ventas",
      date: "Jul 2024",
      impact: "Cambio en estrategia comercial",
      tag: "cambios"
    },
    {
      title: "Incidente con filtración de datos",
      date: "Nov 2024",
      impact: "Aumento de controles de seguridad",
      tag: "escandalos"
    }
  ],
  newsGossip: [
    {
      title: "Reconocimiento como empleador Top 10",
      date: "Feb 2023",
      category: "logros",
      source: "HR Weekly"
    },
    {
      title: "Rumor sobre posible adquisición",
      date: "Ago 2023",
      category: "rumores",
      source: "Mercados Insider"
    },
    {
      title: "Nuevo VP de Producto",
      date: "Ene 2024",
      category: "cambios",
      source: "Tech People"
    },
    {
      title: "Investigación por prácticas de datos",
      date: "May 2024",
      category: "escandalos",
      source: "El Observador"
    }
  ] satisfies NewsItem[],
  topExecutives: [
    { name: "Lucía Torres", role: "CEO" },
    { name: "Andrés Molina", role: "CFO" },
    { name: "Sofía Vega", role: "COO" },
    { name: "Rafael Ibarra", role: "VP People" }
  ],
  strengthsWeaknesses: {
    strengths: [
      "Datos propios con alta granularidad.",
      "Marca sólida en HR analytics.",
      "Pipeline comercial estable." 
    ],
    weaknesses: [
      "Dependencia de partners para LATAM.",
      "Rotación moderada en equipos clave.",
      "Percepción pública afectada por incidente 2024." 
    ]
  },
  workEnvironmentSummary:
    "Ambiente colaborativo con presión alta en ciclos de entrega, cultura orientada a datos y feedback continuo.",
  perceivedStability: "Medium",
  overallRating: {
    stars: 4.2,
    justification:
      "Crecimiento sostenido y buena liquidez, con riesgos reputacionales moderados y presión interna por expansión rápida." 
  },
  sources: {
    perfil: [
      { label: "Registro mercantil", url: "https://registro.example.com" },
      { label: "Sitio corporativo", url: "https://jobservatory.example.com" }
    ],
    salud: [
      { label: "Informe financiero 2024", url: "https://finanzas.example.com" }
    ],
    estrategia: [
      { label: "Presentación inversores", url: "https://inversion.example.com" }
    ],
    mercado: [
      { label: "Reporte mercado HR", url: "https://mercado.example.com" }
    ],
    laboral: [
      { label: "Encuesta interna", url: "https://clima.example.com" }
    ],
    noticias: [
      { label: "Newsroom", url: "https://news.example.com" }
    ]
  }
};
