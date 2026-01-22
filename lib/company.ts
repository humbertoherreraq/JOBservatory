import type { NewsCategory, NewsItem, SourceItem } from "../data/types";

type WikipediaSummary = {
  title: string;
  summary: string;
  url: string;
  wikidataId?: string | null;
};

type WikidataDetails = {
  website?: string | null;
  industry?: string | null;
};

type GdeltArticle = {
  url: string;
  title: string;
  seendate: string;
  domain?: string;
  sourcecountry?: string;
  tone?: number | null;
};

const WIKIPEDIA_API = "https://en.wikipedia.org";
const WIKIDATA_API = "https://www.wikidata.org";
const GDELT_API = "https://api.gdeltproject.org/api/v2/doc/doc";

const DEFAULT_TIMEOUT = 8000;

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed ${response.status}`);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

async function searchWikipediaTitle(name: string): Promise<string | null> {
  const url = `${WIKIPEDIA_API}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
    name
  )}&format=json&origin=*`;
  const data = await fetchJson<{ query?: { search?: { title: string }[] } }>(url);
  return data.query?.search?.[0]?.title ?? null;
}

export async function fetchWikipediaSummary(name: string): Promise<WikipediaSummary | null> {
  const attemptSummary = async (title: string) => {
    const url = `${WIKIPEDIA_API}/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const data = await fetchJson<{
      title?: string;
      extract?: string;
      content_urls?: { desktop?: { page?: string } };
      type?: string;
    }>(url);
    if (!data.extract || data.type === "disambiguation") {
      return null;
    }
    return {
      title: data.title ?? title,
      summary: data.extract,
      url: data.content_urls?.desktop?.page ?? url
    };
  };

  const direct = await attemptSummary(name);
  if (direct) {
    return direct;
  }

  const fallbackTitle = await searchWikipediaTitle(name);
  if (!fallbackTitle) {
    return null;
  }

  return await attemptSummary(fallbackTitle);
}

export async function fetchWikidataId(title: string): Promise<string | null> {
  const url = `${WIKIPEDIA_API}/w/api.php?action=query&prop=pageprops&ppprop=wikibase_item&titles=${encodeURIComponent(
    title
  )}&format=json&origin=*`;
  const data = await fetchJson<{ query?: { pages?: Record<string, { pageprops?: { wikibase_item?: string } }> } }>(
    url
  );
  const page = data.query?.pages ? Object.values(data.query.pages)[0] : undefined;
  return page?.pageprops?.wikibase_item ?? null;
}

export async function fetchWikidataDetails(qid: string): Promise<WikidataDetails> {
  const query = `
    SELECT ?industryLabel ?website WHERE {
      OPTIONAL { wd:${qid} wdt:P452 ?industry. }
      OPTIONAL { wd:${qid} wdt:P856 ?website. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "es,en". }
    }
    LIMIT 5
  `;
  const url = `${WIKIDATA_API}/sparql?format=json&query=${encodeURIComponent(query)}`;
  const data = await fetchJson<{
    results?: { bindings?: { industryLabel?: { value: string }; website?: { value: string } }[] };
  }>(url, { headers: { Accept: "application/sparql-results+json" } });
  const bindings = data.results?.bindings ?? [];
  return {
    industry: bindings.find((item) => item.industryLabel)?.industryLabel?.value ?? null,
    website: bindings.find((item) => item.website)?.website?.value ?? null
  };
}

export async function fetchGdeltArticles({
  name,
  country,
  startDate,
  endDate,
  maxRecords
}: {
  name: string;
  country?: string | null;
  startDate: Date;
  endDate: Date;
  maxRecords: number;
}): Promise<GdeltArticle[]> {
  const queryTerms = [`"${name}"`];
  if (country) {
    queryTerms.push(country);
  }
  const query = queryTerms.join(" AND ");
  const url = `${GDELT_API}?query=${encodeURIComponent(
    query
  )}&mode=ArtList&maxrecords=${maxRecords}&format=json&startdatetime=${formatGdeltDate(
    startDate
  )}&enddatetime=${formatGdeltDate(endDate)}`;
  const data = await fetchJson<{ articles?: GdeltArticle[] }>(url);
  return data.articles ?? [];
}

export function formatGdeltDate(date: Date) {
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}${pad(
    date.getUTCHours()
  )}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}`;
}

export function parseGdeltDate(value: string): Date | null {
  if (!value || value.length < 8) return null;
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6)) - 1;
  const day = Number(value.slice(6, 8));
  const hour = Number(value.slice(8, 10) || "0");
  const minute = Number(value.slice(10, 12) || "0");
  const second = Number(value.slice(12, 14) || "0");
  if (!Number.isFinite(year)) return null;
  return new Date(Date.UTC(year, month, day, hour, minute, second));
}

export function formatDisplayDate(date: Date | null) {
  if (!date) return "N/D";
  return new Intl.DateTimeFormat("es", { month: "short", year: "numeric" }).format(date);
}

export function mapNewsCategory(title: string, tone?: number | null): NewsCategory {
  const normalized = title.toLowerCase();
  if (/(escándalo|demanda|fraude|investigación|multa|sancion|acus)/i.test(normalized)) {
    return "escandalos";
  }
  if (/(rumor|podría|posible|se evalúa)/i.test(normalized)) {
    return "rumores";
  }
  if (tone !== null && tone !== undefined) {
    if (tone >= 1) return "logros";
    if (tone <= -1) return "escandalos";
  }
  return "cambios";
}

export function normalizeNewsItems(articles: GdeltArticle[], categoryFallback?: NewsCategory): NewsItem[] {
  return articles.map((article, index) => {
    const date = formatDisplayDate(parseGdeltDate(article.seendate));
    const category = categoryFallback ?? mapNewsCategory(article.title, article.tone);
    return {
      id: `${article.url}-${index}`,
      title: article.title,
      date,
      category,
      source: article.domain ?? article.sourcecountry ?? "GDELT",
      url: article.url,
      excerpt: article.title
    };
  });
}

export function extractSourcesFromNews(items: NewsItem[]): SourceItem[] {
  return items.map((item) => ({
    url: item.url ?? "",
    excerpt: item.excerpt ?? item.title
  }));
}

export function buildSentimentTrend(articles: GdeltArticle[]): { month: string; score: number }[] {
  const scores: Record<string, { total: number; count: number }> = {};
  articles.forEach((article) => {
    const date = parseGdeltDate(article.seendate);
    if (!date || article.tone === null || article.tone === undefined) return;
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}`;
    scores[key] = scores[key] ?? { total: 0, count: 0 };
    scores[key].total += article.tone;
    scores[key].count += 1;
  });
  const entries = Object.entries(scores)
    .map(([key, value]) => {
      const [year, month] = key.split("-").map(Number);
      const date = new Date(Date.UTC(year, (month ?? 1) - 1, 1));
      return {
        date,
        month: new Intl.DateTimeFormat("es", { month: "short" }).format(date),
        score: Number((value.total / value.count).toFixed(1))
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  return entries.slice(-6).map(({ date: _date, ...rest }) => rest);
}

export function buildRating({
  recent,
  controversies
}: {
  recent: NewsItem[];
  controversies: NewsItem[];
}) {
  const positive = recent.filter((item) => item.category === "logros").length;
  const risks = controversies.length;
  const base = 60;
  const score = Math.min(100, Math.max(0, base + positive * 4 - risks * 3));
  const stars = Number((score / 20).toFixed(1));
  const explanation = `Score basado en ${recent.length} noticias recientes y ${controversies.length} controversias en 3 años.`;
  const positives = positive
    ? [`${positive} menciones positivas en medios (últimos 12 meses).`]
    : ["Sin menciones positivas destacadas en los últimos 12 meses."];
  const riskNotes = risks
    ? [`${risks} artículos con señales de controversia en 3 años.`]
    : ["Sin controversias relevantes detectadas en 3 años."];
  const sources = extractSourcesFromNews([...recent.slice(0, 3), ...controversies.slice(0, 3)]).filter(
    (source) => source.url
  );
  return { score, stars, explanation, positives, risks: riskNotes, sources };
}

export async function fetchIndustryQid(industry: string): Promise<string | null> {
  const url = `${WIKIDATA_API}/w/api.php?action=wbsearchentities&search=${encodeURIComponent(
    industry
  )}&language=es&format=json&origin=*`;
  const data = await fetchJson<{ search?: { id: string }[] }>(url);
  return data.search?.[0]?.id ?? null;
}

export async function fetchCompetitors({
  industry,
  country,
  limit = 6
}: {
  industry?: string | null;
  country?: string | null;
  limit?: number;
}): Promise<{ name: string; url: string }[]> {
  if (!industry) return [];
  const industryQid = await fetchIndustryQid(industry);
  if (!industryQid) return [];
  const countryFilter = country
    ? `FILTER(CONTAINS(LCASE(?countryLabel), LCASE("${country}")))`
    : "";
  const query = `
    SELECT ?company ?companyLabel ?countryLabel WHERE {
      ?company wdt:P452 wd:${industryQid};
               wdt:P31/wdt:P279* wd:Q4830453.
      OPTIONAL { ?company wdt:P17 ?country. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "es,en". }
      ${countryFilter}
    }
    LIMIT ${limit}
  `;
  const url = `${WIKIDATA_API}/sparql?format=json&query=${encodeURIComponent(query)}`;
  const data = await fetchJson<{
    results?: { bindings?: { company?: { value: string }; companyLabel?: { value: string } }[] };
  }>(url, { headers: { Accept: "application/sparql-results+json" } });
  const bindings = data.results?.bindings ?? [];
  return bindings
    .map((item) => ({
      name: item.companyLabel?.value ?? "",
      url: item.company?.value ?? ""
    }))
    .filter((item) => item.name);
}
