import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MNM AI Resume — AI-powered resumes & cover letters";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #173228 0%, #2a624b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#f97316",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            M
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>MNM AI Resume</div>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Build AI-powered resumes &amp; cover letters
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "#b9d7c7",
            maxWidth: 820,
          }}
        >
          Professional, ATS-friendly, and ready in minutes.
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 16,
            fontSize: 24,
            color: "#fdba74",
          }}
        >
          AI-powered · ATS-optimized · Free to start
        </div>
      </div>
    ),
    { ...size }
  );
}
