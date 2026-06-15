"use client";

import Link from "next/link";
import { SERVICE_PILLS } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-gold/[0.04] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
        <FadeIn>
          <h1 className="text-[clamp(40px,6vw,72px)] font-bold leading-[1.05] tracking-tight text-white">
            Bid-Ready Estimates in 48 Hours.
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mx-auto mt-6 max-w-3xl text-[clamp(16px,2vw,20px)] leading-relaxed text-text-secondary">
            From first concept to final bid — we deliver the estimates, schedules,
            and controls that keep your project on time, on budget, and audit-ready.
            Trusted across 10+ project types worldwide.
          </p>
        </FadeIn>

        <StaggerContainer className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {SERVICE_PILLS.map((pill) => (
            <StaggerItem key={pill.label}>
              <Link
                href={pill.href}
                className="inline-block rounded-lg border border-gold-border bg-transparent px-4 py-2 font-mono text-sm text-gold-text transition-colors hover:border-gold hover:bg-gold-dim"
              >
                {pill.label}
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.4}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-started"
              className="rounded-lg bg-gold px-8 py-3.5 text-base font-semibold text-bg-primary transition-colors hover:bg-gold-hover"
            >
              Get Started &rarr;
            </Link>
            <Link
              href="#process"
              className="rounded-lg border border-gold-border bg-transparent px-8 py-3.5 text-base font-semibold text-gold-text transition-colors hover:bg-gold-dim"
            >
              View Our Process
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
