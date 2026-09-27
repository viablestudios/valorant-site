/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a production build live beside the dev server without clobbering .next
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: { formats: ["image/avif", "image/webp"] },
  poweredByHeader: false,
};

export default nextConfig;
