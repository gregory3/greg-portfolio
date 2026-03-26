import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getWritingBySlug, writingItems } from "@/data/home";

type WritingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return writingItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: WritingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingBySlug(slug);

  if (!post) {
    return {
      title: "Writing Not Found",
    };
  }

  return {
    title: `${post.title} | Writing`,
    description: post.blurb,
  };
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#060606] px-6 py-10 font-mono text-zinc-100 md:px-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#writing"
          className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to writing
        </Link>

        <article className="mt-10 border border-zinc-900 bg-black/20 p-6 md:p-8">
          <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            {post.publishedLabel ?? post.type}
          </div>
          <h1 className="mt-3 text-3xl font-black uppercase tracking-[0.08em] text-white">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-[14px] leading-8 text-zinc-400">
            {post.detail}
          </p>

          <div className="mt-8 border-t border-zinc-900 pt-8">
            {/* Long-form writing lives here instead of in the homepage modal so
                posts can grow without turning the landing page into a reader. */}
            <div className="space-y-6">
              {post.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[14px] leading-8 text-zinc-400"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
