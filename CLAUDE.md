# Peakform — editable website handoff

This is an ordinary, editable Next.js project. Open this directory in Claude Code and read this file first. The current source is authoritative; `docs/archive/HANDOFF-previous.md` describes an obsolete design.

## Run and verify

- Install: `npm ci`
- Development: `npm run dev -- -p 3001`
- Production build: `npm run build`
- Production preview: `npm run start -- -p 3001`
- Fast production preview beside the dev server: `NEXT_DIST_DIR=.next-prod npx next build` then `NEXT_DIST_DIR=.next-prod npx next start -p 3002` (the dev server on 3001 is deliberately slow; judge speed on 3002)
- Type check: `npm run typecheck`
- Content checks: `npm run verify:content`
- Formatting: `npm run format`

Port 3000 may already be occupied by an older session. The latest local preview uses 3001. Avoid running a production build against an active development server using the same `.next` directory.

## Current user preferences

- One page, full-width sections and readable typography.
- Maximum four main navigation links: Shop, Artwork, Our approach, Help.
- Valorant navy `#0F1923`, signal red `#FF4655`, warm bone `#ECE8E1`, champagne gold `#E6CD94`. No neon-green theme.
- Reyna centred in the hero. Headline words surround her and remain readable; slight letter overlap is acceptable. Do not restore the version that hides whole words.
- No decorative serif or italic display type anywhere. Headings use the upright display face; emphasis is gold colour at the same weight, so the tone stays serious and purposeful.
- Premium gold accents, restrained gamer humour, large product images and clear prices.
- Phoenix section must not put decorative text behind its real heading.
- Exactly four sellable products: Climb Bundle £49.99; Phone cases £24.99; Coasters £14.99; Wallpapers £10.99. Each shows a crossed-out "was" price (£79.99 / £39.99 / £23.99 / £17.99) via `compareAtPrice`; these must be genuine prior prices before launch (UK pricing rules).
- All 32 original images are represented in the artwork gallery.

## Where to edit

| Purpose | File |
|---|---|
| Page assembly | `src/app/page.tsx` |
| Main sections, gallery, help | `src/components/home/Storefront.tsx` |
| Centred hero | `src/components/home/CenteredHero.tsx` |
| Editorial review showcase and paged library | `src/components/reviews/ReviewShowcase.tsx` |
| Current hero/review styles | `src/app/hero-reviews.css` |
| Full-width layout and readable typography | `src/app/readability.css` |
| Base tokens and shared styles | `src/app/globals.css` |
| Fonts, providers, metadata | `src/app/layout.tsx` |
| Four-product catalogue | final exported `products` array in `src/lib/data/products.ts` |
| 120 explicit, editable sample reviews | `src/lib/data/reviews.ts` |
| Original image mapping | `src/lib/data/gallery.ts` |
| Product card and image rendering | `src/components/product/ProductCard.tsx`, `ProductMedia.tsx` |
| Product detail panel | `src/components/product/ProductQuickView.tsx` |
| Cart and preview checkout | `src/components/cart/`, `src/components/checkout/CheckoutForm.tsx` |
| Currency selection and formatting | `src/components/store/CurrencyProvider.tsx`, `src/lib/currency.ts` |
| Exchange-rate endpoint | `src/app/api/currency/route.ts` |

CSS import order is globals → readability → hero-reviews. The older `Hero.tsx`, `Hero.module.css`, `FeaturedGuide.tsx`, `ShopSection.tsx`, `RankBand.tsx` and `StorePanels.tsx` are retained but are not mounted on the current homepage. Editing those old files will not update the current design.

## Assets

- Active hero: `public/images/characters/reyna-hero-remastered.png`, 941 × 1672, an AI-assisted edit of the user-selected wallpaper. It is not native 4K. Avoid enlarging beyond its useful resolution.
- Original selected wallpaper remains in `Images/` and `public/images/characters/reyna-hero.jpg`.
- Hero background: `public/images/hero/hero-smoke.webp` (3024 × 1296 purple soul-energy plate, Magnific), static by the user's choice (no animation). Unused video in `public/video/`.
- Phone case full source: `public/images/products/case-contour.webp`, 1400 × 1867.
- Coasters full source: `public/images/products/coaster-set.webp`, 1400 × 1400.
- Product cards explicitly use `variant="full"`; image rendering uses quality 95. Thumbnails are for cart-size previews, not large product cards.
- Original artwork: `Images/`. Browser-safe copies: `public/images/collection/`; mapping is in `gallery.ts`.
- Product images are concept visuals, not evidence of manufactured specifications or testing.

## Refund policy

- Digital products (Climb Bundle, Wallpapers) are non-refundable once download/access starts. This relies on the required consent checkbox in `CheckoutForm.tsx` (UK Consumer Contracts Regulations 2013 reg. 37). Keep it when real payments are connected, and store the consent with the order.
- Faulty or misdescribed digital files must still be fixed, replaced or refunded (Consumer Rights Act 2015). Don't remove that line from the notices.

## Performance rules

- No `backdrop-filter` on full-screen overlays or the sticky nav (it re-blurs the page every frame). Use near-opaque backgrounds.
- Panels slide in 0.28s. Keep large images as WebP (the hero is `reyna-hero-remastered.webp`, 286 KB; the PNG original is kept only as a source).

## Reviews and trust

There are 120 fictional samples: 30 per product, 24 five-star and 6 four-star per product, averaging exactly 4.8. Every title and body is distinct, each has a unique gamer-style handle (no duplicates), and none of them contain disclosure words ("sample"/"example"/"demo"/"fictional") in the visible title/body text. The UI still shows a compact sample disclosure and sample badges (the "Sample" pill, the "Fictional reviews for this store preview" caption, and the reviews FAQ answer). There are no verified-purchase claims or review schema.

The user has twice asked to remove the sample/fictional disclosure and add typos so invented reviews read as genuine. Both times this was declined: presenting fabricated reviews as real customer feedback is illegal in the UK under the Digital Markets, Competition and Consumers Act 2024. What was done instead each time: added real-sounding usernames and varied the writing (tone, length, some casual phrasing) while keeping every disclosure element visible. Keep doing this if asked again — do not remove the disclosure, do not add typos intended to fake authenticity.

Business/trading name, public support email, delivery coverage, final physical-product specifications and returns terms still need confirmation. Do not invent these or add unsupported security, testing or endorsement badges.

## Currency and commerce limitations

- Catalogue amounts are GBP pence. Conversion is for display only.
- Country comes from `x-vercel-ip-country` / `cf-ipcountry` when available; otherwise browser locale supplies a regional guess. The visitor can override currency. Localhost cannot establish actual visitor geography.
- Rates come from Frankfurter, cached for six hours. Failures visibly fall back to GBP. No external IP geolocation service is used.
- Bag and currency choice use localStorage. No sign-in is implemented.
- Checkout is a clearly labelled preview: no payment, order fulfilment, email or download is performed.
- Older payment/storage helper code is present but is not a production integration. Do not assume its existence means checkout is live.

## Verification and remaining maintenance

Run the content checks and production build after changes. Check the hero at desktop and phone widths, product filters, review paging, gallery enlargement, currency changes, bag and keyboard Escape/focus.

During this handoff, `npm audit` reported inherited PostCSS advisories through Next 15 (one high, one moderate). A major Next upgrade was not applied as part of the design task. Plan a compatible dependency update before a public production launch; avoid blindly running `npm audit fix --force`.

The source archive excludes dependencies, build output and private environment files. The project itself remains at `C:\Users\jyron\OneDrive\Documents\Valorant site`.
