"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { Badge } from "./ui/badge";
import { ProjectMotif } from "./anim/ProjectMotif";
import { fadeUp, revealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3 H13 V10 M13 3 L7 9 M13 13 H3 V3" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 5 L3 8 L6 11 M10 5 L13 8 L10 11" />
    </svg>
  );
}

function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="grid gap-8 lg:grid-cols-2 lg:gap-12"
    >
      {/* Preview panel */}
      <div className={cn(flip && "lg:order-2")}>
        <div className="overflow-hidden rounded-lg border border-line bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-line bg-raised px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
            <span className="ml-3 truncate font-mono text-xs text-faint">{project.liveLabel}</span>
          </div>
          <div className="relative flex items-center justify-center bg-paper px-6 py-10">
            <ProjectMotif motif={project.motif} className="h-44 w-auto md:h-56" />
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-md border border-pine-line bg-pine-soft px-4 py-3 text-sm font-semibold text-pine-deep transition-colors duration-150 hover:bg-pine hover:text-paper"
            >
              <span>Open live site</span>
              <ExternalIcon />
            </a>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex items-baseline gap-2 rounded-md border border-line bg-card px-3 py-1.5">
              <span className="text-sm font-bold text-ink">{m.value}</span>
              <span className="font-mono text-[11px] uppercase tracking-wide text-faint">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering breakdown */}
      <div className={cn("flex flex-col", flip && "lg:order-1")}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-amber-deep">{project.index}</span>
          <Badge variant={project.kind === "Client project" ? "pine" : "amber"}>{project.kind}</Badge>
          <span className="font-mono text-xs text-faint">{project.year} : {project.role}</span>
        </div>

        <h3 className="mt-3 text-2xl font-extrabold tracking-tight md:text-3xl">{project.name}</h3>
        <p className="mt-1.5 text-[15px] font-medium text-muted">{project.tagline}</p>

        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Problem</p>
          <p className="mt-2 text-[15px] leading-7 text-ink/90">{project.problem}</p>
        </div>

        <div className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Architecture</p>
          <ul className="mt-3 space-y-2.5">
            {project.architecture.map((a, i) => (
              <li key={i} className="flex gap-3 text-[14.5px] leading-6 text-ink/90">
                <svg viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0" fill="none" stroke="#1D4A38" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M3 8.5 L6.5 12 L13 4.5" />
                </svg>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Badge key={s} variant="neutral">{s}</Badge>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-dashed border-dashed pt-5">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-pine px-4 py-2.5 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-pine-deep"
          >
            <ExternalIcon /> Live demo
          </a>
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-card px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-150 hover:border-faint hover:bg-raised"
            >
              <CodeIcon /> Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="work" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">Selected work</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
            Live projects, engineered end to end.
          </h2>
          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-muted">
            Each project below is running in production. The breakdown covers
            the actual problem, the architecture decisions, and the stack. No
            mockups, no filler.
          </p>
        </motion.div>

        <div className="mt-12 space-y-16 md:space-y-24">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
      <div className="rule-dashed mx-auto max-w-6xl" />
    </section>
  );
}
