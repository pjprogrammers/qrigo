import { getPlatformLogo, platformLogos } from "./platforms";

export function calculateExclusionZone(
  size: number,
  logoSizeRatio: number = 0.22
): { row: number; col: number; size: number } {
  const zoneSize = Math.max(Math.round(size * logoSizeRatio), 3);
  const start = Math.floor((size - zoneSize) / 2);
  return { row: start, col: start, size: zoneSize };
}

export function renderLogo(
  size: number,
  moduleSize: number,
  color: string,
  platformId: string,
  logoSizeRatio: number = 0.22
): string {
  const totalPixels = size * moduleSize;
  const logoModuleSize = Math.max(Math.round(size * logoSizeRatio), 3);
  const logoPixels = logoModuleSize * moduleSize;
  const start = Math.floor((totalPixels - logoPixels) / 2);

  // White background behind logo
  const bgPadding = moduleSize * 2;
  const bgSize = logoPixels + bgPadding * 2;
  const bgStart = start - bgPadding;

  let svg = "";

  // Background white rounded rect
  svg += `<rect x="${bgStart}" y="${bgStart}" width="${bgSize}" height="${bgSize}" rx="${moduleSize}" ry="${moduleSize}" fill="#FFFFFF"/>\n`;

  // Platform SVG logo
  const logoDef = getPlatformLogo(platformId);
  if (logoDef) {
    const logoCenter = totalPixels / 2;
    const halfLogo = logoPixels / 2;
    const scale = (logoPixels * 0.8) / 24;

    svg += `<g transform="translate(${logoCenter - halfLogo + logoPixels * 0.1}, ${logoCenter - halfLogo + logoPixels * 0.1}) scale(${scale})">\n`;

    for (const path of logoDef.paths) {
      svg += `<path fill="${color}" d="${path.d}"${path.fillRule ? ` fill-rule="${path.fillRule}"` : ""}/>\n`;
    }

    svg += `</g>\n`;
  }

  return svg;
}
