export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function interpolateColor(color1: string, color2: string, t: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  return rgbToHex(c1.r + (c2.r - c1.r) * t, c1.g + (c2.g - c1.g) * t, c1.b + (c2.b - c1.b) * t);
}

export function getModuleColor(col: number, total: number, colors: string[]): string {
  if (colors.length === 0) return "#000000";
  if (colors.length === 1) return colors[0];
  const t = total > 1 ? col / (total - 1) : 0;
  const segment = t * (colors.length - 1);
  const index = Math.min(Math.floor(segment), colors.length - 2);
  const frac = segment - index;
  return interpolateColor(colors[index], colors[index + 1], frac);
}

export function getModuleColor2D(row: number, col: number, total: number, colors: string[]): string {
  if (colors.length === 0) return "#000000";
  if (colors.length === 1) return colors[0];
  const t = (row / (total - 1) + col / (total - 1)) / 2;
  const segment = t * (colors.length - 1);
  const index = Math.min(Math.floor(segment), colors.length - 2);
  const frac = segment - index;
  return interpolateColor(colors[index], colors[index + 1], frac);
}
