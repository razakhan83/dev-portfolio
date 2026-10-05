# Ahmed Raza — Developer Portfolio

A world-class, client-facing developer portfolio built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Light warm off-white theme, strict 2-color system (deep pine + burnt amber), animated SVG diagrams, zero AI-template tropes.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

Import this repo into [Vercel](https://vercel.com/new) and deploy. No environment variables required.

## Structure

```
app/                 # App Router pages (home, /privacy, /terms)
components/
  ui/                # shadcn-style primitives (button, badge)
  anim/              # Animated SVGs (logo, status pulse, architecture diagram, project motifs)
  Header.tsx Hero.tsx Projects.tsx Services.tsx
  CodeSandbox.tsx Contact.tsx Footer.tsx
data/                # Projects, services, code snippets
lib/                 # cn() util, shared Framer Motion variants
```

## Editing content

- Projects: `data/projects.ts`
- Services: `data/services.ts`
- Code samples: `data/snippets.ts`
- Contact details: `components/Contact.tsx`
