import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#07090E",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            color: "#D4A853",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          ALFATREES PMC
        </div>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 64,
            fontWeight: 800,
            marginTop: 24,
            lineHeight: 1.15,
          }}
        >
          Estimation. Scheduling. Controls.
        </div>
        <div style={{ color: "#8B9AB5", fontSize: 30, marginTop: 20 }}>
          Delivered in 24–72 hours · 50 government contracts managed
        </div>
      </div>
    ),
    size
  );
}
