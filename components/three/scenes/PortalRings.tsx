"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

const ACCENT = "#4da8ff";
const RING_COUNT = 4;

export default function PortalRings({
  active = false,
  openSignal = 0,
  reducedMotion = false,
}: {
  active?: boolean;
  openSignal?: number;
  reducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const coreRef = useRef<THREE.Mesh>(null);
  const burst = useRef({ value: 0 });

  const rings = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) => ({
        radius: 0.85 + i * 0.34,
        speed: (i % 2 === 0 ? 1 : -1) * (0.05 + i * 0.02),
        tiltX: 0.15 + i * 0.08,
        tiltY: i * 0.25,
        opacity: 0.55 - i * 0.1,
      })),
    [],
  );

  useEffect(() => {
    if (openSignal === 0) return;
    gsap.killTweensOf(burst.current);
    burst.current.value = 1;
    gsap.to(burst.current, { value: 0, duration: 1.6, ease: "power2.out" });
  }, [openSignal]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const activeBoost = active ? 1 : 0;
    const boost = Math.max(activeBoost * 0.6, burst.current.value);

    rings.forEach((ring, i) => {
      const mesh = ringRefs.current[i];
      if (!mesh) return;
      if (!reducedMotion) {
        mesh.rotation.z += delta * ring.speed * (1 + boost * 2);
      }
      const scale = 1 + boost * (0.5 + i * 0.15) + (reducedMotion ? 0 : Math.sin(t * 0.5 + i) * 0.015);
      mesh.scale.setScalar(scale);
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = Math.min(1, ring.opacity + boost * 0.5);
      mat.emissiveIntensity = 0.5 + boost * 2.5;
    });

    if (coreRef.current) {
      const coreMat = coreRef.current.material as THREE.MeshStandardMaterial;
      coreMat.emissiveIntensity = 1.6 + boost * 4;
      const pulse = reducedMotion ? 1 : 1 + Math.sin(t * 1.8) * 0.1;
      coreRef.current.scale.setScalar(pulse + boost * 0.6);
    }

    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>

      {rings.map((ring, i) => (
        <mesh
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
          rotation={[ring.tiltX, ring.tiltY, 0]}
        >
          <torusGeometry args={[ring.radius, 0.012, 8, 96]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={0.5}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={ring.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}
