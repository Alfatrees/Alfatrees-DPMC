import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Instant Quote",
  description: "Get an instant price breakdown for estimation, scheduling, and project controls services. Select services, enter project details, see your quote in under 2 minutes.",
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
