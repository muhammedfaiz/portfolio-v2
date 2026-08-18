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
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
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
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: camera?.position ?? [0, 0, 6], fov: camera?.fov ?? 42 }}
        frameloop={inView ? "always" : "never"}
      >
        {children}
      </Canvas>
    </div>
  );
}
