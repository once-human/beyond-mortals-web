/**
 * Deploy shim — TEMPORARY.
 *
 * The MCP file-upload path into Vercel carries the whole tree inline in one
 * request, and this app's source does not fit in one. So the app/, components/,
 * lib/, content/ and public/ trees travel as a single gzipped blob
 * (scripts/source.b64) and are expanded here, before `npm install`, by the
 * project's installCommand.
 *
 * This exists only because the deployment could not be wired to git yet. Once
 * the repo is on GitHub and the Vercel project builds from a push, DELETE
 * scripts/source.b64, this file, and the custom installCommand — nothing in the
 * application depends on either.
 *
 * A file that already exists on disk is never overwritten, so running this in a
 * normal checkout is a no-op.
 */
import { gunzipSync } from "node:zlib";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const blob = join(here, "source.b64");

if (!existsSync(blob)) {
  console.log("unpack: no source.b64 — normal checkout, nothing to do");
  process.exit(0);
}

const files = JSON.parse(
  gunzipSync(
    Buffer.from(readFileSync(blob, "utf8").replace(/\s+/g, ""), "base64"),
  ).toString("utf8"),
);

let written = 0;
for (const [path, data] of Object.entries(files)) {
  const dest = resolve(root, path);
  const rel = relative(root, dest);
  if (!rel || rel.startsWith("..") || isAbsolute(rel)) {
    throw new Error(`unpack: refusing to write outside the project root: ${path}`);
  }
  if (existsSync(dest)) continue;
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, data, "utf8");
  written += 1;
}

console.log(`unpack: wrote ${written} file(s) of ${Object.keys(files).length}`);
