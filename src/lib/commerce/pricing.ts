import { productIndex } from "@/lib/catalog";
import { site } from "@/lib/site";
import type { CartLine, Money, Product } from "@/lib/types";

export interface PricedLine {
  product: Product;
  variantId?: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: Money;
  lineTotal: Money;
}

export interface Totals {
  lines: PricedLine[];
  subtotal: Money;
  shipping: Money;
  total: Money;
  requiresShipping: boolean;
}

/**
 * Prices a cart from the catalogue. The server always re-runs this before
 * creating a payment, so prices sent from the browser are never trusted.
 */
export function priceCart(cart: CartLine[]): Totals {
  const lines: PricedLine[] = [];
  for (const line of cart) {
    const product = productIndex[line.productId];
    if (!product) continue;
    const quantity = product.type === "digital" ? 1 : Math.max(1, Math.min(10, line.quantity));
    const variant = product.variants?.find((v) => v.id === line.variantId);
    lines.push({
      product,
      variantId: variant?.id,
      variantLabel: variant?.label,
      quantity,
      unitPrice: product.price,
      lineTotal: product.price * quantity,
    });
  }
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const physical = lines.filter((l) => l.product.type === "physical");
  const requiresShipping = physical.length > 0;
  const physicalSubtotal = physical.reduce((s, l) => s + l.lineTotal, 0);
  const shipping = requiresShipping && physicalSubtotal < site.freeShippingThreshold ? site.shippingFlatRate : 0;
  return { lines, subtotal, shipping, total: subtotal + shipping, requiresShipping };
}
