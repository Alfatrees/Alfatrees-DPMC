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
// rows sit at the exact latitudes declared in GRID.rowsDeg
for (let r = 0; r < GRID.rowsDeg.length; r++)
  assert.ok(
    Math.abs(slots[r * 10].y - GRID.radius * Math.sin((GRID.rowsDeg[r] * Math.PI) / 180)) < 1e-9,
    `row ${r} latitude`
  );
// columns aligned: slot i and i+10 share longitude
const lon = (s) => Math.atan2(s.z, s.x);
for (let i = 0; i < 40; i++)
  assert.ok(Math.abs(lon(slots[i]) - lon(slots[i + 10])) < 1e-9, "columns aligned");
// adjacent columns in row 0 are exactly 2π/cols apart (measured from output, not the formula)
for (let c = 0; c < GRID.cols - 1; c++) {
  let d = lon(slots[c + 1]) - lon(slots[c]);
  d = ((d % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI); // normalize to [0, 2π)
  assert.ok(
    Math.abs(Math.min(d, 2 * Math.PI - d) - (2 * Math.PI) / GRID.cols) < 1e-9,
    `col spacing ${c}`
  );
}
// cards don't overlap on the tightest ring: slot arc > card width
const maxLat = Math.max(...GRID.rowsDeg.map(Math.abs));
const tightSlot = (2 * Math.PI * GRID.radius * Math.cos((maxLat * Math.PI) / 180)) / GRID.cols;
assert.ok(tightSlot > GRID.cardW, `no overlap at ±${maxLat}°`);
console.log("globe-grid: all assertions passed");
