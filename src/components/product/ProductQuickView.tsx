"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useStoreUI } from "@/components/store/StoreUI";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { Sheet } from "@/components/ui/Sheet";
import { Stars } from "@/components/ui/Stars";
import { categoryBySlug } from "@/lib/data/categories";
import {useCurrency} from "@/components/store/CurrencyProvider";
import type { FAQItem, Product, Review } from "@/lib/types";
import { summarizeReviews } from "@/lib/reviewDisplay";
import { FAQ } from "./FAQ";
import { GuideCover } from "./GuideCover";
import { badgeLabel } from "./ProductCard";
import styles from "./ProductQuickView.module.css";

const digitalFAQ: FAQItem[] = [{q:'Can I get a refund?',a:'Digital products are non-refundable once your download or access has started. You confirm this at checkout. If a file is faulty or not as described, we will fix it, replace it or refund you.'},{q:'Can I buy this now?',a:'This is a storefront preview. Payments and downloads are not yet available.'},{q:'Will this guarantee a higher rank?',a:'No. Training resources offer structure, not guaranteed results. Practice is still required.'}];
const physicalFAQ: FAQItem[] = [{q:'Where can you deliver?',a:'Delivery coverage, timing and return terms will be confirmed before payments open. No orders are accepted in this preview.'}];

/**
 * Replaces a separate product page: everything a product page would show,
 * in a panel, with the URL kept shareable as /?p=slug.
 */
export function ProductQuickView({ products, reviews }: { products: Product[]; reviews: Review[] }) {
  const { panel, closePanel, openProduct } = useStoreUI();
  const slug = panel?.type === "product" ? panel.slug : null;
  const [lastSlug, setLastSlug] = useState<string | null>(slug);
  useEffect(() => {
    if (slug) setLastSlug(slug);
  }, [slug]);

  // Keep rendering the last product while the panel slides closed.
  const product = products.find((p) => p.slug === (slug ?? lastSlug));
  const bySlug = useMemo(() => Object.fromEntries(products.map((p) => [p.slug, p])), [products]);

  return (
    <Sheet
      open={!!slug && !!product}
      onClose={closePanel}
      label={product ? product.name : "Product"}
      width={880}
      header={
        product && (
          <p className="eyebrow" style={{ margin: 0 }}>
            {categoryBySlug[product.category]?.name}
          </p>
        )
      }
    >
      {product && (
        <ProductDetail
          key={product.slug}
          product={product}
          reviews={reviews.filter((r) => r.productSlug === product.slug)}
          related={(product.related ?? []).map((s) => bySlug[s]).filter(Boolean).slice(0, 3)}
          bundleItems={(product.bundleOf ?? []).map((s) => bySlug[s]).filter(Boolean)}
          onOpen={openProduct}
          onAllReviews={() => { closePanel(); document.getElementById("reviews")?.scrollIntoView({behavior:"smooth"}); }}
        />
      )}
    </Sheet>
  );
}

function ProductDetail({
  product,
  reviews,
  related,
  bundleItems,
  onOpen,
  onAllReviews,
}: {
  product: Product;
  reviews: Review[];
  related: Product[];
  bundleItems: Product[];
  onOpen: (slug: string) => void;
  onAllReviews: () => void;
}) {
  const {formatPrice}=useCurrency();
  const { add, checkout, has } = useCart(); const { closePanel } = useStoreUI();
  const [variant, setVariant] = useState(product.variants?.[0]?.id);
  const [qty, setQty] = useState(1);
  const media = product.media[0];
  // Rating and count come only from this product's reviews (genuine ones only, once it has any).
  const summary = summarizeReviews(reviews);
  const avg = summary.average;
  const isDigital = product.type === "digital";
  const inCart = isDigital && has(product.id);

  const buyNow = () => {
    if (!inCart) add(product, variant, qty);
    closePanel(); checkout();
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.media} data-kind={media.kind} style={media.kind === "image" ? { aspectRatio: media.ratio } : undefined}>
          {media.kind === "cover" ? (
            <div className={styles.coverStage}>
              <GuideCover cover={media.cover} size="lg" />
            </div>
          ) : (
            <Image quality={95} src={media.src} alt={media.alt} fill sizes="(min-width: 900px) 420px, 100vw" style={{ objectFit: "cover" }} />
          )}
        </div>

        <div className={styles.info}>
          {product.badges?.length ? (
            <ul className={styles.badges}>
              {product.badges.map((b) => (
                <li key={b} data-badge={b}>
                  {badgeLabel[b]}
                </li>
              ))}
            </ul>
          ) : null}
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.tagline}>{product.tagline}</p>

          {reviews.length > 0 && (
            <button className={styles.rating} onClick={onAllReviews}>
              <Stars rating={avg} />
              <span>
                {avg.toFixed(1)} · {summary.count} {summary.placeholder ? "sample " : ""}review{summary.count === 1 ? "" : "s"}
              </span>
            </button>
          )}

          <Price price={product.price} compareAt={product.compareAtPrice} size={26} />
          <p className={styles.short}>{product.shortDescription}</p>

          {product.variants && (
            <div className="field">
              <label htmlFor="qv-variant">Phone model</label>
              <select id="qv-variant" className="input" value={variant} onChange={(e) => setVariant(e.target.value)}>
                {product.variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!isDigital && (
            <div className={styles.qtyRow}>
              <span>Quantity</span>
              <div className={styles.qty}>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  −
                </button>
                <span aria-live="polite">{qty}</span>
                <button onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase quantity">
                  +
                </button>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <Button size="lg" onClick={buyNow} arrow>
              Preview checkout · {formatPrice(product.price * (isDigital ? 1 : qty))}
            </Button>
            <Button size="lg" variant="outline" onClick={() => { closePanel(); add(product, variant, qty); }} disabled={inCart}>
              {inCart ? "In cart" : "Add to cart"}
            </Button>
          </div>

          <ul className={styles.trust}>
            {isDigital ? (
              <>
                <li>Digital product</li>
                <li>Contents listed below</li>
                <li>Preview — no payment collected</li>
              </>
            ) : (
              <>
                <li>{product.shipsIn}</li>
                <li>Delivery coverage confirmed before launch</li>
                <li>Return terms available before launch</li>
              </>
            )}
          </ul>
          {isDigital && (
            <p className="refund-note">
              <strong>Non-refundable digital product.</strong> Once your download or access starts, it can&apos;t be
              returned or refunded. Faulty or not as described? We&apos;ll fix, replace or refund it.
            </p>
          )}
        </div>
      </div>

      <div className={styles.details}>
        <section className={styles.block}>
          <h3>{bundleItems.length ? "In the bundle" : "What's included"}</h3>
          {bundleItems.length ? (
            <ul className={styles.bundle}>
              {bundleItems.map((b) => (
                <li key={b.slug}>
                  <button onClick={() => onOpen(b.slug)}>{b.name}</button>
                  <span className="price-now">{formatPrice(b.price)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className={styles.checks}>
              {product.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          )}
        </section>

        <section className={styles.block}>
          <h3>Who it&apos;s for</h3>
          <ul className={styles.dashes}>
            {product.forWho.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>

        <section className={`${styles.block} ${styles.wide}`}>
          <h3>About</h3>
          <div className={styles.long}>
            {product.longDescription.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </section>

        <section className={styles.block}>
          <h3>Specifications</h3>
          <dl className={styles.specs}>
            {product.specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className={styles.block}>
          <h3>FAQ</h3>
          <FAQ items={[...(product.faq ?? []), ...(isDigital ? digitalFAQ : physicalFAQ)]} />
        </section>

        {reviews.length > 0 && (
          <section className={`${styles.block} ${styles.wide}`}>
            <div className={styles.blockHead}>
              <h3>Reviews</h3>
              <button className={styles.link} onClick={onAllReviews}>
                See all {reviews.length}
              </button>
            </div>
            <div className={styles.reviewGrid}>
              {reviews.slice(0, 2).map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className={`${styles.block} ${styles.wide}`}>
            <h3>Pairs well with</h3>
            <div className={styles.related}>
              {related.map((r) => (
                <button key={r.slug} className={styles.relatedCard} onClick={() => onOpen(r.slug)}>
                  <span className={styles.relatedName}>{r.name}</span>
                  <span className="price-now">{formatPrice(r.price)}</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
