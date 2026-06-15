"use client";

import Link from "next/link";
import { FadeIn } from "@/components/ui/motion";

export function CtaSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-bg-secondary">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-gold/[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
        <FadeIn>
          <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] text-white">
            Your Project Deserves Better Controls.
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-text-secondary">
            Free 15-minute scope call. Exact quote in 24 hours.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <Link
            href="/get-started"
            className="mt-10 inline-block rounded-lg bg-gold px-10 py-4 text-lg font-semibold text-bg-primary transition-colors hover:bg-gold-hover"
          >
            Book a Free Scope Call &rarr;
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
