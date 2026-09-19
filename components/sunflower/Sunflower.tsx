"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import {
  backAngles,
  ETERNAL_PALETTE,
  FALLEN_BY_WILT,
  FALL_ORDER,
  frontAngles,
  HEAD,
  HEAD_BASE,
  HEAD_BY_WILT,
  LEAF_DROOP_BY_WILT,
  LEAN_BY_WILT,
  PETAL_BACK,
  PETAL_FRONT,
  PETAL_SCALE_BY_WILT,
  REAL_PALETTE,
  SEEDS,
  STEM,
  type Palette,
} from "./geometry";

export type Wilt = 0 | 1 | 2 | 3;

export type SunflowerProps = {
  variant: "real" | "eternal";
  /** Só faz sentido para o girassol de verdade. */
  wilt?: Wilt;
  /** Luz suave por trás da flor. */
  glow?: boolean;
  /** Recua para o fundo quando a atenção está na outra flor. */
  dim?: boolean;
  className?: string;
  /** Descrição para leitores de tela. */
  label?: string;
};

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SLOW = { duration: 1.6, ease: EASE_OUT };

export function Sunflower({
  variant,
  wilt = 0,
  glow = false,
  dim = false,
  className,
  label,
}: SunflowerProps) {
  const reduced = useReducedMotion() ?? false;
  const uid = useId().replace(/:/g, "");
  const isEternal = variant === "eternal";
  const palette: Palette = isEternal ? ETERNAL_PALETTE : REAL_PALETTE[wilt];

  /** Encurta as animações (sem eliminá-las) quando o sistema pede menos movimento. */
  const t = (seconds: number) => (reduced ? Math.min(seconds * 0.2, 0.45) : seconds);

  const fallen = isEternal ? 0 : FALLEN_BY_WILT[wilt];
  const petalScale = isEternal ? 1 : PETAL_SCALE_BY_WILT[wilt];
  const headTilt = isEternal ? 0 : HEAD_BY_WILT[wilt];
  const lean = isEternal ? 0 : LEAN_BY_WILT[wilt];
  const leafDroop = isEternal ? 0 : LEAF_DROOP_BY_WILT[wilt];

  const frontFallen = new Set(FALL_ORDER.slice(0, fallen));
  const backFallen = new Set(FALL_ORDER.slice(0, Math.max(0, fallen - 2)));

  return (
    <motion.svg
      viewBox="0 0 200 300"
      className={className}
      role="img"
      aria-label={label ?? (isEternal ? "Girassol" : "Girassol de verdade")}
      initial={{ opacity: 0 }}
      animate={{ opacity: dim ? 0.38 : 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: t(1.4), ease: EASE_OUT }}
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#F7D480" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#F7D480" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-disc`} cx="42%" cy="38%" r="70%">
          <stop offset="0%" stopColor={palette.disc} />
          <stop offset="100%" stopColor={palette.discInner} />
        </radialGradient>
      </defs>

      {/* Luz atrás da flor */}
      <motion.circle
        cx={HEAD.x}
        cy={HEAD.y}
        r={110}
        fill={`url(#${uid}-glow)`}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={
          glow
            ? reduced
              ? { opacity: 0.85, scale: 1 }
              : { opacity: [0.62, 0.9, 0.62], scale: [0.98, 1.04, 0.98] }
            : { opacity: 0, scale: 0.7 }
        }
        transition={
          glow && !reduced
            ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
            : { duration: t(2) }
        }
        style={{ transformBox: "view-box", transformOrigin: `${HEAD.x}px ${HEAD.y}px` }}
      />

      {/* A planta inteira balança devagar, como com vento leve */}
      <motion.g
        style={{ transformBox: "view-box", transformOrigin: "100px 300px" }}
        animate={
          reduced
            ? { rotate: lean }
            : { rotate: [lean - 1.1, lean + 1.1, lean - 1.1] }
        }
        transition={
          reduced
            ? { duration: t(1.2) }
            : { duration: isEternal ? 8 : 6.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Caule */}
        <motion.path
          d={STEM}
          fill="none"
          stroke={palette.stem}
          strokeWidth={5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, stroke: palette.stem }}
          transition={{ duration: t(2.1), ease: "easeInOut" }}
        />

        {/* Folhas */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: leafDroop }}
          transition={{ ...SLOW, duration: t(1.4), delay: t(1.1) }}
          style={{ transformBox: "view-box", transformOrigin: "99px 213px" }}
        >
          <motion.path
            d="M99 212 C 74 200 52 208 42 228 C 64 242 88 234 99 219 Z"
            animate={{ fill: palette.leaf }}
            transition={{ duration: t(1.4) }}
          />
          <path
            d="M99 214 C 82 218 64 224 46 229"
            fill="none"
            stroke="#ffffff"
            strokeOpacity={0.25}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </motion.g>

        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, rotate: -leafDroop }}
          transition={{ ...SLOW, duration: t(1.4), delay: t(1.3) }}
          style={{ transformBox: "view-box", transformOrigin: "101px 183px" }}
        >
          <motion.path
            d="M101 182 C 126 168 148 176 158 196 C 136 210 112 200 101 189 Z"
            animate={{ fill: palette.leaf }}
            transition={{ duration: t(1.4) }}
          />
          <path
            d="M101 184 C 118 188 136 192 154 197"
            fill="none"
            stroke="#ffffff"
            strokeOpacity={0.25}
            strokeWidth={1.4}
            strokeLinecap="round"
          />
        </motion.g>

        {/* Cabeça: pende a partir da ponta do caule */}
        <motion.g
          animate={{ rotate: headTilt }}
          transition={{ duration: t(2.2), ease: EASE_OUT }}
          style={{
            transformBox: "view-box",
            transformOrigin: `${HEAD_BASE.x}px ${HEAD_BASE.y}px`,
          }}
        >
          {/* Pétalas de trás */}
          {backAngles.map((angle, i) => (
            <g key={`b${i}`} transform={`rotate(${angle} ${HEAD.x} ${HEAD.y})`}>
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: backFallen.has(i) ? 0.25 : petalScale,
                  opacity: backFallen.has(i) ? 0 : 1,
                }}
                transition={{
                  duration: t(1.3),
                  delay: backFallen.size > 0 ? 0 : t(1.6 + i * 0.045),
                  ease: EASE_OUT,
                }}
                style={{
                  transformBox: "view-box",
                  transformOrigin: `${HEAD.x}px ${HEAD.y}px`,
                }}
              >
                <motion.path
                  d={PETAL_BACK}
                  animate={{ fill: palette.back }}
                  transition={{ duration: t(1.6) }}
                />
              </motion.g>
            </g>
          ))}

          {/* Pétalas da frente */}
          {frontAngles.map((angle, i) => (
            <g key={`f${i}`} transform={`rotate(${angle} ${HEAD.x} ${HEAD.y})`}>
              <motion.g
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: frontFallen.has(i) ? 0.25 : petalScale,
                  opacity: frontFallen.has(i) ? 0 : 1,
                }}
                transition={{
                  duration: t(1.3),
                  delay: frontFallen.size > 0 ? t(i * 0.05) : t(2 + i * 0.04),
                  ease: EASE_OUT,
                }}
                style={{
                  transformBox: "view-box",
                  transformOrigin: `${HEAD.x}px ${HEAD.y}px`,
                }}
              >
                <motion.path
                  d={PETAL_FRONT}
                  animate={{ fill: palette.front }}
                  transition={{ duration: t(1.6) }}
                />
              </motion.g>
            </g>
          ))}

          {/* Miolo */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: t(1.5), delay: t(1.4), ease: EASE_OUT }}
            style={{
              transformBox: "view-box",
              transformOrigin: `${HEAD.x}px ${HEAD.y}px`,
            }}
          >
            <circle cx={HEAD.x} cy={HEAD.y} r={24} fill={`url(#${uid}-disc)`} />
            <g opacity={isEternal ? 0.55 : 0.4}>
              {SEEDS.map((seed, i) => (
                <circle
                  key={i}
                  cx={seed.cx}
                  cy={seed.cy}
                  r={seed.r}
                  fill={palette.seed}
                />
              ))}
            </g>
            <circle
              cx={HEAD.x}
              cy={HEAD.y}
              r={24}
              fill="none"
              stroke={palette.back}
              strokeOpacity={0.5}
              strokeWidth={1.5}
            />
          </motion.g>
        </motion.g>
      </motion.g>

      {/* Pétalas caídas no chão */}
      {!isEternal && (
        <g>
          {[
            { x: 63, y: 279, r: 96 },
            { x: 137, y: 286, r: -84 },
            { x: 92, y: 290, r: 112 },
          ].map((p, i) => (
            <motion.g
              key={i}
              initial={false}
              animate={{ opacity: wilt >= i + 1 ? 0.7 : 0 }}
              transition={{ duration: t(1.8), delay: t(0.6 + i * 0.25) }}
              /* Leva o centro da pétala (100,68) até o chão, deitada. */
              transform={`translate(${p.x} ${p.y}) rotate(${p.r}) scale(0.82) translate(-100 -68)`}
            >
              <path d={PETAL_FRONT} fill={REAL_PALETTE[3].front} />
            </motion.g>
          ))}
        </g>
      )}
    </motion.svg>
  );
}
