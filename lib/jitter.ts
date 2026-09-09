/**
 * Fixed per-letter irregularity for interface caps and wordmarks:
 * [translateX (px), translateY (px), fontWeight, rotate (deg), opacity factor]
 *
 * Provides sub-pixel offset, slight rotation, uneven ink density, and weight alternation
 * so text reads hand-set and unevenly stamped rather than machine typeset.
 * Deterministic, never animated, and never filtered.
 */
export type JitterTuple = [number, number, number, number, number];

export const JITTER: JitterTuple[] = [
  [0, 0, 600, 0, 1],
  [0.3, -0.22, 500, -0.3, 0.84],
  [-0.26, 0.24, 600, 0.22, 1],
  [0.18, 0.16, 500, 0.34, 0.9],
  [-0.34, -0.12, 600, -0.18, 1],
  [0.24, 0.22, 500, 0.26, 0.82],
  [0, -0.2, 600, -0.34, 0.95],
  [0.32, 0.1, 500, 0.14, 1],
  [-0.18, 0.18, 600, 0.3, 0.87],
  [0.22, -0.16, 600, -0.22, 1],
  [-0.28, 0.12, 500, 0.18, 0.91],
  [0.14, 0.2, 600, -0.26, 1],
  [0.3, -0.1, 500, 0.26, 0.85],
];

export const WORDMARK_JITTER: JitterTuple[] = [
  [0, 0, 600, 0, 1],
  [0.5, -0.6, 500, -0.9, 0.88],
  [-0.4, 0.7, 600, 0.6, 1],
  [0.3, 0.4, 500, 1, 0.92],
  [-0.6, -0.3, 600, -0.5, 1],
  [0.4, 0.6, 500, 0.8, 0.85],
  [0, -0.5, 600, -1, 0.97],
  [0.55, 0.25, 500, 0.4, 1],
  [-0.3, 0.5, 600, 0.9, 0.9],
  [0.4, -0.4, 600, -0.6, 1],
  [-0.5, 0.3, 500, 0.5, 0.93],
  [0.2, 0.55, 600, -0.8, 1],
  [0.5, -0.25, 500, 0.7, 0.89],
];

/**
 * Calculates letter inline style given a letter index, jitter matrix, and intensity multiplier.
 */
export function getJitterStyle(index: number, amount: number = 1, customJitter: JitterTuple[] = JITTER) {
  const j = customJitter[index % customJitter.length];
  return {
    transform: `translate(${(j[0] * amount).toFixed(2)}px,${(j[1] * amount).toFixed(2)}px) rotate(${(j[3] * amount).toFixed(2)}deg)`,
    fontWeight: j[2],
    opacity: 1 - (1 - j[4]) * amount,
  };
}
