import { getModuleColor, getModuleColor2D } from "./gradients";

export function renderModules(
  modules: boolean[][],
  size: number,
  moduleSize: number,
  dotSize: number,
  gap: number,
  colors: string[],
  exclusionZone: { row: number; col: number; size: number } | null
): string {
  let svg = "";
  const radius = Math.min(dotSize / 2, 2.5);

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!modules[row][col]) continue;

      if (exclusionZone && row >= exclusionZone.row && row < exclusionZone.row + exclusionZone.size && col >= exclusionZone.col && col < exclusionZone.col + exclusionZone.size) {
        continue;
      }

      const x = col * moduleSize + gap;
      const y = row * moduleSize + gap;
      const color = getModuleColor2D(row, col, size, colors);

      svg += `<rect x="${x}" y="${y}" width="${dotSize}" height="${dotSize}" rx="${radius}" ry="${radius}" fill="${color}"/>\n`;
    }
  }

  return svg;
}
