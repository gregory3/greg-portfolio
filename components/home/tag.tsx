import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-zinc-800 px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-zinc-500">
      {children}
    </span>
  );
}
