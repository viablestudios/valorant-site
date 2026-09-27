"use client";

import { useStoreUI } from "@/components/store/StoreUI";
import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import type { Review } from "@/lib/types";
import { ReviewCard } from "./ReviewCard";
import styles from "./ReviewsMarquee.module.css";

export function ReviewsMarquee({ reviews, productNames }: { reviews: Review[]; productNames: Record<string, string> }) {
  const { openReviews } = useStoreUI();
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const featured = reviews.filter((r) => r.rating === 5 && r.rankTo).slice(0, 16);
  const rows = [featured.slice(0, 8), featured.slice(8, 16)];

  return (
    <section id="reviews" className={styles.section} aria-labelledby="reviews-title">
      <div className={`wrap ${styles.head}`}>
        <div className={styles.headText}>
          <p className="eyebrow">Testimonials</p>
          <h2 id="reviews-title" className="h2">
            Players who stopped <span className="outline">blaming the team.</span>
          </h2>
        </div>
        <div className={styles.score}>
          <span className={styles.big}>{avg.toFixed(1)}</span>
          <div>
            <Stars rating={avg} size={16} />
            <p className={styles.scoreText}>{reviews.length} sample reviews</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => openReviews()}>
            Read all
          </Button>
        </div>
      </div>

      <div className={styles.rows}>
        {rows.map((row, i) => (
          <div key={i} className={styles.track} data-reverse={i === 1 || undefined}>
            {[...row, ...row].map((r, j) => (
              <div key={r.id + j} className={styles.item} aria-hidden={j >= row.length || undefined}>
                <ReviewCard review={r} productName={productNames[r.productSlug]} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className={`wrap ${styles.note}`}>
        Sample testimonials shown for layout. They&apos;ll be replaced with verified customer reviews at launch.
      </p>
    </section>
  );
}
