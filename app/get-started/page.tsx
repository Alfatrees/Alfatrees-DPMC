"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/motion";
import {
  useServiceRequest,
  SERVICE_CATEGORIES,
  type ServiceCategory,
} from "@/components/service-request-provider";

const CATEGORY_META: Record<
  ServiceCategory,
  { href: string; docs: string[] }
> = {
  Estimation: {
    href: "/services/estimation",
    docs: [
      "Plan sets (PDF or DWG)",
      "Specifications (technical and general)",
      "Bid forms and submission templates (if applicable)",
    ],
  },
  Scheduling: {
    href: "/services/scheduling",
    docs: [
      "Existing schedule files (.mpp or .xer)",
      "Contract milestones and deadlines",
      "Progress data (for updates)",
    ],
  },
  "Project Controls": {
    href: "/services/controls",
    docs: [
      "Project schedule and budget breakdown",
      "Cost reports and invoices",
      "Progress data by trade or phase",
    ],
  },
  "Design Management": {
    href: "/services/design-management",
    docs: [
      "Drawing sets and specifications",
      "Consultant contacts and contracts",
      "Project schedule with design milestones",
    ],
  },
  "Evaluation & Review": {
    href: "/services/evaluation",
    docs: [
      "Existing estimates, bids, or budgets",
      "Performance data or schedule files",
      "Drawing sets or BIM models (for constructability)",
    ],
  },
  "Quality Planning": {
    href: "/services/quality-planning",
    docs: [
      "Project specifications and applicable codes",
      "Scope description and trade list",
    ],
  },
};

export default function GetStartedPage() {
  const { selected, toggle, isSelected, clear, count } = useServiceRequest();

  const allDocs = selected.flatMap((cat) => CATEGORY_META[cat].docs);
  const uniqueDocs = [...new Set(allDocs)];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-bg-primary pb-12 pt-24 sm:pb-16 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-[clamp(18px,2.5vw,24px)] font-bold uppercase tracking-[0.15em] text-gold">
                Get Started
              </h2>
              <h1 className="mt-3 text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] tracking-tight text-heading">
                Tell Us What You Need
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
                Select the service categories relevant to your project. We'll
                generate a document checklist and book your free scope call.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Service Category Selection */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[900px] px-6">
            <FadeIn>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-heading">
                  Select Service Categories
                </h2>
                {count > 0 && (
                  <button
                    onClick={clear}
                    className="text-sm text-text-muted transition-colors hover:text-text-primary"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <p className="mt-2 text-sm text-text-secondary">
                Choose one or more. Sub-service details will be discussed on the
                scope call.
              </p>
            </FadeIn>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {SERVICE_CATEGORIES.map((cat) => {
                const active = isSelected(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggle(cat)}
                    className={`flex items-center gap-4 rounded-xl border p-5 text-left transition-all duration-150 ${
                      active
                        ? "border-gold bg-gold-dim"
                        : "border-border-default bg-bg-card hover:border-border-bright"
                    }`}
                  >
                    {/* Checkbox */}
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                        active
                          ? "border-gold bg-gold"
                          : "border-border-bright bg-transparent"
                      }`}
                    >
                      {active && (
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <div>
                      <span className="text-base font-semibold text-heading">
                        {cat}
                      </span>
                      <Link
                        href={CATEGORY_META[cat].href}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-0.5 block text-xs text-gold-text transition-colors hover:text-gold-hover"
                      >
                        View details &rarr;
                      </Link>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Document Checklist + Project Brief */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Document Checklist */}
              <FadeIn>
                <div className="rounded-xl border border-border-default bg-bg-card p-6">
                  <h3 className="text-lg font-semibold text-heading">
                    Documents to Prepare
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">
                    Based on your selected services. Share via Google Drive.
                  </p>
                  {uniqueDocs.length > 0 ? (
                    <ul className="mt-5 space-y-3">
                      {uniqueDocs.map((doc) => (
                        <li
                          key={doc}
                          className="flex items-start gap-3"
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
                            className="mt-0.5 shrink-0 text-gold"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                          <span className="text-sm text-text-secondary">
                            {doc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 text-sm text-text-muted">
                      Select service categories above to see required documents.
                    </p>
                  )}
                </div>
              </FadeIn>

              {/* Project Brief */}
              <FadeIn delay={0.1}>
                <div className="rounded-xl border border-border-default bg-bg-card p-6">
                  <h3 className="text-lg font-semibold text-heading">
                    Project Brief
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">
                    Optional — helps us prepare for the call.
                  </p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label
                        htmlFor="project-type"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Project Type
                      </label>
                      <select
                        id="project-type"
                        className="w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2.5 text-sm text-text-primary"
                      >
                        <option value="">Select...</option>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Hospitality</option>
                        <option>Healthcare</option>
                        <option>Institutional</option>
                        <option>Industrial</option>
                        <option>Data Center</option>
                        <option>Interior Fit-out</option>
                        <option>Mixed-Use</option>
                        <option>Renovation</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="project-details"
                        className="mb-1.5 block text-sm font-medium text-text-primary"
                      >
                        Tell us about your project
                      </label>
                      <textarea
                        id="project-details"
                        rows={4}
                        placeholder="Brief scope, approximate size, timeline expectations..."
                        className="w-full resize-none rounded-lg border border-border-default bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[900px] px-6">
            <FadeIn>
              <div className="rounded-xl border border-border-default bg-bg-card p-8 text-center">
                <h2 className="text-2xl font-semibold text-heading">
                  Book Your Free Scope Call
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-text-secondary">
                  15 minutes. No commitment. We'll review your project needs and
                  send a fixed quote within 24 hours.
                </p>

                {count > 0 && (
                  <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-2">
                    {selected.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-md border border-gold-border bg-gold-dim px-3 py-1 text-sm font-medium text-gold-text"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                {/* Cal.com placeholder — replace with actual embed in production */}
                <div className="mx-auto mt-8 max-w-md rounded-xl border-2 border-dashed border-border-bright bg-bg-primary p-10">
                  <div className="text-sm text-text-muted">
                    Cal.com scheduling widget will be embedded here
                  </div>
                  <div className="mt-2 text-xs text-text-muted">
                    Selected services will be pre-filled in the booking notes
                  </div>
                </div>

                <div className="mt-8 border-t border-border-default pt-6">
                  <p className="text-sm text-text-secondary">
                    Need a deeper consultation?{" "}
                    <span className="font-medium text-heading">
                      60-minute paid discovery — $50
                    </span>{" "}
                    (credited to your first engagement)
                  </p>
                  {/* Razorpay placeholder */}
                  <button
                    className="mt-4 rounded-lg border border-gold-border bg-transparent px-6 py-2.5 text-sm font-semibold text-gold-text transition-colors hover:bg-gold-dim"
                    onClick={() => {
                      // Razorpay integration — placeholder
                      alert(
                        "Razorpay payment gateway will be integrated here for paid discovery calls."
                      );
                    }}
                  >
                    Book Paid Discovery ($50) &rarr;
                  </button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
