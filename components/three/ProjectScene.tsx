"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneCanvas from "./SceneCanvas";
import SceneLighting from "./scenes/SceneLighting";
import FragmentField from "./scenes/FragmentField";
import DeviceFrame, { type DeviceVariant } from "./scenes/DeviceFrame";
import SecurityCube from "./scenes/SecurityCube";
import FloatingTechTag from "./FloatingTechTag";
import KicksScreen from "./screens/KicksScreen";
import SpeedServiceScreen from "./screens/SpeedServiceScreen";
import ShopifyScreen from "./screens/ShopifyScreen";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";
import { sampleBoxSurfacePoints } from "@/lib/threeUtils";

const BROWSER_ACCENTS = [
  { name: "Product", description: "Merchandising & variants" },
  { name: "Cart", description: "Real-time cart state" },
  { name: "Checkout", description: "Shopify-native checkout" },
];

gsap.registerPlugin(ScrollTrigger);

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  kicks: KicksScreen,
  "speed-service": SpeedServiceScreen,
  "shopify-experiences": ShopifyScreen,
};

const BOUNDS: Record<DeviceVariant, [number, number, number]> = {
  laptop: [2.2, 1.7, 1.0],
  phone: [0.9, 1.9, 0.2],
  browser: [2.7, 1.75, 0.2],
};

export type ProjectSceneVariant = DeviceVariant | "cube";

export default function ProjectScene({
  projectId,
  scene,
}: {
  projectId: string;
  scene: ProjectSceneVariant;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const targets = useMemo(() => {
    if (scene === "cube") return [];
    const [w, h, d] = BOUNDS[scene];
    return sampleBoxSurfacePoints(w, h, d, isMobile ? 24 : 46);
  }, [scene, isMobile]);

  useGSAP(
    () => {
      if (!wrapRef.current || reducedMotion) {
        progressRef.current = 1;
        return;
      }
      const trigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top 85%",
        end: "top 25%",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
      return () => trigger.kill();
    },
    { scope: wrapRef, dependencies: [reducedMotion] },
  );

  const ScreenComponent = SCREEN_COMPONENTS[projectId];

  return (
    <div
      ref={wrapRef}
      data-cursor="3d"
      className="relative h-[48vh] w-full md:h-[58vh]"
      aria-hidden
    >
      <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 4.6], fov: 38 }}>
        <SceneLighting />
        {scene === "cube" ? (
          <SecurityCube progressRef={progressRef} reducedMotion={reducedMotion} />
        ) : (
          <>
            <FragmentField
              targets={targets}
              progressRef={progressRef}
              reducedMotion={reducedMotion}
              scatterRadius={2.6}
              fadeOut
            />
            <DeviceFrame
              variant={scene}
              progressRef={progressRef}
              reducedMotion={reducedMotion}
              screenContent={ScreenComponent ? <ScreenComponent /> : null}
            />
            {scene === "browser" &&
              !isMobile &&
              BROWSER_ACCENTS.map((accent, i) => (
                <FloatingTechTag
                  key={accent.name}
                  name={accent.name}
                  description={accent.description}
                  radius={1.9}
                  angle={(i / BROWSER_ACCENTS.length) * Math.PI * 2}
                  speed={0.08 + i * 0.015}
                  yOffset={(i - 1) * 0.5}
                  reducedMotion={reducedMotion}
                />
              ))}
          </>
        )}
      </SceneCanvas>
    </div>
  );
}
