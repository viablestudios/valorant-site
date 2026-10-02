import { Stars } from "@/components/ui/Stars";
import { formatDate } from "@/lib/format";
import type { Review } from "@/lib/types";
import { reviewBadge, reviewHandle } from "@/lib/reviewDisplay";
import styles from "./ReviewCard.module.css";

export function ReviewCard({ review, productName }: { review: Review; productName?: string }) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <Stars rating={review.rating} size={13} />
        {(() => {
          const badge = reviewBadge(review);
          if (!badge) return null;
          return badge.sample ? (
            <span className={styles.sample} title="Sample review: replace with verified customer reviews before launch">
              {badge.label}
            </span>
          ) : (
            <span className={styles.verified}>{badge.label}</span>
          );
        })()}
      </header>
      {review.title && <h3 className={styles.title}>{review.title}</h3>}
      <p className={styles.body}>{review.body}</p>
      <footer className={styles.foot}>
        <span className={styles.handle}>{reviewHandle(review)}</span>
        {review.rankFrom && review.rankTo && (
          <span className={styles.rank}>
            {review.rankFrom} <span aria-label="to">→</span> <span className="gold">{review.rankTo}</span>
          </span>
        )}
      </footer>
      {productName && (
        <p className={styles.product}>
          {productName}{review.date ? ` · ${formatDate(review.date)}` : ""}
        </p>
      )}
    </article>
  );
}
