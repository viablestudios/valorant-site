"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { useStoreUI } from "@/components/store/StoreUI";
import type { Product } from "@/lib/types";
import styles from "./ShopSection.module.css";

type Filter = (p: Product) => boolean;
interface Chip {
  id: string;
  label: string;
  test: Filter;
}
interface Tab {
  id: string;
  label: string;
  quip: string;
  test: Filter;
  chips?: Chip[];
}

const wp = (fn: (w: NonNullable<Product["wallpaper"]>) => boolean): Filter => (p) => !!p.wallpaper && fn(p.wallpaper);

const tabs: Tab[] = [
  {
    id: "bestsellers",
    label: "Best sellers",
    quip: "The most-picked kit. Like a meta agent, but it actually helps.",
    test: (p) => !!p.featured || !!p.badges?.includes("bestseller"),
  },
  {
    id: "guides",
    label: "Guides",
    quip: "Structured plans. No 40-minute YouTube intros.",
    test: (p) => ["rank-guides", "aim-training", "training-guides"].includes(p.category),
    chips: [
      { id: "rank", label: "Rank", test: (p) => p.category === "rank-guides" },
      { id: "aim", label: "Aim", test: (p) => p.category === "aim-training" },
      { id: "training", label: "Training", test: (p) => p.category === "training-guides" },
    ],
  },
  {
    id: "wallpapers",
    label: "Wallpapers",
    quip: "Won't fix your aim. Will fix your desktop.",
    test: (p) => p.category === "wallpapers",
    chips: [
      { id: "desktop", label: "Desktop", test: wp((w) => w.device === "desktop") },
      { id: "mobile", label: "Mobile", test: wp((w) => w.device === "mobile") },
      { id: "ultrawide", label: "Ultrawide", test: wp((w) => w.device === "ultrawide") },
      { id: "4k", label: "4K", test: wp((w) => w.is4k) },
      { id: "minimal", label: "Minimal", test: wp((w) => w.styles.includes("minimal")) },
      { id: "cyber", label: "Cyber", test: wp((w) => w.styles.includes("cyber")) },
      { id: "competitive", label: "Competitive", test: wp((w) => w.styles.includes("competitive")) },
      { id: "abstract", label: "Abstract", test: wp((w) => w.styles.includes("abstract")) },
    ],
  },
  {
    id: "bundles",
    label: "Bundles",
    quip: "Everything together, for less. Economy round done right.",
    test: (p) => p.category === "bundles",
  },
  {
    id: "gear",
    label: "Gear",
    quip: "Desk stuff. Your energy drink needs somewhere to live.",
    test: (p) => p.category === "gear",
    chips: [
      { id: "coasters", label: "Coasters", test: (p) => p.slug.includes("coaster") },
      { id: "cases", label: "Phone cases", test: (p) => p.slug.startsWith("phone-case") },
    ],
  },
];

export function ShopSection({ products }: { products: Product[] }) {
  const { shopTab, goToShop } = useStoreUI();
  const [chip, setChip] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const tab = tabs.find((t) => t.id === shopTab) ?? tabs[0];

  useEffect(() => setChip(null), [shopTab]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) {
      return products.filter((p) => `${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(q));
    }
    const chipTest = tab.chips?.find((c) => c.id === chip)?.test;
    return products.filter((p) => tab.test(p) && (!chipTest || chipTest(p)));
  }, [products, tab, chip, query]);

  return (
    <section id="shop" className={styles.shop} aria-labelledby="shop-title">
      <div className={styles.bar}>
        <div className={`wrap ${styles.barInner}`}>
          <h2 id="shop-title" className="sr-only">
            Shop
          </h2>
          <div className={styles.tabs} role="tablist" aria-label="Product categories">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                data-shop-tab={t.id}
                aria-selected={!query && t.id === tab.id}
                aria-controls="shop-grid"
                className={styles.tab}
                onClick={() => {
                  setQuery("");
                  goToShop(t.id);
                }}
              >
                {t.label}
                <span className={styles.count}>{products.filter(t.test).length}</span>
              </button>
            ))}
          </div>
          <label className={styles.search}>
            <span className="sr-only">Search products</span>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="m11 11 4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
          </label>
        </div>
      </div>

      <div className="wrap">
        <div className={styles.meta}>
          {query ? (
            <p className={styles.quip}>
              {visible.length} result{visible.length === 1 ? "" : "s"} for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <p className={styles.quip}>{tab.quip}</p>
          )}
          {!query && tab.chips && (
            <div className={styles.chips} role="group" aria-label={`Filter ${tab.label}`}>
              <button className={styles.chip} aria-pressed={!chip} onClick={() => setChip(null)}>
                All
              </button>
              {tab.chips.map((c) => (
                <button key={c.id} className={styles.chip} aria-pressed={chip === c.id} onClick={() => setChip(c.id)}>
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div id="shop-grid" role="tabpanel" aria-labelledby={query ? undefined : `tab-${tab.id}`} className={styles.grid} key={tab.id + chip + query}>
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>

        {visible.length === 0 && (
          <div className={styles.empty}>
            <p className="display" style={{ fontSize: 34 }}>Nothing here. Whiffed.</p>
            <p>Try another word, or browse the tabs above.</p>
          </div>
        )}
      </div>
    </section>
  );
}
