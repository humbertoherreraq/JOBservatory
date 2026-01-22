import { NextRequest, NextResponse } from "next/server";
import { fetchGdeltArticles, normalizeNewsItems } from "../../../lib/company";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name")?.trim();
  const country = searchParams.get("country")?.trim() ?? "";

  if (!name) {
    return NextResponse.json({ error: "Missing name param" }, { status: 400 });
  }

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

  return NextResponse.json({
    recent: normalizeNewsItems(recentArticles),
    controversies: normalizeNewsItems(controversyArticles, "escandalos")
  });
}
