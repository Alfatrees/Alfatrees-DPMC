"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DTIProject } from "./portfolio-types";
import { TRADE_COLORS, CM_ROLE } from "./portfolio-types";

interface ProjectDetailModalProps {
  project: DTIProject | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  // Lock scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const borderColor = project ? TRADE_COLORS[project.trade] || "#B8922E" : "#B8922E";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mx-4 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border bg-bg-card shadow-2xl"
            style={{ borderColor }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-bg-secondary">
              <img
                src={project.thumbnail}
                alt={project.facilityName || project.projectCode}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: borderColor }}
                >
                  {project.trade}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {project.facilityName || `Project ${project.projectCode}`}
                </h2>
                <p className="mt-1 text-xs text-gray-300">
                  {project.projectCode} · Contract {project.contractNumber}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Gallery — renders when project has images */}
            {project.images.length > 0 && (
              <div className="border-b border-border-default px-6 py-4 sm:px-8">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {project.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${project.facilityName || project.projectCode} - ${i + 1}`}
                      className="h-16 w-24 shrink-0 rounded-lg border border-border-default object-cover transition-opacity hover:opacity-80"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="space-y-6 p-6 sm:p-8">
              {/* Meta row */}
              <div className="flex flex-wrap gap-3">
                <MetaBadge label="Region" value={project.region || "New Brunswick"} />
                <MetaBadge label="Contractor" value={project.contractor} />
                <MetaBadge label="Tender" value={project.tenderType} />
                <MetaBadge label="Fiscal Year" value={`FY${project.fiscalYear}`} />
                <MetaBadge label="Status" value={project.status} />
              </div>

              {/* Overview */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                  Project Overview
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {project.scope || "Scope details being compiled from project records."}
                </p>
              </div>

              {/* Highlights */}
              {project.highlights.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                    Highlights
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="mt-0.5 shrink-0" style={{ color: borderColor }}>·</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Role + Timeline grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                    Role — Construction Manager
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {CM_ROLE.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" style={{ color: borderColor }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
                    Timeline
                  </h3>
                  <dl className="mt-2 space-y-1.5 text-sm">
                    {([
                      ["Tender issued", project.dates.tenderIssued],
                      ["Awarded", project.dates.awarded],
                      ["Startup", project.dates.startup],
                      ["Substantial", project.dates.substantial],
                      ["Final", project.dates.final],
                    ] as const).map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4">
                        <dt className="text-text-secondary">{label}</dt>
                        <dd className="font-semibold text-heading">{value || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MetaBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border-default bg-bg-secondary px-3 py-1.5">
      <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
        {label}
      </span>
      <div className="text-sm font-semibold text-heading">{value}</div>
    </div>
  );
}
