"use client";

import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useQRStore } from "@/store/qrStore";
import { renderBarcodeSvg } from "@/barcode/renderer";
import { barcodeCardThemes } from "@/barcode/presets";
import { downloadBarcodePng } from "@/barcode/export";
import { sanitizeFilename } from "@/lib/utils";
import { Download, Share2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BarcodeCard() {
  const {
    data, barcodeFormat, barcodeCardTheme,
    textMode, username, customText, uppercase,
  } = useQRStore();

  const theme = barcodeCardThemes.find((t) => t.id === barcodeCardTheme) ?? barcodeCardThemes[0];
  const [svgUrl, setSvgUrl] = useState<string>("");
  const isLong = data.length > 80;

  const svgString = useMemo(() => {
    if (!data) return "";
    return renderBarcodeSvg({
      data,
      format: barcodeFormat as any,
      lineColor: theme.lineColor,
      background: "#FFFFFF",
      height: 80,
      showText: true,
      fontSize: 14,
      textMargin: 6,
      margin: 12,
    });
  }, [data, barcodeFormat, theme.lineColor]);

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

  const handleDownload = useCallback(() => {
    if (svgString) downloadBarcodePng(svgString, `barcode-${sanitizeFilename(data.slice(0, 20))}`, 800, 200);
  }, [svgString, data]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "My Barcode", text: "Check out my barcode!", url: window.location.href }); } catch { /* ignore */ }
    }
  }, []);

  let displayText = "";
  if (textMode === "username" && username) {
    displayText = username;
  } else if (textMode === "custom" && customText) {
    displayText = customText;
  }
  if (uppercase && displayText) displayText = displayText.toUpperCase();

  if (!data) return null;

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm">
      <div
        className="relative w-full rounded-2xl p-5 flex flex-col items-center shadow-2xl"
        style={{
          background: `linear-gradient(180deg, ${theme.cardStart}, ${theme.cardEnd})`,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        <div className="w-full bg-white rounded-xl p-4 flex flex-col items-center gap-3 shadow-inner">
          <div className="rounded-lg overflow-hidden flex items-center justify-center w-full min-h-[100px]">
            {svgUrl ? (
              <img src={svgUrl} alt="Barcode" className="max-w-full" style={{ height: 100, objectFit: "contain" }} />
            ) : (
              <div className="w-full h-[100px] flex items-center justify-center text-neutral-400 text-sm">
                Generating...
              </div>
            )}
          </div>

          {displayText && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-bold tracking-wide" style={{ color: theme.lineColor }}>
                {displayText}
              </span>
            </div>
          )}
        </div>
      </div>

      {isLong && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs w-full">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>Data is quite long for a barcode. Consider using a QR code for better reliability.</p>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="gradient" onClick={handleDownload} className="gap-2">
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
