"use client";

import { STANDARDS_INTERNATIONAL } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function StandardsBadges() {
  return (
    <section className="section-padding bg-bg-primary">
      <div className="mx-auto max-w-[1280px] px-6 text-center">
        <FadeIn>
          <h3 className="text-lg font-medium text-text-muted">
            Aligned With Industry Standards
          </h3>
        </FadeIn>

        <StaggerContainer className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {STANDARDS_INTERNATIONAL.map((standard) => (
            <StaggerItem key={standard}>
              <span className="inline-block rounded-lg border border-border-default px-4 py-2 text-sm text-text-muted">
                {standard}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
