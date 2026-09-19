"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { audioConfig } from "./config";

/**
 * Música ambiente opcional.
 * Só cria o elemento de áudio depois de um gesto do usuário — navegadores
 * bloqueiam autoplay, e falhar em silêncio é melhor do que quebrar a cena.
 */
export function useAmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (fadeRef.current !== null) window.clearInterval(fadeRef.current);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const start = useCallback(() => {
    if (!audioConfig.enabled || audioRef.current) return;

    const audio = new Audio(audioConfig.src);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    audio
      .play()
      .then(() => {
        setPlaying(true);
        const steps = 40;
        let step = 0;
        fadeRef.current = window.setInterval(() => {
          step += 1;
          audio.volume = Math.min(audioConfig.volume, (step / steps) * audioConfig.volume);
          if (step >= steps && fadeRef.current !== null) {
            window.clearInterval(fadeRef.current);
            fadeRef.current = null;
          }
        }, audioConfig.fadeInMs / steps);
      })
      .catch(() => {
        audioRef.current = null;
        setPlaying(false);
      });
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      start();
      return;
    }
    if (audio.paused) {
      void audio.play().then(() => setPlaying(true));
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, [start]);

  return { available: audioConfig.enabled, playing, start, toggle };
}
