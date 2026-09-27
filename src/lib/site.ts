export const site = {
  name: "Peakform",
  tagline: "Competitive supply for FPS players",
  description:
    "Premium digital resources built for competitive FPS players who want to improve their aim, consistency and competitive performance.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  currency: "GBP" as const,
  freeShippingThreshold: 3500,
  shippingFlatRate: 395,
  nav: [
    { href: "/shop", label: "Shop" },
    { href: "/wallpapers", label: "Wallpapers" },
    { href: "/shop?category=rank-guides", label: "Guides" },
    { href: "/shop?category=gear", label: "Gear" },
  ],
};
