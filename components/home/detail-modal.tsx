"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

type DetailModalProps = {
  title: string;
  meta: string;
  body: string;
  highlights?: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageCaption?: string;
  onClose: () => void;
};

export function DetailModal({
  title,
  meta,
  body,
  highlights,
  imageSrc,
  imageAlt,
  imageCaption,
  onClose,
}: DetailModalProps) {
  useEffect(() => {
    // Lock page scroll while a modal is open so the overlay feels anchored.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-2xl border border-zinc-800 bg-[#090909] p-6 shadow-2xl shadow-black/50"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                {meta}
              </div>
              <h3 className="mt-2 text-xl font-bold uppercase tracking-[0.08em] text-white">
                {title}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center border border-zinc-800 text-zinc-500 transition hover:border-zinc-600 hover:text-white"
              aria-label="Close details"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-5 text-[14px] leading-8 text-zinc-400">{body}</p>

          {imageSrc ? (
            <div className="mt-6 overflow-hidden border border-zinc-900 bg-[#050505]">
              {/* Project visuals are optional, so existing entries still work
                  even when an image has not been added yet. */}
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? `${title} project image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              {imageCaption ? (
                <p className="border-t border-zinc-900 px-4 py-3 text-[12px] leading-6 text-zinc-500">
                  {imageCaption}
                </p>
              ) : null}
            </div>
          ) : null}

          {highlights && highlights.length > 0 ? (
            <div className="mt-6 border-t border-zinc-900 pt-5">
              <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-700">
                Inside the build
              </div>
              <div className="mt-4 space-y-3">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-[13px] leading-6 text-zinc-500"
                  >
                    <span className="mt-1 text-zinc-700">-</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
