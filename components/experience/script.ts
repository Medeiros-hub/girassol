"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pace } from "@/lib/config";
import { initialStage, type StageState, type Step } from "@/lib/messages";

/**
 * Toca um roteiro: avança sozinho no tempo de cada frase e aceita
 * um toque para adiantar.
 */
export function useScriptPlayer(
  steps: Step[],
  active: boolean,
  onFinish: () => void,
) {
  const [index, setIndex] = useState(0);
  const finished = index >= steps.length;

  const finishRef = useRef(onFinish);
  useEffect(() => {
    finishRef.current = onFinish;
  });

  useEffect(() => {
    if (!active) return;
    if (finished) {
      finishRef.current();
      return;
    }
    const timer = window.setTimeout(
      () => setIndex((i) => i + 1),
      steps[index].hold * pace,
    );
    return () => window.clearTimeout(timer);
  }, [active, index, finished, steps]);

  const advance = useCallback(() => {
    if (!active) return;
    setIndex((i) => Math.min(i + 1, steps.length));
  }, [active, steps.length]);

  return { index, advance, finished };
}

export type Line = { id: string; text: string };

/** As frases que ainda estão na tela: tudo desde o último `clear`. */
export function visibleLines(steps: Step[], index: number): Line[] {
  const upTo = Math.min(index, steps.length - 1);
  if (upTo < 0) return [];

  let start = 0;
  for (let i = upTo; i >= 0; i -= 1) {
    if (steps[i].clear) {
      start = i;
      break;
    }
  }

  return steps
    .slice(start, upTo + 1)
    .filter((step): step is Step & { text: string } => Boolean(step.text))
    .map((step) => ({ id: step.id, text: step.text }));
}

/** Acumula as mudanças de palco até o beat atual. */
export function foldStage(
  steps: Step[],
  index: number,
  base: StageState = initialStage,
): StageState {
  const upTo = Math.min(index, steps.length - 1);
  let stage = base;
  for (let i = 0; i <= upTo; i += 1) {
    if (steps[i].stage) stage = { ...stage, ...steps[i].stage };
  }
  return stage;
}
