"use client";
import React from "react";
import { Toast } from "../ui/Toast";
import { useCart } from "@/lib/cart-context";

export function ToastHost() {
  const { toast, dismissToast } = useCart();
  if (!toast) return null;
  return (
    <div className="bm-toast-slot">
      <Toast message={toast.message} tone={toast.tone} onClose={dismissToast} />
    </div>
  );
}
