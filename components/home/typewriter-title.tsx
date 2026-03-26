"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TypewriterTitle() {
  const fullText = "Hi, I'm Greg Cunningham.";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    // Delay the first keystroke slightly so the page content settles first.
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      let index = 0;
      interval = setInterval(() => {
        index += 1;
        setDisplayed(fullText.slice(0, index));

        if (index >= fullText.length && interval) {
          clearInterval(interval);
        }
      }, 55);
    }, 300);

    return () => {
      clearTimeout(timeout);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <h1 className="flex flex-wrap items-center gap-2 text-3xl font-black tracking-tight text-white md:text-4xl">
      <span>{displayed}</span>
      <motion.span
        className="inline-block h-[0.9em] w-[0.5ch] translate-y-[1px] bg-zinc-300"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
      />
    </h1>
  );
}
