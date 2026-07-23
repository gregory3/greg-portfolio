"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Stream = {
  id: number;
  x: string;
  chars: string[];
  opacity: number;
  duration: number;
  delay: number;
};

export function BackgroundCode() {
  const columns = 22;
  const rows = 34;
  const [streams, setStreams] = useState<Stream[]>(() =>
    Array.from({ length: columns }, (_, col) => ({
      id: col,
      x: `${(col / columns) * 100}%`,
      chars: Array.from({ length: rows }, (_, row) =>
        (col + row) % 2 === 0 ? "1" : "0"
      ),
      opacity: 0.18 + (col % 5) * 0.05,
      duration: 10 + (col % 6) * 1.8,
      delay: (col % 7) * 0.5,
    }))
  );

  useEffect(() => {
    // Keep the background alive with light randomized updates instead of
    // re-generating the full matrix on every render.
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
          opacity: 0.16 + Math.random() * 0.34,
        }))
      );
    }, 220);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_60%)]" />
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
              animate={{ opacity: [0.25, 0.85, 0.25] }}
              transition={{
                duration: 1.8 + ((index + stream.id) % 5) * 0.45,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % 7) * 0.12,
              }}
              className={
                index % 9 === 0
                  ? "text-emerald-300"
                  : index % 4 === 0
                    ? "text-zinc-300"
                    : "text-zinc-500"
              }
            >
              {char}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
