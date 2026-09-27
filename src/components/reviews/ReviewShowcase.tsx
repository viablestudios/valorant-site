"use client";

import { useState } from "react";
import type { Product, Review } from "@/lib/types";
import { Sheet } from "@/components/ui/Sheet";
import { FlickFeature } from "./FlickFeature";
import Image from "next/image";

/** Samples stay explicitly labelled until replaced by genuine customer feedback. */
export function ReviewShowcase({
  products,
  reviews,
}: {
  products: Product[];
  reviews: Review[];
}) {
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const filtered = reviews.filter(
    (r) => filter === "all" || r.productSlug === filter,
  );
  const active = filtered[index % filtered.length];
  const average = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);
  const productName = (slug: string) =>
    products.find((p) => p.slug === slug)?.name;
  const changeFilter = (value: string) => {
    setFilter(value);
    setIndex(0);
    setPage(0);
  };

  return (
    <section
      className="review-showcase page-pad"
      id="reviews"
      aria-labelledby="flick-heading"
    >
      {/* Low-key side artwork for wide screens only; faded so the centre message stays the focus */}
      <div className="side-art side-art--left" aria-hidden="true">
        <Image src="/images/agents/cypher.webp" alt="" fill sizes="25vw" />
      </div>
      <div className="side-art side-art--right" aria-hidden="true">
        <Image src="/images/agents/neon.webp" alt="" fill sizes="25vw" />
      </div>
      <FlickFeature />
      <div className="review-panel">
      <div className="review-intro">
        <p className="eyebrow">The player perspective</p>
        <h2 id="review-heading">
          What players say
        </h2>
        <div className="review-score">
          <strong>{average}</strong>
          <div>
            <span aria-label="4.8 out of 5 sample average">★★★★★</span>
            <p>{reviews.length} sample reviews</p>
          </div>
        </div>
        <p className="sample-caption">
          Fictional reviews for this store preview.
        </p>
        <button className="text-button" onClick={() => setOpen(true)}>
          Browse all reviews ↗
        </button>
      </div>
      <div className="review-editorial">
        <div
          className="review-product-tabs"
          role="group"
          aria-label="Filter sample reviews by product"
        >
          <button
            aria-pressed={filter === "all"}
            onClick={() => changeFilter("all")}
          >
            All products
          </button>
          {products.map((p) => (
            <button
              key={p.id}
              aria-pressed={filter === p.slug}
              onClick={() => changeFilter(p.slug)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <article className="spotlight-review" key={active.id}>
          <div className="review-meta">
            <span>{productName(active.productSlug)}</span>
            <span className="sample-pill">Sample</span>
          </div>
          <p
            className="spotlight-stars"
            aria-label={active.rating + " out of 5 stars"}
          >
            {"★".repeat(active.rating)}
            {"☆".repeat(5 - active.rating)}
          </p>
          <h3>{active.title}</h3>
          <blockquote>“{active.body}”</blockquote>
          <div className="review-byline">
            <span className="review-avatar" aria-hidden="true">
              {active.handle.slice(0, 2).toUpperCase()}
            </span>
            <span>
              @{active.handle}
              <small>{productName(active.productSlug)}</small>
            </span>
          </div>
        </article>
        <div className="review-pagination">
          <span aria-live="polite">
            {(index % filtered.length) + 1} / {filtered.length}
          </span>
          <div>
            <button
              aria-label="Previous sample review"
              onClick={() =>
                setIndex((index - 1 + filtered.length) % filtered.length)
              }
            >
              ←
            </button>
            <button
              aria-label="Next sample review"
              onClick={() => setIndex((index + 1) % filtered.length)}
            >
              →
            </button>
          </div>
        </div>
      </div>
      </div>
      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        label="All sample reviews"
        width={900}
        header={
          <h2>
            Player perspectives <span className="sample-pill">Samples</span>
          </h2>
        }
      >
        <div className="review-library">
          <label>
            Product
            <select
              value={filter}
              onChange={(e) => changeFilter(e.target.value)}
            >
              <option value="all">All products</option>
              {products.map((p) => (
                <option key={p.id} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          {filtered.slice(page * 6, page * 6 + 6).map((r) => (
            <article key={r.id}>
              <div className="review-meta">
                <span>{productName(r.productSlug)}</span>
                <span className="sample-pill">Sample</span>
              </div>
              <p
                className="spotlight-stars"
                aria-label={r.rating + " out of 5 stars"}
              >
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </p>
              <h3>{r.title}</h3>
              <p className="review-handle">@{r.handle}</p>
              <p>{r.body}</p>
            </article>
          ))}
          <div className="review-pagination">
            <span>
              Page {page + 1} of {Math.ceil(filtered.length / 6)}
            </span>
            <div>
              <button
                disabled={page === 0}
                aria-label="Previous review page"
                onClick={() => setPage(page - 1)}
              >
                ←
              </button>
              <button
                disabled={(page + 1) * 6 >= filtered.length}
                aria-label="Next review page"
                onClick={() => setPage(page + 1)}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </Sheet>
    </section>
  );
}
