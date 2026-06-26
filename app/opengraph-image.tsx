import { ImageResponse } from "next/og";

export const alt = "Alipnf frontend developer portfolio preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          color: "#f5f5f0",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter, Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          overflow: "hidden",
          padding: "70px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            inset: 0,
            opacity: 0.65,
            position: "absolute",
          }}
        />
        <div
          style={{
            background: "radial-gradient(circle at 72% 18%, rgba(255,255,255,0.16), transparent 34%)",
            inset: 0,
            position: "absolute",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          <div style={{ color: "#737373", fontSize: 24, letterSpacing: 5, textTransform: "uppercase" }}>Portfolio / Frontend Developer</div>
          <div style={{ color: "#737373", fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}>ID / Remote</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ fontSize: 154, fontWeight: 800, letterSpacing: "-0.085em", lineHeight: 0.82 }}>alipnf</div>
          <div style={{ color: "#a3a3a3", fontSize: 38, letterSpacing: "-0.03em", marginTop: 34 }}>Muhammad Alif Nur Firdaus</div>
        </div>

        <div style={{ alignItems: "flex-end", display: "flex", justifyContent: "space-between", position: "relative" }}>
          <div style={{ color: "#a3a3a3", display: "flex", flexDirection: "column", fontSize: 28, gap: 12 }}>
            <span>React / Next.js / TypeScript</span>
            <span style={{ color: "#737373", fontSize: 22 }}>Responsive UI / REST API Integration / Production Interfaces</span>
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.18)", color: "#f5f5f0", fontSize: 24, letterSpacing: 3, padding: "16px 20px", textTransform: "uppercase" }}>
            alipnf.my.id
          </div>
        </div>
      </div>
    ),
    size,
  );
}
