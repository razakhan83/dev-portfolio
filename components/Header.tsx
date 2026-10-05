"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "./anim/LogoMark";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#code", label: "Code" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Ahmed Raza home">
          <LogoMark />
          <span className="text-[15px] font-bold tracking-tight">
            Ahmed Raza
            <span className="ml-2 hidden font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-faint sm:inline">
              dev
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:bg-raised hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild size="sm">
            <a href="#contact">Hire me</a>
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-card md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M4 4 L16 16 M16 4 L4 16" /> : <path d="M3 6 H17 M3 10 H17 M3 14 H17" />}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn("block rounded-md px-3 py-2.5 text-[15px] font-medium text-muted hover:bg-raised hover:text-ink")}
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-2">
                <Button asChild className="w-full">
                  <a href="#contact" onClick={() => setOpen(false)}>Hire me</a>
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
