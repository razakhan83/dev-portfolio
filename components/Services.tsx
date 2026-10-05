"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { fadeUp, staggerParent, staggerChild, revealViewport } from "@/lib/motion";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-deep">02 : Capabilities</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight md:text-[2.6rem]">
            Concrete services, defined deliverables.
          </h2>
          <p className="mt-4 max-w-2xl text-[16.5px] leading-[1.75] text-muted">
            Fixed scope, fixed communication. You always know what arrives and when.
          </p>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          {services.map((s) => (
            <motion.div
              key={s.index}
              variants={staggerChild}
              className="flex flex-col rounded-lg border border-line bg-card p-6 shadow-xs transition-shadow duration-150 hover:shadow-sm md:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-[0.14em] text-amber-deep">{s.index}</span>
                <span className="h-2 w-2 rounded-full bg-pine" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2.5 text-[14.5px] leading-7 text-muted">{s.description}</p>

              <dl className="mt-6 space-y-0 border-t border-dashed border-dashed">
                {s.deliverables.map((d) => (
                  <div
                    key={d.label}
                    className="grid grid-cols-[130px_1fr] gap-3 border-b border-dashed border-dashed py-3 text-sm last:border-b-0"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint pt-0.5">
                      {d.label}
                    </dt>
                    <dd className="font-medium text-ink">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="rule-dashed mx-auto max-w-6xl" />
    </section>
  );
}
