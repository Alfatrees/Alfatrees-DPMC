import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for estimation, scheduling, project controls, and design management services. Fixed, hourly, monthly, and advisory tiers.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
