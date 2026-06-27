import type { CardTheme } from "@/types/qr";
import { generateMatrix } from "./matrix";
import { renderModules } from "./modules";
import { renderEyes } from "./eyes";
import { renderLogo, calculateExclusionZone } from "./logo";

export interface RenderOptions {
  data: string;
  theme: CardTheme;
  moduleSize?: number;
  dotSize?: number;
  errorCorrection?: "L" | "M" | "Q" | "H";
  platform?: string;
  logoColor?: string;
  logoSizeRatio?: number;
}

export function renderQRSvg(options: RenderOptions): string {
  const {
    data,
    theme,
    moduleSize = 10,
    dotSize = 7,
    errorCorrection = "H",
    platform = "none",
    logoColor,
    logoSizeRatio = 0.22,
  } = options;

  const gap = moduleSize - dotSize;
  const { size, modules } = generateMatrix(data, errorCorrection);
  const totalSize = size * moduleSize;
  const colors = theme.qrColors;

  // Use theme first QR color as logo color if not specified
  const effectiveLogoColor = logoColor || (colors.length > 0 ? colors[0] : "#000000");

  // Only reserve logo zone if we have a platform
  const hasLogo = platform !== "none";
  const exclusionZone = hasLogo ? calculateExclusionZone(size, logoSizeRatio) : null;

  let svg = "";

  svg += `<svg xmlns="http://www.w3.org/2000/svg" width="${totalSize}" height="${totalSize}" viewBox="0 0 ${totalSize} ${totalSize}">\n`;
  svg += `<rect width="100%" height="100%" fill="#FFFFFF" rx="${moduleSize}" ry="${moduleSize}"/>\n`;

  // Modules (skipping logo zone)
  svg += renderModules(modules, size, moduleSize, dotSize, gap, colors, exclusionZone);

  // Finder patterns
  svg += renderEyes(size, moduleSize, colors);

  // Center platform logo
  if (hasLogo) {
    svg += renderLogo(size, moduleSize, effectiveLogoColor, platform, logoSizeRatio);
  }

  svg += "</svg>";
  return svg;
}
