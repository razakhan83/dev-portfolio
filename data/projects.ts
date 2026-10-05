export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  kind: "Client project" | "Concept project";
  liveUrl: string;
  liveLabel: string;
  sourceUrl?: string;
  sourceLabel?: string;
  year: string;
  role: string;
  problem: string;
  architecture: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  motif: "gem" | "container" | "pulse";
  image?: string;
  demoPath?: string;
};

export const projects: Project[] = [
  {
    slug: "ornaments-by-arshad",
    index: "01",
    name: "Ornaments by Arshad",
    tagline: "Jewelry e-commerce storefront with a full admin suite",
    kind: "Client project",
    liveUrl: "https://www.ornamentsbyarshad.com/",
    liveLabel: "ornamentsbyarshad.com",
    sourceUrl: "https://github.com/razakhan83/ornamentsbyarshad",
    sourceLabel: "razakhan83/ornamentsbyarshad",
    year: "2026",
    role: "Design and full-stack build",
    problem:
      "A jewelry brand needed an online store that could handle a large, frequently changing catalog with high-resolution product imagery, plus an admin workflow the owner could run without a developer.",
    architecture: [
      "Next.js App Router with server components for the catalog, keeping product pages fast and SEO-friendly",
      "Cloudinary image pipeline: upload once, serve responsive variants per device",
      "Admin suite with drag-and-drop product ordering (dnd-kit) and one-click Excel order exports",
      "AI-assisted product descriptions wired through a generation API, reviewed before publish",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI", "Cloudinary"],
    metrics: [
      { label: "Catalog", value: "500+ products" },
      { label: "Admin", value: "Self-serve" },
      { label: "Mobile traffic", value: "70%+" },
    ],
    motif: "gem",
    image:
      "https://image.thum.io/get/width/1280/crop/800/noanimate/https://www.ornamentsbyarshad.com/",
  },
  {
    slug: "china-unique-store",
    index: "02",
    name: "China Unique Store",
    tagline: "Import-goods e-commerce with courier integration",
    kind: "Client project",
    liveUrl: "https://www.chinauniquestore.com/",
    liveLabel: "chinauniquestore.com",
    sourceUrl: "https://github.com/razakhan83/china-unique-store-main",
    sourceLabel: "razakhan83/china-unique-store-main",
    year: "2026",
    role: "Design and full-stack build",
    problem:
      "An importer selling goods sourced from China needed a storefront that could take cash-on-delivery orders at volume and hand them straight to the courier pipeline without manual re-entry.",
    architecture: [
      "Next.js storefront with a checkout flow tuned for cash-on-delivery, the dominant payment method for this market",
      "Courier API integration: orders move from checkout to shipment booking with tracking numbers returned automatically",
      "Server-side rendering for category pages so products are indexed by search engines",
      "Carousel-driven merchandising (Embla) for campaign banners and product galleries",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI", "Courier API"],
    metrics: [
      { label: "Checkout", value: "COD-first" },
      { label: "Fulfillment", value: "Automated" },
      { label: "Catalog", value: "Multi-category" },
    ],
    motif: "container",
    image:
      "https://image.thum.io/get/width/1280/crop/800/noanimate/https://www.chinauniquestore.com/",
  },
  {
    slug: "pulseboard",
    index: "03",
    name: "Pulseboard",
    tagline: "Real-time SaaS analytics dashboard",
    kind: "Concept project",
    liveUrl: "/demo/pulseboard",
    liveLabel: "Interactive concept demo",
    demoPath: "/demo/pulseboard",
    year: "2026",
    role: "Design and prototype",
    problem:
      "SaaS teams drown in vanity metrics. Pulseboard is a concept dashboard that answers one question per screen: what changed, why, and what needs attention right now.",
    architecture: [
      "Next.js App Router with Suspense boundaries: each widget streams in independently, so one slow query never blocks the page",
      "WebSocket-driven live tiles with optimistic deltas, falling back to polling on reconnect",
      "Multi-tenant data model with row-level scoping and role-based widget visibility",
      "Composable widget registry: new chart types plug in without touching layout code",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "WebSockets", "PostgreSQL"],
    metrics: [
      { label: "Widgets", value: "12 types" },
      { label: "Live updates", value: "< 1s" },
      { label: "Tenants", value: "Isolated" },
    ],
    motif: "pulse",
    image:
      "https://image.thum.io/get/width/1280/crop/800/noanimate/https://dev-portfolio-lime-gamma.vercel.app/demo/pulseboard",
  },
];
