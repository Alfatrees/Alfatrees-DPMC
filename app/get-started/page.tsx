"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import dynamic from "next/dynamic";
import { FadeIn } from "@/components/ui/motion";
import {
  useServiceRequest,
  SERVICE_CATEGORIES,
} from "@/components/service-request-provider";

const CalEmbed = dynamic(() => import("@/components/cal-embed").then((m) => ({ default: m.CalEmbed })), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-border-default bg-bg-primary/50">
      <div className="text-sm text-text-muted">Loading calendar...</div>
    </div>
  ),
});
import {
  calculateQuote,
  formatUSD,
  formatRange,
  type QuoteInput,
  type QuoteBreakdown,
  type ProjectValueTier,
  type ProjectType,
  type ProjectStage,
  type Urgency,
  type SheetRange,
} from "@/lib/quote-engine";

type PagePath = "quote" | "discovery";

const PROJECT_STAGES: ProjectStage[] = [
  "Pre-Design / Feasibility", "Schematic Design (SD)", "Design Development (DD)",
  "Construction Documents (CD)", "Bidding & Procurement", "Construction (Active)",
  "Post-Construction / Closeout",
];

const PROJECT_TYPES: ProjectType[] = [
  "Residential", "Commercial", "Hospitality", "Healthcare", "Institutional",
  "Industrial", "Data Center", "Interior Fit-out", "Mixed-Use", "Renovation", "Other",
];

const VALUE_TIERS: ProjectValueTier[] = [
  "Under $500K", "$500K – $1M", "$1M – $5M", "$5M – $10M", "$10M – $50M", "$50M+",
];

const SHEET_RANGES: SheetRange[] = ["1–20", "21–50", "51–100", "100+"];

const STAGE_DOCS: Partial<Record<ProjectStage, string[]>> = {
  "Pre-Design / Feasibility": ["Site survey or feasibility study", "Preliminary program or area requirements"],
  "Schematic Design (SD)": ["Schematic drawings and massing studies", "Preliminary project budget"],
  "Design Development (DD)": ["DD-level drawings (architectural, structural, MEP)", "Updated specifications"],
  "Construction Documents (CD)": ["100% construction documents (all disciplines)", "Final specifications and addenda"],
  "Bidding & Procurement": ["Bid documents and invitation to bid", "Contractor prequalification forms"],
  "Construction (Active)": ["Current project schedule", "Progress reports", "Change order log and pending RFIs"],
  "Post-Construction / Closeout": ["As-built schedule and final cost reports", "Punch list documentation"],
};

export default function GetStartedPage() {
  const { selected, toggle, isSelected, clear, count } = useServiceRequest();
  const [path, setPath] = useState<PagePath>("quote");

  // Shared project fields
  const [location, setLocation] = useState("");
  const [stage, setStage] = useState<ProjectStage | "">("");
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [projectValue, setProjectValue] = useState<ProjectValueTier | "">("");
  const [urgency, setUrgency] = useState<Urgency>("Standard");

  // Quote-specific fields
  const [area, setArea] = useState("");
  const [sheets, setSheets] = useState<SheetRange | "">("");
  const [trades, setTrades] = useState("");
  const [quote, setQuote] = useState<QuoteBreakdown | null>(null);

  // Contact + document fields (shared by Book Now, Email Quote, and Discovery path)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  // UI states
  const [showContactForm, setShowContactForm] = useState<"book" | "email" | null>(null);
  const [showCalModal, setShowCalModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<"book" | "email" | "discovery" | null>(null);

  const canCalculate = count > 0 && stage && projectType && projectValue && sheets;

  function handleCalculate() {
    if (!canCalculate) return;
    setQuote(calculateQuote({
      services: [...selected],
      projectValue: projectValue as ProjectValueTier,
      projectType: projectType as ProjectType,
      projectStage: stage as ProjectStage,
      urgency,
      sheets: sheets as SheetRange,
      trades: parseInt(trades) || 1,
      areaSqFt: parseInt(area) || 0,
      location,
    }));
    setShowContactForm(null);
  }

  async function handleSubmit(type: "book" | "email" | "discovery") {
    if (!fullName.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          fullName, email, phone, company, driveLink, projectDetails,
          quote: quote ? {
            referenceNumber: quote.referenceNumber,
            lineItems: quote.lineItems.map((li) => ({ code: li.code, name: li.name, rangeLow: li.rangeLow, rangeHigh: li.rangeHigh, tier: li.tier })),
            totalLow: quote.totalLow, totalHigh: quote.totalHigh,
            input: quote.input,
          } : null,
          services: selected,
          projectLocation: location,
          projectStage: stage,
          projectType,
          projectValue,
        }),
      });
      if (res.ok) setSubmitted(type);
    } catch {
      alert("Something went wrong. Please email us at info.alfatrees@gmail.com.");
    } finally {
      setSubmitting(false);
    }
  }

  // ─── Success State ───
  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center pt-16">
          <div className="mx-auto max-w-lg px-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h1 className="mt-6 text-3xl font-bold text-heading">
              {submitted === "book" ? "Booking Request Received" : submitted === "discovery" ? "Discovery Call Request Received" : "Quote Sent to Your Email"}
            </h1>
            <p className="mt-4 text-text-secondary">
              {submitted === "discovery"
                ? <>We&apos;ll confirm your 30-minute discovery call at <strong className="text-heading">{email}</strong> shortly. The $50 fee is credited to your first engagement.</>
                : submitted === "book"
                  ? <>We&apos;ll review your project and confirm your engagement at <strong className="text-heading">{email}</strong> within 24 hours.</>
                  : <>Your detailed quote has been sent to <strong className="text-heading">{email}</strong>. We&apos;ll follow up to discuss next steps.</>
              }
            </p>
            {quote && <p className="mt-2 text-sm text-text-muted">Reference: {quote.referenceNumber}</p>}
            <Link href="/" className="mt-8 inline-block rounded-lg bg-gold px-8 py-3 text-base font-semibold text-primary-foreground transition-colors hover:bg-gold-hover">Back to Home</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* ── Hero + Path Selector ── */}
        <section className="relative overflow-hidden bg-bg-primary pb-12 pt-24 sm:pb-16 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-[clamp(18px,2.5vw,24px)] font-bold uppercase tracking-[0.15em] text-gold">
                Request Instant Quote
              </h2>
              <h1 className="mt-3 text-[clamp(32px,5vw,56px)] font-bold leading-[1.1] tracking-tight text-heading">
                Get Your Quote in Under 2 Minutes
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary">
                Choose how you&apos;d like to proceed — get an instant price breakdown, or book a discovery call to discuss your project.
              </p>
            </FadeIn>

            {/* ── Selectable Path Toggle ── */}
            <FadeIn delay={0.15}>
              <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
                <button type="button" onClick={() => { setPath("quote"); setQuote(null); }} className={`flex-1 cursor-pointer rounded-xl border-2 p-5 text-left transition-all ${path === "quote" ? "border-gold bg-gold-dim shadow-md ring-2 ring-gold/20" : "border-border-default bg-bg-card hover:border-border-bright"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${path === "quote" ? "border-gold bg-gold" : "border-border-bright bg-transparent"}`}>
                      {path === "quote" && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                    <span className="text-sm font-semibold text-heading">Request Instant Quote</span>
                  </div>
                  <p className="mt-2 pl-8 text-xs text-text-secondary">Select services, enter project details, see your price breakdown instantly. No call needed.</p>
                </button>
                <button type="button" onClick={() => { setPath("discovery"); setQuote(null); }} className={`flex-1 cursor-pointer rounded-xl border-2 p-5 text-left transition-all ${path === "discovery" ? "border-gold bg-gold-dim shadow-md ring-2 ring-gold/20" : "border-border-default bg-bg-card hover:border-border-bright"}`}>
                  <div className="flex items-center gap-3">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${path === "discovery" ? "border-gold bg-gold" : "border-border-bright bg-transparent"}`}>
                      {path === "discovery" && <span className="h-2 w-2 rounded-full bg-white" />}
                    </span>
                    <span className="text-sm font-semibold text-heading">Book Discovery Call — $50</span>
                  </div>
                  <p className="mt-2 pl-8 text-xs text-text-secondary">30-minute video call for complex projects. $50 credited to your first engagement.</p>
                </button>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Step 1: Services (shared by both paths) ── */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[900px] px-6">
            <FadeIn>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-heading">1. Select Services</h2>
                {count > 0 && <button onClick={clear} className="text-sm text-text-muted transition-colors hover:text-text-primary">Clear all</button>}
              </div>
            </FadeIn>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {SERVICE_CATEGORIES.map((cat) => {
                const active = isSelected(cat);
                return (
                  <button key={cat} onClick={() => toggle(cat)} className={`flex items-center gap-4 rounded-xl border p-5 text-left transition-all duration-150 ${active ? "border-gold bg-gold-dim" : "border-border-default bg-bg-card hover:border-border-bright"}`}>
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${active ? "border-gold bg-gold" : "border-border-bright bg-transparent"}`}>
                      {active && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                    </span>
                    <span className="text-base font-semibold text-heading">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            PATH A: INSTANT QUOTE
           ════════════════════════════════════════════════════════════ */}
        {path === "quote" && (
          <>
            {/* Step 2: Project Details for quote calculation */}
            <section className="section-padding bg-bg-primary">
              <div className="mx-auto max-w-[900px] px-6">
                <FadeIn>
                  <h2 className="text-xl font-semibold text-heading">2. Project Details</h2>
                  <p className="mt-2 text-sm text-text-secondary">These details determine the complexity multipliers applied to your quote.</p>
                </FadeIn>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <InputField id="q-location" label="Project Location" value={location} onChange={setLocation} placeholder="e.g. Toronto, ON, Canada" />
                  <SelectField id="q-stage" label="Project Stage" value={stage} onChange={(v) => setStage(v as ProjectStage)} options={PROJECT_STAGES} required />
                  <SelectField id="q-type" label="Project Type" value={projectType} onChange={(v) => setProjectType(v as ProjectType)} options={PROJECT_TYPES} required />
                  <SelectField id="q-value" label="Project Value" value={projectValue} onChange={(v) => setProjectValue(v as ProjectValueTier)} options={VALUE_TIERS} required />
                  <InputField id="q-area" label="Approximate Area (sq ft)" type="number" value={area} onChange={setArea} placeholder="e.g. 25000" />
                  <SelectField id="q-sheets" label="Drawing Sheets (approx.)" value={sheets} onChange={(v) => setSheets(v as SheetRange)} options={SHEET_RANGES} optionLabels={["1–20 sheets", "21–50 sheets", "51–100 sheets", "100+ sheets"]} required />
                  <InputField id="q-trades" label="Number of Trades" type="number" value={trades} onChange={setTrades} placeholder="e.g. 5" />
                  <div>
                    <label htmlFor="q-urgency" className="mb-1.5 block text-sm font-medium text-text-primary">Urgency</label>
                    <select id="q-urgency" value={urgency} onChange={(e) => setUrgency(e.target.value as Urgency)} className="w-full rounded-lg border border-border-default bg-bg-card px-3 py-2.5 text-sm text-text-primary focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30">
                      <option value="Standard">Standard (5–10 days)</option>
                      <option value="Expedited">Expedited (+15%)</option>
                      <option value="Rush">Rush 24–48h (+25%)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <button onClick={handleCalculate} disabled={!canCalculate} className="rounded-lg bg-gold px-10 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-gold-hover disabled:cursor-not-allowed disabled:opacity-40">
                    Calculate My Quote &rarr;
                  </button>
                  {!canCalculate && <p className="mt-2 text-xs text-text-muted">Select at least one service and fill required fields (*) above.</p>}
                </div>
              </div>
            </section>

            {/* Step 3: Quote Breakdown */}
            {quote && (
              <section className="section-padding bg-bg-secondary" id="quote-result">
                <div className="mx-auto max-w-[900px] px-6">
                  <FadeIn>
                    <QuoteDisplay quote={quote} />
                  </FadeIn>

                  {/* Document checklist */}
                  {stage && STAGE_DOCS[stage as ProjectStage] && (
                    <FadeIn delay={0.1}>
                      <div className="mt-6 rounded-xl border border-border-default bg-bg-card p-6">
                        <h3 className="text-sm font-semibold text-heading">Documents to Prepare</h3>
                        <ul className="mt-3 space-y-2">
                          {STAGE_DOCS[stage as ProjectStage]!.map((doc) => (
                            <li key={doc} className="flex items-start gap-2 text-sm text-text-secondary">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-gold"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </FadeIn>
                  )}

                  {/* 3 CTAs */}
                  <FadeIn delay={0.15}>
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      <button onClick={() => setShowContactForm(showContactForm === "book" ? null : "book")} className={`rounded-xl border-2 p-5 text-left transition-all ${showContactForm === "book" ? "border-gold bg-gold-dim ring-2 ring-gold/20" : "border-border-default bg-bg-card hover:border-gold"}`}>
                        <div className="text-base font-bold text-heading">Book Now</div>
                        <p className="mt-1 text-xs text-text-secondary">Confirm engagement, share documents, get started</p>
                      </button>
                      <button onClick={() => setShowCalModal(true)} className="rounded-xl border-2 border-border-default bg-bg-card p-5 text-left transition-all hover:border-gold">
                        <div className="text-base font-bold text-heading">Book Discovery Call</div>
                        <p className="mt-1 text-xs text-text-secondary">$50 · 30 min via Zoom · Credited to first engagement</p>
                      </button>
                      <button onClick={() => setShowContactForm(showContactForm === "email" ? null : "email")} className={`rounded-xl border-2 p-5 text-left transition-all ${showContactForm === "email" ? "border-gold bg-gold-dim ring-2 ring-gold/20" : "border-border-default bg-bg-card hover:border-gold"}`}>
                        <div className="text-base font-bold text-heading">Email My Quote</div>
                        <p className="mt-1 text-xs text-text-secondary">Get the full breakdown sent to your inbox</p>
                      </button>
                    </div>
                  </FadeIn>

                  {/* Contact form for Book Now / Email Quote */}
                  {showContactForm && (
                    <FadeIn>
                      <div className="mt-6 rounded-xl border-2 border-gold bg-bg-card p-6">
                        <h3 className="text-lg font-semibold text-heading">
                          {showContactForm === "book" ? "Confirm Your Booking" : "Send Quote to Your Email"}
                        </h3>
                        <ContactFields fullName={fullName} setFullName={setFullName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} company={company} setCompany={setCompany} />
                        {showContactForm === "book" && (
                          <div className="mt-4">
                            <label className="mb-1.5 block text-sm font-medium text-text-primary">Google Drive / Dropbox Link <span className="text-xs font-normal text-text-muted">(project documents)</span></label>
                            <input type="url" value={driveLink} onChange={(e) => setDriveLink(e.target.value)} placeholder="https://drive.google.com/drive/folders/..." className="w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30" />
                          </div>
                        )}
                        <button onClick={() => handleSubmit(showContactForm)} disabled={submitting || !fullName.trim() || !email.trim()} className="mt-6 w-full rounded-lg bg-gold px-6 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-gold-hover disabled:cursor-not-allowed disabled:opacity-50">
                          {submitting ? "Sending..." : showContactForm === "book" ? "Confirm Booking Request →" : "Send Quote to My Email →"}
                        </button>
                      </div>
                    </FadeIn>
                  )}
                </div>
              </section>
            )}
          </>
        )}

        {/* ════════════════════════════════════════════════════════════
            PATH B: DISCOVERY CALL
           ════════════════════════════════════════════════════════════ */}
        {path === "discovery" && (
          <section className="section-padding bg-bg-primary">
            <div className="mx-auto max-w-[900px] px-6">
              <FadeIn>
                <h2 className="text-xl font-semibold text-heading">2. Your Details &amp; Project Info</h2>
                <p className="mt-2 text-sm text-text-secondary">Help us prepare for the discovery call so we can make the most of your 30 minutes.</p>
              </FadeIn>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                {/* Contact + Project Brief */}
                <FadeIn delay={0.05}>
                  <div className="space-y-6">
                    <div className="rounded-xl border border-border-default bg-bg-card p-6">
                      <h3 className="text-lg font-semibold text-heading">Contact Details</h3>
                      <p className="mt-1 text-xs text-text-muted">Required for booking confirmation.</p>
                      <div className="mt-5">
                        <ContactFields fullName={fullName} setFullName={setFullName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} company={company} setCompany={setCompany} />
                      </div>
                    </div>
                    <div className="rounded-xl border border-border-default bg-bg-card p-6">
                      <h3 className="text-lg font-semibold text-heading">Project Brief</h3>
                      <div className="mt-5 space-y-4">
                        <InputField id="d-location" label="Project Location" value={location} onChange={setLocation} placeholder="e.g. Toronto, ON, Canada" />
                        <SelectField id="d-stage" label="Project Stage" value={stage} onChange={(v) => setStage(v as ProjectStage)} options={PROJECT_STAGES} />
                        <SelectField id="d-type" label="Project Type" value={projectType} onChange={(v) => setProjectType(v as ProjectType)} options={PROJECT_TYPES} />
                        <SelectField id="d-value" label="Approximate Project Value" value={projectValue} onChange={(v) => setProjectValue(v as ProjectValueTier)} options={VALUE_TIERS} />
                        <div>
                          <label htmlFor="d-details" className="mb-1.5 block text-sm font-medium text-text-primary">Tell us about your project <span className="text-xs font-normal text-text-muted">(optional)</span></label>
                          <textarea id="d-details" rows={3} value={projectDetails} onChange={(e) => setProjectDetails(e.target.value)} placeholder="Brief scope, timeline expectations, specific deliverables needed..." className="w-full resize-none rounded-lg border border-border-default bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30" />
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Document upload + Booking */}
                <FadeIn delay={0.1}>
                  <div className="space-y-6">
                    <div className="rounded-xl border border-border-default bg-bg-card p-6">
                      <h3 className="text-lg font-semibold text-heading">Share Documents</h3>
                      <p className="mt-1 text-xs text-text-muted">Optional — helps us prepare for the call.</p>
                      <div className="mt-5">
                        <label className="mb-1.5 block text-sm font-medium text-text-primary">Google Drive or Dropbox Link</label>
                        <input type="url" value={driveLink} onChange={(e) => setDriveLink(e.target.value)} placeholder="https://drive.google.com/drive/folders/..." className="w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30" />
                        <p className="mt-1.5 text-xs text-text-muted">Share your drawings, specs, and scope documents. Enable view access.</p>
                      </div>
                    </div>

                    <div className="rounded-xl border-2 border-gold bg-gold-dim/30 p-6">
                      <h3 className="text-lg font-semibold text-heading">Book Discovery Call</h3>
                      <p className="mt-1 text-xs text-gold-text">$50 · 30 minutes via Zoom · Credited to first engagement</p>

                      <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                        <li className="flex items-start gap-2"><CheckIcon />30-minute video call to discuss your project scope</li>
                        <li className="flex items-start gap-2"><CheckIcon />$50 fully credited toward your first engagement</li>
                        <li className="flex items-start gap-2"><CheckIcon />Detailed quote sent within 24 hours of the call</li>
                      </ul>

                      {/* Cal.com inline scheduling */}
                      <div className="mt-5 min-h-[450px] overflow-hidden rounded-lg border border-border-default bg-white">
                        <CalEmbed name={fullName || undefined} email={email || undefined} />
                      </div>
                      <p className="mt-3 text-center text-xs text-text-muted">
                        $50 payment collected at booking via Razorpay. Credited to your first engagement.
                      </p>

                      {/* Send project details to Alfatrees (separate from Cal.com booking) */}
                      {count > 0 && fullName.trim() && email.trim() && (
                        <button
                          onClick={() => handleSubmit("discovery")}
                          disabled={submitting}
                          className="mt-4 w-full rounded-lg border-2 border-gold bg-gold-dim px-6 py-3 text-sm font-semibold text-heading transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {submitting ? "Sending..." : "Send Project Details to Alfatrees"}
                        </button>
                      )}
                      <p className="mt-3 text-center text-xs text-text-muted">
                        Prefer an instant quote? <button onClick={() => setPath("quote")} className="font-medium text-gold-text underline underline-offset-2 hover:text-gold-hover">Switch to instant quote calculator</button>
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </section>
        )}
        {/* Cal.com Modal (triggered from Path A "Book Discovery Call" CTA) */}
        {showCalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowCalModal(false)}>
            <div className="relative mx-4 h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Book Discovery Call</h3>
                  <p className="text-xs text-gray-500">$50 · 30 min via Zoom · Credited to first engagement</p>
                </div>
                <button onClick={() => setShowCalModal(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
              <div className="h-[calc(85vh-72px)] overflow-auto">
                <CalEmbed />
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

/* ─── Reusable Components ─── */

function CheckIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-gold"><polyline points="20 6 9 17 4 12" /></svg>;
}

function InputField({ id, label, value, onChange, placeholder, type = "text", required }: {
  id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-primary">{label}{required && <span className="ml-0.5 text-gold">*</span>}</label>
      <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-lg border border-border-default bg-bg-card px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30" />
    </div>
  );
}

function SelectField({ id, label, value, onChange, options, optionLabels, required }: {
  id: string; label: string; value: string; onChange: (v: string) => void; options: readonly string[]; optionLabels?: string[]; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text-primary">{label}{required && <span className="ml-0.5 text-gold">*</span>}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-border-default bg-bg-card px-3 py-2.5 text-sm text-text-primary focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30">
        <option value="">Select...</option>
        {options.map((opt, i) => <option key={opt} value={opt}>{optionLabels ? optionLabels[i] : opt}</option>)}
      </select>
    </div>
  );
}

function ContactFields({ fullName, setFullName, email, setEmail, phone, setPhone, company, setCompany }: {
  fullName: string; setFullName: (v: string) => void; email: string; setEmail: (v: string) => void;
  phone: string; setPhone: (v: string) => void; company: string; setCompany: (v: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div><label className="mb-1.5 block text-sm font-medium text-text-primary">Full Name <span className="text-gold">*</span></label><input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Smith" className="w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30" /></div>
      <div><label className="mb-1.5 block text-sm font-medium text-text-primary">Email <span className="text-gold">*</span></label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@company.com" className="w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30" /></div>
      <div><label className="mb-1.5 block text-sm font-medium text-text-primary">Phone / WhatsApp <span className="text-xs font-normal text-text-muted">(optional)</span></label><input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" className="w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30" /></div>
      <div><label className="mb-1.5 block text-sm font-medium text-text-primary">Company <span className="text-xs font-normal text-text-muted">(optional)</span></label><input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Smith Construction LLC" className="w-full rounded-lg border border-border-default bg-bg-primary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30" /></div>
    </div>
  );
}

function QuoteDisplay({ quote }: { quote: QuoteBreakdown }) {
  return (
    <div className="rounded-xl border-2 border-gold bg-bg-card">
      <div className="border-b border-border-default bg-bg-secondary/50 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-heading">Alfatrees PMC — Service Quotation</h2>
            <p className="mt-1 text-xs text-text-muted">Indicative Estimate (±{quote.accuracyPercent}%)</p>
          </div>
          <div className="text-right text-xs text-text-muted">
            <div>Ref: {quote.referenceNumber}</div>
            <div>{new Date(quote.generatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
        </div>
      </div>
      <div className="border-b border-border-default px-6 py-4 sm:px-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Project Summary</h3>
        <div className="mt-2 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
          {quote.input.location && <div><span className="text-text-muted">Location:</span> <span className="text-text-primary">{quote.input.location}</span></div>}
          <div><span className="text-text-muted">Type:</span> <span className="text-text-primary">{quote.input.projectType}</span></div>
          <div><span className="text-text-muted">Stage:</span> <span className="text-text-primary">{quote.input.projectStage}</span></div>
          <div><span className="text-text-muted">Value:</span> <span className="text-text-primary">{quote.input.projectValue}</span></div>
          <div><span className="text-text-muted">Sheets:</span> <span className="text-text-primary">{quote.input.sheets}</span></div>
          <div><span className="text-text-muted">Trades:</span> <span className="text-text-primary">{quote.input.trades}</span></div>
          {quote.input.areaSqFt > 0 && <div><span className="text-text-muted">Area:</span> <span className="text-text-primary">{quote.input.areaSqFt.toLocaleString()} sq ft</span></div>}
          <div><span className="text-text-muted">Urgency:</span> <span className="text-text-primary">{quote.input.urgency}</span></div>
        </div>
      </div>
      <div className="px-6 py-4 sm:px-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">Service Breakdown</h3>
        <div className="mt-4 space-y-5">
          {quote.lineItems.map((li, i) => (
            <div key={li.code} className="rounded-lg border border-border-default bg-bg-primary p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-gold-dim px-2 py-0.5 text-xs font-bold text-gold-text">{li.code}</span>
                    <span className="rounded border border-border-default px-2 py-0.5 text-[10px] font-medium text-text-muted">{li.tier}</span>
                  </div>
                  <h4 className="mt-1.5 text-sm font-semibold text-heading">{i + 1}. {li.name}</h4>
                  <p className="mt-0.5 text-xs text-text-muted">{li.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-heading">{formatRange(li.rangeLow, li.rangeHigh)}</div>
                  <div className="text-[10px] text-text-muted">±{quote.accuracyPercent}%</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 border-t border-border-default pt-3 text-xs sm:grid-cols-5">
                <div><span className="text-text-muted">Base:</span> <span className="font-medium text-text-primary">{formatUSD(li.basePrice)}</span></div>
                <div><span className="text-text-muted">Value:</span> <span className="font-medium text-text-primary">{li.valueLabel}</span></div>
                <div><span className="text-text-muted">Complexity:</span> <span className="font-medium text-text-primary">{li.complexityLabel}</span></div>
                <div><span className="text-text-muted">Scope:</span> <span className="font-medium text-text-primary">{li.scopeLabel}</span></div>
                <div><span className="text-text-muted">Urgency:</span> <span className="font-medium text-text-primary">{li.urgencyLabel}</span></div>
              </div>
              <div className="mt-2 text-[10px] text-text-muted">Timeline: {li.timeline} · Basis: {li.pricingBasis}</div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {li.standards.map((s) => <span key={s} className="rounded border border-border-default px-1.5 py-0.5 text-[10px] text-text-muted">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t-2 border-gold bg-gold-dim/30 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-heading">Total Estimated Range</div>
            <div className="text-xs text-text-muted">±{quote.accuracyPercent}% · {quote.lineItems.length} service{quote.lineItems.length !== 1 ? "s" : ""}</div>
          </div>
          <div className="text-2xl font-bold text-heading sm:text-3xl">{formatRange(quote.totalLow, quote.totalHigh)}</div>
        </div>
      </div>
      <div className="border-t border-border-default px-6 py-4 sm:px-8">
        <ul className="space-y-1 text-xs text-text-muted">
          {quote.notes.map((note) => <li key={note}>• {note}</li>)}
        </ul>
      </div>
    </div>
  );
}
