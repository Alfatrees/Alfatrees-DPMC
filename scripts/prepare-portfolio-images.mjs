// Converts DPMC originals/web images → public/portfolio/{id}/N.webp (640px wide, q80)
// and regenerates IMAGES-NEEDED.md. Requires sharp (already a Next.js dependency).
// Usage: node scripts/prepare-portfolio-images.mjs
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DPMC =
  "C:/Users/arpra/claude-api-project/Apps/Alfatrees Design & Construction Project Management Consultancy/Alfatrees DPMC (Design & Project Management Consultancy)/portfolio-projects";
const MASTER = JSON.parse(fs.readFileSync(path.join(DPMC, "projects-master.json"), "utf8"));
const PUB = path.resolve("public/portfolio");

const missing = [];
for (const p of MASTER) {
  const srcDirs = [path.join(DPMC, "images/originals", p.id), path.join(DPMC, "images/web", p.id)];
  const srcs = srcDirs.flatMap((d) =>
    fs.existsSync(d) ? fs.readdirSync(d).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).map((f) => path.join(d, f)) : []
  );
  if (srcs.length === 0) { p.images = []; missing.push(p); continue; }
  const outDir = path.join(PUB, p.id);
  fs.mkdirSync(outDir, { recursive: true });
  let n = 1;
  for (const src of srcs) {
    await sharp(src).resize({ width: 640 }).webp({ quality: 80 }).toFile(path.join(outDir, `${n}.webp`));
    n++;
  }
  p.images = Array.from({ length: n - 1 }, (_, i) => `/portfolio/${p.id}/${i + 1}.webp`);
  console.log(`${p.id}: ${n - 1} image(s)`);
}
fs.writeFileSync(path.join(DPMC, "projects-master.json"), JSON.stringify(MASTER, null, 2));

// ── Tracker ──
const rows = missing
  .map((p) => `| ${p.projectCode} | ${p.trade} | ${p.contractor} | ${p.status} | ${p.status === "Completed" ? "**P1**" : "P2"} |`)
  .join("\n");
fs.writeFileSync(
  path.join(DPMC, "IMAGES-NEEDED.md"),
  `# Photos needed from Prakash's work phone\n\nDrop photos into \`images/originals/{id}/\` (id = lowercase project code, e.g. \`bw5219\`), then re-run \`node scripts/prepare-portfolio-images.mjs\`.\n\nBest photos: finished result, work-in-progress, and one wide exterior. 2–4 per project. Any resolution.\n\n| Project | Trade | Contractor | Status | Priority |\n|---|---|---|---|---|\n${rows}\n\n${missing.length} project(s) still using stock placeholders.`
);
console.log(`Missing images: ${missing.length} → IMAGES-NEEDED.md`);
