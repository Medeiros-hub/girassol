"use client";

import { motion } from "framer-motion";
import { SoftButton } from "@/components/ui/SoftButton";
import { reveal } from "@/lib/messages";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** A ponte entre o girassol digital e o buquê de verdade. */
export function Reveal({ onDone }: { onDone: () => void }) {
  return (
    <motion.section
      key="reveal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.6, ease: EASE }}
      className="flex min-h-[100svh] flex-col items-center justify-center gap-8 px-7 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2.2, delay: 0.6, ease: EASE }}
        className="text-balance text-[2rem] leading-tight font-light text-ink sm:text-[2.6rem]"
      >
        {reveal.headline}
      </motion.h2>

      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.4, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 1.6, ease: EASE }}
        className="text-6xl sm:text-7xl"
      >
        🌻
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 3, ease: EASE }}
        className="font-sans text-[13px] tracking-[0.22em] text-ink-soft uppercase"
      >
        {reveal.caption}
      </motion.p>

      <SoftButton onClick={onDone} delay={5.5}>
        {reveal.cta}
      </SoftButton>
    </motion.section>
  );
}
