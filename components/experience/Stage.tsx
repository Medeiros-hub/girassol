"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sunflower } from "@/components/sunflower/Sunflower";
import type { StageState } from "@/lib/messages";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type StageProps = {
  stage: StageState;
  /** Torna o girassol que fica clicável (cena interativa). */
  onEternalClick?: () => void;
  eternalLabel?: string;
};

export function Stage({ stage, onEternalClick, eternalLabel }: StageProps) {
  const solo = stage.layout !== "duo";
  const sizeClass = solo
    ? "w-[58vw] max-w-[270px]"
    : "w-[38vw] max-w-[185px] sm:w-[30vw]";

  return (
    <div className="flex w-full items-end justify-center gap-[7vw] sm:gap-16">
      <AnimatePresence mode="popLayout">
        {stage.real && (
          <motion.div
            key="real"
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            transition={{ duration: 1.8, ease: EASE }}
            className={`relative ${sizeClass}`}
          >
            <Sunflower
              variant="real"
              wilt={stage.wilt}
              dim={stage.highlight === "eternal"}
              label="O girassol de verdade"
            />
            <AnimatePresence>
              {stage.dayLabel && (
                <motion.span
                  key={stage.dayLabel}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 font-sans text-[11px] tracking-[0.28em] text-ink-soft uppercase"
                >
                  {stage.dayLabel}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {stage.eternal && (
          <motion.div
            key="eternal"
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: EASE }}
            className={`relative ${sizeClass}`}
          >
            {onEternalClick ? (
              <motion.button
                type="button"
                onClick={onEternalClick}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.4 }}
                className="block w-full cursor-pointer rounded-3xl"
                aria-label={eternalLabel ?? "Tocar no girassol"}
              >
                <Sunflower variant="eternal" glow={stage.glow} label="Seu girassol" />
              </motion.button>
            ) : (
              <Sunflower
                variant="eternal"
                glow={stage.glow}
                dim={stage.highlight === "real"}
                label="Seu girassol"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
