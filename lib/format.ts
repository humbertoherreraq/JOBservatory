export function isFiniteNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

export function formatUSD(v: unknown): string {
  if (!isFiniteNumber(v)) return "N/D";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);
}

export function formatPercent(v: unknown, decimals = 1): string {
  if (!isFiniteNumber(v)) return "N/D";
  return `${v.toFixed(decimals)}%`;
}

export function safeText(v: unknown): string {
  if (typeof v === "string" && v.trim().length > 0) return v;
  if (isFiniteNumber(v)) return String(v);
  return "N/D";
}
