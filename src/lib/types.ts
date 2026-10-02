/**
 * Core commerce types. Everything the storefront renders comes from these
 * shapes, so swapping the static catalogue for a database (Postgres, Sanity,
 * Shopify, etc.) only means returning the same objects from `lib/catalog.ts`.
 */

/** Money is always stored in minor units (pence) — the same format Stripe uses. */
export type Money = number;
export type Currency = "GBP";

export type CategorySlug =
  | "wallpapers"
  | "training-guides"
  | "rank-guides"
  | "aim-training"
  | "bundles"
  | "gear";

export type ProductType = "digital" | "physical";

export type Badge = "bestseller" | "new" | "limited" | "pro";

export type WallpaperDevice = "desktop" | "mobile" | "ultrawide";
export type WallpaperStyle = "minimal" | "cyber" | "competitive" | "abstract";

/** Guide covers are rendered in code (see components/product/GuideCover). */
export interface CoverSpec {
  title: string;
  kicker: string;
  edition: string;
  tone: "red" | "gold" | "bone";
  pattern: "rings" | "grid" | "peak" | "bars" | "stack";
}

export type ProductMedia =
  | { kind: "image"; src: string; thumb?: string; alt: string; ratio: string; /** CSS object-position, e.g. "50% 0%" to keep the top in view */ position?: string; /** Shape of the picture on the shop card when it differs from `ratio`, e.g. "1/1" */ cardRatio?: string }
  | { kind: "cover"; cover: CoverSpec };

/** A file delivered after purchase. `storageKey` points at private storage (S3, R2, Supabase…). */
export interface DigitalFile {
  name: string;
  format: "PDF" | "PNG" | "ZIP" | "XLSX" | "TXT";
  sizeLabel: string;
  storageKey: string;
}

export interface ProductVariant {
  id: string;
  label: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string[];
  type: ProductType;
  category: CategorySlug;
  price: Money;
  compareAtPrice?: Money;
  media: ProductMedia[];
  badges?: Badge[];
  featured?: boolean;
  includes: string[];
  forWho: string[];
  specs: { label: string; value: string }[];
  faq?: FAQItem[];
  related?: string[];
  /** Digital products: what the customer downloads. */
  files?: DigitalFile[];
  /** Bundles: slugs of the products included. */
  bundleOf?: string[];
  /** Physical products: variants and fulfilment info. */
  variants?: ProductVariant[];
  shipsIn?: string;
  wallpaper?: {
    device: WallpaperDevice;
    resolution: string;
    styles: WallpaperStyle[];
    is4k: boolean;
  };
  /** Filled in once products are created in Stripe. */
  stripePriceId?: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  image: string;
}

/** Where a review came from. "sample" is fictional demo content; everything else is a real person's feedback entered through the admin. */
export type ReviewSource = "sample" | "customer" | "verified-buyer" | "tester" | "community";
export type ReviewStatus = "approved" | "hidden" | "pending";

export interface Review {
  id: string;
  handle: string;
  productSlug: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Optional for reviews entered in the admin. */
  title: string;
  body: string;
  rankFrom?: string;
  rankTo?: string;
  date: string;
  /** Sample content: fictional demo reviews. These always show the "Sample" label. */
  placeholder: boolean;
  verified: boolean;
  /** Real reviews entered in the admin carry their source (Customer, Verified buyer, Tester, Community feedback). */
  source?: ReviewSource;
}

export interface CartLine {
  productId: string;
  slug: string;
  variantId?: string;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: "paid" | "fulfilled" | "shipped" | "refunded";
  email: string;
  lines: { productId: string; name: string; variant?: string; quantity: number; unitPrice: Money }[];
  subtotal: Money;
  shipping: Money;
  total: Money;
}

export interface Customer {
  id: string;
  name: string;
  handle: string;
  email: string;
  memberSince: string;
  rank: string;
}
