import type { Money } from "@/lib/types";

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

export const formatPrice = (pence: Money) => gbp.format(pence / 100);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const savingsPercent = (price: Money, compareAt?: Money) =>
  compareAt && compareAt > price ? Math.round(((compareAt - price) / compareAt) * 100) : 0;
