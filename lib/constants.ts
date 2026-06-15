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
  summary: string;
  bullets: string[];
  deliverable: string;
  badge?: string;
  methodology?: string[];
  tools?: string[];
  timeline?: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  detail: string;
};

export type ServiceGroup = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  stats: { value: string; label: string }[];
  processSteps: ProcessStep[];
  services: ServiceItem[];
  clientProvides: string[];
  weDeliver: string[];
  standardsAndTools: string[];
  pricingTier: string;
  pricingStarts: { usd: string; inr: string };
  projectTypes: string[];
  ctaText: string;
};

export const SERVICE_DETAILS: Record<string, ServiceGroup> = {
  estimation: {
    slug: "estimation",
    title: "Estimation",
    headline: "From Concept Budgets to Bid-Ready Packages",
    description:
      "Every level of estimate your project demands — aligned to the AACE International Estimate Classification System (18R-97). Whether you need a rough order of magnitude for a feasibility study or a fully detailed bid package for competitive tendering, we deliver structured, auditable cost intelligence with clear assumptions, pricing sources, and accuracy ranges documented at every level.",
    stats: [
      { value: "8", label: "Specialized Services" },
      { value: "AACE", label: "Class 5 → Class 1" },
      { value: "24–72hr", label: "Typical Turnaround" },
      { value: "10+", label: "Project Types" },
    ],
    processSteps: [
      { step: 1, title: "Upload Drawings", detail: "Share your plan sets (PDF/DWG), specifications, and scope documents via Google Drive. We review within hours." },
      { step: 2, title: "Scope Review", detail: "We analyze your drawings for completeness, identify any gaps or ambiguities, and confirm the estimate class and trade breakdown with you." },
      { step: 3, title: "Quantity Takeoff", detail: "Systematic measurement of all quantities from plans using Bluebeam Revu or Kreo — every item color-coded and linked to the spreadsheet." },
      { step: 4, title: "Pricing & Assembly", detail: "Unit costs applied from RS Means, regional databases, or your preferred sources. Trade-wise assembly with labor, material, equipment, and subcontractor breakdowns." },
      { step: 5, title: "Quality Check", detail: "Internal cross-check against benchmarks, historical data, and known cost ranges. Assumptions documented, exclusions listed." },
      { step: 6, title: "Deliver & Revise", detail: "Final package delivered via Google Drive. One revision round included to address your feedback and adjustments." },
    ],
    services: [
      {
        name: "Conceptual / Order of Magnitude Estimate",
        summary: "Early-stage cost model for feasibility and go/no-go decisions.",
        bullets: [
          "Built from parametric data, historical benchmarks, and square-foot cost factors",
          "Adjusted for location, building type, and current market conditions",
          "Detailed assumptions log documenting what drives every number",
          "Clear exclusions list so stakeholders know exactly what's included",
          "Suitable for land acquisition analysis and initial budget approvals",
        ],
        deliverable: "PDF cost model + assumptions log + benchmark references",
        badge: "AACE Class 5/4",
        methodology: ["Parametric modeling", "Historical benchmarking", "Location factor adjustment", "Contingency allocation (15–30%)"],
        tools: ["RS Means", "Excel", "Historical databases"],
        timeline: "2–4 business days",
      },
      {
        name: "Design Development Estimate",
        summary: "Budget alignment estimate produced at 10–40% design completion.",
        bullets: [
          "Trade-level cost breakdown with applied unit costs and allowances",
          "Design contingency allocation for undefined or evolving scope",
          "Validates that the design direction stays within the owner's approved budget",
          "Supports the decision to proceed to full construction documents",
        ],
        deliverable: "Excel workbook with trade breakdown + summary report + variance notes",
        badge: "AACE Class 3",
        methodology: ["Trade-level quantity takeoff", "Unit cost application", "Design contingency allocation", "Allowance identification"],
        tools: ["Bluebeam Revu", "Excel", "RS Means"],
        timeline: "3–5 business days",
      },
      {
        name: "Detailed / Definitive Estimate",
        summary: "Comprehensive line-item estimate from substantially complete construction documents.",
        bullets: [
          "Full quantity takeoff across every trade from 30–70% complete drawings",
          "Crew rates, material pricing, equipment costs, and subcontractor markups applied",
          "Organized by CSI MasterFormat division or your preferred WBS structure",
          "Used by GCs to validate bid strategy before final submission",
        ],
        deliverable: "Trade-wise Excel workbook + bid form draft + reconciliation summary",
        badge: "AACE Class 2",
        methodology: ["Detailed quantity takeoff (all trades)", "Crew-rate labor pricing", "Material price verification", "Subcontractor market comparison"],
        tools: ["Bluebeam Revu", "Kreo", "Excel", "RS Means"],
        timeline: "5–10 business days",
      },
      {
        name: "Bid-Ready / Check Estimate",
        summary: "Final priced estimate from 100% documents, ready for competitive submission.",
        bullets: [
          "Every line item priced with overhead, profit, bonds, and insurance markups applied",
          "Bid form completed per the owner's template and submission requirements",
          "Also used as a check estimate for independent bid verification",
          "Fully audit-ready with traceable backup documentation for every number",
        ],
        deliverable: "Complete bid package + filled bid form + backup documentation",
        badge: "AACE Class 1",
        methodology: ["Full-scope quantity takeoff", "Market-rate pricing verification", "Markup stack application (OH/P, bonds, insurance)", "Bid form completion"],
        tools: ["Bluebeam Revu", "Excel", "RS Means", "Contractor databases"],
        timeline: "7–14 business days",
      },
      {
        name: "Quantity Takeoff — Single Trade",
        summary: "Precise quantities for one specific trade, measured from your plan set.",
        bullets: [
          "Covers any CSI division: concrete, steel, drywall, flooring, roofing, MEP, and more",
          "Every measurement color-coded on marked-up plans with direct spreadsheet links",
          "Waste factors applied; all units clearly labeled for material procurement",
          "Used daily by GCs and subcontractors for bid preparation",
        ],
        deliverable: "Excel QTO spreadsheet + color-coded marked-up plans (PDF)",
        badge: "High Volume",
        methodology: ["On-screen takeoff from plan sets", "Color-coded measurement markup", "Linked spreadsheet cross-referencing", "Waste factor application"],
        tools: ["Bluebeam Revu", "Kreo", "PlanSwift", "Excel"],
        timeline: "1–3 business days",
      },
      {
        name: "Quantity Takeoff — Multi Trade",
        summary: "Coordinated quantity takeoffs across multiple trades from a single plan set.",
        bullets: [
          "Organized by CSI MasterFormat division or trade-specific tabs",
          "Each trade gets its own tab with consistent formatting and units",
          "Cross-trade coordination check to catch scope gaps and overlaps",
          "Ideal for GCs preparing multi-trade bids or owners needing full scope breakdown",
        ],
        deliverable: "Multi-sheet QTO package (Excel) + marked-up plans per trade",
        methodology: ["Multi-trade on-screen takeoff", "CSI division organization", "Cross-trade coordination check", "Consistent unit/format standards"],
        tools: ["Bluebeam Revu", "Kreo", "Excel"],
        timeline: "3–7 business days",
      },
      {
        name: "Bill of Quantities / Bill of Materials",
        summary: "Formatted BOQ or BOM prepared to your specific template or standard format.",
        bullets: [
          "Supports client-mandated, government tender, CSI, or RICS formats",
          "Includes item descriptions, quantities, units, and drawing/spec references",
          "Full traceability for procurement, subcontractor bidding, and contract administration",
          "Consistent unit standardization and procurement-ready item descriptions",
        ],
        deliverable: "Formatted BOQ/BOM document (Excel/PDF) in client template",
        methodology: ["Template-based formatting", "Drawing/spec reference linking", "Procurement-ready item descriptions", "Unit standardization"],
        tools: ["Excel", "Bluebeam Revu"],
        timeline: "3–5 business days",
      },
      {
        name: "Change Order / Variation Estimate",
        summary: "Cost and schedule impact analysis for scope changes on active projects.",
        bullets: [
          "Breaks down added and deleted work with backup documentation",
          "Quantifies net cost impact with unit pricing and quantity verification",
          "Identifies schedule implications of the change",
          "Used by GCs to submit claims and by owners to evaluate contractor requests",
          "Formal narrative memo suitable for contract correspondence",
        ],
        deliverable: "Cost impact memo + detailed backup + schedule impact assessment",
        methodology: ["Added/deleted scope quantification", "Unit cost application to changes", "Schedule impact assessment", "Formal narrative documentation"],
        tools: ["Excel", "Bluebeam Revu", "MS Project"],
        timeline: "2–5 business days",
      },
    ],
    clientProvides: [
      "Plan sets (PDF or DWG format)",
      "Project specifications (technical and general)",
      "Scope documents, addenda, or RFI logs",
      "Bid forms and submission templates (if applicable)",
      "Budget targets or previous estimates (for check estimates)",
    ],
    weDeliver: [
      "Structured Excel workbooks with trade-wise breakdowns",
      "Color-coded marked-up plans (Bluebeam PDF) showing every measured item",
      "PDF summary reports with executive overview and assumptions log",
      "Bid form completion (where applicable)",
      "One revision round included in every engagement",
    ],
    standardsAndTools: ["AACE International (18R-97)", "CSI MasterFormat", "RS Means", "Bluebeam Revu", "Kreo", "PlanSwift", "Excel", "Power BI"],
    pricingTier: "FIXED",
    pricingStarts: { usd: "$75", inr: "₹5,000" },
    projectTypes: ["Residential", "Commercial", "Hospitality", "Healthcare", "Institutional", "Industrial", "Data Center", "Interior Fit-out", "Mixed-Use", "Renovation"],
    ctaText: "Get an Estimate Quote",
  },

  scheduling: {
    slug: "scheduling",
    title: "Scheduling",
    headline: "CPM Schedules That Keep Projects on Track",
    description:
      "Critical Path Method scheduling across the full project lifecycle — from pre-construction baseline development through construction progress tracking to post-construction forensic delay analysis. Every schedule is built with proper logic relationships, realistic durations, resource awareness, and a clear critical path. All work delivered in MS Project (.mpp) or Primavera P6 (.xer) with supporting PDF reports and narratives.",
    stats: [
      { value: "5", label: "Specialized Services" },
      { value: "CPM", label: "Critical Path Method" },
      { value: "15-pt", label: "Audit Checklist" },
      { value: ".mpp/.xer", label: "Native Formats" },
    ],
    processSteps: [
      { step: 1, title: "Gather Project Data", detail: "Collect drawings, specifications, contract milestones, existing schedules (.mpp/.xer), and progress reports via Google Drive." },
      { step: 2, title: "WBS Development", detail: "Build the Work Breakdown Structure organized by phase, area, or trade — aligned to your contract requirements and reporting needs." },
      { step: 3, title: "Activity & Logic", detail: "Define activities with realistic durations, assign logic relationships (FS, SS, FF, SF), and identify constraints, lags, and leads." },
      { step: 4, title: "Critical Path Analysis", detail: "Run CPM analysis to identify the critical path, near-critical activities, and float distribution. Optimize the logic network." },
      { step: 5, title: "Resource & Cost Loading", detail: "Assign resources and/or cost loading where required — enabling earned value tracking and cash-flow projection." },
      { step: 6, title: "Deliver & Report", detail: "Export native files (.mpp/.xer), PDF Gantt charts, and a narrative report explaining key assumptions and scheduling logic." },
    ],
    services: [
      {
        name: "Baseline CPM Schedule",
        summary: "Complete CPM project schedule built from drawings, specs, and contract documents.",
        bullets: [
          "Hierarchical WBS organized by phase, area, or trade",
          "Activity durations based on crew productivity and scope quantities",
          "CPM logic relationships with minimal constraints and proper FS/SS/FF usage",
          "Resource loading where required for earned value tracking",
          "Formal basis-of-schedule narrative documenting all assumptions and calendars",
        ],
        deliverable: "Native .mpp or .xer file + PDF Gantt chart + WBS document + basis-of-schedule narrative",
        methodology: ["WBS development (phase/area/trade)", "Activity duration calculation", "Logic network development (CPM)", "Calendar and constraint definition"],
        tools: ["MS Project", "Primavera P6", "Excel", "Bluebeam"],
        timeline: "5–10 business days",
      },
      {
        name: "Monthly Schedule Update & Progress Report",
        summary: "Regular monthly progress update keeping your active schedule current and accurate.",
        bullets: [
          "Percent-complete updates based on field-reported progress data",
          "Variance analysis comparing planned vs actual for all activities",
          "Critical path shift identification and float erosion alerts",
          "3-week look-ahead for field coordination and subcontractor planning",
          "Milestone tracking against contractual dates with trend reporting",
        ],
        deliverable: "Updated .mpp/.xer + variance analysis report + 3-week look-ahead + milestone tracker",
        badge: "Retainer",
        methodology: ["Progress data collection", "Percent complete updates", "Variance analysis (planned vs actual)", "Critical path monitoring"],
        tools: ["MS Project", "Primavera P6", "Excel", "Power BI"],
        timeline: "3–5 business days per cycle",
      },
      {
        name: "Schedule Health Audit",
        summary: "Independent 15-point diagnostic of an existing schedule's logic and CPM compliance.",
        bullets: [
          "Evaluates logic density, float distribution, constraints, and open-ended activities",
          "Checks critical path validity, calendar accuracy, and relationship types",
          "Identifies lag abuse, missing logic, and resource conflicts",
          "Pass/fail scorecard with specific improvement recommendations",
          "Branded report suitable for submission to owners or project stakeholders",
        ],
        deliverable: "Branded 15-point audit report + scorecard + improvement recommendations",
        badge: "Lead Gen",
        methodology: ["Logic density analysis", "Float distribution check", "Constraint audit", "Critical path validation", "Open-end identification"],
        tools: ["MS Project", "Primavera P6", "Excel"],
        timeline: "2–3 business days",
      },
      {
        name: "Recovery / Acceleration Schedule",
        summary: "Revised schedule with credible recovery plan for projects behind contractual milestones.",
        bullets: [
          "Analyzes current delay position against contracted milestone dates",
          "Identifies recovery opportunities: resequencing, fast-tracking, and crashing",
          "Develops multiple recovery scenarios with associated cost implications",
          "Revised schedule with updated logic and compressed activity durations",
          "Formal recovery narrative demonstrating a defensible plan to the owner",
        ],
        deliverable: "Revised .mpp/.xer + recovery narrative + scenario comparison matrix + cost impact summary",
        methodology: ["Delay position analysis", "Recovery strategy development", "Scenario modeling (fast-track/crash)", "Cost-time trade-off analysis"],
        tools: ["MS Project", "Primavera P6", "Excel"],
        timeline: "5–10 business days",
      },
      {
        name: "Schedule Forensics & Delay Analysis",
        summary: "Expert forensic delay analysis for construction disputes, claims, and litigation support.",
        bullets: [
          "As-planned vs as-built comparison across the full project timeline",
          "Time Impact Analysis (TIA) for each identified delay event",
          "Concurrent delay identification and delay responsibility allocation",
          "Follows AACE Recommended Practice 29R-03 methodology",
          "Formal forensic report with timeline exhibits suitable for arbitration or legal proceedings",
        ],
        deliverable: "Forensic report + TIA analysis + as-planned vs as-built comparison + delay narrative + timeline exhibits",
        badge: "Advisory",
        methodology: ["As-planned vs as-built comparison", "Time Impact Analysis (TIA)", "Concurrent delay identification", "Delay responsibility allocation"],
        tools: ["MS Project", "Primavera P6", "Excel", "Bluebeam"],
        timeline: "10–20 business days",
      },
    ],
    clientProvides: [
      "Existing schedule files (.mpp or .xer format)",
      "Progress data, daily logs, and percent complete reports",
      "Construction drawings and specifications (for baseline development)",
      "Contract milestones, deadlines, and liquidated damages provisions",
      "Correspondence and change order documentation (for forensic analysis)",
    ],
    weDeliver: [
      "Native schedule files (.mpp/.xer) with full logic and resource data",
      "PDF Gantt charts and summary-level bar charts",
      "Branded narrative reports with executive summaries",
      "Variance analysis and milestone tracking dashboards",
      "One revision round included in every engagement",
    ],
    standardsAndTools: ["AACE RP 29R-03", "CPM Best Practices", "MS Project", "Primavera P6", "Excel", "Power BI", "Bluebeam Revu"],
    pricingTier: "FIXED / MONTHLY",
    pricingStarts: { usd: "$250", inr: "₹15,000" },
    projectTypes: ["Residential", "Commercial", "Hospitality", "Healthcare", "Institutional", "Industrial", "Data Center", "Interior Fit-out", "Mixed-Use", "Renovation"],
    ctaText: "Get a Scheduling Quote",
  },

  controls: {
    slug: "controls",
    title: "Project Controls",
    headline: "Your Fractional Project Controls Department",
    description:
      "Professional cost and schedule monitoring, earned value reporting, risk management, and cash-flow forecasting — without the full-time overhead of an in-house controls engineer. We operate as your embedded project controls team, providing weekly dashboards, monthly reports, and real-time earned value metrics (CPI/SPI) that keep stakeholders informed and projects accountable. Ideal for mid-size GCs and owners managing $1M–$50M+ projects who need controls discipline but can't justify a $120K/year hire.",
    stats: [
      { value: "3", label: "Service Models" },
      { value: "EVM", label: "Earned Value Metrics" },
      { value: "Weekly", label: "Status Calls" },
      { value: "CPI/SPI", label: "Performance Tracking" },
    ],
    processSteps: [
      { step: 1, title: "Baseline Setup", detail: "Establish the cost and schedule baseline — budget breakdown, WBS alignment, and reporting structure agreed upon." },
      { step: 2, title: "Data Collection", detail: "Collect progress data, cost reports, invoices, and change orders from your team on a regular cadence." },
      { step: 3, title: "Analysis & Reporting", detail: "Process earned value metrics (CPI/SPI), variance analysis, cash-flow projections, and risk register updates." },
      { step: 4, title: "Dashboard Delivery", detail: "Publish interactive Power BI or Excel dashboards with drill-down by trade, phase, or cost code." },
      { step: 5, title: "Status Review", detail: "Weekly 30-minute video call to walk through metrics, flag concerns, and align on corrective actions." },
      { step: 6, title: "Monthly Report", detail: "Formal monthly report package with executive summary, detailed metrics, trend analysis, and forecasts." },
    ],
    services: [
      {
        name: "Fractional Controls Support (Hourly)",
        summary: "On-demand project controls support billed hourly with no long-term commitment.",
        bullets: [
          "Covers schedule updates, cost tracking, variance analysis, and dashboard builds",
          "Change order tracking and ad-hoc controls tasks as your project demands",
          "No minimum commitment beyond 10 hours per month — scale up or down",
          "Ideal for smaller projects or teams needing overflow support during peak periods",
        ],
        deliverable: "Weekly dashboards + variance reports + ad-hoc analysis + time log",
        badge: "Hourly",
        methodology: ["Weekly data processing", "Variance analysis", "Dashboard development", "Ad-hoc reporting"],
        tools: ["Excel", "Power BI", "MS Project"],
        timeline: "Ongoing — weekly deliverables",
      },
      {
        name: "Monthly Project Controls Retainer",
        summary: "Your complete virtual project controls department on a monthly retainer.",
        bullets: [
          "Monthly schedule update, cost report, and Earned Value snapshot (CPI, SPI, EAC, ETC)",
          "Progress report with milestone tracking and risk register maintenance",
          "Power BI dashboard updated monthly with drill-down by trade and phase",
          "Weekly 30-minute video call to review metrics and align on corrective actions",
          "Full controls discipline at a fraction of the cost of an in-house hire",
        ],
        deliverable: "Monthly report package (schedule + cost + EVM + risk) + weekly video calls + live dashboards",
        badge: "Retainer",
        methodology: ["Earned Value Management (EVM)", "Cost Performance Index (CPI) / Schedule Performance Index (SPI) tracking", "Estimate at Completion (EAC) forecasting", "Risk register maintenance"],
        tools: ["MS Project", "Primavera P6", "Excel", "Power BI"],
        timeline: "Monthly cycle with weekly check-ins",
      },
      {
        name: "Cash-Flow Forecast & S-Curve Setup",
        summary: "One-time setup of a cost-loaded schedule with S-curves and cash-flow projections.",
        bullets: [
          "Budget line items linked to schedule activities for automatic cash-flow calculation",
          "Planned, actual, and forecast S-curves for visual performance comparison",
          "Monthly cash-flow projection table with period-by-period spend breakdown",
          "Reusable reporting template your team can update independently each month",
        ],
        deliverable: "Cost-loaded schedule + S-curve charts (planned/actual/forecast) + cash-flow table + reporting template",
        badge: "Fixed",
        methodology: ["Schedule-budget linkage", "S-curve generation (planned/actual/forecast)", "Cash-flow projection modeling", "Template standardization"],
        tools: ["MS Project", "Excel", "Power BI"],
        timeline: "5–7 business days",
      },
    ],
    clientProvides: [
      "Project schedule files (.mpp/.xer) and budget breakdown",
      "Monthly progress data and percent complete by trade/phase",
      "Contractor invoices, payment applications, and cost reports",
      "Change order documentation and contract modifications",
      "Access to your project management platform (if applicable)",
    ],
    weDeliver: [
      "Monthly report package via Google Drive with executive summary",
      "Interactive Power BI or Excel dashboards with drill-down capability",
      "S-curve charts and cash-flow projections updated monthly",
      "Risk register with probability/impact assessment and mitigation plans",
      "Weekly 30-minute video call for retainer clients",
    ],
    standardsAndTools: ["AACE EVM Standards", "PMI PMBOK", "MS Project", "Primavera P6", "Power BI", "Excel"],
    pricingTier: "HOURLY / MONTHLY",
    pricingStarts: { usd: "$25/hr", inr: "₹1,500/hr" },
    projectTypes: ["Commercial", "Healthcare", "Institutional", "Industrial", "Data Center", "Mixed-Use", "Renovation"],
    ctaText: "Get a Controls Quote",
  },

  "design-management": {
    slug: "design-management",
    title: "Design Management",
    headline: "Coordination That Keeps Design on Schedule and Budget",
    description:
      "A monthly retainer that covers the full spectrum of design phase coordination — RFI tracking, submittal reviews, consultant coordination, timeline oversight, budget monitoring, and quality standards. Offered exclusively as a retainer package because isolated sub-services create coordination gaps. Your design team gets a dedicated coordinator who manages the information flow between architects, engineers, consultants, and the owner — ensuring nothing falls through the cracks during the most decision-intensive phase of any project.",
    stats: [
      { value: "6", label: "Disciplines Covered" },
      { value: "1–2 hrs", label: "Daily Effort" },
      { value: "Weekly", label: "Status Reports" },
      { value: "100%", label: "Remote Delivery" },
    ],
    processSteps: [
      { step: 1, title: "Platform Setup", detail: "Onboard to your project management platform (Procore, Airtable, or Excel-based) and establish log templates for RFIs, submittals, and coordination." },
      { step: 2, title: "Consultant Mapping", detail: "Map all consultant disciplines, contacts, deliverable milestones, and review responsibilities." },
      { step: 3, title: "Daily Coordination", detail: "Route RFIs, track submittal reviews, coordinate between disciplines, and flag overdue items — ~1–2 hours daily." },
      { step: 4, title: "Weekly Reporting", detail: "Produce a weekly design management status report covering open items, upcoming milestones, risks, and action items." },
      { step: 5, title: "Budget Monitoring", detail: "Track design-stage cost implications, flag scope creep, maintain budget-to-actual log, and forecast cost trends." },
      { step: 6, title: "Quality Gate", detail: "Review drawing set completeness against project standards before each design milestone submission." },
    ],
    services: [
      {
        name: "RFI Tracking & Coordination",
        summary: "Full lifecycle RFI management from submission through consultant response to closure.",
        bullets: [
          "RFI log maintained in your platform: Procore, Airtable, Excel, or SharePoint",
          "Each RFI routed to the responsible consultant with context and urgency flags",
          "Response timelines tracked against contractual requirements",
          "Overdue items escalated to the project manager before they impact schedule",
          "Searchable resolution database maintained for the project record",
        ],
        deliverable: "Managed RFI log + daily status updates + escalation alerts + resolution database",
        methodology: ["RFI lifecycle tracking (submit → route → respond → close)", "Overdue escalation protocol", "Resolution database maintenance"],
        tools: ["Procore", "Airtable", "Excel", "SharePoint"],
        timeline: "Ongoing — daily management",
      },
      {
        name: "Submittal Review Tracking",
        summary: "Full submittal schedule tracking across all disciplines from submission to approval.",
        bullets: [
          "Review cycle tracked for every package: submission → consultant review → approval or resubmission",
          "Overdue reviews flagged before they impact procurement or fabrication timelines",
          "Revision cycles monitored and resubmission deadlines enforced",
          "Critical path submittals identified in coordination with the project schedule",
        ],
        deliverable: "Submittal schedule + review status tracker + critical path submittal alerts",
        methodology: ["Submittal lifecycle tracking", "Review cycle monitoring", "Critical path submittal identification", "Procurement timeline coordination"],
        tools: ["Procore", "Airtable", "Excel", "MS Project"],
        timeline: "Ongoing — daily management",
      },
      {
        name: "Consultant Coordination",
        summary: "Active coordination between architect, engineers, and specialty consultants throughout design.",
        bullets: [
          "Manages communication between structural, MEP, civil, landscape, and specialty disciplines",
          "Design deliverable milestones tracked for every consultant",
          "Inter-discipline conflicts identified and resolved before they reach construction",
          "Coordination meetings facilitated with action items tracked to closure",
        ],
        deliverable: "Coordination meeting minutes + milestone tracking matrix + conflict resolution log",
        methodology: ["Inter-discipline conflict identification", "Milestone tracking by consultant", "Coordination meeting facilitation", "Action item tracking"],
        tools: ["Microsoft Teams", "Zoom", "Email", "Airtable"],
        timeline: "Ongoing — as-needed coordination",
      },
      {
        name: "Design Timeline Review & Assessment",
        summary: "Weekly review of design milestone adherence with early schedule risk alerts.",
        bullets: [
          "Planned vs actual design deliverable dates compared every week",
          "Root causes of emerging delays identified and documented",
          "Impact on the overall project schedule assessed and quantified",
          "Stoplight dashboard (green/yellow/red) by design phase and consultant discipline",
          "Corrective action recommendations issued before delays become critical",
        ],
        deliverable: "Weekly status report + stoplight dashboard + delay impact assessment + corrective action recommendations",
        methodology: ["Planned vs actual design progress tracking", "Stoplight status dashboard", "Root cause delay analysis", "Corrective action recommendations"],
        tools: ["Excel", "MS Project", "Power BI"],
        timeline: "Weekly — 1–2 hours per week",
      },
      {
        name: "Budget Assessment & Look-Forward",
        summary: "Ongoing tracking of design-stage cost implications with monthly budget forecasting.",
        bullets: [
          "Running budget-to-actual log capturing scope creep and design changes",
          "Value engineering decisions and their cost impacts documented",
          "Monthly look-forward projecting cost trends based on current design decisions",
          "Early warning alerts when the design trajectory risks a budget overrun",
        ],
        deliverable: "Budget-to-actual log + monthly cost trend forecast + scope creep alert report",
        methodology: ["Design change cost tracking", "Budget variance monitoring", "Cost trend forecasting", "Scope creep identification"],
        tools: ["Excel", "Power BI"],
        timeline: "Weekly updates — monthly formal report",
      },
      {
        name: "Quality Standards & Checklist Development",
        summary: "QA checklists and completeness reviews for each design milestone submission.",
        bullets: [
          "Checklists developed for SD, DD, and CD milestone submissions",
          "Drawing set completeness reviewed against AIA and CSI benchmarks",
          "Standards compliance matrix mapping requirements to deliverables",
          "Quality gate prevents incomplete or conflicting documents from reaching the owner",
        ],
        deliverable: "QA checklists per design phase + completeness review reports + standards compliance matrix",
        methodology: ["Design milestone quality gate", "Drawing completeness audit", "Standards compliance review (AIA/CSI)", "Rework prevention analysis"],
        tools: ["Excel", "Bluebeam Revu"],
        timeline: "As-needed — 2–4 hours per month",
      },
    ],
    clientProvides: [
      "Access to project management platform (Procore, or we set up Airtable/Excel)",
      "Drawing sets, specifications, and design development documents",
      "Consultant contacts, contracts, and deliverable schedules",
      "Project schedule with design phase milestones",
      "Budget information and approved scope documents",
    ],
    weDeliver: [
      "Weekly design management status report with stoplight dashboard",
      "Managed RFI and submittal logs — always current, always accessible",
      "Coordination meeting minutes and action item tracking",
      "Monthly budget assessment with cost trend forecasting",
      "Quality checklists and completeness reviews per design phase",
    ],
    standardsAndTools: ["AIA Standards", "CSI MasterFormat", "Procore", "Airtable", "MS Project", "Excel", "Power BI", "Bluebeam Revu", "Microsoft Teams", "Zoom"],
    pricingTier: "MONTHLY",
    pricingStarts: { usd: "$1,000/mo", inr: "₹60,000/mo" },
    projectTypes: ["Commercial", "Hospitality", "Healthcare", "Institutional", "Industrial", "Data Center", "Interior Fit-out", "Mixed-Use"],
    ctaText: "Discuss a Retainer",
  },

  evaluation: {
    slug: "evaluation",
    title: "Evaluation & Review",
    headline: "Independent Expert Assessments You Can Trust",
    description:
      "We evaluate — we don't produce. Our evaluation services provide independent, unbiased expert review of existing deliverables: estimates, contractor bids, project performance data, and construction documents. This is the expert advisor perspective — used for due diligence, management oversight, dispute resolution, and investment decision-making. Evaluation commands premium rates because clients need an independent opinion they can defend, not just another set of numbers.",
    stats: [
      { value: "4", label: "Evaluation Types" },
      { value: "Independent", label: "Unbiased Review" },
      { value: "Expert", label: "Advisor Perspective" },
      { value: "Audit-Ready", label: "Report Quality" },
    ],
    processSteps: [
      { step: 1, title: "Receive Documents", detail: "Client uploads existing estimates, bids, performance data, or drawings for independent review via Google Drive." },
      { step: 2, title: "Scope the Review", detail: "Confirm evaluation criteria, benchmarks to compare against, and specific questions the client wants answered." },
      { step: 3, title: "Independent Analysis", detail: "Conduct evaluation using industry benchmarks, cross-referencing standards, and expert judgment — completely independent of the original producer." },
      { step: 4, title: "Findings Development", detail: "Document all findings with evidence: flagged items, benchmark comparisons, risk areas, and root cause analysis." },
      { step: 5, title: "Report Assembly", detail: "Produce a formal evaluation report with executive summary, detailed findings, and actionable recommendations." },
      { step: 6, title: "Deliver & Discuss", detail: "Deliver the report and walk through findings on a video call. One revision round included for questions or clarifications." },
    ],
    services: [
      {
        name: "Cost Evaluation & Benchmarking",
        summary: "Independent review of an existing estimate or budget to assess reasonableness and completeness.",
        bullets: [
          "Line items compared against RS Means benchmarks and regional market rates",
          "Every flagged item explained: too high, too low, or missing entirely",
          "Historical project data cross-referenced for additional validation",
          "Used by owners evaluating bids, lenders doing due diligence, and PMs validating estimates",
          "Defensible opinion suitable for audit or dispute purposes",
        ],
        deliverable: "Evaluation report: reasonableness opinion + benchmark comparison + flagged items list + recommendations",
        methodology: ["Line-item reasonableness testing", "RS Means benchmark comparison", "Historical project data cross-reference", "Market rate verification"],
        tools: ["RS Means", "Excel", "Historical databases"],
        timeline: "3–7 business days",
      },
      {
        name: "Contractor / Vendor Evaluation",
        summary: "Structured bid and qualification evaluation using a weighted scoring matrix.",
        bullets: [
          "Weighted decision matrix scoring each bidder on price, experience, schedule, and financial strength",
          "Safety record and reference verification factored into the evaluation",
          "Insurance and bonding capacity assessed against project requirements",
          "Recommendation memo documents the process clearly enough to defend in an audit or dispute",
          "Used by owners selecting GCs, GCs selecting subs, and developers doing due diligence",
        ],
        deliverable: "Weighted decision matrix (Excel) + recommendation memo + risk assessment per bidder",
        methodology: ["Weighted scoring matrix development", "Bid comparison analysis", "Reference verification protocol", "Financial capacity assessment"],
        tools: ["Excel", "Reference check templates"],
        timeline: "3–5 business days",
      },
      {
        name: "Performance Evaluation (SPI/CPI Diagnostics)",
        summary: "EVM-based diagnostic of active project performance with root cause identification.",
        bullets: [
          "CPI, SPI, EAC, and VAC calculated and interpreted against project baseline",
          "Root causes investigated: productivity issues, scope creep, coordination failures, or resource constraints",
          "Performance trend projections showing where the project is heading",
          "Actionable corrective action recommendations tied to specific findings",
          "Delivered as a diagnostic report with supporting Power BI or Excel dashboard",
        ],
        deliverable: "Performance dashboard + diagnostic report + root cause analysis + corrective action plan + trend projections",
        methodology: ["Earned Value Analysis (CPI/SPI/EAC/VAC)", "Root cause investigation", "Trend projection modeling", "Corrective action development"],
        tools: ["MS Project", "Excel", "Power BI"],
        timeline: "5–7 business days",
      },
      {
        name: "Constructability Review",
        summary: "Expert drawing review to identify constructability issues before construction starts.",
        bullets: [
          "Cross-discipline coordination conflicts identified and documented",
          "Impractical construction sequences and access constraints flagged",
          "Material specification inconsistencies reviewed against construction feasibility",
          "Every issue marked up in Bluebeam with severity rating (critical/major/minor) and recommended resolution",
          "Prevents RFIs, change orders, and rework — saves multiples of its cost",
        ],
        deliverable: "Marked-up drawings (Bluebeam) + issues log with severity ratings + resolution recommendations + executive summary",
        methodology: ["Cross-discipline conflict check", "Construction sequence review", "Specification consistency audit", "Access and logistics assessment"],
        tools: ["Bluebeam Revu", "Excel"],
        timeline: "5–10 business days",
      },
    ],
    clientProvides: [
      "Existing estimates, budgets, or change order documentation",
      "Contractor bids, qualifications packages, and references",
      "Project schedule and cost performance data (for performance evaluation)",
      "Construction drawings or BIM models (for constructability review)",
      "Specific evaluation criteria or questions to be answered",
    ],
    weDeliver: [
      "Formal evaluation report with executive summary and detailed findings",
      "Benchmark comparison data with source references",
      "Marked-up drawings with issues log (constructability reviews)",
      "Decision matrix with weighted scoring (contractor evaluation)",
      "One revision round included in every engagement",
    ],
    standardsAndTools: ["AACE International", "RS Means", "PMI PMBOK (EVM)", "Bluebeam Revu", "Excel", "Power BI", "MS Project"],
    pricingTier: "FIXED / ADVISORY",
    pricingStarts: { usd: "$300", inr: "₹18,000" },
    projectTypes: ["Residential", "Commercial", "Hospitality", "Healthcare", "Institutional", "Industrial", "Data Center", "Interior Fit-out", "Mixed-Use", "Renovation"],
    ctaText: "Request an Evaluation",
  },

  "quality-planning": {
    slug: "quality-planning",
    title: "Quality Planning",
    headline: "QA/QC Frameworks Your Field Team Can Execute",
    description:
      "We create the quality management documents and inspection frameworks — your site team executes them. This is not on-site monitoring or punch list management. We provide the intellectual framework: QA/QC plans aligned to project specifications and applicable codes, inspection checklists organized by trade and discipline, acceptance criteria definitions, and photo documentation templates. Standard practice in construction — the QA manager develops the plans, field engineers execute the inspections. Our documents give your team the structured tools they need to maintain quality standards consistently across every phase and trade.",
    stats: [
      { value: "2", label: "Core Services" },
      { value: "Per-Trade", label: "Checklist Detail" },
      { value: "Code-Aligned", label: "Standards Compliance" },
      { value: "Reusable", label: "Template Format" },
    ],
    processSteps: [
      { step: 1, title: "Specifications Review", detail: "Review project specifications, applicable codes (IBC, NBC, ACI, ASTM), and scope to understand quality requirements." },
      { step: 2, title: "Standards Mapping", detail: "Map specification requirements to inspection points — what gets checked, when, by whom, and against what acceptance criteria." },
      { step: 3, title: "Framework Development", detail: "Develop the QA/QC plan structure including roles, responsibilities, inspection frequencies, hold points, and documentation requirements." },
      { step: 4, title: "Checklist Creation", detail: "Build trade-specific checklists with line items, acceptance criteria, reference standards, and space for field notes and photos." },
      { step: 5, title: "Template Formatting", detail: "Format all documents in your branding or standard template — Excel for checklists, PDF for the QA/QC plan." },
      { step: 6, title: "Deliver & Train", detail: "Deliver completed package via Google Drive with a walkthrough call to explain structure, usage, and customization options." },
    ],
    services: [
      {
        name: "QA/QC Plan & Standards Development",
        summary: "Comprehensive quality management plan aligned to project specs and applicable building codes.",
        bullets: [
          "Defines roles, responsibilities, inspection frequencies, and hold points",
          "Non-conformance reporting procedures and corrective action protocols included",
          "Standards alignment matrix mapping every spec section to inspection requirements",
          "NCR templates and document control framework ready to deploy on day one",
          "Aligns to IBC, NBC 2016, ACI, ASTM, and any project-specific standards",
        ],
        deliverable: "QA/QC plan document (PDF) + standards alignment matrix (Excel) + inspection framework + NCR templates",
        methodology: ["Specification analysis", "Code requirement mapping", "Hold point identification", "NCR process development", "Document control framework"],
        tools: ["Excel", "Word/PDF", "Code reference databases"],
        timeline: "5–10 business days",
      },
      {
        name: "Inspection Checklist & Template Package",
        summary: "Trade-specific inspection checklists your field team can use on day one without training.",
        bullets: [
          "Covers all required trades: concrete, steel, masonry, waterproofing, MEP, drywall, roofing, and more",
          "Each checklist includes quantitative acceptance criteria — tolerances, test requirements, visual standards",
          "Hold points requiring sign-off before the next phase clearly marked",
          "Space for inspector notes, deficiency descriptions, and photo documentation",
          "Print-ready or tablet-compatible — no special software required",
        ],
        deliverable: "Trade-specific checklist package (Excel/PDF) + photo documentation templates + inspection schedule template",
        methodology: ["Trade-specific inspection item development", "Acceptance criteria definition (tolerances, tests)", "Hold point mapping", "Photo documentation protocol"],
        tools: ["Excel", "PDF templates"],
        timeline: "5–7 business days",
      },
    ],
    clientProvides: [
      "Project specifications (technical and general conditions)",
      "Applicable building codes and standards (IBC, NBC, local codes)",
      "Scope description and complete trade list",
      "Any existing quality documentation or templates to align with",
      "Project-specific requirements (LEED, commissioning, owner standards)",
    ],
    weDeliver: [
      "QA/QC plan document — the quality management bible for your project",
      "Trade-specific inspection checklists — ready to use on a tablet or printed",
      "Standards alignment matrix mapping specs to inspection requirements",
      "Photo documentation templates with numbered reference fields",
      "One revision round included to customize for your specific needs",
    ],
    standardsAndTools: ["IBC (International Building Code)", "NBC 2016", "ACI Standards", "ASTM Standards", "CSI MasterFormat", "Excel", "Bluebeam Revu"],
    pricingTier: "FIXED",
    pricingStarts: { usd: "$200", inr: "₹12,000" },
    projectTypes: ["Residential", "Commercial", "Hospitality", "Healthcare", "Institutional", "Industrial", "Data Center", "Interior Fit-out", "Mixed-Use", "Renovation"],
    ctaText: "Get a QA Planning Quote",
  },
};

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
