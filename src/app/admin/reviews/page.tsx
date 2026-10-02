import type { Metadata } from "next";
import { adminEnabled, isAdmin } from "@/lib/adminAuth";
import { getAllProducts } from "@/lib/catalog";
import { categoryBySlug } from "@/lib/data/categories";
import { listAllReviews } from "@/lib/reviewStore";
import { AdminReviews } from "./AdminReviews";

export const metadata: Metadata = { title: "Reviews admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const enabled = adminEnabled();
  const signedIn = enabled && (await isAdmin());
  if (!signedIn) return <AdminReviews enabled={enabled} signedIn={false} products={[]} initialReviews={[]} />;

  const products = (await getAllProducts()).map((p) => ({
    slug: p.slug,
    name: p.name,
    group: categoryBySlug[p.category]?.name ?? p.category,
  }));
  return <AdminReviews enabled signedIn products={products} initialReviews={await listAllReviews()} />;
}
