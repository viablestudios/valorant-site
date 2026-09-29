"use client";
import Image from "next/image";
import type { Product, Review } from "@/lib/types";
import { useStoreUI } from "@/components/store/StoreUI";
import { useCurrency } from "@/components/store/CurrencyProvider";
import { ProductCard } from "@/components/product/ProductCard";
import { CenteredHero } from "./CenteredHero";
import { ReviewShowcase } from "@/components/reviews/ReviewShowcase";
import { ContactForm } from "./ContactForm";
import { SensCheck } from "./SensCheck";
import { SkillSelect } from "./SkillSelect";
import { HabitFlip } from "./HabitFlip";
import { RankFinder } from "./RankFinder";
import { HelpSearch, type Faq } from "./HelpSearch";
type Art = { src: string; title: string; original: string };

/** Help section questions, each tagged with a topic for the filter. Edit freely. */
const faqs: Faq[] = [
  { topic: "Buying", q: "What do I actually get when I buy from Peakform?", a: "Depending on what you choose, you’ll get access to practical Valorant guides, training resources, artwork or gaming-focused products designed around helping you improve your setup and your game. Every product page clearly explains exactly what’s included before you buy." },
  { topic: "Training", q: "Is Peakform suitable for beginners?", a: "Absolutely. You don’t need to be Diamond, Ascendant or secretly pretending you’re Radiant. Our content is designed to be useful whether you’re learning the fundamentals or trying to break through a rank you’ve been stuck in for months." },
  { topic: "Training", q: "Will your training actually help me rank up?", a: "We can’t promise you’ll wake up Radiant tomorrow — unfortunately we haven’t found the cheat code yet. What we can give you is structured advice, practice methods and resources designed to help you improve the parts of your game that are actually within your control." },
  { topic: "Buying", q: "Do I get instant access to digital products?", a: "For digital guides and training resources, access is provided after your purchase is completed. You won’t need to wait for something to arrive in the post before you can start improving." },
  { topic: "Training", q: "Can I use the guides at any Valorant rank?", a: "Yes. The fundamentals behind aim, positioning, decision-making, consistency and good practice habits apply across the ranked ladder. Some advice will become more advanced as you improve, but you don’t need to be a high-ranked player to get started." },
  { topic: "About Peakform", q: "What makes Peakform different from free Valorant advice online?", a: "There’s already an endless amount of Valorant content online. The problem is knowing what’s actually useful. Peakform is built around keeping things focused, practical and easy to apply rather than making you sit through 40 minutes of filler to find one useful tip." },
  { topic: "Buying", q: "Do you sell physical products as well as training content?", a: "Yes. Peakform isn’t only about improving your gameplay. The store also features gaming-inspired artwork and everyday gear, so you can upgrade the setup as well as the player sitting in front of it." },
  { topic: "Orders and refunds", q: "What if I need help with an order?", a: "If something isn’t right with your order or you’re unsure about a product, get in touch with us and we’ll help you sort it. No support ticket maze. No boss battle before you reach a human." },
  { topic: "Orders and refunds", q: "Can I return an item?", a: "Physical products are covered by our returns policy. Digital products, including the Climb Bundle and wallpapers, are non-refundable once your download or access has started — you’ll confirm this at checkout. If a digital file is faulty or not as described, we’ll fix it, replace it or refund you." },
  { topic: "About Peakform", q: "Is Peakform affiliated with Riot Games or Valorant?", a: "No. Peakform is an independent gaming brand and is not affiliated with Riot Games. Valorant and related trademarks belong to Riot Games. We respect Riot Games and its community, and we aim to ensure our products and content follow their policies, terms and intellectual property guidelines." },
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
            <ProductCard key={p.id} product={p} reviews={reviews.filter((r) => r.productSlug === p.slug)} />
          ))}
        </div>
      </section>
      <SensCheck />
      <section id="mindset" className="mindset-section page-pad" aria-labelledby="mindset-heading">
        <HabitFlip
          intro={
            <div className="habit-intro">
              <h2 id="mindset-heading">
                Queue. Tilt. Blame. <span className="outline-red">Repeat.</span>
              </h2>
              <p>Sound familiar? Tap a habit to see what to do instead.</p>
            </div>
          }
        />
        <div className="mindset-callout">
          <div className="mindset-callout-art" aria-hidden="true">
            <Image src="/images/wallpapers/wp-redline.webp" alt="" fill sizes="(max-width: 1180px) 100vw, 1120px" />
          </div>
          <h3>
            Less tilt.
            <br />
            <span className="gold">More progress.</span>
          </h3>
          <div className="mindset-callout-body">
            <p>
              Peakform isn&apos;t about turning you into Radiant overnight. It&apos;s about building better habits,
              making smarter decisions and giving you a proper way to improve instead of just queuing again and hoping
              for the best.
            </p>
            <button className="gold-button" onClick={() => openProduct("the-climb-bundle")}>
              Break the cycle <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      </section>
      <section id="skills" className="skills-section page-pad" aria-labelledby="skills-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The training side of Peakform</p>
            <h2 id="skills-heading">What you&apos;ll actually improve.</h2>
            <p>
              No vague &ldquo;become a better player&rdquo; promises. Pick the one that&apos;s costing you the most
              rounds and we&apos;ll show you where to start.
            </p>
          </div>
        </div>
        <SkillSelect />
        <div className="skills-footer">
          <p>Small improvements. Better habits. More rounds won.</p>
          <button className="text-button" onClick={() => openProduct("the-climb-bundle")}>
            Explore the Climb Bundle · {formatPrice(4999)} ↗
          </button>
        </div>
      </section>
      <section id="collection" className="rank-climb page-pad has-art" aria-labelledby="rank-climb-heading">
        <div className="section-art section-art--summit" aria-hidden="true">
          <Image src="/images/wallpapers/wp-summit.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="rank-climb-copy">
          <h2 id="rank-climb-heading">Where are you stuck?</h2>
          <p>Pick your rank. We&apos;ll tell you what usually holds players back there, and what to work on next.</p>
        </div>
        <RankFinder />
      </section>
      <section id="help" className="help-section page-pad has-art">
        <div className="section-art section-art--chamber" aria-hidden="true">
          <Image src="/images/characters/chamber.webp" alt="" width={634} height={1800} sizes="30vw" />
        </div>
        <div>
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
        <HelpSearch faqs={faqs} />
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
        <ContactForm products={products} />
      </section>
    </>
  );
}
