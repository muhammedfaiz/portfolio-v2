"use client";

import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { useIsMobile } from "@/lib/useIsMobile";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import WorkChapters from "./WorkChapters";
import WorkSimple from "./WorkSimple";

// Secure Supply has no live demo yet — held back until there's something real
// to show; the rest of the pipeline (data entry, old 3D scene) is untouched.
const chapters = projects.filter((p) => p.id !== "secure-supply");

export default function Work() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  // Both hooks above start false and resolve one tick after mount. Picking a
  // branch before they resolve can create a GSAP pin against stale values
  // (see Experience.tsx / ProcessScene.tsx for the same fix and why).
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);
  }, []);

  if (!ready || isMobile || reducedMotion) {
    return <WorkSimple chapters={chapters} />;
  }

  return <WorkChapters chapters={chapters} />;
}
