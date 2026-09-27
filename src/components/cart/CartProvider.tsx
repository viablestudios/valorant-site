"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { priceCart, type Totals } from "@/lib/commerce/pricing";
import type { CartLine, Product } from "@/lib/types";

export type CartStep = "cart" | "details" | "success";

interface CartContextValue {
  step: CartStep;
  setStep: (step: CartStep) => void;
  /** Opens the drawer straight at the checkout form (used by Buy Now). */
  checkout: () => void;
  lines: CartLine[];
  totals: Totals;
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (product: Product, variantId?: string, quantity?: number) => void;
  setQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  remove: (productId: string, variantId?: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "peakform-cart-four-v2";

const same = (l: CartLine, id: string, variant?: string) => l.productId === id && l.variantId === variant;

/**
 * Cart state lives in the browser (localStorage) for guests. When accounts are
 * added, sync `lines` to the server on sign-in and load them back on page load.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [step, setStep] = useState<CartStep>("cart");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setLines(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, hydrated]);

  const add = useCallback((product: Product, variantId?: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => same(l, product.id, variantId));
      if (existing) {
        if (product.type === "digital") return prev;
        return prev.map((l) => (l === existing ? { ...l, quantity: Math.min(10, l.quantity + quantity) } : l));
      }
      return [...prev, { productId: product.id, slug: product.slug, variantId, quantity }];
    });
    setStep("cart");
    setOpen(true);
  }, []);

  const setQuantity = useCallback((productId: string, variantId: string | undefined, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => !same(l, productId, variantId))
        : prev.map((l) => (same(l, productId, variantId) ? { ...l, quantity: Math.min(10, quantity) } : l))
    );
  }, []);

  const remove = useCallback((productId: string, variantId?: string) => {
    setLines((prev) => prev.filter((l) => !same(l, productId, variantId)));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const totals = priceCart(lines);
    return {
      lines,
      totals,
      count: totals.lines.reduce((s, l) => s + l.quantity, 0),
      isOpen,
      step,
      setStep,
      checkout: () => {
        setStep("details");
        setOpen(true);
      },
      open: () => {
        setStep("cart");
        setOpen(true);
      },
      close: () => setOpen(false),
      add,
      setQuantity,
      remove,
      clear: () => setLines([]),
      has: (id) => lines.some((l) => l.productId === id),
    };
  }, [lines, isOpen, step, add, setQuantity, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
