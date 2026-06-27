import type { BarcodeFormat } from "@/types/qr";

const EAN13_REGEX = /^\d{13}$/;
const EAN8_REGEX = /^\d{8}$/;
const UPCA_REGEX = /^\d{12}$/;
const UPCE_REGEX = /^\d{6}$/;
const ITF_REGEX = /^[\d]{2,}$/;
const CODABAR_REGEX = /^[A-Da-d][0-9\-\$\:\.\+\/]+[A-Da-d]$/;

export function isEAN13(data: string): boolean {
  return EAN13_REGEX.test(data.trim());
}

export function isEAN8(data: string): boolean {
  return EAN8_REGEX.test(data.trim());
}

export function isUPCA(data: string): boolean {
  return UPCA_REGEX.test(data.trim());
}

export function isUPCE(data: string): boolean {
  return UPCE_REGEX.test(data.trim());
}

export function isITF(data: string): boolean {
  return ITF_REGEX.test(data.trim());
}

export function isCODABAR(data: string): boolean {
  return CODABAR_REGEX.test(data.trim());
}

export function detectBarcodeFormat(data: string): BarcodeFormat {
  const trimmed = data.trim();

  if (isEAN13(trimmed)) return "EAN13";
  if (isEAN8(trimmed)) return "EAN8";
  if (isUPCA(trimmed)) return "UPCA";
  if (isUPCE(trimmed)) return "UPCE";
  if (isCODABAR(trimmed)) return "CODABAR";
  if (isITF(trimmed)) return "ITF";

  return "CODE128";
}

export function isDataTooLongForBarcode(data: string): boolean {
  return data.length > 80;
}
