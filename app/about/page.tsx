import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const principles = [
  "Build things that hold up in the real world.",
  "Use systems to create leverage, not complexity for its own sake.",
  "Stay close to operations, because that is where useful products get shaped.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#060606] px-6 py-10 font-mono text-zinc-100 md:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <div className="mt-10 border border-zinc-900 bg-black/20 p-6 md:p-8">
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            About Me
          </div>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-white">
            Builder, operator, and systems thinker, One armed bandit of the software world
          </h1>

          <div className="mt-8 space-y-5 text-[14px] leading-8 text-zinc-300">
            <p>
              My background sits at the intersection of trades, business
              operations, technical systems, and product design. I like work
              that is tangible, useful, and tested by reality.
            </p>
            <p>
              A lot of what I build comes from living inside the problems first: life limiations,
              shop workflows, logistics, automation, quoting, infrastructure,
              and the day-to-day friction that slows good humans down.
            </p>
            <p>
              That perspective shapes how I approach everything in life including software and AI too. The
              goal is not just to be or make something impressive. The goal is to be or make
              something people can actually use, trust, and keep using.
            </p>
            <p>
              A builder is shaped by experience, adversity, and constant learning. 
              Perspective is patience, and patience is the time spent in life 
              I’ve been in the trenches, and that’s where I learned to adapt, think deeper, and move with purpose.
              I believe real growth comes from doing — building systems, solving problems, and turning ideas into something tangible. 
              Every challenge has become fuel, and I carry that mindset into everything I create. 
            </p>
          </div>

          <div className="mt-8 border-t border-zinc-900 pt-6">
            {/* Short principles list keeps this page easy to personalize later. */}
            <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-700">
              Core principles
            </div>
            <div className="mt-4 space-y-3">
              {principles.map((principle) => (
                <div
                  key={principle}
                  className="flex items-start gap-3 text-[13px] leading-7 text-zinc-300"
                >
                  <span className="mt-1 text-zinc-700">-</span>
                  <span>{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
