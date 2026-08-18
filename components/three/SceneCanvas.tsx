"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useSceneStore } from "@/lib/store";

export default function SceneCanvas({
  children,
  camera,
  className,
}: {
  children: React.ReactNode;
  camera?: { position?: [number, number, number]; fov?: number };
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const setPointer = useSceneStore((s) => s.setPointer);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    // rootMargin gives a buffer so mount/unmount happens a bit before/after
    // the section is actually visible, instead of exactly at the boundary
    // (which would otherwise flicker on every small scroll wobble there).
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: "200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointer(nx, ny);
  }

  return (
    <div ref={wrapRef} className={className} onPointerMove={handlePointerMove}>
      {/* Fully unmount (not just pause) when out of view — this is a real
          WebGL context, and mobile Safari has a low hard cap on how many can
          exist at once across the page. Leaving every scene's canvas mounted
          for the whole session exceeds that cap on real devices, silently
          corrupting or blacking out whichever ones get evicted. Unmounting
          frees the context; remounting on scroll-back creates a fresh one. */}
      {inView && (
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: camera?.position ?? [0, 0, 6], fov: camera?.fov ?? 42 }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
