// Parses the DTI contracts CSV into projects-master.json (skeleton).
// Usage: node scripts/parse-dti-csv.mjs
import fs from "node:fs";
import path from "node:path";

const DPMC =
  "C:/Users/arpra/claude-api-project/Apps/Alfatrees Design & Construction Project Management Consultancy/Alfatrees DPMC (Design & Project Management Consultancy)/portfolio-projects";
const CSV = path.join(DPMC, "source/dti-contracts-2023-2026.csv");
const OUT = path.join(DPMC, "projects-master.json");

const COLS = 19; // fixed column count of the export

// ── Trade classification (6 display groups) ──
const TRADE_MAP = [
  [/dowd roofing|atlantic roofers|a-tech roofing|evolution roofing|wilson roofing/i, "Roofing"],
  [/john flood|select mechanical|leroy'?s heating/i, "Mechanical & Plumbing"],
  [/wilson ventilation|east coast sheet metal|integrated hvac|valley refrigeration|advanced energy/i, "HVAC & Ventilation"],
  [/atlantic alarm|westower/i, "Electrical & Security"],
  [/vertex solar|alliance elevators|stor-it|sussex excavators|gerry'?s welding|coastal enterprises/i, "Specialty & Civil"],
];
const tradeOf = (contractor) =>
  TRADE_MAP.find(([re]) => re.test(contractor))?.[1] ?? "General Construction";

// ── Tokenize: quoted or bare fields, then chunk into rows ──
// The export uses bare `\r` as row separator and leaves date fields UNQUOTED,
// so empty dates appear as zero characters between commas. A pattern matching
// only non-empty fields would drop those, breaking the fixed-19 chunking.
// Instead each match consumes one field (quoted `"..."` or bare, possibly
// empty) plus its trailing delimiter: a comma, a line break, end-of-input, or
// a lookahead `"` for rows butted directly against the next quoted field.
// Quoted fields use `[^"]*` (no `""` escape) so back-to-back quoted fields
// like `"Open""2026"` tokenize as two fields, not one.
const raw = fs.readFileSync(CSV, "utf8");
const fieldRe = /(?:"([^"]*)"|([^,"\r\n]*))(?:,|\r\n?|\n|(?=")|$)/g;
const fields = [...raw.matchAll(fieldRe)]
  // matchAll yields one final zero-length match at end-of-input (empty bare
  // field + `$`); it is an artifact, not a field — drop it.
  .filter((m) => m.index < raw.length)
  .map((m) => (m[1] ?? m[2] ?? "").trim());
// The header row is unquoted; data rows start at the first standalone 4-digit year token:
const start = fields.findIndex((f) => /^\d{4}$/.test(f));
const data = fields.slice(start);
if (data.length % COLS !== 0)
  throw new Error(`Field count ${data.length} not divisible by ${COLS} — CSV format changed`);

const rows = [];
for (let i = 0; i < data.length; i += COLS) rows.push(data.slice(i, i + COLS));

const projects = rows.map((r) => {
  const [fiscalYear, contractNumber, contractDate, , projectCode, part, , ,
    contractor, , , , contractorAddress, tenderIssued, awarded, startup,
    substantial, final, tenderType] = r;
  const code = part || projectCode;
  return {
    id: code.toLowerCase().replace(/\s+/g, ""),
    contractNumber,
    projectCode: code,
    parentProject: projectCode,
    fiscalYear: Number(fiscalYear),
    contractDate,
    contractor: contractor.trim(),
    contractorLocation: contractorAddress.split(/\s{2,}/).slice(-1)[0]?.trim() ?? "",
    trade: tradeOf(contractor),
    tenderType,
    dates: { tenderIssued, awarded, startup, substantial, final },
    status: substantial ? "Completed" : "Active",
    // ── enrichment fields (filled by research; templates until then) ──
    facilityName: "",   // e.g. "Saint John Law Courts" — from research
    region: "",         // e.g. "Saint John, NB"
    scope: "",          // 1-2 sentences, researched or trade template
    highlights: [],     // notable complexities (multi-trade, occupied facility, winter work…)
    sources: [],        // research URLs
    images: [],         // filled by image pipeline
  };
});

// Contracts sharing a projectCode get -02/-03 suffixed ids (e.g. BY2R20 ×3)
const seen = {};
for (const p of projects) {
  seen[p.id] = (seen[p.id] ?? 0) + 1;
  if (seen[p.id] > 1) p.id = `${p.id}-${String(seen[p.id]).padStart(2, "0")}`;
}

fs.writeFileSync(OUT, JSON.stringify(projects, null, 2));
console.log(`Wrote ${projects.length} projects → ${OUT}`);
const byTrade = {};
projects.forEach((p) => (byTrade[p.trade] = (byTrade[p.trade] ?? 0) + 1));
console.table(byTrade);
