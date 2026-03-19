"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  Globe,
  ExternalLink,
} from "lucide-react";

const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Connect", href: "#contact" },
];

const experience = [
  {
    role: "Operations / IT / CNC Systems",
    company: "Fine Finish Inc.",
    period: "Current",
    desc: "Running shop systems, CNC workflows, server infrastructure, and production tech between trades and digital systems.",
    tags: ["CNC", "Infrastructure", "IT Systems"],
  },
  {
    role: "Co-Owner",
    company: "Dump & Go",
    period: "Current",
    desc: "Building and scaling a dumpster and logistics company through operational systems, quoting strategy, and field execution.",
    tags: ["Operations", "Logistics", "Growth"],
  },
  {
    role: "Founder / Builder",
    company: "Independent Ventures",
    period: "Ongoing",
    desc: "Designing products across AI, CAD, automation, and real-world business infrastructure.",
    tags: ["AI", "CAD", "Product Design"],
  },
];

const projects = [
  {
    name: "BackSnap",
    desc: "AI-powered storytelling photo platform focused on preserving memories through voice and narrative.",
    tags: ["AI", "Product"],
    status: "Building",
  },
  {
    name: "Kad",
    desc: "Text-to-CAD and generative design tooling for faster, more intuitive creation.",
    tags: ["CAD", "AI", "Design"],
    status: "In Progress",
  },
  {
    name: "GenScape",
    desc: "AI landscape design system built around image input, plant intelligence, and rendering.",
    tags: ["AI", "Design"],
    status: "Beta",
  },
  {
    name: "Tech Hub",
    desc: "A self-hosted AI and automation lab for local inference, security, networking, and experimentation.",
    tags: ["Infrastructure", "AI"],
    status: "Live",
  },
];

const socials = [
  { label: "Email", icon: Mail, href: "mailto:gregorycunninghamglc@gmail.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/gregory-cunningham333/" },
  { label: "GitHub", icon: Github, href: "https://github.com/gregory3?tab=repositories" },
  { label: "X", icon: Globe, href: "https://x.com/theonearmgreggy" },
];

const stats = [
  { value: "3+", label: "Active Lanes" },
  { value: "4", label: "Ventures" },
  { value: "∞", label: "In Motion" },
];

function BackgroundCode() {
  const columns = 22;
  const rows = 34;
  const [mounted, setMounted] = useState(false);
  const [streams, setStreams] = useState(() =>
    Array.from({ length: columns }, (_, col) => ({
      id: col,
      x: `${(col / columns) * 100}%`,
      chars: Array.from({ length: rows }, () =>
        Math.random() > 0.5 ? "1" : "0"
      ),
      opacity: 0.08 + Math.random() * 0.2,
      duration: 10 + Math.random() * 12,
      delay: Math.random() * 6,
    }))
  );

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setStreams((prev) =>
        prev.map((stream) => ({
          ...stream,
          chars: stream.chars.map((char, index) => {
            const chance = index % 3 === 0 ? 0.22 : 0.1;
            return Math.random() < chance
              ? char === "1"
                ? "0"
                : "1"
              : char;
          }),
          opacity: 0.06 + Math.random() * 0.24,
        }))
      );
    }, 220);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.03),transparent_60%)]" />
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute top-[-20%] font-mono text-[11px] leading-[17px] tracking-[0.2em]"
          style={{ left: stream.x, opacity: stream.opacity }}
          animate={{ y: ["-10%", "115%"] }}
          transition={{
            duration: stream.duration,
            repeat: Infinity,
            ease: "linear",
            delay: stream.delay,
          }}
        >
          {stream.chars.map((char, index) => (
            <motion.div
              key={`${stream.id}-${index}`}
              animate={{ opacity: [0.1, 0.6, 0.1] }}
              transition={{
                duration: 1.8 + ((index + stream.id) % 5) * 0.45,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % 7) * 0.12,
              }}
              className={index % 9 === 0 ? "text-zinc-400" : "text-zinc-700"}
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block border border-zinc-800 px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-zinc-500">
      {children}
    </span>
  );
}

function TypewriterTitle() {
  const fullText = "Hi, I'm Greg Cunningham.";
  const [displayed, setDisplayed] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setDisplayed(fullText.slice(0, index));
        if (index >= fullText.length && interval) clearInterval(interval);
      }, 55);
    }, 300);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <h1 className="flex flex-wrap items-center gap-2 text-3xl font-black tracking-tight text-white md:text-4xl">
      <span>{mounted ? displayed : ""}</span>
      <motion.span
        className="inline-block h-[0.9em] w-[0.5ch] translate-y-[1px] bg-zinc-300"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
      />
    </h1>
  );
}

export default function Page() {
  return (
    <div className="relative min-h-screen bg-[#060606] font-mono text-zinc-100">
      <BackgroundCode />

      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "100% 3px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 lg:flex lg:items-start lg:gap-0">
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-[280px] lg:flex-shrink-0 lg:overflow-y-auto lg:border-r lg:border-zinc-900 lg:py-16 lg:pr-12 py-12">
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
            {stats.map((s) => (
              <motion.div
                key={s.label}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-lg font-black text-white">{s.value}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-zinc-700">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          <nav className="mt-8 space-y-0.5">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-3 py-2 text-[13px] text-zinc-600 transition-colors hover:text-white"
              >
                <span className="h-px w-3 bg-zinc-800 transition-all duration-200 group-hover:w-5 group-hover:bg-zinc-500" />
                <span className="uppercase tracking-[0.14em]">{item.label}</span>
              </a>
            ))}
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

        <main className="flex-1 min-w-0 pb-24 lg:py-16 lg:pl-16">
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
                {[
                  "Builder across logistics, systems, operations, and AI.",
                  "Running Fine Finish workflows and growing Dump & Go.",
                  "Designing ventures in CAD, automation, and product infrastructure.",
                  "Documenting the process while building in the real world.",
                ].map((line, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-[15px] leading-7 text-zinc-300"
                  >
                    <span className="mt-[2px] flex-shrink-0 select-none text-zinc-700">
                      —
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
                I operate in the overlap between trades, entrepreneurship,
                technical infrastructure, and product design. My work is rooted
                in execution first — building businesses, systems, and tools
                that are useful in the field and durable over time.
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
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 border border-zinc-800 px-5 py-2.5 text-[13px] uppercase tracking-[0.14em] text-zinc-500 transition hover:border-zinc-600 hover:text-zinc-300"
                >
                  Contact
                </a>
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
                      <span className="text-[13px] text-zinc-600">
                        {item.company}
                      </span>
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
            <div className="mb-10 text-[10px] uppercase tracking-[0.24em] text-zinc-700">
              Projects
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {projects.map((project, index) => (
                <motion.a
                  key={project.name}
                  href="#"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  className="group block border border-zinc-900 p-5 transition hover:border-zinc-700 hover:bg-white/[0.02]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-white">
                      {project.name}
                    </h3>
                    <ExternalLink className="h-3 w-3 flex-shrink-0 text-zinc-800 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-500" />
                  </div>

                  <p className="mt-2 text-[12px] leading-6 text-zinc-600">
                    {project.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <span className="flex-shrink-0 text-[10px] uppercase tracking-[0.14em] text-zinc-800">
                      {project.status}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>

          <section id="writing" className="mt-20 border-t border-zinc-900 pt-10">
            <div className="mb-10 text-[10px] uppercase tracking-[0.24em] text-zinc-700">
              Writing
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl border border-dashed border-zinc-900 p-6"
            >
              <div className="text-[12px] font-bold uppercase tracking-[0.12em] text-zinc-600">
                Coming Soon
              </div>
              <div className="mt-4 space-y-2">
                {[
                  "Build logs, systems thinking, and lessons from operating across industries.",
                  "Future home for essays, project notes, and real-time updates.",
                ].map((line, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-[13px] leading-6 text-zinc-700"
                  >
                    <span className="mt-1 flex-shrink-0 select-none text-zinc-800">
                      —
                    </span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </motion.div>
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
                product? Reach out — always open to good conversations.
              </p>

             <div className="mt-6 flex flex-wrap gap-3">
  {[
    {
      label: "Email",
      href: "mailto:gregorycunninghamglc@gmail.com",
      primary: true,
    },
    {
      label: "Dump & Go",
      href: "mailto:office@dumpandgo.co",
      primary: false,
    },
    {
      label: "GitHub",
      href: "https://github.com/gregory3?tab=repositories",
      primary: false,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/gregory-cunningham333/",
      primary: false,
    },
    {
      label: "X",
      href: "https://x.com/theonearmgreggy",
      primary: false,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/the.one.arm.greggy?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      primary: false,
    },
    {
      label: "Call",
      href: "tel:7815341405",
      primary: false,
    },
  ].map((link) => (
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
              © Greg Cunningham — Built in the real world.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}