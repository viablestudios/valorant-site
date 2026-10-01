"use client";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { useCurrency } from "@/components/store/CurrencyProvider";

/**
 * Preview checkout. For digital items the customer must tick the consent box
 * before paying: under UK law (Consumer Contracts Regulations 2013) this is what
 * removes the 14-day cancellation right, making digital products non-refundable.
 * Faulty or misdescribed files must still be fixed, replaced or refunded.
 */
export function CheckoutForm() {
  const { formatPrice } = useCurrency();
  const { totals, setStep } = useCart();
  const hasDigital = totals.lines.some((l) => l.product.type === "digital");
  const hasClimb = totals.lines.some((l) => l.product.slug === "the-climb-bundle");
  const [agreed, setAgreed] = useState(false);
  const [tried, setTried] = useState(false);
  const ready = !hasDigital || agreed;

  return (
    <div className="demo-panel">
      <p className="eyebrow">STOREFRONT PREVIEW</p>
      <h2 className="h2">NICE LOADOUT.</h2>
      <p>
        Your basket totals {formatPrice(totals.total)}. Payments and downloads are not available in this preview. Your
        basket stays saved on this device.
      </p>

      {hasClimb && (
        <p className="muted">
          The Climb Bundle is an online course, not a download. After payment you get an activation key by email that
          links the course to your Peakform account. You can use it on up to 3 of your own devices, and you can replace
          up to 2 of them in any 30 days.
        </p>
      )}

      {hasDigital && (
        <label className="refund-consent">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <span>
            I want immediate access to my digital products and understand that once my download or access starts,
            they are <strong>non-refundable</strong> and I lose my 14-day right to cancel. Faulty items are still
            covered.
          </span>
        </label>
      )}

      <Button onClick={() => setTried(true)} disabled={!ready}>
        Continue to payment · {formatPrice(totals.total)}
      </Button>
      {tried && <p className="muted">Payments open at launch. Nothing has been charged.</p>}
      <Button onClick={() => setStep("cart")} variant="outline">
        Back to cart
      </Button>
    </div>
  );
}
