import { useEffect, useState } from "react";
import { useSceneStore } from "./store";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  const setStoreIsMobile = useSceneStore((s) => s.setIsMobile);

  useEffect(() => {
    function handleResize() {
      const value = window.innerWidth < breakpoint;
      setIsMobile(value);
      setStoreIsMobile(value);
    }
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint, setStoreIsMobile]);

  return isMobile;
}
