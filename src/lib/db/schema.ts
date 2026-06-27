export interface GeneratedCode {
  id: string;
  type: "qr" | "barcode";
  format: string;
  data: string;
  displayText: string;
  options: Record<string, unknown>;
  imageUrl?: string;
  createdAt: number;
  favorite: boolean;
}

export interface ScanHistoryItem {
  id: string;
  type: string;
  format?: string;
  rawText: string;
  createdAt: number;
}

export interface DraftItem {
  id: string;
  type: "qr" | "barcode";
  format: string;
  data: string;
  options: Record<string, unknown>;
  createdAt: number;
}
