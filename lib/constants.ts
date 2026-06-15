export const BRAND = {
  name: "Alfatrees",
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
  { value: "24–72hr", label: "Typical Turnaround" },
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

// =============================================
// SERVICE DETAIL PAGES — Full data for each group
// Internal codes (EST-01, etc.) are NOT shown on the frontend.
// =============================================

export type ServiceItem = {
  name: string;
  description: string;
  deliverable: string;
  badge?: string; // e.g. "AACE Class 5/4", "Lead Gen", "Retainer"
};

export type ServiceGroup = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  services: ServiceItem[];
  clientProvides: string[];
  weDeliver: string[];
  pricingTier: string;
  pricingStarts: { usd: string; inr: string };
  projectTypes: string;
  ctaText: string;
};

export const SERVICE_DETAILS: Record<string, ServiceGroup> = {
  estimation: {
    slug: "estimation",
    title: "Estimation",
    headline: "From Concept Budgets to Bid-Ready Packages",
    description:
      "Every level of detail your project demands — aligned to AACE International estimate classification. Conceptual budgets for go/no-go decisions through to complete bid packages for competitive tendering.",
    services: [
      {
        name: "Conceptual / Order of Magnitude Estimate",
        description:
          "Early-stage cost model for feasibility and go/no-go decisions. Based on parametric data, historical benchmarks, and high-level scope.",
        deliverable: "PDF cost model + assumptions log",
        badge: "AACE Class 5/4",
      },
      {
        name: "Design Development Estimate",
        description:
          "Budget alignment at design development stage. Trade-level breakdown with unit costs and allowances for undefined scope.",
        deliverable: "Excel workbook + summary report",
        badge: "AACE Class 3",
      },
      {
        name: "Detailed / Definitive Estimate",
        description:
          "Comprehensive trade-wise estimate from substantially complete drawings. Line-item quantities with applied crew rates and material pricing.",
        deliverable: "Trade-wise workbook + bid form",
        badge: "AACE Class 2",
      },
      {
        name: "Bid-Ready / Check Estimate",
        description:
          "Complete bid package from final construction documents. Includes markups, contingency, bonds, and bid form fill — ready for submission.",
        deliverable: "Complete bid package + bid form fill",
        badge: "AACE Class 1",
      },
      {
        name: "Quantity Takeoff — Single Trade",
        description:
          "Precise quantities for one trade from plan sets. Marked-up plans showing all measured items with linked spreadsheet.",
        deliverable: "Excel QTO + marked-up plans",
        badge: "High Volume",
      },
      {
        name: "Quantity Takeoff — Multi Trade",
        description:
          "Coordinated quantity takeoffs across multiple trades from a single plan set. Organized by CSI division or trade.",
        deliverable: "Multi-sheet QTO package + markups",
      },
      {
        name: "Bill of Quantities / Bill of Materials",
        description:
          "Formatted BOQ/BOM document prepared to client or tender template specifications. Suitable for procurement and subcontractor bidding.",
        deliverable: "Formatted BOQ to client/tender template",
      },
      {
        name: "Change Order / Variation Estimate",
        description:
          "Cost and schedule impact analysis for scope changes on active projects. Clear breakdown of added/deleted work with backup documentation.",
        deliverable: "Cost + schedule impact memo",
      },
    ],
    clientProvides: [
      "Plan sets (PDF/DWG)",
      "Specifications",
      "Project scope documents",
      "Bid forms (if applicable)",
    ],
    weDeliver: [
      "Digital files (Excel, PDF) via shared Google Drive folder",
      "Marked-up plans (Bluebeam/Kreo) where applicable",
      "One revision round included",
    ],
    pricingTier: "FIXED",
    pricingStarts: { usd: "$75", inr: "₹5,000" },
    projectTypes:
      "Residential, Commercial, Hospitality, Healthcare, Institutional, Industrial, Data Center, Interior Fit-out, Mixed-Use, Renovation",
    ctaText: "Get an Estimate Quote",
  },

  scheduling: {
    slug: "scheduling",
    title: "Scheduling",
    headline: "CPM Schedules That Keep Projects on Track",
    description:
      "Critical Path Method scheduling across the full project lifecycle — from baseline development through forensic delay analysis. All work delivered in MS Project or Primavera P6.",
    services: [
      {
        name: "Baseline CPM Schedule",
        description:
          "Complete project schedule built from drawings and specifications. Includes WBS, activity logic, resource loading, and basis-of-schedule narrative.",
        deliverable: ".mpp/.xer + PDF Gantt + WBS + narrative",
      },
      {
        name: "Monthly Schedule Update & Progress Report",
        description:
          "Regular progress updates with variance analysis, percent complete tracking, and 3-week look-ahead. The recurring revenue engine — clients don't switch schedulers mid-project.",
        deliverable: "Updated .mpp + variance analysis + look-ahead",
        badge: "Retainer",
      },
      {
        name: "Schedule Health Audit",
        description:
          "15-point diagnostic of an existing schedule. Evaluates logic integrity, float distribution, constraint usage, critical path validity, and resource conflicts.",
        deliverable: "Branded audit report (15-point checklist)",
        badge: "Lead Gen",
      },
      {
        name: "Recovery / Acceleration Schedule",
        description:
          "Revised schedule for projects that are behind. Includes recovery strategies, scenario comparison, and revised milestones with narrative justification.",
        deliverable: "Revised .mpp + recovery narrative + scenarios",
      },
      {
        name: "Schedule Forensics & Delay Analysis",
        description:
          "Expert forensic analysis for disputes and claims. As-planned vs as-built comparison, Time Impact Analysis (TIA), and delay responsibility allocation.",
        deliverable: "Forensic report + TIA + delay narrative",
        badge: "Advisory",
      },
    ],
    clientProvides: [
      "Existing schedule files (.mpp/.xer)",
      "Progress data and percent complete",
      "Drawings for baseline development",
      "Contract milestones and deadlines",
    ],
    weDeliver: [
      "Updated schedule files + PDF reports via Google Drive",
      "Branded report templates",
      "One revision round included",
    ],
    pricingTier: "FIXED / MONTHLY",
    pricingStarts: { usd: "$250", inr: "₹15,000" },
    projectTypes:
      "Residential, Commercial, Hospitality, Healthcare, Institutional, Industrial, Data Center, Interior Fit-out, Mixed-Use, Renovation",
    ctaText: "Get a Scheduling Quote",
  },

  controls: {
    slug: "controls",
    title: "Project Controls",
    headline: "Your Fractional Project Controls Department",
    description:
      "Real-time cost and schedule monitoring, earned value reporting, and cash-flow forecasting. For teams that need professional controls without the full-time overhead.",
    services: [
      {
        name: "Fractional Controls Support (Hourly)",
        description:
          "On-demand project controls support billed hourly. Weekly schedule and cost updates, dashboards, variance reports, and ad-hoc analysis as needed.",
        deliverable: "Dashboards, variance reports, ad-hoc analysis",
        badge: "Hourly",
      },
      {
        name: "Monthly Project Controls Retainer",
        description:
          "Comprehensive monthly controls package: schedule update, cost report, EVM snapshot (CPI/SPI), progress report, and a weekly 30-minute status call. Includes bundled dashboard builds, risk register, and document control.",
        deliverable: "Monthly report package + weekly call",
        badge: "Retainer",
      },
      {
        name: "Cash-Flow Forecast & S-Curve Setup",
        description:
          "Cost-loaded schedule with planned vs actual S-curves, cash-flow projection tables, and report templates for ongoing tracking.",
        deliverable: "S-curves + cash-flow table + report template",
        badge: "Fixed",
      },
    ],
    clientProvides: [
      "Schedule files and cost data",
      "Progress updates and percent complete",
      "Invoices and payment applications",
      "Contract budget and change orders",
    ],
    weDeliver: [
      "Monthly report package via Google Drive",
      "Power BI / Excel dashboards",
      "Weekly 30-min video call (retainer)",
    ],
    pricingTier: "HOURLY / MONTHLY",
    pricingStarts: { usd: "$25/hr", inr: "₹1,500/hr" },
    projectTypes:
      "Commercial, Healthcare, Institutional, Industrial, Data Center, Mixed-Use, Renovation",
    ctaText: "Get a Controls Quote",
  },

  "design-management": {
    slug: "design-management",
    title: "Design Management",
    headline: "Coordination That Keeps Design on Schedule and Budget",
    description:
      "Monthly retainer for comprehensive design phase coordination — RFI tracking, submittal reviews, consultant coordination, timeline oversight, and quality standards. One retainer, six disciplines covered.",
    services: [
      {
        name: "RFI Tracking & Coordination",
        description:
          "Manage the RFI log in your project management platform. Route requests to consultants, track responses, flag overdue items, and maintain resolution records.",
        deliverable: "Managed RFI log + status reports",
      },
      {
        name: "Submittal Review Tracking",
        description:
          "Maintain the submittal schedule across all disciplines. Track review status, flag overdue approvals, and coordinate resubmissions.",
        deliverable: "Submittal schedule + status tracking",
      },
      {
        name: "Consultant Coordination",
        description:
          "Coordinate architect, structural, and MEP consultants via email, Teams, and Zoom. Track design deliverable milestones and resolve inter-discipline conflicts.",
        deliverable: "Coordination emails + milestone tracking",
      },
      {
        name: "Design Timeline Review",
        description:
          "Weekly review of design milestone adherence. Flag delays, report schedule impact to the owner, and recommend corrective actions.",
        deliverable: "Weekly status reports + delay flags",
      },
      {
        name: "Budget Assessment & Look-Forward",
        description:
          "Track design-stage cost implications. Flag scope creep, maintain budget-to-actual log, and project cost trends forward.",
        deliverable: "Budget log + cost trend reports",
      },
      {
        name: "Quality Standards & Checklist Development",
        description:
          "Develop QA checklists for design deliverables. Review drawing set completeness and alignment with project standards.",
        deliverable: "QA checklists + completeness reviews",
      },
    ],
    clientProvides: [
      "Access to project management platform (or we set up Airtable)",
      "Drawing sets and specifications",
      "Consultant contacts and contracts",
      "Project schedule and milestones",
    ],
    weDeliver: [
      "Weekly status reports and updated logs",
      "Coordination emails and meeting minutes",
      "All delivered via shared Drive/platform",
    ],
    pricingTier: "MONTHLY",
    pricingStarts: { usd: "$1,000/mo", inr: "₹60,000/mo" },
    projectTypes:
      "Commercial, Hospitality, Healthcare, Institutional, Industrial, Data Center, Interior Fit-out, Mixed-Use",
    ctaText: "Discuss a Retainer",
  },

  evaluation: {
    slug: "evaluation",
    title: "Evaluation & Review",
    headline: "Independent Expert Assessments You Can Trust",
    description:
      "We evaluate, we don't produce. Independent review of existing estimates, contractor bids, project performance, and constructability — the expert advisor perspective for due diligence and oversight.",
    services: [
      {
        name: "Cost Evaluation & Benchmarking",
        description:
          "Independent review of your existing estimate, budget, or change order. Reasonableness opinion with benchmark comparisons and flagged items.",
        deliverable: "Evaluation report + benchmark comparison",
      },
      {
        name: "Contractor / Vendor Evaluation",
        description:
          "Structured evaluation of contractor bids, qualifications, references, insurance, and bonding. Decision matrix with weighted scoring and recommendation.",
        deliverable: "Decision matrix + recommendation memo",
      },
      {
        name: "Performance Evaluation (SPI/CPI Diagnostics)",
        description:
          "Diagnostic analysis of active project performance using earned value metrics. Identifies root causes of cost overruns and schedule delays.",
        deliverable: "Performance dashboard + diagnostic report",
      },
      {
        name: "Constructability Review",
        description:
          "Expert review of drawing sets or BIM models for constructability issues. Identifies conflicts, sequencing problems, and coordination gaps before construction starts.",
        deliverable: "Marked-up drawings + issues log",
      },
    ],
    clientProvides: [
      "Existing estimates, schedules, or budgets",
      "Contractor bids and qualifications",
      "Project performance data",
      "Drawing sets or BIM models",
    ],
    weDeliver: [
      "Expert opinion reports via Google Drive",
      "Marked-up drawings (Bluebeam) where applicable",
      "One revision round included",
    ],
    pricingTier: "FIXED / ADVISORY",
    pricingStarts: { usd: "$300", inr: "₹18,000" },
    projectTypes:
      "All project types — Residential through Industrial",
    ctaText: "Request an Evaluation",
  },

  "quality-planning": {
    slug: "quality-planning",
    title: "Quality Planning",
    headline: "QA/QC Frameworks Your Field Team Can Execute",
    description:
      "Quality management documents and inspection frameworks — not on-site monitoring. Your site team executes inspections using our checklists and plans. We provide the intellectual framework; you provide the boots on the ground.",
    services: [
      {
        name: "QA/QC Plan & Standards Development",
        description:
          "Comprehensive quality management plan aligned to project specifications and applicable codes. Includes standards alignment matrix, inspection framework, and acceptance criteria.",
        deliverable: "QA/QC plan + standards matrix + framework",
      },
      {
        name: "Inspection Checklist & Template Package",
        description:
          "Branded checklist set organized by trade and discipline. Each checklist includes acceptance criteria, hold points, and photo documentation templates.",
        deliverable: "Checklist package + photo doc templates",
      },
    ],
    clientProvides: [
      "Project specifications",
      "Applicable codes and standards",
      "Scope description and trade list",
    ],
    weDeliver: [
      "QA/QC plan document via Google Drive",
      "Branded checklist package (PDF/Excel)",
      "One revision round included",
    ],
    pricingTier: "FIXED",
    pricingStarts: { usd: "$200", inr: "₹12,000" },
    projectTypes:
      "All project types — especially Commercial, Healthcare, Institutional, Industrial",
    ctaText: "Get a QA Planning Quote",
  },
} as const;

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
