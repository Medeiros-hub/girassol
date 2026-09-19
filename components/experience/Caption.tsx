"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Line } from "./script";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** As frases da carta. A mais recente é a mais presente; as anteriores recuam. */
export function Caption({ lines }: { lines: Line[] }) {
  return (
    <div
      aria-live="polite"
      className="flex min-h-[9.5rem] w-full max-w-[34rem] flex-col items-center justify-start gap-4 text-center"
    >
      <AnimatePresence mode="popLayout">
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1;
          return (
            <motion.p
              key={line.id}
              layout
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{
                opacity: isLast ? 1 : 0.42,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 1.5, ease: EASE }}
              className="text-balance text-[1.35rem] leading-[1.55] font-light text-ink sm:text-[1.6rem]"
            >
              {line.text}
            </motion.p>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
