import { REAL_SOURCES, type ReviewInput } from "@/lib/reviewStore";
import type { ReviewStatus } from "@/lib/types";

const STATUSES: ReviewStatus[] = ["approved", "hidden", "pending"];

type Raw = Record<string, unknown>;

/**
 * Check a review entered in the admin. `productSlugs` is every slug in the catalogue, so reviews can only be
 * assigned to a real product (and new products work automatically as soon as they are added to the catalogue).
 * A review can only be approved (shown to visitors) when the admin has confirmed it came from a real person.
 */
export function validateReview(
  raw: Raw,
  productSlugs: string[],
  { partial = false }: { partial?: boolean } = {},
): { ok: true; value: Partial<ReviewInput> } | { ok: false; error: string } {
  const out: Partial<ReviewInput> = {};
  const has = (k: string) => raw[k] !== undefined;

  if (!partial || has("productSlug")) {
    const v = String(raw.productSlug ?? "").trim();
    if (!productSlugs.includes(v)) return { ok: false, error: "Choose which product this review belongs to." };
    out.productSlug = v;
  }
  if (!partial || has("name")) {
    const v = String(raw.name ?? "").trim();
    if (!v || v.length > 80) return { ok: false, error: "Enter the reviewer's name or username (up to 80 characters)." };
    out.name = v;
  }
  if (!partial || has("rating")) {
    const v = Number(raw.rating);
    if (!Number.isInteger(v) || v < 1 || v > 5) return { ok: false, error: "Choose a star rating from 1 to 5." };
    out.rating = v as 1 | 2 | 3 | 4 | 5;
  }
  if (!partial || has("title")) {
    const v = String(raw.title ?? "").trim();
    if (v.length > 120) return { ok: false, error: "The title is too long (120 characters at most)." };
    out.title = v;
  }
  if (!partial || has("body")) {
    const v = String(raw.body ?? "").trim();
    if (!v || v.length > 2000) return { ok: false, error: "Enter the review text (up to 2,000 characters)." };
    out.body = v;
  }
  if (!partial || has("date")) {
    const v = String(raw.date ?? "").trim();
    if (v) {
      const d = new Date(`${v}T12:00:00Z`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(d.getTime())) return { ok: false, error: "Enter a valid review date, or leave it blank if the date is unknown." };
      if (d.getTime() > Date.now() + 24 * 3600 * 1000) return { ok: false, error: "The date can't be in the future." };
    }
    out.date = v;
  }
  if (!partial || has("source")) {
    const v = String(raw.source ?? "");
    if (!(REAL_SOURCES as readonly string[]).includes(v)) return { ok: false, error: "Choose the review type: Customer, Verified buyer, Tester or Community feedback." };
    out.source = v as ReviewInput["source"];
  }
  if (has("confirmedReal")) out.confirmedReal = raw.confirmedReal === true;
  else if (!partial) out.confirmedReal = false;
  if (has("status")) {
    const v = String(raw.status) as ReviewStatus;
    if (!STATUSES.includes(v)) return { ok: false, error: "Unknown status." };
    out.status = v;
  }
  return { ok: true, value: out };
}
