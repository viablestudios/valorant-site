import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/adminAuth";
import { getAllProducts } from "@/lib/catalog";
import { deleteReview, listAllReviews, updateReview } from "@/lib/reviewStore";
import { validateReview } from "@/lib/reviewValidation";

const denied = () => NextResponse.json({ error: "Sign in to use the admin." }, { status: 401 });

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return denied();
  const { id } = await params;
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const slugs = (await getAllProducts()).map((p) => p.slug);
  const result = validateReview(raw, slugs, { partial: true });
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  const current = (await listAllReviews()).find((r) => r.id === id);
  if (!current) return NextResponse.json({ error: "Review not found." }, { status: 404 });
  const next = { ...current, ...result.value };
  if (next.status === "approved" && !next.confirmedReal) {
    return NextResponse.json({ error: "Tick the box to confirm this came from a real person before approving it." }, { status: 400 });
  }
  const review = await updateReview(id, result.value);
  revalidatePath("/");
  return NextResponse.json({ review });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return denied();
  const { id } = await params;
  const ok = await deleteReview(id);
  if (!ok) return NextResponse.json({ error: "Review not found." }, { status: 404 });
  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
