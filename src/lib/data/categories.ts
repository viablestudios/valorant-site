import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "wallpapers",
    name: "Wallpapers",
    blurb: "Original desktop, mobile and ultrawide art.",
    image: "/images/wallpapers/wp-reticle-thumb.webp",
  },
  {
    slug: "training-guides",
    name: "Training Guides",
    blurb: "Game sense, post-game reflection and match prep.",
    image: "/images/wallpapers/wp-corridor-thumb.webp",
  },
  {
    slug: "rank-guides",
    name: "Rank Guides",
    blurb: "Structured plans for climbing ranked.",
    image: "/images/wallpapers/wp-summit-thumb.webp",
  },
  {
    slug: "aim-training",
    name: "Aim Training",
    blurb: "Routines, crosshairs and sensitivity.",
    image: "/images/wallpapers/wp-redline-thumb.webp",
  },
  {
    slug: "bundles",
    name: "Bundles",
    blurb: "Everything together, for less.",
    image: "/images/wallpapers/wp-shards-thumb.webp",
  },
  {
    slug: "gear",
    name: "Desk Gear",
    blurb: "Coasters and phone cases for your setup.",
    image: "/images/products/coaster-set-thumb.webp",
  },
];

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
