import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn } from "@/components/ui/motion";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Alfatrees PMC collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>
              <p className="mt-4 text-sm text-text-muted">Last updated: June 2026</p>
            </FadeIn>
          </div>
        </section>

        <section className="section-padding bg-bg-secondary">
          <div className="mx-auto max-w-[800px] px-6">
            <div className="space-y-8">
              <Section title="1. Information We Collect">
                <p><strong>Information you provide directly:</strong></p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Name, email address, phone number, and company name (when requesting a quote or booking a discovery call)</li>
                  <li>Project details: location, type, stage, value, scope size, and urgency</li>
                  <li>Document links (Google Drive or Dropbox URLs) shared for project review</li>
                  <li>Communication via email or video calls</li>
                </ul>
                <p className="mt-3"><strong>Information collected automatically:</strong></p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Website usage data via Vercel Analytics (page views, device type, browser, country — no personal identifiers)</li>
                  <li>Cookies for theme preference (light/dark mode) and service selections stored in your browser&apos;s localStorage</li>
                </ul>
              </Section>

              <Section title="2. How We Use Your Information">
                <ul className="ml-4 list-disc space-y-1">
                  <li>To generate and deliver service quotations</li>
                  <li>To process discovery call bookings and payments</li>
                  <li>To communicate about your project and deliverables</li>
                  <li>To send quote summaries and booking confirmations via email</li>
                  <li>To improve our website and services based on aggregated usage data</li>
                </ul>
                <p className="mt-3">We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
              </Section>

              <Section title="3. Third-Party Services">
                <p>We use the following third-party services to operate our business:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li><strong>Vercel</strong> — Website hosting and analytics (vercel.com)</li>
                  <li><strong>Resend</strong> — Transactional email delivery for quote summaries and confirmations (resend.com)</li>
                  <li><strong>Cal.com</strong> — Discovery call scheduling (cal.com)</li>
                  <li><strong>Payment provider</strong> — secure processing of discovery-call fees and invoices (no card data is stored on our servers)</li>
                  <li><strong>Google Drive</strong> — Project document exchange (drive.google.com)</li>
                  <li><strong>Google Workspace</strong> — Professional email (google.com)</li>
                  <li><strong>Zoom</strong> — Video calls for discovery sessions (zoom.us)</li>
                </ul>
                <p className="mt-3">Each service has its own privacy policy. We only share the minimum information necessary for each service to function (e.g., email address to Resend for sending quotes).</p>
              </Section>

              <Section title="4. Data Storage & Security">
                <p>Your contact information and project details submitted through the website are sent via encrypted email (Resend API over HTTPS). We do not currently store personal data in a database — all quote requests are delivered as emails.</p>
                <p>Project documents shared via Google Drive remain under your control. We access them only for the duration of the engagement and as needed for the agreed scope of work.</p>
                <p>Payment information is processed directly by our payment provider and is never stored on our servers.</p>
              </Section>

              <Section title="5. Data Retention">
                <p>We retain project-related emails and documents for the duration of the client relationship plus 2 years for reference and any potential dispute resolution. After this period, project data is deleted unless a longer retention is required by law.</p>
                <p>You may request deletion of your personal data at any time by emailing <a href="mailto:info.alfatrees@gmail.com" className="text-gold-text hover:text-gold-hover">info.alfatrees@gmail.com</a>.</p>
              </Section>

              <Section title="6. Cookies & Local Storage">
                <p>This website uses browser localStorage (not cookies) to store:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Theme preference (light/dark mode)</li>
                  <li>Selected service categories (for the quote calculator)</li>
                </ul>
                <p className="mt-3">No tracking cookies are used. Vercel Analytics collects anonymous, aggregated usage data without personal identifiers or cookies.</p>
              </Section>

              <Section title="7. Your Rights">
                <p>You have the right to:</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Request access to the personal data we hold about you</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Withdraw consent for future communications</li>
                </ul>
                <p className="mt-3">To exercise any of these rights, email <a href="mailto:info.alfatrees@gmail.com" className="text-gold-text hover:text-gold-hover">info.alfatrees@gmail.com</a>.</p>
              </Section>

              <Section title="8. Changes to This Policy">
                <p>We may update this privacy policy from time to time. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision. Continued use of the website after changes constitutes acceptance of the updated policy.</p>
              </Section>

              <Section title="9. Contact">
                <p>For questions about this privacy policy, contact us at <a href="mailto:info.alfatrees@gmail.com" className="text-gold-text hover:text-gold-hover">info.alfatrees@gmail.com</a>.</p>
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
