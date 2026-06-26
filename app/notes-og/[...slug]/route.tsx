import { getNote } from "@/lib/notes";
import { ImageResponse } from "next/og";

type OpenGraphImageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function GET(_request: Request, { params }: OpenGraphImageProps) {
  const { slug } = await params;
  const note = getNote(slug);
  const title = note?.title ?? "Technical Notes";
  const tags = note?.tags.slice(0, 3) ?? ["notes"];

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
          padding: "66px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.052) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.052) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            inset: 0,
            opacity: 0.65,
            position: "absolute",
          }}
        />
        <div
          style={{
            background: "radial-gradient(circle at 82% 20%, rgba(255,255,255,0.16), transparent 32%)",
            inset: 0,
            position: "absolute",
          }}
        />

        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          <div style={{ color: "#737373", fontSize: 24, letterSpacing: 5, textTransform: "uppercase" }}>Technical Notes</div>
          <div style={{ color: "#737373", fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}>alipnf</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 30, maxWidth: 940, position: "relative" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "#a3a3a3",
                  fontSize: 19,
                  letterSpacing: 2.4,
                  padding: "10px 14px",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ fontSize: title.length > 48 ? 72 : 88, fontWeight: 800, letterSpacing: "-0.075em", lineHeight: 0.92 }}>{title}</div>
        </div>

        <div style={{ alignItems: "flex-end", display: "flex", justifyContent: "space-between", position: "relative" }}>
          <div style={{ color: "#a3a3a3", display: "flex", flexDirection: "column", fontSize: 25, gap: 10 }}>
            <span>Muhammad Alif Nur Firdaus</span>
            <span style={{ color: "#737373", fontSize: 20 }}>Frontend Developer / React / Next.js / TypeScript</span>
          </div>
          <div style={{ color: "#737373", fontSize: 24, letterSpacing: 3, textTransform: "uppercase" }}>alipnf.my.id</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
