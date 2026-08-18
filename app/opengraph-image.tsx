import { ImageResponse } from "next/og";

export const alt = "Muhammed Faiz — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0a0c",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 90,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            width: 340,
            height: 340,
            borderRadius: "50%",
            border: "1px solid rgba(77,168,255,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 140,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            width: 240,
            height: 240,
            borderRadius: "50%",
            border: "1px solid rgba(77,168,255,0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 190,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "rgba(77,168,255,0.18)",
            border: "1px solid rgba(77,168,255,0.7)",
          }}
        />

        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#4da8ff", fontWeight: 700 }}>
          FAIZ
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              color: "rgba(243,241,236,0.5)",
              marginBottom: 20,
            }}
          >
            FULL STACK DEVELOPER
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              lineHeight: 1.05,
              fontWeight: 800,
              color: "#f3f1ec",
              marginBottom: 28,
            }}
          >
            I build digital experiences that move.
          </div>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, color: "#4da8ff", fontWeight: 600 }}>
            MERN · SHOPIFY · E-COMMERCE
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
