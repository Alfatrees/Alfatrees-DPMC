"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { PORTFOLIO_PROJECTS } from "@/components/portfolio/portfolio-data";
import { ProjectDetailModal } from "@/components/portfolio/project-detail-modal";
import { MobileGrid } from "@/components/portfolio/mobile-grid";
import type { PortfolioProject } from "@/components/portfolio/portfolio-data";

const GlobeScene = dynamic(
  () => import("@/components/portfolio/globe-scene").then((m) => ({ default: m.GlobeScene })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center" style={{ background: "#07090E" }}>
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-[#B8922E]/20 border-t-[#B8922E]" />
          <p className="mt-4 text-sm text-gray-500">Loading 3D experience...</p>
        </div>
      </div>
    ),
  }
);

function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setSupported(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const webGL = useWebGLSupport();
  const [isMobile, setIsMobile] = useState(false);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll progress: 0 at top of container, 1 at bottom
  useEffect(() => {
    if (isMobile || !webGL) return;

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / total);
      scrollProgressRef.current = progress;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, webGL]);

  // Block forward scroll when inside sphere (scrollProgress >= 0.5)
  // Only allow reverse (scroll up) to exit the sphere
  useEffect(() => {
    if (isMobile || !webGL) return;

    const onWheel = (e: WheelEvent) => {
      // If inside sphere and scrolling forward (down), block it
      if (scrollProgressRef.current >= 0.48 && e.deltaY > 0) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isMobile, webGL]);

  const use3D = webGL && !isMobile;

  return (
    <>
      <Navbar />

      {use3D ? (
        // Full-page 3D globe — dark background covers everything
        <div
          ref={containerRef}
          className="relative"
          style={{ height: "350vh", background: "#07090E" }}
        >
          {/* Sticky canvas fills viewport below navbar */}
          <div className="sticky top-[64px]" style={{ height: "calc(100vh - 64px)" }}>
            <GlobeScene
              projects={PORTFOLIO_PROJECTS}
              onSelectProject={setSelectedProject}
              selectedProject={selectedProject}
              scrollProgress={scrollProgress}
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />

            {/* Hero text overlay — fades out as globe fades in */}
            {scrollProgress < 0.2 && (
              <div
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
                style={{ opacity: scrollProgress < 0.05 ? 1 : Math.max(0, 1 - (scrollProgress - 0.05) / 0.12) }}
              >
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  Our Work
                </h1>
                <p className="mt-3 max-w-lg text-center text-sm leading-relaxed text-gray-400">
                  Estimation, scheduling, and project controls across commercial, healthcare, residential, and institutional projects.
                </p>
              </div>
            )}

            {/* Scroll hint — only at very start */}
            {scrollProgress < 0.08 && (
              <div className="pointer-events-none absolute inset-x-0 bottom-10 flex animate-bounce justify-center">
                <div className="text-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mx-auto text-gray-500">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  <p className="mt-1 text-[11px] text-gray-500">Scroll to explore</p>
                </div>
              </div>
            )}

            {/* Phase dots */}
            <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
              {[
                { label: "Discover", t: 0 },
                { label: "Enter", t: 0.25 },
                { label: "Explore", t: 0.5 },
              ].map(({ label, t }) => (
                <div key={label} className="mb-3 flex items-center justify-end gap-2">
                  <span className={`text-[10px] font-medium tracking-wider transition-all duration-700 ${scrollProgress >= t ? "text-[#D4A853]" : "text-gray-700"}`}>
                    {label}
                  </span>
                  <div className={`h-1.5 w-1.5 rounded-full transition-all duration-700 ${scrollProgress >= t ? "bg-[#D4A853] shadow-[0_0_8px_#D4A853]" : "bg-gray-800"}`} />
                </div>
              ))}
            </div>

            {/* Drag hint in browse phase */}
            {scrollProgress > 0.55 && scrollProgress < 0.7 && !selectedProject && (
              <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
                <div className="rounded-full bg-black/70 px-4 py-2 text-[11px] text-gray-400">
                  Drag to explore &middot; Click to view &middot; Scroll up to exit
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        // Mobile 2D fallback
        <main className="min-h-screen bg-bg-primary pt-16">
          <section className="py-12">
            <div className="mx-auto max-w-[1280px] px-6">
              <h1 className="text-center text-2xl font-bold text-heading">Our Work</h1>
              <p className="mx-auto mt-3 max-w-xl text-center text-sm text-text-secondary">
                Estimation, scheduling, and project controls across commercial, healthcare, residential, and institutional projects.
              </p>
              <div className="mt-10">
                <MobileGrid projects={PORTFOLIO_PROJECTS} onSelectProject={setSelectedProject} />
              </div>
            </div>
          </section>
        </main>
      )}

      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
