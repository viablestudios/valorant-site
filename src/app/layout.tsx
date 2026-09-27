import type { Metadata, Viewport } from "next";
import { Barlow, Hanken_Grotesk, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { StoreUIProvider } from "@/components/store/StoreUI";
import { site } from "@/lib/site";
import "./globals.css";
import "./readability.css";
import "./hero-reviews.css";
import {CurrencyProvider} from "@/components/store/CurrencyProvider";

const display = Barlow({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--ff-display" });
const body = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--ff-body" });
const mono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Play Better. Rank Higher.`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Play Better. Rank Higher.`,
    description: site.description,
    images: ["/images/wallpapers/wp-reticle.webp"],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a0f14",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
  };

  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <CurrencyProvider><CartProvider>
          <StoreUIProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          </StoreUIProvider>
        </CartProvider></CurrencyProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
