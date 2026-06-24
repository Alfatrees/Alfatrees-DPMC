/**
 * Alfatrees PMC — Instant Quote Engine
 *
 * 100% rule-based, deterministic calculation.
 * Same inputs = same output, every time. No AI, no randomness.
 *
 * Formula per line item:
 *   price = basePrice × valueMult × complexityMult × scopeMult × urgencyMult
 *   range = price × (1 ± ACCURACY_PERCENT)
 */

// ─── Constants ───────────────────────────────────────────────

export const ACCURACY_PERCENT = 0.15; // ±15%

// ─── Types ───────────────────────────────────────────────────

export type ProjectValueTier =
  | "Under $500K"
  | "$500K – $1M"
  | "$1M – $5M"
  | "$5M – $10M"
  | "$10M – $50M"
  | "$50M+";

export type ProjectType =
  | "Residential"
  | "Commercial"
  | "Hospitality"
  | "Healthcare"
  | "Institutional"
  | "Industrial"
  | "Data Center"
  | "Interior Fit-out"
  | "Mixed-Use"
  | "Renovation"
  | "Other";

export type ProjectStage =
  | "Pre-Design / Feasibility"
  | "Schematic Design (SD)"
  | "Design Development (DD)"
  | "Construction Documents (CD)"
  | "Bidding & Procurement"
  | "Construction (Active)"
  | "Post-Construction / Closeout";

export type Urgency = "Standard" | "Expedited" | "Rush";

export type ServiceCategory =
  | "Estimation"
  | "Scheduling"
  | "Project Controls"
  | "Design Management"
  | "Evaluation & Review"
  | "Quality Planning";

export type SheetRange = "1–20" | "21–50" | "51–100" | "100+";

export interface QuoteInput {
  services: ServiceCategory[];
  projectValue: ProjectValueTier;
  projectType: ProjectType;
  projectStage: ProjectStage;
  urgency: Urgency;
  sheets: SheetRange;
  trades: number;
  areaSqFt: number;
  location: string;
}

export interface QuoteLineItem {
  code: string;
  name: string;
  description: string;
  basePrice: number;
  valueMultiplier: number;
  valueLabel: string;
  complexityMultiplier: number;
  complexityLabel: string;
  scopeMultiplier: number;
  scopeLabel: string;
  urgencyMultiplier: number;
  urgencyLabel: string;
  calculatedPrice: number;
  rangeLow: number;
  rangeHigh: number;
  tier: "FIXED" | "HOURLY" | "MONTHLY" | "ADVISORY";
  pricingBasis: string;
  standards: string[];
  timeline: string;
}

export interface QuoteBreakdown {
  referenceNumber: string;
  generatedAt: string;
  input: QuoteInput;
  lineItems: QuoteLineItem[];
  totalLow: number;
  totalHigh: number;
  accuracyPercent: number;
  currency: "USD";
  notes: string[];
}

// ─── Multiplier Tables ──────────────────────────────────────

const VALUE_MULTIPLIERS: Record<ProjectValueTier, { mult: number; label: string }> = {
  "Under $500K": { mult: 1.0, label: "Small scale (1.0×)" },
  "$500K – $1M": { mult: 1.2, label: "Small-mid (1.2×)" },
  "$1M – $5M": { mult: 1.5, label: "Mid-size (1.5×)" },
  "$5M – $10M": { mult: 1.8, label: "Large (1.8×)" },
  "$10M – $50M": { mult: 2.2, label: "Major (2.2×)" },
  "$50M+": { mult: 3.0, label: "Enterprise (3.0×)" },
};

const COMPLEXITY_MULTIPLIERS: Record<ProjectType, { mult: number; label: string }> = {
  Residential: { mult: 1.0, label: "Residential (1.0×)" },
  "Interior Fit-out": { mult: 1.1, label: "Interior Fit-out (1.1×)" },
  Renovation: { mult: 1.2, label: "Renovation (1.2×)" },
  Commercial: { mult: 1.3, label: "Commercial (1.3×)" },
  Hospitality: { mult: 1.3, label: "Hospitality (1.3×)" },
  Industrial: { mult: 1.3, label: "Industrial (1.3×)" },
  "Mixed-Use": { mult: 1.4, label: "Mixed-Use (1.4×)" },
  Institutional: { mult: 1.4, label: "Institutional (1.4×)" },
  Healthcare: { mult: 1.6, label: "Healthcare (1.6×)" },
  "Data Center": { mult: 1.6, label: "Data Center (1.6×)" },
  Other: { mult: 1.3, label: "Other (1.3×)" },
};

const SCOPE_MULTIPLIERS: Record<SheetRange, { mult: number; label: string }> = {
  "1–20": { mult: 1.0, label: "1–20 sheets (1.0×)" },
  "21–50": { mult: 1.3, label: "21–50 sheets (1.3×)" },
  "51–100": { mult: 1.6, label: "51–100 sheets (1.6×)" },
  "100+": { mult: 2.0, label: "100+ sheets (2.0×)" },
};

const URGENCY_MULTIPLIERS: Record<Urgency, { mult: number; label: string }> = {
  Standard: { mult: 1.0, label: "Standard (1.0×)" },
  Expedited: { mult: 1.15, label: "Expedited +15% (1.15×)" },
  Rush: { mult: 1.25, label: "Rush +25% (1.25×)" },
};

// ─── Sub-Service Definitions ─────────────────────────────────

interface SubServiceDef {
  code: string;
  name: string;
  description: string;
  basePrice: number;
  tier: "FIXED" | "HOURLY" | "MONTHLY" | "ADVISORY";
  pricingBasis: string;
  standards: string[];
  timeline: string;
}

const ESTIMATION_SERVICES: Record<string, SubServiceDef> = {
  "EST-01": {
    code: "EST-01",
    name: "Conceptual / Order of Magnitude Estimate",
    description: "Parametric cost model for feasibility and go/no-go decisions (AACE Class 5/4)",
    basePrice: 200,
    tier: "FIXED",
    pricingBasis: "Per project, based on parametric modeling and historical benchmarks",
    standards: ["AACE International (18R-97)", "RS Means"],
    timeline: "2–4 business days",
  },
  "EST-02": {
    code: "EST-02",
    name: "Design Development Estimate",
    description: "Trade-level cost breakdown at 10–40% design completion (AACE Class 3)",
    basePrice: 400,
    tier: "FIXED",
    pricingBasis: "Per project, trade-level quantity takeoff with unit costs",
    standards: ["AACE International (18R-97)", "CSI MasterFormat", "RS Means"],
    timeline: "3–5 business days",
  },
  "EST-03": {
    code: "EST-03",
    name: "Detailed / Definitive Estimate",
    description: "Comprehensive line-item estimate from substantially complete documents (AACE Class 2)",
    basePrice: 800,
    tier: "FIXED",
    pricingBasis: "Per project, full QTO with crew rates, material pricing, subcontractor markups",
    standards: ["AACE International (18R-97)", "CSI MasterFormat", "RS Means", "Bluebeam Revu"],
    timeline: "5–10 business days",
  },
  "EST-04": {
    code: "EST-04",
    name: "Bid-Ready / Check Estimate",
    description: "Final priced estimate from 100% documents, ready for competitive submission (AACE Class 1)",
    basePrice: 1500,
    tier: "FIXED",
    pricingBasis: "Per project, complete bid package with OH/P, bonds, insurance markups",
    standards: ["AACE International (18R-97)", "CSI MasterFormat", "RS Means", "Bluebeam Revu"],
    timeline: "7–14 business days",
  },
  "EST-05": {
    code: "EST-05",
    name: "Quantity Takeoff — Single Trade",
    description: "Precise quantities for one specific trade, measured from plan set",
    basePrice: 75,
    tier: "FIXED",
    pricingBasis: "Per trade, on-screen takeoff with color-coded markup",
    standards: ["CSI MasterFormat", "Bluebeam Revu"],
    timeline: "1–3 business days",
  },
  "EST-06": {
    code: "EST-06",
    name: "Quantity Takeoff — Multi Trade",
    description: "Coordinated quantity takeoffs across multiple trades from a single plan set",
    basePrice: 200,
    tier: "FIXED",
    pricingBasis: "Per project, multi-trade coordinated takeoff",
    standards: ["CSI MasterFormat", "Bluebeam Revu"],
    timeline: "3–7 business days",
  },
  "EST-07": {
    code: "EST-07",
    name: "Bill of Quantities / Bill of Materials",
    description: "Formatted BOQ or BOM to your specific template or standard format",
    basePrice: 250,
    tier: "FIXED",
    pricingBasis: "Per project, template-based formatting with procurement-ready descriptions",
    standards: ["CSI MasterFormat", "Bluebeam Revu"],
    timeline: "3–5 business days",
  },
  "EST-08": {
    code: "EST-08",
    name: "Change Order / Variation Estimate",
    description: "Cost and schedule impact analysis for scope changes on active projects",
    basePrice: 200,
    tier: "FIXED",
    pricingBasis: "Per change order, added/deleted scope quantification with impact analysis",
    standards: ["AACE International", "CSI MasterFormat"],
    timeline: "2–5 business days",
  },
};

const SCHEDULING_SERVICES: Record<string, SubServiceDef> = {
  "SCH-01": {
    code: "SCH-01",
    name: "Baseline CPM Schedule",
    description: "Complete CPM project schedule built from drawings, specs, and contract documents",
    basePrice: 400,
    tier: "FIXED",
    pricingBasis: "Per project, WBS development + activity/logic network + CPM analysis",
    standards: ["AACE RP 29R-03", "CPM Best Practices", "MS Project / Primavera P6"],
    timeline: "5–10 business days",
  },
  "SCH-02": {
    code: "SCH-02",
    name: "Monthly Schedule Update & Progress Report",
    description: "Regular monthly progress update with variance analysis and look-ahead",
    basePrice: 800,
    tier: "MONTHLY",
    pricingBasis: "Monthly retainer, includes progress updates + variance analysis + 3-week look-ahead",
    standards: ["CPM Best Practices", "MS Project / Primavera P6"],
    timeline: "3–5 business days per cycle",
  },
  "SCH-03": {
    code: "SCH-03",
    name: "Schedule Health Audit",
    description: "Independent 15-point diagnostic of existing schedule logic and CPM compliance",
    basePrice: 300,
    tier: "FIXED",
    pricingBasis: "Per audit, 15-point evaluation with scorecard and recommendations",
    standards: ["AACE RP 29R-03", "CPM Best Practices"],
    timeline: "2–3 business days",
  },
  "SCH-04": {
    code: "SCH-04",
    name: "Recovery / Acceleration Schedule",
    description: "Revised schedule with credible recovery plan for delayed projects",
    basePrice: 600,
    tier: "FIXED",
    pricingBasis: "Per project, delay analysis + recovery scenarios + cost implications",
    standards: ["AACE RP 29R-03", "MS Project / Primavera P6"],
    timeline: "5–10 business days",
  },
  "SCH-05": {
    code: "SCH-05",
    name: "Schedule Forensics & Delay Analysis",
    description: "Expert forensic delay analysis for construction disputes and litigation support",
    basePrice: 2000,
    tier: "ADVISORY",
    pricingBasis: "Hourly ($50–80/hr) or fixed engagement, TIA methodology per AACE 29R-03",
    standards: ["AACE RP 29R-03", "MS Project / Primavera P6"],
    timeline: "10–20 business days",
  },
};

const CONTROLS_SERVICES: Record<string, SubServiceDef> = {
  "CTL-01": {
    code: "CTL-01",
    name: "Fractional Controls Support (Hourly)",
    description: "On-demand project controls support — schedule updates, cost tracking, dashboards",
    basePrice: 500,
    tier: "HOURLY",
    pricingBasis: "Hourly ($25–55/hr), minimum 10 hours/month, billed weekly",
    standards: ["AACE EVM Standards", "PMI PMBOK", "MS Project", "Power BI"],
    timeline: "Ongoing — weekly deliverables",
  },
  "CTL-02": {
    code: "CTL-02",
    name: "Monthly Project Controls Retainer",
    description: "Complete virtual project controls department on monthly retainer",
    basePrice: 1200,
    tier: "MONTHLY",
    pricingBasis: "Monthly retainer, includes schedule + cost + EVM reports + weekly calls",
    standards: ["AACE EVM Standards", "PMI PMBOK", "MS Project", "Power BI"],
    timeline: "Monthly cycle with weekly check-ins",
  },
  "CTL-03": {
    code: "CTL-03",
    name: "Cash-Flow Forecast & S-Curve Setup",
    description: "One-time cost-loaded schedule with S-curves and cash-flow projections",
    basePrice: 700,
    tier: "FIXED",
    pricingBasis: "Per project, schedule-budget linkage + S-curve generation + reporting template",
    standards: ["AACE EVM Standards", "MS Project", "Power BI"],
    timeline: "5–7 business days",
  },
};

const DESIGN_MGMT_SERVICES: Record<string, SubServiceDef> = {
  "DMR-01": {
    code: "DMR-01",
    name: "Design Management Retainer",
    description: "Full-spectrum design phase coordination — RFI, submittals, consultants, timeline, budget, QA",
    basePrice: 1000,
    tier: "MONTHLY",
    pricingBasis: "Monthly retainer (~1–2 hrs/day), covers all 6 sub-disciplines",
    standards: ["AIA Standards", "CSI MasterFormat", "MS Project", "Bluebeam Revu"],
    timeline: "Ongoing — daily coordination, weekly reports",
  },
};

const EVALUATION_SERVICES: Record<string, SubServiceDef> = {
  "EVL-01": {
    code: "EVL-01",
    name: "Cost Evaluation & Benchmarking",
    description: "Independent review of existing estimate or budget for reasonableness and completeness",
    basePrice: 400,
    tier: "FIXED",
    pricingBasis: "Per evaluation, line-item benchmarking against RS Means and market rates",
    standards: ["AACE International", "RS Means"],
    timeline: "3–7 business days",
  },
  "EVL-02": {
    code: "EVL-02",
    name: "Contractor / Vendor Evaluation",
    description: "Structured bid evaluation using weighted scoring matrix",
    basePrice: 300,
    tier: "FIXED",
    pricingBasis: "Per evaluation, weighted decision matrix + recommendation memo",
    standards: ["AACE International"],
    timeline: "3–5 business days",
  },
  "EVL-03": {
    code: "EVL-03",
    name: "Performance Evaluation (SPI/CPI Diagnostics)",
    description: "EVM-based diagnostic of active project performance with root cause analysis",
    basePrice: 500,
    tier: "FIXED",
    pricingBasis: "Per evaluation, CPI/SPI analysis + trend projections + corrective actions",
    standards: ["AACE EVM Standards", "PMI PMBOK", "Power BI"],
    timeline: "5–7 business days",
  },
  "EVL-04": {
    code: "EVL-04",
    name: "Constructability Review",
    description: "Expert drawing review to identify constructability issues before construction",
    basePrice: 400,
    tier: "FIXED",
    pricingBasis: "Per review, cross-discipline conflict check with severity-rated issues log",
    standards: ["Bluebeam Revu"],
    timeline: "5–10 business days",
  },
};

const QUALITY_SERVICES: Record<string, SubServiceDef> = {
  "QAP-01": {
    code: "QAP-01",
    name: "QA/QC Plan & Standards Development",
    description: "Comprehensive quality management plan aligned to project specs and building codes",
    basePrice: 400,
    tier: "FIXED",
    pricingBasis: "Per project, specification analysis + code mapping + NCR process + inspection framework",
    standards: ["IBC", "NBC 2016", "ACI", "ASTM", "CSI MasterFormat"],
    timeline: "5–10 business days",
  },
  "QAP-02": {
    code: "QAP-02",
    name: "Inspection Checklist & Template Package",
    description: "Trade-specific inspection checklists with acceptance criteria and hold points",
    basePrice: 200,
    tier: "FIXED",
    pricingBasis: "Per project, trade-specific checklists with quantitative acceptance criteria",
    standards: ["IBC", "ACI", "ASTM"],
    timeline: "5–7 business days",
  },
};

// ─── Sub-Service Auto-Selection ──────────────────────────────

function getEstimationSubServices(stage: ProjectStage, trades: number): SubServiceDef[] {
  const items: SubServiceDef[] = [];

  // Determine estimate class by stage
  switch (stage) {
    case "Pre-Design / Feasibility":
    case "Schematic Design (SD)":
      items.push(ESTIMATION_SERVICES["EST-01"]);
      break;
    case "Design Development (DD)":
      items.push(ESTIMATION_SERVICES["EST-02"]);
      break;
    case "Construction Documents (CD)":
      items.push(ESTIMATION_SERVICES["EST-03"]);
      break;
    case "Bidding & Procurement":
      items.push(ESTIMATION_SERVICES["EST-04"]);
      break;
    case "Construction (Active)":
    case "Post-Construction / Closeout":
      items.push(ESTIMATION_SERVICES["EST-08"]);
      break;
  }

  // Add QTO if multi-trade
  if (trades > 1 && stage !== "Pre-Design / Feasibility") {
    items.push(ESTIMATION_SERVICES["EST-06"]);
  } else if (trades === 1 && stage !== "Pre-Design / Feasibility") {
    items.push(ESTIMATION_SERVICES["EST-05"]);
  }

  return items;
}

function getSchedulingSubServices(stage: ProjectStage): SubServiceDef[] {
  switch (stage) {
    case "Pre-Design / Feasibility":
    case "Schematic Design (SD)":
    case "Design Development (DD)":
    case "Construction Documents (CD)":
    case "Bidding & Procurement":
      return [SCHEDULING_SERVICES["SCH-01"]];
    case "Construction (Active)":
      return [SCHEDULING_SERVICES["SCH-02"]];
    case "Post-Construction / Closeout":
      return [SCHEDULING_SERVICES["SCH-05"]];
  }
}

function getControlsSubServices(stage: ProjectStage): SubServiceDef[] {
  switch (stage) {
    case "Pre-Design / Feasibility":
    case "Schematic Design (SD)":
    case "Design Development (DD)":
    case "Construction Documents (CD)":
      return [CONTROLS_SERVICES["CTL-03"]];
    case "Bidding & Procurement":
      return [CONTROLS_SERVICES["CTL-01"]];
    case "Construction (Active)":
      return [CONTROLS_SERVICES["CTL-02"]];
    case "Post-Construction / Closeout":
      return [CONTROLS_SERVICES["CTL-01"]];
  }
}

function getDesignMgmtSubServices(): SubServiceDef[] {
  return [DESIGN_MGMT_SERVICES["DMR-01"]];
}

function getEvaluationSubServices(stage: ProjectStage): SubServiceDef[] {
  switch (stage) {
    case "Pre-Design / Feasibility":
    case "Schematic Design (SD)":
      return [EVALUATION_SERVICES["EVL-01"]];
    case "Design Development (DD)":
    case "Construction Documents (CD)":
      return [EVALUATION_SERVICES["EVL-04"], EVALUATION_SERVICES["EVL-01"]];
    case "Bidding & Procurement":
      return [EVALUATION_SERVICES["EVL-02"], EVALUATION_SERVICES["EVL-01"]];
    case "Construction (Active)":
      return [EVALUATION_SERVICES["EVL-03"]];
    case "Post-Construction / Closeout":
      return [EVALUATION_SERVICES["EVL-03"]];
  }
}

function getQualitySubServices(): SubServiceDef[] {
  return [QUALITY_SERVICES["QAP-01"], QUALITY_SERVICES["QAP-02"]];
}

// ─── Main Calculation ────────────────────────────────────────

export function calculateQuote(input: QuoteInput): QuoteBreakdown {
  const valueMult = VALUE_MULTIPLIERS[input.projectValue];
  const complexityMult = COMPLEXITY_MULTIPLIERS[input.projectType];
  const scopeMult = SCOPE_MULTIPLIERS[input.sheets];
  const urgencyMult = URGENCY_MULTIPLIERS[input.urgency];

  // Collect sub-services for each selected category
  const allSubServices: SubServiceDef[] = [];

  for (const category of input.services) {
    switch (category) {
      case "Estimation":
        allSubServices.push(...getEstimationSubServices(input.projectStage, input.trades));
        break;
      case "Scheduling":
        allSubServices.push(...getSchedulingSubServices(input.projectStage));
        break;
      case "Project Controls":
        allSubServices.push(...getControlsSubServices(input.projectStage));
        break;
      case "Design Management":
        allSubServices.push(...getDesignMgmtSubServices());
        break;
      case "Evaluation & Review":
        allSubServices.push(...getEvaluationSubServices(input.projectStage));
        break;
      case "Quality Planning":
        allSubServices.push(...getQualitySubServices());
        break;
    }
  }

  // Deduplicate by code
  const seen = new Set<string>();
  const uniqueServices = allSubServices.filter((s) => {
    if (seen.has(s.code)) return false;
    seen.add(s.code);
    return true;
  });

  // Calculate line items
  const lineItems: QuoteLineItem[] = uniqueServices.map((svc) => {
    // For monthly/hourly services, scope multiplier is less impactful
    const effectiveScopeMult =
      svc.tier === "MONTHLY" || svc.tier === "HOURLY"
        ? 1 + (scopeMult.mult - 1) * 0.3 // dampened scope impact for retainers
        : scopeMult.mult;

    const calculated =
      svc.basePrice *
      valueMult.mult *
      complexityMult.mult *
      effectiveScopeMult *
      urgencyMult.mult;

    const rounded = Math.round(calculated / 10) * 10; // round to nearest $10

    return {
      code: svc.code,
      name: svc.name,
      description: svc.description,
      basePrice: svc.basePrice,
      valueMultiplier: valueMult.mult,
      valueLabel: valueMult.label,
      complexityMultiplier: complexityMult.mult,
      complexityLabel: complexityMult.label,
      scopeMultiplier: effectiveScopeMult,
      scopeLabel: scopeMult.label,
      urgencyMultiplier: urgencyMult.mult,
      urgencyLabel: urgencyMult.label,
      calculatedPrice: rounded,
      rangeLow: Math.round(rounded * (1 - ACCURACY_PERCENT) / 10) * 10,
      rangeHigh: Math.round(rounded * (1 + ACCURACY_PERCENT) / 10) * 10,
      tier: svc.tier,
      pricingBasis: svc.pricingBasis,
      standards: svc.standards,
      timeline: svc.timeline,
    };
  });

  const totalLow = lineItems.reduce((sum, li) => sum + li.rangeLow, 0);
  const totalHigh = lineItems.reduce((sum, li) => sum + li.rangeHigh, 0);

  const now = new Date();
  const ref = `AQ-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;

  return {
    referenceNumber: ref,
    generatedAt: now.toISOString(),
    input,
    lineItems,
    totalLow,
    totalHigh,
    accuracyPercent: ACCURACY_PERCENT * 100,
    currency: "USD",
    notes: [
      "All prices in USD. Taxes not included.",
      `This is an indicative estimate (±${ACCURACY_PERCENT * 100}%) based on project details provided.`,
      "Final price confirmed after document review and scope verification.",
      "One revision round included in all fixed-price engagements.",
      "Payment: 100% advance for engagements under $500; 50% advance + 50% on delivery for $500+.",
      "Monthly retainer prices shown are per-month rates.",
      "Rates referenced from Alfatrees PMC published rate card (alfatrees.com/pricing).",
    ],
  };
}

// ─── Formatting Helpers ──────────────────────────────────────

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRange(low: number, high: number): string {
  return `${formatUSD(low)} – ${formatUSD(high)}`;
}
