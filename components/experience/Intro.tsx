"use client";

import { motion } from "framer-motion";
import { SoftButton } from "@/components/ui/SoftButton";
import { intro } from "@/lib/messages";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Intro({
  returning,
  onStart,
}: {
  returning: boolean;
  onStart: () => void;
}) {
  return (
    <motion.section
      key="intro"
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.4, ease: EASE }}
      className="flex min-h-[100svh] flex-col items-center justify-center gap-10 px-7 text-center"
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="h-[3px] w-16 rounded-full bg-gradient-to-r from-transparent via-[#E0B55C] to-transparent"
      />

      <div className="flex flex-col items-center gap-5">
        <motion.h1
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 0.5, ease: EASE }}
          className="text-balance text-[1.75rem] leading-snug font-light text-ink sm:text-[2.1rem]"
        >
          {intro.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 1.8, ease: EASE }}
          className="text-balance text-[1.1rem] font-light text-ink-soft italic sm:text-[1.25rem]"
        >
          {returning ? intro.subtitleAgain : intro.subtitle}
        </motion.p>
      </div>

      <SoftButton onClick={onStart} delay={3.2}>
        {intro.cta}
      </SoftButton>
    </motion.section>
  );
}
