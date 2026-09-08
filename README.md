# Beyond Mortals — storefront

The frontend for Beyond Mortals. Next.js 16 (App Router), TypeScript, Tailwind v4.
Built from the Figma file *Beyond Mortals — Brand & Product System v2*.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## The backend seam

**This is the most important thing in the repo.**

Every data read goes through `lib/api/`. Today it resolves from typed fixtures in
`lib/api/fixtures/`. When the backend exists, set `NEXT_PUBLIC_API_URL` and only the
`remote()` branch in `lib/api/index.ts` has to become real — no page, component or
store changes.

```
lib/api/
  types.ts              the contract: Product, Variant, Collection, Order, Address…
  index.ts              the adapter — remote() if NEXT_PUBLIC_API_URL, else fixtures
  fixtures/catalogue.ts local data implementing that same contract
```

**Rule: nothing outside `lib/api` may import from `fixtures/`.** If that rule holds,
swapping the backend is a config change. If it breaks, it becomes a refactor.

The adapter also fails soft — if the API is down, `remote()` returns `null` and the
storefront falls back rather than going down with it.

---

## Structure

```
app/
  (site)/        public site — shares Nav + Footer + BagDrawer
  (checkout)/    chrome-less; its own minimal header, no nav, no footer
  layout.tsx     fonts, film grain, smooth scroll, preloader
  template.tsx   page transition
components/
  brand/         Wordmark
  primitives/    Button, Field, Plate, Accordion
  chrome/        Nav, Footer, Film, Preloader, PageHeader, AccountShell
  commerce/      ProductCard, AddToBag, BagDrawer, Checkout*, Search
  record/        the handled-principle components
  motion/        Reveal, Rise, SmoothScroll
lib/
  api/           the seam (above)
  bag/           zustand + localStorage
content/         The Record, verbatim
```

---

## Design system

Tokens live in `app/globals.css` under `@theme` and map 1:1 to the Figma variables.

| | |
|---|---|
| Surfaces | `page` `surface` `raised` `inset` `inverse` |
| Type | `primary` `secondary` `muted` `faint` `bright` |
| Accent | `accent` `accent-solid` `accent-deep` — oxblood, ~1% coverage |
| Rules | `rule` `rule-strong` `rule-faint` `rule-bone` |

Type ramp is `.t-display-*`, `.t-record-*`, `.t-body-*`, `.t-label-*`, `.t-mono-*`,
`.t-plate`, `.t-hand` — named to match the Figma text styles.

**Dark only.** There is no light mode and one must not be built.

### Rules that are not negotiable

- No button is ever filled, including checkout. Hairline rule, caps, arrow.
- No radius above 2px. No shadows. No gradients. No glass.
- The wordmark is the whole identity — there is no icon mark. Minimum width 120px.
- Grain is applied once at the root, never per component.
- Halation is for display type only, never body copy.
- Nothing is ever discounted, so there is no sale UI anywhere.

### Two CSS traps already hit

1. Plain classes in `globals.css` land *after* the Tailwind import, so any `display`
   they declare beats `hidden` / `sm:hidden`. `.link-rule` and `.wordmark` therefore
   set no `display`; callers do.
2. A mask reveal cannot carry its own in-view trigger — an IntersectionObserver
   clips against `overflow:hidden` ancestors, so a child translated out of its mask
   never intersects. The trigger sits on the mask; the variant cascades down. See
   `components/motion/Reveal.tsx`.

---

## Type files

`app/fonts/` is **generated, not committed**. `scripts/fonts.mjs` copies the ten
woff2 files out of the pinned `@fontsource-*` devDependencies and runs on
`postinstall`, `predev` and `prebuild`, so the type is pinned by a version
number rather than by binaries in the tree. `next/font/local` then self-hosts
them — no runtime request to Google, no FOUT on someone else's CDN.

If a font ever looks wrong: `rm -rf app/fonts && npm run fonts`.

---

## Images

No photography exists yet. Every image slot renders as a pending plate
(`.plate-slot--pending`). Adding real images is a `src` on the `Plate` /`Slot`
component — not a rebuild.

`app/icon.svg` is a placeholder: the **B** lifted straight out of the wordmark,
bone on ink. It is the only defensible favicon while the identity is
wordmark-only, but the glyph is still an open decision.

---

## Deploy shim — delete this once git is wired up

`scripts/unpack.mjs` + `scripts/source.b64` exist **only** because the first
deployment had to go up through Vercel's inline file upload, which carries the
whole tree in one request, and the source does not fit in one. The app/,
components/, lib/, content/ and public/ trees travel as a gzipped blob and are
expanded by the project's `installCommand`:

```
node scripts/unpack.mjs && npm install
```

Nothing in the application touches either file, and `unpack.mjs` never
overwrites a file that already exists, so it is a no-op in a real checkout.
**When the repo is on GitHub and Vercel builds from a push: delete
`scripts/source.b64`, delete `scripts/unpack.mjs`, and reset the project's
install command to the default.**

---

## Environment

```
NEXT_PUBLIC_API_URL=      # unset → fixtures
NEXT_PUBLIC_SITE_URL=     # used by sitemap.ts and robots.ts
```
