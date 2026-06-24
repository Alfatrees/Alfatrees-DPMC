import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Alfatrees PMC services — pricing, process, timelines, payment, and remote delivery across 10+ project types.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
