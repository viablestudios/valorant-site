"use client";

import { useCart } from "./CartProvider";
import { useStoreUI } from "@/components/store/StoreUI";
import { ProductMedia } from "@/components/product/ProductMedia";
import {useCurrency} from "@/components/store/CurrencyProvider";
import type { PricedLine } from "@/lib/commerce/pricing";
import styles from "./CartLineItem.module.css";

export function CartLineItem({ line, compact }: { line: PricedLine; compact?: boolean }) {
  const {formatPrice}=useCurrency();
  const { setQuantity, remove, close } = useCart();
  const { openProduct } = useStoreUI();
  const view = () => {
    close();
    openProduct(product.slug);
  };
  const { product, variantId, variantLabel, quantity } = line;
  const isCover = product.media[0].kind === "cover";

  return (
    <li className={`${styles.line} ${compact ? styles.compact : ""}`}>
      <button onClick={view} className={styles.thumb} data-cover={isCover || undefined} aria-label={`View ${product.name}`}>
        <ProductMedia product={product} sizes="96px" />
      </button>
      <div className={styles.info}>
        <button onClick={view} className={styles.name}>
          {product.name}
        </button>
        <span className={styles.meta}>
          {variantLabel ?? (product.type === "digital" ? "Digital · Non-refundable once accessed" : product.shipsIn)}
        </span>
        <div className={styles.controls}>
          {product.type === "physical" ? (
            <div className={styles.qty} role="group" aria-label={`Quantity for ${product.name}`}>
              <button onClick={() => setQuantity(product.id, variantId, quantity - 1)} aria-label="Decrease quantity">
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button onClick={() => setQuantity(product.id, variantId, quantity + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>
          ) : (
            <span className={styles.digital}>Digital</span>
          )}
          <button className={styles.remove} onClick={() => remove(product.id, variantId)}>
            Remove
          </button>
        </div>
      </div>
      <span className={styles.price}>{formatPrice(line.lineTotal)}</span>
    </li>
  );
}
