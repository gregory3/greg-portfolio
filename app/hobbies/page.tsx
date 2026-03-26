import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const hobbies = [
  {
    name: "Building and tinkering",
    detail:
      "Experimenting with CNC workflows, infrastructure, AI tools, and practical systems outside of formal project work.",
  },
  {
    name: "Writing and documenting",
    detail:
      "Capturing lessons, build notes, and the thinking behind projects while they are still in motion.",
  },
  {
    name: "Business and growth strategy",
    detail:
      "Studying what makes operations work, where businesses break, and how systems can create real leverage.",
  },
  {
    name: "Hands-on problem solving",
    detail:
      "Working across digital tools and physical environments, especially when a solution needs both.",
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
            What I enjoy outside the main build lane
          </h1>
          <p className="mt-4 max-w-2xl text-[14px] leading-8 text-zinc-400">
            The same curiosity that drives the work tends to spill over into how
            I spend time, learn, and explore ideas.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {/* Hobbies are card-based so this page can grow without layout changes. */}
          {hobbies.map((hobby) => (
            <article
              key={hobby.name}
              className="border border-zinc-900 bg-black/20 p-6"
            >
              <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-white">
                {hobby.name}
              </h2>
              <p className="mt-3 text-[13px] leading-7 text-zinc-500">
                {hobby.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
