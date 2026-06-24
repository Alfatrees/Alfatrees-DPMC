"use client";

import { FadeIn } from "@/components/ui/motion";
import type { PortfolioProject } from "./portfolio-data";
import { CATEGORY_COLORS } from "./portfolio-data";

interface MobileGridProps {
  projects: PortfolioProject[];
  onSelectProject: (project: PortfolioProject) => void;
}

export function MobileGrid({ projects, onSelectProject }: MobileGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => {
        const borderColor = CATEGORY_COLORS[project.category] || "#B8922E";
        return (
          <FadeIn key={project.id} delay={i * 0.05}>
            <button
              onClick={() => onSelectProject(project)}
              className="group w-full overflow-hidden rounded-xl border border-border-default bg-bg-card text-left transition-all hover:shadow-lg"
              style={{ borderColor: "transparent" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = borderColor)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "transparent")
              }
            >
              <div className="relative aspect-video overflow-hidden bg-bg-secondary">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span
                  className="absolute bottom-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold text-white"
                  style={{ backgroundColor: borderColor }}
                >
                  {project.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-heading">{project.title}</h3>
                <p className="mt-1 text-xs text-text-muted">
                  {project.location} {project.year ? `· ${project.year}` : ""}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.servicesProvided.slice(0, 3).map((code) => (
                    <span
                      key={code}
                      className="rounded px-1.5 py-0.5 text-[10px] font-bold"
                      style={{
                        backgroundColor: `${borderColor}15`,
                        color: borderColor,
                      }}
                    >
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </FadeIn>
        );
      })}
    </div>
  );
}
