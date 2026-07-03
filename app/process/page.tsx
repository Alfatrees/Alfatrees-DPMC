import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Six steps from first contact to final delivery. Fixed quotes, shared Google Drive, one revision round included — no surprises at any stage.",
};

/* ─────────────────────────────────────────────────────────────
   Inline SVG icons — avoids a dependency, matches existing
   pattern in service-detail-page.tsx and navbar.tsx
   ───────────────────────────────────────────────────────────── */
function IconMessageSquare() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconVideo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function IconFileText() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconFolderOpen() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <polyline points="6 14 10 18 14 14" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-gold">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconFolder() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Data — expanded 6-step process with full detail
   ───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    number: 1,
    title: "Inquire",
    tagline: "Tell us what you need",
    icon: IconMessageSquare,
    summary:
      "Reach out via the website, email, or your preferred freelance platform. Share the basics — what service you need, project type, approximate size, and your timeline. No commitment required at this stage.",
    details: [
      "Contact us via the website contact form, info.alfatrees@gmail.com, or Upwork/Fiverr",
      "Share basic project info: service type, project category, rough size, and deadline",
      "Attach any documents you have — drawings, specs, or a scope summary if available",
      "We acknowledge every inquiry within a few hours and confirm whether we can help",
    ],
    note: null,
  },
  {
    number: 2,
    title: "Discover",
    tagline: "Instant quote or $50 discovery call",
    icon: IconVideo,
    summary:
      "Use our instant quote calculator to get a detailed price breakdown in under 2 minutes — no call needed. For complex or multi-discipline projects, book a 30-minute discovery call ($50) to discuss your scope.",
    details: [
      "Use the instant quote calculator — select services, enter project details, see your price breakdown immediately",
      "The quote shows every line item with service codes, rates, and multipliers for full transparency",
      "Book Now to proceed, or Email My Quote to review later — both capture your details",
      "For complex projects: book a 30-minute discovery call ($50) to discuss scope and requirements",
      "Confirm which specific services apply and agree on the engagement structure",
    ],
    note: null,
  },
  {
    number: 3,
    title: "Quote",
    tagline: "Fixed price within 24 hours",
    icon: IconFileText,
    summary:
      "Within 24 hours of the discovery call, you receive a fixed-price quote with clear scope, deliverables list, turnaround time, and payment terms. No hourly billing, no scope ambiguity, and no hidden fees.",
    details: [
      "Fixed-price quote delivered within 24 hours of document review or discovery call",
      "Quote includes: exact scope covered, specific deliverables list, and turnaround time",
      "Payment terms stated clearly — typically 50% upfront, 50% on delivery",
      "Exclusions listed explicitly so there are no scope interpretation disputes",
      "Quote is valid for 14 days — enough time to get internal approvals",
    ],
    note: null,
  },
  {
    number: 4,
    title: "Execute",
    tagline: "Work begins within 24–48 hours",
    icon: IconZap,
    summary:
      "Upon quote acceptance and payment, work begins within 24–48 hours. You get access to a shared Google Drive folder where all project files are exchanged — documents in, deliverables out.",
    details: [
      "Accept the quote and complete payment — payment instructions are included with your quote",
      "A shared Google Drive folder is created and shared with you immediately",
      "Upload all source documents to the shared folder — drawings, specs, existing files",
      "Work begins within 24–48 hours of receiving complete project documents",
      "You can monitor progress via the shared folder — intermediate files visible as work progresses",
    ],
    note: null,
  },
  {
    number: 5,
    title: "Deliver",
    tagline: "Deliverables to your shared drive",
    icon: IconFolderOpen,
    summary:
      "Completed deliverables are uploaded directly to your shared Google Drive folder. Formats are per agreement — Excel workbooks, PDF reports, .mpp schedule files, marked-up plans. You receive an email with a delivery summary.",
    details: [
      "All deliverables uploaded to your shared Google Drive folder when complete",
      "Formats delivered per the agreed scope: Excel, PDF, .mpp/.xer, or Bluebeam markup",
      "Email notification sent with a summary of what is included in the delivery",
      "Summary covers: files delivered, key assumptions, any items noted for your attention",
      "Every file is clearly named and organized — ready for immediate use",
    ],
    note: null,
  },
  {
    number: 6,
    title: "Review",
    tagline: "One revision round included",
    icon: IconCheckCircle,
    summary:
      "One revision round is included in every engagement. You review the deliverables and send consolidated feedback. We incorporate your changes and deliver the final version. Project closed with a satisfaction confirmation.",
    details: [
      "Review the deliverables at your own pace — no artificial deadline for feedback",
      "Send consolidated feedback via email or annotated comments in the shared folder",
      "We incorporate all feedback and deliver the revised final version",
      "Additional revision rounds available at a nominal hourly rate if needed",
      "A brief satisfaction confirmation closes the engagement and triggers any final payment",
    ],
    note: null,
  },
] as const;

const DOCUMENTS_TO_PREPARE = [
  "Plan sets in PDF or DWG format — architectural, structural, MEP as applicable",
  "Project specifications — technical sections and general/supplementary conditions",
  "Scope documents, RFI logs, or clarification memos",
  "Existing schedules in .mpp or .xer format (for scheduling and controls work)",
  "Contractor bids or existing estimates (for evaluation engagements)",
  "Contract milestones, liquidated damages clauses, and key deadline dates",
  "Budget information or approved project cost targets",
  "Bid forms or owner templates if you need us to complete them",
];

const COMMUNICATION_CHANNELS = [
  {
    icon: IconFolder,
    title: "Google Drive",
    description: "Permanent shared folder for all project files. Documents in, deliverables out. Stays accessible throughout the project and after.",
  },
  {
    icon: IconVideo,
    title: "Zoom / Teams",
    description: "Discovery calls, milestone check-ins, and delivery walkthroughs. Scheduled via Cal.com — pick a time that works for your timezone.",
  },
  {
    icon: IconMail,
    title: "Email",
    description: "Quote delivery, delivery notifications, feedback consolidation, and all formal project correspondence. Response within a few hours.",
  },
  {
    icon: IconCalendar,
    title: "Cal.com",
    description: "Self-serve booking for discovery calls and check-ins. No back-and-forth scheduling emails — pick a slot directly from our availability.",
  },
];

const TIMELINE_TABLE = [
  { service: "Quantity Takeoff — Single Trade", typical: "1–3 business days" },
  { service: "Quantity Takeoff — Multi Trade", typical: "3–7 business days" },
  { service: "Conceptual / Order of Magnitude Estimate", typical: "2–4 business days" },
  { service: "Design Development Estimate", typical: "3–5 business days" },
  { service: "Detailed / Definitive Estimate", typical: "5–10 business days" },
  { service: "Bid-Ready / Check Estimate", typical: "7–14 business days" },
  { service: "Bill of Quantities / BOQ", typical: "3–5 business days" },
  { service: "Change Order Estimate", typical: "2–5 business days" },
  { service: "Baseline CPM Schedule", typical: "5–10 business days" },
  { service: "Monthly Schedule Update", typical: "3–5 business days per cycle" },
  { service: "Schedule Health Audit", typical: "2–3 business days" },
  { service: "Recovery / Acceleration Schedule", typical: "5–10 business days" },
  { service: "Forensic Delay Analysis", typical: "10–20 business days" },
  { service: "Cash-Flow Forecast & S-Curve", typical: "5–7 business days" },
  { service: "Cost / Contractor Evaluation", typical: "3–7 business days" },
  { service: "Constructability Review", typical: "5–10 business days" },
  { service: "QA/QC Plan Development", typical: "5–10 business days" },
  { service: "Inspection Checklist Package", typical: "5–7 business days" },
];

/* ─────────────────────────────────────────────────────────────
   Page — Server Component (no "use client" needed here)
   Motion sub-components carry their own "use client" directives.
   ───────────────────────────────────────────────────────────── */
export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-bg-primary pb-16 pt-24 sm:pb-20 sm:pt-32">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Home
              </Link>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="mt-6 text-[clamp(13px,1.8vw,15px)] font-bold uppercase tracking-[0.18em] text-gold">
                How We Work
              </p>
              <h1 className="mt-3 text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] tracking-tight text-heading">
                From First Message<br className="hidden sm:block" /> to Final Delivery
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                Six clear steps. Fixed quotes, no hourly surprises. One revision
                round included in every engagement. Everything exchanged through
                a shared Google Drive folder — no platform lock-in.
              </p>
            </FadeIn>

            {/* Summary pills */}
            <FadeIn delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Fixed-price quotes",
                  "24-hr quote turnaround",
                  "Work starts in 24–48 hrs",
                  "Google Drive file exchange",
                  "One revision included",
                  "Global delivery",
                ].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-gold-border bg-gold-dim px-4 py-1.5 text-sm font-medium text-gold-text"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── 6-STEP PROCESS ───────────────────────────────────── */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn className="text-center">
              <h2 className="text-[clamp(26px,3.5vw,40px)] font-semibold text-heading">
                The Six Steps
              </h2>
              <p className="mt-3 text-base text-text-secondary">
                Every engagement follows this sequence — no exceptions, no hidden steps.
              </p>
            </FadeIn>

            {/* Step cards — vertical timeline layout */}
            <div className="relative mt-14">
              {/* Vertical connector line (desktop) */}
              <div className="absolute left-[2.25rem] top-10 hidden h-[calc(100%-5rem)] w-px bg-gold/25 lg:block" />

              <StaggerContainer className="flex flex-col gap-0">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === STEPS.length - 1;
                  return (
                    <StaggerItem key={step.number}>
                      <div className={`relative flex gap-6 lg:gap-10 ${isLast ? "" : "pb-10"}`}>

                        {/* Step number circle */}
                        <div className="relative z-10 flex shrink-0 flex-col items-center">
                          <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 border-gold bg-bg-secondary shadow-sm">
                            <span className="font-mono text-xl font-bold text-gold">
                              {step.number}
                            </span>
                          </div>
                        </div>

                        {/* Step content */}
                        <div className="flex-1 pb-2 pt-3">
                          <div className="rounded-xl border border-border-default bg-bg-card p-6 sm:p-8">
                            {/* Header */}
                            <div className="flex flex-wrap items-start gap-4">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-dim text-gold">
                                <Icon />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-heading sm:text-2xl">
                                  {step.title}
                                </h3>
                                <p className="mt-0.5 text-sm font-medium text-gold-text">
                                  {step.tagline}
                                </p>
                              </div>
                            </div>

                            {/* Summary */}
                            <p className="mt-5 text-base leading-relaxed text-text-primary">
                              {step.summary}
                            </p>

                            {/* Detail bullets */}
                            <ul className="mt-5 space-y-2.5">
                              {step.details.map((detail) => (
                                <li
                                  key={detail}
                                  className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
                                >
                                  <IconCheck />
                                  {detail}
                                </li>
                              ))}
                            </ul>

                            {/* Optional note */}
                            {step.note && (
                              <div className="mt-5 flex items-start gap-3 rounded-lg border border-gold-border bg-gold-dim px-4 py-3">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-gold">
                                  <circle cx="12" cy="12" r="10" />
                                  <line x1="12" y1="8" x2="12" y2="12" />
                                  <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <p className="text-sm leading-relaxed text-gold-text">
                                  {step.note}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* ── WHAT TO HAVE READY ───────────────────────────────── */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
              {/* Left — headline and context */}
              <FadeIn>
                <div className="lg:sticky lg:top-28">
                  <p className="text-[clamp(12px,1.5vw,13px)] font-bold uppercase tracking-[0.16em] text-gold">
                    Preparation
                  </p>
                  <h2 className="mt-3 text-[clamp(26px,3.5vw,38px)] font-semibold leading-[1.2] text-heading">
                    What to Have Ready
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-text-secondary">
                    The faster you can share complete project documents, the
                    faster work begins. Here is a checklist of the typical
                    documents we need — not all items apply to every service.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                    Do not wait until everything is perfect. Partial drawings or
                    preliminary specs are fine — we flag gaps during the scope
                    call and work with what is available.
                  </p>
                </div>
              </FadeIn>

              {/* Right — document list */}
              <FadeIn delay={0.1}>
                <div className="rounded-xl border border-border-default bg-bg-card p-6 sm:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-dim text-gold">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-heading">
                      Typical Documents Checklist
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {DOCUMENTS_TO_PREPARE.map((doc) => (
                      <li
                        key={doc}
                        className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary"
                      >
                        <IconCheck />
                        {doc}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-xs text-text-muted">
                    Share everything via the Google Drive folder we set up after
                    quote acceptance. No file size limits, no expiry links.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── COMMUNICATION ────────────────────────────────────── */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn className="text-center">
              <p className="text-[clamp(12px,1.5vw,13px)] font-bold uppercase tracking-[0.16em] text-gold">
                Communication
              </p>
              <h2 className="mt-3 text-[clamp(26px,3.5vw,40px)] font-semibold text-heading">
                How We Stay in Sync
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-base text-text-secondary">
                Four channels, each with a specific role. No proprietary
                platforms, no mandatory app installs — everything runs on tools
                you already have.
              </p>
            </FadeIn>

            <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {COMMUNICATION_CHANNELS.map((channel) => {
                const CIcon = channel.icon;
                return (
                  <StaggerItem key={channel.title}>
                    <div className="flex h-full flex-col rounded-xl border border-border-default bg-bg-card p-6 transition-colors hover:border-border-bright">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-dim text-gold">
                        <CIcon />
                      </div>
                      <h3 className="mt-4 text-base font-semibold text-heading">
                        {channel.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                        {channel.description}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* ── TIMELINE EXPECTATIONS ────────────────────────────── */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <p className="text-[clamp(12px,1.5vw,13px)] font-bold uppercase tracking-[0.16em] text-gold">
                Turnaround Times
              </p>
              <h2 className="mt-3 text-[clamp(26px,3.5vw,40px)] font-semibold text-heading">
                Typical Timeline by Service
              </h2>
              <p className="mt-4 max-w-2xl text-base text-text-secondary">
                Times run from receipt of complete project documents — not from
                the inquiry date. Incomplete drawings, missing specs, or pending
                clarifications pause the clock until resolved.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-10 overflow-hidden rounded-xl border border-border-default bg-bg-card">
                <div className="grid grid-cols-[1fr_auto] border-b border-border-default bg-bg-secondary px-6 py-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Service
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Typical Turnaround
                  </span>
                </div>
                <div className="divide-y divide-border-default">
                  {TIMELINE_TABLE.map((row, i) => (
                    <div
                      key={row.service}
                      className={`grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-3.5 ${
                        i % 2 === 0 ? "" : "bg-bg-secondary/40"
                      }`}
                    >
                      <span className="text-sm text-text-primary">
                        {row.service}
                      </span>
                      <span className="whitespace-nowrap rounded-md border border-gold-border bg-gold-dim px-3 py-1 text-xs font-semibold text-gold-text">
                        {row.typical}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border-default bg-bg-secondary px-6 py-4">
                  <p className="text-xs leading-relaxed text-text-muted">
                    Turnaround times are based on standard scope and complete document delivery. Large or complex projects may take longer — confirmed in the fixed-price quote before work begins.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FAQ LINK ─────────────────────────────────────────── */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <p className="text-base text-text-secondary">
                Have questions about revisions, file formats, timezones, or payments?{" "}
                <Link href="/faq" className="font-semibold text-gold-text hover:underline">
                  See our Frequently Asked Questions &rarr;
                </Link>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className="section-padding relative overflow-hidden bg-bg-primary">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[400px] w-[400px] rounded-full bg-gold/[0.05] blur-[100px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-[clamp(28px,4vw,44px)] font-semibold text-heading">
                Ready for an Instant Quote?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
                Get an instant quote in under 2 minutes, or book a discovery call for complex projects.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/get-started"
                  className="rounded-lg bg-gold px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-gold-hover"
                >
                  Request Instant Quote &rarr;
                </Link>
                <Link
                  href="/#services"
                  className="rounded-lg border border-gold-border bg-transparent px-8 py-3.5 text-base font-semibold text-gold-text transition-colors hover:bg-gold-dim"
                >
                  Browse Services
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
