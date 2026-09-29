"use client";

import type { Review } from "@/lib/types";

/**
 * Reviews a visitor submits from this browser, kept client-side only.
 *
 * There's no database behind this site yet, and letting any visitor's
 * submission auto-publish to every other visitor (with no purchase check or
 * moderation) is exactly the fake/unverified-review problem this project
 * has otherwise been careful to avoid. So a submitted review is saved to
 * *this device* (localStorage) and shown in *this browser's* copy of the
 * reviews section immediately — proving the flow works end to end — while
 * a copy is also logged server-side (see /api/reviews) for the site owner
 * to read. Before launch: add a moderation queue + a real database, and
 * only then let approved submissions go out to every visitor.
 */
const KEY = "peakform-local-reviews";
const EVENT = "peakform:local-review-added";

function read(): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function write(reviews: Review[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(reviews));
  } catch {}
}

export function getLocalReviews(): Review[] {
  return read();
}

export function addLocalReview(review: Review) {
  const next = [review, ...read()];
  write(next);
  window.dispatchEvent(new CustomEvent(EVENT));
  return next;
}

/** Notifies other components in this tab when a review is added; call in a useEffect. */
export function onLocalReviewsChange(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
