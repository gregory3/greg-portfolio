"use client";

import { ExternalLink } from "lucide-react";
import { Tag } from "@/components/home/tag";

type DetailCardProps = {
  title: string;
  summary: string;
  meta: string;
  tags?: string[];
  onOpen: () => void;
};

export function DetailCard({
  title,
  summary,
  meta,
  tags,
  onOpen,
}: DetailCardProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full border border-zinc-900 p-5 text-left transition hover:border-zinc-700 hover:bg-white/[0.02]"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-white">
          {title}
        </h3>
        <ExternalLink className="h-3 w-3 flex-shrink-0 text-zinc-800 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-500" />
      </div>

      <p className="mt-2 text-[12px] leading-6 text-zinc-600">{summary}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <span className="flex-shrink-0 text-[10px] uppercase tracking-[0.14em] text-zinc-800">
          {meta}
        </span>
      </div>
    </button>
  );
}
