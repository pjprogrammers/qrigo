export type BarcodeFormat =
  | "CODE128"
  | "EAN13"
  | "EAN8"
  | "UPCA"
  | "UPCE"
  | "ITF"
  | "CODABAR";

export interface BarcodePreset {
  id: BarcodeFormat;
  name: string;
  description: string;
}

export interface BarcodeOptions {
  data: string;
  format: BarcodeFormat;
  width: number;
  height: number;
  lineColor: string;
  background: string;
  showText: boolean;
  font: string;
  fontSize: number;
  textMargin: number;
  margin: number;
}

export interface BarcodeCardTheme {
  id: string;
  name: string;
  cardStart: string;
  cardEnd: string;
  lineColor: string;
  textColor: string;
}
