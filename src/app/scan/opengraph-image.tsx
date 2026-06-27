import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export const alt = "QR & Barcode Scanner \u2013 Scan Codes Online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ScanOGImage() {
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
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1h6v6H1zM17 1h6v6h-6zM17 17h6v6h-6zM1 17h6v6H1z" />
            <path d="M7 1v2M1 7h2M17 1v2M23 7h-2M7 23v-2M1 17h2M17 23v-2M23 17h-2" />
          </svg>
          <div
            style={{
              width: 2,
              height: 60,
              background: "rgba(168,85,247,0.3)",
            }}
          />
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
            <path d="M7 12h10" />
            <path d="M12 7v10" />
          </svg>
        </div>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "white",
            margin: 0,
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          QR Code & Barcode Scanner
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            margin: "12px 0 0",
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          Scan codes instantly with your camera or upload an image
        </p>
      </div>
    ),
    { ...size },
  );
}
