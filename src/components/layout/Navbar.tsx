"use client";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Logo } from "./Logo";
import { CurrencySelector } from "@/components/store/CurrencyProvider";
const links = [
  ["shop", "Shop"],
  ["collection", "Artwork"],
  ["about", "Our approach"],
  ["help", "Help"],
];
export function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const { open, count } = useCart();
  return (
    <header className="site-nav">
      <Logo />
      <nav
        aria-label="Main"
        className={expanded ? "main-links expanded" : "main-links"}
      >
        {links.map(([id, label]) => (
          <a key={id} href={"#" + id} onClick={() => setExpanded(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav-tools">
        <CurrencySelector />
        <button
          className="cart-trigger"
          onClick={open}
          aria-label={"Open cart, " + count + " items"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <rect x="5" y="8" width="14" height="13" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 8v2.2a3 3 0 0 0 6 0V8" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8.5 14.5h7" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span>{count}</span>
        </button>
        <button
          className="menu-trigger"
          aria-label={expanded ? "Close menu" : "Open menu"}
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
