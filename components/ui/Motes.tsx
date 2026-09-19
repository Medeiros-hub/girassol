"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Poeira de luz. Posições fixas para não quebrar a hidratação. */
const MOTES = [
  { left: 12, top: 72, size: 5, delay: 0, duration: 17 },
  { left: 24, top: 38, size: 3, delay: 3, duration: 21 },
  { left: 41, top: 84, size: 4, delay: 6, duration: 19 },
  { left: 58, top: 26, size: 3, delay: 1.5, duration: 23 },
  { left: 71, top: 62, size: 5, delay: 8, duration: 18 },
  { left: 84, top: 44, size: 3, delay: 4.5, duration: 22 },
  { left: 92, top: 78, size: 4, delay: 10, duration: 20 },
  { left: 33, top: 14, size: 3, delay: 7, duration: 24 },
];

export function Motes() {
  const reduced = useReducedMotion() ?? false;
  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {MOTES.map((mote, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#F0CF86]"
          style={{
            left: `${mote.left}%`,
            top: `${mote.top}%`,
            width: mote.size,
            height: mote.size,
            filter: "blur(1px)",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [0, -70, -140],
            x: [0, 14, -8],
          }}
          transition={{
            duration: mote.duration,
            delay: mote.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
