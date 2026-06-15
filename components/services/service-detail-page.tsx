"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import type { ServiceGroup } from "@/lib/constants";

/* ─────────────────────────────────────────────
   Expandable Service Card — equal heights,
   click to reveal full methodology & tools
   ───────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: ServiceGroup["services"][number];
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex h-full cursor-pointer flex-col rounded-xl border border-border-default bg-bg-card transition-all duration-200 hover:border-border-bright"
      onClick={() => setOpen(!open)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(!open);
        }
      }}
      aria-expanded={open}
    >
      {/* Always-visible content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold-dim font-mono text-sm font-bold text-gold-text">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-semibold leading-snug text-heading">
              {service.name}
            </h3>
          </div>
          {service.badge && (
            <span className="shrink-0 rounded-md border border-gold-border bg-gold-dim px-2.5 py-1 text-xs font-semibold text-gold-text">
              {service.badge}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm font-medium text-text-primary">
          {service.summary}
        </p>
        <ul className="mt-3 flex-1 space-y-1.5">
          {service.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-muted" />
              {bullet}
            </li>
          ))}
        </ul>

        {/* Deliverable row */}
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-border-default bg-bg-primary p-3">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0 text-gold"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">Deliverable: </span>
            {service.deliverable}
          </span>
        </div>

        {/* Timeline badge */}
        {service.timeline && (
          <div className="mt-3 flex items-center gap-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-text-muted"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs text-text-muted">
              Typical: {service.timeline}
            </span>
          </div>
        )}

        {/* Expand indicator */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-gold-text">
          <span>{open ? "Hide details" : "View methodology & tools"}</span>
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </div>
      </div>

      {/* Expandable section */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border-default px-6 pb-6 pt-4">
              {service.methodology && service.methodology.length > 0 && (
                <div className="mb-4">
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Methodology
                  </h4>
                  <ul className="space-y-1.5">
                    {service.methodology.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {service.tools && service.tools.length > 0 && (
                <div>
                  <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {service.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md border border-border-default bg-bg-primary px-2.5 py-1 text-xs font-medium text-text-secondary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Check list item
   ───────────────────────────────────────────── */
function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 shrink-0 text-gold"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span className="text-sm leading-relaxed text-text-secondary">{text}</span>
    </li>
  );
}

/* ─────────────────────────────────────────────
   Main page layout
   ───────────────────────────────────────────── */
export function ServiceDetailPage({ data }: { data: ServiceGroup }) {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-bg-primary pb-16 pt-24 sm:pb-20 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                All Services
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-gold">
                {data.title}
              </p>
              <h1 className="mt-2 text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] tracking-tight text-heading">
                {data.headline}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
                {data.description}
              </p>
            </FadeIn>

            {/* Stats bar */}
            <FadeIn delay={0.3}>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {data.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-border-default bg-bg-card px-5 py-4"
                  >
                    <div className="text-2xl font-bold text-heading">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs text-text-muted">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PROCESS WORKFLOW ── */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <h2 className="text-[clamp(24px,3.5vw,36px)] font-semibold text-heading">
                How It Works
              </h2>
              <p className="mt-3 text-text-secondary">
                Our {data.title.toLowerCase()} process from start to finish.
              </p>
            </FadeIn>

            {/* Desktop: horizontal stepper */}
            <div className="mt-12 hidden lg:block">
              <StaggerContainer className="grid grid-cols-6 gap-4">
                {data.processSteps.map((ps) => (
                  <StaggerItem key={ps.step} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-bg-primary text-lg font-bold text-gold">
                        {ps.step}
                      </div>
                      {ps.step < data.processSteps.length && (
                        <div className="absolute left-[calc(50%+28px)] top-6 h-px w-[calc(100%-56px)] bg-gold/30" />
                      )}
                      <h3 className="mt-3 text-sm font-semibold text-heading">
                        {ps.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                        {ps.detail}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="mt-10 lg:hidden">
              <div className="relative ml-5 border-l-2 border-gold/30 pl-8">
                {data.processSteps.map((ps) => (
                  <FadeIn key={ps.step} delay={ps.step * 0.05}>
                    <div className="relative mb-8 last:mb-0">
                      <div className="absolute -left-[calc(1rem+13px)] flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-bg-primary font-bold text-gold">
                        {ps.step}
                      </div>
                      <h3 className="text-base font-semibold text-heading">
                        {ps.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {ps.detail}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES LIST ── */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <h2 className="text-[clamp(24px,3.5vw,36px)] font-semibold text-heading">
                {data.services.length} Specialized Services
              </h2>
              <p className="mt-3 max-w-2xl text-text-secondary">
                Click any service to reveal methodology, tools used, and typical
                timeline.
              </p>
            </FadeIn>
            <StaggerContainer className="mt-12 grid gap-5 lg:grid-cols-2">
              {data.services.map((service, i) => (
                <StaggerItem key={service.name} className="flex">
                  <ServiceCard service={service} index={i} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── WHAT YOU PROVIDE / WHAT WE DELIVER ── */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <h2 className="mb-12 text-center text-[clamp(24px,3.5vw,36px)] font-semibold text-heading">
                The Exchange
              </h2>
            </FadeIn>
            <div className="grid gap-8 lg:grid-cols-2">
              <FadeIn>
                <div className="flex h-full flex-col rounded-xl border border-border-default bg-bg-card p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-secondary">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-heading">
                        What You Provide
                      </h3>
                      <p className="text-xs text-text-muted">
                        Upload via Google Drive or your preferred platform
                      </p>
                    </div>
                  </div>
                  <ul className="flex-1 space-y-3">
                    {data.clientProvides.map((item) => (
                      <CheckItem key={item} text={item} />
                    ))}
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="flex h-full flex-col rounded-xl border border-gold-border bg-gold-dim p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/[0.12]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-heading">
                        What We Deliver
                      </h3>
                      <p className="text-xs text-text-muted">
                        All deliverables shared via your Google Drive folder
                      </p>
                    </div>
                  </div>
                  <ul className="flex-1 space-y-3">
                    {data.weDeliver.map((item) => (
                      <CheckItem key={item} text={item} />
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── STANDARDS & TOOLS ── */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-2xl font-semibold text-heading">
                Standards & Tools
              </h2>
              <p className="mt-3 text-text-secondary">
                Industry frameworks and professional software we work with.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {data.standardsAndTools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg border border-border-default bg-bg-card px-4 py-2.5 text-sm font-medium text-text-secondary"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PROJECT TYPES ── */}
        <section className="bg-bg-secondary py-12">
          <div className="mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h3 className="text-lg font-semibold text-heading">
                Applicable Project Types
              </h3>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {data.projectTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-md bg-bg-primary px-3 py-1.5 text-sm text-text-secondary"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section-padding relative overflow-hidden bg-bg-primary">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[400px] w-[400px] rounded-full bg-gold/[0.05] blur-[100px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-[clamp(28px,3.5vw,40px)] font-semibold text-heading">
                Ready to Get Started?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
                Book a free 15-minute scope call. Exact quote within 24 hours.
                Starts from{" "}
                <span className="font-semibold text-heading">
                  {data.pricingStarts.usd}
                </span>
                .
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/get-started"
                  className="rounded-lg bg-gold px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-gold-hover"
                >
                  {data.ctaText} &rarr;
                </Link>
                <Link
                  href="/#pricing"
                  className="rounded-lg border border-gold-border bg-transparent px-8 py-3.5 text-base font-semibold text-gold-text transition-colors hover:bg-gold-dim"
                >
                  View All Pricing
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
