import clsx from "clsx";
import type { PropsWithChildren } from "react";

const styles: Record<string, string> = {
  logros: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30",
  rumores: "bg-amber-500/15 text-amber-200 border-amber-400/30",
  cambios: "bg-sky-500/15 text-sky-200 border-sky-400/30",
  escandalos: "bg-rose-500/15 text-rose-200 border-rose-400/30"
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
