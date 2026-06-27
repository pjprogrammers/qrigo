import type { ContactCard, Address, SocialLinks } from "./types";

export function parseVCF(vcfContent: string): Partial<ContactCard> {
  const card: Partial<ContactCard> = {};
  const lines = vcfContent.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("BEGIN") || trimmed.startsWith("END") || trimmed.startsWith("VERSION")) continue;

    if (trimmed.startsWith("N:")) {
      const parts = trimmed.slice(2).split(";");
      card.lastName = parts[0] || "";
      card.firstName = parts[1] || "";
    } else if (trimmed.startsWith("FN:")) {
      if (!card.firstName && !card.lastName) {
        const name = trimmed.slice(3).trim().split(" ");
        card.firstName = name[0] || "";
        card.lastName = name.slice(1).join(" ") || "";
      }
    } else if (trimmed.startsWith("ORG:")) {
      card.company = trimmed.slice(4).trim();
    } else if (trimmed.startsWith("TITLE:")) {
      card.title = trimmed.slice(6).trim();
    } else if (trimmed.startsWith("DEPARTMENT:") || trimmed.toUpperCase().startsWith("DEPT:")) {
      card.department = trimmed.split(":")[1]?.trim() || "";
    } else if (trimmed.startsWith("TEL;")) {
      const value = trimmed.split(":")[1]?.trim() || "";
      if (trimmed.includes("CELL") || trimmed.includes("VOICE")) {
        card.mobile = value;
      } else if (trimmed.includes("WORK")) {
        card.workPhone = value;
      }
    } else if (trimmed.startsWith("EMAIL:")) {
      card.email = trimmed.slice(6).trim();
    } else if (trimmed.startsWith("URL:")) {
      card.website = trimmed.slice(4).trim();
    } else if (trimmed.startsWith("BDAY:")) {
      card.birthday = trimmed.slice(5).trim();
    } else if (trimmed.startsWith("NOTE:")) {
      card.notes = trimmed.slice(5).trim();
    } else if (trimmed.startsWith("ADR:")) {
      const parts = trimmed.slice(4).split(";");
      card.address = {
        street: parts[2] || undefined,
        city: parts[3] || undefined,
        state: parts[4] || undefined,
        zip: parts[5] || undefined,
        country: parts[6] || undefined,
      };
    } else if (trimmed.startsWith("LOGO:")) {
      card.logo = trimmed.slice(5).trim();
    } else if (trimmed.startsWith("X-SOCIAL-")) {
      const rest = trimmed.slice(9);
      const colonIdx = rest.indexOf(":");
      if (colonIdx > 0) {
        const platform = rest.slice(0, colonIdx).toLowerCase();
        const value = rest.slice(colonIdx + 1).trim();
        if (!card.socials) card.socials = {};
        const mapping: Record<string, keyof SocialLinks> = {
          instagram: "instagram", linkedin: "linkedin", github: "github",
          twitter: "twitter", facebook: "facebook", youtube: "youtube",
        };
        if (mapping[platform]) {
          (card.socials as any)[mapping[platform]] = value;
        }
      }
    }
  }

  return card;
}

export function detectQRType(text: string): "contact" | "url" | "text" {
  if (text.startsWith("BEGIN:VCARD")) return "contact";
  if (text.startsWith("http://") || text.startsWith("https://")) return "url";
  return "text";
}
