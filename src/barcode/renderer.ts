import JsBarcode from "jsbarcode";
import type { BarcodeFormat } from "./types";

export interface BarcodeRenderOptions {
  data: string;
  format: BarcodeFormat;
  lineColor?: string;
  background?: string;
  width?: number;
  height?: number;
  showText?: boolean;
  font?: string;
  fontSize?: number;
  textMargin?: number;
  margin?: number;
}

export function renderBarcodeSvg(options: BarcodeRenderOptions): string {
  const {
    data,
    format,
    lineColor = "#000000",
    background = "#FFFFFF",
    width = 2,
    height = 80,
    showText = true,
    font = "monospace",
    fontSize = 14,
    textMargin = 5,
    margin = 10,
  } = options;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

  try {
    JsBarcode(svg, data, {
      format,
      width,
      height,
      lineColor,
      background,
      displayValue: showText,
      font,
      fontSize,
      textMargin,
      margin,
      valid: () => true,
    });
  } catch {
    const totalWidth = margin * 2 + data.length * width * 3;
    const totalHeight = height + margin * 2;
    svg.setAttribute("width", String(Math.max(totalWidth, 200)));
    svg.setAttribute("height", String(totalHeight));
    svg.setAttribute("viewBox", `0 0 ${Math.max(totalWidth, 200)} ${totalHeight}`);
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", background);
    svg.appendChild(rect);
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "50%");
    text.setAttribute("y", "50%");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("fill", "#999");
    text.setAttribute("font-size", "12");
    text.textContent = "Invalid barcode data";
    svg.appendChild(text);
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(svg);
}
