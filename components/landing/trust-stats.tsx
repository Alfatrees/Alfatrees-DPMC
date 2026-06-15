"use client";

import { TRUST_STATS } from "@/lib/constants";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function TrustStats() {
  return (
    <section className="section-padding bg-bg-secondary">
      <div className="mx-auto max-w-[1280px] px-6">
        <StaggerContainer className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <div className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] text-white">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wider text-text-muted">
                {stat.label}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
