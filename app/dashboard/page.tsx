import { redirect } from "next/navigation";
import { DashboardClient } from "./DashboardClient";

type DashboardPageProps = {
  searchParams?: {
    company?: string;
    country?: string;
    city?: string;
  };
};

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const companyName = searchParams?.company?.trim();
  const country = searchParams?.country?.trim();
  const city = searchParams?.city?.trim();

  if (!companyName || !country || !city) {
    redirect("/?alert=1");
  }

  return <DashboardClient companyName={companyName} country={country} city={city} />;
}
