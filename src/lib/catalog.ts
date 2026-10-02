/**
 * Catalogue access layer. Pages only talk to these functions, never to the raw
 * data files — so moving products into a database or CMS means rewriting this
 * file and nothing else. They're async for exactly that reason.
 */
import { products } from "@/lib/data/products";
import { reviews } from "@/lib/data/reviews";
import type { CategorySlug, Product, Review, WallpaperDevice, WallpaperStyle } from "@/lib/types";

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductsByCategory(category?: CategorySlug | null): Promise<Product[]> {
  return category ? products.filter((p) => p.category === category) : products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const bySlug = (product.related ?? [])
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is Product => !!p);
  const fillers = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug && !bySlug.includes(p)
  );
  return [...bySlug, ...fillers].slice(0, limit);
}

export async function getWallpapers(filter: { device?: WallpaperDevice; style?: WallpaperStyle; is4k?: boolean } = {}) {
  return products.filter(
    (p) =>
      p.wallpaper &&
      (!filter.device || p.wallpaper.device === filter.device) &&
      (!filter.style || p.wallpaper.styles.includes(filter.style)) &&
      (!filter.is4k || p.wallpaper.is4k)
  );
}

/**
 * The fictional sample reviews. Genuine reviews entered in the admin are loaded on the server in app/page.tsx
 * (they need the filesystem, which this file can't use because the cart imports it in the browser).
 * Each review belongs to exactly one product (productSlug), so a product only ever shows its own reviews.
 */
export async function getReviews(productSlug?: string): Promise<Review[]> {
  return productSlug ? reviews.filter((r) => r.productSlug === productSlug) : reviews;
}

export { summarizeReviews } from "@/lib/reviewDisplay";

/** Synchronous lookup for client components (cart, checkout). */
export const productIndex: Record<string, Product> = Object.fromEntries(products.map((p) => [p.id, p]));
