"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { snippets } from "@/data/snippets";
import { CodeBlock } from "./CodeBlock";
import { fadeUp, revealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="2" />
      <path d="M10.5 5.5 v-2 a2 2 0 0 0 -2 -2 h-4 a2 2 0 0 0 -2 2 v4 a2 2 0 0 0 2 2 h2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5 L6.5 12 L13 4.5" />
    </svg>
  );
}

export function CodeSandbox() {
  const [activeId, setActiveId] = useState(snippets[0].id);
  const [copied, setCopied] = useState(false);
  const active = snippets.find((s) => s.id === activeId) ?? snippets[0];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(active.code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = active.code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="code" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-deep">03 : Code preview</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight md:text-[2.6rem]">
              How I write production code.
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.75] text-muted">
              Illustrative samples of the patterns used across client projects:
              validated API routes, server components, and typed state hooks.
              Switch tabs, read through, copy anything.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Validation at the boundary, types everywhere else",
                "Server components by default, client JS only where needed",
                "Small hooks with a single responsibility",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-[14.5px] leading-6 text-ink/90">
                  <svg viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0" fill="none" stroke="#1D4A38" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M3 8.5 L6.5 12 L13 4.5" />
                  </svg>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="overflow-hidden rounded-lg border border-line shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-line bg-card px-3 py-2">
              <div className="flex gap-1" role="tablist" aria-label="Code samples">
                {snippets.map((s) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={s.id === activeId}
                    onClick={() => setActiveId(s.id)}
                    className={cn(
                      "rounded-md px-3 py-2 font-mono text-xs transition-colors duration-150",
                      s.id === activeId
                        ? "bg-pine-soft font-semibold text-pine-deep"
                        : "text-muted hover:bg-raised hover:text-ink"
                    )}
                  >
                    {s.file.split("/").pop()}
                  </button>
                ))}
              </div>
              <button
                onClick={copy}
                className="flex items-center gap-1.5 rounded-md border border-line bg-paper px-2.5 py-1.5 text-xs font-semibold text-muted transition-colors duration-150 hover:border-faint hover:text-ink"
                aria-label="Copy code to clipboard"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="bg-[#1E1913]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <CodeBlock code={active.code} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="border-t border-line bg-card px-5 py-3.5">
              <p className="font-mono text-xs text-faint">{active.file}</p>
              <p className="mt-1 text-[13.5px] text-muted">{active.note}</p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="rule-dashed mx-auto max-w-6xl" />
    </section>
  );
}
