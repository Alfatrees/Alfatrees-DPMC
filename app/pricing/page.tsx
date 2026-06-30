"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const TIERS = [
  {
    tier: "FIXED",
    name: "Per-Deliverable",
    usd: "$75 – $5,000+",
    inr: "₹5,000 – ₹3,00,000+",
    billing: "Fixed price per project",
    description:
      "One-time deliverables with clear scope and fixed cost. You know the price before we start.",
    services: [
      { name: "Quantity Takeoff (Single Trade)", starts: "$75" },
      { name: "Conceptual Estimate", starts: "$200" },
      { name: "Design Development Estimate", starts: "$400" },
      { name: "Detailed Estimate", starts: "$800" },
      { name: "Bid-Ready Package", starts: "$1,500" },
      { name: "Baseline CPM Schedule", starts: "$400" },
      { name: "Schedule Health Audit", starts: "$300" },
      { name: "Recovery Schedule", starts: "$600" },
      { name: "Cash-Flow & S-Curve Setup", starts: "$700" },
      { name: "Cost Evaluation", starts: "$400" },
      { name: "Contractor Evaluation", starts: "$300" },
      { name: "Constructability Review", starts: "$400" },
      { name: "QA/QC Plan Development", starts: "$400" },
      { name: "Inspection Checklist Package", starts: "$200" },
    ],
  },
  {
    tier: "HOURLY",
    name: "Ongoing Support",
    usd: "$25 – $55/hr",
    inr: "₹1,500 – ₹3,500/hr",
    billing: "Hourly, minimum 10 hrs/month",
    description:
      "Flexible support for ongoing or evolving project needs. Scale up or down based on project intensity.",
    services: [
      { name: "Fractional Project Controls", starts: "$25/hr" },
      { name: "Change Order Analysis", starts: "$25/hr" },
    ],
  },
  {
    tier: "MONTHLY",
    name: "Retainer",
    usd: "$800 – $3,000/mo",
    inr: "₹50,000 – ₹1,80,000/mo",
    billing: "Monthly advance, 3-month min recommended",
    description:
      "Dedicated support with predictable monthly cost. Includes regular deliverables, status calls, and dashboard access.",
    services: [
      { name: "Monthly Schedule Updates", starts: "$800/mo" },
      { name: "Project Controls Retainer", starts: "$1,200/mo" },
      { name: "Design Management Retainer", starts: "$1,000/mo" },
    ],
  },
  {
    tier: "ADVISORY",
    name: "Expert & Forensic",
    usd: "$50 – $80/hr",
    inr: "₹3,500 – ₹5,500/hr",
    billing: "Hourly or project-based, engagement letter required",
    description:
      "Specialized expertise for disputes, claims, and complex project challenges. Formal engagement terms.",
    services: [
      { name: "Forensic Delay Analysis", starts: "$50/hr" },
      { name: "Performance Evaluation", starts: "$55/hr" },
    ],
  },
];

const PRICING_DRIVERS = [
  {
    driver: "Project Value",
    low: "< $1M",
    mid: "$1–10M",
    high: "$10M+",
  },
  {
    driver: "Complexity",
    low: "Residential / simple",
    mid: "Commercial / multi-trade",
    high: "Healthcare, Data Center",
  },
  {
    driver: "Estimate Class",
    low: "Class 5 (conceptual)",
    mid: "Class 3 (design dev)",
    high: "Class 1 (bid-ready)",
  },
  {
    driver: "Scope Size",
    low: "< 20 sheets / < 150 activities",
    mid: "20–50 sheets / 150–400",
    high: "50+ sheets / 400+",
  },
  {
    driver: "Urgency",
    low: "Standard (5–10 days)",
    mid: "Expedited (+15%)",
    high: "Rush 24–48h (+25%)",
  },
];

export default function PricingPage() {
  const [currency, setCurrency] = useState<"usd" | "inr">("usd");

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-bg-primary pb-16 pt-24 sm:pb-20 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-[clamp(18px,2.5vw,24px)] font-bold uppercase tracking-[0.15em] text-gold">
                Pricing
              </h2>
              <h1 className="mt-3 text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] tracking-tight text-heading">
                Transparent. Fixed. No Surprises.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
                Get an instant quote in under 2 minutes — select your services,
                enter project details, and see your price breakdown
                immediately. No hourly surprises, no hidden fees.
              </p>
            </FadeIn>

            {/* Currency toggle */}
            <FadeIn delay={0.15}>
              <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-border-default bg-bg-card px-4 py-2">
                <button
                  onClick={() => setCurrency("usd")}
                  className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                    currency === "usd"
                      ? "bg-gold text-primary-foreground"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  USD
                </button>
                <button
                  onClick={() => setCurrency("inr")}
                  className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                    currency === "inr"
                      ? "bg-gold text-primary-foreground"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  INR
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Tier Cards */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6">
            <StaggerContainer className="grid gap-6 lg:grid-cols-2">
              {TIERS.map((t) => (
                <StaggerItem key={t.tier} className="flex">
                  <div className="flex h-full w-full flex-col rounded-xl border border-border-default bg-bg-card">
                    {/* Header */}
                    <div className="border-b border-border-default p-6">
                      <div className="flex items-center justify-between">
                        <span className="rounded-md border border-gold-border bg-gold-dim px-2.5 py-1 text-xs font-bold text-gold-text">
                          {t.tier}
                        </span>
                        <span className="text-xs text-text-muted">
                          {t.billing}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-semibold text-heading">
                        {t.name}
                      </h3>
                      <div className="mt-2 text-2xl font-bold text-heading">
                        {currency === "usd" ? t.usd : t.inr}
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">
                        {t.description}
                      </p>
                    </div>

                    {/* Services list */}
                    <div className="flex-1 p-6">
                      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Included Services
                      </h4>
                      <ul className="space-y-2">
                        {t.services.map((s) => (
                          <li
                            key={s.name}
                            className="flex items-center justify-between gap-4"
                          >
                            <span className="text-sm text-text-secondary">
                              {s.name}
                            </span>
                            <span className="shrink-0 text-sm font-medium text-heading">
                              From {s.starts}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="border-t border-border-default p-6">
                      <Link
                        href="/get-started"
                        className="block rounded-lg bg-gold px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold-hover"
                      >
                        Request Instant Quote &rarr;
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Pricing Drivers */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <h2 className="text-center text-[clamp(24px,3.5vw,36px)] font-semibold text-heading">
                What Drives the Price
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-text-secondary">
                The final quote depends on these factors. We assess each during
                the discovery call and confirm in writing before work begins.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="border-b border-border-default">
                      <th className="pb-3 text-sm font-semibold text-heading">
                        Driver
                      </th>
                      <th className="pb-3 text-sm font-semibold text-text-secondary">
                        Low End
                      </th>
                      <th className="pb-3 text-sm font-semibold text-text-secondary">
                        Mid Range
                      </th>
                      <th className="pb-3 text-sm font-semibold text-text-secondary">
                        High End
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PRICING_DRIVERS.map((d) => (
                      <tr
                        key={d.driver}
                        className="border-b border-border-default"
                      >
                        <td className="py-3 text-sm font-medium text-heading">
                          {d.driver}
                        </td>
                        <td className="py-3 text-sm text-text-secondary">
                          {d.low}
                        </td>
                        <td className="py-3 text-sm text-text-secondary">
                          {d.mid}
                        </td>
                        <td className="py-3 text-sm text-text-secondary">
                          {d.high}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Rush Surcharge */}
        <section className="bg-bg-secondary py-12">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <div className="flex flex-wrap items-center justify-center gap-6 text-center">
                <div className="rounded-xl border border-border-default bg-bg-card px-6 py-4">
                  <div className="text-lg font-bold text-heading">Standard</div>
                  <div className="mt-1 text-sm text-text-secondary">
                    5–10 business days
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gold-text">
                    Base price
                  </div>
                </div>
                <div className="rounded-xl border border-border-default bg-bg-card px-6 py-4">
                  <div className="text-lg font-bold text-heading">Expedited</div>
                  <div className="mt-1 text-sm text-text-secondary">
                    50% faster turnaround
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gold-text">
                    +15% surcharge
                  </div>
                </div>
                <div className="rounded-xl border border-gold-border bg-gold-dim px-6 py-4">
                  <div className="text-lg font-bold text-heading">Rush</div>
                  <div className="mt-1 text-sm text-text-secondary">
                    24–48 hours
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gold-text">
                    +25% surcharge
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding relative overflow-hidden bg-bg-primary">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[400px] w-[400px] rounded-full bg-gold/[0.05] blur-[100px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-[clamp(28px,3.5vw,40px)] font-semibold text-heading">
                Ready for an Exact Quote?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
                Get an instant quote in under 2 minutes, or book a discovery
                call for complex projects.
              </p>
              <Link
                href="/get-started"
                className="mt-8 inline-block rounded-lg bg-gold px-10 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-gold-hover"
              >
                Request Instant Quote &rarr;
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
