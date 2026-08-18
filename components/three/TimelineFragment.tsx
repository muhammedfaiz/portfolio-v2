"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SceneCanvas from "./SceneCanvas";

const ACCENT = "#4da8ff";

function Marker({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.6;
      groupRef.current.rotation.x += delta * 0.2;
    }
    if (coreRef.current) {
      const pulse = reducedMotion ? 1 : 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.25;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <pointLight color={ACCENT} intensity={0.6} distance={2} />
    </group>
  );
}

export default function TimelineFragment({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-14 w-14 -translate-x-1/2 -translate-y-1/2"
    >
      <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 2.6], fov: 40 }}>
        <Marker reducedMotion={reducedMotion} />
      </SceneCanvas>
    </div>
  );
}
