"use client";

import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { useStoreUI } from "@/components/store/StoreUI";
import { categoryBySlug } from "@/lib/data/categories";
import { Stars } from "@/components/ui/Stars";
import type { Product, Review } from "@/lib/types";
import { ProductMedia } from "./ProductMedia";
import styles from "./ProductCard.module.css";

export const badgeLabel = { bestseller: "Best seller", new: "New", limited: "Limited", pro: "Best value" } as const;

export function ProductCard({ product, priority, reviews = [] }: { product: Product; priority?: boolean; reviews?: Review[] }) {
  const { openProduct } = useStoreUI();
  const media = product.media[0];
  const isCover = media.kind === "cover";
  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  const featured = reviews.find((r) => r.rating === 5) ?? reviews[0];

  return (
    <article className={`${styles.card} ${product.badges?.includes("bestseller") ? styles.featured : ""}`}>
      <div className={styles.stage} data-cover={isCover || undefined}>
        <div className={styles.mediaBox}>
          <ProductMedia product={product} variant="full" priority={priority} sizes="(min-width: 1200px) 25vw, (min-width: 600px) 50vw, 100vw" />
        </div>
        {product.badges?.length ? (
          <ul className={styles.badges}>
            {product.badges.slice(0, 1).map((b) => (
              <li key={b} className={styles[b]}>
                {badgeLabel[b]}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className={styles.body}>
        <p className={styles.cat}>
          {product.wallpaper ? product.wallpaper.resolution : categoryBySlug[product.category]?.name}
        </p>
        <h3 className={styles.name}>
          {/* The whole card opens the quick view via this button's stretched hit area */}
          <button className={styles.open} onClick={() => openProduct(product.slug)}>
            {product.name}
          </button>
        </h3>
        <p className={styles.tagline}>{product.tagline}</p>
        {product.type === "digital" && <p className="policy-tag">Digital · Non-refundable once accessed</p>}
        {featured && (
          <div className={styles.reviewBlock}>
            <button className={styles.ratingRow} onClick={() => openProduct(product.slug)}>
              <Stars rating={average} size={14} />
              <span>
                {average.toFixed(1)} from {reviews.length} sample reviews
              </span>
            </button>
            <figure className={styles.quote}>
              <blockquote>&ldquo;{featured.title}&rdquo;</blockquote>
              <figcaption>
                @{featured.handle}
                {featured.placeholder && <span className={styles.samplePill}>Sample</span>}
              </figcaption>
            </figure>
          </div>
        )}
        <div className={styles.foot}>
          <Price price={product.price} compareAt={product.compareAtPrice} size={25} />
          {product.variants ? (
            <Button size="sm" variant="outline" onClick={() => openProduct(product.slug)} aria-label={`Choose a phone model for ${product.name}`}>
              Pick model
            </Button>
          ) : (
            <AddToCartButton product={product} size="sm" label="Add" />
          )}
        </div>
      </div>
    </article>
  );
}
