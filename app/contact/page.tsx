import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { ContactCalendar } from "./contact-calendar";

export const metadata: Metadata = {
  title: "Contact & Availability",
  description:
    "Book a discovery call or check live availability. Alfatrees PMC — construction estimation, scheduling, and project controls delivered in 24–72 hours.",
};

const CONTACT_METHODS = [
  {
    label: "Email",
    value: "info.alfatrees@gmail.com",
    href: "mailto:info.alfatrees@gmail.com",
    detail: "Response within 2 hours during business hours",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Instant Quote",
    value: "Get a quote in under 2 minutes",
    href: "/get-started",
    detail: "Select services, enter project details, see pricing instantly",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/prakashchand222/",
    detail: "Professional network and industry updates",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
] as const;

const AVAILABILITY_INFO = [
  { label: "Timezone", value: "IST (UTC+5:30)" },
  { label: "Response Time", value: "Within 2 hours" },
  { label: "Quote Turnaround", value: "Under 24 hours" },
  { label: "Delivery Window", value: "24–72 hours typical" },
] as const;

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* ── Hero ─────────────────────────────────── */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-border bg-gold-dim px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-text">
                  Contact & Availability
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-6 max-w-3xl text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] tracking-tight text-heading">
                Let&apos;s Talk About{" "}
                <span className="text-gold">Your Project.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                Book a 30-minute discovery call to discuss your project scope,
                or reach out directly. Check live availability below and pick a
                time that works for you.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Contact Methods ──────────────────────── */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Get In Touch
              </p>
              <h2 className="mt-3 text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.2] text-heading">
                How to Reach Us
              </h2>
            </FadeIn>

            <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CONTACT_METHODS.map((method) => (
                <StaggerItem key={method.label}>
                  <Link
                    href={method.href}
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-full flex-col rounded-xl border border-border-default bg-bg-card p-6 transition-colors duration-200 hover:border-gold/40"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-dim text-gold-text">
                      {method.icon}
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-heading">
                      {method.label}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gold">
                      {method.value}
                    </p>
                    <p className="mt-2 flex-1 text-sm text-text-muted">
                      {method.detail}
                    </p>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Availability Quick Stats ─────────────── */}
        <section className="bg-bg-primary py-8">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {AVAILABILITY_INFO.map((item) => (
                <FadeIn key={item.label}>
                  <div className="rounded-xl border border-border-default bg-bg-card p-5 text-center">
                    <div className="text-lg font-semibold text-heading">{item.value}</div>
                    <div className="mt-1 text-xs text-text-muted">{item.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Calendar Embed ───────────────────────── */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Live Availability
              </p>
              <h2 className="mt-3 text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.2] text-heading">
                Book a Discovery Call
              </h2>
              <p className="mt-4 max-w-2xl text-base text-text-secondary">
                30-minute video call to discuss your project scope, deliverables,
                and timeline. The $50 fee is fully credited toward your first
                engagement with Alfatrees PMC.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-10 overflow-hidden rounded-xl border border-border-default bg-bg-card">
                <ContactCalendar />
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 text-center text-sm text-text-muted">
                All times shown in your local timezone. Availability updates in
                real-time. Don&apos;t see a time that works?{" "}
                <Link href="mailto:info.alfatrees@gmail.com" className="text-gold hover:underline">
                  Email us
                </Link>{" "}
                and we&apos;ll find a slot.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── How It Works ─────────────────────────── */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                What Happens Next
              </p>
              <h2 className="mt-3 text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.2] text-heading">
                After You Book
              </h2>
            </FadeIn>

            <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Confirmation",
                  body: "You receive a calendar invite with a Zoom link and a brief intake form to share project details in advance.",
                },
                {
                  step: "02",
                  title: "Discovery Call",
                  body: "30-minute video call to review your project scope, drawings, and deliverable requirements.",
                },
                {
                  step: "03",
                  title: "Fixed Quote",
                  body: "Within 24 hours of the call, you receive a detailed fixed-price quote with scope, timeline, and deliverables.",
                },
                {
                  step: "04",
                  title: "Kick-Off",
                  body: "Once approved, work begins within 24–48 hours. Deliverables uploaded to a shared Google Drive folder.",
                },
              ].map((item) => (
                <StaggerItem key={item.step}>
                  <div className="flex h-full flex-col rounded-xl border border-border-default bg-bg-card p-6">
                    <span className="font-mono text-xs font-bold text-gold">
                      {item.step}
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-heading">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                      {item.body}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section className="section-padding relative overflow-hidden bg-bg-primary">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="h-[400px] w-[400px] rounded-full bg-gold/[0.05] blur-[100px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.15] text-heading">
                Prefer an Instant Quote?
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-lg text-text-secondary">
                Skip the call — select your services, enter project details, and
                get an instant price breakdown in under 2 minutes.
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/get-started"
                  className="rounded-lg bg-gold px-8 py-4 text-base font-semibold text-primary-foreground transition-colors hover:bg-gold-hover"
                >
                  Request Instant Quote &rarr;
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-lg border border-border-bright bg-bg-card px-8 py-4 text-base font-semibold text-text-primary transition-colors hover:bg-bg-secondary"
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
