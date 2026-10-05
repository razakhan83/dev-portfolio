"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StatusPulse } from "./anim/StatusPulse";
import { HeroBlueprint } from "./anim/HeroBlueprint";
import { staggerParent, staggerChild } from "@/lib/motion";

const stack = ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion", "PostgreSQL", "MongoDB"];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8 H14 M9 3 L14 8 L9 13" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:pb-24">
        <motion.div variants={staggerParent} initial="hidden" animate="show">
          <motion.div variants={staggerChild} className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-md border border-pine-line bg-pine-soft px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-pine-deep shadow-xs">
              <StatusPulse />
              Available for freelance contracts
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              Karachi / Remote worldwide
            </span>
          </motion.div>

          <motion.h1
            variants={staggerChild}
            className="mt-7 text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.02em] md:text-6xl lg:text-[3.6rem]"
          >
            I build production web apps that earn their keep.
          </motion.h1>

          <motion.p variants={staggerChild} className="mt-6 max-w-xl text-[17px] leading-[1.75] text-muted">
            Ahmed Raza, full-stack developer with 3 years shipping e-commerce
            stores, dashboards, and APIs. Next.js and TypeScript up front,
            solid data modeling behind. No page builders, no shortcuts.
          </motion.p>

          <motion.div variants={staggerChild} className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#work">
                View selected work <ArrowIcon />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#contact">Hire me</a>
            </Button>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-11">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
              Core stack
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {stack.map((s) => (
                <Badge key={s} variant="neutral">{s}</Badge>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="rounded-lg border border-line bg-card p-4 shadow-sm md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                System overview
              </p>
              <Badge variant="pine">Live diagram</Badge>
            </div>
            <HeroBlueprint className="h-auto w-full" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { k: "3+", v: "Years shipping" },
              { k: "15+", v: "Projects delivered" },
              { k: "2", v: "Stores in production" },
            ].map((s) => (
              <div key={s.v} className="rounded-md border border-line bg-card px-4 py-3 shadow-xs">
                <p className="text-xl font-extrabold tracking-tight text-pine">{s.k}</p>
                <p className="mt-0.5 text-xs font-medium text-muted">{s.v}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="rule-dashed mx-auto max-w-6xl" />
    </section>
  );
}
