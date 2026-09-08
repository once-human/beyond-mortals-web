/**
 * Materialise the self-hosted webfonts into app/fonts/.
 *
 * The type is pinned by the @fontsource-* versions in package.json rather than
 * by binaries in the tree, so a font can never silently shift under us and the
 * repo stays text-only. next/font/local needs the files on disk at build time,
 * so this runs as `prebuild` (npm lifecycle) and on `postinstall` for `next dev`.
 *
 * Idempotent: a file that is already present and non-empty is left alone.
 */
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "app", "fonts");
const modules = join(root, "node_modules");

/** [package, source file under <pkg>/files, destination name] */
const FONTS = [
  ["@fontsource/spectral", "spectral-latin-200-normal.woff2"],
  ["@fontsource/spectral", "spectral-latin-300-normal.woff2"],
  ["@fontsource/spectral", "spectral-latin-400-normal.woff2"],
  ["@fontsource/spectral", "spectral-latin-400-italic.woff2"],
  ["@fontsource/archivo-narrow", "archivo-narrow-latin-400-normal.woff2"],
  ["@fontsource/archivo-narrow", "archivo-narrow-latin-500-normal.woff2"],
  ["@fontsource/archivo-narrow", "archivo-narrow-latin-600-normal.woff2"],
  ["@fontsource/ibm-plex-mono", "ibm-plex-mono-latin-400-normal.woff2"],
  ["@fontsource/ibm-plex-mono", "ibm-plex-mono-latin-400-italic.woff2"],
  ["@fontsource/ibm-plex-mono", "ibm-plex-mono-latin-500-normal.woff2"],
];

mkdirSync(out, { recursive: true });

let copied = 0;
const missing = [];

for (const [pkg, name] of FONTS) {
  const dest = join(out, name);
  if (existsSync(dest) && statSync(dest).size > 0) continue;

  const src = join(modules, pkg, "files", name);
  if (!existsSync(src)) {
    missing.push(`${pkg}/files/${name}`);
    continue;
  }
  copyFileSync(src, dest);
  copied += 1;
}

if (missing.length) {
  console.error(
    `fonts: ${missing.length} file(s) not found — run \`npm install\` first:\n  ${missing.join("\n  ")}`,
  );
  process.exit(1);
}

console.log(copied ? `fonts: wrote ${copied} file(s) to app/fonts` : "fonts: up to date");
