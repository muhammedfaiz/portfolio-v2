"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useSceneStore } from "@/lib/store";

export default function FloatingTechTag({
  name,
  description,
  radius,
  angle,
  speed,
  yOffset = 0,
  reducedMotion = false,
}: {
  name: string;
  description: string;
  radius: number;
  angle: number;
  speed: number;
  yOffset?: number;
  reducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const { pointer } = useSceneStore.getState();
    const t = reducedMotion ? angle : angle + state.clock.elapsedTime * speed;

    const baseX = Math.cos(t) * radius;
    const baseZ = Math.sin(t) * radius;
    const baseY = yOffset + Math.sin(state.clock.elapsedTime * 0.6 + angle) * 0.08;

    const pull = hovered ? 0.35 : 0;
    const targetX = baseX + pointer.nx * pull;
    const targetY = baseY - pointer.ny * pull;
    const targetZ = baseZ + (hovered ? 0.5 : 0);

    groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 4, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 4, delta);
  });

  return (
    <group ref={groupRef}>
      <Html center distanceFactor={8} zIndexRange={[10, 0]} occlude={false}>
        <div
          data-cursor="3d"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className={`relative select-none whitespace-nowrap rounded-full border px-3 py-1.5 backdrop-blur-md transition-all duration-300 ${
            hovered
              ? "border-[var(--color-accent)]/60 bg-white/10"
              : "border-white/12 bg-white/[0.04]"
          }`}
        >
          <span className="mono-label text-[var(--color-ink)]">{name}</span>
          <div
            className={`mono-label absolute left-1/2 top-full mt-2 w-max max-w-[180px] -translate-x-1/2 rounded-md border border-white/10 bg-[var(--color-bg)]/95 px-2.5 py-1.5 text-center text-[10px] normal-case tracking-normal text-[var(--color-ink-soft)] transition-opacity duration-300 ${
              hovered ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            {description}
          </div>
        </div>
      </Html>
    </group>
  );
}
