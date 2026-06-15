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
    code: "EST-",
    title: "Estimation",
    subtitle: "AACE Class 5 through Class 1",
    count: "8 services",
    href: "/services/estimation",
  },
  {
    code: "SCH-",
    title: "Scheduling",
    subtitle: "CPM Baseline, Updates, Audit, Forensics",
    count: "5 services",
    href: "/services/scheduling",
  },
  {
    code: "CTL-",
    title: "Project Controls",
    subtitle: "Cost + Schedule Reporting, EVM",
    count: "3 services",
    href: "/services/controls",
  },
  {
    code: "DMR-",
    title: "Design Management",
    subtitle: "Retainer: RFI, Submittals, Coordination",
    count: "1 retainer",
    href: "/services/design-management",
  },
  {
    code: "EVL-",
    title: "Evaluation & Review",
    subtitle: "Cost, Contractor, Performance, Constructability",
    count: "4 services",
    href: "/services/evaluation",
  },
  {
    code: "QAP-",
    title: "Quality Planning",
    subtitle: "QA/QC Plans, Inspection Checklists",
    count: "2 services",
    href: "/services/quality-planning",
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
    range: { usd: "$75 – $5,000+", inr: "₹5,000 – ₹3,00,000+" },
    description: "Estimates, schedules, audits, evaluations",
  },
  {
    tier: "HOURLY",
    name: "Ongoing Support",
    range: { usd: "$25 – $55/hr", inr: "₹1,500 – ₹3,500/hr" },
    description: "Fractional controls, change orders",
  },
  {
    tier: "MONTHLY",
    name: "Retainer",
    range: { usd: "$800 – $3,000/mo", inr: "₹50,000 – ₹1,80,000/mo" },
    description: "Schedule updates, controls, design management",
  },
  {
    tier: "ADVISORY",
    name: "Expert & Forensic",
    range: { usd: "$50 – $80/hr", inr: "₹3,500 – ₹5,500/hr" },
    description: "Delay analysis, schedule forensics",
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
