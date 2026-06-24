"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const FAQ_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      {
        q: "How does the instant quote work?",
        a: "Select your service categories, enter project details (type, stage, value, scope size, urgency), and click 'Calculate My Quote.' The system instantly generates a detailed price breakdown with line items, multipliers, and a ±15% accuracy range. No call needed — you see the quote immediately.",
      },
      {
        q: "Is the instant quote accurate?",
        a: "The instant quote is an indicative estimate with ±15% accuracy, based on your project details and our published rate card. The final price is confirmed after we review your actual documents and verify scope. Most final quotes fall within the indicated range.",
      },
      {
        q: "Do I need complete drawings to request a quote?",
        a: "No. Partial drawings and preliminary specs are fine. The instant quote calculator works with approximate details. When you proceed to booking, we review whatever documents you have and flag any gaps that could affect the final price.",
      },
      {
        q: "What is the discovery call?",
        a: "A 30-minute video call (Zoom) for $50 where we discuss your project scope in detail. The $50 is fully credited toward your first engagement — so if you proceed, the call costs you nothing. Best for complex, multi-discipline, or early-stage projects where a conversation is more efficient than document exchange.",
      },
      {
        q: "What if I just want to talk before committing?",
        a: "The $50 discovery call is designed for exactly that. It filters out casual inquiries while ensuring serious clients get dedicated time and attention. The fee is credited to your first engagement, making it risk-free if you proceed.",
      },
    ],
  },
  {
    title: "Estimation Services",
    items: [
      {
        q: "Which estimate class do I need?",
        a: "It depends on your project stage. Pre-Design → Class 5/4 (Conceptual). Design Development → Class 3. Construction Documents → Class 2 (Detailed). Bidding → Class 1 (Bid-Ready). Our instant quote calculator automatically recommends the right class based on your project stage.",
      },
      {
        q: "What's included in a quantity takeoff?",
        a: "Every measured item is color-coded on marked-up plans (Bluebeam PDF) with direct links to the Excel spreadsheet. Waste factors are applied, units are clearly labeled, and the spreadsheet is organized by CSI division or your preferred structure. One revision round is included.",
      },
      {
        q: "Can you match my bid form template?",
        a: "Yes. For Bid-Ready estimates (EST-04), we complete your owner's bid form template exactly as required for submission. Share the template with your documents and we'll fill it as part of the deliverable.",
      },
      {
        q: "What cost databases do you use?",
        a: "RS Means is our primary benchmark database. We also cross-reference regional market rates, historical project data, and contractor pricing databases. All sources are documented in the assumptions log included with every estimate.",
      },
    ],
  },
  {
    title: "Scheduling Services",
    items: [
      {
        q: "Which scheduling software do you use?",
        a: "MS Project (.mpp) and Primavera P6 (.xer). We deliver native files in whichever format your team or contract requires. PDF Gantt charts and narrative reports are included with every schedule delivery.",
      },
      {
        q: "Can you update an existing schedule?",
        a: "Yes. Monthly Schedule Updates (SCH-02) are one of our core services. Send us your existing .mpp or .xer file with progress data, and we update percent complete, analyze variance, identify critical path shifts, and produce a 3-week look-ahead.",
      },
      {
        q: "What is forensic delay analysis?",
        a: "Expert analysis of schedule delays for disputes, claims, and litigation. We use Time Impact Analysis (TIA) methodology per AACE Recommended Practice 29R-03, comparing as-planned vs as-built schedules to identify delay responsibility. Delivered as a formal report with timeline exhibits.",
      },
    ],
  },
  {
    title: "Project Controls & Design Management",
    items: [
      {
        q: "What does 'fractional controls' mean?",
        a: "Instead of hiring a full-time project controls engineer ($115K+/year), you get the same discipline — earned value tracking, cost reporting, variance analysis, dashboards — on an hourly or monthly basis. Scale up during busy periods, scale down when not needed.",
      },
      {
        q: "How does the design management retainer work?",
        a: "A monthly retainer covers all 6 disciplines: RFI tracking, submittal reviews, consultant coordination, timeline oversight, budget monitoring, and quality standards. Approximately 1–2 hours of daily coordination, with weekly status reports and action item tracking.",
      },
    ],
  },
  {
    title: "Pricing & Payment",
    items: [
      {
        q: "How is pricing determined?",
        a: "Base rates are published on our pricing page. Final price depends on project value, type (complexity), scope size (drawing sheets), and urgency. The instant quote calculator shows exactly how each factor affects your price with labeled multipliers.",
      },
      {
        q: "What are the payment terms?",
        a: "Fixed-price under $500: 100% advance. Fixed-price $500+: 50% advance, 50% on delivery. Hourly: weekly invoicing, Net-7. Monthly retainers: advance payment by the 7th. All payments via Razorpay (international cards + India UPI).",
      },
      {
        q: "Are taxes included in quoted prices?",
        a: "No. All quoted prices are exclusive of taxes. Applicable taxes (GST for India, or sales tax based on jurisdiction) will be added to the invoice as required by law.",
      },
      {
        q: "Is there a minimum engagement size?",
        a: "The smallest fixed-price service starts from $75 (single-trade quantity takeoff). Hourly support has a 10-hour/month minimum. Monthly retainers start at $800/month with no long-term lock-in.",
      },
      {
        q: "Do you offer expedited or rush delivery?",
        a: "Yes. Standard turnaround is 5–10 business days. Expedited delivery (50% faster) carries a +15% surcharge. Rush delivery (24–48 hours) carries a +25% surcharge. Urgency is selected during the instant quote process.",
      },
    ],
  },
  {
    title: "Delivery & Revisions",
    items: [
      {
        q: "How are deliverables shared?",
        a: "Everything is exchanged via a shared Google Drive folder — documents in, deliverables out. No proprietary platforms, no expiring links, no file size limits. The folder stays accessible throughout the project and after completion.",
      },
      {
        q: "What file formats do you deliver?",
        a: "Excel workbooks (.xlsx) for estimates and BOQs. Bluebeam marked-up plans (.pdf). MS Project (.mpp) or Primavera P6 (.xer) for schedules. PDF reports for narratives and summaries. Power BI dashboards for controls clients.",
      },
      {
        q: "How many revisions are included?",
        a: "One revision round is included in every fixed-price engagement at no extra cost. Send consolidated feedback after reviewing the deliverables, and we incorporate all changes. Additional revision rounds are available at an hourly rate, confirmed before we proceed.",
      },
      {
        q: "Can you work to my timezone?",
        a: "Yes. We coordinate across North America, Europe, the Gulf, and India. Discovery calls and delivery walkthroughs are scheduled via Cal.com — pick any slot that works for you. Async delivery means most work happens while you sleep.",
      },
    ],
  },
] as const;

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden bg-bg-primary pb-16 pt-24 sm:pb-20 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                Home
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-[clamp(13px,1.8vw,15px)] font-bold uppercase tracking-[0.18em] text-gold">FAQ</p>
              <h1 className="mt-3 text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] tracking-tight text-heading">
                Frequently Asked Questions
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                Everything you need to know about working with Alfatrees PMC —
                from getting your first quote to final delivery.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[900px] px-6">
            <StaggerContainer className="space-y-10">
              {FAQ_SECTIONS.map((section) => (
                <StaggerItem key={section.title}>
                  <h2 className="mb-4 text-lg font-bold text-heading">{section.title}</h2>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <AccordionItem key={item.q} question={item.q} answer={item.a} />
                    ))}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding relative overflow-hidden bg-bg-primary">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[400px] w-[400px] rounded-full bg-gold/[0.05] blur-[100px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-[clamp(28px,4vw,44px)] font-semibold text-heading">Still Have Questions?</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
                Get an instant quote in under 2 minutes, or email us at info.alfatrees@gmail.com.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link href="/get-started" className="rounded-lg bg-gold px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-gold-hover">
                  Request Instant Quote &rarr;
                </Link>
                <a href="mailto:info.alfatrees@gmail.com" className="rounded-lg border border-gold-border bg-transparent px-8 py-3.5 text-base font-semibold text-gold-text transition-colors hover:bg-gold-dim">
                  Email Us
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border-default bg-bg-card transition-colors hover:border-border-bright">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-semibold leading-snug text-heading">{question}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`mt-0.5 shrink-0 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="border-t border-border-default px-5 pb-5 pt-3">
          <p className="text-sm leading-relaxed text-text-secondary">{answer}</p>
        </div>
      )}
    </div>
  );
}
