import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
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

export const metadata: Metadata = {
  title: "Alfatrees PMC | Estimation, Scheduling & Project Controls",
  description:
    "Bid-ready estimates, CPM schedules, and project controls delivered globally. AACE-aligned services across 10+ project types.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
