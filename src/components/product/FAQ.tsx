import type { FAQItem } from "@/lib/types";
import styles from "./FAQ.module.css";

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <details key={item.q} className={styles.item}>
          <summary>
            <span>{item.q}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
