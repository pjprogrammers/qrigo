"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useQRStore } from "@/store/qrStore";
import { renderBarcodeSvg } from "@/barcode/renderer";

export function BarcodePreview({ size = 280 }: { size?: number }) {
  const { data, barcodeFormat } = useQRStore();
  const [svgUrl, setSvgUrl] = useState<string>("");

  const svgString = useMemo(() => {
    if (!data) return "";
    return renderBarcodeSvg({
      data,
      format: barcodeFormat as any,
      height: 80,
      showText: true,
    });
  }, [data, barcodeFormat]);

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
        <p className="text-sm text-neutral-400">Enter data to generate barcode</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      {svgUrl && (
        <img
          src={svgUrl}
          alt="Barcode"
          width={size}
          height={size * 0.4}
          style={{ width: size, height: size * 0.4, objectFit: "contain" }}
          className="rounded-xl bg-white p-4"
        />
      )}
    </div>
  );
}
