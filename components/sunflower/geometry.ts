/** Geometria do girassol. Tudo em coordenadas do viewBox 0 0 200 300. */

export const HEAD = { x: 100, y: 110 } as const;
export const HEAD_BASE = { x: 100, y: 134 } as const;

export const PETALS_PER_RING = 16;

/** Pétalas de trás: mais longas e mais escuras, dão profundidade. */
export const PETAL_BACK =
  "M100 86 C 108 73 109 50 100 40 C 91 50 92 73 100 86 Z";

/** Pétalas da frente: mais curtas e mais claras. */
export const PETAL_FRONT =
  "M100 88 C 107 77 108 57 100 48 C 92 57 93 77 100 88 Z";

export const backAngles = Array.from(
  { length: PETALS_PER_RING },
  (_, i) => (360 / PETALS_PER_RING) * i + 360 / PETALS_PER_RING / 2,
);

export const frontAngles = Array.from(
  { length: PETALS_PER_RING },
  (_, i) => (360 / PETALS_PER_RING) * i,
);

/** Ordem em que as pétalas caem — espalhada, para não abrir um buraco só. */
export const FALL_ORDER = [3, 11, 7, 0, 14, 5, 9, 1, 12, 6, 15, 2, 8, 4, 13, 10];

/** Quantas pétalas já caíram em cada estágio. */
export const FALLEN_BY_WILT = [0, 2, 5, 9] as const;

export const STEM = "M100 300 C 95 242 104 182 100 132";

/**
 * A cabeça pende a partir da ponta do caule, e a planta inteira se inclina
 * um pouco. Rotação em graus.
 */
export const HEAD_BY_WILT = [0, 7, 16, 26] as const;
export const LEAN_BY_WILT = [0, 1, 2.5, 4] as const;
export const PETAL_SCALE_BY_WILT = [1, 0.97, 0.92, 0.85] as const;
export const LEAF_DROOP_BY_WILT = [0, 4, 9, 15] as const;

export type Palette = {
  back: string;
  front: string;
  disc: string;
  discInner: string;
  seed: string;
  stem: string;
  leaf: string;
};

/** Cores do girassol de verdade ao longo dos dias. */
export const REAL_PALETTE: readonly Palette[] = [
  {
    back: "#D99A2B",
    front: "#F5C440",
    disc: "#7A5430",
    discInner: "#5E4024",
    seed: "#4A3018",
    stem: "#7E8C5A",
    leaf: "#8A9962",
  },
  {
    back: "#CF9230",
    front: "#EDBA46",
    disc: "#77522F",
    discInner: "#5B3E23",
    seed: "#48301A",
    stem: "#7C8757",
    leaf: "#87935E",
  },
  {
    back: "#BC8437",
    front: "#D8A853",
    disc: "#6C4B2C",
    discInner: "#553A21",
    seed: "#45301C",
    stem: "#79815A",
    leaf: "#828A5D",
  },
  {
    back: "#A5763C",
    front: "#BC9553",
    disc: "#5E4126",
    discInner: "#4A331D",
    seed: "#3F2C1A",
    stem: "#757A5C",
    leaf: "#7B8060",
  },
];

/** O girassol que fica: um pouco mais perfeito, um pouco mais dourado. */
export const ETERNAL_PALETTE: Palette = {
  back: "#E9A62E",
  front: "#FBD15A",
  disc: "#7C5432",
  discInner: "#5C3E22",
  seed: "#4A3018",
  stem: "#7E8C5A",
  leaf: "#8D9C64",
};

/** Sementes em espiral de Fibonacci — determinístico, nada de Math.random. */
export const SEEDS = Array.from({ length: 96 }, (_, i) => {
  const angle = i * 137.507 * (Math.PI / 180);
  const radius = 2.15 * Math.sqrt(i);
  return {
    cx: HEAD.x + radius * Math.cos(angle),
    cy: HEAD.y + radius * Math.sin(angle),
    r: 0.55 + (i / 96) * 0.75,
  };
}).filter((seed) => {
  const dx = seed.cx - HEAD.x;
  const dy = seed.cy - HEAD.y;
  return Math.sqrt(dx * dx + dy * dy) < 20.5;
});
