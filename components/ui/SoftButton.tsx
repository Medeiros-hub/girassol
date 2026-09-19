"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SoftButtonProps = {
  children: ReactNode;
  onClick: () => void;
  delay?: number;
  className?: string;
};

export function SoftButton({ children, onClick, delay = 0, className }: SoftButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      className={[
        "rounded-full border border-[#E0CDA9] bg-[#FFFCF5]/70 px-8 py-3.5",
        "font-sans text-[15px] tracking-[0.12em] text-ink-soft uppercase",
        "shadow-[0_1px_20px_-8px_rgba(160,120,50,0.45)] backdrop-blur-sm",
        "transition-colors duration-500 hover:border-[#D8B77A] hover:text-ink",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </motion.button>
  );
}
