import type { BarcodePreset } from "@/barcode/types";

export const barcodePresets: BarcodePreset[] = [
  { id: "CODE128", name: "Code 128", description: "Alphanumeric, supports all ASCII" },
  { id: "EAN13", name: "EAN-13", description: "13-digit product barcode" },
  { id: "EAN8", name: "EAN-8", description: "8-digit product barcode" },
  { id: "UPCA", name: "UPC-A", description: "12-digit retail barcode" },
  { id: "UPCE", name: "UPC-E", description: "6-digit retail barcode" },
  { id: "ITF", name: "ITF-14", description: "Interleaved 2 of 5, shipping" },
  { id: "CODABAR", name: "Codabar", description: "Library/pharma/logistics" },
];

export function getBarcodePreset(id: string): BarcodePreset {
  return barcodePresets.find((p) => p.id === id) ?? barcodePresets[0];
}

export const barcodeCardThemes: {
  id: string;
  name: string;
  cardStart: string;
  cardEnd: string;
  lineColor: string;
  textColor: string;
}[] = [
  { id: "classic", name: "Classic", cardStart: "#FFFFFF", cardEnd: "#F5F5F5", lineColor: "#000000", textColor: "#000000" },
  { id: "dark", name: "Dark", cardStart: "#1F2937", cardEnd: "#111827", lineColor: "#FFFFFF", textColor: "#FFFFFF" },
  { id: "blue", name: "Blue", cardStart: "#3B82F6", cardEnd: "#1D4ED8", lineColor: "#FFFFFF", textColor: "#FFFFFF" },
  { id: "green", name: "Green", cardStart: "#10B981", cardEnd: "#047857", lineColor: "#FFFFFF", textColor: "#FFFFFF" },
  { id: "purple", name: "Purple", cardStart: "#8B5CF6", cardEnd: "#6D28D9", lineColor: "#FFFFFF", textColor: "#FFFFFF" },
  { id: "warm", name: "Warm", cardStart: "#F59E0B", cardEnd: "#D97706", lineColor: "#FFFFFF", textColor: "#FFFFFF" },
];
