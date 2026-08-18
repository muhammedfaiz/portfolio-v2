"use client";

import SceneCanvas from "./SceneCanvas";
import DigitalCore from "./DigitalCore";
import FloatingTechTag from "./FloatingTechTag";
import { heroTechnologies } from "@/data/technologies";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";

const ORBIT_SPEEDS = [0.09, -0.07, 0.11, -0.085, 0.1];

export default function HeroScene() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <div
      data-cursor="3d"
      className="relative h-[70vh] w-full md:h-[85vh]"
      aria-hidden
    >
      <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 6], fov: 42 }}>
        <DigitalCore
          radius={1.35}
          detail={isMobile ? 0 : 1}
          reducedMotion={reducedMotion}
        />
        {!isMobile &&
          heroTechnologies.map((tech, i) => (
            <FloatingTechTag
              key={tech.name}
              name={tech.name}
              description={tech.description}
              radius={2.6 + (i % 2) * 0.35}
              angle={(i / heroTechnologies.length) * Math.PI * 2}
              speed={ORBIT_SPEEDS[i % ORBIT_SPEEDS.length]}
              yOffset={((i % 3) - 1) * 0.6}
              reducedMotion={reducedMotion}
            />
          ))}
      </SceneCanvas>
    </div>
  );
}
