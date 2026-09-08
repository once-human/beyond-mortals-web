"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Size } from "@/lib/api/types";

export interface BagLine {
  code: string;
  handle: string;
  name: string;
  technique: string;
  tier: string;
  size: Size;
  price: number;
  qty: number;
}

interface BagState {
  lines: BagLine[];
  open: boolean;
  hydrated: boolean;
  add: (line: Omit<BagLine, "qty">, qty?: number) => void;
  remove: (code: string, size: Size) => void;
  setQty: (code: string, size: Size, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  count: () => number;
  subtotal: () => number;
}

export const useBag = create<BagState>()(
  persist(
    (set, get) => ({
      lines: [],
      open: false,
      hydrated: false,

      add: (line, qty = 1) =>
        set((s) => {
          const i = s.lines.findIndex(
            (l) => l.code === line.code && l.size === line.size,
          );
          if (i > -1) {
            const next = [...s.lines];
            next[i] = { ...next[i], qty: next[i].qty + qty };
            return { lines: next, open: true };
          }
          return { lines: [...s.lines, { ...line, qty }], open: true };
        }),

      remove: (code, size) =>
        set((s) => ({
          lines: s.lines.filter((l) => !(l.code === code && l.size === size)),
        })),

      setQty: (code, size, qty) =>
        set((s) => ({
          lines: s.lines
            .map((l) =>
              l.code === code && l.size === size ? { ...l, qty: Math.max(0, qty) } : l,
            )
            .filter((l) => l.qty > 0),
        })),

      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),

      count: () => get().lines.reduce((n, l) => n + l.qty, 0),
      subtotal: () => get().lines.reduce((n, l) => n + l.price * l.qty, 0),
    }),
    {
      name: "bm.bag",
      partialize: (s) => ({ lines: s.lines }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);
