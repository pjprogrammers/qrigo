export interface QRPreset {
  name: string;
  moduleSize: number;
  dotSize: number;
  eyeStyle: "instagram" | "square" | "rounded";
  logoSizeRatio: number;
}

export const presets: Record<string, QRPreset> = {
  instagram: {
    name: "Instagram",
    moduleSize: 10,
    dotSize: 7,
    eyeStyle: "instagram",
    logoSizeRatio: 0.22,
  },
  compact: {
    name: "Compact",
    moduleSize: 8,
    dotSize: 6,
    eyeStyle: "rounded",
    logoSizeRatio: 0.18,
  },
  large: {
    name: "Large",
    moduleSize: 12,
    dotSize: 9,
    eyeStyle: "instagram",
    logoSizeRatio: 0.22,
  },
};

export function getPreset(name: string): QRPreset {
  return presets[name] ?? presets.instagram;
}
