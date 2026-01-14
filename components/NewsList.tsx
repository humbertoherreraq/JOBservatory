import { Badge } from "./Badge";
import type { NewsCategory, NewsItem } from "../data/mock";

const labels: Record<NewsCategory, string> = {
  logros: "Logro",
  rumores: "Rumor",
  cambios: "Cambio",
  escandalos: "Escándalo"
};

export function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={`${item.title}-${item.date}`}
          className="rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">{item.date}</p>
              <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
            </div>
            <Badge tone={item.category}>{labels[item.category]}</Badge>
          </div>
          <p className="mt-2 text-xs text-slate-500">Fuente: {item.source}</p>
        </div>
      ))}
    </div>
  );
}
