"use client";

import { useEffect, useState } from "react";
import type { Product, Review } from "@/lib/types";
import { Sheet } from "@/components/ui/Sheet";
import { FlickFeature } from "./FlickFeature";
import { getLocalReviews, onLocalReviewsChange } from "@/lib/localReviews";
import Image from "next/image";
import { reviewBadge, reviewHandle, summarizeReviews } from "@/lib/reviewDisplay";

/** Samples stay explicitly labelled until replaced by genuine customer feedback.
 *  Reviews a visitor submits from this browser (see ContactForm) are merged in
 *  client-side only — see lib/localReviews.ts for why they don't broadcast to
 *  other visitors yet. */
export function ReviewShowcase({
  products,
  reviews: sampleReviews,
}: {
  products: Product[];
  reviews: Review[];
}) {
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState("all");
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLocalReviews(getLocalReviews());
    return onLocalReviewsChange(() => {
      setLocalReviews(getLocalReviews());
      // Jump straight to the review just submitted so it's obviously "in" the section.
      setFilter("all");
      setIndex(0);
      setPage(0);
    });
  }, []);

  const reviews = [...localReviews, ...sampleReviews];
  const filtered = reviews.filter(
    (r) => filter === "all" || r.productSlug === filter,
  );
  const active = filtered[index % filtered.length];
  // The score and count follow the product being viewed, and use only that product's reviews
  // (genuine ones once it has any; the visitor's own local preview review never counts).
  const summary = summarizeReviews(filtered.filter((r) => !r.id.startsWith("local-")));
  const average = summary.average.toFixed(1);
  const anySample = filtered.some((r) => r.placeholder);
  const productName = (slug: string) =>
    products.find((p) => p.slug === slug)?.name;
  const changeFilter = (value: string) => {
    setFilter(value);
    setIndex(0);
    setPage(0);
  };
  const tag = (r: Review) =>
    r.id.startsWith("local-") ? (
      <span className="sample-pill local-pill">Your review · pending check</span>
    ) : (() => {
        const b = reviewBadge(r);
        if (!b) return null;
        return <span className={b.sample ? "sample-pill" : "sample-pill verified-pill"}>{b.label}</span>;
      })();

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
            <span aria-label={`${average} out of 5 average`}>★★★★★</span>
            <p>{summary.count} {summary.placeholder ? "sample " : ""}review{summary.count === 1 ? "" : "s"}</p>
          </div>
        </div>
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
            {tag(active)}
          </div>
          <p
            className="spotlight-stars"
            aria-label={active.rating + " out of 5 stars"}
          >
            {"★".repeat(active.rating)}
            {"☆".repeat(5 - active.rating)}
          </p>
          {active.title && <h3>{active.title}</h3>}
          <blockquote>“{active.body}”</blockquote>
          <div className="review-byline">
            <span className="review-avatar" aria-hidden="true">
              {active.handle.slice(0, 2).toUpperCase()}
            </span>
            <span>
              {reviewHandle(active)}
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
            Player perspectives {anySample && <span className="sample-pill">Includes samples</span>}
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
                {tag(r)}
              </div>
              <p
                className="spotlight-stars"
                aria-label={r.rating + " out of 5 stars"}
              >
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </p>
              {r.title && <h3>{r.title}</h3>}
              <p className="review-handle">{reviewHandle(r)}</p>
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
