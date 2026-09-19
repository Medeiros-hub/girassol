"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Caption } from "@/components/experience/Caption";
import { Intro } from "@/components/experience/Intro";
import { Reveal } from "@/components/experience/Reveal";
import { Stage } from "@/components/experience/Stage";
import { foldStage, useScriptPlayer, visibleLines } from "@/components/experience/script";
import { Motes } from "@/components/ui/Motes";
import { SoftButton } from "@/components/ui/SoftButton";
import { useAmbientAudio } from "@/lib/audio";
import {
  actOne,
  actTwo,
  ending,
  interactive,
  intro,
  petalFinalMessage,
  petalMessages,
  petalStubbornMessages,
  secretLine,
  signature,
  signatureSecret,
} from "@/lib/messages";

type Phase = "intro" | "act-one" | "interactive" | "act-two" | "reveal" | "ending";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const VISIT_KEY = "girassol:ja-veio";
const FINAL_STAGE = foldStage(actOne, actOne.length - 1);
/** A última frase do ato I continua na tela durante a cena interativa. */
const lastLineOfActOne = actOne[actOne.length - 1].text;

/** A mensagem que aparece no toque número `taps`. */
function tapMessage(taps: number): string | null {
  if (taps <= 0) return null;
  if (taps <= petalMessages.length) return petalMessages[taps - 1];
  if (taps === petalMessages.length + 1) return petalFinalMessage;
  const extra = taps - petalMessages.length - 2;
  return petalStubbornMessages[Math.min(extra, petalStubbornMessages.length - 1)];
}

export function Experience() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [returning, setReturning] = useState(false);
  const [taps, setTaps] = useState(0);
  const [secret, setSecret] = useState(false);
  const [signatureTapped, setSignatureTapped] = useState(false);
  const audio = useAmbientAudio();

  // Easter egg: ela é recebida de um jeito diferente se voltar à página.
  useEffect(() => {
    try {
      if (window.localStorage.getItem(VISIT_KEY)) setReturning(true);
      window.localStorage.setItem(VISIT_KEY, "1");
    } catch {
      // modo privado / storage bloqueado: segue a vida.
    }
  }, []);

  const one = useScriptPlayer(
    actOne,
    phase === "act-one",
    useCallback(() => setPhase("interactive"), []),
  );
  const two = useScriptPlayer(
    actTwo,
    phase === "act-two",
    useCallback(() => setPhase("reveal"), []),
  );
  const last = useScriptPlayer(
    ending,
    phase === "ending",
    useCallback(() => {}, []),
  );

  const scripted =
    phase === "act-one" ? one : phase === "act-two" ? two : phase === "ending" ? last : null;
  const isScripted = scripted !== null;

  // Tocar (ou apertar espaço) adianta a próxima frase.
  const advance = useCallback(() => scripted?.advance(), [scripted]);

  useEffect(() => {
    if (!isScripted) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "Enter" || event.key === "ArrowRight") {
        event.preventDefault();
        advance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isScripted, advance]);

  const endingDone = phase === "ending" && last.finished;

  // Easter egg: quem fica parada olhando a tela final ganha mais uma linha.
  useEffect(() => {
    if (!endingDone) return;
    const timer = window.setTimeout(() => setSecret(true), 18000);
    return () => window.clearTimeout(timer);
  }, [endingDone]);

  const start = () => {
    audio.start();
    setPhase("act-one");
  };

  const lines =
    phase === "act-one"
      ? visibleLines(actOne, one.index)
      : phase === "act-two"
        ? visibleLines(actTwo, two.index)
        : phase === "ending"
          ? visibleLines(ending, last.index)
          : [];

  const stage = phase === "act-one" ? foldStage(actOne, one.index) : FINAL_STAGE;
  const tapped = tapMessage(taps);
  const canMoveOn = taps >= petalMessages.length + 1;

  return (
    <main className="relative z-20 min-h-[100svh] w-full overflow-x-hidden">
      <Motes />

      {audio.available && (
        <button
          type="button"
          onClick={audio.toggle}
          aria-label={audio.playing ? "Desligar a música" : "Ligar a música"}
          className="fixed top-5 right-5 z-40 rounded-full border border-[#E6D6B8] bg-[#FFFCF5]/70 p-2.5 text-ink-soft backdrop-blur-sm transition-colors hover:text-ink"
        >
          {audio.playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {phase === "intro" && <Intro key="intro" returning={returning} onStart={start} />}

        {phase === "reveal" && (
          <Reveal key="reveal" onDone={() => setPhase("ending")} />
        )}

        {phase !== "intro" && phase !== "reveal" && (
          <motion.section
            key="stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 1.6, ease: EASE }}
            className="relative grid min-h-[100svh] grid-rows-[1fr_auto] items-center justify-items-center px-6 pt-10 pb-12"
          >
            {/* Área de toque para adiantar a próxima frase. */}
            {isScripted && !endingDone && (
              <div
                aria-hidden
                onClick={advance}
                className="absolute inset-0 z-30 cursor-default"
              />
            )}

            <div className="pointer-events-none relative z-10 flex w-full items-end justify-center">
              <div
                className={
                  phase === "interactive" ? "pointer-events-auto w-full" : "w-full"
                }
              >
                <Stage
                  stage={stage}
                  onEternalClick={
                    phase === "interactive" ? () => setTaps((t) => t + 1) : undefined
                  }
                  eternalLabel={interactive.hint}
                />
              </div>
            </div>

            <div className="relative z-10 flex w-full flex-col items-center gap-7 pt-10">
              {isScripted && <Caption lines={lines} />}

              {phase === "interactive" && (
                <div className="flex min-h-[9.5rem] w-full max-w-[34rem] flex-col items-center gap-6 text-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={taps}
                      initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                      transition={{ duration: 1.1, ease: EASE }}
                      className="text-balance text-[1.3rem] leading-[1.55] font-light text-ink sm:text-[1.5rem]"
                    >
                      {tapped ?? lastLineOfActOne}
                    </motion.p>
                  </AnimatePresence>

                  {taps === 0 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      transition={{ duration: 2, delay: 2 }}
                      className="font-sans text-[11px] tracking-[0.26em] text-ink-soft uppercase"
                    >
                      {interactive.hint}
                    </motion.span>
                  )}

                  {canMoveOn && (
                    <SoftButton onClick={() => setPhase("act-two")} delay={1.4}>
                      {interactive.next}
                    </SoftButton>
                  )}
                </div>
              )}

              {endingDone && (
                <div className="flex flex-col items-center gap-4">
                  <motion.button
                    type="button"
                    onClick={() => setSignatureTapped(true)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2, delay: 1.2, ease: EASE }}
                    className="font-serif text-[1.1rem] text-ink-soft italic"
                    aria-label={`Assinado por ${signature}`}
                  >
                    — {signature}
                  </motion.button>

                  <AnimatePresence>
                    {signatureTapped && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.6 }}
                        className="font-sans text-[11px] tracking-[0.26em] text-ink-soft uppercase"
                      >
                        {signatureSecret}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {secret && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 0.75, y: 0 }}
                        transition={{ duration: 3, ease: EASE }}
                        className="max-w-[26rem] text-balance text-center text-[0.95rem] leading-relaxed font-light text-ink-soft italic"
                      >
                        {secretLine}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Dica discreta, só no começo. */}
              <AnimatePresence>
                {phase === "act-one" && one.index < 2 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.55 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, delay: 2.5 }}
                    className="font-sans text-[10px] tracking-[0.3em] text-ink-soft uppercase"
                  >
                    {intro.hint}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
