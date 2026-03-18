"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin, Github, Globe, ExternalLink } from "lucide-react";

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
    desc: "Running shop systems, CNC workflows, server infrastructure, and production tech between trades and digital systems.",
  },
  {
    role: "Co-Owner",
    company: "Dump & Go",
    desc: "Building and scaling a dumpster and logistics company through operational systems, quoting strategy, and field execution.",
  },
  {
    role: "Founder / Builder",
    company: "Independent Ventures",
    desc: "Designing products across AI, CAD, automation, and real-world business infrastructure.",
  },
];

const projects = [
  {
    name: "BackSnap",
    desc: "AI-powered storytelling photo platform focused on preserving memories through voice and narrative.",
  },
  {
    name: "Kad",
    desc: "Text-to-CAD and generative design tooling for faster, more intuitive creation.",
  },
  {
    name: "GenScape",
    desc: "AI landscape design system built around image input, plant intelligence, and rendering.",
  },
  {
    name: "Tech Hub",
    desc: "A self-hosted AI and automation lab for local inference, security, networking, and experimentation.",
  },
];

const socials = [
  { label: "Email", icon: Mail, href: "mailto:you@example.com" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "GitHub", icon: Github, href: "#" },
  { label: "Website", icon: Globe, href: "#" },
];

function BackgroundCode() {
  const columns = 22;
  const rows = 34;
  const [mounted, setMounted] = useState(false);
  const [streams, setStreams] = useState(() =>
    Array.from({ length: columns }, (_, col) => ({
      id: col,
      x: `${(col / columns) * 100}%`,
      chars: Array.from({ length: rows }, () => (Math.random() > 0.5 ? "1" : "0")),
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
            return Math.random() < chance ? (char === "1" ? "0" : "1") : char;
          }),
          opacity: 0.06 + Math.random() * 0.24,
        }))
      );
    }, 220);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_42%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />

      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute top-[-20%] font-mono text-[12px] leading-[18px] tracking-[0.22em] text-zinc-500"
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
              animate={{ opacity: [0.1, 0.72, 0.1] }}
              transition={{
                duration: 1.8 + ((index + stream.id) % 5) * 0.45,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % 7) * 0.12,
              }}
              className={index % 9 === 0 ? "text-zinc-300" : "text-zinc-600"}
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/70 to-transparent"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/75 to-transparent"
        animate={{ opacity: [1, 0.82, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function PixelButton({ href, children, muted = false }: { href: string; children: React.ReactNode; muted?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 border px-4 py-3 text-sm uppercase tracking-[0.16em] transition ${
        muted
          ? "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
          : "border-zinc-700 text-zinc-200 hover:border-zinc-500 hover:text-white"
      }`}
    >
      {children}
    </a>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base uppercase tracking-[0.2em] text-zinc-300">{children}</h2>;
}

function TypewriterTitle() {
  const fullText = "Hi, I'm Greg Cunningham.";
  const [displayed, setDisplayed] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let interval;
    const timeout = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setDisplayed(fullText.slice(0, index));
        if (index >= fullText.length) clearInterval(interval);
      }, 55);
    }, 250);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <div className="mt-10 flex items-center gap-2 text-4xl font-black tracking-[0.04em] text-white md:text-5xl">
      <span>{mounted ? displayed : ""}</span>
      <motion.span
        className="inline-block h-[1.05em] w-[0.6ch] bg-zinc-200"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function GregPortfolioSite() {
  return (
    <div className="min-h-screen bg-[#050505] px-4 py-6 font-mono text-zinc-100 md:px-8 md:py-8">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.045]"
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 0.22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "100% 3px",
        }}
      />

      <BackgroundCode />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl overflow-hidden rounded-[20px] border border-zinc-800 bg-black/90 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.65)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="grid min-h-[88vh] lg:grid-cols-[260px_minmax(0,1fr)_320px]">
          {/* Left Sidebar */}
          <aside className="border-b border-zinc-900/80 bg-zinc-950/80 p-8 lg:border-b-0 lg:border-r">
            <div className="text-3xl font-black uppercase tracking-[0.12em] text-white">
              Greg
              <br />
              Cunningham
            </div>

            <nav className="mt-12 space-y-4 text-[15px] text-zinc-400">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 transition hover:text-white"
                >
                  <span className="text-zinc-600 group-hover:text-zinc-300">┆</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="mt-16">
              <div className="text-sm uppercase tracking-[0.18em] text-zinc-500">Find me on</div>
              <div className="mt-5 flex flex-wrap gap-3">
                {socials.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex h-11 w-11 items-center justify-center border border-zinc-800 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                      aria-label={item.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="border-b border-zinc-900/80 p-8 md:p-12 lg:border-b-0 lg:border-r">
            <section id="profile">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <motion.div
                  className="h-40 w-40 border border-zinc-700 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] p-3"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(255,255,255,0.0)",
                      "0 0 24px rgba(255,255,255,0.05)",
                      "0 0 0px rgba(255,255,255,0.0)",
                    ],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex h-full w-full items-center justify-center border border-zinc-800 bg-zinc-950 text-5xl font-black text-zinc-300">
                    GC
                  </div>
                </motion.div>

                <TypewriterTitle />

                <motion.div
                  className="mt-8 space-y-4 text-xl leading-8 text-zinc-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                >
                  <div className="flex gap-4">
                    <span className="text-zinc-500">┆</span>
                    <span>Builder across logistics, systems, operations, and AI.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-zinc-500">┆</span>
                    <span>Running Fine Finish workflows and growing Dump &amp; Go.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-zinc-500">┆</span>
                    <span>Designing ventures in CAD, automation, and product infrastructure.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-zinc-500">┆</span>
                    <span>Documenting the process while building in the real world.</span>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-10 border-t border-zinc-800 pt-8 text-[17px] leading-8 text-zinc-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.05, duration: 0.6 }}
                >
                  I operate in the overlap between trades, entrepreneurship, technical infrastructure, and product
                  design. My work is rooted in execution first — building businesses, systems, and tools that are
                  useful in the field and durable over time.
                </motion.div>

                <motion.div
                  className="mt-10 flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.25, duration: 0.45 }}
                >
                  <PixelButton href="#projects">
                    View projects <ArrowRight className="h-4 w-4" />
                  </PixelButton>
                  <PixelButton href="#contact" muted>
                    Contact
                  </PixelButton>
                </motion.div>
              </motion.div>
            </section>

            <section id="experience" className="mt-16 border-t border-zinc-800 pt-10">
              <SectionTitle>Experience</SectionTitle>
              <div className="mt-8 space-y-8 text-zinc-300">
                {experience.map((item, index) => (
                  <motion.div
                    key={item.role}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.08, duration: 0.35 }}
                  >
                    <div className="text-xl font-bold uppercase tracking-[0.08em] text-white">{item.role}</div>
                    <div className="mt-1 text-sm uppercase tracking-[0.18em] text-zinc-500">{item.company}</div>
                    <p className="mt-3 max-w-2xl leading-7 text-zinc-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section id="projects" className="mt-16 border-t border-zinc-800 pt-10">
              <SectionTitle>Projects</SectionTitle>
              <div className="mt-8 space-y-7">
                {projects.map((project, index) => (
                  <motion.a
                    key={project.name}
                    href="#"
                    className="group block border border-transparent px-1 py-1 transition hover:border-zinc-800"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.08, duration: 0.35 }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-xl font-bold uppercase tracking-[0.08em] text-white">{project.name}</div>
                      <ExternalLink className="h-4 w-4 flex-shrink-0 text-zinc-500 transition group-hover:translate-x-1 group-hover:text-zinc-200" />
                    </div>
                    <p className="mt-2 max-w-2xl leading-7 text-zinc-400">{project.desc}</p>
                  </motion.a>
                ))}
              </div>
            </section>

            <section id="writing" className="mt-16 border-t border-zinc-800 pt-10">
              <SectionTitle>Writing</SectionTitle>
              <motion.div
                className="mt-8 space-y-4 text-zinc-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex gap-4">
                  <span className="text-zinc-600">┆</span>
                  <span>Build logs, systems thinking, and lessons from operating across industries.</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-zinc-600">┆</span>
                  <span>Future home for essays, project notes, and real-time updates.</span>
                </div>
              </motion.div>
            </section>

            <section id="contact" className="mt-16 border-t border-zinc-800 pt-10">
              <SectionTitle>Connect</SectionTitle>
              <motion.div
                className="mt-8 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
              >
                <PixelButton href="mailto:you@example.com">Email</PixelButton>
                <PixelButton href="#" muted>
                  LinkedIn
                </PixelButton>
                <PixelButton href="#" muted>
                  GitHub
                </PixelButton>
              </motion.div>
            </section>
          </main>

          {/* Right Sidebar */}
          <aside className="p-8 md:p-10">
            <motion.div
              className="border border-zinc-800 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6"
              animate={{
                y: [0, -2, 0],
                borderColor: ["rgba(39,39,42,1)", "rgba(82,82,91,1)", "rgba(39,39,42,1)"],
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-2xl font-black tracking-[0.04em] text-white">Current build mode</div>
              <p className="mt-5 text-lg leading-8 text-zinc-300">
                Building real businesses while designing future-facing systems in AI, logistics, infrastructure, and
                product development.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PixelButton href="#projects">See work</PixelButton>
                <PixelButton href="#writing" muted>
                  Read more <ArrowRight className="h-4 w-4" />
                </PixelButton>
              </div>
            </motion.div>

            <div className="mt-12 border-t border-zinc-800 pt-8">
              <div className="text-sm uppercase tracking-[0.18em] text-zinc-500">Quick stats</div>
              <div className="mt-6 space-y-5 text-zinc-300">
                <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.6, repeat: Infinity }}>
                  <div className="text-2xl font-black text-white">3+</div>
                  <div className="mt-1 text-sm uppercase tracking-[0.18em] text-zinc-500">Active lanes</div>
                </motion.div>
                <motion.div animate={{ opacity: [1, 0.72, 1] }} transition={{ duration: 3.1, repeat: Infinity }}>
                  <div className="text-2xl font-black text-white">4</div>
                  <div className="mt-1 text-sm uppercase tracking-[0.18em] text-zinc-500">Live venture tracks</div>
                </motion.div>
                <motion.div animate={{ opacity: [0.74, 1, 0.74] }} transition={{ duration: 2.8, repeat: Infinity }}>
                  <div className="text-2xl font-black text-white">∞</div>
                  <div className="mt-1 text-sm uppercase tracking-[0.18em] text-zinc-500">Ideas in motion</div>
                </motion.div>
              </div>
            </div>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
