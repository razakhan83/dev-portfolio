"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Range = "7D" | "30D" | "90D";

const RANGES: Range[] = ["7D", "30D", "90D"];

/** Deterministic pseudo-random series so the demo is stable per range. */
function series(seed: number, n: number, base: number, amp: number) {
  let s = seed;
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    out.push(Math.round(base + (s / 233280) * amp));
  }
  return out;
}

function useCountUp(target: number, instant: boolean, duration = 900) {
  const [val, setVal] = useState(instant ? target : 0);
  useEffect(() => {
    if (instant) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, instant]);
  return val;
}

const FEED_POOL = [
  "New order #8412 — Rs 4,299 (COD)",
  "Ayesha K. signed up — Pro trial",
  "Payout settled — Rs 128,400",
  "Inventory alert: LED Desk Lamp low",
  "New review: 5 stars on Ceramic Mug",
  "Danish R. upgraded to Business",
  "Refund issued #3391 — Rs 1,150",
  "Campaign 'Winter Sale' hit 2.1% CTR",
];

function LiveFeed({ instant }: { instant: boolean }) {
  const [items, setItems] = useState<string[]>(FEED_POOL.slice(0, instant ? 6 : 4));
  useEffect(() => {
    if (instant) return;
    let i = 4;
    const id = setInterval(() => {
      setItems((prev) => [FEED_POOL[i % FEED_POOL.length], ...prev].slice(0, 5));
      i++;
    }, 3200);
    return () => clearInterval(id);
  }, [instant]);
  return (
    <ul className="space-y-3">
      <AnimatePresence initial={false}>
        {items.map((t) => (
          <motion.li
            key={t}
            layout
            initial={instant ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-[13px] text-stone-300"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
            {t}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

function Kpi({ label, value, prefix = "", suffix = "", delta, instant }: { label: string; value: number; prefix?: string; suffix?: string; delta: string; instant: boolean }) {
  const v = useCountUp(value, instant);
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">{label}</p>
      <p className="mt-2 text-[1.7rem] font-extrabold tracking-tight text-stone-100">
        {prefix}{v.toLocaleString()}{suffix}
      </p>
      <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-300">
        ▲ {delta}
      </p>
    </div>
  );
}

function RevenueChart({ data, instant }: { data: number[]; instant: boolean }) {
  const W = 640, H = 220, P = 28;
  const max = Math.max(...data) * 1.15, min = Math.min(...data) * 0.85;
  const pts = data.map((v, i) => [
    P + (i / (data.length - 1)) * (W - P * 2),
    H - P - ((v - min) / (max - min)) * (H - P * 2),
  ]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${H - P} L${pts[0][0].toFixed(1)},${H - P} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Revenue trend chart">
      <defs>
        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={P} x2={W - P} y1={H * f} y2={H * f} stroke="#ffffff" strokeOpacity="0.06" strokeDasharray="4 4" />
      ))}
      <motion.path d={area} fill="url(#revFill)" initial={instant ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
      <motion.path
        d={line} fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round"
        initial={instant ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {pts.filter((_, i) => i % Math.ceil(pts.length / 8) === 0).map((p, i) => (
        <motion.circle key={i} cx={p[0]} cy={p[1]} r="4" fill="#0c0a09" stroke="#34d399" strokeWidth="2"
          initial={instant ? false : { opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 + i * 0.08 }} />
      ))}
    </svg>
  );
}

function Bars({ data, instant }: { data: number[]; instant: boolean }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-40 items-end gap-2">
      {data.map((v, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500/70 to-emerald-300/90"
          initial={instant ? false : { height: 0 }}
          animate={{ height: `${(v / max) * 100}%` }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

function Dashboard() {
  const [instant, setInstant] = useState(false);
  useEffect(() => {
    if (
      window.location.hash === "#static" ||
      new URLSearchParams(window.location.search).get("static") === "1"
    ) {
      setInstant(true);
    }
  }, []);
  const [range, setRange] = useState<Range>("30D");
  const n = range === "7D" ? 7 : range === "30D" ? 30 : 45;
  const revenue = useMemo(() => series(7, n, 42000, 38000), [n]);
  const signups = useMemo(() => series(21, 12, 40, 90), [range]);
  const total = revenue.reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#0c0a09] font-sans text-stone-200">
      <div className="border-b border-white/10 bg-amber-400/10 px-5 py-2.5 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber-200">
          Concept demo — Pulseboard · <Link href="/" className="underline underline-offset-4 hover:text-amber-100">Back to portfolio</Link>
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-stone-50">Pulseboard</h1>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-stone-500">
              What changed, why, what needs attention
            </p>
          </div>
          <div className="flex gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`rounded-md px-4 py-1.5 font-mono text-xs font-semibold transition-colors duration-150 ${
                  range === r ? "bg-emerald-400 text-stone-950" : "text-stone-400 hover:text-stone-100"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Revenue" value={total} prefix="Rs " delta="+18.2%" instant={instant} />
          <Kpi label="Active users" value={12840} delta="+6.4%" instant={instant} />
          <Kpi label="Conversion" value={34} suffix="%" delta="+2.1 pts" instant={instant} />
          <Kpi label="Churn" value={21} suffix="%" delta="-0.8 pts" instant={instant} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-stone-100">Revenue trend</h2>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> LIVE
              </span>
            </div>
            <RevenueChart key={range} data={revenue} instant={instant} />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <h2 className="mb-4 text-sm font-bold text-stone-100">Weekly signups</h2>
            <Bars key={range} data={signups} instant={instant} />
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.6fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <h2 className="mb-4 text-sm font-bold text-stone-100">Needs attention</h2>
            <ul className="space-y-2.5 text-[13px]">
              {[
                ["Inventory low", "LED Desk Lamp — 8 units left"],
                ["Payout pending", "Rs 128,400 settles tomorrow"],
                ["Review spike", "12 new reviews need replies"],
              ].map(([t, d]) => (
                <li key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-3.5 py-3">
                  <p className="font-semibold text-stone-100">{t}</p>
                  <p className="mt-0.5 text-stone-400">{d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
            <h2 className="mb-4 text-sm font-bold text-stone-100">Live activity</h2>
            <LiveFeed instant={instant} />
          </div>
        </div>

        <p className="mt-8 text-center font-mono text-[11px] text-stone-600">
          Pulseboard is a design concept by Ahmed Raza. Figures are illustrative.
        </p>
      </div>
    </div>
  );
}

export default function PulseboardDemoPage() {
  return <Dashboard />;
}
