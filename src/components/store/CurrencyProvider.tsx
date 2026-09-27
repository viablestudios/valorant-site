"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  convertedPrice,
  countryFromLocale,
  currencyForCountry,
} from "@/lib/currency";
type Value = {
  currency: string;
  setCurrency: (c: string) => void;
  formatPrice: (p: number) => string;
  rates: Record<string, number>;
  note: string;
};
const Context = createContext<Value>({
  currency: "GBP",
  setCurrency: () => {},
  formatPrice: (p) => convertedPrice(p, "GBP", 1),
  rates: { GBP: 1 },
  note: "Base prices in GBP.",
});
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCode] = useState("GBP");
  const [rates, setRates] = useState<Record<string, number>>({ GBP: 1 });
  const [locale, setLocale] = useState("en-GB");
  const [note, setNote] = useState("Loading local prices…");
  useEffect(() => {
    let active = true;
    fetch("/api/currency")
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        const lang = navigator.language || "en-GB";
        setLocale(lang);
        setRates(data.rates);
        let saved: string | null = null;
        try {
          saved = localStorage.getItem("peakform-currency");
        } catch {}
        const preferred =
          saved || currencyForCountry(data.country || countryFromLocale(lang));
        setCode(data.rates[preferred] ? preferred : "GBP");
        setNote(
          data.unavailable
            ? "Exchange rates unavailable. Showing original GBP prices."
            : !data.rates[preferred]
              ? "Local currency unavailable. Showing GBP."
              : "Indicative conversion · reference rates " +
                data.date +
                " · base prices GBP.",
        );
      })
      .catch(() =>
        setNote("Exchange rates unavailable. Showing original GBP prices."),
      );
    return () => {
      active = false;
    };
  }, []);
  const setCurrency = (c: string) => {
    if (!rates[c]) return;
    setCode(c);
    try {
      localStorage.setItem("peakform-currency", c);
    } catch {}
  };
  return (
    <Context.Provider
      value={{
        currency,
        setCurrency,
        rates,
        note,
        formatPrice: (p) =>
          convertedPrice(p, currency, rates[currency] || 1, locale),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useCurrency = () => useContext(Context);
export function CurrencySelector() {
  const { currency, setCurrency, rates } = useCurrency();
  return (
    <label className="currency-control">
      <span>Currency</span>
      <select
        aria-label="Display currency"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        {Object.keys(rates)
          .sort()
          .map((c) => (
            <option key={c}>{c}</option>
          ))}
      </select>
    </label>
  );
}
