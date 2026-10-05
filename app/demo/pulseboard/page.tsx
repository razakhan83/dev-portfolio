"use client";

import { useEffect, useState } from "react";
import { Dashboard } from "./dashboard";

function AnimatedDashboard() {
  const [instant, setInstant] = useState(false);
  useEffect(() => {
    if (
      window.location.hash === "#static" ||
      new URLSearchParams(window.location.search).get("static") === "1"
    ) {
      setInstant(true);
    }
  }, []);
  return <Dashboard instant={instant} />;
}

export default function PulseboardDemoPage() {
  return <AnimatedDashboard />;
}
