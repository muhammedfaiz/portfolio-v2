"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "@/lib/store";

const ACCENT = "#4da8ff";

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

export default function DigitalCore({
  radius = 1.35,
  detail = 1,
  reducedMotion = false,
}: {
  radius?: number;
  detail?: number;
  reducedMotion?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const keyLightRef = useRef<THREE.DirectionalLight>(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(radius, detail), [radius, detail]);

  const nodePositions = useMemo(() => {
    const pos = geometry.attributes.position;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < pos.count; i++) {
      points.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
    }
    return points;
  }, [geometry]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const { pointer } = useSceneStore.getState();
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      if (!reducedMotion) {
        groupRef.current.rotation.y += delta * 0.05;
      }
      const targetX = -pointer.ny * 0.22;
      const targetZ = pointer.nx * 0.12;
      groupRef.current.rotation.x = damp(groupRef.current.rotation.x, targetX, 3, delta);
      groupRef.current.rotation.z = damp(groupRef.current.rotation.z, targetZ, 3, delta);

      const targetPosX = pointer.nx * 0.22;
      const targetPosY = -pointer.ny * 0.14;
      groupRef.current.position.x = damp(groupRef.current.position.x, targetPosX, 2.4, delta);
      groupRef.current.position.y = damp(groupRef.current.position.y, targetPosY, 2.4, delta);
    }

    if (!reducedMotion) {
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z = damp(ring1Ref.current.rotation.z, pointer.nx * 0.4, 1.4, delta);
        ring1Ref.current.rotation.x += delta * 0.03;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.x = damp(ring2Ref.current.rotation.x, -pointer.ny * 0.35, 1.8, delta);
        ring2Ref.current.rotation.y -= delta * 0.025;
      }
      if (ring3Ref.current) {
        ring3Ref.current.rotation.y = damp(ring3Ref.current.rotation.y, pointer.nx * 0.3, 1.1, delta);
        ring3Ref.current.rotation.z += delta * 0.018;
      }
    }

    if (nodesRef.current && !reducedMotion) {
      for (let i = 0; i < nodePositions.length; i++) {
        const p = nodePositions[i];
        const pulse = 1 + Math.sin(t * 1.6 + i * 0.35) * 0.28;
        dummy.position.copy(p);
        dummy.scale.setScalar(pulse);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(i, dummy.matrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }

    if (keyLightRef.current) {
      keyLightRef.current.position.x = damp(keyLightRef.current.position.x, 3 + pointer.nx * 1.5, 2, delta);
      keyLightRef.current.position.y = damp(keyLightRef.current.position.y, 3 + -pointer.ny * 1.5, 2, delta);
    }
  });

  return (
    <>
      <ambientLight intensity={0.18} color="#8fa3b8" />
      <directionalLight ref={keyLightRef} position={[3, 3, 5]} intensity={1.3} color="#f3f1ec" />
      <directionalLight position={[-4, -2, -4]} intensity={0.55} color={ACCENT} />
      <pointLight position={[-1.6, 1.2, 1.8]} intensity={0.6} color={ACCENT} distance={5} />
      <pointLight position={[1.4, -1, -1.6]} intensity={0.35} color="#ffffff" distance={5} />

      <group ref={groupRef}>
        <mesh ref={coreRef} geometry={geometry}>
          <meshStandardMaterial color="#0b0c10" metalness={0.85} roughness={0.35} />
        </mesh>

        <mesh geometry={geometry} scale={1.045}>
          <meshPhysicalMaterial
            color={ACCENT}
            transparent
            opacity={0.07}
            roughness={0.08}
            metalness={0}
            clearcoat={1}
            clearcoatRoughness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh geometry={geometry} scale={1.06}>
          <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.16} />
        </mesh>

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={2.2}
            toneMapped={false}
          />
        </mesh>

        <instancedMesh ref={nodesRef} args={[undefined, undefined, nodePositions.length]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={1.4}
            metalness={0.2}
            roughness={0.4}
            toneMapped={false}
          />
        </instancedMesh>

        <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[radius * 1.55, 0.008, 8, 96]} />
          <meshStandardMaterial color="#c9cdd3" metalness={1} roughness={0.2} />
        </mesh>
        <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, Math.PI / 6]}>
          <torusGeometry args={[radius * 1.75, 0.006, 8, 96]} />
          <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={0.4} metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh ref={ring3Ref} rotation={[Math.PI / 5, Math.PI / 3, 0]}>
          <torusGeometry args={[radius * 1.35, 0.005, 8, 96]} />
          <meshStandardMaterial color="#c9cdd3" metalness={1} roughness={0.25} />
        </mesh>
      </group>
    </>
  );
}
