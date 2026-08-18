import { create } from "zustand";

type ScenePointer = {
  /** Normalized viewport position, -1..1, origin center (for 3D parallax) */
  nx: number;
  ny: number;
};

type SceneStore = {
  pointer: ScenePointer;
  setPointer: (nx: number, ny: number) => void;

  scrollProgress: number;
  setScrollProgress: (p: number) => void;

  activeSection: string;
  setActiveSection: (id: string) => void;

  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;

  isMobile: boolean;
  setIsMobile: (v: boolean) => void;

  loaderDone: boolean;
  setLoaderDone: (v: boolean) => void;

  // WorkChapterScene loads via a dynamic import and can mount long after the
  // rest of the page (webpack compiles it on-demand in dev). Any section
  // below Work — like Experience — must not measure its own ScrollTrigger
  // start position until this is true, or it'll pin against a page that's
  // still missing Work's pin-spacer height. See WorkChapterScene.tsx.
  workScenePinned: boolean;
  setWorkScenePinned: (v: boolean) => void;
};

export const useSceneStore = create<SceneStore>((set) => ({
  pointer: { nx: 0, ny: 0 },
  setPointer: (nx, ny) => set({ pointer: { nx, ny } }),

  scrollProgress: 0,
  setScrollProgress: (p) => set({ scrollProgress: p }),

  activeSection: "hero",
  setActiveSection: (id) => set({ activeSection: id }),

  reducedMotion: false,
  setReducedMotion: (v) => set({ reducedMotion: v }),

  isMobile: false,
  setIsMobile: (v) => set({ isMobile: v }),

  loaderDone: false,
  setLoaderDone: (v) => set({ loaderDone: v }),

  workScenePinned: false,
  setWorkScenePinned: (v) => set({ workScenePinned: v }),
}));
