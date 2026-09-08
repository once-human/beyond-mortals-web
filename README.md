# beyondmortals.com

Next.js (App Router, TypeScript) implementation of the Beyond Mortals Phase 1 site, built from
the Claude Design handoff in `../project/ui_kits/beyondmortals-com/`. Front-end only — bag,
checkout and the mailing list are simulated, same as the prototype; there is no backend.

## Routes

- `/` — Home
- `/record` — The Record
- `/catalogue` — Drop 01
- `/product/[code]` — Product detail (e.g. `/product/bm-01-a`)
- `/notice` — Mailing list

## Structure

- `app/` — routes (App Router)
- `components/ui/` — design-system primitives, ported from `../project/components/`
- `components/chrome/` — header, footer, splash, bag dialog, toast host
- `lib/data.ts` — product and record copy, ported from `data.js`
- `lib/cart-context.tsx` — bag/toast state, shared via React context
- `styles/` — design tokens and component CSS, copied verbatim from the design system
  (`../project/tokens/`, `../project/components/components.css`)
- `public/beyond-mortals-wordmark.svg` — the hand-drawn signature mark

Fonts (Spectral, Special Elite, Archivo, Roboto Mono) are self-hosted via `next/font/google` in
`app/layout.tsx`, wired into `styles/tokens/typography.css`.

## Known placeholders (carried over from the design kit)

- Product and campaign photography are random `picsum.photos` images — replace every `src` in
  `lib/data.ts` before this ships.
- Fonts are Google Fonts stand-ins (no licensed brand type was supplied).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm run start   # production build
```
