"use client";
import { useCurrency } from "@/components/store/CurrencyProvider";
import { savingsPercent } from "@/lib/format";
import type { Money } from "@/lib/types";

/** Bold display-face price, struck-through "was" price and a red saving tag. Styles: .price-* in hero-reviews.css */
export function Price({ price, compareAt, size = 18 }: { price: Money; compareAt?: Money; size?: number }) {
  const { formatPrice } = useCurrency();
  const save = savingsPercent(price, compareAt);
  return (
    <span className="price" style={{ fontSize: size }}>
      <span className="price-now">{formatPrice(price)}</span>
      {save > 0 && (
        <>
          <s className="price-was" aria-label={`was ${formatPrice(compareAt!)}`}>
            {formatPrice(compareAt!)}
          </s>
          <span className="price-save">−{save}%</span>
        </>
      )}
    </span>
  );
}
