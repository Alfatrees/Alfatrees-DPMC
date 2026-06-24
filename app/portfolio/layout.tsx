import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore our project portfolio — estimation, scheduling, project controls, and design management across commercial, healthcare, residential, and institutional projects.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
