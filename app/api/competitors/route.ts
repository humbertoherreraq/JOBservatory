import { NextRequest, NextResponse } from "next/server";
import { fetchCompetitors } from "../../../lib/company";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name")?.trim();
  const country = searchParams.get("country")?.trim() ?? "";
  const industry = searchParams.get("industry")?.trim() ?? "";

  if (!name) {
    return NextResponse.json({ error: "Missing name param" }, { status: 400 });
  }

  const competitors = await fetchCompetitors({ industry, country });
  return NextResponse.json({
    name,
    country,
    industry,
    competitors
  });
}
