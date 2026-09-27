"use client";

import { useCart } from "./CartProvider";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  variantId,
  quantity = 1,
  size = "md",
  block,
  label = "Add to cart",
  variant = "primary",
}: {
  product: Product;
  variantId?: string;
  quantity?: number;
  size?: "sm" | "md" | "lg";
  block?: boolean;
  label?: string;
  variant?: "primary" | "outline" | "gold";
}) {
  const { add, has } = useCart();
  const owned = product.type === "digital" && has(product.id);
  return (
    <Button
      size={size}
      block={block}
      variant={owned ? "outline" : variant}
      onClick={() => add(product, variantId, quantity)}
      aria-label={owned ? `${product.name} is in your cart` : `${label}: ${product.name}`}
    >
      {owned ? "In cart" : label}
    </Button>
  );
}
