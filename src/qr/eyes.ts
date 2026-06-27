import { getModuleColor2D } from "./gradients";

export function renderEyes(
  size: number,
  moduleSize: number,
  colors: string[]
): string {
  const positions = [
    { row: 0, col: 0 },
    { row: 0, col: size - 7 },
    { row: size - 7, col: 0 },
  ];

  let svg = "";

  for (const pos of positions) {
    const x = pos.col * moduleSize;
    const y = pos.row * moduleSize;
    const eyeSize = 7 * moduleSize;

    const outerColor = getModuleColor2D(pos.row, pos.col, size, colors);

    // Outer rounded square (7x7 modules)
    svg += `<rect x="${x}" y="${y}" width="${eyeSize}" height="${eyeSize}" rx="${moduleSize * 0.6}" ry="${moduleSize * 0.6}" fill="${outerColor}"/>\n`;

    // Inner white square (5x5 modules area)
    const innerPad = moduleSize;
    svg += `<rect x="${x + innerPad}" y="${y + innerPad}" width="${eyeSize - 2 * innerPad}" height="${eyeSize - 2 * innerPad}" rx="${moduleSize * 0.35}" ry="${moduleSize * 0.35}" fill="#FFFFFF"/>\n`;

    // Inner colored circle/dot (3x3 modules area)
    const dotPad = 2 * moduleSize;
    const dotSize = eyeSize - 2 * dotPad;
    svg += `<rect x="${x + dotPad}" y="${y + dotPad}" width="${dotSize}" height="${dotSize}" rx="${dotSize / 2}" ry="${dotSize / 2}" fill="${outerColor}"/>\n`;
  }

  return svg;
}

