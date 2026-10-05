import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use — Ahmed Raza" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
        Legal
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
        Terms of Use
      </h1>
      <div className="rule-dashed mt-8" />
      <div className="mt-8 space-y-5 text-[15px] leading-7 text-muted">
        <p>
          All content on this site, including project descriptions, code
          samples, and design work, is provided for portfolio and evaluation
          purposes. Project names and client work shown here belong to their
          respective owners.
        </p>
        <p>
          Code snippets in the interactive sandbox are illustrative examples,
          not production code from client projects, and are shared under the
          MIT license unless noted otherwise.
        </p>
        <p>
          Nothing on this site constitutes a binding offer of services. Project
          scope, timelines, and pricing are agreed in writing before work
          begins.
        </p>
        <p className="font-mono text-xs text-faint">Last updated: October 2026</p>
      </div>
    </div>
  );
}
