"use client";

const ACCENT = "#4da8ff";

export default function SceneLighting({ accent = ACCENT }: { accent?: string }) {
  return (
    <>
      <ambientLight intensity={0.22} color="#8fa3b8" />
      <directionalLight position={[3, 3, 4]} intensity={1.1} color="#f3f1ec" />
      <directionalLight position={[-3, -1.5, -3]} intensity={0.4} color={accent} />
      <pointLight position={[-1.2, 0.8, 1.6]} intensity={0.5} color={accent} distance={5} />
    </>
  );
}
