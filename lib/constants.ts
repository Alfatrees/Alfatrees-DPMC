export const BRAND = {
  name: "Alfatrees PMC",
  tagline: "Estimation · Scheduling · Project Controls · Design Management",
  copyright: "Alfatrees PMC",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "/about" },
  { label: "Process", href: "#process" },
] as const;

export const SERVICE_PILLS = [
  { label: "Estimation", href: "/services/estimation" },
  { label: "Scheduling", href: "/services/scheduling" },
  { label: "Controls", href: "/services/controls" },
  { label: "Design Management", href: "/services/design-management" },
  { label: "Evaluation", href: "/services/evaluation" },
  { label: "Quality Planning", href: "/services/quality-planning" },
] as const;

export const SERVICES = [
  {
    title: "Estimation",
    subtitle: "From concept budgets to bid-ready packages — every level of detail your project demands.",
    count: "8 services",
    href: "/services/estimation",
    icon: "calculator",
  },
  {
    title: "Scheduling",
    subtitle: "CPM baselines, progress tracking, recovery plans, and forensic delay analysis.",
    count: "5 services",
    href: "/services/scheduling",
    icon: "calendar",
  },
  {
    title: "Project Controls",
    subtitle: "Real-time cost and schedule monitoring with earned value reporting.",
    count: "3 services",
    href: "/services/controls",
    icon: "bar-chart",
  },
  {
    title: "Design Management",
    subtitle: "RFI tracking, submittal reviews, consultant coordination, and quality standards.",
    count: "1 retainer",
    href: "/services/design-management",
    icon: "layers",
  },
  {
    title: "Evaluation & Review",
    subtitle: "Independent cost, contractor, performance, and constructability assessments.",
    count: "4 services",
    href: "/services/evaluation",
    icon: "search",
  },
  {
    title: "Quality Planning",
    subtitle: "QA/QC plans and inspection checklists tailored to your project scope.",
    count: "2 services",
    href: "/services/quality-planning",
    icon: "shield-check",
  },
] as const;

export const TRUST_STATS = [
  { value: "48hr", label: "Typical Turnaround" },
  { value: "10+", label: "Project Types" },
  { value: "23", label: "Specialized Services" },
  { value: "AACE", label: "Aligned Standards" },
] as const;

export const PROCESS_STEPS = [
  {
    number: 1,
    title: "Inquire",
    detail:
      "Tell us what you need via our service wizard or a quick message",
  },
  {
    number: 2,
    title: "Discover",
    detail: "Free 15-min scope call to understand your project",
  },
  {
    number: 3,
    title: "Quote",
    detail: "Fixed quote within 24 hours — no hourly surprises",
  },
  {
    number: 4,
    title: "Execute",
    detail: "Work begins within 24–48 hours of approval",
  },
  {
    number: 5,
    title: "Deliver",
    detail: "Deliverables via shared drive, ready for your review",
  },
  {
    number: 6,
    title: "Review",
    detail: "One revision round included. Your satisfaction confirmed.",
  },
] as const;

export const PRICING_TIERS = [
  {
    tier: "FIXED",
    name: "Per-Deliverable",
    startsFrom: { usd: "$75", inr: "₹5,000" },
    description: "One-time deliverables with clear scope and fixed cost",
    details: [
      { service: "Quantity Takeoff (Single Trade)", price: { usd: "From $75", inr: "From ₹5,000" } },
      { service: "Conceptual Estimate", price: { usd: "From $200", inr: "From ₹12,000" } },
      { service: "Detailed Estimate", price: { usd: "From $500", inr: "From ₹30,000" } },
      { service: "Bid-Ready Package", price: { usd: "From $1,200", inr: "From ₹75,000" } },
      { service: "Baseline CPM Schedule", price: { usd: "From $400", inr: "From ₹25,000" } },
      { service: "Schedule Health Audit", price: { usd: "From $300", inr: "From ₹18,000" } },
    ],
  },
  {
    tier: "HOURLY",
    name: "Ongoing Support",
    startsFrom: { usd: "$25/hr", inr: "₹1,500/hr" },
    description: "Flexible support for ongoing or evolving project needs",
    details: [
      { service: "Fractional Project Controls", price: { usd: "From $25/hr", inr: "From ₹1,500/hr" } },
      { service: "Change Order Analysis", price: { usd: "From $35/hr", inr: "From ₹2,200/hr" } },
      { service: "Cost Evaluation", price: { usd: "From $40/hr", inr: "From ₹2,500/hr" } },
    ],
  },
  {
    tier: "MONTHLY",
    name: "Retainer",
    startsFrom: { usd: "$800/mo", inr: "₹50,000/mo" },
    description: "Dedicated support with predictable monthly cost",
    details: [
      { service: "Schedule Updates & Reporting", price: { usd: "From $800/mo", inr: "From ₹50,000/mo" } },
      { service: "Project Controls Retainer", price: { usd: "From $1,200/mo", inr: "From ₹75,000/mo" } },
      { service: "Design Management Retainer", price: { usd: "From $1,500/mo", inr: "From ₹90,000/mo" } },
    ],
  },
  {
    tier: "ADVISORY",
    name: "Expert & Forensic",
    startsFrom: { usd: "$50/hr", inr: "₹3,500/hr" },
    description: "Specialized expertise for complex or disputed projects",
    details: [
      { service: "Forensic Delay Analysis", price: { usd: "From $50/hr", inr: "From ₹3,500/hr" } },
      { service: "Constructability Review", price: { usd: "From $60/hr", inr: "From ₹4,000/hr" } },
      { service: "Performance Evaluation", price: { usd: "From $55/hr", inr: "From ₹3,800/hr" } },
    ],
  },
] as const;

export const STANDARDS_INTERNATIONAL = [
  "AACE International",
  "CSI MasterFormat",
  "AIA Standards",
  "MS Project",
  "Bluebeam Revu",
  "Power BI",
] as const;

export const STANDARDS_INDIA = [
  "NBC 2016",
  "BIS Standards",
  "RERA Compliant",
  "CPWD Guidelines",
  "MS Project",
  "Bluebeam Revu",
] as const;

export const FOOTER_LINKS = {
  services: [
    { label: "Estimation", href: "/services/estimation" },
    { label: "Scheduling", href: "/services/scheduling" },
    { label: "Controls", href: "/services/controls" },
    { label: "Design Management", href: "/services/design-management" },
    { label: "Evaluation", href: "/services/evaluation" },
    { label: "Quality Planning", href: "/services/quality-planning" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Pricing", href: "/pricing" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;
