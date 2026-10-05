"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { fadeUp, staggerParent, staggerChild, revealViewport } from "@/lib/motion";

const EMAIL = "123raza83@gmail.com";

const channels = [
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="4.5" width="15" height="11" rx="2.5" />
        <path d="M3.5 7 L10 11.5 L16.5 7" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/razakhan83",
    href: "https://github.com/razakhan83",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7.5 6 L4 10 L7.5 14 M12.5 6 L16 10 L12.5 14" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/razakdev",
    href: "https://www.linkedin.com/in/razakdev/",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="2.5" width="15" height="15" rx="3" />
        <path d="M7 9.5 V13.5 M7 7.2 v.1 M11 13.5 v-2.2 a1.8 1.8 0 0 1 3.6 0 v2.2" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "+92 305 2622043",
    href: "https://wa.me/923052622043",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 2.8 a7.2 7.2 0 0 0 -6.2 10.8 L2.5 17.5 l4 -1.2 A7.2 7.2 0 1 0 10 2.8 Z" />
        <path d="M7.2 7.2 c.3 2.6 3 5.3 5.6 5.6 l1 -1.4 1.8 1 c-.3 1.2 -1.2 1.7 -2.2 1.4 -3.4 -1 -6.4 -4 -7.4 -7.4 -.3 -1 .2 -1.9 1.4 -2.2 l1 1.8 Z" />
      </svg>
    ),
  },
];

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${name || "your website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const inputCls =
    "w-full rounded-md border border-line bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-faint transition-colors duration-150 focus:border-brand focus:outline-none";

  return (
    <section id="contact" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-deep">04 : Hire me</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight md:text-[2.6rem]">
              Have a project? Let&apos;s scope it.
            </h2>
            <p className="mt-4 max-w-md text-[16.5px] leading-[1.75] text-muted">
              Send a short brief: what you need, your timeline, and your
              budget range. I reply within 24 hours with questions or a
              fixed quote.
            </p>

            <motion.ul
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={revealViewport}
              className="mt-8 space-y-3"
            >
              {channels.map((c) => (
                <motion.li key={c.label} variants={staggerChild}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-lg border border-line bg-card px-4 py-3.5 shadow-xs transition-all duration-150 hover:border-faint hover:shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-soft text-brand-deep [&_svg]:h-5 [&_svg]:w-5">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{c.label}</span>
                      <span className="block truncate text-[15px] font-semibold text-ink">{c.value}</span>
                    </span>
                    <svg viewBox="0 0 16 16" className="ml-auto h-4 w-4 shrink-0 text-faint transition-transform duration-150 group-hover:translate-x-1 group-hover:text-brand" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 8 H14 M9 3 L14 8 L9 13" />
                    </svg>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={revealViewport}>
            <form
              onSubmit={submit}
              className="rounded-lg border border-line bg-card p-6 shadow-sm md:p-8"
            >
              <h3 className="text-lg font-bold tracking-tight">Quick brief</h3>
              <p className="mt-1 text-sm text-muted">Opens your email app with everything filled in.</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="cf-name" className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    Your name
                  </label>
                  <input id="cf-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Cooper" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="cf-email" className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    Email
                  </label>
                  <input id="cf-email" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="cf-msg" className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    Project details
                  </label>
                  <textarea id="cf-msg" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What are you building, timeline, budget range..." className={inputCls} />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  Send inquiry
                </Button>
                <p className="text-center font-mono text-[11px] text-faint">
                  No spam, no newsletters. Just a reply.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
