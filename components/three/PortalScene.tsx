"use client";

import SceneCanvas from "./SceneCanvas";
import SceneLighting from "./scenes/SceneLighting";
import PortalRings from "./scenes/PortalRings";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function PortalScene({
  active = false,
  openSignal = 0,
  className,
}: {
  active?: boolean;
  openSignal?: number;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className={className} aria-hidden>
      <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 45 }}>
        <SceneLighting />
        <PortalRings active={active} openSignal={openSignal} reducedMotion={reducedMotion} />
      </SceneCanvas>
    </div>
  );
}
