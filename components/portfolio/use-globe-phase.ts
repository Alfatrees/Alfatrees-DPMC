"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Discrete phase machine for the globe:
 *   0 Overview (outside) → 1 Inside shell → 2 Center (pan mode)
 * One wheel gesture / swipe / arrow key = one step. Forward input at phase 2
 * is inert; backward input steps out. Escape jumps to 0.
 * The page must not scroll while this hook is enabled.
 */
export function useGlobePhase(enabled: boolean) {
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);
  const lockUntil = useRef(0);
  const acc = useRef(0);
  const touchY = useRef<number | null>(null);

  const step = useCallback((dir: 1 | -1) => {
    const now = performance.now();
    if (now < lockUntil.current) return;
    const next = Math.min(2, Math.max(0, phaseRef.current + dir));
    if (next === phaseRef.current) {
      acc.current = 0; // clamped no-op: drop accumulated delta so it can't strand a reverse gesture past the threshold
      return;
    }
    phaseRef.current = next;
    lockUntil.current = now + 800; // cooldown ≈ camera settle time
    acc.current = 0;
    setPhase(next);
  }, []);

  const goTo = useCallback((p: 0 | 1 | 2) => {
    phaseRef.current = p;
    lockUntil.current = performance.now() + 800;
    setPhase(p);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    // fresh gesture state on (re-)enable — stale acc/touchY from before a
    // disable (modal/table view) must not leak into the next gesture
    acc.current = 0;
    touchY.current = null;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // page has no scroll in globe view
      if (performance.now() < lockUntil.current) return;
      acc.current += e.deltaY;
      if (acc.current > 60) step(1);
      else if (acc.current < -60) step(-1);
    };
    const onTouchStart = (e: TouchEvent) => { touchY.current = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY.current === null) return;
      const dy = touchY.current - e.changedTouches[0].clientY;
      touchY.current = null;
      // a drag-to-pan gesture on the canvas must not also step phases —
      // the globe scene sets this flag while (and briefly after) dragging
      if (document.body.dataset.globeDragging === "1") return;
      if (dy > 60) step(1);
      else if (dy < -60) step(-1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); step(-1); }
      else if (e.key === "Escape") goTo(0);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled, step, goTo]);

  return { phase, goTo };
}
