import { NextRequest, NextResponse } from "next/server";

/**
 * Review submission endpoint.
 *
 * This does NOT publish the review to other visitors — it only logs it
 * server-side so the site owner can read it. The visitor's own browser adds
 * the review to its local copy of the reviews section (see lib/localReviews.ts)
 * so the flow feels complete while testing.
 *
 * Before launch: replace this with a real moderation queue (store submissions
 * in a database as "pending", let the owner approve/reject, and only then
 * merge approved ones into the public reviews data — ideally gated to
 * verified purchases). Publishing unmoderated, unverified reviews to every
 * visitor is how stores end up with fake-review problems.
 */
export async function POST(request: NextRequest) {
  let body: { name?: string; productSlug?: string; rating?: number; title?: string; body?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const productSlug = (body.productSlug ?? "").trim();
  const rating = Number(body.rating);
  const title = (body.title ?? "").trim();
  const text = (body.body ?? "").trim();

  if (!name || !productSlug || !title || !text) {
    return NextResponse.json({ error: "Fill in your name, a title and your review." }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Choose a rating from 1 to 5." }, { status: 400 });
  }
  if (name.length > 80 || title.length > 120 || text.length > 2000) {
    return NextResponse.json({ error: "That review is too long." }, { status: 400 });
  }

  // TODO before launch: write to a moderation queue in a real database instead of console.log.
  console.log("[review:pending]", { name, productSlug, rating, title, body: text, at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
