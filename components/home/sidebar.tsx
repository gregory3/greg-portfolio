"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { NavItem, SocialItem, StatItem } from "@/types/home";

type SidebarProps = {
  navItems: NavItem[];
  socials: SocialItem[];
  stats: StatItem[];
};

function isRouteLink(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function Sidebar({ navItems, socials, stats }: SidebarProps) {
  return (
    <aside className="py-12 lg:sticky lg:top-0 lg:w-[280px] lg:flex-shrink-0 lg:self-start lg:border-r lg:border-zinc-900 lg:py-16 lg:pr-12">
      <div className="flex items-center gap-4">
        <motion.div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-zinc-700 bg-zinc-950 text-base font-black text-zinc-300"
          animate={{
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 16px rgba(255,255,255,0.06)",
              "0 0 0px rgba(255,255,255,0)",
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          GC
        </motion.div>

        <div className="text-base font-black uppercase leading-tight tracking-[0.1em] text-white">
          Greg
          <br />
          Cunningham
        </div>
      </div>

      <p className="mt-5 text-[13px] leading-6 text-zinc-500">
        Builder across logistics, systems, operations, and AI. Running real
        businesses while designing future-facing products.
      </p>

      <div className="mt-6 flex gap-5 border-t border-zinc-900 pt-6">
        {stats.map((item) => (
          <motion.div
            key={item.label}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="text-lg font-black text-white">{item.value}</div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-zinc-700">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      <nav className="mt-8 space-y-0.5">
        {/* Route links use Next.js navigation, while hash links stay on-page. */}
        {navItems.map((item) =>
          isRouteLink(item.href) ? (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center gap-3 py-2 text-[13px] text-zinc-600 transition-colors hover:text-white"
            >
              <span className="h-px w-3 bg-zinc-800 transition-all duration-200 group-hover:w-5 group-hover:bg-zinc-500" />
              <span className="uppercase tracking-[0.14em]">{item.label}</span>
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-center gap-3 py-2 text-[13px] text-zinc-600 transition-colors hover:text-white"
            >
              <span className="h-px w-3 bg-zinc-800 transition-all duration-200 group-hover:w-5 group-hover:bg-zinc-500" />
              <span className="uppercase tracking-[0.14em]">{item.label}</span>
            </a>
          )
        )}
      </nav>

      <div className="mt-8 border-t border-zinc-900 pt-6">
        <div className="mb-3 text-[10px] uppercase tracking-[0.18em] text-zinc-700">
          Find me on
        </div>
        <div className="flex gap-2">
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex h-8 w-8 items-center justify-center border border-zinc-800 text-zinc-600 transition hover:border-zinc-500 hover:text-white"
              >
                <Icon className="h-3 w-3" />
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-6 border border-zinc-900 p-3">
        <div className="flex items-center gap-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
            Currently Building
          </span>
        </div>
        <p className="mt-1.5 text-[11px] leading-5 text-zinc-700">
          AI, logistics, and product infrastructure.
        </p>
      </div>
    </aside>
  );
}
