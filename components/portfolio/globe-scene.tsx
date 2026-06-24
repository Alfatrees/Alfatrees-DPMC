"use client";

import { useRef, useMemo, Suspense, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { PortfolioProject } from "./portfolio-data";
import { CATEGORY_COLORS } from "./portfolio-data";

/* ═══════════════════════════════════════════════
   PUBLIC API
   ═══════════════════════════════════════════════ */

interface GlobeSceneProps {
  projects: PortfolioProject[];
  onSelectProject: (p: PortfolioProject | null) => void;
  selectedProject: PortfolioProject | null;
  scrollProgress: number;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

export function GlobeScene(props: GlobeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 100 }}
      style={{ width: "100%", height: "100%", background: "#050810" }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 1.5]}
    >
      <color attach="background" args={["#050810"]} />
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}

/* ═══════════════════════════════════════════════
   FIBONACCI SPHERE — evenly distribute N points
   ═══════════════════════════════════════════════ */

function fibSphere(n: number, r: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const ry = Math.sqrt(1 - y * y);
    const th = golden * i;
    pts.push(new THREE.Vector3(Math.cos(th) * ry * r, y * r, Math.sin(th) * ry * r));
  }
  return pts;
}

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/* ═══════════════════════════════════════════════
   MAIN 3D SCENE
   ═══════════════════════════════════════════════ */

function Scene({
  projects,
  onSelectProject,
  selectedProject,
  scrollProgress,
  hoveredId,
  onHover,
}: GlobeSceneProps) {
  const globe = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  // Rotation state — both axes
  const rotY = useRef(0);
  const rotX = useRef(0);
  const curY = useRef(0);
  const curX = useRef(0);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  // Inertia velocity tracking
  const velY = useRef(0);
  const velX = useRef(0);
  const INERTIA_DECAY = 0.92;       // slower decay = longer coast
  const INERTIA_MIN = 0.00005;

  // ─── TUNING PARAMETERS ───
  const RADIUS = 2.2;               // fits fully centered in viewport
  const positions = useMemo(() => fibSphere(projects.length, RADIUS), [projects.length]);

  // Track browse phase for cursor changes
  const insideSphere = scrollProgress > 0.5;

  // Change cursor based on phase
  useEffect(() => {
    if (insideSphere && !hoveredId) {
      gl.domElement.style.cursor = dragging.current ? "grabbing" : "grab";
    } else if (hoveredId) {
      gl.domElement.style.cursor = "pointer";
    } else {
      gl.domElement.style.cursor = "default";
    }
  }, [insideSphere, hoveredId, gl.domElement.style]);

  // ── Native DOM pointer events for drag (works on empty space, not just meshes) ──
  const insideRef = useRef(false);
  insideRef.current = insideSphere;

  useEffect(() => {
    const canvas = gl.domElement;

    const handleDown = (e: PointerEvent) => {
      if (!insideRef.current) return;
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      velY.current = 0;
      velX.current = 0;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture(e.pointerId);
    };

    const handleMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = (e.clientX - last.current.x) * 0.003;
      const dy = (e.clientY - last.current.y) * 0.003;
      // Negate: inside the sphere, drag direction must match card movement
      rotY.current -= dx;
      rotX.current -= dy;
      rotX.current = Math.max(-1.2, Math.min(1.2, rotX.current));
      velY.current = -dx;
      velX.current = -dy;
      last.current = { x: e.clientX, y: e.clientY };
    };

    const handleUp = () => {
      dragging.current = false;
      if (insideRef.current) {
        canvas.style.cursor = "grab";
      }
    };

    canvas.addEventListener("pointerdown", handleDown);
    canvas.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerup", handleUp);
    canvas.addEventListener("pointerleave", handleUp);

    return () => {
      canvas.removeEventListener("pointerdown", handleDown);
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerup", handleUp);
      canvas.removeEventListener("pointerleave", handleUp);
    };
  }, [gl.domElement]);

  useFrame(() => {
    const cam = camera as THREE.PerspectiveCamera;

    /* ── Globe opacity driven by scroll (fade-in) ──
       0–0.08: globe invisible (hero text phase)
       0.08–0.2: fade in from 0 → 1
       0.2+: fully visible
    */
    let globeOpacity = 1;
    if (scrollProgress < 0.08) {
      globeOpacity = 0;
    } else if (scrollProgress < 0.2) {
      globeOpacity = smoothstep((scrollProgress - 0.08) / 0.12);
    }

    /* ── Camera zoom driven by scroll ──
       Phase 1 (0–0.12): Static far view          z: 6  (hero text visible)
       Phase 2 (0.12–0.5): Continuous zoom in     z: 6 → 0  (one smooth motion)
       Phase 3 (0.5–1.0): Inside, user pans       z: 0
    */
    let z: number;
    let fov: number;

    if (scrollProgress < 0.12) {
      z = 6;
      fov = 50;
    } else if (scrollProgress < 0.5) {
      const t = smoothstep((scrollProgress - 0.12) / 0.38);
      z = 6 * (1 - t);          // 6 → 0 in one continuous motion
      fov = 50 + t * 25;        // 50 → 75 (widen as we enter)
    } else {
      z = 0;
      fov = 75;
    }

    cam.position.set(0, 0, z);
    cam.fov += (fov - cam.fov) * 0.06;
    cam.updateProjectionMatrix();
    cam.lookAt(0, 0, 0);

    /* ── Globe rotation ──
       Outside (Phase 1-2): very gentle auto-rotate Y only
       Inside (Phase 3): user drag rotates both axes + inertia
    */
    if (!insideSphere && !dragging.current && !selectedProject) {
      rotY.current += 0.0008; // very gentle auto-rotate during approach
    }

    // Apply inertia when not dragging (inside sphere)
    if (insideSphere && !dragging.current) {
      rotY.current += velY.current;
      rotX.current += velX.current;
      // Clamp vertical
      rotX.current = Math.max(-1.2, Math.min(1.2, rotX.current));
      // Decay velocity
      velY.current *= INERTIA_DECAY;
      velX.current *= INERTIA_DECAY;
      if (Math.abs(velY.current) < INERTIA_MIN) velY.current = 0;
      if (Math.abs(velX.current) < INERTIA_MIN) velX.current = 0;
    }

    // Smooth interpolation (lower = smoother/slower response)
    curY.current += (rotY.current - curY.current) * 0.05;
    curX.current += (rotX.current - curX.current) * 0.05;

    if (globe.current) {
      globe.current.rotation.y = curY.current;
      globe.current.rotation.x = curX.current;
      globe.current.visible = globeOpacity > 0.01;
    }
  });

  return (
    <group>
      {/* Bright lighting for vivid image colors */}
      <ambientLight intensity={2.5} />
      <pointLight position={[10, 8, 10]} intensity={0.4} />
      <pointLight position={[-8, -5, -8]} intensity={0.2} />

      {/* The rotating globe */}
      <group ref={globe}>
        {projects.map((project, i) => (
          <Card
            key={project.id}
            project={project}
            index={i}
            pos={positions[i]}
            isHovered={hoveredId === project.id}
            dimmed={
              (!!selectedProject && selectedProject.id !== project.id) ||
              (!!hoveredId && hoveredId !== project.id)
            }
            onClick={() => onSelectProject(selectedProject?.id === project.id ? null : project)}
            onHoverIn={() => onHover(project.id)}
            onHoverOut={() => onHover(null)}
            scrollProgress={scrollProgress}
          />
        ))}
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════
   CARD — Image on sphere with thin category-colored border

   - Faces outward from sphere center
   - Thin category-colored border (not a backing panel)
   - Project number + name label at bottom INSIDE the card
   - DoubleSide — image visible from both sides
   - No opaque color backing — transparent from both sides
   ═══════════════════════════════════════════════ */

interface CardProps {
  project: PortfolioProject;
  index: number;
  pos: THREE.Vector3;
  isHovered: boolean;
  dimmed: boolean;
  onClick: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
  scrollProgress: number;
}

function Card({ project, index, pos, isHovered, dimmed, onClick, onHoverIn, onHoverOut, scrollProgress }: CardProps) {
  const group = useRef<THREE.Group>(null);
  const imgMesh = useRef<THREE.Mesh>(null);
  const curScale = useRef(1);
  const curOpacity = useRef(0);

  const texture = useLoader(THREE.TextureLoader, project.thumbnail);
  const categoryColor = CATEGORY_COLORS[project.category] || "#B8922E";

  // Card dimensions
  const IMG_W = 1.1;
  const IMG_H = 0.72;
  const BORDER_WIDTH = 0.04;

  // Pre-compute orientation: face outward from sphere center
  const quat = useMemo(() => {
    const outward = pos.clone().normalize();
    const worldUp = Math.abs(outward.y) > 0.95
      ? new THREE.Vector3(1, 0, 0)
      : new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(worldUp, outward).normalize();
    const up = new THREE.Vector3().crossVectors(outward, right).normalize();
    const m = new THREE.Matrix4().makeBasis(right, up, outward);
    return new THREE.Quaternion().setFromRotationMatrix(m);
  }, [pos]);

  // Create border geometry — 4 thin edge lines using planes
  const borderEdges = useMemo(() => {
    const hw = IMG_W / 2 + BORDER_WIDTH / 2;
    const hh = IMG_H / 2 + BORDER_WIDTH / 2;
    return [
      // Top edge
      { pos: [0, hh, -0.001] as [number, number, number], size: [IMG_W + BORDER_WIDTH * 2, BORDER_WIDTH] as [number, number] },
      // Bottom edge
      { pos: [0, -hh, -0.001] as [number, number, number], size: [IMG_W + BORDER_WIDTH * 2, BORDER_WIDTH] as [number, number] },
      // Left edge
      { pos: [-hw, 0, -0.001] as [number, number, number], size: [BORDER_WIDTH, IMG_H + BORDER_WIDTH * 2] as [number, number] },
      // Right edge
      { pos: [hw, 0, -0.001] as [number, number, number], size: [BORDER_WIDTH, IMG_H + BORDER_WIDTH * 2] as [number, number] },
    ];
  }, []);

  useFrame(() => {
    if (!group.current || !imgMesh.current) return;

    // Stable orientation
    group.current.quaternion.copy(quat);

    // Smooth scale on hover
    const ts = isHovered ? 1.08 : 1;
    curScale.current += (ts - curScale.current) * 0.1;
    group.current.scale.setScalar(curScale.current);

    // Globe fade-in opacity
    let globeOp = 1;
    if (scrollProgress < 0.08) {
      globeOp = 0;
    } else if (scrollProgress < 0.2) {
      globeOp = smoothstep((scrollProgress - 0.08) / 0.12);
    }

    // Smooth opacity for dimming, combined with globe fade
    const dimTarget = dimmed ? 0.8 : 1;
    curOpacity.current += (dimTarget * globeOp - curOpacity.current) * 0.08;
    (imgMesh.current.material as THREE.MeshBasicMaterial).opacity = curOpacity.current;
  });

  // Label text: "01 — Title"
  const label = `${String(index + 1).padStart(2, "0")} — ${project.title}`;

  // Create a canvas texture for the label (rotates with card, unlike Html)
  const labelTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = 512;
    canvas.height = 64;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "500 28px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#cccccc";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // Truncate if too long
    let text = label;
    while (ctx.measureText(text).width > 480 && text.length > 10) {
      text = text.slice(0, -4) + "...";
    }
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [label]);

  // Labels only visible when inside the sphere
  const labelsVisible = scrollProgress > 0.5;

  // Label plane dimensions (proportional to canvas aspect ratio)
  const LABEL_W = IMG_W * 0.9;
  const LABEL_H = LABEL_W * (64 / 512);

  return (
    <group ref={group} position={pos}>
      {/* ── IMAGE (DoubleSide — visible from both sides, opaque) ── */}
      <mesh
        ref={imgMesh}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); onHoverIn(); }}
        onPointerOut={() => { onHoverOut(); }}
      >
        <planeGeometry args={[IMG_W, IMG_H]} />
        <meshBasicMaterial map={texture} transparent depthWrite side={THREE.DoubleSide} />
      </mesh>

      {/* ── BORDER — 4 thin edges, category colored, DoubleSide ── */}
      {borderEdges.map((edge, i) => (
        <mesh key={i} position={edge.pos}>
          <planeGeometry args={edge.size} />
          <meshBasicMaterial color={categoryColor} transparent depthWrite side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* ── LABEL — 3D canvas texture, faces inward (readable from inside sphere) ── */}
      {labelsVisible && (
        <mesh position={[0, -(IMG_H / 2) - BORDER_WIDTH - LABEL_H / 2 - 0.02, -0.005]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[LABEL_W, LABEL_H]} />
          <meshBasicMaterial
            map={labelTexture}
            transparent
            depthWrite={false}
          />
        </mesh>
      )}

      {/* ── HOVER TOOLTIP (Html is fine here — tooltips should face camera) ── */}
      {isHovered && labelsVisible && (
        <Html position={[0, IMG_H / 2 + BORDER_WIDTH + 0.12, 0.05]} center distanceFactor={5} style={{ pointerEvents: "none" }}>
          <div style={{
            background: "rgba(5,8,16,0.95)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "13px",
            fontFamily: "Inter, system-ui, sans-serif",
            whiteSpace: "nowrap",
            borderBottom: `2px solid ${categoryColor}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}>
            <div style={{ fontWeight: 600 }}>{project.title}</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
              {project.category} &middot; {project.location}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
