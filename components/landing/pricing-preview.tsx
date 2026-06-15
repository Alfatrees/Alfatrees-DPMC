"use client";

import { useState } from "react";
import Link from "next/link";
import { PRICING_TIERS } from "@/lib/constants";

export function PricingPreview() {
  const [currency, setCurrency] = useState<"usd" | "inr">("usd");

  return (
    <section id="pricing" className="section-padding bg-bg-secondary">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] text-white">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Four simple tiers. Exact quote after discovery call.
            </p>
          </div>

          <button
            onClick={() => setCurrency(currency === "usd" ? "inr" : "usd")}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-border-default px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-bright hover:text-text-primary"
          >
            <span
              className={
                currency === "usd" ? "text-white" : "text-text-muted"
              }
            >
              $ USD
            </span>
            <span className="text-text-muted">/</span>
            <span
              className={
                currency === "inr" ? "text-white" : "text-text-muted"
              }
            >
              ₹ INR
            </span>
          </button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className="rounded-xl border border-border-default bg-bg-card p-6 transition-all duration-200 hover:border-b-gold hover:border-border-bright"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-gold-text">
                {tier.tier}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {tier.name}
              </h3>
              <div className="mt-4 text-xl font-semibold text-white">
                {currency === "usd" ? tier.range.usd : tier.range.inr}
              </div>
              <p className="mt-3 text-sm text-text-secondary">
                {tier.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-text-secondary">
          Exact quote within 24 hours of discovery call.{" "}
          <Link
            href="/pricing"
            className="text-gold-text transition-colors hover:text-gold-hover"
          >
            View Full Pricing &rarr;
          </Link>
        </p>
      </div>
    </section>
  );
}
