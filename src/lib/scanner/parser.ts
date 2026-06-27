import { parseQRContent as parseQRContentFull } from "@/lib/qr/parser";
import { parseBarcodeContent as parseBarcodeContentFull } from "@/lib/barcode/parser";

export interface ScanAction {
  label: string;
  action: "open" | "copy" | "share" | "save" | "call";
  href?: string;
}

export interface ParsedScanResult {
  text: string;
  type: string;
  actions: ScanAction[];
}

export function parseScanResult(text: string, format?: string): ParsedScanResult {
  if (format === "QR_CODE") {
    const qrResult = parseQRContentFull(text);
    return {
      type: qrResult.type,
      text: qrResult.raw,
      actions: qrResult.actions as ScanAction[],
    };
  }
  const barcodeResult = parseBarcodeContentFull(text, format || "CODE128");
  return {
    type: barcodeResult.type,
    text: barcodeResult.raw,
    actions: barcodeResult.actions as ScanAction[],
  };
}
