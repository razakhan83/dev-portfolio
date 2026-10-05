import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy — Ahmed Raza" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
        Legal
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
        Privacy Policy
      </h1>
      <div className="rule-dashed mt-8" />
      <div className="prose-legal mt-8 space-y-5 text-[15px] leading-7 text-muted">
        <p>
          This website is a personal portfolio. It does not use analytics,
          tracking pixels, advertising cookies, or third-party data collectors.
        </p>
        <p>
          If you contact me through the contact form, your name, email address,
          and message are used only to reply to your inquiry. They are sent to
          my email inbox and are never sold, shared, or added to a mailing
          list.
        </p>
        <p>
          Embedded links to GitHub, LinkedIn, and WhatsApp follow those
          platforms&apos; own privacy policies once you leave this site.
        </p>
        <p>
          Questions about this policy:{" "}
          <a
            className="font-semibold text-pine underline underline-offset-4"
            href="mailto:123raza83@gmail.com"
          >
            123raza83@gmail.com
          </a>
        </p>
        <p className="font-mono text-xs text-faint">Last updated: October 2026</p>
      </div>
    </div>
  );
}
