"use client";

import React, { useMemo } from "react";
import { useQRStore } from "@/store/qrStore";
import { getCardTheme } from "@/qr/themes";
import { renderQRSvg } from "@/qr/renderer";
import { downloadSvg, downloadPng, downloadJpeg, downloadWebp } from "@/qr/export";
import { renderBarcodeSvg } from "@/barcode/renderer";
import { downloadBarcodeSvg, downloadBarcodePng, downloadBarcodeJpeg, downloadBarcodeWebp } from "@/barcode/export";
import { sanitizeFilename } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileImage, FileType } from "lucide-react";

export function DownloadButton() {
  const {
    data, theme: themeId, moduleSize, dotSize, errorCorrection,
    platform, username, codeType, barcodeFormat, barcodeShowText, barcodeHeight,
  } = useQRStore();
  const theme = getCardTheme(themeId);
  const effectivePlatform = platform !== "none" ? platform : "none";

  const qrSvgString = useMemo(() => {
    if (!data || codeType !== "qr") return "";
    return renderQRSvg({
      data,
      theme,
      moduleSize,
      dotSize,
      errorCorrection,
      platform: effectivePlatform,
    });
  }, [data, theme, moduleSize, dotSize, errorCorrection, effectivePlatform, codeType]);

  const barcodeSvgString = useMemo(() => {
    if (!data || codeType !== "barcode") return "";
    return renderBarcodeSvg({
      data,
      format: barcodeFormat as any,
      height: barcodeHeight,
      showText: barcodeShowText,
    });
  }, [data, barcodeFormat, barcodeHeight, barcodeShowText, codeType]);

  const svgString = codeType === "barcode" ? barcodeSvgString : qrSvgString;

  const handleDownload = async (format: "png" | "svg" | "jpeg" | "webp") => {
    if (!svgString) return;
    const filename = codeType === "barcode"
      ? `barcode-${sanitizeFilename(username || data.slice(0, 20))}`
      : `qrigo-${username || "qrcode"}`;

    if (codeType === "barcode") {
      switch (format) {
        case "svg":
          downloadBarcodeSvg(svgString, filename);
          break;
        case "png":
          await downloadBarcodePng(svgString, filename, 800, 200);
          break;
        case "jpeg":
          await downloadBarcodeJpeg(svgString, filename, 800, 200);
          break;
        case "webp":
          await downloadBarcodeWebp(svgString, filename, 800, 200);
          break;
      }
    } else {
      switch (format) {
        case "svg":
          downloadSvg(svgString, filename);
          break;
        case "png":
          await downloadPng(svgString, filename, 1024);
          break;
        case "jpeg":
          await downloadJpeg(svgString, filename, 1024);
          break;
        case "webp":
          await downloadWebp(svgString, filename, 1024);
          break;
      }
    }
  };

  return (
    <div className="space-y-2">
      <Label>Export</Label>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={() => handleDownload("png")} className="gap-1.5">
          <FileImage className="w-3.5 h-3.5" /> PNG
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleDownload("svg")} className="gap-1.5">
          <FileType className="w-3.5 h-3.5" /> SVG
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleDownload("jpeg")} className="gap-1.5">
          <FileImage className="w-3.5 h-3.5" /> JPEG
        </Button>
        <Button variant="outline" size="sm" onClick={() => handleDownload("webp")} className="gap-1.5">
          <FileImage className="w-3.5 h-3.5" /> WebP
        </Button>
      </div>
    </div>
  );
}
