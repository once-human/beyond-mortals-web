"use client";
import React from "react";
import { Button } from "../ui/Button";
import { CartLine } from "../ui/CartLine";
import { Dialog } from "../ui/Dialog";
import { useCart } from "@/lib/cart-context";

export function BagDialog() {
  const { bag, bagOpen, setBagOpen, updateQty, remove, say, total } = useCart();
  return (
    <Dialog
      open={bagOpen}
      title="Bag"
      onClose={() => setBagOpen(false)}
      footer={
        <>
          <Button variant="ghost" onClick={() => setBagOpen(false)}>
            Keep looking
          </Button>
          <Button
            variant="primary"
            mark="→"
            disabled={!bag.length}
            onClick={() => {
              setBagOpen(false);
              say("Checkout is not live in this kit", "marker");
            }}
          >
            Checkout
          </Button>
        </>
      }
    >
      {bag.length ? (
        <>
          {bag.map((line, i) => (
            <CartLine key={i} {...line} onQty={(q) => updateQty(i, q)} onRemove={() => remove(i)} />
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "var(--space-5)" }}>
            <span className="bm-micro">Total</span>
            <span className="bm-data" style={{ color: "var(--text-body)" }}>
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </>
      ) : (
        <span className="bm-data" style={{ fontSize: "11px", color: "var(--text-faint)" }}>
          NOTHING IN THE BAG.
        </span>
      )}
    </Dialog>
  );
}
