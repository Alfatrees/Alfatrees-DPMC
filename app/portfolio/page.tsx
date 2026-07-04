"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { DTI_PROJECTS } from "@/components/portfolio/dti-projects";
import { PORTFOLIO_STATS } from "@/components/portfolio/portfolio-types";
import type { DTIProject } from "@/components/portfolio/portfolio-types";
import { ProjectDetailModal } from "@/components/portfolio/project-detail-modal";
import { ProjectTable } from "@/components/portfolio/project-table";
import { ViewToggle } from "@/components/portfolio/view-toggle";
import { useGlobePhase } from "@/components/portfolio/use-globe-phase";

const GlobeScene = dynamic(
  () => import("@/components/portfolio/globe-scene").then((m) => ({ default: m.GlobeScene })),
  { ssr: false }
);

// useProgress pulls drei/three loader core — keep it out of the page's
// initial JS by loading it lazily alongside the globe (table-only users
// never fetch it)
const GlobeLoadingReporter = dynamic(
  () => import("@/components/portfolio/globe-loading").then((m) => ({ default: m.GlobeLoadingReporter })),
  { ssr: false }
);

const PHASE_HINTS = [
  "Scroll to step inside",
  "Scroll again to reach the center",
  "Drag to pan · Click a project · Scroll up to exit",
];

// ---------------------------------------------------------------------------
// Globe capability store (useSyncExternalStore — SSR/hydration safe, no
// setState-in-effect; server snapshot is always null).
//
// WebGL support is deterministic for the session and context creation is
// costly, so it is probed ONCE and cached (lazily, on first real read).
//
// Viewport width and prefers-reduced-motion must be LIVE, never frozen:
// when a tab is background-loaded or prerendered (Chrome speculation rules,
// middle-click "open in new tab"), window.innerWidth is 0 at first render.
// A one-shot cache computed at that moment reads 0 < 768 → "small screen" →
// capable=false forever, permanently locking desktop users to the table view
// with the Globe toggle disabled. So:
//   - innerWidth === 0 → snapshot is null ("unknown"): the UI stays in its
//     pending state (globe shell + loading overlay) instead of caching false
//   - subscribe() attaches matchMedia change / resize / visibilitychange
//     listeners that recompute the snapshot and notify React once the tab
//     becomes visible and a real measurement exists
// Do NOT "simplify" this back to a compute-once cache.
// ---------------------------------------------------------------------------

let webglCache: boolean | null = null;
function webglOK(): boolean {
  if (webglCache === null) {
    try {
      const c = document.createElement("canvas");
      webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

// getSnapshot must return a value that is stable BETWEEN notifications, so
// recompute() writes into this module-level variable and is only called from
// the first snapshot read and from subscribe()'s listeners (before cb()).
let capableSnapshot: boolean | null = null;
let capableInitialized = false;

function recomputeCapable(): void {
  if (window.innerWidth === 0) {
    // unmeasurable viewport (prerender / background-loaded tab) — unknown
    capableSnapshot = null;
    return;
  }
  const small = window.matchMedia("(max-width: 767px)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  capableSnapshot = webglOK() && !small && !reduced;
}

function getCapableSnapshot(): boolean | null {
  if (!capableInitialized) {
    capableInitialized = true;
    recomputeCapable();
  }
  return capableSnapshot;
}

function subscribeCapable(cb: () => void): () => void {
  const mqSmall = window.matchMedia("(max-width: 767px)");
  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onChange = () => {
    recomputeCapable();
    cb();
  };
  mqSmall.addEventListener("change", onChange);
  mqReduced.addEventListener("change", onChange);
  window.addEventListener("resize", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    mqSmall.removeEventListener("change", onChange);
    mqReduced.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

function useGlobeCapable(): boolean | null {
  return useSyncExternalStore(subscribeCapable, getCapableSnapshot, () => null);
}

export default function PortfolioPage() {
  const capable = useGlobeCapable();
  const [viewChoice, setViewChoice] = useState<"globe" | "table">("globe");
  // derived, not synced: globe unavailable always falls back to table
  const view = capable === false ? "table" : viewChoice;
  const [selectedProject, setSelectedProject] = useState<DTIProject | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { phase, goTo } = useGlobePhase(view === "globe" && capable === true && !selectedProject);
  // fed by the lazy GlobeLoadingReporter so drei stays out of the initial chunk
  const [progress, setProgress] = useState(0);
  const loaded = progress >= 100;

  // no document scroll while the globe is active
  useEffect(() => {
    const globeActive = view === "globe" && capable === true;
    document.documentElement.style.overflow = globeActive ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [view, capable]);

  // returning to globe restarts the journey from Overview
  const handleViewChange = (v: "globe" | "table") => {
    setViewChoice(v);
    if (v === "globe") goTo(0);
  };

  return (
    <>
      <Navbar />

      {/* toggle — pinned under navbar, both views */}
      <div className="fixed right-5 top-[76px] z-40">
        <ViewToggle view={view} onChange={handleViewChange} globeAvailable={capable === true} />
      </div>

      {view === "globe" && capable !== false ? (
        <div className="fixed inset-0 top-[64px]" style={{ background: "#050810" }}>
          {/* canvas fades in as ONE unit once all textures are ready — no per-card pop-in */}
          <div
            className="h-full w-full transition-opacity duration-700 ease-out"
            style={{ opacity: loaded ? 1 : 0 }}
          >
            {capable && (
              <>
                <GlobeLoadingReporter onProgress={setProgress} />
                <GlobeScene
                  projects={DTI_PROJECTS}
                  phase={phase}
                  onSelectProject={setSelectedProject}
                  selectedProject={selectedProject}
                  hoveredId={hoveredId}
                  onHover={setHoveredId}
                />
              </>
            )}
          </div>

          {/* loading overlay */}
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{ opacity: loaded ? 0 : 1 }}
          >
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#D4A853]/20 border-t-[#D4A853]" />
              <p className="mt-4 text-xs tracking-widest text-gray-500">
                LOADING PORTFOLIO {Math.round(progress)}%
              </p>
            </div>
          </div>

          {/* stats strip — Overview only, fades with phase */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center transition-opacity duration-500"
            style={{ opacity: loaded && phase === 0 ? 1 : 0 }}
          >
            <p className="rounded-full bg-black/60 px-5 py-2 text-[11px] tracking-wide text-gray-300 backdrop-blur-sm">
              <span className="font-semibold text-[#D4A853]">{PORTFOLIO_STATS.contracts} contracts</span>
              {" · "}{PORTFOLIO_STATS.contractors} contractors · {PORTFOLIO_STATS.sites} sites
              {" · "}{PORTFOLIO_STATS.client} · {PORTFOLIO_STATS.period}
            </p>
          </div>

          {/* phase hint — always mounted, crossfades */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center transition-opacity duration-500"
            style={{ opacity: loaded && !selectedProject ? 1 : 0 }}
            aria-live="polite"
          >
            <p key={phase} className="text-[11px] text-gray-500">{PHASE_HINTS[phase]}</p>
          </div>

          {/* phase dots */}
          <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
            {["Overview", "Inside", "Explore"].map((label, i) => (
              <div key={label} className="mb-3 flex items-center justify-end gap-2">
                <span className={`text-[10px] font-medium tracking-wider transition-colors duration-500 ${phase >= i ? "text-[#D4A853]" : "text-gray-700"}`}>
                  {label}
                </span>
                <div className={`h-1.5 w-1.5 rounded-full transition-all duration-500 ${phase >= i ? "bg-[#D4A853] shadow-[0_0_8px_#D4A853]" : "bg-gray-800"}`} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main className="min-h-screen bg-bg-primary pt-[64px]">
          <ProjectTable projects={DTI_PROJECTS} onSelectProject={setSelectedProject} />
        </main>
      )}

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
