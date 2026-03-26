import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const hobbies = [
  {
    name: "Amputee USA Soccer Player",
    detail:
      "I play goalie for the amputee soccer team. It gives me competition, community, and a reminder that adaptation can still look aggressive, sharp, and fun.",
  },
  {
    name: "Amputee advocacy and community building",
    detail:
      "I care a lot about making the amputee experience more visible, more honest, and more connected. That shows up in conversations, writing, and building spaces where people feel less alone.",
  },
  {
    name: "Personal Caffeine Lab",
    detail:
      "Coffee is half ritual, half experiment. I like dialing things in, noticing patterns, and treating even small daily habits like systems worth understanding.",
  },
  {
    name: "Youth Coaching and Mentorship",
    detail:
      "Coaching lets me give something back. I like helping younger athletes build confidence, discipline, and the kind of mindset that carries way beyond sports.",
  },
];

const linkStack = [
  {
    label: "Essay",
    title: "Building Across Trades and Tech",
    href: "/writing/building-across-trades-and-tech",
    note: "A piece that sounds a lot like how I actually think: practical, grounded, and built from real work.",
  },
  {
    label: "Notes",
    title: "Can Systems Beat Hustle",
    href: "/writing/Can-systems-beat-hustle",
    note: "Operating philosophy in writing form. Less hype, more leverage.",
  },
  {
    label: "Draft",
    title: "AI That Helps People Work",
    href: "/writing/ai-that-helps-people-work",
    note: "Where I keep pushing on useful AI instead of flashy AI.",
  },
  {
    label: "Projects",
    title: "Live builds and systems",
    href: "/#projects",
    note: "A stack of the products, tools, and experiments I have my hands in right now.",
  },
  {
    label: "Code",
    title: "GitHub repos",
    href: "https://github.com/gregory3?tab=repositories",
    note: "Rawer than a polished case study, but it shows how I think when I am in build mode.",
  },
];

export default function HobbiesPage() {
  return (
    <main className="min-h-screen bg-[#060606] px-6 py-10 font-mono text-zinc-100 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <div className="mt-10">
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            Hobbies
          </div>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-white">
            The stuff that keeps me sharp when I am not at the desk
          </h1>
          <div className="mt-4 max-w-3xl space-y-4 text-[14px] leading-8 text-zinc-300">
            <p>
              A lot of my hobbies are really the same engine in a different
              form: competition, systems, curiosity, resilience, and finding
              better ways to move through life.
            </p>
            <p>
              I do not separate who I am from what I build very cleanly. Sports,
              coaching, advocacy, writing, and obsessing over tiny details all
              feed the same part of me.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="grid gap-4 md:grid-cols-2">
            {/* Hobbies stay card-based so the page can grow without a redesign. */}
            {hobbies.map((hobby) => (
              <article
                key={hobby.name}
                className="border border-zinc-900 bg-black/20 p-6"
              >
                <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-white">
                  {hobby.name}
                </h2>
                <p className="mt-3 text-[13px] leading-7 text-zinc-300">
                  {hobby.detail}
                </p>
              </article>
            ))}
          </section>

          <aside className="border border-zinc-900 bg-black/20 p-6">
            <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
              Around the web
            </div>
            <h2 className="mt-3 text-xl font-black uppercase tracking-[0.08em] text-white">
              Things with my fingerprints on them
            </h2>
            <p className="mt-3 text-[13px] leading-7 text-zinc-300">
              This can be the running stack for sites I have built, articles I
              wrote, features I am in, or anything else that feels like part of
              the story.
            </p>

            <div className="mt-6 space-y-3">
              {linkStack.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block border border-zinc-900 bg-white/[0.02] p-4 transition hover:border-zinc-700 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                        {item.label}
                      </div>
                      <div className="mt-2 text-[13px] font-bold uppercase tracking-[0.08em] text-white">
                        {item.title}
                      </div>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 text-zinc-600 transition group-hover:text-white" />
                  </div>
                  <p className="mt-3 text-[12px] leading-6 text-zinc-400">
                    {item.note}
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

