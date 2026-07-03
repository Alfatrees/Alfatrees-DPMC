"use client";

import Link from "next/link";
import { TRUST_STATS } from "@/lib/constants";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function TrustStats() {
  return (
    <section className="section-padding bg-bg-secondary">
      <div className="mx-auto max-w-[1280px] px-6">
        <StaggerContainer className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {TRUST_STATS.map((stat) => {
            const content = (
              <>
                <div className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] text-heading transition-colors group-hover:text-gold">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                  {stat.label}
                </div>
              </>
            );
            return (
              <StaggerItem key={stat.label} className="text-center">
                {"href" in stat ? (
                  <Link
                    href={stat.href}
                    title={stat.title}
                    aria-label={`${stat.value} ${stat.label} — ${stat.title}`}
                    className="group block"
                  >
                    {content}
                    <span className="sr-only">
                      Dept. of Transportation &amp; Infrastructure, New Brunswick
                    </span>
                  </Link>
                ) : (
                  content
                )}
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
