import { NextRequest, NextResponse } from "next/server";
import {
  buildRating,
  buildSentimentTrend,
  fetchCompetitors,
  fetchGdeltArticles,
  fetchWikidataDetails,
  fetchWikidataId,
  fetchWikipediaSummary,
  normalizeNewsItems
} from "../../../lib/company";
import type { CompanyApiResponse } from "../../../data/types";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name")?.trim();
  const country = searchParams.get("country")?.trim() ?? "";
  const city = searchParams.get("city")?.trim() ?? "";

  if (!name) {
    return NextResponse.json({ error: "Missing name param" }, { status: 400 });
  }

  const summary = await fetchWikipediaSummary(name);
  const wikidataId = summary ? await fetchWikidataId(summary.title) : null;
  const wikidataDetails = wikidataId ? await fetchWikidataDetails(wikidataId) : null;

  const now = new Date();
  const twelveMonthsAgo = new Date(Date.UTC(now.getUTCFullYear() - 1, now.getUTCMonth(), now.getUTCDate()));
  const threeYearsAgo = new Date(Date.UTC(now.getUTCFullYear() - 3, now.getUTCMonth(), now.getUTCDate()));

  const recentArticles = await fetchGdeltArticles({
    name,
    country,
    startDate: twelveMonthsAgo,
    endDate: now,
    maxRecords: 12
  });
  const controversyArticles = await fetchGdeltArticles({
    name,
    country,
    startDate: threeYearsAgo,
    endDate: now,
    maxRecords: 18
  });

  const recentNews = normalizeNewsItems(recentArticles);
  const controversyNews = normalizeNewsItems(controversyArticles, "escandalos");
  const rating = buildRating({ recent: recentNews, controversies: controversyNews });

  const competitors = await fetchCompetitors({ industry: wikidataDetails?.industry ?? null, country });
  const marketShare = competitors.length ? Math.min(60, 15 + competitors.length * 5) : null;

  const response: CompanyApiResponse = {
    company: {
      name,
      country,
      city
    },
    modules: {
      perfil: {
        industry: wikidataDetails?.industry ?? "N/D",
        headquarters: city && country ? `${city}, ${country}` : country || "N/D",
        founded: "N/D",
        employees: "N/D",
        revenueUSD: null,
        description: summary?.summary ?? "Sin resumen público disponible en Wikipedia.",
        website: wikidataDetails?.website ?? null
      },
      salud: {
        score: rating.score,
        kpis: [
          { label: "Ingresos (USD)", value: "N/D", trend: "N/D" },
          { label: "Margen operativo", value: "N/D", trend: "N/D" },
          { label: "Liquidez", value: "N/D", trend: "N/D" }
        ],
        chart: [],
        notes: [
          "No se encontraron cifras públicas en USD para esta empresa.",
          "La salud se estima con señales de cobertura pública y perfil."
        ]
      },
      estrategia: {
        priorities: [
          "Consolidar reputación en prensa y canales oficiales.",
          `Fortalecer posicionamiento en ${country || "mercados clave"}.`,
          "Aumentar transparencia en comunicación corporativa."
        ],
        roadmap: [
          { quarter: "Q1", focus: "Monitoreo de señales reputacionales" },
          { quarter: "Q2", focus: "Alianzas sectoriales y vocería" },
          { quarter: "Q3", focus: "Optimización de narrativa de marca" }
        ],
        strengths: rating.positives,
        weaknesses: rating.risks
      },
      mercado: {
        marketShare,
        competitors: competitors.map((item) => item.name).slice(0, 5),
        positioning: competitors.length
          ? `Se identificaron ${competitors.length} competidores en la industria ${wikidataDetails?.industry ?? ""}.`
          : "Sin suficientes datos públicos para estimar el posicionamiento local."
      },
      laboral: {
        turnover: "N/D",
        engagement: null,
        sentimentTrend: buildSentimentTrend(recentArticles),
        conditions: [
          "No hay datos públicos consistentes de condiciones laborales.",
          "Se recomienda validar con fuentes oficiales o reportes internos."
        ],
        workEnvironmentSummary:
          "El clima laboral se infiere únicamente desde menciones públicas disponibles.",
        perceivedStability: rating.score >= 70 ? "Alta" : rating.score >= 50 ? "Media" : "Baja"
      },
      noticias: {
        relevantEvents: recentNews.slice(0, 6).map((item) => ({
          title: item.title,
          date: item.date,
          impact: "Cobertura reciente en medios.",
          tag: item.category
        })),
        newsGossip: controversyNews.slice(0, 6)
      }
    },
    rating,
    sources: {
      perfil: [
        ...(summary?.url
          ? [
              {
                url: summary.url,
                excerpt: summary.summary
              }
            ]
          : []),
        ...(wikidataId
          ? [
              {
                url: `https://www.wikidata.org/wiki/${wikidataId}`,
                excerpt: "Ficha de Wikidata con industria y sitio web oficial."
              }
            ]
          : [])
      ],
      salud: [
        {
          url: "https://www.gdeltproject.org/",
          excerpt: "Señales públicas procesadas desde GDELT 2.1."
        }
      ],
      estrategia: [
        ...(summary?.url
          ? [
              {
                url: summary.url,
                excerpt: "Contexto público para prioridades estratégicas."
              }
            ]
          : [])
      ],
      mercado: [
        ...(competitors.slice(0, 3).map((item) => ({
          url: item.url,
          excerpt: `Competidor listado en Wikidata: ${item.name}.`
        })) ?? [])
      ],
      laboral: [
        {
          url: "https://www.gdeltproject.org/",
          excerpt: "Indicadores de sentimiento derivados de cobertura pública."
        }
      ],
      noticias: [
        ...recentNews.slice(0, 5).map((item) => ({
          url: item.url ?? "",
          excerpt: item.title
        })),
        ...controversyNews.slice(0, 5).map((item) => ({
          url: item.url ?? "",
          excerpt: item.title
        }))
      ].filter((item) => item.url)
    },
    updatedAt: now.toISOString()
  };

  return NextResponse.json(response);
}
