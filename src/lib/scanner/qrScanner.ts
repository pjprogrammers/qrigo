import { BrowserQRCodeReader } from "@zxing/browser";
import type { IScannerControls } from "@zxing/browser";

export interface ScanResult {
  text: string;
  format?: string;
}

export class QRScannerEngine {
  private reader: BrowserQRCodeReader;
  private controls: IScannerControls | null = null;

  constructor() {
    this.reader = new BrowserQRCodeReader();
  }

  async startScan(
    videoElement: HTMLVideoElement,
    onResult: (result: ScanResult) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      this.controls = await this.reader.decodeFromVideoDevice(undefined, videoElement, (result, err) => {
        if (result) {
          onResult({ text: result.getText(), format: "QR_CODE" });
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
