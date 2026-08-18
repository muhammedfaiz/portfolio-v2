"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "@/lib/store";
import FragmentField from "./FragmentField";

const ACCENT = "#4da8ff";

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

export default function SecurityCube({
  progressRef,
  reducedMotion = false,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);

  const { nodes, lineGeometry } = useMemo(() => {
    const half = 0.85;
    const signs = [-1, 1];
    const vertices: THREE.Vector3[] = [];
    for (const sx of signs) {
      for (const sy of signs) {
        for (const sz of signs) {
          vertices.push(new THREE.Vector3(sx * half, sy * half, sz * half));
        }
      }
    }

    const cubeEdges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const a = vertices[i];
        const b = vertices[j];
        const diff = (a.x !== b.x ? 1 : 0) + (a.y !== b.y ? 1 : 0) + (a.z !== b.z ? 1 : 0);
        if (diff === 1) cubeEdges.push([i, j]);
      }
    }

    const internal: THREE.Vector3[] = [];
    for (let i = 0; i < 6; i++) {
      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
      ).normalize();
      internal.push(dir.multiplyScalar(0.25 + Math.random() * 0.25));
    }

    const allNodes = [...vertices, ...internal];
    const internalEdges: [number, number][] = internal.map((p, idx) => {
      let nearest = 0;
      let best = Infinity;
      vertices.forEach((v, vi) => {
        const d = p.distanceTo(v);
        if (d < best) {
          best = d;
          nearest = vi;
        }
      });
      return [vertices.length + idx, nearest];
    });

    const allEdges = [...cubeEdges, ...internalEdges];
    const positions = new Float32Array(allEdges.length * 6);
    allEdges.forEach(([a, b], i) => {
      positions[i * 6] = allNodes[a].x;
      positions[i * 6 + 1] = allNodes[a].y;
      positions[i * 6 + 2] = allNodes[a].z;
      positions[i * 6 + 3] = allNodes[b].x;
      positions[i * 6 + 4] = allNodes[b].y;
      positions[i * 6 + 5] = allNodes[b].z;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return { nodes: allNodes, lineGeometry: geo };
  }, []);

  useFrame((state, delta) => {
    if (lineMatRef.current) {
      const progress = reducedMotion ? 1 : progressRef.current;
      lineMatRef.current.opacity = THREE.MathUtils.smoothstep(progress, 0.6, 1) * 0.5;
    }

    if (!groupRef.current) return;
    const { pointer } = useSceneStore.getState();

    if (reducedMotion) return;

    groupRef.current.rotation.y += delta * 0.12;
    const targetX = -pointer.ny * 0.2;
    groupRef.current.rotation.x = damp(groupRef.current.rotation.x, targetX, 2.5, delta);
  });

  return (
    <group ref={groupRef}>
      <FragmentField
        targets={nodes}
        progressRef={progressRef}
        scatterRadius={2.4}
        size={0.045}
        color={ACCENT}
        reducedMotion={reducedMotion}
        shape="node"
      />
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial ref={lineMatRef} color={ACCENT} transparent opacity={0} />
      </lineSegments>
    </group>
  );
}
