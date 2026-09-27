"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { CartLineItem } from "./CartLineItem";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";
import { useStoreUI } from "@/components/store/StoreUI";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import {useCurrency} from "@/components/store/CurrencyProvider";
import { site } from "@/lib/site";
import styles from "./CartDrawer.module.css";

const titles = { cart: "Cart", details: "Checkout", success: "Order confirmed" };

/** Cart → checkout → confirmation, all without leaving the page. */
export function CartDrawer() {
  const {formatPrice}=useCurrency();
  const { isOpen, close, open, totals, count, step, setStep, clear } = useCart();
  const { goToShop } = useStoreUI();
  const [orderId, setOrderId] = useState<string | null>(null);

  // Returning from payment: /?order=ID reopens the drawer on the confirmation step.
  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("order");
    if (!id) return;
    setOrderId(id);
    setStep("success");
    open();
    clear();
    url.searchParams.delete("order");
    url.searchParams.delete("session_id");
    window.history.replaceState(null, "", url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const physicalSubtotal = totals.lines.filter((l) => l.product.type === "physical").reduce((s, l) => s + l.lineTotal, 0);
  const toFreeShipping = site.freeShippingThreshold - physicalSubtotal;
  const isEmpty = totals.lines.length === 0;

  const header = (
    <h2 className="display" style={{ fontSize: 30 }}>
      {titles[step]}
      {step === "cart" && <span className="mono" style={{ fontSize: 13, color: "var(--muted)", marginLeft: 8 }}>({count})</span>}
    </h2>
  );

  const footer =
    step === "cart" && !isEmpty ? (
      <div className={styles.foot}>
        <div className={styles.row}>
          <span>Subtotal</span>
          <span className="price-now">{formatPrice(totals.subtotal)}</span>
        </div>
        <p className="quip">
          {totals.requiresShipping ? "Shipping calculated at checkout." : "Digital product preview. No payment or delivery yet."}
        </p>
        <Button block size="lg" arrow onClick={() => setStep("details")}>
          Checkout
        </Button>
      </div>
    ) : undefined;

  return (
    <Sheet open={isOpen} onClose={close} label={titles[step]} width={step === "cart" ? 440 : 480} header={header} footer={footer}>
      {step === "success" && orderId ? (
        <OrderSuccess
          orderId={orderId}
          onDone={() => {
            close();
            setStep("cart");
            goToShop();
          }}
        />
      ) : step === "details" && !isEmpty ? (
        <CheckoutForm />
      ) : isEmpty ? (
        <div className={styles.empty}>
          <p className="display" style={{ fontSize: 40, lineHeight: 0.9 }}>
            Emptier than your team&apos;s <span className="outline-red">utility</span> at 1v5.
          </p>
          <p style={{ color: "var(--muted)" }}>Add a guide, wallpaper or bit of desk gear and it&apos;ll show up here.</p>
          <Button
            arrow
            onClick={() => {
              close();
              goToShop();
            }}
          >
            Shop Digital Products
          </Button>
        </div>
      ) : (
        <>
          {totals.requiresShipping && (
            <p className={styles.ship}>
              {toFreeShipping > 0 ? (
                <>
                  Add <span className="gold">{formatPrice(toFreeShipping)}</span> more gear for free UK shipping.
                </>
              ) : (
                <>Free UK shipping unlocked. GG.</>
              )}
            </p>
          )}
          <ul className={styles.lines}>
            {totals.lines.map((line) => (
              <CartLineItem key={line.product.id + (line.variantId ?? "")} line={line} compact />
            ))}
          </ul>
        </>
      )}
    </Sheet>
  );
}
