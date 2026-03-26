"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DetailCard } from "@/components/home/detail-card";
import { Tag } from "@/components/home/tag";
import { TypewriterTitle } from "@/components/home/typewriter-title";
import {
  contactLinks,
  experience,
  introLines,
  projects,
  writingItems,
} from "@/data/home";
import type { ProjectItem, WritingItem } from "@/types/home";

type HomepageSectionsProps = {
  visibleProjects: number;
  onLoadMoreProjects: () => void;
  onOpenProject: (project: ProjectItem) => void;
  onOpenWriting: (item: WritingItem) => void;
};

export function HomepageSections({
  visibleProjects,
  onLoadMoreProjects,
  onOpenProject,
  onOpenWriting,
}: HomepageSectionsProps) {
  return (
    <main className="min-w-0 flex-1 pb-24 lg:py-16 lg:pl-16">
      <section id="profile">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TypewriterTitle />

          <motion.div
            className="mt-6 space-y-2.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            {introLines.map((line) => (
              <div
                key={line}
                className="flex items-start gap-3 text-[15px] leading-7 text-zinc-300"
              >
                <span className="mt-[2px] flex-shrink-0 select-none text-zinc-700">
                  -
                </span>
                <span>{line}</span>
              </div>
            ))}
          </motion.div>

          <motion.p
            className="mt-8 max-w-2xl border-l-2 border-zinc-800 pl-5 text-[14px] leading-8 text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            I operate in the overlap between trades, entrepreneurship, technical
            infrastructure, and product design. My work is rooted in execution
            first, building businesses, systems, and tools that are useful in
            the field and durable over time.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.4 }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-zinc-600 px-5 py-2.5 text-[13px] uppercase tracking-[0.14em] text-zinc-200 transition hover:border-zinc-400 hover:text-white"
            >
              View projects <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 border border-zinc-800 px-5 py-2.5 text-[13px] uppercase tracking-[0.14em] text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
            >
              Resume
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section id="experience" className="mt-20 border-t border-zinc-900 pt-10">
        <div className="mb-10 text-[10px] uppercase tracking-[0.24em] text-zinc-700">
          Experience
        </div>

        <div className="space-y-12">
          {experience.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_80px]"
            >
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[15px] font-bold uppercase tracking-[0.06em] text-white">
                    {item.role}
                  </h3>
                  <span className="text-[13px] text-zinc-600">{item.company}</span>
                </div>

                <p className="mt-2 max-w-xl text-[13px] leading-7 text-zinc-600">
                  {item.desc}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>

              <div className="text-[10px] uppercase tracking-[0.14em] text-zinc-800 sm:pt-1 sm:text-right">
                {item.period}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="mt-20 border-t border-zinc-900 pt-10">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div className="text-[10px] uppercase tracking-[0.24em] text-zinc-700">
            Projects
          </div>
          <div className="text-[11px] uppercase tracking-[0.16em] text-zinc-700">
            Showing {Math.min(visibleProjects, projects.length)} of {projects.length}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Project cards are data-driven so most content updates happen in data/home.ts. */}
          {projects.slice(0, visibleProjects).map((project) => (
            <DetailCard
              key={project.name}
              title={project.name}
              summary={project.desc}
              meta={project.status}
              tags={project.tags}
              onOpen={() => onOpenProject(project)}
            />
          ))}
        </div>

        {visibleProjects < projects.length ? (
          <div className="mt-6">
            <button
              type="button"
              onClick={onLoadMoreProjects}
              className="inline-flex items-center gap-2 border border-zinc-800 px-5 py-2.5 text-[12px] uppercase tracking-[0.14em] text-zinc-400 transition hover:border-zinc-600 hover:text-white"
            >
              Load more projects <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : null}
      </section>

      <section id="writing" className="mt-20 border-t border-zinc-900 pt-10">
        <div className="mb-10 text-[10px] uppercase tracking-[0.24em] text-zinc-700">
          Writing
        </div>

        <div className="grid gap-3">
          {/* Writing mirrors the project card interaction for a consistent UX. */}
          {writingItems.map((item) => (
            <DetailCard
              key={item.title}
              title={item.title}
              summary={item.blurb}
              meta={item.type}
              onOpen={() => onOpenWriting(item)}
            />
          ))}
        </div>
      </section>

      <section id="contact" className="mt-20 border-t border-zinc-900 pt-10">
        <div className="mb-10 text-[10px] uppercase tracking-[0.24em] text-zinc-700">
          Connect
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <p className="max-w-lg text-[13px] leading-7 text-zinc-600">
            Building something interesting? Want to talk operations, AI, or
            product? Reach out, always open to good conversations.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className={`inline-flex items-center gap-2 border px-5 py-2.5 text-[13px] uppercase tracking-[0.14em] transition ${
                  link.primary
                    ? "border-zinc-600 text-zinc-200 hover:border-zinc-400 hover:text-white"
                    : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="mt-20 border-t border-zinc-900 pt-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-800">
          © Greg Cunningham | Built in the real world.
        </p>
      </div>
    </main>
  );
}
