// Run with: node --experimental-strip-types scripts/test-globe-grid.mjs  (Node ≥22.6)
import assert from "node:assert";
import { gridSlots, GRID } from "../components/portfolio/globe-grid.ts";

const slots = gridSlots(50);
assert.equal(slots.length, 50, "50 slots");
// no NaN
for (const s of slots) for (const v of [s.x, s.y, s.z]) assert.ok(Number.isFinite(v));
// all on the sphere
for (const s of slots)
  assert.ok(Math.abs(Math.hypot(s.x, s.y, s.z) - GRID.radius) < 1e-9, "on sphere");
// rows level: 10 consecutive slots share y
for (let r = 0; r < 5; r++) {
  const ys = slots.slice(r * 10, r * 10 + 10).map((s) => s.y);
  assert.ok(Math.max(...ys) - Math.min(...ys) < 1e-9, `row ${r} level`);
}
// columns aligned: slot i and i+10 share longitude
const lon = (s) => Math.atan2(s.z, s.x);
for (let i = 0; i < 40; i++)
  assert.ok(Math.abs(lon(slots[i]) - lon(slots[i + 10])) < 1e-9, "columns aligned");
// cards don't overlap on the tightest ring (±52°): slot arc > card width
const tightSlot = (2 * Math.PI * GRID.radius * Math.cos((52 * Math.PI) / 180)) / GRID.cols;
assert.ok(tightSlot > GRID.cardW, "no overlap at ±52°");
console.log("globe-grid: all assertions passed");
