// Lat/long grid slot math — pure, no three.js dependency (unit-testable in node).
// 5 latitude rings × 10 longitude columns = 50 slots. Vertical columns share
// longitude (converge toward the poles — rings at higher |latitude| are smaller); rings are level. The grid is never rendered —
// it exists only to place cards in alignment.

export const GRID = {
  radius: 2.2,
  rowsDeg: [-52, -26, 0, 26, 52],
  cols: 10,
  cardW: 0.8,
  cardH: 0.533, // 3:2 photo aspect
} as const;

export interface GridSlot {
  x: number; y: number; z: number;
  row: number; col: number;
}

export function gridSlots(count: number): GridSlot[] {
  const out: GridSlot[] = [];
  for (let r = 0; r < GRID.rowsDeg.length; r++) {
    const lat = (GRID.rowsDeg[r] * Math.PI) / 180;
    for (let c = 0; c < GRID.cols; c++) {
      const lonAngle = (c / GRID.cols) * Math.PI * 2;
      out.push({
        x: GRID.radius * Math.cos(lat) * Math.cos(lonAngle),
        y: GRID.radius * Math.sin(lat),
        z: GRID.radius * Math.cos(lat) * Math.sin(lonAngle),
        row: r,
        col: c,
      });
    }
  }
  return out.slice(0, count);
}
