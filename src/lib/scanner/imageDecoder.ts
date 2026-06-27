import { BrowserQRCodeReader, BrowserMultiFormatReader } from "@zxing/browser";
import jsQR from "jsqr";

interface DecodeResult {
  text: string;
  format?: string;
}

function getImageData(img: HTMLImageElement): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function imageDataToCanvas(data: ImageData): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = data.width;
  canvas.height = data.height;
  const ctx = canvas.getContext("2d")!;
  ctx.putImageData(data, 0, 0);
  return canvas;
}

function toGrayscale(data: ImageData): ImageData {
  const pixels = data.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    pixels[i] = gray;
    pixels[i + 1] = gray;
    pixels[i + 2] = gray;
  }
  return data;
}

function increaseContrast(data: ImageData, factor = 1.5): ImageData {
  const pixels = data.data;
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = Math.min(255, Math.max(0, Math.round(128 + (pixels[i] - 128) * factor)));
    pixels[i + 1] = Math.min(255, Math.max(0, Math.round(128 + (pixels[i + 1] - 128) * factor)));
    pixels[i + 2] = Math.min(255, Math.max(0, Math.round(128 + (pixels[i + 2] - 128) * factor)));
  }
  return data;
}

function binarize(data: ImageData, threshold = 128): ImageData {
  const pixels = data.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const gray = 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
    const val = gray >= threshold ? 255 : 0;
    pixels[i] = val;
    pixels[i + 1] = val;
    pixels[i + 2] = val;
  }
  return data;
}

function sharpen(data: ImageData, strength = 0.5): ImageData {
  const w = data.width;
  const h = data.height;
  const src = new Uint8ClampedArray(data.data);
  const pixels = data.data;

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = (y * w + x) * 4;
      for (let c = 0; c < 3; c++) {
        const center = src[idx + c];
        const top = src[((y - 1) * w + x) * 4 + c];
        const bottom = src[((y + 1) * w + x) * 4 + c];
        const left = src[(y * w + (x - 1)) * 4 + c];
        const right = src[(y * w + (x + 1)) * 4 + c];
        const sharpened = center * (1 + 4 * strength) - (top + bottom + left + right) * strength;
        pixels[idx + c] = Math.min(255, Math.max(0, Math.round(sharpened)));
      }
    }
  }
  return data;
}

function rotate90(data: ImageData): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = data.height;
  canvas.height = data.width;
  const ctx = canvas.getContext("2d")!;
  const temp = document.createElement("canvas");
  temp.width = data.width;
  temp.height = data.height;
  const tempCtx = temp.getContext("2d")!;
  tempCtx.putImageData(data, 0, 0);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(Math.PI / 2);
  ctx.drawImage(temp, -data.width / 2, -data.height / 2);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function rotate180(data: ImageData): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = data.width;
  canvas.height = data.height;
  const ctx = canvas.getContext("2d")!;
  const temp = document.createElement("canvas");
  temp.width = data.width;
  temp.height = data.height;
  const tempCtx = temp.getContext("2d")!;
  tempCtx.putImageData(data, 0, 0);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(Math.PI);
  ctx.drawImage(temp, -data.width / 2, -data.height / 2);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function rotate270(data: ImageData): ImageData {
  const canvas = document.createElement("canvas");
  canvas.width = data.height;
  canvas.height = data.width;
  const ctx = canvas.getContext("2d")!;
  const temp = document.createElement("canvas");
  temp.width = data.width;
  temp.height = data.height;
  const tempCtx = temp.getContext("2d")!;
  tempCtx.putImageData(data, 0, 0);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.drawImage(temp, -data.width / 2, -data.height / 2);
  return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

async function tryZXingOnCanvas(
  canvas: HTMLCanvasElement,
  mode: "qr" | "barcode"
): Promise<DecodeResult | null> {
  try {
    if (mode === "qr") {
      const reader = new BrowserQRCodeReader();
      const result = await reader.decodeFromCanvas(canvas);
      return { text: result.getText(), format: "QR_CODE" };
    } else {
      const reader = new BrowserMultiFormatReader();
      const result = await reader.decodeFromCanvas(canvas);
      const format = result.getBarcodeFormat?.()?.toString() || "UNKNOWN";
      return { text: result.getText(), format };
    }
  } catch {
    return null;
  }
}

function tryJsQROnData(data: ImageData): string | null {
  const result = jsQR(data.data, data.width, data.height, {
    inversionAttempts: "dontInvert",
  });
  if (result?.data) return result.data;

  const resultInverted = jsQR(data.data, data.width, data.height, {
    inversionAttempts: "attemptBoth",
  });
  return resultInverted?.data || null;
}

interface DecodeAttempt {
  label: string;
  data: ImageData;
}

function generateAttempts(img: HTMLImageElement): DecodeAttempt[] {
  const original = getImageData(img);
  const attempts: DecodeAttempt[] = [{ label: "original", data: new ImageData(new Uint8ClampedArray(original.data), original.width, original.height) }];

  const grayscale = toGrayscale(new ImageData(new Uint8ClampedArray(original.data), original.width, original.height));
  attempts.push({ label: "grayscale", data: grayscale });

  const highContrast = increaseContrast(new ImageData(new Uint8ClampedArray(original.data), original.width, original.height));
  attempts.push({ label: "high-contrast", data: highContrast });

  const sharpened = sharpen(new ImageData(new Uint8ClampedArray(original.data), original.width, original.height));
  attempts.push({ label: "sharpened", data: sharpened });

  const threshold = binarize(grayscale);
  attempts.push({ label: "threshold", data: threshold });

  const rot90 = rotate90(new ImageData(new Uint8ClampedArray(original.data), original.width, original.height));
  attempts.push({ label: "rotate-90", data: rot90 });

  const rot180 = rotate180(new ImageData(new Uint8ClampedArray(original.data), original.width, original.height));
  attempts.push({ label: "rotate-180", data: rot180 });

  const rot270 = rotate270(new ImageData(new Uint8ClampedArray(original.data), original.width, original.height));
  attempts.push({ label: "rotate-270", data: rot270 });

  return attempts;
}

export async function decodeImage(
  img: HTMLImageElement,
  mode: "qr" | "barcode"
): Promise<DecodeResult> {
  const attempts = generateAttempts(img);

  let lastError: string | null = null;

  for (const attempt of attempts) {
    const canvas = imageDataToCanvas(attempt.data);
    const zxingResult = await tryZXingOnCanvas(canvas, mode);
    if (zxingResult) {
      return zxingResult;
    }

    if (mode === "qr") {
      const jsqrResult = tryJsQROnData(attempt.data);
      if (jsqrResult) {
        return { text: jsqrResult, format: "QR_CODE" };
      }
    }
  }

  throw new Error("No code could be decoded from the image after multiple attempts.");
}
