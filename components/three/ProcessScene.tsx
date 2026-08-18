"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneCanvas from "./SceneCanvas";
import SceneLighting from "./scenes/SceneLighting";
import ProcessCore from "./scenes/ProcessCore";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export default function ProcessScene({
  wrapRef,
  onStageChange,
}: {
  wrapRef: React.RefObject<HTMLDivElement | null>;
  onStageChange: (stage: number) => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const progressRef = useRef(0);
  const lastStageRef = useRef(-1);

  // Both hooks above start false and correct themselves one tick after mount.
  // Creating the pin immediately would build it against those stale values,
  // then immediately tear it down and recreate it once they resolve — and
  // that create/kill cycle doesn't reliably remove GSAP's pin-spacer, leaving
  // a phantom one that permanently reserves scroll space. Wait one tick so
  // the pin is only ever created once, with correct values.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  useGSAP(
    () => {
      if (!ready || !wrapRef.current) return;

      if (reducedMotion) {
        progressRef.current = 1;
        onStageChange(4);
        return;
      }

      // A shorter pin distance on mobile — the same 2000px scroll budget used on
      // desktop eats a much larger share of a small viewport's height.
      const pinDistance = isMobile ? 1100 : 2000;

      const trigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: `+=${pinDistance}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const stage = Math.round(self.progress * 4);
          if (stage !== lastStageRef.current) {
            lastStageRef.current = stage;
            onStageChange(stage);
          }
        },
      });

      // This scene loads via a dynamic import and mounts after sections below
      // it (Currently, Contact) have already laid out — refresh once, right
      // now, so anything measured before this correctly accounts for the pin
      // this just added. See WorkChapterScene.tsx for the fuller writeup.
      ScrollTrigger.refresh();

      return () => trigger.kill();
    },
    { scope: wrapRef, dependencies: [ready, reducedMotion, isMobile] },
  );

  return (
    <div className="relative h-[70vh] w-full md:h-[85vh]" aria-hidden>
      <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 40 }}>
        <SceneLighting />
        <ProcessCore progressRef={progressRef} reducedMotion={reducedMotion} />
      </SceneCanvas>
    </div>
  );
}
