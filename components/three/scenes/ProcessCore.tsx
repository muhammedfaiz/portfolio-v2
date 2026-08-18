"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#4da8ff";
const COUNT = 42;

function easeInOutCubic(t: number) {
  const c = Math.min(Math.max(t, 0), 1);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

function ideaStage(): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < COUNT; i++) {
    const dir = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    ).normalize();
    points.push(dir.multiplyScalar(0.08 + Math.random() * 0.1));
  }
  return points;
}

function designStage(): THREE.Vector3[] {
  const geo = new THREE.IcosahedronGeometry(1.05, 1);
  const pos = geo.attributes.position;
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < pos.count && i < COUNT; i++) {
    points.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
  }
  while (points.length < COUNT) points.push(points[points.length % pos.count].clone());
  return points;
}

function codeStage(): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < COUNT; i++) {
    const dir = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
    ).normalize();
    points.push(dir.multiplyScalar(0.7 + Math.random() * 0.7));
  }
  return points;
}

function deployStage(): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const rings = 4;
  const perRing = Math.ceil(COUNT / rings);
  let i = 0;
  for (let r = 0; r < rings; r++) {
    const radius = 0.55 + r * 0.22;
    const y = -0.6 + (r / (rings - 1)) * 1.2;
    for (let a = 0; a < perRing && i < COUNT; a++, i++) {
      const angle = (a / perRing) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
  }
  return points;
}

function scaleStage(): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const rings = 4;
  const perRing = Math.ceil(COUNT / rings);
  let i = 0;
  for (let r = 0; r < rings; r++) {
    const radius = 0.9 + r * 0.42;
    const y = -1.1 + (r / (rings - 1)) * 2.2;
    for (let a = 0; a < perRing && i < COUNT; a++, i++) {
      const angle = (a / perRing) * Math.PI * 2 + r * 0.4;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
  }
  return points;
}

function nearestNeighborEdges(points: THREE.Vector3[], neighbors = 2) {
  const edges: [number, number][] = [];
  points.forEach((p, i) => {
    const dists = points
      .map((q, j) => ({ j, d: i === j ? Infinity : p.distanceTo(q) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, neighbors);
    dists.forEach(({ j }) => {
      const key: [number, number] = i < j ? [i, j] : [j, i];
      if (!edges.some(([a, b]) => a === key[0] && b === key[1])) edges.push(key);
    });
  });
  return edges;
}

export default function ProcessCore({
  progressRef,
  reducedMotion = false,
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion?: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const stages = useMemo(
    () => [ideaStage(), designStage(), codeStage(), deployStage(), scaleStage()],
    [],
  );

  const codeLineGeometry = useMemo(() => {
    const codePoints = stages[2];
    const edges = nearestNeighborEdges(codePoints, 2);
    const positions = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      positions[i * 6] = codePoints[a].x;
      positions[i * 6 + 1] = codePoints[a].y;
      positions[i * 6 + 2] = codePoints[a].z;
      positions[i * 6 + 3] = codePoints[b].x;
      positions[i * 6 + 4] = codePoints[b].y;
      positions[i * 6 + 5] = codePoints[b].z;
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [stages]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const progress = progressRef.current;
    const segments = stages.length - 1;
    const scaled = progress * segments;
    const segIndex = Math.min(Math.floor(scaled), segments - 1);
    const localT = easeInOutCubic(scaled - segIndex);

    const from = stages[segIndex];
    const to = stages[segIndex + 1];

    for (let i = 0; i < COUNT; i++) {
      dummy.position.lerpVectors(from[i], to[i], localT);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    if (lineMatRef.current) {
      // CODE is stage index 2 — fade the graph lines in only around that segment.
      const codeProgress = segments > 0 ? 2 / segments : 0;
      const dist = Math.abs(progress - codeProgress);
      lineMatRef.current.opacity = Math.max(0, 1 - dist * 6) * 0.4;
    }

    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.09;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshStandardMaterial
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={1.5}
          metalness={0.3}
          roughness={0.4}
          toneMapped={false}
        />
      </instancedMesh>
      <lineSegments geometry={codeLineGeometry}>
        <lineBasicMaterial ref={lineMatRef} color={ACCENT} transparent opacity={0} />
      </lineSegments>
    </group>
  );
}
