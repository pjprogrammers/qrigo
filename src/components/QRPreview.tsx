"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { useQRStore } from "@/store/qrStore";
import { getCardTheme } from "@/qr/themes";
import { renderQRSvg } from "@/qr/renderer";

export function QRPreview({ size: previewSize }: { size?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, theme: themeId, moduleSize, dotSize, errorCorrection, platform } = useQRStore();
  const [svgUrl, setSvgUrl] = useState<string>("");

  const theme = getCardTheme(themeId);
  const effectivePlatform = platform !== "none" ? platform : "none";

  const svgString = useMemo(() => {
    if (!data) return "";
    return renderQRSvg({
      data,
      theme,
      moduleSize,
      dotSize,
      errorCorrection,
      platform: effectivePlatform,
    });
  }, [data, theme, moduleSize, dotSize, errorCorrection, effectivePlatform]);

  useEffect(() => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    setSvgUrl(url);
    return () => {
      URL.revokeObjectURL(url);
      setSvgUrl("");
    };
  }, [svgString]);

  if (!data) {
    return (
      <div className="flex items-center justify-center w-[280px] h-[280px] bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
        <p className="text-sm text-neutral-400">Enter data to generate QR</p>
      </div>
    );
  }

  const size = previewSize ?? 280;

  return (
    <div ref={containerRef} className="flex items-center justify-center">
      {svgUrl && (
        <img
          src={svgUrl}
          alt="QR Code"
          width={size}
          height={size}
          style={{ width: size, height: size }}
          className="rounded-xl"
        />
      )}
    </div>
  );
}
