import clsx from "clsx";
import type { PropsWithChildren } from "react";

const styles: Record<string, string> = {
  logros: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rumores: "bg-amber-50 text-amber-700 border-amber-200",
  cambios: "bg-sky-50 text-sky-700 border-sky-200",
  escandalos: "bg-rose-50 text-rose-700 border-rose-200"
};

type BadgeProps = PropsWithChildren<{ tone: keyof typeof styles }>;

export function Badge({ tone, children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        styles[tone]
      )}
    >
      {children}
    </span>
  );
}
