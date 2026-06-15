"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import type { ServiceGroup } from "@/lib/constants";

function ServiceCard({ service }: { service: ServiceGroup["services"][number] }) {
  return (
    <div className="rounded-xl border border-border-default bg-bg-card p-6 transition-colors hover:border-border-bright">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-heading">{service.name}</h3>
        {service.badge && (
          <span className="shrink-0 rounded-md border border-gold-border bg-gold-dim px-2.5 py-1 text-xs font-semibold text-gold-text">
            {service.badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {service.description}
      </p>
      <div className="mt-4 flex items-center gap-2 border-t border-border-default pt-4">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-gold"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        <span className="text-sm text-text-secondary">
          <span className="font-medium text-text-primary">Deliverable:</span>{" "}
          {service.deliverable}
        </span>
      </div>
    </div>
  );
}

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
      <span className="text-sm text-text-secondary">{text}</span>
    </li>
  );
}

export function ServiceDetailPage({ data }: { data: ServiceGroup }) {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-bg-primary pb-20 pt-24 sm:pb-28 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                All Services
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 text-[clamp(36px,5vw,60px)] font-bold leading-[1.1] tracking-tight text-heading">
                {data.headline}
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary">
                {data.description}
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 rounded-lg border border-border-default bg-bg-card px-4 py-2">
                  <span className="text-sm text-text-muted">Starts from</span>
                  <span className="text-base font-bold text-heading">
                    {data.pricingStarts.usd}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border-default bg-bg-card px-4 py-2">
                  <span className="text-sm text-text-muted">Pricing</span>
                  <span className="text-sm font-semibold text-gold-text">
                    {data.pricingTier}
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border-default bg-bg-card px-4 py-2">
                  <span className="text-sm text-text-muted">Services</span>
                  <span className="text-sm font-semibold text-heading">
                    {data.services.length}
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <h2 className="text-[clamp(28px,3.5vw,40px)] font-semibold text-heading">
                What We Deliver
              </h2>
              <p className="mt-3 text-text-secondary">
                {data.services.length} specialized services in {data.title.toLowerCase()}.
              </p>
            </FadeIn>
            <StaggerContainer className="mt-12 grid gap-5 lg:grid-cols-2">
              {data.services.map((service) => (
                <StaggerItem key={service.name}>
                  <ServiceCard service={service} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* What You Provide / What We Deliver */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <FadeIn>
                <div className="rounded-xl border border-border-default bg-bg-card p-8">
                  <h3 className="text-xl font-semibold text-heading">
                    What You Provide
                  </h3>
                  <p className="mb-6 mt-2 text-sm text-text-muted">
                    Share these via Google Drive or your preferred platform.
                  </p>
                  <ul className="space-y-4">
                    {data.clientProvides.map((item) => (
                      <CheckItem key={item} text={item} />
                    ))}
                  </ul>
                </div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <div className="rounded-xl border border-gold-border bg-gold-dim p-8">
                  <h3 className="text-xl font-semibold text-heading">
                    What We Deliver
                  </h3>
                  <p className="mb-6 mt-2 text-sm text-text-muted">
                    All deliverables shared via your Google Drive folder.
                  </p>
                  <ul className="space-y-4">
                    {data.weDeliver.map((item) => (
                      <CheckItem key={item} text={item} />
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Project Types */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-2xl font-semibold text-heading">
                Applicable Project Types
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
                {data.projectTypes}
              </p>
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
                Ready to Get Started?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
                Book a free 15-minute scope call. Exact quote within 24 hours.
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
                  View Pricing
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
