import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { ServiceRequestProvider } from "@/components/service-request-provider";
import "./globals.css";

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  weight: "300 800",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains",
  weight: "400 700",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://alfatrees.com";

export const metadata: Metadata = {
  title: {
    default: "Alfatrees PMC | Estimation, Scheduling & Project Controls",
    template: "%s | Alfatrees PMC",
  },
  description:
    "Bid-ready estimates, CPM schedules, and project controls delivered globally in 24-72 hours. AACE-aligned services across 10+ project types.",
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Alfatrees PMC",
    title: "Alfatrees PMC | Estimation, Scheduling & Project Controls",
    description:
      "Bid-ready estimates, CPM schedules, and project controls delivered globally in 24-72 hours. AACE-aligned services across 10+ project types.",
  },
  twitter: {
    card: "summary",
    title: "Alfatrees PMC | Estimation, Scheduling & Project Controls",
    description:
      "Bid-ready estimates, CPM schedules, and project controls delivered globally in 24-72 hours.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// Inline script to apply theme before paint — prevents flash of wrong theme
// Safe: static hardcoded string, reads only from localStorage, no user input
// v2: clears stale dark-mode storage from earlier builds to force light default
const themeScript = `
  (function() {
    var t = localStorage.getItem('alfatrees-theme-v2');
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('alfatrees-theme');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        {/* Static JSON-LD structured data — all values hardcoded, no user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Alfatrees PMC",
              description:
                "Construction project management consultancy specializing in estimation, scheduling, project controls, and design management.",
              url: SITE_URL,
              logo: `${SITE_URL}/logo-64-final.png`,
              email: "info.alfatrees@gmail.com",
              areaServed: "Worldwide",
              serviceType: [
                "Construction Cost Estimation",
                "CPM Scheduling",
                "Project Controls",
                "Design Management",
                "Quality Assurance",
              ],
              priceRange: "$75 - $5000+",
            }),
          }}
        />
        <ThemeProvider>
          <ServiceRequestProvider>{children}</ServiceRequestProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
