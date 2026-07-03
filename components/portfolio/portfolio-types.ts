export type Trade =
  | "General Construction"
  | "Roofing"
  | "Mechanical & Plumbing"
  | "HVAC & Ventilation"
  | "Electrical & Security"
  | "Specialty & Civil";

export interface DTIProject {
  id: string;
  contractNumber: string;
  projectCode: string;
  fiscalYear: number;
  facilityName: string;
  region: string;
  trade: Trade;
  contractor: string;
  contractorLocation: string;
  tenderType: "Open" | "Sole Source" | "Invited";
  dates: {
    tenderIssued?: string;
    awarded?: string;
    startup?: string;
    substantial?: string;
    final?: string;
  };
  status: "Completed" | "Active";
  scope: string;
  highlights: string[];
  thumbnail: string;
  images: string[];
}

export const TRADE_COLORS: Record<Trade, string> = {
  "General Construction": "#4A90D9",
  Roofing: "#D97A3A",
  "Mechanical & Plumbing": "#3FA66A",
  "HVAC & Ventilation": "#2BB3A3",
  "Electrical & Security": "#D4A853",
  "Specialty & Civil": "#9A6BD9",
};

// Construction Manager responsibilities shown in table + modal (single source)
export const CM_ROLE = [
  "Tender coordination & award recommendation",
  "Startup meeting & mobilization",
  "Progress tracking & schedule oversight",
  "Payment certification & change management",
  "Substantial & final completion sign-off",
] as const;

export const PORTFOLIO_STATS = {
  contracts: 50,
  contractors: 34,
  sites: 46,
  period: "FY2022–FY2026",
  client: "Government of New Brunswick — Dept. of Transportation & Infrastructure",
} as const;
