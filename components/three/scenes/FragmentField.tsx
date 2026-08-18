"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function easeOutCubic(t: number) {
  const c = Math.min(Math.max(t, 0), 1);
  return 1 - Math.pow(1 - c, 3);
}

export default function FragmentField({
  targets,
  progressRef,
  scatterRadius = 3.2,
  size = 0.05,
  color = "#4da8ff",
  reducedMotion = false,
  shape = "shard",
  fadeOut = false,
}: {
  targets: THREE.Vector3[];
  progressRef: React.MutableRefObject<number>;
  scatterRadius?: number;
  size?: number;
  color?: string;
  reducedMotion?: boolean;
  shape?: "shard" | "node";
  fadeOut?: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const center = useMemo(() => {
    const c = new THREE.Vector3();
    targets.forEach((t) => c.add(t));
    return targets.length ? c.divideScalar(targets.length) : c;
  }, [targets]);

  const scattered = useMemo(
    () =>
      targets.map(() => {
        const dir = new THREE.Vector3(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
        ).normalize();
        const r = scatterRadius * (0.6 + Math.random() * 0.6);
        return center.clone().add(dir.multiplyScalar(r));
      }),
    [targets, scatterRadius, center],
  );

  const delays = useMemo(() => targets.map(() => Math.random() * 0.35), [targets]);
  const tumble = useMemo(
    () =>
      targets.map(() => ({
        axis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
        speed: 2 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
      })),
    [targets],
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const progress = reducedMotion ? 1 : progressRef.current;
    const t = state.clock.elapsedTime;

    if (matRef.current) {
      matRef.current.opacity = fadeOut && !reducedMotion ? 1 - THREE.MathUtils.smoothstep(progress, 0.65, 1) : 1;
      meshRef.current.visible = matRef.current.opacity > 0.01;
    }

    for (let i = 0; i < targets.length; i++) {
      const local = reducedMotion
        ? 1
        : Math.min(Math.max((progress - delays[i] * 0.6) / (1 - delays[i] * 0.6), 0), 1);
      const eased = easeOutCubic(local);

      dummy.position.lerpVectors(scattered[i], targets[i], eased);

      if (!reducedMotion && eased < 1) {
        const tm = tumble[i];
        dummy.rotation.set(
          tm.axis.x * (t * tm.speed + tm.phase),
          tm.axis.y * (t * tm.speed + tm.phase),
          tm.axis.z * (t * tm.speed + tm.phase),
        );
      } else {
        dummy.rotation.set(0, 0, 0);
      }

      const scale = reducedMotion ? 1 : 0.5 + eased * 0.5;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, targets.length]}>
      {shape === "node" ? (
        <sphereGeometry args={[size, 12, 12]} />
      ) : (
        <boxGeometry args={[size, size * 1.6, size * 0.6]} />
      )}
      <meshStandardMaterial
        ref={matRef}
        color={shape === "node" ? "#0b0c10" : "#14161b"}
        emissive={color}
        emissiveIntensity={shape === "node" ? 1.6 : 0.9}
        metalness={0.5}
        roughness={0.35}
        toneMapped={false}
        transparent
      />
    </instancedMesh>
  );
}
