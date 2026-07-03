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
  // wheel disarm state: after a step fires, the trackpad momentum tail keeps
  // emitting same-sign deltas past the 800ms lock; stay disarmed until an
  // idle gap (>150ms between wheel events) or a direction change
  const armed = useRef(true);
  const lastWheelTs = useRef(0);
  const lastSign = useRef(0);

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
    armed.current = false; // disarm so the momentum tail can't fire a second step
    setPhase(next);
  }, []);

  const goTo = useCallback((p: 0 | 1 | 2) => {
    phaseRef.current = p;
    lockUntil.current = performance.now() + 800;
    acc.current = 0; // don't carry a partial gesture across a jump
    setPhase(p);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    // fresh gesture state on (re-)enable — stale acc/touchY/wheel-disarm state
    // from before a disable (modal/table view) must not leak into the next gesture
    acc.current = 0;
    touchY.current = null;
    armed.current = true;
    lastWheelTs.current = 0;
    lastSign.current = 0;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // page has no scroll in globe view
      const now = performance.now();
      const idle = now - lastWheelTs.current > 150;
      lastWheelTs.current = now;
      if (now < lockUntil.current) return;
      // normalize deltaMode: Firefox reports lines (1) or pages (2), not pixels
      const dy =
        e.deltaMode === 1 ? e.deltaY * 16 :
        e.deltaMode === 2 ? e.deltaY * window.innerHeight :
        e.deltaY;
      const sign = Math.sign(dy);
      if (!armed.current) {
        // still riding the momentum tail of the last step: re-arm only on an
        // idle gap or a direction change, otherwise swallow the event
        if (idle || (sign !== 0 && sign !== lastSign.current)) armed.current = true;
        else { if (sign !== 0) lastSign.current = sign; return; }
      }
      if (sign !== 0) lastSign.current = sign;
      if (idle) acc.current = 0; // stale partial gesture, start fresh
      acc.current += dy;
      if (acc.current > 60) step(1);
      else if (acc.current < -60) step(-1);
    };
    const onTouchStart = (e: TouchEvent) => {
      // multi-touch (pinch-zoom) is never a swipe
      touchY.current = e.touches.length === 1 ? e.touches[0].clientY : null;
    };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); };
    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length > 0) { touchY.current = null; return; } // fingers remain
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
