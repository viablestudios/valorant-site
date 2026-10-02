import type { Review, ReviewSource } from "@/lib/types";

/** Badge text for a review. Samples are always "Sample"; real reviews show their type. */
export const SOURCE_BADGE: Record<ReviewSource, string> = {
  sample: "Sample",
  customer: "Customer",
  "verified-buyer": "Verified buyer",
  tester: "Tester",
  community: "Community feedback",
};

export function reviewBadge(r: Review): { label: string; sample: boolean } | null {
  if (r.placeholder) return { label: "Sample", sample: true };
  if (r.source) return { label: SOURCE_BADGE[r.source], sample: false };
  return r.verified ? { label: "Verified buyer", sample: false } : null;
}

/** Usernames get an @; names a person typed in with spaces are shown as entered. */
export function reviewHandle(r: Review): string {
  if (/\s/.test(r.handle)) return r.handle;
  return r.handle.startsWith("@") ? r.handle : `@${r.handle}`;
}

/**
 * Average and count for ONE product's reviews (pass only that product's list).
 * Once a product has genuine reviews, the headline rating and count use only those, so fictional samples never
 * pad a real rating. With no genuine reviews yet it falls back to the samples and says so (`placeholder`).
 */
export function summarizeReviews(list: Review[]) {
  const real = list.filter((r) => !r.placeholder);
  const base = real.length ? real : list;
  const count = base.length;
  const average = count ? base.reduce((s, r) => s + r.rating, 0) / count : 0;
  return {
    count,
    average: Math.round(average * 10) / 10,
    placeholder: real.length === 0 && list.length > 0,
    sampleCount: list.length - real.length,
  };
}
