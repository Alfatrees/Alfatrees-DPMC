import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Terms of Engagement",
  description: "Terms and conditions for all engagements with Alfatrees PMC — scope, payment, revisions, confidentiality, and dispute resolution.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative overflow-hidden bg-bg-primary pb-16 pt-24 sm:pb-20 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
          </div>
          <div className="relative z-10 mx-auto max-w-[800px] px-6">
            <FadeIn>
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                Home
              </Link>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="mt-6 text-[clamp(32px,5vw,48px)] font-bold leading-[1.1] tracking-tight text-heading">
                Terms of Engagement
              </h1>
              <p className="mt-4 text-sm text-text-muted">Last updated: June 2026</p>
            </FadeIn>
          </div>
        </section>

        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[800px] px-6">
            <div className="prose-custom space-y-8">
              <Section title="1. Scope of Services">
                <p>Alfatrees PMC provides construction project management consultancy services including estimation, scheduling, project controls, design management, evaluation, and quality planning. All services are delivered remotely.</p>
                <p>The specific scope, deliverables, timeline, and price for each engagement are defined in a written proposal or quote accepted by the client before work begins. The instant quote provided on our website is an indicative estimate (±15%) and does not constitute a binding agreement.</p>
              </Section>

              <Section title="2. Engagement Process">
                <p>All engagements follow this sequence: (1) Client requests a quote via the website or books a discovery call. (2) Alfatrees PMC reviews the scope and provides a written proposal with fixed price, deliverables, and timeline. (3) Client accepts the proposal and makes payment per the agreed terms. (4) Work begins within 24–48 hours of receiving complete project documents and payment.</p>
              </Section>

              <Section title="3. Payment Terms">
                <p><strong>Fixed-price engagements under $500:</strong> 100% advance payment before work begins.</p>
                <p><strong>Fixed-price engagements $500 and above:</strong> 50% advance before work begins, 50% upon delivery of final deliverables.</p>
                <p><strong>Hourly engagements:</strong> Weekly invoicing, payment due within 7 days (Net-7).</p>
                <p><strong>Monthly retainers:</strong> Advance payment due by the 7th of each month. Month-to-month, no long-term lock-in.</p>
                <p><strong>Discovery call:</strong> $50, payable at the time of booking via Razorpay. Fully credited toward the first engagement if the client proceeds.</p>
                <p>All payments are processed via Razorpay (international credit/debit cards and India UPI). All quoted prices are in USD unless explicitly stated otherwise. Taxes are not included and will be applied as required by applicable law.</p>
              </Section>

              <Section title="4. Revisions & Changes">
                <p>One revision round is included in every fixed-price engagement at no additional cost. The client submits consolidated feedback after reviewing the deliverables, and Alfatrees PMC incorporates all requested changes within the original scope.</p>
                <p>Additional revision rounds beyond the first are available at an agreed hourly rate, confirmed in writing before work begins.</p>
                <p>Scope changes requested after work has begun will be treated as a change order with separate pricing and timeline, agreed upon before execution.</p>
              </Section>

              <Section title="5. Deliverables & File Exchange">
                <p>All deliverables are shared via Google Drive in the agreed formats (Excel, PDF, .mpp, .xer, Bluebeam markup, or as specified in the proposal). The shared folder remains accessible to the client throughout and after the engagement.</p>
                <p>Alfatrees PMC retains the right to use anonymized, non-confidential project data for portfolio and marketing purposes unless restricted by NDA.</p>
              </Section>

              <Section title="6. Confidentiality">
                <p>Alfatrees PMC treats all client documents, drawings, specifications, and project data as confidential. A mutual Non-Disclosure Agreement (NDA) is available upon request and is recommended for all engagements involving sensitive project documentation.</p>
                <p>Client documents are stored on Google Drive with access restricted to Alfatrees PMC personnel working on the engagement. Documents are not shared with third parties without explicit written consent.</p>
              </Section>

              <Section title="7. Cancellation & Refunds">
                <p><strong>Before work begins:</strong> Full refund of any advance payment.</p>
                <p><strong>After work has begun:</strong> Client is invoiced for work completed to date at the agreed rate. Any advance payment exceeding the value of completed work is refunded.</p>
                <p><strong>Discovery call fee ($50):</strong> Non-refundable after the call has taken place. Refundable if cancelled more than 24 hours before the scheduled time.</p>
              </Section>

              <Section title="8. Turnaround & Delays">
                <p>Estimated turnaround times are provided in the proposal and begin from the date complete project documents and payment are received. Incomplete documents, pending clarifications, or delayed client responses pause the timeline.</p>
                <p>Alfatrees PMC will communicate any delays promptly and provide a revised timeline. Chronic delays caused by Alfatrees PMC entitle the client to cancel with a pro-rated refund.</p>
              </Section>

              <Section title="9. Limitation of Liability">
                <p>Alfatrees PMC provides professional estimates, schedules, and advisory services based on the information provided by the client and publicly available data. All deliverables are prepared with reasonable professional care.</p>
                <p>Alfatrees PMC is not liable for decisions made by the client, contractor, or any third party based on our deliverables. Total liability for any engagement is limited to the fees paid for that specific engagement.</p>
              </Section>

              <Section title="10. Dispute Resolution">
                <p>Any disputes arising from an engagement will first be resolved through good-faith discussion between the parties. If unresolved within 30 days, disputes will be referred to mediation. The governing law is that of the jurisdiction specified in the engagement proposal.</p>
              </Section>

              <Section title="11. Contact">
                <p>For questions about these terms, contact us at <a href="mailto:info.alfatrees@gmail.com" className="text-gold-text hover:text-gold-hover">info.alfatrees@gmail.com</a>.</p>
              </Section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <FadeIn>
      <div>
        <h2 className="text-lg font-bold text-heading">{title}</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-text-secondary">{children}</div>
      </div>
    </FadeIn>
  );
}
