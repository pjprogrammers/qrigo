import type { CardTheme } from "@/types/qr";

export const cardThemes: CardTheme[] = [
  { id: "instagram", name: "Instagram", cardStart: "#28D146", cardEnd: "#0BAFE5", qrColors: ["#18C87E", "#0096FF"], textColor: "#FFFFFF" },
  { id: "purple", name: "Purple", cardStart: "#833AB4", cardEnd: "#C13584", qrColors: ["#833AB4", "#C13584", "#E1306C"], textColor: "#FFFFFF" },
  { id: "blue", name: "Blue", cardStart: "#00C6FF", cardEnd: "#0072FF", qrColors: ["#00C6FF", "#0072FF"], textColor: "#FFFFFF" },
  { id: "orange", name: "Orange", cardStart: "#F58529", cardEnd: "#DD2A7B", qrColors: ["#F58529", "#DD2A7B", "#8134AF"], textColor: "#FFFFFF" },
  { id: "green", name: "Green", cardStart: "#00D26A", cardEnd: "#00A8FF", qrColors: ["#00D26A", "#00A8FF"], textColor: "#FFFFFF" },
  { id: "rainbow", name: "Rainbow", cardStart: "#405DE6", cardEnd: "#FCAF45", qrColors: ["#405DE6", "#5851DB", "#833AB4", "#C13584", "#E1306C", "#FD1D1D", "#F77737", "#FCAF45"], textColor: "#FFFFFF" },
  { id: "midnight", name: "Midnight", cardStart: "#0F2027", cardEnd: "#2C5364", qrColors: ["#0F2027", "#203A43", "#2C5364"], textColor: "#FFFFFF" },
  { id: "monochrome", name: "Monochrome", cardStart: "#333333", cardEnd: "#000000", qrColors: ["#000000", "#333333"], textColor: "#FFFFFF" },
  { id: "linkedin", name: "LinkedIn", cardStart: "#0077B5", cardEnd: "#00A0DC", qrColors: ["#0077B5", "#00A0DC"], textColor: "#FFFFFF" },
  { id: "github", name: "GitHub", cardStart: "#24292E", cardEnd: "#444D56", qrColors: ["#24292E", "#444D56"], textColor: "#FFFFFF" },
  { id: "x", name: "X", cardStart: "#000000", cardEnd: "#434343", qrColors: ["#000000", "#434343"], textColor: "#FFFFFF" },
  { id: "youtube", name: "YouTube", cardStart: "#FF0000", cardEnd: "#CC0000", qrColors: ["#FF0000", "#CC0000"], textColor: "#FFFFFF" },
  { id: "tiktok", name: "TikTok", cardStart: "#010101", cardEnd: "#FE2C55", qrColors: ["#010101", "#FE2C55", "#25F4EE"], textColor: "#FFFFFF" },
  { id: "spotify", name: "Spotify", cardStart: "#1DB954", cardEnd: "#191414", qrColors: ["#1DB954", "#191414"], textColor: "#FFFFFF" },
  { id: "whatsapp", name: "WhatsApp", cardStart: "#25D366", cardEnd: "#128C7E", qrColors: ["#25D366", "#128C7E"], textColor: "#FFFFFF" },
  { id: "discord", name: "Discord", cardStart: "#5865F2", cardEnd: "#404EED", qrColors: ["#5865F2", "#404EED"], textColor: "#FFFFFF" },
  { id: "telegram", name: "Telegram", cardStart: "#0088CC", cardEnd: "#0088CC", qrColors: ["#0088CC", "#0088CC"], textColor: "#FFFFFF" },
  { id: "pinterest", name: "Pinterest", cardStart: "#E60023", cardEnd: "#BD081C", qrColors: ["#E60023", "#BD081C"], textColor: "#FFFFFF" },
];

export function getCardTheme(id: string): CardTheme {
  return cardThemes.find((t) => t.id === id) ?? cardThemes[0];
}
