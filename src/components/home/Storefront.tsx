"use client";
import Image from "next/image";
import type { Product, Review } from "@/lib/types";
import { useStoreUI } from "@/components/store/StoreUI";
import { useCurrency } from "@/components/store/CurrencyProvider";
import { ProductCard } from "@/components/product/ProductCard";
import { CenteredHero } from "./CenteredHero";
import { ReviewShowcase } from "@/components/reviews/ReviewShowcase";
import { ContactForm } from "./ContactForm";
type Art = { src: string; title: string; original: string };

/** Help section questions: [question, answer]. Edit freely. */
const faqs: [string, string][] = [
  ["What do I actually get when I buy from Peakform?", "Depending on what you choose, you’ll get access to practical Valorant guides, training resources, artwork or gaming-focused products designed around helping you improve your setup and your game. Every product page clearly explains exactly what’s included before you buy."],
  ["Is Peakform suitable for beginners?", "Absolutely. You don’t need to be Diamond, Ascendant or secretly pretending you’re Radiant. Our content is designed to be useful whether you’re learning the fundamentals or trying to break through a rank you’ve been stuck in for months."],
  ["Will your training actually help me rank up?", "We can’t promise you’ll wake up Radiant tomorrow — unfortunately we haven’t found the cheat code yet. What we can give you is structured advice, practice methods and resources designed to help you improve the parts of your game that are actually within your control."],
  ["Do I get instant access to digital products?", "For digital guides and training resources, access is provided after your purchase is completed. You won’t need to wait for something to arrive in the post before you can start improving."],
  ["Can I use the guides at any Valorant rank?", "Yes. The fundamentals behind aim, positioning, decision-making, consistency and good practice habits apply across the ranked ladder. Some advice will become more advanced as you improve, but you don’t need to be a high-ranked player to get started."],
  ["What makes Peakform different from free Valorant advice online?", "There’s already an endless amount of Valorant content online. The problem is knowing what’s actually useful. Peakform is built around keeping things focused, practical and easy to apply rather than making you sit through 40 minutes of filler to find one useful tip."],
  ["Do you sell physical products as well as training content?", "Yes. Peakform isn’t only about improving your gameplay. The store also features gaming-inspired artwork and everyday gear, so you can upgrade the setup as well as the player sitting in front of it."],
  ["What if I need help with an order?", "If something isn’t right with your order or you’re unsure about a product, get in touch with us and we’ll help you sort it. No support ticket maze. No boss battle before you reach a human."],
  ["Can I return an item?", "Physical products are covered by our returns policy. Digital products, including the Climb Bundle and wallpapers, are non-refundable once your download or access has started — you’ll confirm this at checkout. If a digital file is faulty or not as described, we’ll fix it, replace it or refund you."],
  ["Is Peakform affiliated with Riot Games or Valorant?", "No. Peakform is an independent gaming brand and is not affiliated with Riot Games. Valorant and related trademarks belong to Riot Games. We respect Riot Games and its community, and we aim to ensure our products and content follow their policies, terms and intellectual property guidelines."],
];
export function Storefront({
  products,
  reviews,
  gallery,
}: {
  products: Product[];
  reviews: Review[];
  gallery: Art[];
}) {
  const { openProduct } = useStoreUI();
  const { formatPrice, note } = useCurrency();
  return (
    <>
      <CenteredHero />
      <ReviewShowcase products={products} reviews={reviews} />
      <section id="shop" className="four-shop page-pad has-art">
        <div className="section-art section-art--arena" aria-hidden="true">
          <Image src="/images/wallpapers/wpu-stadium.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="section-heading">
          <div>
            <p className="eyebrow">The collection</p>
            <h2>Four upgrades. Zero filler.</h2>
            <p>Pick your next advantage. Sadly, a new duo isn’t included.</p>
          </div>
          <a className="subtle-link" href="#help">
            Before you buy ↗
          </a>
        </div>
        <p className="currency-note">{note}</p>
        <div className="four-product-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="store-facts">
          <p>
            <strong>Know what’s included</strong>Open any product for its
            contents and specifications.
          </p>
          <p>
            <strong>Digital + physical</strong>Guides and wallpapers for your
            screen. Cases and coasters for your setup.
          </p>
          <p>
            <strong>Preview, with no charges</strong>Browse and save a bag.
            Payments open when the store launches.
          </p>
        </div>
      </section>
      <section id="about" className="bundle-feature page-pad">
        <div className="bundle-copy">
          <p className="eyebrow">Best seller · The Climb Bundle</p>
          <h2>
            A plan beats
            <br />
            <em>“one more game.”</em>
          </h2>
          <p>
            Build a routine around aim, game sense and honest reviews of your
            own play. Four resources. One place to start.
          </p>
          <ul>
            <li>The Immortal Roadmap</li>
            <li>Aim Foundations</li>
            <li>Game Sense Playbook</li>
            <li>VOD Review Kit</li>
          </ul>
          <button
            className="gold-button"
            onClick={() => openProduct("the-climb-bundle")}
          >
            Explore the bundle · {formatPrice(4999)}{" "}
            <span aria-hidden="true">↗</span>
          </button>
          <p className="muted">
            No promised rank jumps. You bring the practice. We bring the plan.
            <br />
            <span className="policy-inline">Digital product: non-refundable once your download or access starts.</span>
          </p>
        </div>
        <div className="phoenix-art">
          <Image
            src="/images/characters/phoenix.webp"
            alt="Phoenix character artwork"
            width={703}
            height={1800}
            sizes="(max-width:700px) 80vw, 35vw"
          />
        </div>
      </section>
      <section id="collection" className="rank-climb page-pad has-art" aria-labelledby="rank-climb-heading">
        <div className="section-art section-art--summit" aria-hidden="true">
          <Image src="/images/wallpapers/wp-summit.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="rank-climb-copy">
          <p className="eyebrow">Progress you can picture</p>
          <h2 id="rank-climb-heading">From Iron to Immortal.</h2>
          <p>
            Build better habits, review your games and give yourself a clearer route forward.
          </p>
        </div>
        <div className="rank-path rank-path-full" aria-label="Rank progression from Iron to Immortal">
          {[
            ["Iron", "/images/ranks/iron-3.png"],
            ["Bronze", "/images/ranks/bronze-3.png"],
            ["Silver", "/images/ranks/silver-3.png"],
            ["Gold", "/images/ranks/gold-3.png"],
            ["Platinum", "/images/ranks/platinum-3.png"],
            ["Diamond", "/images/ranks/diamond-3.png"],
            ["Ascendant", "/images/ranks/ascendant-3.png"],
            ["Immortal", "/images/ranks/immortal-3.png"],
          ].map(([label, src], index, ranks) => (
            <div className="rank-path-item" key={label}>
              <div className={`rank-step ${label === "Immortal" ? "rank-step-featured" : ""}`}>
                <div className="rank-icon-shell">
                  <Image src={src} alt={`${label} rank icon`} width={180} height={180} />
                </div>
                <span className="rank-label">{label}</span>
              </div>
              {index < ranks.length - 1 && (
                <span className="rank-arrow" aria-hidden="true">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="rank-climb-footer">
          <p>No shortcuts. Just a clearer system for improving.</p>
          <button className="text-button" onClick={() => openProduct("the-climb-bundle")}>
            Explore the Climb Bundle · {formatPrice(4999)} ↗
          </button>
        </div>
      </section>
      <section id="help" className="help-section page-pad has-art">
        <div className="section-art section-art--chamber" aria-hidden="true">
          <Image src="/images/characters/chamber.webp" alt="" width={634} height={1800} sizes="30vw" />
        </div>
        <div>
          <p className="eyebrow">The useful small print, made readable</p>
          <h2>
            Questions? We&apos;ve got you.
            <br />
            <span className="gold">No need to /all chat.</span>
          </h2>
          <p>
            Everything you need to know before you buy, train or upgrade your setup. And no, we still can&apos;t fix
            your instalock duelist.
          </p>
          <p className="muted">
            This is a storefront preview. No payment is collected, and no orders are placed.
          </p>
        </div>
        <div className="help-answers">
          {faqs.map(([q, a], i) => (
            <details key={q} open={i === 0}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
      <section id="contact" className="contact-section page-pad" aria-labelledby="contact-heading">
        <div className="contact-intro">
          <p className="eyebrow">Still got a question?</p>
          <h2 id="contact-heading">
            Need a hand?
            <br />
            <span className="gold">We&apos;re here.</span>
          </h2>
          <p>
            Can&apos;t find what you&apos;re looking for in the FAQs? Send us a message and we&apos;ll do our best to
            help.
          </p>
          <p>
            Whether it&apos;s a question about an order, one of our guides, a product, or something you&apos;re
            unsure about before buying, just get in touch.
          </p>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
