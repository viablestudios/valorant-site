import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { getAllProducts } from "@/lib/catalog";
import { createReview, listAllReviews, type ReviewInput } from "@/lib/reviewStore";
import { validateReview } from "@/lib/reviewValidation";

const denied = () => NextResponse.json({ error: "Sign in to use the admin." }, { status: 401 });

export async function GET() {
  if (!(await isAdmin())) return denied();
  return NextResponse.json({ reviews: await listAllReviews() });
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return denied();
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const slugs = (await getAllProducts()).map((p) => p.slug);
  const result = validateReview(raw, slugs);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  const input = result.value as ReviewInput;
  // A review only goes live when the admin has confirmed it is real.
  if (input.status === "approved" && !input.confirmedReal) {
    return NextResponse.json({ error: "Tick the box to confirm this came from a real person before approving it." }, { status: 400 });
  }
  const review = await createReview({ ...input, status: input.status ?? "pending" });
  revalidatePath("/");
  return NextResponse.json({ review });
}
