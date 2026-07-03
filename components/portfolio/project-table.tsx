"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { DTIProject, Trade } from "./portfolio-types";
import { TRADE_COLORS, PORTFOLIO_STATS, fmtDate } from "./portfolio-types";

type SortKey = "projectCode" | "trade" | "contractor" | "awarded" | "substantial" | "status";

interface ProjectTableProps {
  projects: DTIProject[];
  onSelectProject: (p: DTIProject) => void;
}

export function ProjectTable({ projects, onSelectProject }: ProjectTableProps) {
  const [q, setQ] = useState("");
  const [fy, setFy] = useState<number | "all">("all");
  const [trade, setTrade] = useState<Trade | "all">("all");
  const [status, setStatus] = useState<"all" | "Completed" | "Active">("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "awarded", dir: -1 });
  const [open, setOpen] = useState<string | null>(null);

  const years = useMemo(() => [...new Set(projects.map((p) => p.fiscalYear))].sort(), [projects]);
  const trades = useMemo(() => [...new Set(projects.map((p) => p.trade))].sort(), [projects]);

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = projects.filter(
      (p) =>
        (fy === "all" || p.fiscalYear === fy) &&
        (trade === "all" || p.trade === trade) &&
        (status === "all" || p.status === status) &&
        (!needle ||
          [p.projectCode, p.facilityName, p.contractor, p.contractNumber, p.region]
            .join(" ").toLowerCase().includes(needle))
    );
    const val = (p: DTIProject): string => {
      switch (sort.key) {
        case "awarded": return p.dates.awarded || "";
        // data emits "" (not undefined) for missing dates — || so active
        // contracts sort last ascending instead of first
        case "substantial": return p.dates.substantial || "9999";
        default: return String(p[sort.key] ?? "");
      }
    };
    return [...filtered].sort((a, b) => val(a).localeCompare(val(b)) * sort.dir);
  }, [projects, q, fy, trade, status, sort]);

  const header = (key: SortKey, label: string) => (
    <th
      scope="col"
      className="whitespace-nowrap px-4 py-3 text-left"
      aria-sort={sort.key === key ? (sort.dir === 1 ? "ascending" : "descending") : "none"}
    >
      <button
        type="button"
        onClick={() => setSort((s) => ({ key, dir: s.key === key ? ((-s.dir) as 1 | -1) : 1 }))}
        className="w-full cursor-pointer select-none text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted hover:text-heading"
      >
        {label} {sort.key === key ? (sort.dir === 1 ? "↑" : "↓") : ""}
      </button>
    </th>
  );

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6">
      {/* header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading sm:text-3xl">Project Register</h1>
        <p className="mt-2 max-w-2xl text-sm text-text-secondary">
          {PORTFOLIO_STATS.contracts} construction contracts managed as Construction Manager for the{" "}
          {PORTFOLIO_STATS.client}, {PORTFOLIO_STATS.period} — {PORTFOLIO_STATS.contractors} contractors
          across {PORTFOLIO_STATS.sites} sites.
        </p>
      </div>

      {/* filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search project, contractor…"
          aria-label="Search projects"
          className="h-9 w-56 rounded-lg border border-border-default bg-bg-card px-3 text-sm text-heading placeholder:text-text-muted focus:border-[#B8922E] focus:outline-none"
        />
        <select aria-label="Fiscal year" value={fy} onChange={(e) => setFy(e.target.value === "all" ? "all" : Number(e.target.value))}
          className="h-9 rounded-lg border border-border-default bg-bg-card px-2 text-sm text-heading">
          <option value="all">All years</option>
          {years.map((y) => <option key={y} value={y}>FY{y}</option>)}
        </select>
        <select aria-label="Trade" value={trade} onChange={(e) => setTrade(e.target.value as Trade | "all")}
          className="h-9 rounded-lg border border-border-default bg-bg-card px-2 text-sm text-heading">
          <option value="all">All trades</option>
          {trades.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}
          className="h-9 rounded-lg border border-border-default bg-bg-card px-2 text-sm text-heading">
          <option value="all">All statuses</option>
          <option value="Completed">Completed</option>
          <option value="Active">Active</option>
        </select>
        <span className="ml-auto text-xs text-text-muted">{rows.length} of {projects.length} contracts</span>
      </div>

      {/* table (md+) */}
      <div className="hidden overflow-x-auto rounded-xl border border-border-default md:block">
        <table className="w-full border-collapse bg-bg-card text-sm">
          <thead className="border-b border-border-default bg-bg-secondary">
            <tr>
              <th scope="col" className="w-20 px-4 py-3" aria-label="Photo" />
              {header("projectCode", "Project")}
              {header("trade", "Trade")}
              {header("contractor", "Contractor")}
              {header("awarded", "Awarded")}
              {header("substantial", "Completed")}
              {header("status", "Status")}
              <th scope="col" className="w-10 px-2 py-3" aria-label="Expand" />
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <RowPair key={p.id} p={p} open={open === p.id}
                onToggle={() => setOpen(open === p.id ? null : p.id)}
                onDetails={() => onSelectProject(p)} />
            ))}
          </tbody>
        </table>
      </div>

      {/* card list (mobile) */}
      <div className="space-y-3 md:hidden">
        {rows.map((p) => (
          <button key={p.id} onClick={() => onSelectProject(p)}
            className="flex w-full items-center gap-3 rounded-xl border border-border-default bg-bg-card p-3 text-left">
            <Image src={p.thumbnail} alt={p.facilityName || p.projectCode} width={64} height={43}
              className="h-11 w-16 shrink-0 rounded-md object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-heading">
                {p.projectCode}{p.facilityName ? ` — ${p.facilityName}` : ""}
              </span>
              <span className="block truncate text-xs text-text-muted">
                {p.trade} · {p.contractor}
              </span>
            </span>
            <StatusBadge status={p.status} />
          </button>
        ))}
      </div>
    </section>
  );
}

function RowPair({ p, open, onToggle, onDetails }: {
  p: DTIProject; open: boolean; onToggle: () => void; onDetails: () => void;
}) {
  const color = TRADE_COLORS[p.trade];
  return (
    <>
      <tr className="cursor-pointer border-b border-border-default/60 transition-colors hover:bg-bg-secondary/50" onClick={onToggle}>
        <td className="px-4 py-2.5">
          <Image src={p.thumbnail} alt={p.facilityName || p.projectCode} width={64} height={43}
            className="h-10 w-16 rounded-md object-cover" />
        </td>
        <td className="px-4 py-2.5">
          <div className="font-semibold text-heading">{p.projectCode}</div>
          {p.facilityName && <div className="max-w-[220px] truncate text-xs text-text-muted">{p.facilityName}</div>}
        </td>
        <td className="whitespace-nowrap px-4 py-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color }}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            {p.trade}
          </span>
        </td>
        <td className="max-w-[200px] truncate px-4 py-2.5 text-text-secondary">{p.contractor}</td>
        <td className="whitespace-nowrap px-4 py-2.5 text-text-secondary">{fmtDate(p.dates.awarded)}</td>
        <td className="whitespace-nowrap px-4 py-2.5 text-text-secondary">{fmtDate(p.dates.substantial)}</td>
        <td className="px-4 py-2.5"><StatusBadge status={p.status} /></td>
        <td className="px-2 py-2.5">
          <button
            type="button"
            aria-expanded={open}
            aria-label={`Expand ${p.projectCode}`}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            className="cursor-pointer text-text-muted hover:text-heading"
          >
            {open ? "▾" : "▸"}
          </button>
        </td>
      </tr>
      {open && (
        <tr className="border-b border-border-default/60 bg-bg-secondary/30">
          <td colSpan={8} className="px-6 py-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Scope</h4>
                <p className="mt-1 text-sm text-text-secondary">{p.scope || "Scope details being compiled from project records."}</p>
                {p.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {p.highlights.map((h) => (
                      <li key={h} className="text-xs text-text-secondary">· {h}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">Timeline</h4>
                <dl className="mt-1 space-y-0.5 text-xs text-text-secondary">
                  {([["Tender issued", p.dates.tenderIssued], ["Awarded", p.dates.awarded],
                     ["Startup", p.dates.startup], ["Substantial", p.dates.substantial],
                     ["Final", p.dates.final]] as const).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt>{k}</dt><dd className="font-medium text-heading">{fmtDate(v)}</dd>
                    </div>
                  ))}
                </dl>
                <button onClick={(e) => { e.stopPropagation(); onDetails(); }}
                  className="mt-3 text-xs font-semibold text-[#B8922E] hover:underline">
                  Full details →
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function StatusBadge({ status }: { status: "Completed" | "Active" }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
      status === "Completed"
        ? "bg-emerald-500/15 text-emerald-500"
        : "bg-[#B8922E]/15 text-[#B8922E]"
    }`}>
      {status}
    </span>
  );
}
