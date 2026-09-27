import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, columns = 4 }: { products: Product[]; columns?: 3 | 4 }) {
  return (
    <div
      style={{
        display: "grid",
        gap: "clamp(14px, 2vw, 24px)",
        gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${columns === 4 ? 250 : 300}px), 1fr))`,
      }}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 2} />
      ))}
    </div>
  );
}
