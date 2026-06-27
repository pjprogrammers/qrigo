import { BrowserMultiFormatReader } from "@zxing/browser";
import type { IScannerControls } from "@zxing/browser";

export interface ScanResult {
  text: string;
  format?: string;
}

export class BarcodeScannerEngine {
  private reader: BrowserMultiFormatReader;
  private controls: IScannerControls | null = null;

  constructor() {
    this.reader = new BrowserMultiFormatReader();
  }

  async startScan(
    videoElement: HTMLVideoElement,
    onResult: (result: ScanResult) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      this.controls = await this.reader.decodeFromVideoDevice(undefined, videoElement, (result, err) => {
        if (result) {
          const format = result.getBarcodeFormat?.()?.toString() || "UNKNOWN";
          onResult({ text: result.getText(), format });
        }
        if (err && onError) {
          onError(err);
        }
      });
    } catch (error) {
      if (onError) onError(error as Error);
    }
  }

  stopScan(): void {
    if (this.controls) {
      this.controls.stop();
      this.controls = null;
    }
  }
}
