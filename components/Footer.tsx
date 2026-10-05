import { StatusPulse } from "./anim/StatusPulse";
import { LogoMark } from "./anim/LogoMark";

export function Footer() {
  return (
    <footer className="border-t border-line bg-raised">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <span className="text-[15px] font-bold tracking-tight">Ahmed Raza</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              Full-stack developer building production web apps with Next.js
              and TypeScript. Karachi, working worldwide.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md border border-line bg-card px-3 py-1.5">
              <StatusPulse />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-pine-deep">
                All systems operational
              </span>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-16 gap-y-2.5 text-sm" aria-label="Footer">
            <a href="#work" className="font-medium text-muted transition-colors duration-150 hover:text-ink">Work</a>
            <a href="#services" className="font-medium text-muted transition-colors duration-150 hover:text-ink">Services</a>
            <a href="#code" className="font-medium text-muted transition-colors duration-150 hover:text-ink">Code</a>
            <a href="#contact" className="font-medium text-muted transition-colors duration-150 hover:text-ink">Contact</a>
            <a href="/privacy" className="font-medium text-muted transition-colors duration-150 hover:text-ink">Privacy</a>
            <a href="/terms" className="font-medium text-muted transition-colors duration-150 hover:text-ink">Terms</a>
          </nav>
        </div>

        <div className="rule-dashed mt-8" />

        <div className="mt-6 flex flex-col gap-2 text-[13px] text-faint md:flex-row md:items-center md:justify-between">
          <p>© 2026 Ahmed Raza. Built with Next.js, TypeScript, and Tailwind CSS.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
            v1.0 : shipped October 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
