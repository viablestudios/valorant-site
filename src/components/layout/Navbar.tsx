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
          Bag <span>{count}</span>
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
