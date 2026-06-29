import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "About",
  description:
    "Alfatrees PMC is a specialist construction project management consultancy — estimation, scheduling, project controls, and design management. Led by Prakash Chand, B.Arch, former Canadian government construction project manager.",
};

/* ─────────────────────────────────────────────
   Data — kept co-located for easy maintenance
   ───────────────────────────────────────────── */

const EDGE_ITEMS = [
  {
    title: "North American Standards by Default",
    body:
      "Former construction project manager at the Government of New Brunswick, Department of Transportation & Infrastructure, Canada. Imperial units, CSI MasterFormat, AIA/CCDC document standards. No ramp-up time for North American clients.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: "Reads Drawings as a Designer",
    body:
      "A Bachelor of Architecture background means we read drawings the way they were intended — not just as a counter of dimensions. Constructability issues, coordination conflicts, and design intent ambiguities get caught before they become RFIs or change orders.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "CPM Scheduling — a Scarce Skill",
    body:
      "MS Project and Primavera P6 fluency is rare at this price point. A local scheduling engineer in the US costs $115k+ per year. We deliver the same CPM discipline — baseline development, progress tracking, delay forensics — at a fraction of that cost, with no full-time commitment.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "AI-Augmented Delivery",
    body:
      "Modern AI tooling is embedded in every workflow — not as a gimmick but as a production multiplier. Takeoffs, reports, and schedules that would take a traditional consultant two days get turned around in hours. You get speed without sacrificing accuracy or documentation rigour.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "23 Services. One Specialist.",
    body:
      "From AACE Class 5 conceptual budgets through forensic delay analysis — all 23 services are delivered digitally, organized across 6 disciplines. No generalist freelancer picking up unfamiliar scope. Every service is something we build and deliver daily.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
] as const;

const STANDARDS = [
  { label: "AACE International", detail: "Estimate classification, EVM, forensic delay" },
  { label: "CSI MasterFormat", detail: "Cost organization and trade breakdowns" },
  { label: "AIA / CCDC", detail: "Design phase document standards" },
  { label: "CPM — AACE RP 29R-03", detail: "Schedule forensics methodology" },
  { label: "MS Project / Primavera P6", detail: "Schedule authoring and controls" },
  { label: "Bluebeam Revu", detail: "Quantity takeoff and drawing markup" },
  { label: "RS Means", detail: "Cost data and benchmark pricing" },
  { label: "Power BI", detail: "Dashboard reporting and EVM visualization" },
] as const;

/* ─────────────────────────────────────────────
   Page (Server Component — metadata exported)
   ───────────────────────────────────────────── */

export default function AboutPage() {
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
                  About Alfatrees PMC
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="mt-6 max-w-3xl text-[clamp(36px,5vw,64px)] font-semibold leading-[1.1] tracking-tight text-heading">
                Specialist Construction PM.{" "}
                <span className="text-gold">Global Delivery.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
                Alfatrees PMC is a construction project management
                consultancy specializing in estimation, scheduling, project
                controls, and design management. Not a generalist agency — a
                focused specialist practice built around one principal and a
                carefully scoped set of 23 services across 6 disciplines.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/get-started"
                  className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold-hover"
                >
                  Request Instant Quote
                </Link>
                <Link
                  href="/services/estimation"
                  className="rounded-lg border border-border-bright bg-bg-card px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-border-bright hover:bg-bg-secondary"
                >
                  View Services
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── Mission / Positioning ───────────────── */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <FadeIn>
                <h2 className="text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.2] text-heading">
                  What We Do — and What We Don&apos;t
                </h2>
                <p className="mt-5 text-base leading-relaxed text-text-secondary">
                  Construction projects fail on controls, not on construction.
                  Owners approve budgets without defensible estimates. Schedules
                  are built once and never updated. Change orders arrive without
                  backup. Design phases run over because nobody is coordinating
                  the information flow between consultants.
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  Alfatrees PMC exists to close that gap — remotely, at a
                  price point that makes professional controls accessible to
                  mid-size GCs, owners, and developers who can&apos;t justify
                  in-house hires for every discipline.
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  We do not manage construction sites. We do not supply
                  tradespeople. We produce the documents, schedules, estimates,
                  and control frameworks that make the people on site more
                  effective.
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { value: "24–72 hrs", label: "Typical turnaround" },
                    { value: "23", label: "Specialized services" },
                    { value: "10+", label: "Project types served" },
                    { value: "AACE", label: "Class 1–5 aligned" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border-default bg-bg-card p-6"
                    >
                      <div className="text-[clamp(28px,3vw,40px)] font-semibold leading-none text-heading">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-sm text-text-muted">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Principal Profile ───────────────────── */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Principal
              </p>
              <h2 className="mt-3 text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.2] text-heading">
                Prakash Chand
              </h2>
            </FadeIn>

            <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-12">
              {/* Credentials card */}
              <FadeIn delay={0.1}>
                <div className="rounded-xl border border-border-default bg-bg-card p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Credentials
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {[
                      {
                        label: "B.Arch",
                        detail: "Bachelor of Architecture",
                      },
                      {
                        label: "Construction Management & Technology",
                        detail: "Construction management, scheduling, and project controls",
                      },
                      {
                        label: "Council of Architecture (India)",
                        detail: "Registered practicing professional",
                      },
                      {
                        label: "Government of New Brunswick, Canada",
                        detail: "Former Project Manager · Dept. of Transportation & Infrastructure",
                      },
                    ].map((item) => (
                      <li key={item.label} className="flex gap-3">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                        <span>
                          <span className="block text-sm font-semibold text-heading">
                            {item.label}
                          </span>
                          <span className="text-sm text-text-secondary">
                            {item.detail}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              {/* Background narrative */}
              <FadeIn delay={0.2} className="lg:col-span-2">
                <p className="text-base leading-relaxed text-text-secondary">
                  Hands-on construction project management experience
                  inside a Canadian provincial government infrastructure department
                  means Alfatrees PMC operates to North American standards by
                  default — not by adaptation. Imperial units, CSI
                  MasterFormat cost organization, AIA and CCDC document
                  standards, and AACE estimate classification are the baseline,
                  not the exception.
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  A Bachelor of Architecture background gives the practice an
                  unusual skill combination: the ability to read and interpret
                  drawings with design intent — not just measure them. This
                  matters for constructability reviews, RFI analysis, and
                  catching coordination issues early, before they propagate into
                  costly field changes.
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">
                  Council of Architecture (India) registration is a
               personal credential. Alfatrees PMC does not offer architecture
                  services and does not position as an architecture firm. The
                  credential is relevant only as it shapes how drawings are read
                  and how design management services are delivered.
                </p>

                {/* Credential strip */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    "B.Arch",
                    "Construction Management & Technology",
                    "Council of Architecture (India)",
                    "Govt. of New Brunswick, Canada",
                    "AACE Aligned",
                    "MS Project",
                    "Primavera P6",
                    "Bluebeam Revu",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border-default bg-bg-secondary px-3 py-1 text-xs font-medium text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── Competitive Edge ────────────────────── */}
        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Why Alfatrees PMC
              </p>
              <h2 className="mt-3 max-w-xl text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.2] text-heading">
                Five Reasons Clients Choose a Specialist
              </h2>
            </FadeIn>

            <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {EDGE_ITEMS.map((item, i) => (
                <StaggerItem key={item.title}>
                  <div className="flex h-full flex-col rounded-xl border border-border-default bg-bg-card p-6 transition-colors duration-200 hover:border-border-bright">
                    {/* Icon + number row */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-dim text-gold-text">
                        {item.icon}
                      </span>
                      <span className="font-mono text-xs font-bold text-text-muted">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-semibold leading-snug text-heading">
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

        {/* ── Standards We Follow ─────────────────── */}
        <section className="section-padding bg-bg-primary">
          <div className="mx-auto max-w-[1280px] px-6">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Standards &amp; Tools
              </p>
              <h2 className="mt-3 max-w-xl text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.2] text-heading">
                Industry Standards We Work To
              </h2>
              <p className="mt-4 max-w-2xl text-base text-text-secondary">
                Every deliverable references a recognized methodology or
                standard. No proprietary frameworks that only make sense inside
                one firm.
              </p>
            </FadeIn>

            <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STANDARDS.map((std) => (
                <StaggerItem key={std.label}>
                  <div className="flex flex-col gap-1 rounded-xl border border-border-default bg-bg-card p-5 transition-colors duration-200 hover:border-border-bright">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      <span className="text-sm font-semibold text-heading">
                        {std.label}
                      </span>
                    </div>
                    <p className="pl-3.5 text-xs leading-relaxed text-text-muted">
                      {std.detail}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────── */}
        <section className="section-padding relative overflow-hidden bg-bg-secondary">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="h-[400px] w-[400px] rounded-full bg-gold/[0.05] blur-[100px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
            <FadeIn>
              <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.15] text-heading">
                Ready to Work Together?
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mx-auto mt-5 max-w-xl text-lg text-text-secondary">
                Get an instant quote in under 2 minutes, or book a 30-minute
                discovery call for complex projects.
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
