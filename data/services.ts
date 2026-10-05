export type Service = {
  index: string;
  title: string;
  description: string;
  deliverables: { label: string; value: string }[];
};

export const services: Service[] = [
  {
    index: "S.01",
    title: "Full-Stack Web Apps",
    description:
      "Complete products from database schema to deployed UI. E-commerce stores, booking flows, dashboards, and internal tools.",
    deliverables: [
      { label: "Stack", value: "Next.js, React, TypeScript, Node.js" },
      { label: "You receive", value: "Production app, admin panel, deployment docs" },
      { label: "Typical timeline", value: "3 to 6 weeks" },
    ],
  },
  {
    index: "S.02",
    title: "API and Database Architecture",
    description:
      "REST APIs and data models designed to stay fast as you grow. Auth, validation, and documentation included from day one.",
    deliverables: [
      { label: "Stack", value: "Next.js Route Handlers, PostgreSQL, MongoDB" },
      { label: "You receive", value: "Documented API, schema diagrams, seed scripts" },
      { label: "Typical timeline", value: "1 to 3 weeks" },
    ],
  },
  {
    index: "S.03",
    title: "Performance and SEO",
    description:
      "Core Web Vitals optimization, metadata and sitemap architecture, image pipelines. Measurable gains, verified with Lighthouse.",
    deliverables: [
      { label: "Target", value: "95+ Lighthouse across all four categories" },
      { label: "You receive", value: "Before/after audit report with fixes applied" },
      { label: "Typical timeline", value: "1 to 2 weeks" },
    ],
  },
  {
    index: "S.04",
    title: "UI Engineering and Micro-interactions",
    description:
      "Design-system components and motion that feel deliberate. Accessible, responsive, and consistent from mobile to ultrawide.",
    deliverables: [
      { label: "Stack", value: "Tailwind CSS, Framer Motion, Radix UI" },
      { label: "You receive", value: "Component library, motion spec, usage docs" },
      { label: "Typical timeline", value: "2 to 4 weeks" },
    ],
  },
];
