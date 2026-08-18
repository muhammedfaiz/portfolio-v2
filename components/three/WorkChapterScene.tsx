"use client";

import { useMemo, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SceneCanvas from "./SceneCanvas";
import SceneLighting from "./scenes/SceneLighting";
import FragmentField from "./scenes/FragmentField";
import DeviceFrame from "./scenes/DeviceFrame";
import { sampleBoxSurfacePoints } from "@/lib/threeUtils";
import { useSceneStore } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);

const LAPTOP_BOUNDS: [number, number, number] = [2.2, 1.9, 1.0];
// Fraction of total scroll spent assembling the device from fragments before
// chapter progression begins; the device then stays assembled for the rest.
const ASSEMBLE_FRACTION = 0.15;

export default function WorkChapterScene({
  wrapRef,
  chapterCount,
  onChapterChange,
  screenContent,
}: {
  wrapRef: React.RefObject<HTMLDivElement | null>;
  chapterCount: number;
  onChapterChange: (index: number) => void;
  screenContent: React.ReactNode;
}) {
  const assembleRef = useRef(0);
  const lastChapterRef = useRef(-1);

  const targets = useMemo(() => sampleBoxSurfacePoints(...LAPTOP_BOUNDS, 46), []);

  useGSAP(
    () => {
      if (!wrapRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "+=2400",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          assembleRef.current = Math.min(p / ASSEMBLE_FRACTION, 1);

          const chapterProgress = Math.max(0, (p - ASSEMBLE_FRACTION) / (1 - ASSEMBLE_FRACTION));
          const chapter = Math.min(Math.floor(chapterProgress * chapterCount), chapterCount - 1);
          if (chapter !== lastChapterRef.current) {
            lastChapterRef.current = chapter;
            onChapterChange(chapter);
          }
        },
      });

      // This scene loads via a dynamic import, so it mounts (and adds its own
      // ~3000px pin-spacer) well after earlier sections' triggers — like
      // Experience's — have already measured their own trigger positions
      // against a page that was still missing this height. Refresh once, right
      // now, so anything already created correctly accounts for it.
      ScrollTrigger.refresh();

      // In dev mode this chunk is compiled on-demand and can take several
      // seconds to mount — long enough for a fast scroll to reach Experience
      // before the refresh() above ever runs. So sections below Work don't
      // just react to a refresh; they wait on this flag before creating
      // their own trigger at all, guaranteeing they never measure a stale
      // page height in the first place. See Experience.tsx and lib/store.ts.
      useSceneStore.getState().setWorkScenePinned(true);

      return () => {
        trigger.kill();
        useSceneStore.getState().setWorkScenePinned(false);
      };
    },
    { scope: wrapRef, dependencies: [chapterCount] },
  );

  return (
    <div className="relative h-[55vh] w-full md:h-[70vh]" aria-hidden>
      <SceneCanvas className="h-full w-full" camera={{ position: [0, 0, 4.8], fov: 38 }}>
        <SceneLighting />
        <FragmentField
          targets={targets}
          progressRef={assembleRef}
          scatterRadius={2.8}
          fadeOut
        />
        <DeviceFrame
          variant="laptop"
          progressRef={assembleRef}
          screenContent={screenContent}
        />
      </SceneCanvas>
    </div>
  );
}
