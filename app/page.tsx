import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { ServicesOverview } from "@/components/landing/services-overview";
import { TrustStats } from "@/components/landing/trust-stats";
import { HowWeWork } from "@/components/landing/how-we-work";
import { PricingPreview } from "@/components/landing/pricing-preview";
import { StandardsBadges } from "@/components/landing/standards-badges";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <ServicesOverview />
        <TrustStats />
        <HowWeWork />
        <PricingPreview />
        <StandardsBadges />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
