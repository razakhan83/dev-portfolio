"use client";

import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { Badge } from "./ui/badge";
import { ProjectShot } from "./ProjectShot";
import { fadeUp, staggerParent, staggerChild, revealViewport } from "@/lib/motion";
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

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-[3px] h-4 w-4 shrink-0" fill="none" stroke="#2B4BFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5 L6.5 12 L13 4.5" />
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
      className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14"
    >
      <div className={cn(flip && "lg:order-2")}>
        <ProjectShot
          image={project.image}
          mobileImage={project.mobileImage}
          alt={`${project.name} homepage screenshot`}
          urlLabel={project.liveLabel}
          href={project.liveUrl}
          conceptHref={project.demoPath}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex items-baseline gap-2 rounded-md border border-line bg-card px-3 py-1.5 shadow-xs">
              <span className="text-sm font-bold text-ink">{m.value}</span>
              <span className="font-mono text-[11px] uppercase tracking-wide text-faint">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={cn(flip && "lg:order-1")}>
        <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={revealViewport}>
          <motion.div variants={staggerChild} className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[13px] font-bold text-sky-deep">{project.index}</span>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <Badge variant={project.kind === "Client project" ? "brand" : "sky"}>{project.kind}</Badge>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
              {project.year} : {project.role}
            </span>
          </motion.div>

          <motion.h3 variants={staggerChild} className="mt-4 text-[1.7rem] font-extrabold leading-tight tracking-tight md:text-3xl">
            {project.name}
          </motion.h3>
          <motion.p variants={staggerChild} className="mt-2 text-[15px] font-medium leading-6 text-muted">
            {project.tagline}
          </motion.p>

          <motion.div variants={staggerChild} className="mt-7">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">Problem</p>
            <p className="mt-2.5 text-[15px] leading-[1.75] text-ink/90">{project.problem}</p>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-6">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">Architecture</p>
            <ul className="mt-3 space-y-3">
              {project.architecture.map((a, i) => (
                <li key={i} className="flex gap-3 text-[14.5px] leading-[1.65] text-ink/90">
                  <CheckIcon />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={staggerChild} className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <Badge key={s} variant="neutral">{s}</Badge>
            ))}
          </motion.div>

          <motion.div variants={staggerChild} className="mt-7 flex flex-wrap gap-3 border-t border-dashed border-dashed pt-6">
            <a
              href={project.demoPath ?? project.liveUrl}
              target={project.demoPath ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-paper shadow-xs transition-all duration-150 hover:-translate-y-px hover:bg-brand-deep hover:shadow-sm"
            >
              <ExternalIcon /> {project.demoPath ? "Open interactive demo" : "Live demo"}
            </a>
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line bg-card px-5 py-2.5 text-sm font-semibold text-ink shadow-xs transition-all duration-150 hover:-translate-y-px hover:border-faint hover:shadow-sm"
              >
                <CodeIcon /> Source
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="work" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport} className="max-w-2xl">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-deep">01 : Selected work</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight md:text-[2.6rem]">
            Live projects, engineered end to end.
          </h2>
          <p className="mt-4 text-[16.5px] leading-[1.75] text-muted">
            Real products running in production. Each breakdown covers the
            actual problem, the architecture decisions, and the stack. The
            previews are live captures, not mockups.
          </p>
        </motion.div>

        <div className="mt-14 space-y-20 md:mt-20 md:space-y-28">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
      <div className="rule-dashed mx-auto max-w-6xl" />
    </section>
  );
}
