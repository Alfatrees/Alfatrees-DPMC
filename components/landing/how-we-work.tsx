"use client";

import { PROCESS_STEPS } from "@/lib/constants";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export function HowWeWork() {
  return (
    <section id="process" className="section-padding bg-bg-primary">
      <div className="mx-auto max-w-[1280px] px-6">
        <FadeIn className="text-center">
          <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.15] text-white">
            How We Work
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Six steps from inquiry to delivery. Clear timelines. No surprises.
          </p>
        </FadeIn>

        {/* Desktop: horizontal stepper */}
        <div className="mt-16 hidden lg:block">
          <div className="relative mx-auto max-w-4xl">
            {/* Static line */}
            <div className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-5 h-px bg-gold/20" />
            {/* Animated glow dot traveling left to right */}
            <div className="stepper-glow-track absolute left-[calc(100%/12)] right-[calc(100%/12)] top-5 h-px">
              <div className="stepper-glow-dot" />
            </div>
            <StaggerContainer className="relative grid grid-cols-6 gap-4">
              {PROCESS_STEPS.map((step) => (
                <StaggerItem
                  key={step.number}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-bg-primary text-sm font-semibold text-gold">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                    {step.detail}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Mobile/Tablet: vertical stepper */}
        <div className="mt-12 lg:hidden">
          <div className="relative ml-5 border-l-2 border-gold/30 pl-8">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn
                key={step.number}
                delay={i * 0.08}
                className={`relative ${i < PROCESS_STEPS.length - 1 ? "pb-10" : ""}`}
              >
                <div className="absolute -left-[calc(1rem+13px)] flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-bg-primary text-sm font-semibold text-gold">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {step.detail}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
