import { promises as fs } from "fs";
import path from "path";
import type { Review, ReviewSource, ReviewStatus } from "@/lib/types";

/**
 * Genuine reviews entered through the admin (/admin/reviews), stored as JSON in content/reviews.json.
 * The file starts empty: nothing is pre-filled or invented. The fictional demo reviews live in
 * lib/data/reviews.ts and always stay labelled as samples.
 *
 * This is a simple file store, fine for local use or a server with a persistent disk. On serverless hosting
 * (for example Vercel) the filesystem is read-only, so swap the four functions below for a database call; the
 * rest of the shop only uses listPublicReviews().
 */
export const REAL_SOURCES = ["customer", "verified-buyer", "tester", "community"] as const satisfies readonly ReviewSource[];
export const SOURCE_LABEL: Record<ReviewSource, string> = {
  sample: "Sample",
  customer: "Customer",
  "verified-buyer": "Verified buyer",
  tester: "Tester",
  community: "Community feedback",
};

export interface StoredReview {
  id: string;
  productSlug: string;
  /** Reviewer name or username, shown as entered. */
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  /** YYYY-MM-DD */
  date: string;
  source: (typeof REAL_SOURCES)[number];
  status: ReviewStatus;
  /** The admin confirmed this came from a real person who gave this feedback. Required before a review can be approved. */
  confirmedReal: boolean;
  createdAt: string;
  updatedAt: string;
}

const FILE = path.join(process.cwd(), "content", "reviews.json");

async function read(): Promise<StoredReview[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredReview[]) : [];
  } catch {
    return [];
  }
}

async function write(list: StoredReview[]) {
  const tmp = `${FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(list, null, 2) + "\n", "utf8");
  await fs.rename(tmp, FILE);
}

export async function listAllReviews(): Promise<StoredReview[]> {
  const list = await read();
  return list.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.createdAt < b.createdAt ? 1 : -1));
}

export type ReviewInput = Pick<StoredReview, "productSlug" | "name" | "rating" | "title" | "body" | "date" | "source" | "confirmedReal"> & {
  status?: ReviewStatus;
};

export async function createReview(input: ReviewInput): Promise<StoredReview> {
  const list = await read();
  const now = new Date().toISOString();
  const review: StoredReview = {
    ...input,
    status: input.status ?? "pending",
    id: `rev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: now,
    updatedAt: now,
  };
  list.push(review);
  await write(list);
  return review;
}

export async function updateReview(id: string, patch: Partial<ReviewInput>): Promise<StoredReview | null> {
  const list = await read();
  const i = list.findIndex((r) => r.id === id);
  if (i < 0) return null;
  list[i] = { ...list[i], ...patch, updatedAt: new Date().toISOString() };
  await write(list);
  return list[i];
}

export async function deleteReview(id: string): Promise<boolean> {
  const list = await read();
  const next = list.filter((r) => r.id !== id);
  if (next.length === list.length) return false;
  await write(next);
  return true;
}

/** Turn a stored review into the shape the storefront components already use. */
export function toPublicReview(r: StoredReview): Review {
  return {
    id: r.id,
    handle: r.name,
    productSlug: r.productSlug,
    rating: r.rating,
    title: r.title,
    body: r.body,
    date: r.date,
    placeholder: false,
    verified: r.source === "verified-buyer",
    source: r.source,
  };
}

/** Only approved reviews the admin has confirmed as real are ever shown to visitors. */
export async function listPublicReviews(): Promise<Review[]> {
  const list = await listAllReviews();
  return list.filter((r) => r.status === "approved" && r.confirmedReal).map(toPublicReview);
}
