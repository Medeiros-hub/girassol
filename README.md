# 🌻

Uma pequena experiência interativa para acompanhar um buquê de girassóis de verdade.

> O girassol de verdade vai acabar. Esse aqui eu fiz para durar para sempre.

## Rodar

```bash
npm install
npm run dev
```

Abre em http://localhost:3000. A experiência inteira leva ~2 minutos e foi feita
pensando primeiro no celular.

Para ela abrir no celular dela, rode `npm run dev -- -H 0.0.0.0` e acesse
`http://SEU_IP_LOCAL:3000` na mesma rede. Para deixar no ar, `npm run build` e
qualquer host estático de Next (Vercel, por exemplo).

## O que mexer

Praticamente tudo que é pessoal está em dois arquivos:

- [`lib/config.ts`](lib/config.ts) — o nome dela, a assinatura, a música e o
  ritmo geral (`pace`: aumente para deixar mais lento).
- [`lib/messages.ts`](lib/messages.ts) — todas as frases, na ordem em que
  aparecem, com o tempo (`hold`, em ms) que cada uma respira antes da próxima.

Cada beat do roteiro também diz o que acontece no palco (`stage`): qual girassol
está em cena, quanto o de verdade já murchou (`wilt` de 0 a 3), qual deles está
em destaque e se a luz está acesa.

### Música

Coloque o arquivo em `public/music/` e ligue em `lib/config.ts`:

```ts
export const audioConfig = { enabled: true, src: "/music/sua-musica.mp3", ... };
```

A música só começa depois que ela toca em "Continuar" — navegadores bloqueiam
autoplay. Aparece um botãozinho de mudo no canto quando está ligada.

## Como está organizado

```text
app/           layout, página e estilos globais
components/
  experience/  o roteiro, o palco, as legendas e cada tela
  sunflower/   o girassol em SVG (geometria separada da animação)
  ui/          botão e partículas de luz
lib/           configuração pessoal e textos
```

O girassol é um SVG desenhado no projeto: caule, folhas, dois anéis de pétalas e
o miolo com as sementes em espiral de Fibonacci. Cada parte entra na cena em
sequência. O de verdade envelhece por estágios (cor, pétalas que caem, cabeça
que pende); o outro fica igual.

## Detalhes

- Toque na tela (ou espaço / seta) adianta a próxima frase.
- Tem alguns easter eggs: tocar várias vezes no girassol, tocar na assinatura,
  ficar parada na tela final e voltar na página depois.
- Respeita `prefers-reduced-motion`: as animações ficam curtas em vez de sumirem.

---

Código feito como presente pessoal — se for reaproveitar em algo sério, vale uma
revisão de um dev antes.
