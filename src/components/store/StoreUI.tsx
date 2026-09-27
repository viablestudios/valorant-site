"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * One-page store navigation. Instead of routing to separate pages, products,
 * the account area and reviews open in panels. The open product is mirrored in
 * the URL (?p=slug) so every product still has a shareable, indexable link.
 */
type Panel = { type: "product"; slug: string } | { type: "account" } | { type: "reviews"; slug?: string } | null;

interface StoreUIValue {
  panel: Panel;
  openProduct: (slug: string) => void;
  openAccount: () => void;
  openReviews: (slug?: string) => void;
  closePanel: () => void;
  /** Shop filter requested from elsewhere on the page (nav links, role tiles, bands). */
  shopTab: string;
  goToShop: (tab?: string) => void;
}

const Ctx = createContext<StoreUIValue | null>(null);

function setParam(key: string, value?: string) {
  const url = new URL(window.location.href);
  if (value) url.searchParams.set(key, value);
  else url.searchParams.delete(key);
  window.history.replaceState(null, "", url);
}

export function StoreUIProvider({ children }: { children: React.ReactNode }) {
  const [panel, setPanel] = useState<Panel>(null);
  const [shopTab, setShopTab] = useState("bestsellers");

  // Deep links: /?p=slug opens a product; /#wallpapers jumps to a shop tab.
  useEffect(() => {
    const url = new URL(window.location.href);
    const slug = url.searchParams.get("p");
    if (slug) setPanel({ type: "product", slug });
    const applyHash = () => {
      const tab = window.location.hash.slice(1);
      if (tab && tab !== "shop" && document.querySelector(`[data-shop-tab="${tab}"]`)) setShopTab(tab);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = panel ? "hidden" : "";
  }, [panel]);

  const openProduct = useCallback((slug: string) => {
    setPanel({ type: "product", slug });
    setParam("p", slug);
  }, []);

  const closePanel = useCallback(() => {
    setPanel(null);
    setParam("p");
  }, []);

  const goToShop = useCallback((tab?: string) => {
    if (tab) setShopTab(tab);
    setPanel(null);
    setParam("p");
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const value = useMemo<StoreUIValue>(
    () => ({
      panel,
      openProduct,
      openAccount: () => setPanel({ type: "account" }),
      openReviews: (slug?: string) => setPanel({ type: "reviews", slug }),
      closePanel,
      shopTab,
      goToShop,
    }),
    [panel, openProduct, closePanel, shopTab, goToShop]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStoreUI() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStoreUI must be used inside <StoreUIProvider>");
  return ctx;
}
