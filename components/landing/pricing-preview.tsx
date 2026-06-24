"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PRICING_TIERS } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function PricingPreview() {
  const [currency, setCurrency] = useState<"usd" | "inr">("usd");
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  return (
    <section id="pricing" className="section-padding bg-bg-secondary">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
          <FadeIn>
            <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] text-heading">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Four simple tiers. Exact quote within 24 hours.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <button
              onClick={() =>
                setCurrency(currency === "usd" ? "inr" : "usd")
              }
              className="flex shrink-0 items-center gap-2 rounded-lg border border-border-default px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-border-bright hover:text-text-primary"
            >
              <span
                className={
                  currency === "usd" ? "text-heading" : "text-text-muted"
                }
              >
                $ USD
              </span>
              <span className="text-text-muted">/</span>
              <span
                className={
                  currency === "inr" ? "text-heading" : "text-text-muted"
                }
              >
                ₹ INR
              </span>
            </button>
          </FadeIn>
        </div>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_TIERS.map((tier) => {
            const isExpanded = expandedTier === tier.tier;
            return (
              <StaggerItem key={tier.tier}>
                <div
                  className="cursor-pointer rounded-xl border border-border-default bg-bg-card transition-all duration-200 hover:border-b-gold hover:border-border-bright"
                  onClick={() =>
                    setExpandedTier(isExpanded ? null : tier.tier)
                  }
                >
                  <div className="p-6">
                    <span className="text-xs font-medium uppercase tracking-wider text-gold-text">
                      {tier.tier}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-heading">
                      {tier.name}
                    </h3>
                    <div className="mt-4">
                      <span className="text-sm text-text-muted">
                        Starting from
                      </span>
                      <div className="mt-1 text-2xl font-bold text-heading">
                        {currency === "usd"
                          ? tier.startsFrom.usd
                          : tier.startsFrom.inr}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-text-secondary">
                      {tier.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm text-gold-text">
                      <span>
                        {isExpanded ? "Hide details" : "View details"}
                      </span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        &#9662;
                      </motion.span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border-default px-6 pb-6 pt-4">
                          <ul className="flex flex-col gap-3">
                            {tier.details.map((detail) => (
                              <li
                                key={detail.service}
                                className="flex items-start justify-between gap-2"
                              >
                                <span className="text-sm text-text-secondary">
                                  {detail.service}
                                </span>
                                <span className="shrink-0 text-sm font-medium text-heading">
                                  {currency === "usd"
                                    ? detail.price.usd
                                    : detail.price.inr}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <FadeIn delay={0.3}>
          <p className="mt-10 text-center text-sm text-text-secondary">
            Exact quote within 24 hours of your submission.{" "}
            <Link
              href="/pricing"
              className="text-gold-text transition-colors hover:text-gold-hover"
            >
              View Full Pricing &rarr;
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
