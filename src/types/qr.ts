export type CodeType = "qr" | "barcode";

export type QRDataType = "url" | "text" | "email" | "phone" | "sms" | "whatsapp" | "wifi" | "location" | "event" | "vcard";

export type ExportFormat = "png" | "svg" | "jpeg" | "webp";

export type TextMode = "none" | "username" | "custom";

export type PlatformId = "none" | "instagram" | "linkedin" | "facebook" | "github" | "x" | "youtube" | "tiktok" | "spotify" | "whatsapp" | "discord" | "telegram" | "pinterest";

export type BarcodeFormat = "CODE128" | "EAN13" | "EAN8" | "UPCA" | "UPCE" | "ITF" | "CODABAR";

export interface CardTheme {
  id: string;
  name: string;
  cardStart: string;
  cardEnd: string;
  qrColors: string[];
  textColor: string;
}

export interface PlatformPreset {
  id: string;
  name: string;
  cardGradient: [string, string];
  qrGradient: string[];
  textPrefix: string;
  useUsername: boolean;
}

export interface TextSettings {
  mode: TextMode;
  customText: string;
  fontSize: number;
  uppercase: boolean;
}

export interface QRConfig {
  data: string;
  moduleSize: number;
  dotSize: number;
  errorCorrection: "L" | "M" | "Q" | "H";
  colors: string[];
  background: string;
  logo?: string;
  logoColor?: string;
}

export interface QRState {
  codeType: CodeType;
  data: string;
  url: string;
  username: string;
  platform: PlatformId;
  theme: string;
  colors: string[];
  moduleSize: number;
  dotSize: number;
  errorCorrection: "L" | "M" | "Q" | "H";
  qrType: QRDataType;
  background: string;
  downloadFormat: ExportFormat;
  textMode: TextMode;
  customText: string;
  uppercase: boolean;
  logo?: string;
  barcodeFormat: BarcodeFormat;
  barcodeShowText: boolean;
  barcodeHeight: number;
  barcodeCardTheme: string;
  barcodeWidth: number;
  scannerFlash: boolean;
  scannerActiveCamera: string;
}

export interface GeneratorState {
  codeType: CodeType;
  qr: {
    type: QRDataType;
    data: string;
    theme: string;
    colors: string[];
    moduleSize: number;
    dotSize: number;
    errorCorrection: "L" | "M" | "Q" | "H";
    background: string;
    logo?: string;
    textMode: TextMode;
    customText: string;
    uppercase: boolean;
    platform: PlatformId;
    username: string;
  };
  barcode: {
    format: BarcodeFormat;
    data: string;
    showText: boolean;
    height: number;
    width: number;
    cardTheme: string;
    color: string;
    background: string;
  };
}

export interface ScannerState {
  active: boolean;
  mode: "qr" | "barcode";
  result: ScanResult | null;
  history: ScanHistoryItem[];
}

export interface ScanResult {
  rawText: string;
  type: string;
  format?: string;
  timestamp: number;
}

export interface ScanHistoryItem {
  id: string;
  rawText: string;
  type: string;
  format?: string;
  createdAt: number;
}
