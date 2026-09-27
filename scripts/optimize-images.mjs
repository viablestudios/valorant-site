// Converts raw generated PNGs into web-ready WebP (full + thumbnail).
// Usage: node scripts/optimize-images.mjs <rawDir>
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const raw = process.argv[2];
const out = path.resolve("public/images");

const rules = [
  { match: /^wpu-/, dir: "wallpapers", full: 2400, thumb: 1000 },
  { match: /^wpm-/, dir: "wallpapers", full: 1080, thumb: 520, byHeight: false },
  { match: /^wp-/, dir: "wallpapers", full: 1920, thumb: 800 },
  { match: /^(coaster|case)-/, dir: "products", full: 1400, thumb: 700 },
  { match: /-operative/, dir: "characters", full: 1400, thumb: 0, alpha: true },
];

for (const file of fs.readdirSync(raw).filter((f) => f.endsWith(".png"))) {
  const rule = rules.find((r) => r.match.test(file));
  if (!rule) continue;
  const name = file.replace(/\.png$/, "");
  const src = path.join(raw, file);
  const dest = path.join(out, rule.dir);
  let img = sharp(src);
  if (rule.alpha) img = img.trim(); // crop transparent padding around the cut-out
  await img.clone().resize({ width: rule.full, withoutEnlargement: true })
    .webp({ quality: rule.alpha ? 88 : 82, alphaQuality: 90 })
    .toFile(path.join(dest, `${name}.webp`));
  if (rule.thumb) {
    await sharp(src).resize({ width: rule.thumb }).webp({ quality: 74 })
      .toFile(path.join(dest, `${name}-thumb.webp`));
  }
  console.log("ok", rule.dir, name);
}
