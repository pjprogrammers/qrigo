import { platformLogos } from "@/qr/platforms";

interface PlatformLogoProps {
  platform: string;
  color?: string;
  size?: number;
}

export function PlatformLogo({ platform, color = "#000000", size = 20 }: PlatformLogoProps) {
  const logo = platformLogos[platform];
  if (!logo) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox={logo.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {logo.paths.map((path, i) => (
        <path
          key={i}
          fill={color}
          d={path.d}
          {...(path.fillRule ? { fillRule: path.fillRule as "evenodd" } : {})}
        />
      ))}
    </svg>
  );
}
