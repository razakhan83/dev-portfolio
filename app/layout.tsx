import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed Raza — Full-Stack Developer (Next.js, React, TypeScript)",
  description:
    "Ahmed Raza builds production web apps with Next.js, React and TypeScript. E-commerce stores, dashboards, APIs. Available for freelance contracts.",
  openGraph: {
    title: "Ahmed Raza — Full-Stack Developer",
    description:
      "Production Next.js apps, e-commerce stores and dashboards. Available for freelance contracts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(sans.variable, mono.variable)}>
      <body className="font-sans bg-paper text-ink min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
