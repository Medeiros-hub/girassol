import { author, girlfriend } from "@/lib/config";

/** Quem está no palco e como ele está iluminado em um dado momento. */
export type StageState = {
  layout: "solo-real" | "duo" | "solo-eternal";
  real: boolean;
  eternal: boolean;
  /** 0 = recém-colhido, 3 = seco. */
  wilt: 0 | 1 | 2 | 3;
  dayLabel: string | null;
  highlight: "none" | "real" | "eternal";
  glow: boolean;
};

/**
 * Um beat do roteiro: uma frase (ou nenhuma) e o que muda no palco.
 * `clear` limpa as frases anteriores antes de escrever a nova.
 * `hold` é quanto tempo, em ms, a frase respira antes da próxima.
 */
export type Step = {
  id: string;
  text?: string;
  hold: number;
  clear?: boolean;
  stage?: Partial<StageState>;
};

export const initialStage: StageState = {
  layout: "solo-real",
  real: false,
  eternal: false,
  wilt: 0,
  dayLabel: null,
  highlight: "none",
  glow: false,
};

export const intro = {
  title: "Antes de abrir seu presente...",
  subtitle: "me dá alguns minutinhos?",
  /** Mostrado se ela já tiver aberto a página antes. */
  subtitleAgain: "que bom que você voltou. vem de novo comigo?",
  cta: "Continuar",
  hint: "toque na tela para avançar",
};

/** Ato I — do primeiro girassol até a mensagem principal. */
export const actOne: Step[] = [
  // Cena 1 — o primeiro girassol
  { id: "grow", hold: 3400, stage: { real: true, layout: "solo-real" } },
  { id: "c1-a", text: "Eu queria te dar um girassol.", hold: 3600 },
  {
    id: "c1-b",
    text: "Na verdade, eu queria te dar algo que lembrasse você.",
    hold: 4600,
  },

  // Cena 2 — o segundo girassol
  {
    id: "c2-a",
    text: "Mas aí eu pensei...",
    hold: 3400,
    clear: true,
    stage: { eternal: true, layout: "duo" },
  },
  {
    id: "c2-b",
    text: "um dia esse aqui vai acabar.",
    hold: 4000,
    stage: { highlight: "real" },
  },

  // Cena 3 — a passagem do tempo
  {
    id: "c3-d1",
    hold: 2400,
    clear: true,
    stage: { dayLabel: "Dia 1", highlight: "real", wilt: 0 },
  },
  { id: "c3-d4", hold: 2600, stage: { dayLabel: "Dia 4", wilt: 1 } },
  { id: "c3-d8", hold: 2600, stage: { dayLabel: "Dia 8", wilt: 2 } },
  { id: "c3-d12", hold: 3200, stage: { dayLabel: "Dia 12", wilt: 3 } },

  // Cena 4 — o que permanece
  {
    id: "c4-a",
    text: "E tudo bem.",
    hold: 3000,
    clear: true,
    stage: { dayLabel: null, highlight: "none" },
  },
  {
    id: "c4-b",
    text: "Porque algumas das coisas mais bonitas da vida também são passageiras.",
    hold: 5000,
  },
  {
    id: "c4-c",
    text: "Mas eu queria que você tivesse uma que pudesse guardar.",
    hold: 4600,
    stage: { highlight: "eternal" },
  },

  // Cena 5 — a mensagem principal
  {
    id: "c5-a",
    text: `Então eu fiz esse para você, ${girlfriend.name}.`,
    hold: 4200,
    clear: true,
    stage: { real: false, layout: "solo-eternal", glow: true, highlight: "none" },
  },
  { id: "c5-b", text: "O outro vai durar alguns dias.", hold: 3400 },
  { id: "c5-c", text: "Esse aqui...", hold: 2800 },
  { id: "c5-d", text: "...pode durar para sempre.", hold: 4200 },
  {
    id: "c5-e",
    text: "Assim como a lembrança desse dia.",
    hold: 4200,
    clear: true,
  },
];

/** Cena 7 — mensagens que aparecem a cada toque no girassol. */
export const petalMessages: string[] = [
  "Porque eu queria que você tivesse alguma coisa minha.",
  "Algo que não precisasse secar.",
  "Algo que pudesse continuar existindo.",
  "Mesmo daqui a muitos anos.",
  "E sim, eu provavelmente vou continuar te perturbando também.",
  "Isso é inevitável. ❤️",
];

export const petalFinalMessage = "Tá bom, já pode parar de clicar no girassol. KKKK";

/** Easter egg: aparece se ela continuar insistindo depois do fim. */
export const petalStubbornMessages: string[] = [
  "Sério, pode parar. 😅",
  "Tá bom, mais um. Só porque é você.",
  "Teimosa. (é uma das coisas que eu mais gosto em você)",
];

export const interactive = {
  hint: "toque no girassol",
  next: "tem mais uma coisa",
};

/** Ato II — a revelação do presente de verdade e a despedida. */
export const actTwo: Step[] = [
  { id: "c8-a", text: "Mas tem uma coisa...", hold: 3400, clear: true },
  {
    id: "c8-b",
    text: "esse aqui não é o único girassol que você ganhou hoje.",
    hold: 4400,
  },
  { id: "c8-c", text: "Agora...", hold: 3000, clear: true },
];

export const reveal = {
  headline: "Pode abrir seu presente.",
  caption: "Esse é o de verdade.",
  cta: "já abri 🌻",
};

/** Final — depois que ela abre o buquê. */
export const ending: Step[] = [
  {
    id: "f-a",
    text: "Algumas coisas foram feitas para durar pouco.",
    hold: 4000,
    clear: true,
    stage: { glow: true, layout: "solo-eternal" },
  },
  { id: "f-b", text: "Outras, para ficar.", hold: 3800 },
  { id: "f-c", text: "Eu fiz essa para você.", hold: 4200 },
  { id: "f-d", text: "Te amo. ❤️", hold: 3600 },
];

export const signature = author.signature;

/** Easter egg: aparece sozinho depois de um tempo parada na tela final. */
export const secretLine = "(se você chegou até aqui e ficou olhando, é bem a sua cara. eu amo isso.)";

/** Easter egg: tocar na assinatura. */
export const signatureSecret = "seu, sempre.";
