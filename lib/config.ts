/**
 * Tudo que é pessoal mora aqui.
 * Troque o nome e a assinatura e o resto da experiência se ajusta sozinho.
 */
export const girlfriend = {
  /** Como você quer chamar ela ao longo da experiência. */
  name: "Vitorinha",
} as const;

export const author = {
  /** Assinatura no final da carta. */
  signature: "Medeiros",
} as const;

/**
 * Música de fundo (opcional).
 * Coloque o arquivo em `public/music/` e mude `enabled` para true.
 * O áudio só começa depois de um toque/clique — navegadores bloqueiam autoplay.
 */
type AudioConfig = {
  enabled: boolean;
  src: string;
  volume: number;
  /** Tempo, em ms, do fade-in do volume ao iniciar. */
  fadeInMs: number;
};

export const audioConfig: AudioConfig = {
  enabled: false,
  src: "/music/song.mp3",
  volume: 0.35,
  fadeInMs: 4000,
};

/**
 * Ritmo geral da experiência.
 * Aumente para deixar mais lento, diminua para deixar mais ágil.
 * 1 = ritmo original (a experiência inteira leva ~2 minutos).
 */
export const pace = 1;
