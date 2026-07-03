"use client";

/* eslint-disable react-hooks/immutability, react-hooks/refs --
   react-three-fiber is an imperative escape hatch from React's render model:
   mutating the camera/textures/renderer inside useFrame/useEffect and keeping
   latest-value refs for the frame loop (setState in useFrame is forbidden —
   zero per-frame React state is a hard design goal here) are the canonical
   R3F patterns. The compiler-powered hooks rules cannot model this; the old
   globe-scene triggered the same rule class. */

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { DTIProject } from "./portfolio-types";
import { TRADE_COLORS } from "./portfolio-types";
import { gridSlots, GRID } from "./globe-grid";

/* ── Phase camera targets ── */
const PHASE_CAM = [
  { z: 6.0, fov: 50 }, // 0 Overview
  { z: 1.35, fov: 66 }, // 1 Inside shell
  { z: 0.0, fov: 75 }, // 2 Center
] as const;

interface GlobeSceneProps {
  projects: DTIProject[];
  phase: number;
  onSelectProject: (p: DTIProject | null) => void;
  selectedProject: DTIProject | null;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}

export function GlobeScene(props: GlobeSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50, near: 0.05, far: 100 }}
      style={{ width: "100%", height: "100%", background: "#050810" }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#050810"]} />
      {/* useTexture suspends until all 50 textures resolve — boundary required */}
      <Suspense fallback={null}>
        <Scene {...props} />
      </Suspense>
    </Canvas>
  );
}

function Scene({ projects, phase, onSelectProject, selectedProject, hoveredId, onHover }: GlobeSceneProps) {
  const globe = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  // All 50 textures load together; the page gates reveal on useProgress === 100.
  const textures = useTexture(projects.map((p) => p.thumbnail));
  useMemo(() => {
    const maxAniso = gl.capabilities.getMaxAnisotropy();
    for (const t of textures) {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = maxAniso;
    }
  }, [textures, gl]);

  const slots = useMemo(() => gridSlots(projects.length), [projects.length]);

  /* ── rotation state (refs only — no re-renders) ── */
  const rotY = useRef(0);
  const rotX = useRef(0);
  const curY = useRef(0);
  const curX = useRef(0);
  const velY = useRef(0);
  const velX = useRef(0);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const hoveredRef = useRef(hoveredId);
  hoveredRef.current = hoveredId;
  const selectedRef = useRef(selectedProject);
  selectedRef.current = selectedProject;

  /* ── pointer drag (native DOM — works on empty space, not just meshes) ── */
  useEffect(() => {
    const canvas = gl.domElement;
    let clearFlag: ReturnType<typeof setTimeout>;
    const down = (e: PointerEvent) => {
      if (phaseRef.current < 1) return; // pan only inside
      dragging.current = true;
      document.body.dataset.globeDragging = "1"; // suppress swipe phase-step
      last.current = { x: e.clientX, y: e.clientY };
      velY.current = 0;
      velX.current = 0;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = (e.clientX - last.current.x) * 0.003;
      const dy = (e.clientY - last.current.y) * 0.003;
      rotY.current -= dx;
      rotX.current = THREE.MathUtils.clamp(rotX.current - dy, -1.1, 1.1);
      velY.current = -dx;
      velX.current = -dy;
      last.current = { x: e.clientX, y: e.clientY };
    };
    const up = () => {
      dragging.current = false;
      clearFlag = setTimeout(() => { delete document.body.dataset.globeDragging; }, 100);
      canvas.style.cursor = phaseRef.current >= 1 ? "grab" : "default";
    };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointerleave", up);
    return () => {
      clearTimeout(clearFlag);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointerleave", up);
    };
  }, [gl]);

  /* ── cursor per phase/hover ── */
  useEffect(() => {
    gl.domElement.style.cursor = hoveredId ? "pointer" : phase >= 1 ? "grab" : "default";
  }, [phase, hoveredId, gl]);

  /* ── per-frame: damped camera + rotation. Camera orientation is FIXED
       (identity, looking down -Z) so z can reach exactly 0 — never lookAt. ── */
  useFrame((_, delta) => {
    const cam = camera as THREE.PerspectiveCamera;
    const target = PHASE_CAM[phaseRef.current];
    cam.position.z = THREE.MathUtils.damp(cam.position.z, target.z, 2.4, delta);
    cam.fov = THREE.MathUtils.damp(cam.fov, target.fov, 3.0, delta);
    cam.updateProjectionMatrix();

    // gentle auto-rotate only at Overview, paused on hover/selection
    if (phaseRef.current === 0 && !hoveredRef.current && !selectedRef.current) {
      rotY.current += delta * 0.05; // rad/s — time-based, frame-rate independent
    }

    // inertia inside
    if (phaseRef.current >= 1 && !dragging.current) {
      rotY.current += velY.current;
      rotX.current = THREE.MathUtils.clamp(rotX.current + velX.current, -1.1, 1.1);
      velY.current *= 0.92;
      velX.current *= 0.92;
      if (Math.abs(velY.current) < 0.00005) velY.current = 0;
      if (Math.abs(velX.current) < 0.00005) velX.current = 0;
    }

    curY.current = THREE.MathUtils.damp(curY.current, rotY.current, 8, delta);
    curX.current = THREE.MathUtils.damp(curX.current, rotX.current, 8, delta);
    if (globe.current) {
      globe.current.rotation.y = curY.current;
      globe.current.rotation.x = curX.current;
    }
  });

  return (
    <group>
      <ambientLight intensity={2.5} />
      <group ref={globe}>
        {projects.map((project, i) => (
          <Card
            key={project.id}
            project={project}
            slot={slots[i]}
            texture={textures[i]}
            phase={phase}
            isHovered={hoveredId === project.id}
            onClick={() => onSelectProject(selectedProject?.id === project.id ? null : project)}
            onHoverIn={() => onHover(project.id)}
            onHoverOut={() => onHover(null)}
          />
        ))}
      </group>
    </group>
  );
}

/* ═══ CARD — double-faced, opaque, grid-aligned ═══
   front plane faces outward (seen at Overview),
   back plane faces inward un-mirrored (its own plane, rotated 180°),
   opaque frame plane sandwiched between gives the trade-color border. */

interface CardProps {
  project: DTIProject;
  slot: { x: number; y: number; z: number };
  texture: THREE.Texture;
  phase: number;
  isHovered: boolean;
  onClick: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
}

const FRAME = 0.05; // border thickness beyond image edges

function Card({ project, slot, texture, phase, isHovered, onClick, onHoverIn, onHoverOut }: CardProps) {
  const group = useRef<THREE.Group>(null);
  const labelMat = useRef<THREE.MeshBasicMaterial>(null);
  const curScale = useRef(1);
  const color = TRADE_COLORS[project.trade] ?? "#B8922E";
  const pos = useMemo(() => new THREE.Vector3(slot.x, slot.y, slot.z), [slot]);

  // orient outward; card "up" follows the meridian so rows/columns read as a grid
  const quat = useMemo(() => {
    const outward = pos.clone().normalize();
    const worldUp = new THREE.Vector3(0, 1, 0);
    const right = new THREE.Vector3().crossVectors(worldUp, outward).normalize();
    const up = new THREE.Vector3().crossVectors(outward, right).normalize();
    return new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().makeBasis(right, up, outward));
  }, [pos]);

  // label canvas texture (inward-facing)
  const labelTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.font = "500 26px Inter, system-ui, sans-serif";
    ctx.fillStyle = "#c8c8c8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let text = `${project.projectCode} — ${project.facilityName}`;
    while (ctx.measureText(text).width > 480 && text.length > 12) text = text.slice(0, -4) + "…";
    ctx.fillText(text, 256, 32);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [project.projectCode, project.facilityName]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.quaternion.copy(quat);
      curScale.current = THREE.MathUtils.damp(curScale.current, isHovered ? 1.08 : 1, 10, delta);
      group.current.scale.setScalar(curScale.current);
    }
    // labels fade with phase — always mounted, opacity animated (no pop-in)
    if (labelMat.current) {
      labelMat.current.opacity = THREE.MathUtils.damp(labelMat.current.opacity, phase >= 1 ? 1 : 0, 6, delta);
    }
  });

  const W = GRID.cardW;
  const H = GRID.cardH;
  const LABEL_W = W * 0.92;
  const LABEL_H = LABEL_W * (64 / 512);

  return (
    <group ref={group} position={pos}>
      {/* frame (border) — opaque, single mesh, both faces */}
      <mesh position={[0, 0, -0.004]}>
        <planeGeometry args={[W + FRAME, H + FRAME]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      {/* front image — faces outward */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); onHoverIn(); }}
        onPointerOut={onHoverOut}
      >
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={texture} side={THREE.FrontSide} />
      </mesh>
      {/* back image — faces inward, NOT mirrored (own plane, rotated 180°) */}
      <mesh
        position={[0, 0, -0.008]}
        rotation={[0, Math.PI, 0]}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => { e.stopPropagation(); onHoverIn(); }}
        onPointerOut={onHoverOut}
      >
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={texture} side={THREE.FrontSide} />
      </mesh>
      {/* label — inward-facing, always mounted, opacity animated */}
      <mesh
        position={[0, -(H / 2) - LABEL_H / 2 - 0.05, -0.008]}
        rotation={[0, Math.PI, 0]}
        renderOrder={10}
      >
        <planeGeometry args={[LABEL_W, LABEL_H]} />
        <meshBasicMaterial ref={labelMat} map={labelTexture} transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* hover tooltip — faces camera by design */}
      {isHovered && (
        <Html position={[0, H / 2 + 0.14, phase >= 1 ? -0.05 : 0.05]} center distanceFactor={5.5} style={{ pointerEvents: "none" }}>
          <div style={{
            background: "rgba(5,8,16,0.95)", color: "#fff", padding: "8px 16px",
            borderRadius: 8, fontSize: 13, fontFamily: "Inter, system-ui, sans-serif",
            whiteSpace: "nowrap", borderBottom: `2px solid ${color}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}>
            <div style={{ fontWeight: 600 }}>{project.facilityName}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>
              {project.projectCode} · {project.trade} · {project.contractor}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
