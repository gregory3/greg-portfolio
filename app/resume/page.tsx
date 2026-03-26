import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export default function ResumePage() {
  // Keep the file path centralized so swapping in a real PDF is a one-line edit.
  const resumePath = "/cunninghamresume.pdf";

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

        <div className="mt-10 border border-zinc-900 bg-black/20 p-6 md:p-8">
          <div className="flex flex-col gap-5 border-b border-zinc-900 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                Resume
              </div>
              <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-white">
                Greg Cunningham
              </h1>
              <p className="mt-4 max-w-2xl text-[14px] leading-8 text-zinc-400">
                Operations, systems, logistics, AI product building, and
                technical execution across real-world businesses.
              </p>
            </div>

            <a
              href={resumePath}
              download
              className="inline-flex items-center gap-2 border border-zinc-700 px-5 py-3 text-[12px] uppercase tracking-[0.14em] text-zinc-200 transition hover:border-zinc-500 hover:text-white"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </div>

          <div className="mt-6 overflow-hidden border border-zinc-900 bg-[#050505]">
            {/* Browser PDF preview; the download button above is the fallback path. */}
            <iframe
              title="Greg Cunningham resume"
              src={resumePath}
              className="h-[75vh] w-full"
            />
          </div>

          <p className="mt-4 text-[12px] leading-6 text-zinc-600">
            If the preview is blank, add your PDF at `public/cunninghamresume.pdf` and
            reload the page.
          </p>
        </div>
      </div>
    </main>
  );
}
