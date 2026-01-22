export type NewsCategory = "logros" | "rumores" | "cambios" | "escandalos";

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: NewsCategory;
  source: string;
  url?: string;
  excerpt?: string;
};

export type SourceItem = {
  url: string;
  excerpt: string;
};

export type ModuleSlug =
  | "perfil"
  | "salud"
  | "estrategia"
  | "mercado"
  | "laboral"
  | "noticias";

export type CompanyModuleData = {
  perfil: {
    industry?: string | null;
    headquarters?: string | null;
    founded?: string | null;
    employees?: string | null;
    revenueUSD?: string | null;
    description?: string | null;
    website?: string | null;
  };
  salud: {
    score: number;
    kpis: { label: string; value: string; trend: string }[];
    chart: { month: string; revenue: number; churn: number }[];
    notes: string[];
  };
  estrategia: {
    priorities: string[];
    roadmap: { quarter: string; focus: string }[];
    strengths: string[];
    weaknesses: string[];
  };
  mercado: {
    marketShare: number | null;
    competitors: string[];
    positioning: string;
  };
  laboral: {
    turnover: string;
    engagement: number | null;
    sentimentTrend: { month: string; score: number }[];
    conditions: string[];
    workEnvironmentSummary: string;
    perceivedStability: string;
  };
  noticias: {
    relevantEvents: { title: string; date: string; impact: string; tag: string }[];
    newsGossip: NewsItem[];
  };
};

export type CompanyRating = {
  score: number;
  stars: number;
  explanation: string;
  positives: string[];
  risks: string[];
  sources: SourceItem[];
};

export type CompanyApiResponse = {
  company: {
    name: string;
    country: string;
    city: string;
  };
  modules: CompanyModuleData;
  rating: CompanyRating;
  sources: Record<ModuleSlug, SourceItem[]>;
  updatedAt: string;
};
