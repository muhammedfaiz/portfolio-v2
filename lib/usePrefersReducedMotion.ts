import { useEffect, useState } from "react";
import { useSceneStore } from "./store";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  const setReducedMotion = useSceneStore((s) => s.setReducedMotion);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(query.matches);
      setReducedMotion(query.matches);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [setReducedMotion]);

  return reduced;
}
