import { ImageResponse } from "next/og";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/lib/constants";

export const alt = SITE_TITLE;
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
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCB045 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 24,
            background: "rgba(255,255,255,0.2)",
            marginBottom: 24,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            margin: 0,
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          Qrify
        </h1>
        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.9)",
            margin: "8px 0 0",
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          Free QR Code & Barcode Generator
        </p>
      </div>
    ),
    { ...size },
  );
}
