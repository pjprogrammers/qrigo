import type { ContactCard, ContactTemplate, ContactTemplateConfig, ContactTheme, ContactThemeConfig } from "./types";
import { CONTACT_TEMPLATES, CONTACT_THEMES } from "./types";

export function getTemplateConfig(id: ContactTemplate): ContactTemplateConfig {
  return CONTACT_TEMPLATES.find(t => t.id === id) ?? CONTACT_TEMPLATES[0];
}

export function getThemeConfig(id: ContactTheme): ContactThemeConfig {
  return CONTACT_THEMES.find(t => t.id === id) ?? CONTACT_THEMES[0];
}

export function getInitials(firstName: string, lastName: string): string {
  const f = firstName?.trim()?.[0] || "";
  const l = lastName?.trim()?.[0] || "";
  return (f + l).toUpperCase() || "?";
}

export function formatWebsite(url: string): string {
  if (!url) return "";
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export function formatPhone(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.length > 10) {
    const cc = cleaned.slice(0, cleaned.length - 10);
    const num = cleaned.slice(-10);
    return `+${cc} ${num.slice(0, 3)} ${num.slice(3, 6)} ${num.slice(6)}`;
  }
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  return cleaned;
}

export function renderContactCardSVG(
  card: ContactCard,
  template: ContactTemplate,
  theme: ContactTheme,
  qrSvg?: string,
  qrSize: number = 120
): string {
  const themeConfig = getThemeConfig(theme);
  const templateConfig = getTemplateConfig(template);
  const fullName = `${card.firstName || ""} ${card.lastName || ""}`.trim() || card.company || "Contact";
  const w = 400;
  const h = 640;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">\n`;

  svg += `<defs>\n`;
  svg += `<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">\n`;
  svg += `<stop offset="0%" style="stop-color:${themeConfig.cardGradient[0]}"/>\n`;
  svg += `<stop offset="100%" style="stop-color:${themeConfig.cardGradient[1]}"/>\n`;
  svg += `</linearGradient>\n`;

  if (templateConfig.showGradient) {
    svg += `<linearGradient id="header" x1="0%" y1="0%" x2="100%" y2="0%">\n`;
    svg += `<stop offset="0%" style="stop-color:${themeConfig.cardGradient[0]}"/>\n`;
    svg += `<stop offset="100%" style="stop-color:${themeConfig.cardGradient[1]}"/>\n`;
    svg += `</linearGradient>\n`;
  }
  svg += `</defs>\n`;

  if (template === "glass") {
    svg += `<rect width="${w}" height="${h}" rx="24" ry="24" fill="url(#bg)" opacity="0.9"/>\n`;
    svg += `<rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="22" ry="22" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>\n`;
  } else if (template === "gradient") {
    svg += `<rect width="${w}" height="${h}" rx="24" ry="24" fill="url(#bg)"/>\n`;
    svg += `<rect x="0" y="0" width="${w}" height="180" rx="24" ry="24" fill="url(#header)"/>\n`;
    svg += `<rect x="0" y="${Math.round(h * 0.28)}" width="${w}" height="2" fill="${themeConfig.textColor}" opacity="0.1"/>\n`;
  } else {
    svg += `<rect width="${w}" height="${h}" rx="24" ry="24" fill="url(#bg)"/>\n`;
  }

  svg += `<rect x="0" y="0" width="${w}" height="${h}" rx="24" ry="24" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>\n`;

  let yPos = 50;

  if (templateConfig.showLogo && card.logo) {
    svg += `<image href="${card.logo}" x="${(w - 80) / 2}" y="${yPos}" width="80" height="80" />\n`;
    yPos += 100;
  }

  if (templateConfig.showCompany && card.company) {
    svg += `<text x="${w / 2}" y="${yPos}" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" font-weight="600" fill="${themeConfig.accentColor}">${card.company}</text>\n`;
    yPos += 28;
  }

  yPos += 10;
  svg += `<text x="${w / 2}" y="${yPos}" text-anchor="middle" font-family="Inter, sans-serif" font-size="28" font-weight="700" fill="${themeConfig.textColor}">${escapeXml(fullName)}</text>\n`;
  yPos += 36;

  if (card.title) {
    svg += `<text x="${w / 2}" y="${yPos}" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" fill="${themeConfig.accentColor}" opacity="0.9">${escapeXml(card.title)}</text>\n`;
    yPos += 28;
  }

  yPos += 20;
  const separatorY = yPos;
  svg += `<line x1="80" y1="${separatorY}" x2="${w - 80}" y2="${separatorY}" stroke="${themeConfig.textColor}" stroke-opacity="0.15" stroke-width="1"/>\n`;
  yPos += 30;

  const items: { label: string; value: string }[] = [];
  if (card.mobile) items.push({ label: "Mobile", value: formatPhone(card.mobile) });
  if (card.email) items.push({ label: "Email", value: card.email });
  if (card.website) items.push({ label: "Website", value: formatWebsite(card.website) });

  for (const item of items) {
    svg += `<text x="60" y="${yPos}" font-family="Inter, sans-serif" font-size="11" fill="${themeConfig.textColor}" opacity="0.5">${item.label}</text>\n`;
    svg += `<text x="60" y="${yPos + 16}" font-family="Inter, sans-serif" font-size="14" fill="${themeConfig.textColor}">${escapeXml(item.value)}</text>\n`;
    yPos += 42;
  }

  if (templateConfig.showSocials && card.socials) {
    yPos += 10;
    const socialSvgs: Record<string, string> = {
      instagram: `<path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>`,
      linkedin: `<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>`,
      github: `<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>`,
      twitter: `<path d="M18.244 2.25h3.462l-7.56 8.643 8.893 11.757h-6.965l-5.454-7.133-6.241 7.133H.51l7.75-8.858L.51 2.25h7.14l4.726 6.248L18.244 2.25z"/>`,
      facebook: `<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>`,
      youtube: `<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>`,
    };
    const socials = Object.entries(card.socials).filter(([_, v]) => v?.trim());
    if (socials.length > 0) {
      const startX = (w - socials.length * 40) / 2 + 20;
      socials.forEach(([key], i) => {
        const sx = startX + i * 40;
        svg += `<g transform="translate(${sx}, ${yPos}) scale(0.6)">`;
        svg += `<circle cx="20" cy="20" r="18" fill="${themeConfig.textColor}" opacity="0.1"/>`;
        svg += `<g transform="translate(4, 4)" fill="${themeConfig.textColor}" opacity="0.7">`;
        svg += socialSvgs[key] || "";
        svg += `</g></g>\n`;
      });
      yPos += 40;
    }
  }

  if (qrSvg) {
    const qrX = (w - qrSize) / 2;
    const qrY = h - qrSize - 30;
    svg += `<image href="${qrSvg}" x="${qrX}" y="${qrY}" width="${qrSize}" height="${qrSize}" />\n`;
  }

  svg += `</svg>`;
  return svg;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
