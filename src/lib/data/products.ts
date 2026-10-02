import type { Product, WallpaperDevice, WallpaperStyle } from "@/lib/types";

/**
 * The catalogue. To add a product, add an object to the relevant list below —
 * it automatically appears in the shop, category filters, sitemap and search.
 * Prices are in pence (999 = £9.99).
 */

const guides: Product[] = [
  {
    id: "prd_immortal_roadmap",
    slug: "the-immortal-roadmap",
    name: "The Immortal Roadmap",
    tagline:
      "A structured system for improving your mechanics, game sense and consistency.",
    shortDescription:
      "An actionable competitive FPS improvement system designed to help you identify weaknesses, structure your practice and build better habits.",
    longDescription: [
      "Most players try to climb by queueing more. The Immortal Roadmap replaces that with a plan: a clear picture of where your games are actually being lost, a practice structure that fits around school or work, and a way to measure whether it's working.",
      "It's split into four phases — Diagnose, Rebuild, Apply and Sustain. Each phase has its own drills, match goals and checkpoints, so you always know what to work on next and when you're ready to move on.",
      "Everything is written for real ranked games, not theory. You'll find routines you can run in 20 minutes, checklists to use between rounds, and a tracker that turns a bad session into something you can learn from.",
    ],
    type: "digital",
    category: "rank-guides",
    price: 999,
    compareAtPrice: 1499,
    media: [
      {
        kind: "cover",
        cover: {
          title: "The Immortal Roadmap",
          kicker: "Rank system",
          edition: "Vol. 01",
          tone: "red",
          pattern: "peak",
        },
      },
    ],
    badges: ["bestseller"],
    featured: true,
    includes: [
      "Complete improvement roadmap",
      "Daily aim routine",
      "Weekly training schedule",
      "Match preparation checklist",
      "Mistake-analysis framework",
      "Mental reset system",
      "Progress tracker",
      "Downloadable PDF",
    ],
    forWho: [
      "Players stuck in the same rank for a whole act or longer",
      "Anyone who grinds a lot of games but doesn't see improvement",
      "Players who want structure without paying for weekly coaching",
    ],
    specs: [
      { label: "Format", value: "PDF + printable tracker" },
      { label: "Length", value: "34 pages" },
      { label: "Time to complete", value: "6–8 weeks" },
      { label: "Daily commitment", value: "20–45 minutes" },
      { label: "Delivery", value: "Instant download" },
      { label: "Updates", value: "Free, for life" },
    ],
    faq: [
      {
        q: "Which games does it work for?",
        a: "It's written for tactical shooters with round-based ranked modes. The aim drills and mindset sections apply to almost any competitive FPS.",
      },
      {
        q: "I'm in a low rank. Is this too advanced?",
        a: "No. Phase one starts with fundamentals and the tracker adapts to where you are. Players from the lowest ranks up to the top 1% use the same structure.",
      },
      {
        q: "How do I get it after buying?",
        a: "You'll get a download link on the confirmation page and by email straight away. It's also saved in your account library.",
      },
      {
        q: "Do I get future updates?",
        a: "Yes. When we update the roadmap for a new season, the new version appears in your library at no extra cost.",
      },
    ],
    related: [
      "aim-foundations",
      "game-sense-playbook",
      "the-climb-bundle",
    ],
    files: [
      {
        name: "The Immortal Roadmap",
        format: "PDF",
        sizeLabel: "18 MB",
        storageKey: "guides/immortal-roadmap-v1.pdf",
      },
      {
        name: "Progress Tracker",
        format: "XLSX",
        sizeLabel: "240 KB",
        storageKey: "guides/immortal-roadmap-tracker.xlsx",
      },
    ],
  },
  {
    id: "prd_aim_foundations",
    slug: "aim-foundations",
    name: "Aim Foundations",
    tagline:
      "A 30-day aim routine that builds crosshair placement before speed.",
    shortDescription:
      "Thirty days of short, structured aim sessions that fix the habits behind missed first shots.",
    longDescription: [
      "Aim Foundations is a day-by-day routine built around the three things that decide most duels: where your crosshair already is, how cleanly you stop, and how you react under pressure.",
      "Each day takes 15–25 minutes across an aim trainer and your game's practice range, with a clear target for the session and a note on what to focus on.",
    ],
    type: "digital",
    category: "aim-training",
    price: 799,
    media: [
      {
        kind: "cover",
        cover: {
          title: "Aim Foundations",
          kicker: "30-day routine",
          edition: "Vol. 02",
          tone: "bone",
          pattern: "rings",
        },
      },
    ],
    badges: ["bestseller"],
    featured: true,
    includes: [
      "30 daily sessions",
      "Warm-up routine",
      "Crosshair placement drills",
      "Micro-adjustment drills",
      "Benchmark tests",
      "Printable calendar",
      "Downloadable PDF",
    ],
    forWho: [
      "Players who lose duels they should win",
      "Anyone new to aim trainers",
      "Players returning after a break",
    ],
    specs: [
      { label: "Format", value: "PDF + calendar" },
      { label: "Length", value: "26 pages" },
      { label: "Duration", value: "30 days" },
      { label: "Daily commitment", value: "15–25 minutes" },
      { label: "Delivery", value: "Instant download" },
    ],
    faq: [
      {
        q: "Do I need a paid aim trainer?",
        a: "No. Every drill has a free-range alternative, and free aim trainer scenarios are listed where they help.",
      },
      {
        q: "What if I miss a day?",
        a: "Pick up where you left off. The routine is sequenced, not dated.",
      },
    ],
    related: [
      "crosshair-sensitivity-lab",
      "the-immortal-roadmap",
      "the-climb-bundle",
    ],
    files: [
      {
        name: "Aim Foundations",
        format: "PDF",
        sizeLabel: "12 MB",
        storageKey: "guides/aim-foundations-v1.pdf",
      },
    ],
  },
  {
    id: "prd_crosshair_lab",
    slug: "crosshair-sensitivity-lab",
    name: "Crosshair & Sensitivity Lab",
    tagline: "Find a crosshair and sensitivity you'll actually stick with.",
    shortDescription:
      "A step-by-step method for choosing your sensitivity, plus 40 tested crosshair setups.",
    longDescription: [
      "Constantly changing your settings resets your muscle memory. The Lab walks you through a one-off process to find a sensitivity that suits your arm, desk and playstyle, then locks it in.",
      "It also includes 40 crosshair setups sorted by style — static, minimal, high-visibility — with notes on when each one helps.",
    ],
    type: "digital",
    category: "aim-training",
    price: 499,
    media: [
      {
        kind: "cover",
        cover: {
          title: "Crosshair & Sensitivity Lab",
          kicker: "Settings pack",
          edition: "Vol. 03",
          tone: "gold",
          pattern: "grid",
        },
      },
    ],
    badges: ["new"],
    includes: [
      "Sensitivity-finding method",
      "eDPI conversion sheet",
      "40 crosshair setups",
      "Monitor & display checklist",
      "Downloadable PDF",
    ],
    forWho: [
      "Players who change settings every week",
      "Anyone switching between shooters",
      "New PC players",
    ],
    specs: [
      { label: "Format", value: "PDF + conversion sheet" },
      { label: "Length", value: "18 pages" },
      { label: "Delivery", value: "Instant download" },
    ],
    related: ["aim-foundations", "pre-match-checklists", "the-climb-bundle"],
    files: [
      {
        name: "Crosshair & Sensitivity Lab",
        format: "PDF",
        sizeLabel: "6 MB",
        storageKey: "guides/crosshair-lab-v1.pdf",
      },
      {
        name: "Crosshair Codes",
        format: "TXT",
        sizeLabel: "4 KB",
        storageKey: "guides/crosshair-codes.txt",
      },
    ],
  },
  {
    id: "prd_game_sense",
    slug: "game-sense-playbook",
    name: "Game Sense Playbook",
    tagline: "Know where they'll be before you see them.",
    shortDescription:
      "Timings, information and decision-making — the side of the game aim can't fix.",
    longDescription: [
      "Game sense feels like instinct, but it's mostly pattern recognition you can learn. The Playbook breaks it into information gathering, timing reads, trading and mid-round decisions.",
      "Each chapter ends with a short in-match exercise, so you practise the skill in ranked instead of just reading about it.",
    ],
    type: "digital",
    category: "training-guides",
    price: 899,
    media: [
      {
        kind: "cover",
        cover: {
          title: "Game Sense Playbook",
          kicker: "Decision making",
          edition: "Vol. 04",
          tone: "gold",
          pattern: "stack",
        },
      },
    ],
    featured: true,
    includes: [
      "Information & sound reads",
      "Timing fundamentals",
      "Trading & spacing",
      "Mid-round decision trees",
      "10 in-match exercises",
      "Downloadable PDF",
    ],
    forWho: [
      "Mechanically strong players who still lose rounds",
      "Players who die first too often",
      "Anyone wanting to IGL",
    ],
    specs: [
      { label: "Format", value: "PDF" },
      { label: "Length", value: "30 pages" },
      { label: "Delivery", value: "Instant download" },
    ],
    related: ["the-immortal-roadmap", "the-climb-bundle"],
    files: [
      {
        name: "Game Sense Playbook",
        format: "PDF",
        sizeLabel: "15 MB",
        storageKey: "guides/game-sense-v1.pdf",
      },
    ],
  },
  {
    id: "prd_ranked_mindset",
    slug: "the-ranked-mindset",
    name: "The Ranked Mindset",
    tagline: "Stop tilting. Start compounding.",
    shortDescription:
      "An ebook on tilt, confidence and staying consistent across long ranked sessions.",
    longDescription: [
      "The difference between a good session and a bad one is usually what happens after the first lost round. The Ranked Mindset covers tilt, confidence, comms under pressure and knowing when to stop queueing.",
    ],
    type: "digital",
    category: "rank-guides",
    price: 599,
    media: [
      {
        kind: "cover",
        cover: {
          title: "The Ranked Mindset",
          kicker: "Ebook",
          edition: "Vol. 06",
          tone: "bone",
          pattern: "peak",
        },
      },
    ],
    includes: [
      "Tilt reset routine",
      "Pre-session warm-up for the head",
      "Comms under pressure",
      "Stop-loss rules",
      "Downloadable PDF + EPUB",
    ],
    forWho: [
      "Players who lose streaks after one bad game",
      "Solo queue players",
      "Anyone who plays late at night",
    ],
    specs: [
      { label: "Format", value: "PDF + EPUB" },
      { label: "Length", value: "42 pages" },
      { label: "Delivery", value: "Instant download" },
    ],
    related: ["the-immortal-roadmap", "pre-match-checklists"],
    files: [
      {
        name: "The Ranked Mindset",
        format: "PDF",
        sizeLabel: "9 MB",
        storageKey: "guides/ranked-mindset-v1.pdf",
      },
    ],
  },
  {
    id: "prd_checklists",
    slug: "pre-match-checklists",
    name: "Pre-Match Checklists",
    tagline: "Two minutes before queue. Better first rounds.",
    shortDescription:
      "Printable checklists for warm-up, settings, comms and between-half resets.",
    longDescription: [
      "A set of one-page checklists to keep on your desk: warm-up, settings sanity check, first-round plan and a half-time reset.",
    ],
    type: "digital",
    category: "training-guides",
    price: 299,
    media: [
      {
        kind: "cover",
        cover: {
          title: "Pre-Match Checklists",
          kicker: "Printables",
          edition: "Vol. 07",
          tone: "gold",
          pattern: "bars",
        },
      },
    ],
    includes: [
      "Warm-up checklist",
      "Settings sanity check",
      "First-round plan",
      "Half-time reset",
      "Printable PDF",
    ],
    forWho: ["Players with slow starts", "Anyone who forgets to warm up"],
    specs: [
      { label: "Format", value: "Printable PDF" },
      { label: "Length", value: "6 pages" },
      { label: "Delivery", value: "Instant download" },
    ],
    related: ["the-ranked-mindset", "crosshair-sensitivity-lab"],
    files: [
      {
        name: "Pre-Match Checklists",
        format: "PDF",
        sizeLabel: "2 MB",
        storageKey: "guides/checklists-v1.pdf",
      },
    ],
  },
  {
    id: "prd_plat_escape",
    slug: "plat-escape-plan",
    name: "Plat Escape Plan",
    tagline: "The mid-rank plateau, broken down.",
    shortDescription:
      "A four-week plan targeting the habits that keep players stuck in the middle ranks.",
    longDescription: [
      "Middle ranks are where most players stall. This plan targets the five habits that hold them there — peeking without info, late rotates, over-aiming, poor economy and no mid-round plan — with one week of focused work on each.",
    ],
    type: "digital",
    category: "rank-guides",
    price: 699,
    media: [
      {
        kind: "cover",
        cover: {
          title: "Plat Escape Plan",
          kicker: "4-week plan",
          edition: "Vol. 08",
          tone: "red",
          pattern: "stack",
        },
      },
    ],
    badges: ["new"],
    includes: [
      "4-week plan",
      "Habit checklist",
      "Economy cheat sheet",
      "Match goals for each week",
      "Downloadable PDF",
    ],
    forWho: [
      "Players in the middle ranks for over a season",
      "Players who were placed lower than they expected",
    ],
    specs: [
      { label: "Format", value: "PDF" },
      { label: "Length", value: "22 pages" },
      { label: "Delivery", value: "Instant download" },
    ],
    related: ["the-immortal-roadmap", "game-sense-playbook"],
    files: [
      {
        name: "Plat Escape Plan",
        format: "PDF",
        sizeLabel: "10 MB",
        storageKey: "guides/plat-escape-v1.pdf",
      },
    ],
  },
];

const bundles: Product[] = [
  {
    id: "prd_climb_bundle",
    slug: "the-climb-bundle",
    name: "Path to Immortal: Guide",
    tagline: "The three guides we'd give a friend who wants to rank up.",
    shortDescription:
      "The Immortal Roadmap, Aim Foundations and Game Sense Playbook together.",
    longDescription: [
      "Path to Immortal: Guide puts our core improvement system in one place: the Roadmap for structure, Aim Foundations for mechanics and the Game Sense Playbook for decisions.",
    ],
    type: "digital",
    category: "bundles",
    price: 4999,
    media: [
      {
        kind: "cover",
        cover: {
          title: "Path to Immortal: Guide",
          kicker: "3 guides",
          edition: "Bundle",
          tone: "gold",
          pattern: "stack",
        },
      },
    ],
    badges: ["bestseller", "pro"],
    featured: true,
    bundleOf: [
      "the-immortal-roadmap",
      "aim-foundations",
      "game-sense-playbook",
    ],
    includes: [
      "The Immortal Roadmap",
      "Aim Foundations",
      "Game Sense Playbook",
      "All future updates",
    ],
    forWho: [
      "Players serious about climbing this season",
      "Anyone who wants the full system",
    ],
    specs: [
      { label: "Products", value: "3 guides" },
      { label: "Total pages", value: "90" },
      { label: "Delivery", value: "Instant download" },
    ],
    related: ["the-complete-arsenal", "the-immortal-roadmap"],
  },
  {
    id: "prd_wallpaper_vault",
    slug: "wallpaper-vault",
    name: "Wallpaper Vault",
    tagline: "Every wallpaper, every format.",
    shortDescription:
      "All desktop, mobile and ultrawide wallpapers, plus every new drop this year.",
    longDescription: [
      "The Vault includes the full wallpaper collection in every available resolution, plus new wallpapers as they're released for 12 months.",
    ],
    type: "digital",
    category: "bundles",
    price: 1499,
    compareAtPrice: 4384,
    media: [
      {
        kind: "image",
        src: "/images/wallpapers/wp-shards.webp",
        thumb: "/images/wallpapers/wp-shards-thumb.webp",
        alt: "Faceted red glass and gold metal shards floating in darkness",
        ratio: "16/9",
      },
    ],
    badges: ["pro"],
    includes: [
      "16 wallpapers",
      "Desktop, mobile and ultrawide",
      "4K masters where available",
      "12 months of new drops",
    ],
    forWho: ["Setup enthusiasts", "Anyone matching desktop and phone"],
    specs: [
      { label: "Wallpapers", value: "16 + new drops" },
      { label: "Formats", value: "PNG" },
      { label: "Delivery", value: "Instant ZIP download" },
    ],
    related: ["the-complete-arsenal"],
  },
  {
    id: "prd_complete_arsenal",
    slug: "the-complete-arsenal",
    name: "The Complete Arsenal",
    tagline: "Every guide. Every wallpaper. One price.",
    shortDescription:
      "The entire digital catalogue, including everything we release in the next 12 months.",
    longDescription: [
      "The Complete Arsenal is every digital product in the store — all eight guides and the full Wallpaper Vault — plus anything new for a year.",
    ],
    type: "digital",
    category: "bundles",
    price: 3999,
    compareAtPrice: 7255,
    media: [
      {
        kind: "cover",
        cover: {
          title: "The Complete Arsenal",
          kicker: "Everything",
          edition: "Bundle",
          tone: "red",
          pattern: "rings",
        },
      },
    ],
    badges: ["pro"],
    bundleOf: [
      "the-climb-bundle",
      "crosshair-sensitivity-lab",
      "the-ranked-mindset",
      "pre-match-checklists",
      "plat-escape-plan",
      "wallpaper-vault",
    ],
    includes: [
      "All 8 guides",
      "Wallpaper Vault",
      "Every release for 12 months",
      "Priority support",
    ],
    forWho: ["Players who want everything once", "Gift buyers"],
    specs: [
      { label: "Products", value: "8 guides + 16 wallpapers" },
      { label: "You save", value: "£32.56" },
      { label: "Delivery", value: "Instant download" },
    ],
    related: ["the-climb-bundle", "wallpaper-vault"],
  },
];

function wallpaper(
  slug: string,
  name: string,
  file: string,
  device: WallpaperDevice,
  styles: WallpaperStyle[],
  alt: string,
  opts: { price?: number; is4k?: boolean; badges?: Product["badges"] } = {},
): Product {
  const resolution =
    device === "mobile"
      ? "1440 × 2560"
      : device === "ultrawide"
        ? "3440 × 1440"
        : opts.is4k
          ? "3840 × 2160"
          : "2560 × 1440";
  const ratio =
    device === "mobile" ? "9/16" : device === "ultrawide" ? "21/9" : "16/9";
  return {
    id: `prd_wp_${slug.replace(/-/g, "_")}`,
    slug: `wallpaper-${slug}`,
    name,
    tagline: alt,
    shortDescription: `${alt}. Original artwork, delivered as a lossless PNG.`,
    longDescription: [
      `${name} is an original wallpaper designed in-house. You'll receive a lossless PNG at ${resolution}${opts.is4k ? " (4K)" : ""}, ready to set as your background.`,
    ],
    type: "digital",
    category: "wallpapers",
    price: opts.price ?? 249,
    media: [
      {
        kind: "image",
        src: `/images/wallpapers/${file}.webp`,
        thumb: `/images/wallpapers/${file}-thumb.webp`,
        alt,
        ratio,
      },
    ],
    badges: opts.badges,
    includes: [`${resolution} PNG`, "Personal-use licence", "Instant download"],
    forWho: ["Anyone who wants a clean, premium setup"],
    specs: [
      { label: "Device", value: device[0].toUpperCase() + device.slice(1) },
      { label: "Resolution", value: resolution },
      { label: "Format", value: "PNG (lossless)" },
      { label: "Licence", value: "Personal use" },
    ],
    related: ["wallpaper-vault"],
    files: [
      {
        name,
        format: "PNG",
        sizeLabel: device === "mobile" ? "6 MB" : "14 MB",
        storageKey: `wallpapers/${file}.png`,
      },
    ],
    wallpaper: { device, resolution, styles, is4k: !!opts.is4k },
  };
}

const wallpapers: Product[] = [
  wallpaper(
    "redline",
    "Redline",
    "wp-redline",
    "desktop",
    ["minimal"],
    "A single red beam cutting through a dark void",
    { is4k: true, badges: ["bestseller"] },
  ),
  wallpaper(
    "zero-point",
    "Zero Point",
    "wp-reticle",
    "desktop",
    ["competitive", "cyber"],
    "A holographic aiming reticle floating in darkness",
    { is4k: true, price: 299 },
  ),
  wallpaper(
    "afterhours",
    "Afterhours",
    "wp-nightcity",
    "desktop",
    ["cyber"],
    "A rain-soaked neon city at night",
    { is4k: true, price: 299 },
  ),
  wallpaper(
    "shatterpoint",
    "Shatterpoint",
    "wp-shards",
    "desktop",
    ["abstract"],
    "Red glass and gold metal shards suspended mid-air",
    { is4k: true, price: 299, badges: ["new"] },
  ),
  wallpaper(
    "summit-lines",
    "Summit Lines",
    "wp-summit",
    "desktop",
    ["minimal", "abstract"],
    "Gold contour lines forming a mountain peak",
  ),
  wallpaper(
    "last-corridor",
    "Last Corridor",
    "wp-corridor",
    "desktop",
    ["competitive"],
    "An empty concrete arena corridor lit in red",
  ),
  wallpaper(
    "ember-smoke",
    "Ember Smoke",
    "wp-smoke",
    "desktop",
    ["abstract"],
    "Red and gold smoke colliding in the dark",
  ),
  wallpaper(
    "tracepath",
    "Tracepath",
    "wp-circuit",
    "desktop",
    ["cyber"],
    "Glowing circuit traces running into the distance",
  ),
  wallpaper(
    "redline-mobile",
    "Redline Mobile",
    "wpm-redline",
    "mobile",
    ["minimal"],
    "A thin red line and gold peak on black",
    { price: 199 },
  ),
  wallpaper(
    "upward",
    "Upward",
    "wpm-towers",
    "mobile",
    ["cyber"],
    "Looking up between neon-lit towers",
    { price: 199, badges: ["new"] },
  ),
  wallpaper(
    "gold-ribbon",
    "Gold Ribbon",
    "wpm-ribbon",
    "mobile",
    ["abstract"],
    "A ribbon of liquid gold and red glass",
    { price: 199 },
  ),
  wallpaper(
    "hud-mobile",
    "HUD",
    "wpm-hud",
    "mobile",
    ["competitive", "minimal"],
    "A red reticle over a tactical HUD grid",
    { price: 199 },
  ),
  wallpaper(
    "glass-dunes",
    "Glass Dunes",
    "wpu-dunes",
    "ultrawide",
    ["minimal", "abstract"],
    "Black glass dunes beneath a gold ring",
    { price: 349 },
  ),
  wallpaper(
    "arena-panorama",
    "Arena Panorama",
    "wpu-stadium",
    "ultrawide",
    ["competitive"],
    "An empty esports arena lit in red and gold",
    { price: 349 },
  ),
];

const gear: Product[] = [
  {
    id: "prd_coaster_set",
    slug: "reticle-coaster-set",
    name: "Reticle Coaster Set",
    tagline: "Three engraved slate coasters with gold-foil detailing.",
    shortDescription:
      "A set of three natural slate coasters, each engraved with a different Peakform pattern.",
    longDescription: [
      "Cut from natural slate and laser-engraved with three patterns — Reticle, Summit and Grid — filled with light-gold foil. Soft cork backing protects your desk.",
    ],
    type: "physical",
    category: "gear",
    price: 1800,
    media: [
      {
        kind: "image",
        src: "/images/products/coaster-set.webp",
        thumb: "/images/products/coaster-set-thumb.webp",
        alt: "Three black slate coasters with gold engraved patterns on a desk",
        ratio: "1/1",
      },
    ],
    badges: ["bestseller"],
    featured: true,
    shipsIn: "Ships in 2–3 working days",
    includes: ["3 slate coasters (10 cm)", "Cork backing", "Gift box"],
    forWho: ["Anyone with a drink next to their keyboard", "Gifts for gamers"],
    specs: [
      { label: "Material", value: "Natural slate, cork" },
      { label: "Size", value: "10 × 10 cm" },
      { label: "Care", value: "Wipe clean" },
      { label: "Shipping", value: "UK & international" },
    ],
    related: ["walnut-inlay-coaster", "phone-case-contour"],
  },
  {
    id: "prd_coaster_walnut",
    slug: "walnut-inlay-coaster",
    name: "Walnut Inlay Coaster",
    tagline: "Walnut and black resin with a gold crosshair inlay.",
    shortDescription:
      "A single square coaster in walnut and black resin with an inlaid gold crosshair.",
    longDescription: [
      "Each coaster is made from solid walnut and black resin, with a light-gold crosshair inlay. Grain varies, so every piece is slightly different.",
    ],
    type: "physical",
    category: "gear",
    price: 1400,
    media: [
      {
        kind: "image",
        src: "/images/products/coaster-walnut.webp",
        thumb: "/images/products/coaster-walnut-thumb.webp",
        alt: "A walnut and black resin coaster with a gold crosshair inlay",
        ratio: "1/1",
      },
    ],
    badges: ["limited"],
    shipsIn: "Ships in 3–5 working days",
    includes: ["1 walnut & resin coaster (10 cm)", "Felt backing"],
    forWho: ["Setups with wood accents", "Premium gifts"],
    specs: [
      { label: "Material", value: "Walnut, epoxy resin" },
      { label: "Size", value: "10 × 10 cm" },
      { label: "Shipping", value: "UK & international" },
    ],
    related: ["reticle-coaster-set"],
  },
  ...(
    [
      [
        "contour",
        "Contour",
        "Matte black with gold topographic lines",
        "case-contour",
        "A matte black phone case with gold contour lines",
      ],
      [
        "shard",
        "Shard",
        "Gloss red with a black and gold shard print",
        "case-shard",
        "A red phone case with a black and gold shard pattern",
      ],
      [
        "reticle",
        "Reticle",
        "Smoked translucent with a red reticle ring",
        "case-smoke",
        "A smoked translucent phone case with a red reticle design",
      ],
    ] as const
  ).map(([slug, name, tagline, file, alt]): Product => ({
    id: `prd_case_${slug}`,
    slug: `phone-case-${slug}`,
    name: `${name} Phone Case`,
    tagline,
    shortDescription: `${tagline}. Slim, shock-absorbing and MagSafe compatible.`,
    longDescription: [
      "A slim dual-layer case with a shock-absorbing inner shell and a scratch-resistant finish. Raised edges protect the screen and camera, and it works with MagSafe chargers and accessories.",
    ],
    type: "physical",
    category: "gear",
    price: 2200,
    media: [
      {
        kind: "image",
        src: `/images/products/${file}.webp`,
        thumb: `/images/products/${file}-thumb.webp`,
        alt,
        ratio: "3/4",
      },
    ],
    badges:
      slug === "contour"
        ? ["bestseller"]
        : slug === "reticle"
          ? ["new"]
          : undefined,
    featured: slug === "contour",
    shipsIn: "Ships in 2–4 working days",
    variants: [
      { id: "iphone-16-pro", label: "iPhone 16 Pro" },
      { id: "iphone-16", label: "iPhone 16" },
      { id: "iphone-15-pro", label: "iPhone 15 Pro" },
      { id: "galaxy-s25", label: "Galaxy S25" },
      { id: "pixel-9", label: "Pixel 9" },
    ],
    includes: [
      "Dual-layer protective case",
      "MagSafe compatible",
      "Raised screen and camera edges",
    ],
    forWho: ["Anyone who wants their phone to match their setup"],
    specs: [
      { label: "Material", value: "Polycarbonate + TPU" },
      { label: "Drop tested", value: "2 m" },
      { label: "Wireless charging", value: "MagSafe & Qi" },
      { label: "Shipping", value: "UK & international" },
    ],
    related: [
      "phone-case-contour",
      "phone-case-shard",
      "phone-case-reticle",
      "reticle-coaster-set",
    ].filter((s) => s !== `phone-case-${slug}`),
  })),
];

const archive: Product[] = [...guides, ...bundles, ...wallpapers, ...gear];

const pick = (slug: string) => archive.find((p) => p.slug === slug)!;
export const products: Product[] = [
  {
    ...pick("the-climb-bundle"),
    name: "Path to Immortal: Guide",
    price: 4999,
    compareAtPrice: 7999, // crossed-out "was" price
    badges: ["bestseller"],
    bundleOf: undefined,
    related: [],
    includes: [
      "The Immortal Roadmap",
      "Aim Foundations",
      "Game Sense Playbook",
    ],
    specs: [
      { label: "Type", value: "Digital guide collection" },
      { label: "Contents", value: "Three training resources" },
    ],
    faq: [],
    tagline: "A plan for ranked. Finally.",
    shortDescription:
      "Three practical resources for aim, decision-making and a more consistent practice routine."
  },
  {
    ...pick("wallpaper-vault"),
    name: "Wallpapers",
    category: "wallpapers",
    price: 1999,
    compareAtPrice: 3199, // crossed-out "was" price: previous genuine selling price per owner, shows 38% off
    badges: undefined,
    bundleOf: undefined,
    related: [],
    faq: [],
    media: [
      {
        kind: "image",
        src: "/images/collection/art-25.jpg",
        alt: "Astra wallpaper collection preview",
        position: "50% 0%", // keep the ASTRA title and her face in the square card
        ratio: "4/3",
      },
    ],
    tagline: "New background.",
    shortDescription:
      "The complete artwork collection in one wallpaper pack. Browse every design below before choosing.",
    longDescription: [
      "Explore the full collection of character artwork in the gallery. Source dimensions vary; the filename is not a guarantee of 4K resolution.",
    ],
    includes: [
      "All 32 artwork designs",
      "Desktop and mobile artwork collection",
      "Personal-use wallpaper pack",
    ],
    specs: [
      { label: "Designs", value: "32" },
      {
        label: "Resolution",
        value: "Varies by artwork; original source dimensions",
      },
      { label: "Type", value: "Digital collection" },
    ],
  },
  {
    ...pick("phone-case-contour"),
    name: "Phone cases",
    price: 2499,
    shortDescription:
      "A gaming-inspired phone case with a dark finish and gold detailing. Choose your phone model in the preview.",
    longDescription: [
      "A restrained design for a setup that already has enough RGB. Final material, compatibility and protection specifications will be confirmed before sale.",
    ],
    includes: ["One phone case in your selected model"],
    specs: [
      { label: "Design", value: "Dark finish with gold contour detail" },
      {
        label: "Compatibility",
        value: "Select a model; final specification confirmed before sale",
      },
    ],
    compareAtPrice: 3999, // crossed-out "was" price
    badges: undefined,
    related: [],
    faq: [],
    shipsIn: "Delivery details confirmed before launch",
    tagline: "Protect your phone. Your RR is on you."
  },
  {
    ...pick("reticle-coaster-set"),
    name: "Coasters",
    price: 1499,
    shortDescription:
      "Gaming-inspired coasters with a dark finish and gold pattern. A designated landing zone for your drink.",
    longDescription: [
      "A tidy addition to the desk, designed to complement the rest of the Peakform collection. Final dimensions, materials and pack contents will be confirmed before sale.",
    ],
    includes: [
      "Coaster product preview; final pack contents confirmed before sale",
    ],
    specs: [
      { label: "Design", value: "Dark finish with gold pattern" },
      {
        label: "Product details",
        value: "Final materials and dimensions confirmed before sale",
      },
    ],
    compareAtPrice: 2399, // crossed-out "was" price
    badges: undefined,
    related: [],
    faq: [],
    shipsIn: "Delivery details confirmed before launch",
    tagline: "For the only rings your desk should have."
  },
];
