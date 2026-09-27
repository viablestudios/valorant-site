# Peakform — Handoff

_Last updated: 27 Sep 2026, ~00:40. Written by the forked session ("FPS gaming e-commerce website (fork)"), which is the session the user chose to continue the build._

> **One builder at a time.** The original chat ("FPS gaming e-commerce website") is idle and should stay that way. Before editing, run ListAgents; if files change on disk unexpectedly, stop and ask the user.
> **Nothing below has been compiled or screenshotted since the last check.** Expect a round of TypeScript and CSS fixes on the first `npm run dev`.

---

## 1. What we're building

A premium **one-page** e-commerce site for **Peakform**, a competitive-FPS brand (Valorant-focused) selling:

- Digital: guides, wallpapers, bundles
- Physical: coasters, phone cases

Stack: **Next.js 15 (App Router) + React 19 + TypeScript 5 + CSS Modules**. No UI library.
Run it with `npm run dev`, then open http://localhost:3000.

## 2. The user's decisions (all binding)

| Topic | Decision |
|---|---|
| Structure | **One page.** Products must be quick to find with minimal scrolling. Product, account, cart and reviews all open as slide-in panels ("Sheets"). No other routes except API. |
| Navigation | Few buttons, user-friendly. Nav links jump to shop tabs or sections. |
| Hero | **Reyna** line-art cut-out with giant text **behind** her ("Play better. / Rank higher."). |
| Signature effect | **Outline glow**: glowing outlined type, glowing character silhouettes, glow-outline cards and buttons on hover. |
| Palette | Valorant red `#FF4655`, navy `#0F1923`, bone `#ECE8E1`, plus **light gold** `#E6CD94`. Tokens are in `src/app/globals.css`. |
| Tone | Looks **badass**; copy has **light, deadpan gamer humour** in microcopy. Core selling copy stays clear. |
| Type | Big Shoulders (display), Instrument Serif italic (gold accents), Hanken Grotesk (body), Geist Mono (labels). |
| Valorant assets | User-supplied art in `/Images`; the user says they have Riot's permission. Use their files; **don't AI-generate agent likenesses.** |
| Images | Use **Magnific** (Freepik MCP `mcp__5457cec7-…`) for generation, upscales and cut-outs. |
| Reviews | 120 sample reviews, all `placeholder: true`, shown with a "Sample" tag, a site note, and **no** review schema markup. Keep them labelled until real reviews exist; fake reviews are illegal in the UK (DMCC Act 2024). |
| Brief copy to keep | Hero headline, supporting line and CTAs "Shop Digital Products" / "Improve Your Rank". Immortal Roadmap subtitle and CTA "View Guide". Benefits: Instant Digital Access, Built for Competitive Players, Practical Not Fluff, Affordable Improvement. Newsletter heading: "Get Better. Stay Updated." |

## 3. Status by file

### ✅ Done before this session (stable)
- **Data**:
  - `lib/types.ts`
  - `lib/data/products.ts`: 8 guides, 3 bundles, 14 wallpapers, 2 coasters, 3 phone cases
  - `lib/data/categories.ts`
  - `lib/data/reviews.ts`: 120 samples
  - `lib/catalog.ts`, `lib/site.ts`, `lib/format.ts`
- **Commerce**: `lib/commerce/`
  - `pricing.ts` does server-side pricing.
  - `payment-provider.ts`, with `providers/mock.ts` and `providers/stripe.ts` (real Stripe Checkout over REST, including webhook signature checks).
  - `orders.ts` is an in-memory store plus `downloadsForOrder(orderId, productIds)`, which expands bundles and the wallpaper vault.
  - `delivery.ts` handles HMAC-signed, expiring download tokens.
- **Auth seam**: `lib/auth/session.ts` supplies the demo customer and demo orders.
- **UI**: `Button`, `Price`, `Stars`, `Reveal`, `SectionHeading`, `GuideCover` (code-drawn covers), `ProductMedia`, `Logo`, `Footer`.
- **From the original session**: `store/StoreUI.tsx` (panel state, `?p=slug` deep links, `goToShop(tab)`, hash to tab via `data-shop-tab`), `ui/Sheet.tsx` (slide-in dialog) and the compact `product/ProductCard.tsx`.

### ✅ Built this session (written, not yet compiled)
| File | What it does |
|---|---|
| `app/layout.tsx` | Now wraps the app in `CartProvider` then `StoreUIProvider`. Navbar and CartDrawer live inside both. |
| `cart/CartProvider.tsx` | Adds `step` (`cart`, `details`, `success`), `setStep`, and `checkout()`, which opens the drawer at the form (used by Buy Now). |
| `layout/Navbar.tsx` + css | One-page nav: Shop, Guides, Wallpapers and Gear call `goToShop(tab)`; Reviews scrolls to `#reviews`. The account icon calls `openAccount()`. Mobile menu included. |
| `cart/CartDrawer.tsx` + css | Built on `Sheet`. Steps: cart, `CheckoutForm`, `OrderSuccess`. On load it reads `/?order=ID` to reopen at the success step, then clears the cart and the URL params. Includes the empty-state joke. |
| `cart/CartLineItem.tsx` + css | Thumbnail and name now open the quick view instead of a product page. |
| `checkout/CheckoutForm.tsx` | Contact details, shipping (physical items only), a payment note ("Demo mode: approved instantly"), and the **UK 14-day cancellation waiver checkbox** for digital items. Posts to `/api/checkout` and redirects to the returned `url`. |
| `checkout/OrderSuccess.tsx` | Fetches `/api/orders/[id]` and shows "GG. You're in.", download buttons (`variant="gold"`, `download`) and a shipping note. |
| `checkout/Checkout.module.css` | Shared styles for both checkout components. |
| `ui/Button.tsx` | Renders a plain `<a>` for `download`, `#hash` and `/api/` links. |
| `product/ProductQuickView.tsx` + css | Replaces product pages. A Sheet (880px wide) with media, badges, name, tagline, sample rating (opens the reviews sheet), price, short description, phone-model select, quantity (physical), **Buy Now** plus Add to cart, trust row, what's included or bundle contents, who it's for, about, specs, FAQ (product FAQs plus generic ones, including "Will this make me Radiant overnight?"), 2 reviews and related products. |
| `product/FAQ.tsx` + css | Accessible `<details>` accordion. |
| `reviews/ReviewCard.tsx` + css | Stars, "Sample" tag, title, body, @handle, and a rank climb in gold. |
| `reviews/ReviewsMarquee.tsx` + css | `#reviews`. Two opposing marquee rows that pause on hover (static under reduced motion), a gold average score, a "Read all" button calling `openReviews()`, and a sample disclaimer line. Props: `reviews`, `productNames` (slug to name). |
| `home/ShopSection.tsx` + css | `#shop`. Sticky tab bar at `top: 72px`: Best sellers / Guides / Wallpapers / Bundles / Gear, each with a count. Chips per tab (Guides: Rank / Aim / Training; Wallpapers: Desktop / Mobile / Ultrawide / 4K / Minimal / Cyber / Competitive / Abstract; Gear: Coasters / Phone cases). A search box on ≥700px. A humour line per tab. Grid is 2, 3 or 5 columns. Includes the "Whiffed." empty state. |
| `home/FeaturedGuide.tsx` + css | Immortal Roadmap panel: Phoenix cut-out right-aligned, huge gold outline "IMMORTAL" behind him, 7 feature chips, price, and "View Guide" opening the quick view. |
| `home/RankBand.tsx` + css | `#improve`. "Queueing more isn't a strategy. It's a hobby." Five numbered steps (Aim → Mechanics → Game Sense → Consistency → Mindset), each linking to a product, plus the four brief benefits with jokes. |
| `home/RoleStrip.tsx` + css | Four agent tiles, each opening its starter product: Duelist Reyna → Aim Foundations, Initiator Skye → Game Sense, Controller Astra → Ranked Mindset, Sentinel Vyse → Sensitivity Lab. |
| `home/Hero.tsx` + css | Reyna hero (written in the previous handoff window). **Still needs a screenshot check.** |

### ⏳ Not built yet (next up, in this order)
1. **`reviews/ReviewsSheet.tsx`**: all 120 reviews in a Sheet, opened by `openReviews(slug?)`. Filter by product (preselect `panel.slug`) and by rating, and keep the "Sample" tags. The component was about to be written when the session was interrupted.
2. **`home/Newsletter.tsx`**: "Get Better. Stay Updated." Email form posting to `/api/newsletter` with an inline success message. Quip: "No spam. We only spam utility." `agents/squad.webp` could serve as a faded background.
3. **`account/AccountSheet.tsx`**: opened by `openAccount()`. Tabs for Library (downloads via `downloadsForOrder`), Orders and Settings (form, demo). Data comes from `getCurrentUser()` / `getOrdersForUser()` on the server and is passed down as props. Label it a demo account.
4. **`app/page.tsx`**: currently **only `<Hero />`**. It should become:
   ```tsx
   const products = await getAllProducts(); const reviews = await getReviews();
   const user = await getCurrentUser(); const orders = user ? await getOrdersForUser(user.id) : [];
   <Hero /> <ShopSection products={products} /> <FeaturedGuide /> <RankBand /> <RoleStrip />
   <ReviewsMarquee reviews={reviews} productNames={...} /> <Newsletter />
   <ProductQuickView products={products} reviews={reviews} /> <ReviewsSheet .../> <AccountSheet user orders />
   + ItemList JSON-LD of products (no review/rating schema)
   ```
5. **API routes** (`src/app/api/…`):
   - `checkout/route.ts` (POST `{lines, customer}`): run `priceCart`, validate the email and at least one line, `createOrder`, then call `getPaymentProvider().createCheckoutSession({successUrl: origin + "/", cancelUrl: origin + "/?checkout=cancelled"})`. **With the mock provider, call `markPaid` immediately.** Return `{url}`.
   - `orders/[id]/route.ts` (GET): return `{id, email, total, requiresShipping, items, downloads}` for paid orders only. Production needs a session/ownership check; note this in a comment.
   - `webhooks/payments/route.ts` (POST): raw body, `parseWebhook`, `markPaid`, then fulfilment (email TODO).
   - `downloads/[token]/route.ts` (GET): `verifyDownloadToken`, then return a placeholder file with `Content-Disposition`. Production redirects to a signed storage URL.
   - `newsletter/route.ts` (POST): validate the email and return `{ok}` (provider TODO).
6. `app/sitemap.ts`, `app/robots.ts`, and `app/not-found.tsx` (joke: "Whiffed. This page doesn't exist.").
7. **Footer** (`layout/Footer.tsx`) still links to old routes (`/shop`, `/products/...`, `/account`, `/reviews`, `/cart`). Convert them to `#shop`, `#guides` and so on, or to buttons calling `goToShop` / `openAccount`. This needs `"use client"` or a small client link component.
8. **Cleanup**: `product/ProductGrid.tsx` is unused, so delete it. `characters/chamber.webp` is unused. Check `ui/Reveal.tsx`'s `@ts-expect-error` still has an error to suppress.
9. **Verify**:
   - Run `npm run dev`, fix compile errors, then take desktop screenshots with headless Chrome (command below) and mobile ones in the browser pane.
   - Check the hero dark-rectangle bug is gone.
   - Walk the full flow: add to cart → checkout → success → download.
   - Check keyboard focus, reduced motion and 375px width.
   - Run `npm run build`.
10. **`README.md`**: setup, adding products, going live with Stripe, file storage and delivery, swapping reviews for real ones, replacing character art.

## 4. Key contracts (for wiring)
- `useStoreUI()`: `{ panel, openProduct(slug), openAccount(), openReviews(slug?), closePanel(), shopTab, goToShop(tab?) }`. `panel` is one of `{type:"product",slug}`, `{type:"account"}`, `{type:"reviews",slug?}` or `null`.
- `useCart()`: `{ lines, totals, count, isOpen, open, close, step, setStep, checkout, add(product, variantId?, qty?), setQuantity, remove, clear, has(id) }`.
- `Sheet` props: `open, onClose, label, width?, header?, footer?, children`.
- Shop tab ids: `bestsellers | guides | wallpapers | bundles | gear`. Nav hashes `#guides` and friends map to tabs.

## 5. Assets
- `public/images/characters/reyna.webp`: hero (Magnific 4× upscale + cut-out, 1457×1800; hair runs off the right edge, masked in CSS).
- `public/images/characters/phoenix.webp`: Roadmap band (703×1800).
- `public/images/characters/chamber.webp`: unused.
- `public/images/agents/*.webp`: user posters at 736px. Tiles use reyna, skye, astra and vyse.
- `public/images/wallpapers/`: 14 original Magnific wallpapers plus `-thumb` versions. 4K-labelled products need 4K masters (Magnific 2×) before launch.
- `public/images/products/`: coaster and case product shots (Magnific).
- `scripts/optimize-images.mjs <rawDir>` regenerates the WebPs.

## 6. Environment gotchas
- Use TypeScript **5.x** (TS 7 breaks the Next 15 config loader). The config file is `next.config.mjs`.
- The font import is `Big_Shoulders` with `axes: ["opsz"]`.
- The original session's dev server may still hold port 3000. If `preview_start` fails, stop it or run on `-p 3001`. `.claude/launch.json` defines `peakform` (npm run dev, port 3000).
- Desktop screenshots: `"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --hide-scrollbars --virtual-time-budget=6000 --window-size=1440,900 --screenshot=out.png http://localhost:3000`. The in-app browser pane is narrow (~520px).
- The folder is in OneDrive, so harmless `.next` cache rename warnings appear.
- Heredocs containing apostrophes broke once in Bash. Prefer the Write tool for TSX files.

## 7. Copy bank (humour)
- "No aim assist. Just assistance." (hero eyebrow)
- "Emptier than your team's utility at 1v5." (empty cart)
- "GG. You're in." / "Now go warm up. Seriously." (order success)
- "Queueing more isn't a strategy. It's a hobby." (rank band)
- "We cut every chapter that explains what a crosshair is." (benefits)
- "Less than a battle pass. More useful than a skin." (benefits)
- Shop tab lines, e.g. "Won't fix your aim. Will fix your desktop."
- "Nothing here. Whiffed." (empty search)
- "Smokes win rounds. Late smokes win memes." (Controller tile)
- "Players who stopped blaming the team." (reviews heading)
- "No spam. We only spam utility." (newsletter, to use)
- "Side effects include a sudden urge to warm up before queueing." (Roadmap band)
