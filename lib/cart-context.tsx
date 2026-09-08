"use client";
import React, { createContext, ReactNode, useCallback, useContext, useRef, useState } from "react";
import { Product } from "./data";

export interface BagLine extends Product {
  qty: number;
  size?: string;
}

export interface ToastState {
  message: string;
  tone?: "default" | "marker";
}

interface CartContextValue {
  bag: BagLine[];
  bagOpen: boolean;
  setBagOpen: (open: boolean) => void;
  add: (product: Product & { size?: string }) => void;
  updateQty: (index: number, qty: number) => void;
  remove: (index: number) => void;
  toast: ToastState | null;
  say: (message: string, tone?: "default" | "marker") => void;
  dismissToast: () => void;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagLine[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const say = useCallback((message: string, tone: "default" | "marker" = "default") => {
    setToast({ message, tone });
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const add = useCallback(
    (product: Product & { size?: string }) => {
      setBag((b) => [...b, { ...product, qty: 1 }]);
      say("Added to bag", "default");
    },
    [say]
  );

  const updateQty = useCallback((index: number, qty: number) => {
    setBag((b) => b.map((line, i) => (i === index ? { ...line, qty } : line)));
  }, []);

  const remove = useCallback((index: number) => {
    setBag((b) => b.filter((_, i) => i !== index));
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  const total = bag.reduce((sum, line) => sum + line.qty * Number(String(line.price).replace(/[^0-9]/g, "")), 0);

  return (
    <CartContext.Provider value={{ bag, bagOpen, setBagOpen, add, updateQty, remove, toast, say, dismissToast, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
