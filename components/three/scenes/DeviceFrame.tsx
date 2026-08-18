"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import { useSceneStore } from "@/lib/store";

const ACCENT = "#4da8ff";

export type DeviceVariant = "laptop" | "phone" | "browser";

const SCREEN_PX: Record<DeviceVariant, { w: number; h: number }> = {
  laptop: { w: 640, h: 380 },
  phone: { w: 320, h: 620 },
  browser: { w: 720, h: 430 },
};

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

export default function DeviceFrame({
  variant,
  progressRef,
  reducedMotion = false,
  screenContent,
}: {
  variant: DeviceVariant;
  progressRef: React.MutableRefObject<number>;
  reducedMotion?: boolean;
  screenContent: React.ReactNode;
}) {
  const tiltRef = useRef<THREE.Group>(null);
  const htmlWrapRef = useRef<THREE.Group>(null);

  const { frameMaterial, chromeMaterial, displayMaterial, frameMats } = useMemo(() => {
    const frame = new THREE.MeshStandardMaterial({
      color: "#101216",
      metalness: 0.85,
      roughness: 0.32,
      transparent: true,
      opacity: 0,
    });
    const chrome = new THREE.MeshStandardMaterial({
      color: "#1b1e24",
      metalness: 0.9,
      roughness: 0.25,
      transparent: true,
      opacity: 0,
    });
    const display = new THREE.MeshStandardMaterial({
      color: "#05070a",
      emissive: ACCENT,
      emissiveIntensity: 0.05,
      metalness: 0.1,
      roughness: 0.6,
      transparent: true,
      opacity: 0,
    });
    return {
      frameMaterial: frame,
      chromeMaterial: chrome,
      displayMaterial: display,
      frameMats: [frame, chrome, display],
    };
  }, []);

  const px = SCREEN_PX[variant];
  const distanceFactor = variant === "phone" ? 3.1 : variant === "laptop" ? 2.5 : 2.6;

  useFrame((state, delta) => {
    const progress = reducedMotion ? 1 : progressRef.current;
    const visible = THREE.MathUtils.smoothstep(progress, 0.45, 0.95);

    frameMats.forEach((m) => {
      m.opacity = visible;
    });

    if (htmlWrapRef.current) {
      htmlWrapRef.current.visible = visible > 0.55;
    }

    if (!tiltRef.current) return;

    const { pointer } = useSceneStore.getState();
    const t = state.clock.elapsedTime;

    if (reducedMotion) {
      tiltRef.current.rotation.set(0, 0, 0);
      tiltRef.current.position.y = 0;
      return;
    }

    const targetRotX = -pointer.ny * 0.18 * visible;
    const targetRotY = pointer.nx * 0.28 * visible;
    tiltRef.current.rotation.x = damp(tiltRef.current.rotation.x, targetRotX, 3, delta);
    tiltRef.current.rotation.y = damp(tiltRef.current.rotation.y, targetRotY, 3, delta);

    const bob = Math.sin(t * 0.7) * 0.06 * visible;
    tiltRef.current.position.y = damp(tiltRef.current.position.y, bob, 3, delta);
  });

  return (
    <group ref={tiltRef}>
      {variant === "laptop" && (
        <>
          <mesh material={frameMaterial} position={[0, -0.5, 0.3]}>
            <boxGeometry args={[2.2, 0.08, 1.4]} />
          </mesh>
          <group position={[0, -0.46, -0.4]} rotation={[-0.12, 0, 0]}>
            <mesh material={frameMaterial} position={[0, 0.65, -0.02]}>
              <boxGeometry args={[2.2, 1.34, 0.05]} />
            </mesh>
            <mesh material={displayMaterial} position={[0, 0.65, 0.012]}>
              <planeGeometry args={[1.98, 1.16]} />
            </mesh>
            <group ref={htmlWrapRef} position={[0, 0.65, 0.02]}>
              <Html center occlude={false} distanceFactor={distanceFactor} zIndexRange={[5, 0]}>
                <div style={{ width: px.w, height: px.h }}>{screenContent}</div>
              </Html>
            </group>
          </group>
        </>
      )}

      {variant === "phone" && (
        <>
          <RoundedBox args={[0.9, 1.9, 0.09]} radius={0.1} smoothness={4} material={frameMaterial} />
          <mesh material={displayMaterial} position={[0, 0, 0.05]}>
            <planeGeometry args={[0.78, 1.66]} />
          </mesh>
          <group ref={htmlWrapRef} position={[0, 0, 0.06]}>
            <Html center occlude={false} distanceFactor={distanceFactor} zIndexRange={[5, 0]}>
              <div style={{ width: px.w, height: px.h }}>{screenContent}</div>
            </Html>
          </group>
        </>
      )}

      {variant === "browser" && (
        <>
          <mesh material={frameMaterial}>
            <boxGeometry args={[2.7, 1.75, 0.05]} />
          </mesh>
          <mesh material={chromeMaterial} position={[0, 0.79, 0.03]}>
            <boxGeometry args={[2.7, 0.16, 0.02]} />
          </mesh>
          {[-1.2, -1.1, -1.0].map((x) => (
            <mesh key={x} material={chromeMaterial} position={[x, 0.79, 0.045]}>
              <circleGeometry args={[0.02, 12]} />
            </mesh>
          ))}
          <mesh material={displayMaterial} position={[0, -0.08, 0.03]}>
            <planeGeometry args={[2.5, 1.35]} />
          </mesh>
          <group ref={htmlWrapRef} position={[0, -0.08, 0.04]}>
            <Html center occlude={false} distanceFactor={distanceFactor} zIndexRange={[5, 0]}>
              <div style={{ width: px.w, height: px.h }}>{screenContent}</div>
            </Html>
          </group>
        </>
      )}
    </group>
  );
}
