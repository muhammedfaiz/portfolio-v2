"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";
import SceneLighting from "./scenes/SceneLighting";
import FloatingTechTag from "./FloatingTechTag";
import { technologies, type Technology } from "@/data/technologies";
import { useSceneStore } from "@/lib/store";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";

const ACCENT = "#4da8ff";

type DragState = { dragging: boolean; lastX: number; velocity: number };

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

function ConstellationGroup({
  items,
  dragRef,
  reducedMotion,
  isMobile,
}: {
  items: Technology[];
  dragRef: React.MutableRefObject<DragState>;
  reducedMotion: boolean;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;
    const { pointer } = useSceneStore.getState();

    groupRef.current.rotation.y += delta * 0.045;

    if (dragRef.current.velocity !== 0) {
      groupRef.current.rotation.y += dragRef.current.velocity;
      dragRef.current.velocity *= 0.92;
      if (Math.abs(dragRef.current.velocity) < 0.0002) dragRef.current.velocity = 0;
    }

    const targetX = -pointer.ny * 0.12;
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, targetX, 2, delta);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <Html center distanceFactor={6} zIndexRange={[8, 0]} occlude={false}>
        <div className="select-none font-display text-sm font-bold tracking-widest text-ink">
          FAIZ
        </div>
      </Html>

      {items.map((tech, i) => (
        <FloatingTechTag
          key={tech.name}
          name={tech.name}
          description={tech.description}
          radius={(i % 2 === 0 ? 2.3 : 3.0) * (isMobile ? 0.55 : 1)}
          angle={(i / items.length) * Math.PI * 2}
          speed={(0.05 + (i % 3) * 0.015) * (i % 2 === 0 ? 1 : -1)}
          yOffset={Math.sin(i * 1.7) * 0.9 * (isMobile ? 0.7 : 1)}
          reducedMotion={reducedMotion}
        />
      ))}
    </group>
  );
}

export default function TechConstellationScene() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const dragRef = useRef<DragState>({ dragging: false, lastX: 0, velocity: 0 });

  const items = useMemo(
    () => (isMobile ? technologies.slice(0, 6) : technologies),
    [isMobile],
  );

  function handleDown(e: React.PointerEvent<HTMLDivElement>) {
    dragRef.current.dragging = true;
    dragRef.current.lastX = e.clientX;
  }
  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.lastX;
    dragRef.current.lastX = e.clientX;
    dragRef.current.velocity += dx * 0.0015;
  }
  function handleUp() {
    dragRef.current.dragging = false;
  }

  return (
    <div
      data-cursor="3d"
      aria-hidden
      className="relative h-[70vh] w-full md:h-[85vh]"
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerLeave={handleUp}
    >
      <SceneCanvas
        className="h-full w-full"
        camera={{ position: [0, 0, isMobile ? 8 : 6.5], fov: isMobile ? 50 : 42 }}
      >
        <SceneLighting />
        <ConstellationGroup items={items} dragRef={dragRef} reducedMotion={reducedMotion} isMobile={isMobile} />
      </SceneCanvas>
    </div>
  );
}
