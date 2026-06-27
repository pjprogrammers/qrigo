import qrcode from "qrcode-generator";

export interface QRMatrix {
  size: number;
  modules: boolean[][];
}

export function generateMatrix(data: string, errorCorrectionLevel: "L" | "M" | "Q" | "H" = "H"): QRMatrix {
  const qr = qrcode(0, errorCorrectionLevel);
  qr.addData(data);
  qr.make();

  const size = qr.getModuleCount();
  const modules: boolean[][] = [];

  for (let row = 0; row < size; row++) {
    modules[row] = [];
    for (let col = 0; col < size; col++) {
      modules[row][col] = qr.isDark(row, col);
    }
  }

  return { size, modules };
}

export function isFinderPattern(row: number, col: number, size: number): boolean {
  const inTopLeft = row < 7 && col < 7;
  const inTopRight = row < 7 && col >= size - 7;
  const inBottomLeft = row >= size - 7 && col < 7;
  return inTopLeft || inTopRight || inBottomLeft;
}
