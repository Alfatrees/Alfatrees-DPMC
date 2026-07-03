import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — 50 Government Construction Contracts",
  description:
    "50 construction contracts managed for the Government of New Brunswick (DTI), 2022–2026: roofing, mechanical, HVAC, electrical, and general construction across 46 sites.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
