"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {useCurrency} from "@/components/store/CurrencyProvider";
import type { DownloadLink } from "@/lib/commerce/orders";
import styles from "./Checkout.module.css";

interface OrderView {
  id: string;
  email: string;
  total: number;
  requiresShipping: boolean;
  items: { name: string; variant?: string; quantity: number }[];
  downloads: DownloadLink[];
}

export function OrderSuccess({ orderId, onDone }: { orderId: string; onDone: () => void }) {
  const {formatPrice}=useCurrency();
  const [order, setOrder] = useState<OrderView | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setOrder)
      .catch(() => setFailed(true));
  }, [orderId]);

  if (failed) {
    return (
      <div className={styles.success}>
        <p className="display" style={{ fontSize: 36 }}>Order not found</p>
        <p className={styles.muted}>
          We couldn&apos;t load order {orderId}. Your confirmation email has your download links, or open your account
          library.
        </p>
      </div>
    );
  }

  if (!order) return <p className={styles.loading}>Confirming payment…</p>;

  return (
    <div className={styles.success}>
      <p className="eyebrow">Order {order.id}</p>
      <p className="display" style={{ fontSize: 56, lineHeight: 0.85 }}>
        GG. <span className="outline">You&apos;re in.</span>
      </p>
      <p className={styles.muted}>
        A receipt and these links are on their way to <strong>{order.email}</strong>. Links stay live for 72 hours and
        everything lives in your account library after that.
      </p>

      {order.downloads.length > 0 && (
        <ul className={styles.downloads}>
          {order.downloads.map((d) => (
            <li key={d.href}>
              <div>
                <span className={styles.dlName}>{d.file}</span>
                <span className={styles.dlMeta}>
                  {d.format} · {d.size}
                  {d.product !== d.file && ` · ${d.product}`}
                </span>
              </div>
              <Button href={d.href} size="sm" variant="gold" download>
                Download
              </Button>
            </li>
          ))}
        </ul>
      )}

      {order.requiresShipping && (
        <p className={styles.shipNote}>
          Physical items ship in 2–5 working days. We&apos;ll email tracking when they leave.
        </p>
      )}

      <div className={styles.summary}>
        <div className={styles.total}>
          <span>Paid</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>
      <Button variant="outline" block onClick={onDone}>
        Back to the shop
      </Button>
      <p className="quip">Now go warm up. Seriously.</p>
    </div>
  );
}
