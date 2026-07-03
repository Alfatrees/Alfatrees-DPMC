"use client";

import { useEffect } from "react";
import { useProgress } from "@react-three/drei";

interface GlobeLoadingReporterProps {
  onProgress: (progress: number) => void;
}

/**
 * Reports drei's global texture-loading progress up to the page.
 * Lives behind the same dynamic() boundary as the globe so that
 * @react-three/drei (and three's loader core) never enter the
 * page's initial JS — table-only users pay nothing for it.
 * Renders nothing itself; the page owns the loading overlay UI.
 */
export function GlobeLoadingReporter({ onProgress }: GlobeLoadingReporterProps) {
  const { progress } = useProgress();
  useEffect(() => {
    onProgress(progress);
  }, [progress, onProgress]);
  return null;
}
