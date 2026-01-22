import { notFound } from "next/navigation";
import { moduleLabels } from "../../../data/modules";
import type { ModuleSlug } from "../../../data/types";
import { ModuleClient } from "./ModuleClient";

type ModulePageProps = {
  params: { slug: ModuleSlug };
  searchParams?: {
    company?: string;
    country?: string;
    city?: string;
  };
};

export default function ModulePage({ params, searchParams }: ModulePageProps) {
  const slug = params.slug;
  if (!(slug in moduleLabels)) {
    notFound();
  }
  const companyName = searchParams?.company?.trim() ?? "";
  const country = searchParams?.country?.trim() ?? "";
  const city = searchParams?.city?.trim() ?? "";

  if (!companyName) {
    notFound();
  }

  return <ModuleClient slug={slug} companyName={companyName} country={country} city={city} />;
}
