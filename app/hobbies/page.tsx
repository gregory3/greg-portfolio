import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const hobbies = [
  {
    name: "Amputee USA Soccer Player",
    detail:
      "Goalie for the amputee soccer team, which has been competitive and a rewarding way to connect with others and stay active while navigating life with other amputations.",
  },
  {
    name: "Amputee advocacy and community building",
    detail:
      "Capturing lessons, sharing stories, and building spaces for connection and support across the amputee community. I also write about these topics on my blog.",},
  {
    name: "Personal Caffeine Lab",
    detail:
      "Life is a complex system, and understanding it is endlessly fascinating. Hard to sleep when there are so many variables to tinker with, test, and optimize.",
  },
  {
    name: "Youth Coaching and Mentorship",
    detail:
      "Assistant Track Coach for a local high school team, which has been a rewarding way to give back, connect with young athletes, and share the lessons from my own athletic journey.",
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



